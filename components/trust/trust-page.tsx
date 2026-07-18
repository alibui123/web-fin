"use client"

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react"
import Link from "next/link"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  ChevronRight,
  Plus,
  Shield,
  Lock,
  Globe,
  Database,
  Fingerprint,
  Eye,
  UserCheck,
  ScrollText,
  Gauge,
  BadgeCheck,
  Check,
  Ban,
  PhoneIncoming,
  Megaphone,
  Split,
} from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  trustAudience,
  trustCompliance,
  trustConsent,
  trustData,
  trustEscalation,
  trustFaqHeading,
  trustFaqs,
  trustGovernance,
  trustHero,
  trustInvite,
  trustScope,
  trustSiblings,
} from "@/lib/trust"

const ease = [0.16, 1, 0.3, 1] as const

function Container({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium tracking-wide text-white/40">
        <li>
          <Link href="/" className="transition-colors hover:text-finova-cyan">
            Home
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" />
        </li>
        <li className="text-white/75" aria-current="page">
          Trust and security
        </li>
      </ol>
    </nav>
  )
}

function MultiLinkedText({
  text,
  links,
}: {
  text: string
  links: { phrase: string; href: string; once?: boolean }[]
}) {
  type Segment = { type: "text"; value: string } | { type: "link"; phrase: string; href: string }
  let segments: Segment[] = [{ type: "text", value: text }]

  for (const link of links) {
    const next: Segment[] = []
    let linkedOnce = false
    for (const seg of segments) {
      if (seg.type === "link") {
        next.push(seg)
        continue
      }
      if (link.once && linkedOnce) {
        next.push(seg)
        continue
      }
      if (link.once) {
        const idx = seg.value.indexOf(link.phrase)
        if (idx === -1) {
          next.push(seg)
          continue
        }
        const before = seg.value.slice(0, idx)
        const after = seg.value.slice(idx + link.phrase.length)
        if (before) next.push({ type: "text", value: before })
        next.push({ type: "link", phrase: link.phrase, href: link.href })
        if (after) next.push({ type: "text", value: after })
        linkedOnce = true
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
        ),
      )}
    </>
  )
}

function MagneticButton({
  children,
  href,
  external,
  variant = "primary",
}: {
  children: ReactNode
  href: string
  external?: boolean
  variant?: "primary" | "secondary"
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2)
  }

  const primary =
    "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-finova-cyan hover:text-white active:bg-finova-cyan active:text-white will-change-transform"
  const secondary =
    "group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-finova-cyan/50 hover:bg-finova-cyan/10 will-change-transform"

  const shared = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: () => {
      x.set(0)
      y.set(0)
    },
    onPointerUp: clearStickyCta,
    style: { x: springX, y: springY },
    className: variant === "primary" ? primary : secondary,
  }

  if (external) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </motion.a>
    )
  }

  return (
    <motion.a href={href} {...shared}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </motion.a>
  )
}

/** Split at first ". " for visual hierarchy — wording unchanged */
function leadRest(text: string) {
  const i = text.indexOf(". ")
  if (i === -1) return { lead: text, rest: "" }
  return { lead: text.slice(0, i + 1), rest: text.slice(i + 2) }
}

