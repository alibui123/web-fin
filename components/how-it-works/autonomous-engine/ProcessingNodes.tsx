"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

type Props = { count: number }

export default function ProcessingNodes({ count }: Props) {
  const nodes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2
      const r = 1.35 + (i % 2) * 0.35
      return {
        pos: new THREE.Vector3(
          Math.cos(a) * r,
          Math.sin(a * 1.5) * 0.35,
          Math.sin(a) * r * 0.7,
        ),
        phase: a,
      }
    })
  }, [count])

  const bridges = useMemo(() => {
    const out: { mid: THREE.Vector3; quat: THREE.Quaternion; len: number }[] = []
    const up = new THREE.Vector3(0, 1, 0)
    for (let i = 0; i < nodes.length; i++) {
      const pairs: [THREE.Vector3, THREE.Vector3][] = [
        [nodes[i].pos, nodes[(i + 1) % nodes.length].pos],
      ]
      if (i % 2 === 0) {
        pairs.push([nodes[i].pos, new THREE.Vector3(0, 0, 0)])
      }
      for (const [a, b] of pairs) {
        const mid = a.clone().add(b).multiplyScalar(0.5)
        const dir = b.clone().sub(a)
        const len = dir.length()
        const quat = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize())
        out.push({ mid, quat, len })
      }
    }
    return out
  }, [nodes])

  const group = useRef<THREE.Group>(null)
  const { progress } = useEntrance()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const live = phase(progress, 0.35, 0.75)
    group.current.scale.setScalar(Math.max(0.001, live))
    group.current.children.forEach((child, i) => {
      if (i >= nodes.length) return
      const n = nodes[i]
      child.position.y = n.pos.y + Math.sin(t * 1.2 + n.phase) * 0.04
    })
  })

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={`n-${i}`} position={n.pos.toArray() as [number, number, number]}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial
            color={C.aluminum}
            metalness={0.85}
            roughness={0.25}
            emissive={C.blue}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {bridges.map((b, i) => (
        <mesh
          key={`b-${i}`}
          position={b.mid.toArray() as [number, number, number]}
          quaternion={b.quat}
        >
          <cylinderGeometry args={[0.004, 0.004, b.len, 6]} />
          <meshStandardMaterial
            color={C.blue}
            emissive={C.blue}
            emissiveIntensity={0.7}
            transparent
            opacity={0.45}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}
