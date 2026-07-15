"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useWorkflowAnimation } from "./hooks/useWorkflowAnimation"

/**
 * Slow floating perspective camera with soft pointer influence.
 */
export default function CameraRig() {
  const { camera, pointer } = useThree()
  const { state } = useWorkflowAnimation()
  const target = useRef(new THREE.Vector3(0.15, 0.35, 7.2)).current
  const look = useRef(new THREE.Vector3(0, 0.1, 0)).current
  const smoothPointer = useRef(new THREE.Vector2()).current

  useFrame(() => {
    const t = state.time
    smoothPointer.x += (pointer.x - smoothPointer.x) * 0.04
    smoothPointer.y += (pointer.y - smoothPointer.y) * 0.04

    target.set(
      0.15 + Math.sin(t * 0.11) * 0.12 + smoothPointer.x * 0.28,
      0.35 + Math.cos(t * 0.09) * 0.08 + smoothPointer.y * 0.16,
      7.2,
    )
    camera.position.lerp(target, 0.03)
    look.set(smoothPointer.x * 0.15, 0.08 + smoothPointer.y * 0.08, 0)
    camera.lookAt(look)
  })

  return null
}
