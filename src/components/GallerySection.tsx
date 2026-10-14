import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

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
    title: 'PRAISE & SUNDAY WORSHIP',
    category: 'worship',
    categoryLabel: 'WORSHIP SERVICE',
    imageSrc: '/src/assets/images/gallery_worship_service_1791982292757.jpg',
    caption: 'Lifting holy hands in genuine adoration as one family before the throne of grace.',
    scripture: 'Psalm 100:2 — "Worship the Lord with gladness; come before Him with joyful songs."',
    dateOrMoment: 'SUNDAY 9:00 AM',
  },
  {
    id: 'outreach-1',
    title: 'SERVING THE ROSELLE COMMUNITY',
    category: 'outreach',
    categoryLabel: 'COMMUNITY OUTREACH',
    imageSrc: '/src/assets/images/gallery_community_outreach_1791982293566.jpg',
    caption: 'Distributing care packages and nourishing meals with warm hearts and active Christian love.',
    scripture: 'Matthew 25:40 — "Whatever you did for one of the least of these... you did for Me."',
    dateOrMoment: 'COMMUNITY OUTREACH',
  },
  {
    id: 'fellowship-1',
    title: 'FAMILY, JOY & SHARED TABLE',
    category: 'fellowship',
    categoryLabel: 'FELLOWSHIP & FAMILY',
    imageSrc: '/src/assets/images/gallery_family_fellowship_1791982293989.jpg',
    caption: 'Believers of all generations laughing, sharing refreshments, and forging lifelong bonds.',
    scripture: 'Hebrews 10:24 — "And let us consider how we may spur one another on toward love and good deeds."',
    dateOrMoment: 'FELLOWSHIP GATHERING',
  },
  {
    id: 'prayer-1',
    title: 'QUIET PRAYER & COMMUNION',
    category: 'prayer',
    categoryLabel: 'PRAYER & DEVOTION',
    imageSrc: '/src/assets/images/gallery_prayer_communion_1791982293295.jpg',
    caption: 'Coming together at the Lord’s table in reverence, repentance, and thankful communion.',
    scripture: '1 Corinthians 11:24 — "This is my body, which is for you; do this in remembrance of me."',
    dateOrMoment: 'MIDWEEK & COMMUNION',
  },
  {
    id: 'fellowship-2',
    title: 'WARM WELCOMES & SISTERHOOD',
    category: 'fellowship',
    categoryLabel: 'FELLOWSHIP & FAMILY',
    imageSrc: '/src/assets/images/fellowship_community_1791981784483.jpg',
    caption: 'Every newcomer is received as family. No one walks alone at Kingdom First Assembly.',
    scripture: 'Romans 15:7 — "Accept one another, then, just as Christ accepted you, in order to bring praise to God."',
    dateOrMoment: 'FIRST-TIME GUESTS',
  },
  {
    id: 'worship-2',
    title: 'SACRED SANCTUARY OF PEACE',
    category: 'worship',
    categoryLabel: 'WORSHIP SERVICE',
    imageSrc: '/src/assets/images/hero_church_sanctuary_1791981782802.jpg',
    caption: 'Morning light streaming into our gathering place, prepared for worship and biblical instruction.',
    scripture: 'Psalm 122:1 — "I rejoiced with those who said to me, Let us go to the house of the Lord."',
    dateOrMoment: 'SANCTUARY GATHERING',
  },
];

