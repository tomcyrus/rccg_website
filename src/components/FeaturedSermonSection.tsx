import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { usePublicContent } from '../hooks/usePublicContent';
import type { YouTubeVideoItem } from '../types';
import { getYouTubeEmbedUrl } from '../utils/youtube';

interface FeaturedSermonSectionProps {
  onOpenPlanVisit: () => void;
  onNavigateVideos?: () => void;
}

const OFFICIAL_LATEST_VIDEO_ID = 'FUAhAuUbDz4';
const LEGACY_PLACEHOLDER_VIDEO_IDS = new Set([
  'wL13UqY8YkU',
  'k1BneeJTDcU',
  'hZqJ9Pq0vHw',
  '_6t3rC-xGqg',
  's7j3zFq3Nl4',
  '0qU2-Fh3-Y0',
]);

export const FeaturedSermonSection: React.FC<FeaturedSermonSectionProps> = ({
  onNavigateVideos,
}) => {
  const { items: videos } = usePublicContent<YouTubeVideoItem>('videos');
  const featuredVideo = videos.find(video => video.isFeatured) ?? videos[0];
  const hasPublishedVideo = featuredVideo?.youtubeId && !LEGACY_PLACEHOLDER_VIDEO_IDS.has(featuredVideo.youtubeId);
  const youtubeId = hasPublishedVideo ? featuredVideo.youtubeId : OFFICIAL_LATEST_VIDEO_ID;
  const playerTitle = hasPublishedVideo
    ? featuredVideo.title
    : 'RCCG Kingdom First Assembly inauguration service';

  return (
    <section id="latest-sermon-section" className="border-b border-[#e7dfcf] bg-white py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#07142d] shadow-lg ring-1 ring-black/10">
          <iframe
            src={getYouTubeEmbedUrl(youtubeId, false)}
            title={playerTitle}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d49a14]">
            Watch &amp; Be Blessed
          </p>
          <h2 className="mt-1 [font-family:Georgia,serif] text-4xl font-black leading-tight text-[#102441] sm:text-5xl">
            Our Messages Online
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#46515f] sm:text-base">
            Can’t join us in person? Worship with us online through our YouTube channel. Watch our latest services and past messages.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://www.youtube.com/@RCCGKFA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ed1234] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#cf0d2a]"
            >
              <span className="flex h-5 w-7 items-center justify-center rounded bg-white text-[#ed1234]">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </span>
              Watch on YouTube
              <ArrowRight className="h-4 w-4" />
            </a>

            {onNavigateVideos && (
              <button
                onClick={onNavigateVideos}
                className="inline-flex items-center gap-1 px-2 py-3 text-sm font-bold text-[#006b4f] transition hover:text-[#004c38]"
              >
                All Messages
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
