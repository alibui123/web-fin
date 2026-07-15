"use client"

import { useRef, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import Lighting from "./Lighting"
import LuminousCore from "./LuminousCore"
import MetallicRings from "./MetallicRings"
import ProcessingNodes from "./ProcessingNodes"
import TaskFlow from "./TaskFlow"
import ParticleField from "./ParticleField"
import DataStreams from "./DataStreams"
import MicroAgents from "./MicroAgents"
import OutputWorkflows from "./OutputWorkflows"
import HoloUI from "./HoloUI"
import { useParallax } from "./hooks/useParallax"
import {
  EntranceGroup,
  EntranceProvider,
} from "./hooks/useEntrance"
import type { EngineQuality } from "./hooks/useEngineQuality"

type Props = {
  quality: EngineQuality
  active: boolean
}

function BreathingGroup({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.055
  })
  return <group ref={ref}>{children}</group>
}

function EngineInner({ quality }: { quality: EngineQuality }) {
  const parallax = useParallax(0.045)

  return (
    <>
      <Lighting />
      <group ref={parallax} scale={quality.scale} position={[0.2, -0.05, 0]}>
        <EntranceGroup>
          <BreathingGroup>
            <ParticleField count={quality.particleCount} />
            <DataStreams count={quality.streamCount} />
            <TaskFlow count={quality.taskCount} />
            <MetallicRings count={quality.ringCount} />
            <ProcessingNodes count={quality.nodeCount} />
            <LuminousCore />
            <MicroAgents count={quality.agentCount} />
            <OutputWorkflows />
            <HoloUI reduced={quality.isMobile} />
          </BreathingGroup>
        </EntranceGroup>
      </group>
    </>
  )
}

/**
 * Premium autonomous workflow engine —
 * manual work enters left, exits right as ordered workflows.
 */
export default function AutonomousEngine({ quality, active }: Props) {
  return (
    <EntranceProvider active={active}>
      <EngineInner quality={quality} />
    </EntranceProvider>
  )
}
