export type PageTab = 'home' | 'about' | 'gallery' | 'connect';

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

export interface ChurchEvent {
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
}

