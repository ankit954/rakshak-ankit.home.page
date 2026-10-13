import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "@/config/api";
import { Sun, Moon, Banknote, ArrowRight } from "lucide-react";
import Section from "@/components/Section";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
// Round down to the nearest ₹100 so the estimate never overstates.
const roundDown = (n) => Math.floor(n / 100) * 100;

// "21:00" → "9 PM"
const clock = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  const hour = h % 12 || 12;
  return `${hour}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
};

/**
 * "How much can you earn?" — weekly take-home for day and night shifts,
 * from the live RAKSHAK pricing (GET /api/guard-earnings). Without that data
 * it shows no amounts rather than guessed ones.
 */
export default function GuardEarnings({ id = "guard-earnings", showJoinButton = true }) {
  const [data, setData] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/guard-earnings`)
      .then((r) => {
        if (alive && r.data?.items?.length) setData(r.data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const item = data?.items[active];
  const shifts = data?.shifts_per_week;
  const cards = item
    ? [
        {
          key: "day",
          icon: Sun,
          label: "Day shifts",
          amount: item.day_week,
          when: `${clock(data.shifts.day.start)} – ${clock(data.shifts.day.end)}`,
        },
        {
          key: "night",
          icon: Moon,
          label: "Night shifts",
          amount: item.night_week,
          when: `${clock(data.shifts.night.start)} – ${clock(data.shifts.night.end)}`,
        },
      ]
    : [];

  return (
    <Section
      id={id}
      testId="guard-earnings"
      eyebrow="For security guards"
      title={
        <>
          How much can you <span className="gold-text">earn?</span>
        </>
      }
      subtitle="Pick day or night shifts. Here's what a week can pay."
    >
      {item && (
        <>
          {data.items.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Guard type">
              {data.items.map((it, i) => (
                <button
                  key={it.category}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  data-testid={`guard-earnings-type-${i}`}
                  onClick={() => setActive(i)}
                  className={`rounded-full px-4 py-2 text-sm border transition ${
                    i === active
                      ? "border-[#D9A93D] bg-[#D9A93D] text-[#0B0B0D] font-semibold"
                      : "border-[#D9A93D]/25 text-white/80 hover:border-[#D9A93D]"
                  }`}
                >
                  {it.category}
                </button>
              ))}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            {cards.map(({ key, icon: Icon, label, amount, when }) => (
              <div key={key} data-testid={`guard-earnings-${key}`} className="card-rk rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-[#D9A93D]/10 inline-flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#D9A93D]" />
                  </span>
                  <p className="font-display text-xl text-white">{label}</p>
                </div>
                <p className="mt-6 font-display text-5xl text-white">
                  {inr(roundDown(amount))}
                </p>
                <p className="mt-1 text-sm text-[#D9A93D]">a week</p>
                <p className="mt-4 text-sm text-[#A0A0A5]">
                  {shifts} shifts a week · {when}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={`${item ? "mt-8" : ""} flex flex-col sm:flex-row sm:items-center gap-4`}>
        <p className="inline-flex items-center gap-2 text-white/90">
          <Banknote className="w-5 h-5 text-[#D9A93D]" />
          Paid every week, straight to your bank.
        </p>
        {showJoinButton && (
          <Link
            to="/become-a-guard"
            data-testid="guard-earnings-join"
            className="btn-gold rounded-lg px-5 py-3 inline-flex items-center gap-2 text-sm self-start sm:ml-auto"
          >
            Become a Guard <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {item && (
        <p className="mt-6 text-xs text-[#A0A0A5]">
          Estimate at current RAKSHAK rates in {data.city}. What you earn depends on the
          bookings you take.
        </p>
      )}
    </Section>
  );
}
