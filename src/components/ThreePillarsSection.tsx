import React from 'react';
import { Cross, Crown, Heart } from 'lucide-react';
import bibleImg from '../assets/images/reference/reference_bible.jpg';
import worshipHandsImg from '../assets/images/reference/reference_worship_hands.jpg';
import fellowshipImg from '../assets/images/reference/reference_fellowship.jpg';

interface ThreePillarsSectionProps {
  onSelectAction?: (pillar: string) => void;
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({ onSelectAction }) => {
  const cards = [
    {
      id: 'worship',
      title: 'Christ Centered',
      description: 'We preach Jesus Christ crucified, risen, and glorified.',
      icon: Cross,
      iconBg: 'bg-[#005b44]',
      image: bibleImg,
      imageAlt: 'Open Bible in warm morning light',
    },
    {
      id: 'grow',
      title: 'Kingdom Focused',
      description: "We seek God's Kingdom first in our lives and decisions.",
      icon: Crown,
      iconBg: 'bg-[#efb21c]',
      image: worshipHandsImg,
      imageAlt: 'Hands raised in worship at sunrise',
    },
    {
      id: 'connect',
      title: 'Love Driven',
      description: "We grow in Christ's love and share it with our community.",
      icon: Heart,
      iconBg: 'bg-[#ed1234]',
      image: fellowshipImg,
      imageAlt: 'Church members enjoying joyful fellowship',
    },
  ];

  return (
    <section className="border-b border-[#e7dfcf] bg-[#fffdf8] py-8 sm:py-10">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-8 md:grid-cols-3 lg:px-10">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.id}
              onClick={() => onSelectAction?.(card.id)}
              className="group overflow-hidden rounded-xl border border-[#e7dfcf] bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex items-center gap-3 px-1 pb-3">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-md ${card.iconBg}`}>
                  <Icon className="h-7 w-7 fill-current" />
                </span>
                <span>
                  <span className="block [font-family:Georgia,serif] text-xl font-bold leading-tight text-[#124c3a]">
                    {card.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-[#293746]">
                    {card.description}
                  </span>
                </span>
              </span>

              <span className="block aspect-[2.25/1] overflow-hidden rounded-lg bg-[#ede7db]">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
