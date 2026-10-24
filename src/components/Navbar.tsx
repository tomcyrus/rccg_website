import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { 
  Menu, 
  X, 
  Search, 
  BookOpen, 
  Tv, 
  Calendar, 
  ChevronRight,
  MapPin
} from 'lucide-react';
import { ChurchBrandLogo } from './ChurchBrandLogo';
import { usePublicContent } from '../hooks/usePublicContent';
import { AnnouncementBanner } from '../types';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenPlanVisit: () => void;
  onOpenPrayerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenPlanVisit,
  onOpenPrayerModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const { items: announcements } = usePublicContent<AnnouncementBanner>('announcements');
  const announcement = announcements[0];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    // Route to videos or ebooks with search query
    onSelectTab('videos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Live Announcement (if active & not dismissed) */}
      {announcement?.isActive && !announcementDismissed && (
        <div className={`${{ notice: 'bg-[#063f31]', celebration: 'bg-emerald-900', urgent: 'bg-amber-800', broadcast: 'bg-red-900' }[announcement.type]} text-white text-xs py-2 px-4 border-b border-white/10`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-[#007450] animate-pulse shrink-0" />
              <span className="truncate">{announcement.message}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {announcement.actionLabel && (
                <button
                  onClick={() => {
                    if (announcement.actionUrl) window.open(announcement.actionUrl, '_blank', 'noopener,noreferrer');
                    else if (announcement.targetTab) handleNavClick(announcement.targetTab);
                  }}
                  className="text-xs font-semibold text-[#f4c54b] hover:text-white flex items-center gap-0.5 cursor-pointer"
                >
                  <span>{announcement.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setAnnouncementDismissed(true)}
                className="text-slate-400 hover:text-white"
                aria-label="Dismiss announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main church header */}
      <header className="sticky top-0 z-40 border-b border-[#e8dfc9] bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
          
          {/* Left: Brand Logo & Name (flex-1 & min-w-0 ensures no mobile overflow) */}
          <button
            onClick={() => handleNavClick('home')}
            className="cursor-pointer text-left transition-transform hover:opacity-95 min-w-0 flex-1 sm:flex-initial flex items-center pr-1 sm:pr-2"
            aria-label="RCCG Kingdom First Assembly - Home"
          >
            <ChurchBrandLogo variant="dark" size="md" />
          </button>

          {/* Desktop Navigation Links (hidden on tablets/mobile, visible on lg+) */}
          <nav className="hidden items-center gap-3 text-[11px] font-bold text-[#172334] lg:flex xl:gap-5 xl:text-xs">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'home' ? 'nav-link-active' : 'hover:text-[#007450]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'about' ? 'nav-link-active' : 'hover:text-[#007450]'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('videos')}
              aria-label="Sermons"
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'videos' ? 'nav-link-active' : 'hover:text-[#007450]'
              }`}
            >
              Watch &amp; Messages
            </button>

            <button
              onClick={() => handleNavClick('connect')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'connect' ? 'nav-link-active' : 'hover:text-[#007450]'
              }`}
            >
              Visit &amp; Connect
            </button>

            <button
              onClick={() => handleNavClick('events')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'events' ? 'nav-link-active' : 'hover:text-[#007450]'
              }`}
            >
              Events
            </button>

            <button
              onClick={() => handleNavClick('ebooks')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'ebooks' ? 'nav-link-active' : 'hover:text-[#007450]'
              }`}
            >
              E-Books
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'contact' ? 'nav-link-active' : 'hover:text-[#007450]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Controls: Scaled & Non-wrapping */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3.5 shrink-0">
            {/* Primary visit action */}
            <button
              onClick={onOpenPlanVisit}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#007450] px-3 py-2 text-[10px] font-bold text-white shadow-sm transition-all hover:bg-[#005c40] hover:shadow-md xs:px-4 sm:px-5 sm:py-2.5 sm:text-xs"
            >
              <MapPin className="h-3.5 w-3.5 fill-white" />
              Plan Your Visit
            </button>

            {/* Mobile Hamburger Toggle Button (lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 xs:p-2 rounded-xl text-slate-700 hover:text-[#007450] hover:bg-emerald-50 transition-colors cursor-pointer shrink-0 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-8">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search sermons, scriptures, topics, or e-books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#007450] focus:ring-1 focus:ring-[#007450]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 sm:px-4 py-2 bg-[#007450] text-white text-xs font-semibold rounded-xl hover:bg-[#005c40] transition-colors cursor-pointer shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Slide-down Navigation Menu with Scrollable Drawer and Backdrop */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop for mobile drawer */}
            <div 
              className="fixed inset-0 top-16 sm:top-20 bg-slate-950/40 backdrop-blur-xs z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Scrollable Mobile Drawer */}
            <div className="lg:hidden relative z-40 border-t border-slate-100 bg-white px-4 pt-3 pb-8 space-y-2 shadow-2xl max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Quick Search inside Mobile Menu */}
              <form onSubmit={handleSearchSubmit} className="mb-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search sermons, e-books, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#007450] focus:bg-white"
                  />
                </div>
              </form>

              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'home'
                    ? 'bg-emerald-50 text-[#007450]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'about'
                    ? 'bg-emerald-50 text-[#007450]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>About</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('videos')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'videos'
                    ? 'bg-emerald-50 text-[#007450]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-[#007450]" />
                  <span>Sermons &amp; Broadcasts</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('events')}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#007450]" />
                  <span>Events &amp; Services</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('ebooks')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'ebooks'
                    ? 'bg-emerald-50 text-[#007450]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#007450]" />
                  <span>E-Books &amp; Publications</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('connect')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'connect'
                    ? 'bg-emerald-50 text-[#007450]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#007450]" />
                  <span>Get Connected &amp; Visit</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'contact'
                    ? 'bg-emerald-50 text-[#007450]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#007450]" />
                  <span>Contact Us</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Mobile Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPlanVisit();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#007450] hover:bg-[#005c40] text-white font-semibold text-sm shadow-xs text-center cursor-pointer"
                >
                  Plan a Visit (I'm New)
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPrayerModal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm text-center cursor-pointer"
                >
                  Send Prayer Request
                </button>

                {/* Quick Contact Footer in Menu */}
                <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-100">
                  <div>121 E 2nd Ave, Roselle, NJ 07203</div>
                  <div className="text-slate-500 font-medium mt-0.5">Sunday Service: 9:00 AM – 11:30 AM &middot; (862) 205-5958</div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
