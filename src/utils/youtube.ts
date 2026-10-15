/**
 * YouTube Utility Helpers for RCCG Video Gallery
 */

/**
 * Extracts a standard 11-character YouTube ID from various YouTube URL formats:
 * - https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - https://youtu.be/dQw4w9WgXcQ
 * - https://www.youtube.com/embed/dQw4w9WgXcQ
 * - https://www.youtube.com/live/dQw4w9WgXcQ
 * - https://www.youtube.com/shorts/dQw4w9WgXcQ
 * - Or direct 11-character ID
 */
export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If already an 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex covering standard YouTube URL variations
  const regExp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|live|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);

  return match && match[1] ? match[1] : null;
}

/**
 * Generates privacy-enhanced YouTube embed URL
 */
export function getYouTubeEmbedUrl(youtubeId: string, autoplay = true): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1',
  });
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}

/**
 * Generates standard YouTube thumbnail URL
 */
export function getYouTubeThumbnailUrl(youtubeId: string, quality: 'maxres' | 'hq' | 'mq' = 'hq'): string {
  if (quality === 'maxres') {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  }
  if (quality === 'mq') {
    return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

/**
 * Generates canonical YouTube watch URL
 */
export function getYouTubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}
