"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useErpAnimation } from "./hooks/useERPAnimation"
import { ERP } from "./hooks/useErpQuality"

type Props = {
  positions: THREE.Vector3[]
  count: number
}

/**
 * Vertical / cross-layer data packets between ERP modules.
 */
export default function DataStreams({ positions, count }: Props) {
  const { state } = useErpAnimation()
  const pointsRef = useRef<THREE.Points>(null)
  const railRef = useRef<THREE.LineSegments>(null)

  const { progress, speeds, lanes, base } = useMemo(() => {
    const progress = new Float32Array(count)
    const speeds = new Float32Array(count)
    const lanes = new Int16Array(count)
    const base = new Float32Array(count * 3)
    const maxLane = Math.max(1, positions.length - 1)
    for (let i = 0; i < count; i++) {
      progress[i] = Math.random()
      speeds[i] = 0.18 + (i % 6) * 0.04
      lanes[i] = i % maxLane
    }
    return { progress, speeds, lanes, base }
  }, [count, positions.length])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(base, 3))
    return g
  }, [base])

  const railGeo = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < positions.length - 1; i++) {
      const a = positions[i]
      const b = positions[i + 1]
      arr.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3))
    return g
  }, [positions])

  useFrame((_, delta) => {
    const boost = 1 + state.sync * 1.4 + state.separation * 0.5
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute
      for (let i = 0; i < count; i++) {
        progress[i] += delta * speeds[i] * boost * 0.35
        if (progress[i] > 1) progress[i] -= 1
        const lane = lanes[i]
        const a = positions[lane]
        const b = positions[Math.min(lane + 1, positions.length - 1)]
        const p = progress[i]
        const e = p * p * (3 - 2 * p)
        // Mild lateral wobble for "enterprise events"
        const wobble = Math.sin(state.time * 2 + i) * 0.08 * state.separation
        attr.setXYZ(
          i,
          a.x + (b.x - a.x) * e + wobble,
          a.y + (b.y - a.y) * e,
          a.z + (b.z - a.z) * e + Math.cos(state.time + i) * 0.06,
        )
      }
      attr.needsUpdate = true
    }
    if (railRef.current) {
      const mat = railRef.current.material as THREE.LineBasicMaterial
      mat.opacity =
        0.12 +
        state.separation * 0.35 +
        state.sync * 0.25 +
        Math.sin(state.time * 1.8) * 0.04
    }
  })

  return (
    <group>
      <lineSegments ref={railRef} geometry={railGeo}>
        <lineBasicMaterial
          color={ERP.electric}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>
      <points ref={pointsRef} geometry={geo} frustumCulled={false}>
        <pointsMaterial
          color={ERP.cyan}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
