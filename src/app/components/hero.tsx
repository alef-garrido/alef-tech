"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from '@/i18n/translation-client';
import { DynamicLeadForm } from './dynamic-lead-form';
import { ECGVisualization } from './animations/ECGVisualization';

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

        <div className="wrap relative z-10 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Hero Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)]/90 text-xs sm:text-sm font-mono tracking-widest text-[var(--accent)] uppercase mb-6 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                {t('eyebrow') || 'Alef Lemat - Consultant and CX strategist'}
              </div>

              {/* Main Headline */}
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-[var(--text)] leading-[0.98] mb-6 uppercase"
                style={{ fontStretch: 'var(--display-wide)' }}
              >
                {t('title') || 'CX CLINIC'}
              </h1>

              {/* Lede Subtitle */}
              <p className="text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-xl text-[var(--text-muted)] mb-8">
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
                  {tCta('secondary') || 'Learn More'}
                </a>
              </div>
            </div>

            {/* Right Column: Real-Time CX Monitoring Spec Badge Overlay */}
            <div className="lg:col-span-5 w-full flex justify-end pointer-events-none select-none">
              <div className="hidden lg:flex flex-col gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-md shadow-xl max-w-xs text-left">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                  <span className="text-[10px] font-mono tracking-widest text-[var(--accent)] font-bold uppercase">
                    P-01 · CX TELEMETRY
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-faint)]">SYS_CX_2049</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px] text-[var(--text-muted)]">
                  <p className="flex justify-between">
                    <span>STATUS:</span>
                    <strong className="text-[var(--accent)]">STREAMING 60FPS</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>MODE:</span>
                    <strong className="text-[var(--text)]">REAL-TIME CX MONITORING</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>TELEMETRY:</span>
                    <strong className="text-[var(--text)]">76 BPM PULSE</strong>
                  </p>
                </div>

                {/* Live Real-Time ECG Waveform Telemetry */}
                <div className="w-full h-12 rounded border border-[var(--border)] overflow-hidden bg-[var(--surface-2)]/60 relative my-1">
                  <ECGVisualization height={48} heartRate={76} strokeColor="#2FD9E3" showGrid={false} />
                </div>

                <div className="pt-2 border-t border-[var(--border)] flex items-center gap-2 text-[10px] font-mono text-[var(--text-faint)] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  REAL-TIME CX MONITORING
                </div>
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
