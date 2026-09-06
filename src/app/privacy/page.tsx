import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Aviso de Privacidad | Alef Lemat Tech',
  description: 'Aviso de Privacidad conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP 2025).',
};

export default function PrivacyPage() {
  return (
    <div className="wrap py-24 sm:py-32 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="btn btn-ghost sm font-mono mb-6 inline-flex items-center gap-2">
          ← VOLVER AL INICIO / BACK TO HOME
        </Link>
        <p className="eyebrow">CUMPLIMIENTO REGULATORIO · LFPDPPP 2025</p>
        <h1 className="t-h1 text-[var(--text)] mt-3">Aviso de Privacidad Integral</h1>
        <p className="t-caption text-[var(--text-faint)] mt-2">Última actualización / Reforma: Marzo 2025 · Versión 1.0</p>
      </div>

      <div className="panel space-y-8 p-6 sm:p-10 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]">
        
        <section className="space-y-3">
          <h2 className="t-h3 text-[var(--accent)] font-mono">// 1. Identidad y Domicilio del Responsables</h2>
          <p className="t-body text-sm leading-relaxed text-[var(--text-muted)]">
            Alef Lemat (en adelante "El Responsable"), con domicilio operativo en México, es responsable del tratamiento y protección de sus datos personales recolectados a través de este sitio web y formularios de contacto digital, conforme a lo establecido en la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP 2025)</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="t-h3 text-[var(--accent)] font-mono">// 2. Datos Personales Recabados</h2>
          <p className="t-body text-sm leading-relaxed text-[var(--text-muted)]">
            Para la prestación de nuestros servicios de consultoría en experiencia del cliente (CX), diagnósticos empresariales y soluciones de IA, recabamos las siguientes categorías de datos personales (clasificados como <code>PERSONAL</code>):
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm font-mono text-[var(--text-muted)]">
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico profesional</li>
            <li>Número telefónico / WhatsApp de contacto</li>
            <li>Nombre de la empresa o negocio</li>
            <li>Requerimientos específicos del proyecto o diagnóstico</li>
          </ul>
          <p className="t-caption text-xs text-[var(--text-faint)]">
            Nota: Este sitio NO recaba datos sensibles (salud, origen étnico, creencias religiosas o preferencia sexual).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="t-h3 text-[var(--accent)] font-mono">// 3. Finalidades del Tratamiento</h2>
          <p className="t-body text-sm leading-relaxed text-[var(--text-muted)] font-semibold">
            Finalidades Primarias (necesarias para el servicio):
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm font-mono text-[var(--text-muted)]">
            <li>Procesar y responder a sus solicitudes de diagnóstico CX y consultoría.</li>
            <li>Agendar sesiones de asesoría y demostración de herramientas.</li>
            <li>Enviar la propuesta técnica o comercial solicitada.</li>
            <li>Mantener registros de consentimiento explícito e historial de atención.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="t-h3 text-[var(--accent)] font-mono">// 4. Derechos ARCO y Revocación del Consentimiento</h2>
          <p className="t-body text-sm leading-relaxed text-[var(--text-muted)]">
            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (<strong>Acceso</strong>). Asimismo, es su derecho solicitar la corrección de su información personal (<strong>Rectificación</strong>); que la eliminemos de nuestros registros (<strong>Cancelación</strong>); así como oponerse al uso de sus datos para fines específicos (<strong>Oposición</strong>).
          </p>
          <p className="t-body text-sm leading-relaxed text-[var(--text-muted)]">
            Para el ejercicio de cualquiera de los derechos ARCO o revocar su consentimiento, puede enviar un correo electrónico a nuestro Oficial de Privacidad en:
          </p>
          <div className="terminal p-4 rounded-md">
            <code>Email ARCO: privacy@aleflemat.tech</code>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="t-h3 text-[var(--accent)] font-mono">// 5. Medidas de Seguridad y Transferencias</h2>
          <p className="t-body text-sm leading-relaxed text-[var(--text-muted)]">
            Sus datos son almacenados en infraestructura segura con encriptación en tránsito (HTTPS/TLS) y en reposo (PostgreSQL con Row Level Security). No realizamos transferencias internacionales de datos ni venta de información a terceros no autorizados.
          </p>
        </section>

        <div className="pt-6 border-t border-[var(--border)] flex justify-between items-center text-xs font-mono text-[var(--text-faint)]">
          <span>LFPDPPP COMPLIANCE BUILD v1.0</span>
          <Link href="/" className="text-[var(--accent)] hover:underline">
            Volver al inicio →
          </Link>
        </div>
      </div>
    </div>
  );
}
