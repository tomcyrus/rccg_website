import React from 'react';
import { Facebook, Globe2, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { PageTab } from '../types';
import { ChurchBrandLogo } from './ChurchBrandLogo';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenPlanVisit: () => void;
  onOpenPrayerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="relative overflow-hidden border-t-4 border-[#efb21c] bg-[#006446] text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#006446] via-[#006b4c] to-[#004c38]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid items-center gap-6 md:grid-cols-12 md:divide-x md:divide-white/30">
          <div className="md:col-span-4 md:pr-6">
            <ChurchBrandLogo variant="light" size="lg" />
          </div>

          <div className="flex items-start gap-3 md:col-span-3 md:px-6">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 fill-white text-white" />
            <div className="text-xs leading-relaxed text-emerald-50">
              <strong className="block text-white">Sphinx Banquet Center</strong>
              121 E 2nd Ave, Roselle, NJ 07203
              <span className="block text-[10px] text-emerald-100/80">Temporary Worship Location</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-emerald-50 md:col-span-3 md:px-6">
            <a href="tel:8622055958" className="flex items-center gap-2 hover:text-[#efb21c]">
              <Phone className="h-4 w-4 fill-white" />
              (862) 205-5958
            </a>
            <a href="mailto:rccgkfa@gmail.com" className="flex items-center gap-2 hover:text-[#efb21c]">
              <Mail className="h-4 w-4 fill-white" />
              rccgkfa@gmail.com
            </a>
            <a href="https://www.rccgkfa.org" className="flex items-center gap-2 hover:text-[#efb21c]">
              <Globe2 className="h-4 w-4" />
              www.rccgkfa.org
            </a>
          </div>

          <div className="flex items-center gap-3 md:col-span-2 md:justify-end md:pl-6">
            <a
              href="https://www.youtube.com/@RCCGKFA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#006446] transition hover:bg-[#efb21c]"
            >
              <Youtube className="h-5 w-5 fill-current" />
            </a>
            <span aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#006446]">
              <Facebook className="h-5 w-5 fill-current" />
            </span>
            <span aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#006446]">
              <Instagram className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="mt-7 border-t border-white/25 pt-4 text-center text-[10px] text-emerald-100/80">
          <span
            onClick={() => {
              onSelectTab('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-default select-none"
            title="RCCG KFA"
          >
            ©
          </span>{' '}
          {new Date().getFullYear()} RCCG Kingdom First Assembly. All Rights Reserved.
          <span className="mx-3">|</span>
          Putting God&apos;s Kingdom First. Becoming Like Christ Everywhere.
        </div>
      </div>
    </footer>
  );
};
