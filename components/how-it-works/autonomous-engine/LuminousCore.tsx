"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Mesh } from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

export default function LuminousCore() {
  const core = useRef<Mesh>(null)
  const frosted = useRef<Mesh>(null)
  const halo = useRef<Mesh>(null)
  const wire = useRef<Mesh>(null)
  const { progress } = useEntrance()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const live = phase(progress, 0.15, 0.55)
    const pulse = 1 + Math.sin(t * 1.15) * 0.028 * live

    if (core.current) {
      core.current.scale.setScalar(pulse)
      const mat = core.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = (0.45 + Math.sin(t * 1.05) * 0.12) * live
    }
    if (frosted.current) {
      const mat = frosted.current.material as THREE.MeshPhysicalMaterial
      mat.opacity = 0.22 * live
      frosted.current.scale.setScalar(1.08 + Math.sin(t * 0.8) * 0.02)
    }
    if (halo.current) {
      const mat = halo.current.material as THREE.MeshBasicMaterial
      mat.opacity = (0.1 + Math.sin(t * 0.95) * 0.035) * live
      halo.current.scale.setScalar(1.4 + Math.sin(t * 0.7) * 0.05)
    }
    if (wire.current) {
      wire.current.rotation.y = t * 0.2
      const mat = wire.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.28 * live
    }
  })

  return (
    <group>
      <mesh ref={core}>
        <sphereGeometry args={[0.38, 64, 64]} />
        <meshStandardMaterial
          color={C.glow}
          emissive={C.glow}
          emissiveIntensity={0.5}
          metalness={0.12}
          roughness={0.22}
        />
      </mesh>

      <mesh ref={frosted}>
        <sphereGeometry args={[0.46, 48, 48]} />
        <meshPhysicalMaterial
          color={C.aluminumBright}
          metalness={0.05}
          roughness={0.15}
          transmission={0.55}
          thickness={0.4}
          transparent
          opacity={0.22}
          ior={1.4}
        />
      </mesh>

      <mesh ref={wire} scale={0.7}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial
          color={C.blue}
          emissive={C.blue}
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.28}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      <mesh ref={halo}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial
          color={C.glow}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.52, 0.82, 72]} />
        <meshBasicMaterial
          color={C.blue}
          transparent
          opacity={0.12}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
