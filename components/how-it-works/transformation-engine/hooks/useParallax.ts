"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"

export function useParallax(amount = 0.04) {
  const ref = useRef<Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const tx = state.pointer.x * amount
    const ty = state.pointer.y * amount * 0.5
    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.03
    ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.03
  })

  return ref
}
