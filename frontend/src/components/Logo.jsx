import React from "react";

/**
 * RAKSHAK Logo
 * The provided asset is a square composition (shield-R + "RAKSHAK" wordmark
 * stacked) on a near-black background that matches the site bg (#0B0B0D),
 * so it blends seamlessly without needing a transparent cutout.
 */
export const Logo = ({ size = "md", className = "" }) => {
  const dimensions = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
    xl: "h-28 w-28",
  }[size];

  return (
    <div
      className={`inline-flex items-center ${className}`}
      data-testid="rakshak-logo"
    >
      <img
        src="/rakshak-logo.png"
        alt="RAKSHAK — Police-Verified Bodyguards"
        className={`${dimensions} object-contain select-none`}
        draggable={false}
      />
    </div>
  );
};

export default Logo;
