import { ChurchEvent } from '../src/types';
export const SEED_CHURCH_EVENTS: ChurchEvent[] = [
  {
    id: 'sunday-worship',
    title: 'Sunday Celebration Worship Service',
    category: 'worship',
    categoryLabel: 'Worship Service',
    dateBadge: {
      month: 'SUN',
      day: '18',
      subtext: 'WEEKLY'
    },
    dayOfWeek: 'Every Sunday',
    time: '10:00 AM – 12:30 PM EST',
    frequency: 'Every Sunday Morning',
    location: '121 E 2nd Ave, Roselle, NJ 07203',
    isOnlineAvailable: true,
    onlinePlatform: 'YouTube & Facebook Live',
    scriptureRef: 'Psalm 100:4 · Matthew 6:33',
    description: 'Vibrant praise, heartfelt worship, practical expository teaching of God\'s Word, and warm fellowship for the whole family.',
    highlights: [
      'Kingdom Kids Ministry available',
      'Warm welcoming tea & fellowship after service',
      'First-time guests receive a special gift package',
      'Free parking on 2nd Ave & adjacent municipal lots'
    ],
    coordinator: 'Pastoral Team & Ushers Department',
    audience: 'All ages & families welcome',
    rsvpRequired: false,
    status: 'scheduled'
  },
  {
    id: 'midweek-bible-study',
    title: 'Digging Deep: Midweek Bible Study & Prayer',
    category: 'bible-study',
    categoryLabel: 'Bible Study',
    dateBadge: {
      month: 'WED',
      day: '21',
      subtext: 'WEEKLY'
    },
    dayOfWeek: 'Every Wednesday',
    time: '7:00 PM – 8:30 PM EST',
    frequency: 'Every Wednesday Evening',
    location: 'Sanctuary & Zoom Hybrid',
    isOnlineAvailable: true,
    onlinePlatform: 'Zoom & YouTube Livestream',
    scriptureRef: 'Acts 17:11 · 2 Timothy 2:15',
    description: 'Verse-by-verse scripture dissection, open Q&A on faith doctrines, and focused midweek prayer altar.',
    highlights: [
      'Interactive Q&A discussion format',
      'Printed study outlines provided weekly',
      'Online breakout rooms for intercession'
    ],
    coordinator: 'Christian Education & Ministers',
    audience: 'Adults, Teens, Seekers',
    rsvpRequired: false,
    status: 'scheduled'
  },
  {
    id: 'holy-ghost-service',
    title: 'Holy Ghost Service & Deliverance Night',
    category: 'special',
    categoryLabel: 'Holy Ghost Night',
    dateBadge: {
      month: 'FRI',
      day: '06',
      subtext: 'MONTHLY'
    },
    dayOfWeek: '1st Friday of the Month',
    time: '7:00 PM – 10:30 PM EST',
    frequency: 'Monthly First Friday',
    location: '121 E 2nd Ave, Roselle, NJ',
    isOnlineAvailable: true,
    onlinePlatform: 'YouTube Global Stream & Sanctuary',
    scriptureRef: 'Joel 2:28 · Isaiah 10:27',
    description: 'Apostolic miracles, prophetic ministry, physical and emotional healing, and holy communion.',
    highlights: [
      'Anointing service for families & businesses',
      'Prayer for fruit of the womb and breakthroughs',
      'Special holy communion feast'
    ],
    coordinator: 'Pastoral Council',
    audience: 'Entire community invited',
    rsvpRequired: false,
    status: 'scheduled'
  },
  {
    id: 'community-food-drive',
    title: 'Evangelism / Community Outreach',
    category: 'outreach',
    categoryLabel: 'Evangelism / Community Outreach',
    dateBadge: {
      month: 'SUN',
      day: '24',
      subtext: 'BI-WEEKLY'
    },
    dayOfWeek: '2nd & 4th Sundays',
    time: '11:00 AM – 2:00 PM EST',
    frequency: '2nd & 4th Sundays',
    location: 'Fellowship Hall & 2nd Ave Entrance',
    isOnlineAvailable: false,
    scriptureRef: 'Matthew 25:35-40 · Galatians 6:10',
    description: 'Coming soon.',
    highlights: [
      'More details will be announced soon.'
    ],
    coordinator: 'Welfare & Community Benevolence Ministry',
    audience: 'Open to all community neighbors',
    rsvpRequired: false,
    status: 'scheduled'
  },
  {
    id: 'youth-ignite',
    title: 'Generation Next: Youth & Young Adults Fellowship',
    category: 'special',
    categoryLabel: 'Youth Ministry',
    dateBadge: {
      month: 'SUN',
      day: '25',
      subtext: 'MONTHLY'
    },
    dayOfWeek: 'Last Sunday of the Month',
    time: '1:00 PM – 3:00 PM EST',
    frequency: 'Monthly Fellowship',
    location: 'Youth Lounge & Media Center',
    isOnlineAvailable: true,
    onlinePlatform: 'Instagram Live & In-Person',
    scriptureRef: '1 Timothy 4:12 · Daniel 1:8',
    description: 'Dynamic discussions tackling campus life, career ambition, mental wellness, and Christian dating in modern culture.',
    highlights: [
      'Free lunch & refreshments served',
      'Acoustic worship and spoken word',
      'Career mentoring and networking session'
    ],
    coordinator: 'NextGen Leadership Team',
    audience: 'Ages 13 to 35',
    rsvpRequired: true,
    status: 'scheduled'
  }
];
