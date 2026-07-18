"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronRight, Plus } from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  READINESS_URL,
  workflowAudience,
  workflowFaqs,
  workflowFinal,
  workflowGovernance,
  workflowHero,
  workflowHow,
  workflowProblem,
  workflowProof,
  workflowRuns,
  workflowRunsHeading,
  workflowSiblings,
} from "@/lib/workflow-automation"

const WorkflowEngineCanvas = dynamic(
  () =>
    import(
      "@/components/solutions/workflow-automation/workflow-engine/WorkflowEngineCanvas"
    ),
  { ssr: false },
)

const faqColors = [
  "from-finova-cyan to-finova-blue",
  "from-finova-magenta to-finova-purple",
  "from-finova-lightBlue to-finova-cyan",
  "from-finova-purple to-finova-magenta",
  "from-finova-cyan to-finova-lightBlue",
]

function BookCallButton({ label }: { label: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onPointerUp={clearStickyCta}
      className="group relative inline-flex w-full sm:w-auto"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-full bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-magenta opacity-70 blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-finova-cyan/35 to-finova-magenta/35 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
      />

      <span className="relative inline-flex h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-8 text-sm font-bold uppercase tracking-[0.15em] text-black transition-colors duration-300 group-hover:bg-[#0b1228] group-hover:text-white active:bg-[#0b1228] active:text-white sm:w-auto">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative">{label}</span>
        <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}

function DualCtas({
  primaryLabel,
  secondaryLabel,
  micro,
  className = "",
}: {
  primaryLabel: string
  secondaryLabel: string
  micro?: string
  className?: string
}) {
  return (
    <div
      className={`mx-auto flex w-full max-w-md flex-col items-center gap-3 sm:mx-0 sm:inline-flex sm:w-auto sm:max-w-none sm:items-start ${className}`}
    >
      <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        <BookCallButton label={primaryLabel} />
        <Link
          href={READINESS_URL}
          className="inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.03] px-8 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10 backdrop-blur-sm"
        >
          {secondaryLabel}
        </Link>
      </div>
      {micro ? (
        <p className="max-w-sm text-center text-xs font-light leading-relaxed text-white/45 sm:text-left sm:text-[13px]">
          {micro}
        </p>
      ) : null}
    </div>
  )
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium tracking-wide text-white/45">
        <li>
          <Link href="/" className="hover:text-finova-cyan transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-white/25">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li>
          <Link href="/solutions" className="hover:text-finova-cyan transition-colors">
            Solutions
          </Link>
        </li>
        <li aria-hidden className="text-white/25">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="text-white/80" aria-current="page">
          Workflow automation
        </li>
      </ol>
    </nav>
  )
}

function LinkedPhrase({
  text,
  phrase,
  href,
}: {
  text: string
  phrase: string
  href: string
}) {
  const parts = text.split(phrase)
  if (parts.length < 2) return <>{text}</>
  return (
    <>
      {parts[0]}
      <Link
        href={href}
        className="text-finova-cyan hover:text-finova-lightBlue underline-offset-4 hover:underline transition-colors"
      >
        {phrase}
      </Link>
      {parts.slice(1).join(phrase)}
    </>
  )
}

function MultiLinkedText({
  text,
  links,
}: {
  text: string
  links: { phrase: string; href: string }[]
}) {
  type Segment = { type: "text"; value: string } | { type: "link"; phrase: string; href: string }
  let segments: Segment[] = [{ type: "text", value: text }]

  for (const link of links) {
    const next: Segment[] = []
    for (const seg of segments) {
      if (seg.type === "link") {
        next.push(seg)
        continue
      }
      const parts = seg.value.split(link.phrase)
      parts.forEach((part, i) => {
        if (part) next.push({ type: "text", value: part })
        if (i < parts.length - 1) {
          next.push({ type: "link", phrase: link.phrase, href: link.href })
        }
      })
    }
    segments = next
  }

  return (
    <>
      {segments.map((seg, i) =>
        seg.type === "text" ? (
          <span key={i}>{seg.value}</span>
        ) : (
          <Link
            key={i}
            href={seg.href}
            className="text-finova-cyan hover:text-finova-lightBlue underline-offset-4 hover:underline transition-colors"
          >
            {seg.phrase}
          </Link>
        )
      )}
    </>
  )
}

