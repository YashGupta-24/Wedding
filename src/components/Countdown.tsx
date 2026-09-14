import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { wedding } from '../data/weddingData';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="border border-gold/30 bg-white/50 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <span className="font-display text-2xl sm:text-3xl text-maroon">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-brown/50 font-sans mt-2">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const timeLeft = useCountdown(wedding.date.iso);

  return (
    <section
      className="relative bg-ivory py-20 sm:py-28 px-6"
      aria-label="Wedding countdown"
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <Clock className="w-7 h-7 text-gold mx-auto mb-4" strokeWidth={1.2} />
          <h2 className="font-display text-2xl sm:text-3xl text-brown mb-2">
            Counting Down
          </h2>
          <p className="text-brown/50 text-sm font-sans mb-10">
            Until we become one
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center gap-3 sm:gap-5"
          aria-live="polite"
          aria-atomic="true"
          role="timer"
        >
          <CountdownUnit value={timeLeft.days} label="Days" />
          <span className="text-gold/40 text-xl font-light mt-[-1rem]">:</span>
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <span className="text-gold/40 text-xl font-light mt-[-1rem]">:</span>
          <CountdownUnit value={timeLeft.minutes} label="Mins" />
          <span className="text-gold/40 text-xl font-light mt-[-1rem]">:</span>
          <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-brown/40 text-xs font-sans mt-8"
        >
          {wedding.date.display} · {wedding.date.day}
        </motion.p>
      </div>
    </section>
  );
}
