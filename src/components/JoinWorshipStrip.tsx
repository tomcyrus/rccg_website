import React, { useState } from 'react';
import { Clock, MapPin, Phone, Calendar, Copy, Check, ExternalLink } from 'lucide-react';
import { downloadServiceIcs, getGoogleCalendarUrl } from '../utils/calendar';

interface JoinWorshipStripProps {
  onOpenPlanVisit: () => void;
}

export const JoinWorshipStrip: React.FC<JoinWorshipStripProps> = ({ onOpenPlanVisit }) => {
  const [copied, setCopied] = useState(false);
  const address = '121 E 2nd Ave, Roselle, NJ 07203';

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white border-b border-stone-200 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FAF8F5] border border-stone-200 p-6 sm:p-8 md:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Column 1: Title & Heartfelt Welcome */}
            <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs uppercase tracking-widest text-[#0E3326] font-semibold block">
                Gather With Us
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#0E3326]">
                Join Us for Worship
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                We look forward to worshiping with you and your family! Whether visiting for the first time or seeking a permanent church home, our doors and hearts are wide open.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenPlanVisit}
                  className="text-xs font-semibold uppercase tracking-wider text-[#0E3326] hover:text-[#154B38] underline underline-offset-4 cursor-pointer"
                >
                  View First-Time Guest Guide →
                </button>
              </div>
            </div>

            {/* Column 2: Sunday & Wednesday Schedule */}
            <div className="lg:col-span-4 space-y-5 border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#0E3326] text-[#E0B86C] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">Every Sunday</div>
                  <div className="text-xl font-serif font-bold text-[#0E3326]">Sunday Worship Service</div>
                  <div className="text-sm font-semibold text-[#A6262B]">9:00 AM</div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-600">
                    <button
                      onClick={() => downloadServiceIcs('sunday')}
                      className="hover:text-[#0E3326] underline transition-colors cursor-pointer"
                    >
                      Add to Calendar (.ics)
                    </button>
                    <span>·</span>
                    <a
                      href={getGoogleCalendarUrl('sunday')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0E3326] underline transition-colors"
                    >
                      Google Cal
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-stone-200">
                <div className="p-2.5 bg-[#0E3326] text-[#E0B86C] shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">Every Wednesday</div>
                  <div className="text-xl font-serif font-bold text-[#0E3326]">Bible Study</div>
                  <div className="text-sm font-semibold text-stone-800">7:00 PM – 8:30 PM</div>
                  <p className="text-xs text-stone-500 mt-0.5">Nurturing faith, doctrine, and fellowship.</p>
                </div>
              </div>
            </div>

            {/* Column 3: Location Details & Quick Actions */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#A6262B] text-white shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#A6262B] block">
                    Temporary Worship Location
                  </span>
                  <div className="text-lg font-serif font-bold text-stone-900 leading-tight">
                    121 E 2nd Ave
                  </div>
                  <div className="text-sm text-stone-600">Roselle, NJ 07203</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 pt-2">
                <div className="flex gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-[#0E3326] text-white hover:bg-[#154B38] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-[#E0B86C]" />
                  </a>

                  <button
                    onClick={handleCopy}
                    className="px-3 py-2 border border-stone-300 hover:border-stone-500 bg-white text-stone-800 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    title="Copy full address to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <a
                  href="tel:8625207004"
                  className="px-4 py-2 border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call: (862) 520-7004</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
