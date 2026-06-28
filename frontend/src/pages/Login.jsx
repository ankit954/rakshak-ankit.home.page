import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  ArrowRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

const CARDS = [
  {
    to: "/book",
    icon: ShieldCheck,
    eyebrow: "I need protection",
    title: "Book a Guard",
    desc: "Choose a guard type, location and time. Pay securely. Track live.",
    cta: "Continue as Customer",
    testId: "login-card-customer",
    primary: true,
  },
  {
    to: "/become-a-guard",
    icon: Users,
    eyebrow: "I want to earn",
    title: "Work as a Guard",
    desc: "Ex-Army, Ex-Police or PSARA-trained? Accept jobs, earn weekly to bank.",
    cta: "Continue as Guard",
    testId: "login-card-guard",
    primary: false,
  },
];

export default function Login() {
  return (
    <section
      data-testid="login-page"
      className="relative border-b border-[#D9A93D]/10 min-h-[80vh]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(217,169,61,0.16),transparent_55%)]" />

      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <Link
          to="/"
          data-testid="login-back"
          className="inline-flex items-center gap-2 text-sm text-[#A0A0A5] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="mt-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9A93D]/25 bg-[#D9A93D]/[0.06]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A93D]" />
            <span className="text-xs tracking-[0.18em] uppercase text-[#D9A93D] font-medium">
              Continue to RAKSHAK
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl text-white leading-[1.05] font-medium">
            How would you like to{" "}
            <span className="gold-text">use RAKSHAK?</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#A0A0A5]">
            Pick the path that fits you. You can always switch later.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {CARDS.map((c) => (
            <Link
              key={c.testId}
              to={c.to}
              data-testid={c.testId}
              className={`group card-rk rounded-2xl p-8 flex flex-col ${
                c.primary
                  ? "border-[#D9A93D]/40 shadow-[0_8px_32px_rgba(217,169,61,0.08)]"
                  : ""
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <c.icon className="w-6 h-6 text-[#D9A93D]" strokeWidth={1.6} />
              </div>
              <p className="mt-6 label-eyebrow">{c.eyebrow}</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl text-white font-medium">
                {c.title}
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#A0A0A5] leading-relaxed">
                {c.desc}
              </p>
              <div className="mt-8 inline-flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-2 text-sm font-medium ${
                    c.primary ? "text-[#D9A93D]" : "text-white"
                  }`}
                >
                  {c.cta}
                </span>
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 ${
                    c.primary ? "text-[#D9A93D]" : "text-white"
                  }`}
                />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[#A0A0A5]">
          By continuing you agree to our{" "}
          <Link
            to="/terms"
            className="text-[#D9A93D] hover:text-[#E8C366] underline-offset-4 hover:underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="text-[#D9A93D] hover:text-[#E8C366] underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
