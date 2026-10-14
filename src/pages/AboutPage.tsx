import React from 'react';
import { PageTab } from '../types';
import { BookOpen, Compass, Target, Heart, Cross, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenPlanVisit: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onSelectTab, onOpenPlanVisit }) => {
  const coreValues = [
    {
      num: '01',
      title: 'CHRIST ABOVE ALL',
      scripture: '1 CORINTHIANS 2:2',
      text: 'We proclaim Jesus Christ crucified and risen, recognizing Him as the foundation of our faith and the hope of our salvation.',
      badge: 'CHRIST CENTERED',
    },
    {
      num: '02',
      title: 'KINGDOM FIRST',
      scripture: 'MATTHEW 6:33',
      text: 'We intentionally seek God\'s Kingdom and righteousness first, allowing His Word to shape our priorities, decisions, and way of life.',
      badge: 'DIVINE PRIORITY',
    },
    {
      num: '03',
      title: 'GROWING IN CHRISTLIKE LOVE',
      scripture: 'JOHN 13:34–35',
      text: 'We believe love is at the heart of Christian living. We are committed to loving God, one another, and the people He places around us.',
      badge: 'UNCONDITIONAL GRACE',
    },
    {
      num: '04',
      title: 'ROOTED IN GOD\'S WORD AND PRAYER',
      scripture: 'ACTS 2:42',
      text: 'We are committed to growing through Scripture, prayer, fellowship, and dependence on the Holy Spirit.',
      badge: 'SPIRITUAL DISCIPLINE',
    },
    {
      num: '05',
      title: 'SHINING HIS LIGHT',
      scripture: 'MATTHEW 5:14–16',
      text: 'We desire to share the Gospel, serve our neighbors, and demonstrate the love and hope of Christ throughout our community.',
      badge: 'OUTREACH & SERVICE',
    },
  ];

  return (
    <div className="bg-[#F5F2F0]">
      {/* Finsweet Template 10 Dark Header */}
      <section className="bg-[#0D0D0D] text-white py-16 md:py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#FFD2A4]">
            THE REDEEMED CHRISTIAN CHURCH OF GOD
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-condensed font-bold uppercase tracking-tight text-white">
            ABOUT KINGDOM FIRST ASSEMBLY
          </h1>

          <p className="text-base sm:text-lg font-serif italic text-stone-300 max-w-2xl mx-auto">
            "Seeking His Kingdom First. Sharing His Love With All."
          </p>

          <p className="text-xs text-[#FFD2A4] font-condensed uppercase tracking-wider">
            ROSELLE, NEW JERSEY · EST. SEPTEMBER 27, 2026
          </p>
        </div>
      </section>

      {/* Section 1: Our Story — A New Beginning, An Eternal Purpose */}
      <section className="py-16 md:py-24 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
                OUR GENESIS &amp; ANCHOR
              </div>

              <h2 className="text-3xl sm:text-4xl font-condensed font-bold uppercase text-[#0D0D0D] leading-tight">
                OUR STORY — A NEW BEGINNING, AN ETERNAL PURPOSE
              </h2>

              <div className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans space-y-4">
                <p>
                  <strong className="text-[#0D0D0D] font-semibold">Kingdom First Assembly</strong> is a parish of The Redeemed Christian Church of God (RCCG), located in Roselle, New Jersey.
                </p>

                <p>
                  Our journey began on <strong className="text-[#0D0D0D] font-semibold">September 27, 2026</strong>, with a conviction that God is raising a church family committed to seeking His Kingdom first and becoming a source of light, love, and hope to the community.
                </p>

                {/* Pull Quote */}
                <div className="bg-[#FFF6EB] border-l-4 border-[#FFD2A4] p-5 my-6">
                  <p className="text-lg font-serif italic text-[#0D0D0D]">
                    "I will build my church, and the gates of Hades will not overcome it."
                  </p>
                  <span className="text-xs font-condensed font-bold uppercase tracking-wider text-[#DC9853] block mt-1.5">
                    — MATTHEW 16:18
                  </span>
                </div>

                <p>
                  Though our beginning is humble, our faith is anchored in the promise of Jesus Christ. We believe God is building something beautiful through ordinary people who are willing to make themselves available for His extraordinary purpose.
                </p>
              </div>
            </div>

            {/* Right: Scripture Visual Card with Finsweet gold border */}
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden shadow-xl border-2 border-[#FFD2A4]">
                  <img
                    src="/src/assets/images/bible_study_scripture_1791981783961.jpg"
                    alt="The Holy Bible with gilded gold page edges open on wooden altar table"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-3 text-xs font-serif italic text-stone-500 text-center">
                  Anchored upon God's enduring Word and divine promises.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-16 md:py-24 bg-[#F5F2F0] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Vision Card */}
            <div className="group bg-[#FFF6EB] border border-stone-300 p-8 sm:p-10 flex flex-col justify-between hover:border-stone-400 transition-all relative">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#161722] text-[#FFD2A4] flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-stone-500">
                  FUTURE HORIZON
                </div>
                <h3 className="text-3xl font-condensed font-bold uppercase tracking-wide text-[#0D0D0D]">
                  OUR VISION
                </h3>
                <p className="text-base sm:text-lg text-stone-800 font-serif leading-relaxed italic">
                  "To be a Christ-centered, Kingdom-minded church, raising believers who know their identity in Christ and shine His light throughout Roselle, neighboring communities, and beyond."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-200 text-xs font-condensed font-bold uppercase tracking-wider text-stone-500">
                RCCG KINGDOM FIRST ASSEMBLY VISION
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>

            {/* Mission Card */}
            <div className="group bg-[#FFF6EB] border border-stone-300 p-8 sm:p-10 flex flex-col justify-between hover:border-stone-400 transition-all relative">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#A6262B] text-white flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-stone-500">
                  DAILY CALLING
                </div>
                <h3 className="text-3xl font-condensed font-bold uppercase tracking-wide text-[#0D0D0D]">
                  OUR MISSION
                </h3>
                <p className="text-base sm:text-lg text-stone-800 font-serif leading-relaxed italic">
                  "To preach Jesus Christ, teach the truth of God's Kingdom, nurture believers in faith and love, equip them for service, and reach our community with the transforming power of the Gospel."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-200 text-xs font-condensed font-bold uppercase tracking-wider text-stone-500">
                RCCG KINGDOM FIRST ASSEMBLY MISSION
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 5 Core Values */}
      <section className="py-20 md:py-28 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
              GUIDING CONVICTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-condensed font-bold uppercase tracking-tight text-[#0D0D0D]">
              OUR CORE VALUES
            </h2>
            <p className="text-sm text-stone-600 font-sans leading-relaxed">
              Scriptural convictions that shape our culture, decisions, worship, and everyday actions.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {coreValues.map((val) => (
              <div
                key={val.num}
                className="group bg-[#FFF6EB] border border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 hover:border-stone-400 transition-all relative overflow-hidden"
              >
                <div className="font-condensed font-bold text-3xl sm:text-4xl text-[#DC9853] w-12 shrink-0">
                  {val.num}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl sm:text-2xl font-condensed font-bold uppercase text-[#0D0D0D]">
                      {val.title}
                    </h3>
                    <span className="text-xs font-condensed font-bold text-[#A6262B] uppercase tracking-wider">
                      {val.scripture}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {val.text}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: What We Believe */}
      <section className="py-20 md:py-28 bg-[#F5F2F0] border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
              STATEMENT OF FAITH
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-condensed font-bold uppercase tracking-tight text-[#0D0D0D]">
              WHAT WE BELIEVE
            </h2>
          </div>

          <div className="bg-[#FFF6EB] border border-stone-300 p-8 sm:p-12 space-y-6 text-stone-700 leading-relaxed font-sans shadow-xs">
            <p className="text-sm sm:text-base font-medium text-[#0D0D0D]">
              As a parish of <strong>The Redeemed Christian Church of God (RCCG)</strong>, our faith is rooted in the authority of the Holy Scriptures and the saving grace of Jesus Christ.
            </p>

            <div className="border-t border-b border-stone-300 py-6 space-y-4 text-xs sm:text-sm">
              <p>
                <strong className="text-[#0D0D0D]">The Triune God:</strong> We believe in one God eternally existent in three persons: Father, Son, and Holy Spirit.
              </p>
              <p>
                <strong className="text-[#0D0D0D]">Salvation in Jesus Christ:</strong> We believe salvation is the gift of God received through repentance and personal faith in Jesus Christ.
              </p>
              <p>
                <strong className="text-[#0D0D0D]">The Holy Spirit:</strong> We believe in the active, sanctifying, and empowering presence of the Holy Spirit.
              </p>
              <p>
                <strong className="text-[#0D0D0D]">Prayer, Holiness &amp; Discipleship:</strong> We uphold the vital necessity of prayer, personal holiness, discipleship, and Christian fellowship.
              </p>
              <p>
                <strong className="text-[#0D0D0D]">The Great Commission:</strong> We are called to make Jesus Christ known, shining His radiant light across Roselle and beyond.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-800 font-semibold font-condensed uppercase tracking-wider">
              We are part of the global RCCG family, united in our desire to make Jesus Christ known.
            </p>
          </div>

          <div className="pt-6 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-condensed font-bold uppercase text-[#0D0D0D]">
              COME EXPERIENCE HIS KINGDOM WITH US
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={onOpenPlanVisit}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                PLAN YOUR SUNDAY VISIT
              </button>
              <button
                onClick={() => {
                  onSelectTab('connect');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-stone-300 hover:border-stone-800 text-stone-800 font-condensed font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                GET CONNECTED &amp; CONTACT US
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
