"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function setLocaleCookie(locale: string) {
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
    <div className="tabs" role="tablist" aria-label="Language selector">
      <button
        type="button"
        role="tab"
        aria-selected={locale === 'en'}
        onClick={() => switchLanguage('en')}
      >
        EN
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={locale === 'es'}
        onClick={() => switchLanguage('es')}
      >
        ES
      </button>
    </div>
  );
}
