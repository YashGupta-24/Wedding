import { motion } from 'framer-motion';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import { wedding } from '../data/weddingData';
import type { WeddingVariant } from '../hooks/useWeddingVariant';

interface DateRevealProps {
  variant?: WeddingVariant;
}

export default function DateReveal({ variant = 'w' }: DateRevealProps) {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // 30 days of November 2026 starting on Sunday (Nov 1 is Sunday)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const showEngagement = variant === 'ew' || variant === 'ehw';

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
                const isEngagementDay = showEngagement && day === 15;

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
                    ) : isEngagementDay ? (
                      <div
                        className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-maroon/50 ring-offset-2 ring-offset-white cursor-default select-none"
                        title="Engagement Day — 15 November 2026"
                      >
                        <span>15</span>
                        <Sparkles
                          className="absolute -top-1 -right-1 w-3.5 h-3.5 text-maroon fill-maroon"
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

            {/* Event Highlights depending on variant */}
            {variant === 'ew' ? (
              <div className="space-y-4 text-center">
                <div>
                  <span className="font-serif-caps text-[11px] tracking-[0.22em] uppercase text-gold font-semibold block mb-0.5">
                    Engagement
                  </span>
                  <p className="font-display text-base sm:text-lg text-maroon font-medium">
                    {wedding.engagementDate.day}, {wedding.engagementDate.display}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-brown/60 text-xs font-sans mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>{wedding.engagementVenue.name}, Meerut</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="w-8 h-px bg-gold/20" />
                  <span className="text-gold/60 text-[10px]">✦</span>
                  <span className="w-8 h-px bg-gold/20" />
                </div>

                <div>
                  <span className="font-serif-caps text-[11px] tracking-[0.22em] uppercase text-gold font-semibold block mb-0.5">
                    Wedding
                  </span>
                  <p className="font-display text-base sm:text-lg text-maroon font-medium">
                    {wedding.date.day}, {wedding.date.display}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-brown/60 text-xs font-sans mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>{wedding.venue.name}, Meerut</span>
                  </div>
                </div>
              </div>
            ) : variant === 'ehw' ? (
              <div className="space-y-3.5 text-center">
                <div>
                  <span className="font-serif-caps text-[11px] tracking-[0.22em] uppercase text-gold font-semibold block mb-0.5">
                    Engagement
                  </span>
                  <p className="font-display text-base sm:text-lg text-maroon font-medium">
                    {wedding.engagementDate.day}, {wedding.engagementDate.display}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="w-8 h-px bg-gold/20" />
                  <span className="text-gold/60 text-[10px]">✦</span>
                  <span className="w-8 h-px bg-gold/20" />
                </div>

                <div>
                  <span className="font-serif-caps text-[11px] tracking-[0.22em] uppercase text-gold font-semibold block mb-0.5">
                    Wedding
                  </span>
                  <p className="font-display text-base sm:text-lg text-maroon font-medium">
                    {wedding.date.day}, {wedding.date.display}
                  </p>
                </div>
              </div>
            ) : (
              /* Variant 'w' (Wedding only) */
              <div>
                <p className="font-display text-lg sm:text-xl text-maroon font-medium mb-1">
                  {wedding.date.day}, {wedding.date.display}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-brown/60 text-xs sm:text-sm font-sans mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>{wedding.venue.name}, Meerut</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
