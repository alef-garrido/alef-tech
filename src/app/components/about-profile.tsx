"use client";

import Image from 'next/image';
import { useTranslations } from '@/i18n/translation-client';

export default function AboutProfile() {
  const tAbout = useTranslations('about');

  return (
    <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left bg-black/40 p-8 lg:p-10 rounded-2xl border border-neutral-800 backdrop-blur-sm shadow-xl font-mono">
      <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 leading-tight">
        {tAbout('heading')}
      </h2>

      <div className="flex flex-col sm:flex-row items-center lg:items-start gap-8 w-full">
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
          <p className="text-base text-gray-300 leading-relaxed font-sans whitespace-pre-line">
            {tAbout('description')}
          </p>
        </div>
      </div>
    </div>
  );
}
