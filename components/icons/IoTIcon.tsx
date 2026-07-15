export default function IoTIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="6" x2="12" y2="6.01" />
      <path 
        d="M2 6c5 5 15 5 20 0M2 18c5-5 15-5 20 0" 
        stroke="currentColor" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="3"
      />
    </svg>
  )
} 