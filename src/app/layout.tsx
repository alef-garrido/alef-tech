import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/navigation';
import { SidebarProvider } from './context/sidebar-context';
import SidebarChat from './components/sidebar-chat';
import { TranslationProvider } from '@/i18n/translation-client';
import en from '@/i18n/translations/en.json';
import es from '@/i18n/translations/es.json';
import { cookies } from 'next/headers';

import { CapsulaSvgDefs } from './components/capsula';
import { snasm } from './fonts';

const locales = ['en', 'es'];

export const metadata: Metadata = {
  title: 'Exnnoria CX Clinic | alef lemat',
  description: 'Exnnoria CX Clinic — alef lemat',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  let locale = cookieStore.get('locale')?.value ?? 'en';
  if (!locales.includes(locale)) locale = 'en';
  const messageData = locale === 'es' ? es : en;

  return (
    <html lang={locale} data-theme="light" className={snasm.variable} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" />
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
        <CapsulaSvgDefs />
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
