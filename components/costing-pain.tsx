"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Clock, PhoneMissed, RefreshCw, FileSpreadsheet, Copy } from "lucide-react"

const ease = [0.16, 1, 0.3, 1] as const

const pains = [
  {
    icon: Clock,
    title: "The queue that never clears",
    body: "Work stacks faster than people can clear it.",
  },
  {
    icon: PhoneMissed,
    title: "The after-hours call",
    body: "Unanswered, then booked with a competitor instead.",
  },
  {
    icon: RefreshCw,
    title: "The follow-up that depends on whoever has time",
    body: "Consistency becomes a person's schedule, not a process.",
  },
  {
    icon: FileSpreadsheet,
    title: "The report rebuilt by hand every week",
    body: "Hours spent recreating what systems already know.",
  },
  {
    icon: Copy,
    title: "The record keyed twice",
    body: "Two systems that do not talk, and someone in the middle.",
  },
]

const accents = [
  "from-finova-cyan/25 via-transparent to-transparent",
  "from-finova-lightBlue/25 via-transparent to-transparent",
  "from-finova-purple/25 via-transparent to-transparent",
  "from-finova-magenta/25 via-transparent to-transparent",
  "from-finova-cyan/20 via-finova-magenta/10 to-transparent",
] as const

export default function CostingPain() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })
  const [active, setActive] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-strip]", {
        y: 36,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/5 bg-finova-midnight py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-finova-magenta/10 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)",
          backgroundSize: "3.5rem 3.5rem",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered header */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.85rem] lg:leading-[1.1]"
          >
            The work that is quietly costing you
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/60 md:text-lg"
          >
            You already know where it hurts, even if you have never put a number on it.
          </motion.p>
        </div>

        {/* Cinema strip — desktop */}
        <div
          data-strip
          className="hidden h-[22rem] gap-2 md:flex lg:h-[24rem] lg:gap-2.5"
          onMouseLeave={() => setActive(0)}
        >
          {pains.map((pain, index) => {
            const isActive = active === index
            return (
              <button
                key={pain.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border text-left transition-[flex] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? "flex-[2.4] border-finova-cyan/40 bg-white/[0.05]"
                    : "flex-1 border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${accents[index]} opacity-80`}
                />
                  <div className="relative flex h-full flex-col p-5 lg:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`font-mono text-[11px] tracking-[0.2em] ${
                        isActive ? "text-finova-cyan" : "text-white/30"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <pain.icon
                      className={`h-5 w-5 shrink-0 transition-colors ${
                        isActive ? "text-finova-cyan" : "text-white/40"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="mt-auto min-w-0">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key="open"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.28 }}
                        >
                          <h3 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">
                            {pain.title}
                          </h3>
                          <p className="mt-4 max-w-sm text-[15px] font-light leading-relaxed text-white/60">
                            {pain.body}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="closed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="line-clamp-4 text-sm font-semibold leading-snug tracking-tight text-white/80 [writing-mode:vertical-rl] rotate-180"
                        >
                          {pain.title}
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Stack — mobile */}
        <div className="flex flex-col gap-3 md:hidden">
          {pains.map((pain, index) => {
            const isActive = active === index
            return (
              <button
                key={pain.title}
                type="button"
                onClick={() => setActive(index)}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  isActive
                    ? "border-finova-cyan/40 bg-white/[0.05]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <pain.icon
                    className={`h-4 w-4 ${isActive ? "text-finova-cyan" : "text-white/45"}`}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-white">
                  {pain.title}
                </h3>
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-[15px] font-light leading-relaxed text-white/55"
                    >
                      <span className="mt-2 block">{pain.body}</span>
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </button>
            )
          })}
        </div>

        {/* Close — split, no nested “cards” of pains */}
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-12 md:mt-16 md:grid-cols-2 md:gap-12 md:pt-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-base font-light leading-relaxed text-white/55 md:text-lg"
          >
            None of it is dramatic on its own. Added up across a year, it is a full salary of wasted
            hours and a steady drip of revenue that leaves before anyone notices it was leaving.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="text-base font-light leading-relaxed text-white/75 md:text-lg"
          >
            Ordinary automation handles the easy middle of that and hands the hard part back to a
            person. We take the whole chain, run it end to end, and give you back the hours and the revenue
            it was costing.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
