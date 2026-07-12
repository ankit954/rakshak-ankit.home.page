import React from "react";

const PLAY_URL = process.env.REACT_APP_PLAY_STORE_URL || "";
const APP_URL = process.env.REACT_APP_APP_STORE_URL || "";

/**
 * Official Apple / Google store badges.
 * - When the corresponding env var is set → real outbound link, opens in a new tab.
 * - Otherwise → placeholder ("coming soon" – href="#", preventDefault).
 * The badges are the official artwork downloaded from Apple / Google's
 * marketing-resources pages, served from /public.
 */
const BadgeLink = ({ href, alt, src, height, testId, comingSoon }) => {
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
      aria-label={`${alt}${isPlaceholder ? " — Coming Soon" : ""}`}
      className={`inline-flex items-center relative transition-transform duration-200 hover:-translate-y-0.5 ${
        isPlaceholder ? "cursor-default" : ""
      }`}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ height: `${height}px`, width: "auto" }}
        className="block select-none"
      />
      {isPlaceholder && (
        <span
          className="absolute -top-2 -right-2 text-[9px] uppercase tracking-[0.16em] bg-[#D9A93D] text-[#0B0B0D] font-semibold px-1.5 py-0.5 rounded-full shadow-[0_4px_12px_rgba(217,169,61,0.35)]"
          aria-hidden="true"
        >
          Soon
        </span>
      )}
    </a>
  );
};

export const DownloadButtons = ({
  className = "",
  testIdPrefix = "download",
  height = 48,
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <BadgeLink
        src="/google-play-badge.png"
        alt="Get it on Google Play"
        href={PLAY_URL}
        height={height + 16}
        testId={`${testIdPrefix}-play-store`}
        comingSoon={!PLAY_URL}
      />
      <BadgeLink
        src="/app-store-badge.svg"
        alt="Download on the App Store"
        href={APP_URL}
        height={height}
        testId={`${testIdPrefix}-app-store`}
        comingSoon={!APP_URL}
      />
    </div>
  );
};

export default DownloadButtons;
