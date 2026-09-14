import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { wedding } from '../data/weddingData';

export default function InstagramSection() {
  return (
    <section
      className="relative bg-ivory-light py-20 sm:py-28 px-6 overflow-hidden"
      aria-label="Instagram hashtag"
    >
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <Camera className="w-8 h-8 text-maroon mx-auto mb-4" strokeWidth={1.2} />
          <h2 className="font-display text-2xl sm:text-3xl text-brown mb-3">
            Share the Love
          </h2>
          <p className="text-brown/50 text-sm font-sans leading-relaxed mb-8">
            Capture every beautiful moment and share it with our wedding hashtag
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block border border-gold/30 bg-white/60 px-10 sm:px-16 py-6 sm:py-8"
        >
          <p className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon">
            {wedding.couple.hashtag}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-brown/40 text-xs font-sans tracking-wider mt-6"
        >
          Tag your photos & stories
        </motion.p>
      </div>
    </section>
  );
}
