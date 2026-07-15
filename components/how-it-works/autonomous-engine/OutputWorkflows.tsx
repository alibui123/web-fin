"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

/** Perfectly aligned workflow blocks — output of autonomous processing. */
export default function OutputWorkflows() {
  const ref = useRef<Group>(null)
  const { progress } = useEntrance()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const live = phase(progress, 0.55, 1)
    ref.current.scale.setScalar(0.85 + live * 0.15)
    ref.current.children.forEach((child, i) => {
      const baseY = (i - 1.5) * 0.26
      child.position.y = baseY + Math.sin(t * 1.3 + i * 0.8) * 0.02 * live
      child.position.x = 2.95
    })
  })

  return (
    <group ref={ref}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[2.95, (i - 1.5) * 0.26, -0.12]}>
          <mesh>
            <boxGeometry args={[0.58, 0.16, 0.07]} />
            <meshStandardMaterial
              color={C.graphiteMid}
              metalness={0.82}
              roughness={0.28}
              envMapIntensity={1}
            />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[0.42, 0.03, 0.01]} />
            <meshStandardMaterial
              color={C.blue}
              emissive={C.blue}
              emissiveIntensity={0.9}
              roughness={0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
