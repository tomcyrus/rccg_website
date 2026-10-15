import React, { useState } from 'react';
import { Clock, MapPin, Calendar, Tv, ExternalLink, Copy, Check, Play, BookOpen, Volume2, Sparkles, Heart } from 'lucide-react';
import { downloadServiceIcs, getGoogleCalendarUrl } from '../utils/calendar';
import sanctuaryImg from '../assets/images/hero_church_sanctuary_1791981782802.jpg';

interface FeaturedSermonSectionProps {
  onOpenPlanVisit: () => void;
  onNavigateVideos?: () => void;
}

export const FeaturedSermonSection: React.FC<FeaturedSermonSectionProps> = ({ onOpenPlanVisit, onNavigateVideos }) => {
  const [copied, setCopied] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const address = '121 E 2nd Ave, Roselle, NJ 07203';

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wider uppercase">
            <Tv className="w-3.5 h-3.5 text-amber-700" />
            <span>Word &amp; Worship Media</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
            Hear the Word &amp; Experience His Presence
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Every message is grounded in Scripture, pointing you to Jesus Christ and equipping you with 
            practical spiritual principles for life, family, and victory.
          </p>
        </div>

        {/* Featured Message Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0A192F] via-[#102A43] to-[#0A192F] text-white shadow-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            {/* Left Column: Sermon Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
                  Featured Message
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-medium backdrop-blur-xs">
                  Kingdom Dominion Series
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                  Seeking God's Kingdom First in a Distracted World
                </h3>
                <div className="text-xs sm:text-sm text-amber-300 font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Scripture: Matthew 6:25–34 &amp; Romans 8:31–37</span>
                </div>
              </div>

              <blockquote className="border-l-2 border-amber-400 pl-4 italic text-slate-300 text-sm sm:text-base font-serif">
                "When God's Kingdom is your first priority, His righteousness becomes your shield, 
                and His divine provision follows every step of your obedience."
              </blockquote>

              {/* Service Logistics Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Sunday Celebration</div>
                    <div className="text-slate-400">10:00 AM EST (In-Person &amp; Live)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">121 E 2nd Ave</div>
                    <div className="text-slate-400 truncate">Roselle, NJ 07203</div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onNavigateVideos && (
                  <button
                    onClick={onNavigateVideos}
                    className="px-5 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Tv className="w-4 h-4 text-amber-300" />
                    <span>Browse Video Gallery</span>
                  </button>
                )}

                <a
                  href="https://www.youtube.com/@RCCGKFA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch on YouTube</span>
                </a>

                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>{showNotes ? 'Hide Key Notes' : 'Read Sermon Notes'}</span>
                </button>

                <button
                  onClick={onOpenPlanVisit}
                  className="px-5 py-3 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold text-xs sm:text-sm border border-amber-400/40 transition-all cursor-pointer"
                >
                  Join Us Live
                </button>
              </div>

              {/* Collapsible Key Notes */}
              {showNotes && (
                <div className="p-5 rounded-2xl bg-black/40 border border-white/15 space-y-3 text-xs sm:text-sm animate-in fade-in duration-200">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>3 Core Takeaways from the Message:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    <li><strong>Priority Determines Destiny:</strong> What sits at the center of your heart dictates the direction of your peace and purpose.</li>
                    <li><strong>Freedom from Anxiety:</strong> Matthew 6:33 invites believers to exchange worry for worship, trusting our Heavenly Father who knows all needs.</li>
                    <li><strong>Righteousness in Practice:</strong> Seeking God's righteousness touches how we conduct our family life, business integrity, and interpersonal relationships.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Visual Video Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl relative group">
                <img
                  src={sanctuaryImg}
                  alt="RCCG Kingdom First Assembly Worship Sanctuary"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                
                {/* Center Play Button Overlay */}
                <a
                  href="https://www.youtube.com/@RCCGKFA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Play Featured Message on YouTube"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-2xl pl-1 ring-8 ring-amber-400/20 hover:bg-amber-300 transition-colors">
                    <Play className="w-8 h-8 fill-slate-950" />
                  </div>
                </a>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-medium bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    Sunday Broadcast Archive
                  </span>
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    Full Audio &amp; Video
                  </span>
                </div>
              </div>

              {/* Add to Calendar Strip */}
              <div className="mt-4 flex items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="text-slate-300">Set a reminder for Sunday:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={getGoogleCalendarUrl('sunday')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-medium underline"
                  >
                    Google Cal
                  </a>
                  <span className="text-white/20">·</span>
                  <button
                    onClick={() => downloadServiceIcs('sunday')}
                    className="text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
                  >
                    iCal (.ics)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
