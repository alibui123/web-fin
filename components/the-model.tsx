"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, LayoutGrid, Handshake } from "lucide-react"
const options = [
  {
    icon: Code2,
    title: "Build it in-house",
    body: "Pulling your best engineers off the roadmap to build, and then forever maintain, something outside their core work. The build is the small part. The monitoring, the edge cases, and the 2 a.m. page when it breaks never end. We have already crossed that gap in production, and we carry the operating burden so your team does not.",
    tone: "muted" as const,
  },
  {
    icon: LayoutGrid,
    title: "Buy a platform",
    body: "Hands you the keys and the maintenance. When the agent drifts or an edge case breaks, that is your problem, at your desk, at the worst possible time. That works if you have a team whose whole job is running it. If you do not, it becomes another system that needs an owner you do not have.",
    tone: "muted" as const,
  },
  {
    icon: Handshake,
    title: "Have us run it",
    body: "A working agent in production, pointed at a number, with a team that stays accountable after launch. You carry none of the operating load. That is the model, and it is why serious operators choose a managed partner over a codebase and a goodbye.",
    tone: "accent" as const,
  },
]

export default function TheModel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-finova-purple/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-14 max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5">
            Build it in-house, buy a platform, or have us run it
          </h2>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            If you are weighing an AI agent, you have three real options, and it is worth being honest
            about all three.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-3xl border p-8 h-full overflow-hidden ${
                option.tone === "accent"
                  ? "border-finova-cyan/40 bg-finova-cyan/[0.05] shadow-[0_0_40px_rgba(14,165,233,0.12)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {option.tone === "accent" && (
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-finova-cyan/15 blur-3xl rounded-full pointer-events-none" />
              )}
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border mb-6 ${
                    option.tone === "accent"
                      ? "bg-finova-cyan/10 border-finova-cyan/30 text-finova-cyan"
                      : "bg-white/[0.03] border-white/10 text-white/60"
                  }`}
                >
                  <option.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-4">{option.title}</h3>
                <p className="text-white/60 text-base font-light leading-relaxed">{option.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
