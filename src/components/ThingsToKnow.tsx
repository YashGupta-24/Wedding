import { motion } from 'framer-motion';
import { MapPin, Phone, Bell } from 'lucide-react';
import { wedding } from '../data/weddingData';

const cards = [
  {
    id: 'venue',
    icon: MapPin,
    title: 'Venue',
    content: (
      <>
        <p className="font-display text-lg text-brown mb-2">{wedding.venue.name}</p>
        <p className="text-brown/60 text-sm font-sans leading-relaxed">
          {wedding.venue.address}
        </p>
        <a
          href={wedding.venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs tracking-[0.2em] uppercase text-gold border-b border-gold/30 pb-px hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          View on Map →
        </a>
      </>
    ),
  },
  {
    id: 'contact',
    icon: Phone,
    title: 'Contact',
    content: (
      <>
        <p className="text-brown/60 text-sm font-sans mb-3">
          For any queries, feel free to reach out
        </p>
        {wedding.contact.phones.map((phone) => (
          <a
            key={phone}
            href={`tel:+91${phone}`}
            className="block text-brown font-sans text-sm mb-1 hover:text-maroon transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            +91 {phone}
          </a>
        ))}
      </>
    ),
  },
  {
    id: 'reminder',
    icon: Bell,
    title: 'Reminder',
    content: (
      <>
        <p className="text-brown/60 text-sm font-sans leading-relaxed">
          Please grace us with your presence on the auspicious day. Your blessings mean the
          world to us.
        </p>
        <p className="text-gold text-sm font-sans mt-3 italic">
          {wedding.date.day}, {wedding.date.display}
        </p>
      </>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

export default function ThingsToKnow() {
  return (
    <section
      className="relative bg-ivory-light py-20 sm:py-28 px-6"
      aria-label="Important information"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-2xl sm:text-3xl text-brown">Things to Know</h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="w-10 h-px bg-gold/30" />
            <span className="text-gold text-xs">✦</span>
            <span className="w-10 h-px bg-gold/30" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.article
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className="border border-gold/20 bg-white/60 p-8 text-center"
            >
              <card.icon
                className="w-6 h-6 text-gold mx-auto mb-4"
                strokeWidth={1.2}
              />
              <h3 className="font-display text-lg text-brown mb-4">{card.title}</h3>
              {card.content}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
