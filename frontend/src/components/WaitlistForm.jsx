import React, { useState } from "react";
import axios from "axios";
import { API } from "@/config/api";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CITIES = [
  "Delhi",
  "Gurugram",
  "Noida",
  "Ghaziabad",
  "Faridabad",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chandigarh",
  "Jaipur",
  "Other",
];

/**
 * Compact early-access waitlist capture.
 * Variant: "inline" (hero) — single-line email + city
 * Variant: "stacked" (CTA) — larger, centered
 */
export default function WaitlistForm({
  source = "hero",
  role = "customer",
  variant = "inline",
  testIdPrefix = "waitlist",
  className = "",
}) {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    setBusy(true);
    try {
      await axios.post(`${API}/waitlist`, { email, city, role, source });
      setDone(true);
      toast.success("You're on the list. We'll email you on launch day.");
    } catch (err) {
      toast.error("Couldn't sign you up right now. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div
        data-testid={`${testIdPrefix}-success`}
        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-[#D9A93D]/30 bg-[#D9A93D]/[0.06] text-sm text-white ${className}`}
      >
        <CheckCircle2 className="w-4 h-4 text-[#D9A93D]" />
        You&apos;re on the list — we&apos;ll be in touch.
      </div>
    );
  }

  const stacked = variant === "stacked";

  return (
    <form
      onSubmit={onSubmit}
      data-testid={`${testIdPrefix}-form`}
      className={`${
        stacked
          ? "flex flex-col sm:flex-row gap-2 max-w-xl mx-auto"
          : "flex flex-col sm:flex-row gap-2 max-w-xl"
      } ${className}`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        data-testid={`${testIdPrefix}-email`}
        className="flex-1 rounded-lg px-4 py-3 text-sm placeholder:text-white/30"
      />
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        data-testid={`${testIdPrefix}-city`}
        className="rounded-lg px-3 py-3 text-sm bg-[#0B0B0D] sm:w-40"
      >
        <option value="">Select city</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={busy}
        data-testid={`${testIdPrefix}-submit`}
        className="btn-gold rounded-lg px-5 py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {busy ? "Joining…" : (
          <>
            Notify me <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
