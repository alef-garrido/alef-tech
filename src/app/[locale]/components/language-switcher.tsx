'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] || 'en';

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length && routingAvailableLocale(segments[0])) {
      segments[0] = newLocale;
    } else {
      // if no locale segment present, insert one
      segments.unshift(newLocale);
    }
    const newPath = '/' + segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage('en')}
        className={locale === 'en' ? 'font-bold' : ''}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('es')}
        className={locale === 'es' ? 'font-bold' : ''}
      >
        ES
      </button>
    </div>
  );
}

function routingAvailableLocale(l: string) {
  return l === 'en' || l === 'es';
}
