import React from 'react';
import referenceHeroImg from '../assets/images/reference/reference_hero_worship.jpg';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  children,
}) => (
  <section className="relative isolate overflow-hidden border-b-4 border-[#e3aa1b] bg-[#004d3b] text-white">
    <img
      src={referenceHeroImg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-center opacity-35 lg:object-[72%_45%]"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,61,47,1)_0%,rgba(0,75,56,.96)_43%,rgba(0,75,56,.62)_72%,rgba(0,48,37,.4)_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(237,184,36,.18),transparent_28%)]" />

    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#f4c54b] sm:text-sm">
          {eyebrow}
        </p>
        <div className="mt-3 h-1 w-14 rounded-full bg-[#e3aa1b]" />
        <h1 className="mt-5 max-w-3xl [font-family:Georgia,serif] text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-lg">
          {description}
        </p>
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  </section>
);