const dataIcons = [Database, Globe, Lock, Fingerprint]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/5 pt-28 pb-20 md:min-h-[88vh] md:pt-32 md:pb-28"
    >
      <motion.div
        style={{ y: orbY }}
        className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-finova-cyan/15 blur-[100px]"
      />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-[22rem] w-[22rem] rounded-full bg-finova-magenta/12 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(14,165,233,0.12),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <Container>
        <motion.div style={{ y: contentY }}>
          <Breadcrumb />

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.06, ease }}
                className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.08]"
              >
                {trustHero.h1}
              </motion.h1>

              <div className="mt-8 max-w-2xl space-y-5">
                {trustHero.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.14 + i * 0.08, ease }}
                    className="text-base font-light leading-relaxed text-white/60 md:text-lg"
                  >
                    <MultiLinkedText
                      text={p}
                      links={
                        i === 0
                          ? [
                              { phrase: "healthcare", href: "/industries/healthcare" },
                              {
                                phrase: "finance",
                                href: "/industries/financial-services",
                              },
                            ]
                          : []
                      }
                    />
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.32, ease }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <MagneticButton href={CALENDLY_URL} external>
                  {trustHero.primaryCta}
                </MagneticButton>
                <MagneticButton href={CALENDLY_URL} external variant="secondary">
                  {trustHero.secondaryCta}
                </MagneticButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.18, ease }}
              className="relative mx-auto hidden w-full max-w-md lg:block"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-[12%] rounded-full border border-finova-cyan/20" />
                <div className="absolute inset-[24%] rounded-full border border-white/10" />
                <div className="absolute inset-[36%] flex items-center justify-center rounded-full border border-finova-magenta/25 bg-gradient-to-br from-finova-cyan/20 via-white/[0.04] to-finova-magenta/15 shadow-[0_0_60px_rgba(14,165,233,0.2)] backdrop-blur-sm">
                  <Shield className="h-14 w-14 text-finova-cyan" strokeWidth={1.25} />
                </div>
                {[
                  { Icon: Lock, top: "8%", left: "42%" },
                  { Icon: Eye, top: "42%", left: "78%" },
                  { Icon: UserCheck, top: "78%", left: "42%" },
                  { Icon: Globe, top: "42%", left: "6%" },
                ].map(({ Icon, top, left }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top, left }}
                    aria-hidden
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#080e24]/85 shadow-lg backdrop-blur-md">
                      <Icon className="h-4 w-4 text-finova-cyan" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function DataPosture() {
  return (
    <section className="relative border-b border-white/5 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_50%,rgba(14,165,233,0.08),transparent_55%)]" />
      <Container>
        <Reveal>
          <h2 className="mx-auto mb-12 max-w-2xl text-center text-3xl font-bold tracking-tight text-white md:mb-16 md:text-4xl lg:text-[2.75rem]">
            {trustData.heading}
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {trustData.pillars.map((pillar, i) => {
            const { lead, rest } = leadRest(pillar.text)
            const Icon = dataIcons[i]
            return (
              <Reveal key={i} delay={i * 0.05}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-finova-cyan/35 hover:bg-white/[0.045] md:p-8">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-finova-cyan transition-colors group-hover:border-finova-cyan/30 group-hover:bg-finova-cyan/10">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="mb-3 font-mono text-[11px] tracking-[0.2em] text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 text-lg font-semibold tracking-tight text-white md:text-xl">
                    {lead}
                  </h3>
                  <p className="text-[15px] font-light leading-relaxed text-white/60 md:text-base">
                    {rest}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function Compliance() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-comp]", {
        y: 32,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_100%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2
            data-comp
            className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
          >
            {trustCompliance.heading}
          </h2>
          <div className="mt-8 space-y-6">
            {trustCompliance.paragraphs.map((p, i) => (
              <p
                key={i}
                data-comp
                className="text-base font-light leading-relaxed text-white/60 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Governance() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-12% 0px" })

  // Exact words from the H2 — visual hierarchy only, no new copy
  const beats = [
    { word: "logged", Icon: ScrollText, accent: "text-finova-cyan", ring: "border-finova-cyan/40 bg-finova-cyan/10" },
    { word: "scored", Icon: Gauge, accent: "text-finova-lightBlue", ring: "border-finova-lightBlue/40 bg-finova-lightBlue/10" },
    { word: "signed off", Icon: BadgeCheck, accent: "text-finova-magenta", ring: "border-finova-magenta/40 bg-finova-magenta/10" },
  ] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-gov-beat]", {
        y: 36,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      })
      gsap.fromTo(
        "[data-gov-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const body = trustGovernance.paragraphs[1]
  const cta = trustGovernance.governanceAnchor
  const bodyBeforeCta = body.slice(0, body.lastIndexOf(cta)).trimEnd()

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(14,165,233,0.11),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-finova-magenta/10 blur-[100px]" />

      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 xl:gap-20">
          {/* Left: heading + loop */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 className="max-w-md text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                {trustGovernance.heading}
              </h2>
            </Reveal>

            <div ref={trackRef} className="relative mt-10 md:mt-12">
              {/* Mobile stack */}
              <ol className="flex flex-col gap-5 md:hidden">
                {beats.map(({ word, Icon, accent, ring }, i) => (
                  <li
                    key={word}
                    data-gov-beat
                    className="relative flex flex-row items-center gap-4"
                  >
                    <div
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-[#070d22] ${ring}`}
                    >
                      <Icon className={`h-6 w-6 ${accent}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="mb-0.5 block font-mono text-[10px] tracking-[0.2em] text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-base font-semibold tracking-tight capitalize ${accent}`}>
                        {word}
                      </span>
                    </div>
                    {i < beats.length - 1 ? (
                      <div
                        className="absolute left-[1.7rem] top-[3.55rem] h-5 w-px bg-gradient-to-b from-white/30 to-transparent"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                ))}
              </ol>

              {/* Desktop: icons with gaps — line only between tiles */}
              <ol className="hidden md:flex md:items-start">
                {beats.map(({ word, Icon, accent, ring }, i) => (
                  <li key={word} className="contents">
                    <div
                      data-gov-beat
                      className="flex min-w-0 flex-1 flex-col items-center text-center"
                    >
                      <motion.div
                        animate={
                          inView
                            ? {
                                boxShadow: [
                                  "0 0 0 0 rgba(14,165,233,0)",
                                  "0 0 28px 0 rgba(14,165,233,0.25)",
                                  "0 0 0 0 rgba(14,165,233,0)",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2.4,
                          delay: 0.5 + i * 0.35,
                          repeat: Infinity,
                          repeatDelay: 1.2,
                        }}
                        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border bg-[#070d22] ${ring}`}
                      >
                        <Icon className={`h-6 w-6 ${accent}`} strokeWidth={1.5} />
                      </motion.div>
                      <span className="mt-3 mb-0.5 block font-mono text-[10px] tracking-[0.2em] text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-lg font-semibold tracking-tight capitalize ${accent}`}>
                        {word}
                      </span>
                    </div>
                    {i < beats.length - 1 ? (
                      <div
                        data-gov-line
                        className="mt-7 h-px min-w-[1.25rem] flex-1 origin-left self-start bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-magenta"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: copy */}
          <div className="relative">
            <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-finova-cyan/35 via-transparent to-finova-magenta/30 opacity-60" />
            <div className="relative rounded-[1.75rem] border border-white/10 bg-[#070d22]/80 p-7 backdrop-blur-md md:p-9 lg:p-10">
              <Reveal>
                <p className="text-base font-light leading-relaxed text-white/65 md:text-lg">
                  {trustGovernance.paragraphs[0]}
                </p>
              </Reveal>

              <div className="my-8 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

              <Reveal delay={0.1}>
                <p className="text-base font-light leading-relaxed text-white/65 md:text-lg">
                  <MultiLinkedText
                    text={bodyBeforeCta}
                    links={[
                      {
                        phrase: "QualiCore",
                        href: "/solutions/ai-quality-assurance",
                      },
                    ]}
                  />
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <Link
                  href={trustGovernance.governanceHref}
                  className="group mt-9 inline-flex items-center gap-3 rounded-full border border-finova-cyan/35 bg-finova-cyan/10 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-finova-cyan transition-all duration-300 hover:border-finova-cyan/60 hover:bg-finova-cyan/20 hover:text-white"
                >
                  {trustGovernance.governanceAnchor}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ScopeExample() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" })

  // Exact phrases from the body — visual hierarchy only
  const allowed = ["a first name", "a phone number", "a treatment interest"] as const
  const blocked = ["clinical information", "medical advice", "a clinical conversation"] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-scope-row]", {
        y: 20,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.fromTo(
        "[data-scope-wall]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_40%,rgba(14,165,233,0.09),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)",
          backgroundSize: "3rem 3rem",
        }}
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          <div>
            <Reveal>
              <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                {trustScope.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base font-light leading-relaxed text-white/60 md:text-lg">
                <MultiLinkedText
                  text={trustScope.body}
                  links={[{ phrase: "clinic", href: "/industries/healthcare", once: true }]}
                />
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative">
              <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-b from-finova-cyan/40 via-white/10 to-white/5 opacity-70" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070d22]/90 backdrop-blur-md">
                {/* In: exact collectibles */}
                <div className="p-5 sm:p-6">
                  <ul className="space-y-2.5">
                    {allowed.map((item, i) => (
                      <li
                        key={item}
                        data-scope-row
                        className="flex items-center gap-3 rounded-xl border border-finova-cyan/25 bg-finova-cyan/[0.07] px-4 py-3"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-finova-cyan/35 bg-finova-cyan/15 text-finova-cyan">
                          <Check className="h-4 w-4" strokeWidth={2.25} />
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.16em] text-white/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-white/85 md:text-[15px]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architectural boundary */}
                <div className="relative px-5 py-4 sm:px-6">
                  <div
                    data-scope-wall
                    className="h-px w-full origin-left bg-gradient-to-r from-finova-cyan via-finova-magenta to-transparent"
                  />
                  <motion.div
                    animate={
                      inView
                        ? { opacity: [0.4, 1, 0.4], scale: [0.92, 1, 0.92] }
                        : {}
                    }
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  >
                    <span className="rounded-full border border-white/15 bg-[#070d22] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
                      and nothing else
                    </span>
                  </motion.div>
                </div>

                {/* Out: exact exclusions */}
                <div className="border-t border-white/5 bg-white/[0.015] p-5 sm:p-6">
                  <ul className="space-y-2.5">
                    {blocked.map((item, i) => (
                      <li
                        key={item}
                        data-scope-row
                        className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 opacity-55"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/35">
                          <Ban className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.16em] text-white/20">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-white/45 line-through decoration-white/25 md:text-[15px]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Escalation() {
  return (
    <section className="relative border-b border-white/5 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_100%_50%,rgba(217,70,239,0.08),transparent_50%)]" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-finova-magenta/30 bg-finova-magenta/10 text-finova-magenta">
              <UserCheck className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {trustEscalation.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 text-base font-light leading-relaxed text-white/60 md:text-lg">
              {trustEscalation.body}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Consent() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-12% 0px" })

  // Exact phrases from the body — visual hierarchy only
  const regimes = [
    {
      label: "Inbound service consent",
      Icon: PhoneIncoming,
      accent: "text-finova-cyan",
      ring: "border-finova-cyan/35 bg-finova-cyan/10",
      glow: "from-finova-cyan/20",
    },
    {
      label: "outbound or marketing contact",
      Icon: Megaphone,
      accent: "text-finova-magenta",
      ring: "border-finova-magenta/35 bg-finova-magenta/10",
      glow: "from-finova-magenta/20",
    },
  ] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-consent-card]", {
        y: 28,
        duration: 0.7,
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_20%_30%,rgba(14,165,233,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_85%_70%,rgba(217,70,239,0.1),transparent_50%)]" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem]">
              {trustConsent.heading}
            </h2>
          </Reveal>
        </div>

        {/* Two separate regimes — never bundled */}
        <div className="relative mx-auto mt-12 max-w-4xl md:mt-14">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-0">
            {regimes.map((regime, i) => (
              <div key={regime.label} className="contents">
                {i === 1 ? (
                  <div className="relative flex items-center justify-center py-2 md:px-5 md:py-0">
                    {/* Mobile separator */}
                    <div className="flex w-full items-center gap-3 md:hidden">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#070d22] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
                        <Split className="h-3 w-3 text-white/40" />
                        We keep them separate
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                    {/* Desktop vertical separator */}
                    <div className="absolute inset-y-4 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent md:block" />
                    <motion.div
                      animate={
                        inView
                          ? { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }
                          : {}
                      }
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 hidden max-w-[7.5rem] flex-col items-center gap-2 rounded-2xl border border-white/12 bg-[#070d22] px-3 py-4 text-center md:flex"
                    >
                      <Ban className="h-4 w-4 text-white/40" strokeWidth={2} />
                      <span className="font-mono text-[9px] leading-snug uppercase tracking-[0.16em] text-white/50">
                        We keep them separate
                      </span>
                    </motion.div>
                  </div>
                ) : null}

                <article
                  data-consent-card
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 md:p-7"
                >
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${regime.glow} to-transparent blur-2xl opacity-80`}
                  />
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${regime.ring}`}
                  >
                    <regime.Icon className={`h-5 w-5 ${regime.accent}`} strokeWidth={1.5} />
                  </div>
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={`text-lg font-semibold tracking-tight md:text-xl ${regime.accent}`}>
                    {regime.label}
                  </p>
                  <div
                    className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${regime.glow} to-transparent transition-all duration-400 group-hover:w-20`}
                  />
                </article>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-12 max-w-3xl text-center text-base font-light leading-relaxed text-white/60 md:mt-14 md:text-lg">
            {trustConsent.body}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

function Audience() {
  return (
    <section className="relative border-b border-white/5 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(14,165,233,0.08),transparent_55%)]" />
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-xl text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
            {trustAudience.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base font-light leading-relaxed text-white/60 md:text-lg">
            <MultiLinkedText
              text={trustAudience.body}
              links={[
                { phrase: "finance", href: "/industries/financial-services" },
                { phrase: "government", href: "/industries/government" },
              ]}
            />
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative border-b border-white/5 py-20 md:py-28">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-finova-purple/10 blur-[100px]" />
      <Container>
        <Reveal>
          <h2 className="mx-auto mb-12 max-w-xl text-center text-3xl font-bold tracking-tight text-white md:mb-14 md:text-4xl">
            {trustFaqHeading}
          </h2>
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {trustFaqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-finova-cyan/35 bg-white/[0.05]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-4">
                    <span
                      className={`mt-0.5 font-mono text-xs font-bold tracking-widest ${
                        isOpen ? "text-finova-cyan" : "text-white/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-base font-semibold tracking-tight md:text-lg ${
                        isOpen ? "text-white" : "text-white/85"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.35, ease }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                      isOpen
                        ? "border-finova-cyan/40 bg-finova-cyan/10 text-finova-cyan"
                        : "border-white/10 text-white/45"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/5 px-5 pb-6 pt-1 md:px-7 md:pb-7">
                        <p className="ml-10 text-[15px] font-light leading-relaxed text-white/60 md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function Invite() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(14,165,233,0.18),transparent_65%)]" />
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            {trustInvite.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/60 md:text-lg">
            {trustInvite.body}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href={CALENDLY_URL} external>
              {trustInvite.primaryCta}
            </MagneticButton>
            <MagneticButton href={trustInvite.secondaryHref} variant="secondary">
              {trustInvite.secondaryCta}
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <nav
            aria-label="Related pages"
            className="mt-16 flex flex-wrap items-center justify-center gap-y-2 text-sm text-white/35"
          >
            {trustSiblings.map((s, i) => (
              <span key={s.href} className="inline-flex items-center">
                {i > 0 ? <span className="mx-3 text-white/15">·</span> : null}
                <Link href={s.href} className="transition-colors hover:text-finova-cyan">
                  {s.name}
                </Link>
              </span>
            ))}
          </nav>
        </Reveal>
      </Container>
    </section>
  )
}

export default function TrustPage() {
  return (
    <main className="bg-finova-midnight text-white selection:bg-finova-magenta/30 selection:text-white">
      <Hero />
      <DataPosture />
      <Compliance />
      <Governance />
      <ScopeExample />
      <Escalation />
      <Consent />
      <Audience />
      <Faq />
      <Invite />
    </main>
  )
}
