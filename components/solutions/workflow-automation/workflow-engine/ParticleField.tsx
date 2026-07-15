"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useWorkflowAnimation } from "./hooks/useWorkflowAnimation"
import { WF } from "./hooks/useWorkflowQuality"

type Props = {
  count: number
}

/**
 * Slow ambient particle field for depth — never the hero of the shot.
 */
export default function ParticleField({ count }: Props) {
  const { state } = useWorkflowAnimation()
  const ref = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1
      velocities[i * 3] = (Math.random() - 0.5) * 0.008
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008
    }
    return { positions, velocities }
  }, [count])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  useFrame((_, delta) => {
    if (!ref.current) return
    const attr = ref.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute
    const speed = delta * 40 * (0.7 + state.energy * 0.2)
    for (let i = 0; i < count; i++) {
      let x = attr.getX(i) + velocities[i * 3] * speed
      let y = attr.getY(i) + velocities[i * 3 + 1] * speed
      let z = attr.getZ(i) + velocities[i * 3 + 2] * speed
      if (Math.abs(x) > 7) x *= -0.96
      if (Math.abs(y) > 3.5) y *= -0.96
      if (Math.abs(z) > 4) z *= -0.96
      attr.setXYZ(i, x, y, z)
    }
    attr.needsUpdate = true
    ref.current.rotation.y += delta * 0.012
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        color={WF.electric}
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
