"use client";

export function CapsulaSvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* Brand Mark Solo */}
        <symbol id="mark" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20.5" fill="none" stroke="currentColor" strokeWidth="2.5"/>
          <g transform="rotate(-45 24 24)">
            <rect x="12" y="18" width="24" height="12" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M24 18V30" stroke="currentColor" strokeWidth="2.5"/>
          </g>
        </symbol>

        {/* Brand Mark Duo (Aqua + Orange Dot) */}
        <symbol id="mark-duo" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20.5" fill="none" stroke="var(--brand-aqua)" strokeWidth="2.5"/>
          <g transform="rotate(-45 24 24)">
            <rect x="12" y="18" width="24" height="12" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M24 18V30" stroke="currentColor" strokeWidth="2.5"/>
            <circle cx="30" cy="24" r="2.4" fill="var(--brand-orange)" stroke="none"/>
          </g>
        </symbol>

        {/* Signal Fade Gradient */}
        <linearGradient id="sigFadeG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--bg-deep)" stopOpacity="1"/>
          <stop offset="0.09" stopColor="var(--bg-deep)" stopOpacity="0"/>
          <stop offset="0.91" stopColor="var(--bg-deep)" stopOpacity="0"/>
          <stop offset="1" stopColor="var(--bg-deep)" stopOpacity="1"/>
        </linearGradient>

        {/* Technical Arrowheads */}
        <marker id="arw" viewBox="0 0 12 8" refX="11" refY="4" markerWidth="9" markerHeight="6" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <path d="M0 0.4 L12 4 L0 7.6 L2.6 4 Z" fill="currentColor" stroke="none"/>
        </marker>
        <marker id="arwOpen" viewBox="0 0 12 8" refX="11" refY="4" markerWidth="9" markerHeight="6" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <path d="M1 0.6 L12 4 L1 7.4" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>

        {/* Hatching Patterns */}
        <pattern id="hatch45" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V7" stroke="currentColor" strokeWidth="0.7" opacity="0.62"/>
        </pattern>
        <pattern id="hatch135" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <path d="M0 0 V7" stroke="currentColor" strokeWidth="0.7" opacity="0.62"/>
        </pattern>
        <pattern id="hatch45d" width="3.5" height="3.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V3.5" stroke="currentColor" strokeWidth="0.7" opacity="0.8"/>
        </pattern>
        <pattern id="hatchIcon" width="1.5" height="1.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V1.5" stroke="currentColor" strokeWidth="0.16" opacity="0.7"/>
        </pattern>
        <pattern id="isoGrid" width="34" height="19.63" patternUnits="userSpaceOnUse">
          <path d="M0 19.63 L17 9.81 L34 19.63 M0 0 L17 9.81 L34 0 M17 9.81 V29" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
      </defs>
    </svg>
  );
}
