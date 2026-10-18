/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { GetConnectedPage } from './pages/GetConnectedPage';
import { PlanVisitModal } from './components/PlanVisitModal';
import { PrayerRequestModal } from './components/PrayerRequestModal';
import { GallerySection } from './components/GallerySection';
import { VideoGallerySection } from './components/VideoGallerySection';
import { EbooksSection } from './components/EbooksSection';
import { AdminPage } from './pages/AdminPage';
import { updatePageSeo } from './utils/seo';
import { PAGE_PATHS, pageTabFromLocation } from './utils/routes';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>(() =>
    typeof window === 'undefined' ? 'home' : pageTabFromLocation(window.location)
  );
  const [planVisitModalOpen, setPlanVisitModalOpen] = useState(false);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  const navigateTo = (tab: PageTab) => {
    const path = PAGE_PATHS[tab];
    if (window.location.pathname !== path || window.location.hash || window.location.search) {
      window.history.pushState(null, '', path);
    }
    setCurrentTab(tab);
  };

  // Keep the rendered page in sync with browser back and forward navigation.
  useEffect(() => {
    const handlePopState = () => setCurrentTab(pageTabFromLocation(window.location));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document page title, meta description, canonical link, open graph, and breadcrumbs
  useEffect(() => {
    updatePageSeo(currentTab);
    const canonicalPath = PAGE_PATHS[currentTab];
    if (window.location.pathname !== canonicalPath || window.location.hash || window.location.search) {
      window.history.replaceState(null, '', canonicalPath);
    }
    setPlanVisitModalOpen(false); setPrayerModalOpen(false);
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={navigateTo}
        onOpenPlanVisit={() => setPlanVisitModalOpen(true)}
        onOpenPrayerModal={() => setPrayerModalOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={navigateTo}
            onOpenPlanVisit={() => setPlanVisitModalOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onSelectTab={navigateTo}
            onOpenPlanVisit={() => setPlanVisitModalOpen(true)}
          />
        )}

        {currentTab === 'videos' && (
          <div className="pt-2">
            <VideoGallerySection />
          </div>
        )}

        {currentTab === 'ebooks' && (
          <div className="pt-2">
            <EbooksSection onOpenPlanVisit={() => setPlanVisitModalOpen(true)} />
          </div>
        )}

        {currentTab === 'gallery' && (
          <div className="pt-2">
            <GallerySection />
          </div>
        )}

        {currentTab === 'connect' && (
          <GetConnectedPage
            onOpenPlanVisit={() => setPlanVisitModalOpen(true)}
            onOpenPrayerModal={() => setPrayerModalOpen(true)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPage
            onNavigateHome={() => navigateTo('home')}
            onSelectTab={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={navigateTo}
        onOpenPlanVisit={() => setPlanVisitModalOpen(true)}
        onOpenPrayerModal={() => setPrayerModalOpen(true)}
      />

      {/* Interactive Modals */}
      <PlanVisitModal
        isOpen={planVisitModalOpen}
        onClose={() => setPlanVisitModalOpen(false)}
      />

      <PrayerRequestModal
        isOpen={prayerModalOpen}
        onClose={() => setPrayerModalOpen(false)}
      />
    </div>
  );
}
