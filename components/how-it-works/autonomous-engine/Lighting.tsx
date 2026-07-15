"use client"

import { Environment } from "@react-three/drei"
import { C } from "./hooks/useEngineQuality"

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.32} color="#B8C0CC" />
      {/* Soft key */}
      <directionalLight position={[4.2, 6.5, 3.5]} intensity={0.75} color="#FFFFFF" />
      {/* Gentle rim */}
      <directionalLight position={[-4.5, 2.2, -3]} intensity={0.35} color={C.blue} />
      {/* Ambient fill */}
      <directionalLight position={[0, -3, 2]} intensity={0.18} color="#D8DEE6" />
      <pointLight
        position={[0, 0, 0]}
        intensity={1.35}
        color={C.glow}
        distance={7}
        decay={2}
      />
      <pointLight
        position={[-2.4, 0.6, 1.4]}
        intensity={0.35}
        color={C.blue}
        distance={8}
        decay={2}
      />
      <Environment preset="city" environmentIntensity={0.28} />
    </>
  )
}
