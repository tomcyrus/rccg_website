import { errorMessage } from '../utils/api';
import React, { useState } from 'react';
import { InquiryFormData } from '../types';
import { Mail, Phone, MapPin, Tv, Clock, Send, CheckCircle2, UserCheck, HeartHandshake, BookOpen, Users, ExternalLink, Copy, Check, Calendar, Sparkles } from 'lucide-react';
import { downloadServiceIcs, getGoogleCalendarUrl } from '../utils/calendar';
import { addLiveVisitorInquiry } from '../utils/adminStore';
import { PageHero } from '../components/PageHero';

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

  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const address = '121 E 2nd Ave, Roselle, NJ 07203';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true); setSubmitError('');
    try {
      await addLiveVisitorInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err) { setSubmitError(errorMessage(err)); }
    finally { setSubmitting(false); }
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
      title: "I'm New Here",
      category: 'FIRST-TIME GUEST',
      description: 'Visiting for the first time? We would love to meet you, answer questions, and give you a warm welcome.',
      actionLabel: 'Plan Your Visit',
      icon: UserCheck,
      onClick: onOpenPlanVisit,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'prayer',
      title: 'Prayer Request',
      category: 'PASTORAL CARE',
      description: 'Our pastoral team and intercessors would be honored to stand with you in faith and pray for God\'s breakthrough.',
      actionLabel: 'Submit Prayer Request',
      icon: HeartHandshake,
      onClick: onOpenPrayerModal,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'grow',
      title: 'Grow in the Word',
      category: 'BIBLE STUDY & GROUPS',
      description: 'Join our Wednesday Digging Deep sessions and interactive Bible fellowships to grow deeper in faith.',
      actionLabel: 'Join Bible Study',
      icon: BookOpen,
      onClick: () => {
        setFormData((prev) => ({
          ...prev,
          inquiryType: 'Bible Study / Fellowship',
          message: 'Hello, I would love to learn more and join the Wednesday Bible study and discipleship opportunities.',
        }));
        const el = document.getElementById('contact-form-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'serve',
      title: 'Serve With Us',
      category: 'VOLUNTEER & MINISTRY',
      description: 'Discover your spiritual gifts and help serve the house: Choir, Ushers, Media, Children Church, or Outreach.',
      actionLabel: 'Explore Serving',
      icon: Users,
      onClick: () => {
        setFormData((prev) => ({
          ...prev,
          inquiryType: 'Serve With Us',
          message: 'Hello, I would love to explore volunteer and ministry opportunities with RCCG Kingdom First Assembly.',
        }));
        const el = document.getElementById('contact-form-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      color: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  ];

  return (
    <div className="bg-[#fbf8f0]">
      <PageHero
        eyebrow="Welcome to RCCG Kingdom First Assembly"
        title="Visit, Worship & Grow With Us"
        description="Whether you are new to Roselle, searching for a church family, or exploring faith in Jesus Christ, there is a place for you here."
      >
        <button
          onClick={onOpenPlanVisit}
          className="rounded-full bg-[#ed1234] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#cf0d2a]"
        >
          Plan Your Visit
        </button>
        <button
          onClick={onOpenPrayerModal}
          className="rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#007450]"
        >
          Prayer Request
        </button>
      </PageHero>

      {/* 4 Connection Pillars */}
      <section className="py-16 sm:py-20 border-b border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Next Steps</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#12372c] tracking-tight">
              Paths of Connection
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans">
              Choose the step that best fits where you are on your spiritual journey today.
            </p>
          </div>

          {/* 4 Connection Pillars: 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-3 xs:p-4 sm:p-7 flex flex-col justify-between hover:border-emerald-400/60 shadow-xs hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="space-y-2 sm:space-y-3.5">
                    <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border ${pillar.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>

                    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#007450] truncate">
                      {pillar.category}
                    </div>

                    <h3 className="text-xs xs:text-sm sm:text-xl font-bold text-[#12372c] group-hover:text-[#007450] transition-colors leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500 leading-relaxed font-sans line-clamp-3">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-6">
                    <button
                      onClick={pillar.onClick}
                      className="w-full py-2 sm:py-2.5 px-2 sm:px-4 rounded-full bg-[#007450] hover:bg-[#005c40] text-white font-semibold text-[10px] xs:text-xs tracking-wide transition-all cursor-pointer text-center shadow-xs"
                    >
                      {pillar.actionLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Grid: Plan Your Visit & Contact Form */}
      <section id="contact-form-section" className="py-16 sm:py-24 border-b border-stone-200/80 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Plan Your Visit & Direct Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-stone-200/90 p-7 sm:p-8 space-y-6 shadow-sm">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    VISITOR GUIDE
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#12372c] mt-1">
                    Sunday &amp; Midweek Gatherings
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    We look forward to worshiping with you and your loved ones!
                  </p>
                </div>

                {/* Times */}
                <div className="space-y-4 pt-2 border-t border-stone-100 text-xs">
                  <div>
                    <span className="text-amber-800 uppercase tracking-wider block text-[10px] font-bold">
                      SUNDAY WORSHIP CELEBRATION
                    </span>
                    <div className="text-base font-bold text-[#12372c] mt-0.5">
                      Every Sunday: 9:00 AM – 11:30 AM
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => downloadServiceIcs('sunday')}
                        className="text-emerald-800 underline font-medium hover:text-emerald-950 cursor-pointer"
                      >
                        Download Sunday (.ics)
                      </button>
                      <span className="text-stone-300">·</span>
                      <a
                        href={getGoogleCalendarUrl('sunday')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-800 underline font-medium hover:text-emerald-950"
                      >
                        Google Calendar
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100">
                    <span className="text-emerald-800 uppercase tracking-wider block text-[10px] font-bold">
                      MIDWEEK DIGGING DEEP &amp; FAITH CLINIC
                    </span>
                    <div className="text-base font-bold text-[#12372c] mt-0.5">
                      Every Wednesday, 7:00 PM – 8:30 PM
                    </div>
                    <p className="text-stone-500 text-[11px] mt-0.5">In-depth Bible study and personal prayer</p>
                  </div>

                  <div className="pt-3 border-t border-stone-100">
                    <span className="text-emerald-800 uppercase tracking-wider block text-[10px] font-bold">
                      WORSHIP SANCTUARY LOCATION
                    </span>
                    <div className="text-sm font-semibold text-[#12372c] mt-0.5">
                      121 E 2nd Ave, Roselle, NJ 07203
                    </div>
                    <div className="flex items-center gap-2 pt-2.5">
                      <button
                        onClick={handleCopyAddress}
                        className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                      >
                        {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAddress ? 'Copied' : 'Copy Address'}</span>
                      </button>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3 text-amber-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Reach Card */}
              <div className="rounded-3xl bg-gradient-to-br from-[#12372c] via-[#07513f] to-[#12372c] text-white p-7 space-y-4 shadow-xl border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Contact Us Directly
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Have a question, pastoral prayer request, or want to speak with our ministry team? We would be overjoyed to hear from you.
                </p>

                <div className="space-y-3 text-xs pt-1">
                  <a
                    href="mailto:rccgkfa@gmail.com"
                    className="flex items-center gap-3 text-slate-200 hover:text-amber-300 font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>rccgkfa@gmail.com</span>
                  </a>

                  <a
                    href="tel:8622055958"
                    className="flex items-center gap-3 text-slate-200 hover:text-amber-300 font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>(862) 205-5958</span>
                  </a>

                  <a
                    href="https://www.youtube.com/@RCCGKFA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-200 hover:text-amber-300 font-medium transition-colors"
                  >
                    <Tv className="w-4 h-4 text-red-400 shrink-0" />
                    <span>YouTube: @RCCGKFA</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Connection Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-stone-200/90 p-7 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#12372c]">
                      Message Received With Joy!
                    </h3>
                    <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-stone-900">{formData.fullName}</strong>. Your note regarding <strong className="text-stone-900">"{formData.inquiryType}"</strong> has been delivered to our pastoral ministry team. We will get back to you shortly.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-full bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
                      >
                        Send Another Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
              {submitError && <p role="alert" className="text-red-700">{submitError}</p>}
              {submitting && <p role="status">Sending…</p>}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                        Get in Touch
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#12372c] mt-0.5">
                        Send Our Ministry a Message
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Messages are saved privately for our pastoral ministry team to review and follow up.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Full Name <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Brother / Sister"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full text-sm px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Email Address <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="yourname@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full text-sm px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Phone Number <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g., (862) 555-0199"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full text-sm px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
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
                          className="w-full text-sm px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-700 cursor-pointer"
                        >
                          <option value="Plan a Visit">Plan a Visit / Sunday Service</option>
                          <option value="First-Time Guest">First-Time Guest Welcome</option>
                          <option value="Prayer Request">Confidential Prayer Request</option>
                          <option value="Bible Study / Fellowship">Midweek Bible Study / Discipleship</option>
                          <option value="Serve With Us">Serve With Us / Volunteer</option>
                          <option value="General Question">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Your Message <span className="text-red-700">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Please share your questions, introduce yourself, or tell us how we can best pray for and assist you..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full text-sm p-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-700"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-xs text-stone-500 order-2 sm:order-1 text-center sm:text-left">
                        Saved privately for the church ministry team
                      </span>
                      <button
                        type="submit" disabled={submitting}
                        className="w-full sm:w-auto px-7 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md order-1 sm:order-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Note to Ministry</span>
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
