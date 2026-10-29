import React, { useState, useEffect } from 'react';
import { YouTubeVideoItem, VideoCategory } from '../types';
import { usePublicContent } from '../hooks/usePublicContent';
import { ContentStatus } from './ContentStatus';

import { getYouTubeThumbnailUrl, getYouTubeWatchUrl } from '../utils/youtube';
import { VideoPlayerModal } from './VideoPlayerModal';
import { PageHero } from './PageHero';
import { 
  Play, 
  Search, 
  Plus, 
  Tv, 
  ExternalLink, 
  Clock, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  Filter,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const VideoGallerySection: React.FC = () => {
  const { items: videos, loading, error } = usePublicContent<YouTubeVideoItem>('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenVideo = (video: YouTubeVideoItem) => {
    setActiveVideo(video);
    setIsPlayerOpen(true);
  };

  // Filter videos
  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      video.title.toLowerCase().includes(query) ||
      video.speaker.toLowerCase().includes(query) ||
      (video.scriptureRef && video.scriptureRef.toLowerCase().includes(query)) ||
      video.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Keep the main message focused on Sunday worship. Both its topic and
  // YouTube link come directly from the record maintained in Admin.
  const featuredVideo =
    videos.find((video) => video.isFeatured && video.category === 'sunday-service')
    ?? videos.find((video) => video.category === 'sunday-service')
    ?? videos.find((video) => video.isFeatured)
    ?? videos[0];

  const categories: { key: VideoCategory; label: string }[] = [
    { key: 'all', label: 'All Videos' },
    { key: 'sunday-service', label: 'Sunday Celebration' },
    { key: 'bible-study', label: 'Digging Deep Bible Study' },
    { key: 'worship', label: 'Praise & Worship' },
    { key: 'holy-ghost', label: 'Holy Ghost Service' },
    { key: 'youth', label: 'Youth & Young Adults' },
    { key: 'prayer-revival', label: 'Prayer & Revival' },
  ];

  return (
    <div className="min-h-screen bg-[#fbf8f0] font-sans">
      <PageHero
        eyebrow="Watch & Be Blessed"
        title="Messages, Worship & the Word"
        description="Watch Sunday services, Bible studies, worship, and special gatherings from Kingdom First Assembly."
      >
        <a
          href="https://www.youtube.com/@RCCGKFA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#ed1234] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#cf0d2a]"
        >
          <Tv className="h-4 w-4" />
          Visit Our YouTube Channel
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </PageHero>

      <ContentStatus loading={loading} error={error} />
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#12372c] text-amber-300 border border-amber-400/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* Featured Video Showcase Banner */}
        {featuredVideo && !searchQuery && selectedCategory === 'all' && (
          <div className="rounded-3xl bg-gradient-to-br from-[#12372c] via-[#07513f] to-[#12372c] text-white p-6 sm:p-10 border border-amber-500/30 shadow-2xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Description & Call to Watch */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
                    Featured Service
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-medium">
                    {featuredVideo.categoryLabel}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                    {featuredVideo.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="text-amber-300 font-semibold">{featuredVideo.speaker}</span>
                    <span className="text-white/30">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{featuredVideo.date}</span>
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{featuredVideo.duration}</span>
                    </span>
                  </div>
                </div>

                {featuredVideo.scriptureRef && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scripture: {featuredVideo.scriptureRef}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed">
                  {featuredVideo.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleOpenVideo(featuredVideo)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <span>Watch in Theater Mode</span>
                  </button>

                  <a
                    href={featuredVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-1.5"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Right Column: Thumbnail Preview Card */}
              <div className="lg:col-span-5">
                <div 
                  onClick={() => handleOpenVideo(featuredVideo)}
                  className="aspect-video rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl relative group cursor-pointer"
                >
                  <img
                    src={getYouTubeThumbnailUrl(featuredVideo.youtubeId, 'hq')}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/95 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl pl-1 ring-8 ring-red-600/30 group-hover:scale-110 transition-all">
                      <Play className="w-8 h-8 fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-[11px] font-mono font-medium text-white">
                    {featuredVideo.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls Bar: Search & Interactive Filter Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search videos by title, speaker, or scripture..."
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

            {/* Video Counter */}
            <div className="text-xs text-stone-500 self-end md:self-center font-medium">
              Showing <strong>{filteredVideos.length}</strong> of {videos.length} videos
            </div>
          </div>

          {/* Category Tabs: Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#007450] text-white shadow-xs font-semibold'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Cards Grid: 1 col on <360px, 2 col on mobile >= 360px, 3 col on lg */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-400/60 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* YouTube Video Thumbnail with Play Button */}
                <div 
                  onClick={() => handleOpenVideo(video)}
                  className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                >
                  <img
                    src={getYouTubeThumbnailUrl(video.youtubeId, 'hq')}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#007450]/90 group-hover:bg-[#007450] text-white flex items-center justify-center shadow-lg pl-0.5 group-hover:scale-110 transition-all">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-2 right-2 px-1.5 sm:px-2 py-0.5 rounded bg-black/85 text-[9px] sm:text-[11px] font-mono font-medium text-white">
                    {video.duration}
                  </div>

                  {/* Custom Added Indicator */}
                  {video.isCustomAdded && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-600 text-[9px] sm:text-[10px] font-semibold text-white uppercase tracking-wider">
                      Community Added
                    </div>
                  )}
                </div>

                {/* Video Info Content */}
                <div className="p-3 xs:p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                  <div className="space-y-1 sm:space-y-1.5">
                    {/* Clean unboxed metadata separator */}
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#007450] font-semibold tracking-wide uppercase">
                      <span className="truncate">{video.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500 font-normal shrink-0">{video.date}</span>
                    </div>

                    <h3 
                      onClick={() => handleOpenVideo(video)}
                      className="text-xs xs:text-sm sm:text-base font-bold text-[#12372c] line-clamp-2 group-hover:text-[#007450] transition-colors cursor-pointer leading-snug"
                    >
                      {video.title}
                    </h3>

                    <div className="text-[10px] xs:text-[11px] sm:text-xs text-slate-600 font-medium truncate">
                      Speaker: <span className="text-slate-900 font-semibold">{video.speaker}</span>
                    </div>

                    {video.scriptureRef && (
                      <div className="text-[10px] xs:text-[11px] sm:text-xs text-[#007450] font-medium flex items-center gap-1 truncate">
                        <BookOpen className="w-3 h-3 text-[#007450] shrink-0" />
                        <span className="truncate">{video.scriptureRef}</span>
                      </div>
                    )}

                    <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px] sm:text-xs">
                    <button
                      onClick={() => handleOpenVideo(video)}
                      className="font-semibold text-[#007450] hover:text-[#005c40] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Watch</span>
                      <Play className="w-3 h-3 fill-[#007450]" />
                    </button>

                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 text-[10px] xs:text-[11px]"
                      title="Open on YouTube"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-stone-900">No videos found</h3>
              <p className="text-xs text-stone-500">
                We couldn't find any sermons matching "{searchQuery}". Try searching for another topic or clear your filter.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 rounded-full bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={activeVideo}
        isOpen={isPlayerOpen}
        onClose={() => {
          setIsPlayerOpen(false);
          setActiveVideo(null);
        }}
      />

    </div>
  );
};
