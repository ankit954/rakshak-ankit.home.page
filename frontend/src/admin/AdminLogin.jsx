import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, LogIn, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await login(email.trim().toLowerCase(), password);
    setBusy(false);
    if (res.ok) {
      toast.success("Welcome back.");
      const next = new URLSearchParams(loc.search).get("next") || "/";
      navigate(next, { replace: true });
    } else {
      setErr(res.error);
    }
  };

  return (
    <div
      className="min-h-screen grid md:grid-cols-2"
      data-testid="admin-login-view"
    >
      {/* Left — brand panel */}
      <div className="relative hidden md:flex flex-col justify-between p-12 border-r border-[#D9A93D]/10 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(217,169,61,0.16),transparent_55%)]" />
        <div className="absolute inset-0 -z-10 grain" />
        <Logo size="md" />
        <div>
          <p className="label-eyebrow">Admin Console</p>
          <h1 className="mt-4 font-display text-4xl lg:text-5xl text-white leading-[1.05] font-medium">
            Eyes on every booking,
            <br />
            <span className="gold-text">guards on every street.</span>
          </h1>
          <p className="mt-6 text-sm text-[#A0A0A5] max-w-md leading-relaxed">
            Restricted area. Only authorised RAKSHAK personnel may sign in.
            All activity is logged.
          </p>
        </div>
        <div className="text-xs text-[#A0A0A5]">
          © {new Date().getFullYear()} RAKSHAK Technologies Pvt. Ltd.
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <form
          onSubmit={onSubmit}
          className="card-rk rounded-2xl p-8 w-full max-w-md"
          data-testid="admin-login-form"
        >
          <div className="md:hidden mb-6">
            <Logo size="md" />
          </div>
          <div className="w-12 h-12 rounded-lg bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#D9A93D]" />
          </div>
          <h2 className="mt-5 font-display text-2xl text-white">Sign in</h2>
          <p className="mt-1 text-sm text-[#A0A0A5]">
            Use your RAKSHAK admin credentials.
          </p>

          <div className="mt-6">
            <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
              Email
            </label>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="admin-email"
              placeholder="admin@therakshak.in"
              className="mt-2 w-full rounded-lg px-4 py-3 text-sm placeholder:text-white/30"
            />
          </div>

          <div className="mt-4">
            <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
              Password
            </label>
            <div className="mt-2 flex items-center gap-1 rounded-lg border border-[#D9A93D]/20 bg-white/[0.02] px-2">
              <input
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="admin-password"
                placeholder="••••••••"
                className="flex-1 bg-transparent border-0 py-3 px-2 text-sm placeholder:text-white/30 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="p-2 text-[#A0A0A5] hover:text-white"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {err && (
            <p
              className="mt-4 text-sm text-red-400"
              data-testid="admin-login-error"
            >
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            data-testid="admin-login-submit"
            className="mt-6 w-full btn-gold rounded-lg py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {busy ? "Signing in…" : (
              <>
                <LogIn className="w-4 h-4" /> Sign in
              </>
            )}
          </button>

          <p className="mt-6 text-xs text-[#A0A0A5]">
            Forgot the password? Rotate <code>ADMIN_PASSWORD</code> in{" "}
            <code>backend/.env</code> and restart the API.
          </p>
        </form>
      </div>
    </div>
  );
}
