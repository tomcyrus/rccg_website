import React from 'react';
import { ArrowRight, BookOpen, CalendarDays, MapPin, Play } from 'lucide-react';
import { PageTab } from '../types';
import heroImg from '../assets/images/reference/reference_hero_worship.jpg';

interface HeroSectionProps {
  onOpenPlanVisit: () => void;
  onNavigateAbout: () => void;
  onSelectTab?: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPlanVisit,
  onSelectTab,
}) => {
  const handleWatchOnline = () => {
    if (onSelectTab) {
      onSelectTab('videos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    document.getElementById('latest-sermon-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLocationClick = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Sphinx+Banquet+Center+121+E+2nd+Ave+Roselle+NJ+07203',
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleScheduleClick = () => {
    if (onSelectTab) {
      onSelectTab('events');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    document.getElementById('church-calendar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#f6f3e9] pb-16 sm:pb-20">
      <section className="relative min-h-[610px] overflow-hidden bg-[#00563f] text-white sm:min-h-[620px] lg:min-h-[520px]">
        <div className="absolute inset-0 lg:left-[36%] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_38%,black_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_38%,black_100%)]">
          <img
            src={heroImg}
            alt="Joyful worshippers praising together at Kingdom First Assembly"
            className="h-full w-full object-cover object-center saturate-[0.92]"
          />
          <div className="absolute inset-0 bg-[#006047]/20 mix-blend-color" />
        </div>

        <div className="absolute inset-0 bg-[#004c38]/78 lg:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#004c38_0%,#004c38_40%,rgba(0,76,56,.96)_50%,rgba(0,76,56,.72)_63%,rgba(0,76,56,.32)_77%,transparent_92%)] lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003c2e]/30 via-transparent to-black/5" />

        <div className="relative z-10 mx-auto flex min-h-[610px] max-w-7xl items-center px-5 pb-28 pt-16 sm:min-h-[620px] sm:px-8 sm:pt-20 lg:min-h-[520px] lg:px-10 lg:pb-24 lg:pt-16">
          <div className="max-w-[620px]">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.42em] text-white sm:text-base">
              Welcome to
            </p>

            <h1 className="[font-family:Georgia,serif] text-[43px] font-black uppercase leading-[0.88] tracking-[-0.025em] text-white drop-shadow-md sm:text-6xl lg:text-[68px]">
              <span className="block">Kingdom First</span>
              <span className="block text-[#f3bf35]">Assembly</span>
            </h1>

            <p className="mt-2 [font-family:Georgia,serif] text-2xl font-bold leading-tight text-white sm:text-3xl">
              Roselle, New Jersey
            </p>

            <div className="my-4 h-1 w-12 rounded-full bg-[#f3bf35]" />

            <p className="max-w-md text-xl font-semibold italic leading-tight text-white sm:text-[22px]">
              Seeking His Kingdom First.<br />
              Sharing His Love With All.
            </p>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/95 sm:text-[15px]">
              Whether you are looking for a church home, exploring the Christian faith, or simply seeking a place to worship and grow spiritually, we would love to welcome you.
            </p>

            <div className="mt-5 flex flex-col gap-3 xs:flex-row">
              <button
                onClick={onOpenPlanVisit}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#ed1234] px-5 py-3 text-xs font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#cf0d2a] sm:px-6 sm:text-sm"
              >
                <MapPin className="h-4 w-4 fill-white" />
                <span>Plan Your Visit</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleWatchOnline}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white bg-[#003f31]/35 px-5 py-3 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#00563f] sm:px-6 sm:text-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
                  <Play className="ml-0.5 h-3 w-3 fill-current" />
                </span>
                Watch Live
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-2xl border border-[#e8dfc9] bg-[#fffdf8] shadow-[0_16px_45px_rgba(36,52,42,0.18)] md:grid-cols-3 md:divide-x md:divide-[#d8caaa]">
          <button
            onClick={handleScheduleClick}
            className="group flex items-center gap-4 border-b border-[#e8dfc9] px-5 py-5 text-left transition hover:bg-red-50 md:border-b-0 lg:px-7"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ed1234] text-white shadow-md">
              <CalendarDays className="h-7 w-7" />
            </span>
            <span>
              <span className="block text-[11px] font-extrabold uppercase leading-tight text-[#14263a]">Sunday Worship Service</span>
              <span className="mt-1 block text-lg font-black leading-none text-[#ed1234]">9:00 AM – 11:30 AM</span>
            </span>
          </button>

          <button
            onClick={handleScheduleClick}
            className="group flex items-center gap-4 border-b border-[#e8dfc9] px-5 py-5 text-left transition hover:bg-emerald-50 md:border-b-0 lg:px-7"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#07966b] text-white shadow-md">
              <BookOpen className="h-7 w-7" />
            </span>
            <span>
              <span className="block text-[11px] font-extrabold uppercase leading-tight text-[#14263a]">Wednesday Bible Study</span>
              <span className="mt-1 block text-lg font-black leading-none text-[#07885f]">7:00 PM – 8:30 PM</span>
            </span>
          </button>

          <button
            onClick={handleLocationClick}
            className="group flex items-center gap-4 px-5 py-5 text-left transition hover:bg-amber-50 lg:px-7"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#efb21c] text-white shadow-md">
              <MapPin className="h-8 w-8 fill-white" />
            </span>
            <span>
              <span className="block text-[9px] font-extrabold uppercase tracking-wide text-[#263449]">Temporary Worship Location</span>
              <span className="block text-base font-black leading-tight text-[#14263a]">Sphinx Banquet Center</span>
              <span className="block text-xs leading-snug text-[#263449]">121 E 2nd Ave<br />Roselle, NJ 07203</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
