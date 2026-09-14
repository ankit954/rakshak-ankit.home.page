import React from "react";
import { Link } from "react-router-dom";
import {
  LifeBuoy,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  Book,
  Search,
} from "lucide-react";
import Section from "@/components/Section";
import { COMPANY, formatFullAddress } from "@/config/company";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const GROUPS = [
  {
    title: "Booking",
    items: [
      {
        q: "How do I book a RAKSHAK guard?",
        a: "Download the RAKSHAK app from Google Play (iOS coming soon), sign in with your mobile number, choose a guard category, set the date, time and location, review the fare and confirm payment. A verified guard is assigned instantly for on-demand bookings; scheduled bookings show you the assigned guard up to 24 hours in advance.",
      },
      {
        q: "Do I need to log in on the website to book?",
        a: "No. Bookings, live tracking, OTP verification and payouts all happen inside the RAKSHAK mobile app for safety reasons. The website is for information only.",
      },
      {
        q: "Can I book for multiple days?",
        a: "Yes. You can book a single shift (2 hours or more), a full day (10 hours) or a recurring engagement (weekly / monthly). Multi-day and recurring bookings can be priced on request via the Contact page.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "UPI, RuPay / Visa / Mastercard debit and credit cards, popular Indian wallets, and net-banking. All payments are processed via PCI-compliant payment gateways. RAKSHAK does not store card or UPI credentials.",
      },
      {
        q: "Are there any hidden charges?",
        a: "No. The fare shown to you in the app before you tap “Confirm & Pay” is the final amount. Applicable GST and — where relevant — a night surcharge are shown separately on the same screen.",
      },
      {
        q: "Do I get a GST invoice?",
        a: "Yes. GST invoices are auto-generated inside the app after every completed booking and can be downloaded from your bookings history.",
      },
    ],
  },
  {
    title: "Cancellation & refunds",
    items: [
      {
        q: "Can I cancel a booking?",
        a: "Yes. Cancellations more than two (2) hours before the scheduled start are free. Cancellations within the two-hour window are charged 25% of the booking value as a guard-compensation fee. Full details are in our Refund & Cancellation Policy.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are auto-initiated to your original payment source and typically reflect in 5–7 business days depending on your bank. RAKSHAK-wallet refunds are instant.",
      },
    ],
  },
  {
    title: "Safety & verification",
    items: [
      {
        q: "How do I know the guard is genuine?",
        a: "Every guard on RAKSHAK clears Aadhaar-based KYC and a documented police-verification check before their first job. Their name, photo and rating are shown in-app once assigned.",
      },
      {
        q: "What if I feel unsafe during a booking?",
        a: "Tap the SOS button in the app. Our operations team is alerted immediately, your live location is shared with your registered emergency contacts, and — where required — we escalate to law enforcement. In any life-threatening situation always dial 112 first.",
      },
      {
        q: "Can my family follow along?",
        a: "Yes. Every active booking generates a shareable live-tracking link you can send to family or friends over WhatsApp / SMS.",
      },
    ],
  },
  {
    title: "Becoming a guard",
    items: [
      {
        q: "Who can join RAKSHAK as a guard?",
        a: "Ex-Army, Ex-Police / Paramilitary, PSARA-trained personnel and experienced private-security professionals aged 18 and above. You must complete Aadhaar KYC, provide a Police Verification Certificate (PVC) and, where applicable, a PSARA certificate.",
      },
      {
        q: "How am I paid?",
        a: "Earnings are shown transparently before you accept a job. Payouts are made weekly directly to your bank account. Tips and referral bonuses land in your in-app wallet in real time.",
      },
    ],
  },
];

