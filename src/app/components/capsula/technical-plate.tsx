"use client";

import React, { useEffect, useRef } from 'react';

export function TechnicalAssemblyPlate({ className = '' }: { className?: string }) {
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

    // IntersectionObserver triggers drawing sequence when section enters viewport
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
      viewBox="0 0 660 450"
      role="img"
      aria-label="Plate 02 Half Section A-A Technical Blueprint Drawing of Exnoria System"
    >
      <defs>
        <clipPath id="plate02CutL">
          <rect x="0" y="0" width="320" height="450" />
        </clipPath>
        <clipPath id="plate02CutR">
          <rect x="320" y="0" width="340" height="450" />
        </clipPath>
      </defs>

      {/* Axis & Centerlines */}
      <path className="ctr" d="M60 220 H600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 4 3 4" opacity="0.55" />

      {/* Outer Shell Wall & Cut Cross-Hatch */}
      <path className="surf" d="M200 140 H440 A80 80 0 0 1 440 300 H200 A80 80 0 0 1 200 140 Z" fill="color-mix(in srgb, currentColor 10%, transparent)" />
      <path className="void" d="M200 154 H440 A66 66 0 0 1 440 286 H200 A66 66 0 0 1 200 154 Z" fill="var(--bg)" />
      <path
        className="hatchA"
        clipPath="url(#plate02CutL)"
        fill="url(#hatch45)"
        fillRule="evenodd"
        d="M200 140 H440 A80 80 0 0 1 440 300 H200 A80 80 0 0 1 200 140 Z M200 154 H440 A66 66 0 0 1 440 286 H200 A66 66 0 0 1 200 154 Z"
      />

      {/* Inner Chamber Section & Hatching */}
      <path className="surf" d="M285 185 H355 A35 35 0 0 1 355 255 H285 A35 35 0 0 1 285 185 Z" fill="color-mix(in srgb, currentColor 10%, transparent)" />
      <path
        className="hatchC"
        clipPath="url(#plate02CutL)"
        fill="url(#hatch45d)"
        d="M285 185 H355 A35 35 0 0 1 355 255 H285 A35 35 0 0 1 285 185 Z"
      />
      <path className="c1" clipPath="url(#plate02CutL)" d="M285 185 H355 A35 35 0 0 1 355 255 H285 A35 35 0 0 1 285 185 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path className="hid" clipPath="url(#plate02CutR)" d="M285 185 H355 A35 35 0 0 1 355 255 H285 A35 35 0 0 1 285 185 Z" fill="none" stroke="currentColor" strokeWidth="0.65" strokeDasharray="6 4" opacity="0.5" />

      {/* Outer Contours & Hidden Lines */}
      <path className="c1" d="M200 140 H440 A80 80 0 0 1 440 300 H200 A80 80 0 0 1 200 140 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path className="c2" clipPath="url(#plate02CutL)" d="M200 154 H440 A66 66 0 0 1 440 286 H200 A66 66 0 0 1 200 154 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path className="hid" clipPath="url(#plate02CutR)" d="M200 154 H440 A66 66 0 0 1 440 286 H200 A66 66 0 0 1 200 154 Z" fill="none" stroke="currentColor" strokeWidth="0.65" strokeDasharray="6 4" opacity="0.5" />

      {/* Cut Plane Line A-A */}
      <path className="ctr" d="M320 112 V330" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 4 3 4" opacity="0.55" />
      <text className="t" x="320" y="104" textAnchor="middle" fill="currentColor" fontSize="11px" fontWeight="500" letterSpacing="0.08em">
        A
      </text>
      <text className="t" x="320" y="340" textAnchor="middle" fill="currentColor" fontSize="11px" fontWeight="500" letterSpacing="0.08em">
        A
      </text>

      {/* Detail Concentric Rings */}
      <path className="c3" d="M320 140 A18 80 0 0 1 320 300" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.78" />
      <path className="c3" d="M366 141 A15 79 0 0 1 366 299" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.78" />
      <path className="c3" d="M408 148 A13 72 0 0 1 408 292" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.78" />

      {/* Release Stud Detail */}
      <circle className="surf" cx="452" cy="186" r="17" fill="color-mix(in srgb, currentColor 10%, transparent)" />
      <g className="warn">
        <circle className="c2" cx="452" cy="186" r="17" fill="none" stroke="var(--alert)" strokeWidth="1" />
        <circle className="c3" cx="452" cy="186" r="9" fill="none" stroke="var(--alert)" strokeWidth="0.65" opacity="0.78" />
        <path className="c3" d="M452 171 v-7 M452 201 v7 M437 186 h-7 M467 186 h7" fill="none" stroke="var(--alert)" strokeWidth="0.65" />
      </g>

      {/* Overall Length Dimension */}
      <path className="ext" d="M120 302 V404 M520 302 V404" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path className="dim" markerStart="url(#arw)" d="M120 392 H262" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <path className="dim" markerEnd="url(#arw)" d="M378 392 H520" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <text className="t" x="320" y="392" textAnchor="middle" fill="currentColor" fontSize="11px" fontWeight="500">
        34.0
      </text>

      {/* Diameter Dimension */}
      <path className="ext" d="M534 140 H614 M534 300 H614" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path className="dim" markerStart="url(#arw)" d="M602 140 V192" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <path className="dim" markerEnd="url(#arw)" d="M602 248 V300" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <text className="t" x="602" y="220" textAnchor="middle" transform="rotate(-90 602 220)" fill="currentColor" fontSize="11px" fontWeight="500">
        ø 12.0
      </text>

      {/* Wall Leader */}
      <circle className="node" cx="250" cy="147" r="2.4" fill="currentColor" />
      <path className="lead" d="M250 147 L292 82 H404" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="404" y="74" textAnchor="end" fill="currentColor" fontSize="11px" fontWeight="500">
        1.2 WALL (TYP)
      </text>

      {/* Radius Leader */}
      <path className="dim" markerEnd="url(#arw)" d="M200 220 L153 173" fill="none" stroke="currentColor" strokeWidth="0.65" />
      <circle className="node" cx="200" cy="220" r="2" fill="currentColor" />
      <path className="lead" d="M153 173 L118 130 H58" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="58" y="122" fill="currentColor" fontSize="11px" fontWeight="500">
        R6.0
      </text>

      {/* Release Stud Leader */}
      <circle className="node" cx="464" cy="174" r="2.4" fill="currentColor" />
      <path className="lead" d="M464 174 L508 128 H602" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.85" />
      <text className="t" x="602" y="120" textAnchor="end" fill="currentColor" fontSize="11px" fontWeight="500">
        RELEASE STUD
      </text>

      {/* Title Annotation */}
      <text className="t tm" x="330" y="434" textAnchor="middle" fill="currentColor" opacity="0.62" fontSize="11px">
        HALF SECTION A–A · SYSTEM SPEC DWG 2049-B
      </text>
    </svg>
  );
}
