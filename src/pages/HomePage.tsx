import React from 'react';
import { PageTab } from '../types';
import { HeroSection } from '../components/HeroSection';
import { ThreePillarsSection } from '../components/ThreePillarsSection';
import { WelcomeSection } from '../components/WelcomeSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { FeaturedSermonSection } from '../components/FeaturedSermonSection';
import { ChurchCalendarSection } from '../components/ChurchCalendarSection';
import { ServeBanner } from '../components/ServeBanner';
import { HomeEbooksPreview } from '../components/HomeEbooksPreview';
import { GallerySection } from '../components/GallerySection';
import { Sparkles, Heart } from 'lucide-react';

interface HomePageProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenPlanVisit: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onOpenPlanVisit,
}) => {
  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Sanctuary Hero Section with Matthew 6:33 anchor & service times */}
      <HeroSection
        onOpenPlanVisit={onOpenPlanVisit}
        onNavigateAbout={() => {
          onSelectTab('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTab={onSelectTab}
      />

      {/* 2. Kingdom Foundations: The 4 Spiritual Pillars */}
      <ThreePillarsSection />

      {/* 3. Welcome to the Family: Pastoral Welcome & Life in the House */}
      <WelcomeSection
        onOpenPlanVisit={onOpenPlanVisit}
        onNavigateAbout={() => {
          onSelectTab('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Ministries for Every Age & Season of Life */}
      <BenefitsSection />

      {/* 5. Word & Worship Media Center (Featured Sermon & Audio/Video) */}
      <FeaturedSermonSection 
        onOpenPlanVisit={onOpenPlanVisit} 
        onNavigateVideos={() => {
          onSelectTab('videos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 6. Anointed E-Books & Devotionals Showcase */}
      <HomeEbooksPreview onSelectTab={onSelectTab} />

      {/* 7. Church Calendar & Upcoming Dates (Events, Bible Studies, Outreach) */}
      <ChurchCalendarSection onOpenPlanVisit={onOpenPlanVisit} />

      {/* 8. Kingdom Giving, Generosity & Community Light */}
      <ServeBanner
        onOpenPlanVisit={onOpenPlanVisit}
        onSelectTab={onSelectTab}
      />

      {/* 9. Photo Gallery: Moments in the Father's House */}
      <GallerySection />

      {/* 9. Signature Anchor Scripture Banner */}
      <section className="bg-gradient-to-r from-[#071324] via-[#0A192F] to-[#071324] text-white py-16 sm:py-20 px-4 sm:px-8 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Founding Mandate</span>
          </div>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white leading-relaxed">
            "But seek first the kingdom of God and His righteousness, and all these things shall be added to you."
          </blockquote>
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-400">
            — Matthew 6:33
          </div>
        </div>
      </section>
    </div>
  );
};
