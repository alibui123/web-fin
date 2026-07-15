"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useInView } from "framer-motion"

/**
 * StagedOrbitHero — clean 5-stage orbital path for the How it works hero.
 *
 * Edit stage names here only (index 0 = innermost ring):
 *   0 Audit → 1 Blueprint → 2 Build → 3 Test → 4 Live (outermost + progress marker)
 */
export const ORBIT_STAGES = [
  "Audit",
  "Blueprint",
  "Build",
  "Test",
  "Live",
] as const

const RING = "#3a4a6b"
const CORE = "#e8ecf2"
const MARKER = "#d9a84e"

/** Radii paired 1:1 with ORBIT_STAGES */
const RING_RADII = [2.0, 2.8, 3.6, 4.4, 5.2] as const

const RING_TILTS: [number, number, number][] = [
  [0.18, 0.05, 0.12],
  [0.42, 0.1, -0.08],
  [-0.25, 0.15, 0.2],
  [0.55, -0.12, 0.05],
  [0.32, 0.22, -0.15],
]

function SoftCore() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial
          color={CORE}
          emissive={CORE}
          emissiveIntensity={0.55}
          metalness={0.08}
          roughness={0.35}
        />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color={CORE}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
      <pointLight color={CORE} intensity={0.85} distance={8} decay={2} />
    </group>
  )
}

function StageRing({
  radius,
  tilt,
}: {
  radius: number
  tilt: [number, number, number]
}) {
  return (
    <mesh rotation={tilt}>
      <torusGeometry args={[radius, 0.015, 8, 128]} />
      <meshBasicMaterial
        color={RING}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </mesh>
  )
}

/** Amber marker on the outermost ring (Live) — ~24s continuous loop */
function ProgressMarker() {
  const ref = useRef<THREE.Group>(null)
  const tilt = RING_TILTS[RING_TILTS.length - 1]
  const radius = RING_RADII[RING_RADII.length - 1]
  const period = 24

  useFrame((state) => {
    if (!ref.current) return
    const t = (state.clock.elapsedTime / period) * Math.PI * 2
    // Torus sits in XY — orbit in that plane before parent tilt
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0)
  })

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={MARKER}
            emissive={MARKER}
            emissiveIntensity={0.7}
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
        <pointLight color={MARKER} intensity={0.35} distance={2.5} decay={2} />
      </group>
    </group>
  )
}

function PathNeedle() {
  return (
    <mesh rotation={[0.35, 0.4, Math.PI / 2]} position={[0.2, 0.1, 0]}>
      <cylinderGeometry args={[0.008, 0.008, 11, 6]} />
      <meshBasicMaterial color={RING} transparent opacity={0.22} depthWrite={false} />
    </mesh>
  )
}

function SparseStars() {
  const geometry = useMemo(() => {
    const n = 280
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const i3 = i * 3
      const r = 8 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i3 + 2] = r * Math.cos(phi)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3))
    return g
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        transparent
        color="#8a9bb8"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
      />
    </points>
  )
}

function OrbitSystem() {
  const root = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!root.current) return
    root.current.rotation.y += delta * ((Math.PI * 2) / 60)
  })

  return (
    <group ref={root}>
      <SoftCore />
      {RING_RADII.map((radius, i) => (
        <StageRing
          key={ORBIT_STAGES[i]}
          radius={radius}
          tilt={RING_TILTS[i]}
        />
      ))}
      <ProgressMarker />
      <PathNeedle />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.28} color="#9aa8c0" />
      <directionalLight position={[4, 5, 3]} intensity={0.45} color="#ffffff" />
      <SparseStars />
      <OrbitSystem />
    </>
  )
}

type Props = {
  className?: string
}

/**
 * Self-contained staged orbital hero visual.
 * Canvas fills its parent; designed for text-left / visual-right heroes.
 */
export default function StagedOrbitHero({ className = "" }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const inView = useInView(host, { margin: "100px 0px", amount: 0.05 })

  return (
    <div ref={host} className={`absolute inset-0 ${className}`} aria-hidden>
      {inView && (
        <Canvas
          className="!h-full !w-full !bg-transparent"
          style={{ width: "100%", height: "100%", background: "transparent" }}
          dpr={[1, 1.5]}
          camera={{ position: [3.8, 1.6, 9.5], fov: 36, near: 0.1, far: 80 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
