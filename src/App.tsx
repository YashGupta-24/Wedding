import { lazy, Suspense } from 'react';
import Hero from './components/Hero';

import MusicPlayer from './components/MusicPlayer';

// Lazy-load below-the-fold sections
const Invitation = lazy(() => import('./components/Invitation'));
const DateReveal = lazy(() => import('./components/DateReveal'));
const Celebrations = lazy(() => import('./components/Celebrations'));
const CoupleStory = lazy(() => import('./components/CoupleStory'));
const InstagramSection = lazy(() => import('./components/InstagramSection'));
const Countdown = lazy(() => import('./components/Countdown'));
const ThingsToKnow = lazy(() => import('./components/ThingsToKnow'));
const RSVP = lazy(() => import('./components/RSVP'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-gold/30 border-t-gold animate-spin rounded-full" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <main>
          <Invitation />
          <DateReveal />
          <Celebrations />
          <CoupleStory />
          <InstagramSection />
          <Countdown />
          <ThingsToKnow />
          <RSVP />
        </main>
        <Footer />
      </Suspense>
      <MusicPlayer />
    </div>
  );
}
