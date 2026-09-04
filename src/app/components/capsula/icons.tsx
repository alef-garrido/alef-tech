"use client";

import React, { useEffect, useRef } from 'react';

export type IconName =
  | 'capsule'
  | 'deploy'
  | 'radar'
  | 'shield'
  | 'gauge'
  | 'satellite'
  | 'wrench'
  | 'cube'
  | 'signal'
  | 'battery'
  | 'chip'
  | 'thermal'
  | 'lock'
  | 'scan'
  | 'calibrate'
  | 'alert'
  | 'clock'
  | 'layers';

export type IconTier = 1 | 2 | 3;

interface CapsulaIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  tier?: IconTier;
  size?: number;
  animate?: boolean;
}

const ICON_DATA: Record<
  IconName,
  {
    g?: string;
    p: string; // primary contour
    d: string; // surface detail
    s: string; // surface fill/hatch
    x?: string; // center lines
    c: string; // construction geometry
  }
> = {
  capsule: {
    g: 'rotate(-45 12 12)',
    p: '<rect x="3.5" y="9" width="17" height="6" rx="3"/>',
    d: '<path d="M12 9v6"/><circle cx="16.6" cy="12" r="1.15"/>',
    s: '<path d="M12 9H6.5a3 3 0 0 0 0 6H12Z"/>',
    x: '<path d="M1.5 12H22.5"/>',
    c: '<circle cx="12" cy="12" r="10.5"/>',
  },
  deploy: {
    p: '<path d="M12 20.5V5.5"/><path d="M6.5 11 12 5.5l5.5 5.5"/><path d="M3.5 21h17"/>',
    d: '<path d="M9 14.5h6"/>',
    s: '<path d="M12 6.2 16.8 11H7.2Z"/>',
    x: '<path d="M12 2v20"/>',
    c: '<path d="M6.5 11h11M3.5 5.5h17"/>',
  },
  radar: {
    p: '<circle cx="12" cy="12" r="9"/>',
    d: '<circle cx="12" cy="12" r="5"/><path d="M12 12 18.4 5.6"/><circle cx="12" cy="12" r="1"/>',
    s: '<path d="M12 12V3a9 9 0 0 1 6.4 2.6Z"/>',
    x: '<path d="M12 2v20M2 12h20"/>',
    c: '<circle cx="12" cy="12" r="7"/>',
  },
  shield: {
    p: '<path d="M12 3 5 5.9v5.3c0 4.3 2.9 7.6 7 9.3 4.1-1.7 7-5 7-9.3V5.9Z"/>',
    d: '<path d="M8.8 12.2 11 14.4 15.4 10"/>',
    s: '<path d="M12 3 5 5.9v5.3c0 4.3 2.9 7.6 7 9.3 4.1-1.7 7-5 7-9.3V5.9Z"/>',
    x: '<path d="M12 2v20"/>',
    c: '<path d="M5 5.9h14M5 11.2h14"/>',
  },
  gauge: {
    p: '<path d="M3.5 17.5a8.5 8.5 0 0 1 17 0"/><path d="M3.5 17.5h17"/>',
    d: '<path d="M12 17.5 15.8 10.6"/><circle cx="12" cy="17.5" r="1"/><path d="M6 13.2 7 14.2M12 11.5v1.4M18 13.2l-1 1"/>',
    s: '<path d="M3.5 17.5a8.5 8.5 0 0 1 17 0Z"/>',
    x: '<path d="M12 20V6"/>',
    c: '<path d="M6.5 17.5a5.5 5.5 0 0 1 11 0"/>',
  },
  satellite: {
    p: '<path d="M12 5.6 18.4 12 12 18.4 5.6 12Z"/>',
    d: '<path d="M6.6 6.6 3 3M17.4 6.6 21 3"/><path d="M5.4 15.2a6.4 6.4 0 0 0 3.4 3.4"/><path d="M2.8 17.6A9 9 0 0 0 6.4 21.2"/>',
    s: '<path d="M12 5.6 18.4 12 12 18.4 5.6 12Z"/>',
    x: '<path d="M12 3v18M3 12h18"/>',
    c: '<circle cx="12" cy="12" r="9.05"/>',
  },
  wrench: {
    p: '<path d="M15.4 5.3a4.5 4.5 0 0 0-5.9 5.9L4 16.7 7.3 20l5.5-5.5a4.5 4.5 0 0 0 5.9-5.9l-2.7 2.7-2.4-.6-.6-2.4Z"/>',
    d: '<path d="M5.9 16.6 7.4 18.1"/>',
    s: '<path d="M15.4 5.3a4.5 4.5 0 0 0-5.9 5.9L4 16.7 7.3 20l5.5-5.5a4.5 4.5 0 0 0 5.9-5.9l-2.7 2.7-2.4-.6-.6-2.4Z"/>',
    x: '<path d="M3 21 21 3"/>',
    c: '<circle cx="14.4" cy="9.6" r="4.5"/>',
  },
  cube: {
    p: '<path d="M12 2.8 4.3 7.2v9.6L12 21.2l7.7-4.4V7.2Z"/>',
    d: '<path d="M4.3 7.2 12 11.6l7.7-4.4"/><path d="M12 11.6v9.6"/>',
    s: '<path d="M4.3 7.2 12 11.6v9.6l-7.7-4.4Z"/>',
    x: '<path d="M12 2v20"/>',
    c: '<path d="M4.3 16.8 19.7 7.2M4.3 7.2l15.4 9.6"/>',
  },
  signal: {
    p: '<rect x="3" y="14" width="3.4" height="6" rx="1"/><rect x="8.3" y="10.6" width="3.4" height="9.4" rx="1"/><rect x="13.6" y="7.2" width="3.4" height="12.8" rx="1"/><rect x="18.9" y="3.8" width="3.4" height="16.2" rx="1"/>',
    d: '<path d="M2 20.6h20.5"/>',
    s: '<rect x="3" y="14" width="3.4" height="6" rx="1"/><rect x="8.3" y="10.6" width="3.4" height="9.4" rx="1"/><rect x="13.6" y="7.2" width="3.4" height="12.8" rx="1"/>',
    x: '<path d="M1.5 20.6h21"/>',
    c: '<path d="M4.7 14 20.6 3.8"/>',
  },
  battery: {
    p: '<rect x="2.5" y="7.5" width="16" height="9" rx="2.5"/><path d="M20.3 10.2v3.6a.8.8 0 0 0 1.2-.7v-2.2a.8.8 0 0 0-1.2-.7Z"/>',
    d: '<path d="M6.3 10.5v3M9.6 10.5v3"/>',
    s: '<rect x="4.8" y="9.8" width="6.4" height="4.4" rx="1"/>',
    x: '<path d="M2 12h20.5"/>',
    c: '<rect x="2.5" y="7.5" width="19" height="9" rx="2.5"/>',
  },
  chip: {
    p: '<rect x="7" y="7" width="10" height="10" rx="2"/>',
    d: '<path d="M10 3.5v3M14 3.5v3M10 17.5v3M14 17.5v3M3.5 10h3M3.5 14h3M17.5 10h3M17.5 14h3"/>',
    s: '<rect x="10" y="10" width="4" height="4" rx="0.8"/>',
    x: '<path d="M12 2v20M2 12h20"/>',
    c: '<rect x="3.5" y="3.5" width="17" height="17"/>',
  },
  thermal: {
    p: '<path d="M14 13.6V6a2 2 0 1 0-4 0v7.6a4 4 0 1 0 4 0Z"/>',
    d: '<path d="M12 10v4.6"/><path d="M15.4 7.6h2.4M15.4 10.2h1.4"/>',
    s: '<circle cx="12" cy="17" r="2.4"/>',
    x: '<path d="M12 3v19"/>',
    c: '<circle cx="12" cy="17" r="4"/>',
  },
  lock: {
    p: '<rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>',
    d: '<circle cx="12" cy="14.2" r="1.1"/><path d="M12 15.3v2"/>',
    s: '<rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5"/>',
    x: '<path d="M12 3.8v18"/>',
    c: '<circle cx="12" cy="7.8" r="4"/>',
  },
  scan: {
    p: '<path d="M3.5 8V5.5a2 2 0 0 1 2-2H8M16 3.5h2.5a2 2 0 0 1 2 2V8M20.5 16v2.5a2 2 0 0 1-2 2H16M8 20.5H5.5a2 2 0 0 1-2-2V16"/>',
    d: '<path d="M3.5 12h17"/><path d="M8 9h8M8 15h8"/>',
    s: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/>',
    x: '<path d="M12 2v20M2 12h20"/>',
    c: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/>',
  },
  calibrate: {
    p: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
    d: '<path d="M5.6 5.6 7.8 7.8M16.2 16.2l2.2 2.2M18.4 5.6l-2.2 2.2M7.8 16.2l-2.2 2.2"/>',
    s: '<circle cx="12" cy="12" r="3"/>',
    x: '<path d="M12 2v20M2 12h20"/>',
    c: '<circle cx="12" cy="12" r="8.5"/>',
  },
  alert: {
    p: '<path d="M12 4 2.6 20.4h18.8Z"/>',
    d: '<path d="M12 10v4"/><circle cx="12" cy="17" r="0.9"/>',
    s: '<path d="M12 4 2.6 20.4h18.8Z"/>',
    x: '<path d="M12 3v19"/>',
    c: '<path d="M2.6 20.4h18.8M12 4 21.4 20.4"/>',
  },
  clock: {
    p: '<circle cx="12" cy="12" r="9"/>',
    d: '<path d="M12 6.8V12l3.6 2.1"/><path d="M12 3v1.4M21 12h-1.4M12 21v-1.4M3 12h1.4"/>',
    s: '<path d="M12 12V3a9 9 0 0 1 3.6 11.1Z"/>',
    x: '<path d="M12 2v20M2 12h20"/>',
    c: '<circle cx="12" cy="12" r="6.4"/>',
  },
  layers: {
    p: '<path d="M12 2.8 3.4 7.4 12 12l8.6-4.6Z"/>',
    d: '<path d="M3.4 12.4 12 17l8.6-4.6"/><path d="M3.4 17 12 21.6l8.6-4.6"/>',
    s: '<path d="M12 2.8 3.4 7.4 12 12l8.6-4.6Z"/>',
    x: '<path d="M12 2v20"/>',
    c: '<path d="M3.4 7.4v9.6M20.6 7.4v9.6"/>',
  },
};

