"use client";
import React from 'react';
import useModal from '../hooks/use-modal';
import ServiceModal from './service-modal';
import { service } from '../../../types';
import FlowingMenu from './flowing-menu';

const ServicesShowcase = () => {
  const { isModalOpen, selectedService, openModal, closeModal } = useModal();

  const services: service[] = [
    {
      title: 'Jarabe Reactivador',
      description: 'Recupera clientes inactivos y reactivéalos en 14 días. Nuestro sistema de WhatsApp automatizado contacta a tus clientes dormidos con una estrategia probada.',
      tech: ['WhatsApp Automation', 'CRM Integration', 'Email Sequences', 'Analytics'],
      image: '/assets/pholder.svg',
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

  const menuItems = services.map(service => ({
    link: service.liveUrl || '#',
    text: service.title,
    image: service.image,
    onClick: () => openModal(service),
  }));

  return (
    <div className="grid w-full my-48 px-6 md:px-12">
      <h2 className="text-5xl font-bold text-secondary mb-8 font-mono text-center">🏥 Farmacia Xnoria</h2>
      <p className="text-xl font-mono text-center mb-8 c-cyber-accent">Remedios que curan tu negocio</p>
      <div className="min-h-[500px] p-4 rounded-lg relative">
        <FlowingMenu items={menuItems} />
      </div>
      {isModalOpen && selectedService && (
        <ServiceModal service={selectedService} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ServicesShowcase;
