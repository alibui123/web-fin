"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 12, suffix: "+", label: "Global Clients", subtitle: "AND GROWING", color: "#3b82f6", gradientStart: "#3b82f6", gradientEnd: "#60a5fa", shadow: "rgba(59,130,246,0.5)", percentage: 15 },
  { value: 98, suffix: "%", label: "Accuracy Rate", subtitle: "VALIDATED", color: "#10b981", gradientStart: "#10b981", gradientEnd: "#34d399", shadow: "rgba(16,185,129,0.5)", percentage: 98 },
  { value: 45, suffix: "+", label: "Projects Delivered", subtitle: "SUCCESSFULLY", color: "#f97316", gradientStart: "#f97316", gradientEnd: "#fb923c", shadow: "rgba(249,115,22,0.5)", percentage: 80 },
  { value: 99.9, suffix: "%", label: "System Uptime", subtitle: "SLA", color: "#8b5cf6", gradientStart: "#8b5cf6", gradientEnd: "#a78bfa", shadow: "rgba(139,92,246,0.5)", percentage: 99.9 },
];

function CountUp({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }
    let start = 0;
    const duration = 2500;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, target]);

  // Handle floats for uptime (e.g. 99.9)
  const displayCount = target % 1 !== 0
    ? count.toFixed(1)
    : Math.floor(count);

  return (
    <span>
      {displayCount}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 relative bg-finova-midnight overflow-hidden font-sans"
    >
      {/* Background radial gradient for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-cyan/5 via-finova-midnight to-finova-midnight pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="font-mono text-xs md:text-sm mb-6 text-finova-cyan tracking-[0.2em] uppercase border border-finova-cyan/30 bg-finova-cyan/10 inline-block px-6 py-2 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            Metrics
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            System Impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const radius = 56;
            const circumference = 2 * Math.PI * radius;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center text-center group p-8 sm:p-10 rounded-[3rem] z-10 will-change-transform"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Outer Glow - removed blur-xl for performance */}
                <div
                  className="absolute -inset-1 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-[3.5rem] -z-20"
                  style={{ background: `linear-gradient(to right, ${stat.gradientStart}, ${stat.gradientEnd})` }}
                />

                {/* Solid Container - removed backdrop-blur-xl */}
                <div className="absolute inset-0 bg-white/[0.03] border border-white/10 group-hover:border-white/20 transition-all duration-700 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] -z-10 overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700" style={{ background: stat.color }} />
                </div>

                {/* Circular Progress Ring Container */}
                <div
                  className="relative w-40 h-40 md:w-48 md:h-48 mb-8 transition-all duration-700"
                  style={{ '--glow-color': stat.shadow } as any}
                >
                  {/* Subtle pulsing background glow inside the ring - reduced blur */}
                  <div className={`absolute inset-4 rounded-full blur-xl opacity-15 group-hover:opacity-30 transition-opacity duration-700`} style={{ backgroundColor: stat.color }}></div>

                  <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={stat.gradientStart} />
                        <stop offset="100%" stopColor={stat.gradientEnd} />
                      </linearGradient>
                    </defs>
                    {/* Background Track */}
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="6"
                      fill="none"
                    />
                    {/* Animated Foreground Track */}
                    <motion.circle
                       cx="60"
                       cy="60"
                       r={radius}
                       stroke={`url(#gradient-${index})`}
                       strokeWidth="6"
                       fill="none"
                       strokeLinecap="round"
                       strokeDasharray={circumference}
                       initial={{ strokeDashoffset: circumference }}
                       animate={isInView ? { strokeDashoffset: circumference - (circumference * stat.percentage / 100) } : { strokeDashoffset: circumference }}
                       transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
                    />
                  </svg>

                  {/* Centered Value */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-white font-black text-4xl md:text-5xl tracking-tighter drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                        <CountUp target={stat.value} suffix={stat.suffix} isInView={isInView} />
                     </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-white/95 font-semibold text-xl md:text-2xl tracking-tight relative z-10 transition-colors duration-500">
                    {stat.label}
                  </h3>
                  <p className="text-white/40 text-xs md:text-sm font-bold tracking-[0.25em] uppercase group-hover:text-white/70 transition-colors duration-500 relative z-10">
                    {stat.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
