"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useNeuralInteraction } from "./hooks/useNeuralInteraction"

const CYAN = "#0EA5E9"

type ParticleFieldProps = {
  count: number
}

/**
 * Ambient particle field — soft depth around the neural core.
 */
export default function ParticleField({ count }: ParticleFieldProps) {
  const { state } = useNeuralInteraction()
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 3.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75
      positions[i * 3 + 2] = r * Math.cos(phi)
      velocities[i * 3] = (Math.random() - 0.5) * 0.015
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.012
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015
    }
    return { positions, velocities }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const { particleBoost, pointer, hover } = state
    const attr = pointsRef.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute
    const speed = delta * 55 * particleBoost

    for (let i = 0; i < count; i++) {
      let x = attr.getX(i) + velocities[i * 3] * speed
      let y = attr.getY(i) + velocities[i * 3 + 1] * speed
      let z = attr.getZ(i) + velocities[i * 3 + 2] * speed

      x += pointer.x * hover * 0.002
      y += pointer.y * hover * 0.002

      const dist = Math.sqrt(x * x + y * y + z * z)
      if (dist > 5.8) {
        const s = 2.6 / dist
        x *= s
        y *= s
        z *= s
      }

      attr.setXYZ(i, x, y, z)
    }
    attr.needsUpdate = true
    pointsRef.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        color={CYAN}
        size={0.016}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
