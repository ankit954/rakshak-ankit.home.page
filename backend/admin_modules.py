"""Admin module endpoints.

Each module is a thin wrapper over a MongoDB collection with:
  - paginated, searchable list (`GET  /api/admin/<module>`)
  - single doc fetch         (`GET  /api/admin/<module>/{id}`)
  - generic update           (`PATCH /api/admin/<module>/{id}`)
  - status toggle            (`POST  /api/admin/<module>/{id}/status`)

The intent is to surface whatever is in the shared mobile-app DB
(`rakshak`) so ops can act on it. The schema is intentionally flexible —
we mirror documents as-is and let the UI decide which fields to render.
"""

from __future__ import annotations

import csv
import io
import logging
from datetime import datetime, timezone, timedelta
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Response
from pydantic import BaseModel

logger = logging.getLogger(__name__)


# ---------------- Module registry ----------------
# Map URL slug → (Mongo collection, primary searchable text fields)
MODULES: Dict[str, Dict[str, Any]] = {
    "users":        {"collection": "users",            "search": ["name", "email", "phone", "mobile"]},
    "guards":       {"collection": "guards",           "search": ["name", "email", "phone", "mobile", "psara_id"]},
    "bookings":     {"collection": "bookings",         "search": ["id", "ref", "code", "city", "status"]},
    "orders":       {"collection": "orders",           "search": ["id", "ref", "status"]},
    "transactions": {"collection": "transactions",     "search": ["id", "ref", "txn_id", "status"]},
    "categories":   {"collection": "categories",       "search": ["name", "slug", "code"]},
    "cities":       {"collection": "cities",           "search": ["name", "code", "state"]},
    "pricing":      {"collection": "pricing",          "search": ["category", "city", "code"]},
    "coupons":      {"collection": "coupons",          "search": ["code", "name"]},
    "tickets":      {"collection": "tickets",          "search": ["subject", "status", "email", "phone"]},
    "kyc":          {"collection": "kyc_submissions",  "search": ["name", "email", "phone", "status", "aadhaar_last4"]},
    "sos":          {"collection": "sos_events",       "search": ["user", "booking", "status", "city"]},
    "payouts":      {"collection": "payouts",          "search": ["guard", "status", "ref"]},
    "settlements":  {"collection": "settlements",      "search": ["period", "status"]},
    "settings":     {"collection": "app_settings",     "search": ["key", "scope"]},
    "audit_log":    {"collection": "audit_log",        "search": ["action", "actor", "target"]},
    # Marketing site collections — also visible from admin
    "contacts":     {"collection": "contact_submissions","search": ["name", "email", "phone", "topic", "message"]},
    "waitlist":     {"collection": "waitlist_signups", "search": ["email", "city", "role", "source"]},
}


def _strip_oid(doc: Dict[str, Any]) -> Dict[str, Any]:
    if not doc:
        return doc
    doc.pop("_id", None)
    # ensure password hashes never leak
    for k in list(doc.keys()):
        if "password" in k.lower() or "secret" in k.lower():
            doc[k] = "[REDACTED]"
    return doc


def _date_field_for(module: str) -> str:
    # best-effort default for sort
    return {"audit_log": "ts"}.get(module, "created_at")


def _build_query(module: str, q: Optional[str], status: Optional[str]) -> Dict[str, Any]:
    cfg = MODULES[module]
    query: Dict[str, Any] = {}
    if q:
        regex = {"$regex": q, "$options": "i"}
        ors = [{f: regex} for f in cfg["search"]]
        if ors:
            query["$or"] = ors
    if status:
        query["status"] = status
    return query


