import React from 'react';
import { Tv, Play, ExternalLink, Radio, Check } from 'lucide-react';
import heroImg from '../assets/images/hero_church_sanctuary_1791981782802.jpg';

export const WatchOnlineSection: React.FC = () => {
  const youtubeUrl = 'https://www.youtube.com/@RCCGKFA';

  return (
    <section className="py-20 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#0E3326] text-white p-8 sm:p-12 md:p-14 relative overflow-hidden shadow-xl">
          {/* Subtle gold watermark cross / accent */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#154B38]/40 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Text & Invitation */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#E0B86C] font-semibold">
                <Radio className="w-3.5 h-3.5 text-[#A6262B]" />
                <span>Livestream &amp; Media Ministry</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Watch Us Online
              </h2>

              <p className="text-base text-stone-200 font-sans leading-relaxed max-w-xl">
                Can’t join us in person? Worship with us online through our official YouTube channel, where you can watch our Sunday worship services, biblical messages, and prayer sessions from anywhere.
              </p>

              {/* Benefits */}
              <div className="space-y-2 pt-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E0B86C]" />
                  <span>Sunday morning live worship stream broadcasts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E0B86C]" />
                  <span>Full sermon archive for personal study and family devotionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E0B86C]" />
                  <span>Subscribe and turn on notifications for service alerts</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#A6262B] hover:bg-[#B91C1C] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-md"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Go to YouTube Channel</span>
                  <ExternalLink className="w-3 h-3 text-stone-300" />
                </a>

                <span className="text-xs text-stone-400 font-mono">
                  @RCCGKFA
                </span>
              </div>
            </div>

            {/* Right Column: Visual Player Card Frame */}
            <div className="lg:col-span-5">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative bg-black/40 border border-white/20 p-4 transition-all hover:border-[#E0B86C]"
              >
                <div className="aspect-video bg-stone-900 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={heroImg}
                    alt="RCCG Kingdom First Assembly Livestream"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* Play Button */}
                  <div className="w-14 h-14 rounded-full bg-[#A6262B] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex justify-between items-center z-10">
                    <span className="font-serif italic text-stone-200">RCCG Kingdom First Assembly Live</span>
                    <span className="bg-[#A6262B] text-[10px] uppercase font-bold px-1.5 py-0.5">YouTube</span>
                  </div>
                </div>

                <div className="pt-3 text-center text-xs text-stone-300 group-hover:text-white transition-colors">
                  Click to open <strong className="text-[#E0B86C]">youtube.com/@RCCGKFA</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
