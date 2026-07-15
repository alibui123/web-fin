"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useWorkflowAnimation } from "./hooks/useWorkflowAnimation"
import { WF } from "./hooks/useWorkflowQuality"

type Props = {
  positions: THREE.Vector3[]
}

/**
 * Thin glowing energy paths between workflow modules.
 */
export default function WorkflowConnections({ positions }: Props) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const { state } = useWorkflowAnimation()

  const geometry = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < positions.length - 1; i++) {
      const a = positions[i]
      const b = positions[i + 1]
      // Slight bezier midpoint for elegance (mid control via average + lift)
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5)
      mid.y += 0.12
      // Approximate with two segments
      arr.push(a.x, a.y, a.z, mid.x, mid.y, mid.z)
      arr.push(mid.x, mid.y, mid.z, b.x, b.y, b.z)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3))
    return geo
  }, [positions])

  useFrame(() => {
    if (!linesRef.current) return
    const mat = linesRef.current.material as THREE.LineBasicMaterial
    mat.opacity =
      0.28 +
      state.energy * 0.08 +
      Math.sin(state.time * 2.1) * 0.04 +
      Math.max(0, Math.sin(state.time * 0.55)) * 0.06
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color={WF.electric}
        transparent
        opacity={0.32}
        depthWrite={false}
      />
    </lineSegments>
  )
}
