import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import type { InquiryFormData } from '../types';
import { addLiveVisitorInquiry } from '../utils/adminStore';
import { errorMessage } from '../utils/api';

interface ContactPageProps {
  onOpenPlanVisit: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenPlanVisit }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'General Question',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await addLiveVisitorInquiry(formData);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f0]">
      <PageHero
        eyebrow="We Would Love to Hear From You"
        title="Contact Kingdom First Assembly"
        description="Ask a question, request ministry information, or introduce yourself before your visit. Our church team will be glad to connect with you."
      >
        <button
          onClick={onOpenPlanVisit}
          className="rounded-full bg-[#ed1234] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#cf0d2a]"
        >
          Plan Your Visit
        </button>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#ded6c5] bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#007450] text-white">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="mt-4 [font-family:Georgia,serif] text-2xl font-bold text-[#12372c]">Visit Us</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Sphinx Banquet Center<br />121 E 2nd Ave<br />Roselle, NJ 07203
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=121%20E%202nd%20Ave%2C%20Roselle%2C%20NJ%2007203"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-bold text-[#007450] hover:text-[#005c40]"
            >
              Get Directions →
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <a href="tel:8622055958" className="rounded-2xl border border-[#ded6c5] bg-white p-5 shadow-sm transition hover:border-[#007450]">
              <Phone className="h-5 w-5 text-[#ed1234]" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#b8800b]">Call the Church</p>
              <p className="mt-1 font-bold text-[#12372c]">(862) 205-5958</p>
            </a>
            <a href="mailto:rccgkfa@gmail.com" className="rounded-2xl border border-[#ded6c5] bg-white p-5 shadow-sm transition hover:border-[#007450]">
              <Mail className="h-5 w-5 text-[#007450]" />
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#b8800b]">Email Us</p>
              <p className="mt-1 break-all font-bold text-[#12372c]">rccgkfa@gmail.com</p>
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-[#ded6c5] bg-white p-6 shadow-sm sm:p-10">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5ef] text-[#007450]">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h2 className="mt-5 [font-family:Georgia,serif] text-3xl font-bold text-[#12372c]">Message Received</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
                Thank you, {formData.fullName}. The church ministry team will respond as soon as possible.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ fullName: '', email: '', phone: '', inquiryType: 'General Question', message: '' });
                }}
                className="mt-6 rounded-full bg-[#007450] px-6 py-3 text-sm font-bold text-white hover:bg-[#005c40]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#b8800b]">Send a Message</p>
                <h2 className="mt-1 [font-family:Georgia,serif] text-3xl font-bold text-[#12372c]">How Can We Help?</h2>
                <p className="mt-2 text-sm text-stone-600">Your message is sent privately to the church ministry team.</p>
              </div>

              {submitError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{submitError}</p>}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[#27463d]">
                  Full Name
                  <input
                    required
                    value={formData.fullName}
                    onChange={event => setFormData({ ...formData, fullName: event.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[#ded6c5] bg-[#fffdf8] px-4 py-3 font-normal outline-none focus:border-[#007450]"
                  />
                </label>
                <label className="text-sm font-semibold text-[#27463d]">
                  Email Address
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={event => setFormData({ ...formData, email: event.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[#ded6c5] bg-[#fffdf8] px-4 py-3 font-normal outline-none focus:border-[#007450]"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[#27463d]">
                  Phone Number
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={event => setFormData({ ...formData, phone: event.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[#ded6c5] bg-[#fffdf8] px-4 py-3 font-normal outline-none focus:border-[#007450]"
                  />
                </label>
                <label className="text-sm font-semibold text-[#27463d]">
                  Subject
                  <select
                    value={formData.inquiryType}
                    onChange={event => setFormData({ ...formData, inquiryType: event.target.value as InquiryFormData['inquiryType'] })}
                    className="mt-1.5 w-full rounded-xl border border-[#ded6c5] bg-[#fffdf8] px-4 py-3 font-normal outline-none focus:border-[#007450]"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Plan a Visit">Plan a Visit</option>
                    <option value="First-Time Guest">First-Time Guest</option>
                    <option value="Bible Study / Fellowship">Bible Study / Fellowship</option>
                    <option value="Serve With Us">Serve With Us</option>
                    <option value="Prayer Request">Prayer Request</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm font-semibold text-[#27463d]">
                Your Message
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={event => setFormData({ ...formData, message: event.target.value })}
                  className="mt-1.5 w-full resize-y rounded-xl border border-[#ded6c5] bg-[#fffdf8] px-4 py-3 font-normal outline-none focus:border-[#007450]"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ed1234] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#cf0d2a] disabled:opacity-60 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
