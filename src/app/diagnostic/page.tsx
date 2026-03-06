'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, MessageCircle, BarChart3, RotateCw, Phone, Thermometer, Zap } from 'lucide-react';
import { DynamicLeadForm } from '@/app/components/dynamic-lead-form';
import { ChatModal } from './components/ChatModal';

export default function DiagnosticPage() {
  const [showForm, setShowForm] = useState(false);
  const [slotsUsed, setSlotsUsed] = useState(3);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
          <div className="text-center mb-16">
            <p className="text-sm sm:text-base font-mono mb-6 c-cyber-accent" style={{letterSpacing: '0.15em'}}>XNORIA CLINIC</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-mono mb-4 leading-tight c-text-primary">
              Deja de perder clientes<br />que ya confiaron en ti
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-8 leading-relaxed c-cyber-accent">
              Diagnosticamos en 48 horas dónde sangra tu negocio
            </h2>
            <p className="text-lg sm:text-xl font-mono mb-8 leading-relaxed c-text-secondary">
              e implementamos la solución exacta — sin complicarte, sin CRM complejo, con resultados en 14 días.
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
                → Agendar Diagnóstico CX Express
              </button>
            )}
          </div>

          {/* Scarcity */}
          <div className="text-center c-cyber-border rounded-lg p-6">
            <p className="text-sm font-semibold font-mono mb-4">
              ⏰ Solo <span className="c-cyber-accent" style={{fontSize: '1.1em'}}>{5 - slotsUsed} cupos</span> esta semana
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

      {/* SECCIÓN 2: EL DOLOR REAL (Validación emocional) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            ¿TE SUENA FAMILIAR ESTO?
          </h2>

          <div className="space-y-4 mb-12">
            <div className="flex items-start gap-4 p-4 bg-card rounded-lg c-cyber-border">
              <span className="c-cyber-accent text-2xl flex-shrink-0">☑</span>
              <p className="text-sm">Tienes clientes, pero no sabes por qué muchos nunca regresan</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card rounded-lg c-cyber-border">
              <span className="c-cyber-accent text-2xl flex-shrink-0">☑</span>
              <p className="text-sm">Inviertes tiempo y dinero buscando clientes nuevos, mientras los viejos se van</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card rounded-lg c-cyber-border">
              <span className="c-cyber-accent text-2xl flex-shrink-0">☑</span>
              <p className="text-sm">Intentaste sistemas complicados y los abandonaste porque no valían la pena</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card rounded-lg c-cyber-border">
              <span className="c-cyber-accent text-2xl flex-shrink-0">☑</span>
              <p className="text-sm">Sientes que tu negocio podría crecer más, pero algo lo frena</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card rounded-lg c-cyber-border">
              <span className="c-cyber-accent text-2xl flex-shrink-0">☑</span>
              <p className="text-sm">Ves competidores con clientes recurrentes y te preguntas qué hacen diferente</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-mono mb-4">
              No estás solo. La mayoría de PYMEs del Bajío vive exactamente lo mismo.
            </p>
            <p className="text-lg font-mono c-text-tertiary">
              Y no es por falta de esfuerzo — es porque nadie les mostró <strong>dónde sangran.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: ¿CÓMO FUNCIONA? (Sin tecnicismos) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            NO SOMOS UN CRM. SOMOS TU MÉDICO DE CABECERA.
          </h2>

          <p className="text-center text-lg font-mono mb-12 c-text-secondary">
            La diferencia es simple:
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Lo que otros te venden */}
            <div>
              <h3 className="text-xl font-bold font-mono mb-6 text-center">
                OTROS TE VENDEN:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg" style={{background: 'rgba(255, 0, 0, 0.08)', borderLeft: '4px solid rgba(255, 0, 0, 0.3)'}}>
                  <span className="text-xl flex-shrink-0">❌</span>
                  <span className="text-sm">Un sistema completo que debes aprender a usar</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg" style={{background: 'rgba(255, 0, 0, 0.08)', borderLeft: '4px solid rgba(255, 0, 0, 0.3)'}}>
                  <span className="text-xl flex-shrink-0">❌</span>
                  <span className="text-sm">Funciones que no necesitas</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg" style={{background: 'rgba(255, 0, 0, 0.08)', borderLeft: '4px solid rgba(255, 0, 0, 0.3)'}}>
                  <span className="text-xl flex-shrink-0">❌</span>
                  <span className="text-sm">Horas de capacitación y configuración</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg" style={{background: 'rgba(255, 0, 0, 0.08)', borderLeft: '4px solid rgba(255, 0, 0, 0.3)'}}>
                  <span className="text-xl flex-shrink-0">❌</span>
                  <span className="text-sm">La responsabilidad de operarlo tú mismo</span>
                </div>
              </div>
            </div>

            {/* Lo que nosotros damos */}
            <div>
              <h3 className="text-xl font-bold font-mono mb-6 text-center">
                NOSOTROS TE DAMOS:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg c-cyber-border">
                  <span className="c-cyber-accent text-xl flex-shrink-0">✅</span>
                  <span className="text-sm">Un diagnóstico claro de tu problema específico</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg c-cyber-border">
                  <span className="c-cyber-accent text-xl flex-shrink-0">✅</span>
                  <span className="text-sm">La solución exacta para ese problema (nada más)</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg c-cyber-border">
                  <span className="c-cyber-accent text-xl flex-shrink-0">✅</span>
                  <span className="text-sm">Nosotros lo implementamos por ti</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg c-cyber-border">
                  <span className="c-cyber-accent text-xl flex-shrink-0">✅</span>
                  <span className="text-sm">Resultados reales en 14 días</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-card rounded-xl p-8 c-cyber-border">
            <p className="text-lg font-mono mb-4">
              No somos una herramienta más que aprender.
            </p>
            <p className="text-lg font-mono">
              Somos la solución que ya funciona mientras tú te enfocas en tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: MECANISMO (3 PASOS) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            LA FÓRMULA QUE NADIE TE HA MOSTRADO
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Paso 1 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(0, 255, 178, 0.1)'}}>
                <div className="text-2xl font-bold c-cyber-accent">1</div>
              </div>
              <h3 className="text-xl font-bold font-mono mb-3">DIAGNOSTICAMOS TU DOLOR REAL</h3>
              <p className="text-sm c-text-secondary">
                No adivinamos. Conversamos contigo y analizamos tu negocio para encontrar exactamente dónde pierdes clientes. En 48 horas sabrás la respuesta.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(0, 255, 178, 0.1)'}}>
                <div className="text-2xl font-bold c-cyber-accent">2</div>
              </div>
              <h3 className="text-xl font-bold font-mono mb-3">APLICAMOS SOLO LO QUE NECESITAS</h3>
              <p className="text-sm c-text-secondary">
                No te vendemos un sistema completo. Implementamos solo la solución para tu punto de fuga específico. Sin funciones extra, sin complejidad.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(0, 255, 178, 0.1)'}}>
                <div className="text-2xl font-bold c-cyber-accent">3</div>
              </div>
              <h3 className="text-xl font-bold font-mono mb-3">NOSOTROS LO OPERAMOS POR TI</h3>
              <p className="text-sm c-text-secondary">
                Tú te enfocas en tu negocio. Nosotros nos encargamos de reactivar a tus clientes mientras tú haces lo que mejor sabes hacer.
              </p>
            </div>

            {/* Paso 4 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(0, 255, 178, 0.1)'}}>
                <div className="text-2xl font-bold c-cyber-accent">4</div>
              </div>
              <h3 className="text-xl font-bold font-mono mb-3">VES RESULTADOS EN 14 DÍAS</h3>
              <p className="text-sm c-text-secondary">
                No meses de implementación. En 14 días tienes clientes recuperados e ingresos que antes estaban perdidos.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 bg-card/30 rounded-xl p-8">
            <p className="text-lg font-mono">
              Eso es todo. Sin magia, sin tecnicismos, sin promesas vacías.<br />
              <span style={{color: '#00ffb2'}}>Solo resultados reales.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: FARMACIA XNORIA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
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
                    <p className="text-xs font-mono c-text-tertiary">REACTIVACIÓN</p>
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
                    <p className="text-xs font-mono c-text-tertiary">CONVERSIÓN</p>
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
                    <p className="text-xs font-mono c-text-tertiary">DIAGNÓSTICO</p>
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
                    <p className="text-xs font-mono c-text-tertiary">AUTOMATIZACIÓN</p>
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
            <p className="text-sm font-mono c-text-tertiary">
              ⏳ Solo 3 cupos disponibles esta semana
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: RESULTADOS REALES (No procesos) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            ESTO ES LO QUE LOGRAMOS JUNTOS
          </h2>

          <div className="space-y-8">
            {/* Caso 1 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-xl font-bold font-mono mb-2">Clínica Dental Sonrisas León</h3>
              <p className="text-sm mb-6 c-text-tertiary">Antes → Después</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="c-cyber-accent text-lg flex-shrink-0">•</span>
                  <span className="text-sm"><strong>68% de pacientes inactivos</strong> → 28 pacientes recuperados en 14 días</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="c-cyber-accent text-lg flex-shrink-0">•</span>
                  <span className="text-sm"><strong>Sin sistema de seguimiento</strong> → Proceso automático que funciona solo</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="c-cyber-accent text-lg flex-shrink-0">•</span>
                  <span className="text-sm"><strong>Ingresos irregulares</strong> → <span style={{color: '#00ffb2'}}>$19,000 MXN recuperados</span> en primera campaña</span>
                </div>
              </div>
            </div>

            {/* Caso 2 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-xl font-bold font-mono mb-2">Consultoría Nexus Bajío</h3>
              <p className="text-sm mb-6 c-text-tertiary">Antes → Después</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="c-cyber-accent text-lg flex-shrink-0">•</span>
                  <span className="text-sm"><strong>Clientes que compraban una vez y desaparecían</strong> → <span style={{color: '#00ffb2'}}>35% de tasa de recompra</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="c-cyber-accent text-lg flex-shrink-0">•</span>
                  <span className="text-sm"><strong>Sin estructura de CX</strong> → Sistema operando sin su intervención</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="c-cyber-accent text-lg flex-shrink-0">•</span>
                  <span className="text-sm"><strong>Tiempo perdido en seguimientos manuales</strong> → <span style={{color: '#00ffb2'}}>10 horas/semana recuperadas</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 bg-card/30 rounded-xl p-8">
            <p className="text-lg font-mono mb-2">
              Tu negocio puede tener resultados similares.
            </p>
            <p className="text-xl font-bold font-mono" style={{color: '#00ffb2'}}>
              La única diferencia es empezar.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: CONFIANZA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono mb-12">
            ¿POR QUÉ CONFIAR EN NOSOTROS?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Especialistas */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2 c-cyber-accent">✓ Especialistas en PYMEs del Bajío</h3>
              <p className="text-sm">
                Entendemos tu realidad. No somos una agencia genérica.
              </p>
            </div>

            {/* Alianza */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2 c-cyber-accent">✓ No somos una agencia más</h3>
              <p className="text-sm">
                Somos tu aliado de largo plazo. Tu éxito es nuestro éxito.
              </p>
            </div>

            {/* Resultados */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2 c-cyber-accent">✓ Resultados reales, no promesas vacías</h3>
              <p className="text-sm">
                Cada caso aquí es verificable. No inventamos números.
              </p>
            </div>

            {/* Humano */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2 c-cyber-accent">✓ Acompañamiento humano incluido</h3>
              <p className="text-sm">
                No solo software. Conversamos, asesoramos, resolvemos juntos.
              </p>
            </div>

            {/* Operación */}
            <div className="bg-card rounded-xl p-8 c-cyber-border md:col-span-2">
              <h3 className="text-lg font-bold font-mono mb-2 c-cyber-accent">✓ Operamos para ti, no te enseñamos a operar</h3>
              <p className="text-sm">
                Tú te enfocas en tu negocio. Nosotros en que funcione.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: FAQ MÍNIMA */}
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

      {/* SECCIÓN 9: CTA FINAL */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-6">
            ¿LISTO PARA DEJAR DE PERDER CLIENTES?
          </h2>

          <div className="space-y-6 mb-12">
            {/* Opción 1 */}
            <div className="bg-card rounded-xl p-8 c-cyber-border">
              <h3 className="text-lg font-bold font-mono mb-2">Opción 1 (Recomendada):</h3>
              <p className="text-sm mb-4 c-text-secondary">Diagnóstico Express GRATIS</p>
              <p className="text-sm mb-6">
                Descubre en 48 horas dónde sangra tu negocio. Sin compromiso, sin costo, sin tecnicismos.
              </p>
              <a
                href="#form"
                className="inline-block py-3 px-8 rounded-lg transition font-mono font-bold c-cyber-border hover:bg-primary/30"
              >
                → Quiero mi diagnóstico GRATIS
              </a>
            </div>

            {/* Opción 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-base font-bold font-mono mb-2">Opción 2:</h3>
              <p className="text-sm mb-3">Ver casos reales de PYMEs como la tuya</p>
              <a
                href="#"
                className="text-sm font-mono c-cyber-accent hover:underline"
              >
                → Ver casos de éxito
              </a>
            </div>

            {/* Opción 3 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-base font-bold font-mono mb-2">Opción 3:</h3>
              <p className="text-sm mb-3">Hablar directamente con nuestro especialista</p>
              <a
                href="https://wa.me/message"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono c-cyber-accent hover:underline"
              >
                → 💬 Escríbeme ahora (sin ventas agresivas)
              </a>
            </div>
          </div>

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

          <p className="font-mono text-xs mt-6 c-text-tertiary">
            Sin tarjeta • 24h • 100% confidencial
          </p>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 rounded-full p-4 transition-all z-40 c-cyber-border hover:c-neon-glow"
        title="Open Chat"
        aria-label="Open Chat Menu"
      >
        <MessageCircle className="w-6 h-6 c-cyber-accent" />
      </button>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        webhookUrl={process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL}
      />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-xs font-mono">
          <p>© 2026 Studio Lemat • XNORIA Clinic</p>
          <p className="mt-2 c-text-tertiary">
            Diagnóstico CX Express • Lead Magnet para PYMEs Mexicanas
          </p>
        </div>
      </footer>
    </main>
  );
}
