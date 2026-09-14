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

  // Animation phases driven by scroll
  const templeScale = useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 1.25, 1.9]);
  const leftDoorX = useTransform(scrollYProgress, [0.35, 0.75], ['0%', '-52%']);
  const rightDoorX = useTransform(scrollYProgress, [0.35, 0.75], ['0%', '52%']);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0.65, 0.9], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.28], [0, -35]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Crossfade between uncut static temple at rest and the split doors on scroll to eliminate any vertical seam line
  const staticTempleOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const doorsOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[200vh]"
      aria-label="Wedding invitation hero"
    >
      <motion.div
        style={prefersReduced ? {} : { opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#70BBE0]"
      >
        {/* Bright sky-blue background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#58AEE8] via-[#7EC8F2] to-[#BFE4FA]" />

        {/* Radiant soft ambient sun glow behind upper sky and text */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-amber-100/40 via-white/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* ─── Seamless Transparent Hero Typography (Centered in the Middle of Screen) ─── */}
        <motion.div
          style={prefersReduced ? {} : { opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center pointer-events-none select-none -translate-y-3 sm:-translate-y-5"
        >
          {/* Tagline & hashtag */}
          <p
            className="text-[11px] sm:text-xs md:text-sm tracking-[0.32em] uppercase text-[#42131E] font-medium font-sans mb-1.5 sm:mb-2.5"
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

          {/* Main Couple Heading seamlessly overlapping over sky & temple spire */}
          <h1
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#3A0F1A] leading-[1.08] font-normal tracking-tight"
            style={{
              textShadow:
                '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.95), 0 4px 24px rgba(66, 19, 30, 0.2)',
            }}
          >
            {wedding.couple.bride.firstName}
            <span
              className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl font-sans italic font-light my-0.5 sm:my-1.5 text-[#9A6B25]"
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
              className="text-[11px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-[#3A0F1A] font-sans font-semibold"
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

        {/* ─── Temple Mandap Artwork (Responsive Height: Grand on Mobile & Desktop) ─── */}
        <motion.div
          style={prefersReduced ? {} : { scale: templeScale }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[68vh] sm:h-[70vh] md:h-[72vh] lg:h-[75vh] max-h-[860px] aspect-[992/702] w-auto max-w-none origin-bottom select-none drop-shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
        >
          {/* Warm sanctum glow (reveals as doors slide open) */}
          <motion.div
            style={prefersReduced ? { opacity: 0 } : { opacity: glowOpacity }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[70%] bg-gradient-to-t from-amber-300/90 via-amber-100/70 to-transparent rounded-t-full blur-2xl" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[40%] h-[80%] bg-gradient-to-t from-orange-300/75 via-yellow-100/50 to-transparent rounded-t-full blur-3xl" />
          </motion.div>

          {/* Uncut seamless temple displayed at rest (prevents any 1px subpixel seam line) */}
          <motion.div
            style={prefersReduced ? { opacity: 1 } : { opacity: staticTempleOpacity }}
            className="absolute inset-0 z-10"
          >
            <img
              src="/temple.png"
              alt="Sacred Indian temple mandap"
              className="w-full h-full object-contain object-bottom"
              loading="eager"
              fetchPriority="high"
              draggable={false}
            />
          </motion.div>

          {/* Split doors active on scroll */}
          <motion.div
            style={prefersReduced ? { display: 'none' } : { opacity: doorsOpacity }}
            className="absolute inset-0 z-10"
          >
            {/* Left half of temple — 0.5% overlap prevents subpixel gaps */}
            <motion.div
              style={{ x: leftDoorX }}
              className="absolute inset-0 overflow-hidden"
            >
              <div className="w-full h-full" style={{ clipPath: 'inset(0 49.5% 0 0)' }}>
                <img
                  src="/temple.png"
                  alt=""
                  className="w-full h-full object-contain object-bottom"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Right half of temple — 0.5% overlap prevents subpixel gaps */}
            <motion.div
              style={{ x: rightDoorX }}
              className="absolute inset-0 overflow-hidden"
            >
              <div className="w-full h-full" style={{ clipPath: 'inset(0 0 0 49.5%)' }}>
                <img
                  src="/temple.png"
                  alt=""
                  className="w-full h-full object-contain object-bottom"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Subtle scroll explore cue — elevated above stairs */}
        <motion.div
          style={prefersReduced ? {} : { opacity: scrollCueOpacity }}
          className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="text-[9px] sm:text-xs tracking-[0.25em] uppercase text-[#3A0F1A] font-medium font-sans bg-white/65 backdrop-blur-xs px-3 py-0.5 rounded-full border border-white/70 shadow-xs"
          >
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
