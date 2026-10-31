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
import { usePublicContent } from '../hooks/usePublicContent';
import { ContentStatus } from './ContentStatus';
import { addLiveVisitorInquiry } from '../utils/adminStore';
import { errorMessage } from '../utils/api';
import { PageHero } from './PageHero';

interface ChurchCalendarSectionProps {
  onOpenPlanVisit: () => void;
}

const EVENT_DISPLAY_ORDER = [
  'midweek-bible-study',
  'sunday-worship',
  'evangelism-outreach-second-sunday',
  'evangelism-outreach-fourth-sunday',
  'cross-over-service-2026',
];

export const ChurchCalendarSection: React.FC<ChurchCalendarSectionProps> = ({
  onOpenPlanVisit
}) => {
  const { items: eventsList, loading, error } = usePublicContent<ChurchEvent>('events');
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'agenda'>('grid');

  // Modal RSVP state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpGuestCount, setRsvpGuestCount] = useState('1');
  const [rsvpError, setRsvpError] = useState('');
  const [rsvpBusy, setRsvpBusy] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Filter events based on category and search text
  const filteredEvents = useMemo(() => {
    return eventsList
      .filter((evt) => {
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
      })
      .sort((left, right) => {
        const leftRank = EVENT_DISPLAY_ORDER.indexOf(left.id);
        const rightRank = EVENT_DISPLAY_ORDER.indexOf(right.id);
        return (leftRank < 0 ? Number.MAX_SAFE_INTEGER : leftRank) -
          (rightRank < 0 ? Number.MAX_SAFE_INTEGER : rightRank);
      });
  }, [eventsList, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<EventCategory, number> = {
      all: eventsList.length,
      worship: 0,
      'bible-study': 0,
      outreach: 0,
      special: 0
    };
    eventsList.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, [eventsList]);

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
    setRsvpSuccess(false); setRsvpError('');
    setRsvpName('');
    setRsvpEmail('');
    setRsvpGuestCount('1');
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || rsvpBusy) return;
    setRsvpBusy(true); setRsvpError('');
    try {
      await addLiveVisitorInquiry({ fullName: rsvpName, email: rsvpEmail, inquiryType: 'Event RSVP', message: `RSVP for ${selectedEvent.title} (${selectedEvent.id}). Guests: ${rsvpGuestCount}. Schedule: ${selectedEvent.dayOfWeek}, ${selectedEvent.time}.` });
      setRsvpSuccess(true);
    } catch (err) { setRsvpError(errorMessage(err)); }
    finally { setRsvpBusy(false); }
  };

  return (
    <section id="church-calendar" className="bg-[#fbf8f0] text-[#12372c]">
      <PageHero
        eyebrow="Church Calendar & Upcoming Dates"
        title="Gather, Grow & Serve Together"
        description="Stay connected through Sunday worship, midweek Bible study, prayer, special services, and community outreach in Roselle."
      >
        <button
          onClick={onOpenPlanVisit}
          className="rounded-full bg-[#ed1234] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#cf0d2a]"
        >
          Plan Your First Visit
        </button>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        
        <ContentStatus loading={loading} error={error} />
        {/* 3 Quick Rhythm Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:border-amber-400/60 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                SUNDAY WORSHIP
              </div>
              <div className="text-base font-bold text-[#12372c] mt-0.5">
                Every Sunday · 9:00 AM – 11:30 AM
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Praise, revelatory Word, and Kingdom fellowship at 121 E 2nd Ave.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-400/60 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                DIGGING DEEP
              </div>
              <div className="text-base font-bold text-[#12372c] mt-0.5">
                Wednesdays · 7:00 PM – 8:30 PM
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Verse-by-verse digging deep into Scripture, faith clinic, and prayer.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-400/60 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                EVANGELISM OUTREACH
              </div>
              <div className="text-base font-bold text-[#12372c] mt-0.5">
                2nd &amp; 4th Sundays Monthly
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Sharing the Gospel and Christ&apos;s love throughout Roselle.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar: Categories, Search & View Mode */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xs">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#007450] text-white shadow-xs'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              All Dates ({categoryCounts.all})
            </button>

            <button
              onClick={() => setActiveCategory('bible-study')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer ${
                activeCategory === 'bible-study'
                  ? 'bg-[#007450] text-white shadow-xs'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Bible Studies ({categoryCounts['bible-study']})
            </button>

            <button
              onClick={() => setActiveCategory('outreach')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer ${
                activeCategory === 'outreach'
                  ? 'bg-[#007450] text-white shadow-xs'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Evangelism / Community Outreach ({categoryCounts.outreach})
            </button>

            <button
              onClick={() => setActiveCategory('worship')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer ${
                activeCategory === 'worship'
                  ? 'bg-[#007450] text-white shadow-xs'
                  : 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Worship Services ({categoryCounts.worship})
            </button>

            <button
              onClick={() => setActiveCategory('special')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer ${
                activeCategory === 'special'
                  ? 'bg-[#007450] text-white shadow-xs'
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
                className="w-full pl-8 pr-7 py-2 text-xs bg-stone-50 rounded-xl border border-stone-200 focus:border-emerald-700 focus:outline-hidden text-stone-800 placeholder-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-stone-200 rounded-xl p-1 bg-stone-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('agenda')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === 'agenda'
                    ? 'bg-white text-emerald-900 shadow-xs'
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

        {/* GRID VIEW (Responsive Mobile Grid: 1 col on <360px, 2 col on mobile >= 360px, 3 col on lg) */}
        {viewMode === 'grid' && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => handleOpenEventModal(evt)}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 hover:border-emerald-400/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left relative overflow-hidden"
              >
                {/* Top Banner Accent Line */}
                <div
                  className={`h-1.5 w-full ${
                    evt.category === 'bible-study'
                      ? 'bg-emerald-600'
                      : evt.category === 'outreach'
                      ? 'bg-emerald-600'
                      : evt.category === 'worship'
                      ? 'bg-[#007450]'
                      : 'bg-purple-600'
                  }`}
                />

                <div className="p-3 xs:p-3.5 sm:p-6">
                  {/* Date Badge and Clean Metadata Bar */}
                  <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2.5 sm:mb-4">
                    {/* Editorial Calendar Date Tile */}
                    <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-lg sm:rounded-xl w-11 h-13 xs:w-12 xs:h-14 sm:w-14 sm:h-16 flex flex-col items-center justify-center shrink-0 group-hover:border-emerald-400/80 transition-colors">
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-700 leading-none">
                        {evt.dateBadge.month}
                      </span>
                      <span className="text-sm xs:text-base sm:text-xl font-bold text-[#12372c] leading-tight my-0.5">
                        {evt.dateBadge.day}
                      </span>
                      <span className="text-[7px] sm:text-[8px] tracking-widest text-slate-500 uppercase leading-none font-semibold">
                        {evt.dateBadge.subtext || 'EVENT'}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0 text-right">
                      <span className="inline-block text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 truncate max-w-full">
                        {evt.categoryLabel} {evt.status && evt.status !== 'scheduled' ? ` · ${evt.status}` : ''}
                      </span>
                      <div className="text-[10px] xs:text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                        {evt.frequency}
                      </div>
                    </div>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-bold text-xs xs:text-sm sm:text-lg text-[#12372c] group-hover:text-[#007450] transition-colors leading-snug mb-1.5 sm:mb-2 line-clamp-2">
                    {evt.title}
                  </h3>

                  {/* Time & Location Metadata */}
                  <div className="space-y-1 text-[10px] xs:text-[11px] sm:text-xs text-slate-600 mb-2 sm:mb-3">
                    <div className="flex items-center gap-1.5 truncate">
                      <Clock className="w-3 h-3 text-[#007450] shrink-0" />
                      <span className="truncate">{evt.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>

                    {evt.isOnlineAvailable && (
                      <div className="flex items-center gap-1.5 text-slate-500 truncate">
                        <Tv className="w-3 h-3 text-red-500 shrink-0" />
                        <span className="text-[9px] xs:text-[10px] sm:text-[11px] truncate">Streamed on {evt.onlinePlatform}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2 font-sans">
                    {evt.description}
                  </p>

                  {/* Scripture Anchor / Theme */}
                  {evt.scriptureRef && (
                    <div className="text-[9px] xs:text-[10px] sm:text-[11px] italic text-[#007450] bg-emerald-50/70 rounded border-l-2 border-[#007450] px-2 py-1 mb-2 truncate">
                      {evt.scriptureRef}
                    </div>
                  )}

                  {/* Highlight bullets */}
                  {evt.highlights && evt.highlights.length > 0 && (
                    <ul className="space-y-0.5 mb-1 hidden sm:block">
                      {evt.highlights.slice(0, 2).map((hl, i) => (
                        <li key={i} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                          <span className="text-[#007450] mt-0.5">•</span>
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="bg-slate-50 border-t border-slate-100 px-3 xs:px-3.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between text-[10px] xs:text-[11px] sm:text-xs">
                  {/* Add to Calendar Action */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadCustomEventIcs(evt);
                      }}
                      title="Download iCal / Outlook event"
                      className="p-1 rounded text-slate-500 hover:text-[#007450] hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    >
                      <Download className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                    </button>

                    <a
                      href={getCustomEventGoogleCalendarUrl(evt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Add to Google Calendar"
                      className="p-1 rounded text-slate-500 hover:text-[#007450] hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer inline-flex items-center"
                    >
                      <CalendarPlus className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={(e) => handleShareEvent(evt, e)}
                      title="Copy event details"
                      className="p-1 rounded text-slate-500 hover:text-[#007450] hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    >
                      {copiedId === evt.id ? (
                        <Check className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* View Details / RSVP link */}
                  <span className="font-semibold text-[#007450] group-hover:text-[#005c40] flex items-center gap-0.5 sm:gap-1 transition-colors text-[10px] xs:text-[11px] sm:text-xs">
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
                        {evt.categoryLabel} {evt.status && evt.status !== 'scheduled' ? ` · ${evt.status}` : ''}
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
                    {rsvpError && <p role="alert" className="text-red-700">{rsvpError}</p>}
                    {rsvpBusy && <p role="status">Sending your RSVP…</p>}
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
                        type="submit" disabled={rsvpBusy}
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
