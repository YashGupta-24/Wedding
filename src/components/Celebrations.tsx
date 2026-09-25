import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { wedding } from '../data/weddingData';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

export default function Celebrations() {
  return (
    <section
      className="relative bg-maroon py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      aria-label="Wedding celebrations and events"
    >
      {/* Subtle decorative texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%221%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
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

        {/* 4 Event cards in exact order: Haldi (20 Nov), Mehendi (20 Nov), Sangeet Night (20 Nov), Festive Traditions (21 Nov) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {wedding.homeEvents.map((event, i) => (
            <motion.article
              key={event.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className="group relative border border-gold/20 bg-maroon-dark/40 p-6 sm:p-7 text-center backdrop-blur-sm flex flex-col justify-between"
            >
              {/* Corner accents */}
              <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold/30" />
              <span className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-gold/30" />
              <span className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-gold/30" />
              <span className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-gold/30" />

              <div>
                <p className="text-3xl mb-3" aria-hidden="true">
                  {event.emoji}
                </p>
                <h3 className="font-display text-xl sm:text-2xl text-gold mb-2">
                  {event.name}
                </h3>
                <p className="text-gold/90 font-serif-caps text-xs tracking-wider font-semibold mb-1">
                  {event.time}
                </p>
                <p className="text-white/50 text-[11px] tracking-[0.2em] uppercase font-sans mb-3">
                  {event.subTime}
                </p>
                <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Venue at our home notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-block relative border border-gold/30 bg-maroon-dark/60 backdrop-blur-sm px-6 sm:px-10 py-5 sm:py-6 max-w-xl mx-auto shadow-md">
            {/* Corner accents */}
            <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold/40" />
            <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold/40" />
            <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold/40" />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold/40" />

            <div className="flex items-center justify-center gap-2 mb-2">
              <Home className="w-4 h-4 text-gold" />
              <span className="font-serif-caps text-xs sm:text-sm tracking-[0.25em] uppercase text-gold font-medium">
                Venue at Our Home
              </span>
            </div>
            <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
              {wedding.venue.homeAddress}
            </p>
            <a
              href={wedding.venue.homeMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs tracking-[0.2em] uppercase text-gold border-b border-gold/40 pb-0.5 hover:text-white hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              View on Map →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
