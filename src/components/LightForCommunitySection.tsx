import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageTab } from '../types';
import roselleImg from '../assets/images/reference/reference_roselle.jpg';

interface LightForCommunitySectionProps {
  onSelectTab: (tab: PageTab) => void;
}

export const LightForCommunitySection: React.FC<LightForCommunitySectionProps> = ({ onSelectTab }) => {
  return (
    <section className="border-b border-[#dbe8e7] bg-[linear-gradient(105deg,#dff4f7_0%,#f8fbf7_62%,#fff8db_100%)]">
      <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
        <div className="min-h-[260px] overflow-hidden lg:min-h-[330px]">
          <img
            src={roselleImg}
            alt="Roselle, New Jersey community"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="max-w-xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#d39b16]">
              A Light for Our Community
            </p>
            <h2 className="mt-1 [font-family:Georgia,serif] text-3xl font-black leading-tight text-[#102441] sm:text-4xl">
              Making a Difference Together
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#394758] sm:text-base">
              Inspired by Matthew 5:14–16, we believe God has called us to shine the light of Christ in Roselle and the surrounding communities. We are a growing family, serving, loving, and sharing the hope of Jesus with all.
            </p>
            <button
              onClick={() => {
                onSelectTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#007450] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#005c40]"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
