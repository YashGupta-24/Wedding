import { motion } from 'framer-motion';
import { wedding } from '../data/weddingData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

export default function Invitation() {
  const { families, couple } = wedding;

  return (
    <section
      className="relative bg-ivory py-20 sm:py-28 px-6 overflow-hidden"
      aria-label="Wedding invitation"
    >
      {/* Subtle corner ornaments */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-gold/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-gold/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-gold/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-gold/30" />

      <div className="max-w-xl mx-auto text-center">
        {/* Bhagavad Gita Shloka - The Auspicious Beginning of a Sacred New Chapter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="mb-8"
        >
          <div className="inline-block border border-gold/30 bg-white/50 px-6 py-5 max-w-md shadow-xs">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-sans font-medium">
              ॥ श्रीमद्भगवद्गीता ॥
            </p>
            <p className="font-display text-base sm:text-lg text-maroon leading-relaxed tracking-wide font-normal">
              यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः ।<br />
              तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥
            </p>
            <p className="text-gold/80 text-[11px] tracking-[0.2em] font-sans uppercase mt-2">
              (अध्याय १८, श्लोक ७८)
            </p>
          </div>
          <p className="text-brown/60 text-xs sm:text-sm font-sans italic mt-3 max-w-md mx-auto leading-relaxed">
            "Wherever there is the Divine grace and resolute action, there abides eternal prosperity, victory, happiness, and righteousness."
          </p>
        </motion.div>

        {/* Blessing */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          className="text-brown/70 font-sans text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-10"
        >
          With the blessings of Shri Bhagwan and our beloved families, we joyfully invite you
          to celebrate the union of our children.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1.5}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-lg">✦</span>
          <span className="w-16 h-px bg-gold/40" />
        </motion.div>

        {/* Family names */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
          className="mb-8"
        >
          <p className="text-xs sm:text-[13px] tracking-[0.25em] uppercase text-brown/50 font-sans mb-2">
            Bride's Family
          </p>
          <p className="font-display text-lg sm:text-xl text-brown">
            {families.bride.mother.name}
          </p>
          <p className="text-brown/40 text-xs my-1">&</p>
          <p className="font-display text-lg sm:text-xl text-brown">
            {families.bride.father.name}
          </p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={3}
          className="text-xs tracking-[0.35em] uppercase text-gold font-sans mb-8"
        >
          Cordially Invite You to the Wedding of
        </motion.p>

        {/* Couple names — large & elegant */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={4}
          className="mb-10"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-maroon leading-tight">
            {couple.bride.firstName}
          </h2>
          <p className="font-sans italic text-gold text-lg sm:text-xl my-2">&</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-maroon leading-tight">
            {couple.groom.firstName}
          </h2>
        </motion.div>

        {/* Groom's family */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={5}
        >
          <p className="text-xs sm:text-[13px] tracking-[0.25em] uppercase text-brown/50 font-sans mb-2">
            Groom's Family
          </p>
          <p className="font-display text-lg sm:text-xl text-brown">
            {families.groom.mother.name}
          </p>
          <p className="text-brown/40 text-xs my-1">&</p>
          <p className="font-display text-lg sm:text-xl text-brown">
            {families.groom.father.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
