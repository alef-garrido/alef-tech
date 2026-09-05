"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from '@/i18n/translation-client';
import { DynamicLeadForm } from './dynamic-lead-form';
import { TechnicalAssemblyPlate3 } from './capsula';

export default function AboutSection() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const tAbout = useTranslations('about');
  const tManifesto = useTranslations('aboutManifesto');

  return (
    <div className="w-full relative pt-6 sm:pt-10">
      {/* Background Technical Illustration Plate 3 (Right Side Balance) */}
      <div className="absolute -top-12 -right-4 md:right-0 w-full max-w-[720px] pointer-events-none opacity-25 dark:opacity-40 z-0 select-none overflow-hidden">
        <TechnicalAssemblyPlate3 />
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-start mb-12 relative z-10 border-b border-[var(--border)] pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#0284C7] dark:bg-[#2FD9E3] animate-pulse" />
          <span className="eyebrow">// SECTION 01 — IDENTITY & MANIFESTO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[var(--text)] tracking-tight">
          {tAbout('heading')}
        </h2>
      </div>

      {/* Unified 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        
        {/* Left Column: Core Identity Profile (Sticky on Desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
            {/* Tag Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <span className="text-xs font-mono tracking-widest text-[#0284C7] dark:text-[#2FD9E3] uppercase font-bold">
                P-01 · CORE IDENTITY
              </span>
              <span className="text-[10px] font-mono text-[var(--text-faint)]">SYS_SPEC_2049</span>
            </div>

            {/* Profile Avatar & Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative flex-shrink-0">
                <Image
                  src="/assets/ppicture.png"
                  alt="Alef Lemat"
                  width={90}
                  height={90}
                  className="rounded-full border-2 border-[#0284C7] dark:border-[#2FD9E3] p-1 shadow-[0_0_20px_rgba(47,217,227,0.25)] object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold font-mono text-[var(--text)]">Alef Lemat</h3>
                <p className="text-xs font-mono text-[#0284C7] dark:text-[#2FD9E3]">
                  Consultor de Negocios & Software Dev
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]">
                    SEP-CONOCER EC0249
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]">
                    EC1223
                  </span>
                </div>
              </div>
            </div>

            {/* Bio / Description */}
            <div className="text-xs sm:text-sm font-sans text-[var(--text-muted)] leading-relaxed space-y-4 pt-2 border-t border-[var(--border)]">
              <p className="whitespace-pre-line">
                {tAbout('description')}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: System Manifesto */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 flex flex-col gap-6 shadow-sm">
            {/* Tag Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <span className="text-xs font-mono tracking-widest text-[#0284C7] dark:text-[#2FD9E3] uppercase font-bold">
                P-02 · SYSTEM MANIFESTO
              </span>
              <span className="text-xs font-mono text-[var(--text-faint)]">
                {tManifesto('eyebrow')}
              </span>
            </div>

            {/* Manifesto Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[var(--text)] leading-tight">
              {tManifesto('title')}
            </h3>

            {/* Main Manifesto Body */}
            <div className="text-sm sm:text-base font-sans text-[var(--text-muted)] leading-relaxed space-y-6">
              <p className="whitespace-pre-line">
                {tManifesto('paragraph1')}
              </p>

              <p>
                {tManifesto('paragraph2')}
              </p>

              {/* Callout Quote Highlight */}
              <div className="relative my-6 p-6 rounded-r-xl border-l-4 border-[#0284C7] dark:border-[#2FD9E3] bg-[var(--surface-2)] font-mono text-sm sm:text-base italic text-[var(--text)] shadow-sm">
                &ldquo;{tManifesto('highlight')}&rdquo;
              </div>

              <p>
                {tManifesto('paragraph3')}
              </p>

              <p className="whitespace-pre-line">
                {tManifesto('paragraph4')}
              </p>

              <p className="font-semibold text-[var(--text)]">
                {tManifesto('paragraph5')}
              </p>
            </div>

            {/* CTA Box */}
            <div className="mt-6 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
              <div>
                <h4 className="font-mono font-bold text-sm sm:text-base text-[var(--text)] mb-1">
                  {tManifesto('ctaQuestion')}
                </h4>
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  {tManifesto('ctaSub')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowLeadForm(true)}
                className="btn btn-primary sm shrink-0"
              >
                {tManifesto('ctaPrimary')} →
              </button>
            </div>

            {/* Signature */}
            <div className="pt-4 font-mono text-xs text-[var(--text-faint)] italic border-t border-[var(--border)] flex items-center justify-between">
              <span>{tManifesto('signatureQuote')}</span>
              <strong className="not-italic font-bold text-[#0284C7] dark:text-[#2FD9E3]">
                {tManifesto('signatureAuthor')}
              </strong>
            </div>
          </div>
        </div>

      </div>

      {showLeadForm && (
        <DynamicLeadForm
          service="diagnostic"
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </div>
  );
}
