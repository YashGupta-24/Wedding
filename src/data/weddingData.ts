// ─── Wedding Data ────────────────────────────────────────────────────────────
// Central data store for the entire wedding invitation website.

export const wedding = {
  couple: {
    bride: {
      firstName: 'Sanchi',
      lastName: 'Gupta',
      fullName: 'Sanchi Gupta',
    },
    groom: {
      firstName: 'Sarthak',
      lastName: 'Kaushik',
      fullName: 'Sarthak Kaushik',
    },
    hashtag: '#Saarthi',
    tagline: 'A celebration of love',
    heroIntro: 'A Celebration of Love.',
  },

  date: {
    iso: '2026-11-21T00:00:00+05:30',
    display: '21 November 2026',
    day: 'Saturday',
    year: 2026,
    month: 'November',
    dayOfMonth: 21,
  },

  families: {
    bride: {
      father: { name: 'Sanjeev Gupta', relation: 'Father' },
      mother: { name: 'Chanchal Gupta', relation: 'Mother' },
      siblings: [{ name: 'Yash Gupta', relation: 'Brother' }],
    },
    groom: {
      father: { name: 'Satendra Kaushik', relation: 'Father' },
      mother: { name: 'Geetanjali Kaushik', relation: 'Mother' },
      siblings: [{ name: 'Samarth Kaushik', relation: 'Brother' }],
    },
  },

  venue: {
    name: 'Rajwada',
    address:
      'Delhi Rd, Rithani West, Phase-II, Industrial Area, Rithani, Meerut, Uttar Pradesh 250103',
    homeAddress:
      '77, Saraswati Mandir, Suraj Kund Road, Meerut, Uttar Pradesh, 250002',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Rajwada+Delhi+Rd+Rithani+Meerut+Uttar+Pradesh+250103',
  },

  contact: {
    phones: ['9719027727', '9457905097'],
  },

  rsvp: {
    family: 'The Gupta Family',
    closingLine: 'with love',
  },

  events: [
    {
      id: 'mehndi',
      name: 'Mehndi',
      emoji: '🌿',
      description:
        'An afternoon of intricate henna art, laughter, and folk music as we adorn the bride with beautiful mehndi patterns.',
      time: 'Afternoon Ceremony',
    },
    {
      id: 'sangeet',
      name: 'Sangeet Night',
      emoji: '🎶',
      description:
        'A vibrant evening of music, dance performances, and celebrations as both families come together in joy.',
      time: 'Evening Celebrations',
    },
    {
      id: 'wedding',
      name: 'Wedding',
      emoji: '💍',
      description:
        'The sacred ceremony where two souls unite, blessed by traditions, rituals, and the love of family.',
      time: 'Auspicious Hour',
    },
  ],

  meta: {
    title: 'Sanchi & Sarthak — Wedding Invitation',
    description:
      'You are cordially invited to celebrate the wedding of Sanchi Gupta and Sarthak Kaushik on 21 November 2026.',
    ogImage: '/og-image.jpg',
  },
} as const;

export type WeddingData = typeof wedding;
