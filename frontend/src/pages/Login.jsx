import React from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Bell,
  CheckCircle2,
} from "lucide-react";
import DownloadButtons from "@/components/DownloadButtons";
import WaitlistForm from "@/components/WaitlistForm";

/**
 * Public "Login" page.
 * Per product decision: customers and guards do NOT have a web login.
 * Authentication lives in the mobile app. This screen explains that
 * and routes them to download (or the early-access waitlist until launch).
 *
 * The ONLY web login on the project is the admin login at
 * admin.therakshak.in (served from the same React build by host-based routing).
 */
export default function Login() {
  return (
    <section
      data-testid="login-page"
      className="relative border-b border-[#D9A93D]/10 min-h-[80vh]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(217,169,61,0.16),transparent_55%)]" />

      <div className="max-w-3xl mx-auto px-5 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <Link
          to="/"
          data-testid="login-back"
          className="inline-flex items-center gap-2 text-sm text-[#A0A0A5] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9A93D]/25 bg-[#D9A93D]/[0.06]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A93D]" />
            <span className="text-xs tracking-[0.18em] uppercase text-[#D9A93D] font-medium">
              Sign in on the app
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl text-white leading-[1.05] font-medium">
            RAKSHAK runs on the <span className="gold-text">mobile app.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-[#C7C7CC] max-w-xl mx-auto">
            Sign-in, OTP, bookings, live tracking, payouts — everything lives
            inside the RAKSHAK app. Download it to sign in or sign up.
          </p>

          <div className="mt-9 flex justify-center">
            <DownloadButtons testIdPrefix="login-download" />
          </div>
          <p className="mt-3 text-xs text-[#A0A0A5]">
            Apps coming soon · Be first in line on launch day
          </p>

          <div className="mt-10 max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D9A93D] mb-3">
              Notify me on launch
            </p>
            <WaitlistForm
              source="login"
              role="customer"
              variant="stacked"
              testIdPrefix="login-waitlist"
            />
          </div>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Smartphone,
              title: "App-first by design",
              desc: "Live tracking, SOS and OTP need a phone. The web is for discovery — the app is for action.",
            },
            {
              icon: ShieldCheck,
              title: "Safer sign-in",
              desc: "Phone-OTP + device binding inside the app — harder to phish than a web password.",
            },
            {
              icon: Bell,
              title: "Real-time alerts",
              desc: "Booking, ETA, SOS and payout notifications — only the app delivers them instantly.",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              data-testid={`login-feature-${i + 1}`}
              className="card-rk rounded-xl p-5"
            >
              <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <f.icon className="w-4 h-4 text-[#D9A93D]" />
              </div>
              <p className="mt-4 font-display text-sm text-white">{f.title}</p>
              <p className="mt-2 text-xs text-[#A0A0A5] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-[#A0A0A5]">
          <CheckCircle2 className="w-3.5 h-3.5 inline-block mr-1 text-[#D9A93D]" />
          The only web sign-in on RAKSHAK is for internal admins, on a
          separate domain. It is not linked from this site.
        </div>
      </div>
    </section>
  );
}
