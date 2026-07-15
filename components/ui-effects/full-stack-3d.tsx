"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion, useInView } from "framer-motion"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"

// Colors matching the reference image (top to bottom)
const layerColors = [
  "#fb923c", // Orange (Top)
  "#ef4444", // Red/Pink
  "#a855f7", // Purple
  "#3b82f6", // Light Blue
  "#1e3a8a", // Dark Blue (Bottom)
]

function Layers() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const layerRefs = useRef<(THREE.Group | null)[]>([])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating and very slow rotation to appreciate the 3D depth
      groupRef.current.rotation.y += delta * 0.15
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }

    // Expand / Collapse animation on hover
    const targetSpacing = hovered ? 0.9 : 0.55
    layerRefs.current.forEach((group, i) => {
      if (!group) return
      // Top layer is index 0, bottom is index 4. Center is 2.
      const targetY = (2 - i) * targetSpacing
      group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.1)
    })
  })

  return (
    <group 
      ref={groupRef} 
      // Rotate the entire stack to give that perfect isometric look matching the image
      rotation={[0, Math.PI / 4, 0]} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {layerColors.map((color, i) => (
        <group 
          key={i} 
          ref={(el) => { layerRefs.current[i] = el }}
          position={[0, (2 - i) * 0.55, 0]}
        >
          <RoundedBox
            args={[3.2, 0.4, 3.2]}
            radius={0.15}
            smoothness={4}
          >
            {/* Premium glossy material matching the reference */}
            <meshPhysicalMaterial 
              color={color} 
              roughness={0.2}
              metalness={0.1}
              clearcoat={0.6}
              clearcoatRoughness={0.2}
            />
          </RoundedBox>
        </group>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    // Subtle mouse parallax
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 1.5, 3 + state.pointer.y * 1.5, 8), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function FullStack3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "400px 0px" })

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        // Start camera from a slightly elevated angle for the isometric view
        camera={{ position: [0, 3, 8], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <CameraRig />
        
        {/* Soft studio lighting to make the colors and gloss pop */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-10, 5, -10]} intensity={0.8} color="#d946ef" />
        <pointLight position={[0, -5, 5]} intensity={1} color="#3b82f6" />
        
        <Layers />
      </Canvas>
    </div>
  )
}
