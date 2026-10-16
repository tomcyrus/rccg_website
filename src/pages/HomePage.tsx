import React from 'react';
import { PageTab } from '../types';
import { HeroSection } from '../components/HeroSection';
import { ThreePillarsSection } from '../components/ThreePillarsSection';
import { FeaturedSermonSection } from '../components/FeaturedSermonSection';
import { ServeBanner } from '../components/ServeBanner';
import { BenefitsSection } from '../components/BenefitsSection';
import { HomeEbooksPreview } from '../components/HomeEbooksPreview';
import { ChurchCalendarSection } from '../components/ChurchCalendarSection';
import { GallerySection } from '../components/GallerySection';

interface HomePageProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenPlanVisit: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onOpenPlanVisit,
}) => {
  return (
    <div className="bg-white">
      {/* 1. Hero Section ("A Church For Everyone") + Dark Service Info Bar */}
      <HeroSection
        onOpenPlanVisit={onOpenPlanVisit}
        onNavigateAbout={() => {
          onSelectTab('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTab={onSelectTab}
      />

      {/* 2. Welcome to GracePoint: 4 Feature Cards (Worship, Grow, Connect, Serve) */}
      <ThreePillarsSection
        onSelectAction={(pillarId) => {
          if (pillarId === 'worship') onSelectTab('videos');
          else if (pillarId === 'grow') onSelectTab('ebooks');
          else if (pillarId === 'connect') onSelectTab('connect');
          else if (pillarId === 'serve') {
            const el = document.getElementById('giving-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 3. Latest Sermon Section (Large Split Featured Sermon + 3 Past Sermons Grid) */}
      <FeaturedSermonSection 
        onOpenPlanVisit={onOpenPlanVisit} 
        onNavigateVideos={() => {
          onSelectTab('videos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Be Part of What God Is Doing (Giving Banner with Royal Blue Atmosphere) */}
      <ServeBanner
        onOpenPlanVisit={onOpenPlanVisit}
        onSelectTab={onSelectTab}
      />

      {/* 5. Ministries for Every Age & Season of Life */}
      <BenefitsSection />

      {/* 6. Curated E-Books & Devotionals Showcase */}
      <HomeEbooksPreview onSelectTab={onSelectTab} />

      {/* 7. Church Calendar & Upcoming Events */}
      <ChurchCalendarSection onOpenPlanVisit={onOpenPlanVisit} />

      {/* 8. Moments in Fellowship Photo Gallery */}
      <GallerySection />
    </div>
  );
};
