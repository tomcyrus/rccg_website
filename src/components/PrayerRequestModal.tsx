import { errorMessage } from '../utils/api';
import React, { useState } from 'react';
import { X, Send, HeartHandshake, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { addLivePrayerRequest } from '../utils/adminStore';

interface PrayerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerRequestModal: React.FC<PrayerRequestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Healing & Health');
  const [requestText, setRequestText] = useState('');
  const [isConfidential, setIsConfidential] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true); setSubmitError('');
    try {
      await addLivePrayerRequest({
        name: name.trim() || 'Anonymous Believer',
        email: email.trim(),
        category,
        requestText: requestText.trim(),
        isConfidential,
      });
      setIsSubmitted(true);
    } catch (err) { setSubmitError(errorMessage(err)); }
    finally { setSubmitting(false); }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setRequestText('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] border border-amber-500/20 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prayer-modal-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#071324] via-[#0A192F] to-[#071324] text-white px-6 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Standing Together in Faith</span>
            </div>
            <h2 id="prayer-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Submit a Prayer Request
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

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#0A192F]">
                We Stand With You in Prayer
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                Thank you, <strong className="text-stone-900">{name || 'Beloved in Christ'}</strong>. Your prayer request has been delivered to our pastoral intercessory team.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs italic font-serif text-amber-900">
                "Again I say to you, that if two of you agree on earth concerning anything that they ask, it will be done for them by My Father in heaven." — Matthew 18:19
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  Close &amp; Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {submitError && <p role="alert" className="text-red-700">{submitError}</p>}
              {submitting && <p role="status">Sending…</p>}
              <p className="text-xs text-stone-600 leading-relaxed">
                Whatever burden you are carrying, God hears and answers prayer. Our intercessors pray over every request weekly during Wednesday Faith Clinic and Sunday services.
              </p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Name <span className="text-stone-400 font-normal">(optional or anonymous)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sister Mary / Brother David"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address <span className="text-stone-400 font-normal">(optional, for pastoral follow-up)</span>
                </label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Prayer Focus Area
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-emerald-700 cursor-pointer"
                >
                  <option value="Healing & Health">Divine Healing &amp; Health</option>
                  <option value="Family & Marriage">Family, Marriage &amp; Children</option>
                  <option value="Spiritual Growth & Deliverance">Spiritual Growth &amp; Deliverance</option>
                  <option value="Financial Breakthrough & Jobs">Career, Business &amp; Divine Provision</option>
                  <option value="Salvation of Loved Ones">Salvation of Loved Ones</option>
                  <option value="Thanksgiving & Testimony">Thanksgiving &amp; Praise Report</option>
                  <option value="Other Prayer Needs">Other Needs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Prayer Request <span className="text-red-700">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please share what you are trusting God for..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  className="w-full text-xs sm:text-sm p-4 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-stone-600">
                <input
                  type="checkbox"
                  id="confidential"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700"
                />
                <label htmlFor="confidential" className="cursor-pointer">
                  Keep this confidential with the pastoral team only
                </label>
              </div>

              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Held in sacred confidence</span>
                </div>

                <button
                  type="submit" disabled={submitting}
                  className="px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Prayer</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
