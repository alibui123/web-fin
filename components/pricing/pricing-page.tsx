"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronRight, Plus } from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  pricingAlwaysTrue,
  pricingAudience,
  pricingFaqs,
  pricingFaqsHeading,
  pricingFinal,
  pricingHero,
  pricingInaction,
  pricingProof,
  pricingReframe,
  pricingSiblings,
  pricingStages,
  pricingStagesHeading,
} from "@/lib/pricing"

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

      <span className="relative inline-flex h-[52px] shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-white px-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-black transition-colors duration-300 group-hover:bg-[#0b1228] group-hover:text-white active:bg-[#0b1228] active:text-white sm:gap-2.5 sm:px-7 sm:text-sm sm:tracking-[0.15em]">
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
  className = "",
}: {
  primaryLabel: string
  secondaryLabel: string
  secondaryHref: string
  className?: string
}) {
  return (
    <div className={`inline-flex flex-col items-start gap-3 ${className}`}>
      <div className="flex flex-nowrap items-center gap-2 sm:gap-4">
        <BookCallButton label={primaryLabel} />
        <Link
          href={secondaryHref}
          className="inline-flex h-[52px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.03] px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10 backdrop-blur-sm sm:px-7 sm:text-sm sm:tracking-[0.15em]"
        >
          {secondaryLabel}
        </Link>
      </div>
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
        <li className="text-white/80" aria-current="page">
          Pricing
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
        className="font-medium text-finova-cyan underline decoration-finova-cyan/50 underline-offset-[3px] transition-colors hover:text-finova-lightBlue hover:decoration-finova-lightBlue"
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

function PricingEngagementLedger() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [active, setActive] = useState(0)
  const ease = [0.16, 1, 0.3, 1] as const
  const accents = [
    "text-finova-cyan",
    "text-finova-magenta",
    "text-finova-lightBlue",
  ] as const
  const barGradients = [
    "from-finova-cyan/70 to-finova-cyan/20",
    "from-finova-magenta/70 to-finova-magenta/20",
    "from-finova-lightBlue/70 to-finova-lightBlue/20",
  ] as const
  const scopeWidths = [42, 68, 86]

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % pricingHero.alwaysTrueBeats.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.18, ease }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)",
          backgroundSize: "1.5rem 1.5rem",
        }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-finova-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-finova-magenta/10 blur-3xl" />

      <div className="relative space-y-3">
        {pricingHero.ledgerVoid.map((row) => (
          <div
            key={row}
            className="flex items-center gap-3 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-3 py-2.5"
          >
            <span className="flex-1 text-[15px] text-white/45 line-through decoration-white/30 md:text-base">
              {row}
            </span>
            <span
              aria-hidden
              className="h-6 w-14 rounded border border-dashed border-white/15 bg-white/[0.02]"
            />
          </div>
        ))}
      </div>

      <div className="relative mt-6 space-y-5 border-t border-white/10 pt-6">
        <div>
          <p className="text-[15px] font-medium leading-snug text-white/85 md:text-base">
            {pricingHero.ledgerScope}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={inView ? { width: `${scopeWidths[active]}%` } : { width: "0%" }}
              transition={{ duration: 1.1, ease }}
              className={`h-full rounded-full bg-gradient-to-r ${barGradients[active]}`}
            />
          </div>
        </div>

        <p className="text-[15px] leading-snug text-white/70 md:text-base">
          {pricingHero.ledgerCommit}
        </p>
      </div>

      <div className="relative mt-6 border-t border-white/10 pt-6">
        <p className="text-[15px] font-medium text-white/70 md:text-base">
          {pricingHero.alwaysTrueLead}
        </p>

        <div className="mt-4 space-y-2">
          {pricingHero.alwaysTrueBeats.map((beat, i) => {
            const isActive = active === i
            return (
              <button
                key={beat.mark}
                type="button"
                onClick={() => setActive(i)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? "border-white/20 bg-white/[0.05]"
                    : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? i === 0
                          ? "bg-finova-cyan shadow-[0_0_10px_rgba(14,165,233,0.55)]"
                          : i === 1
                            ? "bg-finova-magenta shadow-[0_0_10px_rgba(217,70,239,0.45)]"
                            : "bg-finova-lightBlue shadow-[0_0_10px_rgba(56,189,248,0.45)]"
                        : "bg-white/20"
                    }`}
                  />
                  <span
                    className={`text-[15px] font-semibold capitalize transition-colors duration-300 md:text-base ${
                      isActive ? accents[i] : "text-white/55"
                    }`}
                  >
                    {beat.mark}
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.p
                      key={beat.mark}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="mt-2 overflow-hidden text-[15px] font-light leading-relaxed text-white/75 md:text-base"
                    >
                      {beat.body}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </button>
            )
          })}
        </div>

        <p className="mt-5 border-t border-white/10 pt-5 text-base font-medium text-white md:text-lg">
          {pricingHero.alwaysTrueClose}
        </p>
      </div>
    </motion.div>
  )
}

function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-finova-midnight" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_12%_0%,rgba(14,165,233,0.16),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_92%_70%,rgba(217,70,239,0.12),transparent_50%)] pointer-events-none" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-finova-purple/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
        <Breadcrumb />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease }}
              className="max-w-4xl text-4xl font-bold tracking-tight text-white leading-[1.08] sm:text-5xl xl:text-[3.35rem]"
            >
              {pricingHero.h1Lead}
              <br />
              <span className="text-white/45">{pricingHero.h1Accent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease }}
              className="mt-8 text-lg font-medium leading-relaxed text-white/75 md:mt-10 md:text-xl"
            >
              {pricingHero.introLead}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.7, ease }}
              className="mt-6 text-base font-light leading-relaxed text-white/60 md:text-lg"
            >
              {pricingHero.introBody}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32, duration: 0.65, ease }}
              className="mt-10"
            >
              <DualCtas
                primaryLabel={pricingHero.primaryCta}
                secondaryLabel={pricingHero.secondaryCta}
                secondaryHref={pricingHero.secondaryHref}
                className="items-start"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:sticky lg:top-28 lg:-mt-1">
            <PricingEngagementLedger />
          </div>
        </div>
      </div>
    </section>
  )
}

function Reframe() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-reframe-head]", {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      })
      gsap.from("[data-reframe-beat]", {
        opacity: 0,
        y: 30,
        duration: 0.85,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 border-b border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,165,233,0.04)_0%,transparent_40%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <h2
              data-reframe-head
              className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight lg:sticky lg:top-32"
            >
              {pricingReframe.heading}
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-0">
            {pricingReframe.paragraphs.map((p, i) => (
              <div
                key={i}
                data-reframe-beat
                className={`relative py-7 md:py-9 pl-6 md:pl-8 border-l ${
                  i === 0 ? "border-finova-cyan/40" : "border-finova-magenta/35"
                } ${i < pricingReframe.paragraphs.length - 1 ? "border-b border-dashed border-white/10" : ""}`}
              >
                <span className="font-mono text-[11px] tracking-[0.25em] text-white/35 mb-3 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={`text-base md:text-lg font-light leading-relaxed ${
                    i === 1 ? "text-white/75" : "text-white/60"
                  }`}
                >
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stages() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-stage-head]", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
      const cards = gsap.utils.toArray<HTMLElement>("[data-stage-card]")
      gsap.fromTo(
        cards,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 border-b border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          data-stage-head
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12 md:mb-14 max-w-xl"
        >
          {pricingStagesHeading}
        </h2>

        <div
          ref={gridRef}
          data-stage-grid
          className="grid md:grid-cols-3 gap-5 lg:gap-6 items-start"
        >
          {pricingStages.map((stage) => {
            const Icon = stage.icon
            return (
              <article
                key={stage.title}
                data-stage-card
                className={`relative flex min-h-full flex-col rounded-3xl border p-6 md:p-7 transition-[box-shadow,border-color,background-color,transform] duration-500 ${
                  stage.recommended
                    ? "z-10 origin-center border-finova-cyan/55 bg-gradient-to-b from-finova-cyan/[0.14] via-white/[0.05] to-transparent shadow-[0_0_36px_rgba(14,165,233,0.12),0_16px_32px_rgba(0,0,0,0.35)] md:scale-[1.08] ring-1 ring-finova-cyan/20"
                    : "z-0 border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                {/* Reserved badge row keeps icon rows level across all cards */}
                <div className="mb-5 h-[30px] flex items-center">
                  {stage.recommended && stage.recommendedLabel ? (
                    <div className="inline-flex items-center rounded-full border border-finova-cyan/40 bg-finova-cyan/10 px-3 py-1">
                      <span className="text-[11px] font-semibold tracking-[0.08em] text-finova-cyan">
                        {stage.recommendedLabel}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div
                  className={`mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stage.accent} md:h-[4.5rem] md:w-[4.5rem]`}
                >
                  <Icon className="h-8 w-8 text-white md:h-9 md:w-9" strokeWidth={1.75} />
                </div>

                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/40 mb-2">
                  {stage.label}
                </p>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                  {stage.title}
                </h3>
                <p className="text-sm md:text-[15px] font-medium text-white/80 leading-relaxed mb-4">
                  {stage.lead}
                </p>
                <p className="text-sm md:text-[15px] font-light text-white/55 leading-relaxed mt-auto">
                  <MultiLinkedText
                    text={stage.body}
                    links={[
                      { phrase: "QualiCore", href: "/solutions/ai-quality-assurance" },
                    ]}
                  />
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AlwaysTrue() {
  const sectionRef = useRef<HTMLElement>(null)
  const accents = [
    "text-finova-cyan",
    "text-finova-magenta",
    "text-finova-lightBlue",
  ] as const
  const rails = [
    "from-finova-cyan via-finova-cyan/40 to-transparent",
    "from-finova-magenta via-finova-magenta/40 to-transparent",
    "from-finova-lightBlue via-finova-lightBlue/40 to-transparent",
  ] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-true-head]", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
      gsap.from("[data-true-row]", {
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_8%_20%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_92%_80%,rgba(217,70,239,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2
              data-true-head
              className="max-w-sm text-3xl font-bold tracking-tight text-white md:text-4xl lg:sticky lg:top-28"
            >
              {pricingAlwaysTrue.heading}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative border-t border-white/10">
              {pricingAlwaysTrue.principles.map((item, i) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.text.slice(0, 32)}
                    data-true-row
                    className="group relative border-b border-white/10 py-7 md:py-8"
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${rails[i]}`}
                    />

                    <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-8 md:gap-10">
                      <div className="flex items-start gap-4 sm:flex-col sm:gap-5">
                        <span
                          className={`font-mono text-sm tracking-[0.22em] ${accents[i]}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${accents[i]}`}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                      </div>

                      <p className="pt-0.5 text-[15px] font-light leading-relaxed text-white/70 md:text-base">
                        {item.text}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function Inaction() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [hotCost, setHotCost] = useState(0)

  const accents = [
    {
      bar: "from-finova-magenta to-finova-purple",
      text: "text-finova-magenta",
      glow: "bg-finova-magenta/20",
      fill: "w-[42%]",
    },
    {
      bar: "from-finova-purple to-finova-cyan",
      text: "text-finova-lightBlue",
      glow: "bg-finova-purple/20",
      fill: "w-[68%]",
    },
    {
      bar: "from-finova-cyan to-finova-lightBlue",
      text: "text-finova-cyan",
      glow: "bg-finova-cyan/20",
      fill: "w-full",
    },
  ] as const

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setHotCost((n) => (n + 1) % pricingInaction.costs.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-inaction-y]", {
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.from("[data-inaction-fill]", {
        scaleX: 0,
        duration: 1.1,
        stagger: 0.15,
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_10%,rgba(217,70,239,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_10%_90%,rgba(14,165,233,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-inaction-y className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
              {pricingInaction.heading}
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-white/55 md:text-lg">
              {pricingInaction.lead}
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Cost of doing nothing ledger */}
            <div
              data-inaction-y
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070d22]/60"
              onMouseLeave={() => setHotCost(0)}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 md:px-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
                  doing nothing
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-finova-magenta/80">
                  highest on the list
                </span>
              </div>

              <ol className="divide-y divide-white/10">
                {pricingInaction.costs.map((cost, i) => {
                  const accent = accents[i]
                  const active = hotCost === i
                  return (
                    <li key={cost}>
                      <button
                        type="button"
                        onMouseEnter={() => setHotCost(i)}
                        onFocus={() => setHotCost(i)}
                        className={`group relative w-full px-6 py-6 text-left transition-colors duration-300 md:px-8 md:py-7 ${
                          active ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500 ${accent.glow} ${
                            active ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        <span className="relative mb-4 flex items-center justify-between gap-4">
                          <span
                            className={`font-mono text-xs tracking-[0.2em] transition-colors duration-300 ${
                              active ? accent.text : "text-white/30"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.06] md:w-32">
                            <span
                              data-inaction-fill
                              className={`block h-full origin-left rounded-full bg-gradient-to-r ${accent.bar} ${accent.fill}`}
                            />
                          </span>
                        </span>
                        <p
                          className={`relative text-[15px] font-light leading-relaxed transition-colors duration-300 md:text-base ${
                            active ? "text-white/85" : "text-white/55"
                          }`}
                        >
                          {cost}
                        </p>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Audit coda */}
            <div
              data-inaction-y
              className="relative mt-5 overflow-hidden rounded-2xl border border-finova-cyan/25 bg-gradient-to-br from-finova-cyan/[0.1] via-transparent to-finova-magenta/[0.06] p-6 md:mt-6 md:p-8"
            >
              <div
                aria-hidden
                className="mb-5 h-px w-12 bg-gradient-to-r from-finova-cyan to-transparent"
              />
              <p className="text-base font-light leading-relaxed text-white/70 md:text-lg">
                <LinkedPhrase
                  text={pricingInaction.audit}
                  phrase={pricingInaction.auditAnchor}
                  href={pricingInaction.auditHref}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Proof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="lg:col-span-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              {pricingProof.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-9 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-finova-cyan via-finova-magenta to-transparent" />
              <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
                <MultiLinkedText
                  text={pricingProof.body}
                  links={[
                    { phrase: "Telecom Foundation", href: pricingProof.telecomHref },
                    { phrase: "Sirius Solutions Global", href: pricingProof.siriusHref },
                    { phrase: "Advanzatech", href: pricingProof.advanzatechHref },
                    { phrase: pricingProof.customersAnchor, href: pricingProof.customersHref },
                  ]}
                />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Audience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-finova-purple/[0.05] via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10 max-w-2xl"
        >
          {pricingAudience.heading}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="bg-finova-midnight p-7 md:p-10 relative"
          >
            <div className="absolute inset-0 bg-finova-cyan/[0.04] pointer-events-none" />
            <div className="relative h-1 w-12 bg-gradient-to-r from-finova-cyan to-finova-magenta mb-6" />
            <p className="relative text-white/75 text-base md:text-[17px] font-light leading-relaxed">
              {pricingAudience.paragraphs[0]}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16 }}
            className="bg-finova-midnight p-7 md:p-10"
          >
            <div className="h-1 w-12 bg-white/25 mb-6" />
            <p className="text-white/55 text-base md:text-[17px] font-light leading-relaxed">
              {pricingAudience.paragraphs[1]}
            </p>
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
          {pricingFaqsHeading}
        </motion.h2>
        <div>
          {pricingFaqs.map((faq, i) => {
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
          {pricingFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {pricingFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas
            primaryLabel={pricingFinal.primaryCta}
            secondaryLabel={pricingFinal.secondaryCta}
            secondaryHref={pricingFinal.secondaryHref}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3"
        >
          {pricingSiblings.map((s) => (
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

export default function PricingPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Reframe />
      <Stages />
      <AlwaysTrue />
      <Inaction />
      <Proof />
      <Audience />
      <Faq />
      <FinalBand />
    </main>
  )
}
