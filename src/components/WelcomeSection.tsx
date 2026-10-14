import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface WelcomeSectionProps {
  onNavigateAbout: () => void;
  onOpenPlanVisit: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onNavigateAbout,
  onOpenPlanVisit,
}) => {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Finsweet Template 10 Multi-Image Collage */}
          <div className="lg:col-span-6 relative pb-6 sm:pb-8 lg:pb-0">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Main Photo */}
              <div className="aspect-[4/3] bg-stone-100 overflow-hidden border border-stone-200 shadow-lg">
                <img
                  src="/src/assets/images/fellowship_community_1791981784483.jpg"
                  alt="Believers greeting one another warmly at RCCG Kingdom First Assembly"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Sub Photo Overlap - Responsively tucked safely within bounds */}
              <div className="hidden sm:block absolute -bottom-6 right-2 sm:right-4 w-1/2 aspect-[4/3] bg-stone-900 border-4 border-white shadow-xl overflow-hidden">
                <img
                  src="/src/assets/images/bible_study_scripture_1791981783961.jpg"
                  alt="Holy Bible opened to scripture"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Accent corner tag */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#FFD2A4] text-[#0D0D0D] font-condensed font-bold uppercase tracking-wider text-[10px] sm:text-[11px] px-2.5 py-1 shadow-sm">
                ROSELLE, NEW JERSEY
              </div>
            </div>
          </div>

          {/* Right Column: Finsweet Template 10 Narrative */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
              LOVE AND COMPASSION
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-condensed font-bold uppercase tracking-tight text-[#0D0D0D] leading-[1.1]">
              BRINGING PEACE &amp; JOY, SHARING GOD'S LOVE WITH ALL
            </h2>

            <div className="space-y-3 sm:space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Welcome to <strong className="text-[#0D0D0D] font-semibold">The Redeemed Christian Church of God (RCCG), Kingdom First Assembly</strong>, a growing family of believers in Roselle, New Jersey.
              </p>

              <p>
                We are passionate about knowing Jesus Christ, discovering the beauty and greatness of His Kingdom, and growing together in faith and love.
              </p>

              <p>
                At Kingdom First Assembly, we believe that understanding who we are in Christ produces conviction, strengthens our faith, builds confidence, and empowers us to live for God’s purposes.
              </p>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 pt-1 text-xs sm:text-sm text-stone-800 font-medium">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#FFD2A4]/50 flex items-center justify-center text-[#0D0D0D] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#0D0D0D]" />
                </div>
                <span>Preaching Jesus Christ crucified, risen, and glorified</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#FFD2A4]/50 flex items-center justify-center text-[#0D0D0D] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#0D0D0D]" />
                </div>
                <span>Weekly Sunday worship at 9:00 AM &amp; Wednesday Bible study at 7:00 PM</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#FFD2A4]/50 flex items-center justify-center text-[#0D0D0D] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#0D0D0D]" />
                </div>
                <span>Temporary worship location at 121 E 2nd Ave, Roselle, NJ 07203</span>
              </div>
            </div>

            {/* Quote */}
            <div className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#161722] border-l-2 border-[#FFD2A4] pl-3 sm:pl-4 py-1">
              "Come as you are. Discover His Kingdom. Grow with us."
            </div>

            {/* Actions: Responsive full-width on mobile */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onNavigateAbout}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer shadow-sm text-center min-h-[44px]"
              >
                READ MORE ABOUT US
              </button>

              <button
                onClick={onOpenPlanVisit}
                className="w-full sm:w-auto px-6 py-3.5 border border-stone-300 hover:border-stone-800 text-stone-800 font-condensed font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer text-center min-h-[44px]"
              >
                PLAN A VISIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
