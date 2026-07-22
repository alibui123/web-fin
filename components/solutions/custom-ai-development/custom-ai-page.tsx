"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronRight, Plus } from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  customAiAudience,
  customAiBuilds,
  customAiBuildsClose,
  customAiBuildsHeading,
  customAiDiff,
  customAiFaqs,
  customAiFinal,
  customAiGovernance,
  customAiHero,
  customAiHow,
  customAiProblem,
  customAiProof,
  customAiSiblings,
} from "@/lib/custom-ai-development"

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
      className="group relative inline-flex shrink-0"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-full bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-magenta opacity-70 blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-finova-cyan/35 to-finova-magenta/35 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
      />

      <span className="relative inline-flex h-[52px] shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-white px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors duration-300 group-hover:bg-[#0b1228] group-hover:text-white active:bg-[#0b1228] active:text-white sm:gap-2.5 sm:px-8 sm:text-sm sm:tracking-[0.15em]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative whitespace-nowrap">{label}</span>
        <ArrowRight className="relative h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
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
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4">
        <BookCallButton label={primaryLabel} />
        <Link
          href={secondaryHref}
          className="inline-flex h-[52px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.03] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10 backdrop-blur-sm sm:px-8 sm:text-sm sm:tracking-[0.15em]"
        >
          {secondaryLabel}
        </Link>
      </div>
      {micro ? (
        <p className="max-w-sm text-center text-xs font-light leading-relaxed text-white/45 sm:text-[13px]">
          {micro}
        </p>
      ) : null}
    </div>
  )
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
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
          Custom AI development
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
            className="text-finova-cyan hover:text-finova-lightBlue underline-offset-4 hover:underline transition-colors font-medium"
          >
            {seg.phrase}
          </Link>
        )
      )}
    </>
  )
}

/** Ambient labels taken from the hero copy itself */
const HERO_SIGNAL = ["Voice", "Vision", "Language", "Software"] as const

