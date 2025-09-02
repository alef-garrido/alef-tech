'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

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

const HamburgerIcon = () => (
    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase().replace(/ /g, '-');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };
    return (
        <header className="bg-background w-full font-sans">
            <div className="mx-auto max-w-none px-4 sm:px-6 lg:px-8 py-5">
                <nav className="flex justify-between items-start text-foreground">
                    {/* Left Section */}
                    <div className="text-left">
                        <Link href="/" className="leading-tight text-sm font-medium block font-mono">Alef Lemat</Link>
                        <Link href="/" className="leading-tight text-sm font-medium block font-mono">Tech</Link>
                        <p className="mt-2 text-xs font-normal lowercase">CX + Software Development</p>
                    </div>

                    {/* Center Section - Visible on large screens */}
                    <div className="hidden lg:flex justify-center items-start gap-10 xl:gap-14">
                        {/* Training */}
                        <div className="flex gap-3">
                            <TrainingIcon />
                            <div>
                                <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">Training</Link>
                                <ul className="space-y-1 text-xs lowercase">
                                    <li><Link href="#" className="hover:text-primary">Design my Onboarding</Link></li>
                                    <li><Link href="#" className="hover:text-primary">Train my team</Link></li>
                                    <li><Link href="#" className="hover:text-primary">Learning Partner</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* Consultation */}
                        <div className="flex gap-3">
                            <ConsultationIcon />
                            <div>
                                <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">Consultation</Link>
                                <ul className="space-y-1 text-xs lowercase">
                                    <li><Link href="#" className="hover:text-primary">1:1 Consultation</Link></li>
                                    <li><Link href="#" className="hover:text-primary">Free Call</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* Now */}
                        <div className="flex gap-3">
                            <ImplementationIcon />
                            <div>
                                <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">Cx Implementation</Link>
                                <ul className="space-y-1 text-xs lowercase">
                                    <li><Link href="#" className="hover:text-primary">Cx Assistance</Link></li>
                                    <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">AI Assistance</a></li>
                                    <li><Link href="#" className="hover:text-primary">Bespoke Software</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* Support */}
                        <div className="flex gap-3">
                            <SupportIcon />
                            <div>
                                <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">Contact</Link>
                                <ul className="space-y-1 text-xs lowercase">
                                    <li><Link href="#" className="hover:text-primary">newsletter</Link></li>
                                    <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">instagram</a></li>
                                    <li><Link href="#" className="hover:text-primary">blog</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* Japanese Text */}
                        <div className="text-xs max-w-[160px] leading-snug pt-0.5">
                            <p>Adaptability, continuous learning and a bit of love to evething I do. That&apos;s my way.</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-start gap-4">
                       
                        <div className="text-right">
                            <div className="text-primary font-bold relative" style={{ fontSize: '2rem', lineHeight: 0.8 }}>
                                <span className="absolute text-foreground font-normal rotate-[-15deg] animate-pulse-slow" style={{ fontSize: '2.5rem', top: '-0.25em', left: '-0.25em' }}>*</span>
                                {formatDate(currentDateTime)}
                            </div>
                            <p className="text-[10px] mt-1 tracking-normal lowercase">{formatTime(currentDateTime)}</p>
                        </div>
                    </div>

                    {/* Hamburger Menu Button - Visible on small screens */}
                    <div className="lg:hidden">
                        <button onClick={toggleMenu}>
                            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pt-4 border-t border-foreground/20">
                        <div className="grid grid-cols-2 grid-rows-2 gap-8 items-start justify-start">
                            {/* Training */}
                            <div className="flex gap-3">
                                <TrainingIcon />
                                <div>
                                    <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">Training</Link>
                                    <ul className="space-y-1 text-xs lowercase">
                                        <li><Link href="#" className="hover:text-primary">Design my Onboarding</Link></li>
                                        <li><Link href="#" className="hover:text-primary">Train my team</Link></li>
                                        <li><Link href="#" className="hover:text-primary">Learning Partner</Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Consultation */}
                            <div className="flex gap-3">
                                <ConsultationIcon />
                                <div>
                                    <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">Consultation</Link>
                                    <ul className="space-y-1 text-xs lowercase">
                                        <li><Link href="#" className="hover:text-primary">1:1 Consultation</Link></li>
                                        <li><Link href="#" className="hover:text-primary">Free Call</Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Now */}
                            <div className="flex gap-3">
                                <ImplementationIcon />
                                <div>
                                    <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">Cx Implementation</Link>
                                    <ul className="space-y-1 text-xs lowercase">
                                        <li><Link href="#" className="hover:text-primary">Cx Assistance</Link></li>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">AI Assistance</a></li>
                                        <li><Link href="#" className="hover:text-primary">Bespoke Software</Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Support */}
                            <div className="flex gap-3">
                                <SupportIcon />
                                <div>
                                    <Link href="#" className="text-sm font-normal lowercase block mb-2 hover:text-primary">Contact</Link>
                                    <ul className="space-y-1 text-xs lowercase">
                                        <li><Link href="#" className="hover:text-primary">newsletter</Link></li>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">instagram</a></li>
                                        <li><Link href="#" className="hover:text-primary">blog</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}