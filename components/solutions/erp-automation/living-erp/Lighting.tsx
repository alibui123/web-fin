"use client"

import { Environment } from "@react-three/drei"
import { ERP } from "./hooks/useErpQuality"

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#94A3B8" />
      <directionalLight position={[4, 6, 3]} intensity={0.5} color="#E2E8F0" />
      <directionalLight position={[-4, 1, -2]} intensity={0.55} color={ERP.electric} />
      <pointLight
        position={[2, -1, 2]}
        intensity={0.4}
        color={ERP.purple}
        distance={10}
        decay={2}
      />
      <pointLight
        position={[-2, 2, 1]}
        intensity={0.3}
        color={ERP.cyan}
        distance={8}
        decay={2}
      />
      <Environment preset="city" environmentIntensity={0.22} />
    </>
  )
}
