"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

type Props = { count: number }

/**
 * Instanced task cubes + document slabs traveling the processing spline.
 * Enter chaotic → rearrange near core → exit aligned.
 */
export default function TaskFlow({ count }: Props) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const docs = useRef<THREE.InstancedMesh>(null)
  const { progress } = useEntrance()

  const pathway = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.6, 0.25, 0.35),
      new THREE.Vector3(-2.2, 0.1, 0.45),
      new THREE.Vector3(-1.1, 0.05, 0.15),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.1, -0.02, -0.12),
      new THREE.Vector3(2.2, -0.08, -0.28),
      new THREE.Vector3(3.5, -0.12, -0.18),
    ])
  }, [])

  const tube = useMemo(
    () => new THREE.TubeGeometry(pathway, 72, 0.01, 8, false),
    [pathway],
  )

  const meta = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      isDoc: i % 4 === 0,
      speed: 0.18 + (i % 7) * 0.018,
      offset: i / count,
      yJ: ((i * 13) % 10) / 10 - 0.5,
      zJ: ((i * 7) % 10) / 10 - 0.5,
    }))
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const cubeCount = useMemo(() => meta.filter((m) => !m.isDoc).length, [meta])
  const docCount = useMemo(() => meta.filter((m) => m.isDoc).length, [meta])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const live = phase(progress, 0.45, 0.9)
    if (live < 0.01) return

    let ci = 0
    let di = 0

    meta.forEach((m) => {
      const u = ((t * m.speed * live + m.offset) % 1 + 1) % 1
      const p = pathway.getPointAt(u)

      // Spread on entry, tighten near core, lock on exit
      const spread = u < 0.35 ? 1 - u / 0.35 : u > 0.65 ? Math.max(0, 1 - (u - 0.65) / 0.2) : 0.15
      const y = p.y + m.yJ * 0.55 * spread
      const z = p.z + m.zJ * 0.4 * spread

      let scale = 0.85
      if (u > 0.38 && u < 0.55) {
        // rearrange / merge zone near core
        scale = 0.7 + Math.sin(t * 4 + m.offset * 20) * 0.08
      } else if (u >= 0.65) {
        scale = 1
      }

      dummy.position.set(p.x, y, z)
      dummy.scale.setScalar(scale * (0.14 + (m.isDoc ? 0.02 : 0)))
      dummy.rotation.set(
        u < 0.55 ? t * 0.8 + m.offset : 0,
        u < 0.55 ? t * 0.5 + m.offset * 2 : Math.PI * 0.1,
        0,
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
      mesh.current.visible = live > 0.05
    }
    if (docs.current) {
      docs.current.count = di
      docs.current.instanceMatrix.needsUpdate = true
      docs.current.visible = live > 0.05
    }
  })

  return (
    <group>
      <mesh geometry={tube}>
        <meshStandardMaterial
          color={C.blue}
          emissive={C.blue}
          emissiveIntensity={0.4}
          transparent
          opacity={0.28}
          depthWrite={false}
          roughness={0.45}
        />
      </mesh>
      <group position={[0, 0.18, 0.08]} scale={[1, 0.8, 0.8]}>
        <mesh geometry={tube}>
          <meshBasicMaterial
            color={C.glow}
            transparent
            opacity={0.06}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <instancedMesh ref={mesh} args={[undefined, undefined, cubeCount]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={C.graphiteMid}
          metalness={0.78}
          roughness={0.32}
          emissive={C.blue}
          emissiveIntensity={0.12}
        />
      </instancedMesh>

      <instancedMesh ref={docs} args={[undefined, undefined, docCount]} frustumCulled={false}>
        <boxGeometry args={[1.1, 1.4, 0.12]} />
        <meshStandardMaterial
          color={C.aluminumBright}
          metalness={0.4}
          roughness={0.35}
          emissive={C.glow}
          emissiveIntensity={0.08}
        />
      </instancedMesh>
    </group>
  )
}
