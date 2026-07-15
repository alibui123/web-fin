"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { TE } from "./constants"

/** Finished autonomous workflow — loops independently on the right. */
export default function AutonomousOutput() {
  const group = useRef<THREE.Group>(null)
  const links = useRef<THREE.Group>(null)

  const modules = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((i) => ({
        y: (i - 2) * 0.32,
        phase: i * 0.7,
      })),
    [],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!group.current) return
    group.current.children.forEach((child, i) => {
      const m = modules[i]
      if (!m) return
      child.position.y = m.y + Math.sin(t * 1.5 + m.phase) * 0.02
      child.position.x = 4.15 + Math.sin(t * 0.6 + i) * 0.01
    })
    if (links.current) {
      links.current.children.forEach((child, i) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        mat.emissiveIntensity = 0.6 + Math.sin(t * 2.2 + i) * 0.25
      })
    }
  })

  return (
    <group position={[0, 0, -0.15]}>
      <group ref={group}>
        {modules.map((m, i) => (
          <group key={i} position={[4.15, m.y, 0]}>
            <mesh>
              <boxGeometry args={[0.72, 0.22, 0.1]} />
              <meshStandardMaterial
                color={TE.graphiteMid}
                metalness={0.85}
                roughness={0.26}
                envMapIntensity={1}
              />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.5, 0.035, 0.012]} />
              <meshStandardMaterial
                color={TE.blue}
                emissive={TE.blue}
                emissiveIntensity={0.85}
                roughness={0.35}
              />
            </mesh>
            {/* Chrome accent edge */}
            <mesh position={[0.34, 0, 0]}>
              <boxGeometry args={[0.02, 0.18, 0.08]} />
              <meshStandardMaterial
                color={TE.aluminumBright}
                metalness={1}
                roughness={0.15}
              />
            </mesh>
          </group>
        ))}
      </group>

      <group ref={links}>
        {modules.slice(0, -1).map((m, i) => (
          <mesh key={i} position={[4.15, m.y - 0.16, 0.02]}>
            <boxGeometry args={[0.02, 0.12, 0.02]} />
            <meshStandardMaterial
              color={TE.blue}
              emissive={TE.blue}
              emissiveIntensity={0.7}
              transparent
              opacity={0.75}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
