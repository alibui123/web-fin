"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { RoundedBox, Sphere } from "@react-three/drei"
import * as THREE from "three"

function QualicallCore() {
  const groupRef = useRef<THREE.Group>(null)
  const scannerRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const barsCount = 7
  const barRefs = useRef<(THREE.Group | null)[]>([])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }

    const expandFactor = hovered ? 1.5 : 1.0

    // Animate audio analysis bars
    barRefs.current.forEach((bar, i) => {
      if (!bar) return
      
      const xOffset = (i - (barsCount - 1) / 2) * 0.6 * expandFactor
      bar.position.x = THREE.MathUtils.lerp(bar.position.x, xOffset, 0.1)
      
      // Dynamic height based on sine wave simulating audio
      const height = Math.abs(Math.sin(state.clock.elapsedTime * 2 + i * 0.5)) * 1.5 + 0.5
      bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, height, 0.2)
    })

    // Animate Scanner Plane
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 1.2
      // Intense glow on hover
      const mat = scannerRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, hovered ? 0.8 : 0.3, 0.1)
    }
  })

  return (
    <group 
      ref={groupRef}
      rotation={[Math.PI / 8, Math.PI / 4, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Premium Glass Shell */}
      <RoundedBox args={[4.5, 3.5, 1.5]} radius={0.2} smoothness={4}>
        <meshPhysicalMaterial 
          color="#9333ea" 
          metalness={0.2}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      {/* Internal Audio Bars */}
      {Array.from({ length: barsCount }).map((_, i) => (
        <group key={`bar-${i}`} ref={(el) => { barRefs.current[i] = el }}>
          <RoundedBox args={[0.3, 1, 0.3]} radius={0.05} smoothness={4}>
            <meshStandardMaterial 
              color="#d946ef" 
              emissive="#d946ef"
              emissiveIntensity={1.5}
            />
          </RoundedBox>
        </group>
      ))}

      {/* Scanning Plane (AI Analyzing) */}
      <mesh ref={scannerRef} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 2]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 1.5, state.pointer.y * 1.5, 8), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Qualicall3DElement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "400px 0px" })

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <CameraRig />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
        <QualicallCore />
      </Canvas>
    </div>
  )
}
