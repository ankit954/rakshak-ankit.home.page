import React from "react";

export const Logo = ({ size = "md", className = "" }) => {
  const sz = {
    sm: { wrap: "h-7", mark: "w-7 h-7", text: "text-base" },
    md: { wrap: "h-9", mark: "w-9 h-9", text: "text-xl" },
    lg: { wrap: "h-12", mark: "w-12 h-12", text: "text-2xl" },
  }[size];

  return (
    <div
      className={`flex items-center gap-2.5 ${sz.wrap} ${className}`}
      data-testid="rakshak-logo"
    >
      <svg
        viewBox="0 0 48 48"
        className={`${sz.mark}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rkGoldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0D27A" />
            <stop offset="55%" stopColor="#D9A93D" />
            <stop offset="100%" stopColor="#8A6B26" />
          </linearGradient>
        </defs>
        {/* Shield outline */}
        <path
          d="M24 3.5 L42 9 V22.5 C42 33.2 34.8 41.2 24 44.5 C13.2 41.2 6 33.2 6 22.5 V9 Z"
          stroke="url(#rkGoldGrad)"
          strokeWidth="2"
          fill="none"
        />
        {/* Inner stylised R */}
        <path
          d="M18 14 H26.5 C29.5 14 31.5 16 31.5 19 C31.5 21.5 30 23.4 27.5 24 L32 33 H28 L24 25 H21 V33 H18 Z M21 17 V22 H26 C27.4 22 28.5 21 28.5 19.5 C28.5 18 27.4 17 26 17 Z"
          fill="url(#rkGoldGrad)"
        />
      </svg>
      <span
        className={`font-display ${sz.text} font-bold tracking-[0.18em] text-white`}
      >
        RAKS<span className="gold-text">HAK</span>
      </span>
    </div>
  );
};

export default Logo;
