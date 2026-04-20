import { motion } from 'motion/react';
import { Eye, Sparkles, Zap, Package } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const FEATURES = [
  {
    icon: Eye,
    number: '01',
    title: 'Cinematic Visual Systems',
    description: 'Immersive layouts, motion, and atmosphere that feel authored, not assembled. Every pixel placed with intent.',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'AI-Led Creative Direction',
    description: 'We turn prompts, references, and brand signals into cohesive visual experiences that feel unmistakably yours.',
  },
  {
    icon: Zap,
    number: '03',
    title: 'Fast Iteration',
    description: 'Explore ambitious directions quickly without losing polish. Rapid cycles, high fidelity, always.',
  },
  {
    icon: Package,
    number: '04',
    title: 'Production-Ready Output',
    description: 'Refined front-end builds designed for responsiveness, clarity, and launch. No handoff headaches.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-black py-32 md:py-48 px-6 relative overflow-hidden">
      {/* Background image */}
      <img
        src="/features-bg.jpg"
        alt="Features Background"
        referrerPolicy="no-referrer"
        className="absolute inset-x-0 top-0 w-full h-full object-cover z-0 pointer-events-none opacity-60"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/textures/1920/1080';
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-bottom from-black via-transparent to-black" />
      <div className="absolute inset-0 z-2 bg-black/30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: '-80px' }}
           className="text-center mb-20"
        >
          <motion.span variants={fadeUp} custom={0} className="section-badge">
            Capabilities
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-heading italic text-5xl md:text-7xl leading-[0.92] tracking-tight text-white mb-6"
          >
            Built with beauty <br /> and performance in balance.
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={i + 2}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl p-8 overflow-hidden backdrop-blur-[40px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-gradient-to-br from-white/10 to-white/5 transition-all duration-300"
            >
              {/* Shimmer line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-right from-transparent via-white/20 to-transparent" />
              
              {/* Top-right number */}
              <div className="absolute top-6 right-8 text-white/20 text-xs tracking-widest font-light">
                {feature.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-white/15 to-white/5 border border-white/15 text-white/80 group-hover:text-white transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-medium text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              
              <p className="text-white/45 text-sm font-light leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover highlight */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700 bg-radial-gradient from-white to-transparent at-top-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
