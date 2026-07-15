"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

type Props = { count: number }

export default function MicroAgents({ count }: Props) {
  const group = useRef<Group>(null)
  const { progress } = useEntrance()

  const agents = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 2.05 + (i % 3) * 0.18,
        speed: 0.22 + i * 0.04,
        phase: (i / count) * Math.PI * 2,
        elev: ((i * 0.41) % 1) * 0.4 - 0.2,
      })),
    [count],
  )

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const live = phase(progress, 0.4, 0.85)
    group.current.scale.setScalar(live)

    group.current.children.forEach((child, i) => {
      const a = agents[i]
      if (!a) return
      const angle = t * a.speed + a.phase
      child.position.set(
        Math.cos(angle) * a.radius,
        a.elev + Math.sin(angle * 0.8) * 0.12,
        Math.sin(angle) * a.radius * 0.72,
      )
      child.rotation.y = angle + Math.PI / 2
    })
  })

  return (
    <group ref={group}>
      {agents.map((_, i) => (
        <group key={i}>
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial
              color={C.aluminumBright}
              metalness={0.88}
              roughness={0.2}
              emissive={C.blue}
              emissiveIntensity={0.4}
            />
          </mesh>
          <mesh position={[0.07, 0, 0]}>
            <boxGeometry args={[0.07, 0.022, 0.022]} />
            <meshStandardMaterial color={C.titanium} metalness={0.85} roughness={0.28} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
