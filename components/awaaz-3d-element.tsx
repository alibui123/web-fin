"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useInView } from "framer-motion";
import * as THREE from "three";

function AudioWaveform() {
  const linesRef = useRef<(THREE.Line | null)[]>([]);
  
  const numLines = 60;
  const segments = 200;
  const width = 16;
  
  const geometries = useMemo(() => {
    return Array.from({ length: numLines }).map(() => {
      const points = new Float32Array(segments * 3);
      for (let i = 0; i < segments; i++) {
        points[i * 3] = (i / (segments - 1) - 0.5) * width; // x
        points[i * 3 + 1] = 0; // y
        points[i * 3 + 2] = 0; // z
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(points, 3));
      return geo;
    });
  }, [width, segments, numLines]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    linesRef.current.forEach((line, index) => {
      if (!line) return;
      
      const positions = line.geometry.attributes.position.array as Float32Array;
      
      // Offset Z slightly to create 3D depth
      const zOffset = (index - numLines / 2) * 0.05;
      line.position.z = zOffset;

      for (let i = 0; i < segments; i++) {
        const x = positions[i * 3];
        
        // Multi-layered sine waves for an organic audio/frequency look
        const wave1 = Math.sin(x * 1.5 + time * 2.0 + index * 0.15) * 1.2;
        const wave2 = Math.sin(x * 3.0 - time * 1.5 + index * 0.05) * 0.6;
        const wave3 = Math.sin(x * 0.5 + time * 0.8) * 2.0;

        // Gaussian envelope to keep waves centered inside the view
        const envelope = Math.exp(-Math.pow(x, 2) / 10);
        
        const y = (wave1 + wave2 + wave3) * envelope * 0.8;
        
        positions[i * 3 + 1] = y;
      }
      
      line.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group rotation={[0.1, 0.2, 0]}>
      {geometries.map((geo, i) => {
        // Fade out lines at the extreme front/back Z-indices
        const dist = Math.abs(i - numLines / 2) / (numLines / 2);
        const opacity = 0.5 * (1 - Math.pow(dist, 2));
        
        return (
          <line key={i} ref={(el: any) => { linesRef.current[i] = el; }}>
            <bufferGeometry attach="geometry" {...geo} />
            <lineBasicMaterial 
              attach="material" 
              color="#ffffff" 
              transparent 
              opacity={opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </line>
        );
      })}
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.pointer.x * 1.5, state.pointer.y * 1.5, 7), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export function Awaaz3DElement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "400px 0px" });

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-10 opacity-90 mix-blend-screen pointer-events-none will-change-transform"
      style={{ transform: 'translateZ(0)' }}
    >
      <Canvas 
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <CameraRig />
        <AudioWaveform />
      </Canvas>
    </div>
  );
}
