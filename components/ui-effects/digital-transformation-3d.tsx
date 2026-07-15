"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { RoundedBox, Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function TransformationCore() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const cubeMatRef = useRef<any>(null)
  const sphereMatRef = useRef<any>(null)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4
      groupRef.current.rotation.x += delta * 0.2
    }

    // Hover drives the transformation state
    const targetMorph = hovered ? 1 : 0 // 0 = Cube, 1 = Sphere
    
    // Lerp the distortion and opacity
    if (cubeMatRef.current) {
      cubeMatRef.current.opacity = THREE.MathUtils.lerp(cubeMatRef.current.opacity, 1 - targetMorph, 0.05)
    }
    
    if (sphereMatRef.current) {
      sphereMatRef.current.distort = THREE.MathUtils.lerp(sphereMatRef.current.distort, targetMorph * 0.5, 0.05)
      sphereMatRef.current.opacity = THREE.MathUtils.lerp(sphereMatRef.current.opacity, targetMorph, 0.05)
    }
  })

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* The Legacy Form: Rigid Glossy Cube */}
      <RoundedBox args={[2.5, 2.5, 2.5]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial 
          ref={cubeMatRef}
          color="#d946ef" // Magenta
          metalness={0.2}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent
          opacity={1}
          depthWrite={false}
        />
      </RoundedBox>
      
      {/* The Modern Form: Fluid Glowing Sphere */}
      <Sphere args={[1.8, 64, 64]}>
        <MeshDistortMaterial 
          ref={sphereMatRef}
          color="#0ea5e9" // Bright Cyan
          emissive="#0ea5e9"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0}
          speed={3}
          distort={0}
        />
      </Sphere>
      
      {/* Always visible stabilizing inner core */}
      <Sphere args={[0.5, 32, 32]}>
         <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </Sphere>
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 2, state.pointer.y * 2, 7), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function DigitalTransformation3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "400px 0px" })

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <CameraRig />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#d946ef" />
        <TransformationCore />
      </Canvas>
    </div>
  )
}
