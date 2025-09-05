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

const Services = () => {
  return (
    <div className="w-full my-48 px-6 md:px-12">
      <h2 className="text-5xl font-bold text-secondary mb-8 font-mono text-center">How I Can Help You</h2>
      <div className="grid md:grid-cols-3 gap-8 font-mono text-left">
        <div className="bg-black p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <TrainingIcon />
            <h3 className="text-2xl font-bold text-white ml-4">Training</h3>
          </div>
          <ul className="list-disc list-inside text-gray-400">
            <li>Empower People to Perform</li>
            <li>Onboarding design</li>
            <li>CX & digital adoption workshops</li>
            <li>Ongoing learning partnerships</li>
          </ul>
        </div>
        <div className="bg-black p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <ConsultationIcon />
            <h3 className="text-2xl font-bold text-white ml-4">Business Consulting</h3>
          </div>
          <ul className="list-disc list-inside text-gray-400">
            <li>Strategy that Drives Retention & Growth</li>
            <li>CX strategy & audits</li>
            <li>Agentic AI advisory</li>
            <li>Growth roadmaps</li>
          </ul>
        </div>
        <div className="bg-black p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <ImplementationIcon />
            <h3 className="text-2xl font-bold text-white ml-4">Implementation</h3>
          </div>
          <ul className="list-disc list-inside text-gray-400">
            <li>Your Agentic Business Engine</li>
            <li>CX workflow automation</li>
            <li>Bespoke AI-assisted tools</li>
            <li>360° business dashboard</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12">
        <button className="bg-white text-black font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">View All Services</button>
      </div>
    </div>
  );
};

export default Services;