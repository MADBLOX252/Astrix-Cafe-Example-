import { motion } from 'motion/react';
import ParticleCanvas from './ParticleCanvas';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function IntroSection() {
  return (
    <section className="bg-black py-40 md:py-56 px-6 relative overflow-hidden text-center">
      {/* Background image */}
      <img
        src="/intro-bg.jpg"
        alt="Intro Background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-50"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/abstract-soft/1920/1080';
        }}
      />

      {/* Top/bottom gradient fade */}
      <div className="absolute inset-0 z-1 bg-gradient-to-bottom from-black via-transparent to-black" />
      <div className="absolute inset-0 z-2 bg-black/28 pointer-events-none" />

      {/* Ambient dust */}
      <ParticleCanvas />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <motion.span variants={fadeUp} custom={0} className="section-badge">
          Trusted by modern brands
        </motion.span>

        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-heading italic text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8"
        >
          Design that feels like <br /> a world, not a template.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-white/72 text-[1.05rem] font-light max-w-xl mx-auto mb-16 leading-relaxed"
        >
          We build web experiences that transcend the ordinary — <br className="hidden md:block" /> immersive, cinematic, and unmistakably yours.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 opacity-40 grayscale"
        >
          {['Luminary', 'Celestia', 'Vaulted', 'Prism', 'Aura', 'Nocturne'].map((name) => (
            <span
              key={name}
              className="font-body text-xs md:text-sm tracking-[0.14em] uppercase font-light text-white"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
