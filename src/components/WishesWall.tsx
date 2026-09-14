import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleHeart, Send, Trash2 } from 'lucide-react';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

const STORAGE_KEY = 'saarthi-wishes';

function loadWishes(): Wish[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveWishes(wishes: Wish[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch {
    // localStorage might be full or unavailable
  }
}

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(loadWishes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [justSent, setJustSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    saveWishes(wishes);
  }, [wishes]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    const newWish: Wish = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: trimmedName,
      message: trimmedMessage,
      timestamp: Date.now(),
    };

    setWishes((prev) => [newWish, ...prev]);
    setName('');
    setMessage('');
    setJustSent(true);
    setTimeout(() => setJustSent(false), 2000);
  };

  const deleteWish = (id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section
      className="relative bg-ivory py-20 sm:py-28 px-6"
      aria-label="Wishes wall"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <MessageCircleHeart
            className="w-7 h-7 text-maroon mx-auto mb-3"
            strokeWidth={1.2}
          />
          <h2 className="font-display text-2xl sm:text-3xl text-brown mb-2">
            Leave Your Wishes
          </h2>
          <p className="text-brown/50 text-sm font-sans">
            Share your blessings for the couple
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="border border-gold/20 bg-white/60 p-6 sm:p-8 mb-10"
        >
          <div className="mb-4">
            <label
              htmlFor="wish-name"
              className="block text-xs tracking-[0.15em] uppercase text-brown/50 font-sans mb-2"
            >
              Your Name
            </label>
            <input
              id="wish-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              maxLength={50}
              className="w-full border border-gold/20 bg-white/80 px-4 py-3 text-sm font-sans text-brown placeholder:text-brown/30 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="wish-message"
              className="block text-xs tracking-[0.15em] uppercase text-brown/50 font-sans mb-2"
            >
              Your Wish
            </label>
            <textarea
              id="wish-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your blessings..."
              required
              maxLength={300}
              rows={3}
              className="w-full border border-gold/20 bg-white/80 px-4 py-3 text-sm font-sans text-brown placeholder:text-brown/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-maroon text-white text-xs tracking-[0.2em] uppercase font-sans hover:bg-maroon-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            <Send className="w-3.5 h-3.5" />
            Send Wish
          </button>
          <AnimatePresence>
            {justSent && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-700 text-xs font-sans mt-3"
              >
                ✓ Your wish has been sent!
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Wishes list */}
        {wishes.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-brown/40 font-sans">
              {wishes.length} {wishes.length === 1 ? 'Wish' : 'Wishes'}
            </p>
            <AnimatePresence mode="popLayout">
              {wishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gold/15 bg-white/50 p-5 sm:p-6 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base text-brown">{wish.name}</p>
                      <p className="text-brown/60 text-sm font-sans mt-1 leading-relaxed">
                        {wish.message}
                      </p>
                      <p className="text-brown/30 text-[11px] font-sans mt-2">
                        {formatDate(wish.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteWish(wish.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-brown/30 hover:text-maroon p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus:opacity-100"
                      aria-label={`Delete wish from ${wish.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