function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-finova-midnight" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_20%,rgba(217,70,239,0.14),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_80%,rgba(14,165,233,0.12),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
        <Breadcrumb />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl xl:text-[3.35rem] font-bold tracking-tight text-white leading-[1.08]">
                {customAiHero.h1}
              </h1>
              <div className="mt-8 flex flex-wrap gap-2">
                {HERO_SIGNAL.map((label, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="text-[11px] uppercase tracking-[0.2em] text-finova-cyan/90 border border-finova-cyan/25 bg-finova-cyan/[0.06] px-3 py-1.5 rounded-full"
                  >
                    {label}
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <DualCtas
                  primaryLabel={customAiHero.primaryCta}
                  secondaryLabel={customAiHero.secondaryCta}
                  secondaryHref={customAiHero.secondaryHref}
                  micro={customAiHero.primaryMicro}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-0">
            {customAiHero.paragraphs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.12 }}
                className="relative pl-6 md:pl-8 py-6 md:py-8 border-l border-white/10 first:border-l-finova-magenta/50 last:pb-0"
              >
                <span
                  className={`absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full ${
                    i === 0 ? "bg-finova-magenta" : "bg-finova-cyan"
                  }`}
                />
                <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
                  {p}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
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
  ] as const

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setHot((n) => (n + 1) % customAiProblem.adapts.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-custom-gap-y]", {
        y: 32,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.from("[data-almost-fill]", {
        scaleX: 0,
        duration: 1.1,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
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
        <div data-custom-gap-y className="max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.15]">
            When the tool almost fits,
            <br />
            you pay for the gap forever
          </h2>
          <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-white/60 md:mt-8 md:text-lg">
            {customAiProblem.lead}
          </p>
        </div>

        {/* Almost-fit meter */}
        <div data-custom-gap-y className="mt-10 md:mt-14">
          <div className="mb-3 flex items-end justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              almost fits
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-finova-magenta/80">
              the gap
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
            <div data-almost-fill className="absolute inset-y-0 left-0 flex w-full origin-left">
              <div className="h-full w-[72%] bg-gradient-to-r from-white/20 to-white/10" />
              <div className="h-full w-[28%] bg-gradient-to-r from-finova-magenta via-finova-purple to-finova-cyan" />
            </div>
          </div>
        </div>

        {/* Adapt loop */}
        <div
          data-custom-gap-y
          className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-4"
          onMouseLeave={() => setHot(0)}
        >
          {customAiProblem.adapts.map((item, i) => {
            const accent = accents[i]
            const active = hot === i
            return (
              <button
                key={item.verb}
                type="button"
                onMouseEnter={() => setHot(i)}
                onFocus={() => setHot(i)}
                className={`group relative overflow-hidden rounded-2xl border px-5 py-6 text-left transition-all duration-500 md:px-6 md:py-7 ${
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
                <span className={`mb-4 block text-sm font-bold uppercase tracking-[0.2em] ${accent.text}`}>
                  {item.verb}
                </span>
                <p className="relative text-[15px] font-light leading-relaxed text-white/70 md:text-base">
                  {item.body}
                </p>
              </button>
            )
          })}
        </div>

        {/* Permanent tax */}
        <motion.div
          data-custom-gap-y
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.12, ease }}
          className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-finova-magenta/30 bg-gradient-to-br from-finova-magenta/[0.12] via-[#070d22]/80 to-transparent md:mt-12"
        >
          <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-finova-magenta/20 blur-3xl" />
          <div className="relative grid gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-9 lg:p-10">
            <div className="flex flex-col justify-center border-b border-white/10 pb-5 md:border-b-0 md:border-r md:border-white/10 md:pb-0 md:pr-10">
              <span className="text-3xl font-bold tracking-tight text-finova-magenta md:text-4xl">
                permanent tax
              </span>
              <span className="mt-2 max-w-[14rem] text-sm font-medium leading-snug text-white/70 md:text-base">
                paid in hours every week
              </span>
            </div>
            <p className="text-base font-light leading-relaxed text-white/65 md:text-lg">
              {customAiProblem.tax}
            </p>
          </div>
        </motion.div>

        {/* Close */}
        <div
          data-custom-gap-y
          className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-finova-cyan/25 md:mt-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-finova-cyan/10 via-transparent to-finova-magenta/10" />
          <div className="relative flex gap-5 p-6 md:gap-8 md:p-9 lg:p-10">
            <span
              aria-hidden
              className="mt-1 hidden w-[3px] shrink-0 rounded-full bg-gradient-to-b from-finova-cyan via-finova-lightBlue to-finova-magenta sm:block"
            />
            <p className="text-base font-light leading-relaxed text-white/70 md:text-lg">
              {customAiProblem.close}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatWeBuild() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [active, setActive] = useState(0)
  const current = customAiBuilds[active]
  const Icon = current.icon

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12 max-w-xl"
        >
          {customAiBuildsHeading}
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 min-h-[340px]">
          <div className="lg:col-span-4 flex flex-col gap-1">
            {customAiBuilds.map((item, i) => {
              const ItemIcon = item.icon
              const on = active === i
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative text-left px-4 py-4 transition-all duration-300 border-l-2 ${
                    on
                      ? "border-finova-cyan bg-finova-cyan/[0.07]"
                      : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ItemIcon
                      className={`w-4 h-4 shrink-0 ${on ? "text-finova-cyan" : "text-white/35"}`}
                    />
                    <span
                      className={`text-sm md:text-base font-semibold leading-snug ${
                        on ? "text-white" : "text-white/50 group-hover:text-white/75"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full rounded-none border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7 md:p-10 overflow-hidden"
              >
                <div
                  className={`absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br ${current.accent} opacity-[0.12] blur-3xl pointer-events-none`}
                />
                <div
                  className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${current.accent}`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="relative text-2xl md:text-3xl font-bold text-white tracking-tight mb-5">
                  {current.title}
                </h3>
                <p className="relative text-white/65 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="mt-12 pt-10 border-t border-white/10 max-w-4xl text-white/65 text-base md:text-lg font-light leading-relaxed"
        >
          {customAiBuildsClose}
        </motion.p>
      </div>
    </section>
  )
}

function HowItRuns() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-custom-how-y]", {
        y: 28,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const accents = [
    "text-finova-cyan",
    "text-finova-magenta",
    "text-finova-lightBlue",
  ] as const

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_15%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-finova-magenta/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Sticky statement */}
          <div data-custom-how-y className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.55rem] md:leading-[1.15]">
              How a custom build works,
              <br />
              <span className="text-white/90">without becoming a </span>
              <span className="text-white/35 line-through decoration-white/30">
                science project
              </span>
            </h2>

            <div className="mt-8 overflow-hidden rounded-2xl border border-finova-cyan/25 bg-gradient-to-br from-finova-cyan/[0.12] via-transparent to-finova-magenta/[0.08] p-6 md:mt-10 md:p-7">
              <p className="text-base font-medium leading-relaxed text-white/85 md:text-lg">
                You get a system that{" "}
                <span className="text-finova-cyan">keeps working</span>
                , not a{" "}
                <span className="text-white/40 line-through decoration-white/25">
                  proof of concept
                </span>{" "}
                that impressed once and then aged out.
              </p>
            </div>

            <p className="mt-7 inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white/50">
              <LinkedPhrase
                text={customAiHow.coda}
                phrase={customAiHow.howItWorksAnchor}
                href={customAiHow.howItWorksHref}
              />
              <ArrowRight className="h-4 w-4 text-finova-cyan" aria-hidden />
            </p>
          </div>

          {/* Cascade stages */}
          <ol data-custom-how-y className="lg:col-span-7">
            {customAiHow.stages.map((s, i) => (
              <li
                key={s.verb}
                className="group relative grid grid-cols-[3.5rem_1fr] gap-4 border-t border-white/10 py-7 first:border-t-0 first:pt-0 md:grid-cols-[4.5rem_1fr] md:gap-6 md:py-8"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`mt-2 text-lg font-semibold tracking-tight md:text-xl ${accents[i]}`}
                  >
                    {s.verb}
                  </span>
                </div>
                <p className="pt-5 text-base font-light leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/80 md:pt-6 md:text-lg">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [hot, setHot] = useState(0)
  const ease = [0.16, 1, 0.3, 1] as const
  const accents = [
    {
      text: "text-finova-cyan",
      bar: "from-finova-cyan to-finova-lightBlue",
      glow: "bg-finova-cyan/20",
      border: "border-finova-cyan/40",
    },
    {
      text: "text-finova-magenta",
      bar: "from-finova-magenta to-finova-purple",
      glow: "bg-finova-magenta/20",
      border: "border-finova-magenta/40",
    },
    {
      text: "text-finova-lightBlue",
      bar: "from-finova-lightBlue to-finova-cyan",
      glow: "bg-finova-lightBlue/20",
      border: "border-finova-lightBlue/40",
    },
  ] as const

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setHot((n) => (n + 1) % customAiProof.cases.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-custom-proof-y]", {
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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-finova-magenta/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-custom-proof-y className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
            The proof is that our systems
            <br />
            <span className="bg-gradient-to-r from-white via-finova-lightBlue to-finova-cyan bg-clip-text text-transparent">
              survive production
            </span>
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-white/60 md:mt-8 md:text-lg">
            {customAiProof.lead}
          </p>
        </div>

        {/* Three production cases */}
        <div
          data-custom-proof-y
          className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5"
          onMouseLeave={() => setHot(0)}
        >
          {customAiProof.cases.map((item, i) => {
            const accent = accents[i]
            const active = hot === i
            return (
              <article
                key={item.name}
                onMouseEnter={() => setHot(i)}
                className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-500 md:min-h-[20rem] md:p-7 ${
                  active
                    ? `${accent.border} bg-white/[0.06]`
                    : "border-white/10 bg-white/[0.02] hover:border-white/18"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 ${accent.glow} ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.bar} transition-opacity duration-500 ${
                    active ? "opacity-100" : "opacity-35"
                  }`}
                />

                <Link
                  href={item.href}
                  className={`relative mb-5 inline-flex items-center gap-2 text-base font-semibold tracking-tight transition-colors ${accent.text} hover:text-white`}
                >
                  {item.name}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <p className="relative flex-1 text-[15px] font-light leading-relaxed text-white/65 md:text-base">
                  {item.body}
                </p>
              </article>
            )
          })}
        </div>

        {/* Evidence close */}
        <motion.div
          data-custom-proof-y
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-finova-cyan/25 md:mt-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-finova-cyan/[0.1] via-transparent to-finova-magenta/[0.08]" />
          <div className="relative flex gap-5 p-6 md:gap-8 md:p-9">
            <span
              aria-hidden
              className="mt-1 hidden w-[3px] shrink-0 rounded-full bg-gradient-to-b from-finova-cyan via-finova-lightBlue to-finova-magenta sm:block"
            />
            <p className="text-base font-light leading-relaxed text-white/70 md:text-lg">
              <span className="font-medium text-white/90">
                Three different problems, three different builds, all live in production.
              </span>{" "}
              That is the evidence that matters for custom work, not a polished case study for a
              specific tool, but proof that what we build keeps working when it meets the real
              world.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Differentiation() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-diff]", {
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 border-b border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-finova-purple/[0.05] via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          data-diff
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 max-w-3xl"
        >
          {customAiDiff.heading}
        </h2>
        <p
          data-diff
          className="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-3xl"
        >
          {customAiDiff.paragraphs[0]}
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-white/10">
          <div data-diff className="bg-finova-midnight p-7 md:p-10">
            <div className="h-1 w-12 bg-white/25 mb-6" />
            <p className="text-white/60 text-base md:text-[17px] font-light leading-relaxed">
              {customAiDiff.paragraphs[1]}
            </p>
          </div>
          <div data-diff className="bg-finova-midnight p-7 md:p-10 relative">
            <div className="absolute inset-0 bg-finova-cyan/[0.04] pointer-events-none" />
            <div className="relative h-1 w-12 bg-gradient-to-r from-finova-cyan to-finova-magenta mb-6" />
            <p className="relative text-white/75 text-base md:text-[17px] font-light leading-relaxed">
              {customAiDiff.paragraphs[2]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function GovernanceAndAudience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-finova-cyan/10 to-transparent opacity-60 blur-2xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-5">
                {customAiGovernance.heading}
              </h2>
              <p className="text-white/65 text-base md:text-lg font-light leading-relaxed">
                <MultiLinkedText
                  text={customAiGovernance.body}
                  links={[
                    { phrase: "QualiCore", href: "/solutions/ai-quality-assurance" },
                    {
                      phrase: customAiGovernance.trustAnchor,
                      href: customAiGovernance.trustHref,
                    },
                  ]}
                />
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 }}
            className="lg:border-l lg:border-white/10 lg:pl-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-5">
              {customAiAudience.heading}
            </h2>
            <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-6">
              {customAiAudience.paragraphs[0]}
            </p>
            <div className="border-t border-dashed border-white/15 pt-6">
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
                {customAiAudience.paragraphs[1]}
              </p>
            </div>
          </motion.div>
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
          {customAiFaqs.map((faq, i) => {
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
                          {faq.question.includes("data") ? (
                            <LinkedPhrase
                              text={faq.answer}
                              phrase="trust page"
                              href="/trust"
                            />
                          ) : (
                            faq.answer
                          )}
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
          {customAiFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {customAiFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas
            primaryLabel={customAiFinal.primaryCta}
            secondaryLabel={customAiFinal.secondaryCta}
            secondaryHref={customAiFinal.secondaryHref}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3"
        >
          {customAiSiblings.map((s) => (
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

export default function CustomAiPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Problem />
      <WhatWeBuild />
      <HowItRuns />
      <Proof />
      <Differentiation />
      <GovernanceAndAudience />
      <Faq />
      <FinalBand />
    </main>
  )
}
