import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/navigation';
import Script from 'next/script';
import { SidebarProvider } from './context/sidebar-context';
import SidebarChat from './components/sidebar-chat';
import { TranslationProvider } from '@/i18n/translation-client';
import en from '@/i18n/translations/en.json';
import es from '@/i18n/translations/es.json';
import { cookies } from 'next/headers';

const locales = ['en', 'es'];

export const metadata: Metadata = {
  title: 'Alef Lemat TECH',
  description: 'Agentic Website of Alef Lemat',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  let locale = cookieStore.get('locale')?.value ?? 'en';
  if (!locales.includes(locale)) locale = 'en';
  const messageData = locale === 'es' ? es : en;

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.svg" />
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.10.55/build/spline-viewer.js"
          strategy="lazyOnload"
        />
        <style>
          {`
            @keyframes marquee {
              from { transform: translateX(0%); }
              to { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 15s linear infinite;
              transform: translateZ(0);
            }
          `}
        </style>
      </head>
      <body className={`antialiased`}>
        <TranslationProvider locale={locale} messages={messageData}>
          <SidebarProvider>
            <Navigation />
            <SidebarChat />
            {children}
          </SidebarProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
// (deduplicated) RootLayout was defined above and returns the full app shell.
