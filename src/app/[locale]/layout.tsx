import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/navigation";
import Script from "next/script";
import { SidebarProvider } from "./context/sidebar-context";
import SidebarChat from "./components/sidebar-chat";
import {NextIntlClientProvider, useMessages} from 'next-intl';

export const metadata: Metadata = {
  title: "Alef Lemat TECH",
  description: "Agentic Website of Alef Lemat",
};

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = useMessages();

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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SidebarProvider>
            <Navigation />
            <SidebarChat />
            {children}
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
