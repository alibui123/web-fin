"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useErpAnimation } from "./hooks/useERPAnimation"
import { ERP } from "./hooks/useErpQuality"

type Props = {
  count: number
  modulePositions: THREE.Vector3[]
}

/**
 * Enterprise event particles — drift, sink into a module, emerge elsewhere.
 */
export default function ParticleField({ count, modulePositions }: Props) {
  const { state } = useErpAnimation()
  const ref = useRef<THREE.Points>(null)

  const { positions, velocities, targets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const targets = new Int16Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7
      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
      targets[i] = i % Math.max(modulePositions.length, 1)
    }
    return { positions, velocities, targets }
  }, [count, modulePositions.length])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  useFrame((_, delta) => {
    if (!ref.current || modulePositions.length === 0) return
    const attr = ref.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute
    const speed = delta * 35 * (0.8 + state.energy * 0.25)

    for (let i = 0; i < count; i++) {
      let x = attr.getX(i)
      let y = attr.getY(i)
      let z = attr.getZ(i)

      // Occasional attraction toward a module
      const attract = (i + Math.floor(state.time * 0.4)) % 17 === 0
      if (attract || state.sync > 0.4) {
        const t = modulePositions[targets[i] % modulePositions.length]
        x += (t.x - x) * 0.015 * (1 + state.sync)
        y += (t.y - y) * 0.015 * (1 + state.sync)
        z += (t.z - z) * 0.015 * (1 + state.sync)
        // Teleport emerge elsewhere when close
        const dx = t.x - x
        const dy = t.y - y
        const dz = t.z - z
        if (dx * dx + dy * dy + dz * dz < 0.08) {
          x = (Math.random() - 0.5) * 8
          y = (Math.random() - 0.5) * 6
          z = (Math.random() - 0.5) * 5
          targets[i] = (targets[i] + 3) % modulePositions.length
        }
      } else {
        x += velocities[i * 3] * speed
        y += velocities[i * 3 + 1] * speed
        z += velocities[i * 3 + 2] * speed
      }

      if (Math.abs(x) > 6) x *= -0.95
      if (Math.abs(y) > 4.5) y *= -0.95
      if (Math.abs(z) > 4) z *= -0.95

      attr.setXYZ(i, x, y, z)
    }
    attr.needsUpdate = true
    ref.current.rotation.y += delta * 0.01
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        color={ERP.electric}
        size={0.012}
        sizeAttenuation
        transparent
        opacity={0.32}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
