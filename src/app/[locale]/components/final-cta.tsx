import { useTranslations } from 'next-intl';

const FinalCTA = () => {
  const tCta = useTranslations('cta');

  return (
    <div className="w-full my-48 px-6 md:px-12 py-16 bg-white">
      <div className="text-center font-mono">
        <h2 className="text-5xl font-bold text-black mb-4 font-mono">{tCta('buildEngine')}</h2>
        <p className="text-lg text-gray-900 mb-8">{tCta('complexityToClarity')}</p>
        <div className="flex justify-center gap-4">
          <button className="bg-black text-white font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">{tCta('bookCall')}</button>
          <button className="bg-black text-white font-mono py-3 px-6 rounded-md hover:bg-primary/80 transition-colors">{tCta('getInTouch')}</button>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;