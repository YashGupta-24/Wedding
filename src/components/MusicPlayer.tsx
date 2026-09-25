import { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, VolumeOff } from 'lucide-react';

/**
 * Floating music toggle button.
 * Attempts to auto-play background music on page load.
 * If blocked by browser autoplay policies (e.g. Chrome/Safari),
 * it seamlessly begins playback on the first user interaction (click/tap/keypress).
 */
export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 1;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onCanPlay = () => setLoaded(true);
    const onError = () => setLoaded(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Real user gestures accepted by Chrome / Safari / Firefox.
    // touchend is critical for iOS Safari (it treats touchend—not touchstart—as the
    // canonical "tap" gesture that unlocks audio). scroll is included so that the
    // very first scroll on mobile also tries to resume playback.
    const gestureEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown', 'scroll'];

    const removeGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture, true);
      });
    };

    const handleFirstGesture = () => {
      if (userMutedRef.current) {
        removeGestureListeners();
        return;
      }

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          removeGestureListeners();
        })
        .catch(() => {
          // If still blocked, keep listeners active for subsequent interactions
        });
    };

    // 1. Try playing immediately on page load
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked by browser policy (common in Chrome):
        // Register one-time interaction listeners to start audio on first user touch/click/key
        gestureEvents.forEach((evt) => {
          window.addEventListener(evt, handleFirstGesture, { capture: true, passive: true });
        });
      });

    return () => {
      removeGestureListeners();
      audio.pause();
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.src = '';
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // If currently paused (e.g. initial autoplay blocked and user clicked button directly)
      audio.muted = false;
      userMutedRef.current = false;
      setIsMuted(false);
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      // If already playing, toggle mute
      const nextMuted = !audio.muted;
      audio.muted = nextMuted;
      userMutedRef.current = nextMuted;
      setIsMuted(nextMuted);
    }
  }, []);

  const isAudible = isPlaying && !isMuted;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border border-gold/30 bg-ivory/90 backdrop-blur-sm text-brown shadow-lg hover:bg-gold/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-full"
      aria-label={isAudible ? 'Mute music' : 'Play / Unmute music'}
      aria-pressed={isAudible}
      title={
        loaded
          ? isAudible
            ? 'Mute music'
            : 'Play / Unmute music'
          : 'Loading music…'
      }
    >
      {isAudible ? (
        <Volume2 className="w-4.5 h-4.5 text-maroon" strokeWidth={1.5} />
      ) : (
        <VolumeOff className="w-4.5 h-4.5" strokeWidth={1.5} />
      )}
    </button>
  );
}
