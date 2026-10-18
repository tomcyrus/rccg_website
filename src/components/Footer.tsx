import { addLiveVisitorInquiry } from '../utils/adminStore';
import { errorMessage } from '../utils/api';
import React, { useState } from 'react';
import { PageTab } from '../types';
import { Phone, Mail, Tv, MapPin, Send, CheckCircle2, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { ChurchBrandLogo } from './ChurchBrandLogo';
import worshipWatermarkImg from '../assets/images/giving_worship_banner_1792160660993.jpg';

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

  const [subscribeError, setSubscribeError] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || subscribing) return;
    setSubscribing(true); setSubscribeError('');
    try {
      await addLiveVisitorInquiry({ fullName: 'Newsletter subscriber', email: newsletterEmail, inquiryType: 'Newsletter Subscription', message: 'Please add me to church updates. Subscription requested through the website.' });
      setSubscribed(true);
    } catch (err) { setSubscribeError(errorMessage(err)); }
    finally { setSubscribing(false); }
  };

  return (
    <footer className="relative bg-[#0B132B] text-white border-t border-slate-800 pt-16 pb-12 font-sans overflow-hidden">
      {/* Worship Congregation Watermark */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <img
          src={worshipWatermarkImg}
          alt=""
          className="w-full h-full object-cover object-center opacity-20 sm:opacity-25 mix-blend-screen contrast-125 brightness-95 filter pointer-events-none scale-105"
        />
        {/* Soft edge masking gradients to seamlessly blend with dark footer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/75 to-[#0B132B]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-[#0B132B]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B] via-transparent to-[#0B132B]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter Callout Strip */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Stay Connected With Our Community
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Receive weekly sermon notes, uplifting devotionals, and church updates.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribeError && <p role="alert" className="mb-2 text-red-300 text-xs">{subscribeError}</p>}
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Your request for church updates has been received.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full md:w-96">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#1D63ED] flex-1"
                />
                <button
                  type="submit" disabled={subscribing}
                  className="px-5 py-2.5 rounded-lg bg-[#1D63ED] hover:bg-[#1551CA] text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  {subscribing ? 'Sending…' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-8 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <ChurchBrandLogo variant="light" size="lg" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              A Christ-centered, Spirit-filled church family in Roselle, New Jersey. Seeking His Kingdom First. Sharing His Love With All. &mdash; Matthew 6:33
            </p>
            <div className="pt-1 text-xs text-slate-400">
              Sunday Worship: <strong>10:00 AM EST</strong> (Sunday School 9:00 AM) &middot; Midweek: <strong>Wed 7:00 PM</strong>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#60A5FA] transition-colors cursor-pointer"
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
                  className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('videos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  Sermons &amp; Videos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('ebooks');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  E-Books Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Care */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={onOpenPlanVisit}
                  className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  Plan a Visit (I'm New)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrayerModal}
                  className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  Prayer Request
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('connect');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  Get Connected
                </button>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@RCCGKFA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#60A5FA] transition-colors"
                >
                  YouTube Live Stream
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#60A5FA] shrink-0 mt-0.5" />
                <span>121 E 2nd Ave, Roselle, NJ 07203</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                <a href="tel:8625207004" className="hover:text-white transition-colors">
                  (862) 520-7004
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            <span
              onClick={() => {
                onSelectTab('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-default select-none"
              title="RCCG KFA"
            >
              &copy;
            </span>{' '}
            {new Date().getFullYear()} The Redeemed Christian Church of God &mdash; Kingdom First Assembly. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>&middot;</span>
            <span>Terms of Service</span>
            <span>&middot;</span>
            <span>Roselle, New Jersey</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
