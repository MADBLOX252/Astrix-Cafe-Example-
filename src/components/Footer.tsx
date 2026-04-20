import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-black px-6 pb-12 pt-20 border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <span className="font-heading italic text-white text-2xl tracking-tight">Aether</span>
          <p className="text-white/40 text-sm font-light text-center md:text-left">
            AI-powered web design for the extraordinary.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex items-center gap-8">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/40 text-xs hover:text-white/70 transition-colors duration-200 uppercase tracking-widest"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-light">
            © 2026 Aether Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
