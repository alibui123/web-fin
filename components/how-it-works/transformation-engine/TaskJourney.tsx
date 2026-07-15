"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { TE } from "./constants"
import { useJourneyCurve } from "./hooks/useJourneyCurve"

type Props = { count: number }

/**
 * Task journey: disordered intake → progressive structure along stages.
 * Order increases with progress along the curve (visible transformation).
 */
export default function TaskJourney({ count }: Props) {
  const curve = useJourneyCurve()
  const mesh = useRef<THREE.InstancedMesh>(null)
  const docs = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const meta = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        isDoc: i % 5 === 0,
        speed: 0.055 + (i % 9) * 0.008,
        offset: i / count,
        seed: i * 1.618,
      })),
    [count],
  )

  const cubeN = useMemo(() => meta.filter((m) => !m.isDoc).length, [meta])
  const docN = useMemo(() => meta.filter((m) => m.isDoc).length, [meta])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    let ci = 0
    let di = 0

    meta.forEach((m) => {
      const u = ((t * m.speed + m.offset) % 1 + 1) % 1
      const p = curve.getPointAt(u)

      // Disorder on left, tighten through stages, lock on exit
      const chaos = Math.max(0, 1 - u * 1.35)
      const align = Math.min(1, Math.max(0, (u - 0.55) / 0.35))

      const yOff =
        Math.sin(m.seed * 10) * 0.55 * chaos +
        Math.sin(t * 2 + m.seed) * 0.05 * chaos
      const zOff =
        Math.cos(m.seed * 7) * 0.45 * chaos +
        Math.cos(t * 1.5 + m.seed) * 0.04 * chaos

      // Near chambers: brief rearrange spin; later: settle upright
      const spinning = u < 0.7
      const scale = 0.12 + align * 0.04

      dummy.position.set(p.x, p.y + yOff, p.z + zOff)
      dummy.scale.setScalar(scale)
      dummy.rotation.set(
        spinning ? t * (1.2 - u) + m.seed : 0,
        spinning ? t * 0.7 + m.seed : align * 0.05,
        spinning ? Math.sin(t + m.seed) * 0.4 * chaos : 0,
      )
      dummy.updateMatrix()

      if (m.isDoc && docs.current) {
        docs.current.setMatrixAt(di++, dummy.matrix)
      } else if (!m.isDoc && mesh.current) {
        mesh.current.setMatrixAt(ci++, dummy.matrix)
      }
    })

    if (mesh.current) {
      mesh.current.count = ci
      mesh.current.instanceMatrix.needsUpdate = true
    }
    if (docs.current) {
      docs.current.count = di
      docs.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, cubeN]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={TE.graphiteMid}
          metalness={0.8}
          roughness={0.3}
          emissive={TE.blue}
          emissiveIntensity={0.08}
        />
      </instancedMesh>
      <instancedMesh ref={docs} args={[undefined, undefined, docN]} frustumCulled={false}>
        <boxGeometry args={[1.15, 1.45, 0.1]} />
        <meshStandardMaterial
          color={TE.aluminumBright}
          metalness={0.35}
          roughness={0.4}
          emissive={TE.glow}
          emissiveIntensity={0.06}
        />
      </instancedMesh>
    </group>
  )
}
