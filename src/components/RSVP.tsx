import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { wedding } from '../data/weddingData';
import type { WeddingSide } from '../hooks/useWeddingVariant';

interface RSVPProps {
  side?: WeddingSide;
}

export default function RSVP({ side = 'b' }: RSVPProps) {
  const sideData = wedding.sides[side];

  return (
    <section
      className="relative bg-maroon py-20 sm:py-28 px-6 overflow-hidden"
      aria-label="RSVP"
    >
      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2260%22%20height%3D%2260%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="max-w-lg mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/60 font-sans mb-4">
            RSVP
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">
            {sideData.rsvp.family}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold/30" />
            <Heart className="w-4 h-4 text-gold/60" strokeWidth={1.2} />
            <span className="w-10 h-px bg-gold/30" />
          </div>
          <p className="font-sans italic text-white/60 text-lg">
            {sideData.rsvp.closingLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
