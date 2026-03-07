'use client';

import { useState } from 'react';
import SidebarChat from '@/app/components/sidebar-chat';
import ServicesShowcase from '@/app/components/services-showcase';
import Footer from '@/app/components/footer';
import { ECGVisualization, SpO2Visualization } from '@/app/components/animations';

type Messages = Record<string, Record<string, string> | string>;

interface DiagnosticClientProps {
  messages: Messages;
}

export default function DiagnosticClient({ messages }: DiagnosticClientProps) {
  const [slotsUsed] = useState(3);

  const t = (key: string, defaultValue: string = key) => {
    const keys = key.split('.');
    let value: unknown = messages;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return typeof value === 'string' ? value : defaultValue;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header Sticky */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-lg font-mono">
            <span className="c-cyber-accent">Clinica de Emprendimientos</span>
            <span className="ml-2" style={{color: '#00ffb2'}}>XNORIA</span>
          </div>
          <a
            href="#form"
            className="text-sm font-medium font-mono px-4 py-2 rounded transition c-cyber-border hover:bg-primary/20"
          >
            → {t('diagnostic.startDiagnosis', 'Diagnosticar')}
          </a>
        </div>
      </div>

      {/* SECCIÓN 1: HERO + CAPTURA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero Copy */}
          <div className="text-center mb-16">
            <p className="text-sm sm:text-base font-mono mb-6 c-cyber-accent" style={{letterSpacing: '0.15em'}}>XNORIA CLINIC</p>
            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold font-mono mb-4 c-text-primary">
              {t('diagnostic.businessFeverHeading', '¿Tu negocio tiene fiebre de clientes perdidos?')}
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-8 leading-relaxed c-cyber-accent">
              {t('diagnostic.stopLosingHeading', 'Deja de perder clientes\nque ya confiaron en ti')}
            </h2>
            <p className="text-lg sm:text-xl font-mono mb-8 leading-relaxed c-text-secondary">
             {t('diagnostic.diagnoseSubheading', 'Diagnosticamos en 48 horas dónde sangra tu negocio e implementamos la solución exacta — sin complicarte, con resultados en 14 días.')}
            </p>
          </div>

          {/* Form Card */}
          <div id="form" className="bg-card rounded-xl p-8 sm:p-10 mb-8 c-cyber-border">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-bold font-mono mb-6">{t('diagnostic.beginDiagnosis', 'Comienza tu diagnóstico')}</h3>
              <button
                className="w-full bg-cyber-accent text-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition font-mono"
              >
                Agendar diagnóstico gratis
              </button>
              <p className="text-sm c-text-secondary mt-4">
                ⏰ Solo <span className="c-cyber-accent" style={{fontSize: '1.1em'}}>{5 - slotsUsed} {t('diagnostic.slots', 'cupos')}</span> {t('diagnostic.slotWord', 'disponibles')} esta semana
              </p>
            </div>
          </div>
        </div>

        {/* ECG Visualization - Full Width Background Decoration */}
        <div className="w-screen -mx-[calc(50vw-50%)] mt-12">
          <ECGVisualization height={350} heartRate={72} strokeColor="#00ffaa" showGrid={true} />
        </div>
      </section>

      {/* SECCIÓN 2: PROBLEMAS */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-center mb-16 c-cyber-accent">
            {t('diagnostic.soundsFamiliar', '¿TE SUENA FAMILIAR ESTO?')}
          </h2>

          <div className="grid gap-6">
            {[
              t('diagnostic.problem1Alt', 'Tienes clientes, pero no sabes por qué muchos nunca regresan'),
              t('diagnostic.problem2Alt', 'Inviertes tiempo y dinero buscando clientes nuevos, mientras los viejos se van'),
              t('diagnostic.problem3Alt', 'Intentaste sistemas complicados y los abandonaste porque no valían la pena'),
              t('diagnostic.problem4Alt', 'Sientes que tu negocio podría crecer más, pero algo lo frena'),
              t('diagnostic.problem5Alt', 'Ves competidores con clientes recurrentes y te preguntas qué hacen diferente'),
            ].map((problem, idx) => (
              <div key={idx} className="bg-card p-6 rounded-lg c-cyber-border-light flex items-start gap-4">
                <span className="text-2xl c-cyber-accent font-bold flex-shrink-0">•</span>
                <p className="text-lg font-mono leading-relaxed c-text-secondary">{problem}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl font-mono c-text-secondary mb-2">
              {t('diagnostic.notAlone', 'No estás solo. La mayoría de PYMEs vive exactamente lo mismo.')}
            </p>
            <p className="text-lg font-mono c-cyber-accent">
              {t('diagnostic.noEffort', 'Y no es por falta de esfuerzo — es porque nadie les mostró')} <span className="inline-block animate-pulse">dónde sangran.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: SOLUCIÓN */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-center mb-16 c-cyber-accent">
            {t('diagnostic.notCRM', 'NO SOMOS UN CRM. SOMOS TU MÉDICO DE CABECERA.')}
          </h2>

          <div className="mb-16 text-center">
            <p className="text-2xl font-bold font-mono mb-12">{t('diagnostic.theDifference', 'La diferencia es simple:')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Otros */}
            <div>
              <h3 className="text-2xl font-bold font-mono mb-8 c-text-secondary">
                {t('diagnostic.othersYouVend', 'OTROS TE VENDEN:')}
              </h3>
              <ul className="space-y-4">
                {[
                  t('diagnostic.complexSystem', 'Un sistema completo que debes aprender a usar'),
                  t('diagnostic.unnecessaryFeatures', 'Funciones que no necesitas'),
                  t('diagnostic.trainingHours', 'Horas de capacitación y configuración'),
                  t('diagnostic.yourResponsibility', 'La responsabilidad de operarlo tú mismo'),
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-mono text-lg">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nosotros */}
            <div>
              <h3 className="text-2xl font-bold font-mono mb-8 c-cyber-accent">
                {t('diagnostic.weGiveYou', 'LO QUE NOSOTROS TE DAMOS:')}
              </h3>
              <ul className="space-y-4">
                {[
                  t('diagnostic.clearDiagnosis', 'Un diagnóstico claro de tu problema específico'),
                  t('diagnostic.exactSolution', 'La solución exacta para ese problema (nada más)'),
                  t('diagnostic.weImplement', 'Nosotros lo implementamos por ti'),
                  t('diagnostic.realResultsIn14', 'Resultados reales en 14 días'),
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-mono text-lg">
                    <span className="c-cyber-accent mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: MECANISMO */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-center mb-16">
            <span className="c-cyber-accent">{t('diagnostic.diagnosisRealPain', 'DIAGNOSTICAMOS TU DOLOR REAL')}</span><br/>
            <span className="c-cyber-accent">{t('diagnostic.applyOnly', 'APLICAMOS SOLO LO QUE NECESITAS')}</span><br/>
            <span className="c-cyber-accent">{t('diagnostic.weOperate', 'NOSOTROS LO OPERAMOS POR TI')}</span><br/>
            <span className="c-cyber-accent">{t('diagnostic.seeResultsIn14', 'VES RESULTADOS EN 14 DÍAS')}</span>
          </h2>
          <p className="text-center text-2xl font-bold c-cyber-accent">
            {t('diagnostic.onlyRealResults', 'Solo resultados reales.')}
          </p>
        </div>
      </section>

      {/* SECCIÓN 5: FARMACIA XNORIA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-center mb-4 c-cyber-accent">{t('diagnostic.ourSolutions', 'NUESTRAS SOLUCIONES')}</h2>
          <p className="text-center text-lg c-text-secondary font-mono mb-12">{t('diagnostic.chooseRemedy', 'Elige el remedio que tu negocio necesita')}</p>
          <ServicesShowcase />
        </div>
      </section>

      {/* SECCIÓN 6: RESULTADOS REALES */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-center mb-16 c-cyber-accent">
            {t('diagnostic.realResultsHeading', 'RESULTADOS REALES (No procesos)')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t('diagnostic.caseName1', 'Clínica Dental Sonrisas León'),
                result: t('diagnostic.caseResult1', 'Recuperó 35 clientes inactivos en 30 días'),
                icon: '🦷'
              },
              {
                name: t('diagnostic.caseName2', 'Cadena de Restaurantes Don Pedro'),
                result: t('diagnostic.caseResult2', 'Aumentó tasa de cierre 20% sin contratar personal'),
                icon: '🍽️'
              },
              {
                name: t('diagnostic.caseName3', 'Agencia Digital Nexus'),
                result: t('diagnostic.caseResult3', 'Automatizó 40 horas de trabajo manual por semana'),
                icon: '💻'
              },
            ].map((caseStudy, idx) => (
              <div key={idx} className="bg-card p-8 rounded-lg c-cyber-border text-center">
                <div className="text-5xl mb-4">{caseStudy.icon}</div>
                <h3 className="font-bold font-mono mb-3">{caseStudy.name}</h3>
                <p className="text-sm c-cyber-accent font-bold">{caseStudy.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: CONFIANZA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-8 c-cyber-accent">
            {t('diagnostic.trust', 'YA CONFÍAN EN NOSOTROS')}
          </h2>
          <p className="text-xl font-mono c-text-secondary">
            {t('diagnostic.trustDesc', 'Tu éxito es nuestro éxito. Solo ganamos cuando entregamos resultados.')}
          </p>
        </div>
      </section>

      {/* SpO₂ Visualization - Full Width Background Decoration */}
      <div className="w-screen -mx-[calc(50vw-50%)]">
        <SpO2Visualization height={300} respiratoryRate={15} spO2Value={98} showThresholdLine={true} />
      </div>

      {/* SECCIÓN 8: FAQ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-center mb-16 c-cyber-accent">
            {t('diagnostic.faqTitle', 'PREGUNTAS FRECUENTES')}
          </h2>

          <div className="space-y-6">
            {[
              {
                q: t('diagnostic.faqQ1', '¿Cuánto cuesta?'),
                a: t('diagnostic.faqA1', 'Depende del remedio. Desde $0 (diagnóstico gratis) hasta $3,499 + $999/mes. Pagas solo lo que usas.'),
              },
              {
                q: t('diagnostic.faqQ2', '¿Cuánto tardo en ver resultados?'),
                a: t('diagnostic.faqA2', 'Diagnóstico: 48 horas. Implementación: 7-14 días. Resultados reales: los ves de inmediato.'),
              },
              {
                q: t('diagnostic.faqQ3', '¿Y si no me agrada?'),
                a: t('diagnostic.faqA3', 'Algunos remedios tienen garantías. Otros sin riesgo. Confiamos — te lo mostraremos.'),
              },
              {
                q: t('diagnostic.faqQ4', '¿Necesito saber de tecnología?'),
                a: t('diagnostic.faqA4', 'No. Nos dices tu problema, nosotros lo resolvemos. Eso es todo.'),
              },
              {
                q: t('diagnostic.faqQ5', '¿Puedes ayudar mi tipo de negocio?'),
                a: t('diagnostic.faqA5', 'Si tienes clientes que deberían volver, sí. Trabajamos con cualquier negocio.'),
              },
            ].map((faq, idx) => (
              <details key={idx} className="group border border-border rounded-lg p-6 cursor-pointer hover:bg-card/50 transition">
                <summary className="font-bold font-mono flex justify-between items-center">
                  {faq.q}
                  <span className="text-xl c-cyber-accent group-open:rotate-180 transition">›</span>
                </summary>
                <p className="mt-4 text-sm c-text-secondary leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 9: FINAL CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border bg-card/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-bold font-mono mb-6 c-cyber-accent">
            {t('diagnostic.ctaTitle', '¿LISTO PARA DEJAR DE PERDER CLIENTES?')}
          </h2>
          <p className="text-xl font-mono mb-8 c-text-secondary">
            {t('diagnostic.ctaDesc', 'Descubramos dónde sangra tu negocio.')}
          </p>
          <a
            href="#form"
            className="inline-block bg-cyber-accent text-black font-bold py-4 px-8 rounded-lg hover:opacity-90 transition font-mono text-lg"
          >
            → {t('diagnostic.startDiagnosis', 'Comenzar diagnóstico gratis')}
          </a>
        </div>
      </section>

      {/* Chat Modal */}
      <SidebarChat />

      <Footer />
    </main>
  );
}
