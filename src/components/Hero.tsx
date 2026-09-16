import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { wedding } from '../data/weddingData';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Animation phases driven by scroll:
  // 1. Text lifts and fades out as user starts scrolling
  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.22], [0, -35]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // 2. Temple FIRST EXPANDS (zooms in gracefully towards the viewer as you scroll)
  const templeScale = useTransform(scrollYProgress, [0, 0.32, 0.70], [1, 1.25, 1.75]);

  // 3. Temple THEN SPLITS (doors slide open starting at 0.30 after the expansion has started)
  const leftDoorX = useTransform(scrollYProgress, [0.30, 0.70], ['0%', '-56%']);
  const rightDoorX = useTransform(scrollYProgress, [0.30, 0.70], ['0%', '56%']);

  // 4. Warm sanctum glow intensifies as doors part open
  const glowOpacity = useTransform(scrollYProgress, [0.28, 0.52], [0, 1]);

  // 5. Hero dissolves seamlessly into the ivory Invitation section below
  const heroOpacity = useTransform(scrollYProgress, [0.66, 0.88], [1, 0]);
  const heroPointerEvents = useTransform(scrollYProgress, (p) => (p > 0.85 ? 'none' : 'auto'));

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[210vh] sm:h-[230vh]"
      aria-label="Wedding invitation hero"
    >
      <motion.div
        style={prefersReduced ? {} : { opacity: heroOpacity, pointerEvents: heroPointerEvents }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-ivory"
      >
        {/* ─── Ultra-Realistic Shiny Summer Sky Background ─── */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          <img
            src="/sunny-sky.jpg"
            alt="Breathtaking sunny summer sky with brilliant sun"
            className="w-full h-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
          {/* Soft atmospheric gradient wash ensuring seamless fade into ivory */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-75% to-[#F8F0E3]/70" />
        </div>

        {/* ─── Sacred Temple Mandap Artwork (First Expands, Then Splits) ─── */}
        <motion.div
          style={prefersReduced ? {} : { scale: templeScale }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[68vh] sm:h-[70vh] md:h-[72vh] lg:h-[75vh] max-h-[860px] aspect-[992/702] w-auto max-w-none origin-bottom select-none"
        >
          {/* Warm sanctum glow (reveals as doors slide open) */}
          <motion.div
            style={prefersReduced ? { opacity: 0 } : { opacity: glowOpacity }}
            className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
          >
            <div className="w-[70vw] sm:w-[55vw] md:w-[45vw] h-[75vh] bg-gradient-to-t from-amber-300/85 via-amber-100/60 to-transparent rounded-full blur-3xl" />
            <div className="absolute w-[50vw] sm:w-[38vw] md:w-[30vw] h-[60vh] bg-gradient-to-t from-orange-400/65 via-yellow-200/50 to-transparent rounded-full blur-2xl" />
          </motion.div>

          {/* Left half of temple — 0.5% overlap prevents subpixel gaps at rest */}
          <motion.div
            style={prefersReduced ? {} : { x: leftDoorX }}
            className="absolute inset-0 z-10 overflow-hidden"
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

          {/* Right half of temple — 0.5% overlap prevents subpixel gaps at rest */}
          <motion.div
            style={prefersReduced ? {} : { x: rightDoorX }}
            className="absolute inset-0 z-10 overflow-hidden"
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

        {/* ─── Seamless Hero Typography ─── */}
        <motion.div
          style={prefersReduced ? {} : { opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center pointer-events-none select-none -translate-y-8 sm:-translate-y-12"
        >
          {/* Tagline & hashtag with refined classical serif uppercase */}
          <p
            className="font-serif-caps text-[11px] sm:text-xs md:text-sm tracking-[0.32em] uppercase text-[#42131E] font-medium mb-1.5 sm:mb-2.5"
            style={{
              textShadow:
                '0 0 16px rgba(255, 255, 255, 0.95), 0 0 28px rgba(255, 255, 255, 0.85), 0 1px 4px rgba(255, 255, 255, 1)',
            }}
          >
            {wedding.couple.tagline} ·{' '}
            <span className="text-[#8B2335] font-semibold tracking-[0.25em]">
              {wedding.couple.hashtag}
            </span>
          </p>

          {/* Main Couple Heading with elegant calligraphy 'weds' */}
          <h1
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#3A0F1A] leading-[1.08] font-normal tracking-tight"
            style={{
              textShadow:
                '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.95), 0 4px 24px rgba(66, 19, 30, 0.15)',
            }}
          >
            {wedding.couple.bride.firstName}
            <span
              className="block font-script text-3xl sm:text-5xl md:text-6xl text-[#A67C38] my-0.5 sm:my-1.5 font-normal tracking-normal lowercase"
              style={{
                textShadow:
                  '0 0 16px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.9), 0 1px 6px rgba(255, 255, 255, 0.95)',
              }}
            >
              weds
            </span>
            {wedding.couple.groom.firstName}
          </h1>

          {/* Auspicious Date — framed right over the temple shikhara */}
          <div className="mt-3 sm:mt-5 flex items-center justify-center gap-2.5 sm:gap-4">
            <span
              className="w-8 sm:w-16 h-px bg-[#8B2335]/70"
              style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)' }}
            />
            <p
              className="font-serif-caps text-[11px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-[#3A0F1A] font-semibold"
              style={{
                textShadow:
                  '0 0 14px rgba(255, 255, 255, 1), 0 0 24px rgba(255, 255, 255, 0.9), 0 1px 4px rgba(255, 255, 255, 0.95)',
              }}
            >
              {wedding.date.display}
            </p>
            <span
              className="w-8 sm:w-16 h-px bg-[#8B2335]/70"
              style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)' }}
            />
          </div>
        </motion.div>

        {/* Subtle scroll explore cue — elevated above stairs */}
        <motion.div
          style={prefersReduced ? {} : { opacity: scrollCueOpacity }}
          className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[9px] sm:text-xs tracking-[0.25em] uppercase text-[#3A0F1A] font-medium font-sans bg-white/70 backdrop-blur-xs px-3 py-0.5 rounded-full border border-white/80 shadow-xs">
            Scroll to explore
          </span>
          <ChevronDown
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3A0F1A] animate-bounce"
            style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
