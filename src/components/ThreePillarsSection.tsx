import React from 'react';
import { Music, BookOpen, Users, Heart } from 'lucide-react';

interface ThreePillarsSectionProps {
  onSelectAction?: (pillar: string) => void;
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({ onSelectAction }) => {
  const cards = [
    {
      id: 'worship',
      title: 'Worship',
      description: 'Encounter God through Spirit-filled worship, vibrant praise, and fervent prayer.',
      icon: Music,
      iconBg: 'bg-[#1D63ED]',
      iconColor: 'text-white',
    },
    {
      id: 'grow',
      title: 'Grow',
      description: 'Deepen your faith and understanding through the pure Word of God and Bible study.',
      icon: BookOpen,
      iconBg: 'bg-[#1D63ED]',
      iconColor: 'text-white',
    },
    {
      id: 'connect',
      title: 'Connect',
      description: 'Build meaningful, lifelong relationships within a loving Christ-centered family.',
      icon: Users,
      iconBg: 'bg-[#1D63ED]',
      iconColor: 'text-white',
    },
    {
      id: 'serve',
      title: 'Serve',
      description: 'Discover your spiritual gifts and use them to make a lasting impact in Roselle and beyond.',
      icon: Heart,
      iconBg: 'bg-[#9E1C3F]', // Burgundy/Rose matching template
      iconColor: 'text-white',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading with Restored Church Name */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D63ED] text-xs font-semibold tracking-wider uppercase">
            <span>Welcome Home</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Welcome to Kingdom First Assembly
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            We are a Christ-centered, Kingdom-minded church family passionate about knowing God, 
            growing together, and making a lasting difference in our world.
          </p>
        </div>

        {/* 4 Cards Grid - Responsive: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onSelectAction && onSelectAction(card.id)}
                className="group bg-[#F8FAFC] hover:bg-white active:scale-[0.98] rounded-xl sm:rounded-2xl p-3.5 sm:p-7 border border-slate-200/80 hover:border-blue-400/50 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center cursor-pointer select-none"
              >
                {/* Circle Icon matching template */}
                <div className={`w-10 h-10 sm:w-13 sm:h-13 rounded-full ${card.iconBg} ${card.iconColor} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                  <Icon className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
                </div>

                {/* Card Title */}
                <h3 className="text-sm sm:text-lg font-bold text-[#0F172A] mt-3 sm:mt-4 mb-1 group-hover:text-[#1D63ED] transition-colors">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-[11px] sm:text-sm text-slate-500 font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
