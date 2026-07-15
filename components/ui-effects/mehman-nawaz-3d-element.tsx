"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { Octahedron, Sphere } from "@react-three/drei"
import * as THREE from "three"

function MehmanNawazCore() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const outerDiamondRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }

    if (outerDiamondRef.current) {
      // Rotate opposite direction
      outerDiamondRef.current.rotation.y -= delta * 0.1
      outerDiamondRef.current.rotation.x += delta * 0.2
      
      // Expand outer shell on hover
      const targetScale = hovered ? 1.3 : 1.0
      outerDiamondRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Premium Glass Diamond */}
      <Octahedron ref={outerDiamondRef} args={[2.5, 0]}>
        <meshPhysicalMaterial 
          color="#0ea5e9" 
          metalness={0.2}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.4}
        />
      </Octahedron>

      {/* Inner Glowing Core */}
      <Octahedron args={[1.2, 0]}>
        <meshStandardMaterial 
          color="#2b8ebe" 
          emissive="#2b8ebe"
          emissiveIntensity={1.5}
        />
      </Octahedron>

      {/* Ambient Aura */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.2} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </Sphere>
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 2, state.pointer.y * 2, 8), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function MehmanNawaz3DElement() {
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
        <directionalLight position={[10, 15, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#0ea5e9" />
        <MehmanNawazCore />
      </Canvas>
    </div>
  )
}
