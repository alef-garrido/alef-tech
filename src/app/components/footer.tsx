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

const MarkDuoIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" aria-hidden="true" className="flex-none">
    <circle cx="24" cy="24" r="20.5" fill="none" stroke="var(--accent)" strokeWidth="2.5"/>
    <g transform="rotate(-45 24 24)">
      <rect x="12" y="18" width="24" height="12" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M24 18V30" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="30" cy="24" r="2.4" fill="var(--alert)" stroke="none"/>
    </g>
  </svg>
);

const Footer = () => {
  const tServices = useTranslations('services');
  const tMisc = useTranslations('misc');
  const tCta = useTranslations('cta');

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>('general');

  const handleServiceClick = (service: ServiceType) => {
    setSelectedService(service);
    setShowLeadForm(true);
  };

  return (
    <>
      <footer className="w-full border-t border-[var(--border)] bg-[var(--bg)] mt-24 py-12">
        <div className="wrap">
          <div className="foot-in border-b border-[var(--border)] pb-8 mb-8">
            <Link href="/" className="logo-lock">
              <MarkDuoIcon />
              <div>
                <span className="wm">ALEF LEMAT</span>
                <span className="sub">DYNAMICS · HARDWARE-GRADE SOFTWARE</span>
              </div>
            </Link>

            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/alef-lemat/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><LinkedinIcon size={20} /></a>
              <a href="https://www.instagram.com/studiolemat/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><InstagramIcon size={20} /></a>
              <a href="https://github.com/alef-garrido" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><GitHubIcon size={20} /></a>
              <a href="https://substack.com/@aleflemat" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><SubstackIcon size={20} /></a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="label block mb-3">// {tServices('training')}</span>
              <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)]">
                <li><button type="button" onClick={() => handleServiceClick('training')} className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none">{tServices('designOnboarding')}</button></li>
                <li><button type="button" onClick={() => handleServiceClick('training')} className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none">{tServices('trainTeam')}</button></li>
                <li><button type="button" onClick={() => handleServiceClick('training')} className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none">{tServices('learningPartner')}</button></li>
              </ul>
            </div>

            <div>
              <span className="label block mb-3">// {tServices('consulting')}</span>
              <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)]">
                <li><button type="button" onClick={() => handleServiceClick('consulting')} className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none">{tServices('oneOnOne')}</button></li>
                <li><button type="button" onClick={() => handleServiceClick('consulting')} className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none">{tServices('freeCall')}</button></li>
              </ul>
            </div>

            <div>
              <span className="label block mb-3">// {tServices('implementation')}</span>
              <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)]">
                <li><button type="button" onClick={() => handleServiceClick('implementation')} className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none">{tServices('cxAssistance')}</button></li>
                <li><button type="button" onClick={() => handleServiceClick('implementation')} className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none">{tServices('aiAssistance')}</button></li>
                <li><button type="button" onClick={() => handleServiceClick('implementation')} className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none">{tServices('bespokeSoftware')}</button></li>
              </ul>
            </div>

            <div>
              <span className="label block mb-3">// NEWSLETTER SPEC</span>
              <form onSubmit={(e) => { e.preventDefault(); handleServiceClick('diagnostic'); }} className="field gap-2">
                <input type="email" placeholder={tCta('enterEmail')} className="text-xs" />
                <button type="submit" className="btn btn-primary sm mt-2">{tCta('subscribe')}</button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center text-xs font-mono text-[var(--text-faint)] border-t border-[var(--border)] pt-6">
            <p>© 2026 ALEF LEMAT DYNAMICS. ALL RIGHTS RESERVED.</p>
            <p>{tMisc('cxSoftware')}</p>
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
