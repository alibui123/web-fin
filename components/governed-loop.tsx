"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket, Gauge, UserCheck, TrendingUp } from "lucide-react"
const beats = [
  {
    icon: Rocket,
    title: "Deploy",
    body: "Your agent goes live inside your stack with hard scope boundaries.",
  },
  {
    icon: Gauge,
    title: "Score",
    body: "QualiCore scores every single interaction against the standards that matter.",
  },
  {
    icon: UserCheck,
    title: "Approve",
    body: "A person on our team reviews and signs off on every improvement before it ships.",
  },
  {
    icon: TrendingUp,
    title: "Improve",
    body: "The agent gets sharper with each cycle, and nothing changes without a human approving it first.",
  },
]

export default function GovernedLoop() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] bg-finova-magenta/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5">
            Self-improving, under human sign-off
          </h2>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            This is the part most vendors cannot show you.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {beats.map((beat, index) => (
            <motion.div
              key={beat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10">
                  <beat.icon className="w-7 h-7 text-finova-cyan" />
                </div>
                <span className="font-mono text-3xl font-black text-white/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white mb-3">{beat.title}</h3>
              <p className="text-white/60 text-base font-light leading-relaxed">{beat.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center mt-14"
        >
          <p className="text-sm text-white/50 font-light leading-relaxed mb-4">
            Every deployment is architected to meet the data rules of the region it runs in, with
            zero retention by default.
          </p>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
            Most vendors say their AI improves over time. We can show you the loop that does it, and
            the human standing in it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
