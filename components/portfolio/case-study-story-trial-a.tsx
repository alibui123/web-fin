"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { Project } from "@/lib/portfolio-data"
import { Reveal } from "@/components/portfolio/motion-primitives"

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Trial story layout A — "Editorial manuscript"
 * Scoped to one project while we iterate. No timeline rail, no stacked cards.
 */
export default function CaseStudyStoryTrialA({ project }: { project: Project }) {
  const reduced = useReducedMotion()

  const chapters = [
    { index: "01", title: "The need", body: project.need },
    { index: "02", title: "What we built", body: project.built },
  ]

  return (
    <section className="relative mb-20 md:mb-28">
      {/* Soft paper grain */}
      <div className="pointer-events-none absolute inset-0 -mx-4 rounded-[2rem] bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.07),transparent_55%)] sm:-mx-6" />

      <div className="relative space-y-0">
        {chapters.map((ch, i) => (
          <Reveal key={ch.index} delay={i * 0.08}>
            <article
              className={`grid gap-6 border-white/[0.08] py-10 md:grid-cols-[7rem_1fr] md:gap-10 md:py-14 ${
                i === 0 ? "border-t" : "border-t"
              }`}
            >
              <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                <motion.span
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-mono text-3xl md:text-4xl font-medium tabular-nums tracking-tight text-white/15"
                >
                  {ch.index}
                </motion.span>
                <h2 className="text-sm font-semibold tracking-tight text-white md:text-base">
                  {ch.title}
                </h2>
              </div>
              <p className="max-w-2xl text-xl md:text-2xl font-light leading-[1.45] text-white/75">
                {ch.body}
              </p>
            </article>
          </Reveal>
        ))}

        {/* Gains — outcome columns, not another card */}
        <Reveal delay={0.16}>
          <article className="border-t border-b border-white/[0.08] py-10 md:py-14">
            <div className="mb-8 grid gap-4 md:grid-cols-[7rem_1fr] md:gap-10 md:items-end">
              <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                <span className="font-mono text-3xl md:text-4xl font-medium tabular-nums tracking-tight text-white/15">
                  03
                </span>
                <h2 className="text-sm font-semibold tracking-tight text-white md:text-base">
                  What the business gains
                </h2>
              </div>
              <p className="max-w-xl text-sm font-light text-white/40">
                Outcomes the Foundation walks away with — not a feature list.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-3">
              {project.gains.map((gain, i) => (
                <motion.li
                  key={gain}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
                  className="relative border-t border-[#38bdf8]/35 pt-5"
                >
                  <span className="mb-3 block font-mono text-[11px] tabular-nums text-[#38bdf8]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base md:text-lg font-light leading-snug text-white/80">
                    {gain}
                  </p>
                </motion.li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
