"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { Group } from "three"
import { C } from "./hooks/useEngineQuality"
import { phase, useEntrance } from "./hooks/useEntrance"

export default function HoloUI({ reduced = false }: { reduced?: boolean }) {
  const ref = useRef<Group>(null)
  const { progress } = useEntrance()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const live = phase(progress, 0.3, 0.7)
    ref.current.scale.setScalar(live)
    ref.current.rotation.y = Math.sin(t * 0.18) * 0.06
    ref.current.position.y = 1.85 + Math.sin(t * 0.4) * 0.025
  })

  if (reduced) return null

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.48, 0.505, 80]} />
        <meshBasicMaterial
          color={C.blue}
          transparent
          opacity={0.28}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 0.735, 80]} />
        <meshBasicMaterial
          color={C.glow}
          transparent
          opacity={0.14}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6]}
            rotation={[0, -a, 0]}
          >
            <planeGeometry args={[0.14, 0.045]} />
            <meshBasicMaterial
              color={C.aluminumBright}
              transparent
              opacity={0.18}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}
