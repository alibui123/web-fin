"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

type Props = { count: number }

/** Thin luminous data packets traveling along ring/node paths. */
export default function DataStreams({ count }: Props) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { progress } = useEntrance()

  const paths = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const a0 = (i / count) * Math.PI * 2
      const r = 1.1 + (i % 3) * 0.35
      const pts = Array.from({ length: 8 }, (_, k) => {
        const a = a0 + (k / 7) * Math.PI * 1.4
        return new THREE.Vector3(
          Math.cos(a) * r,
          Math.sin(a * 2 + i) * 0.25,
          Math.sin(a) * r * 0.7,
        )
      })
      return new THREE.CatmullRomCurve3(pts, true)
    })
  }, [count])

  const meta = useMemo(
    () =>
      Array.from({ length: count * 3 }, (_, i) => ({
        path: i % count,
        offset: (i / (count * 3)) % 1,
        speed: 0.12 + (i % 5) * 0.03,
      })),
    [count],
  )

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    const live = phase(progress, 0.5, 0.95)
    mesh.current.visible = live > 0.05

    meta.forEach((m, i) => {
      const curve = paths[m.path]
      const u = ((t * m.speed * live + m.offset) % 1 + 1) % 1
      const p = curve.getPointAt(u)
      dummy.position.copy(p)
      dummy.scale.setScalar(0.035 + Math.sin(t * 3 + i) * 0.008)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, meta.length]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color={C.blue}
        emissive={C.blue}
        emissiveIntensity={1.2}
        transparent
        opacity={0.85}
        roughness={0.3}
      />
    </instancedMesh>
  )
}
