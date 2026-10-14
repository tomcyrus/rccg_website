import React from 'react';
import { Sparkles, Heart, Users, BookOpen } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: 'FIND FULFILLMENT AND PURPOSE',
      category: 'IDENTITY IN CHRIST',
      description:
        'Understanding who we are in Christ produces conviction, strengthens our faith, builds confidence, and empowers us to live for God\'s eternal purposes.',
      image: '/src/assets/images/hero_church_sanctuary_1791981782802.jpg',
      icon: Sparkles,
    },
    {
      title: 'SHARED VALUES & GENUINE LOVE',
      category: 'COMMUNITY OF FAITH',
      description:
        'We believe the love of Christ transforms lives, strengthens families, and builds communities. Experience authentic fellowship where there is always room for one more.',
      image: '/src/assets/images/fellowship_community_1791981784483.jpg',
      icon: Users,
    },
    {
      title: 'CHARITY & SERVING ROSELLE',
      category: 'COMMUNITY OUTREACH',
      description:
        'Inspired by Matthew 5:14–16, we shine the light of Christ in Roselle and neighboring areas, demonstrating God\'s active compassion and tangible hope.',
      image: '/src/assets/images/gallery_community_outreach_1791982293566.jpg',
      icon: Heart,
    },
    {
      title: 'ALL ARE WELCOME AT HIS TABLE',
      category: 'COME AS YOU ARE',
      description:
        'Whether you are exploring the Christian faith, seeking a new spiritual home, or yearning for deeper Bible study, our doors and hearts are open.',
      image: '/src/assets/images/gallery_prayer_communion_1791982293295.jpg',
      icon: BookOpen,
    },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#F5F2F0] border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Finsweet Template 10 Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-16">
          <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
            BENEFITS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-condensed font-bold uppercase tracking-tight text-[#0D0D0D]">
            THE BENEFITS OF JOINING OUR CHURCH
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed max-w-xl mx-auto">
            Discover a life anchored in God's presence, surrounded by a compassionate family dedicated to your spiritual growth.
          </p>
        </div>

        {/* 4-Card Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative min-h-[280px] sm:min-h-[340px] bg-stone-900 border border-stone-300 overflow-hidden shadow-md flex flex-col justify-end p-6 sm:p-8 lg:p-10"
              >
                {/* Background Image with Dark Scrim */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-40 group-hover:scale-105 group-hover:brightness-35 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-3 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-condensed font-bold uppercase tracking-widest text-[#FFD2A4]">
                      {item.category}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-xs font-condensed text-stone-400">0{idx + 1}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide text-white leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>

                {/* Finsweet Template 10 Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-20" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
