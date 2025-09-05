"use client";

import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Hero() {
  return (
    <div className="relative pb-8 w-full h-screen">
        <div className="absolute bottom-6.5 right-2 p-6 rounded-lg bg-card text-card-foreground z-10">
          <button className='px-4 py-2 rounded-md bg-white text-black hover:bg-primary/80 transition-colors font-mono'>
            Let&apos;s Partner up →
          </button>
        </div>
      <Spline scene="https://prod.spline.design/40EPCVfL0h9rrsPF/scene.splinecode" />
    </div>
  );
}
