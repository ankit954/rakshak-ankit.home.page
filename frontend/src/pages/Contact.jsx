import React, { useState } from "react";
import axios from "axios";
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
} from "lucide-react";
import Section from "@/components/Section";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TOPICS = [
  { value: "booking", label: "Book a guard / general enquiry" },
  { value: "guard", label: "Become a guard" },
  { value: "enterprise", label: "Enterprise / corporate" },
  { value: "press", label: "Press & media" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "booking",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

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
        topic: "booking",
        message: "",
      });
    } catch (err) {
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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(217,169,61,0.16),transparent_55%)]" />
        <div className="max-w-5xl mx-auto px-5 md:px-10 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
          <p className="label-eyebrow">Get in touch</p>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.98] font-medium">
            Talk to <span className="gold-text">RAKSHAK.</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-[#C7C7CC] leading-relaxed">
            Bookings, enterprise security, recruitment, press — drop us a line.
            We typically reply within one business day.
          </p>
        </div>
      </section>

      <Section testId="contact-grid" className="pt-10 md:pt-12">
        <div className="grid md:grid-cols-12 gap-8">
          {/* FORM */}
          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              className="card-rk rounded-2xl p-7 md:p-9"
              data-testid="contact-form"
            >
              <p className="label-eyebrow">Send a message</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl text-white">
                Tell us what you need.
              </h2>

              <div className="mt-8 grid sm:grid-cols-2 gap-5">
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
                    {TOPICS.map((t) => (
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
                  By submitting, you agree to our Privacy Policy and DPDP
                  consent.
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

          {/* SIDE INFO */}
          <div className="md:col-span-5 space-y-5">
            <div className="card-rk rounded-2xl p-7" data-testid="contact-direct">
              <p className="label-eyebrow">Direct</p>
              <h3 className="mt-2 font-display text-xl text-white">
                Reach us directly
              </h3>
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#D9A93D]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#A0A0A5]">Email</p>
                    <a
                      href="mailto:contactus@therakshak.in"
                      className="text-white hover:text-[#E8C366]"
                      data-testid="contact-email-link"
                    >
                      contactus@therakshak.in
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#D9A93D]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#A0A0A5]">Region</p>
                    <p className="text-white">
                      Delhi NCR · India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#D9A93D]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#A0A0A5]">Helpline</p>
                    <p className="text-white">
                      Activates with app launch
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-rk rounded-2xl p-7" data-testid="contact-channels">
              <p className="label-eyebrow">Specific desks</p>
              <div className="mt-4 space-y-3">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Bookings & support",
                    desc: "Pre-launch: write to contactus@therakshak.in.",
                  },
                  {
                    icon: Building2,
                    title: "Enterprise",
                    desc: "Bulk staffing, residential & corporate detail.",
                  },
                  {
                    icon: Briefcase,
                    title: "Press & partnerships",
                    desc: "Mention 'Press' in subject line.",
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

            <div className="card-rk rounded-2xl p-7" data-testid="contact-emergency">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-[#D9A93D]" />
                </div>
                <p className="font-display text-base text-white">
                  In an emergency, dial 112.
                </p>
              </div>
              <p className="mt-3 text-xs text-[#A0A0A5] leading-relaxed">
                RAKSHAK is not a replacement for police or emergency services.
                In any life-threatening situation, contact India&apos;s national
                emergency number first.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
