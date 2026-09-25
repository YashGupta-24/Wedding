import { motion } from 'framer-motion';
import { Heart, MapPin } from 'lucide-react';
import { wedding } from '../data/weddingData';

export default function DateReveal() {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // 30 days of November 2026 starting on Sunday (Nov 1 is Sunday)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section
      className="relative bg-ivory-light py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      aria-label="Save the date"
    >
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Section Subtitle */}
          <p className="font-serif-caps text-xs sm:text-sm tracking-[0.35em] uppercase text-gold font-medium mb-2">
            Mark Your Calendar
          </p>

          {/* Main Section Title */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon mb-8 font-normal">
            Save the Date
          </h2>

          {/* Elegant Calendar Card */}
          <div className="relative border border-gold/30 bg-white/70 backdrop-blur-xs p-6 sm:p-8 shadow-sm">
            {/* Corner Ornaments */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-gold/40" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-gold/40" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-gold/40" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-gold/40" />

            {/* Month & Year Header */}
            <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-6">
              <span className="font-display text-xl sm:text-2xl text-maroon font-medium tracking-wide">
                November
              </span>
              <span className="font-serif-caps text-sm tracking-[0.2em] text-gold font-semibold">
                2026
              </span>
            </div>

            {/* Weekday Column Headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-center">
              {daysOfWeek.map((day, idx) => (
                <span
                  key={idx}
                  className="font-serif-caps text-xs font-semibold text-brown/60 tracking-wider"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* 30 Days Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-sm font-sans">
              {days.map((day) => {
                const isWeddingDay = day === 21;
                return (
                  <div
                    key={day}
                    className="relative flex items-center justify-center aspect-square"
                  >
                    {isWeddingDay ? (
                      <div
                        className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-maroon text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-gold ring-offset-2 ring-offset-white cursor-default select-none"
                        title="Wedding Day — 21 November 2026"
                      >
                        <span>21</span>
                        <Heart
                          className="absolute -top-1 -right-1 w-3.5 h-3.5 fill-gold text-gold"
                          strokeWidth={0}
                        />
                      </div>
                    ) : (
                      <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-brown/70 hover:text-maroon transition-colors select-none">
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Subtle Divider with Gold Diamond */}
            <div className="flex items-center justify-center gap-3 my-6">
              <span className="w-12 h-px bg-gold/30" />
              <span className="text-gold text-xs">✦</span>
              <span className="w-12 h-px bg-gold/30" />
            </div>

            {/* Highlighted Event Line */}
            <p className="font-display text-lg sm:text-xl text-maroon font-medium mb-1">
              {wedding.date.day}, {wedding.date.display}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-brown/60 text-xs sm:text-sm font-sans mt-1">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>{wedding.venue.name}, Meerut</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
