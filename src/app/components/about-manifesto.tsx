"use client";

import { useState } from 'react';
import { DynamicLeadForm } from './dynamic-lead-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/i18n/translation-client';

interface AboutManifestoProps {
  onSendPrompt?: (prompt: string) => void;
}

export default function AboutManifesto({ onSendPrompt }: AboutManifestoProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const router = useRouter();
  const tManifesto = useTranslations('aboutManifesto');

  const handlePrimaryClick = () => {
    if (onSendPrompt) {
      onSendPrompt(
        'Quiero ver cómo continúa el funnel después del manifiesto — el post de LinkedIn y el email de seguimiento con esta misma voz'
      );
    } else {
      setShowLeadForm(true);
    }
  };

  const handleSecondaryClick = () => {
    if (onSendPrompt) {
      onSendPrompt('Muéstrame cómo se vería esto como landing page completa');
    } else {
      router.push('/diagnostic');
    }
  };

  return (
    <>
      <article className="w-full bg-black/40 p-8 lg:p-10 rounded-2xl border border-neutral-800 backdrop-blur-sm shadow-xl font-sans text-gray-200">
        {/* Eyebrow */}
        <div className="text-xs font-mono font-medium tracking-[0.13em] uppercase text-gray-400 mb-7">
          {tManifesto('eyebrow')}
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-medium leading-tight text-white mb-9 max-w-xl">
          {tManifesto('title')}
        </h3>

        {/* Body content */}
        <div className="text-base leading-[1.85] text-gray-300 space-y-6">
          <p className="whitespace-pre-line">
            {tManifesto('paragraph1')}
          </p>

          <p>
            {tManifesto('paragraph2')}
          </p>

          {/* Phrase Pivot / Highlight quote */}
          <div className="font-serif text-lg italic leading-[1.65] text-white py-7 my-8 border-y border-neutral-800">
            {tManifesto('highlight')}
          </div>

          <p>
            {tManifesto('paragraph3')}
          </p>

          <p className="whitespace-pre-line">
            {tManifesto('paragraph4')}
          </p>

          <p>
            {tManifesto('paragraph5')}
          </p>
        </div>

        {/* CTA Zone */}
        <div className="mt-11 pt-8 border-t border-neutral-800">
          <div className="text-lg font-medium leading-snug text-white mb-2 max-w-md">
            {tManifesto('ctaQuestion')}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
            {tManifesto('ctaSub')}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handlePrimaryClick}
              className="bg-[#1D9E75] hover:bg-[#5DCAA5] text-[#04342C] font-mono text-sm font-semibold px-5 py-3 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              {tManifesto('ctaPrimary')}
            </button>
            <button
              type="button"
              onClick={handleSecondaryClick}
              className="text-xs sm:text-sm text-gray-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              {tManifesto('ctaSecondary')}
            </button>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-11 text-xs text-gray-400 italic leading-relaxed">
          {tManifesto('signatureQuote')}{' '}
          <strong className="not-italic font-medium text-gray-300">
            {tManifesto('signatureAuthor')}
          </strong>
        </div>
      </article>

      {showLeadForm && (
        <DynamicLeadForm
          service="diagnostic"
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </>
  );
}
