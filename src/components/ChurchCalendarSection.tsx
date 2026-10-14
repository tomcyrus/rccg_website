import React, { useState, useMemo } from 'react';
import { ChurchEvent, EventCategory } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Tv, 
  BookOpen, 
  HeartHandshake, 
  Sparkles, 
  Users, 
  Share2, 
  Download, 
  Check, 
  ChevronRight, 
  Search, 
  Filter, 
  ExternalLink,
  X,
  CheckCircle2,
  CalendarPlus
} from 'lucide-react';
import { downloadCustomEventIcs, getCustomEventGoogleCalendarUrl } from '../utils/calendar';

interface ChurchCalendarSectionProps {
  onOpenPlanVisit: () => void;
}

export const CHURCH_EVENTS: ChurchEvent[] = [
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
    time: '9:00 AM – 11:30 AM EST',
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
    rsvpRequired: false
  },
  {
    id: 'midweek-bible-study',
    title: 'Digging Deep: Midweek Bible Study',
    category: 'bible-study',
    categoryLabel: 'Bible Study',
    dateBadge: {
      month: 'WED',
      day: '21',
      subtext: 'WEEKLY'
    },
    dayOfWeek: 'Every Wednesday',
    time: '7:00 PM – 8:30 PM EST',
    frequency: 'Weekly on Wednesday Evenings',
    location: 'Sanctuary & Zoom Live Stream',
    isOnlineAvailable: true,
    onlinePlatform: 'Zoom & YouTube Stream',
    scriptureRef: '2 Timothy 2:15 · Psalm 119:105',
    description: 'An interactive, verse-by-verse exploration of Scripture. Bring your questions, study notes, and an open heart to grow deep roots in Christ.',
    highlights: [
      'Interactive Q&A and group reflections',
      'Current series: Walking in Kingdom Authority (Ephesians)',
      'Digital study guides provided weekly',
      'Live chat interaction for online participants'
    ],
    coordinator: 'Bible Teaching Ministry',
    audience: 'Believers, seekers, and Bible students',
    rsvpRequired: false
  },
  {
    id: 'community-food-pantry',
    title: 'Roselle Community Food Pantry & Grocery Drive',
    category: 'outreach',
    categoryLabel: 'Community Outreach',
    dateBadge: {
      month: 'SAT',
      day: '24',
      subtext: 'OUTREACH'
    },
    dayOfWeek: '2nd & 4th Saturday',
    time: '10:00 AM – 1:00 PM EST',
    frequency: 'Bi-Weekly Saturday Outreach',
    location: 'Church Fellowship Hall & Roselle Community Center',
    isOnlineAvailable: false,
    scriptureRef: 'Matthew 25:35 · 1 John 3:18',
    description: 'Sharing Christ\'s love through practical assistance. Distributing fresh groceries, pantry staples, and fresh produce to our Roselle neighbors in need.',
    highlights: [
      'No ID or pre-registration required for families',
      'Volunteer loading & distribution opportunities',
      'Prayer station available for anyone needing personal prayer',
      'Partnered with local Union County food banks'
    ],
    coordinator: 'Outreach & Benevolence Committee',
    audience: 'Open to the entire public / All volunteers welcome',
    rsvpRequired: false
  },
  {
    id: 'holy-ghost-vigil',
    title: 'Monthly Holy Ghost Night & Breakthrough Vigil',
    category: 'special',
    categoryLabel: 'Special Gathering',
    dateBadge: {
      month: 'FRI',
      day: '06',
      subtext: 'MONTHLY'
    },
    dayOfWeek: '1st Friday of the Month',
    time: '10:00 PM – 2:00 AM EST',
    frequency: 'Monthly Prophetic Prayer Night',
    location: 'Sanctuary · 121 E 2nd Ave, Roselle, NJ',
    isOnlineAvailable: true,
    onlinePlatform: 'RCCG KFA YouTube Broadcast',
    scriptureRef: 'Acts 16:25-26 · Isaiah 43:19',
    description: 'An intensive night of apostolic worship, fervent intercessory prayer, deliverance, prophetic decree, and thanksgiving testimonies.',
    highlights: [
      'Midnight praise & thanksgiving offering',
      'Individual pastoral laying of hands & anointing',
      'Testimonies of answered prayers and miracles',
      'Quiet prayer sanctuary open prior at 9:30 PM'
    ],
    coordinator: 'Prayer & Intercession Department',
    audience: 'All seeking spiritual breakthrough & renewal',
    rsvpRequired: false
  },
  {
    id: 'faith-foundations-class',
    title: 'Faith Foundations & Believers Discipleship',
    category: 'bible-study',
    categoryLabel: 'Bible Study',
    dateBadge: {
      month: 'SUN',
      day: '25',
      subtext: 'MORNING'
    },
    dayOfWeek: 'Sundays Before Service',
    time: '8:15 AM – 8:50 AM EST',
    frequency: 'Sunday Pre-Service Class',
    location: 'Training Room 2 & Online Hybrid',
    isOnlineAvailable: true,
    onlinePlatform: 'Class Google Meet',
    scriptureRef: 'Hebrews 6:1-2 · Romans 12:2',
    description: 'A 6-week structured foundational course covering core Christian doctrines: salvation, water baptism, prayer, stewardship, and finding your calling.',
    highlights: [
      'Course syllabus and workbook included',
      'Graduation certificate and ministry placement',
      'Ideal for new converts and believers desiring strong foundation'
    ],
    coordinator: 'Discipleship & Training Academy',
    audience: 'New members & all growing disciples',
    rsvpRequired: true
  },
  {
    id: 'seniors-care-visitation',
    title: 'Roselle Seniors & Neighbor Care Outreach',
    category: 'outreach',
    categoryLabel: 'Community Outreach',
    dateBadge: {
      month: 'SAT',
      day: '31',
      subtext: 'OUTREACH'
    },
    dayOfWeek: '3rd Saturday Monthly',
    time: '11:00 AM – 2:00 PM EST',
    frequency: 'Monthly Care Outreach',
    location: 'Roselle Senior Living & Union County Residences',
    isOnlineAvailable: false,
    scriptureRef: 'James 1:27 · Leviticus 19:32',
    description: 'Visiting local nursing homes and homebound seniors with hymn singing, personal friendship, care packages, and reading scriptures together.',
    highlights: [
      'Distribution of handwritten encouraging greeting cards',
      'Hymn singing & acoustic worship songs',
      'Care packages containing personal toiletries and gifts',
      'Family and youth participation encouraged'
    ],
    coordinator: 'Visitation & Pastoral Care Ministry',
    audience: 'Volunteers and carpool teams',
    rsvpRequired: true
  },
  {
    id: 'youth-ignite-fellowship',
    title: 'Ignite: Youth & Young Adults Fellowship',
    category: 'special',
    categoryLabel: 'Special Gathering',
    dateBadge: {
      month: 'FRI',
      day: '13',
      subtext: 'YOUTH'
    },
    dayOfWeek: 'Alternate Fridays',
    time: '7:00 PM – 9:00 PM EST',
    frequency: 'Bi-Weekly Friday Gathering',
    location: 'Church Fellowship Hall',
    isOnlineAvailable: false,
    scriptureRef: '1 Timothy 4:12 · Ecclesiastes 12:1',
    description: 'An energetic, candid space for teens and young professionals to tackle real-world topics, faith questions, career purpose, and contemporary worship.',
    highlights: [
      'Panel discussions & roundtable discussions',
      'Acoustic praise, spoken word, and creative arts',
      'Pizza, refreshments, and casual social connection',
      'College & career mentorship network'
    ],
    coordinator: 'Kingdom Ignite Youth Leaders',
    audience: 'Teens, College Students, and Young Adults (13–35)',
    rsvpRequired: false
  },
  {
    id: 'back-to-school-family-fair',
    title: 'Family Care & Warmth Clothing Drive',
    category: 'outreach',
    categoryLabel: 'Community Outreach',
    dateBadge: {
      month: 'SAT',
      day: '14',
      subtext: 'COMMUNITY'
    },
    dayOfWeek: 'Seasonal Outreach Saturday',
    time: '11:00 AM – 3:00 PM EST',
    frequency: 'Community Seasonal Event',
    location: '121 E 2nd Ave Sanctuary Grounds',
    isOnlineAvailable: false,
    scriptureRef: 'Galatians 6:10 · Proverbs 19:17',
    description: 'Providing winter coats, warm clothing, student supplies, and warm hot cocoa packages to families in Roselle, Linden, and Elizabeth.',
    highlights: [
      'Free gently used and brand-new winter clothing',
      'Hot soup & family lunch served on-site',
      'Kids craft station and Christian story corner',
      'All supplies distributed completely free of charge'
    ],
    coordinator: 'Evangelism & Community Action Team',
    audience: 'Open to the entire community',
    rsvpRequired: false
  },
  {
    id: 'thanksgiving-anointing-service',
    title: 'Thanksgiving, Anointing & Baby Dedication Service',
    category: 'worship',
    categoryLabel: 'Worship Service',
    dateBadge: {
      month: 'SUN',
      day: '01',
      subtext: 'SPECIAL'
    },
    dayOfWeek: '1st Sunday of the Month',
    time: '9:00 AM – 11:45 AM EST',
    frequency: '1st Sunday Monthly Celebration',
    location: 'Main Sanctuary · 121 E 2nd Ave, Roselle, NJ',
    isOnlineAvailable: true,
    onlinePlatform: 'Live on YouTube & Facebook',
    scriptureRef: 'Psalm 107:1 · James 5:14',
    description: 'A grand celebration service thanking God for preserving our lives, dedicated prayer for newborns and families, and prophetic anointing for the new month.',
    highlights: [
      'Thanksgiving dance & corporate praise offering',
      'Consecration anointing oil service for families',
      'Baby & child dedication ceremonies',
      'Community thanksgiving lunch following service'
    ],
    coordinator: 'Senior Pastoral Board',
    audience: 'Entire church family and friends',
    rsvpRequired: false
  }
];

