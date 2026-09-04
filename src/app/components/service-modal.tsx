"use client";

import { X, ExternalLink, Maximize } from 'lucide-react';
import { useEffect } from 'react';
import { service } from '../../../types';
import Image from 'next/image';
import { useTranslations } from '@/i18n/translation-client';

interface ServiceModalProps {
  service: service;
  closeModal: () => void;
}

export default function ServiceModal({ service, closeModal }: ServiceModalProps) {
  const tMisc = useTranslations('misc');

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg-deep)] text-[var(--text)] font-mono flex flex-col">
      {/* Header */}
      <div className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between bg-[var(--surface)]">
        <div className="flex items-center gap-3">
          <Maximize size={16} className="text-[var(--accent)]" />
          <span className="text-xs uppercase tracking-widest text-[var(--accent)]">
            ~/SPEC/{service.title.toUpperCase().replace(/\s+/g, '_')}.SYS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[var(--text-faint)]">{tMisc('pressEscToExit')}</span>
          <button
            onClick={closeModal}
            className="btn btn-ghost sm icon-only"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 p-6 gap-8 wrap my-auto">
        <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center min-h-[340px]">
          {service.image ? (
            <Image src={service.image} fill className="object-cover opacity-80" alt={service.title} />
          ) : (
            <div className="text-center p-8">
              <span className="text-4xl text-[var(--accent)] font-mono">&lt;/&gt;</span>
              <p className="text-xs text-[var(--text-muted)] mt-2">[PREVIEW RENDER AVAILABLE]</p>
            </div>
          )}
        </div>

        <div className="panel space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <span className="eyebrow">SERVICE SPECIFICATION</span>
            {service.category && <span className="badge b-on">{service.category}</span>}
          </div>

          <h1 className="t-h1 text-[var(--accent)]">{service.title}</h1>
          <p className="t-body">{service.description}</p>

          {service.features && (
            <div className="space-y-2 border-t border-[var(--border)] pt-4">
              <span className="label">FEATURE MATRIX</span>
              <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                {service.features.map((feat, idx) => (
                  <li key={idx}>✓ {feat}</li>
                ))}
              </ul>
            </div>
          )}

          {service.pricing && (
            <div className="readout mt-6">
              <span className="label">PRICING STRUCTURE</span>
              <span className="val text-[var(--accent)]">{service.pricing}</span>
            </div>
          )}

          <div className="pt-4 flex gap-4">
            {service.liveUrl && (
              <a
                href={service.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary sm flex items-center gap-2"
              >
                <ExternalLink size={16} />
                {tMisc('launchDemo')} →
              </a>
            )}
            <button onClick={closeModal} className="btn btn-ghost sm">
              CLOSE SPEC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
