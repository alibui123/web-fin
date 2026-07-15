"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronRight, Plus } from "lucide-react"
import { CALENDLY_URL } from "@/lib/site"
import {
  howItWorksAudience,
  howItWorksFaqs,
  howItWorksFinal,
  howItWorksHero,
  howItWorksModel,
  howItWorksProof,
  howItWorksSiblings,
  howItWorksStages,
  howItWorksStagesHeading,
  howItWorksTeam,
  howItWorksTimeline,
  howItWorksWhy,
  howItWorksWhyHeading,
} from "@/lib/how-it-works"

const AutomationCanvas = dynamic(
  () =>
    import(
      "@/components/how-it-works/automation-core/AutomationCoreCanvas"
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
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${className}`}>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-finova-cyan hover:text-white"
      >
        {primaryLabel}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </a>
      <Link
        href={secondaryHref}
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/[0.03] text-white text-sm font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10"
      >
        {secondaryLabel}
      </Link>
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
          How it works
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
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/5 pt-28 pb-16 md:pt-36 md:pb-28 min-h-[640px] md:min-h-[720px]"
    >
      <div className="absolute inset-0 bg-finova-midnight" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_45%,rgba(94,168,255,0.08),transparent_58%)] pointer-events-none" />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[54%] lg:w-[50%]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 72% at 52% 48%, #000 28%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 78% 72% at 52% 48%, #000 28%, transparent 80%)",
        }}
      >
        <AutomationCanvas />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl lg:max-w-[36rem] text-4xl sm:text-5xl md:text-[3.15rem] font-bold tracking-tight text-white leading-[1.08]"
        >
          {howItWorksHero.h1}
        </motion.h1>

        <div className="mt-10 max-w-xl space-y-5">
          {howItWorksHero.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 + i * 0.1 }}
              className="text-base md:text-lg text-white/65 font-light leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38 }}
          className="mt-10"
        >
          <DualCtas
            primaryLabel={howItWorksHero.primaryCta}
            secondaryLabel={howItWorksHero.secondaryCta}
            secondaryHref={howItWorksHero.secondaryHref}
          />
        </motion.div>
      </div>
    </section>
  )
}

function Model() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 max-w-3xl"
        >
          {howItWorksModel.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-12 max-w-3xl"
        >
          {howItWorksModel.lead}
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-12">
          {howItWorksModel.principles.map((principle, i) => (
            <motion.div
              key={principle}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 overflow-hidden"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] text-finova-cyan mb-4 block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-white/75 text-base md:text-lg font-light leading-relaxed">
                {principle}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
          className="text-white/55 text-base md:text-lg font-light leading-relaxed max-w-3xl"
        >
          {howItWorksModel.close}
        </motion.p>
      </div>
    </section>
  )
}

function Stages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const [active, setActive] = useState(0)
  const stage = howItWorksStages[active]
  const Icon = stage.icon

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.08),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12 max-w-3xl"
        >
          {howItWorksStagesHeading}
        </motion.h2>

        <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex min-w-max gap-2 md:gap-3 md:min-w-0 md:flex-wrap">
            {howItWorksStages.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-4 py-2.5 text-left transition-all duration-300 border ${
                  active === i
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/50 border-white/15 hover:border-white/35 hover:text-white/80"
                }`}
              >
                <span className="font-mono text-[10px] tracking-widest block opacity-70">
                  {s.label}
                </span>
                <span className="text-sm font-semibold">{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={stage.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-7 md:p-12 overflow-hidden"
          >
            <div
              className={`absolute -right-16 -top-16 w-72 h-72 rounded-full bg-gradient-to-br ${stage.accent} opacity-[0.12] blur-3xl pointer-events-none`}
            />
            <div className="relative grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stage.accent}`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                  {stage.label} {stage.title} {stage.timing}
                </h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-white/65 text-base md:text-lg font-light leading-relaxed">
                  <MultiLinkedText
                    text={stage.body}
                    links={[
                      { phrase: "QualiCore", href: "/solutions/ai-quality-assurance" },
                      { phrase: "the audit", href: "/solutions/ai-consulting" },
                    ]}
                  />
                </p>
              </div>
            </div>

            <div className="relative mt-10 flex gap-1.5">
              {howItWorksStages.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= active ? "bg-finova-cyan" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const ease = [0.16, 1, 0.3, 1] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-hiw-time-y]", {
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.fromTo(
        "[data-hiw-time-line]",
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-finova-magenta/8 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-hiw-time-y className="max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.12]">
            About{" "}
            <span className="bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-white bg-clip-text text-transparent">
              six weeks
            </span>
            ,
            <br />
            and we will tell you when it is not
          </h2>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/70 md:mt-8 md:text-lg">
            {howItWorksTimeline.typical}
          </p>
        </div>

        {/* Spectrum — open type on a line, not boxes */}
        <div data-hiw-time-y className="relative mt-14 md:mt-20">
          <div
            data-hiw-time-line
            aria-hidden
            className="absolute left-0 right-0 top-[0.85rem] hidden h-px origin-left bg-gradient-to-r from-white/20 via-finova-cyan/60 to-finova-magenta/40 md:block"
          />
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {howItWorksTimeline.spectrum.map((item) => (
              <li key={item.label} className="relative md:pt-10">
                <span
                  aria-hidden
                  className={`mb-4 hidden h-2.5 w-2.5 rounded-full md:block ${
                    item.tone === "hot"
                      ? "bg-finova-cyan shadow-[0_0_16px_rgba(14,165,233,0.6)]"
                      : item.tone === "mid"
                        ? "bg-finova-magenta"
                        : "bg-white/40"
                  }`}
                />
                <p
                  className={`text-lg font-medium leading-snug tracking-tight md:text-xl ${
                    item.tone === "hot"
                      ? "text-finova-cyan"
                      : item.tone === "mid"
                        ? "text-finova-magenta"
                        : "text-white/40"
                  }`}
                >
                  {item.label}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Continuous reading */}
        <div
          data-hiw-time-y
          className="mt-14 grid gap-8 border-t border-white/10 pt-12 md:mt-16 md:grid-cols-2 md:items-start md:gap-16 md:pt-14"
        >
          <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
            {howItWorksTimeline.range}
          </p>
          <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
            <LinkedPhrase
              text={howItWorksTimeline.scope}
              phrase="the audit"
              href="/solutions/ai-consulting"
            />
          </p>
        </div>

        {/* Honesty pull — rule only, no box */}
        <motion.p
          data-hiw-time-y
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.12, ease }}
          className="mt-14 max-w-3xl border-l-2 border-finova-cyan/50 pl-6 text-xl font-light leading-relaxed text-white/80 md:mt-20 md:pl-8 md:text-2xl"
        >
          We would rather tell you{" "}
          <span className="font-medium text-finova-cyan">eight weeks</span> and mean it than
          promise{" "}
          <span className="text-white/35 line-through decoration-white/30">three</span> and miss.
        </motion.p>
      </div>
    </section>
  )
}

function Why() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12 max-w-3xl"
        >
          {howItWorksWhyHeading}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {howItWorksWhy.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.lead}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7"
              >
                <Icon className="w-5 h-5 text-finova-cyan mb-5" />
                <p className="text-white/70 text-sm md:text-[15px] font-light leading-relaxed">
                  <span className="font-semibold text-white">{item.lead}</span>{" "}
                  {i === 2 ? (
                    <LinkedPhrase
                      text={item.body}
                      phrase="governance works"
                      href="/solutions/ai-quality-assurance"
                    />
                  ) : i === 0 ? (
                    <LinkedPhrase
                      text={item.body}
                      phrase="We consult first"
                      href="/solutions/ai-consulting"
                    />
                  ) : (
                    item.body
                  )}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const ease = [0.16, 1, 0.3, 1] as const
  const accents = [
    "text-finova-cyan",
    "text-finova-magenta",
    "text-finova-lightBlue",
  ] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-hiw-proof-y]", {
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_10%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-hiw-proof-y className="lg:col-span-4 lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
              The model,
              <br />
              <span className="bg-gradient-to-r from-white via-finova-lightBlue to-finova-cyan bg-clip-text text-transparent">
                proven in production
              </span>
            </h2>
            <p className="mt-6 text-base font-medium leading-relaxed text-white/65 md:mt-8 md:text-lg">
              {howItWorksProof.lead}
            </p>
          </div>

          <div data-hiw-proof-y className="lg:col-span-8">
            <ol>
              {howItWorksProof.cases.map((item, i) => (
                <li
                  key={item.name}
                  className="group grid grid-cols-[auto_1fr] gap-5 border-t border-white/10 py-8 first:border-t-0 first:pt-0 md:gap-8 md:py-9"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/30 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors md:text-xl ${accents[i]} hover:text-white`}
                    >
                      {item.name}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <p className="mt-3 text-base font-light leading-relaxed text-white/60 md:text-lg">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-4 border-t border-white/10 pt-10"
            >
              <p className="max-w-2xl text-lg font-light leading-relaxed text-white/75 md:text-xl">
                {howItWorksProof.close}
              </p>
              <p className="mt-5 inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white/50">
                <LinkedPhrase
                  text={howItWorksProof.coda}
                  phrase={howItWorksProof.customersAnchor}
                  href={howItWorksProof.customersHref}
                />
                <ArrowRight className="h-4 w-4 text-finova-cyan" aria-hidden />
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const ease = [0.16, 1, 0.3, 1] as const
  const accents = [
    "text-finova-cyan",
    "text-finova-magenta",
    "text-finova-lightBlue",
  ] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-hiw-team-y]", {
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_0%,rgba(14,165,233,0.09),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-finova-magenta/8 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div data-hiw-team-y className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
              {howItWorksTeam.heading}
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-white/75 md:mt-8 md:text-xl">
              Less than you would think,
              <br />
              <span className="text-white/45">and that is deliberate.</span>
            </p>
          </div>

          <div data-hiw-team-y className="lg:col-span-7">
            <ol>
              {howItWorksTeam.phases.map((phase, i) => (
                <li
                  key={phase.mark}
                  className="relative grid grid-cols-[5.5rem_1fr] gap-4 border-t border-white/10 py-8 first:border-t-0 first:pt-0 md:grid-cols-[6.5rem_1fr] md:gap-6 md:py-9"
                >
                  {i < howItWorksTeam.phases.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[0.55rem] top-10 w-px bg-gradient-to-b from-white/20 to-transparent md:left-[0.7rem]"
                    />
                  ) : null}
                  <div className="relative z-10 flex items-start gap-2.5 pt-0.5">
                    <span
                      aria-hidden
                      className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                        i === 0
                          ? "bg-finova-cyan shadow-[0_0_12px_rgba(14,165,233,0.55)]"
                          : i === 1
                            ? "bg-finova-magenta shadow-[0_0_12px_rgba(217,70,239,0.45)]"
                            : "bg-finova-lightBlue shadow-[0_0_12px_rgba(56,189,248,0.45)]"
                      }`}
                    />
                    <span
                      className={`text-base font-semibold tracking-tight capitalize md:text-lg ${accents[i]}`}
                    >
                      {phase.mark}
                    </span>
                  </div>
                  <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                    {phase.body}
                  </p>
                </li>
              ))}
            </ol>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12, ease }}
              className="mt-4 max-w-2xl border-t border-white/10 pt-10 text-base font-light leading-relaxed text-white/70 md:text-lg"
            >
              {howItWorksTeam.close}
            </motion.p>
          </div>
        </div>
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
          {howItWorksAudience.heading}
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
              {howItWorksAudience.paragraphs[0]}
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
              {howItWorksAudience.paragraphs[1]}
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
          {howItWorksFaqs.map((faq, i) => {
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
                          {faq.answer.includes("QualiCore") ? (
                            <LinkedPhrase
                              text={faq.answer}
                              phrase="QualiCore"
                              href="/solutions/ai-quality-assurance"
                            />
                          ) : faq.question.includes("cost") ? (
                            <LinkedPhrase
                              text={faq.answer}
                              phrase="written deliverable"
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
          {howItWorksFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {howItWorksFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas
            primaryLabel={howItWorksFinal.primaryCta}
            secondaryLabel={howItWorksFinal.secondaryCta}
            secondaryHref={howItWorksFinal.secondaryHref}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-3"
        >
          {howItWorksSiblings.map((s) => (
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

export default function HowItWorksPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Model />
      <Stages />
      <Timeline />
      <Why />
      <Proof />
      <Team />
      <Audience />
      <Faq />
      <FinalBand />
    </main>
  )
}
