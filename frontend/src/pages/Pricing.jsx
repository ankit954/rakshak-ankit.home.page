import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Heart,
  Car,
  Sparkles,
  ArrowRight,
  Info,
  Moon,
  Building2,
  Ticket,
} from "lucide-react";
import Section from "@/components/Section";
import DownloadButtons from "@/components/DownloadButtons";
import { COMPANY } from "@/config/company";

const TIERS = [
  {
    icon: ShieldCheck,
    title: "Uniformed Guard",
    starting: 599,
    unit: "per 2 hours",
    hourly: 299,
    daily: 2199,
    tag: null,
    inclusions: [
      "Police-verified, Aadhaar-KYC guard",
      "Static or roving post duties",
      "Live tracking + family share",
      "24×7 SOS routing",
    ],
  },
  {
    icon: Heart,
    title: "Lady Bodyguard",
    starting: 999,
    unit: "per 2 hours",
    hourly: 499,
    daily: 3499,
    tag: "Most requested",
    inclusions: [
      "Trained female personnel",
      "Late-night travel & errands",
      "Personal companionship / discreet detail",
      "Live tracking + family share",
    ],
  },
  {
    icon: Users,
    title: "Bouncer",
    starting: 1199,
    unit: "per 2 hours",
    hourly: 599,
    daily: 3999,
    tag: null,
    inclusions: [
      "Crowd, door and guest-list control",
      "High-traffic events & venues",
      "De-escalation trained",
      "Team booking discounts",
    ],
  },
  {
    icon: Car,
    title: "Guard + Driver",
    starting: 1799,
    unit: "per 4 hours",
    hourly: 599,
    daily: 4999,
    tag: null,
    inclusions: [
      "Trained chauffeur + protection",
      "Door-to-door safety",
      "Multi-stop itineraries",
      "Convoy-ready on request",
    ],
  },
];

export default function Pricing() {
  const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
  return (
    <>
      {/* HERO */}
      <section
        data-testid="pricing-hero"
        className="relative overflow-hidden border-b border-[#D9A93D]/10"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(217,169,61,0.15),transparent_55%)]" />
        <div className="max-w-5xl mx-auto px-5 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9A93D]/25 bg-[#D9A93D]/[0.06]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A93D]" />
            <span className="text-xs tracking-[0.18em] uppercase text-[#D9A93D] font-medium">
              Transparent pricing
            </span>
          </div>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl text-white leading-[1.02] font-medium">
            Fair rates. <span className="gold-text">No hidden fees.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-[#C7C7CC] leading-relaxed">
            RAKSHAK bookings start from <b>{inr(599)}</b> for a 2-hour uniformed
            guard shift. Final fare — including any night surcharge, extra
            hours or GST — is shown inside the app before you confirm
            payment. What you see is what you pay.
          </p>
        </div>
      </section>

      {/* PRICING TABLE */}
      <Section testId="pricing-table" eyebrow="Categories" title="Starting prices by guard type">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((t, i) => (
            <div
              key={t.title}
              data-testid={`price-card-${i + 1}`}
              className={`card-rk rounded-2xl p-6 flex flex-col ${
                t.tag ? "border-[#D9A93D]/40" : ""
              }`}
            >
              {t.tag && (
                <span className="self-start inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#0B0B0D] bg-[#D9A93D] px-2 py-1 rounded-full font-semibold">
                  <Ticket className="w-3 h-3" /> {t.tag}
                </span>
              )}
              <div className="mt-4 w-11 h-11 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <t.icon className="w-5 h-5 text-[#D9A93D]" />
              </div>
              <h3 className="mt-5 font-display text-lg text-white">
                {t.title}
              </h3>
              <p className="mt-3">
                <span className="font-display text-3xl text-white">
                  {inr(t.starting)}
                </span>
                <span className="ml-1 text-xs text-[#A0A0A5]">/ {t.unit}</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#C7C7CC]">
                {t.inclusions.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D9A93D]" />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-[#D9A93D]/10 text-xs text-[#A0A0A5]">
                Hourly extension: <span className="text-white">{inr(t.hourly)}</span> · Full-day (10h):{" "}
                <span className="text-white">{inr(t.daily)}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* NIGHT + GST + WHAT'S INCLUDED */}
      <Section testId="pricing-notes" eyebrow="What&rsquo;s inside the price" title="What you pay for, and what you don&rsquo;t">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: "Included",
              points: [
                "Police-verified, Aadhaar-KYC guard on duty",
                "Live tracking + shareable trip link",
                "24×7 SOS routed to our ops team",
                "Booking confirmation, OTP start/end verification",
                "In-app receipt & GST invoice",
              ],
            },
            {
              icon: Moon,
              title: "Night surcharge",
              points: [
                "A 15% night surcharge applies to bookings whose start OR end time falls between 22:00 and 06:00 IST.",
                "The surcharge is shown separately on the fare screen before you pay.",
                "No surcharge on standard daytime bookings.",
              ],
            },
            {
              icon: Info,
              title: "Taxes & fees",
              points: [
                "All prices are exclusive of GST unless stated.",
                "GST at 18% (Indian standard rate) applies where applicable.",
                "No booking fee. No card / UPI surcharge.",
                "No cancellation charge if you cancel before the free-cancellation window (see Refund Policy).",
              ],
            },
          ].map((box, i) => (
            <div key={box.title} data-testid={`pricing-note-${i + 1}`} className="card-rk rounded-xl p-6">
              <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <box.icon className="w-4 h-4 text-[#D9A93D]" />
              </div>
              <h3 className="mt-4 font-display text-lg text-white">
                {box.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#C7C7CC]">
                {box.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D9A93D]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ENTERPRISE */}
      <Section testId="pricing-enterprise" className="pt-0">
        <div className="card-rk rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-11 h-11 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#D9A93D]" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-white">
              Enterprise & event contracts
            </h3>
            <p className="mt-3 text-sm text-[#C7C7CC] leading-relaxed max-w-md">
              Bulk shifts, monthly residential detail, wedding-scale
              deployments and jewellery-transit contracts are priced on
              request with a written service level agreement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-start md:justify-end">
            <Link
              to="/contact"
              data-testid="pricing-enterprise-cta"
              className="btn-gold rounded-lg px-5 py-3 text-sm inline-flex items-center gap-2"
            >
              Request a quote <ArrowRight className="w-4 h-4" />
            </Link>
            <DownloadButtons testIdPrefix="pricing-download" />
          </div>
        </div>
      </Section>

      {/* SMALL PRINT */}
      <Section testId="pricing-fineprint" className="pt-0">
        <div className="text-xs text-[#A0A0A5] leading-relaxed max-w-3xl">
          Prices listed above are indicative starting fares as of{" "}
          {COMPANY.policiesUpdated}. The final amount payable is calculated in
          the RAKSHAK app on the fare screen shown before you tap{" "}
          <b>Confirm &amp; Pay</b>, and reflects the guard type, duration,
          location, time-of-day surcharge and applicable GST. RAKSHAK does not
          charge any hidden fees. For refunds and cancellations, see our{" "}
          <Link to="/refund-policy" className="text-[#D9A93D] hover:text-[#E8C366]">
            Refund &amp; Cancellation Policy
          </Link>
          .
        </div>
      </Section>
    </>
  );
}
