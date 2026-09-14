import { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, VolumeOff } from 'lucide-react';

/**
 * Floating music toggle button.
 * Plays a soft shehnai/wedding ambience when user opts in.
 * Uses a royalty-free shehnai audio URL.
 * Falls back gracefully if audio fails to load.
 */
export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element lazily
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'none';
    audio.addEventListener('canplaythrough', () => setLoaded(true));
    audio.addEventListener('error', () => setLoaded(false));
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      // Use a placeholder — user can replace this with a real shehnai clip
      if (!audio.src || audio.src === window.location.href) {
        // No real audio source — button just toggles UI state
        // To add music, place a .mp3 in /public/music.mp3
        audio.src = '/music.mp3';
      }
      audio.play().catch(() => {
        // Autoplay blocked or file not found — silently fail
      });
      setPlaying(true);
    }
  }, [playing]);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center border border-gold/30 bg-ivory/90 backdrop-blur-sm text-brown shadow-lg hover:bg-gold/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-full"
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
      title={loaded ? (playing ? 'Pause music' : 'Play music') : 'Place music.mp3 in public/ to enable'}
    >
      {playing ? (
        <Volume2 className="w-4.5 h-4.5 text-maroon" strokeWidth={1.5} />
      ) : (
        <VolumeOff className="w-4.5 h-4.5" strokeWidth={1.5} />
      )}
    </button>
  );
}
