import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function CTASection() {
  return (
    <section className="bg-black py-40 md:py-60 px-6 relative overflow-hidden text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-3xl mx-auto"
      >
        <motion.span variants={fadeUp} custom={0} className="section-badge lowercase">
          Begin
        </motion.span>

        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-heading italic text-5xl md:text-8xl leading-[0.9] tracking-tight text-white mb-10"
        >
          Your next website <br /> starts here.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-white/70 text-[1.05rem] font-light max-w-md mx-auto mb-14 leading-relaxed"
        >
          Book a free strategy call and explore what AI-powered design can become.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="liquid-glass-strong rounded-full px-10 py-4 text-white text-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            Book a Call
            <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="liquid-glass rounded-full px-10 py-4 text-white/80 text-lg font-light flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer">
            View Pricing
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
