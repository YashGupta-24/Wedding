import { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, VolumeOff } from 'lucide-react';

/**
 * Floating music toggle button.
 * Auto-plays wedding ambience on page load (falls back to first user
 * interaction if the browser blocks autoplay). The button mutes / unmutes.
 */

export default function MusicPlayer() {
  const [muted, setMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 1;
    audio.preload = 'auto';
    audioRef.current = audio;

    /* ---- loading state ---- */
    const onCanPlay = () => setLoaded(true);
    const onError = () => setLoaded(false);
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);

    /* ---- autoplay with interaction fallback ---- */
    const cleanupListeners = () => {
      document.removeEventListener('click', onInteraction, true);
      document.removeEventListener('touchstart', onInteraction, true);
      document.removeEventListener('scroll', onInteraction, true);
      document.removeEventListener('keydown', onInteraction, true);
    };

    const onInteraction = () => {
      audio.play().catch(() => { /* still blocked — ignore */ });
      cleanupListeners();
    };

    // Try to play immediately; if blocked, wait for first interaction
    audio.play().catch(() => {
      document.addEventListener('click', onInteraction, { capture: true, once: false });
      document.addEventListener('touchstart', onInteraction, { capture: true, once: false });
      document.addEventListener('scroll', onInteraction, { capture: true, passive: true, once: false });
      document.addEventListener('keydown', onInteraction, { capture: true, once: false });
    });

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      cleanupListeners();
      audio.src = '';
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setMuted((prev) => {
      audio.muted = !prev;
      return !prev;
    });
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border border-gold/30 bg-ivory/90 backdrop-blur-sm text-brown shadow-lg hover:bg-gold/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-full"
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      aria-pressed={!muted}
      title={loaded ? (muted ? 'Unmute music' : 'Mute music') : 'Music loading…'}
    >
      {muted ? (
        <VolumeOff className="w-4.5 h-4.5" strokeWidth={1.5} />
      ) : (
        <Volume2 className="w-4.5 h-4.5 text-maroon" strokeWidth={1.5} />
      )}
    </button>
  );
}
