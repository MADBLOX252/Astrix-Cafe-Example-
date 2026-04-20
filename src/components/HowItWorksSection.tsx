import { motion } from 'motion/react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HowItWorksSection() {
  return (
    <section className="bg-black py-40 md:py-60 px-6 relative overflow-hidden text-center">
      {/* Background image — Ken Burns animation */}
      <motion.img
        src="/section3-bg.jpg"
        alt="How it Works Background"
        referrerPolicy="no-referrer"
        animate={{
          scale: [1.06, 1.12, 1.06],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '-1.5%', '0%'],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full object-cover z-0 origin-center"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/misty/1920/1080';
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-bottom from-black via-black/40 to-black" />
      <div className="absolute inset-0 z-1 bg-gradient-to-right from-black via-transparent to-black opacity-40" />
      <div className="absolute inset-0 z-2 bg-black/38 pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.span variants={fadeUp} custom={0} className="section-badge">
          How It Works
        </motion.span>

        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-heading italic text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8"
        >
          You imagine it. <br /> We shape it.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-white/70 text-[1.05rem] font-light max-w-xl mx-auto mb-16 leading-relaxed"
        >
          From concept to launch, our AI-guided process turns direction into a site <br className="hidden md:block" /> that feels polished, cinematic, and alive.
        </motion.p>
      </motion.div>
    </section>
  );
}
