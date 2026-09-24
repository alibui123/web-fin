"use client"

import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { Project } from "@/lib/portfolio-data"
import type { CaseStudyDepth } from "@/lib/case-study-depth"
import { Reveal } from "@/components/portfolio/motion-primitives"

const EASE = [0.22, 0.61, 0.36, 1] as const

export default function CaseStudyDepthSections({
  project,
  depth,
}: {
  project: Project
  depth: CaseStudyDepth
}) {
  const reduced = useReducedMotion()
  const isSite = depth.stageKind !== "product"

  return (
    <div className="mb-24 space-y-20 md:mb-32 md:space-y-28">
      <Reveal>
        {isSite ? (
          <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#060a12] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
                <span className="truncate font-mono text-[11px] text-white/40">
                  {project.liveUrl?.replace(/^https?:\/\//, "") ?? project.slug}
                </span>
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden shrink-0 items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5ec8d8] sm:inline-flex"
                >
                  Open
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <StageBody project={project} depth={depth} label="Live deployment" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#060a12] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            <StageBody project={project} depth={depth} label="Engagement" />
          </div>
        )}
      </Reveal>

      <Reveal>
        <blockquote className="relative border-l-2 pl-6 md:pl-10" style={{ borderColor: project.accent }}>
          <p className="max-w-3xl text-2xl font-light leading-snug tracking-[-0.02em] text-white md:text-3xl md:leading-[1.25]">
            {depth.pullQuote}
          </p>
        </blockquote>
      </Reveal>

      <Reveal>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {depth.audiencesLabel ?? "Who this has to serve"}
          </h2>
          {depth.audiencesLead && (
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-white/50 md:text-base">
              {depth.audiencesLead}
            </p>
          )}
        </div>
        <div
          className={`grid gap-3 ${
            depth.audiences.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {depth.audiences.map((a, i) => (
            <motion.div
              key={a.label}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#080c16] p-6 md:min-h-[180px] md:p-7"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl"
                style={{ background: project.accent }}
              />
              <h3 className="relative text-lg font-semibold text-white">{a.label}</h3>
              <p className="relative mt-3 text-sm font-light leading-relaxed text-white/55">
                {a.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {depth.surfacesLabel ?? "What we put in place"}
          </h2>
          {depth.surfacesLead && (
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-white/50 md:text-base">
              {depth.surfacesLead}
            </p>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {depth.surfaces.map((s, i) => {
            const n = depth.surfaces.length
            const span =
              n <= 3
                ? "lg:col-span-2"
                : n === 4
                  ? i < 2
                    ? "lg:col-span-3"
                    : "lg:col-span-3"
                  : i < 2
                    ? "sm:col-span-1 lg:col-span-3"
                    : "lg:col-span-2"
            return (
              <motion.article
                key={s.title}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#080c16] p-5 md:p-6 ${span}`}
              >
                <div
                  className="mb-4 h-px w-10 transition-all duration-300 group-hover:w-16"
                  style={{ background: project.accent }}
                />
                <h3 className="text-base font-semibold text-white md:text-lg">{s.title}</h3>
                <p className="mt-2.5 text-sm font-light leading-relaxed text-white/55">
                  {s.detail}
                </p>
              </motion.article>
            )
          })}
        </div>
      </Reveal>

      <ApproachBeamTimeline
        steps={depth.approach}
        accent={project.accent}
        lead={depth.approachLead}
      />

      <Reveal>
        <div
          className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] p-8 md:p-12"
          style={{
            background: `linear-gradient(135deg, ${project.accent}18 0%, #080c16 42%, #05080f 100%)`,
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:22px_22px]" />
          <p className="relative mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
            Outcome
          </p>
          <p className="relative max-w-3xl text-lg font-light leading-relaxed text-white md:text-2xl md:leading-relaxed">
            {depth.closing}
          </p>
        </div>
      </Reveal>
    </div>
  )
}

function StageBody({
  project,
  depth,
  label,
}: {
  project: Project
  depth: CaseStudyDepth
  label: string
}) {
  return (
    <div className="relative min-h-[220px] overflow-hidden md:min-h-[320px]">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${project.accent}55, transparent 50%), radial-gradient(ellipse at 80% 70%, ${project.accent}22, transparent 45%), linear-gradient(160deg, #0a1220 0%, #04070f 100%)`,
        }}
      />
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:28px_28px]" />
      <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-end p-6 md:min-h-[320px] md:p-10">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
          {label}
        </p>
        <p className="max-w-2xl text-2xl font-semibold tracking-tight text-white md:text-4xl md:leading-[1.15]">
          {project.title}
        </p>
        <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-white/55 md:text-base">
          {depth.overview}
        </p>
      </div>
    </div>
  )
}

function ApproachBeamTimeline({
  steps,
  accent,
  lead,
}: {
  steps: CaseStudyDepth["approach"]
  accent: string
  lead?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "end 50%"],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const beamHeight = useTransform(smooth, [0, 1], ["0%", "100%"])

  return (
    <section>
      <div className="mb-10 md:mb-14">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          How we approached it
        </h2>
        {lead && (
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/50 md:text-base">
            {lead}
          </p>
        )}
      </div>

      <div ref={ref} className="relative">
        <div className="absolute bottom-4 left-[11px] top-4 w-px overflow-hidden md:left-[15px]">
          <div className="absolute inset-0 bg-white/[0.08]" />
          {!reduced && (
            <motion.div
              style={{
                height: beamHeight,
                background: `linear-gradient(to bottom, ${accent}, ${accent}66)`,
                boxShadow: `0 0 18px ${accent}88`,
              }}
              className="absolute inset-x-0 top-0 w-full origin-top"
            />
          )}
        </div>

        <ol className="space-y-0">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative grid grid-cols-[24px_1fr] gap-4 pb-12 last:pb-0 md:grid-cols-[32px_1fr] md:gap-8 md:pb-16"
            >
              <div className="relative flex justify-center pt-1.5">
                <span
                  className="relative z-10 mt-1 h-3 w-3 rounded-full border-2 bg-[#030712] md:h-3.5 md:w-3.5"
                  style={{
                    borderColor: accent,
                    boxShadow: `0 0 0 4px ${accent}22, 0 0 16px ${accent}55`,
                  }}
                />
              </div>

              <div className="min-w-0">
                <p
                  className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  Step {String(i + 1).padStart(2, "0")}
                  <span className="text-white/25">
                    {" "}
                    / {String(steps.length).padStart(2, "0")}
                  </span>
                </p>
                <h3 className="text-xl font-semibold tracking-tight text-white md:text-3xl md:leading-tight">
                  {step.title}
                </h3>
                <div
                  className="mb-5 mt-4 h-px w-16 md:w-24"
                  style={{
                    background: `linear-gradient(90deg, ${accent}, transparent)`,
                  }}
                />
                <p className="max-w-2xl text-sm font-light leading-relaxed text-white/55 md:text-base md:leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
