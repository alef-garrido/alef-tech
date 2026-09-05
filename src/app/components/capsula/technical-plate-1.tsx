"use client";

import React, { useEffect, useRef } from 'react';

export function TechnicalAssemblyPlate1({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    const playDrawAnimation = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const STAGES = [
        { sel: '.cons, .ctr, .phantom, .hid', delay: 0, dur: 180, draw: false },
        { sel: '.c1, .c2', delay: 140, dur: 900, draw: true },
        { sel: '.c3', delay: 620, dur: 700, draw: true },
        { sel: '.surf, .void, .surf-fill, .hatchA, .hatchB, .hatchC, .isogrid', delay: 1000, dur: 260, draw: false },
        { sel: '.ext, .lead', delay: 1150, dur: 320, draw: true },
        { sel: '.dim, .node, text, .bal-n', delay: 1400, dur: 200, draw: false },
      ];

      STAGES.forEach((st) => {
        const els = svg.querySelectorAll(st.sel);
        els.forEach((el, i) => {
          const pathEl = el as SVGPathElement;
          const delay = st.delay + i * 25;
          if (st.draw && typeof pathEl.getTotalLength === 'function') {
            let L = 0;
            try {
              L = pathEl.getTotalLength();
            } catch (e) {
              L = 0;
            }
            if (L > 0) {
              pathEl.animate(
                [
                  { strokeDasharray: `${L}px ${L + 1}px`, strokeDashoffset: `${L}px` },
                  { strokeDasharray: `${L}px ${L + 1}px`, strokeDashoffset: '0px' },
                ],
                { duration: st.dur, delay, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'backwards' }
              );
              return;
            }
          }
          pathEl.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: st.dur,
            delay,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'backwards',
          });
        });
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              playDrawAnimation();
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
      );
      observer.observe(svg);
      return () => observer.disconnect();
    } else {
      playDrawAnimation();
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`dwg text-[var(--accent)] ${className}`}
      viewBox="0 0 660 460"
      role="img"
      aria-label="Plate 01 Core System Architecture Technical Blueprint Drawing"
    >
      <defs>
        <clipPath id="plate01CutL">
          <rect x="0" y="0" width="330" height="460" />
        </clipPath>
        <clipPath id="plate01CutR">
          <rect x="330" y="0" width="330" height="460" />
        </clipPath>
      </defs>

      {/* Isometric Grid Background Pattern */}
      <rect className="isogrid" x="40" y="40" width="580" height="380" opacity="0.35" />

      {/* Axis & Centerlines */}
      <path className="ctr" d="M40 230 H620" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 4 3 4" opacity="0.55" />
      <path className="ctr" d="M330 40 V420" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 4 3 4" opacity="0.55" />
      <path className="cons" d="M120 40 L540 420" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 3" opacity="0.3" />
      <path className="cons" d="M120 420 L540 40" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 3" opacity="0.3" />

      {/* Outer Shell Wall & Cut Cross-Hatch */}
      <circle className="surf" cx="330" cy="230" r="140" fill="color-mix(in srgb, currentColor 10%, transparent)" />
      <circle className="void" cx="330" cy="230" r="120" fill="var(--bg)" />
      <circle
        className="hatchA"
        clipPath="url(#plate01CutL)"
        fill="url(#hatch45)"
        cx="330"
        cy="230"
        r="140"
      />

      {/* Concentric Structural Rings */}
      <circle className="c1" cx="330" cy="230" r="140" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle className="c2" clipPath="url(#plate01CutL)" cx="330" cy="230" r="120" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle className="hid" clipPath="url(#plate01CutR)" cx="330" cy="230" r="120" fill="none" stroke="currentColor" strokeWidth="0.65" strokeDasharray="6 4" opacity="0.5" />

      {/* Inner Chamber Section & Hatching */}
      <circle className="surf" cx="330" cy="230" r="75" fill="color-mix(in srgb, currentColor 12%, transparent)" />
      <circle className="hatchC" clipPath="url(#plate01CutL)" fill="url(#hatch45d)" cx="330" cy="230" r="75" />
      <circle className="c1" cx="330" cy="230" r="75" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle className="c3" cx="330" cy="230" r="45" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.8" />

      {/* Central Core Unit */}
      <rect className="surf-fill" x="290" y="190" width="80" height="80" rx="12" fill="var(--surface-2)" />
      <rect className="c1" x="290" y="190" width="80" height="80" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle className="node" cx="330" cy="230" r="5" fill="currentColor" />

      {/* Radial Satellite Nodes */}
      <g className="warn">
        <circle className="c2" cx="470" cy="230" r="16" fill="none" stroke="var(--alert)" strokeWidth="1" />
        <circle className="c3" cx="470" cy="230" r="8" fill="none" stroke="var(--alert)" strokeWidth="0.65" opacity="0.8" />
        <path className="c3" d="M470 208 v-8 M470 252 v8 M448 230 h-8 M492 230 h8" fill="none" stroke="var(--alert)" strokeWidth="0.65" />
        <circle className="node" cx="470" cy="230" r="2.5" fill="var(--alert)" />
      </g>

      <g>
        <circle className="c2" cx="190" cy="230" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle className="c3" cx="190" cy="230" r="8" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.8" />
        <circle className="node" cx="190" cy="230" r="2.5" fill="currentColor" />
      </g>

      {/* Overall Outer Diameter Dimension */}
      <path className="ext" d="M190 90 V30 M470 90 V30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path className="dim" markerStart="url(#arw)" d="M190 42 H280" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <path className="dim" markerEnd="url(#arw)" d="M380 42 H470" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <text className="t" x="330" y="42" textAnchor="middle" fill="currentColor" fontSize="11px" fontWeight="500">
        ø 280.0
      </text>

      {/* Inner Chamber Radius Dimension */}
      <path className="dim" markerEnd="url(#arw)" d="M330 230 L383 177" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <circle className="node" cx="330" cy="230" r="2" fill="currentColor" />
      <path className="lead" d="M383 177 L425 135 H520" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="520" y="127" textAnchor="end" fill="currentColor" fontSize="11px" fontWeight="500">
        R75.0 CHAMBER
      </text>

      {/* Wall & Logic Leaders */}
      <circle className="node" cx="330" cy="90" r="2.4" fill="currentColor" />
      <path className="lead" d="M330 90 L275 140 H140" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="140" y="132" fill="currentColor" fontSize="11px" fontWeight="500">
        1.2 SHELL WALL (TYP)
      </text>

      <circle className="node" cx="470" cy="230" r="2.4" fill="currentColor" />
      <path className="lead" d="M470 230 L520 280 H610" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="610" y="272" textAnchor="end" fill="currentColor" fontSize="11px" fontWeight="500">
        SIGNAL OUTPUT BUS
      </text>

      {/* Title Annotation */}
      <text className="t tm" x="330" y="440" textAnchor="middle" fill="currentColor" opacity="0.65" fontSize="11px">
        PLAN SECTION A–A · CORE SYSTEM SPEC DWG 2049-A
      </text>
    </svg>
  );
}
