"use client"

import { Suspense, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import * as THREE from "three"
import TransformationEngine from "./TransformationEngine"
import { useTeQuality } from "./hooks/useTeQuality"

type Props = { className?: string }

/**
 * Hero canvas host — transparent, right-side composition.
 * Lazy-load via next/dynamic ssr:false.
 */
export default function TransformationEngineCanvas({ className = "" }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const inView = useInView(host, { margin: "120px 0px", amount: 0.1, once: true })
  const quality = useTeQuality()

  useEffect(() => {
    if (!inView || !host.current) return
    gsap.fromTo(
      host.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.6, ease: "power2.out" },
    )
  }, [inView])

  return (
    <motion.div
      ref={host}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ transform: "translateZ(0)", opacity: 0 }}
      aria-hidden
      initial={{ scale: 0.94 }}
      animate={inView ? { scale: 1 } : { scale: 0.94 }}
      transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
    >
      {inView && (
        <Canvas
          className="!bg-transparent"
          style={{ width: "100%", height: "100%", background: "transparent" }}
          dpr={quality.dpr}
          camera={{ position: [1.4, 0.9, 9.2], fov: 34, near: 0.1, far: 60 }}
          gl={{
            antialias: !quality.isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <TransformationEngine quality={quality} />
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </motion.div>
  )
}
