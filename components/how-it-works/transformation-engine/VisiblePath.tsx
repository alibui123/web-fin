"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { TE } from "./constants"
import { useJourneyCurve } from "./hooks/useJourneyCurve"

/** Main pathway tube — always visible process route (no black box). */
export default function VisiblePath() {
  const curve = useJourneyCurve()
  const flow = useRef<THREE.Mesh>(null)

  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 96, 0.018, 10, false),
    [curve],
  )

  const glowTube = useMemo(
    () => new THREE.TubeGeometry(curve, 64, 0.04, 8, false),
    [curve],
  )

  useFrame((state) => {
    if (!flow.current) return
    const mat = flow.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.35 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
  })

  return (
    <group>
      <mesh ref={flow} geometry={tube}>
        <meshStandardMaterial
          color={TE.aluminum}
          metalness={0.6}
          roughness={0.35}
          emissive={TE.blue}
          emissiveIntensity={0.35}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh geometry={glowTube}>
        <meshBasicMaterial
          color={TE.blue}
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
