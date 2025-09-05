const CaseStudy = () => {
  return (
    <div className="w-full my-48 px-6 md:px-12">
      <h2 className="text-5xl font-bold text-secondary mb-8 font-mono text-center">Results That Speak</h2>
      <div className="bg-black p-8 rounded-lg font-mono text-center">
        <p className="text-2xl text-gray-400 italic">"Working with them was a game-changer. Their expertise in CX and AI helped us reduce response times by 40% and increase customer satisfaction by 25%."</p>
        <p className="text-xl font-bold text-white mt-4">- John Doe, CEO of ExampleCorp</p>
        <div className="mt-8">
            <button className="bg-white text-black font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">See More Results</button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;