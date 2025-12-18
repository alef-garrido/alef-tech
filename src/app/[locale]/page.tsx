import Image from "next/image";
import Hero from "./components/hero";
import FeaturedProjects from "./components/featured-projects";
import Services from "./components/services";
import CaseStudy from "./components/case-study";
import FinalCTA from "./components/final-cta";
import Footer from "./components/footer";
import { useTranslations } from 'next-intl';

export default function Home() {
  const tAbout = useTranslations('about');
  const tMisc = useTranslations('misc');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* HERO SECTION */}
      <div className="relative w-full h-screen overflow-hidden">
        <Hero />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-left z-10">
          <h1 className="text-6xl font-bold text-white mb-4 font-mono">Alef Lemat-Tech</h1>
          <p className="text-primary/80 font-mono text-2xl font-extralight">Consulting | Training | Implementation</p>
        </div>
      </div>

      <Services />

      <CaseStudy />

      {/* ABOUT SECTION */}
      <div className="w-full md:w-2/3 lg:w-1/2 my-48 px-6 md:px-12">
        <h2 className="text-5xl font-bold text-secondary mb-8 font-mono text-center">{tAbout('heading')}</h2>
        <div className="flex flex-col md:flex-row justify-center items-center mb-4 gap-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <Image
              src="/assets/ppicture.png"
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <p>
              {tAbout('description')}
            </p>
            <button className="my-4 bg-transparent underline hover:primary/80 font-mono cursor-pointer"> {tMisc('moreAboutMe')} →</button>
          </div>
        </div>
      </div>

      <FeaturedProjects />
      
      <FinalCTA />

      <Footer />
    </main>
  );
}
