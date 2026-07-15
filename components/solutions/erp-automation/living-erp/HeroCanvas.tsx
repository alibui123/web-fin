"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { useInView } from "framer-motion"
import * as THREE from "three"
import LivingERPCore from "./LivingERPCore"
import { useErpQuality } from "./hooks/useErpQuality"

type Props = {
  className?: string
}

/**
 * Hero canvas host for the Living ERP Core.
 * Lazy-load with next/dynamic ssr:false.
 */
export default function HeroCanvas({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "140px 0px", amount: 0.05 })
  const quality = useErpQuality()

  return (
    <div
      ref={ref}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ transform: "translateZ(0)" }}
      aria-hidden
    >
      {isInView && (
        <Canvas
          className="!bg-transparent"
          style={{ width: "100%", height: "100%", background: "transparent" }}
          dpr={quality.dpr}
          camera={{ position: [1.4, 0.2, 6.2], fov: 38, near: 0.1, far: 50 }}
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
            <LivingERPCore quality={quality} />
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
