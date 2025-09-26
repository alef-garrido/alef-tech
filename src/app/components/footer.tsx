import Link from 'next/link';
import { Linkedin, Instagram, Rss } from 'lucide-react';

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
  return (
    <footer className="bg-background w-full font-sans mt-24">
        <div className="mx-auto max-w-none px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Training */}
                    <div className="flex gap-3">
                        <TrainingIcon />
                        <div>
                            <p className="text-sm font-bold lowercase block mb-2">Training</p>
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
                            <p className="text-sm font-bold lowercase block mb-2">Consultation</p>
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
                            <p className="text-sm font-bold lowercase block mb-2">Cx Implementation</p>
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
                            <p className="text-sm font-bold lowercase block mb-2">Contact</p>
                            <ul className="space-y-1 text-xs lowercase">
                                <li><Link href="#" className="hover:text-primary">newsletter</Link></li>
                                <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">instagram</a></li>
                                <li><Link href="#" className="hover:text-primary">blog</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex gap-4 mb-4 md:mb-0">
                    <a href="#" className="text-gray-400 hover:text-white"><Linkedin size={24} /></a>
                    <a href="#" className="text-gray-400 hover:text-white"><Instagram size={24} /></a>
                    <a href="#" className="text-gray-400 hover:text-white"><Rss size={24} /></a>
                </div>
                <div className="text-center text-gray-500 my-2">
                    <p>Ever evolving, always adapting, and delivering solutions with genuine care.</p>
                </div>
                <form>
                    <div className="flex my-2">
                        <input type="email" placeholder="Enter your email" className="border bg-transparent text-white px-4 py-2 rounded-l-lg focus:outline-none" />
                        <button type="submit" className="bg-white text-black font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">Subscribe</button>
                    </div>
                </form>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 text-center">
                <div className="text-left">
                    <Link href="/" className="leading-tight text-sm font-medium block font-mono">Alef Lemat</Link>
                    <Link href="/" className="leading-tight text-sm font-medium block font-mono">Tech</Link>
                    <p className="mt-2 text-xs font-normal lowercase">CX + Software Development</p>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;