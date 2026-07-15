"use client"

import { useRef, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import Lighting from "./Lighting"
import PrincipleRings from "./PrincipleRings"
import Chambers from "./Chambers"
import VisiblePath from "./VisiblePath"
import TaskJourney from "./TaskJourney"
import AutonomousOutput from "./AutonomousOutput"
import ParticleNetwork from "./ParticleNetwork"
import IntakeChaos from "./IntakeChaos"
import InfoLines from "./InfoLines"
import { useParallax } from "./hooks/useParallax"
import type { TeQuality } from "./hooks/useTeQuality"

function Breathing({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.05
  })
  return <group ref={ref}>{children}</group>
}

type Props = { quality: TeQuality }

/**
 * Transformation Engine —
 * disordered work enters left, progresses through five transparent chambers,
 * exits right as a self-running aligned workflow.
 */
export default function TransformationEngine({ quality }: Props) {
  const parallax = useParallax(0.04)

  return (
    <>
      <Lighting />
      <group ref={parallax} scale={quality.scale} position={[0.15, 0, 0]}>
        <Breathing>
          <ParticleNetwork count={quality.particleCount} />
          <PrincipleRings />
          <VisiblePath />
          <InfoLines count={quality.streamCount} />
          <Chambers />
          <IntakeChaos count={quality.isMobile ? 18 : 32} />
          <TaskJourney count={quality.taskCount} />
          <AutonomousOutput />
        </Breathing>
      </group>
    </>
  )
}
