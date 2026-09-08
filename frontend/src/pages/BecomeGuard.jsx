import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Banknote,
  Calendar,
  ArrowRight,
  Smartphone,
  UserPlus,
  FileCheck,
  CheckCircle2,
  Star,
  Users,
  Wallet,
  Gift,
  Scale,
  IdCard,
  Crown,
  BadgeCheck,
  GraduationCap as GraduationGuard,
} from "lucide-react";
import Section from "@/components/Section";
import DownloadButtons from "@/components/DownloadButtons";

const ELIGIBILITY = [
  {
    icon: Crown,
    title: "Ex-Army",
    desc: "Discharge certificate + identity proof.",
  },
  {
    icon: ShieldCheck,
    title: "Ex-Police / Paramilitary",
    desc: "Service record + identity proof.",
  },
  {
    icon: Award,
    title: "Lady Bodyguard",
    desc: "Certified from a recognised agency",
  },
  {
    icon: BadgeCheck,
    title: "Experienced Security Pro",
    desc: "2+ years documented private security experience.",
  },
];

const DOCS = [
  { icon: IdCard, label: "Aadhaar (KYC)" },
  { icon: FileCheck, label: "Police Verification Certificate (PVC)" },
  { icon: Award, label: "PSARA certificate (where applicable)" },
  { icon: ShieldCheck, label: "Service record / discharge papers" },
];

const BENEFITS = [
  {
    icon: Banknote,
    title: "Transparent Earnings",
    desc: "See your fee before you accept. Paid weekly to your bank — no middlemen, no skimming.",
  },
  {
    icon: Calendar,
    title: "Flexible Shifts",
    desc: "Accept jobs near you. Set your availability. Single-day, multi-day or recurring — your call.",
  },
  {
    icon: Scale,
    title: "Fair Dispatch",
    desc: "Round-robin matching means every verified guard gets a real shot at every job.",
  },
  {
    icon: Gift,
    title: "Referral Rewards",
    desc: "Refer guards or customers and earn — credited directly to your in-app wallet.",
  },
  {
    icon: Wallet,
    title: "Wallet + Earnings Tracking",
    desc: "Live earnings, tips, deductions and bank transfers — fully auditable, all in the app.",
  },
  {
    icon: Users,
    title: "Steady Gigs",
    desc: "A real pipeline of bookings from a trusted brand. Less hustle, more work.",
  },
];

const JOIN_STEPS = [
  {
    icon: Smartphone,
    title: "Download the app",
    desc: "Get RAKSHAK from Google Play. iOS coming soon.",
  },
  {
    icon: UserPlus,
    title: "Sign up",
    desc: "Quick OTP signup with your mobile number.",
  },
  {
    icon: FileCheck,
    title: "Complete KYC",
    desc: "Upload Aadhaar, PVC, PSARA & service records. Selfie verification.",
  },
  {
    icon: CheckCircle2,
    title: "Get verified",
    desc: "Our compliance team verifies within 72 hours.",
  },
  {
    icon: Star,
    title: "Start accepting jobs",
    desc: "Go online. Accept bookings near you. Earn on your terms.",
  },
];

