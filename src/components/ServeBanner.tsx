import React, { useState } from 'react';
import { PageTab } from '../types';
import { ArrowRight, Flame, Heart, Copy, Check, ShieldCheck, Sparkles, Send } from 'lucide-react';
import fellowshipImg from '../assets/images/gallery_family_fellowship_1791982293989.jpg';

interface ServeBannerProps {
  onOpenPlanVisit: () => void;
  onSelectTab: (tab: PageTab) => void;
}

export const ServeBanner: React.FC<ServeBannerProps> = ({
  onOpenPlanVisit,
  onSelectTab,
}) => {
  const [copiedZelle, setCopiedZelle] = useState(false);
  const zelleEmail = 'rccgkfa@gmail.com';

  const handleCopyZelle = () => {
    navigator.clipboard.writeText(zelleEmail);
    setCopiedZelle(true);
    setTimeout(() => setCopiedZelle(false), 2500);
  };

  return (
    <section id="giving-section" className="relative py-20 sm:py-28 bg-[#0A192F] text-white overflow-hidden border-b border-stone-200">
      {/* Background Divine Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={fellowshipImg}
          alt="RCCG Kingdom First Assembly Family"
          className="w-full h-full object-cover brightness-[0.22] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#0A192F]/80 to-[#0A192F]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Kingdom Mission & Calling */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>A City Set on a Hill</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Shining His Light &amp; Partnering in God's Work
            </h2>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-xl mx-auto lg:mx-0">
              <p className="font-serif italic text-amber-100 text-sm sm:text-base">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mt-2">
                — 2 Corinthians 9:7
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
              Your faithful tithes, offerings, and generosity fuel the preaching of the Gospel, 
              local benevolence in Roselle, youth and children's discipleship, and community outreach programs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenPlanVisit}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Join Us in Worship</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onSelectTab('connect');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-all"
              >
                Get Connected &amp; Serve
              </button>
            </div>
          </div>

          {/* Right Column: Convenient Giving Channels Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
                    <Heart className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">Ways to Give</h3>
                    <p className="text-xs text-slate-400">Convenient, secure electronic giving</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Secure
                </span>
              </div>

              {/* Giving Method 1: Zelle */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Option 1 · Zelle Transfer
                  </span>
                  <span className="text-[11px] text-slate-400">Zero processing fee</span>
                </div>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-sm font-mono font-semibold text-white truncate">
                    {zelleEmail}
                  </span>
                  <button
                    onClick={handleCopyZelle}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    {copiedZelle ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Open your bank app (Chase, BoA, Wells Fargo, etc.) and send to <strong>{zelleEmail}</strong> with memo: <em>Tithes, Offering, or Building Fund</em>.
                </p>
              </div>

              {/* Giving Method 2: CashApp & In-Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-bold text-emerald-300">Option 2 · Cash App</div>
                  <div className="text-white font-mono font-semibold">$RCCGKFA</div>
                  <div className="text-[10px] text-slate-400">Memo: Your Name &amp; Giving category</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-bold text-blue-300">Option 3 · In-Person &amp; Mail</div>
                  <div className="text-white font-medium">121 E 2nd Ave, Roselle, NJ</div>
                  <div className="text-[10px] text-slate-400">Envelopes available at all services</div>
                </div>
              </div>

              {/* Integrity Notice */}
              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All gifts are tax-deductible as provided by law under 501(c)(3) church status.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
