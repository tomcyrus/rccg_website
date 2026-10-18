import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { 
  Menu, 
  X, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Tv, 
  Calendar, 
  Heart, 
  ChevronRight,
  Phone,
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

  const handleScrollTo = (elementId: string) => {
    setMobileMenuOpen(false);
    if (currentTab !== 'home') {
      onSelectTab('home');
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
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
        <div className={`${{ notice: 'bg-[#0B132B]', celebration: 'bg-emerald-900', urgent: 'bg-amber-800', broadcast: 'bg-red-900' }[announcement.type]} text-white text-xs py-2 px-4 border-b border-white/10`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-[#1D63ED] animate-pulse shrink-0" />
              <span className="truncate">{announcement.message}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {announcement.actionLabel && (
                <button
                  onClick={() => {
                    if (announcement.actionUrl) window.open(announcement.actionUrl, '_blank', 'noopener,noreferrer');
                    else if (announcement.targetTab) handleNavClick(announcement.targetTab);
                  }}
                  className="text-xs font-semibold text-[#60A5FA] hover:text-white flex items-center gap-0.5 cursor-pointer"
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

      {/* Main Header matching GracePoint template */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Name (flex-1 & min-w-0 ensures no mobile overflow) */}
          <button
            onClick={() => handleNavClick('home')}
            className="cursor-pointer text-left transition-transform hover:opacity-95 min-w-0 flex-1 sm:flex-initial flex items-center pr-1 sm:pr-2"
            aria-label="RCCG Kingdom First Assembly - Home"
          >
            <ChurchBrandLogo variant="dark" size="md" />
          </button>

          {/* Desktop Navigation Links (hidden on tablets/mobile, visible on lg+) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'home' ? 'nav-link-active' : 'hover:text-[#1D63ED]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'about' ? 'nav-link-active' : 'hover:text-[#1D63ED]'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('videos')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'videos' ? 'nav-link-active' : 'hover:text-[#1D63ED]'
              }`}
            >
              Sermons
            </button>

            <button
              onClick={() => handleScrollTo('ministries-section')}
              className="hover:text-[#1D63ED] transition-colors cursor-pointer py-1"
            >
              Ministries
            </button>

            <button
              onClick={() => handleScrollTo('church-calendar')}
              className="hover:text-[#1D63ED] transition-colors cursor-pointer py-1"
            >
              Events
            </button>

            <button
              onClick={() => handleNavClick('ebooks')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'ebooks' ? 'nav-link-active' : 'hover:text-[#1D63ED]'
              }`}
            >
              E-Books
            </button>

            <button
              onClick={() => handleNavClick('connect')}
              className={`transition-colors cursor-pointer py-1 ${
                currentTab === 'connect' ? 'nav-link-active' : 'hover:text-[#1D63ED]'
              }`}
            >
              Connect
            </button>

            <button
              onClick={() => handleScrollTo('giving-section')}
              className="hover:text-[#1D63ED] transition-colors cursor-pointer py-1"
            >
              Give
            </button>
          </nav>

          {/* Right Action Controls: Scaled & Non-wrapping */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3.5 shrink-0">
            {/* Search Icon Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 xs:p-2 text-slate-600 hover:text-[#1D63ED] transition-colors rounded-full hover:bg-slate-50 cursor-pointer shrink-0"
              aria-label="Search sermons and resources"
              title="Search"
            >
              <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>

            {/* "I'm New" Solid Blue Pill Button matching template */}
            <button
              onClick={onOpenPlanVisit}
              className="px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-2.5 rounded-full bg-[#1D63ED] hover:bg-[#1551CA] text-white text-[11px] xs:text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              I'm New
            </button>

            {/* Mobile Hamburger Toggle Button (lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 xs:p-2 rounded-xl text-slate-700 hover:text-[#1D63ED] hover:bg-slate-100 transition-colors cursor-pointer shrink-0 focus:outline-none"
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
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#1D63ED] focus:ring-1 focus:ring-[#1D63ED]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 sm:px-4 py-2 bg-[#1D63ED] text-white text-xs font-semibold rounded-xl hover:bg-[#1551CA] transition-colors cursor-pointer shrink-0"
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1D63ED] focus:bg-white"
                  />
                </div>
              </form>

              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'home'
                    ? 'bg-blue-50 text-[#1D63ED]'
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
                    ? 'bg-blue-50 text-[#1D63ED]'
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
                    ? 'bg-blue-50 text-[#1D63ED]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-[#1D63ED]" />
                  <span>Sermons &amp; Broadcasts</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleScrollTo('ministries-section')}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Ministries &amp; Fellowship</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleScrollTo('church-calendar')}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1D63ED]" />
                  <span>Events &amp; Services</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('ebooks')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'ebooks'
                    ? 'bg-blue-50 text-[#1D63ED]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#1D63ED]" />
                  <span>E-Books &amp; Publications</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('connect')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === 'connect'
                    ? 'bg-blue-50 text-[#1D63ED]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1D63ED]" />
                  <span>Get Connected &amp; Visit</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleScrollTo('giving-section')}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>Give &amp; Online Offering</span>
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
                  className="w-full py-2.5 rounded-xl bg-[#1D63ED] hover:bg-[#1551CA] text-white font-semibold text-sm shadow-xs text-center cursor-pointer"
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
                  <div className="text-slate-500 font-medium mt-0.5">Sunday Service: 10:00 AM EST &middot; (862) 520-7004</div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
