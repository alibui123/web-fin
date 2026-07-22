"use client"

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react"
import Link from "next/link"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Cpu,
  HeartPulse,
  Landmark,
  Scale,
  Truck,
  Wrench,
} from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  industriesCore,
  industriesEmerging,
  industriesGrid,
  industriesHero,
  industriesInvite,
  industriesNotListed,
  industriesProof,
  industriesSiblings,
} from "@/lib/industries"

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
          Industries
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
  links: { phrase: string; href: string; external?: boolean }[]
}) {
  type Segment =
    | { type: "text"; value: string }
    | { type: "link"; phrase: string; href: string; external?: boolean }
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
          next.push({
            type: "link",
            phrase: link.phrase,
            href: link.href,
            external: link.external,
          })
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
        ) : seg.external ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-finova-cyan underline-offset-4 transition-colors hover:text-finova-lightBlue hover:underline"
          >
            {seg.phrase}
          </a>
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

const industryVisual = [
  {
    Icon: HeartPulse,
    iconClass: "text-finova-cyan border-finova-cyan/35 bg-finova-cyan/10",
  },
  {
    Icon: Building2,
    iconClass: "text-finova-lightBlue border-finova-lightBlue/35 bg-finova-lightBlue/10",
  },
  {
    Icon: Landmark,
    iconClass: "text-finova-purple border-finova-purple/35 bg-finova-purple/10",
  },
  {
    Icon: Wrench,
    iconClass: "text-finova-magenta border-finova-magenta/35 bg-finova-magenta/10",
  },
] as const

function IndustryNavigator() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15, ease }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-2 md:p-3"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-finova-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-finova-magenta/10 blur-3xl" />

      <div className="relative">
        {industriesGrid.items.map((item, i) => {
          const { Icon, iconClass } = industryVisual[i]
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 border-t border-white/10 px-3 py-5 transition-colors duration-300 first:border-t-0 hover:bg-white/[0.03] md:gap-5 md:px-4 md:py-6"
            >
              <div
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${iconClass}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-base font-semibold tracking-tight text-white md:text-lg">
                  {item.name}
                </span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-finova-cyan/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.cta}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-finova-cyan" />
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/5 pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="absolute inset-0 bg-finova-midnight" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_15%_0%,rgba(14,165,233,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_90%_70%,rgba(217,70,239,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-finova-purple/10 blur-[100px]" />

      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Breadcrumb />

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease }}
              className="text-4xl font-bold tracking-tight text-white leading-[1.08] sm:text-5xl xl:text-[3.25rem]"
            >
              {industriesHero.h1Lead}
              <br />
              <span className="text-white/45">{industriesHero.h1Accent}</span>
            </motion.h1>

            <div className="mt-8 space-y-0 md:mt-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.7, ease }}
                className="relative border-l border-l-finova-magenta/40 py-0 pl-6 md:pl-8"
              >
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-finova-magenta"
                />
                <p className="text-base font-light leading-relaxed text-white/65 md:text-lg">
                  <MultiLinkedText
                    text={industriesHero.paragraphs[0]}
                    links={[
                      { phrase: "clinic", href: "/industries/healthcare" },
                      { phrase: "bank", href: "/industries/financial-services" },
                      {
                        phrase: "government department",
                        href: "/industries/government",
                      },
                    ]}
                  />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.18, duration: 0.7, ease }}
                className="relative mt-8 border-l border-l-finova-cyan/35 py-0 pl-6 md:mt-10 md:pl-8"
              >
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-finova-cyan"
                />
                <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                  {industriesHero.paragraphs[1]}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.65, ease }}
              className="mt-10"
            >
              <DualCtas
                primaryLabel={industriesHero.primaryCta}
                secondaryLabel={industriesHero.secondaryCta}
                secondaryHref={industriesHero.secondaryHref}
                className="items-start"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <IndustryNavigator />
          </div>
        </div>
      </Container>
    </section>
  )
}

