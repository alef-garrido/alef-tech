"use client";

import { LanguageSwitcher } from './language-switcher';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { DynamicLeadForm } from './dynamic-lead-form';
import { ServiceType } from '@/app/types/lead';
import { useTranslations } from '@/i18n/translation-client';
import { Sun, Moon } from 'lucide-react';

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

const HamburgerIcon = () => (
  <svg className="w-6 h-6 text-[var(--text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6 text-[var(--text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Navigation() {
  const tServices = useTranslations('services');
  const tMisc = useTranslations('misc');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>('general');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDateTime(new Date());
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleServiceClick = (service: ServiceType) => {
    setSelectedService(service);
    setShowLeadForm(true);
    setIsMenuOpen(false);
  };

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase()
      .replace(/ /g, '-');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <header className="nav w-full sticky top-0 z-50 backdrop-blur-xl">
        <div className="mx-auto max-w-none px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex justify-between items-start text-[var(--text)]">
            {/* Left Section - Brand Lockup */}
            <div className="text-left">
              <Link href="/" className="leading-tight text-sm font-bold block font-display tracking-widest text-[var(--text)]">
                ALEF LEMAT
              </Link>
              <Link href="/" className="leading-tight text-xs font-mono tracking-widest text-[var(--accent)] block">
                TECH
              </Link>
              <p className="mt-1 text-[10px] font-mono text-[var(--text-faint)] lowercase">
                {tMisc('cxSoftware')}
              </p>
            </div>

            {/* Center Section - Visible on large screens */}
            <div className="hidden 2xl:flex justify-center items-start gap-8 2xl:gap-14 font-mono">
              {/* Training */}
              <div className="flex gap-3">
                <TrainingIcon />
                <div>
                  <button
                    type="button"
                    onClick={() => handleServiceClick('training')}
                    className="text-xs font-bold lowercase block mb-2 cursor-pointer bg-transparent border-none text-left text-[var(--accent)] hover:underline"
                  >
                    // {tServices('training')}
                  </button>
                  <ul className="space-y-1 text-[11px] text-[var(--text-muted)] lowercase">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('training')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                      >
                        {tServices('designOnboarding')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('training')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                      >
                        {tServices('trainTeam')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('training')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
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
                    className="text-xs font-bold lowercase block mb-2 cursor-pointer bg-transparent border-none text-left text-[var(--accent)] hover:underline"
                  >
                    // {tServices('consulting')}
                  </button>
                  <ul className="space-y-1 text-[11px] text-[var(--text-muted)] lowercase">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('consulting')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                      >
                        {tServices('oneOnOne')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('consulting')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
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
                    className="text-xs font-bold lowercase block mb-2 cursor-pointer bg-transparent border-none text-left text-[var(--accent)] hover:underline"
                  >
                    // {tServices('implementation')}
                  </button>
                  <ul className="space-y-1 text-[11px] text-[var(--text-muted)] lowercase">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('implementation')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                      >
                        {tServices('cxAssistance')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('implementation')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                      >
                        {tServices('aiAssistance')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleServiceClick('implementation')}
                        className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                      >
                        {tServices('bespokeSoftware')}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Evolving Text */}
              <div className="text-[11px] font-mono text-[var(--text-faint)] max-w-[160px] leading-snug pt-0.5">
                <p>{tMisc('evolving')}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-start gap-4 font-mono">
              <LanguageSwitcher />

              {/* Theme Switcher Button */}
              <button
                type="button"
                className="theme-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline font-mono font-semibold">{theme === 'dark' ? 'Dark' : 'Light'}</span>
              </button>

              {/* Real-time Telemetry Date/Time */}
              {currentDateTime && (
                <div className="text-right">
                  <div
                    className="text-[var(--accent)] font-bold relative tracking-wider"
                    style={{ fontSize: '1.75rem', lineHeight: 0.8 }}
                    suppressHydrationWarning
                  >
                    <span
                      className="absolute text-[var(--alert)] font-normal rotate-[-15deg] animate-pulse"
                      style={{ fontSize: '2rem', top: '-0.25em', left: '-0.25em' }}
                    >
                      *
                    </span>
                    {formatDate(currentDateTime)}
                  </div>
                  <p
                    className="text-[10px] mt-1 tracking-widest text-[var(--text-faint)] font-mono lowercase"
                    suppressHydrationWarning
                  >
                    {formatTime(currentDateTime)} UTC
                  </p>
                </div>
              )}
            </div>

            {/* Hamburger Menu Button - Visible on small screens */}
            <div className="2xl:hidden flex items-center gap-2">
              <button onClick={toggleMenu} className="p-1" aria-label="Toggle menu">
                {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="2xl:hidden mt-4 pt-4 border-t border-[var(--border)] font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start justify-start">
                {/* Training */}
                <div className="flex gap-3">
                  <TrainingIcon />
                  <div>
                    <button
                      type="button"
                      onClick={() => handleServiceClick('training')}
                      className="text-xs font-bold lowercase block mb-2 cursor-pointer bg-transparent border-none text-left text-[var(--accent)]"
                    >
                      // {tServices('training')}
                    </button>
                    <ul className="space-y-1 text-xs text-[var(--text-muted)] lowercase">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleServiceClick('training')}
                          className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                        >
                          {tServices('designOnboarding')}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleServiceClick('training')}
                          className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                        >
                          {tServices('trainTeam')}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleServiceClick('training')}
                          className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
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
                      className="text-xs font-bold lowercase block mb-2 cursor-pointer bg-transparent border-none text-left text-[var(--accent)]"
                    >
                      // {tServices('consulting')}
                    </button>
                    <ul className="space-y-1 text-xs text-[var(--text-muted)] lowercase">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleServiceClick('consulting')}
                          className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                        >
                          {tServices('oneOnOne')}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleServiceClick('consulting')}
                          className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
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
                      className="text-xs font-bold lowercase block mb-2 cursor-pointer bg-transparent border-none text-left text-[var(--accent)]"
                    >
                      // {tServices('implementation')}
                    </button>
                    <ul className="space-y-1 text-xs text-[var(--text-muted)] lowercase">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleServiceClick('implementation')}
                          className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                        >
                          {tServices('cxAssistance')}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleServiceClick('implementation')}
                          className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                        >
                          {tServices('aiAssistance')}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleServiceClick('implementation')}
                          className="hover:text-[var(--accent)] cursor-pointer bg-transparent border-none hover:underline"
                        >
                          {tServices('bespokeSoftware')}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile lead form */}
      {showLeadForm && (
        <DynamicLeadForm service={selectedService} onClose={() => setShowLeadForm(false)} />
      )}
    </>
  );
}
