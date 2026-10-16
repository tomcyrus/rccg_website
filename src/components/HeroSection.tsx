import React from 'react';
import { PageTab } from '../types';
import { Calendar, MapPin, Play, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_cross_sanctuary_1792160631376.jpg';

interface HeroSectionProps {
  onOpenPlanVisit: () => void;
  onNavigateAbout: () => void;
  onSelectTab?: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPlanVisit,
  onNavigateAbout,
  onSelectTab,
}) => {
  const handleWatchOnline = () => {
    if (onSelectTab) {
      onSelectTab('videos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('latest-sermon-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=121+E+2nd+Ave+Roselle+NJ+07203', '_blank');
  };

  const handleScheduleClick = () => {
    const el = document.getElementById('church-calendar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Hero Visual Section matching template layout */}
      <section className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center bg-[#070D1F] text-white overflow-hidden">
        {/* Sanctuary Background Image with Glowing Cross */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="RCCG Kingdom First Assembly congregation in worship facing illuminated cross"
            className="w-full h-full object-cover object-center brightness-65 contrast-105"
          />
          {/* Subtle cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-slate-950/50 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        </div>

        {/* Hero Text Content with Restored RCCG KFA Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-2xl space-y-5 sm:space-y-6">
            
            {/* Church Identity Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] xs:text-xs font-semibold tracking-wide backdrop-blur-xs max-w-full">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
              <span className="truncate">RCCG KINGDOM FIRST ASSEMBLY &middot; ROSELLE, NJ</span>
            </div>

            {/* Template Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              A Church<br />
              For Everyone
            </h1>

            {/* Restored Content Subtitle & Scripture */}
            <p className="text-sm sm:text-xl text-slate-200 font-normal leading-relaxed max-w-xl">
              Growing in faith. Building people. Impacting our world. Seeking God's Kingdom first and sharing His love with all.
            </p>

            {/* Anchor Scripture Tag */}
            <div className="text-xs sm:text-sm font-sans italic text-blue-200 bg-white/10 border-l-2 border-[#1D63ED] px-3 sm:px-3.5 py-2 rounded-r-lg max-w-lg backdrop-blur-xs">
              "But seek first the kingdom of God and His righteousness, and all these things shall be added to you." — Matthew 6:33
            </div>

            {/* Action Buttons matching template */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenPlanVisit}
                className="px-6 sm:px-7 py-3 rounded-lg bg-[#1D63ED] hover:bg-[#1551CA] text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer text-center"
              >
                Plan a Visit
              </button>

              <button
                onClick={handleWatchOnline}
                className="px-6 sm:px-7 py-3 rounded-lg bg-black/40 hover:bg-black/60 text-white font-medium text-sm sm:text-base border border-white/50 hover:border-white transition-all cursor-pointer backdrop-blur-xs flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Online</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Service Info Bar with Restored Authentic Schedule & Roselle Location */}
      <div className="bg-[#0B132B] text-white border-t border-white/10 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 gap-4 sm:gap-0">
            
            {/* 1. Sunday Service */}
            <div 
              onClick={handleScheduleClick}
              className="flex items-center gap-3.5 sm:px-6 first:sm:pl-0 cursor-pointer group py-2 sm:py-0"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-300 group-hover:text-[#60A5FA] group-hover:border-[#1D63ED]/50 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                  Sunday Worship Service
                </div>
                <div className="text-xs text-slate-300">
                  10:00 AM EST (Sunday School 9:00 AM)
                </div>
              </div>
            </div>

            {/* 2. Location */}
            <div 
              onClick={handleLocationClick}
              className="flex items-center gap-3.5 sm:px-6 cursor-pointer group py-2 sm:py-0"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-300 group-hover:text-[#60A5FA] group-hover:border-[#1D63ED]/50 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                  Sanctuary Location
                </div>
                <div className="text-xs text-slate-300 truncate">
                  121 E 2nd Ave, Roselle, NJ 07203
                </div>
              </div>
            </div>

            {/* 3. Watch Online */}
            <div 
              onClick={handleWatchOnline}
              className="flex items-center gap-3.5 sm:px-6 last:sm:pr-0 cursor-pointer group py-2 sm:py-0"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-300 group-hover:text-[#60A5FA] group-hover:border-[#1D63ED]/50 transition-colors">
                <div className="w-6 h-4.5 rounded border-2 border-current flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                  Watch Online &amp; Midweek
                </div>
                <div className="text-xs text-slate-300">
                  YouTube Live &middot; Wed Digging Deep 7:00 PM
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
