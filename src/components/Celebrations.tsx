import { motion } from 'framer-motion';
import { wedding } from '../data/weddingData';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: 'easeOut' as const },
  }),
};

export default function Celebrations() {
  return (
    <section
      className="relative bg-maroon py-20 sm:py-28 px-6 overflow-hidden"
      aria-label="Wedding celebrations and events"
    >
      {/* Subtle decorative texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%221%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/70 font-sans mb-3">
            Join Us For
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white">
            The Celebrations
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-sm">✦</span>
            <span className="w-12 h-px bg-gold/30" />
          </div>
        </motion.div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {wedding.events.map((event, i) => (
            <motion.article
              key={event.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className="group relative border border-gold/20 bg-maroon-dark/40 p-8 sm:p-10 text-center backdrop-blur-sm"
            >
              {/* Corner accents */}
              <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/30" />
              <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/30" />
              <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/30" />
              <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/30" />

              <p className="text-3xl mb-4" aria-hidden="true">
                {event.emoji}
              </p>
              <h3 className="font-display text-xl sm:text-2xl text-gold mb-3">
                {event.name}
              </h3>
              <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-sans mb-4">
                {event.time}
              </p>
              <p className="text-white/70 text-sm font-sans leading-relaxed">
                {event.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
