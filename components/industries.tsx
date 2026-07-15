"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { HeartPulse, Wrench, Landmark, Building2, ArrowRight } from "lucide-react"
const industries = [
  {
    icon: HeartPulse,
    name: "Healthcare operations",
    tag: "Clinics, billing, and care ops",
    body: "Verification, intake, reminders, and follow-up in the patient's language, with clinical judgment left with your team.",
    href: "/industries/healthcare",
    color: "from-finova-cyan to-finova-blue",
  },
  {
    icon: Building2,
    name: "Financial services",
    tag: "Ops that run on calls and records",
    body: "Qualification, routing, and back-office actions inside the systems your teams already live in.",
    href: "/industries/financial-services",
    color: "from-finova-lightBlue to-finova-cyan",
  },
  {
    icon: Landmark,
    name: "Government",
    tag: "Public institutions and enterprises",
    body: "Governed agents inside ERP and admin workflows, always with a person in control.",
    href: "/industries/government",
    color: "from-finova-purple to-finova-magenta",
  },
  {
    icon: Wrench,
    name: "Home services",
    tag: "Trades and field businesses",
    body: "Every call answered, every job captured, every quote followed up.",
    href: "/industries/home-services",
    color: "from-finova-magenta to-finova-purple",
  },
]

export default function Industries() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden">
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-finova-cyan/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform"
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
            Industries
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5">
            Built for how your industry runs
          </h2>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            Healthcare operations, financial services, government, home services, and more. If your
            business runs on calls, follow-ups, and hand-entered data, the same core fits, tuned to
            your workflow and your rules.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={industry.href}
                className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-white/20"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 self-start transition-all duration-300 group-hover:scale-105">
                    <industry.icon className="w-7 h-7 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-xs font-mono tracking-widest uppercase text-white/40 mb-6">
                    {industry.tag}
                  </p>
                  <p className="text-white/60 text-base font-light leading-relaxed flex-grow group-hover:text-white/80 transition-colors">
                    {industry.body}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 text-center"
        >
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.12em] uppercase text-finova-cyan hover:text-white transition-colors"
          >
            Explore your industry
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
