"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { useWorkflowAnimation } from "./hooks/useWorkflowAnimation"
import { WF, type WorkflowStageKind } from "./hooks/useWorkflowQuality"

type Props = {
  index: number
  kind: WorkflowStageKind
  position: THREE.Vector3
}

/**
 * Single glass workflow stage — unique micro-behavior per kind.
 */
export default function WorkflowModule({ index, kind, position }: Props) {
  const { state, moduleCount } = useWorkflowAnimation()
  const root = useRef<THREE.Group>(null)
  const glassMat = useRef<THREE.MeshPhysicalMaterial>(null)
  const frameMat = useRef<THREE.MeshStandardMaterial>(null)
  const glowMat = useRef<THREE.MeshBasicMaterial>(null)
  const ringRef = useRef<THREE.Group>(null)
  const pulseRef = useRef<THREE.Mesh>(null)
  const sparkRef = useRef<THREE.Points>(null)

  const sparkGeo = useMemo(() => {
    const count = 24
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      pos[i * 3] = Math.cos(a) * 0.28
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.2
      pos[i * 3 + 2] = Math.sin(a) * 0.28
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  const seed = useMemo(
    () => ({
      floatAmp: 0.035 + (index % 3) * 0.01,
      floatSpeed: 0.55 + index * 0.07,
      rotSpeed: 0.08 + (index % 4) * 0.02,
      phase: index * 0.7,
    }),
    [index],
  )

  const accent =
    kind === "completed"
      ? WF.cyan
      : kind === "decision"
        ? WF.violet
        : kind === "execution"
          ? WF.electric
          : kind === "approval"
            ? WF.magenta
            : WF.electric

  useFrame((_, delta) => {
    const t = state.time
    const packetAt = state.highlightT * moduleCount
    const prox = 1 - Math.min(1, Math.abs(packetAt - index - 0.45) * 1.55)
    const activation = Math.max(0, prox) * state.energy

    if (root.current) {
      root.current.position.copy(position)
      root.current.position.y +=
        Math.sin(t * seed.floatSpeed + seed.phase) * seed.floatAmp
      root.current.rotation.y += delta * seed.rotSpeed * (0.6 + activation)
      root.current.rotation.x =
        Math.sin(t * 0.4 + seed.phase) * 0.08 + activation * 0.04
    }

    if (glassMat.current) {
      glassMat.current.emissiveIntensity = (0.15 + activation * 0.9) * state.energy
      glassMat.current.opacity = 0.55 + activation * 0.25
    }
    if (frameMat.current) {
      frameMat.current.emissiveIntensity = 0.25 + activation * 0.8
    }
    if (glowMat.current) {
      glowMat.current.opacity = 0.04 + activation * 0.22
    }

    if (kind === "validation" && pulseRef.current) {
      const s = 1 + Math.sin(t * (2.2 + activation)) * 0.06 * (0.5 + activation)
      pulseRef.current.scale.setScalar(s)
    }
    if (kind === "decision" && ringRef.current) {
      ringRef.current.rotation.z += delta * (0.8 + activation * 1.4)
      ringRef.current.rotation.x += delta * 0.35
    }
    if (kind === "automation" && sparkRef.current) {
      sparkRef.current.rotation.y += delta * (1.2 + activation)
      const mat = sparkRef.current.material as THREE.PointsMaterial
      mat.opacity = 0.25 + activation * 0.55
    }
    if (kind === "execution" && pulseRef.current) {
      const burst = Math.max(0, Math.sin(t * 3.5 + seed.phase))
      pulseRef.current.scale.setScalar(1 + burst * 0.18 * (0.4 + activation))
      if (glowMat.current) glowMat.current.opacity += burst * 0.08 * activation
    }
    if (kind === "completed" && glowMat.current) {
      glowMat.current.opacity =
        0.12 + activation * 0.35 + Math.sin(t * 1.5) * 0.04
    }
  })

  return (
    <group ref={root} position={position}>
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial
          ref={glowMat}
          color={accent}
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <RoundedBox args={[0.52, 0.52, 0.52]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          ref={frameMat}
          color="#0B1228"
          metalness={0.85}
          roughness={0.28}
          emissive={accent}
          emissiveIntensity={0.3}
          transparent
          opacity={0.55}
        />
      </RoundedBox>

      <mesh scale={0.72}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshPhysicalMaterial
          ref={glassMat}
          color={WF.white}
          metalness={0.1}
          roughness={0.08}
          transmission={0.55}
          thickness={0.45}
          transparent
          opacity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive={accent}
          emissiveIntensity={0.2}
        />
      </mesh>

      {(kind === "validation" || kind === "execution") && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.38, 20, 20]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.08}
            depthWrite={false}
            wireframe={kind === "validation"}
          />
        </mesh>
      )}

      {kind === "decision" && (
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.36, 0.012, 8, 48]} />
            <meshBasicMaterial color={WF.violet} transparent opacity={0.55} />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0.4, 0]}>
            <torusGeometry args={[0.3, 0.008, 8, 40]} />
            <meshBasicMaterial color={WF.cyan} transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {kind === "automation" && (
        <points ref={sparkRef} geometry={sparkGeo}>
          <pointsMaterial
            color={WF.cyan}
            size={0.035}
            sizeAttenuation
            transparent
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      <pointLight color={accent} intensity={0.35} distance={2.2} decay={2} />
    </group>
  )
}
