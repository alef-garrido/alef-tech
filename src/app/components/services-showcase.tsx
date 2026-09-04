"use client";
import React from 'react';
import useModal from '../hooks/use-modal';
import ServiceModal from './service-modal';
import { service } from '../../../types';
import FlowingMenu, { MenuItemProps } from './flowing-menu';
import AnimatedMedicalIcon, { MedicalIconVariant } from './icons/AnimatedMedicalIcon';
import { SimpleWaveVisualization } from './animations';
import { useTranslations } from '@/i18n/translation-client';

interface ExtendedService extends service {
  iconVariant?: MedicalIconVariant;
}

const ServicesShowcase = () => {
  const { isModalOpen, selectedService, openModal, closeModal } = useModal();
  const tDiagnostic = useTranslations('diagnostic');

  const services: ExtendedService[] = [
    {
      title: 'Jarabe Reactivador',
      description: 'Recupera clientes inactivos y reactivéalos en 14 días. Nuestro sistema de WhatsApp automatizado contacta a tus clientes dormidos con una estrategia probada.',
      tech: ['WhatsApp Automation', 'CRM Integration', 'Email Sequences', 'Analytics'],
      image: '/assets/pholder.svg',
      iconVariant: 'syrup',
      featured: true,
      liveUrl: '#schedule-demo',
      features: [
        'Recupera clientes inactivos',
        'WhatsApp + 14 días',
        'Campaña automatizada'
      ],
      pricing: '$1,999 + $500/cliente',
      guarantee: '✅ Garantía 5% reactivación',
      category: 'REACTIVACIÓN'
    },
    {
      title: 'Analgésico de Cierre',
      description: 'Convierte leads en ventas con nuestro sistema de seguimiento de 5 llamadas y 3 emails. Aumenta tu tasa de cierre hasta 15% con esta estrategia probada.',
      tech: ['Call Automation', 'Email Marketing', 'Lead Scoring', 'Pipeline Management'],
      image: '/assets/pholder.svg',
      iconVariant: 'pill',
      featured: true,
      liveUrl: '#schedule-demo',
      features: [
        'Convierte leads en ventas',
        '5 llamadas + 3 emails',
        'Sistema de seguimiento'
      ],
      pricing: '$2,499 único',
      guarantee: '✅ +15% tasa de cierre',
      category: 'CONVERSIÓN'
    },
    {
      title: 'Termómetro CX',
      description: 'Diagnóstico completo de tu experiencia del cliente en 48 horas. Identifica dónde se van tus clientes y recibe un plan de acción detallado.',
      tech: ['Customer Analytics', 'Data Visualization', 'Heat Mapping', 'Reporting'],
      image: '/assets/pholder.svg',
      iconVariant: 'thermometer',
      featured: true,
      liveUrl: '#schedule-demo',
      features: [
        'Diagnóstico 48h GRATIS',
        'Mapa de puntos de fuga',
        'Reporte visual incluido'
      ],
      pricing: 'Sin compromiso',
      guarantee: '✅ Reporte visual incluido',
      category: 'DIAGNÓSTICO'
    },
    {
      title: 'Vitamina Operativa',
      description: 'Automatiza todos tus seguimientos con flujos preconfigurados. Reduce tu carga operativa en 20% sin perder el toque personal con tus clientes.',
      tech: ['Workflow Automation', 'API Integration', 'Custom Triggers', 'Task Management'],
      image: '/assets/pholder.svg',
      iconVariant: 'vitamin',
      featured: true,
      liveUrl: '#schedule-demo',
      features: [
        'Automatiza seguimientos',
        'Flujo preconfigurado',
        'Integraciones premium'
      ],
      pricing: '$3,499 + $999/mes',
      guarantee: '✅ -20% carga operativa',
      category: 'AUTOMATIZACIÓN'
    }
  ];

  const menuItems: MenuItemProps[] = services.map(service => ({
    link: service.liveUrl || '#',
    text: service.title,
    image: service.image,
    iconVariant: service.iconVariant,
    onClick: () => openModal(service),
  }));

  return (
    <div className="grid w-full my-32 px-4 md:px-12 relative overflow-hidden">
      {/* Top Wave Decoration */}
      <div className="w-full mb-4 opacity-75">
        <SimpleWaveVisualization height={80} strokeColor="#2FD9E3" frequency={1.2} showGrid={false} />
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <AnimatedMedicalIcon variant="cross" size={44} color="#2FD9E3" />
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] font-mono tracking-tight">
            {tDiagnostic('farmaciaTitle')}
          </h2>
        </div>
        <p className="text-xl font-mono text-center text-[var(--accent)]">
          {tDiagnostic('remediesSubtitle')}
        </p>
      </div>

      {/* Flowing Menu Showcase */}
      <div className="min-h-[480px] p-4 rounded-lg relative z-10">
        <FlowingMenu items={menuItems} />
      </div>

      {/* Bottom Wave Decoration */}
      <div className="w-full opacity-60 mt-6">
        <SimpleWaveVisualization height={100} strokeColor="#2FD9E3" frequency={1} showGrid={true} />
      </div>

      {isModalOpen && selectedService && (
        <ServiceModal service={selectedService} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ServicesShowcase;
