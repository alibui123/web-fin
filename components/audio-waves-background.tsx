"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import * as THREE from 'three'

function AudioWaves() {
  // Create an array of lines.
  const lineCount = 50
  const pointsPerLine = 150
  
  const lines = useMemo(() => {
    const arr = []
    for (let i = 0; i < lineCount; i++) {
      // Create points for a line
      const points = []
      for (let j = 0; j < pointsPerLine; j++) {
        // X ranges from -15 to 15
        // Z ranges from -15 to 5
        points.push(new THREE.Vector3(
          (j / pointsPerLine) * 30 - 15, 
          0, 
          (i / lineCount) * 20 - 15
        ))
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      arr.push(geometry)
    }
    return arr
  }, [])

  // Animate
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    lines.forEach((geometry, i) => {
      const positions = geometry.attributes.position.array as Float32Array
      for (let j = 0; j < pointsPerLine; j++) {
        const x = positions[j * 3]
        const z = positions[j * 3 + 2]
        
        // Complex noise-like wave pattern
        const wave1 = Math.sin(x * 0.4 + t * 0.8 + z * 0.2) * 0.8
        const wave2 = Math.cos(x * 0.7 - t * 0.5 + i * 0.1) * 0.4
        const wave3 = Math.sin(x * 0.2 + t * 1.2 - z * 0.4) * 0.6
        
        // Add some random-looking smaller perturbations
        const noise = Math.sin(x * 2.0 + t) * 0.1
        
        // Attenuate waves at the edges to smoothly blend into the flat background
        const distX = Math.abs(x) / 15
        const distZ = Math.abs(z + 5) / 10
        const attenuationX = Math.max(0, 1 - distX * distX)
        const attenuationZ = Math.max(0, 1 - distZ)
        
        // Combine waves and apply attenuation
        const amplitude = (wave1 + wave2 + wave3 + noise) * attenuationX * attenuationZ * 1.5
        
        positions[j * 3 + 1] = amplitude
      }
      geometry.attributes.position.needsUpdate = true
    })
  })

  return (
    <group position={[0, -2, -3]} rotation={[0.1, 0, 0]}>
      {lines.map((geom, i) => {
        // Calculate opacity based on depth (lines further back fade out)
        const depth = i / lineCount
        const opacity = Math.max(0.1, Math.min(0.8, 1 - depth * 0.8))
        
        return (
          <line key={i} {...({ geometry: geom } as any)}>
            <lineBasicMaterial 
              color="#0066FF" // Blue matching the Forth Labs reference
              transparent 
              opacity={opacity} 
              linewidth={1}
            />
          </line>
        )
      })}
    </group>
  )
}

export default function AudioWavesBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 pointer-events-none bg-black overflow-hidden will-change-transform" style={{ transform: 'translateZ(0)' }}>
      <div className="absolute inset-0 opacity-80 mix-blend-screen">
        <Canvas 
          frameloop={isInView ? "always" : "never"}
          camera={{ position: [0, 1, 5], fov: 60 }} 
          dpr={[1, 2]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <fog attach="fog" args={['#000000', 3, 12]} />
          <AudioWaves />
        </Canvas>
      </div>
      
      {/* Vignette effect to fade out edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black pointer-events-none"></div>
    </div>
  )
}
