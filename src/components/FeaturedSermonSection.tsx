import React, { useState } from 'react';
import { Clock, MapPin, Calendar, Tv, ExternalLink, Copy, Check, Play } from 'lucide-react';
import { downloadServiceIcs, getGoogleCalendarUrl } from '../utils/calendar';

interface FeaturedSermonSectionProps {
  onOpenPlanVisit: () => void;
}

export const FeaturedSermonSection: React.FC<FeaturedSermonSectionProps> = ({ onOpenPlanVisit }) => {
  const [copied, setCopied] = useState(false);
  const address = '121 E 2nd Ave, Roselle, NJ 07203';

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Finsweet Template 10 Section Kicker */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
            UPCOMING WORSHIP &amp; SERMON
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-condensed font-bold uppercase tracking-tight text-[#0D0D0D]">
            JOIN US THIS SUNDAY AT 9:00 AM
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed max-w-xl mx-auto">
            Experience anointed worship, fervent prayer, and life-changing revelation from God’s Word.
          </p>
        </div>

        {/* Finsweet Template 10 Dark Featured Sermon Container */}
        <div className="bg-[#161722] text-white border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle gold line on top */}
          <div className="h-1 bg-[#FFD2A4] w-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-8 lg:p-12 items-center">
            {/* Left Column: Sermon & Gathering Details */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="bg-[#FFD2A4] text-[#0D0D0D] font-condensed font-bold uppercase text-[11px] sm:text-xs px-2.5 py-1 tracking-wider">
                  UPCOMING SERVICE
                </span>
                <span className="text-[11px] sm:text-xs font-condensed uppercase tracking-wider text-white/70">
                  EVERY SUNDAY MORNING
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-condensed font-bold uppercase tracking-wide text-white leading-tight">
                SEEKING HIS KINGDOM &amp; WALKING IN DIVINE PURPOSE
              </h3>

              <div className="text-xs sm:text-sm font-serif italic text-[#FFD2A4]">
                "Understanding who we are in Christ produces conviction, strengthens our faith, and builds confidence."
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                Whether you are joining us in person at our temporary worship sanctuary in Roselle, NJ, or tuning in through our live YouTube broadcast, we invite you to encounter God's tangible presence with us.
              </p>

              {/* Service Schedule Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs">
                <div className="space-y-1 bg-white/5 p-3 rounded-none">
                  <div className="flex items-center gap-2 text-[#FFD2A4] font-condensed font-bold uppercase">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>SUNDAY SERVICE</span>
                  </div>
                  <div className="text-base font-condensed font-bold text-white">9:00 AM – 11:00 AM</div>
                  <div className="text-[11px] text-stone-400">Praise, Scripture &amp; Communion</div>
                </div>

                <div className="space-y-1 bg-white/5 p-3 rounded-none">
                  <div className="flex items-center gap-2 text-[#FFD2A4] font-condensed font-bold uppercase">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>WEDNESDAY BIBLE STUDY</span>
                  </div>
                  <div className="text-base font-condensed font-bold text-white">7:00 PM – 8:30 PM</div>
                  <div className="text-[11px] text-stone-400">Interactive scripture reflection</div>
                </div>
              </div>

              {/* Temporary Location Card */}
              <div className="bg-black/40 border border-white/10 p-3 sm:p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-condensed font-bold uppercase tracking-wider text-[#A6262B] bg-red-950/60 border border-red-800/60 px-2 py-0.5">
                    TEMPORARY WORSHIP LOCATION
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-[11px] text-[#FFD2A4] hover:underline flex items-center gap-1 cursor-pointer py-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Address'}</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FFD2A4] shrink-0" />
                  <span className="break-words">121 E 2nd Ave, Roselle, NJ 07203</span>
                </div>
              </div>

              {/* Action Buttons: Responsive full-width on mobile */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenPlanVisit}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer text-center min-h-[44px] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#0D0D0D]" />
                  <span>PLAN YOUR VISIT</span>
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 border border-white/20 hover:border-white text-white font-condensed font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <span>GET DIRECTIONS</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FFD2A4]" />
                </a>

                <button
                  onClick={() => downloadServiceIcs('sunday')}
                  className="w-full sm:w-auto px-4 py-3 text-stone-400 hover:text-white font-condensed uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#FFD2A4]" />
                  <span>ADD TO CALENDAR</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Video / Stream Preview Box */}
            <div className="lg:col-span-5">
              <a
                href="https://www.youtube.com/@RCCGKFA"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-video bg-black overflow-hidden border border-white/20 shadow-xl"
              >
                <img
                  src="/src/assets/images/gallery_worship_service_1791982292757.jpg"
                  alt="RCCG Kingdom First Assembly Worship Choir"
                  className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFD2A4] text-[#0D0D0D] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-[#0D0D0D] ml-0.5 sm:ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-condensed font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                    YOUTUBE LIVESTREAM
                  </span>
                  <span className="text-[#FFD2A4] text-[10px] sm:text-[11px] font-mono">
                    @RCCGKFA
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