export default function BecomeGuard() {
  return (
    <>
      {/* HERO */}
      <section
        data-testid="recruit-hero"
        className="relative overflow-hidden border-b border-[#D9A93D]/10"
      >
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1615482317235-b7e982e63ba0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBzZWN1cml0eSUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3ODI1NjU3Mjd8MA&ixlib=rb-4.1.0&q=85"
            alt=""
            className="w-full h-full object-cover object-right opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/80 to-[#0B0B0D]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(217,169,61,0.18),transparent_55%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9A93D]/25 bg-[#D9A93D]/[0.06]">
              <BadgeCheck className="w-3.5 h-3.5 text-[#D9A93D]" />
              <span className="text-xs tracking-[0.18em] uppercase text-[#D9A93D] font-medium">
                Recruiting · Delhi NCR
              </span>
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.98] font-medium">
              Work as a verified
              <br />
              <span className="gold-text">bodyguard.</span> Earn on your terms.
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-[#C7C7CC] leading-relaxed">
              Steady gigs. Transparent earnings. Fair dispatch. RAKSHAK is built
              with the people who protect — not against them.
            </p>
            <div className="mt-9">
              <DownloadButtons testIdPrefix="recruit-hero-download" />
              <p data-testid="recruit-app-availability" className="mt-3 text-xs text-[#A0A0A5]">
                Now on Google Play · iOS coming soon
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 max-w-md gap-4">
              <div data-testid="stat-1">
                <p className="font-display text-3xl text-white">₹40k+</p>
                <p className="text-xs text-[#A0A0A5] mt-1">
                  Avg. top-quartile monthly earnings
                </p>
              </div>
              <div data-testid="stat-2">
                <p className="font-display text-3xl text-white">72h</p>
                <p className="text-xs text-[#A0A0A5] mt-1">
                  Verification turnaround
                </p>
              </div>
              <div data-testid="stat-3">
                <p className="font-display text-3xl text-white">100%</p>
                <p className="text-xs text-[#A0A0A5] mt-1">
                  Payouts to your bank
                </p>
              </div>
            </div>
          </div>

          {/* Payout card */}
          <div className="md:col-span-5 hidden md:block">
            <div className="relative">
              <div className="absolute -top-8 -right-6 w-44 h-44 rounded-full bg-[#D9A93D]/15 blur-3xl" />
              <div className="relative card-rk rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <p className="label-eyebrow">This week</p>
                  <span className="text-xs text-[#D9A93D]">Live</span>
                </div>
                <p className="mt-3 font-display text-4xl text-white">
                  ₹14,250
                </p>
                <p className="text-sm text-[#A0A0A5]">
                  6 shifts · 2 tips · 1 referral bonus
                </p>
                <div className="mt-5 h-px gold-rule" />
                <div className="mt-5 space-y-3">
                  {[
                    { l: "Mon · Bouncer · Wedding", v: "₹2,800" },
                    { l: "Wed · Guard+Driver · HNI", v: "₹3,400" },
                    { l: "Fri · Lady BG · Travel", v: "₹2,100" },
                    { l: "Referral bonus", v: "₹500" },
                  ].map((row) => (
                    <div
                      key={row.l}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[#C7C7CC]">{row.l}</span>
                      <span className="text-white font-medium">{row.v}</span>
                    </div>
                  ))}
                </div>
                <button data-testid="recruit-payout-bank-button" className="mt-6 w-full btn-gold rounded-lg py-2.5 text-sm">
                  Deposited In Bank
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO CAN JOIN */}
      <Section
        testId="eligibility-section"
        eyebrow="Who can join"
        title="If you've served, you belong here."
        subtitle="We recruit a small, sharp pool of professionals. The bar is high — and that's the point."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ELIGIBILITY.map((e, i) => (
            <div
              key={e.title}
              data-testid={`eligibility-${i + 1}`}
              className="card-rk rounded-xl p-7"
            >
              <div className="w-12 h-12 rounded-lg bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <e.icon className="w-5 h-5 text-[#D9A93D]" strokeWidth={1.6} />
              </div>
              <h3 data-testid={`eligibility-title-${i + 1}`} className="mt-5 font-display text-lg text-white">{e.title}</h3>
              <p data-testid={`eligibility-description-${i + 1}`} className="mt-2 text-sm text-[#A0A0A5] leading-relaxed">
                {e.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 card-rk rounded-xl p-7">
          <p className="label-eyebrow">Required documents</p>
          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {DOCS.map((d, i) => (
              <div
                key={d.label}
                data-testid={`doc-${i + 1}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#D9A93D]/15 bg-white/[0.02]"
              >
                <d.icon className="w-4 h-4 text-[#D9A93D]" />
                <span className="text-sm text-white/90">{d.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#A0A0A5]">
            18+ only. All applicants undergo Aadhaar KYC + police verification
            before activation.
          </p>
        </div>
      </Section>

      {/* BENEFITS */}
      <Section
        testId="benefits-section"
        eyebrow="Why RAKSHAK"
        title={
          <>
            Built around guards —
            <br />
            <span className="gold-text">not extracted from them.</span>
          </>
        }
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              data-testid={`benefit-${i + 1}`}
              className="card-rk rounded-xl p-7"
            >
              <div className="w-11 h-11 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <b.icon className="w-5 h-5 text-[#D9A93D]" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-display text-lg text-white">{b.title}</h3>
              <p className="mt-2 text-sm text-[#A0A0A5] leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW TO JOIN */}
      <Section
        testId="join-steps"
        eyebrow="How to join"
        title="Five steps to your first shift."
      >
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-[#D9A93D]/30 to-transparent" />
          <div className="grid md:grid-cols-5 gap-5">
            {JOIN_STEPS.map((s, i) => (
              <div
                key={s.title}
                data-testid={`join-step-${i + 1}`}
                className="relative card-rk rounded-xl p-6"
              >
                <div className="relative w-12 h-12 rounded-full bg-[#0B0B0D] border border-[#D9A93D]/40 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-[#D9A93D]" strokeWidth={1.6} />
                </div>
                <p className="mt-4 label-eyebrow">Step 0{i + 1}</p>
                <h3 className="mt-1 font-display text-base text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[#A0A0A5] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TRUST/QUALITY NOTE */}
      <Section
        testId="quality-note"
        eyebrow="Standards"
        title="Professional. Police-verified. Period."
        subtitle="RAKSHAK is a closed network. Every guard you serve alongside has cleared the same bar — so the badge actually means something."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: BadgeCheck,
              title: "100% Police-Verified",
              desc: "No exceptions. No grey areas.",
            },
            {
              icon: GraduationGuard,
              title: "Trained Conduct",
              desc: "Professionalism is enforced, not assumed.",
            },
            {
              icon: ShieldCheck,
              title: "Audited Engagements",
              desc: "Every job is logged. Every issue, owned.",
            },
          ].map((n, i) => (
            <div
              key={n.title}
              data-testid={`standard-${i + 1}`}
              className="card-rk rounded-xl p-7"
            >
              <div className="w-11 h-11 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <n.icon className="w-5 h-5 text-[#D9A93D]" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-display text-lg text-white">{n.title}</h3>
              <p className="mt-2 text-sm text-[#A0A0A5] leading-relaxed">
                {n.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section
        data-testid="recruit-final-cta"
        className="relative overflow-hidden py-24 md:py-32"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B0B0D] via-[#121013] to-[#0B0B0D]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(217,169,61,0.18),transparent_55%)]" />
        <div className="max-w-5xl mx-auto px-5 md:px-10 text-center">
          <p className="label-eyebrow">Join as a guard</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.05]">
            The job is hard.
            <br />
            <span className="gold-text">The path shouldn&apos;t be.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-[#A0A0A5] max-w-2xl mx-auto">
            Download RAKSHAK. Submit your docs. Start earning the moment
            we verify.
          </p>
          <div className="mt-9 flex justify-center">
            <DownloadButtons testIdPrefix="recruit-cta-download" />
          </div>
          <div className="mt-8">
            <Link
              to="/contact"
              data-testid="recruit-questions-link"
              className="inline-flex items-center gap-2 text-sm text-[#D9A93D] hover:text-[#E8C366]"
            >
              Have questions? Talk to recruitment{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
