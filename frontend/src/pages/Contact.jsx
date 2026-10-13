import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/config/api";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Send,
  Building2,
  ShieldCheck,
  Briefcase,
  Clock,
  UserCheck,
} from "lucide-react";
import Section from "@/components/Section";
import { COMPANY, formatFullAddress } from "@/config/company";

// Used until the live list loads (edited in Admin → Support → Tickets → Website topics).
const FALLBACK_TOPICS = [
  { value: "booking", label: "Book a guard / general enquiry" },
  { value: "guard", label: "Become a guard" },
  { value: "enterprise", label: "Enterprise / corporate" },
  { value: "refund", label: "Refund / payment issue" },
  { value: "grievance", label: "Grievance / DPDP request" },
  { value: "press", label: "Press & media" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: FALLBACK_TOPICS[0].value,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [topics, setTopics] = useState(FALLBACK_TOPICS);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/contact-topics`)
      .then((r) => {
        const live = (r.data?.items || []).map((t) => ({ value: t.key, label: t.label }));
        if (!alive || !live.length) return;
        setTopics(live);
        setForm((f) => (live.some((t) => t.value === f.topic) ? f : { ...f, topic: live[0].value }));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message received — we'll respond within 24 hours.");
      setForm({
        name: "",
        email: "",
        phone: "",
        topic: topics[0].value,
        message: "",
      });
    } catch {
      toast.error("Could not send right now. Please email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section
        data-testid="contact-hero"
        className="relative overflow-hidden border-b border-[#D9A93D]/10"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_10%,rgba(217,169,61,0.15),transparent_55%)]" />
        <div className="max-w-5xl mx-auto px-5 md:px-10 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <p className="label-eyebrow">Get in touch</p>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl text-white leading-[1.02] font-medium">
            Talk to <span className="gold-text">RAKSHAK.</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-base md:text-lg text-[#C7C7CC] leading-relaxed">
            Bookings, enterprise, refunds, grievances, press — drop us a line.
            We typically reply within one business day.
          </p>
        </div>
      </section>

      {/* REGISTERED BUSINESS INFO — required by payment gateways */}
      <Section testId="contact-registered" eyebrow="Registered business" title="Where to reach us" className="pt-14 md:pt-16">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="card-rk rounded-xl p-6 md:col-span-2" data-testid="contact-entity">
            <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#D9A93D]" />
            </div>
            <p className="mt-4 label-eyebrow">Legal entity</p>
            <p className="mt-1 font-display text-lg text-white">
              {COMPANY.legalName}
            </p>
            {COMPANY.cin && (
              <p className="mt-1 text-xs text-[#A0A0A5]">CIN: {COMPANY.cin}</p>
            )}
            {COMPANY.gstin && (
              <p className="mt-1 text-xs text-[#A0A0A5]">
                GSTIN: {COMPANY.gstin}
              </p>
            )}
            <div className="mt-4 flex items-start gap-2 text-sm text-[#C7C7CC]">
              <MapPin className="w-4 h-4 text-[#D9A93D] mt-0.5" />
              <span data-testid="contact-address">{formatFullAddress()}</span>
            </div>
          </div>

          <div className="card-rk rounded-xl p-6" data-testid="contact-email-card">
            <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#D9A93D]" />
            </div>
            <p className="mt-4 label-eyebrow">Email</p>
            <a
              href={`mailto:${COMPANY.supportEmail}`}
              className="mt-1 block font-display text-lg text-white hover:text-[#E8C366] break-all"
              data-testid="contact-email-link"
            >
              {COMPANY.supportEmail}
            </a>
            <p className="mt-2 text-xs text-[#A0A0A5]">
              Support, refunds, grievance.
            </p>
          </div>

          <div className="card-rk rounded-xl p-6" data-testid="contact-phone-card">
            <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
              <Phone className="w-4 h-4 text-[#D9A93D]" />
            </div>
            <p className="mt-4 label-eyebrow">Phone</p>
            <a
              href={`tel:${COMPANY.supportPhone.replace(/[^\d+]/g, "")}`}
              className="mt-1 block font-display text-lg text-white hover:text-[#E8C366]"
            >
              {COMPANY.supportPhone}
            </a>
            <p className="mt-2 text-xs text-[#A0A0A5] inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {COMPANY.supportHours}
            </p>
          </div>

          <div className="card-rk rounded-xl p-6 md:col-span-2" data-testid="contact-grievance">
            <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-[#D9A93D]" />
            </div>
            <p className="mt-4 label-eyebrow">Grievance officer (DPDP Act)</p>
            <p className="mt-1 font-display text-lg text-white">
              {COMPANY.grievanceOfficer.name}
            </p>
            <p className="mt-1 text-sm text-[#C7C7CC]">
              {COMPANY.grievanceOfficer.email}
            </p>
            <p className="mt-2 text-xs text-[#A0A0A5]">
              Acknowledgement within 48 hours · Resolution within 15 days.
            </p>
          </div>

          <div className="card-rk rounded-xl p-6 md:col-span-2" data-testid="contact-emergency">
            <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#D9A93D]" />
            </div>
            <p className="mt-4 label-eyebrow">In an emergency</p>
            <p className="mt-1 font-display text-lg text-white">Dial 112</p>
            <p className="mt-2 text-xs text-[#A0A0A5] leading-relaxed">
              RAKSHAK is not a replacement for police, fire or medical
              services. In any life-threatening situation, contact India&apos;s
              national emergency number first.
            </p>
          </div>
        </div>
      </Section>

      {/* FORM */}
      <Section testId="contact-form-section" eyebrow="Send a message" title="Tell us what you need" className="pt-0">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              className="card-rk rounded-2xl p-7 md:p-9"
              data-testid="contact-form"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                    Name
                  </label>
                  <input
                    data-testid="contact-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    type="text"
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-lg px-4 py-3 text-sm placeholder:text-white/30"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                    Email
                  </label>
                  <input
                    data-testid="contact-email-input"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-lg px-4 py-3 text-sm placeholder:text-white/30"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                    Phone (optional)
                  </label>
                  <input
                    data-testid="contact-phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    type="tel"
                    placeholder="+91 ..."
                    className="mt-2 w-full rounded-lg px-4 py-3 text-sm placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                    Topic
                  </label>
                  <select
                    data-testid="contact-topic"
                    value={form.topic}
                    onChange={(e) => update("topic", e.target.value)}
                    className="mt-2 w-full rounded-lg px-4 py-3 text-sm bg-[#0B0B0D]"
                  >
                    {topics.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                    Message
                  </label>
                  <textarea
                    data-testid="contact-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                    placeholder="A few details about what you need..."
                    className="mt-2 w-full rounded-lg px-4 py-3 text-sm placeholder:text-white/30 resize-none"
                    required
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-[#A0A0A5]">
                  By submitting, you agree to our Privacy Policy and DPDP consent.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit"
                  className="btn-gold rounded-lg px-6 py-3 inline-flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside className="md:col-span-5 space-y-5">
            <div className="card-rk rounded-2xl p-7" data-testid="contact-channels">
              <p className="label-eyebrow">Specific desks</p>
              <div className="mt-4 space-y-3">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Bookings & support",
                    desc: "Pre-launch: write to " + COMPANY.supportEmail + ".",
                  },
                  {
                    icon: Building2,
                    title: "Enterprise & events",
                    desc: "Bulk staffing, residential and corporate detail.",
                  },
                  {
                    icon: Briefcase,
                    title: "Press & partnerships",
                    desc: "Mention 'Press' in your subject line.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="flex gap-3 items-start p-3 rounded-lg border border-[#D9A93D]/10 bg-white/[0.02]"
                  >
                    <c.icon className="w-4 h-4 text-[#D9A93D] mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">{c.title}</p>
                      <p className="text-xs text-[#A0A0A5] mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
