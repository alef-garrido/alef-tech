'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, MessageCircle, BarChart3 } from 'lucide-react';
import { DynamicLeadForm } from '@/app/components/dynamic-lead-form';

export default function DiagnosticPage() {
  const [showForm, setShowForm] = useState(false);
  const [slotsUsed, setSlotsUsed] = useState(3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header Sticky */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-lg font-mono">
            <span className="c-cyber-accent">Studio Lemat</span>
            <span className="ml-2" style={{color: '#00ffb2'}}>XNORIA</span>
          </div>
          <a
            href="#form"
            className="text-sm font-medium font-mono px-4 py-2 rounded transition c-cyber-border hover:bg-primary/20"
          >
            → Diagnosticar
          </a>
        </div>
      </div>

      {/* SECCIÓN 1: HERO + CAPTURA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero Copy */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono mb-6 leading-tight">
              ¿Tu negocio tiene <span style={{color: '#00ffb2'}}>fiebre</span> de clientes perdidos?
            </h1>
            <p className="text-xl sm:text-2xl font-mono mb-8">
              Hazte un chequeo <strong>GRATIS en 48h</strong>
              <br/>Sin compromiso. Sin tecnicismos.
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
                className="w-full py-3 px-6 rounded-lg transition font-mono font-bold c-cyber-border hover:bg-primary/30"
              >
                → Agendar Diagnóstico CX Express
              </button>
            )}
          </div>

          {/* Scarcity */}
          <div className="text-center c-cyber-border rounded p-4">
            <p className="text-sm font-semibold font-mono">
              ⏰ Solo <strong className="c-cyber-accent">{5 - slotsUsed} cupos</strong> esta semana
            </p>
            <div className="flex gap-2 justify-center mt-3">
              {[1, 2, 3, 4, 5].map((slot) => (
                <div
                  key={slot}
                  className={`w-6 h-6 rounded-full ${
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

      {/* SECCIÓN 2: MECANISMO (3 PASOS) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            Cómo funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(0, 255, 178, 0.1)'}}>
                <Mail className="w-6 h-6 c-cyber-accent" />
              </div>
              <h3 className="text-xl font-bold font-mono mb-3">1. Triaje</h3>
              <p className="text-sm">
                Subes tu base de clientes (CSV/Excel) o captura de WhatsApp.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(0, 255, 178, 0.1)'}}>
                <BarChart3 className="w-6 h-6 c-cyber-accent" />
              </div>
              <h3 className="text-xl font-bold font-mono mb-3">2. Diagnóstico</h3>
              <p className="text-sm">
                En 48h: reporte con <strong>3 puntos de fuga</strong> + valor monetario perdido.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(0, 255, 178, 0.1)'}}>
                <MessageCircle className="w-6 h-6 c-cyber-accent" />
              </div>
              <h3 className="text-xl font-bold font-mono mb-3">3. Consulta</h3>
              <p className="text-sm">
                Sesión 15 min: explicar hallazgos + recomendación puntual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: SOCIAL PROOF */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            Por qué confiar
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Validación metodológica */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2 c-cyber-accent">Metodología validada</h3>
              <p className="text-sm">
                Testeada con 15 PYMEs del Bajío. Transparencia total sobre nuestra etapa de investigación preliminar.
              </p>
            </div>

            {/* Alianza institucional */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2 c-cyber-accent">Alianzas institucionales</h3>
              <p className="text-sm">
                En alineación con: Valle de la Mentefactura, MiPYME al 100. Programas de digitalización del Bajío.
              </p>
            </div>

            {/* Piloto en curso */}
            <div className="bg-card rounded-xl p-8 c-cyber-border md:col-span-2">
              <h3 className="text-lg font-bold font-mono mb-2">✓ Piloto: <span className="c-cyber-accent">Consultoría Nexus Bajío</span></h3>
              <p className="text-sm">
                Validando en tiempo real con empresa de servicios profesionales, Querétaro. Resultados en curso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: FAQ MÍNIMA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            FAQ
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-card rounded-xl p-6 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2">¿Es gratis de verdad?</h3>
              <p className="text-sm">
                Sí. Sin tarjeta, sin compromiso. Si no encontramos 1+ punto de fuga con valor, no cobras nada.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-card rounded-xl p-6 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2">¿Necesito CRM o sistema?</h3>
              <p className="text-sm">
                No. Solo clientes (WhatsApp, Excel). Analizamos lo que ya tienes.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-card rounded-xl p-6 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2">¿Cuánto tiempo?</h3>
              <p className="text-sm">
                20 min máximo: 5 min datos + 15 min sesión. El resto lo hacemos nosotros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: CTA FINAL */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-6">
            Tu negocio puede sanar en 14 días
          </h2>
          <p className="text-xl font-mono mb-8">
            Empecemos con el diagnóstico.
          </p>

          <div className="bg-card c-cyber-border rounded-xl p-8 mb-8">
            <p className="text-sm font-mono font-semibold mb-4">
              Recupera primer cliente reactivo antes de comprometerte
            </p>
            <p className="text-sm font-mono">Cupos disponibles:</p>
            <div className="flex gap-3 justify-center mt-4">
              {[1, 2, 3, 4, 5].map((slot) => (
                <div
                  key={slot}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs font-mono ${
                    slot <= slotsUsed
                      ? 'bg-muted'
                      : 'c-cyber-border'
                  }`}
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>

          <a
            href="#form"
            className="inline-block py-4 px-8 rounded-lg transition font-mono font-bold c-cyber-border hover:bg-primary/30 text-lg"
          >
            → Reservar cupo GRATIS
          </a>

          <p className="font-mono text-xs mt-6" style={{color: '#888'}}>
            Sin tarjeta • 24h • 100% confidencial
          </p>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/message"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 rounded-full p-4 transition-all z-40 c-cyber-border hover:c-neon-glow"
        title="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 c-cyber-accent" />
      </a>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-xs font-mono">
          <p>© 2026 Studio Lemat • XNORIA Clinic</p>
          <p className="mt-2" style={{color: '#888'}}>
            Diagnóstico CX Express • Lead Magnet para PYMEs Mexicanas
          </p>
        </div>
      </footer>
    </main>
  );
}
