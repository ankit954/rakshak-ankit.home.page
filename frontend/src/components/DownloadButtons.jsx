import React from "react";
import { Apple, Play } from "lucide-react";

const base =
  "group inline-flex items-center gap-3 rounded-lg px-5 py-3 transition-all duration-200 select-none";
const styleSolid =
  "bg-[#D9A93D] text-[#0B0B0D] hover:bg-[#E8C366] shadow-[0_8px_24px_rgba(217,169,61,0.18)]";
const styleGhost =
  "border border-[#D9A93D]/30 text-white hover:border-[#D9A93D] hover:bg-[#D9A93D]/5";

const StoreButton = ({ icon: Icon, label, sub, solid, testId }) => (
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    data-testid={testId}
    className={`${base} ${solid ? styleSolid : styleGhost}`}
    aria-label={`${label} — Coming Soon`}
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

/**
 * Coming Soon Download Buttons — Play Store / App Store placeholders.
 */
export const DownloadButtons = ({
  variant = "default",
  className = "",
  testIdPrefix = "download",
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <StoreButton
        icon={Play}
        sub="Coming Soon"
        label="Google Play"
        solid={variant === "default"}
        testId={`${testIdPrefix}-play-store`}
      />
      <StoreButton
        icon={Apple}
        sub="Coming Soon"
        label="App Store"
        solid={false}
        testId={`${testIdPrefix}-app-store`}
      />
    </div>
  );
};

export default DownloadButtons;
