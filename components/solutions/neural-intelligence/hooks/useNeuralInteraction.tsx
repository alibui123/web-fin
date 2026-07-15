"use client"

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export type NeuralInteractionState = {
  hover: number
  pointer: THREE.Vector2
  pulseBoost: number
  particleBoost: number
  glowBoost: number
}

type InteractionApi = {
  state: NeuralInteractionState
  setHovered: (v: boolean) => void
}

const NeuralInteractionContext = createContext<InteractionApi | null>(null)

/**
 * Smooth cursor parallax + hover energy without React re-renders.
 */
export function useNeuralInteractionController() {
  const { viewport } = useThree()
  const hovered = useRef(false)
  const state = useRef<NeuralInteractionState>({
    hover: 0,
    pointer: new THREE.Vector2(0, 0),
    pulseBoost: 1,
    particleBoost: 1,
    glowBoost: 1,
  }).current

  useFrame((three) => {
    const targetHover = hovered.current ? 1 : 0
    state.hover += (targetHover - state.hover) * 0.08
    state.pointer.x += (three.pointer.x - state.pointer.x) * 0.06
    state.pointer.y += (three.pointer.y - state.pointer.y) * 0.06
    state.pulseBoost = 1 + state.hover * 0.35
    state.particleBoost = 1 + state.hover * 0.55
    state.glowBoost = 1 + state.hover * 0.45
    void viewport.width
  })

  return useMemo<InteractionApi>(
    () => ({
      state,
      setHovered: (v: boolean) => {
        hovered.current = v
      },
    }),
    [state],
  )
}

export function NeuralInteractionProvider({
  api,
  children,
}: {
  api: InteractionApi
  children: ReactNode
}) {
  return (
    <NeuralInteractionContext.Provider value={api}>
      {children}
    </NeuralInteractionContext.Provider>
  )
}

export function useNeuralInteraction() {
  const ctx = useContext(NeuralInteractionContext)
  if (!ctx) {
    throw new Error("useNeuralInteraction must be used within NeuralInteractionProvider")
  }
  return ctx
}

export function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    )
  }
  return points
}

export function buildNearestEdges(points: THREE.Vector3[], k = 3, maxDist = 1.4) {
  const edges: [number, number][] = []
  const seen = new Set<string>()

  for (let i = 0; i < points.length; i++) {
    const neighbors: { j: number; d: number }[] = []
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue
      const d = points[i].distanceTo(points[j])
      if (d <= maxDist) neighbors.push({ j, d })
    }
    neighbors.sort((a, b) => a.d - b.d)
    for (const n of neighbors.slice(0, k)) {
      const a = Math.min(i, n.j)
      const b = Math.max(i, n.j)
      const key = `${a}-${b}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([a, b])
      }
    }
  }

  return edges
}
