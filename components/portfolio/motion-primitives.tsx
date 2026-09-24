"use client"

import { useMemo, type ReactNode } from "react"
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"

const EASE = [0.23, 1, 0.32, 1] as const

export function useMotionSafe() {
  const reduced = useReducedMotion()
  return {
    reduced: !!reduced,
    spring: reduced
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.5 },
    ease: EASE,
    fadeUp: (delay = 0): Variants => ({
      hidden: reduced ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(8px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: reduced
          ? { duration: 0 }
          : { duration: 0.7, ease: EASE, delay },
      },
    }),
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const { fadeUp } = useMotionSafe()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp(delay)}
    >
      {children}
    </motion.div>
  )
}

/** Word-by-word blur reveal — adapted from 21st Text Reveal patterns */
export function TextReveal({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string
  className?: string
  as?: "h1" | "h2" | "p"
}) {
  const { reduced, ease } = useMotionSafe()
  const words = useMemo(() => text.split(" "), [text])

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.28em] last:mr-0"
          initial={reduced ? false : { opacity: 0, y: "0.55em", filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.55, ease, delay: 0.04 + i * 0.045 }
          }
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

export function CountUp({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const { reduced } = useMotionSafe()
  return (
    <motion.span
      className={className}
      initial={reduced ? false : { opacity: 0.2 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}
      </motion.span>
    </motion.span>
  )
}
