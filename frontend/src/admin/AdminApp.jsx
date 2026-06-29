import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";

import { AdminAuthProvider, useAdminAuth } from "@/admin/AdminAuthContext";
import AdminLogin from "@/admin/AdminLogin";
import AdminLayout from "@/admin/AdminLayout";
import Dashboard from "@/admin/pages/Dashboard";
import ModulePage from "@/admin/pages/ModulePage";

const MODULES = [
  "users",
  "guards",
  "bookings",
  "orders",
  "transactions",
  "categories",
  "cities",
  "pricing",
  "coupons",
  "tickets",
  "kyc",
  "sos",
  "payouts",
  "settlements",
  "settings",
  "audit_log",
  "contacts",
  "waitlist",
];

function Guarded({ children }) {
  const { admin, checking } = useAdminAuth();
  const loc = useLocation();
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#A0A0A5]">
        Loading…
      </div>
    );
  }
  if (!admin) {
    const next = encodeURIComponent(loc.pathname + loc.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return children;
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" theme="dark" />
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/"
            element={
              <Guarded>
                <AdminLayout />
              </Guarded>
            }
          >
            <Route index element={<Dashboard />} />
            {MODULES.map((m) => (
              <Route key={m} path={m} element={<ModulePage module={m} />} />
            ))}
            <Route path="reports" element={<ModulePage module="reports" title="Reports" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}
