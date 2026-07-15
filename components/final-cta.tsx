"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Gauge } from "lucide-react"
import { CALENDLY_URL } from "@/lib/site"

export default function FinalCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden" ref={ref}>
      <div
        className="absolute top-0 left-0 w-[700px] h-[500px] bg-finova-cyan/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[500px] bg-finova-magenta/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-2xl bg-finova-cyan/10 border border-finova-cyan/20 text-finova-cyan">
            <Gauge className="w-6 h-6" />
          </div>
          <p className="flex-1 text-white/70 text-base md:text-lg font-light leading-relaxed">
            Not ready for a call? Run the two-minute readiness check and see what an agent would
            return for your operation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/tools/ai-readiness-assessment"
              className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full border border-white/20 bg-white/[0.03] text-white font-bold tracking-[0.12em] uppercase text-xs transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10"
            >
              Start the readiness check
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/solutions/ai-consulting"
              className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full border border-white/10 bg-transparent text-white/70 font-bold tracking-[0.12em] uppercase text-xs transition-all duration-300 hover:border-finova-cyan/40 hover:text-white"
            >
              Book a consulting call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] mb-6">
            Tell us the work you want off your plate
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10">
            Book a call and we map where you are losing time and money. No pitch, just an honest read
            on what an agent should run first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:bg-finova-cyan hover:text-white"
            >
              Book a call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#demo"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/20 bg-white/[0.03] text-white font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10"
            >
              <Play className="w-4 h-4 text-finova-cyan fill-finova-cyan/30" />
              See an agent work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
