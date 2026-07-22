"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import * as THREE from "three"
import AutomationEcosystem from "./AutomationEcosystem"
import { useAcQuality } from "./hooks/useAcQuality"

type Props = { className?: string }

/**
 * How it works hero canvas — bundled with page content (no lazy chunk delay).
 */
export default function AutomationCoreCanvas({ className = "" }: Props) {
  const host = useRef<HTMLDivElement>(null)
  // Start rendering immediately with the page; pause only after leaving the viewport.
  const [active, setActive] = useState(true)
  const quality = useAcQuality()

  useEffect(() => {
    const el = host.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={host}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ transform: "translateZ(0)" }}
      aria-hidden
    >
      <Canvas
        className="!bg-transparent"
        style={{ width: "100%", height: "100%", background: "transparent" }}
        dpr={quality.dpr}
        frameloop={active ? "always" : "never"}
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
    </div>
  )
}
