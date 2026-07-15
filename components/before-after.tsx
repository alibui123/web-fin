"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, TrendingUp } from "lucide-react";

const beforePoints = [
  "Inquiries go unanswered after hours and the lead books elsewhere.",
  "Follow-up depends on whoever has time.",
  "Your team spends its day on repetitive calls and data entry.",
];

const afterPoints = [
  "Every caller is answered, qualified, and booked, around the clock.",
  "Follow-up and reactivation happen on their own.",
  "Your team works on what needs a human, the agent clears the rest.",
];

export default function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-magenta/5 via-finova-midnight to-finova-midnight pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="font-mono text-xs md:text-sm mb-6 text-finova-magenta tracking-[0.2em] uppercase border border-finova-magenta/30 bg-finova-magenta/10 inline-block px-6 py-2 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.15)]">
            Before and after
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            The difference is what stops slipping through
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-40 pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-xs font-mono font-bold tracking-[0.25em] uppercase text-white/40 mb-8">
                Before Finova
              </span>
              <ul className="space-y-6">
                {beforePoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <span className="mt-0.5 flex shrink-0 items-center justify-center w-7 h-7 rounded-full border border-red-500/30 bg-red-500/10 text-red-400">
                      <X className="w-4 h-4" />
                    </span>
                    <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-finova-cyan/30 bg-finova-cyan/[0.04] p-8 md:p-10 overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.1)]"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-finova-cyan/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-xs font-mono font-bold tracking-[0.25em] uppercase text-finova-cyan mb-8">
                Run by Finova
              </span>
              <ul className="space-y-6">
                {afterPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <span className="mt-0.5 flex shrink-0 items-center justify-center w-7 h-7 rounded-full border border-finova-cyan/40 bg-finova-cyan/10 text-finova-cyan">
                      <Check className="w-4 h-4" />
                    </span>
                    <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Proof callout — the one measured number on the page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 md:px-8 md:py-6">
            <span className="flex shrink-0 items-center justify-center w-11 h-11 rounded-xl bg-finova-cyan/10 border border-finova-cyan/20 text-finova-cyan">
              <TrendingUp className="w-5 h-5" />
            </span>
            <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
              For AdvanzaTech, the outbound agent booked{" "}
              <span className="font-bold text-white">70 meetings</span> in its second month.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
