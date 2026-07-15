"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { Sphere, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

function GlobeCore() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  const satellites = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2
      const radius = 2.0 + Math.random() * 0.5
      return {
        baseRadius: radius,
        speed: 0.8 + Math.random() * 0.5,
        offset: angle,
        yAxis: (Math.random() - 0.5) * 3
      }
    })
  }, [])

  const satRefs = useRef<(THREE.Group | null)[]>([])
  const linkRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }

    const expandMultiplier = hovered ? 1.5 : 1.0

    satellites.forEach((sat, i) => {
      const satGroup = satRefs.current[i]
      const linkMesh = linkRefs.current[i]
      if (!satGroup || !linkMesh) return

      // Target Radius changes on hover
      const targetRadius = sat.baseRadius * expandMultiplier
      const t = state.clock.elapsedTime * (hovered ? sat.speed * 1.5 : sat.speed) + sat.offset
      
      const targetX = Math.cos(t) * targetRadius
      const targetZ = Math.sin(t) * targetRadius
      const targetY = sat.yAxis * expandMultiplier + Math.sin(t * 2) * 0.5

      satGroup.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1)
      
      // Update link connecting to origin (0,0,0)
      const distance = satGroup.position.length()
      const midPoint = satGroup.position.clone().multiplyScalar(0.5)
      
      linkMesh.position.copy(midPoint)
      linkMesh.scale.y = distance
      linkMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), satGroup.position.clone().normalize())
    })
  })

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central Premium Globe */}
      <Sphere args={[1.2, 64, 64]}>
        <meshPhysicalMaterial 
          color="#0f172a" 
          metalness={0.8}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.2}
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Glowing Inner Core visible through wireframe */}
      <Sphere args={[1.25, 16, 16]}>
        <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </Sphere>

      {/* Satellites */}
      {satellites.map((_, i) => (
        <group key={`sat-wrapper-${i}`}>
          <group ref={(el) => { satRefs.current[i] = el }}>
            {/* Satellite Body */}
            <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.05} smoothness={4}>
              <meshPhysicalMaterial 
                color="#d946ef"
                metalness={0.2}
                roughness={0.1}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
              />
            </RoundedBox>
            {/* Satellite Beacon */}
            <Sphere args={[0.08, 16, 16]} position={[0.15, 0.15, 0.15]}>
              <meshBasicMaterial color="#ffffff" />
            </Sphere>
          </group>
          
          {/* Laser Link to Globe */}
          <mesh ref={(el) => { linkRefs.current[i] = el }}>
             <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
             <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 1.5, state.pointer.y * 1.5, 7), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function IoTGlobe3D() {
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
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#d946ef" />
        <GlobeCore />
      </Canvas>
    </div>
  )
}
