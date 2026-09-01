"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from '@/i18n/translation-client';
import { DynamicLeadForm } from './dynamic-lead-form';

export default function AboutProfile() {
  const tAbout = useTranslations('about');
  const tMisc = useTranslations('misc');
  const [showLeadForm, setShowLeadForm] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left bg-black/40 p-8 lg:p-10 rounded-2xl border border-neutral-800 backdrop-blur-sm shadow-xl font-mono">
        <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 leading-tight">
          {tAbout('heading')}
        </h2>

        <div className="flex flex-col sm:flex-row items-center lg:items-start gap-8 mb-6 w-full">
          <div className="flex-shrink-0">
            <Image
              src="/assets/ppicture.png"
              alt="Profile Picture"
              width={140}
              height={140}
              className="rounded-full border-2 border-primary/40 p-1 shadow-lg object-cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-base text-gray-300 leading-relaxed font-sans">
              {tAbout('description')}
            </p>
            <button
              type="button"
              onClick={() => setShowLeadForm(true)}
              className="mt-4 bg-transparent text-primary hover:text-primary/80 font-mono text-sm underline underline-offset-4 cursor-pointer transition-colors inline-flex items-center gap-2 group"
            >
              {tMisc('moreAboutMe')}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {showLeadForm && (
        <DynamicLeadForm
          service="general"
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </>
  );
}
