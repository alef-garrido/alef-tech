"use client";

import Script from 'next/script';

export default function Hero() {
  return (
    <div className="pb-8 w-full h-screen">
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.53/build/spline-viewer.js" />
      <spline-viewer url="https://prod.spline.design/40EPCVfL0h9rrsPF/scene.splinecode"></spline-viewer>
    </div>
  );
}
