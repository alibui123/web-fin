"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Building2,
  Calendar,
  Coins,
  Cookie,
  ExternalLink,
  Gamepad2,
  Globe,
  GraduationCap,
  Landmark,
  Leaf,
  PhoneCall,
  Plane,
  Search,
  Shield,
  Smartphone,
  Wheat,
} from "lucide-react"
import type { MetricKind, Project } from "@/lib/portfolio-data"
import {
  METRIC_LEGEND,
  getPracticeLabel,
  getRelatedProjects,
  projects,
} from "@/lib/portfolio-data"
import { Reveal, TextReveal } from "@/components/portfolio/motion-primitives"
import CaseStudyStoryTrialI from "@/components/portfolio/case-study-story-trial-i"

const iconMap = {
  PhoneCall,
  Globe,
  Gamepad2,
  GraduationCap,
  Smartphone,
  Building2,
  Bot,
  Landmark,
  Coins,
  Calendar,
  Search,
  Plane,
  Wheat,
  Cookie,
  Shield,
  Leaf,
}

const metricStyles: Record<MetricKind, { badge: string; glow: string }> = {
  verified: {
    badge: "bg-emerald-400/15 text-emerald-300 border-emerald-400/25",
    glow: "rgba(52,211,153,0.15)",
  },
  benchmark: {
    badge: "bg-amber-400/15 text-amber-300 border-amber-400/25",
    glow: "rgba(251,191,36,0.12)",
  },
  "by-design": {
    badge: "bg-[#5ec8d8]/15 text-[#5ec8d8] border-[#5ec8d8]/25",
    glow: "rgba(94,200,216,0.12)",
  },
}

const metricLabels: Record<MetricKind, string> = {
  verified: "Verified",
  benchmark: "Industry benchmark",
  "by-design": "By design",
}

const depthLabel: Record<Project["depth"], string | null> = {
  flagship: "Flagship",
  standard: null,
  program: "Program",
}

const EASE = [0.23, 1, 0.32, 1] as const

