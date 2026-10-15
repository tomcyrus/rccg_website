import React from 'react';
import { PageTab } from '../types';
import { BookOpen, Compass, Target, Heart, Cross, Sparkles, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import scriptureImg from '../assets/images/bible_study_scripture_1791981783961.jpg';
import sanctuaryImg from '../assets/images/hero_church_sanctuary_1791981782802.jpg';

interface AboutPageProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenPlanVisit: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onSelectTab, onOpenPlanVisit }) => {
  const coreValues = [
    {
      num: '01',
      title: 'Christ Above All',
      scripture: '1 Corinthians 2:2',
      text: 'We proclaim Jesus Christ crucified and risen, recognizing Him as the author and finisher of our faith and the only hope of salvation.',
      badge: 'FOUNDATION',
    },
    {
      num: '02',
      title: 'Kingdom First Priority',
      scripture: 'Matthew 6:33',
      text: 'We intentionally seek God\'s Kingdom and righteousness first, allowing His sovereign Word to govern our priorities, families, and everyday decisions.',
      badge: 'DIVINE MANDATE',
    },
    {
      num: '03',
      title: 'Growing in Christlike Love',
      scripture: 'John 13:34–35',
      text: 'We believe love is the supreme mark of genuine discipleship. We are committed to demonstrating the gracious, forgiving love of Christ to everyone.',
      badge: 'COMPASSION',
    },
    {
      num: '04',
      title: 'Rooted in God\'s Word & Prayer',
      scripture: 'Acts 2:42',
      text: 'We are continually nourished through steadfast Scripture study, fervent prayer, heartfelt fellowship, and reliance upon the Holy Spirit.',
      badge: 'SPIRITUAL POWER',
    },
    {
      num: '05',
      title: 'Shining as Light in Our City',
      scripture: 'Matthew 5:14–16',
      text: 'We are sent to share the Gospel, serve the needy, and demonstrate the tangible hope and transforming power of Christ throughout Roselle, NJ.',
      badge: 'OUTREACH',
    },
  ];

  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#071324] via-[#0A192F] to-[#071324] text-white py-16 sm:py-24 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Cross className="w-3.5 h-3.5 text-amber-400" />
            <span>The Redeemed Christian Church of God</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
            About Kingdom First Assembly
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-amber-100/90 max-w-2xl mx-auto">
            "Seeking His Kingdom First. Sharing His Love With All."
          </p>

          <p className="text-xs text-amber-300 font-semibold tracking-widest uppercase">
            Roselle, New Jersey · Union County · Est. 2026
          </p>
        </div>
      </section>

      {/* Our Genesis & Anchor */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Our Genesis &amp; Conviction</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight leading-tight">
                A New Beginning, An Eternal Heavenly Purpose
              </h2>

              <div className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans space-y-4">
                <p>
                  <strong className="text-[#0A192F] font-semibold">RCCG Kingdom First Assembly</strong> is a parish of The Redeemed Christian Church of God, planted in the heart of Roselle, New Jersey.
                </p>

                <p>
                  Our journey was birthed out of a clear apostolic conviction: that in a busy, distracted generation, God is raising a vibrant community of believers devoted to seeking His Kingdom first and becoming a shining beacon of truth, love, and healing.
                </p>

                {/* Scripture Callout */}
                <div className="bg-amber-50/70 border-l-4 border-amber-400 p-5 rounded-r-2xl my-6">
                  <p className="text-lg font-serif italic text-[#0A192F]">
                    "And I tell you that you are Peter, and on this rock I will build my church, and the gates of Hades will not overcome it."
                  </p>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block mt-2">
                    — Matthew 16:18
                  </span>
                </div>

                <p>
                  We are passionate about authentic discipleship, family restoration, and raising children in the nurture and admonition of the Lord. Every service is a sacred encounter with the living God.
                </p>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300/60 relative">
                  <img
                    src={scriptureImg}
                    alt="The Holy Bible open to scripture with sacred golden illumination"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-serif italic">
                    "The grass withers, the flower fades, but the word of our God will stand forever." — Isaiah 40:8
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  OUR HORIZON
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
                  Our Vision
                </h3>
                <p className="text-base sm:text-lg text-stone-700 font-serif leading-relaxed italic">
                  "To be a Christ-centered, Kingdom-minded church family, raising believers who know their identity in Christ and shine His light throughout Roselle, Union County, and the nations."
                </p>
              </div>
              <div className="pt-6 border-t border-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Kingdom First Assembly · Vision
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  OUR CALLING
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
                  Our Mission
                </h3>
                <p className="text-base sm:text-lg text-stone-700 font-serif leading-relaxed italic">
                  "To preach Jesus Christ, teach the truth of God's Kingdom, nurture believers in faith and love, equip them for service, and reach our community with the transforming power of the Gospel."
                </p>
              </div>
              <div className="pt-6 border-t border-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Kingdom First Assembly · Mission
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Values */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wider uppercase">
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Guiding Convictions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
              Our 5 Core Values
            </h2>
            <p className="text-stone-600 text-base max-w-xl mx-auto font-sans leading-relaxed">
              Scriptural convictions that shape our spiritual culture, decisions, worship, and everyday actions.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {coreValues.map((val) => (
              <div
                key={val.num}
                className="bg-[#FAF8F5] rounded-2xl border border-stone-200/80 p-6 sm:p-7 hover:border-amber-400/60 shadow-xs hover:shadow-lg transition-all flex flex-col sm:flex-row items-start gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 font-serif font-bold text-xl flex items-center justify-center shrink-0">
                  {val.num}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-serif font-bold text-[#0A192F]">
                      {val.title}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {val.scripture}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {val.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold tracking-wider uppercase">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Biblical Foundations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
              What We Believe
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 space-y-6 text-stone-700 leading-relaxed font-sans shadow-sm">
            <p className="text-base font-medium text-[#0A192F]">
              As a parish of <strong>The Redeemed Christian Church of God (RCCG)</strong>, our faith is firmly established upon the uncompromised Word of God:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-[#0A192F]">The Holy Scriptures:</strong> We believe the entire Bible is the verbally inspired, infallible Word of God and the supreme authority for faith and practice.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-[#0A192F]">The One True God:</strong> We believe in one eternal God manifested in three persons: the Father, the Son Jesus Christ, and the Holy Spirit.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-[#0A192F]">Salvation by Grace:</strong> Salvation is a free gift received through repentance and faith in the shed blood and finished work of Jesus Christ on the cross.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-[#0A192F]">The Holy Spirit &amp; Sanctification:</strong> We believe in the baptism, gifts, and fruit of the Holy Spirit, enabling believers to live holy and victorious lives.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-[#0A192F]">The Blessed Hope:</strong> We believe in the imminent bodily resurrection of believers, the second coming of Jesus Christ, and eternal life with God.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-amber-800 font-semibold">
              <span>United in the global RCCG mission across 190+ nations.</span>
              <span>121 E 2nd Ave, Roselle, NJ</span>
            </div>
          </div>

          {/* Invitation Card */}
          <div className="pt-4 text-center space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#0A192F]">
              Come Experience His Kingdom With Us
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenPlanVisit}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Plan Your Sunday Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onSelectTab('connect');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-medium text-sm transition-all"
              >
                Get Connected &amp; Ministries
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
