"""Admin JWT email+password authentication for RAKSHAK.

- bcrypt password hashing
- short-lived JWT access token (12h) sent via Authorization: Bearer or
  `access_token` cookie (so the admin SPA can use either)
- brute-force lockout: 5 failed attempts per (ip+email) per 15 minutes
- idempotent admin seeding from ADMIN_EMAIL / ADMIN_PASSWORD env on startup
"""

from __future__ import annotations

import os
import uuid
import logging
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
import jwt
from fastapi import HTTPException, Request, Response, Depends
from pydantic import BaseModel, EmailStr, Field, ConfigDict

logger = logging.getLogger(__name__)

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_TTL_MIN = 60 * 12  # 12 hours
COOKIE_NAME = "rk_admin_token"
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_WINDOW_MIN = 15


# ---------------- Models ----------------
class AdminLoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=4, max_length=200)


class AdminPublic(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    name: str = ""
    role: str = "admin"


class AdminLoginOut(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    expires_in: int
    admin: AdminPublic


# ---------------- Helpers ----------------
def _jwt_secret() -> str:
    secret = os.environ.get("JWT_SECRET")
    if not secret:
        raise RuntimeError("JWT_SECRET not configured")
    return secret


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except (ValueError, AttributeError):
        return False


def create_access_token(*, sub: str, email: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": sub,
        "email": email,
        "role": "admin",
        "iat": now,
        "exp": now + timedelta(minutes=ACCESS_TOKEN_TTL_MIN),
        "type": "access",
    }
    return jwt.encode(payload, _jwt_secret(), algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    payload = jwt.decode(token, _jwt_secret(), algorithms=[JWT_ALGORITHM])
    if payload.get("type") != "access" or payload.get("role") != "admin":
        raise jwt.InvalidTokenError("Wrong token type")
    return payload


# ---------------- Seed ----------------
async def seed_admin(db) -> None:
    email = (os.environ.get("ADMIN_EMAIL") or "").strip().lower()
    password = os.environ.get("ADMIN_PASSWORD") or ""
    if not email or not password:
        logger.warning("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping seed")
        return
    try:
        await db.admin_users.create_index("email", unique=True)
        await db.login_attempts.create_index("identifier")
        await db.login_attempts.create_index(
            "last_attempt", expireAfterSeconds=LOCKOUT_WINDOW_MIN * 60
        )
    except Exception as exc:  # network issues should not block startup
        logger.warning("admin index creation failed: %s", exc)

    try:
        existing = await db.admin_users.find_one({"email": email})
        if existing is None:
            doc = {
                "id": str(uuid.uuid4()),
                "email": email,
                "name": "RAKSHAK Admin",
                "role": "admin",
                "password_hash": hash_password(password),
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
            await db.admin_users.insert_one(doc)
            logger.info("seeded admin user %s", email)
        elif not verify_password(password, existing.get("password_hash", "")):
            # password rotated in env — sync the hash
            await db.admin_users.update_one(
                {"email": email},
                {"$set": {"password_hash": hash_password(password)}},
            )
            logger.info("rotated admin password for %s", email)
    except Exception as exc:
        logger.warning("admin seed skipped: %s", exc)


# ---------------- Brute-force tracking ----------------
async def _check_lockout(db, identifier: str) -> None:
    rec = await db.login_attempts.find_one({"identifier": identifier})
    if not rec:
        return
    if rec.get("count", 0) >= MAX_FAILED_ATTEMPTS:
        raise HTTPException(
            status_code=429,
            detail=f"Too many failed attempts. Try again in {LOCKOUT_WINDOW_MIN} minutes.",
        )


async def _record_failed(db, identifier: str) -> None:
    await db.login_attempts.update_one(
        {"identifier": identifier},
        {
            "$inc": {"count": 1},
            "$set": {"last_attempt": datetime.now(timezone.utc)},
        },
        upsert=True,
    )


async def _clear_failed(db, identifier: str) -> None:
    await db.login_attempts.delete_one({"identifier": identifier})


# ---------------- Routes ----------------
async def login_endpoint(db, payload: AdminLoginIn, request: Request, response: Response):
    email = payload.email.lower().strip()
    ip = request.client.host if request.client else "?"
    identifier = f"{ip}:{email}"
    try:
        await _check_lockout(db, identifier)
        user = await db.admin_users.find_one({"email": email})
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("admin login DB error: %s", exc)
        raise HTTPException(status_code=503, detail="Service unavailable. Try again in a moment.")

    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        try:
            await _record_failed(db, identifier)
        except Exception:
            pass
        raise HTTPException(status_code=401, detail="Invalid email or password")

    try:
        await _clear_failed(db, identifier)
    except Exception:
        pass

    token = create_access_token(sub=user["id"], email=email)
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=ACCESS_TOKEN_TTL_MIN * 60,
        path="/",
    )
    return AdminLoginOut(
        access_token=token,
        expires_in=ACCESS_TOKEN_TTL_MIN * 60,
        admin=AdminPublic(
            id=user["id"],
            email=email,
            name=user.get("name", ""),
            role=user.get("role", "admin"),
        ),
    )


async def logout_endpoint(response: Response):
    response.delete_cookie(COOKIE_NAME, path="/")
    return {"ok": True}


# ---------------- Dependency ----------------
def make_require_admin(get_db):
    async def require_admin(request: Request) -> dict:
        token: Optional[str] = None
        cookie_val = request.cookies.get(COOKIE_NAME)
        if cookie_val:
            token = cookie_val
        if not token:
            auth = request.headers.get("Authorization", "")
            if auth.startswith("Bearer "):
                token = auth[7:].strip()
        # backward-compat: X-Admin-Token shared secret still allowed via legacy code path
        if not token:
            legacy = request.headers.get("X-Admin-Token")
            expected = os.environ.get("ADMIN_TOKEN")
            if expected and legacy == expected:
                return {
                    "id": "legacy",
                    "email": "legacy-token",
                    "role": "admin",
                }
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        try:
            payload = decode_token(token)
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Session expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        db = get_db()
        user = await db.admin_users.find_one({"id": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="Admin not found")
        return {
            "id": user["id"],
            "email": user["email"],
            "name": user.get("name", ""),
            "role": user.get("role", "admin"),
        }
    return require_admin
