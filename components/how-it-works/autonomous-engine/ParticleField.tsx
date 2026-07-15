"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

type Props = { count: number }

/** Thousands of subtle orbiting particles via BufferGeometry Points. */
export default function ParticleField({ count }: Props) {
  const ref = useRef<THREE.Points>(null)
  const { progress } = useEntrance()

  const { geometry, speeds, radii } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const radii = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = 0.9 + Math.random() * 2.6
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 2.2
      positions[i3] = Math.cos(theta) * r
      positions[i3 + 1] = y
      positions[i3 + 2] = Math.sin(theta) * r * 0.72
      speeds[i] = 0.04 + Math.random() * 0.12
      radii[i] = r
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return { geometry, speeds, radii }
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    const live = phase(progress, 0.35, 0.8)
    const mat = ref.current.material as THREE.PointsMaterial
    mat.opacity = 0.4 * live
    if (live < 0.02) return

    const arr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = arr[i3]
      const z = arr[i3 + 2]
      const angle = Math.atan2(z, x) + delta * speeds[i] * live
      const r = radii[i]
      arr[i3] = Math.cos(angle) * r
      arr[i3 + 2] = Math.sin(angle) * r
      arr[i3 + 1] += Math.sin(angle * 1.4 + i) * delta * 0.04 * live
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.014}
        color={C.glow}
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
