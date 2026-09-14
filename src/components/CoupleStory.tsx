import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { wedding } from '../data/weddingData';

// Couple story cards with placeholder images generated via CSS gradients
const storyCards = [
  {
    id: 1,
    title: 'The Beginning',
    description: `When ${wedding.couple.bride.firstName} and ${wedding.couple.groom.firstName} first met, the world seemed to pause for a moment — two souls destined to find each other.`,
    gradient: 'from-rose-200 via-pink-100 to-amber-50',
    icon: '🌸',
  },
  {
    id: 2,
    title: 'Growing Together',
    description:
      'Through shared dreams, countless conversations, and a bond that deepened with every passing day, their love story blossomed beautifully.',
    gradient: 'from-amber-100 via-orange-50 to-rose-100',
    icon: '🌺',
  },
  {
    id: 3,
    title: 'The Proposal',
    description:
      'With a heart full of love and a promise of forever, the question was asked — and the answer was a resounding yes.',
    gradient: 'from-purple-100 via-pink-50 to-amber-100',
    icon: '💫',
  },
  {
    id: 4,
    title: 'Forever Begins',
    description: `Now, ${wedding.couple.bride.firstName} and ${wedding.couple.groom.firstName} are ready to begin their forever — surrounded by the love and blessings of family and friends.`,
    gradient: 'from-emerald-50 via-amber-50 to-rose-100',
    icon: '🌿',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function CoupleStory() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrent(
        (prev) => (prev + newDirection + storyCards.length) % storyCards.length
      );
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    },
    [paginate]
  );

  return (
    <section
      className="relative bg-ivory py-20 sm:py-28 px-6 overflow-hidden"
      aria-label="Our love story"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <Heart className="w-6 h-6 text-maroon mx-auto mb-3" strokeWidth={1.2} />
          <h2 className="font-display text-3xl sm:text-4xl text-brown">
            {wedding.couple.bride.firstName} & {wedding.couple.groom.firstName}
          </h2>
          <p className="text-brown/50 text-sm font-sans mt-2">Our Journey Together</p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Couple story carousel"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${current + 1} of ${storyCards.length}`}
              >
                <div className={`bg-gradient-to-br ${storyCards[current].gradient} p-1`}>
                  <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-14 text-center">
                    <p className="text-4xl mb-4" aria-hidden="true">
                      {storyCards[current].icon}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl text-maroon mb-4">
                      {storyCards[current].title}
                    </h3>
                    <p className="text-brown/70 font-sans text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                      {storyCards[current].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-10 h-10 flex items-center justify-center border border-gold/30 bg-white/80 text-brown hover:bg-gold/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-10 h-10 flex items-center justify-center border border-gold/30 bg-white/80 text-brown hover:bg-gold/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
            {storyCards.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                  i === current ? 'bg-maroon w-6' : 'bg-brown/20 hover:bg-brown/40'
                }`}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
