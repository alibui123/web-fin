"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { Project } from "@/lib/portfolio-data"

const EASE = [0.16, 1, 0.3, 1] as const

type StageId = "need" | "built" | "gains"

const STAGES: { id: StageId; label: string; verb: string }[] = [
  { id: "need", label: "The need", verb: "Diagnose" },
  { id: "built", label: "What we built", verb: "Deliver" },
  { id: "gains", label: "What the business gains", verb: "Prove" },
]

/**
 * Trial C — Continuum dial
 * Full-width single stage. A traveling cursor rides a continuum rail.
 * Content swaps with a vertical cut-path wipe (21st Vertical Cut / Animated Tabs energy).
 * Gains render as cascading outcome slabs — not a list, not sticky columns.
 */
export default function CaseStudyStoryTrialC({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const stage = STAGES[active]

  const go = useCallback(
    (i: number) => {
      setActive((i + STAGES.length) % STAGES.length)
    },
    [],
  )

  return (
    <section className="relative mb-24 md:mb-32">
      {/* Continuum rail */}
      <div className="mb-10 md:mb-14">
        <div className="relative mx-auto max-w-3xl px-2">
          {/* Track */}
          <div className="absolute left-[8%] right-[8%] top-[18px] h-px bg-white/10 md:top-[22px]" />
          <motion.div
            className="absolute left-[8%] top-[18px] h-px origin-left md:top-[22px]"
            style={{ background: project.accent, width: "84%" }}
            initial={false}
            animate={{ scaleX: active / Math.max(STAGES.length - 1, 1) }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 32 }}
          />

          <div className="relative grid grid-cols-3">
            {STAGES.map((s, i) => {
              const on = i === active
              const passed = i <= active
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  className="group flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-[#5ec8d8]/40 rounded-lg"
                >
                  <span className="relative mb-4 flex h-9 w-9 items-center justify-center md:mb-5 md:h-11 md:w-11">
                    {on && !reduced && (
                      <motion.span
                        layoutId="continuum-pulse"
                        className="absolute inset-0 rounded-full opacity-50 blur-md"
                        style={{ background: project.accent }}
                      />
                    )}
                    <motion.span
                      className="relative z-10 h-3.5 w-3.5 rounded-full border-2 md:h-4 md:w-4"
                      animate={{
                        backgroundColor: on ? "#ffffff" : passed ? project.accent : "#030712",
                        borderColor: on || passed ? "#ffffff" : "rgba(255,255,255,0.25)",
                        scale: on ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.25 }}
                    />
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors md:text-[11px] ${
                      on ? "text-white" : "text-white/35 group-hover:text-white/60"
                    }`}
                  >
                    {s.verb}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stage canvas */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#050910]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at ${20 + active * 30}% 0%, ${project.accent}33, transparent 50%)`,
          }}
        />

        {/* Giant watermark verb */}
        <div className="pointer-events-none absolute -right-4 top-4 select-none md:top-6 md:right-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={stage.verb}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 0.06, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block text-[4.5rem] md:text-[7rem] font-semibold tracking-tighter leading-none text-white"
            >
              {stage.verb}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative z-10 min-h-[320px] p-7 md:min-h-[380px] md:p-12 lg:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      clipPath: "inset(0 0 100% 0)",
                      filter: "blur(10px)",
                    }
              }
              animate={{
                opacity: 1,
                clipPath: "inset(0 0 0% 0)",
                filter: "blur(0px)",
              }}
              exit={
                reduced
                  ? undefined
                  : {
                      opacity: 0,
                      clipPath: "inset(100% 0 0 0)",
                      filter: "blur(8px)",
                    }
              }
              transition={{ duration: 0.55, ease: EASE }}
              className="max-w-3xl"
            >
              <p className="mb-3 font-mono text-[12px] tabular-nums text-white/30">
                {String(active + 1).padStart(2, "0")} / 03
              </p>
              <h2 className="mb-6 text-2xl md:text-4xl font-semibold tracking-tight text-white leading-[1.15]">
                {stage.label}
              </h2>

              {stage.id === "need" && (
                <p className="text-lg md:text-2xl font-light leading-relaxed text-white/70">
                  {project.need}
                </p>
              )}

              {stage.id === "built" && (
                <p className="text-lg md:text-2xl font-light leading-relaxed text-white/70">
                  {project.built}
                </p>
              )}

              {stage.id === "gains" && (
                <ul className="mt-2 space-y-3">
                  {project.gains.map((gain, i) => (
                    <motion.li
                      key={gain}
                      initial={reduced ? false : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.08, duration: 0.4, ease: EASE }}
                      className="flex items-start gap-4 border-l-2 pl-5 py-1"
                      style={{
                        borderColor: `${project.accent}${40 + i * 30}`,
                        marginLeft: `${i * 1.25}rem`,
                      }}
                    >
                      <span className="mt-1 font-mono text-[11px] text-white/30 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base md:text-xl font-light leading-snug text-white/80">
                        {gain}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / next */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] px-6 py-4 md:px-10">
          <button
            type="button"
            onClick={() => go(active - 1)}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white"
          >
            ← Prev
          </button>
          <p className="text-[11px] text-white/30">
            {STAGES.map((s) => s.verb).join("  ·  ")}
          </p>
          <button
            type="button"
            onClick={() => go(active + 1)}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  )
}
