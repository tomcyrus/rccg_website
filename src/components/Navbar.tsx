import React, { useState } from 'react';
import { PageTab } from '../types';
import { Menu, X, MapPin, Phone, Tv, Calendar } from 'lucide-react';
import { RccgLogo } from './RccgLogo';
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

  return (
    <>
      {/* Top Utility Announcement Ribbon - Fully responsive on all screens */}
      <div className="bg-[#0D0D0D] text-[#D1DDD6] text-xs border-b border-white/10 py-2 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-x-6 gap-y-1.5 text-center sm:text-left">
          {/* Location & Times text */}
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] sm:text-xs flex-wrap">
            <span className="w-1.5 h-1.5 bg-[#FFD2A4] rounded-full shrink-0" aria-hidden="true" />
            <span className="text-[#FFD2A4] font-condensed font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
              Temporary Worship Location:
            </span>
            <span className="text-white/90">121 E 2nd Ave, Roselle, NJ 07203</span>
            <span className="hidden md:inline text-white/30" aria-hidden="true">·</span>
            <span className="hidden md:inline text-stone-300">Sunday 9:00 AM &amp; Wednesday 7:00 PM</span>
          </div>

          {/* Quick Action Links */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs shrink-0 font-medium font-sans">
            <a
              href="https://www.google.com/maps/search/?api=1&query=121+E+2nd+Ave+Roselle+NJ+07203"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 py-0.5"
            >
              <MapPin className="w-3 h-3 text-[#FFD2A4] shrink-0" />
              <span>Get Directions</span>
            </a>
            <span className="text-white/20" aria-hidden="true">|</span>
            <a
              href="tel:8625207004"
              className="hover:text-white transition-colors flex items-center gap-1 py-0.5"
            >
              <Phone className="w-3 h-3 text-[#FFD2A4] shrink-0" />
              <span>(862) 520-7004</span>
            </a>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">|</span>
            <a
              href="https://www.youtube.com/@RCCGKFA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors hidden sm:flex items-center gap-1 text-[#FFD2A4] py-0.5"
            >
              <Tv className="w-3 h-3 shrink-0" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Finsweet Template 10 Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#161722] text-white border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Site Logo (Official RCCG logo with church name below) */}
          <button
            onClick={() => handleNavClick('home')}
            className="group cursor-pointer focus-visible:outline-hidden flex flex-col items-center justify-center text-center py-0.5 shrink-0 select-none"
            aria-label="RCCG Kingdom First Assembly - Go to Home"
          >
            {/* Official RCCG Logo */}
            <div className="relative flex items-center justify-center">
              <img
                src={rccgLogoImg}
                alt="The Redeemed Christian Church of God Official Logo"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full object-cover shadow-md ring-2 ring-[#FFD2A4]/60 group-hover:ring-[#FFD2A4] group-hover:scale-105 transition-all duration-200"
              />
            </div>
            {/* Church Name Below */}
            <div className="flex flex-col items-center text-center mt-1">
              <span className="font-condensed font-bold uppercase text-[11px] sm:text-xs md:text-sm tracking-wider text-white group-hover:text-[#FFD2A4] transition-colors leading-tight">
                KINGDOM FIRST ASSEMBLY
              </span>
              <span className="text-[8px] sm:text-[9px] font-condensed uppercase tracking-widest text-[#FFD2A4] leading-none mt-0.5">
                ROSELLE, NEW JERSEY
              </span>
            </div>
          </button>

          {/* Zone 2: Finsweet Template 10 uppercase text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-condensed font-bold uppercase tracking-wider text-white/80">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                currentTab === 'home'
                  ? 'text-[#FFD2A4] border-b-2 border-[#FFD2A4]'
                  : 'hover:text-[#FFD2A4]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                currentTab === 'about'
                  ? 'text-[#FFD2A4] border-b-2 border-[#FFD2A4]'
                  : 'hover:text-[#FFD2A4]'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                currentTab === 'gallery'
                  ? 'text-[#FFD2A4] border-b-2 border-[#FFD2A4]'
                  : 'hover:text-[#FFD2A4]'
              }`}
            >
              Gallery
            </button>

            <button
              onClick={handleCalendarClick}
              className="text-white/80 hover:text-[#FFD2A4] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative"
            >
              Calendar
            </button>

            <button
              onClick={() => handleNavClick('connect')}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                currentTab === 'connect'
                  ? 'text-[#FFD2A4] border-b-2 border-[#FFD2A4]'
                  : 'hover:text-[#FFD2A4]'
              }`}
            >
              Get Connected
            </button>


            <a
              href="https://www.youtube.com/@RCCGKFA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-[#FFD2A4] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1"
            >
              <Tv className="w-3.5 h-3.5 text-[#FFD2A4]" />
              <span>Watch Live</span>
            </a>

            <button
              onClick={onOpenPrayerModal}
              className="text-white/70 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 font-normal capitalize"
            >
              Prayer Request
            </button>
          </nav>

          {/* Zone 3: Finsweet Template 10 Golden Action Button & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenPlanVisit}
              className="hidden md:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-condensed font-bold uppercase tracking-widest text-[#0D0D0D] bg-[#FFD2A4] hover:bg-[#E5BE94] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-md active:translate-y-px"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0D0D0D]" />
              <span>Plan Your Visit</span>
            </button>

            {/* Mobile Hamburger Button - Minimum 44x44 touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] p-2 text-white hover:text-[#FFD2A4] hover:bg-white/10 rounded flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FFD2A4]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0D0D] border-t border-white/10 px-4 sm:px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
            {/* Mobile Header Brand Display */}
            <div className="flex flex-col items-center text-center pb-4 border-b border-white/10">
              <img
                src={rccgLogoImg}
                alt="RCCG Official Logo"
                className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-[#FFD2A4]/60 mb-2"
              />
              <span className="text-[10px] font-condensed font-bold uppercase tracking-widest text-[#FFD2A4]">
                THE REDEEMED CHRISTIAN CHURCH OF GOD
              </span>
              <span className="font-condensed font-bold uppercase text-base tracking-wider text-white">
                KINGDOM FIRST ASSEMBLY
              </span>
              <span className="text-[9px] font-condensed uppercase tracking-widest text-stone-400">
                ROSELLE, NEW JERSEY
              </span>
            </div>

            <div className="flex flex-col space-y-2 font-condensed font-bold uppercase tracking-wider text-base">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left py-3 px-2 border-b border-white/10 transition-colors ${
                  currentTab === 'home' ? 'text-[#FFD2A4] bg-white/5' : 'text-white/80 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`text-left py-3 px-2 border-b border-white/10 transition-colors ${
                  currentTab === 'about' ? 'text-[#FFD2A4] bg-white/5' : 'text-white/80 hover:text-white'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => handleNavClick('gallery')}
                className={`text-left py-3 px-2 border-b border-white/10 transition-colors ${
                  currentTab === 'gallery' ? 'text-[#FFD2A4] bg-white/5' : 'text-white/80 hover:text-white'
                }`}
              >
                Gallery
              </button>
              <button
                onClick={handleCalendarClick}
                className="text-left py-3 px-2 border-b border-white/10 text-white/80 hover:text-[#FFD2A4] transition-colors"
              >
                Church Calendar &amp; Dates
              </button>
              <button
                onClick={() => handleNavClick('connect')}
                className={`text-left py-3 px-2 border-b border-white/10 transition-colors ${
                  currentTab === 'connect' ? 'text-[#FFD2A4] bg-white/5' : 'text-white/80 hover:text-white'
                }`}
              >
                Get Connected &amp; Contact
              </button>

              <a
                href="https://www.youtube.com/@RCCGKFA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left py-3 px-2 border-b border-white/10 text-[#FFD2A4] flex items-center justify-between"
              >
                <span>Watch Live on YouTube</span>
                <Tv className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrayerModal();
                }}
                className="text-left py-3 px-2 text-white/80 font-normal capitalize hover:text-white"
              >
                Submit Prayer Request
              </button>
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanVisit();
                }}
                className="w-full min-h-[44px] py-3 bg-[#FFD2A4] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:bg-[#E5BE94]"
              >
                <Calendar className="w-4 h-4 text-[#0D0D0D]" />
                Plan Your Visit
              </button>
              <a
                href="tel:8625207004"
                className="w-full min-h-[44px] py-2.5 border border-white/20 text-white font-condensed uppercase tracking-wider text-xs flex items-center justify-center gap-2 active:bg-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFD2A4]" />
                Call (862) 520-7004
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
