"use client"

import { Environment, ContactShadows } from "@react-three/drei"
import { AC } from "./constants"

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.32} color="#A8B0BC" />
      <directionalLight position={[4.5, 5.5, 3.5]} intensity={0.85} color="#FFFFFF" />
      <directionalLight position={[-3.5, 1.5, -2]} intensity={0.35} color={AC.blue} />
      <directionalLight position={[0, -2.5, 4]} intensity={0.2} color="#DDE3EA" />
      <pointLight position={[0, 0.15, 0]} intensity={0.55} color={AC.glow} distance={8} decay={2} />
      <Environment preset="city" environmentIntensity={0.28} />
      <ContactShadows
        position={[0, -2.15, 0]}
        opacity={0.28}
        scale={12}
        blur={2.4}
        far={5}
        color="#000000"
      />
    </>
  )
}
