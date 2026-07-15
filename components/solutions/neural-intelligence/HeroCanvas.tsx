"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { useInView } from "framer-motion"
import Scene from "./Scene"
import { useResponsiveQuality } from "./hooks/useResponsiveQuality"

type HeroCanvasProps = {
  className?: string
}

/**
 * Hero entry — transparent canvas, adaptive DPR, pause when off-screen.
 * Lazy-load with next/dynamic ssr:false.
 */
export default function HeroCanvas({ className = "" }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "120px 0px", amount: 0.05 })
  const quality = useResponsiveQuality()

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ transform: "translateZ(0)" }}
      aria-hidden
    >
      {isInView && (
        <Canvas
          className="!bg-transparent"
          style={{ width: "100%", height: "100%", background: "transparent" }}
          dpr={quality.dpr}
          camera={{ position: [0.35, 0.15, 5.4], fov: 40, near: 0.1, far: 40 }}
          gl={{
            antialias: !quality.isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <Scene quality={quality} />
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
