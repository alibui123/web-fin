"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import dynamic from "next/dynamic"
import { CALENDLY_URL } from "@/lib/site"

const TechCore3D = dynamic(() => import("@/components/tech-core-3d"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
})

function BookCallButton() {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex w-full sm:w-auto"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-full bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-magenta opacity-70 blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-finova-cyan/35 to-finova-magenta/35 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
      />

      <span className="relative inline-flex h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-8 text-sm font-bold uppercase tracking-[0.15em] text-black transition-colors duration-300 group-hover:bg-[#0b1228] group-hover:text-white sm:w-auto">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative">Book a call</span>
        <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-finova-midnight">
      <TechCore3D />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-finova-magenta/20 rounded-full blur-3xl opacity-30 pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-finova-cyan/20 rounded-full blur-3xl opacity-30 pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="container relative z-20 mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mt-8 inline-block px-6 py-2 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
          >
            <p className="text-xs sm:text-sm font-mono text-finova-cyan uppercase tracking-[0.2em]">
              Finova Solutions
            </p>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white mb-8 max-w-4xl"
          >
            Your best people were not hired to do what a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
              machine can do
            </span>
            .
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="space-y-5 text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl"
          >
            <p>
              Every day, skilled people on your team spend hours on work a machine should handle.
              Answering the same calls. Keying the same records. Chasing the same follow-ups. That
              time is not free, it is the most expensive time you have, and it is leaking out of your
              business one repetitive task at a time.
            </p>
            <p>
              Finova builds AI agents that take that work off their plate and runs those agents
              inside the tools you already use, so the repetitive load clears itself and your team
              gets back to the work that actually needs a person. You keep the outcome. We answer for
              the number.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center gap-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <BookCallButton />

              <a
                href="#demo"
                className="group inline-flex h-[52px] items-center justify-center gap-3 px-8 rounded-full border border-white/20 bg-white/[0.03] text-white font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10 backdrop-blur-sm"
              >
                <Play className="w-4 h-4 text-finova-cyan fill-finova-cyan/30" />
                See an agent work
              </a>
            </div>
            <p className="max-w-sm text-center text-xs font-light leading-relaxed text-white/45 sm:text-[13px]">
              We map where you are losing time and money first. No pitch.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-finova-midnight to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 z-0" />
    </section>
  )
}
