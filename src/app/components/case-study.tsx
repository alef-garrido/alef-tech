"use client";

import { useTranslations } from '@/i18n/translation-client';

const CaseStudy = () => {
  const tMisc = useTranslations('misc');

  return (
    <div className="w-full my-48 px-6 md:px-12">
      <h2 className="text-5xl font-bold text-secondary mb-8 font-mono text-center">{tMisc('resultsSpeak')}</h2>
      <div className="bg-black p-8 rounded-lg font-mono text-center">
        <p className="text-2xl text-gray-400 italic">&quot;{tMisc('testimonial')}&quot;</p>
        <p className="text-xl font-bold text-white mt-4">{tMisc('testimonialAuthor')}</p>
        <div className="mt-8">
            <button className="bg-white text-black font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">{tMisc('seeMoreResults')}</button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
