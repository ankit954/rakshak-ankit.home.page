import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import Logo from "@/components/Logo";

const NAV = [
  { to: "/", label: "Home", testId: "nav-home" },
  { to: "/become-a-guard", label: "Become a Guard", testId: "nav-become-guard" },
  { to: "/about", label: "About", testId: "nav-about" },
  { to: "/contact", label: "Contact", testId: "nav-contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onDownloadClick = (e) => {
    e.preventDefault();
    const target = document.getElementById("download");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0B0D]/85 backdrop-blur-xl border-b border-[#D9A93D]/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
        <Link to="/" data-testid="header-logo-link" className="flex items-center">
          <Logo size="md" />
        </Link>

        <nav
          className="hidden md:flex items-center gap-1"
          data-testid="primary-nav"
        >
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={n.testId}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#D9A93D]"
                    : "text-white/80 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <span className="inline-flex items-center gap-2">
                  {n.label}
                  {isActive && (
                    <span className="block w-1 h-1 rounded-full bg-[#D9A93D]" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#download"
            onClick={onDownloadClick}
            data-testid="header-download-cta"
            className="hidden sm:inline-flex items-center gap-2 btn-gold rounded-lg px-4 py-2 text-sm"
          >
            <Download className="w-4 h-4" strokeWidth={2} />
            Download App
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-nav-toggle"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#D9A93D]/20 text-white"
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden bg-[#0B0B0D]/95 backdrop-blur-xl border-t border-[#D9A93D]/10"
          data-testid="mobile-nav-panel"
        >
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                data-testid={`${n.testId}-mobile`}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-md text-base ${
                    isActive
                      ? "text-[#D9A93D] bg-[#D9A93D]/5"
                      : "text-white/85 hover:bg-white/5"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href="#download"
              onClick={onDownloadClick}
              data-testid="header-download-cta-mobile"
              className="mt-2 inline-flex items-center justify-center gap-2 btn-gold rounded-lg px-4 py-3 text-sm"
            >
              <Download className="w-4 h-4" /> Download App
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
