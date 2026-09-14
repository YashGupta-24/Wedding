import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarHeart } from 'lucide-react';
import { wedding } from '../data/weddingData';

export default function DateReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      className="relative bg-ivory-light py-20 sm:py-28 px-6"
      aria-label="Wedding date reveal"
    >
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <CalendarHeart className="w-8 h-8 text-gold mx-auto mb-4" strokeWidth={1.2} />
          <h2 className="font-display text-2xl sm:text-3xl text-brown mb-2">
            Save the Date
          </h2>
          <p className="text-brown/50 text-sm font-sans mb-8">
            Tap below to reveal the auspicious date
          </p>
        </motion.div>

        <motion.button
          onClick={() => setRevealed(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`relative inline-flex items-center justify-center px-10 py-4 border border-gold/50 text-gold font-sans text-sm tracking-[0.2em] uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ${
            revealed
              ? 'bg-maroon border-maroon text-white pointer-events-none'
              : 'hover:bg-gold/10'
          }`}
          aria-expanded={revealed}
          aria-controls="date-reveal-content"
        >
          {revealed ? 'The Date' : 'Reveal the Date'}
        </motion.button>

        <AnimatePresence>
          {revealed && (
            <motion.div
              id="date-reveal-content"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              <div className="border border-gold/30 p-8 sm:p-12 bg-white/50">
                <p className="text-xs tracking-[0.4em] uppercase text-gold/70 font-sans mb-4">
                  {wedding.date.day}
                </p>
                <p className="font-display text-5xl sm:text-6xl text-maroon">
                  {wedding.date.dayOfMonth}
                </p>
                <p className="font-display text-2xl sm:text-3xl text-brown mt-2">
                  {wedding.date.month}
                </p>
                <p className="text-lg text-brown/60 font-sans mt-1">{wedding.date.year}</p>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <span className="w-10 h-px bg-gold/30" />
                  <span className="text-gold text-xs">✦</span>
                  <span className="w-10 h-px bg-gold/30" />
                </div>
                <p className="text-sm text-brown/50 font-sans mt-4 italic">
                  At {wedding.venue.name}, Meerut
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
