import { ChurchEvent, PrayerRequestRecord, VisitorInquiryRecord, AnnouncementBanner, YouTubeVideoItem, EbookItem } from '../types';
import { INITIAL_YOUTUBE_VIDEOS } from '../data/videoGalleryData';
import { EBOOKS_DATA } from '../data/ebooksData';

// Initial Seed Events for Church Calendar
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
    title: 'Roselle Hope Food Pantry & Care Package Distribution',
    category: 'outreach',
    categoryLabel: 'Outreach & Missions',
    dateBadge: {
      month: 'SAT',
      day: '24',
      subtext: 'BI-WEEKLY'
    },
    dayOfWeek: '2nd & 4th Saturdays',
    time: '11:00 AM – 2:00 PM EST',
    frequency: 'Bi-Weekly Saturday Morning',
    location: 'Fellowship Hall & 2nd Ave Entrance',
    isOnlineAvailable: false,
    scriptureRef: 'Matthew 25:35-40 · Galatians 6:10',
    description: 'Providing fresh groceries, dry pantry staples, and personal hygiene packages to families in Roselle and neighboring Union County towns.',
    highlights: [
      'No income verification required',
      'Drive-through and walk-up pickup lines',
      'Optional prayer and spiritual encouragement tent'
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

// Initial Seed Prayer Requests
export const SEED_PRAYER_REQUESTS: PrayerRequestRecord[] = [
  {
    id: 'prayer-1',
    name: 'Sister Folake Adeleke',
    email: 'folake.a@example.com',
    phone: '(908) 555-0142',
    category: 'Healing & Health',
    requestText: 'Please intercede for my mother who is undergoing surgery this Friday morning in Summit. Pray for the surgical team and rapid recovery.',
    isConfidential: true,
    status: 'interceding',
    submittedAt: 'October 14, 2026',
    pastoralNotes: 'Assigned to Intercessory Band. Pastor called to pray with family on Wednesday.'
  },
  {
    id: 'prayer-2',
    name: 'Brother David Miller',
    email: 'dmiller@example.com',
    phone: '(862) 555-8831',
    category: 'Career & Employment',
    requestText: 'Trusting God for divine favor in my final round interview for a senior logistics managerial role in Elizabeth next Tuesday.',
    isConfidential: false,
    status: 'new',
    submittedAt: 'October 15, 2026',
    pastoralNotes: 'Added to Friday prayer bulletin.'
  },
  {
    id: 'prayer-3',
    name: 'Grace & Emmanuel Okafor',
    email: 'okafor.family@example.com',
    phone: '(201) 555-3312',
    category: 'Family & Marriage',
    requestText: 'Praising God for answered prayer! God blessed us with our miracle baby boy after 4 years of waiting. We give all glory to Jesus.',
    isConfidential: false,
    status: 'answered',
    submittedAt: 'October 12, 2026',
    pastoralNotes: 'Testimony shared during Sunday Thanksgiving Service!'
  }
];

// Initial Seed Visitor Inquiries
export const SEED_VISITOR_INQUIRIES: VisitorInquiryRecord[] = [
  {
    id: 'inquiry-1',
    fullName: 'Marcus & Keisha Washington',
    email: 'marcus.w@example.com',
    phone: '(973) 555-9012',
    inquiryType: 'Plan a Visit',
    message: 'We recently moved to Roselle from Brooklyn and have two children (ages 6 and 9). We are planning to attend this Sunday 10 AM service.',
    status: 'contacted',
    submittedAt: 'October 14, 2026',
    assignedTo: 'Deaconess Ade',
    pastoralNotes: 'Welcome packet prepared. Reserved seating arranged with Ushers.'
  },
  {
    id: 'inquiry-2',
    fullName: 'Sarah Jenkins',
    email: 'sjenkins@example.com',
    phone: '(908) 555-4421',
    inquiryType: 'First-Time Guest',
    message: 'Interested in joining the midweek Digging Deep Bible study online via Zoom. Could you email me the link?',
    status: 'new',
    submittedAt: 'October 15, 2026',
    assignedTo: 'Media Team',
  },
  {
    id: 'inquiry-3',
    fullName: 'Pastor Johnathan Clarke',
    email: 'jclarke@communityoutreach.org',
    phone: '(862) 555-7765',
    inquiryType: 'Serve With Us',
    message: 'We would love to partner with your Roselle Food Pantry outreach on Saturday with fresh produce boxes.',
    status: 'welcomed',
    submittedAt: 'October 11, 2026',
    assignedTo: 'Outreach Director',
    pastoralNotes: 'Partnership confirmed for 4th Saturday.'
  }
];

// Initial Announcement Banner
export const DEFAULT_ANNOUNCEMENT: AnnouncementBanner = {
  id: 'announcement-theme-2026',
  isActive: true,
  message: 'Special Holy Communion & Anointing Service this Wednesday at 7:00 PM — Come expecting divine turnaround!',
  type: 'celebration',
  actionLabel: 'View Schedule',
  targetTab: 'home',
};

// Storage Keys
const STORAGE_KEYS = {
  EVENTS: 'rccg_kfa_admin_events',
  VIDEOS: 'rccg_kfa_custom_videos',
  EBOOKS: 'rccg_kfa_admin_ebooks',
  PRAYERS: 'rccg_kfa_admin_prayers',
  INQUIRIES: 'rccg_kfa_admin_inquiries',
  ANNOUNCEMENT: 'rccg_kfa_admin_announcement',
  AUTH: 'rccg_kfa_admin_auth_state',
};

// LocalStorage Helpers
export function getStoredEvents(): ChurchEvent[] {
  if (typeof window === 'undefined') return SEED_CHURCH_EVENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading events:', e);
  }
  return SEED_CHURCH_EVENTS;
}

