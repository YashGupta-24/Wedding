import { motion } from 'framer-motion';
import { MapPin, Phone, Bell, Home } from 'lucide-react';
import { wedding } from '../data/weddingData';
import type { WeddingVariant } from '../hooks/useWeddingVariant';

interface ThingsToKnowProps {
  variant?: WeddingVariant;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

export default function ThingsToKnow({ variant = 'w' }: ThingsToKnowProps) {
  const contactCard = {
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
  };

  const weddingVenueCard = {
    id: 'wedding-venue',
    icon: MapPin,
    title: variant === 'w' ? 'Venue' : 'Wedding Venue',
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
  };

  const engagementVenueCard = {
    id: 'engagement-venue',
    icon: MapPin,
    title: 'Engagement Venue',
    content: (
      <>
        <p className="font-display text-lg text-brown mb-2">{wedding.engagementVenue.name}</p>
        <p className="text-brown/60 text-sm font-sans leading-relaxed">
          {wedding.engagementVenue.address}
        </p>
        <a
          href={wedding.engagementVenue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs tracking-[0.2em] uppercase text-gold border-b border-gold/30 pb-px hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          View on Map →
        </a>
      </>
    ),
  };

  const homeAddressCard = {
    id: 'home-address',
    icon: Home,
    title: 'Home Address',
    content: (
      <>
        <p className="font-display text-base text-brown mb-2">Our Residence</p>
        <p className="text-brown/60 text-sm font-sans leading-relaxed">
          {wedding.venue.homeAddress}
        </p>
        <a
          href={wedding.venue.homeMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs tracking-[0.2em] uppercase text-gold border-b border-gold/30 pb-px hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          View on Map →
        </a>
      </>
    ),
  };

  const reminderCard = {
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
  };

  // Select cards & order according to variant:
  // 1. url/w -> Contact, Venue, Reminder
  // 2. url/ew -> Engagement Venue, Wedding Venue, Contact
  // 3. url/ehw -> Engagement Venue, Home Address, Wedding Venue, Contact
  const cards =
    variant === 'ew'
      ? [engagementVenueCard, weddingVenueCard, contactCard]
      : variant === 'ehw'
      ? [engagementVenueCard, homeAddressCard, weddingVenueCard, contactCard]
      : [contactCard, weddingVenueCard, reminderCard];

  const gridColsClass =
    cards.length === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-3';

  const containerMaxWidth = cards.length === 4 ? 'max-w-5xl' : 'max-w-4xl';

  return (
    <section
      className="relative bg-ivory-light py-20 sm:py-28 px-4 sm:px-6"
      aria-label="Important information"
    >
      <div className={`${containerMaxWidth} mx-auto`}>
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

        <div className={`grid ${gridColsClass} gap-6`}>
          {cards.map((card, i) => (
            <motion.article
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className="border border-gold/20 bg-white/60 p-6 sm:p-8 text-center flex flex-col justify-between"
            >
              <div>
                <card.icon
                  className="w-6 h-6 text-gold mx-auto mb-4"
                  strokeWidth={1.2}
                />
                <h3 className="font-display text-lg text-brown mb-4">{card.title}</h3>
                {card.content}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
