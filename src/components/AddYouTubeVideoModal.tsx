import React, { useState } from 'react';
import { YouTubeVideoItem, VideoCategory } from '../types';
import { extractYouTubeId, getYouTubeThumbnailUrl } from '../utils/youtube';
import { X, Plus, AlertCircle, CheckCircle2, Play, Sparkles } from 'lucide-react';

interface AddYouTubeVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (newVideo: YouTubeVideoItem) => void;
}

export const AddYouTubeVideoModal: React.FC<AddYouTubeVideoModalProps> = ({
  isOpen,
  onClose,
  onAddVideo,
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('RCCG Minister / Pastor');
  const [category, setCategory] = useState<Exclude<VideoCategory, 'all'>>('sunday-service');
  const [scriptureRef, setScriptureRef] = useState('');
  const [duration, setDuration] = useState('1 hr');
  const [description, setDescription] = useState('');
  const [keyNotes, setKeyNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const detectedId = extractYouTubeId(youtubeUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detectedId) {
      setError('Please provide a valid YouTube video URL or ID (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)');
      return;
    }
    if (!title.trim()) {
      setError('Please provide a message title.');
      return;
    }

    const categoryLabels: Record<Exclude<VideoCategory, 'all'>, string> = {
      'sunday-service': 'SUNDAY CELEBRATION',
      'bible-study': 'DIGGING DEEP BIBLE STUDY',
      'worship': 'PRAISE & WORSHIP',
      'holy-ghost': 'HOLY GHOST SERVICE',
      'youth': 'YOUTH & YOUNG ADULTS',
      'prayer-revival': 'PRAYER & REVIVAL',
    };

    const newVideo: YouTubeVideoItem = {
      id: `custom-${Date.now()}`,
      youtubeId: detectedId,
      youtubeUrl: youtubeUrl.trim(),
      title: title.trim(),
      speaker: speaker.trim() || 'RCCG Speaker',
      category,
      categoryLabel: categoryLabels[category],
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      duration: duration.trim() || 'Video',
      scriptureRef: scriptureRef.trim() || undefined,
      description: description.trim() || 'Recorded sermon and worship session from The Redeemed Christian Church of God.',
      keyPoints: keyNotes
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0),
      isCustomAdded: true,
    };

    onAddVideo(newVideo);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-video-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div 
        className="relative w-full max-w-2xl bg-white text-[#0A192F] rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A192F] text-white px-6 py-5 flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Play className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 id="add-video-title" className="text-lg font-serif font-bold text-white">
                Add YouTube Video Link
              </h3>
              <p className="text-xs text-amber-200/80">
                Share a sermon, worship service, or ministry highlight
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close add video modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* YouTube URL input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              YouTube Video URL or Video ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. https://www.youtube.com/watch?v=wL13UqY8YkU or https://youtu.be/..."
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value);
                setError(null);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
            <div className="text-[11px] text-stone-500">
              Supports standard YouTube URLs, live streams, shorts, or direct 11-digit video IDs.
            </div>
          </div>

          {/* Live Thumbnail Preview */}
          {detectedId && (
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
              <div className="w-24 aspect-video rounded-lg overflow-hidden bg-black shrink-0 relative">
                <img
                  src={getYouTubeThumbnailUrl(detectedId)}
                  alt="YouTube thumbnail preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Valid YouTube Video Detected</span>
                </div>
                <div className="text-xs text-stone-500 font-mono truncate">ID: {detectedId}</div>
              </div>
            </div>
          )}

          {/* Video Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Sermon / Message Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sunday Service: Putting God's Kingdom First"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          {/* Speaker & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Speaker / Minister
              </label>
              <input
                type="text"
                placeholder="e.g. Pastor E.A. Adeboye or Resident Pastor"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Exclude<VideoCategory, 'all'>)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white"
              >
                <option value="sunday-service">Sunday Celebration Service</option>
                <option value="bible-study">Digging Deep Bible Study</option>
                <option value="worship">Praise &amp; Worship</option>
                <option value="holy-ghost">Holy Ghost Service</option>
                <option value="youth">Youth &amp; Young Adults</option>
                <option value="prayer-revival">Prayer &amp; Revival Night</option>
              </select>
            </div>
          </div>

          {/* Scripture & Duration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Scripture Reference (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Matthew 6:33 or Psalm 91"
                value={scriptureRef}
                onChange={(e) => setScriptureRef(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Approximate Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 1 hr 15 min or 45 min"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Summary / Sermon Description
            </label>
            <textarea
              rows={2}
              placeholder="Short overview of what the message covers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          {/* Key Notes / Bullet Points */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Key Sermon Takeaways (One per line)
            </label>
            <textarea
              rows={2}
              placeholder="Point 1: Prioritize God&#10;Point 2: Trust His timing"
              value={keyNotes}
              onChange={(e) => setKeyNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Video Gallery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
