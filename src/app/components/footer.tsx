"use client";

import { useTranslations } from '@/i18n/translation-client';
import Link from 'next/link';
import { useState } from 'react';
import LinkedinIcon from './icons/LinkedinIcon';
import InstagramIcon from './icons/InstagramIcon';
import GitHubIcon from './icons/GitHubIcon';
import SubstackIcon from './icons/SubstackIcon';
import { DynamicLeadForm } from './dynamic-lead-form';
import { ServiceType } from '@/app/types/lead';

const TrainingIcon = () => (
  <div className="flex items-end gap-1 h-[4.5rem]" aria-hidden="true">
    <div className="w-1 h-1/3 bg-[var(--accent)] opacity-60"></div>
    <div className="w-1 h-2/3 bg-[var(--accent)] opacity-80"></div>
    <div className="w-1 h-full bg-[var(--accent)]"></div>
  </div>
);

const ConsultationIcon = () => (
  <div className="flex gap-2 h-[4.5rem]" aria-hidden="true">
    <div className="flex flex-col gap-1 w-1">
      <div className="h-1/2 bg-[var(--accent)] opacity-80"></div>
      <div className="h-1/2 bg-[var(--accent)] opacity-80"></div>
    </div>
    <div className="flex flex-col gap-1 w-1">
      <div className="h-1/2 bg-[var(--accent)]"></div>
      <div className="h-1/2 bg-[var(--accent)]"></div>
    </div>
  </div>
);

const ImplementationIcon = () => (
  <div className="grid grid-cols-3 grid-rows-3 gap-1 w-5 h-5" aria-hidden="true">
    <div className="w-full h-full bg-[var(--accent)]"></div>
    <div className="w-full h-full bg-[var(--accent)] opacity-80"></div>
    <div className="w-full h-full bg-[var(--accent)]"></div>
    <div className="w-full h-full bg-[var(--accent)] opacity-60"></div>
    <div className="w-full h-full bg-[var(--accent)]"></div>
    <div className="w-full h-full bg-[var(--accent)] opacity-60"></div>
    <div className="w-full h-full bg-[var(--accent)]"></div>
    <div className="w-full h-full bg-[var(--accent)] opacity-80"></div>
    <div className="w-full h-full bg-[var(--accent)]"></div>
  </div>
);

const SupportIcon = () => (
  <div className="relative w-5 h-5" aria-hidden="true">
    <div className="absolute top-0 left-1/2 w-1 h-full bg-[var(--accent)] -translate-x-1/2"></div>
    <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--accent)] -translate-y-1/2"></div>
  </div>
);

