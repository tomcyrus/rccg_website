import React from 'react';
import { PageTab } from '../types';
import { ArrowRight, Calendar, MapPin, Tv, Clock, Sparkles, Heart } from 'lucide-react';
import heroImg from '../assets/images/hero_church_sanctuary_1791981782802.jpg';

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
  const scrollToCalendar = () => {
    const el = document.getElementById('church-calendar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#0A192F] text-white overflow-hidden">
      {/* Background Sanctuary Image with Divine Ambient Gradient Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="RCCG Kingdom First Assembly Sanctuary bathed in warm sacred light"
          className="w-full h-full object-cover object-center brightness-75 contrast-105 scale-105 transition-transform duration-1000"
        />
        {/* Sacred Multi-layer Gradient Scrim: Deep navy and warm amber overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/85 to-[#0A192F]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-[#0A192F]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-20 sm:pb-28">
        <div className="max-w-3xl space-y-6">
          {/* Sacred Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
              Welcome Home · RCCG Kingdom First Assembly
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.12]">
            Where Faith Meets Family &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
              God's Presence
            </span>{' '}
            Abides.
          </h1>

          {/* Scripture Accent Banner */}
          <div className="p-4 rounded-xl bg-white/5 border-l-4 border-amber-400 backdrop-blur-xs max-w-2xl">
            <p className="text-amber-100/90 font-serif italic text-base sm:text-lg">
              "But seek first the kingdom of God and His righteousness, and all these things shall be added to you."
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mt-1">
              — Matthew 6:33
            </p>
          </div>

          {/* Warm Welcome Description */}
          <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed max-w-2xl">
            We are a Christ-centered, Spirit-filled church family in Roselle, New Jersey. 
            Whether you are taking your first steps toward God or seeking a deeper walk of faith, 
            you have a warm, welcoming home here.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
            <button
              onClick={onOpenPlanVisit}
              className="px-7 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-semibold text-sm sm:text-base shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Plan Your Visit This Sunday</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://www.youtube.com/@RCCGKFA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-xs transition-all flex items-center justify-center gap-2"
            >
              <Tv className="w-4 h-4 text-red-400" />
              <span>Watch Online</span>
            </a>

            <button
              onClick={onNavigateAbout}
              className="px-5 py-4 rounded-full text-amber-200/90 hover:text-white text-sm font-medium transition-colors text-center"
            >
              Our Story &amp; Beliefs →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Service Times & Location Dock */}
      <div className="relative z-10 border-t border-white/10 bg-[#071324]/90 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Sunday Service */}
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/30 transition-all">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Sunday Celebration
              </div>
              <div className="text-sm font-bold text-white">10:00 AM — 12:00 PM</div>
              <div className="text-xs text-slate-400 mt-0.5">Worship, Word &amp; Kids Church</div>
            </div>
          </div>

          {/* Card 2: Midweek Service */}
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/30 transition-all">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Digging Deep &amp; Faith Clinic
              </div>
              <div className="text-sm font-bold text-white">Wednesdays 7:00 PM</div>
              <div className="text-xs text-slate-400 mt-0.5">In-depth Bible Study &amp; Prayer</div>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/30 transition-all">
            <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-300 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                Worship Sanctuary
              </div>
              <div className="text-sm font-bold text-white">121 E 2nd Ave</div>
              <div className="text-xs text-slate-400 mt-0.5">Roselle, NJ 07203 (Free Parking)</div>
            </div>
          </div>

          {/* Card 4: Church Calendar shortcut */}
          <button
            onClick={scrollToCalendar}
            className="flex items-start gap-3.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all text-left cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-amber-500/30 text-amber-300 shrink-0 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Church Calendar
              </div>
              <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                Upcoming Events &amp; Dates →
              </div>
              <div className="text-xs text-slate-300 mt-0.5">Outreach, Vigils &amp; Studies</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
