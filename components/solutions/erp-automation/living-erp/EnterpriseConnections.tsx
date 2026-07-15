"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useErpAnimation } from "./hooks/useERPAnimation"
import { ERP } from "./hooks/useErpQuality"

type Props = {
  positions: THREE.Vector3[]
}

type Link = { a: number; b: number; phase: number }

/**
 * Occasional non-adjacent beams (Finance→Reporting, CRM→Inventory, etc.).
 * Appear, transfer, fade.
 */
export default function EnterpriseConnections({ positions }: Props) {
  const { state } = useErpAnimation()
  const group = useRef<THREE.Group>(null)

  const links = useMemo<Link[]>(() => {
    const n = positions.length
    if (n < 4) return []
    const pairs: [number, number][] = [
      [0, Math.min(6, n - 1)], // Finance → Reporting
      [2, 1], // CRM → Inventory
      [4, Math.min(5, n - 1)], // Procurement → Manufacturing
      [3, Math.min(7, n - 1)], // HR → Operations
    ]
    return pairs
      .filter(([a, b]) => a < n && b < n && a !== b)
      .map(([a, b], i) => ({ a, b, phase: i * 1.7 }))
  }, [positions])

  const meshes = useRef<(THREE.Mesh | null)[]>([])

  useFrame(() => {
    links.forEach((link, i) => {
      const mesh = meshes.current[i]
      if (!mesh) return
      // Staggered appear/fade every ~3s per link
      const local = (state.time * 0.35 + link.phase) % 3
      let opacity = 0
      if (local < 0.35) opacity = local / 0.35
      else if (local < 1.2) opacity = 1
      else if (local < 1.7) opacity = 1 - (local - 1.2) / 0.5
      opacity *= 0.35 + state.sync * 0.4 + state.separation * 0.2

      const a = positions[link.a]
      const b = positions[link.b]
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5)
      mid.x += Math.sin(state.time + link.phase) * 0.15
      mesh.position.copy(mid)
      mesh.lookAt(b)
      const dist = a.distanceTo(b)
      mesh.scale.set(0.012, 0.012, dist)
      const mat = mesh.material as THREE.MeshBasicMaterial
      mat.opacity = opacity
    })
  })

  return (
    <group ref={group}>
      {links.map((link, i) => (
        <mesh
          key={`${link.a}-${link.b}`}
          ref={(el) => {
            meshes.current[i] = el
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? ERP.cyan : ERP.violet}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
