"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { TE } from "./constants"
import { useJourneyCurve } from "./hooks/useJourneyCurve"

type Props = { count: number }

/** Coordinated particle field — orbits + spline-following streams. */
export default function ParticleNetwork({ count }: Props) {
  const orbit = useRef<THREE.Points>(null)
  const stream = useRef<THREE.InstancedMesh>(null)
  const curve = useJourneyCurve()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { geometry, speeds, radii } = useMemo(() => {
    const orbitN = Math.floor(count * 0.75)
    const positions = new Float32Array(orbitN * 3)
    const speeds = new Float32Array(orbitN)
    const radii = new Float32Array(orbitN)
    for (let i = 0; i < orbitN; i++) {
      const i3 = i * 3
      const r = 1.4 + Math.random() * 3.2
      const theta = Math.random() * Math.PI * 2
      positions[i3] = Math.cos(theta) * r
      positions[i3 + 1] = (Math.random() - 0.5) * 2.2
      positions[i3 + 2] = Math.sin(theta) * r * 0.7
      speeds[i] = 0.05 + Math.random() * 0.1
      radii[i] = r
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return { geometry, speeds, radii, orbitN }
  }, [count])

  const streamN = Math.floor(count * 0.08)

  const streamMeta = useMemo(
    () =>
      Array.from({ length: streamN }, (_, i) => ({
        offset: i / streamN,
        speed: 0.12 + (i % 5) * 0.02,
      })),
    [streamN],
  )

  useFrame((_, delta) => {
    if (orbit.current) {
      const arr = orbit.current.geometry.attributes.position.array as Float32Array
      const n = radii.length
      for (let i = 0; i < n; i++) {
        const i3 = i * 3
        const x = arr[i3]
        const z = arr[i3 + 2]
        const angle = Math.atan2(z, x) + delta * speeds[i]
        const r = radii[i]
        arr[i3] = Math.cos(angle) * r
        arr[i3 + 2] = Math.sin(angle) * r
      }
      orbit.current.geometry.attributes.position.needsUpdate = true
    }

    if (stream.current) {
      const t = performance.now() * 0.001
      streamMeta.forEach((m, i) => {
        const u = ((t * m.speed + m.offset) % 1 + 1) % 1
        const p = curve.getPointAt(u)
        dummy.position.copy(p)
        dummy.scale.setScalar(0.03)
        dummy.updateMatrix()
        stream.current!.setMatrixAt(i, dummy.matrix)
      })
      stream.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group>
      <points ref={orbit} geometry={geometry}>
        <pointsMaterial
          size={0.012}
          color={TE.glow}
          transparent
          opacity={0.35}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <instancedMesh
        ref={stream}
        args={[undefined, undefined, streamN]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial
          color={TE.blue}
          emissive={TE.blue}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
    </group>
  )
}
