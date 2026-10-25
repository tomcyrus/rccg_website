import { addLiveVisitorInquiry } from '../utils/adminStore';
import { errorMessage } from '../utils/api';
import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, Check, ExternalLink, Calendar, Heart, Sparkles, UserCheck } from 'lucide-react';
import { downloadServiceIcs, getGoogleCalendarUrl } from '../utils/calendar';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [visitName, setVisitName] = useState('');
  const [visitEmail, setVisitEmail] = useState('');
  const [visitNote, setVisitNote] = useState('');
  const [visitStatus, setVisitStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [visitError, setVisitError] = useState('');
  const submitVisit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (visitStatus === 'sending') return;
    setVisitStatus('sending'); setVisitError('');
    try {
      await addLiveVisitorInquiry({ fullName: visitName, email: visitEmail, inquiryType: 'Plan a Visit', message: visitNote.trim() || 'I am planning to visit a Sunday service. Please welcome me.' });
      setVisitStatus('sent');
    } catch (err) { setVisitStatus('idle'); setVisitError(errorMessage(err)); }
  };

  if (!isOpen) return null;

  const address = '121 E 2nd Ave, Roselle, NJ 07203';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-amber-500/20 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-visit-title"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#071324] via-[#0A192F] to-[#071324] text-white px-6 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome to RCCG Kingdom First Assembly</span>
            </div>
            <h2 id="plan-visit-title" className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Plan Your Visit This Sunday
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-stone-800">
          {/* Welcome Note */}
          <div className="border-b border-stone-200/80 pb-5">
            <h3 className="text-xl font-serif font-bold text-[#0A192F] mb-1">
              We Look Forward to Welcoming You &amp; Your Family!
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              Whether you are looking for a spiritual home, visiting Roselle, or exploring faith in Jesus Christ, you have a warm place at our table. Come as you are.
            </p>
          </div>

          {/* Quick FAQ / What to Expect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1 shadow-xs">
              <span className="font-bold text-emerald-800 block text-xs uppercase tracking-wider">
                What Should I Wear?
              </span>
              <p className="text-stone-600 leading-relaxed">
                Come comfortably! From traditional Sunday best to casual business attire, you will feel completely at home.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1 shadow-xs">
              <span className="font-bold text-amber-800 block text-xs uppercase tracking-wider">
                What About Children?
              </span>
              <p className="text-stone-600 leading-relaxed">
                Victorious Kids Church is available with safe, engaging Bible stories, songs, and activities tailored for your children.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1 shadow-xs">
              <span className="font-bold text-blue-800 block text-xs uppercase tracking-wider">
                Parking &amp; Arrival
              </span>
              <p className="text-stone-600 leading-relaxed">
                Free street and municipal lot parking is available right along 2nd Ave. We recommend arriving 10 minutes early.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1 shadow-xs">
              <span className="font-bold text-rose-800 block text-xs uppercase tracking-wider">
                First-Time Gift
              </span>
              <p className="text-stone-600 leading-relaxed">
                Our hospitality ushers have a special welcome pack and light refreshments prepared just for our first-time guests!
              </p>
            </div>
          </div>

          {/* Schedule & Location */}
          <div className="rounded-2xl bg-amber-50/60 border border-amber-200/60 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/40 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                  Service Schedule
                </span>
                <span className="text-base font-bold text-[#0A192F]">
                  Sundays: 9:00 AM – 11:30 AM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={getGoogleCalendarUrl('sunday')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-stone-800 text-xs font-semibold hover:bg-amber-100 transition-colors inline-flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>Google Cal</span>
                </a>
                <button
                  onClick={() => downloadServiceIcs('sunday')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-stone-800 text-xs font-semibold hover:bg-amber-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>iCal (.ics)</span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Sanctuary Location
              </span>
              <p className="text-sm font-semibold text-[#0A192F] mt-0.5">{address}</p>
              <div className="flex items-center gap-2 pt-2.5">
                <button
                  onClick={handleCopyAddress}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                  <span>{copied ? 'Copied Address' : 'Copy Address'}</span>
                </button>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3 text-amber-300" />
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <h3 className="text-lg font-serif font-bold">Let us know you’re coming</h3>
            {visitStatus === 'sent' ? <p role="status" className="mt-3 text-emerald-800">Your visit request has been received. Our welcome team looks forward to meeting you.</p> :
              <form onSubmit={submitVisit} className="mt-3 space-y-3 text-sm">
                {visitError && <p role="alert" className="text-red-700">{visitError}</p>}
                <label className="block">Your name<input required className="mt-1 w-full border rounded-lg p-2" value={visitName} onChange={e => setVisitName(e.target.value)} /></label>
                <label className="block">Email<input type="email" required className="mt-1 w-full border rounded-lg p-2" value={visitEmail} onChange={e => setVisitEmail(e.target.value)} /></label>
                <label className="block">Visit date, guests, or questions (optional)<textarea className="mt-1 w-full border rounded-lg p-2" value={visitNote} onChange={e => setVisitNote(e.target.value)} /></label>
                <button disabled={visitStatus === 'sending'} className="rounded-full px-5 py-2 bg-emerald-800 text-white">{visitStatus === 'sending' ? 'Sending…' : 'Send visit request'}</button>
              </form>}
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Questions? Call us at <strong>(862) 205-5958</strong></span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Got it, See You Sunday!
          </button>
        </div>
      </div>
    </div>
  );
};
