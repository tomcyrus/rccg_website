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
    <section id="ministries-section" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold tracking-wider uppercase">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Connect &amp; Grow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
            Ministries for Every Age &amp; Season of Life
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
            God created us for community, not isolation. Find your circle, discover your spiritual gifts, 
            and make a meaningful impact together.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              All Ministries
            </button>
            <button
              onClick={() => setActiveTab('adults')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'adults'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              Men &amp; Women
            </button>
            <button
              onClick={() => setActiveTab('nextgen')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'nextgen'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              Youth &amp; Children
            </button>
            <button
              onClick={() => setActiveTab('outreach')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'outreach'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              Worship &amp; Outreach
            </button>
          </div>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredMinistries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <div
                key={ministry.title}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-400/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo with Overlay Badge */}
                <div className="relative h-40 sm:h-48 overflow-hidden bg-stone-100">
                  <img
                    src={ministry.image}
                    alt={ministry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0A192F] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {ministry.badge}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                    <span className="text-xs font-medium text-amber-300 italic">{ministry.scripture}</span>
                    <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#0A192F] group-hover:text-emerald-800 transition-colors">
                      {ministry.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                      {ministry.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-emerald-800">{ministry.schedule}</span>
                    <span className="text-amber-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
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
