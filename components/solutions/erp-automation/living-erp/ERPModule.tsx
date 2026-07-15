"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { useErpAnimation } from "./hooks/useERPAnimation"
import { ERP, type ErpDomain } from "./hooks/useErpQuality"

type Props = {
  index: number
  domain: ErpDomain
  basePosition: THREE.Vector3
}

const DOMAIN_ACCENT: Record<ErpDomain, string> = {
  finance: ERP.electric,
  inventory: ERP.cyan,
  crm: ERP.violet,
  hr: ERP.magenta,
  procurement: ERP.purple,
  manufacturing: ERP.electric,
  reporting: ERP.cyan,
  operations: ERP.violet,
}

/**
 * Frosted-glass ERP domain block with subtle internal circuitry light.
 */
export default function ERPModule({ index, domain, basePosition }: Props) {
  const { state } = useErpAnimation()
  const root = useRef<THREE.Group>(null)
  const glass = useRef<THREE.MeshPhysicalMaterial>(null)
  const frame = useRef<THREE.MeshStandardMaterial>(null)
  const circuit = useRef<THREE.Points>(null)
  const core = useRef<THREE.MeshBasicMaterial>(null)

  const accent = DOMAIN_ACCENT[domain]

  const circuitGeo = useMemo(() => {
    const count = 36
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.55
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.05
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  const seed = useMemo(
    () => ({
      floatAmp: 0.04 + (index % 3) * 0.012,
      floatSpeed: 0.45 + index * 0.08,
      rotSpeed: 0.04 + (index % 4) * 0.015,
      phase: index * 0.85,
      // Direction of separation offset during sync
      sepBias: ((index % 2) * 2 - 1) * (0.08 + index * 0.02),
    }),
    [index],
  )

  useFrame((_, delta) => {
    const t = state.time
    const sep = state.separation
    const sync = state.sync
    const energy = state.energy

    if (root.current) {
      const yOffset =
        Math.sin(t * seed.floatSpeed + seed.phase) * seed.floatAmp +
        // Separate layers during sync cycle
        (index - 3.5) * sep * 0.22
      root.current.position.set(
        basePosition.x + sep * seed.sepBias,
        basePosition.y + yOffset,
        basePosition.z + sep * Math.sin(index) * 0.12,
      )
      root.current.rotation.y += delta * seed.rotSpeed * (0.7 + sync)
      root.current.rotation.x = Math.sin(t * 0.35 + seed.phase) * 0.05
      root.current.rotation.z = sep * seed.sepBias * 0.08
    }

    if (glass.current) {
      glass.current.emissiveIntensity = (0.18 + sync * 0.7 + sep * 0.2) * energy
      glass.current.opacity = 0.52 + sync * 0.18
    }
    if (frame.current) {
      frame.current.emissiveIntensity = 0.28 + sync * 0.75 * energy
    }
    if (core.current) {
      core.current.opacity = 0.08 + sync * 0.22 + Math.sin(t * 2 + seed.phase) * 0.03
    }
    if (circuit.current) {
      circuit.current.rotation.y += delta * (0.4 + sync * 1.2)
      const mat = circuit.current.material as THREE.PointsMaterial
      mat.opacity = 0.25 + sync * 0.45 + sep * 0.15
    }
  })

  return (
    <group ref={root} position={basePosition}>
      {/* Soft circular halo — never a rectangular plane */}
      <mesh>
        <sphereGeometry args={[1.15, 24, 24]} />
        <meshBasicMaterial
          ref={core}
          color={accent}
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <RoundedBox args={[1.9, 0.38, 1.25]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          ref={frame}
          color="#0A1024"
          metalness={0.88}
          roughness={0.25}
          emissive={accent}
          emissiveIntensity={0.3}
          transparent
          opacity={0.55}
        />
      </RoundedBox>

      <RoundedBox args={[1.72, 0.28, 1.08]} radius={0.06} smoothness={4}>
        <meshPhysicalMaterial
          ref={glass}
          color={ERP.white}
          metalness={0.08}
          roughness={0.12}
          transmission={0.45}
          thickness={0.35}
          transparent
          opacity={0.55}
          clearcoat={1}
          clearcoatRoughness={0.15}
          emissive={accent}
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* Internal circuitry lights */}
      <points ref={circuit} geometry={circuitGeo} position={[0, 0.02, 0]}>
        <pointsMaterial
          color={accent}
          size={0.028}
          sizeAttenuation
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Domain bar accents */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.06, 0.56]}>
          <boxGeometry args={[0.32, 0.03, 0.03]} />
          <meshBasicMaterial color={accent} transparent opacity={0.65} />
        </mesh>
      ))}

      <pointLight color={accent} intensity={0.25} distance={2.4} decay={2} />
    </group>
  )
}
