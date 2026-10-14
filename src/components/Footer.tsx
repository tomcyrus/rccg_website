import React, { useState } from 'react';
import { PageTab } from '../types';
import { Phone, Mail, Tv, MapPin, Send, CheckCircle2 } from 'lucide-react';
import rccgLogoImg from '../assets/images/rccg_official_logo_1791985600387.jpg';
import jesusWatermarkImg from '../assets/images/jesus_compassionate_watermark_1791985931177.jpg';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenPlanVisit: () => void;
  onOpenPrayerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenPlanVisit,
  onOpenPrayerModal,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-[#0D0D0D] text-white border-t border-white/10 pt-16 pb-12 font-sans overflow-hidden">
      {/* Sacred Watermark: Second Image of Jesus Christ with Open Loving Arms */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/2 lg:w-5/12 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <img
          src={jesusWatermarkImg}
          alt=""
          className="w-full h-full object-cover object-top opacity-15 md:opacity-25 mix-blend-screen brightness-90 contrast-125 filter pointer-events-none"
        />
        {/* Soft edge masking gradients to seamlessly fade into the dark footer background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Finsweet Template 10 Newsletter Signup Strip */}
        <div className="bg-[#161722]/90 backdrop-blur-xs border border-white/10 p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl">
          <div className="space-y-1 max-w-lg">
            <div className="text-[11px] font-condensed font-bold uppercase tracking-[0.2em] text-[#FFD2A4]">
              STAY CONNECTED
            </div>
            <h3 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide text-white">
              SUBSCRIBE TO GET LATEST UPDATES AND NEWS
            </h3>
            <p className="text-xs text-stone-300">
              Receive weekly announcements, sermon notes, and ministry encouragement delivered to your inbox.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-[#FFD2A4] bg-white/5 border border-white/10 p-3">
                <CheckCircle2 className="w-4 h-4 text-[#FFD2A4]" />
                <span>Thank you! Your email has been subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Yourmail@gmail.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-[#FFD2A4] min-h-[44px]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column: RCCG Logo with Church Name Below */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col items-start gap-3">
              <img
                src={rccgLogoImg}
                alt="The Redeemed Christian Church of God Official Logo"
                className="w-16 h-16 rounded-full object-cover shadow-lg ring-2 ring-[#FFD2A4]/60"
              />
              <div className="space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-condensed font-bold uppercase tracking-[0.18em] text-[#FFD2A4] block">
                  THE REDEEMED CHRISTIAN CHURCH OF GOD
                </span>
                <h2 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide text-white">
                  KINGDOM FIRST ASSEMBLY
                </h2>
                <span className="text-[11px] font-condensed uppercase tracking-wider text-stone-400 block">
                  ROSELLE, NEW JERSEY
                </span>
              </div>
            </div>

            <p className="text-sm font-serif italic text-stone-300 max-w-md">
              "Seeking His Kingdom First. Sharing His Love With All."
            </p>

            <p className="text-xs text-stone-400 max-w-md leading-relaxed font-sans">
              A Christ-centered, Kingdom-minded church family in Roselle, New Jersey. Dedicated to preaching Jesus Christ, nurturing believers in faith and love, and shining His light in our community.
            </p>

            <div className="text-xs text-stone-500 font-condensed uppercase tracking-wider pt-2">
              © Copyright RCCG Kingdom First Assembly {new Date().getFullYear()}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-condensed font-bold uppercase tracking-widest text-[#FFD2A4] border-b border-white/10 pb-2">
              QUICK LINKS
            </div>
            <ul className="space-y-2 text-xs font-condensed uppercase tracking-wider text-stone-300">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFD2A4] transition-colors cursor-pointer"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFD2A4] transition-colors cursor-pointer"
                >
                  ABOUT US
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFD2A4] transition-colors cursor-pointer"
                >
                  CHURCH GALLERY
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('home');
                    setTimeout(() => {
                      const el = document.getElementById('church-calendar');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-[#FFD2A4] transition-colors cursor-pointer"
                >
                  CHURCH CALENDAR
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('connect');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFD2A4] transition-colors cursor-pointer"
                >
                  GET CONNECTED &amp; CONTACT
                </button>
              </li>

              <li>
                <button
                  onClick={onOpenPlanVisit}
                  className="text-[#FFD2A4] hover:underline cursor-pointer"
                >
                  PLAN A VISIT
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrayerModal}
                  className="hover:text-[#FFD2A4] transition-colors cursor-pointer capitalize"
                >
                  Submit Prayer Request
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Service Times */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-condensed font-bold uppercase tracking-widest text-[#FFD2A4] border-b border-white/10 pb-2">
              CONNECT &amp; GATHER
            </div>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div>
                <span className="text-stone-400 block font-condensed uppercase text-[10px]">Sunday Worship:</span>
                <span className="text-white font-medium text-sm">Every Sunday at 9:00 AM</span>
              </div>

              <div>
                <span className="text-stone-400 block font-condensed uppercase text-[10px]">Wednesday Bible Study:</span>
                <span className="text-white font-medium text-sm">Every Wednesday, 7:00 PM – 8:30 PM</span>
              </div>

              <div className="pt-1">
                <span className="text-[#FFD2A4] font-condensed font-bold block text-[11px] uppercase tracking-wider">
                  Temporary Worship Location:
                </span>
                <p className="text-white text-sm">121 E 2nd Ave, Roselle, NJ 07203</p>
              </div>

              <div className="pt-2 flex flex-col space-y-2 text-stone-300 font-sans">
                <a
                  href="tel:8625207004"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FFD2A4]" />
                  <span>862-520-7004</span>
                </a>
                <a
                  href="mailto:rccgkfa@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FFD2A4]" />
                  <span>rccgkfa@gmail.com</span>
                </a>
                <a
                  href="https://www.youtube.com/@RCCGKFA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#FFD2A4] transition-colors"
                >
                  <Tv className="w-3.5 h-3.5 text-[#FFD2A4]" />
                  <span>YouTube: @RCCGKFA</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Document Baseline */}
        <div className="text-xs text-stone-400 text-center leading-relaxed font-sans">
          RCCG Kingdom First Assembly · 121 E 2nd Ave, Roselle, NJ 07203 (Temporary Worship Location) · Sunday 9:00 AM · Wednesday 7:00–8:30 PM · Contact · YouTube.
        </div>
      </div>
    </footer>
  );
};
