"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { TE, TRANSFORM_STAGES } from "./constants"
import { chamberPositions, useJourneyCurve } from "./hooks/useJourneyCurve"

function Chamber({
  position,
  index,
}: {
  position: THREE.Vector3
  index: number
}) {
  const glow = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const pulse = 1 + Math.sin(t * 1.4 + index * 0.9) * 0.04
    if (core.current) core.current.scale.setScalar(pulse)
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.1 + Math.sin(t * 1.2 + index) * 0.035
      glow.current.scale.setScalar(1.35 + Math.sin(t * 0.9 + index) * 0.06)
    }
  })

  return (
    <group position={position.toArray() as [number, number, number]}>
      {/* Smoked / frosted acrylic shell */}
      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial
          color={TE.aluminumBright}
          metalness={0.05}
          roughness={0.18}
          transmission={0.45}
          thickness={0.35}
          transparent
          opacity={0.28}
          ior={1.4}
        />
      </mesh>
      {/* Inner processing core */}
      <mesh ref={core}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color={TE.glow}
          emissive={TE.glow}
          emissiveIntensity={0.65}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
      {/* Soft volumetric glow — additive, no bloom pass */}
      <mesh ref={glow}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial
          color={TE.blue}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Chamber ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.012, 10, 64]} />
        <meshStandardMaterial
          color={TE.graphiteMid}
          metalness={0.88}
          roughness={0.3}
        />
      </mesh>
      <pointLight
        color={TE.glow}
        intensity={0.45}
        distance={2.2}
        decay={2}
      />
    </group>
  )
}

function EnergyBridge({
  a,
  b,
}: {
  a: THREE.Vector3
  b: THREE.Vector3
}) {
  const curve = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5)
    mid.y += 0.15
    return new THREE.CatmullRomCurve3([a.clone(), mid, b.clone()])
  }, [a, b])

  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 24, 0.012, 8, false),
    [curve],
  )

  const packet = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!packet.current) return
    const u = (state.clock.elapsedTime * 0.18 + a.x * 0.05) % 1
    const p = curve.getPointAt(u < 0 ? u + 1 : u)
    packet.current.position.copy(p)
  })

  return (
    <group>
      <mesh geometry={tube}>
        <meshStandardMaterial
          color={TE.blue}
          emissive={TE.blue}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
          roughness={0.4}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={packet}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial
          color={TE.glow}
          emissive={TE.blue}
          emissiveIntensity={1.1}
        />
      </mesh>
    </group>
  )
}

export default function Chambers() {
  const curve = useJourneyCurve()
  const positions = useMemo(() => chamberPositions(curve), [curve])

  return (
    <group>
      {positions.map((pos, i) => (
        <Chamber key={TRANSFORM_STAGES[i]} position={pos} index={i} />
      ))}
      {positions.slice(0, -1).map((pos, i) => (
        <EnergyBridge key={`bridge-${i}`} a={pos} b={positions[i + 1]} />
      ))}
    </group>
  )
}
