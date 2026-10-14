import React from 'react';
import { PageTab } from '../types';
import { ArrowRight, Flame } from 'lucide-react';

interface ServeBannerProps {
  onOpenPlanVisit: () => void;
  onSelectTab: (tab: PageTab) => void;
}

export const ServeBanner: React.FC<ServeBannerProps> = ({
  onOpenPlanVisit,
  onSelectTab,
}) => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-[#0D0D0D] text-white overflow-hidden border-b border-stone-200">
      {/* Background with Dark Atmospheric Image & Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/gallery_family_fellowship_1791982293989.jpg"
          alt="RCCG Kingdom First Assembly Community"
          className="w-full h-full object-cover brightness-25 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/80" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#FFD2A4]">
          <Flame className="w-3.5 h-3.5 text-[#FFD2A4]" />
          <span>A LIGHT FOR OUR COMMUNITY</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-6xl font-condensed font-bold uppercase tracking-tight text-white leading-[1.08] text-balance">
          WE WANT TO SERVE THE WORLD AROUND US AND SHINE HIS LIGHT
        </h2>

        <div className="text-xs sm:text-sm md:text-base font-serif italic text-stone-300 max-w-2xl mx-auto">
          "You are the light of the world. A town built on a hill cannot be hidden... let your light shine before others." — Matthew 5:14–16
        </div>

        <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-xl mx-auto leading-relaxed">
          We are not simply building a place to gather on Sundays. We are growing a family of believers equipped to make Jesus known wherever God has positioned us.
        </p>

        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onOpenPlanVisit}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer shadow-lg min-h-[44px] flex items-center justify-center"
          >
            PLAN YOUR VISIT
          </button>

          <button
            onClick={() => {
              onSelectTab('connect');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 border border-white/30 hover:border-white text-white font-condensed font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            GET CONNECTED
          </button>
        </div>
      </div>
    </section>
  );
};
