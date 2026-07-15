"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion, useInView } from "framer-motion"
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function ParticleSphere() {
  const ref = useRef<THREE.Points>(null)
  
  const sphere = useMemo(() => {
    const count = 8000 // Increased particle count for denser cloud
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const colorCyan = new THREE.Color("#0EA5E9")
    const colorBlue = new THREE.Color("#1E3A8A") // Deep blue

    for (let i = 0; i < count; i++) {
      // Create points on the surface of a sphere or distributed inside
      const r = 2 + (Math.random() * 0.8 - 0.4) // thicker shell
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Mix colors
      const mixedColor = colorCyan.clone().lerp(colorBlue, Math.random())
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }
    return { positions, colors }
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.05
      ref.current.rotation.y -= delta * 0.1
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere.positions} colors={sphere.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}

function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
      meshRef.current.rotation.x += delta * 0.1
    }
    if (materialRef.current) {
      // Pulsing glow effect
      materialRef.current.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} args={[1.4, 64, 64]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#2D0A4E" // deep purple base
        emissive="#D946EF" // Magenta emissive
        emissiveIntensity={0.8}
        clearcoat={1}
        clearcoatRoughness={0.2}
        metalness={0.9}
        roughness={0.1}
        distort={0.4}
        speed={2}
      />
    </Sphere>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 1.5, state.pointer.y * 1.5, 6), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function TechCore3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 2.5, ease: "easeOut", delay: 1.2 }}
      className="absolute inset-0 z-0 pointer-events-none will-change-transform" 
      style={{ mixBlendMode: 'screen', transform: 'translateZ(0)' }}
    >
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 50 }} 
        dpr={[1, 2]} 
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <CameraRig />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#0EA5E9" />
        <directionalLight position={[-10, -10, -5]} intensity={3} color="#D946EF" />
        <ParticleSphere />
        <InnerCore />
      </Canvas>
    </motion.div>
  )
}
