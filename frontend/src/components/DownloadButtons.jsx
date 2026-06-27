import React from "react";
import { Apple, Play } from "lucide-react";

const PLAY_URL = process.env.REACT_APP_PLAY_STORE_URL || "";
const APP_URL = process.env.REACT_APP_APP_STORE_URL || "";

const base =
  "group inline-flex items-center gap-3 rounded-lg px-5 py-3 transition-all duration-200 select-none";
const styleSolid =
  "bg-[#D9A93D] text-[#0B0B0D] hover:bg-[#E8C366] shadow-[0_8px_24px_rgba(217,169,61,0.18)]";
const styleGhost =
  "border border-[#D9A93D]/30 text-white hover:border-[#D9A93D] hover:bg-[#D9A93D]/5";

const StoreButton = ({ icon: Icon, label, sub, solid, testId, href }) => {
  const isPlaceholder = !href;
  return (
    <a
      href={href || "#"}
      onClick={(e) => {
        if (isPlaceholder) e.preventDefault();
      }}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      data-testid={testId}
      className={`${base} ${solid ? styleSolid : styleGhost}`}
      aria-label={`${label}${isPlaceholder ? " — Coming Soon" : ""}`}
    >
      <Icon className="w-6 h-6" strokeWidth={1.6} />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[10px] tracking-[0.18em] uppercase opacity-80">
          {sub}
        </span>
        <span className="text-sm font-semibold">{label}</span>
      </span>
    </a>
  );
};

export const DownloadButtons = ({
  variant = "default",
  className = "",
  testIdPrefix = "download",
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <StoreButton
        icon={Play}
        sub={PLAY_URL ? "Get it on" : "Coming Soon"}
        label="Google Play"
        solid={variant === "default"}
        testId={`${testIdPrefix}-play-store`}
        href={PLAY_URL}
      />
      <StoreButton
        icon={Apple}
        sub={APP_URL ? "Download on the" : "Coming Soon"}
        label="App Store"
        solid={false}
        testId={`${testIdPrefix}-app-store`}
        href={APP_URL}
      />
    </div>
  );
};

export default DownloadButtons;
