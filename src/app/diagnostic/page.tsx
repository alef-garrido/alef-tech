import en from '@/i18n/translations/en.json';
import es from '@/i18n/translations/es.json';
import { cookies } from 'next/headers';
import { DiagnosticClient } from './client';
import type { Messages } from '@/i18n/translation';

export default async function DiagnosticPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (locale === 'es' ? es : en) as Messages;

  return <DiagnosticClient messages={messages} />;
}
