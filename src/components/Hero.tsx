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
  const templeScale = useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 1.35, 2.1]);
  const leftDoorX = useTransform(scrollYProgress, [0.35, 0.75], ['0%', '-52%']);
  const rightDoorX = useTransform(scrollYProgress, [0.35, 0.75], ['0%', '52%']);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0.65, 0.9], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.28], [0, -40]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

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
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-b from-amber-100/40 via-white/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* ─── Seamless Transparent Hero Typography (No Boxed Background) ─── */}
        <motion.div
          style={prefersReduced ? {} : { opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-[10vh] sm:pt-[12vh] md:pt-[13vh] px-4 text-center pointer-events-none select-none"
        >
          {/* Tagline & hashtag */}
          <p
            className="text-xs sm:text-[13px] tracking-[0.35em] uppercase text-[#42131E] font-medium font-sans mb-2 sm:mb-3"
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

          {/* Main Couple Heading seamlessly overlapping over sky & temple */}
          <h1
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#3A0F1A] leading-[1.1] font-normal tracking-tight"
            style={{
              textShadow:
                '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.9), 0 2px 12px rgba(255, 255, 255, 0.95), 0 4px 24px rgba(66, 19, 30, 0.15)',
            }}
          >
            {wedding.couple.bride.firstName}
            <span
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans italic font-light my-1 sm:my-2 text-[#9A6B25]"
              style={{
                textShadow:
                  '0 0 16px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.85), 0 1px 6px rgba(255, 255, 255, 0.95)',
              }}
            >
              weds
            </span>
            {wedding.couple.groom.firstName}
          </h1>

          {/* Auspicious Date */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4">
            <span
              className="w-10 sm:w-16 h-px bg-[#8B2335]/70"
              style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)' }}
            />
            <p
              className="text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-[#3A0F1A] font-sans font-semibold"
              style={{
                textShadow:
                  '0 0 14px rgba(255, 255, 255, 1), 0 0 24px rgba(255, 255, 255, 0.85), 0 1px 4px rgba(255, 255, 255, 0.95)',
              }}
            >
              {wedding.date.display}
            </p>
            <span
              className="w-10 sm:w-16 h-px bg-[#8B2335]/70"
              style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)' }}
            />
          </div>
        </motion.div>

        {/* ─── Temple Mandap Artwork (Centered & Expanding on Scroll) ─── */}
        <motion.div
          style={prefersReduced ? {} : { scale: templeScale }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[94vw] sm:w-[82vw] md:w-[72vw] lg:w-[64vw] max-w-[880px] origin-bottom select-none"
        >
          {/* Warm sanctum glow (reveals as doors slide open) */}
          <motion.div
            style={prefersReduced ? { opacity: 0 } : { opacity: glowOpacity }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[70%] bg-gradient-to-t from-amber-300/90 via-amber-100/70 to-transparent rounded-t-full blur-2xl" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[40%] h-[80%] bg-gradient-to-t from-orange-300/75 via-yellow-100/50 to-transparent rounded-t-full blur-3xl" />
          </motion.div>

          {/* Left half of temple */}
          <motion.div
            style={prefersReduced ? {} : { x: leftDoorX }}
            className="absolute inset-0 z-10 overflow-hidden"
          >
            <div className="w-full h-full" style={{ clipPath: 'inset(0 50% 0 0)' }}>
              <img
                src="/temple.png"
                alt=""
                className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.18)]"
                loading="eager"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Right half of temple */}
          <motion.div
            style={prefersReduced ? {} : { x: rightDoorX }}
            className="absolute inset-0 z-10 overflow-hidden"
          >
            <div className="w-full h-full" style={{ clipPath: 'inset(0 0 0 50%)' }}>
              <img
                src="/temple.png"
                alt=""
                className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.18)]"
                loading="eager"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Full static temple layout spacer for intrinsic sizing */}
          <img
            src="/temple.png"
            alt="Sacred Indian temple mandap"
            className="w-full h-auto object-contain object-bottom opacity-0 pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>

        {/* Subtle scroll explore cue */}
        <motion.div
          style={prefersReduced ? {} : { opacity: scrollCueOpacity }}
          className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#3A0F1A] font-medium font-sans"
            style={{
              textShadow:
                '0 0 12px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9)',
            }}
          >
            Scroll to explore
          </span>
          <ChevronDown
            className="w-4 h-4 text-[#3A0F1A] animate-bounce"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
