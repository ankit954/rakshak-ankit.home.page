import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Shield,
  CalendarCheck,
  FileCheck2,
  Siren,
  Ticket,
  Receipt,
  Coins,
  Mail,
  Inbox,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { adminClient } from "@/admin/lib/client";

const CARDS = [
  { key: "bookings", to: "/bookings", label: "Bookings", icon: CalendarCheck },
  { key: "users", to: "/users", label: "Customers", icon: Users },
  { key: "guards", to: "/guards", label: "Guards", icon: Shield },
  { key: "kyc", to: "/kyc", label: "KYC pending", icon: FileCheck2 },
  { key: "sos", to: "/sos", label: "SOS events", icon: Siren },
  { key: "tickets", to: "/tickets", label: "Open tickets", icon: Ticket },
  { key: "transactions", to: "/transactions", label: "Transactions", icon: Receipt },
  { key: "payouts", to: "/payouts", label: "Payouts", icon: Coins },
  { key: "contacts", to: "/contacts", label: "Contact leads", icon: Mail },
  { key: "waitlist", to: "/waitlist", label: "Waitlist", icon: Inbox },
];

const fmt = (n) => {
  if (typeof n !== "number") return n ?? "—";
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const { data: kpis } = await adminClient.get("/dashboard/kpis");
        if (!cancel) setData(kpis);
      } catch (e) {
        if (!cancel) setErr(e?.response?.data?.detail || e.message);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const dbDown = err && /unavailable|unreachable|timeout|replica/i.test(err);

  return (
    <div data-testid="admin-dashboard">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-eyebrow">Overview</p>
          <h1 className="mt-1 font-display text-3xl text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-[#A0A0A5]">
            Live counts from the shared database.
          </p>
        </div>
        {data?.revenue_lifetime !== undefined && (
          <div className="card-rk rounded-xl px-5 py-3">
            <p className="text-xs text-[#A0A0A5]">Lifetime revenue</p>
            <p className="font-display text-2xl text-white">
              ₹{Number(data.revenue_lifetime || 0).toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>

      {dbDown && (
        <div className="mt-6 card-rk rounded-xl p-5 border-yellow-500/30 bg-yellow-500/[0.05]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="font-display text-base text-white">
                Database not reachable
              </p>
              <p className="mt-1 text-sm text-[#C7C7CC]">
                Atlas is timing out from this server. Whitelist{" "}
                <code>0.0.0.0/0</code> in Atlas → Network Access, then refresh.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CARDS.map((c) => {
          const total = data?.counts?.[c.key];
          const today = data?.today?.[c.key];
          return (
            <Link
              key={c.key}
              to={c.to}
              data-testid={`kpi-${c.key}`}
              className="card-rk rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                  <c.icon className="w-4 h-4 text-[#D9A93D]" />
                </div>
                {typeof today === "number" && today > 0 && (
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#D9A93D] inline-flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +{today} today
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs text-[#A0A0A5]">{c.label}</p>
                <p className="mt-1 font-display text-2xl text-white">
                  {loading ? "—" : fmt(total)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        <div className="card-rk rounded-xl p-5">
          <p className="label-eyebrow">Operations queue</p>
          <h3 className="mt-2 font-display text-lg text-white">
            What needs eyes
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <Link to="/kyc" className="text-white/90 hover:text-white">
                KYC submissions awaiting review
              </Link>
              <span className="text-[#D9A93D]">{fmt(data?.counts?.kyc)}</span>
            </li>
            <li className="flex items-center justify-between">
              <Link to="/sos" className="text-white/90 hover:text-white">
                SOS events
              </Link>
              <span className="text-[#D9A93D]">{fmt(data?.counts?.sos)}</span>
            </li>
            <li className="flex items-center justify-between">
              <Link to="/tickets" className="text-white/90 hover:text-white">
                Open support tickets
              </Link>
              <span className="text-[#D9A93D]">{fmt(data?.counts?.tickets)}</span>
            </li>
            <li className="flex items-center justify-between">
              <Link to="/payouts" className="text-white/90 hover:text-white">
                Payouts pending
              </Link>
              <span className="text-[#D9A93D]">{fmt(data?.counts?.payouts)}</span>
            </li>
          </ul>
        </div>

        <div className="card-rk rounded-xl p-5">
          <p className="label-eyebrow">Marketing leads</p>
          <h3 className="mt-2 font-display text-lg text-white">
            Pipeline from therakshak.in
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <Link to="/contacts" className="text-white/90 hover:text-white">
                Contact submissions
              </Link>
              <span className="text-[#D9A93D]">{fmt(data?.counts?.contacts)}</span>
            </li>
            <li className="flex items-center justify-between">
              <Link to="/waitlist" className="text-white/90 hover:text-white">
                Early-access signups
              </Link>
              <span className="text-[#D9A93D]">{fmt(data?.counts?.waitlist)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
