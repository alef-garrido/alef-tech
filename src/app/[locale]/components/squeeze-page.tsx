'use client';

import { useState } from 'react';
import { ServiceType } from '@/app/types/lead';
import { DynamicLeadForm } from './dynamic-lead-form';

interface SqueezePage {
  service: ServiceType;
  title: string;
  subtitle: string;
  benefits: string[];
  ctaText?: string;
}

const SQUEEZE_PAGE_CONFIG: Record<ServiceType, SqueezePage> = {
  training: {
    service: 'training',
    title: 'Transform Your Team',
    subtitle: 'Expert Training Programs for Digital Excellence',
    benefits: [
      'Empower your team to perform at their best',
      'Customized onboarding that drives adoption',
      'CX & digital skills for today\'s landscape',
      'Ongoing learning partnerships for growth',
    ],
    ctaText: 'Get Started with Training',
  },
  consulting: {
    service: 'consulting',
    title: 'Strategic Business Growth',
    subtitle: 'Consulting Services for Retention & Success',
    benefits: [
      'Expert CX strategy & audits',
      'AI-powered advisory for modern business',
      'Growth roadmaps tailored to your goals',
      'Proven strategies that drive results',
    ],
    ctaText: 'Schedule a Consultation',
  },
  implementation: {
    service: 'implementation',
    title: 'Build Your AI Business Engine',
    subtitle: 'Implementation Services for Digital Transformation',
    benefits: [
      'Automate your CX workflows',
      'Custom AI-assisted tools for your needs',
      'Complete business dashboard & analytics',
      'Full agentic business transformation',
    ],
    ctaText: 'Start Implementation',
  },
  general: {
    service: 'general',
    title: 'Let\'s Work Together',
    subtitle: 'Find the Right Solution for Your Business',
    benefits: [
      'Expert guidance across all services',
      'Tailored solutions for your needs',
      'Proven results in CX and digital transformation',
      'Partnership approach to your success',
    ],
    ctaText: 'Get in Touch',
  },
};

export const SqueezePage = ({ service }: { service: ServiceType }) => {
  const [showForm, setShowForm] = useState(false);
  const config = SQUEEZE_PAGE_CONFIG[service];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold font-mono mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          {config.title}
        </h1>
        <p className="text-xl text-gray-400 mb-12 font-mono">
          {config.subtitle}
        </p>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 w-full">
          {config.benefits.map((benefit, idx) => (
            <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold text-sm">{idx + 1}</span>
                </div>
                <p className="text-gray-300 font-mono text-sm">{benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-black font-mono font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          {config.ctaText}
        </button>

        <p className="text-gray-500 text-xs font-mono mt-8">
          No credit card required • Responses within 24 hours
        </p>
      </div>

      {/* Floating Form */}
      {showForm && (
        <DynamicLeadForm
          service={service}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
