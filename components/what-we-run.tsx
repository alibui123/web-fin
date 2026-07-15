"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Workflow, Sparkles, PhoneIncoming, ShieldCheck, ArrowRight } from "lucide-react"
const jobs = [
  {
    icon: Workflow,
    title: "Automate the workflow",
    body: "Verification, scheduling, routing, follow-up, and back-office actions run as one governed flow inside the systems you already use, including full ERP and Odoo automation. You get completed cases, not partial handoffs.",
    href: "/solutions/workflow-automation",
    anchor: "Workflow automation",
    color: "from-finova-purple to-finova-magenta",
    glow: "rgba(147,51,234,0.15)",
  },
  {
    icon: Sparkles,
    title: "Build custom AI for the harder problems",
    body: "When the work does not fit an off-the-shelf tool, we build for it, document intelligence, computer vision, and bespoke agents designed around your process. One accountable team designs it, builds it, and runs it, so the capability compounds instead of scattering across vendors.",
    href: "/solutions/custom-ai-development",
    anchor: "Custom AI development",
    color: "from-finova-lightBlue to-finova-cyan",
    glow: "rgba(43,142,190,0.15)",
  },
  {
    icon: PhoneIncoming,
    title: "Capture and convert every inbound",
    body: "We answer, qualify, and book across voice, chat, and messaging, around the clock, in the language your customers actually use, so no lead slips through after hours and no inquiry waits for a callback that never comes.",
    href: "/solutions/ai-receptionist",
    anchor: "AI receptionists",
    color: "from-finova-cyan to-finova-blue",
    glow: "rgba(14,165,233,0.15)",
  },
  {
    icon: ShieldCheck,
    title: "Govern quality on all of it",
    body: "QualiCore, our QA engine, scores every single interaction against the standards that matter, shows the reason behind every score in plain language a manager can read, and surfaces what needs attention, so quality holds and drift is caught early instead of after a client complains.",
    href: "/solutions/ai-quality-assurance",
    anchor: "QualiCore QA",
    color: "from-finova-magenta to-finova-purple",
    glow: "rgba(217,70,239,0.15)",
  },
]

export default function WhatWeRun() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-finova-cyan/10 blur-3xl opacity-30 pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="font-mono text-xs md:text-sm mb-6 text-finova-cyan tracking-[0.2em] uppercase border border-finova-cyan/30 bg-finova-cyan/10 inline-block px-6 py-2 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            What we run for you
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Four jobs. One accountable team.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {jobs.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={job.href}
                className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-white/20"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at 50% 0%, ${job.glow}, transparent 70%)`,
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 self-start transition-all duration-300 group-hover:scale-105">
                    <job.icon className="w-7 h-7 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <h3
                    className={`text-xl md:text-2xl font-black tracking-tight mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${job.color} transition-all duration-300`}
                  >
                    {job.title}
                  </h3>
                  <p className="text-white/60 text-base font-light leading-relaxed flex-grow group-hover:text-white/80 transition-colors">
                    {job.body}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-white/50 group-hover:text-white transition-colors">
                    {job.anchor}
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
