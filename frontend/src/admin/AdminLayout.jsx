import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileCheck2,
  CalendarCheck,
  Users,
  Shield,
  Receipt,
  Coins,
  ReceiptText,
  BarChart3,
  LayoutGrid,
  MapPin,
  Tags,
  Ticket,
  Settings,
  ScrollText,
  Siren,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Mail,
  Inbox,
} from "lucide-react";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import Logo from "@/components/Logo";

const GROUPS = [
  {
    label: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/kyc", label: "KYC Center", icon: FileCheck2 },
      { to: "/bookings", label: "Bookings", icon: CalendarCheck },
      { to: "/sos", label: "SOS Monitoring", icon: Siren },
      { to: "/tickets", label: "Tickets", icon: Ticket },
    ],
  },
  {
    label: "People",
    items: [
      { to: "/users", label: "Users", icon: Users },
      { to: "/guards", label: "Guards", icon: Shield },
    ],
  },
  {
    label: "Finance",
    items: [
      { to: "/transactions", label: "Transactions", icon: Receipt },
      { to: "/payouts", label: "Payouts", icon: Coins },
      { to: "/settlements", label: "Settlements", icon: ReceiptText },
      { to: "/reports", label: "Reports", icon: BarChart3 },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { to: "/categories", label: "Categories", icon: LayoutGrid },
      { to: "/cities", label: "Cities", icon: MapPin },
      { to: "/pricing", label: "Pricing", icon: Tags },
      { to: "/coupons", label: "Coupons", icon: Ticket },
    ],
  },
  {
    label: "Marketing leads",
    items: [
      { to: "/contacts", label: "Contact submissions", icon: Mail },
      { to: "/waitlist", label: "Waitlist", icon: Inbox },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/settings", label: "Settings", icon: Settings },
      { to: "/audit_log", label: "Audit Log", icon: ScrollText },
    ],
  },
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const loc = useLocation();

  const closeSidebar = () => setOpen(false);

  return (
    <div className="min-h-screen flex bg-[#0B0B0D]">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 inset-y-0 left-0 w-72 bg-[#0E0E11] border-r border-[#D9A93D]/10 transform transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        data-testid="admin-sidebar"
      >
        <div className="h-20 px-5 flex items-center justify-between border-b border-[#D9A93D]/10">
          <Link to="/" onClick={closeSidebar} className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="ml-1 px-2 py-0.5 text-[10px] tracking-[0.18em] uppercase border border-[#D9A93D]/30 rounded-full text-[#D9A93D]">
              Admin
            </span>
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            className="md:hidden text-white/80"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="px-3 py-4 overflow-y-auto h-[calc(100vh-5rem)]">
          {GROUPS.map((g) => (
            <div key={g.label} className="mb-5">
              <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] text-[#A0A0A5]">
                {g.label}
              </p>
              <ul className="space-y-0.5">
                {g.items.map((it) => (
                  <li key={it.to}>
                    <NavLink
                      to={it.to}
                      end={it.exact}
                      onClick={closeSidebar}
                      data-testid={`nav-${it.to.replace(/\W+/g, "-").replace(/^-/, "") || "dashboard"}`}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-[#D9A93D]/10 text-[#D9A93D]"
                            : "text-white/80 hover:bg-white/[0.04] hover:text-white"
                        }`
                      }
                    >
                      <it.icon className="w-4 h-4" strokeWidth={1.6} />
                      {it.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main column */}
      <div className="flex-1 min-w-0">
        <header className="h-20 px-5 md:px-8 flex items-center gap-3 border-b border-[#D9A93D]/10 bg-[#0B0B0D]">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#D9A93D]/20 text-white"
            aria-label="Open sidebar"
            data-testid="admin-sidebar-toggle"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#A0A0A5]">{loc.pathname}</p>
            <p className="font-display text-lg text-white truncate">
              {GROUPS.flatMap((g) => g.items).find((i) =>
                i.exact ? loc.pathname === i.to : loc.pathname.startsWith(i.to),
              )?.label || "Admin"}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              data-testid="admin-profile-toggle"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D9A93D]/20 hover:border-[#D9A93D]/50 text-sm"
            >
              <span className="w-7 h-7 rounded-full bg-[#D9A93D] text-[#0B0B0D] font-semibold inline-flex items-center justify-center">
                {(admin?.email || "?").slice(0, 1).toUpperCase()}
              </span>
              <span className="hidden sm:inline text-white">{admin?.email}</span>
              <ChevronDown className="w-4 h-4 text-[#A0A0A5]" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 card-rk rounded-lg p-2 z-20">
                <div className="px-3 py-2 text-xs text-[#A0A0A5]">
                  Signed in as
                </div>
                <div className="px-3 pb-2 text-sm text-white truncate">
                  {admin?.email}
                </div>
                <div className="border-t border-[#D9A93D]/10 my-1" />
                <button
                  type="button"
                  onClick={logout}
                  data-testid="admin-logout"
                  className="w-full inline-flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/5 rounded-md"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-5 md:p-8" data-testid="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