# ---------------- Routes ----------------
def make_router(get_db, require_admin) -> APIRouter:
    router = APIRouter(prefix="/api/admin", tags=["admin"])

    # ---- Dashboard KPIs ----
    @router.get("/dashboard/kpis", dependencies=[Depends(require_admin)])
    async def dashboard_kpis() -> Dict[str, Any]:
        db = get_db()
        out: Dict[str, Any] = {"counts": {}, "today": {}, "errors": []}
        today_start = datetime.combine(
            datetime.now(timezone.utc).date(), datetime.min.time(), tzinfo=timezone.utc
        )
        for slug, cfg in MODULES.items():
            try:
                cnt = await db[cfg["collection"]].estimated_document_count()
                out["counts"][slug] = cnt
                try:
                    today = await db[cfg["collection"]].count_documents(
                        {_date_field_for(slug): {"$gte": today_start.isoformat()}}
                    )
                    out["today"][slug] = today
                except Exception:
                    out["today"][slug] = 0
            except Exception as exc:
                out["counts"][slug] = 0
                out["errors"].append(f"{slug}: {type(exc).__name__}")
        # quick revenue/booking snapshot
        try:
            pipeline = [
                {"$match": {"status": {"$in": ["completed", "paid", "success"]}}},
                {"$group": {"_id": None, "total": {"$sum": "$amount"}}},
            ]
            agg = await db.transactions.aggregate(pipeline).to_list(1)
            out["revenue_lifetime"] = agg[0]["total"] if agg else 0
        except Exception:
            out["revenue_lifetime"] = 0
        return out

    # ---- Generic list ----
    @router.get("/{module}", dependencies=[Depends(require_admin)])
    async def list_module(
        module: str,
        q: Optional[str] = Query(default=None),
        status: Optional[str] = Query(default=None),
        page: int = Query(default=1, ge=1),
        page_size: int = Query(default=25, ge=1, le=200),
        sort: str = Query(default="-created_at"),
    ) -> Dict[str, Any]:
        if module not in MODULES:
            raise HTTPException(404, "Unknown module")
        db = get_db()
        coll = db[MODULES[module]["collection"]]
        query = _build_query(module, q, status)
        sort_field = sort.lstrip("-")
        sort_dir = -1 if sort.startswith("-") else 1
        try:
            total = await coll.count_documents(query)
            cursor = (
                coll.find(query, {"_id": 0})
                .sort(sort_field, sort_dir)
                .skip((page - 1) * page_size)
                .limit(page_size)
            )
            items = [_strip_oid(d) async for d in cursor]
        except Exception as exc:
            logger.error("list %s failed: %s", module, exc)
            raise HTTPException(503, "Database temporarily unreachable.")
        return {
            "module": module,
            "page": page,
            "page_size": page_size,
            "total": total,
            "items": items,
        }

    # ---- CSV export ----
    @router.get("/{module}/export.csv", dependencies=[Depends(require_admin)])
    async def export_module(
        module: str,
        q: Optional[str] = None,
        status: Optional[str] = None,
        limit: int = Query(default=5000, ge=1, le=20000),
    ):
        if module not in MODULES:
            raise HTTPException(404, "Unknown module")
        db = get_db()
        coll = db[MODULES[module]["collection"]]
        query = _build_query(module, q, status)
        try:
            cursor = coll.find(query, {"_id": 0}).sort("created_at", -1).limit(limit)
            rows: List[Dict[str, Any]] = [_strip_oid(d) async for d in cursor]
        except Exception as exc:
            logger.error("export %s failed: %s", module, exc)
            raise HTTPException(503, "Database temporarily unreachable.")
        if not rows:
            rows = [{"info": "No records"}]
        # collect union of keys for header
        cols: List[str] = []
        seen = set()
        for r in rows:
            for k in r.keys():
                if k not in seen:
                    seen.add(k)
                    cols.append(k)
        buf = io.StringIO()
        writer = csv.DictWriter(buf, fieldnames=cols, extrasaction="ignore")
        writer.writeheader()
        for r in rows:
            flat = {k: (str(v) if not isinstance(v, (str, int, float, bool)) and v is not None else v) for k, v in r.items()}
            writer.writerow(flat)
        csv_data = buf.getvalue()
        return Response(
            content=csv_data,
            media_type="text/csv",
            headers={
                "Content-Disposition": f'attachment; filename="{module}-{datetime.now().strftime("%Y%m%d-%H%M")}.csv"'
            },
        )

    # ---- Single doc ----
    @router.get("/{module}/{doc_id}", dependencies=[Depends(require_admin)])
    async def get_doc(module: str, doc_id: str):
        if module not in MODULES:
            raise HTTPException(404, "Unknown module")
        db = get_db()
        coll = db[MODULES[module]["collection"]]
        try:
            d = await coll.find_one({"id": doc_id}, {"_id": 0})
            if not d:
                d = await coll.find_one({"_id": doc_id}, {"_id": 0})
        except Exception as exc:
            logger.error("get %s/%s failed: %s", module, doc_id, exc)
            raise HTTPException(503, "Database temporarily unreachable.")
        if not d:
            raise HTTPException(404, "Not found")
        return _strip_oid(d)

    # ---- Patch ----
    class GenericPatch(BaseModel):
        # arbitrary key/value updates; sensitive keys are filtered
        updates: Dict[str, Any]

    SENSITIVE_KEYS = {"password", "password_hash", "secret", "_id"}

    async def _write_audit(db, *, actor: dict, action: str, module: str, doc_id: str, before: dict, after: dict):
        try:
            await db.audit_log.insert_one({
                "ts": datetime.now(timezone.utc).isoformat(),
                "actor": actor.get("email"),
                "action": action,
                "module": module,
                "target": doc_id,
                "before": before,
                "after": after,
            })
        except Exception:
            pass

    @router.patch("/{module}/{doc_id}")
    async def patch_doc(
        module: str, doc_id: str, payload: GenericPatch,
        admin: dict = Depends(require_admin),
    ):
        if module not in MODULES:
            raise HTTPException(404, "Unknown module")
        upd = {k: v for k, v in payload.updates.items() if k not in SENSITIVE_KEYS}
        if not upd:
            raise HTTPException(400, "No safe fields to update")
        db = get_db()
        coll = db[MODULES[module]["collection"]]
        try:
            before = await coll.find_one({"id": doc_id}, {"_id": 0})
            res = await coll.update_one({"id": doc_id}, {"$set": upd})
            if res.matched_count == 0:
                raise HTTPException(404, "Not found")
            after = await coll.find_one({"id": doc_id}, {"_id": 0})
        except HTTPException:
            raise
        except Exception as exc:
            logger.error("patch %s/%s failed: %s", module, doc_id, exc)
            raise HTTPException(503, "Database temporarily unreachable.")
        await _write_audit(db, actor=admin, action="update", module=module, doc_id=doc_id, before=before or {}, after=after or {})
        return _strip_oid(after or {})

    class StatusBody(BaseModel):
        status: str

    @router.post("/{module}/{doc_id}/status")
    async def set_status(
        module: str, doc_id: str, payload: StatusBody,
        admin: dict = Depends(require_admin),
    ):
        if module not in MODULES:
            raise HTTPException(404, "Unknown module")
        db = get_db()
        coll = db[MODULES[module]["collection"]]
        try:
            before = await coll.find_one({"id": doc_id}, {"_id": 0})
            res = await coll.update_one({"id": doc_id}, {"$set": {"status": payload.status}})
            if res.matched_count == 0:
                raise HTTPException(404, "Not found")
            after = await coll.find_one({"id": doc_id}, {"_id": 0})
        except HTTPException:
            raise
        except Exception as exc:
            logger.error("status %s/%s failed: %s", module, doc_id, exc)
            raise HTTPException(503, "Database temporarily unreachable.")
        await _write_audit(db, actor=admin, action="set_status", module=module, doc_id=doc_id, before=before or {}, after=after or {})
        return _strip_oid(after or {})

    return router
