"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronRight, Plus } from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  consultingAudience,
  consultingAudit,
  consultingDeliverables,
  consultingDeliverablesHeading,
  consultingFaqs,
  consultingFinal,
  consultingHero,
  consultingHonesty,
  consultingProblem,
  consultingSiblings,
  consultingWhy,
} from "@/lib/ai-consulting"

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
      className="group relative inline-flex w-full sm:w-auto sm:shrink-0"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-full bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-magenta opacity-70 blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-finova-cyan/35 to-finova-magenta/35 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
      />

      <span className="relative inline-flex h-[52px] w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-white px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors duration-300 group-hover:bg-[#0b1228] group-hover:text-white active:bg-[#0b1228] active:text-white sm:w-auto sm:gap-2.5 sm:px-7 sm:text-sm sm:tracking-[0.15em]">
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
    <div
      className={`mx-auto flex w-full max-w-md flex-col items-center gap-3 sm:mx-0 sm:inline-flex sm:w-auto sm:max-w-none sm:items-start ${className}`}
    >
      <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        <BookCallButton label={primaryLabel} />
        <Link
          href={secondaryHref}
          className="inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.03] px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10 backdrop-blur-sm sm:px-7 sm:text-sm sm:tracking-[0.15em]"
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
          AI consulting
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
            className="font-medium text-finova-cyan underline decoration-finova-cyan/50 underline-offset-[3px] transition-colors hover:text-finova-lightBlue hover:decoration-finova-lightBlue"
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
  const ease = [0.16, 1, 0.3, 1] as const
  const dotColors = ["bg-finova-magenta", "bg-finova-cyan"] as const

  return (
    <section ref={ref} className="relative overflow-x-clip border-b border-white/5">
      <div className="absolute inset-0 bg-finova-midnight" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_0%,rgba(147,51,234,0.14),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(14,165,233,0.1),transparent_50%)] pointer-events-none" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-14 md:pt-36 md:pb-24">
        <Breadcrumb />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease }}
            className="text-[1.85rem] font-bold tracking-tight text-white leading-[1.12] sm:text-5xl xl:text-[3.2rem] lg:col-span-5 lg:sticky lg:top-28"
          >
            {consultingHero.h1Lead}
            <br />
            <span className="text-white/45">{consultingHero.h1Accent}</span>
          </motion.h1>

          <div className="min-w-0 lg:col-span-7">
            {consultingHero.paragraphs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.12, duration: 0.7, ease }}
                className={`relative border-l py-5 pl-5 sm:py-7 sm:pl-6 md:py-8 md:pl-8 ${
                  i === 0
                    ? "border-l-finova-magenta/45 pt-0"
                    : "border-l-finova-cyan/35"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full sm:top-8 ${dotColors[i]}`}
                />
                <p className="text-[15px] font-light leading-relaxed text-white/65 md:text-lg">
                  {p}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.36, duration: 0.65, ease }}
              className="mt-6 flex w-full justify-center border-t border-white/10 pt-8 sm:justify-start md:mt-2 md:pt-12"
            >
              <DualCtas
                primaryLabel={consultingHero.primaryCta}
                secondaryLabel={consultingHero.secondaryCta}
                secondaryHref={consultingHero.secondaryHref}
              />
            </motion.div>
          </div>
        </div>
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
      gsap.from("[data-consult-problem-y]", {
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.fromTo(
        "[data-deck-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.15,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(217,70,239,0.08),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)",
          backgroundSize: "4.5rem 4.5rem",
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Typographic title — open, not boxed */}
        <div data-consult-problem-y className="max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.85rem] md:leading-[1.12] lg:text-[3.1rem]">
            Strategy that has never survived production
            <br />
            <span className="text-white/45">is just a guess in a nicer font</span>
          </h2>
        </div>

        {/* Deck trajectory — words on a line, not cards */}
        <div data-consult-problem-y className="relative mt-14 md:mt-20">
          <div
            data-deck-line
            aria-hidden
            className="absolute left-0 right-0 top-[0.85rem] hidden h-px origin-left bg-gradient-to-r from-white/25 via-finova-magenta/50 to-finova-cyan/40 md:block"
          />
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {consultingProblem.arc.map((phrase, i) => (
              <li key={phrase} className="relative md:pt-10">
                <span
                  aria-hidden
                  className={`mb-4 hidden h-2.5 w-2.5 rounded-full md:block ${
                    i === 0
                      ? "bg-white/50"
                      : i === 1
                        ? "bg-finova-magenta"
                        : "bg-finova-cyan shadow-[0_0_16px_rgba(14,165,233,0.55)]"
                  }`}
                />
                <p
                  className={`text-lg font-medium leading-snug tracking-tight md:text-xl ${
                    i === 0
                      ? "text-white/45"
                      : i === 1
                        ? "text-finova-magenta"
                        : "text-finova-cyan"
                  }`}
                >
                  {phrase}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Continuous prose — asymmetric columns, hairlines only */}
        <div
          data-consult-problem-y
          className="mt-14 grid gap-10 border-t border-white/10 pt-12 md:mt-16 md:grid-cols-2 md:gap-16 md:pt-14 md:items-start"
        >
          <p className="text-base font-light leading-relaxed text-white/60 md:text-lg md:leading-relaxed">
            {consultingProblem.paragraphs[0]}
          </p>
          <p className="text-base font-light leading-relaxed text-white/55 md:text-lg md:leading-relaxed">
            {consultingProblem.paragraphs[1]}
          </p>
        </div>

        {/* Closing thesis — open type, no box */}
        <motion.p
          data-consult-problem-y
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15, ease }}
          className="mt-14 max-w-3xl border-l-2 border-finova-cyan/50 pl-6 text-xl font-light leading-relaxed text-white/80 md:mt-20 md:pl-8 md:text-2xl md:leading-relaxed"
        >
          {consultingProblem.paragraphs[2]}
        </motion.p>
      </div>
    </section>
  )
}

