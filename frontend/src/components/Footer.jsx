import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";
import Logo from "@/components/Logo";

const cities = ["Delhi", "Gurugram", "Noida", "Ghaziabad", "Faridabad"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative mt-24 border-t border-[#D9A93D]/10 bg-[#0B0B0D]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Logo size="md" />
          <p className="mt-5 text-sm text-[#A0A0A5] max-w-sm leading-relaxed">
            Police-verified, trained protection — on demand. Built in India for
            HNI clients, women&apos;s safety, business, events and travel.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-[#A0A0A5]">
            <Mail className="w-4 h-4 text-[#D9A93D]" />
            <a
              href="mailto:contactus@therakshak.in"
              data-testid="footer-contact-email"
              className="hover:text-white transition-colors"
            >
              contactus@therakshak.in
            </a>
          </div>
          <div className="mt-2 flex items-start gap-2 text-sm text-[#A0A0A5]">
            <MapPin className="w-4 h-4 text-[#D9A93D] mt-0.5" />
            <span>
              Delhi NCR (Launch) — Gurugram · Noida · Ghaziabad · Faridabad
            </span>
          </div>

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

        <div className="md:col-span-2">
          <p className="label-eyebrow">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                to="/about"
                data-testid="footer-link-about"
                className="text-white/80 hover:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/become-a-guard"
                data-testid="footer-link-careers"
                className="text-white/80 hover:text-white"
              >
                Become a Guard
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                data-testid="footer-link-contact"
                className="text-white/80 hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="label-eyebrow">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                to="/privacy"
                data-testid="footer-link-privacy"
                className="text-white/80 hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                data-testid="footer-link-terms"
                className="text-white/80 hover:text-white"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/dpdp"
                data-testid="footer-link-dpdp"
                className="text-white/80 hover:text-white"
              >
                DPDP Consent
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="label-eyebrow">Serviceable Cities</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {cities.map((c) => (
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
          <p className="mt-5 text-xs text-[#A0A0A5] leading-relaxed">
            More cities rolling out. Want RAKSHAK in your city?{" "}
            <Link
              to="/contact"
              className="text-[#D9A93D] hover:text-[#E8C366] underline-offset-4 hover:underline"
            >
              Request access
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="border-t border-[#D9A93D]/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-[#A0A0A5]">
            © {year} RAKSHAK Technologies Pvt. Ltd. — All rights reserved.
          </p>
          <p className="text-xs text-[#A0A0A5]">
            Made in India · PSARA-compliant operations
          </p>
        </div>
      </div>
    </footer>
  );
}
