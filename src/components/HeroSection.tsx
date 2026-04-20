import { motion, useScroll, useTransform } from 'motion/react';
import { Play, ArrowUpRight } from 'lucide-react';
import SwayCanvas from './SwayCanvas';
import AtmosphereCanvas from './AtmosphereCanvas';
import ParticleCanvas from './ParticleCanvas';
import ParticleTitle from './ParticleTitle';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className="h-screen min-h-[600px] bg-black overflow-hidden relative">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* WebGL animated meadow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <SwayCanvas />
        </motion.div>

        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-bottom from-black via-black/20 to-transparent z-1" />

        {/* AMBIENT LIGHT ORB 1 — Sun, top-right */}
        <motion.div
          animate={{
            x: [0, 38, -18, 30, 0],
            y: [0, -22, 14, -10, 0],
            opacity: [0.75, 1, 0.8, 1, 0.75],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[8%] -right-[4%] w-[560px] h-[560px] rounded-full blur-[60px] pointer-events-none mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,90,0.42) 0%, rgba(255,150,30,0.14) 50%, transparent 100%)',
          }}
        />

        {/* AMBIENT LIGHT ORB 2 — Sky, cool blue */}
        <motion.div
          animate={{
            x: [0, 70, -40, 50, 0],
            y: [0, 18, -12, 8, 0],
            opacity: [0.55, 0.9, 0.6, 0.88, 0.55],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -top-[6%] left-[10%] w-[750px] h-[280px] rounded-full blur-[55px] pointer-events-none mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(120,200,255,0.22) 0%, transparent 70%)' }}
        />

        {/* AMBIENT LIGHT ORB 3 — Meadow, warm green-gold */}
        <motion.div
          animate={{
            x: [-20, 30, -10, 40, -20],
            y: [0, -28, 10, -18, 0],
            opacity: [0.5, 0.88, 0.55, 0.9, 0.5],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -bottom-[12%] left-[15%] w-[680px] h-[420px] rounded-full blur-[65px] pointer-events-none mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(155,215,100,0.22) 0%, rgba(200,235,80,0.06) 60%, transparent 100%)',
          }}
        />

        {/* Edge vignette */}
        <div 
          className="absolute inset-0 pointer-events-none z-1" 
          style={{ background: 'radial-gradient(ellipse 82% 82% at 50% 50%, transparent 32%, rgba(0,0,0,0.32) 66%, rgba(0,0,0,0.70) 100%)' }}
        />
        
        {/* Global legibility wash */}
        <div className="absolute inset-0 bg-black/32 pointer-events-none z-1" />

        {/* Dark radial halo behind title */}
        <div 
          className="absolute inset-x-0 top-[20%] h-[400px] pointer-events-none z-1" 
          style={{ background: 'radial-gradient(ellipse 55% 35% at 50% 40%, rgba(0,0,0,0.48) 0%, transparent 75%)' }}
        />
      </div>

      {/* Atmosphere + pollen layers */}
      <AtmosphereCanvas />
      <ParticleCanvas />

      {/* Hero content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-[170px]"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
        >
          <span className="bg-white text-black text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">New</span>
          <span className="text-white/75 text-[0.82rem] font-medium">Introducing AI-powered web design.</span>
        </motion.div>

        <ParticleTitle />

        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="max-w-xl text-white/65 font-light text-[1rem] leading-relaxed mb-10"
        >
          Stunning design. Blazing performance. Built by AI, refined by experts.<br />
          This is web design, wildly reimagined.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="liquid-glass-strong rounded-full px-8 py-3 text-white flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button className="rounded-full px-6 py-3 text-white/60 flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <Play className="w-4 h-4 fill-white/60" />
            Watch the Film
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-[360px] bg-gradient-to-bottom from-transparent via-black/45 to-black pointer-events-none z-5" />
    </section>
  );
}
