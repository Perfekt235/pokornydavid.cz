// GradientText.tsx
import React, { ReactNode, CSSProperties } from "react";
import "./GradientText.css";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  colors?: string[];          // ad-hoc barvy
  gradientVar?: string;       // např. "--text-gradient-blue-mint"
  animationSpeed?: number;
  showBorder?: boolean;
};

export default function GradientText({
  children,
  className = "",
  colors = [
    "var(--brand-primary)",
    "var(--brand-blue-soft)",
    "var(--brand-blue)",
    "var(--brand-primary)",
  ],
  gradientVar,
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle: CSSProperties = gradientVar
    ? {
        backgroundImage: `var(${gradientVar})`,
        animationDuration: `${animationSpeed}s`,
      }
    : {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
      };

  return (
    <div className={`animated-gradient-text ${className}`}>
      {showBorder && (
        <div className="gradient-overlay" style={gradientStyle}></div>
      )}
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}
