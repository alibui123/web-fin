"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { TE, PRINCIPLE_RINGS } from "./constants"

/**
 * Four larger stabilizing rings — the guiding principles.
 * Slow independent rotations around the transformation path.
 */
export default function PrincipleRings() {
  const rings = useMemo(
    () =>
      PRINCIPLE_RINGS.map((_, i) => ({
        radius: 3.1 + i * 0.42,
        tube: 0.014,
        speed: (i % 2 === 0 ? 1 : -1) * (0.04 + i * 0.012),
        tilt: [
          0.35 + i * 0.12,
          0.15 * (i % 2 === 0 ? 1 : -1),
          0.08 + i * 0.05,
        ] as [number, number, number],
        metal: i % 2 === 0 ? TE.titanium : TE.aluminum,
      })),
    [],
  )

  const refs = useRef<(THREE.Group | null)[]>([])

  useFrame((_, delta) => {
    rings.forEach((r, i) => {
      const g = refs.current[i]
      if (!g) return
      g.rotation.y += delta * r.speed
      g.rotation.z += delta * r.speed * 0.35
    })
  })

  return (
    <group>
      {rings.map((r, i) => (
        <group
          key={PRINCIPLE_RINGS[i]}
          ref={(el) => {
            refs.current[i] = el
          }}
          rotation={r.tilt}
        >
          <mesh>
            <torusGeometry args={[r.radius, r.tube, 12, 128]} />
            <meshStandardMaterial
              color={r.metal}
              metalness={0.9}
              roughness={0.28}
              envMapIntensity={1}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[r.radius, r.tube * 0.3, 8, 128]} />
            <meshStandardMaterial
              color={TE.blue}
              emissive={TE.blue}
              emissiveIntensity={0.35}
              transparent
              opacity={0.4}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