type CategoryFilter = 'all' | 'worship' | 'outreach' | 'fellowship' | 'prayer';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + filteredItems.length - 1) % filteredItems.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
  };

  const currentItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <section id="gallery-section" className="py-14 sm:py-20 md:py-28 bg-[#F5F2F0] border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Finsweet Template 10 Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-12">
          <div className="text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#DC9853]">
            SHARE, INSPIRE, INNOVATE
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-condensed font-bold uppercase tracking-tight text-[#0D0D0D]">
            CAPTURING THE SPIRIT OF OUR ASSEMBLY
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            Witness the warmth of our Sunday worship, the heartbeat of community outreach, and the beauty of genuine Christian fellowship in Roselle.
          </p>
        </div>

        {/* Finsweet Category Filter Tabs - Responsive wrapping */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {[
            { id: 'all', label: 'ALL MOMENTS' },
            { id: 'worship', label: 'WORSHIP & PRAISE' },
            { id: 'outreach', label: 'COMMUNITY OUTREACH' },
            { id: 'fellowship', label: 'FELLOWSHIP & FAMILY' },
            { id: 'prayer', label: 'PRAYER & COMMUNION' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryFilter)}
              className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-condensed font-bold uppercase tracking-wider transition-colors cursor-pointer border min-h-[38px] ${
                activeCategory === cat.id
                  ? 'bg-[#161722] text-[#FFD2A4] border-[#161722]'
                  : 'bg-[#FFF6EB] text-stone-800 border-stone-300 hover:border-stone-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group bg-[#FFF6EB] border border-stone-200 overflow-hidden shadow-xs hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between relative"
            >
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-[#0D0D0D]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3.5 py-2 bg-[#FFD2A4] text-[#0D0D0D] font-condensed font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>VIEW PHOTO</span>
                  </div>
                </div>

                {/* Top Corner Moment Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#0D0D0D]/80 text-[#FFD2A4] text-[10px] font-condensed font-bold uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Card Meta & Caption */}
              <div className="p-5 sm:p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] sm:text-[11px] text-stone-500 font-condensed font-bold uppercase tracking-wider">
                    {item.dateOrMoment}
                  </div>
                  <h3 className="text-lg sm:text-xl font-condensed font-bold uppercase tracking-wide text-[#0D0D0D] group-hover:text-[#DC9853] transition-colors mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans mt-1">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 text-[11px] font-serif italic text-[#A6262B]">
                  {item.scripture}
                </div>
              </div>

              {/* Finsweet Template 10 Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD2A4] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
          ))}
        </div>

        {/* Invitation Strip below gallery */}
        <div className="mt-10 sm:mt-14 bg-[#161722] text-white border border-white/10 p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-lg">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-2xl font-condensed font-bold uppercase text-white">
              COME AND BE PART OF OUR COMMUNITY
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 font-sans">
              Join us this Sunday at 9:00 AM at 121 E 2nd Ave, Roselle, NJ. There is always a seat reserved for you.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@RCCGKFA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-[#FFD2A4] hover:bg-[#E5BE94] text-[#0D0D0D] font-condensed font-bold uppercase tracking-widest text-xs transition-colors shrink-0 whitespace-nowrap text-center min-h-[44px] flex items-center justify-center"
          >
            WATCH SERVICES LIVE
          </a>
        </div>
      </div>

      {/* Lightbox Modal - Fully responsive with touch navigation */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            aria-label="Close photo preview"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 min-w-[44px] min-h-[44px] p-2 text-white/90 hover:text-white bg-black/60 hover:bg-black/90 rounded-full transition-colors cursor-pointer flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 min-w-[44px] min-h-[44px] p-2 sm:p-3 text-white/90 hover:text-white bg-black/60 hover:bg-black/90 rounded-full transition-colors cursor-pointer flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 min-w-[44px] min-h-[44px] p-2 sm:p-3 text-white/90 hover:text-white bg-black/60 hover:bg-black/90 rounded-full transition-colors cursor-pointer flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#FFF6EB] overflow-hidden shadow-2xl border border-stone-700 max-h-[90vh] flex flex-col"
          >
            <div className="aspect-[16/10] bg-black flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-2 sm:space-y-3 bg-[#FFF6EB] overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-condensed font-bold uppercase tracking-wider text-stone-600">
                <span className="text-[#DC9853]">
                  {currentItem.categoryLabel}
                </span>
                <span>{currentItem.dateOrMoment}</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-condensed font-bold uppercase text-[#0D0D0D]">
                {currentItem.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {currentItem.caption}
              </p>

              <div className="pt-2 sm:pt-3 border-t border-stone-300 text-xs font-serif italic text-[#A6262B]">
                {currentItem.scripture}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
