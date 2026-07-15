"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useInView } from "framer-motion"

const NeuralNetwork3D = dynamic(() => import("@/components/ui-effects/neural-network-3d"), {
  ssr: false,
  loading: () => null,
})

export default function ThesisLine() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section className="py-24 md:py-36 relative bg-finova-midnight overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <NeuralNetwork3D />
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-finova-purple/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-finova-cyan mb-8">
            The idea behind all of it
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.2] text-white mb-8">
            Most software answers questions.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple">
              Ours finishes the work.
            </span>
          </p>
          <p className="text-lg md:text-xl text-white/65 font-light leading-relaxed max-w-3xl mx-auto">
            Software you have to manage is another job on your plate. An operation that runs itself
            is an asset. We build the second kind, and then we run it, so the value shows up as time
            and revenue returned, not as one more tool your team has to keep alive.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
