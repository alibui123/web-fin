"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { AC, ORBITS } from "./constants"
import { useEntrance } from "./hooks/useEntrance"

type Props = { particleMultiplier: number }

/** Four thin metallic rings + light particle flow — kept minimal */
export default function OrbitalRings({ particleMultiplier }: Props) {
  const ringRefs = useRef<(THREE.Group | null)[]>([])
  const particleRefs = useRef<(THREE.InstancedMesh | null)[]>([])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const { state } = useEntrance()

  const particleCounts = useMemo(
    () => ORBITS.map((o) => Math.max(10, Math.floor(o.particles * particleMultiplier))),
    [particleMultiplier],
  )

  useFrame((clockState) => {
    const t = clockState.clock.elapsedTime

    ORBITS.forEach((orbit, i) => {
      const reveal = state.rings[i] ?? 0
      const group = ringRefs.current[i]
      if (group) {
        group.scale.setScalar(0.85 + reveal * 0.15)
        group.visible = reveal > 0.02
        const ringMesh = group.children[0] as THREE.Mesh | undefined
        if (ringMesh) {
          const mat = ringMesh.material as THREE.MeshStandardMaterial
          mat.opacity = 0.5 * reveal
        }
      }

      const mesh = particleRefs.current[i]
      if (!mesh || reveal < 0.05 || state.particles < 0.05) return
      const count = particleCounts[i]
      const speed = orbit.speed * 2.2 * orbit.dir
      for (let p = 0; p < count; p++) {
        const u = (t * speed * 0.12 + p / count) % 1
        const angle = u * Math.PI * 2
        dummy.position.set(
          Math.cos(angle) * orbit.radius,
          0,
          Math.sin(angle) * orbit.radius,
        )
        dummy.scale.setScalar(0.018)
        dummy.updateMatrix()
        mesh.setMatrixAt(p, dummy.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.opacity = 0.55 * reveal * state.particles
    })
  })

  return (
    <group>
      {ORBITS.map((orbit, i) => (
        <group
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el
          }}
          rotation={[orbit.tilt, 0, 0]}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[orbit.radius, 0.008, 8, 128]} />
            <meshStandardMaterial
              color={AC.aluminum}
              metalness={0.9}
              roughness={0.3}
              transparent
              opacity={0.5}
              emissive={AC.blue}
              emissiveIntensity={0.08}
              depthWrite={false}
            />
          </mesh>
          <instancedMesh
            ref={(el) => {
              particleRefs.current[i] = el
            }}
            args={[undefined, undefined, particleCounts[i]]}
            frustumCulled={false}
          >
            <sphereGeometry args={[1, 6, 6]} />
            <meshStandardMaterial
              color={AC.glow}
              emissive={AC.blue}
              emissiveIntensity={0.8}
              transparent
              opacity={0.55}
              depthWrite={false}
            />
          </instancedMesh>
        </group>
      ))}
    </group>
  )
}
