"use client";

import { useState } from 'react';
import { useTranslations } from '@/i18n/translation-client';
import { DynamicLeadForm } from './dynamic-lead-form';

const FinalCTA = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const tCta = useTranslations('cta');

  return (
    <>
      <div className="w-full my-48 px-6 md:px-12 py-16 bg-white">
        <div className="text-center font-mono">
          <h2 className="text-5xl font-bold text-black mb-4 font-mono">{tCta('buildEngine')}</h2>
          <p className="text-lg text-gray-900 mb-8">{tCta('complexityToClarity')}</p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowLeadForm(true)}
              className="bg-black text-white font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors cursor-pointer"
            >
              {tCta('bookCall')}
            </button>
            <button
              type="button"
              onClick={() => setShowLeadForm(true)}
              className="bg-black text-white font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors cursor-pointer"
            >
              {tCta('getInTouch')}
            </button>
          </div>
        </div>
      </div>

      {showLeadForm && (
        <DynamicLeadForm
          service="diagnostic"
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </>
  );
};

export default FinalCTA;