export function saveStoredEvents(events: ChurchEvent[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  } catch (e) {
    console.error('Error saving events:', e);
  }
}

export function getStoredPrayers(): PrayerRequestRecord[] {
  if (typeof window === 'undefined') return SEED_PRAYER_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRAYERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading prayers:', e);
  }
  return SEED_PRAYER_REQUESTS;
}

export function saveStoredPrayers(prayers: PrayerRequestRecord[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(prayers));
  } catch (e) {
    console.error('Error saving prayers:', e);
  }
}

export function addLivePrayerRequest(req: { name: string; email: string; phone?: string; category: string; requestText: string; isConfidential: boolean }) {
  const current = getStoredPrayers();
  const newRecord: PrayerRequestRecord = {
    id: `prayer-${Date.now()}`,
    ...req,
    status: 'new',
    submittedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
  const updated = [newRecord, ...current];
  saveStoredPrayers(updated);
  return newRecord;
}

export function getStoredInquiries(): VisitorInquiryRecord[] {
  if (typeof window === 'undefined') return SEED_VISITOR_INQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading inquiries:', e);
  }
  return SEED_VISITOR_INQUIRIES;
}

export function saveStoredInquiries(inquiries: VisitorInquiryRecord[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  } catch (e) {
    console.error('Error saving inquiries:', e);
  }
}

export function addLiveVisitorInquiry(inquiry: { fullName: string; email: string; phone?: string; inquiryType: string; message: string }) {
  const current = getStoredInquiries();
  const newRecord: VisitorInquiryRecord = {
    id: `inquiry-${Date.now()}`,
    ...inquiry,
    status: 'new',
    submittedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
  const updated = [newRecord, ...current];
  saveStoredInquiries(updated);
  return newRecord;
}

export function getStoredAnnouncement(): AnnouncementBanner {
  if (typeof window === 'undefined') return DEFAULT_ANNOUNCEMENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading announcement:', e);
  }
  return DEFAULT_ANNOUNCEMENT;
}

export function saveStoredAnnouncement(banner: AnnouncementBanner) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(banner));
  } catch (e) {
    console.error('Error saving announcement:', e);
  }
}

export function getAdminAuth(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'authenticated';
  } catch {
    return false;
  }
}

export function setAdminAuth(authenticated: boolean) {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  } catch {
    // no-op
  }
}

export function resetAllToDefaults() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.EVENTS);
  localStorage.removeItem(STORAGE_KEYS.VIDEOS);
  localStorage.removeItem(STORAGE_KEYS.EBOOKS);
  localStorage.removeItem(STORAGE_KEYS.PRAYERS);
  localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENT);
}
