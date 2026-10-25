import React from 'react';
import rccgLogoImg from '../assets/images/rccg_official_logo_1791985600387.jpg';
import referenceHeaderBrand from '../assets/images/reference/reference_header_brand.jpg';

interface ChurchBrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ChurchBrandLogo: React.FC<ChurchBrandLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
}) => {
  const isDark = variant === 'dark';

  if (isDark) {
    const sizeClass = {
      sm: 'h-9 sm:h-10',
      md: 'h-10 xs:h-11 sm:h-12 lg:h-14',
      lg: 'h-12 sm:h-14',
    }[size];

    return (
      <img
        src={referenceHeaderBrand}
        alt="The Redeemed Christian Church of God — Kingdom First Assembly, Roselle, NJ"
        className={`${sizeClass} w-auto max-w-full object-contain object-left ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2 xs:gap-2.5 sm:gap-3 select-none min-w-0 max-w-full ${className}`}>
      {/* Official RCCG Logo Emblem */}
      <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-blue-600 via-blue-400 to-amber-400 shadow-xs shrink-0">
        <img
          src={rccgLogoImg}
          alt="The Redeemed Christian Church of God Emblem"
          className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full object-cover"
        />
      </div>

      {/* Typography: Restored Church Identity */}
      <div className="flex flex-col text-left leading-tight min-w-0 overflow-hidden">
        <div className={`text-[7px] xs:text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.06em] xs:tracking-[0.10em] sm:tracking-[0.14em] truncate ${
          isDark ? 'text-[#1D63ED]' : 'text-blue-300'
        }`}>
          The Redeemed Christian Church of God
        </div>
        <div className={`font-extrabold tracking-tight text-xs xs:text-sm sm:text-lg truncate ${
          isDark ? 'text-[#0F172A]' : 'text-white'
        }`}>
          Kingdom First Assembly
        </div>
        <div className={`text-[8px] xs:text-[9px] sm:text-[10px] font-medium hidden xs:flex items-center gap-1 truncate ${
          isDark ? 'text-slate-500' : 'text-slate-300'
        }`}>
          <span>Roselle, NJ</span>
          <span>&middot;</span>
          <span className="italic">Matthew 6:33</span>
        </div>
      </div>
    </div>
  );
};
