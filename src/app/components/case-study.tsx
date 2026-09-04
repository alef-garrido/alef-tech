"use client";

import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@/i18n/translation-client';
import { Quote } from 'lucide-react';

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
  { id: 'sams-club', name: "Sam's Club", logo: '/assets/logos/sams-club-4.svg', className: 'h-10 w-auto max-w-[85px]' },
  { id: 'general-motors', name: 'General Motors', logo: '/assets/logos/general-motors-5.svg', className: 'h-9 w-auto max-w-[170px]' },
  { id: 'walmart', name: 'Walmart', logo: '/assets/logos/walmart-6.svg', className: 'h-9 w-auto max-w-[150px]' },
  { id: 'nissan', name: 'Nissan', logo: '/assets/logos/Nissan-7.svg', className: 'h-9 w-auto max-w-[85px]' },
  { id: 'comcast', name: 'Comcast', logo: '/assets/logos/comcast-8.svg', className: 'h-9 w-auto max-w-[150px]' },
];

const CaseStudy = () => {
  const tMisc = useTranslations('misc');

  // Quadruple the companies list to ensure continuous seamless looping across wide screens
  const marqueeItems = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <section className="w-full my-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center gap-16 font-mono">
      {/* UX QUOTE CARD */}
      <div className="w-full relative group">
        {/* Neon Backlight Ambient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        {/* Quote Card Container */}
        <div className="relative w-full bg-black/80 border border-neutral-800 hover:border-primary/40 rounded-2xl p-8 sm:p-12 md:p-16 backdrop-blur-md transition-all duration-300 shadow-2xl flex flex-col items-center text-center">
          {/* Badge Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {tMisc('resultsSpeak')}
          </div>

          {/* Quote Mark Icon */}
          <div className="mb-6 text-primary/80">
            <Quote size={48} className="rotate-180" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed max-w-5xl tracking-tight">
            &ldquo;{tMisc('uxQuote')}&rdquo;
          </blockquote>

          {/* Decorative Divider */}
          <div className="mt-10 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>
      </div>

      {/* EVER SCROLLING LOGO STRIPE */}
      <div className="w-full flex flex-col items-center gap-6">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold text-center">
          {tMisc('trustedCompanies')}
        </p>

        {/* Ticker Container with Left/Right Fading Edge Gradient Masks */}
        <div className="relative w-full overflow-hidden py-6 border-y border-neutral-900/80 bg-neutral-950/40 select-none pointer-events-none">
          {/* Left Edge Mask */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10"></div>

          {/* Right Edge Mask */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10"></div>

          {/* Scrolling Track */}
          <div className="c-animate-marquee gap-8 sm:gap-14 items-center">
            {marqueeItems.map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                className="flex items-center justify-center h-16 px-6 py-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60 flex-shrink-0"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={200}
                  height={50}
                  className={`object-contain grayscale invert brightness-125 opacity-85 ${company.className || 'h-9 w-auto max-w-[140px]'}`}
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
