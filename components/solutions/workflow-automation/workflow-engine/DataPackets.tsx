"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useWorkflowAnimation } from "./hooks/useWorkflowAnimation"
import { WF } from "./hooks/useWorkflowQuality"

type Props = {
  positions: THREE.Vector3[]
  count: number
}

function samplePath(positions: THREE.Vector3[], t: number, out: THREE.Vector3) {
  const n = positions.length
  if (n === 0) return out.set(0, 0, 0)
  if (n === 1) return out.copy(positions[0])
  const scaled = THREE.MathUtils.clamp(t, 0, 0.9999) * (n - 1)
  const i = Math.floor(scaled)
  const local = scaled - i
  const e = local * local * (3 - 2 * local)
  const a = positions[i]
  const b = positions[Math.min(i + 1, n - 1)]
  return out.set(
    a.x + (b.x - a.x) * e,
    a.y + (b.y - a.y) * e + Math.sin(local * Math.PI) * 0.08,
    a.z + (b.z - a.z) * e,
  )
}

/**
 * Continuous cyan data packets + one highlight packet for the full pass.
 */
export default function DataPackets({ positions, count }: Props) {
  const { state } = useWorkflowAnimation()
  const pointsRef = useRef<THREE.Points>(null)
  const highlightRef = useRef<THREE.Mesh>(null)
  const highlightLight = useRef<THREE.PointLight>(null)
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const { progress, speeds, basePositions } = useMemo(() => {
    const progress = new Float32Array(count)
    const speeds = new Float32Array(count)
    const basePositions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      progress[i] = i / count
      speeds[i] = 0.12 + (i % 5) * 0.025
    }
    return { progress, speeds, basePositions }
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(basePositions, 3))
    return g
  }, [basePositions])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute
      for (let i = 0; i < count; i++) {
        progress[i] += delta * speeds[i] * (0.85 + state.energy * 0.25)
        if (progress[i] > 1) progress[i] -= 1
        samplePath(positions, progress[i], tmp)
        attr.setXYZ(i, tmp.x, tmp.y, tmp.z)
      }
      attr.needsUpdate = true
    }

    samplePath(positions, state.highlightT, tmp)
    if (highlightRef.current) {
      highlightRef.current.position.copy(tmp)
      const pulse = 0.9 + Math.sin(state.time * 6) * 0.15
      highlightRef.current.scale.setScalar(pulse * (0.85 + state.energy * 0.15))
    }
    if (highlightLight.current) {
      highlightLight.current.position.copy(tmp)
      highlightLight.current.intensity = 1.2 + state.energy * 0.6
    }
  })

  return (
    <group>
      <points ref={pointsRef} geometry={geo} frustumCulled={false}>
        <pointsMaterial
          color={WF.cyan}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={highlightRef}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshBasicMaterial
          color={WF.white}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight
        ref={highlightLight}
        color={WF.cyan}
        intensity={1.4}
        distance={3.5}
        decay={2}
      />
    </group>
  )
}
