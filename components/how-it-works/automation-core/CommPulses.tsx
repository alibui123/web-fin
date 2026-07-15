"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { AC, CAPABILITIES, ORBITS } from "./constants"
import { useEntrance } from "./hooks/useEntrance"

type Pulse = {
  capIndex: number
  phase: number
  speed: number
}

/**
 * Soft light packets traveling node ↔ core on elegant curved trails.
 */
export default function CommPulses({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const trail = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const { state } = useEntrance()

  const pulses = useMemo<Pulse[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        capIndex: i % CAPABILITIES.length,
        phase: i / count,
        speed: 0.22 + (i % 4) * 0.04,
      })),
    [count],
  )

  const trailN = count * 5

  useFrame((clockState) => {
    if (!mesh.current) return
    const reveal = state.pulses
    if (reveal < 0.05) {
      mesh.current.visible = false
      if (trail.current) trail.current.visible = false
      return
    }
    mesh.current.visible = true
    if (trail.current) trail.current.visible = true

    const t = clockState.clock.elapsedTime
    let ti = 0

    pulses.forEach((p, i) => {
      const cap = CAPABILITIES[p.capIndex]
      const orbit = ORBITS[cap.ring]
      // Approximate node world position on tilted plane (simplified xy-facing)
      const angle = cap.angle + t * orbit.speed * orbit.dir
      const nx = Math.cos(angle) * orbit.radius
      const nz = Math.sin(angle) * orbit.radius
      const ny = Math.sin(orbit.tilt) * nz * 0.15

      // Triangle wave 0→1→0 for round trip
      const uRaw = (t * p.speed + p.phase) % 2
      const u = uRaw < 1 ? uRaw : 2 - uRaw

      // Quadratic bezier with soft arc
      const midX = nx * 0.5
      const midY = 0.55 + Math.sin(p.phase * 6) * 0.2
      const midZ = nz * 0.5
      const x = (1 - u) * (1 - u) * 0 + 2 * (1 - u) * u * midX + u * u * nx
      const y = (1 - u) * (1 - u) * 0 + 2 * (1 - u) * u * midY + u * u * ny
      const z = (1 - u) * (1 - u) * 0 + 2 * (1 - u) * u * midZ + u * u * nz

      dummy.position.set(x, y, z)
      dummy.scale.setScalar(0.045)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)

      // Curved trail samples
      for (let s = 1; s <= 5; s++) {
        const tu = Math.max(0, u - s * 0.04)
        const tx =
          (1 - tu) * (1 - tu) * 0 + 2 * (1 - tu) * tu * midX + tu * tu * nx
        const ty =
          (1 - tu) * (1 - tu) * 0 + 2 * (1 - tu) * tu * midY + tu * tu * ny
        const tz =
          (1 - tu) * (1 - tu) * 0 + 2 * (1 - tu) * tu * midZ + tu * tu * nz
        dummy.position.set(tx, ty, tz)
        dummy.scale.setScalar(0.018 * (1 - s * 0.12))
        dummy.updateMatrix()
        if (trail.current && ti < trailN) {
          trail.current.setMatrixAt(ti++, dummy.matrix)
        }
      }
    })

    mesh.current.instanceMatrix.needsUpdate = true
    if (trail.current) {
      trail.current.count = ti
      trail.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={AC.glow}
          emissive={AC.blue}
          emissiveIntensity={1.4}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </instancedMesh>
      <instancedMesh
        ref={trail}
        args={[undefined, undefined, trailN]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial
          color={AC.blue}
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  )
}
