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

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') return 'admin';
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as PageTab;
      if (tabParam && ['home', 'about', 'videos', 'ebooks', 'gallery', 'connect', 'admin'].includes(tabParam)) {
        return tabParam;
      }
    }
    return 'home';
  });
  const [planVisitModalOpen, setPlanVisitModalOpen] = useState(false);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  // Listen to hash changes for direct #admin access
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setCurrentTab('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync document page title, meta description, canonical link, open graph, and breadcrumbs
  useEffect(() => {
    updatePageSeo(currentTab);
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenPlanVisit={() => setPlanVisitModalOpen(true)}
        onOpenPrayerModal={() => setPrayerModalOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={setCurrentTab}
            onOpenPlanVisit={() => setPlanVisitModalOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onSelectTab={setCurrentTab}
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
            onNavigateHome={() => setCurrentTab('home')}
            onSelectTab={setCurrentTab}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={setCurrentTab}
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
