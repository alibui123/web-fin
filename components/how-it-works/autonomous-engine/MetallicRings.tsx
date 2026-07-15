"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

type RingDef = {
  radius: number
  tube: number
  speed: number
  axis: "x" | "y" | "z"
  tilt: [number, number, number]
  metal: string
}

function buildRings(count: number): RingDef[] {
  const base: RingDef[] = [
    { radius: 0.78, tube: 0.018, speed: 0.2, axis: "y", tilt: [0.15, 0, 0.1], metal: C.titanium },
    { radius: 1.02, tube: 0.022, speed: -0.14, axis: "x", tilt: [0.55, 0.08, 0], metal: C.aluminum },
    { radius: 1.26, tube: 0.016, speed: 0.11, axis: "z", tilt: [0.25, 0.4, 0.12], metal: C.graphiteMid },
    { radius: 1.48, tube: 0.02, speed: -0.08, axis: "y", tilt: [0.4, 0.15, 0.2], metal: C.titanium },
    { radius: 1.72, tube: 0.014, speed: 0.06, axis: "x", tilt: [0.2, 0.55, 0.1], metal: C.aluminum },
    { radius: 1.95, tube: 0.012, speed: -0.045, axis: "z", tilt: [0.5, 0.25, 0.05], metal: C.graphite },
    { radius: 2.16, tube: 0.01, speed: 0.035, axis: "y", tilt: [0.3, 0.35, 0.18], metal: C.titanium },
  ]
  return base.slice(0, count)
}

function Ring({ def, live }: { def: RingDef; live: number }) {
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation[def.axis] += delta * def.speed * live
  })

  return (
    <group ref={ref} rotation={def.tilt} scale={0.92 + live * 0.08}>
      <mesh>
        <torusGeometry args={[def.radius, def.tube, 14, 128]} />
        <meshStandardMaterial
          color={def.metal}
          metalness={0.92}
          roughness={0.28}
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[def.radius, def.tube * 0.28, 8, 128]} />
        <meshStandardMaterial
          color={C.blue}
          emissive={C.blue}
          emissiveIntensity={0.55 * live}
          metalness={0.4}
          roughness={0.35}
          transparent
          opacity={0.55 * live}
        />
      </mesh>
    </group>
  )
}

export default function MetallicRings({ count }: { count: number }) {
  const rings = useMemo(() => buildRings(count), [count])
  const { progress } = useEntrance()
  const live = phase(progress, 0.2, 0.65)

  return (
    <group>
      {rings.map((def, i) => (
        <Ring key={i} def={def} live={live} />
      ))}
    </group>
  )
}
