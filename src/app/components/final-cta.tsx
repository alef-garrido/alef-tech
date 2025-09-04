const FinalCTA = () => {
  return (
    <div className="w-full my-24 px-6 md:px-12 py-16 bg-white">
      <div className="text-center font-mono">
        <h2 className="text-4xl font-bold text-black mb-4 font-mono">Let’s Build Your Bespoke Growth Engine.</h2>
        <p className="text-lg text-gray-900 mb-8">Whether you want to train your team, refine your CX strategy, or implement automation — I’ll help you move from complexity to clarity.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-black text-white font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">Book a Call</button>
          <button className="bg-black text-white font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">Get in Touch</button>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;