'use client';

import { useState } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { DynamicLeadForm } from '@/app/components/dynamic-lead-form';
import { ChatModal } from './components/ChatModal';
import type { Messages } from '@/i18n/translation';

interface DiagnosticClientProps {
  messages: Messages;
}

function getTranslation(messages: Messages, namespace: string, key: string): string {
  const ns = messages[namespace];
  if (typeof ns === 'string') return key;
  if (typeof ns === 'object' && ns && typeof ns === 'object') {
    const content = ns as Record<string, string>;
    return content[key] || key;
  }
  return key;
}

export function DiagnosticClient({ messages }: DiagnosticClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [slotsUsed] = useState(3);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const t = (key: string) => getTranslation(messages, 'diagnostic', key);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header Sticky */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-lg font-mono">
            <span className="c-cyber-accent">{t('clinicName')}</span>
            <span className="ml-2" style={{color: '#00ffb2'}}>{t('xnoriaLabel')}</span>
          </div>
          <a
            href="#form"
            className="text-sm font-medium font-mono px-4 py-2 rounded transition c-cyber-border hover:bg-primary/20"
          >
            → {t('diagnose')}
          </a>
        </div>
      </div>

      {/* SECCIÓN 1: HERO + CAPTURA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero Copy */}
          <div className="text-center mb-16">
            <p className="text-sm sm:text-base font-mono mb-6 c-cyber-accent" style={{letterSpacing: '0.15em'}}>
              {t('xnoriaClinic')}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold font-mono mb-4 c-text-primary">
              {t('heroTitle')}
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-8 leading-relaxed c-cyber-accent">
              {t('heroSubtitle')}
            </h2>
            <p className="text-lg sm:text-xl font-mono mb-8 leading-relaxed c-text-secondary">
              {t('heroDescription')}
            </p>
          </div>

          {/* Form Card */}
          <div id="form" className="bg-card rounded-xl p-8 sm:p-10 mb-8 c-cyber-border">
            {showForm ? (
              <DynamicLeadForm 
                service="diagnostic"
                onClose={() => setShowForm(false)}
              />
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-4 px-6 rounded-lg transition font-mono font-bold text-lg c-cyber-border hover:bg-primary/30"
              >
                {t('scheduleButton')}
              </button>
            )}
          </div>

          {/* Scarcity */}
          <div className="text-center c-cyber-border rounded-lg p-6">
            <p className="text-sm font-semibold font-mono mb-4">
              ⏰ {t('slotsAvailable')} <span className="c-cyber-accent" style={{fontSize: '1.1em'}}>{5 - slotsUsed} {t('slotsPerWeek')}</span> {t('thisWeek')}
            </p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((slot) => (
                <div
                  key={slot}
                  className={`w-6 h-6 rounded-full transition-all ${
                    slot <= slotsUsed 
                      ? 'bg-muted' 
                      : 'c-cyber-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: PROBLEMAS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            {t('diagnosticTitle')}
          </h2>
          <div className="space-y-6">
            {[
              { icon: CheckCircle2, label: t('problem1') },
              { icon: CheckCircle2, label: t('problem2') },
              { icon: CheckCircle2, label: t('problem3') },
              { icon: CheckCircle2, label: t('problem4') }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 rounded-lg c-cyber-border">
                <item.icon className="w-6 h-6 c-cyber-accent flex-shrink-0 mt-1" />
                <p className="text-lg font-mono">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: SOLUCIÓN */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            {t('solutionTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: t('diagnosticBlurb'), icon: '🔍' },
              { label: t('implementation'), icon: '🛠️' },
              { label: t('results'), icon: '✅' }
            ].map((item, idx) => (
              <div key={idx} className="bg-card rounded-xl p-6 c-cyber-border text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="font-mono text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: FARMACIA XNORIA - Moved here with translations */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-2">
              {t('farmaciaTitle')}
            </h2>
            <p className="text-lg font-mono mb-8">
              {t('remediesSubtitle')}
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-card rounded-xl p-8 sm:p-10 c-cyber-border text-center">
            <h3 className="text-2xl font-bold font-mono mb-4">
              {t('notSureRemedy')}
            </h3>
            <p className="text-lg font-mono mb-6">
              {t('scheduleFreeDiagnosis')}
            </p>
            <a
              href="#form"
              className="inline-block py-3 px-8 rounded-lg transition font-mono font-bold c-cyber-border hover:bg-primary/30 text-base mb-4"
            >
              {t('scheduleFreeButton')}
            </a>
            <p className="text-sm font-mono c-text-tertiary">
              {t('onlySlots')}
            </p>
          </div>
        </div>
      </section>

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full c-bg-cyber-accent hover:c-bg-cyber-electric transition-all duration-300 shadow-lg"
      >
        <MessageCircle className="w-6 h-6 c-text-cyber-bg" />
      </button>

      {isChatOpen && (
        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </main>
  );
}
