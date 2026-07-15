"use client"

import { useMemo } from "react"
import WorkflowModule from "./WorkflowModule"
import WorkflowConnections from "./WorkflowConnections"
import DataPackets from "./DataPackets"
import ParticleField from "./ParticleField"
import CameraRig from "./CameraRig"
import Lighting from "./Lighting"
import Effects from "./Effects"
import {
  WorkflowAnimProvider,
  modulePositions,
  useParallax,
  useWorkflowAnimationController,
} from "./hooks/useWorkflowAnimation"
import {
  WORKFLOW_STAGES,
  type WorkflowQuality,
} from "./hooks/useWorkflowQuality"

type Props = {
  quality: WorkflowQuality
}

function EngineInner({ quality }: Props) {
  const stages = useMemo(() => {
    if (quality.isMobile) {
      const ids = ["input", "validation", "decision", "execution", "completed"] as const
      return WORKFLOW_STAGES.filter((s) =>
        ids.includes(s.id as (typeof ids)[number]),
      )
    }
    return WORKFLOW_STAGES.slice(0, quality.stageCount)
  }, [quality.isMobile, quality.stageCount])

  const positions = useMemo(
    () => modulePositions(stages.length, quality.spacing),
    [stages.length, quality.spacing],
  )

  const api = useWorkflowAnimationController(stages.length)
  const parallax = useParallax(0.1)

  return (
    <WorkflowAnimProvider api={api}>
      <Lighting />
      <group
        ref={parallax}
        scale={quality.scale}
        onPointerOver={() => {
          api.setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          api.setHovered(false)
          document.body.style.cursor = "auto"
        }}
      >
        <ParticleField count={quality.ambientCount} />
        <WorkflowConnections positions={positions} />
        {stages.map((stage, i) => (
          <WorkflowModule
            key={stage.id}
            index={i}
            kind={stage.id}
            position={positions[i]}
          />
        ))}
        <DataPackets positions={positions} count={quality.packetCount} />
      </group>
      <CameraRig />
      <Effects enabled={quality.enablePost} />
    </WorkflowAnimProvider>
  )
}

/**
 * Living Workflow Engine — cinematic assembly-line orchestration for the hero.
 */
export default function WorkflowEngine({ quality }: Props) {
  return <EngineInner quality={quality} />
}
