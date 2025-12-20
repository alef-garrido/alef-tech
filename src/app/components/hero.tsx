"use client";

import dynamic from 'next/dynamic';
import {useTranslations} from '@/i18n/translation-client';

const ThreeAnimation = dynamic(() => import('./three-animation'), {
  ssr: false,
});

export default function Hero() {
  const t = useTranslations('hero');
  const tCta = useTranslations('cta');

  return (
    <div className="relative p-8 md:px-12 w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">{t('title')}</h1>
        <p className="text-lg md:text-xl mt-4">{t('subtitle')}</p>
      </div>
        <div className="absolute bottom-6.5 right-2 p-6 rounded-lg bg-card text-card-foreground z-10">
          <button className='px-4 py-2 rounded-md bg-white text-black hover:bg-primary/80 transition-colors font-mono'>
            {tCta('primary')} →
          </button>
        </div>
      <ThreeAnimation />
    </div>
  );
}
