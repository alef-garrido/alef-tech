import { Linkedin, Instagram, Rss } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-12 py-8 bg-black">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold text-white mb-2">Navigation</h3>
          <ul className="text-gray-400">
            <li className="mb-2"><a href="#" className="hover:text-white">About</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Services</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Insights</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold text-white mb-2">Newsletter</h3>
          <form>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none" />
              <button type="submit" className="bg-green-500 text-black font-bold px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors">Subscribe</button>
            </div>
          </form>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Social</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white"><Linkedin size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Rss size={24} /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500">
        <p>Adaptability, continuous learning, and a bit of love in everything I do.</p>
      </div>
    </footer>
  );
};

export default Footer;