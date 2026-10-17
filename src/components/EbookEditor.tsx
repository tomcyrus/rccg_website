import React, { useState } from 'react';
import { EbookItem } from '../types';

export const newEbook = (): EbookItem => ({
  id: crypto.randomUUID(), title: '', author: '', category: 'devotionals', categoryLabel: 'Devotionals',
  accentColor: '#B45309', coverTheme: 'navy-gold', description: '', fullSynopsis: '', pages: 1,
  format: 'Study guide', readTimeEst: '10 minutes', publicationYear: new Date().getFullYear(), rating: 0,
  reviewCount: 0, keyTakeaways: [], tableOfContents: [], isFeatured: false,
  sampleChapter: { chapterNumber: 1, title: '', keyScripture: '', paragraphs: [], reflectionQuestions: [], prayerOfDedication: '' },
});
const categories = ['devotionals', 'kingdom-living', 'prayer-fasting', 'discipleship', 'faith-encouragement', 'family-marriage', 'spiritual-growth'] as const;

export function EbookEditor({ book, busy, error, onClose, onSave }: { book: EbookItem; busy: boolean; error: string; onClose: () => void; onSave: (book: EbookItem) => Promise<void> }) {
  const [draft, setDraft] = useState(book);
  const field = (key: keyof EbookItem, label: string, multiline = false) => <label className="block text-sm">{label}
    {multiline ? <textarea className="mt-1 w-full border rounded-lg p-2" rows={3} value={String(draft[key] || '')} onChange={e => setDraft({ ...draft, [key]: e.target.value })} />
      : <input className="mt-1 w-full border rounded-lg p-2" required={['title', 'author'].includes(key)} value={String(draft[key] || '')} onChange={e => setDraft({ ...draft, [key]: e.target.value })} />}
  </label>;
  return <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
    <form role="dialog" aria-modal="true" aria-label="E-book editor" className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto space-y-4" onSubmit={e => { e.preventDefault(); void onSave(draft); }}>
      <h2 className="font-serif text-xl font-bold">{book.revision ? 'Edit e-book' : 'Add e-book'}</h2>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      {field('title', 'Title')}{field('subtitle', 'Subtitle')}{field('author', 'Author')}
      <label className="block text-sm">Category<select className="ml-3 border rounded p-2" value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value as EbookItem['category'], categoryLabel: e.target.selectedOptions[0].text })}>{categories.map(c => <option key={c} value={c}>{c.replaceAll('-', ' ')}</option>)}</select></label>
      {field('description', 'Short description', true)}{field('fullSynopsis', 'Synopsis', true)}
      <div className="grid grid-cols-2 gap-4">{(['pages', 'publicationYear'] as const).map(key => <label key={key}>{key === 'pages' ? 'Pages' : 'Publication year'}<input className="w-full border rounded p-2" type="number" min={key === 'pages' ? 1 : 1900} max={key === 'pages' ? 10000 : 2200} required value={draft[key]} onChange={e => setDraft({ ...draft, [key]: Number(e.target.value) })} /></label>)}</div>
      {field('format', 'Format')}{field('readTimeEst', 'Estimated reading time')}
      {(['keyTakeaways', 'tableOfContents'] as const).map(key => <label key={key} className="block">{key === 'keyTakeaways' ? 'Key takeaways (one per line)' : 'Contents (one per line)'}<textarea className="w-full border rounded p-2" value={draft[key].join('\n')} onChange={e => setDraft({ ...draft, [key]: e.target.value.split('\n') })} /></label>)}
      <h3 className="font-semibold">Sample chapter</h3>
      {(['title', 'keyScripture', 'prayerOfDedication'] as const).map(key => <label key={key} className="block">{ { title: 'Chapter title', keyScripture: 'Scripture', prayerOfDedication: 'Prayer of dedication' }[key]}<textarea className="w-full border rounded p-2" value={draft.sampleChapter[key]} onChange={e => setDraft({ ...draft, sampleChapter: { ...draft.sampleChapter, [key]: e.target.value } })} /></label>)}
      {(['paragraphs', 'reflectionQuestions'] as const).map(key => <label key={key} className="block">{key === 'paragraphs' ? 'Chapter text (one paragraph per line)' : 'Reflection questions (one per line)'}<textarea rows={5} className="w-full border rounded p-2" value={draft.sampleChapter[key].join('\n')} onChange={e => setDraft({ ...draft, sampleChapter: { ...draft.sampleChapter, [key]: e.target.value.split('\n') } })} /></label>)}
      <label className="block"><input type="checkbox" checked={!!draft.isFeatured} onChange={e => setDraft({ ...draft, isFeatured: e.target.checked })} /> Featured publication</label>
      <div className="flex justify-end gap-4"><button type="button" onClick={onClose}>Cancel</button><button disabled={busy} className="bg-emerald-800 text-white rounded-full px-6 py-2">{busy ? 'Saving…' : 'Save e-book'}</button></div>
    </form>
  </div>;
}
