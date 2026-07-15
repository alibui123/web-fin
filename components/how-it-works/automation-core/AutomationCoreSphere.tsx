"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { AC } from "./constants"
import { useEntrance } from "./hooks/useEntrance"

/** Dark-metallic Automation Core — slow rotate + soft pulse, no wrapped rings */
export default function AutomationCoreSphere() {
  const shell = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.Mesh>(null)
  const group = useRef<THREE.Group>(null)
  const { state } = useEntrance()

  useFrame((clockState) => {
    const t = clockState.clock.elapsedTime
    const reveal = state.core

    if (group.current) {
      group.current.scale.setScalar(0.55 + reveal * 0.45)
      group.current.visible = reveal > 0.01
    }

    if (shell.current) {
      shell.current.rotation.y = t * 0.12
      shell.current.rotation.x = Math.sin(t * 0.18) * 0.08
      const pulse = 1 + Math.sin(t * 0.9) * 0.035 * reveal
      shell.current.scale.setScalar(pulse)
      const mat = shell.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.12 + Math.sin(t * 0.9) * 0.06 * reveal
    }

    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial
      mat.opacity = (0.1 + Math.sin(t * 0.9) * 0.04) * reveal
      glow.current.scale.setScalar(1.45 + Math.sin(t * 0.7) * 0.08)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={shell}>
        <sphereGeometry args={[0.72, 48, 48]} />
        <meshStandardMaterial
          color={AC.graphite}
          metalness={0.92}
          roughness={0.32}
          envMapIntensity={1.1}
          emissive={AC.glow}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[0.72, 24, 24]} />
        <meshBasicMaterial
          color={AC.glow}
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight color={AC.glow} intensity={0.8} distance={4.5} decay={2} />
    </group>
  )
}
