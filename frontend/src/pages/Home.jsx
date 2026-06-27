import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  MapPin,
  CreditCard,
  Eye,
  BadgeCheck,
  Fingerprint,
  Radio,
  Siren,
  GraduationCap,
  ArrowRight,
  Sparkles,
  UserCheck,
  Crown,
  Car,
  Heart,
  Users,
  Briefcase,
  Plane,
  PackageOpen,
  Star,
} from "lucide-react";
import Section from "@/components/Section";
import DownloadButtons from "@/components/DownloadButtons";
import WaitlistForm from "@/components/WaitlistForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const TRUST_BADGES = [
  "100% Police-Verified",
  "Aadhaar KYC",
  "PSARA-Trained",
  "Assigned Instantly",
  "Live Tracking",
  "24×7 SOS",
  "Transparent Pricing",
];

const STEPS = [
  {
    n: "01",
    icon: UserCheck,
    title: "Choose your guard type",
    desc: "Uniformed, Bouncer, Lady Bodyguard or Guard + Driver — pick the protection that fits the moment.",
  },
  {
    n: "02",
    icon: MapPin,
    title: "Set location, date & time",
    desc: "Single visit, multi-day, or recurring. We plan around your schedule, not the other way around.",
  },
  {
    n: "03",
    icon: CreditCard,
    title: "Pay securely (UPI / Cash)",
    desc: "Transparent pricing, no hidden fees. A verified guard near you is assigned instantly.",
  },
  {
    n: "04",
    icon: Eye,
    title: "Track live & rate",
    desc: "Share the live link with family. Tap SOS anytime. Rate the service after — every job is auditable.",
  },
];

const TRUST_PILLARS = [
  {
    icon: BadgeCheck,
    title: "Police Verification",
    desc: "Every guard on RAKSHAK clears police verification before their first job.",
  },
  {
    icon: Fingerprint,
    title: "Aadhaar KYC",
    desc: "Identity bound to Aadhaar — the person who turns up is the person you booked.",
  },
  {
    icon: GraduationCap,
    title: "Trained Professionals",
    desc: "Ex-Army, Ex-Police and PSARA-certified personnel — drilled in conduct and crisis response.",
  },
  {
    icon: Radio,
    title: "Live Tracking",
    desc: "Real-time location on a shareable link. Loved ones stay in the loop.",
  },
  {
    icon: Siren,
    title: "24×7 SOS",
    desc: "One tap escalates to our central ops team and your emergency contacts.",
  },
  {
    icon: ShieldCheck,
    title: "Insured Engagements",
    desc: "Every booking is logged, audited and backed by service guarantees.",
  },
];

const USE_CASES = [
  {
    icon: Heart,
    title: "Weddings & Private Events",
    desc: "Guest screening, gift-counter watch, family detail — full coverage from baraat to vidaai.",
    img: "https://images.pexels.com/photos/34585117/pexels-photo-34585117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    span: "md:col-span-2 md:row-span-2",
    tag: "Most booked",
  },
  {
    icon: Users,
    title: "Women's Safety",
    desc: "Trained lady bodyguards for late-night travel, errands, and personal companionship.",
    img: null,
    span: "md:col-span-1",
  },
  {
    icon: Briefcase,
    title: "Business & HNI",
    desc: "Executive protection, residence detail, and discreet plain-clothes coverage.",
    img: null,
    span: "md:col-span-1",
  },
  {
    icon: PackageOpen,
    title: "Jewellery & Cash Transit",
    desc: "Armed-grade vigilance for high-value transfers between vault, shop and event.",
    img: "https://images.unsplash.com/photo-1681167816895-940c56e0d2a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmFuc3BvcnR8ZW58MHx8fHwxNzgyNTY1NzQzfDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-2",
  },
  {
    icon: Plane,
    title: "Travel & Foreign Visitors",
    desc: "Airport pickups, multi-city itineraries, multilingual guards — India made safe.",
    img: null,
    span: "md:col-span-1",
  },
  {
    icon: Crown,
    title: "Celebrity & VIP",
    desc: "Layered protection for film, sport and political principals with strict discretion.",
    img: null,
    span: "md:col-span-1",
  },
];

