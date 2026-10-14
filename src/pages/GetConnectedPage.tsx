import React, { useState } from 'react';
import { InquiryFormData } from '../types';
import { Mail, Phone, MapPin, Tv, Clock, Send, CheckCircle2, UserCheck, HeartHandshake, BookOpen, Users, ExternalLink, Copy, Check, Calendar } from 'lucide-react';
import { downloadServiceIcs, getGoogleCalendarUrl } from '../utils/calendar';

interface GetConnectedPageProps {
  onOpenPlanVisit: () => void;
  onOpenPrayerModal: () => void;
}

export const GetConnectedPage: React.FC<GetConnectedPageProps> = ({
  onOpenPlanVisit,
  onOpenPrayerModal,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Plan a Visit',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const address = '121 E 2nd Ave, Roselle, NJ 07203';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      inquiryType: 'Plan a Visit',
      message: '',
    });
    setSubmitted(false);
  };

  const pillars = [
    {
      id: 'new-here',
      title: "I'M NEW HERE",
      category: 'FIRST-TIME GUEST',
      description: 'Visiting for the first time? Introduce yourself and let us help you feel at home.',
      actionLabel: 'PLAN YOUR VISIT',
      icon: UserCheck,
      onClick: onOpenPlanVisit,
    },
    {
      id: 'prayer',
      title: 'PRAYER REQUEST',
      category: 'PASTORAL CARE',
      description: 'We would love to stand with you in prayer and trust God together for a breakthrough.',
      actionLabel: 'SUBMIT REQUEST',
      icon: HeartHandshake,
      onClick: onOpenPrayerModal,
    },
    {
      id: 'grow',
      title: 'GROW WITH US',
      category: 'BIBLE STUDY & GROUPS',
      description: 'Join our Wednesday Bible studies, fellowship, and opportunities for spiritual growth.',
      actionLabel: 'JOIN BIBLE STUDY',
      icon: BookOpen,
      onClick: () => {
        setFormData((prev) => ({
          ...prev,
          inquiryType: 'Bible Study / Fellowship',
          message: 'Hello, I would like to join the Wednesday Bible study and fellowship opportunities.',
        }));
        const el = document.getElementById('contact-form-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'serve',
      title: 'SERVE WITH US',
      category: 'VOLUNTEER & MINISTRY',
      description: 'Discover opportunities to serve God and help build our growing church family in Roselle.',
      actionLabel: 'EXPLORE SERVING',
      icon: Users,
      onClick: () => {
        setFormData((prev) => ({
          ...prev,
          inquiryType: 'Serve With Us',
          message: 'Hello, I would love to discover ways to serve and volunteer with Kingdom First Assembly.',
        }));
        const el = document.getElementById('contact-form-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return (
    <div className="bg-[#F5F2F0]">
      {/* Finsweet Template 10 Header */}
      <section className="bg-[#0D0D0D] text-white py-16 md:py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#FFD2A4]">
            WELCOME TO THE FAMILY
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-condensed font-bold uppercase tracking-tight text-white">
            WE'D LOVE TO MEET YOU!
          </h1>

          <p className="text-base sm:text-lg text-stone-200 font-sans max-w-2xl mx-auto leading-relaxed">
            Whether you are new to the Roselle area, looking for a church home, or simply interested in learning more about Jesus Christ, we would be delighted to welcome you.
          </p>

          <p className="text-sm font-serif italic text-[#FFD2A4]">
            "At Kingdom First Assembly, we are growing together as a family of faith, and there is always room for one more."
          </p>
        </div>
      </section>

      {/* 4 Connection Pillars */}
      <section className="py-16 md:py-20 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
            <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
              PATHS OF CONNECTION
            </div>
            <h2 className="text-3xl font-condensed font-bold uppercase tracking-tight text-[#0D0D0D]">
              GET CONNECTED
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Choose the step that best fits where you are on your spiritual journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="group bg-[#FFF6EB] border border-stone-200 p-6 sm:p-7 flex flex-col justify-between hover:border-stone-400 transition-all relative overflow-hidden shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#161722] text-[#FFD2A4] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-[10px] font-condensed font-bold uppercase tracking-widest text-[#DC9853]">
                      {pillar.category}
                    </div>

                    <h3 className="text-xl font-condensed font-bold uppercase tracking-wide text-[#0D0D0D]">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={pillar.onClick}
                      className="w-full py-2.5 px-3 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer text-center"
                    >
                      {pillar.actionLabel}
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Grid: Plan Your Visit & Contact Form */}
      <section id="contact-form-section" className="py-16 md:py-24 border-b border-stone-200 bg-[#F5F2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            {/* Left Column: Plan Your Visit & Direct Contacts */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#FFF6EB] border border-stone-300 p-8 space-y-6">
                <div>
                  <div className="text-[11px] font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
                    VISITOR GUIDE
                  </div>
                  <h3 className="text-2xl font-condensed font-bold uppercase text-[#0D0D0D]">
                    PLAN YOUR VISIT
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    We look forward to worshiping with you and your family!
                  </p>
                </div>

                {/* Times */}
                <div className="space-y-4 pt-2 border-t border-stone-300 text-xs">
                  <div>
                    <span className="text-stone-500 font-condensed uppercase tracking-wider block text-[10px] font-bold">SUNDAY GATHERING</span>
                    <div className="text-base font-condensed font-bold text-[#0D0D0D]">SUNDAY WORSHIP: 9:00 AM</div>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => downloadServiceIcs('sunday')}
                        className="text-[#0D0D0D] underline font-medium hover:text-[#DC9853]"
                      >
                        Download Sunday (.ics)
                      </button>
                      <span className="text-stone-400">·</span>
                      <a
                        href={getGoogleCalendarUrl('sunday')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0D0D0D] underline font-medium hover:text-[#DC9853]"
                      >
                        Google Cal
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200">
                    <span className="text-stone-500 font-condensed uppercase tracking-wider block text-[10px] font-bold">MIDWEEK GATHERING</span>
                    <div className="text-base font-condensed font-bold text-[#0D0D0D]">WEDNESDAY BIBLE STUDY: 7:00 PM – 8:30 PM</div>
                  </div>

                  <div className="pt-2 border-t border-stone-200">
                    <span className="text-[#A6262B] font-condensed uppercase tracking-wider block text-[10px] font-bold">
                      TEMPORARY WORSHIP LOCATION
                    </span>
                    <div className="text-sm font-semibold text-stone-900 mt-0.5">
                      121 E 2nd Ave, Roselle, NJ 07203
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleCopyAddress}
                        className="px-2.5 py-1.5 border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1 text-xs"
                      >
                        {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAddress ? 'Copied' : 'Copy Address'}</span>
                      </button>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-[#161722] text-[#FFD2A4] hover:bg-black transition-colors flex items-center gap-1 text-xs font-condensed font-bold uppercase tracking-wider"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3 text-[#FFD2A4]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Reach Card */}
              <div className="bg-[#161722] text-white border border-white/10 p-6 space-y-4">
                <div className="text-xs font-condensed font-bold uppercase tracking-widest text-[#FFD2A4]">
                  CONTACT US DIRECTLY
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Have a question, prayer request, or would like to learn more about our church? Please reach out. We would love to hear from you.
                </p>

                <div className="space-y-2.5 text-xs font-sans">
                  <a
                    href="mailto:rccgkfa@gmail.com"
                    className="flex items-center gap-2.5 text-stone-200 hover:text-[#FFD2A4] font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#FFD2A4] shrink-0" />
                    <span>Email: rccgkfa@gmail.com</span>
                  </a>

                  <a
                    href="tel:8625207004"
                    className="flex items-center gap-2.5 text-stone-200 hover:text-[#FFD2A4] font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#FFD2A4] shrink-0" />
                    <span>Phone: 862-520-7004</span>
                  </a>

                  <a
                    href="https://www.youtube.com/@RCCGKFA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-stone-200 hover:text-[#FFD2A4] font-medium transition-colors"
                  >
                    <Tv className="w-4 h-4 text-[#FFD2A4] shrink-0" />
                    <span>YouTube: https://www.youtube.com/@RCCGKFA</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Connection Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#FFF6EB] border border-stone-300 p-8 sm:p-10 shadow-xs">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-condensed font-bold uppercase text-[#0D0D0D]">
                      MESSAGE RECEIVED WITH JOY
                    </h3>
                    <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-stone-900">{formData.fullName}</strong>. Your message regarding <strong className="text-stone-900">"{formData.inquiryType}"</strong> has been delivered to our ministry team at <strong className="text-stone-900">rccgkfa@gmail.com</strong>.
                    </p>
                    <div className="pt-6">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 bg-[#0D0D0D] text-[#FFD2A4] font-condensed font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors"
                      >
                        SEND ANOTHER NOTE
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
                        GET IN TOUCH
                      </div>
                      <h3 className="text-2xl font-condensed font-bold uppercase text-[#0D0D0D]">
                        SEND US A MESSAGE
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Submissions are delivered privately to our ministry team at <span className="font-mono text-stone-700">rccgkfa@gmail.com</span>.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-condensed font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Full Name <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Jonathan Adams"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full text-sm px-3.5 py-2.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0D0D0D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-condensed font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Email Address <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jonathan@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full text-sm px-3.5 py-2.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0D0D0D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-condensed font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Phone Number <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g., (862) 555-0199"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full text-sm px-3.5 py-2.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0D0D0D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-condensed font-bold uppercase tracking-wider text-stone-700 mb-1">
                          Inquiry Type
                        </label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              inquiryType: e.target.value as InquiryFormData['inquiryType'],
                            })
                          }
                          className="w-full text-sm px-3.5 py-2.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0D0D0D]"
                        >
                          <option value="Plan a Visit">Plan a Visit / Sunday Service</option>
                          <option value="First-Time Guest">First-Time Guest</option>
                          <option value="Prayer Request">Prayer Request</option>
                          <option value="Bible Study / Fellowship">Bible Study / Fellowship</option>
                          <option value="Serve With Us">Serve With Us / Volunteer</option>
                          <option value="General Question">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-condensed font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Your Message <span className="text-red-700">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Please share your questions, introduce yourself, or tell us how we can best assist you..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full text-sm p-3.5 bg-white border border-stone-300 focus:outline-none focus:border-[#0D0D0D]"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-stone-500 order-2 sm:order-1 text-center sm:text-left">
                        Delivered to <span className="text-stone-800 font-medium">rccgkfa@gmail.com</span>
                      </span>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-7 py-3 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px] order-1 sm:order-2"
                      >
                        <Send className="w-3.5 h-3.5 text-[#0D0D0D]" />
                        <span>SEND MESSAGE</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
