import React, { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Heart,
  Car,
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Sparkles,
  Wallet,
  Smartphone,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const GUARD_TYPES = [
  {
    id: "uniformed",
    icon: ShieldCheck,
    title: "Uniformed Guard",
    desc: "Visible deterrence, static or roving posts.",
    rate: 699,
    unit: "/ shift (8h)",
  },
  {
    id: "bouncer",
    icon: Users,
    title: "Bouncer",
    desc: "Crowd control, door duties, conflict de-escalation.",
    rate: 1499,
    unit: "/ shift (8h)",
  },
  {
    id: "lady",
    icon: Heart,
    title: "Lady Bodyguard",
    desc: "Trained female personnel, personal companionship.",
    rate: 1299,
    unit: "/ shift (8h)",
  },
  {
    id: "guard-driver",
    icon: Car,
    title: "Guard + Driver",
    desc: "Door-to-door safety with a trained chauffeur.",
    rate: 2199,
    unit: "/ day",
  },
];

const CITIES = ["Delhi", "Gurugram", "Noida", "Ghaziabad", "Faridabad"];
const DURATIONS = [
  { hours: 4, label: "4 hours" },
  { hours: 8, label: "8 hours (1 shift)" },
  { hours: 12, label: "12 hours" },
  { hours: 24, label: "24 hours" },
];

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const Step = ({ n, label, active, done }) => (
  <div className="flex items-center gap-3" data-testid={`book-step-indicator-${n}`}>
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border ${
        done
          ? "bg-[#D9A93D] text-[#0B0B0D] border-[#D9A93D]"
          : active
          ? "bg-[#D9A93D]/10 text-[#D9A93D] border-[#D9A93D]"
          : "bg-transparent text-[#A0A0A5] border-[#D9A93D]/20"
      }`}
    >
      {done ? <CheckCircle2 className="w-4 h-4" /> : n}
    </div>
    <span
      className={`text-xs uppercase tracking-[0.2em] ${
        active || done ? "text-white" : "text-[#A0A0A5]"
      }`}
    >
      {label}
    </span>
  </div>
);

export default function Book() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // step 1
  const [guardId, setGuardId] = useState("uniformed");
  const [duration, setDuration] = useState(8);

  // step 2
  const [city, setCity] = useState("Delhi");
  const [area, setArea] = useState("");
  const [date, setDate] = useState(today());
  const [time, setTime] = useState("19:00");

  // step 3
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  // step 4
  const [bookingId] = useState(
    () => "RKS-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
  );

  const guard = useMemo(
    () => GUARD_TYPES.find((g) => g.id === guardId) || GUARD_TYPES[0],
    [guardId],
  );
  const price = useMemo(() => {
    const base = guard.rate;
    const factor =
      guard.id === "guard-driver" ? Math.max(1, duration / 24) : duration / 8;
    return Math.round(base * factor);
  }, [guard, duration]);

  const sendOtp = (e) => {
    e.preventDefault();
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent (preview mode — enter any 4 digits).");
  };

  const verifyAndBook = async (e) => {
    e.preventDefault();
    if (otp.replace(/\D/g, "").length < 4) {
      toast.error("Enter the 4-digit OTP.");
      return;
    }
    setVerifying(true);
    // Add the mobile to the waitlist so we have a real lead in Mongo.
    try {
      await axios.post(`${API}/waitlist`, {
        email: `${phone.replace(/\D/g, "")}@mobile.rakshak.in`,
        city,
        role: "customer",
        source: `book-preview:${guard.id}`,
      });
    } catch {
      /* non-blocking; this is a preview */
    }
    setVerifying(false);
    setStep(4);
  };

  // ---------------- UI ----------------
  return (
    <section
      data-testid="book-page"
      className="relative border-b border-[#D9A93D]/10 min-h-[80vh]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_0%,rgba(217,169,61,0.14),transparent_55%)]" />

      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-20 md:pt-20 md:pb-24">
        <Link
          to={step === 4 ? "/" : "/login"}
          data-testid="book-back"
          className="inline-flex items-center gap-2 text-sm text-[#A0A0A5] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> {step === 4 ? "Back to home" : "Back"}
        </Link>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="label-eyebrow">Booking preview</p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl text-white font-medium leading-tight">
              Book a Guard
            </h1>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9A93D]/25 bg-[#D9A93D]/[0.06] text-xs text-[#D9A93D]">
            <Sparkles className="w-3.5 h-3.5" /> App launching soon
          </span>
        </div>

        {/* Stepper */}
        {step !== 4 && (
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <Step n={1} label="Guard & Duration" active={step === 1} done={step > 1} />
            <Step n={2} label="Location & Time" active={step === 2} done={step > 2} />
            <Step n={3} label="Verify Mobile" active={step === 3} done={step > 3} />
          </div>
        )}

        <div className="mt-10 grid md:grid-cols-12 gap-8">
          {/* LEFT: step body */}
          <div className="md:col-span-7">
            {step === 1 && (
              <div data-testid="book-step-1">
                <h2 className="font-display text-2xl text-white">
                  Choose your guard type
                </h2>
                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  {GUARD_TYPES.map((g) => {
                    const active = g.id === guardId;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGuardId(g.id)}
                        data-testid={`book-guard-${g.id}`}
                        className={`text-left p-5 rounded-xl border transition-all ${
                          active
                            ? "border-[#D9A93D] bg-[#D9A93D]/[0.06]"
                            : "border-[#D9A93D]/15 bg-white/[0.02] hover:border-[#D9A93D]/40"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-md flex items-center justify-center border ${
                              active
                                ? "bg-[#D9A93D] border-[#D9A93D] text-[#0B0B0D]"
                                : "bg-[#D9A93D]/10 border-[#D9A93D]/20 text-[#D9A93D]"
                            }`}
                          >
                            <g.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-display text-base text-white">
                              {g.title}
                            </p>
                            <p className="mt-1 text-xs text-[#A0A0A5] leading-relaxed">
                              {g.desc}
                            </p>
                            <p className="mt-3 text-sm text-[#D9A93D]">
                              ₹{g.rate.toLocaleString("en-IN")}{" "}
                              <span className="text-xs text-[#A0A0A5]">{g.unit}</span>
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <h3 className="mt-8 font-display text-base text-white">
                  Duration
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DURATIONS.map((d) => {
                    const active = duration === d.hours;
                    return (
                      <button
                        key={d.hours}
                        type="button"
                        onClick={() => setDuration(d.hours)}
                        data-testid={`book-duration-${d.hours}`}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                          active
                            ? "bg-[#D9A93D] text-[#0B0B0D] border-[#D9A93D]"
                            : "border-[#D9A93D]/20 text-white hover:border-[#D9A93D]/50"
                        }`}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    data-testid="book-next-1"
                    className="btn-gold rounded-lg px-5 py-3 text-sm inline-flex items-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div data-testid="book-step-2">
                <h2 className="font-display text-2xl text-white">
                  Where and when?
                </h2>
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                      City
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      data-testid="book-city"
                      className="mt-2 w-full rounded-lg px-4 py-3 text-sm bg-[#0B0B0D]"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                      Area / landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cyber Hub, DLF Phase 2"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      data-testid="book-area"
                      className="mt-2 w-full rounded-lg px-4 py-3 text-sm placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={today()}
                      onChange={(e) => setDate(e.target.value)}
                      data-testid="book-date"
                      className="mt-2 w-full rounded-lg px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                      Start time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      data-testid="book-time"
                      className="mt-2 w-full rounded-lg px-4 py-3 text-sm"
                    />
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    data-testid="book-back-2"
                    className="btn-ghost-gold rounded-lg px-4 py-3 text-sm inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    data-testid="book-next-2"
                    className="btn-gold rounded-lg px-5 py-3 text-sm inline-flex items-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div data-testid="book-step-3">
                <h2 className="font-display text-2xl text-white">
                  Verify your mobile
                </h2>
                <p className="mt-2 text-sm text-[#A0A0A5]">
                  We&apos;ll text you when the assigned guard is ready and again at
                  arrival. This is a preview — any 4-digit OTP works.
                </p>

                {!otpSent ? (
                  <form onSubmit={sendOtp} className="mt-6 max-w-sm">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                      Mobile number
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#D9A93D]/20 bg-white/[0.02] px-3">
                      <span className="text-sm text-[#A0A0A5]">+91</span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        data-testid="book-phone"
                        placeholder="98XXXXXXXX"
                        className="flex-1 bg-transparent border-0 py-3 text-sm placeholder:text-white/30 focus:ring-0"
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      data-testid="book-send-otp"
                      className="mt-5 w-full btn-gold rounded-lg py-3 text-sm inline-flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" /> Send OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={verifyAndBook} className="mt-6 max-w-sm">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#A0A0A5]">
                      Enter OTP sent to +91 {phone}
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      data-testid="book-otp"
                      placeholder="••••"
                      className="mt-2 w-full text-center tracking-[0.4em] text-2xl font-display rounded-lg py-3"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={verifying}
                      data-testid="book-verify-otp"
                      className="mt-5 w-full btn-gold rounded-lg py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {verifying ? "Verifying…" : (
                        <>
                          Verify & Confirm Booking{" "}
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                      className="mt-3 text-xs text-[#A0A0A5] hover:text-white"
                    >
                      ← Change number
                    </button>
                  </form>
                )}

                <div className="mt-10">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    data-testid="book-back-3"
                    className="btn-ghost-gold rounded-lg px-4 py-3 text-sm inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div data-testid="book-step-4" className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D9A93D]/10 border border-[#D9A93D]/30">
                  <CheckCircle2 className="w-7 h-7 text-[#D9A93D]" />
                </div>
                <h2 className="mt-6 font-display text-3xl md:text-4xl text-white font-medium leading-tight">
                  You&apos;re on the list.
                </h2>
                <p className="mt-3 text-base text-[#A0A0A5] max-w-md">
                  Bookings will go live the moment our app drops. You&apos;ll get a
                  text on +91 {phone || "your number"} on launch day.
                </p>

                <div className="mt-8 card-rk rounded-xl p-5">
                  <p className="label-eyebrow">Your simulated booking</p>
                  <p className="mt-2 font-display text-xl text-white">
                    {guard.title} · {duration}h
                  </p>
                  <p className="mt-1 text-sm text-[#A0A0A5]">
                    {city}
                    {area ? ` · ${area}` : ""} · {date} · {time}
                  </p>
                  <p className="mt-3 text-sm text-[#D9A93D]">
                    Indicative total ₹{price.toLocaleString("en-IN")} · Ref{" "}
                    {bookingId}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    data-testid="book-finish-home"
                    className="btn-gold rounded-lg px-5 py-3 text-sm inline-flex items-center gap-2"
                  >
                    Back to home
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setOtp("");
                      setOtpSent(false);
                    }}
                    data-testid="book-finish-again"
                    className="btn-ghost-gold rounded-lg px-5 py-3 text-sm inline-flex items-center gap-2"
                  >
                    Simulate another booking
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: live summary card */}
          {step !== 4 && (
            <aside className="md:col-span-5">
              <div
                className="card-rk rounded-2xl p-6 sticky top-28"
                data-testid="book-summary"
              >
                <p className="label-eyebrow">Live summary</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#D9A93D]/10 border border-[#D9A93D]/20 flex items-center justify-center">
                    <guard.icon className="w-5 h-5 text-[#D9A93D]" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-white">
                      {guard.title}
                    </p>
                    <p className="text-xs text-[#A0A0A5]">
                      ₹{guard.rate.toLocaleString("en-IN")} {guard.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-px gold-rule" />

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-[#C7C7CC]">
                    <Clock className="w-4 h-4 text-[#D9A93D]" />
                    <span>{duration} hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#C7C7CC]">
                    <MapPin className="w-4 h-4 text-[#D9A93D]" />
                    <span>
                      {city}
                      {area ? ` · ${area}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#C7C7CC]">
                    <Calendar className="w-4 h-4 text-[#D9A93D]" />
                    <span>
                      {date} · {time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#C7C7CC]">
                    <Smartphone className="w-4 h-4 text-[#D9A93D]" />
                    <span>{phone ? `+91 ${phone}` : "Mobile pending"}</span>
                  </div>
                </div>

                <div className="mt-5 h-px gold-rule" />

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-[#A0A0A5]">Indicative total</span>
                  <span
                    className="font-display text-2xl text-white"
                    data-testid="book-price"
                  >
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-xs text-[#A0A0A5]">
                  <Wallet className="w-3.5 h-3.5 text-[#D9A93D]" />
                  Pay later via UPI / Cash · No charge in preview mode
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
