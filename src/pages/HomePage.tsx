import React from 'react';
import { PageTab } from '../types';
import { HeroSection } from '../components/HeroSection';
import { ThreePillarsSection } from '../components/ThreePillarsSection';
import { FeaturedSermonSection } from '../components/FeaturedSermonSection';
import { LightForCommunitySection } from '../components/LightForCommunitySection';

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
      <HeroSection
        onOpenPlanVisit={onOpenPlanVisit}
        onNavigateAbout={() => {
          onSelectTab('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTab={onSelectTab}
      />

      <ThreePillarsSection
        onSelectAction={(pillarId) => {
          if (pillarId === 'worship') onSelectTab('videos');
          else if (pillarId === 'grow') onSelectTab('ebooks');
          else onSelectTab('connect');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <FeaturedSermonSection
        onOpenPlanVisit={onOpenPlanVisit}
        onNavigateVideos={() => {
          onSelectTab('videos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <LightForCommunitySection onSelectTab={onSelectTab} />
    </div>
  );
};
