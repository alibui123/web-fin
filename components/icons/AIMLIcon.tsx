import React from 'react';

interface AIMLIconProps {
  className?: string;
}

const AIMLIcon: React.FC<AIMLIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle
        cx="512"
        cy="512"
        r="450"
        fill="currentColor"
        fillOpacity="0.05"
      />

      {/* Neural Network Nodes */}
      <g>
        {/* Central nodes */}
        <circle cx="512" cy="512" r="35" fill="currentColor" />
        <circle cx="512" cy="362" r="25" fill="currentColor" />
        <circle cx="512" cy="662" r="25" fill="currentColor" />
        <circle cx="362" cy="512" r="25" fill="currentColor" />
        <circle cx="662" cy="512" r="25" fill="currentColor" />
        
        {/* Outer layer nodes */}
        <circle cx="400" cy="300" r="20" fill="currentColor" />
        <circle cx="624" cy="300" r="20" fill="currentColor" />
        <circle cx="400" cy="724" r="20" fill="currentColor" />
        <circle cx="624" cy="724" r="20" fill="currentColor" />
        <circle cx="300" cy="400" r="20" fill="currentColor" />
        <circle cx="300" cy="624" r="20" fill="currentColor" />
        <circle cx="724" cy="400" r="20" fill="currentColor" />
        <circle cx="724" cy="624" r="20" fill="currentColor" />
        
        {/* Distant nodes */}
        <circle cx="250" cy="250" r="15" fill="currentColor" />
        <circle cx="774" cy="250" r="15" fill="currentColor" />
        <circle cx="250" cy="774" r="15" fill="currentColor" />
        <circle cx="774" cy="774" r="15" fill="currentColor" />
      </g>

      {/* Connections */}
      <g stroke="currentColor" strokeWidth="2" strokeOpacity="0.6">
        {/* Center to inner layer */}
        <path d="M512 477 L512 397" />
        <path d="M512 547 L512 627" />
        <path d="M477 512 L397 512" />
        <path d="M547 512 L627 512" />
        
        {/* Inner layer to outer layer */}
        <path d="M487 377 L420 320" />
        <path d="M537 377 L604 320" />
        <path d="M487 647 L420 704" />
        <path d="M537 647 L604 704" />
        <path d="M377 487 L320 420" />
        <path d="M377 537 L320 604" />
        <path d="M647 487 L704 420" />
        <path d="M647 537 L704 604" />
        
        {/* Outer layer to distant nodes */}
        <path d="M385 315 L265 265" />
        <path d="M639 315 L759 265" />
        <path d="M385 709 L265 759" />
        <path d="M639 709 L759 759" />
        <path d="M315 385 L265 265" />
        <path d="M315 639 L265 759" />
        <path d="M709 385 L759 265" />
        <path d="M709 639 L759 759" />
        
        {/* Cross connections */}
        <path d="M400 300 L624 300" strokeDasharray="5,5" />
        <path d="M400 724 L624 724" strokeDasharray="5,5" />
        <path d="M300 400 L300 624" strokeDasharray="5,5" />
        <path d="M724 400 L724 624" strokeDasharray="5,5" />
      </g>
    </svg>
  );
};

export default AIMLIcon;
