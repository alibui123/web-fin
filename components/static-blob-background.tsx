import React from "react"

export default function StaticBlobBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-50">
      {/* Static blobs using fixed divs instead of canvas */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]"
        style={{ top: '20%', left: '20%', transform: 'translate(-50%, -50%)' }}
      />
      <div 
        className="absolute w-[700px] h-[700px] rounded-full bg-teal-500/10 blur-[150px]"
        style={{ top: '70%', left: '80%', transform: 'translate(-50%, -50%)' }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
    </div>
  )
} 