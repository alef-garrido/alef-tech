import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/navigation";
import Script from "next/script";
import { SidebarProvider } from "./context/sidebar-context";
import SidebarChat from "./components/sidebar-chat";
import { TranslationProvider } from '@/i18n/translation-client';
import en from '@/i18n/translations/en.json';
import es from '@/i18n/translations/es.json';

const locales = ['en', 'es'];
const messages: Record<string, any> = { en, es };

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export const metadata: Metadata = {
  title: "Alef Lemat TECH",
  description: "Agentic Website of Alef Lemat",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  
  // Skip validation for static asset requests (files with extensions)
  if (locale.includes('.')) {
    return children;
  }
  
  // Validate locale is valid
  if (!locales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  const messageData = messages[locale as keyof typeof messages];

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.10.55/build/spline-viewer.js"
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
