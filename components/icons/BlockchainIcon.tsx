import React from 'react';

const BlockchainIcon = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g stroke="#0066FF">
        {/* Center cube */}
        <g>
          {/* Top face */}
          <path d="M120 100 L160 120 L120 140 L80 120 Z" fill="#0066FF" fillOpacity="0.2" />
          {/* Right face */}
          <path d="M160 120 L160 140 L120 160 L120 140 Z" fill="#0066FF" fillOpacity="0.15" />
          {/* Left face */}
          <path d="M80 120 L80 140 L120 160 L120 140 Z" fill="#0066FF" fillOpacity="0.1" />
        </g>

        {/* Top node cube */}
        <g>
          <path d="M110 50 L130 50 L130 70 L110 70 Z" fill="#0066FF" />
          <path d="M130 50 L140 55 L140 75 L130 70 Z" fill="#0066FF" fillOpacity="0.8" />
          <path d="M110 70 L130 70 L140 75 L120 75 Z" fill="#0066FF" fillOpacity="0.6" />
        </g>

        {/* Bottom node cube */}
        <g>
          <path d="M110 170 L130 170 L130 190 L110 190 Z" fill="#0066FF" />
          <path d="M130 170 L140 175 L140 195 L130 190 Z" fill="#0066FF" fillOpacity="0.8" />
          <path d="M110 190 L130 190 L140 195 L120 195 Z" fill="#0066FF" fillOpacity="0.6" />
        </g>

        {/* Left node cube */}
        <g>
          <path d="M30 110 L50 110 L50 130 L30 130 Z" fill="#0066FF" />
          <path d="M50 110 L60 115 L60 135 L50 130 Z" fill="#0066FF" fillOpacity="0.8" />
          <path d="M30 130 L50 130 L60 135 L40 135 Z" fill="#0066FF" fillOpacity="0.6" />
        </g>

        {/* Right node cube */}
        <g>
          <path d="M190 110 L210 110 L210 130 L190 130 Z" fill="#0066FF" />
          <path d="M210 110 L220 115 L220 135 L210 130 Z" fill="#0066FF" fillOpacity="0.8" />
          <path d="M190 130 L210 130 L220 135 L200 135 Z" fill="#0066FF" fillOpacity="0.6" />
        </g>

        {/* Center nodes */}
        <g>
          {/* Top center */}
          <path d="M110 90 L130 90 L130 110 L110 110 Z" fill="#0066FF" />
          <path d="M130 90 L140 95 L140 115 L130 110 Z" fill="#0066FF" fillOpacity="0.8" />
          <path d="M110 110 L130 110 L140 115 L120 115 Z" fill="#0066FF" fillOpacity="0.6" />

          {/* Bottom center */}
          <path d="M110 130 L130 130 L130 150 L110 150 Z" fill="#0066FF" />
          <path d="M130 130 L140 135 L140 155 L130 150 Z" fill="#0066FF" fillOpacity="0.8" />
          <path d="M110 150 L130 150 L140 155 L120 155 Z" fill="#0066FF" fillOpacity="0.6" />

          {/* Left center */}
          <path d="M70 110 L90 110 L90 130 L70 130 Z" fill="#0066FF" />
          <path d="M90 110 L100 115 L100 135 L90 130 Z" fill="#0066FF" fillOpacity="0.8" />
          <path d="M70 130 L90 130 L100 135 L80 135 Z" fill="#0066FF" fillOpacity="0.6" />

          {/* Right center */}
          <path d="M150 110 L170 110 L170 130 L150 130 Z" fill="#0066FF" />
          <path d="M170 110 L180 115 L180 135 L170 130 Z" fill="#0066FF" fillOpacity="0.8" />
          <path d="M150 130 L170 130 L180 135 L160 135 Z" fill="#0066FF" fillOpacity="0.6" />
        </g>

        {/* Connecting lines */}
        <g strokeWidth="2">
          <line x1="120" y1="70" x2="120" y2="90" />
          <line x1="120" y1="150" x2="120" y2="170" />
          <line x1="50" y1="120" x2="70" y2="120" />
          <line x1="170" y1="120" x2="190" y2="120" />
        </g>
      </g>
    </svg>
  );
};

export default BlockchainIcon; 