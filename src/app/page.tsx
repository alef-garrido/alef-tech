import Image from "next/image";
import Hero from "./components/hero";
import FeaturedProjects from "./components/featured-projects";
import Services from "./components/services";
import CaseStudy from "./components/case-study";
import AboutPreview from "./components/about-preview";
import FinalCTA from "./components/final-cta";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* HERO SECTION */}
      <div className="relative w-full h-screen">
        <Hero />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <h1 className="text-5xl font-bold text-white mb-4 font-mono">Alef Lemat-Tech</h1>
          <p className="text-primary font-mono">Consulting | Training | Implementation</p>
        </div>
      </div>

      <FeaturedProjects />

      <Services />

      <CaseStudy />

      <AboutPreview />

      <FinalCTA />

      <Footer />
    </main>
  );
}