const CATEGORIES = [
  {
    icon: ShieldCheck,
    title: "Uniformed Guard",
    bullets: ["Visible deterrence", "Static & roving posts", "Crowd control"],
    price: "from ₹699 / shift",
  },
  {
    icon: Users,
    title: "Bouncer",
    bullets: ["High-traffic events", "Door & guest list", "Conflict de-escalation"],
    price: "from ₹1,499 / shift",
  },
  {
    icon: Heart,
    title: "Lady Bodyguard",
    bullets: ["Trained female personnel", "Personal companionship", "Discreet detail"],
    price: "from ₹1,299 / shift",
  },
  {
    icon: Car,
    title: "Guard + Driver",
    bullets: ["Door-to-door safety", "Trained chauffeur", "Convoy ready"],
    price: "from ₹2,199 / day",
  },
];

const FAQS = [
  {
    q: "How are RAKSHAK guards verified?",
    a: "Every guard clears Aadhaar KYC plus a documented police verification. Ex-Army, Ex-Police and PSARA-trained credentials are validated before activation, and re-verified periodically.",
  },
  {
    q: "How quickly can a guard be assigned?",
    a: "For instant bookings in Delhi NCR, the median time-to-assign is under 15 minutes. For scheduled bookings, you'll see the assigned guard's profile up to 24 hours before the job.",
  },
  {
    q: "What is the pricing model?",
    a: "Transparent per-shift and per-day pricing — shown before you confirm. No hidden surcharges. Pay via UPI or cash; corporate billing is available on request.",
  },
  {
    q: "Which areas does RAKSHAK serve?",
    a: "We are launching across Delhi NCR — Delhi, Gurugram, Noida, Ghaziabad and Faridabad — with more cities rolling out monthly. Drop us a note if you'd like RAKSHAK in your city.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancel free up to 2 hours before the start time. Cancellations within the 2-hour window are billed at 25% to compensate the assigned guard.",
  },
  {
    q: "Can I track the guard live?",
    a: "Yes. Once a job starts, you get a live tracking link you can share with family. Our ops team monitors every shift in parallel.",
  },
];

