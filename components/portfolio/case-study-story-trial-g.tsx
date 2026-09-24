"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/lib/portfolio-data"

const EASE = [0.23, 1, 0.32, 1] as const

type Panel = {
  id: string
  index: string
  title: string
  body?: string
  gains?: string[]
}

/**
 * Trial G — Horizontal proof strip
 * Snap between Need → Built → Gains on a horizontal track.
 * Avoids vertical sticky (Lenis-hostile). Keeps cut-path text reveal on the active panel.
 */
export default function CaseStudyStoryTrialG({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const panels: Panel[] = [
    { id: "need", index: "01", title: "The need", body: project.need },
    { id: "built", index: "02", title: "What we built", body: project.built },
    { id: "gains", index: "03", title: "What the business gains", gains: project.gains },
  ]

  const goTo = useCallback((i: number) => {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(panels.length - 1, i))
    const child = el.children[clamped] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "start", block: "nearest" })
    setActive(clamped)
  }, [panels.length, reduced])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[]
      if (!children.length) return
      const left = el.scrollLeft
      let best = 0
      let bestDist = Infinity
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - left)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  // Wheel: vertical intent → horizontal scrub when over the strip
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      // Only hijack when the strip can still move horizontally
      const atStart = el.scrollLeft <= 0
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  return (
    <section className="relative mb-24">
      {/* Header rail */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 font-mono text-[11px] tabular-nums text-white/30">
            {String(active + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
          </p>
          <p className="text-sm text-white/45">Swipe or scroll sideways through the story.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/30 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(active + 1)}
            disabled={active === panels.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/30 hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="mb-5 flex gap-2">
        {panels.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={p.title}
            onClick={() => goTo(i)}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
          >
            <motion.span
              className="block h-full origin-left rounded-full"
              style={{ background: project.accent }}
              initial={false}
              animate={{ scaleX: i <= active ? 1 : 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
          </button>
        ))}
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {panels.map((panel, i) => {
          const on = i === active
          return (
            <div
              key={panel.id}
              className="relative w-[min(100%,40rem)] shrink-0 snap-start md:w-[min(100%,44rem)]"
            >
              <article
                className={`relative min-h-[340px] overflow-hidden rounded-2xl border bg-[#070b14] p-8 md:min-h-[380px] md:p-11 transition-colors duration-500 ${
                  on ? "border-white/20" : "border-white/10"
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(ellipse at 0% 0%, ${project.accent}40, transparent 55%)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-6 flex items-baseline gap-3">
                    <span className="font-mono text-sm text-white/30 tabular-nums">
                      {panel.index}
                    </span>
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                      {panel.title}
                    </h2>
                  </div>

                  {panel.body && (
                    <motion.p
                      key={`${panel.id}-${on}`}
                      initial={
                        reduced || !on
                          ? false
                          : { opacity: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(8px)" }
                      }
                      animate={
                        on
                          ? { opacity: 1, clipPath: "inset(0 0 0% 0)", filter: "blur(0px)" }
                          : { opacity: 0.55, clipPath: "inset(0 0 0% 0)", filter: "blur(0px)" }
                      }
                      transition={{ duration: 0.55, ease: EASE }}
                      className="text-lg md:text-2xl font-light leading-relaxed text-white/75"
                    >
                      {panel.body}
                    </motion.p>
                  )}

                  {panel.gains && (
                    <ul className="space-y-4">
                      {panel.gains.map((gain, gi) => (
                        <motion.li
                          key={gain}
                          initial={
                            reduced || !on
                              ? false
                              : { opacity: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(6px)" }
                          }
                          animate={
                            on
                              ? { opacity: 1, clipPath: "inset(0 0 0% 0)", filter: "blur(0px)" }
                              : { opacity: 0.55 }
                          }
                          transition={{ duration: 0.45, ease: EASE, delay: on ? gi * 0.08 : 0 }}
                          className="flex gap-3 text-base md:text-xl font-light leading-snug text-white/75"
                        >
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: project.accent }}
                          />
                          {gain}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>

              {/* Peek of next card edge */}
              {i < panels.length - 1 && (
                <div
                  className="pointer-events-none absolute -right-2 top-4 bottom-4 w-3 rounded-r-xl border border-l-0 border-white/10 bg-[#070b14]/80 md:-right-3"
                  aria-hidden
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
