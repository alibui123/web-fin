"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useErpAnimation } from "./hooks/useERPAnimation"

export default function CameraRig() {
  const { camera, pointer } = useThree()
  const { state } = useErpAnimation()
  const target = useRef(new THREE.Vector3(1.4, 0.2, 6.2)).current
  const look = useRef(new THREE.Vector3(0, 0, 0)).current
  const smooth = useRef(new THREE.Vector2()).current

  useFrame(() => {
    const t = state.time
    smooth.x += (pointer.x - smooth.x) * 0.04
    smooth.y += (pointer.y - smooth.y) * 0.04

    target.set(
      1.4 + Math.sin(t * 0.1) * 0.1 + smooth.x * 0.25,
      0.2 + Math.cos(t * 0.08) * 0.08 + smooth.y * 0.14,
      6.2,
    )
    camera.position.lerp(target, 0.03)
    look.set(smooth.x * 0.12, smooth.y * 0.08, 0)
    camera.lookAt(look)
  })

  return null
}
