import React, { useState } from 'react';
import { X, Send, HeartHandshake, CheckCircle2 } from 'lucide-react';

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setRequestText('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] border border-stone-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prayer-modal-title"
      >
        {/* Header */}
        <div className="bg-[#161722] text-white px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <p className="text-[10px] sm:text-[11px] font-condensed font-bold uppercase tracking-[0.2em] text-[#FFD2A4] mb-0.5 sm:mb-1">
              STANDING TOGETHER IN FAITH
            </p>
            <h2 id="prayer-modal-title" className="text-xl sm:text-2xl font-condensed font-bold uppercase text-white tracking-wide">
              SUBMIT A PRAYER REQUEST
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

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-[#0E3326]">
                We Stand With You in Prayer
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, {name ? name : 'friend'}. Our pastoral intercessors and ministry team will bring your request before God's altar with reverence and faith.
              </p>
              <div className="text-xs text-stone-500 italic pt-2">
                "Again, truly I tell you that if two of you on earth agree about anything they ask for, it will be done for them by my Father in heaven." — Matthew 18:19
              </div>
              <div className="pt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0E3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#154B38] transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                "We would love to stand with you in prayer and trust God together." Share your burden or thanksgiving with us below.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Your Name (or Anonymous)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sarah M. (or leave blank for anonymous)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0E3326]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address <span className="text-stone-400 font-normal lowercase">(optional, if you'd like a pastoral reply)</span>
                </label>
                <input
                  type="email"
                  placeholder="yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0E3326]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Prayer Focus Area
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0E3326]"
                >
                  <option value="Healing & Health">Healing & Health</option>
                  <option value="Family & Marriage">Family & Marriage</option>
                  <option value="Guidance & Purpose">Guidance & Purpose</option>
                  <option value="Financial Breakthrough">Financial Breakthrough</option>
                  <option value="Spiritual Growth & Peace">Spiritual Growth & Peace</option>
                  <option value="Praise Report & Thanksgiving">Praise Report & Thanksgiving</option>
                  <option value="Other Prayer Need">Other Prayer Need</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  How can we pray for you? <span className="text-red-700">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe your prayer request here..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  className="w-full text-sm p-3.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0E3326]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-stone-600">
                <input
                  type="checkbox"
                  id="confidential-check"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="rounded border-stone-300 text-[#0E3326] focus:ring-[#0E3326]"
                />
                <label htmlFor="confidential-check" className="cursor-pointer">
                  Keep strictly confidential with church leadership & prayer ministry
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#C5A059]" />
                  Direct to rccgkfa@gmail.com
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#0D0D0D]" />
                  SUBMIT REQUEST
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
