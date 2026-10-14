import React from 'react';
import { Cross, Compass, Heart, ArrowRight } from 'lucide-react';

export const ThreePillarsSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'CHRIST CENTERED',
      badge: 'FOUNDATION',
      icon: Cross,
      description: 'We preach Jesus Christ crucified, risen, and glorified.',
      elaboration:
        'Christ is the cornerstone of our faith. In Him, our identity is secure and our eternal hope is established.',
    },
    {
      num: '02',
      title: 'KINGDOM FOCUSED',
      badge: 'DIVINE PRIORITY',
      icon: Compass,
      description: "We seek God's Kingdom first and desire to live according to His Word.",
      elaboration:
        'Anchored in Matthew 6:33, we prioritize God’s righteousness, values, and eternal purpose above all else.',
    },
    {
      num: '03',
      title: 'LOVE DRIVEN',
      badge: 'COMPASSION',
      icon: Heart,
      description: 'We believe the love of Christ transforms lives, strengthens families, and builds communities.',
      elaboration:
        'Walking in sincere Christian love, we demonstrate compassion, grace, and hope to our neighbors in Roselle.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#F5F2F0] border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Finsweet Template 10 Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-16">
          <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
            SUB-HEADING / OUR VALUES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-condensed font-bold uppercase tracking-tight text-[#0D0D0D]">
            A CHURCH RELEVANT FOR TODAY
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed max-w-xl mx-auto">
            Rooted in unchanging Biblical truth, empowering believers to live for God’s purposes in our modern culture.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group bg-[#FFF6EB] border border-stone-200 p-6 sm:p-8 lg:p-10 flex flex-col justify-between hover:border-stone-400 transition-all relative overflow-hidden shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[#FFD2A4]/40 flex items-center justify-center text-[#161722]">
                      <Icon className="w-6 h-6 text-[#161722]" />
                    </div>
                    <span className="font-condensed font-bold text-xl text-[#DC9853]">
                      {pillar.num}
                    </span>
                  </div>

                  <div className="text-[11px] font-condensed font-bold uppercase tracking-widest text-stone-500">
                    {pillar.badge}
                  </div>

                  <h3 className="text-2xl font-condensed font-bold uppercase tracking-wide text-[#0D0D0D]">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                    {pillar.description}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans pt-1">
                    {pillar.elaboration}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-condensed font-bold uppercase tracking-wider text-stone-500">
                  <span>RCCG KINGDOM FIRST ASSEMBLY</span>
                  <span className="text-[#DC9853]">MATTHEW 6:33</span>
                </div>

                {/* Finsweet Template 10 Accent Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
