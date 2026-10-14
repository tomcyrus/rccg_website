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

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [planVisitModalOpen, setPlanVisitModalOpen] = useState(false);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  // Sync document page title according to SEO guidelines from the document
  useEffect(() => {
    switch (currentTab) {
      case 'home':
        document.title = 'RCCG Kingdom First Assembly | Church in Roselle, NJ';
        break;
      case 'about':
        document.title = 'About RCCG Kingdom First Assembly | Roselle NJ';
        break;
      case 'gallery':
        document.title = 'Church Life & Gallery | RCCG Kingdom First Assembly';
        break;
      case 'connect':
        document.title = 'Visit RCCG Kingdom First Assembly | Roselle NJ';
        break;
      default:
        document.title = 'RCCG Kingdom First Assembly | Church in Roselle, NJ';
    }
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2922]">
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
