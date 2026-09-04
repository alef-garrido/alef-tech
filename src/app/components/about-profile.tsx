"use client";

import Image from 'next/image';
import { useTranslations } from '@/i18n/translation-client';

export default function AboutProfile() {
  const tAbout = useTranslations('about');

  return (
    <div className="panel principle relative">
      <span className="n font-mono">P-01 · CORE IDENTITY</span>
      <h2 className="t-h1 text-[var(--accent)] my-4">
        {tAbout('heading')}
      </h2>

      <div className="flex flex-col sm:flex-row items-center lg:items-start gap-8 w-full">
        <div className="flex-shrink-0">
          <Image
            src="/assets/ppicture.png"
            alt="Profile Picture"
            width={140}
            height={140}
            className="rounded-[999px] border-2 border-[var(--accent)] p-1 shadow-[var(--glow)] object-cover"
          />
        </div>
        <div className="flex-1 space-y-4">
          <p className="t-body leading-relaxed whitespace-pre-line">
            {tAbout('description')}
          </p>
        </div>
      </div>
    </div>
  );
}
