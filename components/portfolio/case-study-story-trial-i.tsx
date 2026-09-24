"use client"

import { useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion"
import type { Project } from "@/lib/portfolio-data"

const EASE = [0.22, 0.61, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const textVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
}

/**
 * Trial I — Glass ledger cards with staggered text reveal
 */
export default function CaseStudyStoryTrialI({ project }: { project: Project }) {
  const reduced = useReducedMotion()

  return (
    <section className="relative mb-24 md:mb-32">
      <div className="grid gap-4 md:gap-5">
        <GlassFeatureCard
          title="The need"
          body={project.need}
          accent={project.accent}
          reduced={!!reduced}
        />
        <GlassFeatureCard
          title="What we built"
          body={project.built}
          accent={project.accent}
          reduced={!!reduced}
        />

        <motion.div
          initial={reduced ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
          className="grid gap-4 sm:grid-cols-3 md:gap-5"
        >
          {project.gains.map((gain) => (
            <GainCard
              key={gain}
              text={gain}
              accent={project.accent}
              reduced={!!reduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function GlassFeatureCard({
  title,
  body,
  accent,
  reduced,
}: {
  title: string
  body: string
  accent: string
  reduced: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const shine = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, ${accent}28, transparent 45%)`

  return (
    <motion.article
      ref={ref}
      initial={reduced ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      variants={cardVariants}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        mx.set(e.clientX - rect.left)
        my.set(e.clientY - rect.top)
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0a101c] p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] md:p-11"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.3] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />

      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
        style={{ background: accent }}
      />

      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: shine }}
        />
      )}

      <div className="relative z-10">
        <motion.div
          variants={lineVariants}
          className="mb-8 flex items-center justify-between gap-4"
        >
          <h2 className="text-sm font-semibold tracking-[0.06em] uppercase text-white/75">
            {title}
          </h2>
          <span
            className="hidden h-2 w-2 rounded-full sm:block"
            style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}
          />
        </motion.div>

        <motion.p
          variants={textVariants}
          className="max-w-3xl text-lg md:text-2xl font-light leading-relaxed text-white tracking-[-0.015em]"
        >
          {body}
        </motion.p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-70"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
        }}
      />
    </motion.article>
  )
}

function GainCard({
  text,
  accent,
  reduced,
}: {
  text: string
  accent: string
  reduced: boolean
}) {
  return (
    <motion.article
      variants={
        reduced
          ? undefined
          : {
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: EASE,
                  when: "beforeChildren",
                  staggerChildren: 0.08,
                },
              },
            }
      }
      whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.25 } }}
      className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0a101c] p-6 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.75)] md:p-7"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-45"
        style={{ background: accent }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[size:18px_18px]" />

      <motion.div variants={lineVariants} className="relative z-10 mb-5">
        <span
          className="block h-px w-10 transition-all duration-300 group-hover:w-14"
          style={{ background: accent }}
        />
      </motion.div>

      <motion.p
        variants={textVariants}
        className="relative z-10 mt-auto text-[0.95rem] md:text-base font-light leading-snug text-white tracking-[-0.01em]"
      >
        {text}
      </motion.p>
    </motion.article>
  )
}
