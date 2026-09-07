import React from "react";
import { PLAY_STORE_URL, APP_STORE_URL } from "@/config/appLinks";

/**
 * Official Apple / Google store badges.
 * - When the corresponding env var is set → real outbound link, opens in a new tab.
 * - Otherwise → non-interactive badge with an accessible "coming soon" state.
 * The badges are the official artwork downloaded from Apple / Google's
 * marketing-resources pages, served from /public.
 */
const BadgeLink = ({ href, alt, src, height, testId }) => {
  const isPlaceholder = !href;
  const Badge = isPlaceholder ? "span" : "a";
  return (
    <Badge
      href={isPlaceholder ? undefined : href}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener"}
      role={isPlaceholder ? "link" : undefined}
      aria-disabled={isPlaceholder ? true : undefined}
      data-testid={testId}
      aria-label={`${alt}${isPlaceholder ? " — Coming Soon" : ""}`}
      className={`inline-flex items-center relative transition-transform duration-200 ${
        isPlaceholder ? "cursor-default" : "hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A93D]"
      }`}
    >
      <img
        data-testid={`${testId}-badge`}
        src={src}
        alt={alt}
        draggable={false}
        style={{ height: `${height}px`, width: "auto" }}
        className="block select-none"
      />
      {isPlaceholder && (
        <span
          data-testid={`${testId}-soon`}
          className="absolute -top-2 -right-2 text-[9px] uppercase tracking-[0.16em] bg-[#D9A93D] text-[#0B0B0D] font-semibold px-1.5 py-0.5 rounded-full shadow-[0_4px_12px_rgba(217,169,61,0.35)]"
          aria-hidden="true"
        >
          Soon
        </span>
      )}
    </Badge>
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
        href={PLAY_STORE_URL}
        height={height + 16}
        testId={`${testIdPrefix}-play-store`}
      />
      <BadgeLink
        src="/app-store-badge.svg"
        alt="Download on the App Store"
        href={APP_STORE_URL}
        height={height}
        testId={`${testIdPrefix}-app-store`}
      />
    </div>
  );
};

export default DownloadButtons;
