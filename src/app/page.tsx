import Hero from './components/hero';
import ServicesShowcase from './components/services-showcase';
import Services from './components/services';
import CaseStudy from './components/case-study';
import AboutSection from './components/about-section';
import FinalCTA from './components/final-cta';
import Footer from './components/footer';

export default async function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      {/* HERO SECTION */}
      <div className="relative w-full min-h-screen">
        <Hero />
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="w-full mt-48 sm:mt-72 mb-48 px-4 sm:px-6 lg:px-8">
        <AboutSection />
      </section>

      <Services />

      <CaseStudy />

      <ServicesShowcase />

      <FinalCTA />

      <Footer />
    </main>
  );
}
