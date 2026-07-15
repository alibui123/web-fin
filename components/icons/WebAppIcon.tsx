export default function WebAppIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 400 300" 
      className={className} 
      fill="none"
    >
      {/* Browser Window Frame */}
      <path
        d="M50 40 L350 40 L350 260 L50 260 Z"
        stroke="#001B59"
        strokeWidth="2"
        fill="#F5F5F5"
      />

      {/* Browser Top Bar */}
      <path
        d="M50 40 L350 40 L350 80 L50 80 Z"
        fill="#001B59"
      />

      {/* Window Controls */}
      <g fill="#fff">
        <circle cx="70" cy="60" r="5" />
        <circle cx="90" cy="60" r="5" />
        <circle cx="110" cy="60" r="5" />
      </g>

      {/* Terminal Prompt */}
      <path
        d="M80 120 L120 140 L80 160"
        stroke="#001B59"
        strokeWidth="3"
        fill="none"
      />

      {/* Command Line */}
      <path
        d="M140 140 L240 140"
        stroke="#001B59"
        strokeWidth="3"
      />

      {/* Right Side Menu Lines */}
      <g
        stroke="#001B59"
        strokeWidth="2"
      >
        <path d="M270 110 L320 110" />
        <path d="M270 130 L320 130" />
        <path d="M270 150 L320 150" />
        <path d="M270 170 L320 170" />
      </g>

      {/* Gears */}
      <g>
        {/* Small Gear */}
        <path
          d="M100 200 L100 180 L110 175 L120 180 L120 200 L115 210 L105 210 Z"
          fill="#0066FF"
        />
        <circle cx="110" cy="195" r="4" fill="white" />

        {/* Large Gear */}
        <path
          d="M160 220 L160 190 L175 183 L190 190 L190 220 L183 235 L167 235 Z"
          fill="#0066FF"
        />
        <circle cx="175" cy="209" r="6" fill="white" />
      </g>
    </svg>
  )
} 