import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { COMPANY } from "@/config/company";

/**
 * Shared legal-page wrapper.
 * Pass sections: [{ title, body: string | string[] | JSX }]
 */
export default function LegalPage({ eyebrow, title, updated, sections = [], testId }) {
  return (
    <section
      data-testid={testId}
      className="relative border-b border-[#D9A93D]/10"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(217,169,61,0.10),transparent_55%)]" />
      <div className="max-w-3xl mx-auto px-5 md:px-10 pt-16 pb-16 md:pt-24 md:pb-24">
        <Link
          to="/"
          data-testid="legal-back"
          className="inline-flex items-center gap-2 text-sm text-[#A0A0A5] hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <p className="mt-8 label-eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl text-white leading-[1.05] font-medium">
          {title}
        </h1>
        {updated && (
          <p className="mt-3 text-sm text-[#A0A0A5]">Last updated: {updated}</p>
        )}
        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <div key={i} data-testid={`legal-section-${i + 1}`}>
              <h2 className="font-display text-xl md:text-2xl text-white">
                {s.title}
              </h2>
              <div className="mt-3 space-y-3 text-[#C7C7CC] leading-relaxed text-sm md:text-base">
                {Array.isArray(s.body) ? (
                  s.body.map((p, j) => <p key={j}>{p}</p>)
                ) : typeof s.body === "string" ? (
                  <p>{s.body}</p>
                ) : (
                  s.body
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#D9A93D]/10 text-xs text-[#A0A0A5]">
          Questions? Email{" "}
          <a
            href="mailto:contactus@therakshak.in"
            className="text-[#D9A93D] hover:text-[#E8C366]"
          >
            contactus@therakshak.in
          </a>
          .
        </div>
      </div>
    </section>
  );
}
