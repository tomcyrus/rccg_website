import { PageTab } from '../types';

export const PAGE_PATHS: Record<PageTab, string> = {
  home: '/',
  about: '/about',
  videos: '/sermons',
  events: '/events',
  ebooks: '/ebooks',
  gallery: '/gallery',
  connect: '/connect',
  admin: '/admin',
};

const PATH_TABS: Record<string, PageTab> = {
  '/': 'home',
  '/home': 'home',
  '/about': 'about',
  '/sermons': 'videos',
  '/videos': 'videos',
  '/events': 'events',
  '/ebooks': 'ebooks',
  '/gallery': 'gallery',
  '/connect': 'connect',
  '/admin': 'admin',
};

const isPageTab = (value: string): value is PageTab => value in PAGE_PATHS;

export function pageTabFromLocation(location: Location): PageTab {
  const legacyHash = location.hash.replace(/^#\/?/, '').toLowerCase();
  if (isPageTab(legacyHash)) return legacyHash;

  const normalizedPath = location.pathname.length > 1
    ? location.pathname.replace(/\/+$/, '').toLowerCase()
    : '/';
  if (PATH_TABS[normalizedPath]) return PATH_TABS[normalizedPath];

  const legacyQuery = new URLSearchParams(location.search).get('tab')?.toLowerCase() || '';
  return isPageTab(legacyQuery) ? legacyQuery : 'home';
}
