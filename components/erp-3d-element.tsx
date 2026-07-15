"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion, useInView } from "framer-motion"
import { Edges, Torus } from "@react-three/drei"
import * as THREE from "three"

// Clean, minimalistic 3D Line-Art style (matching the SVG aesthetic)
function LineArtServerCore() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle, clean rotation
      groupRef.current.rotation.y += delta * 0.3
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      {/* Main Data Tower / Building (Line-art style) */}
      <mesh>
        <boxGeometry args={[1.5, 2.5, 1.5]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.6} depthWrite={false} />
        <Edges scale={1.01} color="#D946EF" />
      </mesh>

      {/* Internal Dashboard/Server Layers */}
      {[...Array(3)].map((_, i) => (
        <group key={i} position={[0, (i - 1) * 0.7, 0]}>
          {/* Layer plane */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6, 1.6]} />
            <meshBasicMaterial color="#9333EA" transparent opacity={0.2} depthWrite={false} side={THREE.DoubleSide} />
            <Edges color="#D946EF" />
          </mesh>
        </group>
      ))}

      {/* Clean Dashed/Solid Orbit Ring to match the SVG design */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.015, 16, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      
      {/* Secondary Ring */}
      <mesh rotation={[Math.PI / 2.2, 0.2, 0]}>
        <torusGeometry args={[3.5, 0.01, 16, 64]} />
        <meshBasicMaterial color="#9333EA" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function OrbitingNode() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.8
    }
  })

  return (
    <group ref={groupRef}>
      {/* Tiny clean cube traversing the orbit */}
      <mesh position={[2.8, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#D946EF" transparent opacity={0.8} />
        <Edges color="#ffffff" />
      </mesh>
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    // Subtle mouse tracking
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 1.5, state.pointer.y * 1.5, 6.5), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Erp3DElement({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "400px 0px" })

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className={`absolute inset-0 z-0 mix-blend-screen pointer-events-none will-change-transform ${className}`}
      style={{ transform: 'translateZ(0)' }}
    >
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 6.5], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <CameraRig />
        <LineArtServerCore />
        <OrbitingNode />
      </Canvas>
    </motion.div>
  )
}
