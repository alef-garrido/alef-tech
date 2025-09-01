import Image from "next/image";
import Hero from "./components/hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="relative w-full h-screen">
        <Hero />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <h1 className="text-5xl font-bold text-white mb-2 font-mono">Welcome to Alef-Tech</h1>
          <p className="text-primary font-mono">A demonstration of the new cyberpunk theme.</p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="terminal-glow p-6 rounded-lg cyber-border">
          <h2 className="text-2xl font-bold text-secondary mb-4 font-mono">Terminal Glow Effect</h2>
          <p className="text-foreground">
            This container has the `terminal-glow` and `cyber-border` classes applied to it,
            giving it a distinct, glowing border effect reminiscent of old CRT monitors.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-card text-card-foreground">
          <h2 className="text-2xl font-bold text-secondary mb-4 font-mono">Card Component</h2>
          <p>
            This is a simple card element using the `bg-card` and `text-card-foreground`
            colors defined in the theme.
          </p>
        </div>

        <div className="md:col-span-2 p-6 rounded-lg cyber-border">
          <h2 className="text-2xl font-bold text-secondary mb-4 font-mono">Buttons and Interactions</h2>
          <p className="text-muted-foreground mb-4">
            Hover over these buttons to see the custom cursor's hover effect.
          </p>
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors font-mono">
              Primary Button
            </button>
            <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-mono">
              Secondary Button
            </button>
            <button className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors font-mono">
              Destructive Button
            </button>
          </div>
        </div>

        <div className="md:col-span-2 p-6 rounded-lg terminal-glow cyber-border">
          <h2 className="text-2xl font-bold text-secondary mb-4 font-mono">Animations</h2>
          <p className="text-muted-foreground">
            This is an example of the `animate-slide-up` animation.
          </p>
          <div className="animate-slide-up mt-4">
            <p className="text-foreground">This text slides up into view.</p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-muted-foreground">
        <p>Powered by Alef-Tech Agentic Capabilities</p>
      </footer>
    </main>
  );
}
