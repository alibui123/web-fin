"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronRight, Plus, Play } from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  agentDevAudience,
  agentDevFaqs,
  agentDevFinal,
  agentDevGovernance,
  agentDevHero,
  agentDevHow,
  agentDevOptions,
  agentDevOptionsHeading,
  agentDevOptionsIntro,
  agentDevProblem,
  agentDevProof,
  agentDevRuns,
  agentDevRunsHeading,
  agentDevSiblings,
} from "@/lib/ai-agent-development"

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
  secondaryHref,
  micro,
  className = "",
}: {
  primaryLabel: string
  secondaryLabel: string
  secondaryHref: string
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
          href={secondaryHref}
          className="group inline-flex h-[52px] items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.03] px-8 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10 backdrop-blur-sm"
        >
          <Play className="h-4 w-4 text-finova-cyan fill-finova-cyan/30" />
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
          AI agent development
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
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const ease = [0.16, 1, 0.3, 1] as const

  // Exact words from hero copy — layout only
  const signal = [
    { word: "demo", state: "idle" as const },
    { word: "production", state: "live" as const },
    { word: "run", state: "live" as const },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-[min(100vh,56rem)] overflow-hidden border-b border-white/5 pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_0%,rgba(14,165,233,0.16),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_90%_40%,rgba(217,70,239,0.14),transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)",
          backgroundSize: "3.5rem 3.5rem",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[28vh] w-full bg-gradient-to-t from-finova-midnight to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <Breadcrumb />

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="max-w-3xl text-4xl font-bold tracking-tight text-white leading-[1.08] sm:text-5xl md:text-[3.25rem] lg:text-[3.4rem]"
          >
            AI agents,
            <br />
            <span className="bg-gradient-to-r from-white via-finova-lightBlue to-finova-cyan bg-clip-text text-transparent">
              built for production and run by us.
            </span>
          </motion.h1>

          <div className="mt-8 max-w-2xl space-y-5">
            {agentDevHero.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12 + i * 0.1, ease }}
                className="text-base font-light leading-relaxed text-white/65 md:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.35, ease }}
            className="mt-10 flex w-full justify-center sm:justify-start"
          >
            <DualCtas
              primaryLabel={agentDevHero.primaryCta}
              secondaryLabel={agentDevHero.secondaryCta}
              secondaryHref={agentDevHero.secondaryHref}
              micro={agentDevHero.primaryMicro}
            />
          </motion.div>
        </div>

        {/* Production signal — CSS visual only */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.2, ease }}
          className="relative hidden lg:col-span-5 lg:block"
          aria-hidden
        >
          <div className="relative mx-auto aspect-square max-w-[26rem]">
            {/* Orbit rings */}
            <div className="absolute inset-[8%] rounded-full border border-white/10" />
            <div className="absolute inset-[18%] animate-[spin_28s_linear_infinite] rounded-full border border-dashed border-finova-cyan/25" />
            <div className="absolute inset-[30%] rounded-full border border-finova-magenta/20" />

            {/* Core */}
            <div className="absolute inset-[38%] flex items-center justify-center rounded-full border border-finova-cyan/40 bg-gradient-to-br from-finova-cyan/20 via-[#0b1228] to-finova-magenta/20 shadow-[0_0_60px_rgba(14,165,233,0.25)]">
              <div className="h-3 w-3 rounded-full bg-finova-cyan shadow-[0_0_20px_rgba(14,165,233,0.9)]" />
            </div>

            {/* Floating status card */}
            <div className="absolute inset-x-6 bottom-6 overflow-hidden rounded-2xl border border-white/10 bg-[#070d22]/90 p-5 backdrop-blur-md shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                  production
                </span>
                <span className="relative flex h-2 w-2" title="production">
                  <span className="absolute inset-0 animate-ping rounded-full bg-finova-cyan opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-finova-cyan" />
                </span>
              </div>
              <ul className="space-y-2.5">
                {signal.map((row) => (
                  <li
                    key={row.word}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm ${
                      row.state === "live"
                        ? "border-finova-cyan/25 bg-finova-cyan/[0.07] text-white"
                        : "border-white/5 bg-white/[0.02] text-white/30 line-through decoration-white/25"
                    }`}
                  >
                    <span className="capitalize tracking-wide">{row.word}</span>
                    {row.state === "live" ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-finova-cyan" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[12px] font-light leading-relaxed text-white/45">
                Keeping it working in production is the actual service.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [hot, setHot] = useState(0)
  const ease = [0.16, 1, 0.3, 1] as const
  const accents = [
    {
      text: "text-finova-cyan",
      bar: "from-finova-cyan to-finova-lightBlue",
      glow: "bg-finova-cyan/20",
      border: "border-finova-cyan/35",
    },
    {
      text: "text-finova-magenta",
      bar: "from-finova-magenta to-finova-purple",
      glow: "bg-finova-magenta/20",
      border: "border-finova-magenta/35",
    },
    {
      text: "text-finova-lightBlue",
      bar: "from-finova-lightBlue to-finova-cyan",
      glow: "bg-finova-lightBlue/20",
      border: "border-finova-lightBlue/35",
    },
    {
      text: "text-finova-cyan",
      bar: "from-finova-purple to-finova-magenta",
      glow: "bg-finova-magenta/15",
      border: "border-white/20",
    },
  ] as const

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setHot((n) => (n + 1) % agentDevProblem.gaps.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-agent-problem-y]", {
        y: 32,
        duration: 0.85,
        stagger: 0.1,
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
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_85%_10%,rgba(217,70,239,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(14,165,233,0.1),transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-agent-problem-y className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.12]">
            {agentDevProblem.heading}
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-white/60 md:mt-8 md:text-lg">
            {agentDevProblem.lead}
          </p>
        </div>

        {/* demo → gap → production bridge */}
        <div
          data-agent-problem-y
          className="mt-10 flex flex-nowrap items-center gap-1.5 sm:gap-3 md:mt-14 md:gap-4"
          aria-hidden
        >
          <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35 line-through decoration-white/25 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]">
            demo
          </span>
          <span className="h-px min-w-[0.75rem] flex-1 bg-gradient-to-r from-white/20 via-finova-magenta/50 to-finova-cyan/40 sm:min-w-[2rem] md:min-w-[4rem]" />
          <span className="shrink-0 whitespace-nowrap rounded-full border border-finova-magenta/40 bg-finova-magenta/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-finova-magenta sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]">
            the gap
          </span>
          <span className="h-px min-w-[0.75rem] flex-1 bg-gradient-to-r from-finova-magenta/40 via-finova-cyan/50 to-finova-cyan/30 sm:min-w-[2rem] md:min-w-[4rem]" />
          <span className="shrink-0 whitespace-nowrap rounded-full border border-finova-cyan/40 bg-finova-cyan/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-finova-cyan sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]">
            production
          </span>
        </div>

        <p
          data-agent-problem-y
          className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-white/70 md:mt-10 md:text-lg"
        >
          {agentDevProblem.gapLead}
        </p>

        {/* Gap work */}
        <div
          data-agent-problem-y
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          onMouseLeave={() => setHot(0)}
        >
          {agentDevProblem.gaps.map((item, i) => {
            const accent = accents[i]
            const active = hot === i
            return (
              <button
                key={item.verb}
                type="button"
                onMouseEnter={() => setHot(i)}
                onFocus={() => setHot(i)}
                className={`group relative overflow-hidden rounded-2xl border px-5 py-6 text-left transition-all duration-500 md:min-h-[13rem] md:px-5 md:py-7 ${
                  active
                    ? `${accent.border} bg-white/[0.06]`
                    : "border-white/10 bg-white/[0.02] hover:border-white/18"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500 ${accent.glow} ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.bar} transition-opacity duration-500 ${
                    active ? "opacity-100" : "opacity-30"
                  }`}
                />
                <span className={`mb-4 block text-sm font-bold uppercase tracking-[0.18em] ${accent.text}`}>
                  {item.verb}
                </span>
                <p className="relative text-[14px] font-light leading-relaxed text-white/65 md:text-[15px]">
                  {item.body}
                </p>
              </button>
            )
          })}
        </div>

        {/* Punch */}
        <motion.div
          data-agent-problem-y
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="relative mt-8 overflow-hidden rounded-2xl border border-finova-magenta/30 bg-finova-magenta/[0.07] px-6 py-5 md:mt-10 md:px-8 md:py-6"
        >
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-finova-magenta to-finova-purple"
          />
          <p className="pl-3 text-base font-medium leading-relaxed text-white/85 md:text-lg">
            {agentDevProblem.punch}
          </p>
        </motion.div>

        {/* Close */}
        <div
          data-agent-problem-y
          className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-finova-cyan/25 md:mt-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-finova-cyan/10 via-transparent to-finova-magenta/10" />
          <div className="relative flex gap-5 p-6 md:gap-8 md:p-9 lg:p-10">
            <span
              aria-hidden
              className="mt-1 hidden w-[3px] shrink-0 rounded-full bg-gradient-to-b from-finova-cyan via-finova-lightBlue to-finova-magenta sm:block"
            />
            <p className="text-base font-light leading-relaxed text-white/70 md:text-lg">
              {agentDevProblem.close}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatWeBuild() {
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
          {agentDevRunsHeading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {agentDevRuns.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 overflow-hidden hover:border-finova-cyan/30 transition-colors"
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 border-b border-white/5 bg-gradient-to-r from-finova-cyan/[0.04] via-transparent to-finova-magenta/[0.04]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6"
        >
          {agentDevHow.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/65 text-base md:text-lg font-light leading-relaxed"
        >
          <LinkedPhrase
            text={agentDevHow.body}
            phrase={agentDevHow.howItWorksAnchor}
            href={agentDevHow.howItWorksHref}
          />
        </motion.p>
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
          {agentDevProof.heading}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10"
        >
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-5">
            <Link
              href={agentDevProof.customersHref}
              className="text-finova-cyan hover:text-finova-lightBlue transition-colors font-medium"
            >
              Advanzatech
            </Link>
            {agentDevProof.body.replace("Advanzatech", "")}
          </p>
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-8">
            {agentDevProof.bodyStats}
          </p>
          <blockquote className="border-l-2 border-finova-cyan/50 pl-5 md:pl-6">
            <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed italic">
              &ldquo;{agentDevProof.quote}&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/45 font-light not-italic">
              — {agentDevProof.attribution}
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

function Options() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-4 whitespace-nowrap text-[1.15rem] font-bold tracking-tight text-white leading-[1.2] sm:text-2xl md:text-3xl lg:text-4xl"
        >
          {agentDevOptionsHeading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="text-white/55 text-base md:text-lg font-light leading-relaxed mb-10 max-w-3xl"
        >
          {agentDevOptionsIntro}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {agentDevOptions.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.lead}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                className={`rounded-2xl border p-6 md:p-7 ${
                  i === 2
                    ? "border-finova-cyan/40 bg-finova-cyan/[0.06]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-4 ${i === 2 ? "text-finova-cyan" : "text-white/50"}`}
                />
                <p className="text-white/70 text-sm md:text-[15px] font-light leading-relaxed">
                  <span className="font-semibold text-white">{item.lead}</span>
                  {item.body.slice(item.lead.length)}
                </p>
              </motion.article>
            )
          })}
        </div>
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
      setFocus((n) => (n + 1) % agentDevGovernance.loop.length)
    }, 3400)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-agent-gov-y]", {
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

  const activeWord = agentDevGovernance.loop[focus].word

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_0%,rgba(14,165,233,0.11),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-agent-gov-y className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            {agentDevGovernance.heading}
          </h2>
        </div>

        {/* QualiCore — word rail + highlighted body */}
        <div
          data-agent-gov-y
          className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:mt-14 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-12 md:pt-12 lg:gap-16"
        >
          <div
            className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-3"
            role="tablist"
            aria-label="Governance loop"
          >
            {agentDevGovernance.loop.map((beat, i) => {
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
              {highlightQuality(agentDevGovernance.quality, activeWord, focus)}
            </p>
          </div>
        </div>

        {/* Bounds + data */}
        <div data-agent-gov-y className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          <div className="relative overflow-hidden rounded-2xl border border-finova-cyan/25 bg-gradient-to-br from-finova-cyan/[0.12] via-finova-cyan/[0.04] to-transparent p-6 md:p-8">
            <div
              aria-hidden
              className="mb-5 h-px w-12 bg-gradient-to-r from-finova-cyan to-transparent"
            />
            <p className="text-base font-medium leading-relaxed text-white/85 md:text-lg">
              {agentDevGovernance.bounds}
            </p>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div>
              <div
                aria-hidden
                className="mb-5 h-px w-12 bg-gradient-to-r from-finova-magenta to-transparent"
              />
              <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                {agentDevGovernance.data}
              </p>
            </div>
            <p className="mt-8 inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white/50">
              <MultiLinkedText
                text={agentDevGovernance.coda}
                links={[
                  {
                    phrase: agentDevGovernance.trustAnchor,
                    href: agentDevGovernance.trustHref,
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
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-agent-audience-y]", {
        y: 28,
        duration: 0.8,
        stagger: 0.12,
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
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          data-agent-audience-y
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem]"
        >
          {agentDevAudience.heading}
        </h2>

        {/* Stacked polarity — fit above, weaker inset below */}
        <div data-agent-audience-y className="relative mt-10 md:mt-14">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-finova-cyan/30 bg-gradient-to-br from-finova-cyan/[0.12] via-[#070d22]/80 to-finova-magenta/[0.06] p-7 md:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-finova-cyan/20 blur-3xl" />
            <div
              aria-hidden
              className="mb-6 h-[2px] w-16 bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-transparent"
            />
            <p className="relative max-w-3xl text-base font-light leading-relaxed text-white/75 md:text-lg lg:text-xl lg:leading-relaxed">
              {agentDevAudience.fit}
            </p>
          </div>

          <div className="relative mx-auto mt-4 max-w-4xl md:-mt-6 md:ml-auto md:mr-8 md:w-[88%]">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-finova-midnight/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-8">
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-white/30 via-white/10 to-transparent"
              />
              <p className="pl-3 text-base font-light leading-relaxed text-white/50 md:pl-4 md:text-lg">
                {agentDevAudience.weaker}
              </p>
            </div>
          </div>
        </div>
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
          {agentDevFaqs.map((faq, i) => {
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
          {agentDevFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {agentDevFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas
            primaryLabel={agentDevFinal.primaryCta}
            secondaryLabel={agentDevFinal.secondaryCta}
            secondaryHref={agentDevFinal.secondaryHref}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3"
        >
          {agentDevSiblings.map((s) => (
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

export default function AgentDevPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Problem />
      <WhatWeBuild />
      <HowItRuns />
      <Proof />
      <Options />
      <Governance />
      <Audience />
      <Faq />
      <FinalBand />
    </main>
  )
}