const REVIEWS = [
  {
    name: "Priya S.",
    role: "Founder, Delhi",
    text: "Booked a lady bodyguard for a late-night airport run. Felt safer than I have in years. Live tracking + the SOS button are game-changers.",
  },
  {
    name: "Raghav M.",
    role: "Event Planner, Gurugram",
    text: "We staffed a 600-guest wedding with RAKSHAK in 48 hours. Every guard was sharp, in uniform, on time. This is the new standard.",
  },
  {
    name: "Ankit K.",
    role: "Jeweller, Karol Bagh",
    text: "Daily vault-to-shop transit used to be the worst part of my day. Now it's a tap. Same verified team. Zero anxiety.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        data-testid="hero-section"
        className="relative overflow-hidden border-b border-[#D9A93D]/10"
      >
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1618371690240-e0d46eead4b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzZWN1cml0eSUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3ODI1NjU3Mjd8MA&ixlib=rb-4.1.0&q=85"
            alt=""
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/70 via-[#0B0B0D]/85 to-[#0B0B0D]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(217,169,61,0.18),transparent_55%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9A93D]/25 bg-[#D9A93D]/[0.06] backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A93D]" />
              <span className="text-xs tracking-[0.18em] uppercase text-[#D9A93D] font-medium">
                Now launching · Delhi NCR
              </span>
            </div>

            <h1
              data-testid="hero-headline"
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.98] font-medium"
            >
              Police-Verified
              <br />
              <span className="gold-text">Bodyguards,</span> On Demand.
            </h1>

            <p
              data-testid="hero-subheadline"
              className="mt-6 max-w-xl text-base md:text-lg text-[#C7C7CC] leading-relaxed"
            >
              Book trained protection in 2 easy steps. Aadhaar-KYC guards, live
              tracking, a panic button that actually works — and a price you&apos;ll
              see before you pay.
            </p>

            <div className="mt-9" id="download">
              <DownloadButtons testIdPrefix="hero-download" />
              <p className="mt-3 text-xs text-[#A0A0A5]">
                Apps releasing soon · Be the first to know — Coming Soon
              </p>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#D9A93D] mb-2">
                  Join the early-access list
                </p>
                <WaitlistForm
                  source="hero"
                  role="customer"
                  testIdPrefix="hero-waitlist"
                />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              <span className="inline-flex items-center gap-2" data-testid="hero-trust-1">
                <BadgeCheck className="w-4 h-4 text-[#D9A93D]" />
                100% Police-Verified
              </span>
              <span className="divider-dot" />
              <span className="inline-flex items-center gap-2" data-testid="hero-trust-2">
                <GraduationCap className="w-4 h-4 text-[#D9A93D]" />
                Trained Professionals
              </span>
              <span className="divider-dot" />
              <span className="inline-flex items-center gap-2" data-testid="hero-trust-3">
                <Radio className="w-4 h-4 text-[#D9A93D]" />
                Assigned Instantly
              </span>
            </div>
          </div>

          {/* Card stack visual */}
          <div className="md:col-span-5 relative hidden md:block">
            <div className="relative">
              <div className="absolute -top-10 -left-8 w-44 h-44 rounded-full bg-[#D9A93D]/15 blur-3xl" />
              <div className="relative card-rk rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#D9A93D]/15 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#D9A93D]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#A0A0A5]">Assigned Guard</p>
                    <p className="font-display text-lg text-white">
                      Capt. Vikram S.
                    </p>
                  </div>
                  <div className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#D9A93D]/10 text-[#D9A93D] border border-[#D9A93D]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9A93D] rk-pulse" />
                    En route
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg border border-[#D9A93D]/10 p-3">
                    <p className="text-[10px] tracking-widest uppercase text-[#A0A0A5]">
                      ETA
                    </p>
                    <p className="font-display text-lg text-white">12m</p>
                  </div>
                  <div className="rounded-lg border border-[#D9A93D]/10 p-3">
                    <p className="text-[10px] tracking-widest uppercase text-[#A0A0A5]">
                      Type
                    </p>
                    <p className="font-display text-lg text-white">Lady BG</p>
                  </div>
                  <div className="rounded-lg border border-[#D9A93D]/10 p-3">
                    <p className="text-[10px] tracking-widest uppercase text-[#A0A0A5]">
                      Rating
                    </p>
                    <p className="font-display text-lg text-white">4.9★</p>
                  </div>
                </div>
                <div className="mt-5 h-px gold-rule" />
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A0A0A5]">Live tracking</p>
                    <p className="text-white text-sm">Sharing with 2 contacts</p>
                  </div>
                  <button className="btn-gold rounded-lg px-3.5 py-2 text-xs">
                    Open SOS
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-6 w-56 card-rk rounded-2xl p-4 hidden lg:block">
                <p className="label-eyebrow">Booking confirmed</p>
                <p className="mt-1 font-display text-white">
                  ₹1,299 · Lady Bodyguard · 4h
                </p>
                <p className="mt-1 text-xs text-[#A0A0A5]">
                  Paid via UPI · #RKS-08412
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TRUST */}
      <div
        data-testid="trust-marquee"
        className="border-y border-[#D9A93D]/10 bg-[#0E0E11] overflow-hidden"
      >
        <div className="flex rk-marquee whitespace-nowrap py-4">
          {[...TRUST_BADGES, ...TRUST_BADGES].map((b, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 px-6 text-sm text-white/80"
            >
              <ShieldCheck className="w-4 h-4 text-[#D9A93D]" />
              <span>{b}</span>
              <span className="text-[#D9A93D]/40 ml-3">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <Section
        id="how"
        testId="how-it-works"
        eyebrow="How it works"
        title="Trained protection in four taps."
        subtitle="Designed for the moments that matter — a wedding night, a late ride, a high-value delivery. Book in seconds, stay protected for hours."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-testid={`how-step-${i + 1}`}
              className="card-rk rounded-xl p-7 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 font-display text-[6rem] font-bold leading-none text-[#D9A93D]/[0.06] select-none">
                {s.n}
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-[#D9A93D]" strokeWidth={1.6} />
              </div>
              <p className="mt-5 label-eyebrow">Step {s.n}</p>
              <h3 className="mt-2 font-display text-xl text-white font-medium">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-[#A0A0A5] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* TRUST */}
      <Section
        id="trust"
        testId="trust-section"
        eyebrow="Why people trust RAKSHAK"
        title={
          <>
            Built on verification.
            <br />
            <span className="gold-text">Run on accountability.</span>
          </>
        }
        subtitle="A bodyguard isn't a hire — it's a circle of trust. RAKSHAK enforces it at every layer."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRUST_PILLARS.map((p, i) => (
            <div
              key={p.title}
              data-testid={`trust-pillar-${i + 1}`}
              className="card-rk rounded-xl p-7"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-[#D9A93D]" strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-lg text-white font-medium">
                  {p.title}
                </h3>
              </div>
              <p className="mt-4 text-sm text-[#A0A0A5] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* USE CASES BENTO */}
      <Section
        id="use-cases"
        testId="use-cases"
        eyebrow="Use cases"
        title="A guard for every moment."
        subtitle="From a daughter's safe ride home to a billion-rupee vault transfer — RAKSHAK matches the muscle to the moment."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-4">
          {USE_CASES.map((u, i) => (
            <div
              key={u.title}
              data-testid={`use-case-${i + 1}`}
              className={`card-rk relative overflow-hidden rounded-2xl p-7 ${u.span}`}
            >
              {u.img && (
                <>
                  <img
                    src={u.img}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/70 to-transparent" />
                </>
              )}
              <div className="relative h-full flex flex-col">
                {u.tag && (
                  <span className="self-start inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#0B0B0D] bg-[#D9A93D] px-2 py-1 rounded-full font-semibold">
                    <Star className="w-3 h-3" /> {u.tag}
                  </span>
                )}
                <div className="mt-auto">
                  <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center mb-3">
                    <u.icon className="w-5 h-5 text-[#D9A93D]" />
                  </div>
                  <h3 className="font-display text-xl text-white font-medium">
                    {u.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#C7C7CC]/85 leading-relaxed max-w-md">
                    {u.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CATEGORIES */}
      <Section
        id="categories"
        testId="categories-section"
        eyebrow="Categories"
        title="Pick the protection that fits."
        subtitle="Indicative pricing — full quote in the app before you confirm."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c, i) => (
            <div
              key={c.title}
              data-testid={`category-${i + 1}`}
              className="card-rk rounded-xl p-7 flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                <c.icon className="w-5 h-5 text-[#D9A93D]" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-display text-xl text-white font-medium">
                {c.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {c.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-[#C7C7CC]"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D9A93D]" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-[#D9A93D]/10">
                <p className="font-display text-lg text-[#D9A93D]">{c.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        id="reviews"
        testId="reviews-section"
        eyebrow="Heard from clients"
        title="Quiet nights. Calm minds."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              data-testid={`review-${i + 1}`}
              className="card-rk rounded-xl p-7"
            >
              <div className="flex gap-0.5 text-[#D9A93D]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base text-white/90 leading-relaxed">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-[#D9A93D]/10">
                <p className="font-display text-white">{r.name}</p>
                <p className="text-xs text-[#A0A0A5] mt-0.5">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        testId="faq-section"
        eyebrow="Frequently asked"
        title="Everything before you tap 'Book'."
      >
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                data-testid={`faq-item-${i + 1}`}
                className="border-b border-[#D9A93D]/15"
              >
                <AccordionTrigger className="text-left text-white hover:no-underline py-5">
                  <span className="font-display text-base md:text-lg">
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[#A0A0A5] text-sm md:text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* FINAL CTA */}
      <section
        data-testid="final-cta"
        className="relative overflow-hidden py-24 md:py-32"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B0B0D] via-[#121013] to-[#0B0B0D]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_40%,rgba(217,169,61,0.18),transparent_55%)]" />
        <div className="max-w-5xl mx-auto px-5 md:px-10 text-center">
          <p className="label-eyebrow">Your safety, on tap.</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.05]">
            The next bodyguard you book
            <br />
            <span className="gold-text">should be the right one.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-[#A0A0A5] max-w-2xl mx-auto">
            Join the RAKSHAK early-access list. Apps drop on Play Store and App
            Store soon.
          </p>
          <div className="mt-9 flex justify-center">
            <DownloadButtons testIdPrefix="cta-download" />
          </div>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D9A93D] mb-3">
              Or — Join the waitlist
            </p>
            <WaitlistForm
              source="final-cta"
              role="customer"
              variant="stacked"
              testIdPrefix="cta-waitlist"
            />
          </div>
          <p className="mt-6 text-xs text-[#A0A0A5]">
            By using RAKSHAK you agree to our{" "}
            <Link
              to="/contact"
              className="text-[#D9A93D] hover:text-[#E8C366] underline-offset-4 hover:underline"
            >
              Terms
            </Link>{" "}
            and DPDP consent.
          </p>
        </div>
      </section>

      {/* Recruit cross-link */}
      <section className="border-t border-[#D9A93D]/10 bg-[#0E0E11]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="label-eyebrow">For security professionals</p>
            <h3 className="mt-2 font-display text-2xl text-white">
              Ex-Army, Ex-Police or PSARA-trained?{" "}
              <span className="gold-text">Earn with RAKSHAK.</span>
            </h3>
          </div>
          <Link
            to="/become-a-guard"
            data-testid="home-recruit-cta"
            className="btn-ghost-gold rounded-lg px-5 py-3 inline-flex items-center gap-2 text-sm self-start md:self-auto"
          >
            Become a Guard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
