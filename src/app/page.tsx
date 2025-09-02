import Image from "next/image";
import Hero from "./components/hero";

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
              Web developer and Cx strategist with 9+ years in Customer Success. <br /> I’m building XNORIA a unique Business Engine where strategy, technology, and creativity meet to create powerfull contex-engenieered systems for Agentic Websites.
            </p>
          </div>
        </div>
      </div>



      {/* FOOTER */}
      <footer className="mt-12 text-center text-muted-foreground">
        <p>Powered by Alef-Tech - All rights reserved.</p>
      </footer>
    </main>
  );
}
