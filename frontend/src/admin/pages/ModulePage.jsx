import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
  AlertTriangle,
} from "lucide-react";
import { adminClient, ADMIN_API, TOKEN_KEY } from "@/admin/lib/client";

const MODULE_META = {
  users:        { title: "Users",            cols: ["name", "email", "phone", "city", "status", "created_at"] },
  guards:       { title: "Guards",           cols: ["name", "email", "phone", "psara_id", "kyc_status", "status", "created_at"] },
  bookings:     { title: "Bookings",         cols: ["id", "user", "guard", "city", "amount", "status", "created_at"] },
  orders:       { title: "Orders",           cols: ["id", "ref", "amount", "status", "created_at"] },
  transactions: { title: "Transactions",     cols: ["id", "amount", "method", "status", "txn_id", "created_at"] },
  categories:   { title: "Categories",       cols: ["name", "slug", "status", "created_at"] },
  cities:       { title: "Cities",           cols: ["name", "state", "code", "status", "created_at"] },
  pricing:      { title: "Pricing",          cols: ["category", "city", "base_price", "currency", "created_at"] },
  coupons:      { title: "Coupons",          cols: ["code", "name", "discount", "expires_at", "status", "created_at"] },
  tickets:      { title: "Tickets",          cols: ["subject", "email", "phone", "status", "created_at"] },
  kyc:          { title: "KYC Center",       cols: ["name", "email", "phone", "status", "created_at"], statuses: ["pending", "approved", "rejected", "needs_info"] },
  sos:          { title: "SOS Monitoring",   cols: ["user", "booking", "city", "status", "created_at"], statuses: ["active", "resolved", "false_alarm"] },
  payouts:      { title: "Payouts",          cols: ["guard", "amount", "method", "status", "created_at"], statuses: ["pending", "processing", "paid", "failed"] },
  settlements:  { title: "Settlements",      cols: ["period", "total", "status", "created_at"] },
  settings:     { title: "Settings",         cols: ["key", "scope", "value", "updated_at"] },
  audit_log:    { title: "Audit Log",        cols: ["ts", "actor", "action", "module", "target"] },
  reports:      { title: "Reports",          cols: ["period", "metric", "value", "generated_at"] },
  contacts:     { title: "Contact submissions", cols: ["name", "email", "phone", "topic", "message", "created_at"] },
  waitlist:     { title: "Waitlist",         cols: ["email", "city", "role", "source", "created_at"] },
};

const fmtCell = (v) => {
  if (v == null || v === "") return "—";
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
    try {
      return new Date(v).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return v;
    }
  }
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
};

export default function ModulePage({ module, title }) {
  const meta = MODULE_META[module] || { title: module, cols: ["id"] };
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const { data } = await adminClient.get(`/${module}`, {
        params: { q: q || undefined, status: status || undefined, page, page_size: pageSize },
      });
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setErr(e?.response?.data?.detail || e.message);
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [module, q, status, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [module, q, status]);

  useEffect(() => {
    load();
  }, [load]);

  const exportCsv = () => {
    const token = localStorage.getItem(TOKEN_KEY) || "";
    const url = new URL(`${ADMIN_API}/${module}/export.csv`);
    if (q) url.searchParams.set("q", q);
    if (status) url.searchParams.set("status", status);
    // can't set headers on a plain anchor click — use fetch then download
    fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((r) => r.blob())
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${module}.csv`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      });
  };

  return (
    <div data-testid={`module-${module}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-eyebrow">{module}</p>
          <h1 className="mt-1 font-display text-3xl text-white">
            {title || meta.title}
          </h1>
          <p className="mt-1 text-sm text-[#A0A0A5]">
            {total.toLocaleString("en-IN")} record{total === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={load}
            data-testid="module-refresh"
            className="btn-ghost-gold rounded-lg px-3 py-2 text-sm inline-flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={exportCsv}
            data-testid="module-export"
            className="btn-ghost-gold rounded-lg px-3 py-2 text-sm inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-[#A0A0A5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            data-testid="module-search"
            className="rounded-lg pl-9 pr-4 py-2 text-sm w-full"
          />
        </div>
        {meta.statuses && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            data-testid="module-status"
            className="rounded-lg px-3 py-2 text-sm bg-[#0B0B0D]"
          >
            <option value="">All statuses</option>
            {meta.statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          data-testid="module-pagesize"
          className="rounded-lg px-3 py-2 text-sm bg-[#0B0B0D]"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 card-rk rounded-xl overflow-hidden">
        {err && (
          <div className="p-5 border-b border-[#D9A93D]/10 bg-yellow-500/[0.06] text-sm text-yellow-100">
            <AlertTriangle className="w-4 h-4 inline mr-2 text-yellow-400" />
            {err}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid={`table-${module}`}>
            <thead className="bg-white/[0.03] text-left">
              <tr className="text-[#A0A0A5]">
                {meta.cols.map((c) => (
                  <th key={c} className="px-4 py-3 font-medium whitespace-nowrap">
                    {c.replace(/_/g, " ")}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium w-px">View</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={meta.cols.length + 1}
                    className="px-4 py-12 text-center text-[#A0A0A5]"
                  >
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={meta.cols.length + 1}
                    className="px-4 py-12 text-center text-[#A0A0A5]"
                  >
                    No records.
                  </td>
                </tr>
              ) : (
                items.map((row, i) => (
                  <tr
                    key={row.id || row._id || i}
                    className="border-t border-[#D9A93D]/10 align-top"
                  >
                    {meta.cols.map((c) => (
                      <td
                        key={c}
                        className="px-4 py-3 text-[#C7C7CC] whitespace-pre-wrap max-w-[28ch]"
                      >
                        {fmtCell(row[c])}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelected(row)}
                        data-testid={`row-view-${i}`}
                        className="text-xs text-[#D9A93D] hover:text-[#E8C366]"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-[#D9A93D]/10 flex items-center justify-between text-xs text-[#A0A0A5]">
          <span>
            Page {page} / {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              data-testid="module-prev"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[#D9A93D]/15 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              data-testid="module-next"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[#D9A93D]/15 disabled:opacity-40"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row detail drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex"
          onClick={() => setSelected(null)}
        >
          <div
            className="ml-auto w-full max-w-2xl h-full bg-[#0E0E11] border-l border-[#D9A93D]/20 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            data-testid="row-drawer"
          >
            <div className="sticky top-0 bg-[#0E0E11] z-10 flex items-center justify-between px-6 py-4 border-b border-[#D9A93D]/10">
              <p className="font-display text-lg text-white">Record details</p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-[#A0A0A5] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <pre className="text-xs text-[#C7C7CC] whitespace-pre-wrap break-words">
                {JSON.stringify(selected, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
