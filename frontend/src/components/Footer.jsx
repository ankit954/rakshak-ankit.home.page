import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Download } from "lucide-react";
import Logo from "@/components/Logo";
import { COMPANY, formatFullAddress } from "@/config/company";
import { PLAY_STORE_URL } from "@/config/appLinks";

const QUICK_LINKS = [
  { to: "/", label: "Home", testId: "footer-link-home" },
  { to: "/about", label: "About us", testId: "footer-link-about" },
  { to: "/pricing", label: "Pricing", testId: "footer-link-pricing" },
  { to: "/become-a-guard", label: "Become a Guard", testId: "footer-link-guard" },
  { to: "/support", label: "Support / Help", testId: "footer-link-support" },
  { to: "/contact", label: "Contact us", testId: "footer-link-contact" },
];

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy", testId: "footer-link-privacy" },
  { to: "/terms", label: "Terms & Conditions", testId: "footer-link-terms" },
  {
    to: "/refund-policy",
    label: "Refund & Cancellation",
    testId: "footer-link-refund",
  },
  {
    to: "/service-delivery",
    label: "Service Delivery Policy",
    testId: "footer-link-service-delivery",
  },
  { to: "/dpdp", label: "DPDP Consent Notice", testId: "footer-link-dpdp" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative mt-24 border-t border-[#D9A93D]/10 bg-[#0B0B0D]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand */}
        <div className="md:col-span-4">
          <Logo size="md" />
          <p className="mt-5 text-sm text-[#A0A0A5] max-w-sm leading-relaxed">
            Police-verified, trained protection — on demand. Built in India for
            HNI clients, women&apos;s safety, business, events and travel.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid="footer-social-instagram"
              className="w-9 h-9 rounded-full border border-[#D9A93D]/20 inline-flex items-center justify-center text-white/80 hover:border-[#D9A93D] hover:text-[#D9A93D] transition"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid="footer-social-twitter"
              className="w-9 h-9 rounded-full border border-[#D9A93D]/20 inline-flex items-center justify-center text-white/80 hover:border-[#D9A93D] hover:text-[#D9A93D] transition"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid="footer-social-linkedin"
              className="w-9 h-9 rounded-full border border-[#D9A93D]/20 inline-flex items-center justify-center text-white/80 hover:border-[#D9A93D] hover:text-[#D9A93D] transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="md:col-span-2">
          <p className="label-eyebrow">Quick links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={l.testId}
                  className="text-white/80 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener"
                data-testid="footer-download-cta"
                className="inline-flex items-center gap-2 text-[#D9A93D] hover:text-[#E8C366] transition-colors"
              >
                <Download className="w-4 h-4" /> Download App
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="md:col-span-3">
          <p className="label-eyebrow">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={l.testId}
                  className="text-white/80 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <p className="label-eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-[#A0A0A5]">
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#D9A93D] mt-0.5" />
              <a
                href={`mailto:${COMPANY.supportEmail}`}
                data-testid="footer-contact-email"
                className="hover:text-white break-all"
              >
                {COMPANY.supportEmail}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-[#D9A93D] mt-0.5" />
              <a
                href={`tel:${COMPANY.supportPhone.replace(/[^\d+]/g, "")}`}
                data-testid="footer-contact-phone"
                className="hover:text-white"
              >
                {COMPANY.supportPhone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D9A93D] mt-0.5" />
              <span data-testid="footer-contact-address">
                {formatFullAddress()}
              </span>
            </li>
          </ul>
          <div className="mt-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A0A0A5]">
              Serviceable cities
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {COMPANY.serviceCities.map((c) => (
                <span
                  key={c}
                  data-testid={`footer-city-${c.toLowerCase()}`}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[#D9A93D]/15 text-white/80 bg-white/[0.02]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A93D] rk-pulse" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D9A93D]/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-[#A0A0A5]" data-testid="footer-copyright">
            © {year} {COMPANY.brandName}. All rights reserved.
          </p>
          <p className="text-xs text-[#A0A0A5]">
            Made in India · PSARA-compliant operations
          </p>
        </div>
      </div>
    </footer>
  );
}
