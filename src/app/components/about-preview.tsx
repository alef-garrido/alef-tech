import Image from 'next/image';

const AboutPreview = () => {
  return (
    <div className="w-full my-24 px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="w-full h-full flex justify-center items-center">
          <Image src="/assets/ppicture.png" alt="About Me" width={300} height={300} className="rounded-full" />
        </div>
        <div className="font-mono text-left">
          <h2 className="text-4xl font-bold text-secondary mb-4">About Me</h2>
          <p className="text-lg text-gray-400 mb-6">Certified Business Consultant with 9+ years of CX and digital transformation experience. I combine customer service expertise with agentic software development to deliver measurable impact.</p>
          <button className="bg-green-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default AboutPreview;