import Hero from './components/hero';
import ServicesShowcase from './components/services-showcase';
import Services from './components/services';
import CaseStudy from './components/case-study';
import AboutSection from './components/about-section';
import FinalCTA from './components/final-cta';
import Footer from './components/footer';

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      {/* HERO SECTION */}
      <div className="relative w-full h-screen overflow-hidden">
        <Hero />
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="w-full max-w-7xl my-32 px-4 sm:px-6 lg:px-8">
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
