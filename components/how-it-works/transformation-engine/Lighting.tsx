"use client"

import { Environment } from "@react-three/drei"
import { TE } from "./constants"

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#B0B8C4" />
      <directionalLight position={[4, 6, 4]} intensity={0.7} color="#FFFFFF" />
      <directionalLight position={[-4, 2, -2]} intensity={0.28} color={TE.blue} />
      <directionalLight position={[0, -2, 3]} intensity={0.15} color="#D8DEE6" />
      <pointLight position={[0, 0.2, 0]} intensity={0.6} color={TE.glow} distance={10} decay={2} />
      <Environment preset="city" environmentIntensity={0.24} />
    </>
  )
}