function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-finova-cyan/10 via-finova-midnight to-finova-midnight pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[48%] lg:w-[45%] opacity-60 md:opacity-95"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 68% at 52% 48%, #000 32%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse 72% 68% at 52% 48%, #000 32%, transparent 78%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none md:pointer-events-auto">
          <WorkflowEngineCanvas />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight text-white leading-[1.1]"
        >
          {workflowHero.h1}
        </motion.h1>

        <div className="mt-8 max-w-2xl space-y-5">
          {workflowHero.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.1 }}
              className="text-base md:text-lg text-white/65 font-light leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex w-full justify-center sm:justify-start"
        >
          <DualCtas
            primaryLabel={workflowHero.primaryCta}
            secondaryLabel={workflowHero.secondaryCta}
            micro={workflowHero.primaryMicro}
          />
        </motion.div>
      </div>
    </section>
  )
}

function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [hotBreak, setHotBreak] = useState(0)
  const ease = [0.16, 1, 0.3, 1] as const
  const breakAccents = [
    { bar: "from-finova-cyan to-finova-lightBlue", text: "text-finova-cyan", glow: "bg-finova-cyan/20" },
    { bar: "from-finova-magenta to-finova-purple", text: "text-finova-magenta", glow: "bg-finova-magenta/20" },
    { bar: "from-finova-purple to-finova-cyan", text: "text-finova-lightBlue", glow: "bg-finova-purple/20" },
  ] as const

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setHotBreak((n) => (n + 1) % workflowProblem.breaks.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-problem-y]", {
        y: 32,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.from("[data-split-bar]", {
        scaleX: 0,
        duration: 1.1,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_20%,rgba(217,70,239,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_70%,rgba(14,165,233,0.1),transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header band */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-end">
          <div data-problem-y className="lg:col-span-5">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              {workflowProblem.heading}
            </h2>
          </div>
          <p
            data-problem-y
            className="lg:col-span-7 text-base font-light leading-relaxed text-white/60 md:text-lg"
          >
            {workflowProblem.paragraphs[0]}
          </p>
        </div>

        {/* Fracture points */}
        <div
          data-problem-y
          className="mt-14 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-4"
          onMouseLeave={() => setHotBreak(0)}
        >
          {workflowProblem.breaks.map((item, i) => {
            const accent = breakAccents[i]
            const active = hotBreak === i
            return (
              <button
                key={item.label}
                type="button"
                onMouseEnter={() => setHotBreak(i)}
                onFocus={() => setHotBreak(i)}
                className={`group relative overflow-hidden rounded-2xl border px-5 py-6 text-left transition-all duration-500 md:px-6 md:py-7 ${
                  active
                    ? "border-white/25 bg-white/[0.06]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/18"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500 ${accent.glow} ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b ${accent.bar} transition-opacity duration-500 ${
                    active ? "opacity-100" : "opacity-40"
                  }`}
                />
                <span className="mb-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.2em] ${accent.text} transition-transform duration-500 ${
                      active ? "translate-x-0" : "translate-x-0 opacity-70"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
                <p className="relative text-[15px] font-light leading-relaxed text-white/70 md:text-base">
                  <span className="text-white/90">{item.lead}</span>{" "}
                  {item.detail}
                </p>
              </button>
            )
          })}
        </div>

        {/* 20 / 80 split */}
        <div data-problem-y className="mt-10 md:mt-14">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div className="flex max-w-[42%] flex-col gap-1">
              <span className="text-4xl font-bold tracking-tight text-white/35 md:text-5xl">20%</span>
              <span className="text-xs font-light leading-snug text-white/40 md:text-[13px]">
                simplest twenty percent
              </span>
            </div>
            <div className="flex max-w-[50%] flex-col items-end gap-1 text-right">
              <span className="bg-gradient-to-r from-finova-magenta to-finova-cyan bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                80%
              </span>
              <span className="text-xs font-light leading-snug text-white/45 md:text-[13px]">
                expensive eighty percent
              </span>
            </div>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              data-split-bar
              className="absolute inset-y-0 left-0 flex w-full origin-left"
            >
              <div className="h-full w-[20%] bg-white/25" />
              <div className="h-full w-[80%] bg-gradient-to-r from-finova-magenta via-finova-purple to-finova-cyan" />
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-white/55 md:text-lg">
            {workflowProblem.split}
          </p>
        </div>

        {/* Agent contrast */}
        <motion.div
          data-problem-y
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-finova-cyan/25 md:mt-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-finova-cyan/10 via-transparent to-finova-magenta/10" />
          <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-finova-cyan/20 blur-3xl" />
          <div className="relative flex gap-5 p-7 md:gap-8 md:p-10 lg:p-12">
            <span
              aria-hidden
              className="mt-1 hidden h-auto w-[3px] shrink-0 rounded-full bg-gradient-to-b from-finova-cyan via-finova-lightBlue to-finova-magenta sm:block"
            />
            <p className="text-base font-light leading-relaxed text-white/70 md:text-lg">
              {workflowProblem.paragraphs[2]}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function WhatWeRun() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12 max-w-2xl"
        >
          {workflowRunsHeading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {workflowRuns.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 overflow-hidden hover:border-finova-cyan/30 transition-colors"
              >
                <div
                  className={`absolute -top-20 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${item.accent} opacity-[0.08] blur-3xl pointer-events-none`}
                />
                <div className="relative z-10">
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-[15px] font-light leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItRuns() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [active, setActive] = useState(0)
  const ease = [0.16, 1, 0.3, 1] as const
  const accents = [
    { ring: "border-finova-cyan/50", glow: "bg-finova-cyan", text: "text-finova-cyan", line: "from-finova-cyan to-finova-lightBlue" },
    { ring: "border-finova-magenta/50", glow: "bg-finova-magenta", text: "text-finova-magenta", line: "from-finova-magenta to-finova-purple" },
    { ring: "border-finova-purple/50", glow: "bg-finova-purple", text: "text-finova-lightBlue", line: "from-finova-purple to-finova-cyan" },
    { ring: "border-finova-lightBlue/50", glow: "bg-finova-lightBlue", text: "text-finova-lightBlue", line: "from-finova-lightBlue to-finova-cyan" },
  ] as const

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % workflowHow.stages.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-how-y]", {
        y: 28,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const stage = workflowHow.stages[active]
  const accent = accents[active]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-finova-cyan/[0.05] via-transparent to-finova-magenta/[0.05]" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-finova-cyan/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-how-y className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            {workflowHow.heading}
          </h2>
        </div>

        {/* Desktop: stage rail + focused body */}
        <div
          data-how-y
          className="mt-12 hidden gap-12 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,15rem)_1fr] lg:items-start lg:gap-16"
        >
          <ol className="relative flex flex-col gap-0">
            <span
              aria-hidden
              className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-white/10"
            />
            {workflowHow.stages.map((s, i) => {
              const a = accents[i]
              const isActive = active === i
              return (
                <li key={s.verb} className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group relative flex w-full items-center gap-4 py-4 text-left transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-[#070d22] font-mono text-[11px] transition-all duration-300 ${
                        isActive
                          ? `${a.ring} ${a.text} shadow-[0_0_24px_rgba(14,165,233,0.25)]`
                          : "border-white/15 text-white/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                      {isActive ? (
                        <span
                          aria-hidden
                          className={`absolute inset-0 rounded-full ${a.glow} opacity-20 blur-md`}
                        />
                      ) : null}
                    </span>
                    <span
                      className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
                        isActive ? a.text : ""
                      }`}
                    >
                      {s.verb}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="relative min-h-[16rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070d22]/85 p-9 backdrop-blur-md lg:p-11">
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.line}`}
            />
            <div
              aria-hidden
              className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-30 transition-colors duration-500 ${accent.glow}`}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.verb}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className={`mb-5 font-mono text-[11px] uppercase tracking-[0.24em] ${accent.text}`}>
                  {String(active + 1).padStart(2, "0")} — {stage.verb}
                </p>
                <p className="max-w-2xl text-lg font-light leading-relaxed text-white/75 md:text-xl md:leading-relaxed">
                  {stage.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-2">
              {workflowHow.stages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Stage ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i === active
                      ? `bg-gradient-to-r ${accents[i].line}`
                      : i < active
                        ? "bg-white/30"
                        : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: stacked timeline */}
        <ol data-how-y className="mt-12 space-y-0 lg:hidden">
          {workflowHow.stages.map((s, i) => {
            const a = accents[i]
            return (
              <li key={s.verb} className="relative flex gap-4 pb-10 last:pb-0">
                {i < workflowHow.stages.length - 1 ? (
                  <span
                    aria-hidden
                    className={`absolute bottom-0 left-[1.15rem] top-9 w-px bg-gradient-to-b ${a.line} opacity-40`}
                  />
                ) : null}
                <span
                  className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-[#070d22] font-mono text-[11px] ${a.ring} ${a.text}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 pt-1">
                  <p className={`mb-2 text-base font-semibold tracking-tight ${a.text}`}>
                    {s.verb}
                  </p>
                  <p className="text-[15px] font-light leading-relaxed text-white/65">
                    {s.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        <motion.div
          data-how-y
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-12 flex items-center gap-3 border-t border-white/10 pt-8 md:mt-16"
        >
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/55">
            <LinkedPhrase
              text={workflowHow.coda}
              phrase={workflowHow.howItWorksAnchor}
              href={workflowHow.howItWorksHref}
            />
          </p>
          <ArrowRight className="h-4 w-4 text-finova-cyan" aria-hidden />
        </motion.div>
      </div>
    </section>
  )
}

function Proof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6"
        >
          {workflowProof.heading}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10"
        >
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-8">
            <Link
              href={workflowProof.customersHref}
              className="text-finova-cyan hover:text-finova-lightBlue transition-colors font-medium"
            >
              Sirius Solutions Global
            </Link>
            {workflowProof.body.replace("Sirius Solutions Global", "")}
          </p>
          <blockquote className="border-l-2 border-finova-cyan/50 pl-5 md:pl-6">
            <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed italic">
              &ldquo;{workflowProof.quote}&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/45 font-light not-italic">
              — {workflowProof.attribution}
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

function Governance() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [focus, setFocus] = useState(0)

  const focusAccents = [
    "text-finova-cyan border-finova-cyan/40 bg-finova-cyan/10",
    "text-finova-lightBlue border-finova-lightBlue/40 bg-finova-lightBlue/10",
    "text-finova-magenta border-finova-magenta/40 bg-finova-magenta/10",
  ] as const

  const highlightClass = [
    "text-finova-cyan underline decoration-finova-cyan/50 underline-offset-4",
    "text-finova-lightBlue underline decoration-finova-lightBlue/50 underline-offset-4",
    "text-finova-magenta underline decoration-finova-magenta/50 underline-offset-4",
  ] as const

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setFocus((n) => (n + 1) % workflowGovernance.loop.length)
    }, 3400)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-gov-y]", {
        y: 28,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  function highlightQuality(text: string, activeWord: string, activeIndex: number) {
    const parts = text.split(activeWord)
    if (parts.length < 2) {
      return (
        <MultiLinkedText
          text={text}
          links={[{ phrase: "QualiCore", href: "/solutions/ai-quality-assurance" }]}
        />
      )
    }
    return (
      <>
        <MultiLinkedText
          text={parts[0]}
          links={[{ phrase: "QualiCore", href: "/solutions/ai-quality-assurance" }]}
        />
        <motion.span
          key={activeWord}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className={`font-medium ${highlightClass[activeIndex]}`}
        >
          {activeWord}
        </motion.span>
        {parts.slice(1).join(activeWord)}
      </>
    )
  }

  const activeWord = workflowGovernance.loop[focus].word

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-gov-y>
          <h2 className="whitespace-nowrap text-[1.35rem] font-bold tracking-tight text-white leading-[1.15] sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            {workflowGovernance.heading}
          </h2>
        </div>

        <div
          data-gov-y
          className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:mt-14 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-12 md:pt-12 lg:gap-16"
        >
          <div
            className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-3"
            role="tablist"
            aria-label="Governance loop"
          >
            {workflowGovernance.loop.map((beat, i) => {
              const active = focus === i
              return (
                <button
                  key={beat.word}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onMouseEnter={() => setFocus(i)}
                  onFocus={() => setFocus(i)}
                  onClick={() => setFocus(i)}
                  className={`rounded-full border px-4 py-2 text-left text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 md:w-full md:rounded-xl md:px-4 md:py-3.5 ${
                    active
                      ? focusAccents[i]
                      : "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/70"
                  }`}
                >
                  {beat.word}
                </button>
              )
            })}
          </div>

          <div className="relative md:border-l md:border-white/10 md:pl-8 lg:pl-10">
            <span
              aria-hidden
              className={`absolute left-0 top-0 hidden h-16 w-[2px] rounded-full transition-colors duration-500 md:block ${
                focus === 0
                  ? "bg-finova-cyan"
                  : focus === 1
                    ? "bg-finova-lightBlue"
                    : "bg-finova-magenta"
              }`}
            />
            <p className="text-base font-light leading-relaxed text-white/65 md:text-lg lg:text-xl lg:leading-relaxed">
              {highlightQuality(workflowGovernance.quality, activeWord, focus)}
            </p>
          </div>
        </div>

        <div data-gov-y className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          <div className="relative overflow-hidden rounded-2xl border border-finova-magenta/25 bg-gradient-to-br from-finova-magenta/[0.12] via-finova-magenta/[0.04] to-transparent p-6 md:p-8">
            <div
              aria-hidden
              className="mb-5 h-px w-12 bg-gradient-to-r from-finova-magenta to-transparent"
            />
            <p className="text-base font-medium leading-relaxed text-white/85 md:text-lg">
              {workflowGovernance.drift}
            </p>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div>
              <div
                aria-hidden
                className="mb-5 h-px w-12 bg-gradient-to-r from-finova-cyan to-transparent"
              />
              <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                {workflowGovernance.data}
              </p>
            </div>
            <p className="mt-8 inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white/50">
              <MultiLinkedText
                text={workflowGovernance.coda}
                links={[
                  {
                    phrase: workflowGovernance.trustAnchor,
                    href: workflowGovernance.trustHref,
                  },
                ]}
              />
              <ArrowRight className="h-4 w-4 text-finova-cyan" aria-hidden />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Audience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6"
        >
          {workflowAudience.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/65 text-base md:text-lg font-light leading-relaxed"
        >
          {workflowAudience.body}
        </motion.p>
      </div>
    </section>
  )
}

function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10"
        >
          Questions operators ask
        </motion.h2>
        <div>
          {workflowFaqs.map((faq, i) => {
            const isActive = active === i
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06 }}
                className="relative group cursor-pointer mb-4"
                onClick={() => setActive(isActive ? -1 : i)}
              >
                <div
                  className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${faqColors[i % faqColors.length]} opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-[1px]`}
                />
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 md:px-6 md:py-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base md:text-lg font-semibold text-white pr-2">
                      {faq.question}
                    </h3>
                    <span
                      className={`mt-1 shrink-0 transition-transform duration-300 ${isActive ? "rotate-45" : ""}`}
                    >
                      <Plus className="w-5 h-5 text-finova-cyan" />
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/60 text-sm md:text-base font-light leading-relaxed mt-3 pb-1">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FinalBand() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-purple/15 via-finova-midnight to-finova-midnight pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5"
        >
          {workflowFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {workflowFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas
            primaryLabel={workflowFinal.primaryCta}
            secondaryLabel={workflowFinal.secondaryCta}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3"
        >
          {workflowSiblings.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-white/55 hover:text-white hover:border-finova-cyan/40 transition-colors"
            >
              {s.name}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function WorkflowAutomationPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Problem />
      <WhatWeRun />
      <HowItRuns />
      <Proof />
      <Governance />
      <Audience />
      <Faq />
      <FinalBand />
    </main>
  )
}
