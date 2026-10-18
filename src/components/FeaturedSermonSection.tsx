import React, { useState } from 'react';
import { Play, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { VideoPlayerModal } from './VideoPlayerModal';
import { YouTubeVideoItem } from '../types';
import { usePublicContent } from '../hooks/usePublicContent';
import { ContentStatus } from './ContentStatus';
import { getYouTubeThumbnailUrl } from '../utils/youtube';

interface FeaturedSermonSectionProps {
  onOpenPlanVisit: () => void;
  onNavigateVideos?: () => void;
}

export const FeaturedSermonSection: React.FC<FeaturedSermonSectionProps> = ({
  onNavigateVideos,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideoItem | null>(null);

  const { items: videos, loading, error } = usePublicContent<YouTubeVideoItem>('videos');
  const mainFeaturedVideo = videos.find(v => v.isFeatured) || videos[0];
  const recentSermons = videos.filter(v => v.id !== mainFeaturedVideo?.id).slice(0, 3);
  const handlePlayMain = () => setSelectedVideo(mainFeaturedVideo);
  const handlePlayRecent = (sermon: YouTubeVideoItem) => setSelectedVideo(sermon);

  return (
    <section id="latest-sermon-section" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ContentStatus loading={loading} error={error} />
        {!loading && !error && !videos.length && <p className="text-slate-600">Sermons will appear here when published.</p>}
        {/* Section Header matching template */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Latest Sermon
          </h2>

          {onNavigateVideos && (
            <button
              onClick={onNavigateVideos}
              className="text-xs sm:text-sm font-semibold text-[#1D63ED] hover:text-[#1551CA] flex items-center gap-1 transition-colors cursor-pointer group"
            >
              <span>View All Sermons</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Large Featured Split Card matching template */}
        {mainFeaturedVideo && <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
            
            {/* Left: Thumbnail & Play Trigger */}
            <div 
              onClick={handlePlayMain}
              className="md:col-span-6 lg:col-span-7 relative aspect-[16/10] sm:aspect-video bg-black overflow-hidden group cursor-pointer"
            >
              <img
                src={getYouTubeThumbnailUrl(mainFeaturedVideo.youtubeId)}
                alt={mainFeaturedVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              {/* Timestamp Badge Bottom-Left */}
              <div className="absolute bottom-3 left-3 bg-black/85 text-white font-mono text-xs font-semibold px-2 py-0.5 rounded">
                {mainFeaturedVideo.duration}
              </div>

              {/* White Round Play Button Bottom-Right matching template */}
              <div className="absolute bottom-3 right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#0F172A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pl-0.5">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>

            {/* Right: Metadata & Content */}
            <div className="md:col-span-6 lg:col-span-5 p-5 sm:p-8 lg:p-10 space-y-2.5 sm:space-y-3">
              <div className="text-xs font-medium text-slate-500">
                {mainFeaturedVideo.date} &middot; {mainFeaturedVideo.categoryLabel}
              </div>

              <h3 
                onClick={handlePlayMain}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] hover:text-[#1D63ED] transition-colors cursor-pointer leading-tight"
              >
                {mainFeaturedVideo.title}
              </h3>

              <div className="text-xs sm:text-sm font-semibold text-slate-800">
                {mainFeaturedVideo.speaker} &middot; RCCG KFA
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-3">
                {mainFeaturedVideo.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={handlePlayMain}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#1D63ED] hover:text-[#1551CA] transition-colors cursor-pointer py-1"
                >
                  <Play className="w-3.5 h-3.5 fill-[#1D63ED]" />
                  <span>Watch Sermon Now</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        }
        {/* Recent Sermons Responsive Card Grid: 1 col on <360px, 2 col on mobile >= 360px, 3 col on md */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {recentSermons.map((sermon) => (
            <div
              key={sermon.id}
              onClick={() => handlePlayRecent(sermon)}
              className="group cursor-pointer flex flex-col space-y-1.5 sm:space-y-3 bg-[#F8FAFC] sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-slate-200/80 hover:border-blue-300 transition-all"
            >
              {/* Thumbnail with timestamp badge bottom-right */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200">
                <img
                  src={getYouTubeThumbnailUrl(sermon.youtubeId)}
                  alt={sermon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                {/* Duration Badge Bottom-Right */}
                <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-black/85 text-white font-mono text-[9px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded">
                  {sermon.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 text-[#0F172A] flex items-center justify-center shadow-md">
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5 text-[#1D63ED]" />
                  </div>
                </div>
              </div>

              {/* Title & Date */}
              <div className="px-0.5">
                <h4 className="font-bold text-xs sm:text-base text-[#0F172A] group-hover:text-[#1D63ED] transition-colors leading-snug line-clamp-2">
                  {sermon.title}
                </h4>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">
                  {sermon.date} &middot; {sermon.speaker}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive YouTube Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};
