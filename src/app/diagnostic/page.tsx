import { cookies } from 'next/headers';
import en from '@/i18n/translations/en.json';
import es from '@/i18n/translations/es.json';
import DiagnosticClient from './client';

export default async function DiagnosticPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'es';
  
  const messages = locale === 'es' ? es : en;

  return <DiagnosticClient messages={messages} />;
}
