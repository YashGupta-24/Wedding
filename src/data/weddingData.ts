// ─── Wedding Data ────────────────────────────────────────────────────────────
// Central data store for the entire wedding invitation website.

export type WeddingSide = 'b' | 'g';
export type WeddingVariant = 'w' | 'ew' | 'ehw';

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

  sides: {
    b: {
      key: 'b',
      title: 'Bride Side',
      primaryPerson: {
        firstName: 'Sanchi',
        lastName: 'Gupta',
        fullName: 'Sanchi Gupta',
      },
      secondaryPerson: {
        firstName: 'Sarthak',
        lastName: 'Kaushik',
        fullName: 'Sarthak Kaushik',
      },
      hostParents: {
        mother: 'Mrs. Chanchal Gupta',
        father: 'Mr. Sanjeev Gupta',
        invitationText: 'Cordially Invite You to the Wedding of their daughter',
      },
      otherParents: {
        relationText: 'Son of',
        mother: 'Mrs. Geetanjali Kaushik',
        father: 'Mr. Satendra Kaushik',
      },
      homeAddress:
        '77, Suraj Kund Rd, Suraj Kund, Devi Nagar, Meerut, Uttar Pradesh 250001',
      homeMapUrl:
        'https://www.google.com/maps/search/?api=1&query=77+Suraj+Kund+Rd+Suraj+Kund+Devi+Nagar+Meerut+Uttar+Pradesh+250001',
      contact: {
        phones: ['9719027727', '9457905097'],
      },
      rsvp: {
        family: 'The Gupta Family',
        closingLine: 'with love',
      },
    },
    g: {
      key: 'g',
      title: 'Groom Side',
      primaryPerson: {
        firstName: 'Sarthak',
        lastName: 'Kaushik',
        fullName: 'Sarthak Kaushik',
      },
      secondaryPerson: {
        firstName: 'Sanchi',
        lastName: 'Gupta',
        fullName: 'Sanchi Gupta',
      },
      hostParents: {
        mother: 'Mrs. Geetanjali Kaushik',
        father: 'Mr. Satendra Kaushik',
        invitationText: 'Cordially Invite You to the Wedding of their son',
      },
      otherParents: {
        relationText: 'Daughter of',
        mother: 'Mrs. Chanchal Gupta',
        father: 'Mr. Sanjeev Gupta',
      },
      homeAddress:
        '193/1, Nehru Nagar, Meerut, Uttar Pradesh',
      homeMapUrl:
        'https://maps.app.goo.gl/wPZcEtpkffnC5MBD8?g_st=aw',
      contact: {
        phones: ['9927827232', '8479938373'],
      },
      rsvp: {
        family: 'The Kaushik Family',
        closingLine: 'with love',
      },
    },
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

  engagementDate: {
    iso: '2026-11-15T00:00:00+05:30',
    display: '15 November 2026',
    day: 'Sunday',
    year: 2026,
    month: 'November',
    dayOfMonth: 15,
  },

  engagementVenue: {
    name: 'Hotel Saffron',
    address:
      'South Metro Station, Post, Near Partapur Flyover, Meerut, Uttar Pradesh 250002',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Hotel+Saffron+Partapur+Flyover+Meerut+Uttar+Pradesh+250002',
  },

  venue: {
    name: 'Rajwada',
    address:
      'Delhi Rd, Rithani West, Phase-II, Industrial Area, Rithani, Meerut, Uttar Pradesh 250103',
    homeAddress:
      '77, Suraj Kund Rd, Suraj Kund, Devi Nagar, Meerut, Uttar Pradesh 250001',
    homeMapUrl:
      'https://www.google.com/maps/search/?api=1&query=77+Suraj+Kund+Rd+Suraj+Kund+Devi+Nagar+Meerut+Uttar+Pradesh+250001',
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
      name: 'Mehendi',
      emoji: '🌿',
      description:
        'An afternoon of intricate henna art, laughter, and folk music as we adorn the bride with beautiful mehendi patterns.',
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

  homeEvents: [
    {
      id: 'haldi',
      name: 'Haldi',
      emoji: '🌼',
      time: '20 November 2026',
      subTime: 'Morning Ceremony',
      description:
        'A joyous morning drenched in golden turmeric, heartfelt blessings, laughter, and celebratory music.',
    },
    {
      id: 'mehndi',
      name: 'Mehendi',
      emoji: '🌿',
      time: '20 November 2026',
      subTime: 'Afternoon Ceremony',
      description:
        'An afternoon of intricate henna art, folk melodies, and sweet moments as beautiful patterns adorn the hands.',
    },
    {
      id: 'sangeet',
      name: 'Sangeet Night',
      emoji: '🎶',
      time: '20 November 2026',
      subTime: 'Evening Celebrations',
      description:
        'A vibrant musical evening filled with celebratory dance, music, laughter, and the togetherness of both families.',
    },
    {
      id: 'festivities',
      name: 'Festive Traditions',
      emoji: '🪔',
      time: '21 November 2026',
      subTime: 'Day Celebrations',
      description:
        'Sacred home rituals, traditional blessings, and heartfelt moments ushering in the auspicious wedding ceremony.',
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
