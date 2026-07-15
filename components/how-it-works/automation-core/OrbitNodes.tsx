"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { AC, CAPABILITIES, ORBITS, type Capability } from "./constants"
import { useEntrance } from "./hooks/useEntrance"

function Glyph({ type }: { type: Capability["glyph"] }) {
  const common = {
    color: AC.glow,
    metalness: 0.35,
    roughness: 0.35,
    emissive: AC.glow,
    emissiveIntensity: 0.3,
  }

  switch (type) {
    case "agent":
      return (
        <mesh>
          <icosahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial {...common} />
        </mesh>
      )
    case "flow":
      return (
        <mesh>
          <torusGeometry args={[0.06, 0.014, 8, 20]} />
          <meshStandardMaterial {...common} />
        </mesh>
      )
    case "task":
      return (
        <mesh>
          <boxGeometry args={[0.09, 0.09, 0.09]} />
          <meshStandardMaterial {...common} />
        </mesh>
      )
    case "decide":
      return (
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial {...common} />
        </mesh>
      )
    case "book":
      return (
        <mesh>
          <boxGeometry args={[0.08, 0.1, 0.03]} />
          <meshStandardMaterial {...common} />
        </mesh>
      )
    case "plug":
      return (
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
          <meshStandardMaterial {...common} />
        </mesh>
      )
    case "api":
      return (
        <mesh>
          <torusGeometry args={[0.055, 0.015, 8, 16]} />
          <meshStandardMaterial {...common} />
        </mesh>
      )
    case "pipe":
    default:
      return (
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshStandardMaterial {...common} />
        </mesh>
      )
  }
}

function OrbitNode({ cap, showLabel }: { cap: Capability; showLabel: boolean }) {
  const orbit = ORBITS[cap.ring]
  const group = useRef<THREE.Group>(null)
  const glow = useRef<THREE.Mesh>(null)
  const { state } = useEntrance()

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (!group.current) return
    const reveal = state.nodes
    group.current.scale.setScalar(0.85 + reveal * 0.15)
    group.current.visible = reveal > 0.02
    group.current.rotation.y = t * 0.25 + cap.angle

    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial
      mat.opacity = (0.08 + Math.sin(t * 1.2 + cap.angle) * 0.025) * reveal
    }
  })

  const x = Math.cos(cap.angle) * orbit.radius
  const z = Math.sin(cap.angle) * orbit.radius

  return (
    <group ref={group} position={[x, 0, z]}>
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshPhysicalMaterial
          color={AC.aluminumBright}
          metalness={0.05}
          roughness={0.18}
          transmission={0.5}
          thickness={0.35}
          transparent
          opacity={0.5}
          ior={1.4}
        />
      </mesh>
      <Glyph type={cap.glyph} />
      <mesh ref={glow}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial
          color={AC.glow}
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {showLabel && (
        <Html
          center
          distanceFactor={9}
          position={[0, -0.32, 0]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            style={{
              color: "rgba(242,244,247,0.75)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              textAlign: "center",
              textShadow: "0 1px 6px rgba(0,0,0,0.7)",
            }}
          >
            {cap.label}
          </div>
        </Html>
      )}
    </group>
  )
}

/** Smooth orbital nodes — two per ring, perfectly spaced */
export default function OrbitNodes({ showLabels }: { showLabels: boolean }) {
  const rotorRefs = useRef<(THREE.Group | null)[]>([])
  const { state } = useEntrance()

  const byRing = useMemo(() => {
    const map: Capability[][] = ORBITS.map(() => [])
    CAPABILITIES.forEach((c) => {
      map[c.ring]?.push(c)
    })
    return map
  }, [])

  useFrame((_, delta) => {
    ORBITS.forEach((orbit, i) => {
      const g = rotorRefs.current[i]
      if (!g || (state.rings[i] ?? 0) < 0.05) return
      g.rotation.y += delta * orbit.speed * orbit.dir
    })
  })

  return (
    <group>
      {ORBITS.map((orbit, i) => (
        <group key={i} rotation={[orbit.tilt, 0, 0]}>
          <group
            ref={(el) => {
              rotorRefs.current[i] = el
            }}
          >
            {byRing[i].map((cap) => (
              <OrbitNode key={cap.id} cap={cap} showLabel={showLabels} />
            ))}
          </group>
        </group>
      ))}
    </group>
  )
}
