'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, MessageCircle, BarChart3, RotateCw, Phone, Thermometer, Zap } from 'lucide-react';
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

      {/* SECCIÓN 3: FARMACIA XNORIA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-2">
              🏥 FARMACIA XNORIA
            </h2>
            <p className="text-lg font-mono mb-8">
              Remedios que curan tu negocio
            </p>
          </div>

          {/* Grid de 4 Frascos */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* FRASCO 1: Jarabe Reactivador */}
            <div className="bg-card rounded-xl p-8 c-cyber-border overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl" style={{background: 'linear-gradient(135deg, rgba(0, 255, 178, 0.15), transparent)'}}></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{background: 'rgba(0, 255, 178, 0.15)'}}>
                    <RotateCw className="w-6 h-6 c-cyber-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-mono">Jarabe Reactivador</h3>
                    <p className="text-xs font-mono" style={{color: '#888'}}>REACTIVACIÓN</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(0, 255, 178, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 c-cyber-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Recupera clientes inactivos</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(0, 255, 178, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 c-cyber-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">WhatsApp + 14 días</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(0, 255, 178, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 c-cyber-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-mono font-bold c-cyber-accent">$1,999 + $500/cliente</span>
                  </div>
                </div>
                
                <div className="rounded-lg p-3 border-l-4 border-green-500" style={{background: 'rgba(34, 197, 94, 0.12)'}}>
                  <p className="text-sm font-bold">✅ Garantía 5% reactivación</p>
                </div>
              </div>
            </div>

            {/* FRASCO 2: Analgésico de Cierre */}
            <div className="bg-card rounded-xl p-8 c-cyber-border overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl" style={{background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), transparent)'}}></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{background: 'rgba(245, 158, 11, 0.15)'}}>
                    <Phone className="w-6 h-6" style={{color: '#f59e0b'}} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-mono">Analgésico de Cierre</h3>
                    <p className="text-xs font-mono" style={{color: '#888'}}>CONVERSIÓN</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(245, 158, 11, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#f59e0b'}} />
                    <span className="text-sm">Convierte leads en ventas</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(245, 158, 11, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#f59e0b'}} />
                    <span className="text-sm">5 llamadas + 3 emails</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(245, 158, 11, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#f59e0b'}} />
                    <span className="text-sm font-mono font-bold" style={{color: '#f59e0b'}}>$2,499 único</span>
                  </div>
                </div>
                
                <div className="rounded-lg p-3 border-l-4" style={{borderColor: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)'}}>
                  <p className="text-sm font-bold">✅ +15% tasa de cierre</p>
                </div>
              </div>
            </div>

            {/* FRASCO 3: Termómetro CX */}
            <div className="bg-card rounded-xl p-8 c-cyber-border overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), transparent)'}}></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{background: 'rgba(59, 130, 246, 0.15)'}}>
                    <Thermometer className="w-6 h-6" style={{color: '#3b82f6'}} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-mono">Termómetro CX</h3>
                    <p className="text-xs font-mono" style={{color: '#888'}}>DIAGNÓSTICO</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(59, 130, 246, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#3b82f6'}} />
                    <span className="text-sm">Diagnóstico 48h GRATIS</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(59, 130, 246, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#3b82f6'}} />
                    <span className="text-sm">Mapa de puntos de fuga</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(59, 130, 246, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#3b82f6'}} />
                    <span className="text-sm font-mono font-bold" style={{color: '#3b82f6'}}>Sin compromiso</span>
                  </div>
                </div>
                
                <div className="rounded-lg p-3 border-l-4" style={{borderColor: '#3b82f6', background: 'rgba(59, 130, 246, 0.12)'}}>
                  <p className="text-sm font-bold">✅ Reporte visual incluido</p>
                </div>
              </div>
            </div>

            {/* FRASCO 4: Vitamina Automatización */}
            <div className="bg-card rounded-xl p-8 c-cyber-border overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl" style={{background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), transparent)'}}></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{background: 'rgba(168, 85, 247, 0.15)'}}>
                    <Zap className="w-6 h-6" style={{color: '#a855f7'}} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-mono">Vitamina Automatización</h3>
                    <p className="text-xs font-mono" style={{color: '#888'}}>AUTOMATIZACIÓN</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(168, 85, 247, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#a855f7'}} />
                    <span className="text-sm">Automatiza seguimientos</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(168, 85, 247, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#a855f7'}} />
                    <span className="text-sm">Flujo preconfigurado</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg" style={{background: 'rgba(168, 85, 247, 0.08)'}}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#a855f7'}} />
                    <span className="text-sm font-mono font-bold" style={{color: '#a855f7'}}>$3,499 + $999/mes</span>
                  </div>
                </div>
                
                <div className="rounded-lg p-3 border-l-4" style={{borderColor: '#a855f7', background: 'rgba(168, 85, 247, 0.12)'}}>
                  <p className="text-sm font-bold">✅ -20% carga operativa</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-card rounded-xl p-8 sm:p-10 c-cyber-border text-center">
            <h3 className="text-2xl font-bold font-mono mb-4">
              🩺 ¿NO SABES QUÉ REMEDIO NECESITAS?
            </h3>
            <p className="text-lg font-mono mb-6">
              ➡️ AGENDA TU DIAGNÓSTICO CX EXPRESS GRATIS (15 min)
            </p>
            <a
              href="#form"
              className="inline-block py-3 px-8 rounded-lg transition font-mono font-bold c-cyber-border hover:bg-primary/30 text-base mb-4"
            >
              Quiero mi diagnóstico GRATIS
            </a>
            <p className="text-sm font-mono" style={{color: '#888'}}>
              ⏳ Solo 3 cupos disponibles esta semana
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: SOCIAL PROOF */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
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

      {/* SECCIÓN 5: FAQ MÍNIMA */}
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

      {/* SECCIÓN 6: CTA FINAL */}
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
