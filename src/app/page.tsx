import Image from "next/image";
import Hero from "./components/hero";
import FeaturedProjects from "./components/featured-projects";
import Services from "./components/services";
import CaseStudy from "./components/case-study";
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

      {/* ABOUT SECTION */}
      <div className="w-full md:w-2/3 lg:w-1/2 my-24 px-6 md:px-12">
        <h2 className="text-4xl font-bold text-secondary mb-8 font-mono text-center">About Me</h2>
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
              Certified Business Consultant with 9+ years of CX and digital transformation experience. I combine customer service expertise with agentic software development to deliver measurable impact.
            </p>
            <button className="my-4 bg-transparent underline hover:primary/80 font-mono cursor-pointer"> More about me →</button>
          </div>
        </div>
      </div>

      <FinalCTA />

      <Footer />
    </main>
  );
}
