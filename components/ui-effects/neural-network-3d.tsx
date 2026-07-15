"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { Sphere, Icosahedron, Torus, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function AICore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Group>(null)
  const ring2Ref = useRef<THREE.Group>(null)
  const ring3Ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    
    // Core pulsating rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3
      coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.2
    }
    
    // Orbiting data rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.2
      ring1Ref.current.rotation.y += delta * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.4
      ring2Ref.current.rotation.z += delta * 0.1
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.1
      ring3Ref.current.rotation.z -= delta * 0.25
    }
  })

  // Smooth scale on hover
  const targetScale = hovered ? 1.15 : 1
  const scale = useRef(1)
  useFrame(() => {
    scale.current = THREE.MathUtils.lerp(scale.current, targetScale, 0.1)
  })

  return (
    <group 
      scale={scale.current}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Energetic Shield */}
      <Icosahedron ref={coreRef} args={[1.5, 4]}>
        <MeshDistortMaterial 
          color="#d946ef" 
          emissive="#d946ef" 
          emissiveIntensity={hovered ? 0.6 : 0.3} 
          wireframe 
          distort={hovered ? 0.4 : 0.2} 
          speed={hovered ? 3 : 1.5} 
          transparent
          opacity={0.4}
        />
      </Icosahedron>

      {/* Inner Processing Core */}
      <Icosahedron args={[0.8, 1]}>
        <meshPhysicalMaterial 
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
        />
      </Icosahedron>

      {/* Inner Core Glow */}
      <Sphere args={[0.6, 16, 16]}>
        <meshBasicMaterial color="#ffffff" />
      </Sphere>

      {/* Orbiting Data Ring 1 */}
      <group ref={ring1Ref}>
        <Torus args={[2.5, 0.015, 16, 100]}>
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.4} />
        </Torus>
        {/* Data Nodes */}
        <Sphere args={[0.12, 16, 16]} position={[2.5, 0, 0]}>
          <meshBasicMaterial color="#0ea5e9" />
        </Sphere>
        <Sphere args={[0.06, 16, 16]} position={[-2.5, 0, 0]}>
          <meshBasicMaterial color="#ffffff" />
        </Sphere>
      </group>

      {/* Orbiting Data Ring 2 */}
      <group ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <Torus args={[3.2, 0.01, 16, 100]}>
          <meshBasicMaterial color="#d946ef" transparent opacity={0.3} />
        </Torus>
        <Sphere args={[0.08, 16, 16]} position={[3.2, 0, 0]}>
          <meshBasicMaterial color="#d946ef" />
        </Sphere>
        <Sphere args={[0.05, 16, 16]} position={[-3.2, 0, 0]}>
          <meshBasicMaterial color="#d946ef" />
        </Sphere>
      </group>

      {/* Orbiting Data Ring 3 */}
      <group ref={ring3Ref} rotation={[0, Math.PI / 4, 0]}>
        <Torus args={[4.0, 0.005, 16, 100]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </Torus>
        <Sphere args={[0.06, 16, 16]} position={[0, 4.0, 0]}>
          <meshBasicMaterial color="#ffffff" />
        </Sphere>
      </group>
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

export default function NeuralNetwork3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "400px 0px" })

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      >
        <CameraRig />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#d946ef" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#0ea5e9" distance={10} />
        <AICore />
      </Canvas>
    </div>
  )
}
