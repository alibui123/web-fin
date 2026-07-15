"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Eye, UserCheck, AlertTriangle, ArrowRight } from "lucide-react";

const signals = [
  { icon: Eye, label: "Scored on every conversation" },
  { icon: UserCheck, label: "A person approves the calls that need judgment" },
  { icon: AlertTriangle, label: "Escalates anything it does not know" },
];

export default function AccountabilityQA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-finova-magenta/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: "translateZ(0)" }} />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono text-xs md:text-sm mb-6 text-finova-magenta tracking-[0.2em] uppercase border border-finova-magenta/30 bg-finova-magenta/10 inline-block px-6 py-2 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.15)]">
              Accountability and QA
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-8">
              Every interaction scored. Every change signed off.
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-xl">
              Every agent is governed by QualiCall, our quality engine. It scores every
              conversation against the standards that matter, with explainable reasoning,
              and a person approves the calls where judgment belongs. Agents answer only
              from your verified information and escalate anything they do not know.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/solutions/ai-quality-assurance"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] text-white font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:border-finova-magenta/50 hover:bg-finova-magenta/10"
              >
                See how QualiCall works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/trust"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-transparent text-white/70 font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                Trust and compliance
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-finova-magenta/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-finova-magenta/10 border border-finova-magenta/20 text-finova-magenta mb-8 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <ul className="space-y-5">
                {signals.map((signal) => (
                  <li key={signal.label} className="flex items-center gap-4">
                    <span className="flex shrink-0 items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 text-finova-cyan">
                      <signal.icon className="w-5 h-5" />
                    </span>
                    <span className="text-white/80 text-base md:text-lg font-light">
                      {signal.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