export default function CaseStudyPage({ project }: { project: Project }) {
  const Icon = iconMap[project.iconName]
  const reduced = useReducedMotion()
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const related = getRelatedProjects(project, 3)
  const isCompact = project.depth !== "flagship"

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712]">
      <div
        className="pointer-events-none absolute left-[-10%] top-[-5%] h-[50vw] w-[50vw] rounded-full opacity-25 blur-[100px]"
        style={{ background: project.accent }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div
        className="fixed top-0 left-0 z-50 h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-28 pt-28 sm:px-6 md:pt-32">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-12"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Portfolio
          </Link>
        </motion.div>

        {/* Hero */}
        <div className="mb-16 md:mb-24">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ${project.tagColor}`}
            >
              {getPracticeLabel(project.practice)}
            </span>
            <span className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
              {project.industry}
            </span>
            {depthLabel[project.depth] && (
              <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-black">
                {depthLabel[project.depth]}
              </span>
            )}
          </div>

          <p className="mb-4 font-mono text-[12px] tabular-nums text-white/30">
            {String(project.number).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>

          <TextReveal
            text={project.title}
            className={`font-semibold tracking-[-0.03em] text-white leading-[1.08] ${
              isCompact
                ? "text-3xl sm:text-4xl md:text-5xl"
                : "text-4xl sm:text-5xl md:text-6xl"
            }`}
          />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
            className={`mt-6 max-w-3xl font-light leading-relaxed text-white/60 ${
              isCompact ? "text-lg" : "text-xl md:text-2xl"
            }`}
          >
            {project.summary}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 grid gap-6 border-t border-white/[0.08] pt-6 sm:grid-cols-3"
          >
            <Meta
              label="Client"
              value={
                project.clientSlug ? (
                  <Link
                    href={`/customers/${project.clientSlug}`}
                    className="text-white transition-colors hover:text-[#5ec8d8]"
                  >
                    {project.client}
                  </Link>
                ) : (
                  project.client
                )
              }
            />
            <Meta label="Region" value={project.region} />
            {project.liveUrl ? (
              <Meta
                label="Live"
                value={
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#5ec8d8] transition-colors hover:text-white"
                  >
                    Visit site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                }
              />
            ) : (
              <Meta
                label="Practice"
                value={getPracticeLabel(project.practice)}
              />
            )}
          </motion.div>
        </div>

        <CaseStudyStoryTrialI project={project} />

        {/* Metrics bento */}
        <Reveal className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
              style={{ color: project.accent, background: `${project.accent}14` }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
              Proof metrics
            </h2>
          </div>

          <div
            className={`grid gap-3 ${
              isCompact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {project.metrics.map((metric, i) => (
              <motion.div
                key={`${metric.value}-${metric.label}`}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c16] p-6"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
                  style={{ background: metricStyles[metric.kind].glow }}
                />
                <span
                  className={`relative inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${metricStyles[metric.kind].badge}`}
                >
                  {metricLabels[metric.kind]}
                </span>
                <p className="relative mt-4 text-2xl md:text-3xl font-semibold tabular-nums tracking-tight text-white">
                  {metric.value}
                </p>
                <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                  {metric.label}
                </p>
                {metric.source && (
                  <p className="relative mt-3 text-[10px] uppercase tracking-[0.12em] text-white/30">
                    Source · {metric.source}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              How to read the numbers
            </p>
            <ul className="space-y-1.5">
              {METRIC_LEGEND.map((item) => (
                <li key={item.kind} className="text-xs leading-relaxed text-white/45">
                  <span className="font-semibold text-white/70">{item.label}.</span>{" "}
                  {item.description}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Related — asymmetric mini condition grid */}
        {related.length > 0 && (
          <Reveal className="mb-20">
            <h2 className="mb-5 text-xl font-semibold tracking-tight text-white">
              Related work
            </h2>
            <div className="grid grid-cols-12 gap-3">
              {related.map((r, i) => (
                <Link
                  key={r.slug}
                  href={`/portfolio/${r.slug}`}
                  className={`group col-span-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c16] p-5 transition-colors hover:border-white/20 ${
                    i === 0 ? "sm:col-span-7" : i === 1 ? "sm:col-span-5" : "sm:col-span-12"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
                        {getPracticeLabel(r.practice)}
                      </p>
                      <p className="text-base font-semibold text-white transition-colors group-hover:text-[#5ec8d8]">
                        {r.title}
                      </p>
                      <p className="mt-1 text-xs text-white/40">{r.client}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#5ec8d8]" />
                  </div>
                </Link>
              ))}
            </div>
            {project.clientSlug && (
              <Link
                href={`/customers/${project.clientSlug}`}
                className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#5ec8d8]"
              >
                Full {project.client} story
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </Reveal>
        )}

        {/* CTA */}
        <Reveal className="mb-16 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a1220] to-[#05080f] p-8 text-center md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
            See where this applies to your operation.
          </h2>
          <p className="mx-auto mb-8 max-w-lg font-light text-white/50">
            Free audit. You get the findings whether or not we work together.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#5ec8d8]"
            >
              Book a free audit
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#5ec8d8]/50"
            >
              How we work
            </Link>
          </div>
        </Reveal>

        {/* Prev / next */}
        <div className="border-t border-white/[0.08] pt-10">
          <div className="grid gap-3 md:grid-cols-2">
            <NavCard href={`/portfolio/${prevProject.slug}`} label="Previous" title={prevProject.title} reverse />
            <NavCard href={`/portfolio/${nextProject.slug}`} label="Next" title={nextProject.title} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  )
}

function NavCard({
  href,
  label,
  title,
  reverse,
}: {
  href: string
  label: string
  title: string
  reverse?: boolean
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-[#080c16] p-6 transition-colors hover:border-white/15 ${
        reverse ? "" : "md:items-end md:text-right"
      }`}
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 group-hover:text-white/60">
        {label}
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">{title}</span>
    </Link>
  )
}
