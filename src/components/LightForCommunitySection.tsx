import React from 'react';
import { PageTab } from '../types';
import { ArrowRight, Flame } from 'lucide-react';

import fellowshipImg from '../assets/images/fellowship_community_1791981784483.jpg';

interface LightForCommunitySectionProps {
  onSelectTab: (tab: PageTab) => void;
}

export const LightForCommunitySection: React.FC<LightForCommunitySectionProps> = ({ onSelectTab }) => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Community photo */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/3] bg-stone-200 overflow-hidden shadow-xl border border-stone-300">
                <img
                  src={fellowshipImg}
                  alt="Joyful fellowship and welcoming congregation at RCCG Kingdom First Assembly"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption citation */}
              <div className="mt-3 text-xs font-serif italic text-stone-500">
                A community growing together in faith, genuine fellowship, and divine love.
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Scripture */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#0E3326] font-semibold">
              <Flame className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Community Impact &amp; Purpose</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0E3326] leading-tight text-balance">
              A Light for Our Community
            </h2>

            {/* Scripture quote banner */}
            <div className="bg-[#FAF3E5] border-l-2 border-[#C5A059] p-4 text-xs sm:text-sm text-stone-800 font-serif italic">
              "You are the light of the world. A town built on a hill cannot be hidden... In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven."
              <span className="block font-sans text-xs uppercase tracking-wider text-[#0E3326] font-semibold not-italic mt-1.5">
                — Matthew 5:14–16
              </span>
            </div>

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Inspired by Matthew 5:14–16, we believe God has called us to shine the light of Christ in <strong className="text-stone-900 font-semibold">Roselle and the surrounding communities</strong>.
              </p>

              <p>
                Our desire is to be a place of hope, love, spiritual growth, and encouragement for individuals and families from all walks of life.
              </p>

              <p className="text-stone-800 font-medium">
                We are not simply building a place to gather on Sundays. We are growing a family of believers equipped to make Jesus known wherever God has positioned us.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectTab('connect');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#0E3326] hover:bg-[#154B38] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Get Connected With Our Family</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E0B86C]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
