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
      <section className="hero w-full min-h-screen flex items-center relative">
        {/* Three.js 3D Background Canvas */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <ThreeAnimation />
        </div>

        <div className="wrap relative z-10 w-full flex flex-col justify-center min-h-[60vh]">
          <div className="max-w-3xl">
            <p className="eyebrow">AGENTIC SOFTWARE & CX INTEGRATION</p>
            <h1>
              ALEF LEMAT
            </h1>
            <p className="lede">
              {t('subtitle') || 'Hardware-level precision for autonomous software systems. Custom AI agentic workflows, CX architectures, and high-performance engineering.'}
            </p>

            <div className="mt-8 flex gap-4 items-center">
              <button
                type="button"
                onClick={() => setShowLeadForm(true)}
                className="btn btn-primary lg"
              >
                {tCta('primary')} →
              </button>
              <a href="#services" className="btn btn-ghost lg">
                {tCta('secondary') || 'Explore Services'} →
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