export const ChurchCalendarSection: React.FC<ChurchCalendarSectionProps> = ({
  onOpenPlanVisit
}) => {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'agenda'>('grid');

  // Modal RSVP state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpGuestCount, setRsvpGuestCount] = useState('1');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Filter events based on category and search text
  const filteredEvents = useMemo(() => {
    return CHURCH_EVENTS.filter((evt) => {
      const matchesCategory = activeCategory === 'all' || evt.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.location.toLowerCase().includes(q) ||
        evt.categoryLabel.toLowerCase().includes(q) ||
        (evt.scriptureRef && evt.scriptureRef.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<EventCategory, number> = {
      all: CHURCH_EVENTS.length,
      worship: 0,
      'bible-study': 0,
      outreach: 0,
      special: 0
    };
    CHURCH_EVENTS.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleShareEvent = (event: ChurchEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `${event.title} - ${event.dayOfWeek} at ${event.time} | RCCG Kingdom First Assembly, 121 E 2nd Ave, Roselle, NJ`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(event.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleOpenEventModal = (event: ChurchEvent) => {
    setSelectedEvent(event);
    setRsvpSuccess(false);
    setRsvpName('');
    setRsvpEmail('');
    setRsvpGuestCount('1');
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;
    setRsvpSuccess(true);
  };

  return (
    <section id="church-calendar" className="py-20 bg-[#FAF8F5] border-t border-[#E8E3DC] text-[#161722]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#A5682C] mb-3">
            <CalendarIcon className="w-4 h-4 text-[#A5682C]" />
            <span>CHURCH CALENDAR & UPCOMING DATES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#161722] tracking-tight leading-tight mb-4">
            Fellowship, Growth & Service in Our Community
          </h2>

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Stay connected with upcoming worship celebrations, weekly Bible studies, and neighborhood outreach programs at RCCG Kingdom First Assembly in Roselle, NJ.
          </p>
        </div>

        {/* 3 Quick Rhythm Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 border border-[#EBE7E1] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-[#FAF4ED] text-[#A5682C] flex items-center justify-center shrink-0 border border-[#F0E4D3]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-[#A5682C]">
                SUNDAY WORSHIP
              </div>
              <div className="text-sm font-bold text-[#161722] mt-0.5">
                Every Sunday · 9:00 AM EST
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Praise, revelation Word, and Kingdom fellowship at 121 E 2nd Ave.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 border border-[#EBE7E1] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-[#FAF4ED] text-[#A5682C] flex items-center justify-center shrink-0 border border-[#F0E4D3]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-[#A5682C]">
                MIDWEEK BIBLE STUDY
              </div>
              <div className="text-sm font-bold text-[#161722] mt-0.5">
                Wednesdays · 7:00 PM EST
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Verse-by-verse digging deep into Scripture, discussion, and prayer.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 border border-[#EBE7E1] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-[#FAF4ED] text-[#A5682C] flex items-center justify-center shrink-0 border border-[#F0E4D3]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-[#A5682C]">
                COMMUNITY OUTREACH
              </div>
              <div className="text-sm font-bold text-[#161722] mt-0.5">
                2nd & 4th Saturdays Monthly
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Food pantry, coat drives, and practical benevolence in Roselle.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar: Categories, Search & View Mode */}
        <div className="bg-white border border-[#E2DDD5] p-3 sm:p-4 mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xs">
          
          {/* Category Filter Buttons (Functional Buttons, No Static Pills) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-2 text-xs font-condensed font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#161722] text-[#FFD2A4]'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              All Dates ({categoryCounts.all})
            </button>

            <button
              onClick={() => setActiveCategory('bible-study')}
              className={`px-3 py-2 text-xs font-condensed font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                activeCategory === 'bible-study'
                  ? 'bg-[#161722] text-[#FFD2A4]'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Bible Studies ({categoryCounts['bible-study']})
            </button>

            <button
              onClick={() => setActiveCategory('outreach')}
              className={`px-3 py-2 text-xs font-condensed font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                activeCategory === 'outreach'
                  ? 'bg-[#161722] text-[#FFD2A4]'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Community Outreach ({categoryCounts.outreach})
            </button>

            <button
              onClick={() => setActiveCategory('worship')}
              className={`px-3 py-2 text-xs font-condensed font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                activeCategory === 'worship'
                  ? 'bg-[#161722] text-[#FFD2A4]'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Worship Services ({categoryCounts.worship})
            </button>

            <button
              onClick={() => setActiveCategory('special')}
              className={`px-3 py-2 text-xs font-condensed font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                activeCategory === 'special'
                  ? 'bg-[#161722] text-[#FFD2A4]'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Special Gatherings ({categoryCounts.special})
            </button>
          </div>

          {/* Right Controls: Search & View Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#FAF8F5] border border-stone-200 focus:border-[#A5682C] focus:outline-hidden text-stone-800 placeholder-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-stone-200 p-0.5 bg-[#FAF8F5]">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 text-[11px] font-condensed font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('agenda')}
                className={`px-2.5 py-1 text-[11px] font-condensed font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === 'agenda'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Agenda
              </button>
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredEvents.length === 0 && (
          <div className="bg-white border border-[#E2DDD5] p-12 text-center max-w-lg mx-auto">
            <CalendarIcon className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-stone-800 mb-1">
              No matching dates found
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Try adjusting your search keyword or selecting "All Dates" to see the full calendar.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-condensed font-bold uppercase tracking-wider bg-[#161722] text-[#FFD2A4] hover:bg-stone-800"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* GRID VIEW (Clean, Grid-Based Layout) */}
        {viewMode === 'grid' && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => handleOpenEventModal(evt)}
                className="bg-white border border-[#E5E0DA] hover:border-[#A5682C]/70 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group text-left relative overflow-hidden"
              >
                {/* Top Banner Accent Line */}
                <div
                  className={`h-1 w-full ${
                    evt.category === 'bible-study'
                      ? 'bg-[#1E3A8A]'
                      : evt.category === 'outreach'
                      ? 'bg-[#047857]'
                      : evt.category === 'worship'
                      ? 'bg-[#A5682C]'
                      : 'bg-[#9333EA]'
                  }`}
                />

                <div className="p-6">
                  {/* Date Badge and Clean Metadata Bar (Anti-Slop: No Pills) */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Editorial Calendar Date Tile */}
                    <div className="bg-[#FAF8F5] border border-[#E8E2D9] w-14 h-15 flex flex-col items-center justify-center shrink-0 group-hover:border-[#A5682C]/50 transition-colors">
                      <span className="text-[10px] font-condensed font-bold uppercase tracking-wider text-[#A5682C] leading-none">
                        {evt.dateBadge.month}
                      </span>
                      <span className="text-xl font-bold font-serif text-[#161722] leading-tight">
                        {evt.dateBadge.day}
                      </span>
                      <span className="text-[8px] font-condensed tracking-widest text-stone-400 uppercase leading-none">
                        {evt.dateBadge.subtext || 'EVENT'}
                      </span>
                    </div>

                    {/* Quiet Unboxed Metadata */}
                    <div className="flex-1 min-w-0 text-right">
                      <div className="text-[11px] font-condensed font-bold uppercase tracking-wider text-[#A5682C]">
                        {evt.categoryLabel}
                      </div>
                      <div className="text-xs text-stone-500 font-medium truncate mt-0.5">
                        {evt.frequency}
                      </div>
                    </div>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#161722] group-hover:text-[#A5682C] transition-colors leading-snug mb-3">
                    {evt.title}
                  </h3>

                  {/* Time & Location Metadata */}
                  <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>

                    {evt.isOnlineAvailable && (
                      <div className="flex items-center gap-2 text-stone-500">
                        <Tv className="w-3.5 h-3.5 text-[#A5682C] shrink-0" />
                        <span className="text-[11px]">Streamed on {evt.onlinePlatform}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                    {evt.description}
                  </p>

                  {/* Scripture Anchor / Theme */}
                  {evt.scriptureRef && (
                    <div className="text-[11px] font-serif italic text-stone-500 border-l-2 border-[#FFD2A4] pl-2.5 py-0.5 mb-4">
                      {evt.scriptureRef}
                    </div>
                  )}

                  {/* Highlight bullets (first 2) */}
                  {evt.highlights && evt.highlights.length > 0 && (
                    <ul className="space-y-1 mb-2">
                      {evt.highlights.slice(0, 2).map((hl, i) => (
                        <li key={i} className="text-[11px] text-stone-500 flex items-start gap-1.5">
                          <span className="text-[#A5682C] mt-0.5">▪</span>
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="bg-[#FAF8F5] border-t border-[#EAE5DF] px-6 py-3.5 flex items-center justify-between text-xs">
                  {/* Add to Calendar Action */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadCustomEventIcs(evt);
                      }}
                      title="Download iCal / Outlook event"
                      className="p-1.5 text-stone-500 hover:text-[#A5682C] hover:bg-white border border-transparent hover:border-stone-200 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={getCustomEventGoogleCalendarUrl(evt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Add to Google Calendar"
                      className="p-1.5 text-stone-500 hover:text-[#A5682C] hover:bg-white border border-transparent hover:border-stone-200 transition-colors cursor-pointer inline-flex items-center"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={(e) => handleShareEvent(evt, e)}
                      title="Copy event details"
                      className="p-1.5 text-stone-500 hover:text-[#A5682C] hover:bg-white border border-transparent hover:border-stone-200 transition-colors cursor-pointer"
                    >
                      {copiedId === evt.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* View Details / RSVP link */}
                  <span className="font-condensed font-bold uppercase tracking-wider text-[11px] text-[#A5682C] group-hover:text-[#161722] flex items-center gap-1 transition-colors">
                    Details & RSVP
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AGENDA LIST VIEW */}
        {viewMode === 'agenda' && filteredEvents.length > 0 && (
          <div className="bg-white border border-[#E5E0DA] divide-y divide-[#EAE5DF]">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => handleOpenEventModal(evt)}
                className="p-4 sm:p-6 hover:bg-[#FAF8F5] transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group"
              >
                {/* Left: Date Tile & Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-[#FAF8F5] group-hover:bg-white border border-[#E5E0DA] w-14 h-14 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-condensed font-bold uppercase tracking-wider text-[#A5682C] leading-none">
                      {evt.dateBadge.month}
                    </span>
                    <span className="text-lg font-bold font-serif text-[#161722] leading-tight">
                      {evt.dateBadge.day}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-condensed font-bold uppercase text-[#A5682C]">
                        {evt.categoryLabel}
                      </span>
                      <span>·</span>
                      <span>{evt.frequency}</span>
                    </div>

                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#161722] group-hover:text-[#A5682C] transition-colors mt-0.5">
                      {evt.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {evt.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {evt.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadCustomEventIcs(evt);
                    }}
                    className="px-2.5 py-1 text-xs border border-stone-200 hover:border-stone-400 text-stone-600 bg-white inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>.ICS</span>
                  </button>

                  <a
                    href={getCustomEventGoogleCalendarUrl(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 text-xs border border-stone-200 hover:border-stone-400 text-stone-600 bg-white inline-flex items-center gap-1"
                  >
                    <CalendarPlus className="w-3 h-3" />
                    <span>Google Cal</span>
                  </a>

                  <button
                    onClick={() => handleOpenEventModal(evt)}
                    className="px-3 py-1 text-xs font-condensed font-bold uppercase tracking-wider bg-[#161722] text-[#FFD2A4] hover:bg-stone-800"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner with Plan Visit and Subscribe */}
        <div className="mt-12 bg-[#161722] text-white p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-[11px] font-condensed font-bold uppercase tracking-[0.2em] text-[#FFD2A4]">
              PLANNING TO VISIT US IN ROSELLE?
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              We Reserve a VIP Welcome for First-Time Guests
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Let our hospitality team know you're coming so we can reserve front parking, save seats for your family, and prepare a welcome gift.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenPlanVisit}
              className="px-5 py-2.5 text-xs font-condensed font-bold uppercase tracking-widest bg-[#FFD2A4] text-[#0D0D0D] hover:bg-[#E5BE94] transition-colors cursor-pointer shadow-md font-bold"
            >
              Plan Your Visit
            </button>

            <a
              href="https://www.google.com/maps/search/?api=1&query=121+E+2nd+Ave+Roselle+NJ+07203"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-condensed font-bold uppercase tracking-widest text-white border border-white/20 hover:border-[#FFD2A4] hover:text-[#FFD2A4] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

      </div>

      {/* EVENT DETAIL & RSVP MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#161722] text-white p-6 relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-[#FFD2A4] mb-1">
                {selectedEvent.categoryLabel} · {selectedEvent.frequency}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white pr-8">
                {selectedEvent.title}
              </h3>

              {selectedEvent.scriptureRef && (
                <div className="text-xs font-serif italic text-stone-300 mt-2">
                  Scripture Anchor: {selectedEvent.scriptureRef}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Event Time, Location, Audience Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 border border-stone-200 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#A5682C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-stone-900">Date & Time</span>
                    <span>{selectedEvent.dayOfWeek}</span>
                    <span className="block text-stone-500">{selectedEvent.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#A5682C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-stone-900">Location</span>
                    <span>{selectedEvent.location}</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedEvent.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A5682C] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {selectedEvent.coordinator && (
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-[#A5682C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-stone-900">Host / Department</span>
                      <span>{selectedEvent.coordinator}</span>
                    </div>
                  </div>
                )}

                {selectedEvent.audience && (
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#A5682C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-stone-900">Who May Attend</span>
                      <span>{selectedEvent.audience}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-condensed font-bold uppercase tracking-wider text-stone-500 mb-2">
                  ABOUT THIS GATHERING
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Key Highlights */}
              {selectedEvent.highlights && (
                <div>
                  <h4 className="text-xs font-condensed font-bold uppercase tracking-wider text-stone-500 mb-2">
                    WHAT TO EXPECT & HIGHLIGHTS
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedEvent.highlights.map((item, idx) => (
                      <li key={idx} className="text-xs text-stone-700 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Add to Calendar Bar */}
              <div className="bg-[#F5F2F0] p-4 border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-stone-800">
                  Save this date to your personal calendar:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadCustomEventIcs(selectedEvent)}
                    className="px-3 py-1.5 text-xs font-condensed font-bold uppercase tracking-wider bg-white border border-stone-300 hover:border-stone-500 text-stone-800 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-[#A5682C]" />
                    <span>Download .ICS</span>
                  </button>

                  <a
                    href={getCustomEventGoogleCalendarUrl(selectedEvent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-condensed font-bold uppercase tracking-wider bg-white border border-stone-300 hover:border-stone-500 text-stone-800 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <CalendarPlus className="w-3 h-3 text-[#A5682C]" />
                    <span>Google Cal</span>
                  </a>
                </div>
              </div>

              {/* RSVP / Plan to Attend Form */}
              <div className="border-t border-stone-200 pt-6">
                <h4 className="text-sm font-serif font-bold text-[#161722] mb-1">
                  Plan to Attend? Let Us Know
                </h4>
                <p className="text-xs text-stone-500 mb-4">
                  RSVPs help our ushers prepare seating and materials. No account or fees required.
                </p>

                {rsvpSuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-emerald-900">
                        Thank you, {rsvpName}! Your attendance note is received.
                      </p>
                      <p className="mt-1">
                        We look forward to fellowshipping with you at <strong>{selectedEvent.title}</strong>!
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-condensed font-bold uppercase tracking-wider text-stone-600 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={rsvpName}
                          onChange={(e) => setRsvpName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#A5682C] focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-condensed font-bold uppercase tracking-wider text-stone-600 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={rsvpEmail}
                          onChange={(e) => setRsvpEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#A5682C] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-1">
                      <div className="flex items-center gap-2 text-xs text-stone-600">
                        <label className="text-[11px] font-condensed font-bold uppercase tracking-wider">
                          Number of Attendees:
                        </label>
                        <select
                          value={rsvpGuestCount}
                          onChange={(e) => setRsvpGuestCount(e.target.value)}
                          className="px-2 py-1 border border-stone-300 text-xs bg-white"
                        >
                          <option value="1">Just Me (1)</option>
                          <option value="2">2 Persons</option>
                          <option value="3">3 Persons</option>
                          <option value="4+">Family / Group (4+)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-condensed font-bold uppercase tracking-widest bg-[#161722] text-[#FFD2A4] hover:bg-stone-800 transition-colors cursor-pointer font-bold"
                      >
                        Confirm Attendance
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-[#FAF8F5] border-t border-stone-200 px-6 py-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedEvent(null);
                  onOpenPlanVisit();
                }}
                className="text-xs font-condensed font-bold uppercase tracking-wider text-[#A5682C] hover:underline"
              >
                Need Personalized Visit Assistance? →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
