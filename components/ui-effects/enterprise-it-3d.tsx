"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"

function EnterpriseServerRacks() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  const racksCount = 3
  const unitsPerRack = 4
  const rackRefs = useRef<(THREE.Group | null)[]>([])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Isometric rotation
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15
    }

    // Expand spacing between racks on hover
    const targetSpacing = hovered ? 2.5 : 1.8
    
    rackRefs.current.forEach((rack, i) => {
      if (!rack) return
      const targetX = (i - (racksCount - 1) / 2) * targetSpacing
      rack.position.x = THREE.MathUtils.lerp(rack.position.x, targetX, 0.1)
      
      // Animate individual server blades inside the rack opening up slightly
      rack.children.forEach((blade, j) => {
        const bladeTargetZ = hovered ? Math.sin(state.clock.elapsedTime * 2 + j) * 0.2 : 0
        blade.position.z = THREE.MathUtils.lerp(blade.position.z, bladeTargetZ, 0.1)
      })
    })
  })

  return (
    <group 
      ref={groupRef} 
      rotation={[0, Math.PI / 6, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {Array.from({ length: racksCount }).map((_, i) => (
        <group key={`rack-${i}`} ref={(el) => { rackRefs.current[i] = el }}>
          {Array.from({ length: unitsPerRack }).map((_, j) => (
            <group key={`blade-${j}`} position={[0, (j - (unitsPerRack-1)/2) * 0.7, 0]}>
              {/* Premium Glass Outer Casing */}
              <RoundedBox args={[1.2, 0.5, 1.8]} radius={0.1} smoothness={4}>
                <meshPhysicalMaterial 
                  color="#1e3a8a" // Deep Blue
                  metalness={0.4}
                  roughness={0.1}
                  clearcoat={1.0}
                  clearcoatRoughness={0.1}
                  transparent
                  opacity={0.8}
                />
              </RoundedBox>
              
              {/* Glowing Server Status Indicator */}
              <mesh position={[0.65, 0, 0.6]}>
                <boxGeometry args={[0.05, 0.1, 0.4]} />
                <meshStandardMaterial 
                  color="#0ea5e9" 
                  emissive="#0ea5e9" 
                  emissiveIntensity={2 + Math.random()} 
                />
              </mesh>
            </group>
          ))}
          
          {/* Main Rack Vertical Frame */}
          <mesh position={[-0.65, 0, 0]}>
            <boxGeometry args={[0.1, unitsPerRack * 0.7 + 0.2, 1.9]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 1.5, 2 + state.pointer.y * 1.5, 9), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function EnterpriseIT3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "400px 0px" })

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 2, 9], fov: 40 }} 
        dpr={[1, 1.5]} // Capped for performance
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <CameraRig />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, 5, -10]} intensity={1} color="#3b82f6" />
        <pointLight position={[0, -5, 5]} intensity={1} color="#0ea5e9" />
        <EnterpriseServerRacks />
      </Canvas>
    </div>
  )
}
