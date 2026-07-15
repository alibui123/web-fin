"use client"

import { Suspense, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import * as THREE from "three"
import AutomationEcosystem from "./AutomationEcosystem"
import { useAcQuality } from "./hooks/useAcQuality"

type Props = { className?: string }

/**
 * How it works hero canvas — transparent, Apple-like product angle.
 * Lazy-load via next/dynamic ssr:false.
 */
export default function AutomationCoreCanvas({ className = "" }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const inView = useInView(host, { margin: "100px 0px", amount: 0.15, once: true })
  const quality = useAcQuality()

  useEffect(() => {
    if (!inView || !host.current) return
    gsap.fromTo(
      host.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.4, ease: "power2.out" },
    )
  }, [inView])

  return (
    <motion.div
      ref={host}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ transform: "translateZ(0)", opacity: 0 }}
      aria-hidden
      initial={{ scale: 0.9 }}
      animate={inView ? { scale: 1 } : { scale: 0.9 }}
      transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
    >
      {inView && (
        <Canvas
          className="!bg-transparent"
          style={{ width: "100%", height: "100%", background: "transparent" }}
          dpr={quality.dpr}
          camera={{ position: [2.4, 1.7, 8.4], fov: 32, near: 0.1, far: 60 }}
          gl={{
            antialias: !quality.isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <AutomationEcosystem quality={quality} />
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </motion.div>
  )
}
