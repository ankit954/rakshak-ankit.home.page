import React from "react";

/** Wrapper for consistent page-section spacing & container */
export const Section = ({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  testId,
  align = "left",
}) => {
  return (
    <section
      id={id}
      data-testid={testId}
      className={`relative py-20 md:py-28 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {(eyebrow || title || subtitle) && (
          <div
            className={`max-w-3xl mb-12 md:mb-16 ${
              align === "center" ? "mx-auto text-center" : ""
            }`}
          >
            {eyebrow && <p className="label-eyebrow">{eyebrow}</p>}
            {title && (
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-[1.05]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 text-base md:text-lg text-[#A0A0A5] leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
