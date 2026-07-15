"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import {
  buildNearestEdges,
  fibonacciSphere,
  useNeuralInteraction,
} from "./hooks/useNeuralInteraction"

const CYAN = "#0EA5E9"
const VIOLET = "#8B5CF6"
const MAGENTA = "#D946EF"

type NeuralCoreProps = {
  nodeCount: number
  packetCount: number
}

/**
 * Central energy core + neural surface mesh (nodes, links, data packets).
 */
export default function NeuralCore({ nodeCount, packetCount }: NeuralCoreProps) {
  const { state, setHovered } = useNeuralInteraction()

  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const coreMatRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const innerMatRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const shellMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const packetsRef = useRef<THREE.Points>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const graph = useMemo(() => {
    const bases = fibonacciSphere(nodeCount, 1.72)
    const edges = buildNearestEdges(bases, 3, 1.45)
    const floatSeed = bases.map(() => ({
      amp: 0.018 + Math.random() * 0.028,
      speed: 0.4 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }))
    const edgeMeta = edges.map(([a, b]) => ({ a, b }))

    const packetProgress = new Float32Array(packetCount)
    const packetEdge = new Uint16Array(packetCount)
    for (let i = 0; i < packetCount; i++) {
      packetProgress[i] = Math.random()
      packetEdge[i] = edgeMeta.length ? i % edgeMeta.length : 0
    }

    const linePositions = new Float32Array(edges.length * 6)
    const packetPositions = new Float32Array(packetCount * 3)

    return {
      bases,
      floatSeed,
      edgeMeta,
      linePositions,
      packetProgress,
      packetEdge,
      packetPositions,
    }
  }, [nodeCount, packetCount])

  const liveRef = useRef<THREE.Vector3[]>([])
  if (liveRef.current.length !== graph.bases.length) {
    liveRef.current = graph.bases.map((b) => b.clone())
  }
  const live = liveRef.current

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(graph.linePositions, 3))
    return geo
  }, [graph.linePositions])

  const packetGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(graph.packetPositions, 3))
    return geo
  }, [graph.packetPositions])

  const nodeGeo = useMemo(() => new THREE.IcosahedronGeometry(0.055, 0), [])
  const nodeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: CYAN,
        emissive: CYAN,
        emissiveIntensity: 0.55,
        metalness: 0.85,
        roughness: 0.22,
      }),
    [],
  )

  useFrame((_, delta) => {
    const t = _.clock.elapsedTime
    const { hover, pointer, pulseBoost, particleBoost, glowBoost } = state

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.08 + hover * 0.04)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.12,
        0.04,
      )
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -pointer.x * 0.08,
        0.04,
      )
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        pointer.x * 0.18,
        0.05,
      )
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        pointer.y * 0.12,
        0.05,
      )
    }

    // Core pulse
    const pulse =
      1 +
      Math.sin(t * (1.15 * pulseBoost)) * 0.045 +
      Math.sin(t * 0.35) * 0.02
    if (coreRef.current) coreRef.current.scale.setScalar(pulse)
    if (coreMatRef.current) {
      coreMatRef.current.emissiveIntensity = (0.75 + Math.sin(t * 1.2) * 0.15) * glowBoost
      coreMatRef.current.opacity = 0.72 + hover * 0.12
    }
    if (innerMatRef.current) {
      innerMatRef.current.emissiveIntensity = (1.1 + Math.sin(t * 1.4) * 0.2) * glowBoost
    }
    if (shellMatRef.current) {
      shellMatRef.current.opacity = 0.045 + hover * 0.03 + Math.sin(t * 0.8) * 0.01
    }

    // Drift nodes
    for (let i = 0; i < graph.bases.length; i++) {
      const seed = graph.floatSeed[i]
      const base = graph.bases[i]
      const node = live[i]
      node.set(
        base.x + Math.sin(t * seed.speed + seed.phase) * seed.amp,
        base.y + Math.cos(t * seed.speed * 0.9 + seed.phase) * seed.amp,
        base.z + Math.sin(t * seed.speed * 1.1 + seed.phase * 1.3) * seed.amp * 0.8,
      )

      if (nodesRef.current) {
        dummy.position.copy(node)
        dummy.scale.setScalar(1 + Math.sin(t * seed.speed + seed.phase) * 0.12)
        dummy.updateMatrix()
        nodesRef.current.setMatrixAt(i, dummy.matrix)
      }
    }
    if (nodesRef.current) nodesRef.current.instanceMatrix.needsUpdate = true

    // Sync connection lines to live node positions
    const positions = lineGeometry.getAttribute("position") as THREE.BufferAttribute
    for (let i = 0; i < graph.edgeMeta.length; i++) {
      const { a, b } = graph.edgeMeta[i]
      positions.setXYZ(i * 2, live[a].x, live[a].y, live[a].z)
      positions.setXYZ(i * 2 + 1, live[b].x, live[b].y, live[b].z)
    }
    positions.needsUpdate = true

    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial
      mat.opacity =
        0.28 +
        hover * 0.12 +
        Math.sin(t * 2.2) * 0.04 +
        Math.max(0, Math.sin(t * 0.55)) * 0.06
    }

    // Data packets
    if (packetsRef.current && graph.edgeMeta.length) {
      const attr = packetsRef.current.geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute
      for (let i = 0; i < graph.packetProgress.length; i++) {
        graph.packetProgress[i] += delta * (0.18 + (i % 4) * 0.04) * particleBoost
        if (graph.packetProgress[i] > 1) {
          graph.packetProgress[i] -= 1
          graph.packetEdge[i] = (graph.packetEdge[i] + 7) % graph.edgeMeta.length
        }
        const edge = graph.edgeMeta[graph.packetEdge[i]]
        const p = graph.packetProgress[i]
        const e = p * p * (3 - 2 * p)
        const A = live[edge.a]
        const B = live[edge.b]
        attr.setXYZ(
          i,
          A.x + (B.x - A.x) * e,
          A.y + (B.y - A.y) * e,
          A.z + (B.z - A.z) * e,
        )
      }
      attr.needsUpdate = true
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = "auto"
      }}
    >
      <mesh>
        <sphereGeometry args={[1.95, 48, 48]} />
        <meshBasicMaterial
          ref={shellMatRef}
          color={CYAN}
          transparent
          opacity={0.045}
          depthWrite={false}
          wireframe
        />
      </mesh>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.48, 2]} />
        <meshPhysicalMaterial
          ref={coreMatRef}
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.8}
          metalness={0.15}
          roughness={0.08}
          transmission={0.35}
          thickness={0.6}
          transparent
          opacity={0.78}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshPhysicalMaterial
          ref={innerMatRef}
          color="#E0F2FE"
          emissive={VIOLET}
          emissiveIntensity={1.1}
          transparent
          opacity={0.9}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.32} depthWrite={false} />
      </lineSegments>

      <instancedMesh
        ref={nodesRef}
        args={[nodeGeo, nodeMat, graph.bases.length]}
        frustumCulled={false}
      />

      <points ref={packetsRef} geometry={packetGeometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight color={CYAN} intensity={1.8} distance={6} decay={2} />
      <pointLight
        color={MAGENTA}
        intensity={0.55}
        distance={5}
        decay={2}
        position={[0.4, 0.2, 0.3]}
      />
    </group>
  )
}