export default function Support() {
  return (
    <>
      {/* HERO */}
      <section
        data-testid="support-hero"
        className="relative overflow-hidden border-b border-[#D9A93D]/10"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_10%,rgba(217,169,61,0.15),transparent_55%)]" />
        <div className="max-w-5xl mx-auto px-5 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9A93D]/25 bg-[#D9A93D]/[0.06]">
            <LifeBuoy className="w-3.5 h-3.5 text-[#D9A93D]" />
            <span className="text-xs tracking-[0.18em] uppercase text-[#D9A93D] font-medium">
              Help &amp; Support
            </span>
          </div>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl text-white leading-[1.02] font-medium">
            We&apos;ve got your <span className="gold-text">back.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-[#C7C7CC] leading-relaxed">
            Answers to the questions we hear most often, and the fastest ways
            to reach a human when you need one.
          </p>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <Section testId="support-contact" className="pt-14">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Mail,
              title: "Email support",
              value: COMPANY.supportEmail,
              href: `mailto:${COMPANY.supportEmail}`,
              note: "Fastest for account, billing and refund queries.",
            },
            {
              icon: Phone,
              title: "Phone support",
              value: COMPANY.supportPhone,
              href: `tel:${COMPANY.supportPhone.replace(/[^\d+]/g, "")}`,
              note: "Best for urgent booking or safety concerns.",
            },
            {
              icon: Clock,
              title: "Business hours",
              value: COMPANY.supportHours,
              href: null,
              note: `${COMPANY.serviceRegion} time (IST).`,
            },
          ].map((c, i) => (
            <div
              key={c.title}
              data-testid={`support-channel-${i + 1}`}
              className="card-rk rounded-xl p-6"
            >
              <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <c.icon className="w-4 h-4 text-[#D9A93D]" />
              </div>
              <p className="mt-4 label-eyebrow">{c.title}</p>
              {c.href ? (
                <a
                  href={c.href}
                  className="mt-1 font-display text-lg text-white hover:text-[#E8C366] break-all"
                >
                  {c.value}
                </a>
              ) : (
                <p className="mt-1 font-display text-lg text-white">{c.value}</p>
              )}
              <p className="mt-2 text-xs text-[#A0A0A5]">{c.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ GROUPS */}
      <Section testId="support-faqs" eyebrow="Frequently asked" title="Search by category">
        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-10">
          {GROUPS.map((g, gi) => (
            <div key={g.title} data-testid={`support-group-${gi + 1}`}>
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-4 h-4 text-[#D9A93D]" />
                <h2 className="font-display text-xl text-white">{g.title}</h2>
              </div>
              <Accordion type="single" collapsible>
                {g.items.map((f, i) => (
                  <AccordionItem
                    key={f.q}
                    value={`g${gi}-${i}`}
                    className="border-b border-[#D9A93D]/15"
                  >
                    <AccordionTrigger className="text-left text-white hover:no-underline py-4">
                      <span className="font-display text-sm md:text-base">
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#A0A0A5] text-sm leading-relaxed pb-4">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </Section>

      {/* RAISE A TICKET */}
      <Section testId="support-ticket" eyebrow="Still need help?" title="Raise a support ticket">
        <div className="card-rk rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm text-[#C7C7CC] leading-relaxed">
              For anything not answered above, or where you need a written
              paper-trail, email us. Please include:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#C7C7CC]">
              {[
                "Your registered mobile number",
                "The booking reference (if applicable)",
                "Screenshots or a short description of the issue",
                "Preferred callback time",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D9A93D]" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#A0A0A5]">
              We acknowledge every ticket within 48 hours and aim to resolve
              within 5 business days. For DPDP-related requests, see our
              Privacy Policy.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={`mailto:${COMPANY.supportEmail}`}
              data-testid="support-email-cta"
              className="btn-gold rounded-lg px-5 py-3 text-sm inline-flex items-center gap-2 self-start md:self-auto"
            >
              <Mail className="w-4 h-4" /> {COMPANY.supportEmail}
            </a>
            <Link
              to="/contact"
              data-testid="support-contact-cta"
              className="btn-ghost-gold rounded-lg px-5 py-3 text-sm inline-flex items-center gap-2 self-start md:self-auto"
            >
              Open the contact form <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section testId="support-address" className="pt-0">
        <div className="text-xs text-[#A0A0A5] leading-relaxed">
          Postal correspondence:{" "}
          <span className="text-white">{COMPANY.brandName}</span>,{" "}
          {formatFullAddress()}.
        </div>
      </Section>
    </>
  );
}
