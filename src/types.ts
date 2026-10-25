export type PageTab = 'home' | 'about' | 'videos' | 'events' | 'gallery' | 'ebooks' | 'connect' | 'contact' | 'admin';

export interface ServiceTime {
  day: string;
  title: string;
  time: string;
  description: string;
}

export interface CoreValue {
  number: string;
  title: string;
  scripture: string;
  description: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: 'Plan a Visit' | 'First-Time Guest' | 'Prayer Request' | 'Bible Study / Fellowship' | 'Serve With Us' | 'General Question';
  message: string;
}

export type EventCategory = 'all' | 'bible-study' | 'outreach' | 'worship' | 'special';

export type EventStatus = 'scheduled' | 'live' | 'completed' | 'postponed';

export interface ChurchEvent {
  revision?: number;
  id: string;
  title: string;
  category: 'bible-study' | 'outreach' | 'worship' | 'special';
  categoryLabel: string;
  dateBadge: {
    month: string;
    day: string;
    subtext?: string;
  };
  dayOfWeek: string;
  time: string;
  frequency: string;
  location: string;
  isOnlineAvailable?: boolean;
  onlinePlatform?: string;
  scriptureRef?: string;
  description: string;
  highlights?: string[];
  coordinator?: string;
  audience?: string;
  rsvpRequired?: boolean;
  status?: EventStatus;
}

export interface PrayerRequestRecord {
  revision?: number;
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  requestText: string;
  isConfidential: boolean;
  status: 'new' | 'interceding' | 'answered' | 'archived';
  submittedAt: string;
  pastoralNotes?: string;
}

export interface VisitorInquiryRecord {
  revision?: number;
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  status: 'new' | 'contacted' | 'welcomed' | 'followed-up';
  submittedAt: string;
  assignedTo?: string;
  pastoralNotes?: string;
}

export interface AnnouncementBanner {
  revision?: number;
  id: string;
  isActive: boolean;
  message: string;
  type: 'notice' | 'urgent' | 'celebration' | 'broadcast';
  actionLabel?: string;
  actionUrl?: string;
  targetTab?: PageTab;
}

export type EbookCategory = 
  | 'all' 
  | 'devotionals' 
  | 'kingdom-living' 
  | 'prayer-fasting' 
  | 'discipleship' 
  | 'faith-encouragement' 
  | 'family-marriage' 
  | 'spiritual-growth';

export interface EbookItem {
  revision?: number;
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorRole?: string;
  category: Exclude<EbookCategory, 'all'>;
  categoryLabel: string;
  accentColor: string; // Hex color for book spine/embellishment
  coverTheme: 'navy-gold' | 'emerald-gold' | 'royal-amber' | 'burgundy-gold' | 'slate-gold';
  badge?: string;
  description: string;
  fullSynopsis: string;
  pages: number;
  format: string;
  readTimeEst: string;
  publicationYear: number;
  rating: number;
  reviewCount: number;
  keyTakeaways: string[];
  tableOfContents: string[];
  sampleChapter: {
    chapterNumber: number;
    title: string;
    keyScripture: string;
    paragraphs: string[];
    reflectionQuestions: string[];
    prayerOfDedication: string;
  };
  isFeatured?: boolean;
}

export type VideoCategory = 
  | 'all' 
  | 'sunday-service' 
  | 'bible-study' 
  | 'worship' 
  | 'holy-ghost' 
  | 'youth' 
  | 'prayer-revival';

export interface YouTubeVideoItem {
  revision?: number;
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  title: string;
  seriesTitle?: string;
  speaker: string;
  speakerRole?: string;
  category: Exclude<VideoCategory, 'all'>;
  categoryLabel: string;
  date: string;
  duration: string;
  scriptureRef?: string;
  description: string;
  keyPoints?: string[];
  isFeatured?: boolean;
  isCustomAdded?: boolean;
}

