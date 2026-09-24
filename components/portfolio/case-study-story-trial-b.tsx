"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { Project } from "@/lib/portfolio-data"

const EASE = [0.23, 1, 0.32, 1] as const

type Stage = {
  id: "need" | "built" | "gains"
  index: string
  title: string
  short: string
}

const STAGES: Stage[] = [
  { id: "need", index: "01", title: "The need", short: "Need" },
  { id: "built", index: "02", title: "What we built", short: "Built" },
  { id: "gains", index: "03", title: "What the business gains", short: "Gains" },
]

/**
 * Trial B — Sticky stage cinema
 * Inspired by 21st.dev Scroll 01 (sticky media + scroll text) and
 * clip-path stage swaps (Animated Tabs / Vertical Cut Reveal).
 * Scroll drives the active stage; the left panel morphs in place.
 */
export default function CaseStudyStoryTrialB({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const nodes = sectionRefs.current.filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible?.target) return
        const idx = Number((visible.target as HTMLElement).dataset.stage)
        if (!Number.isNaN(idx)) setActive(idx)
      },
      { root: null, rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  const stage = STAGES[active]
  const bodies: Record<Stage["id"], string | string[]> = {
    need: project.need,
    built: project.built,
    gains: project.gains,
  }

  return (
    <section className="relative mb-24 md:mb-32">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
        {/* Sticky stage panel — morphs as scroll chapters change */}
        <div className="relative hidden lg:block">
          <div className="sticky top-28 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#060a12]">
            <div
              className="pointer-events-none absolute inset-0 opacity-50 transition-colors duration-700"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${project.accent}40, transparent 55%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40" />

            {/* Stage index tabs with clip-path wipe */}
            <div className="relative z-10 flex gap-1 border-b border-white/[0.06] p-3">
              {STAGES.map((s, i) => {
                const on = i === active
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setActive(i)
                      sectionRefs.current[i]?.scrollIntoView({
                        behavior: reduced ? "auto" : "smooth",
                        block: "center",
                      })
                    }}
                    className="relative flex-1 overflow-hidden rounded-xl px-3 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#5ec8d8]/50"
                  >
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          layoutId="story-stage-thumb"
                          className="absolute inset-0 bg-white"
                          initial={false}
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 380, damping: 34 }
                          }
                          style={{
                            clipPath: "inset(0 0 0 0)",
                          }}
                        />
                      )}
                    </AnimatePresence>
                    <span
                      className={`relative z-10 block font-mono text-[10px] tabular-nums ${
                        on ? "text-black/45" : "text-white/30"
                      }`}
                    >
                      {s.index}
                    </span>
                    <span
                      className={`relative z-10 text-xs font-semibold ${
                        on ? "text-black" : "text-white/55"
                      }`}
                    >
                      {s.short}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="relative z-10 min-h-[340px] p-8 xl:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id}
                  initial={
                    reduced
                      ? false
                      : {
                          opacity: 0,
                          y: 24,
                          clipPath: "inset(12% 0 12% 0)",
                          filter: "blur(8px)",
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0% 0 0% 0)",
                    filter: "blur(0px)",
                  }}
                  exit={
                    reduced
                      ? undefined
                      : {
                          opacity: 0,
                          y: -16,
                          clipPath: "inset(20% 0 20% 0)",
                          filter: "blur(6px)",
                        }
                  }
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="mb-3 font-mono text-5xl xl:text-6xl font-medium tabular-nums tracking-tighter text-white/10">
                    {stage.index}
                  </p>
                  <h2 className="mb-5 text-2xl xl:text-3xl font-semibold tracking-tight text-white leading-snug">
                    {stage.title}
                  </h2>

                  {stage.id !== "gains" ? (
                    <p className="text-base xl:text-lg font-light leading-relaxed text-white/65">
                      {bodies[stage.id] as string}
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {(bodies.gains as string[]).map((gain, i) => (
                        <motion.li
                          key={gain}
                          initial={reduced ? false : { opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.35, ease: EASE }}
                          className="flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm font-light leading-snug text-white/75"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: project.accent }}
                          />
                          {gain}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress ticks */}
            <div className="relative z-10 flex gap-1.5 px-8 pb-6">
              {STAGES.map((s, i) => (
                <span
                  key={s.id}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                >
                  <motion.span
                    className="block h-full origin-left rounded-full"
                    style={{ background: project.accent }}
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll chapters — drive the sticky panel */}
        <div className="space-y-6 md:space-y-8">
          {STAGES.map((s, i) => (
            <article
              key={s.id}
              ref={(el) => {
                sectionRefs.current[i] = el
              }}
              data-stage={i}
              className={`scroll-mt-32 rounded-[1.5rem] border p-7 md:p-9 transition-colors duration-500 ${
                active === i
                  ? "border-white/20 bg-[#0a101c]"
                  : "border-white/[0.06] bg-[#060a12]/60"
              }`}
            >
              {/* Mobile-only heading (desktop reads from sticky) */}
              <div className="mb-4 flex items-center gap-3 lg:hidden">
                <span className="font-mono text-sm text-white/35">{s.index}</span>
                <h2 className="text-lg font-semibold text-white">{s.title}</h2>
              </div>

              <p className="mb-2 hidden text-[11px] font-medium uppercase tracking-[0.18em] text-white/35 lg:block">
                Chapter {s.index}
              </p>
              <h3 className="mb-4 hidden text-xl font-semibold tracking-tight text-white lg:block">
                {s.title}
              </h3>

              {s.id !== "gains" ? (
                <p className="text-base md:text-lg font-light leading-relaxed text-white/65">
                  {bodies[s.id] as string}
                </p>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-1">
                  {(bodies.gains as string[]).map((gain) => (
                    <li
                      key={gain}
                      className="flex gap-3 text-base md:text-lg font-light leading-relaxed text-white/70"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: project.accent }}
                      />
                      {gain}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
