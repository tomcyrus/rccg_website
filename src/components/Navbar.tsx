import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Tv, 
  Calendar, 
  Heart, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink,
  Bell
} from 'lucide-react';
import { getStoredAnnouncement } from '../utils/adminStore';
import rccgLogoImg from '../assets/images/rccg_official_logo_1791985600387.jpg';

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
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [announcement, setAnnouncement] = useState(() => getStoredAnnouncement());

  // Listen to potential storage updates for announcement
  useEffect(() => {
    const handleStorageChange = () => {
      setAnnouncement(getStoredAnnouncement());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalendarClick = () => {
    setMobileMenuOpen(false);
    if (currentTab !== 'home') {
      onSelectTab('home');
      setTimeout(() => {
        const el = document.getElementById('church-calendar');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('church-calendar');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGivingClick = () => {
    setMobileMenuOpen(false);
    if (currentTab !== 'home') {
      onSelectTab('home');
      setTimeout(() => {
        const el = document.getElementById('giving-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('giving-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Live Announcement Banner (If active & not dismissed) */}
      {announcement.isActive && !announcementDismissed && (
        <div className={`text-xs font-medium py-2 px-3 sm:px-6 transition-all border-b ${
          announcement.type === 'celebration'
            ? 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-100 border-emerald-500/30'
            : announcement.type === 'urgent'
            ? 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 border-amber-500/30'
            : announcement.type === 'broadcast'
            ? 'bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-red-100 border-red-500/30'
            : 'bg-[#071324] text-slate-100 border-white/10'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="truncate text-xs sm:text-sm font-sans">{announcement.message}</span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {announcement.actionLabel && (
                <button
                  onClick={() => {
                    if (announcement.targetTab) {
                      handleNavClick(announcement.targetTab);
                    } else if (announcement.actionUrl) {
                      window.open(announcement.actionUrl, '_blank');
                    }
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-amber-300 font-bold text-[11px] tracking-wide transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>{announcement.actionLabel}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={() => setAnnouncementDismissed(true)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Dismiss announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sacred Top Ribbon (Mobile & Desktop Optimized) */}
      <div className="bg-[#0A192F] text-amber-100/90 text-xs border-b border-amber-500/20 py-2 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-x-4">
          {/* Welcome & Service Schedule */}
          <div className="flex items-center gap-2 text-center sm:text-left min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold tracking-wide shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden xs:inline">WORSHIP</span>
            </span>
            <span className="text-white/95 font-medium truncate text-[11px] sm:text-xs">
              <span className="font-semibold text-amber-300">Sun 10:00 AM</span> &amp; Wed 7:00 PM
            </span>
            <span className="hidden md:inline text-amber-500/50">·</span>
            <span className="hidden md:inline text-amber-200/80 text-[11px] truncate">121 E 2nd Ave, Roselle, NJ</span>
          </div>

          {/* Quick Contact, Live Action & Admin Link */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs shrink-0">
            <a
              href="https://www.google.com/maps/search/?api=1&query=121+E+2nd+Ave+Roselle+NJ+07203"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
              title="Directions to Sanctuary"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Directions</span>
            </a>

            <span className="text-white/20 hidden sm:inline">|</span>

            <a
              href="tel:8625207004"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
              title="Call Church Office"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden md:inline">(862) 520-7004</span>
            </a>

            <span className="text-white/20">|</span>

            <a
              href="https://www.youtube.com/@RCCGKFA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-300 font-semibold"
              title="Watch Live on YouTube"
            >
              <Tv className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Live</span>
            </a>

            <span className="text-white/20">|</span>

            {/* Quick Admin Portal Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px] cursor-pointer ${
                currentTab === 'admin' ? 'text-amber-300 font-bold' : 'text-slate-400'
              }`}
              title="Church Admin Console"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden xs:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Church Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Logo & Church Name Branding */}
          <button
            onClick={() => handleNavClick('home')}
            className="group cursor-pointer flex items-center gap-2.5 sm:gap-3 text-left shrink-0 select-none transition-transform hover:scale-[1.01]"
            aria-label="RCCG Kingdom First Assembly - Return to Home"
          >
            {/* Official RCCG Logo */}
            <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-sm shrink-0">
              <img
                src={rccgLogoImg}
                alt="The Redeemed Christian Church of God Official Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
            </div>

            {/* Church Identity Typography */}
            <div className="flex flex-col min-w-0">
              <div className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-emerald-800 truncate max-w-[210px] xs:max-w-none">
                The Redeemed Christian Church of God
              </div>
              <div className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#0A192F] tracking-tight group-hover:text-emerald-900 transition-colors leading-tight truncate">
                Kingdom First Assembly
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium tracking-wider text-amber-700 uppercase flex items-center gap-1">
                <span>Roselle, NJ</span>
                <span>·</span>
                <span className="italic normal-case text-stone-500">Matt 6:33</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links (Responsive layout for 1024px, 1280px, and wider) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'hover:text-emerald-800 hover:bg-stone-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'hover:text-emerald-800 hover:bg-stone-100'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('videos')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'videos'
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'hover:text-emerald-800 hover:bg-stone-100'
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Videos</span>
            </button>

            <button
              onClick={() => handleNavClick('ebooks')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'ebooks'
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'hover:text-emerald-800 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>E-Books</span>
            </button>

            <button
              onClick={handleCalendarClick}
              className="px-2.5 xl:px-3 py-1.5 rounded-full transition-all cursor-pointer hover:text-emerald-800 hover:bg-stone-100 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Calendar</span>
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'gallery'
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'hover:text-emerald-800 hover:bg-stone-100'
              }`}
            >
              Photos
            </button>

            <button
              onClick={() => handleNavClick('connect')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'connect'
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'hover:text-emerald-800 hover:bg-stone-100'
              }`}
            >
              Connect
            </button>

            <button
              onClick={handleGivingClick}
              className="px-2.5 xl:px-3 py-1.5 rounded-full transition-all cursor-pointer hover:text-emerald-800 hover:bg-stone-100 flex items-center gap-1 text-amber-700 font-semibold"
            >
              <Heart className="w-3.5 h-3.5 fill-amber-500/30 text-amber-600 shrink-0" />
              <span>Give</span>
            </button>
          </nav>

          {/* Action Buttons & Admin Shortcut */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
            <button
              onClick={onOpenPrayerModal}
              className="px-3 xl:px-3.5 py-2 text-xs font-semibold rounded-full border border-emerald-800/20 text-emerald-900 hover:bg-emerald-50 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xl:inline">Prayer Request</span>
              <span className="xl:hidden">Prayer</span>
            </button>

            <button
              onClick={onOpenPlanVisit}
              className="px-3.5 xl:px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-emerald-800 to-emerald-700 text-white shadow-xs hover:shadow-md hover:from-emerald-900 hover:to-emerald-800 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Plan a Visit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Quick Admin Icon Button on Desktop */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-stone-400 hover:text-amber-700 hover:bg-stone-100'
              }`}
              title="Church Admin Operations Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
            {/* Section 1: Worship & Church Life */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 px-3 pt-1">
                Worship &amp; Church Life
              </div>
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentTab === 'home'
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentTab === 'about'
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-50'
                }`}
              >
                About Us &amp; Our Story
              </button>

              <button
                onClick={handleCalendarClick}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-stone-50 flex items-center justify-between"
              >
                <span>Church Calendar</span>
                <Calendar className="w-4 h-4 text-amber-600" />
              </button>
            </div>

            {/* Section 2: Word, Media & E-Books */}
            <div className="space-y-1 pt-1 border-t border-stone-100">
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 px-3 pt-1">
                Word, Media &amp; Publications
              </div>
              <button
                onClick={() => handleNavClick('videos')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  currentTab === 'videos'
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-50'
                }`}
              >
                <span>Video Gallery (YouTube)</span>
                <Tv className="w-4 h-4 text-red-500" />
              </button>

              <button
                onClick={() => handleNavClick('ebooks')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  currentTab === 'ebooks'
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-50'
                }`}
              >
                <span>E-Books &amp; Devotionals</span>
                <BookOpen className="w-4 h-4 text-amber-600" />
              </button>

              <button
                onClick={() => handleNavClick('gallery')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentTab === 'gallery'
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-50'
                }`}
              >
                Photo Gallery
              </button>
            </div>

            {/* Section 3: Fellowship & Giving */}
            <div className="space-y-1 pt-1 border-t border-stone-100">
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 px-3 pt-1">
                Fellowship &amp; Stewardship
              </div>
              <button
                onClick={() => handleNavClick('connect')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentTab === 'connect'
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-50'
                }`}
              >
                Connect &amp; Ministries
              </button>

              <button
                onClick={handleGivingClick}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-amber-800 hover:bg-amber-50 flex items-center justify-between"
              >
                <span>Online Giving &amp; Tithes</span>
                <Heart className="w-4 h-4 fill-amber-500 text-amber-600" />
              </button>
            </div>

            {/* Section 4: Administration */}
            <div className="space-y-1 pt-1 border-t border-stone-100">
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 px-3 pt-1">
                Church Management
              </div>
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  currentTab === 'admin'
                    ? 'bg-amber-100 text-slate-950 font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>Church Admin Portal</span>
                <ShieldCheck className="w-4 h-4 text-amber-600" />
              </button>
            </div>

            {/* Mobile Call-to-Action Buttons */}
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanVisit();
                }}
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-center text-sm shadow-sm transition-all"
              >
                Plan Your Visit This Sunday
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrayerModal();
                }}
                className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium text-center text-xs"
              >
                Need Prayer? Submit Request
              </button>
            </div>

            {/* Sanctuary Address Card in Mobile Drawer */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center text-[11px] text-stone-600 space-y-0.5">
              <div className="font-semibold text-[#0A192F]">121 E 2nd Ave, Roselle, NJ 07203</div>
              <div>Sunday Worship: 10:00 AM · Bible Study: Wed 7:00 PM</div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
