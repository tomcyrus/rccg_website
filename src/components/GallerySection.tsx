import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Heart } from 'lucide-react';

import worshipImg from '../assets/images/gallery_worship_service_1791982292757.jpg';
import outreachImg from '../assets/images/gallery_community_outreach_1791982293566.jpg';
import familyImg from '../assets/images/gallery_family_fellowship_1791982293989.jpg';
import prayerImg from '../assets/images/gallery_prayer_communion_1791982293295.jpg';
import sanctuaryImg from '../assets/images/hero_church_sanctuary_1791981782802.jpg';
import fellowshipImg from '../assets/images/fellowship_community_1791981784483.jpg';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'worship' | 'outreach' | 'fellowship' | 'prayer';
  categoryLabel: string;
  imageSrc: string;
  caption: string;
  scripture: string;
  dateOrMoment: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'worship-1',
    title: 'Heartfelt Praise & Sunday Worship',
    category: 'worship',
    categoryLabel: 'WORSHIP SERVICE',
    imageSrc: worshipImg,
    caption: 'Lifting holy hands in genuine adoration as one family before the throne of grace.',
    scripture: 'Psalm 100:2 — "Worship the Lord with gladness; come before Him with joyful songs."',
    dateOrMoment: 'SUNDAY 10:00 AM',
  },
  {
    id: 'outreach-1',
    title: 'Serving the Roselle Community',
    category: 'outreach',
    categoryLabel: 'COMMUNITY OUTREACH',
    imageSrc: outreachImg,
    caption: 'Distributing care packages and nourishing meals with warm hearts and active Christian love.',
    scripture: 'Matthew 25:40 — "Whatever you did for one of the least of these... you did for Me."',
    dateOrMoment: 'COMMUNITY BENEVOLENCE',
  },
  {
    id: 'fellowship-1',
    title: 'Family Joy & Shared Table',
    category: 'fellowship',
    categoryLabel: 'FELLOWSHIP & FAMILY',
    imageSrc: familyImg,
    caption: 'Believers of all generations laughing, sharing refreshments, and forging lifelong bonds.',
    scripture: 'Hebrews 10:24 — "And let us consider how we may spur one another on toward love and good deeds."',
    dateOrMoment: 'CHURCH FAMILY',
  },
  {
    id: 'prayer-1',
    title: 'Reverent Prayer & Holy Communion',
    category: 'prayer',
    categoryLabel: 'PRAYER & COMMUNION',
    imageSrc: prayerImg,
    caption: 'Coming together at the Lord’s table in reverence, repentance, and thankful communion.',
    scripture: '1 Corinthians 11:24 — "This is my body, which is for you; do this in remembrance of me."',
    dateOrMoment: 'MIDWEEK & COMMUNION',
  },
  {
    id: 'fellowship-2',
    title: 'Warm Welcomes & Sisterhood',
    category: 'fellowship',
    categoryLabel: 'FELLOWSHIP & FAMILY',
    imageSrc: fellowshipImg,
    caption: 'A friendly face and caring hug ready to greet you, whether it is your 1st visit or 100th.',
    scripture: 'Romans 15:7 — "Accept one another, then, just as Christ accepted you, in order to bring praise to God."',
    dateOrMoment: 'EVERY GATHERING',
  },
  {
    id: 'worship-2',
    title: 'Sanctuary Bathed in Morning Grace',
    category: 'worship',
    categoryLabel: 'WORSHIP SERVICE',
    imageSrc: sanctuaryImg,
    caption: 'Our welcoming meeting sanctuary on 2nd Ave filled with radiant peace and expectancy.',
    scripture: 'Psalm 122:1 — "I rejoiced with those who said to me, \'Let us go to the house of the Lord.\'"',
    dateOrMoment: 'ROSELLE SANCTUARY',
  },
];

type CategoryFilter = 'all' | 'worship' | 'outreach' | 'fellowship' | 'prayer';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (indexInFiltered: number) => {
    setLightboxIndex(indexInFiltered);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev! - 1 + filteredItems.length) % filteredItems.length));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev! + 1) % filteredItems.length));
    }
  };

  return (
    <section id="gallery-section" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Church Life &amp; Fellowship</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
            Moments in the Father's House
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Witness the warmth of our Sunday worship, the heartbeat of community outreach, and the beauty of genuine Christian fellowship in Roselle, NJ.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {[
            { id: 'all', label: 'All Moments' },
            { id: 'worship', label: 'Worship & Praise' },
            { id: 'outreach', label: 'Community Outreach' },
            { id: 'fellowship', label: 'Family & Fellowship' },
            { id: 'prayer', label: 'Prayer & Communion' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryFilter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Responsive Grid: 2 columns on mobile, 3 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400/60 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3 py-1.5 bg-white/95 rounded-full text-slate-900 font-semibold text-xs flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5 text-[#1D63ED]" />
                    <span className="hidden xs:inline">View Photo</span>
                  </div>
                </div>

                {/* Top Corner Moment Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#0F172A]/85 text-blue-200 text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:py-1 rounded-full backdrop-blur-xs truncate max-w-[85%]">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Card Meta & Caption */}
              <div className="p-2.5 xs:p-3 sm:p-6 space-y-1.5 sm:space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1D63ED] truncate">
                    {item.dateOrMoment}
                  </div>
                  <h3 className="text-xs xs:text-sm sm:text-lg font-bold text-[#0F172A] group-hover:text-[#1D63ED] transition-colors mt-0.5 line-clamp-1 xs:line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-600 leading-relaxed font-sans mt-0.5 line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-slate-100 text-[9px] xs:text-[10px] sm:text-xs italic text-[#1D63ED] truncate">
                  {item.scripture}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Invitation Strip below gallery */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-r from-[#0A192F] via-[#102A43] to-[#0A192F] text-white p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Come Experience It in Person
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Join us this Sunday at 10:00 AM at 121 E 2nd Ave, Roselle, NJ. There is always a seat reserved for you.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@RCCGKFA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-colors shrink-0 whitespace-nowrap text-center shadow-md flex items-center justify-center"
          >
            Watch Online Broadcast
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          onClick={handleCloseLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Close photo"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[90vh] bg-[#0A192F] rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black">
              <img
                src={filteredItems[lightboxIndex].imageSrc}
                alt={filteredItems[lightboxIndex].title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 text-white space-y-2">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {filteredItems[lightboxIndex].categoryLabel} · {filteredItems[lightboxIndex].dateOrMoment}
              </div>
              <h3 className="text-xl font-serif font-bold">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {filteredItems[lightboxIndex].caption}
              </p>
              <div className="text-xs font-serif italic text-amber-200/90 pt-1 border-t border-white/10">
                {filteredItems[lightboxIndex].scripture}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
