"use client";

import { useState } from 'react';
import { DynamicLeadForm } from './dynamic-lead-form';
import { useTranslations } from '@/i18n/translation-client';

interface AboutManifestoProps {
  onSendPrompt?: (prompt: string) => void;
}

export default function AboutManifesto({ onSendPrompt }: AboutManifestoProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
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
      setShowLeadForm(true);
    }
  };

  return (
    <>
      <article className="panel principle relative">
        <span className="n font-mono">P-02 · SYSTEM MANIFESTO</span>

        <h3 className="t-h2 text-[var(--text)] my-4">
          {tManifesto('title')}
        </h3>

        <div className="t-body space-y-6">
          <p className="whitespace-pre-line">
            {tManifesto('paragraph1')}
          </p>

          <p>
            {tManifesto('paragraph2')}
          </p>

          <div className="font-mono text-base italic text-[var(--accent)] py-6 my-6 border-y border-[var(--border)] bg-[var(--surface-2)] px-4 rounded-[var(--radius-md)]">
            &ldquo;{tManifesto('highlight')}&rdquo;
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
        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <div className="font-mono font-bold text-base text-[var(--text)] mb-2">
            {tManifesto('ctaQuestion')}
          </div>
          <div className="text-xs text-[var(--text-muted)] mb-6">
            {tManifesto('ctaSub')}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handlePrimaryClick}
              className="btn btn-primary sm"
            >
              {tManifesto('ctaPrimary')} →
            </button>
            <button
              type="button"
              onClick={handleSecondaryClick}
              className="btn btn-ghost sm"
            >
              {tManifesto('ctaSecondary')}
            </button>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-8 font-mono text-xs text-[var(--text-faint)] italic">
          {tManifesto('signatureQuote')}{' '}
          <strong className="not-italic font-medium text-[var(--accent)]">
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
