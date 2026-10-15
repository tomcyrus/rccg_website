import React from 'react';
import { Cross, Compass, Heart, BookOpen, Flame, Users, Sparkles } from 'lucide-react';

export const ThreePillarsSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Christ Centered',
      scripture: '1 Corinthians 2:2',
      badge: 'FOUNDATION',
      icon: Cross,
      color: 'from-amber-500 to-amber-700',
      description: 'Jesus Christ is the cornerstone of our faith. We proclaim His cross, celebrate His resurrection, and anticipate His glorious return.',
      actionText: 'Christ in us, the hope of glory.',
    },
    {
      num: '02',
      title: 'Kingdom Minded',
      scripture: 'Matthew 6:33',
      badge: 'DIVINE PRIORITY',
      icon: Compass,
      color: 'from-emerald-600 to-emerald-800',
      description: 'We intentionally align our lives, priorities, and decisions with the sovereign will of God, pursuing His righteousness in all things.',
      actionText: 'Seeking His Kingdom first above all.',
    },
    {
      num: '03',
      title: 'Word & Spirit Grounded',
      scripture: 'Acts 2:42',
      badge: 'SPIRITUAL POWER',
      icon: BookOpen,
      color: 'from-blue-600 to-blue-800',
      description: 'Nourished by the pure Word of God and empowered by the Holy Spirit through fervent prayer, vibrant praise, and deeper discipleship.',
      actionText: 'Walking in supernatural wisdom and truth.',
    },
    {
      num: '04',
      title: 'Love & Family Driven',
      scripture: 'John 13:34–35',
      badge: 'COMPASSION',
      icon: Heart,
      color: 'from-rose-500 to-rose-700',
      description: 'Demonstrating the unreserved love of Christ to our neighbors in Roselle, nurturing families, and welcoming every soul with open arms.',
      actionText: 'A loving community where you belong.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-b border-stone-200/80">
      {/* Delicate background cross motif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kingdom Foundations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
            The Pillars of Our Faith &amp; Calling
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Rooted in unchanging Biblical truth, empowering everyday believers to live victoriously 
            and shine as Christ's light in Roselle and across Union County.
          </p>
        </div>

        {/* 4 Pillars Grid with warm sacred aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 hover:border-amber-400/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                    {pillar.badge}
                  </span>
                  <span className="text-xs font-bold font-serif text-stone-400 group-hover:text-amber-600 transition-colors">
                    {pillar.num}
                  </span>
                </div>

                {/* Icon & Heading */}
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200/50 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#0A192F] group-hover:text-amber-800 transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-semibold text-amber-700 mt-0.5">
                      {pillar.scripture}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                {/* Subtle bottom note */}
                <div className="pt-6 mt-6 border-t border-stone-100 text-xs italic text-stone-500 font-serif">
                  {pillar.actionText}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
