"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronRight, Plus, Play } from "lucide-react"
import { CALENDLY_URL } from "@/lib/site"
import {
  qaAudience,
  qaBuyer,
  qaCapabilities,
  qaCapabilitiesHeading,
  qaData,
  qaFaqs,
  qaFinal,
  qaHero,
  qaLoop,
  qaProblem,
  qaQualiCall,
  qaSiblings,
} from "@/lib/ai-quality-assurance"

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

      <span className="relative inline-flex h-[52px] shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-white px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors duration-300 group-hover:bg-[#0b1228] group-hover:text-white sm:gap-2.5 sm:px-8 sm:text-sm sm:tracking-[0.15em]">
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
  const isDemo = secondaryHref === "/#demo"

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4">
        <BookCallButton label={primaryLabel} />
        <Link
          href={secondaryHref}
          className="inline-flex h-[52px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.03] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10 backdrop-blur-sm sm:gap-3 sm:px-8 sm:text-sm sm:tracking-[0.15em]"
        >
          {isDemo ? (
            <Play className="h-3.5 w-3.5 text-finova-cyan fill-finova-cyan/30 sm:h-4 sm:w-4" />
          ) : null}
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
          AI quality and governance
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

function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-finova-midnight" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(14,165,233,0.16),transparent_55%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-finova-cyan/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
        <Breadcrumb />

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight text-white leading-[1.08]"
        >
          {qaHero.h1}
        </motion.h1>

        <div className="mt-12 grid md:grid-cols-2 gap-5 md:gap-6">
          {qaHero.paragraphs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8"
            >
              <p className="text-base md:text-[17px] text-white/65 font-light leading-relaxed">
                {i === 1 ? (
                  <LinkedPhrase text={p} phrase="QualiCore" href="/products/qualicore" />
                ) : (
                  p
                )}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <DualCtas
            primaryLabel={qaHero.primaryCta}
            secondaryLabel={qaHero.secondaryCta}
            secondaryHref={qaHero.secondaryHref}
            micro={qaHero.primaryMicro}
          />
        </motion.div>
      </div>
    </section>
  )
}

