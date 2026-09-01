"use client";

import { useState } from 'react';
import { DynamicLeadForm } from './dynamic-lead-form';
import { useRouter } from 'next/navigation';

interface AboutManifestoProps {
  onSendPrompt?: (prompt: string) => void;
}

export default function AboutManifesto({ onSendPrompt }: AboutManifestoProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const router = useRouter();

  const handlePrimaryClick = () => {
    if (onSendPrompt) {
      onSendPrompt(
        'Quiero ver cómo continúa el funnel después del manifiesto — el post de LinkedIn y el email de seguimiento con esta misma voz'
      );
    } else {
      setShowLeadForm(true);
    }
  };

  const handleSecondaryClick = () => {
    if (onSendPrompt) {
      onSendPrompt('Muéstrame cómo se vería esto como landing page completa');
    } else {
      router.push('/diagnostic');
    }
  };

  return (
    <>
      <article className="w-full bg-black/40 p-8 lg:p-10 rounded-2xl border border-neutral-800 backdrop-blur-sm shadow-xl font-sans text-gray-200">
        {/* Eyebrow */}
        <div className="text-xs font-mono font-medium tracking-[0.13em] uppercase text-gray-400 mb-7">
          Exnoria Clinic · by Studio Lemat
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-medium leading-tight text-white mb-9 max-w-xl">
          He visto negocios morir de cosas que tenían nombre.
        </h3>

        {/* Body content */}
        <div className="text-base leading-[1.85] text-gray-300 space-y-6">
          <p>
            No de mala suerte. Ni del mercado.<br />
            Sino por procesos que nadie se sentó a mirar con calma,<br />
            clientes que dejaron de quejarse y renunciaron sin aviso,<br />
            herramientas que se compraron con convicción y terminaron siendo ignoradas por el equipo, pero seguian abiertas en una
            pestaña que nadie cierra porque el manual operativo se los pide.
          </p>

          <p>
            Lo curioso es que los dueños no lo saben pero siempre sienten ese peso específico de llegar un lunes y sentir que el
            negocio exige más de lo que devuelve.
          </p>

          {/* Phrase Pivot / Highlight quote */}
          <div className="font-serif text-lg italic leading-[1.65] text-white py-7 my-8 border-y border-neutral-800">
            Después de años trabajando en agencias intermediarias y corporativos transnacionales, aprendí que la
            pregunta relevante rara vez es &quot;¿qué otra herramienta
            necesitamos?&quot; La pregunta relevante es: ¿qué está pasando aquí que
            hace que nada funcione del todo bien?
          </div>

          <p>
            Exnoria Clinic nació de esa pregunta. De la incomodidad de vender
            implementaciones a negocios que en realidad necesitaban que alguien
            se detuviera con ellos, mirara el sistema completo y dijera lo que
            nadie había dicho en voz alta antes.
          </p>

          <p>
            Aquí trabajamos desde adentro. <br />Empezamos por entender cómo respira
            tu operación:<br /> <b>dónde se acumula la presión, dónde se pierde energía,
              y dónde tu cliente siente que algo no está del todo bien aunque no
              sepa articularlo.</b><br /> Luego intervenimos con precisión:<br /> automatizaciones
            que resuelven el problema real, software que conversa con lo que ya
            tienes, entrenamiento que ocurre mientras trabajamos para que cuando
            nos vayamos, tu equipo no te pregunte qué hacer.
          </p>

          <p>
            No prometemos transformaciones. Prometemos claridad.
          </p>
        </div>

        {/* CTA Zone */}
        <div className="mt-11 pt-8 border-t border-neutral-800">
          <div className="text-lg font-medium leading-snug text-white mb-2 max-w-md">
            ¿Hace cuánto que sabes que algo no está funcionando?
          </div>
          <div className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
            Una conversación de 15 minutos. Sin presentación de ventas.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handlePrimaryClick}
              className="bg-[#1D9E75] hover:bg-[#5DCAA5] text-[#04342C] font-mono text-sm font-semibold px-5 py-3 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Necesito una segunda opinión
            </button>
            <button
              type="button"
              onClick={handleSecondaryClick}
              className="text-xs sm:text-sm text-gray-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Ver cómo se vería en landing →
            </button>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-11 text-xs text-gray-400 italic leading-relaxed">
          El diagnóstico no requiere valentía. Seguir sin él, sí. —{' '}
          <strong className="not-italic font-medium text-gray-300">
            Xnoria Clinic
          </strong>
        </div>
      </article>

      {showLeadForm && (
        <DynamicLeadForm
          service="diagnostic"
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </>
  );
}
