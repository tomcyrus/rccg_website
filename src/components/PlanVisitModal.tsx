import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, Check, ExternalLink, Calendar, Heart } from 'lucide-react';
import { downloadServiceIcs, getGoogleCalendarUrl } from '../utils/calendar';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const address = '121 E 2nd Ave, Roselle, NJ 07203';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-stone-200 rounded-none shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-visit-title"
      >
        {/* Header Ribbon */}
        <div className="bg-[#161722] text-white px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <p className="text-[10px] sm:text-[11px] font-condensed font-bold uppercase tracking-[0.2em] text-[#FFD2A4] mb-0.5 sm:mb-1">
              THE REDEEMED CHRISTIAN CHURCH OF GOD
            </p>
            <h2 id="plan-visit-title" className="text-xl sm:text-2xl font-condensed font-bold uppercase text-white tracking-wide">
              PLAN YOUR VISIT
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="min-w-[44px] min-h-[44px] p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto text-stone-800">
          {/* Welcome Note */}
          <div className="border-b border-stone-200 pb-5">
            <h3 className="text-lg font-serif font-semibold text-[#0E3326] mb-1">
              We look forward to worshiping with you!
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Whether you are looking for a church home, exploring the Christian faith, or simply seeking a welcoming place to worship, you belong here. Come as you are.
            </p>
          </div>

          {/* Schedule & Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Times */}
            <div className="bg-white p-4 border border-stone-200">
              <div className="flex items-center gap-2 text-[#0E3326] font-medium text-xs tracking-wider uppercase mb-2">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Gathering Schedule</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-stone-900">Sunday Worship Service</div>
                  <div className="text-lg font-serif font-bold text-[#0E3326]">9:00 AM</div>
                  <p className="text-xs text-stone-500">Uplifting praise, communion with God, and life-changing biblical teaching.</p>
                </div>
                <div className="pt-2 border-t border-stone-100">
                  <div className="text-sm font-semibold text-stone-900">Wednesday Bible Study</div>
                  <div className="text-base font-serif font-bold text-[#0E3326]">7:00 PM – 8:30 PM</div>
                  <p className="text-xs text-stone-500">Interactive scripture reflection and prayer.</p>
                </div>
              </div>

              {/* Add to calendar */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => downloadServiceIcs('sunday')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#0E3326]" />
                  Download Sunday .ICS
                </button>
                <a
                  href={getGoogleCalendarUrl('sunday')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                >
                  Google Calendar <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white p-4 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#0E3326] font-medium text-xs tracking-wider uppercase mb-2">
                  <MapPin className="w-4 h-4 text-[#A6262B]" />
                  <span>Worship Location</span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A6262B] bg-red-50 px-2 py-0.5 inline-block mb-1">
                    Temporary Worship Location
                  </span>
                  <div className="text-base font-serif font-bold text-stone-900">{address}</div>
                  <p className="text-xs text-stone-500 mt-1">
                    Conveniently located in Roselle, NJ with street and nearby area parking.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-100">
                <button
                  onClick={handleCopyAddress}
                  className="w-full text-xs font-medium py-2 px-3 border border-stone-300 hover:border-[#0E3326] hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 text-stone-800"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Address Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <span>Copy Exact Address</span>
                    </>
                  )}
                </button>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-xs font-condensed font-bold uppercase tracking-wider py-2.5 px-3 bg-[#161722] text-[#FFD2A4] hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                >
                  Open in Google Maps <ExternalLink className="w-3.5 h-3.5 text-[#FFD2A4]" />
                </a>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-[#FAF4EB] border border-[#E8DEC8] p-4 space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-[#0E3326] font-semibold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
              What to Expect on Sunday
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700 pt-1">
              <div>
                <strong className="block text-stone-900 font-semibold mb-0.5">Warm Welcome</strong>
                Our team will greet you with a genuine smile and help you find a comfortable seat.
              </div>
              <div>
                <strong className="block text-stone-900 font-semibold mb-0.5">Atmosphere of Grace</strong>
                Come dressed in whatever makes you feel comfortable, from Sunday best to casual attire.
              </div>
              <div>
                <strong className="block text-stone-900 font-semibold mb-0.5">God's Word</strong>
                Biblically sound, practical teaching centered on Jesus Christ and His Kingdom.
              </div>
            </div>
          </div>

          {/* Need assistance? */}
          <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-200">
            <span>Have questions prior to your arrival?</span>
            <a
              href="tel:8625207004"
              className="inline-flex items-center gap-1 text-[#0E3326] font-semibold hover:underline"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              Call (862) 520-7004
            </a>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-stone-100 px-6 py-3 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-stone-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
