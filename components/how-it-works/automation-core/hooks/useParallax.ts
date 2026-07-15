"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"

/** Subtle pointer parallax — a few degrees only */
export function useParallax(amount = 0.045) {
  const ref = useRef<Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const tx = state.pointer.x * amount
    const ty = state.pointer.y * amount * 0.55
    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.035
    ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.035
  })

  return ref
}
