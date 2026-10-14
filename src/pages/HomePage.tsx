import React from 'react';
import { PageTab } from '../types';
import { HeroSection } from '../components/HeroSection';
import { ThreePillarsSection } from '../components/ThreePillarsSection';
import { WelcomeSection } from '../components/WelcomeSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { FeaturedSermonSection } from '../components/FeaturedSermonSection';
import { ChurchCalendarSection } from '../components/ChurchCalendarSection';
import { ServeBanner } from '../components/ServeBanner';
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
    <div className="bg-[#F5F2F0]">
      {/* 1. Finsweet Template 10 Hero Section with 3 bottom feature cards */}
      <HeroSection
        onOpenPlanVisit={onOpenPlanVisit}
        onNavigateAbout={() => {
          onSelectTab('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTab={onSelectTab}
      />

      {/* 2. Finsweet Template 10 section_beliefs: A Church Relevant For Today */}
      <ThreePillarsSection />

      {/* 3. Finsweet Template 10 section_home-about: Love and Compassion */}
      <WelcomeSection
        onOpenPlanVisit={onOpenPlanVisit}
        onNavigateAbout={() => {
          onSelectTab('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Finsweet Template 10 section_home-benefits: The Benefits of Joining Our Church */}
      <BenefitsSection />

      {/* 5. Finsweet Template 10 section_home-sermon-featured: Featured Sermon & Service */}
      <FeaturedSermonSection onOpenPlanVisit={onOpenPlanVisit} />

      {/* 6. Church Calendar & Upcoming Dates: Events, Bible Studies & Community Outreach Grid */}
      <ChurchCalendarSection onOpenPlanVisit={onOpenPlanVisit} />

      {/* 7. Finsweet Template 10 section_home-visit: We Want to Serve the World */}
      <ServeBanner
        onOpenPlanVisit={onOpenPlanVisit}
        onSelectTab={onSelectTab}
      />

      {/* 8. Finsweet Template 10 section_home-blog / gallery: Capturing the Spirit */}
      <GallerySection />

      {/* 8. Signature Scripture Anchor Banner */}
      <section className="bg-[#161722] text-white py-16 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-[11px] font-condensed font-bold uppercase tracking-[0.2em] text-[#FFD2A4]">
            SIGNATURE SCRIPTURE
          </div>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white leading-relaxed">
            "But seek first the kingdom of God and His righteousness, and all these things shall be added to you."
          </blockquote>
          <div className="text-xs font-condensed font-bold uppercase tracking-widest text-[#FFD2A4]">
            — MATTHEW 6:33
          </div>
        </div>
      </section>
    </div>
  );
};
