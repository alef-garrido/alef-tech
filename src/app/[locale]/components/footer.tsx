'use client';

import { useTranslations } from 'next-intl';
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
        <div className="w-1 h-1/3 bg-foreground"></div>
        <div className="w-1 h-2/3 bg-foreground"></div>
        <div className="w-1 h-full bg-foreground"></div>
    </div>
);

const ConsultationIcon = () => (
    <div className="flex gap-2 h-[4.5rem]" aria-hidden="true">
        <div className="flex flex-col gap-1 w-1">
            <div className="h-1/2 bg-foreground"></div>
            <div className="h-1/2 bg-foreground"></div>
        </div>
        <div className="flex flex-col gap-1 w-1">
            <div className="h-1/2 bg-foreground"></div>
            <div className="h-1/2 bg-foreground"></div>
        </div>
    </div>
);

const ImplementationIcon = () => (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 w-5 h-5" aria-hidden="true">
        <div className="w-full h-full bg-foreground"></div>
        <div className="w-full h-full bg-foreground"></div>
        <div className="w-full h-full bg-foreground"></div>
        <div className="w-full h-full bg-foreground"></div>
        <div className="w-full h-full bg-foreground"></div>
        <div className="w-full h-full bg-foreground"></div>
        <div className="w-full h-full bg-foreground"></div>
        <div className="w-full h-full bg-foreground"></div>
        <div className="w-full h-full bg-foreground"></div>
    </div>
);

const SupportIcon = () => (
    <div className="relative w-5 h-5" aria-hidden="true">
        <div className="absolute top-0 left-1/2 w-1 h-full bg-foreground -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-foreground -translate-y-1/2"></div>
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
    console.log('Service clicked:', service);
    setSelectedService(service);
    setShowLeadForm(true);
  };

  return (
    <>
      <footer className="bg-background w-full font-sans mt-24 relative z-40">
        <div className="mx-auto max-w-none px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Training */}
                    <div className="flex gap-3">
                        <TrainingIcon />
                        <div>
                            <button type="button" onClick={() => handleServiceClick('training')} className="text-sm font-normal lowercase block mb-2 hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('training')}</button>
                            <ul className="space-y-1 text-xs lowercase">
                                <li><button type="button" onClick={() => handleServiceClick('training')} className="hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('designOnboarding')}</button></li>
                                <li><button type="button" onClick={() => handleServiceClick('training')} className="hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('trainTeam')}</button></li>
                                <li><button type="button" onClick={() => handleServiceClick('training')} className="hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('learningPartner')}</button></li>
                            </ul>
                        </div>
                    </div>
                    {/* Consultation */}
                    <div className="flex gap-3">
                        <ConsultationIcon />
                        <div>
                            <button type="button" onClick={() => handleServiceClick('consulting')} className="text-sm font-normal lowercase block mb-2 hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('consulting')}</button>
                            <ul className="space-y-1 text-xs lowercase">
                                <li><button type="button" onClick={() => handleServiceClick('consulting')} className="hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('oneOnOne')}</button></li>
                                <li><button type="button" onClick={() => handleServiceClick('consulting')} className="hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('freeCall')}</button></li>
                            </ul>
                        </div>
                    </div>
                    {/* Now */}
                    <div className="flex gap-3">
                        <ImplementationIcon />
                        <div>
                            <button type="button" onClick={() => handleServiceClick('implementation')} className="text-sm font-normal lowercase block mb-2 hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('implementation')}</button>
                            <ul className="space-y-1 text-xs lowercase">
                                <li><button type="button" onClick={() => handleServiceClick('implementation')} className="hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('cxAssistance')}</button></li>
                                <li><button type="button" onClick={() => handleServiceClick('implementation')} className="hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('aiAssistance')}</button></li>
                                <li><button type="button" onClick={() => handleServiceClick('implementation')} className="hover:text-primary cursor-pointer bg-transparent border-none hover:underline">{tServices('bespokeSoftware')}</button></li>
                            </ul>
                        </div>
                    </div>
                    {/* Support */}
                    <div className="flex gap-3">
                        <SupportIcon />
                        <div>
                            <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">{tNav('contact')}</Link>
                            <ul className="space-y-1 text-xs lowercase">
                                <li><Link href="#" className="hover:text-primary">{tMisc('newsletter')}</Link></li>
                                <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">{tMisc('instagram')}</a></li>
                                <li><Link href="#" className="hover:text-primary">{tMisc('blog')}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex gap-4 mb-4 md:mb-0">
                    <a href="https://www.linkedin.com/in/alef-lemat/" target="_blank" className="text-gray-400 hover:text-white"><LinkedinIcon size={24} /></a>
                    <a href="https://www.instagram.com/studiolemat/" target="_blank" className="text-gray-400 hover:text-white"><InstagramIcon size={24} /></a>
                    <a href="https://github.com/alef-garrido" target="_blank" className="text-gray-400 hover:text-white"><GitHubIcon size={24} /></a>
                    <a href="https://substack.com/@aleflemat" target="_blank" className="text-gray-400 hover:text-white"><SubstackIcon size={24} /></a>
                </div>
                <div className="mx-4 text-center text-gray-500 my-2">
                    <p>{tMisc('evolving')}</p>
                </div>
                <form>
                    <div className="flex my-2">
                        <input type="email" placeholder={tCta('enterEmail')} className="border bg-transparent text-white px-4 py-2 rounded-l-lg focus:outline-none" />
                        <button type="submit" className="bg-white text-black font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">{tCta('subscribe')}</button>
                    </div>
                </form>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 text-center">
                <div className="text-left">
                    <Link href="/" className="leading-tight text-sm font-medium block font-mono">Alef Lemat</Link>
                    <Link href="/" className="leading-tight text-sm font-medium block font-mono">Tech</Link>
                    <p className="mt-2 text-xs font-normal lowercase">{tMisc('cxSoftware')}</p>
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