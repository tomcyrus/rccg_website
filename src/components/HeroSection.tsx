import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { ArrowRight, Calendar, Tv, Heart, Users, Compass } from 'lucide-react';

interface HeroSectionProps {
  onOpenPlanVisit: () => void;
  onNavigateAbout: () => void;
  onSelectTab?: (tab: PageTab) => void;
}

const ROTATING_TEXTS = [
  {
    kicker: 'WELCOME TO OUR CHURCH',
    headline: 'BECOME A PART OF OUR COMMUNITY',
    sub: 'Welcome to RCCG Kingdom First Assembly — a Christ-centered, Kingdom-minded church family in Roselle, New Jersey.',
  },
  {
    kicker: 'DIVINE PRIORITY · MATTHEW 6:33',
    headline: 'SEEK HIS KINGDOM FIRST',
    sub: 'Allowing God\'s eternal Word and righteousness to shape our priorities, our decisions, and our everyday lives.',
  },
  {
    kicker: 'FELLOWSHIP & DISCIPLESHIP',
    headline: "GROW IN FAITH & GOD'S LOVE",
    sub: 'Discover the beauty of knowing Jesus Christ, building confidence in who we are, and growing together in love.',
  },
  {
    kicker: 'COMMUNITY IMPACT · MATTHEW 5:14-16',
    headline: 'SHINE AS LIGHT IN ROSELLE',
    sub: 'Equipped believers sent forth to demonstrate the transforming power and compassion of Christ throughout our city.',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPlanVisit,
  onNavigateAbout,
  onSelectTab,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Auto-cycle through the 4 texts every 3.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const activeContent = ROTATING_TEXTS[currentTextIndex];

  return (
    <section className="relative bg-[#0D0D0D] text-white overflow-hidden">
      {/* Hero Header Area with High-Visibility Sanctuary Background */}
      <div className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden">
        {/* Background Sanctuary Image with Increased Visibility & Crisp Clarity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_church_sanctuary_1791981782802.jpg"
            alt="Serene sanctuary of RCCG Kingdom First Assembly filled with natural morning light"
            className="w-full h-full object-cover object-center brightness-85 contrast-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Refined gradient scrim: darker on text side, transparent on sanctuary right */}
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#0D0D0D]/95 via-[#0D0D0D]/80 sm:via-[#0D0D0D]/75 to-black/40 sm:to-black/25 pointer-events-none" />
          
          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D0D0D] to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10 w-full">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            {/* Template 10 All-Caps Kicker */}
            <div
              key={`kicker-${currentTextIndex}`}
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-condensed font-bold uppercase tracking-[0.18em] text-[#FFD2A4] animate-in fade-in duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-[#A6262B] shrink-0" aria-hidden="true" />
              <span className="truncate">{activeContent.kicker}</span>
            </div>

            {/* Dynamic Changing Headline: Cycles across the four texts with animation */}
            <div className="min-h-[85px] sm:min-h-[120px] lg:min-h-[160px] flex items-center">
              <h1
                key={`headline-${currentTextIndex}`}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-condensed font-bold uppercase tracking-tight text-white leading-[1.08] break-words animate-in fade-in zoom-in-95 duration-400"
              >
                {activeContent.headline}
              </h1>
            </div>

            {/* Subheading / Tagline with transition */}
            <p
              key={`sub-${currentTextIndex}`}
              className="text-sm sm:text-base md:text-lg text-white/90 font-sans leading-relaxed max-w-2xl animate-in fade-in duration-300"
            >
              {activeContent.sub}
            </p>

            {/* Interactive 4-Text Stepper / Selector */}
            <div className="pt-1 flex items-center gap-2">
              {ROTATING_TEXTS.map((item, idx) => (
                <button
                  key={item.headline}
                  onClick={() => setCurrentTextIndex(idx)}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer min-w-[20px] ${
                    currentTextIndex === idx
                      ? 'w-8 sm:w-10 bg-[#FFD2A4]'
                      : 'w-4 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Show phrase ${idx + 1}: ${item.headline}`}
                />
              ))}
              <span className="text-[11px] font-condensed uppercase tracking-wider text-stone-300 ml-2">
                0{currentTextIndex + 1} / 04
              </span>
            </div>

            {/* Signature Scripture Quote */}
            <div className="text-xs sm:text-sm font-serif italic text-[#FFD2A4] border-l-2 border-[#FFD2A4] pl-3 py-1">
              "Seek first the kingdom of God and His righteousness, and all these things shall be added to you." — Matthew 6:33
            </div>

            {/* Action Buttons: Full-width on mobile, auto on tablet & desktop */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenPlanVisit}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer active:translate-y-px min-h-[44px]"
              >
                <Calendar className="w-4 h-4 text-[#0D0D0D]" />
                <span>PLAN YOUR VISIT</span>
              </button>

              <a
                href="https://www.youtube.com/@RCCGKFA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 text-white hover:text-[#FFD2A4] font-condensed font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 group border border-white/20 hover:border-[#FFD2A4] min-h-[44px]"
              >
                <span>WATCH LIVE</span>
                <ArrowRight className="w-4 h-4 text-[#FFD2A4] transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Finsweet Template 10 Signature 3 Feature Cards (Overlapping Hero Base) */}
      <div className="bg-[#F5F2F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {/* Feature Card 1: About Us */}
            <div
              onClick={onNavigateAbout}
              className="group bg-[#FFF6EB] p-6 sm:p-8 border border-stone-200 hover:border-stone-400 transition-all cursor-pointer relative flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD2A4]/40 text-[#0D0D0D] flex items-center justify-center">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#161722]" />
                </div>
                <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-stone-500">
                  OUR STORY &amp; VISION
                </div>
                <h3 className="text-xl sm:text-2xl font-condensed font-bold uppercase tracking-wide text-[#0D0D0D]">
                  ABOUT US
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  A parish of The Redeemed Christian Church of God (RCCG) in Roselle, NJ. Rooted in God's eternal Word and raising believers who know their identity in Christ.
                </p>
              </div>

              <div className="pt-5 sm:pt-6 flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-[#0D0D0D] group-hover:text-[#DC9853] transition-colors">
                <span>READ MORE</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>

              {/* Accent Bottom Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>

            {/* Feature Card 2: Get Involved */}
            <div
              onClick={() => onSelectTab && onSelectTab('connect')}
              className="group bg-[#FFF6EB] p-6 sm:p-8 border border-stone-200 hover:border-stone-400 transition-all cursor-pointer relative flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD2A4]/40 text-[#0D0D0D] flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#161722]" />
                </div>
                <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-stone-500">
                  FELLOWSHIP &amp; DISCIPLESHIP
                </div>
                <h3 className="text-xl sm:text-2xl font-condensed font-bold uppercase tracking-wide text-[#0D0D0D]">
                  GET INVOLVED
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  Join our weekly Wednesday Bible study, prayer groups, and volunteer ministries as we walk and grow together in spiritual maturity.
                </p>
              </div>

              <div className="pt-5 sm:pt-6 flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-[#0D0D0D] group-hover:text-[#DC9853] transition-colors">
                <span>CONNECT WITH US</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>

              {/* Accent Bottom Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>

            {/* Feature Card 3: Giving & Service */}
            <div
              onClick={() => onSelectTab && onSelectTab('connect')}
              className="group bg-[#FFF6EB] p-6 sm:p-8 border border-stone-200 hover:border-stone-400 transition-all cursor-pointer relative flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD2A4]/40 text-[#0D0D0D] flex items-center justify-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#161722]" />
                </div>
                <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-stone-500">
                  COMMUNITY LIGHT
                </div>
                <h3 className="text-xl sm:text-2xl font-condensed font-bold uppercase tracking-wide text-[#0D0D0D]">
                  GIVING &amp; SERVING
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  Shining the transformative light of Christ in Roselle through community outreach, compassionate service, and unconditional love.
                </p>
              </div>

              <div className="pt-5 sm:pt-6 flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-[#0D0D0D] group-hover:text-[#DC9853] transition-colors">
                <span>SERVE WITH US</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>

              {/* Accent Bottom Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