function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const ease = [0.16, 1, 0.3, 1] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-qa-drift-y]", {
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.from("[data-drift-bar]", {
        scaleY: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        transformOrigin: "bottom center",
        scrollTrigger: { trigger: sectionRef.current, start: "top 62%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_20%_10%,rgba(217,70,239,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(14,165,233,0.08),transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-qa-drift-y className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.12]">
            Agents rarely fail loudly.
            <br />
            <span className="bg-gradient-to-r from-finova-magenta via-finova-lightBlue to-finova-cyan bg-clip-text text-transparent">
              They drift quietly.
            </span>
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-white/60 md:mt-8 md:text-lg">
            {qaProblem.lead}
          </p>
        </div>

        {/* Drift slope */}
        <div
          data-qa-drift-y
          className="mt-12 grid items-end gap-4 sm:grid-cols-3 md:mt-16 md:gap-6"
          aria-hidden
        >
          {qaProblem.driftSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-stretch gap-3">
              <div className="flex h-36 items-end md:h-44">
                <div
                  data-drift-bar
                  className={`w-full rounded-t-xl origin-bottom ${
                    i === 0
                      ? "bg-gradient-to-t from-finova-cyan/50 to-finova-cyan/20"
                      : i === 1
                        ? "bg-gradient-to-t from-finova-magenta/45 to-finova-magenta/15"
                        : "bg-gradient-to-t from-white/15 to-white/[0.04]"
                  }`}
                  style={{ height: `${step.level}%` }}
                />
              </div>
              <p
                className={`text-xs font-medium leading-snug tracking-wide md:text-sm ${
                  i === 0
                    ? "text-finova-cyan"
                    : i === 1
                      ? "text-finova-magenta"
                      : "text-white/40"
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>

        <motion.p
          data-qa-drift-y
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease }}
          className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-white/75 md:mt-10 md:text-lg"
        >
          {qaProblem.damage}
        </motion.p>

        {/* Why + risk */}
        <div data-qa-drift-y className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div
              aria-hidden
              className="mb-5 h-px w-12 bg-gradient-to-r from-white/35 to-transparent"
            />
            <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
              {qaProblem.why}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-finova-magenta/30 bg-gradient-to-br from-finova-magenta/[0.12] via-finova-magenta/[0.04] to-transparent p-6 md:p-8">
            <div
              aria-hidden
              className="mb-5 h-px w-12 bg-gradient-to-r from-finova-magenta to-transparent"
            />
            <p className="text-base font-medium leading-relaxed text-white/85 md:text-lg">
              {qaProblem.risk}
            </p>
          </div>
        </div>

        {/* The fix */}
        <div
          data-qa-drift-y
          className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-finova-cyan/25 md:mt-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-finova-cyan/10 via-transparent to-finova-magenta/10" />
          <div className="relative flex gap-5 p-6 md:gap-8 md:p-9 lg:p-10">
            <span
              aria-hidden
              className="mt-1 hidden w-[3px] shrink-0 rounded-full bg-gradient-to-b from-finova-cyan via-finova-lightBlue to-finova-magenta sm:block"
            />
            <p className="text-base font-light leading-relaxed text-white/70 md:text-lg">
              {qaProblem.fix}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Capabilities() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-14 max-w-xl"
        >
          {qaCapabilitiesHeading}
        </motion.h2>

        <div className="space-y-0 divide-y divide-white/10">
          {qaCapabilities.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-12 items-start"
              >
                <div className="md:col-span-4 flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug pt-1">
                    {item.title}
                  </h3>
                </div>
                <div className="md:col-span-8">
                  <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
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

function Loop() {
  const sectionRef = useRef<HTMLElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-loop-copy]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
      if (ringRef.current) {
        gsap.from(ringRef.current.children, {
          opacity: 0,
          scale: 0.85,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 border-b border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.1),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <h2 data-loop-copy className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              {qaLoop.heading}
            </h2>
            <div className="space-y-5">
              {qaLoop.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-loop-copy
                  className={`text-base md:text-lg font-light leading-relaxed ${
                    i === 0 ? "text-white/85 font-medium" : "text-white/60"
                  }`}
                >
                  {i === 1 ? (
                    <LinkedPhrase text={p} phrase="QualiCore" href="/products/qualicore" />
                  ) : (
                    p
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div
              ref={ringRef}
              className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]"
            >
              <div className="absolute inset-8 rounded-full border border-dashed border-white/15" />
              <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-finova-cyan/20 via-finova-midnight to-finova-magenta/20 border border-white/10" />
              {qaLoop.beats.map((beat, i) => {
                const angle = (i / qaLoop.beats.length) * Math.PI * 2 - Math.PI / 2
                const r = 46
                const x = 50 + r * Math.cos(angle)
                const y = 50 + r * Math.sin(angle)
                return (
                  <div
                    key={beat}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="rounded-full border border-finova-cyan/40 bg-finova-midnight px-3.5 py-2 shadow-[0_0_24px_rgba(14,165,233,0.15)]">
                      <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-finova-cyan whitespace-nowrap">
                        {beat}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function QualiCall() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-finova-cyan/[0.08] via-white/[0.02] to-finova-magenta/[0.06] p-8 md:p-12"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-finova-cyan to-finova-magenta" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 max-w-2xl">
            {qaQualiCall.heading}
          </h2>
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed max-w-3xl">
            <LinkedPhrase text={qaQualiCall.body} phrase="QualiCore" href="/products/qualicore" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Buyer() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const ease = [0.16, 1, 0.3, 1] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-qa-buyer-y]", {
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_0%,rgba(14,165,233,0.11),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div data-qa-buyer-y className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
              Why this is the part
              <br />
              that lets you{" "}
              <span className="bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-white bg-clip-text text-transparent">
                say yes
              </span>
            </h2>

            {/* Path: pilot → deploy */}
            <div
              className="mt-10 flex flex-wrap items-center gap-3"
              aria-hidden
            >
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/35 line-through decoration-white/25">
                pilot forever
              </span>
              <span className="h-px min-w-[1.5rem] flex-1 bg-gradient-to-r from-white/15 to-finova-cyan/50" />
              <span className="rounded-full border border-finova-cyan/40 bg-finova-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-finova-cyan">
                deploy
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 md:space-y-5">
            {/* Hesitation */}
            <div
              data-qa-buyer-y
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 md:p-8"
            >
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-white/30 to-transparent"
              />
              <p className="pl-3 text-base font-light leading-relaxed text-white/55 md:pl-4 md:text-lg">
                {qaBuyer.hesitation}
              </p>
            </div>

            {/* Governance answer */}
            <div
              data-qa-buyer-y
              className="relative overflow-hidden rounded-[1.5rem] border border-finova-cyan/30 bg-gradient-to-br from-finova-cyan/[0.12] via-[#070d22]/80 to-finova-magenta/[0.06] p-6 md:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-finova-cyan/20 blur-3xl" />
              <p className="relative mb-5 text-lg font-semibold tracking-tight text-finova-cyan md:text-xl">
                {qaBuyer.answer}
              </p>
              <p className="relative text-base font-light leading-relaxed text-white/70 md:text-lg">
                {qaBuyer.difference}
              </p>
            </div>

            {/* Mean it */}
            <motion.div
              data-qa-buyer-y
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative overflow-hidden rounded-2xl border border-finova-magenta/25 bg-finova-magenta/[0.07] px-6 py-5 md:px-8 md:py-6"
            >
              <p className="text-base font-medium leading-relaxed text-white/85 md:text-lg">
                {qaBuyer.meanIt}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DataRules() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-70px" })

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 border-b border-white/5 bg-gradient-to-r from-finova-cyan/[0.05] via-transparent to-finova-purple/[0.05]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-5"
        >
          {qaData.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="text-white/65 text-base md:text-lg font-light leading-relaxed"
        >
          <MultiLinkedText
            text={qaData.body}
            links={[
              { phrase: "QualiCore", href: "/products/qualicore" },
              { phrase: qaData.trustAnchor, href: qaData.trustHref },
            ]}
          />
        </motion.p>
      </div>
    </section>
  )
}

function Audience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10"
        >
          {qaAudience.heading}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-px bg-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="bg-finova-midnight p-7 md:p-9"
          >
            <div className="h-1 w-12 bg-gradient-to-r from-finova-cyan to-finova-magenta mb-6" />
            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
              {qaAudience.paragraphs[0]}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16 }}
            className="bg-finova-midnight p-7 md:p-9"
          >
            <div className="h-1 w-12 bg-white/20 mb-6" />
            <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
              {qaAudience.paragraphs[1]}
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
          Questions operators ask
        </motion.h2>
        <div>
          {qaFaqs.map((faq, i) => {
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
          {qaFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {qaFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas
            primaryLabel={qaFinal.primaryCta}
            secondaryLabel={qaFinal.secondaryCta}
            secondaryHref={qaFinal.secondaryHref}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3"
        >
          {qaSiblings.map((s) => (
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

export default function AiQualityPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Problem />
      <Capabilities />
      <Loop />
      <QualiCall />
      <Buyer />
      <DataRules />
      <Audience />
      <Faq />
      <FinalBand />
    </main>
  )
}
