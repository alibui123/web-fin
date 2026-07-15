"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import Lighting from "./Lighting"
import AutomationCoreSphere from "./AutomationCoreSphere"
import OrbitalRings from "./OrbitalRings"
import OrbitNodes from "./OrbitNodes"
import { EntranceProvider, useEntrance } from "./hooks/useEntrance"
import { useParallax } from "./hooks/useParallax"
import { ORBITS } from "./constants"
import type { AcQuality } from "./hooks/useAcQuality"

function Breathing({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.06
  })
  return <group ref={ref}>{children}</group>
}

function EntranceKick() {
  const { start } = useEntrance()
  useEffect(() => {
    start()
  }, [start])
  return null
}

type Props = { quality: AcQuality }

/** Clean Automation Core — sphere + four calm orbits */
export default function AutomationEcosystem({ quality }: Props) {
  const parallax = useParallax(0.035)

  return (
    <EntranceProvider ringCount={ORBITS.length}>
      <Lighting />
      <EntranceKick />
      <group ref={parallax} scale={quality.scale} position={[0.05, 0.1, 0]}>
        <Breathing>
          <AutomationCoreSphere />
          <OrbitalRings particleMultiplier={quality.particleMultiplier} />
          <OrbitNodes showLabels={quality.showLabels} />
        </Breathing>
      </group>
    </EntranceProvider>
  )
}
