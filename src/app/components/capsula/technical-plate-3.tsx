"use client";

import React, { useEffect, useRef } from 'react';

export function TechnicalAssemblyPlate3({ className = '' }: { className?: string }) {
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
      viewBox="0 0 680 480"
      role="img"
      aria-label="Plate 03 Isometric Core System Architecture Technical Blueprint Drawing"
    >
      <defs>
        <clipPath id="plate03CutTop">
          <polygon points="340,60 580,200 340,340 100,200" />
        </clipPath>
        <clipPath id="plate03LeftWing">
          <rect x="40" y="40" width="300" height="400" />
        </clipPath>
        <clipPath id="plate03RightWing">
          <rect x="340" y="40" width="300" height="400" />
        </clipPath>
      </defs>

      {/* Isometric Grid Background Pattern */}
      <rect className="isogrid" x="80" y="60" width="520" height="360" opacity="0.35" />

      {/* Axis & Centerlines */}
      <path className="ctr" d="M80 240 H600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 4 3 4" opacity="0.55" />
      <path className="ctr" d="M340 60 V420" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 4 3 4" opacity="0.55" />
      <path className="ctr" d="M140 355 L540 125" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 4 3 4" opacity="0.45" />
      <path className="ctr" d="M140 125 L540 355" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 4 3 4" opacity="0.45" />

      {/* Primary Isometric Module Block Surface & Hatching */}
      <polygon className="surf" points="340,110 520,214 340,318 160,214" fill="color-mix(in srgb, currentColor 10%, transparent)" />
      <path className="hatchA" clipPath="url(#plate03LeftWing)" fill="url(#hatch45)" d="M340,110 L520,214 L340,318 L160,214 Z" />
      
      {/* Upper Isometric Ring Assembly */}
      <path className="c1" d="M340,110 L520,214 L340,318 L160,214 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path className="c2" d="M340,135 L480,214 L340,293 L200,214 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path className="hatchC" fill="url(#hatch45d)" d="M340,135 L480,214 L340,293 L200,214 Z" />

      {/* Vertical Extrusions & Walls */}
      <path className="c1" d="M160,214 V294 L340,398 V318 Z" fill="color-mix(in srgb, currentColor 8%, transparent)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path className="c1" d="M520,214 V294 L340,398 V318 Z" fill="color-mix(in srgb, currentColor 14%, transparent)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path className="hatchB" clipPath="url(#plate03RightWing)" fill="url(#hatch135)" d="M520,214 V294 L340,398 V318 Z" />

      {/* Hidden Lines inside Vertical Core */}
      <path className="hid" d="M160,214 L340,110 L520,214" fill="none" stroke="currentColor" strokeWidth="0.65" strokeDasharray="6 4" opacity="0.5" />
      <path className="hid" d="M340,110 V294" fill="none" stroke="currentColor" strokeWidth="0.65" strokeDasharray="6 4" opacity="0.5" />

      {/* Concentric Cylindrical Core Rings (Top Core View) */}
      <ellipse className="c3" cx="340" cy="214" rx="84" ry="48" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.8" />
      <ellipse className="c2" cx="340" cy="214" rx="56" ry="32" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle className="surf" cx="340" cy="214" r="16" fill="color-mix(in srgb, currentColor 16%, transparent)" />
      <ellipse className="c1" cx="340" cy="214" rx="24" ry="14" fill="var(--bg)" stroke="currentColor" strokeWidth="1.5" />

      {/* Signal Node Intersections & Sub-Components */}
      <circle className="node" cx="160" cy="214" r="3" fill="currentColor" />
      <circle className="node" cx="520" cy="214" r="3" fill="currentColor" />
      <circle className="node" cx="340" cy="398" r="3" fill="currentColor" />
      <circle className="node" cx="340" cy="110" r="3" fill="currentColor" />

      {/* Satellite Node Assembly (Right Side Feature) */}
      <g className="warn">
        <circle className="c2" cx="490" cy="150" r="14" fill="none" stroke="var(--accent)" strokeWidth="1" />
        <circle className="c3" cx="490" cy="150" r="7" fill="none" stroke="var(--accent)" strokeWidth="0.65" opacity="0.8" />
        <path className="c3" d="M490 132 v-6 M490 168 v6 M472 150 h-6 M508 150 h6" fill="none" stroke="var(--accent)" strokeWidth="0.65" />
      </g>

      {/* Dimension Line Left (Span Width) */}
      <path className="ext" d="M160 214 L110 185 M340 110 L290 81" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path className="dim" markerStart="url(#arw)" d="M115 188 L295 84" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <text className="t" x="195" y="125" textAnchor="middle" transform="rotate(-30 195 125)" fill="currentColor" fontSize="11px" fontWeight="500">
        34.0 (TYP)
      </text>

      {/* Dimension Line Right (Vertical Chamber Height) */}
      <path className="ext" d="M520 294 H610 M520 214 H610" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path className="dim" markerStart="url(#arw)" d="M598 214 V242" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <path className="dim" markerEnd="url(#arw)" d="M598 266 V294" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <text className="t" x="598" y="255" textAnchor="middle" transform="rotate(-90 598 255)" fill="currentColor" fontSize="11px" fontWeight="500">
        H 80.0
      </text>

      {/* Leader Lines & Annotations */}
      <circle className="node" cx="340" cy="214" r="2.4" fill="currentColor" />
      <path className="lead" d="M340 214 L410 145 H550" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="550" y="137" textAnchor="end" fill="currentColor" fontSize="11px" fontWeight="500">
        SYSTEM LOGIC CORE · R14
      </text>

      <circle className="node" cx="490" cy="150" r="2.4" fill="currentColor" />
      <path className="lead" d="M490 150 L535 95 H630" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="630" y="87" textAnchor="end" fill="currentColor" fontSize="11px" fontWeight="500">
        OPTICAL BUS STACK
      </text>

      <circle className="node" cx="250" cy="346" r="2.4" fill="currentColor" />
      <path className="lead" d="M250 346 L180 395 H70" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="70" y="387" fill="currentColor" fontSize="11px" fontWeight="500">
        EXPRESS FLOW CHAMBER
      </text>

      {/* Title Annotation */}
      <text className="t tm" x="340" y="454" textAnchor="middle" fill="currentColor" opacity="0.65" fontSize="11px">
        ISOMETRIC EXPLODED ASSEMBLY B–B · SYSTEM SPEC DWG 2049-C
      </text>
    </svg>
  );
}
