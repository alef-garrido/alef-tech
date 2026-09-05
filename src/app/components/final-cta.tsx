"use client";

import { useState } from 'react';
import { useTranslations } from '@/i18n/translation-client';
import { DynamicLeadForm } from './dynamic-lead-form';

const FinalCTA = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const tCta = useTranslations('cta');

  return (
    <>
      <section className="w-full my-48 px-4 sm:px-6 lg:px-8">
        <div className="panel text-center py-32 px-6 sm:px-12 relative overflow-hidden">
          <div className="sec-head mx-auto">
            <p className="eyebrow justify-center">SYSTEM DEPLOYMENT</p>
            <h2 className="t-h1 text-[var(--accent)]">{tCta('buildEngine')}</h2>
            <p className="t-body mx-auto">{tCta('complexityToClarity')}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => setShowLeadForm(true)}
              className="btn btn-primary lg"
            >
              {tCta('bookCall')} →
            </button>
            <button
              type="button"
              onClick={() => setShowLeadForm(true)}
              className="btn btn-secondary lg"
            >
              {tCta('getInTouch')}
            </button>
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
};

export default FinalCTA;
