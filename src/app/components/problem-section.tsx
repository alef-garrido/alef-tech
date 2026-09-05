"use client";

import React from 'react';
import { useTranslations } from '@/i18n/translation-client';
import { TechnicalAssemblyPlate1 } from './capsula';
import { UserMinus, Layers, Flame, AlertCircle } from 'lucide-react';

export default function ProblemSection() {
  const tProblem = useTranslations('problem');

  return (
    <section id="problem" className="w-full relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden font-mono">
      {/* Background Technical Assembly Illustration (Subtle Ambient Plate) */}
      <div className="absolute -top-10 -left-10 w-full max-w-[650px] pointer-events-none opacity-20 dark:opacity-30 z-0 select-none overflow-hidden">
        <TechnicalAssemblyPlate1 />
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-start mb-16 sm:mb-20 relative z-10 border-b border-[var(--border)] pb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] dark:bg-[#FF4D4D] animate-pulse" />
          <span className="eyebrow text-[#EF4444] dark:text-[#FF6B6B]">
            {tProblem('eyebrow')}
          </span>
        </div>
        <h2 className="t-h1 text-[var(--text)] max-w-4xl font-sans tracking-tight mb-4">
          {tProblem('title')}
        </h2>
        <p className="t-body-lg text-[var(--text-muted)] max-w-2xl font-sans">
          {tProblem('subtitle')}
        </p>
      </div>

      {/* 3 Core Diagnostic Symptom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10 mb-16">
        
        {/* CARD 1: SILENT CHURN */}
        <div className="group relative rounded-2xl backdrop-blur-md bg-[var(--surface)]/40 border border-[var(--border)] hover:border-[#EF4444]/50 dark:hover:border-[#FF4D4D]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-6">
              <span className="label text-[#EF4444] dark:text-[#FF6B6B] font-bold text-xs">
                {tProblem('card1Tag')}
              </span>
              <div className="p-2 rounded-lg bg-[#EF4444]/10 text-[#EF4444] dark:text-[#FF6B6B]">
                <UserMinus size={20} />
              </div>
            </div>
            <h3 className="t-h3 text-[var(--text)] font-sans mb-3 group-hover:text-[#EF4444] dark:group-hover:text-[#FF6B6B] transition-colors">
              {tProblem('card1Title')}
            </h3>
            <p className="t-body text-[var(--text-muted)] font-sans leading-relaxed">
              {tProblem('card1Desc')}
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-[var(--border)]/60 flex items-center gap-2 text-xs text-[#EF4444] dark:text-[#FF6B6B] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
            <span>{tProblem('card1Metric')}</span>
          </div>
        </div>

        {/* CARD 2: TOOL CHAOS */}
        <div className="group relative rounded-2xl backdrop-blur-md bg-[var(--surface)]/40 border border-[var(--border)] hover:border-[#0284C7]/50 dark:hover:border-[#2FD9E3]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(47,217,227,0.15)]">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-6">
              <span className="label text-[#0284C7] dark:text-[#2FD9E3] font-bold text-xs">
                {tProblem('card2Tag')}
              </span>
              <div className="p-2 rounded-lg bg-[#0284C7]/10 dark:bg-[#2FD9E3]/10 text-[#0284C7] dark:text-[#2FD9E3]">
                <Layers size={20} />
              </div>
            </div>
            <h3 className="t-h3 text-[var(--text)] font-sans mb-3 group-hover:text-[#0284C7] dark:group-hover:text-[#2FD9E3] transition-colors">
              {tProblem('card2Title')}
            </h3>
            <p className="t-body text-[var(--text-muted)] font-sans leading-relaxed">
              {tProblem('card2Desc')}
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-[var(--border)]/60 flex items-center gap-2 text-xs text-[#0284C7] dark:text-[#2FD9E3] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{tProblem('card2Metric')}</span>
          </div>
        </div>

        {/* CARD 3: OPERATIONAL FATIGUE */}
        <div className="group relative rounded-2xl backdrop-blur-md bg-[var(--surface)]/40 border border-[var(--border)] hover:border-[#F59E0B]/50 dark:hover:border-[#FBBF24]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-6">
              <span className="label text-[#F59E0B] dark:text-[#FBBF24] font-bold text-xs">
                {tProblem('card3Tag')}
              </span>
              <div className="p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] dark:text-[#FBBF24]">
                <Flame size={20} />
              </div>
            </div>
            <h3 className="t-h3 text-[var(--text)] font-sans mb-3 group-hover:text-[#F59E0B] dark:group-hover:text-[#FBBF24] transition-colors">
              {tProblem('card3Title')}
            </h3>
            <p className="t-body text-[var(--text-muted)] font-sans leading-relaxed">
              {tProblem('card3Desc')}
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-[var(--border)]/60 flex items-center gap-2 text-xs text-[#F59E0B] dark:text-[#FBBF24] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{tProblem('card3Metric')}</span>
          </div>
        </div>

      </div>

      {/* DIAGNOSTIC INSIGHT CALLOUT BANNER */}
      <div className="relative z-10 w-full rounded-2xl p-px bg-gradient-to-r from-[#0284C7]/40 via-[#2FD9E3]/20 to-[#0284C7]/40 overflow-hidden shadow-2xl">
        <div className="w-full rounded-[15px] bg-[var(--surface)]/80 backdrop-blur-xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="p-3 rounded-xl bg-[#0284C7]/10 dark:bg-[#2FD9E3]/10 text-[#0284C7] dark:text-[#2FD9E3] flex-shrink-0 mt-1">
              <AlertCircle size={28} />
            </div>
            <div className="space-y-2">
              <span className="label text-[#0284C7] dark:text-[#2FD9E3] font-mono text-xs">
                {tProblem('calloutBadge')}
              </span>
              <blockquote className="t-h3 text-[var(--text)] font-sans leading-snug">
                &ldquo;{tProblem('calloutHighlight')}&rdquo;
              </blockquote>
              <p className="t-body text-[var(--text-muted)] font-sans">
                {tProblem('calloutText')}
              </p>
            </div>
          </div>
          
          <a
            href="#about"
            className="flex-shrink-0 btn btn-primary text-xs font-mono tracking-wider py-3.5 px-6 rounded-xl border border-[#0284C7]/30 dark:border-[#2FD9E3]/30 hover:shadow-[0_0_20px_rgba(47,217,227,0.3)] transition-all duration-300"
          >
            DISCOVER THE SOLUTION ↓
          </a>
        </div>
      </div>
    </section>
  );
}
