import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/navigation";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Alef Lemat TECH",
  description: "Agentic Website of Alef Lemat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
