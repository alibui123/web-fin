"use client"

import { Environment } from "@react-three/drei"
import { WF } from "./hooks/useWorkflowQuality"

/**
 * Soft cinematic lighting — blue rim, violet accent, no harsh hotspots.
 */
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.22} color="#94A3B8" />
      <directionalLight
        position={[4, 5, 3]}
        intensity={0.55}
        color="#E2E8F0"
      />
      {/* Blue rim */}
      <directionalLight
        position={[-4, 1, -2]}
        intensity={0.55}
        color={WF.electric}
      />
      {/* Violet accent */}
      <pointLight
        position={[2, -1, 2]}
        intensity={0.45}
        color={WF.violet}
        distance={10}
        decay={2}
      />
      <pointLight
        position={[-2, 1.5, 1]}
        intensity={0.35}
        color={WF.cyan}
        distance={8}
        decay={2}
      />
      <Environment preset="city" environmentIntensity={0.25} />
    </>
  )
}
