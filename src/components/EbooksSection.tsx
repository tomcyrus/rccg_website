import React, { useState, useEffect } from 'react';
import { EbookItem, EbookCategory } from '../types';
import { EBOOKS_DATA } from '../data/ebooksData';
import { EbookReaderModal } from './EbookReaderModal';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Download, 
  Star, 
  Sparkles, 
  Filter, 
  FileText, 
  Check, 
  ChevronRight,
  Library,
  MapPin,
  Heart
} from 'lucide-react';

interface EbooksSectionProps {
  onOpenPlanVisit?: () => void;
}

export const EbooksSection: React.FC<EbooksSectionProps> = ({ onOpenPlanVisit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EbookCategory>('all');
  const [savedBookIds, setSavedBookIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('rccg_kfa_saved_ebooks');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load saved books:', e);
      }
    }
    return [];
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState<EbookItem | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  const handleToggleSave = (bookId: string) => {
    const updated = savedBookIds.includes(bookId)
      ? savedBookIds.filter((id) => id !== bookId)
      : [...savedBookIds, bookId];
    
    setSavedBookIds(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('rccg_kfa_saved_ebooks', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save bookmark:', e);
      }
    }
  };

  const handleOpenReader = (ebook: EbookItem) => {
    setSelectedEbook(ebook);
    setIsReaderOpen(true);
  };

  // Filter books
  const filteredBooks = EBOOKS_DATA.filter((book) => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSaved = !showSavedOnly || savedBookIds.includes(book.id);
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query) ||
      book.sampleChapter.keyScripture.toLowerCase().includes(query);

    return matchesCategory && matchesSaved && matchesSearch;
  });

  const categories: { key: EbookCategory; label: string }[] = [
    { key: 'all', label: 'All Publications' },
    { key: 'devotionals', label: 'Daily Devotionals' },
    { key: 'kingdom-living', label: 'Kingdom Living' },
    { key: 'prayer-fasting', label: 'Prayer & Warfare' },
    { key: 'discipleship', label: 'Discipleship & Faith' },
    { key: 'spiritual-growth', label: 'Spiritual Growth' },
    { key: 'family-marriage', label: 'Family & Marriage' },
    { key: 'faith-encouragement', label: 'Comfort & Healing' },
  ];

  const featuredBook = EBOOKS_DATA.find((b) => b.isFeatured) || EBOOKS_DATA[0];

  const coverThemeGradients: Record<EbookItem['coverTheme'], string> = {
    'royal-amber': 'from-[#92400E] via-[#B45309] to-[#78350F]',
    'emerald-gold': 'from-[#064E3B] via-[#047857] to-[#022C22]',
    'navy-gold': 'from-[#0F172A] via-[#1E293B] to-[#0A192F]',
    'burgundy-gold': 'from-[#831843] via-[#9D174D] to-[#500724]',
    'slate-gold': 'from-[#334155] via-[#475569] to-[#1E293B]',
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D63ED] text-xs font-semibold tracking-wider uppercase">
              <Library className="w-3.5 h-3.5 text-[#1D63ED]" />
              <span>Spiritual Library &amp; E-Books</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Equip Your Spirit With Timeless Truth
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Explore curated daily devotionals, discipleship manuals, prayer warfare guides, and biblical family resources. 
              Read sample chapters online or download comprehensive study guides.
            </p>
          </div>

          {/* Quick Bookshelf Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-5 py-2.5 rounded-full font-semibold text-xs tracking-wide transition-all shadow-xs flex items-center gap-2 cursor-pointer border ${
                showSavedOnly
                  ? 'bg-[#1D63ED] text-white border-[#1D63ED] font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showSavedOnly ? 'fill-white text-white' : 'text-[#1D63ED]'}`} />
              <span>My Bookshelf ({savedBookIds.length})</span>
            </button>
          </div>
        </div>

        {/* Featured Book Showcase Hero */}
        {featuredBook && !searchQuery && selectedCategory === 'all' && !showSavedOnly && (
          <div className="rounded-3xl bg-gradient-to-br from-[#0A192F] via-[#102A43] to-[#0A192F] text-white p-6 sm:p-10 border border-amber-500/30 shadow-2xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Book Description & Actions */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
                    {featuredBook.badge || 'Featured Publication'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-medium">
                    {featuredBook.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-amber-300 text-xs font-semibold ml-2">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{featuredBook.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({featuredBook.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                    {featuredBook.title}
                  </h2>
                  <div className="text-sm text-amber-300 font-medium">
                    By {featuredBook.author} {featuredBook.authorRole && `· ${featuredBook.authorRole}`}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed">
                  {featuredBook.fullSynopsis}
                </p>

                {/* Book Details Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                  <span><strong>{featuredBook.pages}</strong> Pages</span>
                  <span className="text-white/30">·</span>
                  <span>Format: <strong>{featuredBook.format}</strong></span>
                  <span className="text-white/30">·</span>
                  <span>Reading: <strong>{featuredBook.readTimeEst}</strong></span>
                  <span className="text-white/30">·</span>
                  <span>Published: <strong>{featuredBook.publicationYear}</strong></span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleOpenReader(featuredBook)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Preview Online</span>
                  </button>

                  <button
                    onClick={() => handleToggleSave(featuredBook.id)}
                    className={`px-5 py-3 rounded-full font-medium text-xs sm:text-sm border transition-all cursor-pointer flex items-center gap-1.5 ${
                      savedBookIds.includes(featuredBook.id)
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                        : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedBookIds.includes(featuredBook.id) ? 'fill-amber-300' : ''}`} />
                    <span>{savedBookIds.includes(featuredBook.id) ? 'Saved on Shelf' : 'Save to Bookshelf'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Stylized Book Cover Art */}
              <div className="lg:col-span-4 flex justify-center">
                <div 
                  onClick={() => handleOpenReader(featuredBook)}
                  className={`w-48 sm:w-56 aspect-[2/3] rounded-2xl bg-gradient-to-br ${coverThemeGradients[featuredBook.coverTheme]} p-6 border-2 border-amber-400/40 shadow-2xl relative flex flex-col justify-between cursor-pointer group hover:scale-105 transition-transform duration-300 select-none`}
                >
                  {/* Spine Highlight & Gilded Corners */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/30 rounded-l-2xl border-r border-amber-400/20" />
                  
                  {/* Top Gilded Emblem */}
                  <div className="text-center space-y-1">
                    <div className="text-[9px] uppercase tracking-widest text-amber-300 font-semibold">
                      RCCG PUBLICATIONS
                    </div>
                    <div className="w-8 h-0.5 bg-amber-400 mx-auto" />
                  </div>

                  {/* Center Title & Scripture */}
                  <div className="text-center space-y-2 px-1">
                    <h3 className="font-serif font-bold text-white text-base sm:text-lg leading-snug drop-shadow-md">
                      {featuredBook.title}
                    </h3>
                    <div className="text-[10px] text-amber-200/90 font-serif italic">
                      Matt 6:33
                    </div>
                  </div>

                  {/* Bottom Author */}
                  <div className="text-center border-t border-amber-400/30 pt-2">
                    <div className="text-[11px] font-semibold text-white truncate">
                      {featuredBook.author}
                    </div>
                    <div className="text-[9px] text-amber-300 uppercase tracking-wider">
                      {featuredBook.publicationYear} Edition
                    </div>
                  </div>

                  {/* Interactive Open Badge */}
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Book</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, author, scripture (e.g. Adeboye, Matthew 6)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Counter */}
            <div className="text-xs text-stone-500 self-end md:self-center font-medium">
              Showing <strong>{filteredBooks.length}</strong> of {EBOOKS_DATA.length} publications
            </div>
          </div>

          {/* Category Tabs: Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key && !showSavedOnly;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    setShowSavedOnly(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1D63ED] text-white shadow-xs font-semibold'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ebooks Grid: 2 columns on mobile, 3 on md, 4 on lg */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filteredBooks.map((book) => {
              const isSaved = savedBookIds.includes(book.id);
              return (
                <div
                  key={book.id}
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Stylized Book Cover Header */}
                  <div 
                    onClick={() => handleOpenReader(book)}
                    className={`aspect-[3/4] bg-gradient-to-br ${coverThemeGradients[book.coverTheme]} p-3 sm:p-5 relative overflow-hidden flex flex-col justify-between cursor-pointer border-b border-slate-200 select-none`}
                  >
                    {/* Spine strip on left */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-3 bg-black/25 border-r border-white/10" />

                    {/* Top Ribbon & Bookmark */}
                    <div className="flex items-center justify-between relative z-10 pl-1.5 sm:pl-2">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-300 font-bold truncate">
                        RCCG PRESS
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSave(book.id);
                        }}
                        className={`p-1 sm:p-1.5 rounded-full transition-colors cursor-pointer ${
                          isSaved ? 'bg-[#1D63ED] text-white' : 'bg-black/30 hover:bg-black/50 text-white'
                        }`}
                        title={isSaved ? 'Remove from bookshelf' : 'Save to bookshelf'}
                      >
                        <Bookmark className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Book Cover Center Title */}
                    <div className="space-y-0.5 sm:space-y-1 text-center relative z-10 px-1 sm:px-2 my-auto">
                      <h3 className="font-bold text-white text-xs sm:text-base lg:text-lg leading-snug line-clamp-3 drop-shadow-md">
                        {book.title}
                      </h3>
                      {book.subtitle && (
                        <p className="text-[8px] sm:text-[10px] text-amber-200/80 font-sans line-clamp-1 hidden sm:block">
                          {book.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Bottom Author Tag */}
                    <div className="relative z-10 text-center border-t border-white/15 pt-1 sm:pt-2 pl-1.5">
                      <div className="text-[10px] sm:text-xs font-semibold text-white truncate">
                        {book.author}
                      </div>
                      <div className="text-[8px] sm:text-[10px] text-slate-300 font-mono">
                        {book.pages}p &middot; {book.format}
                      </div>
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-3 py-1.5 rounded-full bg-[#1D63ED] text-white font-bold text-xs shadow-lg flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Card Details & Actions */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-1 text-[9px] sm:text-[11px] text-[#1D63ED] font-semibold tracking-wide uppercase truncate">
                        <span className="truncate">{book.categoryLabel}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="text-slate-500 font-normal shrink-0">{book.publicationYear}</span>
                      </div>

                      <h4 
                        onClick={() => handleOpenReader(book)}
                        className="text-xs sm:text-base font-bold text-[#0F172A] line-clamp-2 group-hover:text-[#1D63ED] transition-colors cursor-pointer leading-tight sm:leading-snug"
                      >
                        {book.title}
                      </h4>

                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-amber-600 font-semibold">
                        <Star className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                        <span>{book.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal text-[9px] sm:text-xs">({book.reviewCount})</span>
                      </div>

                      <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed hidden xs:block">
                        {book.description}
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                      <button
                        onClick={() => handleOpenReader(book)}
                        className="text-[10px] sm:text-xs font-semibold text-[#1D63ED] hover:text-[#1551CA] flex items-center gap-0.5 transition-colors cursor-pointer"
                      >
                        <span>Preview</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleOpenReader(book)}
                        className="text-[9px] sm:text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span className="hidden sm:inline">Guide</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Library className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-stone-900">No publications found</h3>
              <p className="text-xs text-stone-500">
                {showSavedOnly
                  ? "You have not saved any books to your bookshelf yet. Click the bookmark icon on any book to add it here."
                  : `No books matched "${searchQuery}". Please try another keyword or category.`}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowSavedOnly(false);
              }}
              className="px-5 py-2 rounded-full bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
            >
              Reset Library Filters
            </button>
          </div>
        )}

        {/* Church Sanctuary Physical Book Desk Notice */}
        <div className="rounded-3xl bg-amber-50/60 border border-amber-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <Library className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="font-serif font-bold text-[#0A192F] text-base">
                Looking for Hardcover &amp; Printed Editions?
              </div>
              <p className="text-stone-600">
                Printed study Bibles, discipleship guides, and the annual Open Heavens devotional are available every Sunday 
                at our Sanctuary Resource Desk in Roselle, NJ.
              </p>
            </div>
          </div>

          {onOpenPlanVisit && (
            <button
              onClick={onOpenPlanVisit}
              className="px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Visit Sanctuary on Sunday</span>
            </button>
          )}
        </div>
      </div>

      {/* In-App Reader Modal */}
      <EbookReaderModal
        ebook={selectedEbook}
        isOpen={isReaderOpen}
        isSaved={selectedEbook ? savedBookIds.includes(selectedEbook.id) : false}
        onToggleSave={handleToggleSave}
        onClose={() => {
          setIsReaderOpen(false);
          setSelectedEbook(null);
        }}
      />
    </div>
  );
};