function wrapG(t?: string, body?: string) {
  return t ? '<g transform="' + t + '">' + (body || '') + '</g>' : body || '';
}

export function CapsulaIcon({
  name,
  tier = 2,
  size = 32,
  className = '',
  animate = true,
  ...props
}: CapsulaIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const data = ICON_DATA[name];

  useEffect(() => {
    if (!animate || !svgRef.current) return;
    const svg = svgRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const STAGES = [
      { sel: '.cons, .ctr, .phantom, .hid', delay: 0, dur: 180, draw: false },
      { sel: '.c1, .c2', delay: 140, dur: 900, draw: true },
      { sel: '.c3', delay: 620, dur: 700, draw: true },
      { sel: '.surf, .void, .surf-fill, .hatchA, .hatchB, .hatchC, .isogrid, .icon-hatch', delay: 1000, dur: 260, draw: false },
    ];

    STAGES.forEach((st) => {
      const els = svg.querySelectorAll(st.sel);
      els.forEach((el, i) => {
        const pathEl = el as SVGPathElement;
        const delay = st.delay + i * 30;
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
  }, [animate, name, tier]);

  if (!data) return null;

  let innerSvg = '';
  if (tier === 1) {
    innerSvg = wrapG(
      data.g,
      `<g class="c2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">${data.p}${data.d || ''}</g>`
    );
  } else if (tier === 2) {
    innerSvg =
      wrapG(
        data.g,
        `<g class="surf" fill="currentColor" fill-opacity="0.15" stroke="none">${data.s || ''}</g>`
      ) +
      wrapG(
        data.g,
        `<g class="c1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">${data.p}</g>`
      ) +
      wrapG(
        data.g,
        `<g class="c3" fill="none" stroke="currentColor" stroke-width="0.65" stroke-linejoin="round" opacity="0.85">${data.d || ''}</g>`
      );
  } else {
    innerSvg =
      '<rect class="cons" x="2" y="2" width="20" height="20" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 3" opacity="0.42"/>' +
      wrapG(
        data.g,
        `<g class="cons" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 3" opacity="0.42">${data.c || ''}</g>`
      ) +
      `<g class="ctr" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="16 4 3 4" opacity="0.55">${data.x || ''}</g>` +
      wrapG(
        data.g,
        `<g class="icon-hatch" fill="url(#hatchIcon)" stroke="none" opacity="0.85">${data.s || ''}</g>`
      ) +
      wrapG(
        data.g,
        `<g class="c1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">${data.p}</g>`
      ) +
      wrapG(
        data.g,
        `<g class="c3" fill="none" stroke="currentColor" stroke-width="0.65" stroke-linejoin="round" opacity="0.85">${data.d || ''}</g>`
      );
  }

  return (
    <svg
      ref={svgRef}
      className={`dwg inline-block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: innerSvg }}
      {...props}
    />
  );
}
