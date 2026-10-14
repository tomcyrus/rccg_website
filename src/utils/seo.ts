import { PageTab } from '../types';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  breadcrumbName: string;
}

export const SEO_PAGE_CONFIGS: Record<PageTab, PageSeoConfig> = {
  home: {
    title: 'RCCG Kingdom First Assembly | Church in Roselle, NJ',
    description: 'RCCG Kingdom First Assembly is a Christ-centered, Kingdom-minded church family in Roselle, New Jersey. Seeking His Kingdom First. Sharing His Love With All.',
    keywords: 'RCCG, Kingdom First Assembly, Roselle NJ Church, The Redeemed Christian Church of God, Sunday Worship, Bible Study Roselle, Christian Church Union County',
    canonicalPath: '/',
    breadcrumbName: 'Home',
  },
  about: {
    title: 'About Us | RCCG Kingdom First Assembly Roselle NJ',
    description: 'Learn about our mission, vision, biblical doctrine, and pastoral leadership at RCCG Kingdom First Assembly in Roselle, NJ. Christ above all and Kingdom first.',
    keywords: 'About RCCG Roselle, Kingdom First Assembly Mission, Christian Beliefs, RCCG Church History, Roselle NJ Ministry, Pastor RCCG',
    canonicalPath: '/?tab=about',
    breadcrumbName: 'About Us',
  },
  gallery: {
    title: 'Church Life & Photo Gallery | RCCG Kingdom First Assembly',
    description: 'Explore photo highlights of worship services, community food drives, prayer gatherings, and family fellowship at RCCG Kingdom First Assembly in Roselle, NJ.',
    keywords: 'RCCG Kingdom First Gallery, Church Photos Roselle NJ, Worship Service Images, Christian Fellowship NJ, Church Outreach Photos',
    canonicalPath: '/?tab=gallery',
    breadcrumbName: 'Church Life & Gallery',
  },
  connect: {
    title: 'Plan a Visit & Contact | RCCG Kingdom First Assembly Roselle NJ',
    description: 'Plan your visit to RCCG Kingdom First Assembly at 121 E 2nd Ave, Roselle, NJ. Sunday worship at 9:00 AM, Midweek Bible study at 7:00 PM. Get in touch with us.',
    keywords: 'Plan a Visit RCCG, Church Address Roselle NJ, 121 E 2nd Ave Roselle, Service Times Roselle, Prayer Request RCCG, Contact Church Roselle NJ',
    canonicalPath: '/?tab=connect',
    breadcrumbName: 'Plan a Visit & Contact',
  },
};

/**
 * Updates dynamic meta tags and structured breadcrumb data based on the current active tab
 */
export function updatePageSeo(tab: PageTab) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const config = SEO_PAGE_CONFIGS[tab] || SEO_PAGE_CONFIGS.home;
  const baseUrl = window.location.origin;
  const canonicalUrl = `${baseUrl}${config.canonicalPath}`;

  // 1. Update Document Title
  document.title = config.title;

  // 2. Helper to set or create meta tags
  const setMetaTag = (attribute: 'name' | 'property', attrValue: string, contentValue: string) => {
    let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', contentValue);
  };

  // Standard Meta Tags
  setMetaTag('name', 'description', config.description);
  setMetaTag('name', 'keywords', config.keywords);

  // Open Graph
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:url', canonicalUrl);

  // Twitter
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // Dynamic BreadcrumbList JSON-LD
  let breadcrumbScript = document.getElementById('seo-dynamic-breadcrumbs') as HTMLScriptElement | null;
  if (!breadcrumbScript) {
    breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'seo-dynamic-breadcrumbs';
    breadcrumbScript.type = 'application/ld+json';
    document.head.appendChild(breadcrumbScript);
  }

  const breadcrumbsData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
      ...(tab !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: config.breadcrumbName,
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  };

  breadcrumbScript.textContent = JSON.stringify(breadcrumbsData);
}
