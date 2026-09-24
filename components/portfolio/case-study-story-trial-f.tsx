"use client"

import { useRef, type ReactNode } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import type { Project } from "@/lib/portfolio-data"

type CardDef = {
  id: string
  index: string
  title: string
  body?: string
  gains?: string[]
}

function StackCard({
  card,
  index,
  total,
  accent,
  reduced,
  progress,
  range,
  targetScale,
}: {
  card: CardDef
  index: number
  total: number
  accent: string
  reduced: boolean
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: enterProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  })

  const scale = useTransform(progress, range, [1, targetScale])
  const clip = useTransform(enterProgress, [0.25, 0.7], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"])
  const textOpacity = useTransform(enterProgress, [0.2, 0.55], [0, 1])
  const textBlur = useTransform(enterProgress, [0.25, 0.65], ["blur(10px)", "blur(0px)"])

  return (
    <div
      ref={cardRef}
      className="sticky top-0 flex h-[100vh] items-center justify-center px-0"
      style={{ zIndex: 10 + index }}
    >
      <motion.article
        style={{
          scale: reduced ? 1 : scale,
          top: `calc(-8vh + ${index * 32}px)`,
        }}
        className="relative w-full origin-top overflow-hidden rounded-2xl border border-white/15 bg-[#070b14] shadow-[0_-28px_70px_rgba(0,0,0,0.6)]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at 12% 0%, ${accent}36, transparent 52%)`,
          }}
        />

        <span className="pointer-events-none absolute right-5 top-3 font-mono text-6xl font-medium tabular-nums text-white/[0.04] md:right-8 md:text-8xl">
          {card.index}
        </span>

        <div className="relative z-10 min-h-[min(50vh,420px)] p-8 md:p-12">
          <div className="mb-8 flex items-baseline gap-3">
            <span className="font-mono text-sm text-white/30 tabular-nums">{card.index}</span>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
              {card.title}
            </h2>
            <span className="ml-auto hidden text-[10px] font-medium uppercase tracking-[0.16em] text-white/25 sm:inline">
              {index + 1} / {total}
            </span>
          </div>

          {card.body && (
            <RevealText reduced={reduced} clip={clip} opacity={textOpacity} blur={textBlur}>
              <p className="max-w-3xl text-lg md:text-2xl font-light leading-relaxed text-white/75">
                {card.body}
              </p>
            </RevealText>
          )}

          {card.gains && (
            <RevealText reduced={reduced} clip={clip} opacity={textOpacity} blur={textBlur}>
              <ul className="max-w-3xl space-y-4">
                {card.gains.map((gain) => (
                  <li
                    key={gain}
                    className="flex gap-3 text-base md:text-xl font-light leading-snug text-white/75"
                  >
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    {gain}
                  </li>
                ))}
              </ul>
            </RevealText>
          )}
        </div>
      </motion.article>
    </div>
  )
}

function RevealText({
  children,
  reduced,
  clip,
  opacity,
  blur,
}: {
  children: ReactNode
  reduced: boolean
  clip: MotionValue<string>
  opacity: MotionValue<number>
  blur: MotionValue<string>
}) {
  if (reduced) return <>{children}</>
  return (
    <motion.div style={{ clipPath: clip, opacity, filter: blur }}>{children}</motion.div>
  )
}

/**
 * Trial F — Scroll stacking cards
 * Pattern from 21st.dev Stacking Cards (danielpetho): pin + scale-down as next card arrives.
 * Previous cards shrink but stay visible (borders / edges). Text uses scroll-linked cut reveal.
 */
export default function CaseStudyStoryTrialF({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const cards: CardDef[] = [
    { id: "need", index: "01", title: "The need", body: project.need },
    { id: "built", index: "02", title: "What we built", body: project.built },
    { id: "gains", index: "03", title: "What the business gains", gains: project.gains },
  ]

  return (
    <section ref={containerRef} className="relative mb-8">
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.045
        // Scale starts later for earlier cards so the stack reads clearly
        const start = i / cards.length
        const range: [number, number] = [start, 1]

        return (
          <StackCard
            key={card.id}
            card={card}
            index={i}
            total={cards.length}
            accent={project.accent}
            reduced={!!reduced}
            progress={scrollYProgress}
            range={range}
            targetScale={Math.max(0.86, targetScale)}
          />
        )
      })}
    </section>
  )
}
