import React, { useState } from 'react';
import { EbookItem } from '../types';
import { 
  X, 
  Download, 
  Bookmark, 
  BookOpen, 
  Star, 
  Calendar, 
  FileText, 
  Check, 
  Sparkles, 
  ChevronRight,
  Sun,
  Moon,
  Book,
  Heart
} from 'lucide-react';

interface EbookReaderModalProps {
  ebook: EbookItem | null;
  isOpen: boolean;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
}

type ReaderTheme = 'light' | 'sepia' | 'dark';
type ReaderFontSize = 'sm' | 'base' | 'lg';

export const EbookReaderModal: React.FC<EbookReaderModalProps> = ({
  ebook,
  isOpen,
  isSaved,
  onToggleSave,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'read' | 'toc' | 'takeaways'>('read');
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>('light');
  const [fontSize, setFontSize] = useState<ReaderFontSize>('base');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !ebook) return null;

  const handleDownload = () => {
    // Generate an inspiring offline reading guide & chapter excerpt
    const content = `========================================================
THE REDEEMED CHRISTIAN CHURCH OF GOD
KINGDOM FIRST ASSEMBLY — ROSELLE, NEW JERSEY
E-BOOK STUDY GUIDE & EXCERPT
========================================================

TITLE: ${ebook.title}
${ebook.subtitle ? `SUBTITLE: ${ebook.subtitle}\n` : ''}AUTHOR: ${ebook.author} (${ebook.authorRole || 'RCCG Ministry'})
CATEGORY: ${ebook.categoryLabel}
PAGES: ${ebook.pages} Pages · FORMAT: ${ebook.format} · PUBLISHED: ${ebook.publicationYear}

--------------------------------------------------------
SYNOPSIS
--------------------------------------------------------
${ebook.fullSynopsis}

--------------------------------------------------------
KEY SPIRITUAL TAKEAWAYS
--------------------------------------------------------
${ebook.keyTakeaways.map((point, i) => `${i + 1}. ${point}`).join('\n')}

--------------------------------------------------------
TABLE OF CONTENTS
--------------------------------------------------------
${ebook.tableOfContents.map((ch, i) => `[ ] ${ch}`).join('\n')}

========================================================
FEATURED STUDY CHAPTER: CHAPTER ${ebook.sampleChapter.chapterNumber}
${ebook.sampleChapter.title.toUpperCase()}
========================================================

FOCAL SCRIPTURE:
${ebook.sampleChapter.keyScripture}

CHAPTER EXPOSITION:
${ebook.sampleChapter.paragraphs.map((p) => `\n${p}`).join('\n')}

--------------------------------------------------------
PRAYERFUL REFLECTION QUESTIONS:
--------------------------------------------------------
${ebook.sampleChapter.reflectionQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

--------------------------------------------------------
PRAYER OF DEDICATION:
--------------------------------------------------------
"${ebook.sampleChapter.prayerOfDedication}"

========================================================
RCCG Kingdom First Assembly
121 E 2nd Ave, Roselle, NJ 07203
Sunday Worship: 9:00 AM | Midweek Bible Study: 7:00 PM
YouTube: https://www.youtube.com/@RCCGKFA
========================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ebook.title.replace(/[^a-zA-Z0-9]/g, '_')}_StudyGuide.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const themeClasses: Record<ReaderTheme, { bg: string; text: string; card: string; border: string }> = {
    light: {
      bg: 'bg-[#FAF8F5]',
      text: 'text-stone-900',
      card: 'bg-white',
      border: 'border-stone-200',
    },
    sepia: {
      bg: 'bg-[#FBF0D9]',
      text: 'text-[#433422]',
      card: 'bg-[#F4E4C1]',
      border: 'border-[#DFC69C]',
    },
    dark: {
      bg: 'bg-[#0A192F]',
      text: 'text-slate-100',
      card: 'bg-[#102A43]',
      border: 'border-white/10',
    },
  };

  const fontClasses: Record<ReaderFontSize, string> = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-loose',
  };

  const currentTheme = themeClasses[readerTheme];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-[#0A192F] text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-amber-500/20 shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300 truncate">
                {ebook.categoryLabel}
              </div>
              <h3 id="reader-modal-title" className="text-sm sm:text-base font-serif font-bold text-white truncate">
                {ebook.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(ebook.id)}
              className={`p-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 text-xs px-3 ${
                isSaved
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'hover:bg-white/10 text-slate-300 hover:text-white'
              }`}
              title={isSaved ? 'Remove from Bookshelf' : 'Save to Bookshelf'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-slate-950' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs px-3 shadow-xs"
              title="Download Study Guide (.txt)"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </>
              )}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close e-book reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Sub-Bar: Navigation Tabs & Display Controls */}
        <div className="bg-stone-100 border-b border-stone-200 px-5 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('read')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'read'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Chapter {ebook.sampleChapter.chapterNumber} Preview
            </button>
            <button
              onClick={() => setActiveTab('toc')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'toc'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Table of Contents
            </button>
            <button
              onClick={() => setActiveTab('takeaways')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'takeaways'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Key Takeaways
            </button>
          </div>

          {/* Reading Display Settings: Font Size & Color Theme */}
          <div className="flex items-center gap-4 text-xs text-stone-600">
            {/* Font Size controls */}
            <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-xl">
              <span className="text-[10px] font-bold px-1 text-stone-500 uppercase">Text:</span>
              <button
                onClick={() => setFontSize('sm')}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs cursor-pointer ${
                  fontSize === 'sm' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-sm cursor-pointer ${
                  fontSize === 'base' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-base cursor-pointer ${
                  fontSize === 'lg' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'
                }`}
              >
                A+
              </button>
            </div>

            {/* Color Theme controls */}
            <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-xl">
              <button
                onClick={() => setReaderTheme('light')}
                className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer ${
                  readerTheme === 'light' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                }`}
                title="Light Theme"
              >
                Light
              </button>
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer ${
                  readerTheme === 'sepia' ? 'bg-[#F4E4C1] text-[#433422] shadow-xs font-semibold' : 'text-stone-600'
                }`}
                title="Sepia Book Theme"
              >
                Sepia
              </button>
              <button
                onClick={() => setReaderTheme('dark')}
                className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer ${
                  readerTheme === 'dark' ? 'bg-[#0A192F] text-white shadow-xs font-semibold' : 'text-stone-600'
                }`}
                title="Night Sanctuary Theme"
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Reader Body Area */}
        <div className={`flex-1 overflow-y-auto p-6 sm:p-10 ${currentTheme.bg} ${currentTheme.text} transition-colors duration-200`}>
          {activeTab === 'read' && (
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Chapter Header */}
              <div className="text-center space-y-2 border-b pb-6 border-stone-300/40">
                <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
                  Chapter {ebook.sampleChapter.chapterNumber}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight">
                  {ebook.sampleChapter.title}
                </h2>
                <div className="text-xs sm:text-sm font-sans font-medium text-stone-500">
                  By {ebook.author}
                </div>
              </div>

              {/* Focal Scripture Box */}
              <div className={`p-5 sm:p-6 rounded-2xl border ${currentTheme.card} ${currentTheme.border} shadow-sm space-y-2`}>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Focal Scripture</span>
                </div>
                <blockquote className="font-serif italic text-sm sm:text-base leading-relaxed">
                  {ebook.sampleChapter.keyScripture}
                </blockquote>
              </div>

              {/* Chapter Paragraphs */}
              <div className={`space-y-5 font-serif ${fontClasses[fontSize]}`}>
                {ebook.sampleChapter.paragraphs.map((para, i) => (
                  <p key={i} className="text-justify indent-6">
                    {para}
                  </p>
                ))}
              </div>

              {/* Reflection Questions */}
              {ebook.sampleChapter.reflectionQuestions.length > 0 && (
                <div className={`p-6 rounded-2xl border ${currentTheme.card} ${currentTheme.border} shadow-sm space-y-3`}>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Reflection &amp; Study Questions:</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm font-sans">
                    {ebook.sampleChapter.reflectionQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prayer of Dedication */}
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Prayer of Personal Dedication
                </div>
                <p className="font-serif italic text-sm sm:text-base leading-relaxed text-amber-900">
                  "{ebook.sampleChapter.prayerOfDedication}"
                </p>
              </div>

              {/* Download or Request CTA at End of Chapter */}
              <div className="pt-6 border-t border-stone-300/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500 text-center sm:text-left">
                  Download the available chapter text, reflection questions, and study outline for offline reading.
                </div>
                <button
                  onClick={handleDownload}
                  className="px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Available Study Text</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'toc' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="border-b pb-4 border-stone-300/40">
                <h3 className="text-xl font-serif font-bold">Complete Table of Contents</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Full outline across all {ebook.pages} pages of "{ebook.title}".
                </p>
              </div>

              <div className="space-y-2.5">
                {ebook.tableOfContents.map((chapterTitle, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${currentTheme.card} ${currentTheme.border} flex items-center justify-between gap-3`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-stone-200/80 text-stone-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium">{chapterTitle}</span>
                    </div>
                    {idx === 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider">
                        Available in Preview
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'takeaways' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="border-b pb-4 border-stone-300/40">
                <h3 className="text-xl font-serif font-bold">Spiritual Takeaways &amp; Core Truths</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Summary principles distilled from this publication for daily Christian living.
                </p>
              </div>

              <div className="space-y-3">
                {ebook.keyTakeaways.map((point, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border ${currentTheme.card} ${currentTheme.border} flex items-start gap-3.5`}
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="text-sm sm:text-base leading-relaxed font-sans">{point}</div>
                  </div>
                ))}
              </div>

              {/* Book Metadata details */}
              <div className={`p-6 rounded-2xl border ${currentTheme.card} ${currentTheme.border} grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-6`}>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Pages</div>
                  <div className="text-base font-bold font-serif">{ebook.pages}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Format</div>
                  <div className="text-base font-bold font-serif">{ebook.format}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Est. Read</div>
                  <div className="text-base font-bold font-serif">{ebook.readTimeEst}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Published</div>
                  <div className="text-base font-bold font-serif">{ebook.publicationYear}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
