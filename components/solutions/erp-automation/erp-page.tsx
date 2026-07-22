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
  erpAudience,
  erpFaqs,
  erpFinal,
  erpGovernance,
  erpHero,
  erpHow,
  erpNotHeading,
  erpNotIntro,
  erpNotItems,
  erpProblem,
  erpProof,
  erpRuns,
  erpRunsHeading,
  erpSiblings,
} from "@/lib/erp-automation"

const LivingErpCanvas = dynamic(
  () => import("@/components/solutions/erp-automation/living-erp/HeroCanvas"),
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
          ERP automation
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
        className="font-medium text-finova-cyan underline-offset-4 transition-colors hover:text-finova-lightBlue hover:underline"
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
            className="font-medium text-finova-cyan underline-offset-4 transition-colors hover:text-finova-lightBlue hover:underline"
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-finova-magenta/10 via-finova-midnight to-finova-midnight pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[46%] lg:w-[40%] opacity-55 md:opacity-95"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 65% at 50% 45%, #000 28%, transparent 76%)",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 45%, #000 28%, transparent 76%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none md:pointer-events-auto">
          <LivingErpCanvas />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-4xl sm:text-5xl md:text-[3.15rem] font-bold tracking-tight text-white leading-[1.1]"
        >
          {erpHero.h1}
        </motion.h1>

        <div className="mt-8 max-w-2xl space-y-5">
          {erpHero.paragraphs.map((p, i) => (
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
            primaryLabel={erpHero.primaryCta}
            secondaryLabel={erpHero.secondaryCta}
            micro={erpHero.primaryMicro}
          />
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
      bar: "from-finova-purple to-finova-cyan",
      glow: "bg-finova-purple/20",
      border: "border-finova-lightBlue/35",
    },
  ] as const

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setHot((n) => (n + 1) % erpProblem.labors.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-erp-problem-y]", {
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_10%_15%,rgba(217,70,239,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_75%,rgba(14,165,233,0.1),transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-erp-problem-y className="max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.15]">
            The most expensive software you own
            <br />
            is running on manual labor
          </h2>
          <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-white/60 md:mt-8 md:text-lg">
            {erpProblem.lead}
          </p>
        </div>

        {/* Manual labor ledger */}
        <div
          data-erp-problem-y
          className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-4"
          onMouseLeave={() => setHot(0)}
        >
          {erpProblem.labors.map((item, i) => {
            const accent = accents[i]
            const active = hot === i
            return (
              <button
                key={item.verb}
                type="button"
                onMouseEnter={() => setHot(i)}
                onFocus={() => setHot(i)}
                className={`group relative overflow-hidden rounded-2xl border px-5 py-6 text-left transition-all duration-500 md:px-6 md:py-8 ${
                  active
                    ? `${accent.border} bg-white/[0.06]`
                    : "border-white/10 bg-white/[0.02] hover:border-white/18"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-500 ${accent.glow} ${
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

        {/* Gap — it waits */}
        <motion.div
          data-erp-problem-y
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.12, ease }}
          className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070d22]/70 md:mt-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-finova-magenta/[0.08] via-transparent to-finova-cyan/[0.06]" />
          <div className="relative grid gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-9 lg:p-10">
            <div className="flex flex-col justify-center border-b border-white/10 pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-10">
              <span className="text-4xl font-bold tracking-tight text-white/40 md:text-5xl">waits</span>
              <span className="mt-2 max-w-[10rem] text-xs font-light leading-snug text-white/55">
                The gap is that it waits
              </span>
            </div>
            <p className="text-base font-light leading-relaxed text-white/80 md:text-lg">
              {erpProblem.gap}
            </p>
          </div>
        </motion.div>

        {/* Agent remove waiting */}
        <div
          data-erp-problem-y
          className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-finova-cyan/25 md:mt-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-finova-cyan/10 via-transparent to-finova-magenta/10" />
          <div className="pointer-events-none absolute -left-16 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-finova-cyan/20 blur-3xl" />
          <div className="relative flex gap-5 p-6 md:gap-8 md:p-9 lg:p-10">
            <span
              aria-hidden
              className="mt-1 hidden w-[3px] shrink-0 rounded-full bg-gradient-to-b from-finova-cyan via-finova-lightBlue to-finova-magenta sm:block"
            />
            <p className="text-base font-light leading-relaxed text-white/70 md:text-lg">
              {erpProblem.agent}
            </p>
          </div>
        </div>
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
          {erpRunsHeading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {erpRuns.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 overflow-hidden hover:border-finova-magenta/30 transition-colors"
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-erp-how-y]", {
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
    "text-finova-cyan",
  ] as const

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-finova-magenta/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Sticky statement */}
          <div data-erp-how-y className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.15]">
              How it goes live,
              <br />
              without the year-long project
            </h2>

            <div className="mt-8 overflow-hidden rounded-2xl border border-finova-cyan/25 bg-gradient-to-br from-finova-cyan/[0.12] via-transparent to-finova-magenta/[0.08] p-6 md:mt-10 md:p-7">
              <p className="text-base font-medium leading-relaxed text-white/85 md:text-lg">
                You see value from{" "}
                <span className="text-finova-cyan">the first workflow</span>
                , not{" "}
                <span className="text-white/35 line-through decoration-white/30">
                  eighteen months
                </span>{" "}
                in.
              </p>
            </div>

            <p className="mt-7 inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white/50">
              <LinkedPhrase
                text={erpHow.coda}
                phrase={erpHow.howItWorksAnchor}
                href={erpHow.howItWorksHref}
              />
              <ArrowRight className="h-4 w-4 text-finova-cyan" aria-hidden />
            </p>
          </div>

          {/* Cascade stages — always visible */}
          <ol data-erp-how-y className="lg:col-span-7">
            {erpHow.stages.map((s, i) => (
              <li
                key={s.verb}
                className="group relative grid grid-cols-[auto_1fr] gap-4 border-t border-white/10 py-7 first:border-t-0 first:pt-0 md:gap-6 md:py-8"
              >
                <span
                  className={`pt-0.5 text-lg font-semibold tracking-tight md:text-xl ${accents[i]}`}
                >
                  {s.verb}
                </span>
                <p className="text-base font-light leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/80 md:text-lg">
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
          {erpProof.heading}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10"
        >
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-5">
            <Link
              href={erpProof.customersHref}
              className="text-finova-cyan hover:text-finova-lightBlue transition-colors font-medium"
            >
              Telecom Foundation
            </Link>
            {erpProof.body.replace("Telecom Foundation", "")}
          </p>
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-8">
            <LinkedPhrase
              text={erpProof.bodyClose}
              phrase="government operation"
              href={erpProof.governmentHref}
            />
          </p>
          <blockquote className="border-l-2 border-finova-magenta/50 pl-5 md:pl-6">
            <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed italic">
              &ldquo;{erpProof.quote}&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/45 font-light not-italic">
              — {erpProof.attribution}
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

function WhatThisIsNot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4"
        >
          {erpNotHeading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="text-white/55 text-base md:text-lg font-light leading-relaxed mb-10 max-w-3xl"
        >
          {erpNotIntro}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {erpNotItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <Icon className="w-5 h-5 text-finova-cyan mb-4" />
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm md:text-[15px] font-light leading-relaxed">
                  {item.body}
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
  const [paused, setPaused] = useState(false)
  const resumeTimer = useRef<number | null>(null)

  const accents = [
    {
      node: "border-finova-cyan bg-finova-cyan text-finova-midnight",
      glow: "bg-finova-cyan",
      label: "text-finova-cyan",
      line: "from-finova-cyan/60 to-finova-cyan/10",
    },
    {
      node: "border-finova-lightBlue bg-finova-lightBlue text-finova-midnight",
      glow: "bg-finova-lightBlue",
      label: "text-finova-lightBlue",
      line: "from-finova-lightBlue/60 to-finova-lightBlue/10",
    },
    {
      node: "border-finova-magenta bg-finova-magenta text-white",
      glow: "bg-finova-magenta",
      label: "text-finova-magenta",
      line: "from-finova-magenta/60 to-finova-magenta/10",
    },
  ] as const

  const selectPhase = (i: number) => {
    setFocus(i)
    setPaused(true)
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 10000)
  }

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!inView || paused) return
    const id = window.setInterval(() => {
      setFocus((n) => (n + 1) % erpGovernance.phases.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [inView, paused])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-erp-gov-y]", {
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

  const phase = erpGovernance.phases[focus]
  const accent = accents[focus]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_0%,rgba(14,165,233,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_90%_80%,rgba(217,70,239,0.1),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-erp-gov-y className="border-b border-white/10 pb-10 md:pb-12">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.1]">
            {erpGovernance.heading}
          </h2>
        </div>

        {/* Control spine + focused phase */}
        <div
          data-erp-gov-y
          className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-16"
        >
          <ol className="relative flex flex-row gap-2 lg:flex-col lg:gap-0" role="tablist" aria-label="Governance phases">
            <span
              aria-hidden
              className="absolute bottom-4 left-[1.15rem] top-4 hidden w-px bg-white/10 lg:block"
            />
            {erpGovernance.phases.map((p, i) => {
              const a = accents[i]
              const active = focus === i
              return (
                <li key={p.label} className="relative flex-1 lg:flex-none">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onMouseEnter={() => selectPhase(i)}
                    onFocus={() => selectPhase(i)}
                    onClick={() => selectPhase(i)}
                    className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-5 ${
                      active
                        ? "border-white/20 bg-white/[0.06] lg:bg-transparent"
                        : "border-white/10 bg-white/[0.02] lg:bg-transparent"
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-all duration-300 ${
                        active
                          ? a.node
                          : "border-white/20 bg-[#070d22] text-white/40 group-hover:border-white/35 group-hover:text-white/70"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                      {active ? (
                        <span
                          aria-hidden
                          className={`absolute inset-0 rounded-full ${a.glow} opacity-30 blur-md`}
                        />
                      ) : null}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-300 lg:text-sm ${
                        active ? a.label : "text-white/40 group-hover:text-white/65"
                      }`}
                    >
                      {p.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="relative min-h-[14rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div
                  aria-hidden
                  className={`mb-6 h-px w-24 bg-gradient-to-r ${accent.line}`}
                />
                <p className={`mb-4 text-xs font-bold uppercase tracking-[0.2em] ${accent.label}`}>
                  {phase.label}
                </p>
                <p className="max-w-2xl text-xl font-light leading-relaxed text-white/80 sm:text-2xl sm:leading-relaxed md:text-[1.65rem] md:leading-[1.45]">
                  {phase.label === "scores" ? (
                    <MultiLinkedText
                      text={phase.text}
                      links={[
                        { phrase: "QualiCore", href: "/solutions/ai-quality-assurance" },
                      ]}
                    />
                  ) : (
                    phase.text
                  )}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-2">
              {erpGovernance.phases.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Phase ${i + 1}`}
                  onClick={() => selectPhase(i)}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i === focus
                      ? accents[i].glow
                      : i < focus
                        ? "bg-white/30"
                        : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Autonomy pull statement */}
        <div
          data-erp-gov-y
          className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-finova-magenta/30 md:mt-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-finova-magenta/[0.14] via-transparent to-finova-cyan/[0.08]" />
          <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-finova-magenta/25 blur-3xl" />
          <div className="relative flex gap-5 p-7 md:gap-8 md:p-10 lg:p-12">
            <span
              aria-hidden
              className="mt-1 hidden h-auto w-[3px] shrink-0 rounded-full bg-gradient-to-b from-finova-magenta via-finova-purple to-finova-cyan sm:block"
            />
            <p className="text-lg font-medium leading-relaxed text-white/90 md:text-xl md:leading-relaxed lg:text-2xl">
              {erpGovernance.autonomy}
            </p>
          </div>
        </div>

        {/* Data footer strip */}
        <div
          data-erp-gov-y
          className="mt-6 flex flex-col gap-6 border-t border-white/10 pt-8 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <p className="max-w-2xl text-base font-light leading-relaxed text-white/55 md:text-lg">
            {erpGovernance.data}
          </p>
          <p className="inline-flex shrink-0 items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white/50">
            <MultiLinkedText
              text={erpGovernance.coda}
              links={[
                {
                  phrase: erpGovernance.trustAnchor,
                  href: erpGovernance.trustHref,
                },
              ]}
            />
            <ArrowRight className="h-4 w-4 text-finova-cyan" aria-hidden />
          </p>
        </div>
      </div>
    </section>
  )
}

function Audience() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const ease = [0.16, 1, 0.3, 1] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-erp-audience-y]", {
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-finova-magenta/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          data-erp-audience-y
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem]"
        >
          {erpAudience.heading}
        </motion.h2>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          {/* Fit */}
          <div
            data-erp-audience-y
            className="relative overflow-hidden rounded-[1.5rem] border border-finova-cyan/30 bg-gradient-to-br from-finova-cyan/[0.12] via-white/[0.03] to-transparent p-7 md:p-9 lg:min-h-[22rem]"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-finova-cyan/20 blur-3xl" />
            <div
              aria-hidden
              className="mb-7 h-[2px] w-14 bg-gradient-to-r from-finova-cyan to-finova-lightBlue"
            />
            <p className="relative text-base font-light leading-relaxed text-white/75 md:text-lg md:leading-relaxed">
              {erpAudience.fit}
            </p>
          </div>

          {/* Weaker fit */}
          <div
            data-erp-audience-y
            className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-7 md:p-9 lg:min-h-[22rem]"
          >
            <div
              aria-hidden
              className="mb-7 h-[2px] w-14 bg-gradient-to-r from-white/35 to-transparent"
            />
            <p className="relative text-base font-light leading-relaxed text-white/50 md:text-lg md:leading-relaxed">
              {erpAudience.weaker}
            </p>
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
          {erpFaqs.map((faq, i) => {
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-magenta/12 via-finova-midnight to-finova-midnight pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5"
        >
          {erpFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {erpFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas
            primaryLabel={erpFinal.primaryCta}
            secondaryLabel={erpFinal.secondaryCta}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3"
        >
          {erpSiblings.map((s) => (
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

export default function ErpAutomationPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Problem />
      <WhatWeRun />
      <HowItRuns />
      <Proof />
      <WhatThisIsNot />
      <Governance />
      <Audience />
      <Faq />
      <FinalBand />
    </main>
  )
}
