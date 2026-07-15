"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { AC } from "./constants"
import { useEntrance } from "./hooks/useEntrance"

/**
 * Soft expanding wave from Automation Core across all orbits, then fade.
 */
export default function CoreWave() {
  const mesh = useRef<THREE.Mesh>(null)
  const { state } = useEntrance()

  useFrame((clockState) => {
    if (!mesh.current || !state.ready) {
      if (mesh.current) mesh.current.visible = false
      return
    }
    const t = clockState.clock.elapsedTime
    // Cycle every ~6.5s
    const cycle = (t % 6.5) / 6.5
    if (cycle > 0.55) {
      mesh.current.visible = false
      return
    }
    mesh.current.visible = true
    const u = cycle / 0.55
    const r = 0.9 + u * 4.0
    mesh.current.scale.set(r, r, r)
    const mat = mesh.current.material as THREE.MeshBasicMaterial
    mat.opacity = (1 - u) * 0.18 * state.core
  })

  return (
    <mesh ref={mesh} rotation={[Math.PI / 2.15, 0.1, 0]}>
      <ringGeometry args={[0.92, 1.0, 64]} />
      <meshBasicMaterial
        color={AC.glow}
        transparent
        opacity={0.15}
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
