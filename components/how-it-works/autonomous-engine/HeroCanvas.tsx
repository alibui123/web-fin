"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { motion, useInView } from "framer-motion"
import * as THREE from "three"
import AutonomousEngine from "./AutonomousEngine"
import { useEngineQuality } from "./hooks/useEngineQuality"

type Props = {
  className?: string
}

/**
 * Hero canvas — transparent, right-side composition, staged entrance.
 * Lazy-load with next/dynamic ssr:false.
 */
export default function HeroCanvas({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "120px 0px", amount: 0.12, once: true })
  const quality = useEngineQuality()

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ transform: "translateZ(0)" }}
      aria-hidden
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {isInView && (
        <Canvas
          className="!bg-transparent"
          style={{ width: "100%", height: "100%", background: "transparent" }}
          dpr={quality.dpr}
          camera={{ position: [1.15, 0.55, 6.6], fov: 34, near: 0.1, far: 50 }}
          gl={{
            antialias: !quality.isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.12,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <AutonomousEngine quality={quality} active={isInView} />
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </motion.div>
  )
}
