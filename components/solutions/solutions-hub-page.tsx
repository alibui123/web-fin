"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Bot, ChevronRight, Plus } from "lucide-react"
import { CALENDLY_URL } from "@/lib/site"
import {
  READINESS_URL,
  solutionCards,
  solutionsHubChoose,
  solutionsHubConnective,
  solutionsHubFaqs,
  solutionsHubFinal,
  solutionsHubHero,
  solutionsHubPlate,
  solutionsHubProof,
} from "@/lib/solutions-hub"

const HeroCanvas = dynamic(
  () => import("@/components/solutions/neural-intelligence/HeroCanvas"),
  { ssr: false },
)

const faqColors = [
  "from-finova-cyan to-finova-blue",
  "from-finova-magenta to-finova-purple",
  "from-finova-lightBlue to-finova-cyan",
]

function DualCtas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${className}`}>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-finova-cyan hover:text-white"
      >
        {solutionsHubHero.primaryCta}
        <ArrowRight className="w-4 h-4" />
      </a>
      <Link
        href={READINESS_URL}
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/[0.03] text-white text-sm font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10"
      >
        {solutionsHubHero.secondaryCta}
      </Link>
    </div>
  )
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/45">
        <li>
          <Link href="/" className="hover:text-finova-cyan transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-white/25">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="text-white/80" aria-current="page">
          Solutions
        </li>
      </ol>
    </nav>
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-finova-cyan/10 via-finova-midnight to-finova-midnight pointer-events-none" />
      {/* Premium Neural Intelligence Core — ~40% hero width on desktop */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[48%] lg:w-[42%]">
        <div
          className="relative h-full min-h-[280px] md:min-h-full w-full opacity-60 md:opacity-100"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 65% at 55% 45%, #000 35%, transparent 78%)",
            maskImage:
              "radial-gradient(ellipse 70% 65% at 55% 45%, #000 35%, transparent 78%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none md:pointer-events-auto">
            <HeroCanvas />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]"
        >
          {solutionsHubHero.h1}
        </motion.h1>

        <div className="mt-8 max-w-2xl space-y-5">
          {solutionsHubHero.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
          className="mt-10"
        >
          <DualCtas />
        </motion.div>
      </div>
    </section>
  )
}

function Connective() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-12% 0px" })
  const [lead, detail] = solutionsHubConnective.paragraphs

  // Exact surfaces from the lead paragraph — visual hierarchy only
  const jobs = [
    "back office",
    "phones",
    "documents",
  ] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-connect]", {
        y: 28,
        duration: 0.7,
        stagger: 0.08,
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
      className="relative overflow-hidden border-y border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_20%_40%,rgba(14,165,233,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_90%_70%,rgba(147,51,234,0.1),transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20">
          {/* Visual: one core, many jobs */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <h2
              data-connect
              className="mb-10 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:hidden"
            >
              {solutionsHubConnective.heading}
            </h2>

            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-[8%] rounded-full border border-white/10" />
              <div className="absolute inset-[20%] rounded-full border border-dashed border-white/10" />

              <motion.div
                animate={
                  inView
                    ? {
                        boxShadow: [
                          "0 0 36px rgba(14,165,233,0.12)",
                          "0 0 64px rgba(14,165,233,0.32)",
                          "0 0 36px rgba(14,165,233,0.12)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[34%] z-[1] flex items-center justify-center rounded-full border border-finova-cyan/40 bg-gradient-to-br from-finova-cyan/25 via-[#0a1228] to-finova-magenta/20 backdrop-blur-sm"
              >
                <Bot className="h-8 w-8 text-finova-cyan" strokeWidth={1.25} />
              </motion.div>

              {jobs.map((job, i) => {
                const angle = -90 + i * 120
                return (
                  <div
                    key={job}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className="absolute left-1/2 top-[8%] z-10 w-[7.5rem]"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                      }}
                    >
                      <motion.div
                        data-connect
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                        className="rounded-xl border border-white/15 bg-[#070d22]/95 px-3 py-2.5 text-center shadow-lg backdrop-blur-md"
                      >
                        <span className="block text-[11px] font-medium leading-snug text-white/75">
                          {job}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Copy */}
          <div>
            <h2
              data-connect
              className="mb-8 hidden text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:block lg:leading-[1.1]"
            >
              {solutionsHubConnective.heading}
            </h2>

            <p
              data-connect
              className="text-base font-light leading-relaxed text-white/65 md:text-lg"
            >
              {(() => {
                const pivot = "one agentic core"
                const [pre, post] = lead.split(pivot)
                return (
                  <>
                    {pre}
                    <Link
                      href={solutionsHubProof.howItWorksHref}
                      className="font-medium text-finova-cyan underline-offset-4 transition-colors hover:text-finova-lightBlue hover:underline"
                    >
                      {pivot}
                    </Link>
                    {post}
                  </>
                )
              })()}
            </p>

            <div className="my-8 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

            <p
              data-connect
              className="text-base font-light leading-relaxed text-white/65 md:text-lg"
            >
              {detail}
            </p>

            <div
              data-connect
              className="mt-10 flex flex-wrap gap-2"
            >
              {solutionCards.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/55 transition-colors hover:border-finova-cyan/40 hover:text-white md:text-sm"
                >
                  {card.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12 md:mb-16 max-w-2xl"
        >
          {solutionsHubPlate.heading}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {solutionCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.08 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 overflow-hidden transition-colors duration-500 hover:border-finova-cyan/30 hover:bg-white/[0.04]"
              >
                <div
                  className={`absolute -top-24 -right-16 w-56 h-56 rounded-full bg-gradient-to-br ${card.accent} opacity-[0.07] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.14] pointer-events-none`}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent}`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-white/60 text-sm md:text-[15px] font-light leading-relaxed mb-5">
                    {card.body}
                  </p>
                  <p className="text-white/80 text-sm md:text-[15px] font-medium leading-relaxed mb-6">
                    Outcome, {card.outcome}
                  </p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-finova-cyan group-hover:text-finova-lightBlue transition-colors"
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProofStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const linkedPhrase = "our customers page"
  const [before, after] = solutionsHubProof.body.split(linkedPhrase)

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 border-y border-white/5 bg-gradient-to-r from-finova-cyan/[0.04] via-transparent to-finova-magenta/[0.04]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6"
        >
          {solutionsHubProof.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed"
        >
          {before}
          <Link
            href={solutionsHubProof.customersHref}
            className="text-finova-cyan hover:text-finova-lightBlue transition-colors font-medium"
          >
            {linkedPhrase}
          </Link>
          {after}
        </motion.p>
      </div>
    </section>
  )
}

function ChooseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  // Exact phrases from the body — visual hierarchy only
  const beats = [
    "map one workflow end to end",
    "where the hours and the revenue are going",
    "which solution should run first and which should stay human",
  ] as const

  const body = solutionsHubChoose.body
  const auditPhrase = "the audit"
  const [pre, post] = body.split(auditPhrase)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_20%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-finova-magenta/10 blur-[90px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-finova-cyan/[0.06] p-7 md:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-finova-cyan/15 blur-[80px]" />

          <div className="relative grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 xl:gap-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
              >
                {solutionsHubChoose.heading}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-base font-light leading-relaxed text-white/60 md:text-lg"
              >
                {pre}
                <Link
                  href="/solutions/ai-consulting"
                  className="font-medium text-finova-cyan underline-offset-4 transition-colors hover:text-finova-lightBlue hover:underline"
                >
                  {auditPhrase}
                </Link>
                {post}
              </motion.p>
            </div>

            <div className="relative">
              <div className="absolute bottom-3 left-[1.15rem] top-3 hidden w-px bg-gradient-to-b from-finova-cyan/50 via-white/15 to-transparent sm:block" />
              <ol className="space-y-3">
                {beats.map((beat, i) => (
                  <motion.li
                    key={beat}
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.55,
                      delay: 0.12 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative flex gap-4 rounded-2xl border border-white/10 bg-[#070d22]/55 px-4 py-4 backdrop-blur-sm sm:gap-5 sm:px-5"
                  >
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-finova-cyan/35 bg-finova-cyan/10 font-mono text-[11px] font-bold tracking-widest text-finova-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1.5 text-[15px] font-medium leading-snug text-white/80 md:text-base">
                      {beat}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionsFaq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10"
        >
          Common questions
        </motion.h2>
        <div>
          {solutionsHubFaqs.map((faq, i) => {
            const isActive = active === i
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="relative group cursor-pointer mb-4"
                onClick={() => setActive(isActive ? -1 : i)}
              >
                <div
                  className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${faqColors[i % faqColors.length]} opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-[1px]`}
                />
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 md:px-6 md:py-5 backdrop-blur-sm">
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
          {solutionsHubFinal.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10"
        >
          {solutionsHubFinal.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <DualCtas />
        </motion.div>
      </div>
    </section>
  )
}

export default function SolutionsHubPage() {
  return (
    <main className="bg-finova-midnight text-white">
      <Hero />
      <Connective />
      <SolutionGrid />
      <ProofStrip />
      <ChooseSection />
      <SolutionsFaq />
      <FinalBand />
    </main>
  )
}
