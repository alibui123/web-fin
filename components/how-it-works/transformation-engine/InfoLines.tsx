"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { TE } from "./constants"
import { useJourneyCurve } from "./hooks/useJourneyCurve"

/**
 * Thin luminous information lines flowing through the trusted network path.
 */
export default function InfoLines({ count = 18 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const curve = useJourneyCurve()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const meta = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        offset: i / count,
        speed: 0.14 + (i % 6) * 0.018,
        lateral: ((i % 5) - 2) * 0.04,
      })),
    [count],
  )

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    meta.forEach((m, i) => {
      const u = ((t * m.speed + m.offset) % 1 + 1) % 1
      const p = curve.getPointAt(u)
      const tangent = curve.getTangentAt(u)
      dummy.position.set(p.x, p.y + m.lateral, p.z)
      dummy.scale.set(0.055, 0.012, 0.012)
      dummy.lookAt(p.x + tangent.x, p.y + tangent.y, p.z + tangent.z)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={TE.blue}
        emissive={TE.blue}
        emissiveIntensity={1.2}
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </instancedMesh>
  )
}
