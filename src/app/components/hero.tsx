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
      <section className="hero w-full min-h-screen flex items-center relative overflow-hidden bg-[#0A0C0F] text-[#F4F8FB]" data-theme="dark">
        {/* Three.js 3D Blueprint Canvas - Pushed to the right with smooth gradient transition */}
        <div
          className="absolute top-0 right-0 w-full lg:w-7/12 h-full z-0 pointer-events-none overflow-hidden opacity-90"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 50%)',
          }}
        >
          <ThreeAnimation />
        </div>

        {/* Ambient Cyan Spec Glow on right side */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#2FD9E3]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="wrap relative z-10 w-full py-32 sm:py-40 px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Main Hero Copy & Actions */}
            <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start">
              {/* Eyebrow Tag */}
              <div className="eyebrow mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                {t('eyebrow') || 'Alef Lemat - Consultant and CX strategist'}
              </div>

              {/* Main Headline */}
              <h1 className="t-display text-[var(--text)] mb-6">
                {t('title') || 'CX CLINIC'}
              </h1>

              {/* Lede Subtitle */}
              <p className="t-body-lg max-w-xl text-[var(--text-muted)] mb-8">
                {t('subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 items-center font-mono">
                <button
                  type="button"
                  onClick={() => setShowLeadForm(true)}
                  className="btn btn-primary lg tracking-wider font-semibold"
                >
                  {tCta('primary')} →
                </button>
                <a
                  href="#framework"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-ghost lg cursor-pointer tracking-wider font-semibold"
                >
                  {tCta('secondary') || 'Learn More'}
                </a>
              </div>
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