const Footer = () => {
  const tServices = useTranslations('services');
  const tMisc = useTranslations('misc');
  const tCta = useTranslations('cta');
  const tNav = useTranslations('navigation');

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>('general');

  const handleServiceClick = (service: ServiceType) => {
    setSelectedService(service);
    setShowLeadForm(true);
  };

  return (
    <>
      <footer className="bg-[var(--bg)] border-t border-[var(--border)] w-full font-mono mt-24 relative z-40 text-[var(--text)]">
        <div className="mx-auto max-w-none px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Training */}
              <div className="flex gap-3">
                <TrainingIcon />
                <div>
                  <button
                    type="button"
                    onClick={() => handleServiceClick('training')}
                    className="text-sm font-bold lowercase block mb-2 text-[var(--accent)] hover:underline cursor-pointer bg-transparent border-none text-left"
                  >
                    {tServices('training')}
                  </button>
                  <ul className="space-y-1 text-xs text-[var(--text-muted)] lowercase">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('training')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tServices('designOnboarding')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('training')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tServices('trainTeam')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('training')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tServices('learningPartner')}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Consultation */}
              <div className="flex gap-3">
                <ConsultationIcon />
                <div>
                  <button
                    type="button"
                    onClick={() => handleServiceClick('consulting')}
                    className="text-sm font-bold lowercase block mb-2 text-[var(--accent)] hover:underline cursor-pointer bg-transparent border-none text-left"
                  >
                    {tServices('consulting')}
                  </button>
                  <ul className="space-y-1 text-xs text-[var(--text-muted)] lowercase">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('consulting')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tServices('oneOnOne')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('consulting')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tServices('freeCall')}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Implementation */}
              <div className="flex gap-3">
                <ImplementationIcon />
                <div>
                  <button
                    type="button"
                    onClick={() => handleServiceClick('implementation')}
                    className="text-sm font-bold lowercase block mb-2 text-[var(--accent)] hover:underline cursor-pointer bg-transparent border-none text-left"
                  >
                    {tServices('implementation')}
                  </button>
                  <ul className="space-y-1 text-xs text-[var(--text-muted)] lowercase">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('implementation')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tServices('cxAssistance')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('implementation')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tServices('aiAssistance')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('implementation')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tServices('bespokeSoftware')}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Support */}
              <div className="flex gap-3">
                <SupportIcon />
                <div>
                  <span className="text-sm font-bold lowercase block mb-2 text-[var(--accent)]">
                    {tNav('contact')}
                  </span>
                  <ul className="space-y-1 text-xs text-[var(--text-muted)] lowercase">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('diagnostic')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline text-left"
                      >
                        {tMisc('newsletter')}
                      </button>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/studiolemat/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] hover:underline"
                      >
                        {tMisc('instagram')}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://substack.com/@aleflemat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] hover:underline"
                      >
                        {tMisc('blog')}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/alef-lemat/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#0284C7] dark:hover:text-[#2FD9E3] hover:border-[#2FD9E3]/60 hover:shadow-[0_0_15px_rgba(47,217,227,0.25)] transition-all duration-300"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://www.instagram.com/studiolemat/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#0284C7] dark:hover:text-[#2FD9E3] hover:border-[#2FD9E3]/60 hover:shadow-[0_0_15px_rgba(47,217,227,0.25)] transition-all duration-300"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://github.com/alef-garrido"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#0284C7] dark:hover:text-[#2FD9E3] hover:border-[#2FD9E3]/60 hover:shadow-[0_0_15px_rgba(47,217,227,0.25)] transition-all duration-300"
              >
                <GitHubIcon size={20} />
              </a>
              <a
                href="https://substack.com/@aleflemat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Substack"
                className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#0284C7] dark:hover:text-[#2FD9E3] hover:border-[#2FD9E3]/60 hover:shadow-[0_0_15px_rgba(47,217,227,0.25)] transition-all duration-300"
              >
                <SubstackIcon size={20} />
              </a>
            </div>

            <div className="text-center text-[var(--text-faint)] text-xs">
              <p>{tMisc('evolving')}</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleServiceClick('diagnostic');
              }}
              className="w-full max-w-sm"
            >
              <div className="group relative flex items-center border-b border-[var(--border)] pb-1 focus-within:border-transparent transition-colors">
                <input
                  type="email"
                  required
                  placeholder={tCta('enterEmail')}
                  className="w-full bg-transparent text-[var(--text)] text-xs font-mono py-2 pr-28 focus:outline-none placeholder:text-[var(--text-faint)]"
                />
                
                {/* Animated Neon Underline Indicator */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0284C7] dark:bg-[#2FD9E3] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ease-out origin-left shadow-[0_0_10px_rgba(47,217,227,0.5)]" />

                {/* Integrated Submit Button */}
                <button
                  type="submit"
                  className="absolute right-0 flex items-center gap-1.5 text-xs font-mono font-bold text-[#0284C7] dark:text-[#2FD9E3] hover:text-[var(--text)] transition-colors cursor-pointer py-1"
                >
                  <span>{tCta('subscribe')}</span>
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 border-t border-[var(--border)] pt-8 text-center">
            <div className="text-left">
              <Link href="/" className="leading-tight text-sm font-bold block font-mono text-[var(--text)]">
                Alef Lemat
              </Link>
              <Link href="/" className="leading-tight text-sm font-bold block font-mono text-[var(--accent)]">
                Tech
              </Link>
              <p className="mt-2 text-xs font-normal lowercase text-[var(--text-faint)]">
                {tMisc('cxSoftware')}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {showLeadForm && (
        <DynamicLeadForm
          service={selectedService}
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </>
  );
};

export default Footer;
