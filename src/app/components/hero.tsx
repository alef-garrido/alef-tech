"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from '@/i18n/translation-client';
import { DynamicLeadForm } from './dynamic-lead-form';

const ThreeAnimation = dynamic(() => import('./three-animation'), {
  ssr: false,
});

export default function Hero() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const t = useTranslations('hero');
  const tCta = useTranslations('cta');

  return (
    <>
      <section className="hero w-full min-h-screen flex items-center relative bg-black">
        {/* Three.js 3D Background Canvas */}
        <div className="absolute inset-0 z-0 bg-black pointer-events-none">
          <ThreeAnimation />
        </div>

        <div className="wrap relative z-10 w-full flex flex-col justify-center min-h-[60vh] py-12">
          <div className="max-w-4xl">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2FD9E3]/40 bg-[#2FD9E3]/15 text-xs sm:text-sm font-mono tracking-widest text-[#2FD9E3] uppercase mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#2FD9E3] animate-pulse" />
              {t('eyebrow') || 'Alef Lemat - Consultant and CX strategist'}
            </div>

            {/* Main Headline */}
            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-bold font-display tracking-tight text-[#F4F8FB] leading-[0.95] mb-6 uppercase"
              style={{ fontStretch: 'var(--display-wide)' }}
            >
              {t('title') || 'CX CLINIC'}
            </h1>

            {/* Subtitle / Lede */}
            <p className="text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-2xl text-[#8FA6C4] mt-2 mb-8">
              {t('subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={() => setShowLeadForm(true)}
                className="btn btn-primary lg"
              >
                {tCta('primary')} →
              </button>
              <a
                href="#framework"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-ghost lg cursor-pointer"
              >
                {tCta('secondary') || 'Learn More'} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {showLeadForm && (
        <DynamicLeadForm
          service="diagnostic"
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </>
  );
}
