import React from 'react';

interface RccgLogoProps {
  className?: string;
  size?: number;
}

export const RccgLogo: React.FC<RccgLogoProps> = ({ className = 'w-10 h-10', size = 120 }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Redeemed Christian Church of God Official Logo"
    >
      <defs>
        {/* Curved Path for Upper Text: "THE REDEEMED CHRISTIAN" */}
        <path
          id="rccg-top-curve"
          d="M 28 100 A 72 72 0 1 1 172 100"
          fill="none"
        />
        {/* Curved Path for Lower Text: "CHURCH OF GOD" */}
        <path
          id="rccg-bottom-curve"
          d="M 172 100 A 72 72 0 0 1 28 100"
          fill="none"
        />
      </defs>

      {/* White Base Circle */}
      <circle cx="100" cy="100" r="98" fill="#FFFFFF" />

      {/* Outer Red Ring */}
      <circle cx="100" cy="100" r="96" stroke="#C4161C" strokeWidth="4" />
      <circle cx="100" cy="100" r="91" stroke="#C4161C" strokeWidth="1.5" />

      {/* Inner Red Ring */}
      <circle cx="100" cy="100" r="59" stroke="#C4161C" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="56" stroke="#C4161C" strokeWidth="3" />

      {/* Top Arc Text: THE REDEEMED CHRISTIAN */}
      <text
        fill="#00833E"
        fontSize="17.5"
        fontWeight="800"
        fontFamily="'Roboto Condensed', -apple-system, sans-serif"
        letterSpacing="0.08em"
      >
        <textPath href="#rccg-top-curve" startOffset="50%" textAnchor="middle">
          THE REDEEMED CHRISTIAN
        </textPath>
      </text>

      {/* Bottom Arc Text: CHURCH OF GOD */}
      <text
        fill="#00833E"
        fontSize="18"
        fontWeight="800"
        fontFamily="'Roboto Condensed', -apple-system, sans-serif"
        letterSpacing="0.1em"
      >
        <textPath href="#rccg-bottom-curve" startOffset="50%" textAnchor="middle">
          CHURCH OF GOD
        </textPath>
      </text>

      {/* Left and Right Green Floral Stars */}
      <g fill="#00833E">
        {/* Left Star */}
        <path d="M 25 100 C 23 97 20 98 21 100 C 20 102 23 103 25 100 Z" />
        <circle cx="23" cy="95.5" r="2.2" />
        <circle cx="23" cy="104.5" r="2.2" />
        <circle cx="18.5" cy="100" r="2.2" />
        <circle cx="27.5" cy="100" r="2.2" />

        {/* Right Star */}
        <circle cx="177" cy="95.5" r="2.2" />
        <circle cx="177" cy="104.5" r="2.2" />
        <circle cx="172.5" cy="100" r="2.2" />
        <circle cx="181.5" cy="100" r="2.2" />
      </g>

      {/* Center Royal Blue Circle */}
      <circle cx="100" cy="100" r="55" fill="#15195D" />

      {/* White Holy Spirit Dove with Spread Wings and Fan Tail */}
      <g fill="#FFFFFF">
        {/* Dove Fan Tail (Top) */}
        <path d="M 91 76 C 90 70 85 68 83 67 C 88 66 93 68 96 66 C 98 64 102 64 104 66 C 107 68 112 66 117 67 C 115 68 110 70 109 76 Z" />
        
        {/* Main Dove Wings & Body */}
        <path d="M 100 125 C 98 120 96 114 91 108 C 82 108 72 105 63 98 C 69 101 77 101 82 97 C 72 95 62 89 53 82 C 61 86 70 86 76 82 C 67 79 58 72 50 64 C 62 70 73 71 82 71 C 88 71 94 74 100 79 C 106 74 112 71 118 71 C 127 71 138 70 150 64 C 142 72 133 79 124 82 C 130 86 139 86 147 82 C 138 89 128 95 118 97 C 123 101 131 101 137 98 C 128 105 118 108 109 108 C 104 114 102 120 100 125 Z" />
        
        {/* Dove Head with Beak Pointing Down */}
        <path d="M 97 114 C 97 122 100 127 100 127 C 100 127 103 122 103 114 Z" />
      </g>
    </svg>
  );
};
