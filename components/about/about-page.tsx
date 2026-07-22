"use client"

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"
import { CALENDLY_URL, clearStickyCta } from "@/lib/site"
import {
  aboutCredibility,
  aboutExists,
  aboutFounder,
  aboutHero,
  aboutInvite,
  aboutProducts,
  aboutProof,
  aboutSiblings,
  aboutStandFor,
  aboutTeam,
} from "@/lib/about"

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
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium tracking-wide text-white/40">
        <li>
          <Link href="/" className="hover:text-finova-cyan transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
        </li>
        <li className="text-white/75" aria-current="page">
          About
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
        ),
      )}
    </>
  )
}

function MagneticButton({
  children,
  href,
  external,
}: {
  children: ReactNode
  href: string
  external?: boolean
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

  const shared = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: () => {
      x.set(0)
      y.set(0)
    },
    onPointerUp: clearStickyCta,
    style: { x: springX, y: springY },
    className:
      "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-finova-cyan hover:text-white active:bg-finova-cyan active:text-white will-change-transform",
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

/** Split principle text at first period for display hierarchy — wording unchanged */
function principleParts(text: string) {
  const i = text.indexOf(". ")
  if (i === -1) return { lead: text, rest: "" }
  return { lead: text.slice(0, i + 1), rest: text.slice(i + 2) }
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 48])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.35])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 40, damping: 20 })
  const smy = useSpring(my, { stiffness: 40, damping: 20 })
  const glowX = useTransform(smx, (v) => v * -0.6)
  const glowY = useTransform(smy, (v) => v * -0.5)
  const mosaicX = useTransform(smx, (v) => v * 0.35)
  const mosaicY = useTransform(smy, (v) => v * 0.25)

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 24)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 16)
  }

  // Exact H1, presented as two visual lines (period break only)
  const h1Parts = (() => {
    const i = aboutHero.h1.indexOf(". ")
    if (i === -1) return [aboutHero.h1]
    return [aboutHero.h1.slice(0, i + 1), aboutHero.h1.slice(i + 2)]
  })()

  const mosaic = [
    "/team/astafaali.jfif",
    "/team/umarsaleem.jfif",
    "/team/muhammadmehlab.jfif",
    "/team/habibaimran.jpeg",
  ]

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden border-b border-white/5 pt-24 pb-12 md:min-h-[78vh] md:pt-28 md:pb-16"
    >
      <div className="absolute inset-0 bg-finova-midnight" />

      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ x: smx, y: smy }}
          className="absolute -left-32 top-16 h-[520px] w-[520px] rounded-full bg-finova-cyan/25 blur-[120px]"
        />
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute -right-20 bottom-10 h-[360px] w-[440px] rounded-full bg-finova-magenta/20 blur-[110px]"
        />
        <div className="absolute left-1/2 top-1/3 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-finova-purple/10 blur-[90px]" />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 30% 35%, #000 15%, transparent 70%)",
        }}
      />

      <Container className="relative flex min-h-[calc(78vh-7rem)] flex-col">
        <Breadcrumb />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="grid flex-1 items-center gap-8 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease }}
              className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.04]"
            >
              {h1Parts.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 1, ease }}
              className="mt-8 h-[2px] w-24 origin-left rounded-full bg-gradient-to-r from-finova-cyan to-finova-magenta md:w-32"
            />

            <div className="mt-8 max-w-xl space-y-4">
              {aboutHero.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.12, duration: 0.7, ease }}
                  className="text-base font-light leading-relaxed text-white/60 md:text-lg"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:col-span-5 lg:block xl:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.35, duration: 1, ease }}
              style={{ x: mosaicX, y: mosaicY }}
              className="relative mx-auto aspect-[4/5] w-full max-w-[340px]"
            >
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-finova-cyan/20 via-transparent to-finova-magenta/20 blur-2xl" />
              <div className="relative grid h-full grid-cols-2 grid-rows-2 gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm">
                {mosaic.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.08, duration: 0.65, ease }}
                    className={`relative overflow-hidden rounded-2xl border border-white/10 ${
                      i === 0 ? "row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="160px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-finova-midnight/50 to-transparent" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 h-16 w-16 rounded-2xl border border-finova-cyan/30 bg-finova-midnight/80 shadow-[0_0_40px_rgba(14,165,233,0.25)] backdrop-blur"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="absolute -right-3 top-10 h-10 w-10 rounded-full border border-finova-magenta/35 bg-finova-magenta/10"
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function Exists() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-exists-y]", {
        y: 28,
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
      className="relative overflow-hidden border-b border-white/5 py-14 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_0%_0%,rgba(14,165,233,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-finova-magenta/8 blur-[100px]" />

      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div data-exists-y className="lg:col-span-4 lg:sticky lg:top-28">
            <h2 className="whitespace-nowrap text-3xl font-bold tracking-tight text-white md:text-4xl">
              {aboutExists.heading}
            </h2>
            <p className="mt-6 text-base font-medium leading-relaxed text-white/55 md:mt-6 md:text-lg">
              {aboutExists.originLead}
            </p>
          </div>

          <div className="lg:col-span-8">
            <motion.blockquote
              data-exists-y
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease }}
              className="border-l-2 border-finova-magenta/50 pl-6 md:pl-8"
            >
              <p className="text-xl font-medium leading-[1.35] text-white/80 sm:text-2xl md:text-[1.65rem] md:leading-[1.4]">
                {aboutExists.originQuestion}
              </p>
            </motion.blockquote>

            <div data-exists-y className="mt-8 border-t border-white/10 pt-8 md:mt-8 md:pt-8">
              <div className="relative border-l border-l-finova-cyan/35 py-0 pl-6 md:pl-8">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-finova-cyan"
                />
                <p className="text-base font-medium leading-relaxed text-white/70 md:text-lg">
                  {aboutExists.responseLead}
                </p>
              </div>

              <div className="relative mt-8 border-l border-l-finova-lightBlue/30 py-0 pl-6 md:mt-8 md:pl-8">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-finova-lightBlue"
                />
                <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                  {aboutExists.responseBody}
                </p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.7, ease }}
                className="mt-8 max-w-2xl border-t border-white/10 pt-8 text-lg font-medium leading-snug text-white md:mt-8 md:pt-8 md:text-xl"
              >
                {aboutExists.responseClose}
              </motion.p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function StandFor() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative border-b border-white/5 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.08),transparent_55%)]" />

      <Container>
        <Reveal>
          <h2 className="mx-auto mb-8 max-w-xl text-center text-3xl font-bold tracking-tight text-white md:mb-10 md:text-4xl">
            {aboutStandFor.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {aboutStandFor.principles.map((p, i) => {
            const { lead, rest } = principleParts(p.text)
            const isHot = hovered === i
            return (
              <article
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative flex min-h-[220px] flex-col rounded-2xl border p-5 transition-[border-color,box-shadow,background] duration-300 md:p-6 ${
                  isHot
                    ? "border-finova-cyan/40 bg-gradient-to-b from-finova-cyan/[0.12] to-white/[0.02] shadow-[0_0_36px_rgba(14,165,233,0.1)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span
                  className={`mb-4 font-mono text-[11px] tracking-[0.2em] transition-colors ${
                    isHot ? "text-finova-cyan" : "text-white/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-white md:text-xl">
                  {lead}
                </h3>
                <p className="text-[15px] font-light leading-relaxed text-white/60 md:text-base">
                  {rest}
                </p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function Products() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(14,165,233,0.08),transparent_50%)]" />
      <Container>
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
            {aboutProducts.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/60 md:text-lg">
            {aboutProducts.lead}
          </p>
        </Reveal>

        <div className="mt-10 space-y-0">
          {aboutProducts.items.map((item, i) => (
            <Reveal key={item.name} delay={0.05 * i}>
              <article
                className={`group grid gap-4 border-t border-white/10 py-6 md:grid-cols-12 md:gap-6 md:py-7 ${
                  i === aboutProducts.items.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="md:col-span-1">
                  <span className="font-mono text-sm text-finova-cyan/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-3">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-white transition-colors hover:text-finova-cyan md:text-2xl"
                    >
                      {item.name}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ) : (
                    <p className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                      {item.name}
                    </p>
                  )}
                </div>
                <div className="md:col-span-8">
                  <p className="text-base font-light leading-relaxed text-white/55 md:text-[17px]">
                    {item.href ? (
                      <MultiLinkedText
                        text={item.body}
                        links={[{ phrase: item.name, href: item.href }]}
                      />
                    ) : (
                      item.body
                    )}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl text-base font-light leading-relaxed text-white/60 md:text-lg">
            {aboutProducts.close}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

function Founder() {
  return (
    <section className="relative border-b border-white/5 py-14 md:py-20">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-finova-cyan/[0.08] via-white/[0.02] to-finova-magenta/[0.06]">
          <div className="grid md:grid-cols-12">
            <div className="relative min-h-[280px] h-full overflow-hidden md:col-span-5">
              <Image
                src="/team/astafaali.jfif"
                alt={aboutFounder.name}
                fill
                className="object-cover object-[46%_22%]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-finova-midnight via-finova-midnight/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-finova-midnight/90" />
            </div>
            <div className="relative flex flex-col justify-center p-8 md:col-span-7 md:p-12 lg:p-14">
              <Reveal>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-finova-cyan">
                  {aboutFounder.heading}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-xl font-light leading-relaxed text-white/80 md:text-2xl md:leading-relaxed">
                  {aboutFounder.body}
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-8 text-sm font-medium tracking-wide text-white md:text-base">
                  {aboutFounder.name}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Team() {
  const teamImages = [
    "/team/astafaali.jfif",
    "/team/umarsaleem.jfif",
    "/team/muhammadmehlab.jfif",
    "/team/muhammadehsan.png",
    "/team/aliabbasi.jpeg",
    "/team/moizislam.jfif",
    "/team/habibaimran.jpeg",
    "/team/zaryabahmad.png",
  ]
  const slidingImages = [...teamImages, ...teamImages, ...teamImages]

  return (
    <section className="relative overflow-hidden border-b border-white/5 py-14 md:py-20">
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-finova-cyan/5 blur-[120px]" />
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Reveal>
              <div className="relative h-[300px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080e24]/60 sm:h-[380px]">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#080e24] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#080e24] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#080e24] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#080e24] to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-center gap-4 py-4">
                  <motion.div
                    className="flex min-w-max gap-4"
                    animate={{ x: [0, -1500] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                  >
                    {slidingImages.map((img, i) => (
                      <div
                        key={`a-${i}`}
                        className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-52 sm:w-44"
                      >
                        <Image src={img} alt="Team Member" fill className="object-cover" />
                      </div>
                    ))}
                  </motion.div>
                  <motion.div
                    className="flex min-w-max gap-4"
                    animate={{ x: [-1500, 0] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
                  >
                    {[...slidingImages].reverse().map((img, i) => (
                      <div
                        key={`b-${i}`}
                        className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-52 sm:w-44"
                      >
                        <Image src={img} alt="Team Member" fill className="object-cover" />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="order-1 space-y-4 lg:order-2 lg:col-span-5">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {aboutTeam.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-base font-light leading-relaxed text-white/60 md:text-lg">
                {aboutTeam.lead}
              </p>
            </Reveal>
            {aboutTeam.members.map((m) => (
              <Reveal key={m.name} delay={0.12}>
                <p className="text-base font-medium text-white md:text-lg">{m.name}</p>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <Link
                href="/team"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-finova-cyan to-finova-blue px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_40px_rgba(14,165,233,0.28)] transition-transform hover:-translate-y-0.5"
              >
                Meet the Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Credibility() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-cred]", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Phrases taken verbatim from the credibility body — visual markers only
  const markers = [
    "National Incubation Center, Cohort 5",
    "JazzCash",
    "Easypaisa",
    "Chamber of Commerce",
    "US healthcare",
    "MENA enterprise",
  ]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-14 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(14,165,233,0.12),transparent_58%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-finova-magenta/10 blur-[100px]" />

      <Container>
        <div data-cred className="mx-auto mb-10 max-w-2xl text-center md:mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
            {aboutCredibility.heading}
          </h2>
        </div>

        <div
          data-cred
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent p-7 md:p-10 lg:p-12"
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-finova-cyan/70 to-transparent" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-finova-cyan/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-finova-magenta/10 blur-3xl" />

          <p className="relative text-center text-base font-light leading-relaxed text-white/70 md:text-lg md:leading-relaxed">
            {aboutCredibility.body}
          </p>
        </div>

        <div
          data-cred
          className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-2 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-2.5 md:gap-3"
        >
          {markers.map((label, i) => {
            const isWide = i === 0 || i === markers.length - 1
            return (
              <span
                key={label}
                className={`flex min-h-[3rem] items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-[11px] font-medium leading-snug tracking-wide text-white/55 sm:min-h-0 sm:px-3.5 sm:py-1.5 sm:text-left md:text-xs ${
                  isWide ? "col-span-2 sm:col-auto" : ""
                }`}
              >
                {label}
              </span>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function Proof() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from("[data-proof]", {
        y: 28,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Exact sentences from aboutProof.body, presented as cards
  const cases = [
    {
      text: "Nine automated Odoo modules inside a government ERP for Telecom Foundation.",
      phrase: "Telecom Foundation",
      href: aboutProof.telecomHref,
      accent: "from-finova-cyan to-finova-lightBlue",
    },
    {
      text: "Insurance verification running at roughly fifty calls a day for Sirius Solutions Global.",
      phrase: "Sirius Solutions Global",
      href: aboutProof.siriusHref,
      accent: "from-finova-magenta to-finova-purple",
    },
    {
      text: "Seventy qualified meetings booked in month two for Advanzatech.",
      phrase: "Advanzatech",
      href: aboutProof.advanzatechHref,
      accent: "from-finova-purple to-finova-cyan",
    },
  ]

  const intro =
    "We would rather be judged on what runs than on what we say about ourselves."
  const close = "Read the full stories on our customers page."

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 py-14 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_100%,rgba(217,70,239,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-finova-cyan/10 blur-[90px]" />

      <Container>
        <div data-proof className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
            {aboutProof.heading}
          </h2>
        </div>

        <p
          data-proof
          className="mx-auto mb-8 max-w-2xl text-center text-base font-light leading-relaxed text-white/60 md:mb-10 md:text-lg"
        >
          {intro}
        </p>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {cases.map((c, i) => (
            <article
              key={c.phrase}
              data-proof
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-400 hover:-translate-y-1 hover:border-finova-cyan/35 hover:bg-white/[0.04] md:p-7"
            >
              <div
                className={`mb-5 h-1 w-10 rounded-full bg-gradient-to-r ${c.accent} transition-all duration-400 group-hover:w-16`}
              />
              <span className="mb-4 font-mono text-[11px] tracking-[0.2em] text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="flex-1 text-[15px] font-light leading-relaxed text-white/70 md:text-base">
                <MultiLinkedText
                  text={c.text}
                  links={[{ phrase: c.phrase, href: c.href }]}
                />
              </p>
              <Link
                href={c.href}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-finova-cyan/80 transition-colors hover:text-finova-cyan"
              >
                {c.phrase}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          ))}
        </div>

        <p
          data-proof
          className="mt-8 text-center text-base font-light text-white/55 md:mt-8 md:text-lg"
        >
          <MultiLinkedText
            text={close}
            links={[
              {
                phrase: aboutProof.customersAnchor,
                href: aboutProof.customersHref,
              },
            ]}
          />
        </p>
      </Container>
    </section>
  )
}

function Invite() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(14,165,233,0.18),transparent_65%)]" />
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            {aboutInvite.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/60 md:text-lg">
            {aboutInvite.body}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href={CALENDLY_URL} external>
              {aboutInvite.primaryCta}
            </MagneticButton>
            <Link
              href={aboutInvite.secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-finova-cyan/50 hover:bg-finova-cyan/10"
            >
              {aboutInvite.secondaryCta}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <nav
            aria-label="Related pages"
            className="mt-10 flex flex-wrap items-center justify-center gap-y-2 text-sm text-white/35"
          >
            {aboutSiblings.map((s, i) => (
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

export default function AboutPage() {
  return (
    <main className="bg-finova-midnight text-white selection:bg-finova-magenta/30 selection:text-white">
      <Hero />
      <Exists />
      <StandFor />
      <Products />
      <Founder />
      <Team />
      <Credibility />
      <Proof />
      <Invite />
    </main>
  )
}
