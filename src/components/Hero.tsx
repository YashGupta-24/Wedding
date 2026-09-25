import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { wedding } from '../data/weddingData';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Track scroll progress strictly across the sticky pinned scroll distance (0.0 to 1.0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ─── 1. Initial Intro Text ("A Celebration of Love" & "#Saarthi") ───
  // Fades out and glides upward in sync with the temple enlargement (0.00 -> 0.20)
  const introOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0], { clamp: true });
  const introY = useTransform(scrollYProgress, [0, 0.20], [0, -45], { clamp: true });
  const introDisplay = useTransform(scrollYProgress, (p) => (p > 0.21 ? 'none' : 'flex'));

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0], { clamp: true });
  const scrollCueDisplay = useTransform(scrollYProgress, (p) => (p > 0.09 ? 'none' : 'flex'));

  // ─── 2. Temple Expansion ───
  // Zooms towards the viewer during the initial scroll (0.00 -> 0.20 -> 0.75)
  const templeScale = useTransform(scrollYProgress, [0, 0.20, 0.75], [1, 1.30, 1.85], {
    clamp: true,
  });

  // ─── 3. Temple Split (Doors sliding outward) ───
  // Starts parting at 0.20 right as enlargement completes, reaches ~10% edge margins at 0.56, fully clears screen by 0.76
  const leftDoorX = useTransform(
    scrollYProgress,
    [0, 0.20, 0.56, 0.76, 1],
    ['0%', '0%', '-56%', '-115%', '-115%'],
    { clamp: true }
  );
  const rightDoorX = useTransform(
    scrollYProgress,
    [0, 0.20, 0.56, 0.76, 1],
    ['0%', '0%', '56%', '115%', '115%'],
    { clamp: true }
  );

  // ─── 4. Background Sky Transition ───
  // Fades away in sync with the split (0.20 -> 0.54) to reveal the clean light ivory background
  const skyOpacity = useTransform(scrollYProgress, [0, 0.20, 0.54, 1], [1, 1, 0, 0], {
    clamp: true,
  });

  // ─── 5. Revealed Couple Text ("Sanchi weds Sarthak · Date") ───
  // Starts revealing with split (0.20), fully revealed by 0.56 (~10% edges), and STAYS PERMANENTLY VISIBLE
  const revealDisplay = useTransform(scrollYProgress, (p) => (p < 0.18 ? 'none' : 'flex'));
  const revealOpacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.56, 1],
    [0, 0, 1, 1],
    { clamp: true }
  );
  const revealScale = useTransform(
    scrollYProgress,
    [0, 0.20, 0.56, 1],
    [0.88, 0.88, 1, 1],
    { clamp: true }
  );
  const revealY = useTransform(
    scrollYProgress,
    [0, 0.20, 0.56, 1],
    [30, 30, 0, 0],
    { clamp: true }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[160vh] sm:h-[175vh]"
      aria-label="Wedding invitation hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ivory-light">
        {/* ─── Layer 1: Summer Sky Background (Fades to Ivory during split) ─── */}
        <motion.div
          style={prefersReduced ? {} : { opacity: skyOpacity }}
          className="absolute inset-0 overflow-hidden select-none pointer-events-none"
        >
          <img
            src="/sunny-sky.jpg"
            alt="Sunny summer sky"
            className="w-full h-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-70% to-[#FFF9EF]/80" />
        </motion.div>

        {/* ─── Layer 2: Revealed Content Behind Temple Split (Clean, crisp on ivory backdrop, dead center) ─── */}
        <motion.div
          style={
            prefersReduced
              ? {}
              : { display: revealDisplay, opacity: revealOpacity, scale: revealScale, y: revealY }
          }
          className="absolute inset-0 z-5 flex flex-col items-center justify-center px-4 text-center pointer-events-none select-none"
        >
          {/* Couple Names */}
          <h2
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-maroon-dark leading-[1.08] font-normal tracking-tight"
            style={{
              textShadow:
                '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.95), 0 4px 24px rgba(66, 19, 30, 0.12)',
            }}
          >
            {wedding.couple.bride.firstName}
            <span
              className="block font-script text-3xl sm:text-5xl md:text-6xl text-gold my-0.5 sm:my-1.5 font-normal tracking-normal lowercase"
              style={{
                textShadow:
                  '0 0 16px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.9), 0 1px 6px rgba(255, 255, 255, 0.95)',
              }}
            >
              weds
            </span>
            {wedding.couple.groom.firstName}
          </h2>

          {/* Auspicious Date */}
          <div className="mt-3 sm:mt-5 flex items-center justify-center gap-2.5 sm:gap-4">
            <span
              className="w-8 sm:w-16 h-px bg-maroon/50"
              style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)' }}
            />
            <p
              className="font-serif-caps text-[11px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-maroon-dark font-semibold"
              style={{
                textShadow:
                  '0 0 14px rgba(255, 255, 255, 1), 0 0 24px rgba(255, 255, 255, 0.9), 0 1px 4px rgba(255, 255, 255, 0.95)',
              }}
            >
              {wedding.date.display}
            </p>
            <span
              className="w-8 sm:w-16 h-px bg-maroon/50"
              style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)' }}
            />
          </div>
        </motion.div>

        {/* ─── Layer 3: Sacred Temple Mandap (Scales Up & Splits Outward) ─── */}
        <motion.div
          style={prefersReduced ? {} : { scale: templeScale }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[68vh] sm:h-[70vh] md:h-[72vh] lg:h-[75vh] max-h-[860px] aspect-[992/702] w-auto max-w-none origin-bottom select-none z-10"
        >
          {/* Left Door */}
          <motion.div
            style={prefersReduced ? {} : { x: leftDoorX }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="w-full h-full" style={{ clipPath: 'inset(0 49.5% 0 0)' }}>
              <img
                src="/temple.png"
                alt="Sacred temple mandap"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.18)]"
                loading="eager"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Right Door */}
          <motion.div
            style={prefersReduced ? {} : { x: rightDoorX }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="w-full h-full" style={{ clipPath: 'inset(0 0 0 49.5%)' }}>
              <img
                src="/temple.png"
                alt=""
                className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.18)]"
                loading="eager"
                draggable={false}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Layer 4: Initial Screen Intro ("A Celebration of Love" & "#Saarthi") ─── */}
        <motion.div
          style={
            prefersReduced
              ? {}
              : { display: introDisplay, opacity: introOpacity, y: introY }
          }
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center pointer-events-none select-none -translate-y-8 sm:-translate-y-12"
        >
          <p
            className="font-serif-caps text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase text-maroon-dark font-medium mb-1 sm:mb-2"
            style={{
              textShadow:
                '0 0 16px rgba(255, 255, 255, 0.95), 0 0 28px rgba(255, 255, 255, 0.85), 0 1px 4px rgba(255, 255, 255, 1)',
            }}
          >
            A Celebration of Love
          </p>

          <h1
            className="font-script text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-maroon font-normal tracking-normal my-1 sm:my-2 leading-none"
            style={{
              textShadow:
                '0 0 24px rgba(255, 255, 255, 1), 0 0 45px rgba(255, 255, 255, 0.95), 0 2px 14px rgba(255, 255, 255, 0.95), 0 4px 20px rgba(66, 19, 30, 0.15)',
            }}
          >
            {wedding.couple.hashtag}
          </h1>
        </motion.div>

        {/* ─── Layer 5: Scroll Explore Cue ─── */}
        <motion.div
          style={
            prefersReduced
              ? {}
              : { display: scrollCueDisplay, opacity: scrollCueOpacity }
          }
          className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[9px] sm:text-xs tracking-[0.25em] uppercase text-maroon-dark font-medium font-sans bg-white/70 backdrop-blur-xs px-3 py-0.5 rounded-full border border-white/80 shadow-xs">
            Scroll to explore
          </span>
          <ChevronDown
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-maroon-dark animate-bounce"
            style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