function Deliverables() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-deliver]", {
        opacity: 0,
        x: -24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 border-b border-white/5 overflow-hidden"
    >
      <div className="absolute right-0 top-1/4 w-[420px] h-[420px] rounded-full bg-finova-cyan/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          data-deliver
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-14"
        >
          {consultingDeliverablesHeading}
        </h2>

        <div className="relative space-y-0">
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-finova-cyan via-finova-magenta to-finova-purple opacity-40 hidden sm:block" />

          {consultingDeliverables.map((item, i) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                data-deliver
                className="relative flex gap-5 sm:gap-8 py-8 sm:py-10 first:pt-0 last:pb-0"
              >
                <div
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} shadow-[0_0_24px_rgba(14,165,233,0.15)]`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-white/35 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                    {i === 2 ? (
                      <LinkedPhrase
                        text={item.body}
                        phrase="build custom"
                        href="/solutions/custom-ai-development"
                      />
                    ) : i === 4 ? (
                      <LinkedPhrase
                        text={item.body}
                        phrase="build it and operate it"
                        href="/how-it-works"
                      />
                    ) : (
                      item.body
                    )}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Audit() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-finova-cyan/30 bg-gradient-to-br from-finova-cyan/[0.1] via-white/[0.02] to-finova-purple/[0.08] p-8 md:p-12"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-finova-cyan/20 blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8 max-w-xl">
              {consultingAudit.heading}
            </h2>
            <div className="space-y-5 max-w-3xl">
              {consultingAudit.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-white/70 text-base md:text-lg font-light leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Why() {
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
      setHot((n) => (n + 1) % consultingWhy.cases.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-consult-why-y]", {
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_20%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-consult-why-y className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
            Why our read is worth more
            <br />
            than a{" "}
            <span className="text-white/35 line-through decoration-white/30">deck</span>
          </h2>
          <p className="mt-6 text-base font-medium leading-relaxed text-white/75 md:mt-8 md:text-lg">
            {consultingWhy.lead}
          </p>
        </div>

        {/* Production cases */}
        <div
          data-consult-why-y
          className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5"
          onMouseLeave={() => setHot(0)}
        >
          {consultingWhy.cases.map((item, i) => {
            const accent = accents[i]
            const active = hot === i
            return (
              <article
                key={item.name}
                onMouseEnter={() => setHot(i)}
                className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-500 md:min-h-[17rem] md:p-7 ${
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

        {/* Accountable advice close */}
        <motion.div
          data-consult-why-y
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
              {consultingWhy.close}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Honesty() {
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
      setHot((n) => (n + 1) % consultingHonesty.nos.length)
    }, 3400)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-honest-y]", {
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_10%,rgba(217,70,239,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_10%_80%,rgba(14,165,233,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-honest-y className="max-w-full overflow-x-auto">
          <h2 className="whitespace-nowrap text-[1.15rem] font-bold tracking-tight text-white leading-[1.2] sm:text-2xl md:text-3xl lg:text-[2.65rem]">
            {consultingHonesty.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/70 md:mt-8 md:text-lg">
            The most valuable thing a consultant can say is{" "}
            <span className="bg-gradient-to-r from-finova-magenta to-finova-cyan bg-clip-text text-transparent font-semibold">
              no
            </span>
            .
          </p>
        </div>

        {/* Three honest nos */}
        <div
          data-honest-y
          className="mt-12 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4"
          onMouseLeave={() => setHot(0)}
        >
          {consultingHonesty.nos.map((item, i) => {
            const accent = accents[i]
            const active = hot === i
            return (
              <button
                key={item.mark}
                type="button"
                onMouseEnter={() => setHot(i)}
                onFocus={() => setHot(i)}
                className={`group relative overflow-hidden rounded-2xl border px-5 py-6 text-left transition-all duration-500 md:min-h-[14rem] md:px-6 md:py-7 ${
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
                  {item.mark}
                </span>
                <p className="relative text-[15px] font-light leading-relaxed text-white/70 md:text-base">
                  {i === 1 ? (
                    <LinkedPhrase
                      text={item.body}
                      phrase="custom build"
                      href="/solutions/custom-ai-development"
                    />
                  ) : (
                    item.body
                  )}
                </p>
              </button>
            )
          })}
        </div>

        {/* Close */}
        <motion.div
          data-honest-y
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-finova-magenta/30 bg-gradient-to-br from-finova-magenta/[0.1] via-transparent to-finova-cyan/[0.06] p-6 md:mt-10 md:p-9"
        >
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-finova-magenta to-finova-cyan"
          />
          <p className="pl-3 text-base font-light leading-relaxed text-white/70 md:pl-4 md:text-lg">
            {consultingHonesty.close}
          </p>
        </motion.div>
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
          {consultingAudience.heading}
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
              {consultingAudience.paragraphs[0]}
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
              {consultingAudience.paragraphs[1]}
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
          {consultingFaqs.map((faq, i) => {
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
                          {faq.question.includes("cost") ? (
                            <LinkedPhrase
                              text={faq.answer}
                              phrase="clear model"
                              href="/pricing"
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
          {consultingFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {consultingFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas
            primaryLabel={consultingFinal.primaryCta}
            secondaryLabel={consultingFinal.secondaryCta}
            secondaryHref={consultingFinal.secondaryHref}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3"
        >
          {consultingSiblings.map((s) => (
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

export default function ConsultingPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Problem />
      <Deliverables />
      <Audit />
      <Why />
      <Honesty />
      <Audience />
      <Faq />
      <FinalBand />
    </main>
  )
}
