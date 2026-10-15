import React, { useState } from 'react';
import { PageTab } from '../types';
import { Phone, Mail, Tv, MapPin, Send, CheckCircle2, Heart, Sparkles, ArrowRight } from 'lucide-react';
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
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-[#071324] text-white border-t border-amber-500/20 pt-16 pb-12 font-sans overflow-hidden">
      {/* Sacred Watermark: Second Image of Jesus Christ with Open Loving Arms */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/2 lg:w-5/12 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <img
          src={jesusWatermarkImg}
          alt=""
          className="w-full h-full object-cover object-top opacity-20 md:opacity-30 mix-blend-screen brightness-95 contrast-125 filter pointer-events-none"
        />
        {/* Soft edge masking gradients to seamlessly fade into the dark church footer background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#071324]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-[#071324]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071324] via-transparent to-[#071324]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Newsletter & Fellowship Strip */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Connected in Faith</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Subscribe for Weekly Word &amp; Announcements
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Receive weekly scripture encouragement, pastoral updates, and event notifications delivered directly to your inbox.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2.5 text-sm text-amber-300 bg-amber-500/10 border border-amber-400/30 p-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>God bless you! Your email has been subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-black/40 border border-white/20 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-400 min-h-[44px]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold text-xs tracking-wide transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 shadow-md shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column: Official RCCG Logo with Church Name Below */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col items-start gap-3">
              <div className="p-1 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md">
                <img
                  src={rccgLogoImg}
                  alt="The Redeemed Christian Church of God Official Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400 block">
                  The Redeemed Christian Church of God
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Kingdom First Assembly
                </h2>
                <span className="text-xs text-amber-300 font-medium block">
                  Roselle, New Jersey · Seeking His Kingdom First
                </span>
              </div>
            </div>

            <p className="text-sm font-serif italic text-slate-300 max-w-md">
              "Seeking His Kingdom First. Sharing His Love With All." — Matthew 6:33
            </p>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans">
              A Christ-centered, Spirit-filled church family in Roselle, New Jersey. 
              Dedicated to proclaiming Jesus Christ, nurturing believers in love and spiritual maturity, 
              and making disciples across Union County and the nations.
            </p>

            {/* RCCG Worldwide Vision */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-md">
              <strong className="text-amber-300 block mb-0.5">RCCG Global Mission:</strong>
              To make heaven. To take as many people with us. To have a member of RCCG in every family of all nations.
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2">
              Navigation &amp; Community
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  About Us &amp; Doctrine
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
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Church Calendar</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded-sm">Events</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('videos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Video Gallery</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-red-500/20 text-red-300 rounded-sm">YouTube</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('ebooks');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>E-Books &amp; Library</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded-sm">Free</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('connect');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Ministries &amp; Connect
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-slate-400 flex items-center gap-1.5"
                >
                  <span>Church Administration</span>
                  <span className="text-[9px] px-1 py-0.2 bg-white/10 text-slate-300 rounded-sm">Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('home');
                    setTimeout(() => {
                      const el = document.getElementById('giving-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-amber-300 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <Heart className="w-3.5 h-3.5 fill-amber-300" />
                  <span>Online Giving &amp; Tithes</span>
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenPlanVisit}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[11px] transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Plan a Visit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrayerModal}
                  className="text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Submit Prayer Request
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Service Times */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-white/10 pb-2">
              Gatherings &amp; Contact
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-amber-300 block font-semibold text-[11px] uppercase">Sunday Celebration:</span>
                <span className="text-white font-medium text-sm">Every Sunday at 10:00 AM EST</span>
                <p className="text-[11px] text-slate-400">Word, Worship &amp; Children's Church</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-emerald-400 block font-semibold text-[11px] uppercase">Midweek Digging Deep:</span>
                <span className="text-white font-medium text-sm">Wednesdays, 7:00 PM – 8:30 PM</span>
                <p className="text-[11px] text-slate-400">Interactive Bible Study &amp; Faith Clinic</p>
              </div>

              <div className="pt-1 flex flex-col space-y-2 text-slate-300 font-sans">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=121+E+2nd+Ave+Roselle+NJ+07203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>121 E 2nd Ave, Roselle, NJ 07203</span>
                </a>

                <a
                  href="tel:8625207004"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>(862) 520-7004</span>
                </a>

                <a
                  href="mailto:rccgkfa@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>rccgkfa@gmail.com</span>
                </a>

                <a
                  href="https://www.youtube.com/@RCCGKFA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors font-semibold"
                >
                  <Tv className="w-4 h-4 text-red-400 shrink-0" />
                  <span>YouTube: @RCCGKFA</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Document Baseline */}
        <div className="text-xs text-slate-400 text-center leading-relaxed font-sans flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} RCCG Kingdom First Assembly. All rights reserved.
          </span>
          <span className="text-slate-500 text-[11px]">
            121 E 2nd Ave, Roselle, NJ 07203 · The Redeemed Christian Church of God
          </span>
        </div>
      </div>
    </footer>
  );
};