function Core() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-12% 0px" })

  // Exact phrases from the body — visual hierarchy only
  const hardParts = [
    "understanding a request",
    "acting inside your systems",
    "governing the quality of the work",
  ] as const
  const surfaceParts = [
    "the terminology your customers use",
    "the workflow your team follows",
    "the rules you operate under",
  ] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-core-row]", {
        y: 22,
        duration: 0.55,
        stagger: 0.06,
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
      className="relative border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_15%_40%,rgba(14,165,233,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_90%_70%,rgba(147,51,234,0.1),transparent_50%)]" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
          {/* Visual: one core, surface tuning */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <Reveal>
              <h2 className="mb-10 text-3xl font-bold tracking-tight text-white md:text-4xl lg:hidden">
                {industriesCore.heading}
              </h2>
            </Reveal>

            <div className="relative mx-auto hidden aspect-square w-full max-w-md sm:block lg:mx-0">
              {/* Outer orbit rings */}
              <div className="absolute inset-[6%] rounded-full border border-white/10" />
              <div className="absolute inset-[18%] rounded-full border border-dashed border-white/10" />

              {/* Core */}
              <motion.div
                animate={
                  inView
                    ? {
                        boxShadow: [
                          "0 0 40px rgba(14,165,233,0.15)",
                          "0 0 70px rgba(14,165,233,0.35)",
                          "0 0 40px rgba(14,165,233,0.15)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[32%] z-[1] flex items-center justify-center rounded-full border border-finova-cyan/40 bg-gradient-to-br from-finova-cyan/25 via-[#0a1228] to-finova-magenta/20 backdrop-blur-sm"
              >
                <Cpu className="h-8 w-8 text-finova-cyan" strokeWidth={1.25} />
              </motion.div>

              {/* Surface nodes — same orbit, equal 120° spacing, text upright */}
              {surfaceParts.map((label, i) => {
                const angle = -90 + i * 120
                return (
                  <div
                    key={label}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className="absolute left-1/2 top-[6%] z-10 w-[9.5rem]"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease }}
                      >
                        <div className="rounded-xl border border-white/15 bg-[#070d22]/95 px-3 py-2.5 text-center shadow-lg backdrop-blur-md">
                          <span className="block text-[11px] font-medium leading-snug text-white/70">
                            {label}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Copy + hard part / two ways */}
          <div>
            <Reveal>
              <h2 className="mb-8 hidden text-3xl font-bold tracking-tight text-white md:text-4xl lg:block lg:text-[2.65rem] lg:leading-[1.12]">
                {industriesCore.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                {industriesCore.paragraphs[0]}
              </p>
            </Reveal>

            <div className="mt-8 space-y-2.5">
              {hardParts.map((part, i) => (
                <div
                  key={part}
                  data-core-row
                  className="flex items-center gap-3 rounded-xl border border-finova-cyan/20 bg-finova-cyan/[0.06] px-4 py-3"
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-finova-cyan/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-white/80 md:text-[15px]">
                    {part}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-8 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

            <Reveal delay={0.1}>
              <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                {industriesCore.paragraphs[1]}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Grid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-industry]", {
        y: 36,
        duration: 0.7,
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
      className="relative border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(14,165,233,0.08),transparent_55%)]" />
      <Container>
        <Reveal>
          <h2 className="mx-auto mb-12 max-w-xl text-center text-3xl font-bold tracking-tight text-white md:mb-16 md:text-4xl">
            {industriesGrid.heading}
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {industriesGrid.items.map((item, i) => {
            const { Icon, iconClass } = industryVisual[i]
            return (
              <article
                key={item.href}
                data-industry
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.045] md:p-8"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${iconClass}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="mb-3 font-mono text-[11px] tracking-[0.2em] text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {item.name}
                </h3>
                <p className="mb-8 flex-1 text-[15px] font-light leading-relaxed text-white/60 md:text-base">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-finova-cyan transition-colors group-hover:text-white"
                >
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function Emerging() {
  return (
    <section className="relative border-b border-white/5 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_60%,rgba(217,70,239,0.08),transparent_50%)]" />
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                {industriesEmerging.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 md:px-5 md:py-3">
                  <Scale className="h-5 w-5 shrink-0 text-finova-cyan" />
                  <span className="text-base font-medium text-white/80 md:text-lg">
                    {industriesEmerging.legalPhrase}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 md:px-5 md:py-3">
                  <Truck className="h-5 w-5 shrink-0 text-finova-magenta" />
                  <span className="text-base font-medium text-white/80 md:text-lg">
                    {industriesEmerging.logisticsPhrase}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="space-y-6">
            {industriesEmerging.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.06 + i * 0.06}>
                <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                  {i === 1 ? (
                    <MultiLinkedText
                      text={p}
                      links={[
                        {
                          phrase: industriesEmerging.resourcesPhrase,
                          href: industriesEmerging.resourcesHref,
                        },
                        {
                          phrase: industriesEmerging.auditPhrase,
                          href: industriesEmerging.auditHref,
                        },
                      ]}
                    />
                  ) : (
                    p
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Proof() {
  return (
    <section className="relative border-b border-white/5 py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-finova-cyan/[0.1] via-white/[0.02] to-finova-magenta/[0.08] p-7 md:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-finova-cyan/15 blur-[80px]" />
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              {industriesProof.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-white/65 md:text-lg">
              <MultiLinkedText
                text={industriesProof.body}
                links={[
                  {
                    phrase: industriesProof.customersAnchor,
                    href: industriesProof.customersHref,
                  },
                ]}
              />
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function NotListed() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lit, setLit] = useState(0)

  const accents = [
    { text: "text-finova-cyan", bar: "from-finova-cyan to-finova-lightBlue", dot: "bg-finova-cyan" },
    { text: "text-finova-lightBlue", bar: "from-finova-lightBlue to-finova-cyan", dot: "bg-finova-lightBlue" },
    { text: "text-finova-magenta", bar: "from-finova-magenta to-finova-purple", dot: "bg-finova-magenta" },
  ] as const

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-nl-y]", {
        y: 28,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
      gsap.from("[data-nl-lit]", {
        opacity: 0,
        x: -20,
        duration: 0.55,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setLit((n) => (n + 1) % industriesNotListed.signals.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [])

  const listedNames = industriesGrid.items.map((item) => item.name)
  const marquee = [...listedNames, ...listedNames]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_10%,rgba(217,70,239,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_10%_90%,rgba(14,165,233,0.08),transparent_50%)]" />

      <Container>
        {/* Listed industries drift — what is on the page */}
        <div
          data-nl-y
          className="relative overflow-hidden border-y border-white/10 py-4"
          aria-hidden
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#020617] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#020617] to-transparent" />
          <motion.div
            className="flex w-max gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {marquee.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-sm font-medium tracking-wide text-white/25"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>

        <div data-nl-y className="mt-12 max-w-3xl md:mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            {industriesNotListed.heading}
          </h2>
        </div>

        {/* Work-shape litmus — large stacked signals */}
        <div
          data-nl-y
          className="mt-10 border-t border-white/10 md:mt-14"
          onMouseLeave={() => setLit(0)}
        >
          {industriesNotListed.signals.map((signal, i) => {
            const accent = accents[i]
            const active = lit === i
            return (
              <button
                key={signal}
                type="button"
                data-nl-lit
                onMouseEnter={() => setLit(i)}
                onFocus={() => setLit(i)}
                className={`group relative flex w-full items-center justify-between gap-6 border-b border-white/10 py-6 text-left transition-colors duration-300 md:py-8 ${
                  active ? "bg-white/[0.02]" : ""
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b ${accent.bar} transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span
                  className={`pl-4 text-2xl font-bold tracking-tight transition-colors duration-300 md:pl-5 md:text-3xl lg:text-4xl ${
                    active ? accent.text : "text-white/30 group-hover:text-white/55"
                  }`}
                >
                  {signal}
                </span>
                <span
                  className={`mr-1 h-2 w-2 shrink-0 rounded-full transition-all duration-300 md:mr-2 ${
                    active ? `${accent.dot} scale-125` : "bg-white/15"
                  }`}
                />
              </button>
            )
          })}
        </div>

        <p
          data-nl-y
          className="mt-10 max-w-3xl text-base font-light leading-relaxed text-white/60 md:mt-12 md:text-lg"
        >
          {industriesNotListed.fit}
        </p>

        {/* Honest way — full-bleed action band */}
        <div
          data-nl-y
          className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <p className="max-w-xl text-base font-light leading-relaxed text-white/55 md:text-lg">
            <MultiLinkedText
              text={industriesNotListed.honest}
              links={[
                {
                  phrase: industriesNotListed.auditPhrase,
                  href: industriesNotListed.auditHref,
                },
              ]}
            />
          </p>
          <p className="inline-flex shrink-0 items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white/70">
            <MultiLinkedText
              text={industriesNotListed.close}
              links={[
                {
                  phrase: industriesNotListed.bookPhrase,
                  href: CALENDLY_URL,
                  external: true,
                },
              ]}
            />
            <ArrowRight className="h-4 w-4 text-finova-cyan" aria-hidden />
          </p>
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
            {industriesInvite.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/60 md:text-lg">
            {industriesInvite.body}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href={CALENDLY_URL} external>
              {industriesInvite.primaryCta}
            </MagneticButton>
            <MagneticButton href={industriesInvite.secondaryHref} variant="secondary">
              {industriesInvite.secondaryCta}
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <nav
            aria-label="Related pages"
            className="mt-16 flex flex-wrap items-center justify-center gap-y-2 text-sm text-white/35"
          >
            {industriesSiblings.map((s, i) => (
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

export default function IndustriesPage() {
  return (
    <main className="bg-finova-midnight text-white selection:bg-finova-magenta/30 selection:text-white">
      <Hero />
      <Core />
      <Grid />
      <Emerging />
      <Proof />
      <NotListed />
      <Invite />
    </main>
  )
}
