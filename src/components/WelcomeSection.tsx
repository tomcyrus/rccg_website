import React from 'react';
import { ArrowRight, CheckCircle2, Heart, Sparkles, MapPin, Users } from 'lucide-react';
import fellowshipImg from '../assets/images/fellowship_community_1791981784483.jpg';
import scriptureImg from '../assets/images/bible_study_scripture_1791981783961.jpg';

interface WelcomeSectionProps {
  onNavigateAbout: () => void;
  onOpenPlanVisit: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onNavigateAbout,
  onOpenPlanVisit,
}) => {
  const highlights = [
    {
      title: 'Warm & Hospitable Family',
      text: 'You are embraced as family the moment you step through our doors.',
    },
    {
      title: 'Vibrant Spirit-Filled Worship',
      text: 'Experience heartfelt praise and prayer that refreshes the soul.',
    },
    {
      title: 'Deep, Practical Bible Teaching',
      text: 'Sound doctrine that gives you wisdom for family, work, and spiritual victory.',
    },
    {
      title: 'Victorious Children’s Church',
      text: 'Safe, engaging, Christ-centered nursery and kids programs every Sunday.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Visual Collage with refined rounded corners and warm glow */}
          <div className="lg:col-span-6 relative">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Main Photo: Fellowship */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-stone-200/80 shadow-2xl relative group">
                <img
                  src={fellowshipImg}
                  alt="Believers greeting one another warmly at RCCG Kingdom First Assembly"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase tracking-widest font-semibold text-amber-300">
                    Community Fellowship
                  </div>
                  <div className="text-base font-serif font-bold">
                    Walking Together in Faith &amp; Harmony
                  </div>
                </div>
              </div>

              {/* Sub Photo: Bible Study - Clean overlap with gold border */}
              <div className="hidden sm:block absolute -bottom-8 -right-4 w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={scriptureImg}
                  alt="Holy Bible opened to scripture"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Roselle, NJ Badge */}
              <div className="absolute top-4 left-4 bg-emerald-800 text-white font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Roselle, New Jersey</span>
              </div>
            </div>
          </div>

          {/* Right Column: Warm Pastoral Invitation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold tracking-wider uppercase">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>A Warm Welcome Home</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0A192F] tracking-tight leading-[1.18]">
              A Place Where You Are Loved, Valued, &amp; Empowered
            </h2>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans">
              Welcome to <strong className="text-[#0A192F] font-semibold">RCCG Kingdom First Assembly</strong>. 
              We believe church is not just a building you visit, but a family you belong to. 
              No matter where you are on your spiritual journey, there is a seat reserved at the table for you.
            </p>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 hover:bg-amber-50/50 transition-colors">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0A192F]">{item.title}</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-stone-200/80">
              <button
                onClick={onOpenPlanVisit}
                className="px-6 py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Plan Your First Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateAbout}
                className="px-6 py-3.5 rounded-full border border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-50 font-semibold text-sm transition-all text-center"
              >
                Learn More About Our Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
