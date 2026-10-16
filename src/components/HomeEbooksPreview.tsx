import React, { useState } from 'react';
import { PageTab, EbookItem } from '../types';
import { EBOOKS_DATA } from '../data/ebooksData';
import { EbookReaderModal } from './EbookReaderModal';
import { 
  BookOpen, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Library, 
  FileText, 
  Bookmark,
  CheckCircle2
} from 'lucide-react';

interface HomeEbooksPreviewProps {
  onSelectTab: (tab: PageTab) => void;
}

export const HomeEbooksPreview: React.FC<HomeEbooksPreviewProps> = ({ onSelectTab }) => {
  const [selectedEbook, setSelectedEbook] = useState<EbookItem | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [savedBookIds, setSavedBookIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('rccg_kfa_saved_ebooks');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const previewBooks = EBOOKS_DATA.slice(0, 3);

  const handleToggleSave = (bookId: string) => {
    const updated = savedBookIds.includes(bookId)
      ? savedBookIds.filter((id) => id !== bookId)
      : [...savedBookIds, bookId];
    
    setSavedBookIds(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('rccg_kfa_saved_ebooks', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleOpenReader = (book: EbookItem) => {
    setSelectedEbook(book);
    setIsReaderOpen(true);
  };

  const coverThemeGradients: Record<EbookItem['coverTheme'], string> = {
    'royal-amber': 'from-[#92400E] via-[#B45309] to-[#78350F]',
    'emerald-gold': 'from-[#064E3B] via-[#047857] to-[#022C22]',
    'navy-gold': 'from-[#0F172A] via-[#1E293B] to-[#0A192F]',
    'burgundy-gold': 'from-[#831843] via-[#9D174D] to-[#500724]',
    'slate-gold': 'from-[#334155] via-[#475569] to-[#1E293B]',
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D63ED] text-xs font-semibold tracking-wider uppercase">
              <Library className="w-3.5 h-3.5 text-[#1D63ED]" />
              <span>Spiritual Nourishment &amp; E-Books</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Anointed Publications for Daily Growth
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Equip your faith with biblical daily devotionals, discipleship manuals, and prayer warfare study guides. 
              Read free sample chapters directly on your device.
            </p>
          </div>

          <button
            onClick={() => {
              onSelectTab('ebooks');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-[#1D63ED] hover:bg-[#1551CA] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 self-start md:self-end cursor-pointer group"
          >
            <span>Browse All {EBOOKS_DATA.length} E-Books</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Books Responsive Grid: 1 col on <360px, 2 col on mobile >= 360px, 3 col on lg */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {previewBooks.map((book) => {
            const isSaved = savedBookIds.includes(book.id);
            return (
              <div
                key={book.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Book Spine & Cover */}
                <div
                  onClick={() => handleOpenReader(book)}
                  className={`aspect-[3/4] bg-gradient-to-br ${coverThemeGradients[book.coverTheme]} p-2.5 xs:p-3 sm:p-6 relative overflow-hidden flex flex-col justify-between cursor-pointer border-b border-slate-200 select-none`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2 xs:w-2.5 sm:w-3.5 bg-black/30 border-r border-white/10" />

                  <div className="flex items-center justify-between relative z-10 pl-1.5 xs:pl-2">
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-300 font-bold truncate">
                      {book.badge || 'RCCG PUBLICATION'}
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
                      <Bookmark className={`w-3 xs:w-3.5 h-3 xs:h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  <div className="space-y-0.5 xs:space-y-1 sm:space-y-2 text-center relative z-10 px-1 xs:px-2 my-auto">
                    <h3 className="font-bold text-white text-xs xs:text-sm sm:text-xl leading-snug line-clamp-3 drop-shadow-md">
                      {book.title}
                    </h3>
                    <div className="text-[9px] xs:text-[10px] sm:text-[11px] text-amber-200/90 italic line-clamp-1">
                      Ch. {book.sampleChapter.chapterNumber} Available
                    </div>
                  </div>

                  <div className="relative z-10 text-center border-t border-white/15 pt-1.5 sm:pt-2 pl-1.5 xs:pl-2">
                    <div className="text-[10px] xs:text-[11px] sm:text-xs font-semibold text-white truncate">{book.author}</div>
                    <div className="text-[8px] xs:text-[9px] sm:text-[10px] text-slate-300 font-mono">
                      {book.pages} Pages &middot; {book.format}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-3 py-1.5 rounded-full bg-[#1D63ED] text-white font-bold text-xs shadow-lg flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Chapter 1</span>
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-3 xs:p-3.5 sm:p-6 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center gap-1 text-[9px] xs:text-[10px] sm:text-[11px] text-[#1D63ED] font-semibold tracking-wide uppercase">
                      <span className="truncate">{book.categoryLabel}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="text-slate-500 font-normal shrink-0">{book.readTimeEst}</span>
                    </div>

                    <h4
                      onClick={() => handleOpenReader(book)}
                      className="text-xs xs:text-sm sm:text-base font-bold text-[#0F172A] line-clamp-2 group-hover:text-[#1D63ED] transition-colors cursor-pointer leading-snug"
                    >
                      {book.title}
                    </h4>

                    <div className="flex items-center gap-1 text-[10px] xs:text-[11px] sm:text-xs text-amber-600 font-semibold">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                      <span>{book.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({book.reviewCount})</span>
                    </div>

                    <p className="text-[11px] xs:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs">
                    <button
                      onClick={() => handleOpenReader(book)}
                      className="font-semibold text-[#1D63ED] hover:text-[#1551CA] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Sample</span>
                      <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                    </button>

                    <button
                      onClick={() => handleOpenReader(book)}
                      className="font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer text-[10px] xs:text-[11px]"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Guide</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
    </section>
  );
};
