'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // This is a simplistic approach. A more robust solution would handle
    // pathnames with dynamic segments.
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPath);
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
