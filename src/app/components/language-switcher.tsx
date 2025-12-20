"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function setLocaleCookie(locale: string) {
  // 1 year
  document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )locale=([^;]+)/);
    if (match) setLocale(match[1]);
  }, []);

  const switchLanguage = (newLocale: string) => {
    setLocaleCookie(newLocale);
    setLocale(newLocale);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => switchLanguage('en')} className={locale === 'en' ? 'font-bold' : ''}>EN</button>
      <button onClick={() => switchLanguage('es')} className={locale === 'es' ? 'font-bold' : ''}>ES</button>
    </div>
  );
}
