"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import NeuralCore from "./NeuralCore"
import OrbitingNodes from "./OrbitingNodes"
import ParticleField from "./ParticleField"
import {
  NeuralInteractionProvider,
  useNeuralInteraction,
  useNeuralInteractionController,
} from "./hooks/useNeuralInteraction"
import type { NeuralQuality } from "./hooks/useResponsiveQuality"

type SceneProps = {
  quality: NeuralQuality
}

function FloatingCamera() {
  const { state } = useNeuralInteraction()
  const target = useRef(new THREE.Vector3(0.35, 0.15, 5.4)).current

  useFrame((three) => {
    const t = three.clock.elapsedTime
    target.set(
      0.35 + Math.sin(t * 0.12) * 0.08 + state.pointer.x * 0.15,
      0.15 + Math.cos(t * 0.1) * 0.06 + state.pointer.y * 0.1,
      5.4,
    )
    three.camera.position.lerp(target, 0.025)
    three.camera.lookAt(0, 0, 0)
  })

  return null
}

/** Soft additive halo — bloom-like glow without EffectComposer (Three r184 safe). */
function SoftBloomHalo() {
  const { state } = useNeuralInteraction()
  const matRef = useRef<THREE.MeshBasicMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((three) => {
    const t = three.clock.elapsedTime
    const pulse = 0.12 + Math.sin(t * 1.1) * 0.03 + state.hover * 0.08
    if (matRef.current) matRef.current.opacity = pulse * state.glowBoost
    if (meshRef.current) {
      const s = 1.6 + Math.sin(t * 0.9) * 0.05 + state.hover * 0.12
      meshRef.current.scale.setScalar(s)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial
        ref={matRef}
        color="#0EA5E9"
        transparent
        opacity={0.12}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/**
 * Assembles lighting, neural systems, soft glow, and camera drift.
 */
export default function Scene({ quality }: SceneProps) {
  const api = useNeuralInteractionController()
  const root = useRef<THREE.Group>(null)

  return (
    <NeuralInteractionProvider api={api}>
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 6, 3]} intensity={0.55} color="#e2e8f0" />
      <directionalLight position={[-3, -2, -2]} intensity={0.35} color="#7C3AED" />

      <group ref={root} scale={quality.scale}>
        <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.25}>
          <SoftBloomHalo />
          <NeuralCore
            nodeCount={quality.nodeCount}
            packetCount={quality.packetCount}
          />
          <OrbitingNodes count={quality.satelliteCount} />
        </Float>
        <ParticleField count={quality.ambientCount} />
      </group>

      <FloatingCamera />
    </NeuralInteractionProvider>
  )
}
