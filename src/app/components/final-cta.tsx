const FinalCTA = () => {
  return (
    <div className="w-full my-24 px-6 md:px-12 py-16 bg-gray-900">
      <div className="text-center font-mono">
        <h2 className="text-4xl font-bold text-white mb-4">Let’s Build Your Next Growth Engine.</h2>
        <p className="text-lg text-gray-400 mb-8">Whether you want to train your team, refine your CX strategy, or implement automation — I’ll help you move from complexity to clarity.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">Book a Call</button>
          <button className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors">Get in Touch</button>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;