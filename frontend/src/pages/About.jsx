import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Compass,
  Eye,
  ShieldCheck,
  Heart,
  Users,
  Scale,
  Sparkles,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Section from "@/components/Section";
import DownloadButtons from "@/components/DownloadButtons";
import { COMPANY } from "@/config/company";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Safety, non-negotiable",
    desc: "We don't trade speed for shortcuts. Every booking is verified, audited, accountable.",
  },
  {
    icon: Scale,
    title: "Fair, by design",
    desc: "Transparent earnings for guards, transparent pricing for clients. No middlemen.",
  },
  {
    icon: Heart,
    title: "Dignity in service",
    desc: "Guards are professionals — not gig fodder. We build with them, not on top of them.",
  },
  {
    icon: Sparkles,
    title: "Quietly excellent",
    desc: "The best protection feels like nothing happened. We design for invisibility.",
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "The conversation that started RAKSHAK",
    desc: "After a friend's late-night cab incident in Delhi, a small team asked: why is hiring a verified bodyguard harder than hiring a cab?",
  },
  {
    year: "2025 · Q1",
    title: "Compliance & PSARA partnerships",
    desc: "Onboarded police verification workflows, PSARA-recognised training partners and identity-bound KYC.",
  },
  {
    year: "2025 · Q2",
    title: "Closed pilot in Gurugram",
    desc: "200+ bookings across weddings, women's-safety transit and HNI residences. NPS hit 78.",
  },
  {
    year: "2025 · Q4",
    title: "RAKSHAK launches in Delhi NCR",
    desc: "Apps drop on Play Store and App Store with full live tracking, SOS, and instant assignment.",
  },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section
        data-testid="about-hero"
        className="relative overflow-hidden border-b border-[#D9A93D]/10"
      >
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/8425350/pexels-photo-8425350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D]/85 to-[#0B0B0D]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,169,61,0.18),transparent_55%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-10 pt-20 pb-20 md:pt-32 md:pb-24 text-center">
          <p className="label-eyebrow">About RAKSHAK</p>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.98] font-medium">
            Personal protection,
            <br />
            <span className="gold-text">finally professionalised.</span>
          </h1>
          <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-[#C7C7CC] leading-relaxed">
            RAKSHAK exists to make verified, trained protection as easy to book
            as a ride — without ever compromising the standards that safety
            actually demands.
          </p>
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-xs text-[#A0A0A5]">
            <span className="px-3 py-1 rounded-full border border-[#D9A93D]/20 bg-white/[0.02]">
              A RAKSHAK service
            </span>
            <span className="px-3 py-1 rounded-full border border-[#D9A93D]/20 bg-white/[0.02]">
              City of operation: {COMPANY.serviceRegion}
            </span>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / WHY */}
      <Section testId="about-pillars">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Target,
              eyebrow: "Mission",
              title: "Democratise verified safety.",
              desc: "Bring police-verified, trained protection within a tap for every Indian who needs it — not just those with private detail.",
            },
            {
              icon: Compass,
              eyebrow: "Vision",
              title: "India's most trusted safety layer.",
              desc: "The default rail for personal, event and high-value security across South Asia by 2030.",
            },
            {
              icon: Eye,
              eyebrow: "How we operate",
              title: "Verify. Train. Audit. Repeat.",
              desc: "Every guard, every booking, every shift — logged, reviewed and improved. No vibes-based security.",
            },
          ].map((p, i) => (
            <div
              key={p.eyebrow}
              data-testid={`pillar-${i + 1}`}
              className="card-rk rounded-xl p-8"
            >
              <div className="w-11 h-11 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-[#D9A93D]" />
              </div>
              <p className="mt-5 label-eyebrow">{p.eyebrow}</p>
              <h3 className="mt-2 font-display text-xl text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-[#A0A0A5] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* STORY / TIMELINE */}
      <Section
        testId="about-timeline"
        eyebrow="The story"
        title="From a 2 AM phone call to a national safety platform."
      >
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D9A93D]/40 to-transparent md:-translate-x-px" />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <div
                key={t.year}
                data-testid={`timeline-${i + 1}`}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div className="pl-12 md:pl-0 md:pr-0">
                  <div
                    className={`card-rk rounded-xl p-6 ${
                      i % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    <p className="label-eyebrow">{t.year}</p>
                    <h3 className="mt-2 font-display text-lg text-white">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#A0A0A5] leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block" />
                <span className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-[#D9A93D] ring-4 ring-[#0B0B0D]" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section
        testId="about-values"
        eyebrow="What we believe"
        title="Four values. No compromises."
      >
        <div className="grid md:grid-cols-2 gap-5">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              data-testid={`value-${i + 1}`}
              className="card-rk rounded-xl p-7 flex gap-5"
            >
              <div className="w-12 h-12 shrink-0 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <v.icon className="w-5 h-5 text-[#D9A93D]" />
              </div>
              <div>
                <h3 className="font-display text-lg text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-[#A0A0A5] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PRESENCE */}
      <Section
        testId="about-presence"
        eyebrow="Where we are"
        title="Delhi NCR, day one. India next."
        subtitle="We're rolling out city-by-city — with full ops, compliance and ground presence in each market before we open it."
      >
        <div className="card-rk rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 text-[#D9A93D]">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Active markets</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Delhi", "Gurugram", "Noida", "Ghaziabad", "Faridabad"].map(
                (c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-full text-sm border border-[#D9A93D]/25 bg-[#D9A93D]/[0.05] text-white"
                  >
                    {c}
                  </span>
                ),
              )}
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#A0A0A5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0A0A5]" />
              <span className="text-sm">Coming next</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Mumbai", "Bengaluru", "Hyderabad", "Chandigarh", "Jaipur"].map(
                (c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-full text-sm border border-white/10 bg-white/[0.02] text-[#A0A0A5]"
                  >
                    {c}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { l: "Verified guards (pilot)", v: "300+" },
              { l: "Booking categories", v: "8" },
              { l: "Avg. response", v: "<15m" },
              { l: "Pilot NPS", v: "78" },
              { l: "Cities by 2026", v: "12" },
              { l: "Hours logged", v: "40k+" },
            ].map((s, i) => (
              <div
                key={s.l}
                data-testid={`presence-stat-${i + 1}`}
                className="rounded-lg border border-[#D9A93D]/10 p-4"
              >
                <p className="font-display text-2xl text-white">{s.v}</p>
                <p className="text-xs text-[#A0A0A5] mt-1 leading-snug">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section
        data-testid="about-cta"
        className="relative overflow-hidden py-24 md:py-28"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B0B0D] via-[#121013] to-[#0B0B0D]" />
        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-white font-medium leading-[1.05]">
            Build a safer India <span className="gold-text">with us.</span>
          </h2>
          <p className="mt-5 text-base text-[#A0A0A5] max-w-xl mx-auto">
            Whether you need protection or you provide it — RAKSHAK is the
            shortest path from intent to safety.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <DownloadButtons testIdPrefix="about-cta-download" />
            <Link
              to="/become-a-guard"
              data-testid="about-recruit-link"
              className="btn-ghost-gold rounded-lg px-5 py-3 inline-flex items-center gap-2 text-sm"
            >
              Become a Guard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}