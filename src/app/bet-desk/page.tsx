import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import en from '@/i18n/translations/en.json';
import es from '@/i18n/translations/es.json';
import BetDeskClient from './client';

export const metadata: Metadata = {
  title: 'Bet Desk Event Campaign | Alef Lemat Tech',
  description: 'Join the Bet Desk Event Campaign — Exclusive CX & Agentic AI Strategy Sessions for High-Growth Leaders.',
  openGraph: {
    title: 'Bet Desk Event Campaign | Alef Lemat Tech',
    description: 'Exclusive CX & Agentic AI Strategy Sessions for High-Growth Leaders.',
    url: 'https://aleflemat.tech/bet-desk',
    siteName: 'Alef Lemat Tech',
    type: 'website',
  },
};

export default async function BetDeskPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = locale === 'es' ? es : en;

  return <BetDeskClient messages={messages} />;
}
