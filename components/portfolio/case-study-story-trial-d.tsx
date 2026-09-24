"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { Project } from "@/lib/portfolio-data"

const EASE = [0.23, 1, 0.32, 1] as const

type CardDef = {
  id: string
  index: string
  title: string
  body?: string
  gains?: string[]
}

/**
 * Sticky stack (CSS): each card pins with a larger `top` than the one before,
 * so the next card covers it while leaving a visible border rim underneath.
 * Requires no overflow:hidden on ancestors (fixed on the case study page).
 */
export default function CaseStudyStoryTrialD({ project }: { project: Project }) {
  const reduced = useReducedMotion()

  const cards: CardDef[] = [
    { id: "need", index: "01", title: "The need", body: project.need },
    { id: "built", index: "02", title: "What we built", body: project.built },
    { id: "gains", index: "03", title: "What the business gains", gains: project.gains },
  ]

  const HEADER = 96
  const PEEK = 44

  return (
    <section className="relative mb-28">
      <div className="relative flex flex-col gap-6">
        {cards.map((card, i) => (
          <article
            key={card.id}
            className="sticky overflow-hidden rounded-2xl border border-white/15 bg-[#070b14]"
            style={{
              top: HEADER + i * PEEK,
              zIndex: 10 + i,
              // Pull each layer slightly inward so side borders of lower cards show
              width: `calc(100% - ${i * 20}px)`,
              marginLeft: i * 10,
              marginRight: "auto",
              minHeight: 380,
              boxShadow: "0 -20px 50px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(ellipse at 12% 0%, ${project.accent}36, transparent 52%)`,
              }}
            />

            <div className="relative z-10 p-8 md:p-12">
              <div className="mb-8 flex items-baseline gap-3">
                <span className="font-mono text-sm text-white/30 tabular-nums">
                  {card.index}
                </span>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                  {card.title}
                </h2>
              </div>

              {card.body && (
                <motion.p
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(8px)" }
                  }
                  whileInView={{
                    opacity: 1,
                    clipPath: "inset(0 0 0% 0)",
                    filter: "blur(0px)",
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="max-w-3xl text-lg md:text-2xl font-light leading-relaxed text-white/75"
                >
                  {card.body}
                </motion.p>
              )}

              {card.gains && (
                <ul className="max-w-3xl space-y-4">
                  {card.gains.map((gain, gi) => (
                    <motion.li
                      key={gain}
                      initial={
                        reduced
                          ? false
                          : { opacity: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(6px)" }
                      }
                      whileInView={{
                        opacity: 1,
                        clipPath: "inset(0 0 0% 0)",
                        filter: "blur(0px)",
                      }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.45, ease: EASE, delay: gi * 0.08 }}
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
        ))}
      </div>

      {/* Hold the stacked pile in view before the next section */}
      <div className="h-[40vh]" aria-hidden />
    </section>
  )
}
