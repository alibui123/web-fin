"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import type { Project } from "@/lib/portfolio-data"

const EASE = [0.23, 1, 0.32, 1] as const

type Stage = {
  id: string
  verb: string
  title: string
  body?: string
  gains?: string[]
}

/**
 * Trial H — Aperture chapters (Lenis-safe via ScrollTrigger)
 * Scroll drives chapter index 0→1→2; iris blooms open for each chapter.
 */
export default function CaseStudyStoryTrialH({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const pinRef = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(0)
  const [open, setOpen] = useState(true)

  const stages: Stage[] = useMemo(
    () => [
      { id: "need", verb: "Need", title: "The need", body: project.need },
      { id: "built", verb: "Built", title: "What we built", body: project.built },
      {
        id: "gains",
        verb: "Gains",
        title: "What the business gains",
        gains: project.gains,
      },
    ],
    [project.need, project.built, project.gains],
  )

  useEffect(() => {
    if (reduced) return
    gsap.registerPlugin(ScrollTrigger)

    const pin = pinRef.current
    if (!pin) return

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.65,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress
        // Three equal chapters. Brief blink closed at boundaries.
        let next = 0
        if (p >= 2 / 3) next = 2
        else if (p >= 1 / 3) next = 1

        setChapter(next)

        // Local progress inside current third (0–1)
        const local = (p - next / 3) / (1 / 3)
        // Closed near the start of each third, open through the middle
        const isOpen = local > 0.08 && local < 0.92
        setOpen(isOpen)
      },
    })

    // Lenis already calls ScrollTrigger.update on scroll — refresh once mounted
    ScrollTrigger.refresh()

    return () => {
      st.kill()
    }
  }, [reduced])

  const stage = stages[chapter]

  if (reduced) {
    return <ReducedFallback stages={stages} accent={project.accent} />
  }

  return (
    <div className="relative mb-16">
      {/* Pin spacer host — ScrollTrigger pins this node for 300% scroll */}
      <div ref={pinRef} className="relative flex h-screen items-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-45 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at ${20 + chapter * 30}% 30%, ${project.accent}40, transparent 55%)`,
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-[0.85fr_1.25fr] md:gap-12 sm:px-6">
          {/* Kinetic verb */}
          <div className="relative hidden min-h-[200px] md:block">
            <div className="relative h-[7rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stage.verb}
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -48, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-x-0 top-0 text-[5.5rem] font-semibold leading-none tracking-tighter text-white"
                >
                  {stage.verb}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex gap-2">
              {stages.map((s, i) => (
                <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full origin-left rounded-full"
                    style={{ background: project.accent }}
                    initial={false}
                    animate={{ scaleX: i <= chapter ? 1 : 0.08 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Aperture frame */}
          <div className="relative">
            <div
              className="absolute -inset-[1px] rounded-[1.75rem] opacity-50"
              style={{
                background: `linear-gradient(135deg, ${project.accent}88, transparent 45%, ${project.accent}33)`,
              }}
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#060a12]">
              <motion.div
                className="relative min-h-[360px] p-8 md:min-h-[420px] md:p-11"
                initial={false}
                animate={{
                  clipPath: open ? "circle(78% at 50% 50%)" : "circle(6% at 50% 50%)",
                }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:22px_22px]" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="relative z-10"
                  >
                    <p className="mb-2 font-mono text-[11px] tabular-nums text-white/30">
                      {String(chapter + 1).padStart(2, "0")} / 03
                    </p>
                    <h2 className="mb-5 text-2xl md:text-3xl font-semibold tracking-tight text-white">
                      {stage.title}
                    </h2>

                    {stage.body && (
                      <p className="text-lg md:text-xl font-light leading-relaxed text-white/75">
                        {stage.body}
                      </p>
                    )}

                    {stage.gains && (
                      <ul className="space-y-3">
                        {stage.gains.map((gain, gi) => (
                          <motion.li
                            key={gain}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 + gi * 0.07, duration: 0.35, ease: EASE }}
                            className="flex gap-3 text-base md:text-lg font-light leading-snug text-white/75"
                            style={{ marginLeft: `${gi * 0.75}rem` }}
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: project.accent }}
                            />
                            {gain}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.18em] text-white/30 md:text-left">
              Keep scrolling — Need, then Built, then Gains
            </p>
          </div>
        </div>

        <p className="absolute bottom-8 left-0 right-0 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/45 md:hidden">
          {stage.verb}
        </p>
      </div>
    </div>
  )
}

function ReducedFallback({ stages, accent }: { stages: Stage[]; accent: string }) {
  return (
    <section className="mb-20 space-y-8">
      {stages.map((s, i) => (
        <article key={s.id} className="rounded-2xl border border-white/10 bg-[#070b14] p-8">
          <p className="mb-2 font-mono text-[11px] text-white/30">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h2 className="mb-4 text-xl font-semibold text-white">{s.title}</h2>
          {s.body && <p className="font-light leading-relaxed text-white/70">{s.body}</p>}
          {s.gains && (
            <ul className="mt-2 space-y-2">
              {s.gains.map((g) => (
                <li key={g} className="flex gap-2 font-light text-white/70">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  {g}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </section>
  )
}
