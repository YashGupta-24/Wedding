import { Heart } from 'lucide-react';
import { wedding } from '../data/weddingData';

export default function Footer() {
  return (
    <footer
      className="relative bg-ivory py-16 sm:py-20 px-6 border-t border-gold/15"
      aria-label="Site footer"
    >
      <div className="max-w-lg mx-auto text-center">
        {/* Ornamental top */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-16 h-px bg-gold/25" />
          <span className="text-gold text-sm">✦</span>
          <span className="w-16 h-px bg-gold/25" />
        </div>

        <p className="font-display text-2xl sm:text-3xl text-brown mb-2">
          {wedding.couple.bride.firstName} & {wedding.couple.groom.firstName}
        </p>
        <p className="text-brown/50 text-sm font-sans mb-6">
          {wedding.date.display}
        </p>

        <div className="flex items-center justify-center gap-1 text-brown/30 text-xs font-sans">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-maroon fill-maroon" />
          <span>for a celebration of love</span>
        </div>

        <p className="text-brown/20 text-[11px] font-sans mt-4 tracking-wider">
          {wedding.couple.hashtag}
        </p>
      </div>
    </footer>
  );
}
