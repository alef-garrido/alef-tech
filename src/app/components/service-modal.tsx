"use client";

import { X, ExternalLink, Maximize } from 'lucide-react';
import { useEffect } from 'react';
import { service } from '../../../types';
import Image from 'next/image';
import { useTranslations } from '@/i18n/translation-client';

interface ServiceModalProps {
  service: service;
  closeModal: () => void;
}

const ServiceModal = ({ service, closeModal }: ServiceModalProps) => {
  const tMisc = useTranslations('misc');

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-50 c-bg-cyber-bg">
      {/* Terminal-style header */}
      <div className="c-terminal-header border-b c-border-cyber-border">
        <div className="flex items-center gap-2">
          <div className="c-terminal-dot red"></div>
          <div className="c-terminal-dot yellow"></div>
          <div className="c-terminal-dot green"></div>
        </div>
        <div className="flex items-center gap-4 ml-4 flex-1">
          <Maximize size={16} className="c-cyber-accent" />
          <span className="c-cyber-text text-sm font-mono">~/projects/{service.title.toLowerCase().replace(/\s+/g, '-')}.exe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="c-cyber-text-dim text-xs font-mono">{tMisc('pressEscToExit')}</span>
          <button
            onClick={closeModal}
            className="c-bg-cyber-surface border c-border-cyber-border rounded p-2 
                     hover:c-border-cyber-accent hover:c-bg-cyber-accent/10 transition-all duration-300
                     c-cyber-text hover:c-cyber-accent"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Full-screen content */}
      <div className="h-[calc(100vh-60px)] overflow-y-auto c-scrollbar-cyber">
        <div className="min-h-full grid grid-cols-1 lg:grid-cols-2">
          {/* Project media section */}
          <div className="relative c-bg-cyber-surface border-r c-border-cyber-border">
            {/* Action buttons overlay - now at the top */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="flex gap-2">
                {service.liveUrl ? (
                  <a
                    href={service.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 c-bg-cyber-accent/90 backdrop-blur-sm border c-border-cyber-accent 
                                 c-text-cyber-bg px-4 py-2 rounded-md font-mono font-semibold 
                                 hover:c-bg-cyber-electric hover:c-border-cyber-electric 
                                 transition-all duration-300 text-xs"
                  >
                    <ExternalLink size={16} />
                    {tMisc('launchDemo')}
                  </a>
                ) : (
                  <button
                    className="flex items-center gap-2 c-bg-cyber-accent/30 border c-border-cyber-border c-text-cyber-border px-4 py-2 rounded-md font-mono font-semibold text-xs cursor-not-allowed opacity-60"
                    disabled
                  >
                    <ExternalLink size={16} />
                    {tMisc('launchDemo')}
                  </button>
                )}
              </div>
            </div>
            <div className="sticky top-0 h-screen flex flex-col">
              {/* Media container */}
              <div className="flex-1 relative overflow-hidden">
                {service.videoUrl ? (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={service.image}>
                    <source src={service.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                    <div className={`w-full h-full relative`}>
                        <Image src={service.image} fill style={{ objectFit: 'cover' }} alt={service.title} />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 c-bg-cyber-accent/20 rounded-lg border c-border-cyber-accent flex items-center justify-center">
                          <span className="text-4xl c-cyber-accent font-mono">&lt;/&gt;</span>
                        </div>
                        <p className="c-cyber-text font-mono">{tMisc('projectPreview')}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-c-bg-cyber-bg/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Project details section */}
          <div className="c-bg-cyber-bg">
            <div className="p-4 lg:p-6 space-y-4">
              {/* Project header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="c-cyber-accent text-xs font-mono">
                      {tMisc('loadingProjectMetadata')}
                    </div>
                    <h1 className="m-4 text-2xl lg:text-3xl font-bold c-cyber-text c-neon-text font-mono">
                      {service.title}
                    </h1>
                  </div>
                  {service.featured && (
                    <div className="c-bg-cyber-accent c-text-cyber-bg px-2 py-1 rounded text-xs font-bold font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 c-bg-cyber-bg rounded-full animate-pulse"></span>
                      {tMisc('featured')}
                    </div>
                  )}
                </div>
                <div className="p-4 c-cyber-text-dim text-xs font-mono">
                  {tMisc('status')} <span className="c-cyber-accent">{tMisc('active')}</span> | 
                  {tMisc('type')} <span className="c-cyber-accent">{tMisc('webApplication')}</span> | 
                  {tMisc('access')} <span className="c-cyber-accent">{tMisc('public')}</span>
                </div>
              </div>

              {/* Description */}
              <div className="py-4 space-y-4">
                <h2 className="text-base font-bold c-cyber-text font-mono border-b c-border-cyber-border pb-1">
                  {tMisc('projectDescription')}
                </h2>
                <p className="c-cyber-text-dim leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>

              {/* Tech stack or Features section */}
              {service.features && service.features.length > 0 ? (
                <div className="py-4 space-y-4">
                  <h2 className="text-base font-bold c-cyber-text font-mono border-b c-border-cyber-border pb-1">
                    ✨ Características Incluidas
                  </h2>
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="c-bg-cyber-surface border c-border-cyber-border rounded p-3 
                                 hover:c-border-cyber-accent hover:c-bg-cyber-accent/5 transition-all duration-300
                                 group"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 c-bg-cyber-accent rounded-full group-hover:animate-pulse mt-1 flex-shrink-0"></div>
                          <span className="c-cyber-text font-mono text-sm">
                            {feature}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  <h2 className="text-base font-bold c-cyber-text font-mono border-b c-border-cyber-border pb-1">
                    {tMisc('techStackList')}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.tech.map((tech, index) => (
                      <div
                        key={index}
                        className="c-bg-cyber-surface border c-border-cyber-border rounded p-2 
                                 hover:c-border-cyber-accent hover:c-bg-cyber-accent/5 transition-all duration-300
                                 group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 c-bg-cyber-accent rounded-full group-hover:animate-pulse"></div>
                          <span className="c-cyber-text font-mono font-medium group-hover:c-cyber-accent transition-colors text-xs">
                            {tech}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project stats or Pricing/Guarantee section */}
              {service.pricing || service.guarantee ? (
                <div className="py-4 space-y-4">
                  <h2 className="text-base font-bold c-cyber-text font-mono border-b c-border-cyber-border pb-1">
                    💰 Inversión & Garantía
                  </h2>
                  <div className="space-y-3">
                    {service.pricing && (
                      <div className="c-bg-cyber-surface border c-border-cyber-border rounded p-3">
                        <div className="c-cyber-text-dim text-xs font-mono mb-1">INVERSIÓN</div>
                        <div className="c-cyber-accent text-lg font-bold font-mono">{service.pricing}</div>
                      </div>
                    )}
                    {service.guarantee && (
                      <div className="c-bg-cyber-surface border c-border-cyber-border rounded p-3" style={{borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                        <div className="c-cyber-text font-mono text-sm font-bold">{service.guarantee}</div>
                      </div>
                    )}
                    {service.category && (
                      <div className="c-bg-cyber-surface border c-border-cyber-border rounded p-3">
                        <div className="c-cyber-text-dim text-xs font-mono mb-1">CATEGORÍA</div>
                        <div className="c-cyber-text font-mono font-semibold text-sm">{service.category}</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  <h2 className="text-base font-bold c-cyber-text font-mono border-b c-border-cyber-border pb-1">
                    {tMisc('systemStats')}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="c-bg-cyber-surface border c-border-cyber-border rounded p-2 text-center">
                      <div className="c-cyber-accent text-lg font-bold font-mono">85%</div>
                      <div className="c-cyber-text-dim text-xs font-mono">{tMisc('completion')}</div>
                    </div>
                    <div className="c-bg-cyber-surface border c-border-cyber-border rounded p-2 text-center">
                      <div className="c-cyber-accent text-lg font-bold font-mono">{service.tech.length}</div>
                      <div className="c-cyber-text-dim text-xs font-mono">{tMisc('technologies')}</div>
                    </div>
                    <div className="c-bg-cyber-surface border c-border-cyber-border rounded p-2 text-center">
                      <div className="c-cyber-accent text-lg font-bold font-mono">{tMisc('live')}</div>
                      <div className="c-cyber-text-dim text-xs font-mono">{tMisc('status')}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Terminal command line or CTA */}
              {service.pricing || service.guarantee ? (
                <div className="border-t c-border-cyber-border pt-3">
                  <a
                    href="#form"
                    className="w-full block c-bg-cyber-accent/20 border c-border-cyber-accent rounded p-3 
                             hover:c-bg-cyber-accent/30 transition-all duration-300 text-center
                             c-cyber-accent font-mono font-bold text-sm"
                  >
                    🩺 Agenda tu diagnóstico GRATIS
                  </a>
                </div>
              ) : (
                <div className="border-t c-border-cyber-border pt-3">
                  <div className="c-bg-cyber-surface border c-border-cyber-border rounded p-2">
                    <div className="c-cyber-text-dim text-xs font-mono">
                      <span className="c-cyber-accent">admin@portfolio:~$</span> {tMisc('gitClone')} {service.title.toLowerCase().replace(/\s+/g, '-')}.git
                      <br />
                      <span className="c-cyber-accent">admin@portfolio:~$</span> {tMisc('npmInstall')}
                      <br />
                      <span className="c-cyber-text-dim">{tMisc('cloningInto')} {service.title.toLowerCase().replace(/\s+/g, '-')}...</span>
                      <span className="c-terminal-cursor">_</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
