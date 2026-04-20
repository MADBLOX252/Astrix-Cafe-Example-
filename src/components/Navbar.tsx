import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-50">
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`liquid-glass rounded-full px-5 h-14 flex items-center justify-between transition-shadow duration-500 ${
          scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-black/20' : 'shadow-none'
        }`}
      >
        <div className="flex-1">
          <a href="#" className="font-heading italic text-white text-xl tracking-tight">
            Aether
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Work', 'Process', 'Pricing'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-white/75 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex-1 flex justify-end">
          <button className="bg-white text-black rounded-full px-5 py-1.5 text-sm font-medium flex items-center gap-1 hover:bg-white/90 transition-colors cursor-pointer">
            Get Started
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
