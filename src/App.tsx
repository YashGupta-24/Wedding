import { lazy, Suspense } from 'react';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import MusicPlayer from './components/MusicPlayer';
import { useWeddingVariant } from './hooks/useWeddingVariant';
import { wedding } from './data/weddingData';

// Lazy-load below-the-fold sections
const DateReveal = lazy(() => import('./components/DateReveal'));
const Celebrations = lazy(() => import('./components/Celebrations'));
const InstagramSection = lazy(() => import('./components/InstagramSection'));
const Countdown = lazy(() => import('./components/Countdown'));
const ThingsToKnow = lazy(() => import('./components/ThingsToKnow'));
const RSVP = lazy(() => import('./components/RSVP'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-gold/30 border-t-gold animate-spin rounded-full" />
    </div>
  );
}

export default function App() {
  const variant = useWeddingVariant();

  // If accessed without a valid route / hash, render the 404 message card
  if (!variant) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="relative max-w-md w-full border border-gold/40 bg-white/80 p-8 sm:p-10 text-center shadow-xs backdrop-blur-xs">
          {/* Corner Ornaments */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-gold/40" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-gold/40" />
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-gold/40" />
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-gold/40" />

          <p className="font-serif-caps text-xs tracking-[0.3em] uppercase text-gold font-medium mb-3">
            Wedding Invitation
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-maroon mb-4 font-normal">
            404 Not Found
          </h1>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-10 h-px bg-gold/30" />
            <span className="text-gold text-xs">✦</span>
            <span className="w-10 h-px bg-gold/30" />
          </div>
          <p className="text-brown/80 font-sans text-sm sm:text-base leading-relaxed mb-3">
            This should serve as an invite for the wedding of {wedding.couple.bride.firstName} &amp; {wedding.couple.groom.firstName}.
          </p>
          <p className="text-brown/50 font-sans text-xs sm:text-sm italic">
            Please check the link and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <main>
          <Invitation />
          <DateReveal variant={variant} />
          {variant === 'ehw' && <Celebrations />}
          <InstagramSection />
          <Countdown />
          <ThingsToKnow variant={variant} />
          <RSVP />
        </main>
      </Suspense>
      <MusicPlayer />
    </div>
  );
}
