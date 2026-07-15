"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { RoundedBox, Sphere } from "@react-three/drei"
import * as THREE from "three"

function BlockchainCore() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  const blocksCount = 4
  const blockRefs = useRef<(THREE.Group | null)[]>([])
  const linkRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Isometric gentle floating
      groupRef.current.rotation.y += delta * 0.15
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }

    const targetSpacing = hovered ? 2.8 : 1.6
    
    // Animate individual blocks
    blockRefs.current.forEach((group, i) => {
      if (!group) return
      
      // Calculate spread from the center
      const targetX = (i - (blocksCount - 1) / 2) * targetSpacing
      group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, 0.1)
      
      // Rotate the glass outer block (the first child)
      if (group.children[0]) {
        group.children[0].rotation.x += delta * 0.4
        group.children[0].rotation.y += delta * 0.5
      }
    })

    // Animate connecting laser links
    linkRefs.current.forEach((link, i) => {
      if (!link) return
      const leftX = (i - (blocksCount - 1) / 2) * targetSpacing
      const rightX = (i + 1 - (blocksCount - 1) / 2) * targetSpacing
      const currentSpacing = rightX - leftX
      
      // Center the link between the two blocks
      const midX = (leftX + rightX) / 2
      link.position.x = THREE.MathUtils.lerp(link.position.x, midX, 0.1)
      
      // Scale the link to connect them exactly
      link.scale.y = THREE.MathUtils.lerp(link.scale.y, currentSpacing, 0.1)
    })
  })

  return (
    <group 
      ref={groupRef}
      // Start at an isometric angle
      rotation={[0, Math.PI / 4, 0]} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Connecting Laser Links */}
      {Array.from({ length: blocksCount - 1 }).map((_, i) => (
        <mesh 
          key={`link-${i}`} 
          ref={(el) => { linkRefs.current[i] = el }}
          rotation={[0, 0, Math.PI / 2]} // Lay cylinder flat along X-axis
        >
          <cylinderGeometry args={[0.04, 0.04, 1, 16]} />
          <meshStandardMaterial 
            color="#0ea5e9" 
            emissive="#0ea5e9" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Blockchain Nodes */}
      {Array.from({ length: blocksCount }).map((_, i) => (
        <group key={`block-${i}`} ref={(el) => { blockRefs.current[i] = el }}>
          
          {/* Rotating Premium Glass Outer Block */}
          <group>
            <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.15} smoothness={4}>
              <meshPhysicalMaterial 
                color="#8b5cf6" // Deep Purple
                metalness={0.2}
                roughness={0.1}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                transparent
                opacity={0.7}
              />
            </RoundedBox>
          </group>

          {/* Static Glowing Inner Core (Data Payload) */}
          <Sphere args={[0.25, 32, 32]}>
            <meshStandardMaterial 
              color="#d946ef" 
              emissive="#d946ef" 
              emissiveIntensity={2} 
            />
          </Sphere>
          
          {/* Ambient Glow Aura around core */}
          <Sphere args={[0.6, 16, 16]}>
            <meshBasicMaterial 
              color="#d946ef" 
              transparent 
              opacity={0.15} 
              blending={THREE.AdditiveBlending} 
              depthWrite={false}
            />
          </Sphere>
        </group>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 1.5, 2 + state.pointer.y * 1.5, 8), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Blockchain3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "400px 0px" })

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 2, 8], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <CameraRig />
        
        {/* Studio lighting to highlight the glass refractions */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, 5, -10]} intensity={1} color="#a855f7" />
        <pointLight position={[0, -5, 5]} intensity={1} color="#0ea5e9" />
        
        <BlockchainCore />
      </Canvas>
    </div>
  )
}
