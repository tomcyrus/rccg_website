import React, { useState } from 'react';
import { Users, Sparkles, Heart, BookOpen, Music, Shield, ArrowRight } from 'lucide-react';
import sanctuaryImg from '../assets/images/hero_church_sanctuary_1791981782802.jpg';
import fellowshipImg from '../assets/images/fellowship_community_1791981784483.jpg';
import outreachImg from '../assets/images/gallery_community_outreach_1791982293566.jpg';
import worshipImg from '../assets/images/gallery_worship_service_1791982292757.jpg';

export const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'adults' | 'nextgen' | 'outreach'>('all');

  const ministries = [
    {
      category: 'adults',
      badge: "MEN'S MINISTRY",
      title: 'Men of Valor Fellowship',
      scripture: 'Proverbs 27:17',
      description: 'Equipping men to be godly spiritual leaders, faithful fathers, and men of prayer in their homes and communities.',
      schedule: 'Monthly Fellowship Breakfast & Prayer',
      image: fellowshipImg,
      icon: Shield,
    },
    {
      category: 'adults',
      badge: "WOMEN'S MINISTRY",
      title: 'Good Women Fellowship',
      scripture: 'Proverbs 31:25–26',
      description: 'Nurturing women of prayer, virtue, and purpose through fellowship, spiritual mentorship, and mutual encouragement.',
      schedule: 'Monthly Prayer & Sisterhood Meetings',
      image: sanctuaryImg,
      icon: Heart,
    },
    {
      category: 'nextgen',
      badge: 'YOUTH & YOUNG ADULTS',
      title: 'Kingdom Youth Ignited',
      scripture: '1 Timothy 4:12',
      description: 'Empowering teens, college students, and young professionals to navigate culture with unshakeable faith and purpose.',
      schedule: 'Alternate Fridays & Sunday Breakouts',
      image: worshipImg,
      icon: Sparkles,
    },
    {
      category: 'nextgen',
      badge: "CHILDREN'S CHURCH",
      title: 'Victorious Kids Academy',
      scripture: 'Proverbs 22:6',
      description: 'Engaging, safe, and joyful Bible lessons, scripture memory, crafts, and interactive praise tailored for children.',
      schedule: 'Every Sunday at 10:00 AM',
      image: fellowshipImg,
      icon: BookOpen,
    },
    {
      category: 'outreach',
      badge: 'WORSHIP MINISTRY',
      title: 'The Levites Choir & Praise',
      scripture: 'Psalm 100:1–2',
      description: 'Dedicated psalmists and musicians leading the assembly into God’s presence with passionate, spirit-filled worship.',
      schedule: 'Weekly Rehearsals & Ministry',
      image: worshipImg,
      icon: Music,
    },
    {
      category: 'outreach',
      badge: 'COMMUNITY IMPACT',
      title: 'Roselle Compassion Outreach',
      scripture: 'Matthew 25:40',
      description: 'Sharing Christ’s love in tangible ways: neighborhood food drives, clothing giveaways, and community prayer walks.',
      schedule: 'Quarterly Community Action Days',
      image: outreachImg,
      icon: Users,
    },
  ];

  const filteredMinistries = activeTab === 'all' 
    ? ministries 
    : ministries.filter(m => m.category === activeTab);

  return (
    <section id="ministries-section" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D63ED] text-xs font-semibold tracking-wider uppercase">
            <Users className="w-3.5 h-3.5 text-[#1D63ED]" />
            <span>Connect &amp; Grow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Ministries for Every Age &amp; Season of Life
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            God created us for community, not isolation. Find your circle, discover your spiritual gifts, 
            and make a meaningful impact together.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#1D63ED] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Ministries
            </button>
            <button
              onClick={() => setActiveTab('adults')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'adults'
                  ? 'bg-[#1D63ED] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Men &amp; Women
            </button>
            <button
              onClick={() => setActiveTab('nextgen')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'nextgen'
                  ? 'bg-[#1D63ED] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Youth &amp; Children
            </button>
            <button
              onClick={() => setActiveTab('outreach')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'outreach'
                  ? 'bg-[#1D63ED] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Worship &amp; Outreach
            </button>
          </div>
        </div>

        {/* Ministries Responsive Grid: 1 col on <360px, 2 col on mobile >= 360px, 3 col on lg */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {filteredMinistries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <div
                key={ministry.title}
                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 hover:border-blue-400/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo with Overlay Badge */}
                <div className="relative h-28 xs:h-36 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={ministry.image}
                    alt={ministry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-xs text-[#0F172A] text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:py-1 rounded-full shadow-xs">
                    {ministry.badge}
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white flex items-center justify-between">
                    <span className="text-[10px] xs:text-[11px] sm:text-xs font-medium text-blue-200 italic truncate max-w-[70%]">{ministry.scripture}</span>
                    <div className="p-1 sm:p-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white shrink-0">
                      <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 xs:p-3.5 sm:p-6 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-sm xs:text-base sm:text-xl font-bold text-[#0F172A] group-hover:text-[#1D63ED] transition-colors leading-snug">
                      {ministry.title}
                    </h3>
                    <p className="text-[11px] xs:text-xs sm:text-sm text-slate-600 leading-relaxed font-sans line-clamp-2 xs:line-clamp-3 sm:line-clamp-none">
                      {ministry.description}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
                    <span className="font-medium text-[#1D63ED] text-[10px] xs:text-[11px] sm:text-xs truncate max-w-[75%]">{ministry.schedule}</span>
                    <span className="text-[#1D63ED] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0 text-[11px] sm:text-xs">
                      Join &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
