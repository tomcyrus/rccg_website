import React, { useState } from 'react';
import { PageTab } from '../types';
import { Heart, Copy, Check, ShieldCheck, ExternalLink } from 'lucide-react';
import givingBannerImg from '../assets/images/giving_worship_banner_1792160660993.jpg';

interface ServeBannerProps {
  onOpenPlanVisit: () => void;
  onSelectTab: (tab: PageTab) => void;
}

export const ServeBanner: React.FC<ServeBannerProps> = ({
  onOpenPlanVisit,
  onSelectTab,
}) => {
  const [giveModalOpen, setGiveModalOpen] = useState(false);
  const [copiedZelle, setCopiedZelle] = useState(false);
  const zelleEmail = 'rccgkfa@gmail.com';

  const handleCopyZelle = () => {
    navigator.clipboard.writeText(zelleEmail);
    setCopiedZelle(true);
    setTimeout(() => setCopiedZelle(false), 2500);
  };

  return (
    <>
      <section id="giving-section" className="relative py-20 sm:py-28 bg-[#0C2356] text-white overflow-hidden">
        {/* Background Atmosphere Image with Royal Blue Lighting matching template */}
        <div className="absolute inset-0 z-0">
          <img
            src={givingBannerImg}
            alt="Congregation with hands lifted in worship and giving"
            className="w-full h-full object-cover object-center brightness-60 contrast-115"
          />
          {/* Deep Royal Blue gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07132B]/95 via-[#0E2C6E]/80 to-[#07132B]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D1F] via-transparent to-[#070D1F]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-5">
            
            {/* Template Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Be Part of What God Is Doing
            </h2>

            {/* Template Subtext */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl">
              Your generosity helps us reach more people and make a lasting impact in our community and beyond.
            </p>

            {/* Primary Action Button matching template */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setGiveModalOpen(true)}
                className="px-8 py-3.5 rounded-lg bg-[#1D63ED] hover:bg-[#1551CA] text-white font-semibold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                Give Now
              </button>

              <button
                onClick={handleCopyZelle}
                className="px-5 py-3 rounded-lg bg-black/40 hover:bg-black/60 text-white font-medium text-sm border border-white/30 hover:border-white transition-all cursor-pointer flex items-center gap-2"
              >
                {copiedZelle ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Zelle Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300" />
                    <span>Quick Zelle: {zelleEmail}</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-slate-300 pt-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Tax-Deductible · Secure Online Giving via Zelle or Card</span>
            </div>

          </div>
        </div>
      </section>

      {/* Give Modal */}
      {giveModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-[#0F172A] shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">Support God's Kingdom</h3>
                <p className="text-xs text-slate-500 mt-1">Thank you for your generous partnership and faith.</p>
              </div>
              <button
                onClick={() => setGiveModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Zelle Option */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-[#1D63ED] uppercase tracking-wider mb-1">Method 1: Zelle Transfer (Recommended)</div>
                <div className="text-sm font-medium text-slate-800">Direct instant transfer with zero processing fees:</div>
                <div className="flex items-center justify-between gap-2 mt-2 bg-white p-3 rounded-lg border border-slate-200 font-mono text-sm">
                  <span className="font-semibold text-slate-900 select-all">{zelleEmail}</span>
                  <button
                    onClick={handleCopyZelle}
                    className="px-3 py-1 bg-[#1D63ED] text-white text-xs font-semibold rounded-md hover:bg-[#1551CA]"
                  >
                    {copiedZelle ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 mt-1.5">Recipient Name: RCCG Kingdom First Assembly</div>
              </div>

              {/* In-Person & Mailing */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Method 2: In-Person / Checks</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Giving envelopes available during Sunday Worship (9:00 AM &amp; 11:00 AM) or mail checks payable to <strong>RCCG Kingdom First Assembly</strong> at 121 E 2nd Ave, Roselle, NJ 07203.
                </div>
              </div>
            </div>

            <button
              onClick={() => setGiveModalOpen(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
