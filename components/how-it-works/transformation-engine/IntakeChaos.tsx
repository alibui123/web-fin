"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { TE } from "./constants"

/**
 * Left-side intake: fragmented docs, cubes, and scattered particles
 * drifting toward the first chamber in visible disorder.
 */
export default function IntakeChaos({ count = 28 }: { count?: number }) {
  const cubes = useRef<THREE.InstancedMesh>(null)
  const docs = useRef<THREE.InstancedMesh>(null)
  const dust = useRef<THREE.Points>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const cubeMeta = useMemo(
    () =>
      Array.from({ length: Math.floor(count * 0.55) }, (_, i) => ({
        seed: i * 2.17,
        amp: 0.35 + (i % 5) * 0.08,
        speed: 0.35 + (i % 7) * 0.05,
        base: new THREE.Vector3(
          -4.6 - (i % 4) * 0.18,
          ((i % 6) - 2.5) * 0.28,
          ((i % 5) - 2) * 0.22,
        ),
      })),
    [count],
  )

  const docMeta = useMemo(
    () =>
      Array.from({ length: Math.floor(count * 0.25) }, (_, i) => ({
        seed: i * 3.1,
        amp: 0.4 + (i % 4) * 0.1,
        speed: 0.28 + (i % 5) * 0.04,
        base: new THREE.Vector3(
          -4.85 - (i % 3) * 0.2,
          ((i % 5) - 2) * 0.35,
          ((i % 4) - 1.5) * 0.25,
        ),
      })),
    [count],
  )

  const dustGeo = useMemo(() => {
    const n = Math.floor(count * 2.2)
    const positions = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const i3 = i * 3
      positions[i3] = -5.2 + Math.random() * 1.4
      positions[i3 + 1] = (Math.random() - 0.5) * 2.8
      positions[i3 + 2] = (Math.random() - 0.5) * 2.2
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    cubeMeta.forEach((m, i) => {
      if (!cubes.current) return
      const pull = ((Math.sin(t * 0.4 + m.seed) + 1) * 0.5) * 0.55
      dummy.position.set(
        m.base.x + pull * 0.9,
        m.base.y + Math.sin(t * m.speed + m.seed) * m.amp,
        m.base.z + Math.cos(t * m.speed * 0.8 + m.seed) * m.amp * 0.7,
      )
      dummy.rotation.set(t * 0.6 + m.seed, t * 0.4 + m.seed, t * 0.3)
      dummy.scale.setScalar(0.1 + (i % 3) * 0.025)
      dummy.updateMatrix()
      cubes.current.setMatrixAt(i, dummy.matrix)
    })
    if (cubes.current) cubes.current.instanceMatrix.needsUpdate = true

    docMeta.forEach((m, i) => {
      if (!docs.current) return
      const pull = ((Math.cos(t * 0.35 + m.seed) + 1) * 0.5) * 0.5
      dummy.position.set(
        m.base.x + pull * 0.85,
        m.base.y + Math.sin(t * m.speed + m.seed) * m.amp,
        m.base.z + Math.cos(t * 0.55 + m.seed) * m.amp * 0.6,
      )
      dummy.rotation.set(
        Math.sin(t + m.seed) * 0.8,
        t * 0.25 + m.seed,
        Math.cos(t * 0.7 + m.seed) * 0.5,
      )
      dummy.scale.setScalar(0.11)
      dummy.updateMatrix()
      docs.current.setMatrixAt(i, dummy.matrix)
    })
    if (docs.current) docs.current.instanceMatrix.needsUpdate = true

    if (dust.current) {
      dust.current.rotation.y = t * 0.05
      const mat = dust.current.material as THREE.PointsMaterial
      mat.opacity = 0.22 + Math.sin(t * 1.2) * 0.06
    }
  })

  return (
    <group>
      <instancedMesh
        ref={cubes}
        args={[undefined, undefined, cubeMeta.length]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={TE.graphite}
          metalness={0.75}
          roughness={0.4}
          transparent
          opacity={0.85}
        />
      </instancedMesh>
      <instancedMesh
        ref={docs}
        args={[undefined, undefined, docMeta.length]}
        frustumCulled={false}
      >
        <boxGeometry args={[1.2, 1.5, 0.08]} />
        <meshStandardMaterial
          color={TE.aluminum}
          metalness={0.4}
          roughness={0.45}
          transparent
          opacity={0.7}
        />
      </instancedMesh>
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial
          size={0.02}
          color={TE.aluminumBright}
          transparent
          opacity={0.25}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
