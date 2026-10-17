import { writeFileSync } from 'node:fs';
import { SEED_CHURCH_EVENTS } from './starter-events';
import { INITIAL_YOUTUBE_VIDEOS } from '../src/data/videoGalleryData';
import { EBOOKS_DATA } from '../src/data/ebooksData';
writeFileSync('backend/seed.json', JSON.stringify({ events: SEED_CHURCH_EVENTS, videos: INITIAL_YOUTUBE_VIDEOS, ebooks: EBOOKS_DATA }, null, 2));
