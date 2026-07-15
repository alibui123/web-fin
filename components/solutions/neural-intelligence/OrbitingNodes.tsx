"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useNeuralInteraction } from "./hooks/useNeuralInteraction"

const CYAN = "#0EA5E9"
const VIOLET = "#8B5CF6"
const MAGENTA = "#D946EF"
const AXIS = new THREE.Vector3(1, 0, 0.35).normalize()

type OrbitingNodesProps = {
  count: number
}

/**
 * Larger satellite nodes on slow, independent orbits around the core.
 */
export default function OrbitingNodes({ count }: OrbitingNodesProps) {
  const { state } = useNeuralInteraction()
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const scratch = useMemo(() => new THREE.Vector3(), [])

  const orbits = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const radius = 2.35 + (i % 3) * 0.28 + ((i * 17) % 10) * 0.012
      return {
        radius,
        speed: 0.12 + i * 0.035 + ((i * 13) % 7) * 0.006,
        tilt: 0.35 + i * 0.28,
        phase: (i / Math.max(count, 1)) * Math.PI * 2,
        yAmp: 0.15 + ((i * 9) % 8) * 0.025,
        scale: 0.11 + (i % 2) * 0.035,
      }
    })
  }, [count])

  const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 1), [])
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: CYAN,
        emissive: CYAN,
        emissiveIntensity: 0.65,
        metalness: 0.9,
        roughness: 0.18,
      }),
    [],
  )

  const rings = useMemo(() => {
    return orbits.slice(0, Math.min(3, orbits.length)).map((o, i) => ({
      radius: o.radius,
      tilt: o.tilt,
      opacity: 0.08 + i * 0.02,
      color: i === 1 ? MAGENTA : i === 2 ? VIOLET : CYAN,
    }))
  }, [orbits])

  useFrame((three) => {
    const t = three.clock.elapsedTime
    const { hover, pointer, glowBoost } = state

    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.x * 0.05
      groupRef.current.rotation.x = pointer.y * 0.04
    }

    if (!meshRef.current) return

    for (let i = 0; i < orbits.length; i++) {
      const o = orbits[i]
      const angle = t * o.speed * (1 + hover * 0.15) + o.phase
      scratch.set(
        Math.cos(angle) * o.radius,
        Math.sin(angle * 1.4 + o.phase) * o.yAmp,
        Math.sin(angle) * o.radius,
      )
      scratch.applyAxisAngle(AXIS, o.tilt * 0.55)
      dummy.position.copy(scratch)
      dummy.scale.setScalar(o.scale * (1 + hover * 0.08))
      dummy.rotation.set(t * 0.4 + i, t * 0.25, 0)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    mat.emissiveIntensity = 0.55 * glowBoost
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[ring.tilt * 0.6, 0.2 * i, ring.tilt * 0.2]}>
          <torusGeometry args={[ring.radius, 0.004, 8, 96]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
      <instancedMesh ref={meshRef} args={[geo, mat, count]} frustumCulled={false} />
    </group>
  )
}
