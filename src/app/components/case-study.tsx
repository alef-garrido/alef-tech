"use client";

import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@/i18n/translation-client';

interface Company {
  id: string;
  name: string;
  logo: string;
  className?: string;
}

const COMPANIES: Company[] = [
  { id: 'hp', name: 'HP', logo: '/assets/logos/hp-1.svg', className: 'h-9 w-auto max-w-[55px]' },
  { id: 'john-deere', name: 'John Deere', logo: '/assets/logos/john-2.svg', className: 'h-9 w-auto max-w-[160px]' },
  { id: 'dollar-tree', name: 'Dollar Tree', logo: '/assets/logos/dollar-tree-3.svg', className: 'h-9 w-auto max-w-[160px]' },
  { id: 'sams-club', name: "Sam's Club", logo: '/assets/logos/sams-club-4.svg', className: 'h-8 w-auto max-w-[85px]' },
  { id: 'general-motors', name: 'General Motors', logo: '/assets/logos/general-motors-5.svg', className: 'h-9 w-auto max-w-[170px]' },
  { id: 'walmart', name: 'Walmart', logo: '/assets/logos/walmart-6.svg', className: 'h-9 w-auto max-w-[150px]' },
  { id: 'nissan', name: 'Nissan', logo: '/assets/logos/Nissan-7.svg', className: 'h-9 w-auto max-w-[85px]' },
  { id: 'comcast', name: 'Comcast', logo: '/assets/logos/comcast-8.svg', className: 'h-9 w-auto max-w-[150px]' },
];

const CaseStudy = () => {
  const tMisc = useTranslations('misc');
  const marqueeItems = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <section className="w-full wrap my-24 flex flex-col items-center gap-16 font-mono">
      {/* Readout Quote Card */}
      <div className="w-full readout p-8 sm:p-12 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <span className="badge b-on">VERIFIED RESULTS</span>
          <span className="label ml-auto">TELEMETRY ID: CS-2026</span>
        </div>

        <blockquote className="val text-2xl sm:text-3xl md:text-4xl text-[var(--text)] font-bold leading-tight mb-6">
          &ldquo;{tMisc('uxQuote')}&rdquo;
        </blockquote>

        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 mt-6">
          <span className="delta">SYSTEM IMPACT: +100% REPEAT CX ENGAGEMENT</span>
          <span className="label">[SPEC CERTIFIED]</span>
        </div>
      </div>

      {/* Ticker Container */}
      <div className="w-full flex flex-col items-center gap-6">
        <p className="eyebrow">
          {tMisc('trustedCompanies')}
        </p>

        <div className="relative w-full overflow-hidden py-6 border-y border-[var(--border)] bg-[var(--surface-2)] select-none pointer-events-none rounded-[var(--radius-md)]">
          <div className="animate-marquee gap-8 sm:gap-14 items-center flex">
            {marqueeItems.map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                className="flex items-center justify-center h-14 px-6 py-2 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] flex-shrink-0"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={200}
                  height={50}
                  className={`object-contain grayscale invert opacity-80 ${company.className || 'h-8 w-auto max-w-[140px]'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
