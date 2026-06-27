import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  ShieldCheck,
  LogOut,
  RefreshCw,
  Inbox,
  ListChecks,
  Search,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const STORAGE_KEY = "rk_admin_token";

const TabBtn = ({ active, onClick, icon: Icon, label, count, testId }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testId}
    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border transition-colors ${
      active
        ? "border-[#D9A93D] bg-[#D9A93D]/10 text-white"
        : "border-[#D9A93D]/15 text-white/80 hover:border-[#D9A93D]/40"
    }`}
  >
    <Icon className="w-4 h-4 text-[#D9A93D]" /> {label}
    <span
      className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
        active ? "bg-[#D9A93D] text-[#0B0B0D]" : "bg-white/5 text-white/70"
      }`}
    >
      {count}
    </span>
  </button>
);

const fmt = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [tab, setTab] = useState("contacts");
  const [contacts, setContacts] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const tryLogin = useCallback(async (t) => {
    setChecking(true);
    try {
      await axios.get(`${API}/admin/check`, {
        headers: { "X-Admin-Token": t },
      });
      localStorage.setItem(STORAGE_KEY, t);
      setAuthed(true);
      toast.success("Welcome, admin.");
    } catch (err) {
      localStorage.removeItem(STORAGE_KEY);
      setAuthed(false);
      toast.error("Invalid admin token.");
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setToken(stored);
      tryLogin(stored);
    }
  }, [tryLogin]);

  const onLogin = (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    tryLogin(token.trim());
  };

  const onLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken("");
    setAuthed(false);
    setContacts([]);
    setWaitlist([]);
  };

  const fetchData = useCallback(async () => {
    if (!authed) return;
    setLoading(true);
    try {
      const [c, w] = await Promise.all([
        axios.get(`${API}/admin/contacts`, {
          headers: { "X-Admin-Token": token },
        }),
        axios.get(`${API}/admin/waitlist`, {
          headers: { "X-Admin-Token": token },
        }),
      ]);
      setContacts(c.data);
      setWaitlist(w.data);
    } catch (err) {
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [authed, token]);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  // ----- LOGIN VIEW -----
  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-5"
        data-testid="admin-login-view"
      >
        <div className="card-rk rounded-2xl p-8 w-full max-w-md">
          <div className="w-12 h-12 rounded-lg bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#D9A93D]" />
          </div>
          <h1 className="mt-5 font-display text-2xl text-white">
            Admin access
          </h1>
          <p className="mt-2 text-sm text-[#A0A0A5]">
            Enter your shared admin token. Tokens are not stored on a server —
            we use a single secret from the backend environment.
          </p>
          <form onSubmit={onLogin} className="mt-6 space-y-3" data-testid="admin-login-form">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Admin token"
              data-testid="admin-token-input"
              className="w-full rounded-lg px-4 py-3 text-sm placeholder:text-white/30"
              required
            />
            <button
              type="submit"
              disabled={checking}
              data-testid="admin-login-submit"
              className="w-full btn-gold rounded-lg px-4 py-3 text-sm disabled:opacity-60"
            >
              {checking ? "Checking…" : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-xs text-[#A0A0A5]">
            Forgot the token? It is set as <code>ADMIN_TOKEN</code> in{" "}
            <code>backend/.env</code>.
          </p>
        </div>
      </div>
    );
  }

  // ----- DASHBOARD VIEW -----
  const matches = (text) =>
    !query.trim() ||
    text.toLowerCase().includes(query.trim().toLowerCase());

  const filteredContacts = contacts.filter((c) =>
    [c.name, c.email, c.phone, c.topic, c.message]
      .filter(Boolean)
      .some((v) => matches(v)),
  );
  const filteredWaitlist = waitlist.filter((w) =>
    [w.email, w.city, w.role, w.source].filter(Boolean).some((v) => matches(v)),
  );

  return (
    <div className="min-h-screen px-5 md:px-10 py-10" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="label-eyebrow">RAKSHAK</p>
            <h1 className="mt-1 font-display text-3xl text-white">
              Admin Console
            </h1>
            <p className="mt-1 text-sm text-[#A0A0A5]">
              Read-only view of contact submissions & waitlist signups.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              data-testid="admin-refresh"
              className="btn-ghost-gold rounded-lg px-4 py-2 text-sm inline-flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={onLogout}
              data-testid="admin-logout"
              className="btn-ghost-gold rounded-lg px-4 py-2 text-sm inline-flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <TabBtn
            active={tab === "contacts"}
            onClick={() => setTab("contacts")}
            icon={Inbox}
            label="Contacts"
            count={contacts.length}
            testId="admin-tab-contacts"
          />
          <TabBtn
            active={tab === "waitlist"}
            onClick={() => setTab("waitlist")}
            icon={ListChecks}
            label="Waitlist"
            count={waitlist.length}
            testId="admin-tab-waitlist"
          />
          <div className="ml-auto relative">
            <Search className="w-4 h-4 text-[#A0A0A5] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="admin-search"
              className="rounded-lg pl-9 pr-4 py-2 text-sm w-64"
            />
          </div>
        </div>

        <div className="mt-6 card-rk rounded-xl overflow-hidden">
          {tab === "contacts" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="admin-contacts-table">
                <thead className="bg-white/[0.03] text-left">
                  <tr className="text-[#A0A0A5]">
                    <th className="px-4 py-3 font-medium">When</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 font-medium">Topic</th>
                    <th className="px-4 py-3 font-medium">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-[#A0A0A5]"
                      >
                        No submissions yet.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((c) => (
                      <tr
                        key={c.id}
                        className="border-t border-[#D9A93D]/10 align-top"
                      >
                        <td className="px-4 py-3 text-[#C7C7CC] whitespace-nowrap">
                          {fmt(c.created_at)}
                        </td>
                        <td className="px-4 py-3 text-white">{c.name}</td>
                        <td className="px-4 py-3 text-[#C7C7CC]">{c.email}</td>
                        <td className="px-4 py-3 text-[#C7C7CC]">
                          {c.phone || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs border border-[#D9A93D]/20 text-[#D9A93D]">
                            {c.topic}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#C7C7CC] max-w-md">
                          {c.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="admin-waitlist-table">
                <thead className="bg-white/[0.03] text-left">
                  <tr className="text-[#A0A0A5]">
                    <th className="px-4 py-3 font-medium">When</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">City</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWaitlist.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-[#A0A0A5]"
                      >
                        No signups yet.
                      </td>
                    </tr>
                  ) : (
                    filteredWaitlist.map((w) => (
                      <tr
                        key={w.id}
                        className="border-t border-[#D9A93D]/10"
                      >
                        <td className="px-4 py-3 text-[#C7C7CC] whitespace-nowrap">
                          {fmt(w.created_at)}
                        </td>
                        <td className="px-4 py-3 text-white">{w.email}</td>
                        <td className="px-4 py-3 text-[#C7C7CC]">
                          {w.city || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs border border-[#D9A93D]/20 text-[#D9A93D]">
                            {w.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#C7C7CC]">
                          {w.source || "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
