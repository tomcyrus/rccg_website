import React, { useState } from 'react';
import { YouTubeVideoItem } from '../types';
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from '../utils/youtube';
import { X, ExternalLink, Share2, Check, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';

interface VideoPlayerModalProps {
  video: YouTubeVideoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes'>('overview');

  if (!isOpen || !video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.youtubeId, true);
  const watchUrl = video.youtubeUrl || getYouTubeWatchUrl(video.youtubeId);

  const handleShare = () => {
    navigator.clipboard.writeText(watchUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div 
        className="relative w-full max-w-5xl bg-[#0A192F] text-white rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#071324]/80">
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 truncate">
              {video.categoryLabel}
            </span>
            {video.seriesTitle && (
              <>
                <span className="text-white/30 hidden sm:inline">·</span>
                <span className="text-xs text-slate-300 hidden sm:inline truncate">{video.seriesTitle}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs px-3"
              title="Copy YouTube Link"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs px-3"
              title="Open directly on YouTube"
            >
              <ExternalLink className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Open in YouTube</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Responsive 16:9 Embedded YouTube Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Information & Takeaways */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[40vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <h3 id="video-modal-title" className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
                {video.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-300 font-sans">
                <span className="text-amber-300 font-semibold">{video.speaker}</span>
                {video.speakerRole && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-slate-400">{video.speakerRole}</span>
                  </>
                )}
                <span className="text-white/30">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>{video.date}</span>
                </span>
                <span className="text-white/30">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>{video.duration}</span>
                </span>
              </div>

              {video.scriptureRef && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Focal Scripture: {video.scriptureRef}</span>
                </div>
              )}
            </div>

            {/* Quick Segmented Toggle */}
            {video.keyPoints && video.keyPoints.length > 0 && (
              <div className="flex items-center p-1 bg-white/5 rounded-xl border border-white/10 shrink-0 self-start">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'notes'
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Sermon Notes ({video.keyPoints.length})
                </button>
              </div>
            )}
          </div>

          {/* Content Tab Display */}
          {activeTab === 'overview' ? (
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {video.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">Subscribe to RCCG KFA on YouTube</div>
                    <div className="text-slate-400">Never miss a Sunday livestream, prayer meeting, or Bible study.</div>
                  </div>
                </div>

                <a
                  href="https://www.youtube.com/@RCCGKFA?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <span>Subscribe to Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3 p-5 rounded-2xl bg-black/40 border border-white/10">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Biblical Insights &amp; Applications:</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-200">
                {video.keyPoints?.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
