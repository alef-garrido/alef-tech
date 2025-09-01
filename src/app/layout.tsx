import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/custom-cursor";
import Navigation from "./components/navigation";

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
    <html lang="en">
      <body className={`antialiased`}>
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
