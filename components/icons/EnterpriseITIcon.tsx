export default function EnterpriseITIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* Cloud Infrastructure */}
      <path
        d="M6 8.2C6 6.4 7.4 5 9.2 5c1.5 0 2.8 1 3.2 2.4C12.7 7.2 13 7 13.4 7c1.4 0 2.6 1.2 2.6 2.6 0 1.4-1.2 2.6-2.6 2.6H7.6C6.7 12.2 6 11.5 6 10.6V8.2z"
      />

      {/* Network Infrastructure */}
      <g>
        {/* Data Center */}
        <rect x="4" y="14" width="7" height="5" rx="1" />
        <path d="M5 16h5M5 17.5h5" />
        
        {/* Servers */}
        <rect x="13" y="14" width="7" height="5" rx="1" />
        <path d="M14 16h5M14 17.5h5" />
      </g>

      {/* Connection Lines */}
      <g>
        <path strokeDasharray="2 2" d="M7.5 14V12.2" />
        <path strokeDasharray="2 2" d="M16.5 14V12.2" />
      </g>

      {/* Active Data Flow */}
      <g>
        <circle cx="7.5" cy="16" r="0.3" fill="currentColor" />
        <circle cx="7.5" cy="17.5" r="0.3" fill="currentColor" />
        <circle cx="16.5" cy="16" r="0.3" fill="currentColor" />
        <circle cx="16.5" cy="17.5" r="0.3" fill="currentColor" />
      </g>

      {/* Cloud Pulse */}
      <path
        d="M9 7.5c2 0 3 1 4 2"
        strokeOpacity="0.4"
        strokeDasharray="1 2"
      />
    </svg>
  )
} 