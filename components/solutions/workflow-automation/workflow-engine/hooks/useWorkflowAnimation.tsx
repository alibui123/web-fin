"use client"

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export type WorkflowAnimState = {
  highlightT: number
  activeModule: number
  energy: number
  time: number
}

type Api = {
  state: WorkflowAnimState
  moduleCount: number
  setHovered: (v: boolean) => void
}

const Ctx = createContext<Api | null>(null)

/**
 * Owns continuous pipeline timing without React re-renders.
 * A highlight packet completes a full pass every ~6.5s.
 */
export function useWorkflowAnimationController(moduleCount: number) {
  const hovered = useRef(false)
  const state = useRef<WorkflowAnimState>({
    highlightT: 0,
    activeModule: -1,
    energy: 1,
    time: 0,
  }).current

  useFrame((_, delta) => {
    state.time += delta
    state.highlightT = (state.highlightT + delta / 6.5) % 1
    state.activeModule = Math.min(
      moduleCount - 1,
      Math.floor(state.highlightT * moduleCount),
    )
    const targetEnergy = hovered.current ? 1.35 : 1
    state.energy += (targetEnergy - state.energy) * 0.06
  })

  return useMemo<Api>(
    () => ({
      state,
      moduleCount,
      setHovered: (v: boolean) => {
        hovered.current = v
      },
    }),
    [moduleCount, state],
  )
}

export function WorkflowAnimProvider({
  api,
  children,
}: {
  api: Api
  children: ReactNode
}) {
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useWorkflowAnimation() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useWorkflowAnimation requires provider")
  return ctx
}

/** Very subtle pointer parallax — never dramatic. */
export function useParallax(strength = 0.12) {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const smoothed = useRef(new THREE.Vector2()).current

  useFrame(() => {
    smoothed.x += (pointer.x - smoothed.x) * 0.05
    smoothed.y += (pointer.y - smoothed.y) * 0.05
    if (group.current) {
      group.current.rotation.y = smoothed.x * strength
      group.current.rotation.x = -smoothed.y * strength * 0.65
      group.current.position.x = smoothed.x * 0.12
      group.current.position.y = smoothed.y * 0.08
    }
  })

  return group
}

export function modulePositions(count: number, spacing: number) {
  const positions: THREE.Vector3[] = []
  const total = (count - 1) * spacing
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1)
    const arc = Math.sin(t * Math.PI) * 0.22
    positions.push(
      new THREE.Vector3(
        i * spacing - total / 2,
        arc,
        Math.sin(t * Math.PI * 1.2) * 0.15,
      ),
    )
  }
  return positions
}
