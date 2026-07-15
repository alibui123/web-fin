"use client"

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export type ErpAnimState = {
  time: number
  /** 0 idle → 1 peak sync */
  sync: number
  /** 0 closed stack → 1 separated */
  separation: number
  energy: number
}

type Api = {
  state: ErpAnimState
  moduleCount: number
  setHovered: (v: boolean) => void
}

const Ctx = createContext<Api | null>(null)

/**
 * Continuous ERP heartbeat without React re-renders.
 * Sync cycle every ~8s: separate → stream → reunite.
 */
export function useErpAnimationController(moduleCount: number) {
  const hovered = useRef(false)
  const state = useRef<ErpAnimState>({
    time: 0,
    sync: 0,
    separation: 0,
    energy: 1,
  }).current

  useFrame((_, delta) => {
    state.time += delta
    // 8s cycle, sync pulse ~1.6s wide in the middle
    const cycle = (state.time % 8) / 8
    // Separation rises mid-cycle then falls
    const sepWave = Math.sin(cycle * Math.PI)
    state.separation = Math.max(0, sepWave * 0.85)
    // Bright sync intensity near cycle peak
    const syncPeak = Math.exp(-Math.pow((cycle - 0.5) * 6, 2))
    state.sync = syncPeak

    const targetEnergy = hovered.current ? 1.3 : 1
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

export function ErpAnimProvider({
  api,
  children,
}: {
  api: Api
  children: ReactNode
}) {
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useErpAnimation() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useErpAnimation requires provider")
  return ctx
}

export function useParallax(strength = 0.1) {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const smoothed = useRef(new THREE.Vector2()).current

  useFrame(() => {
    smoothed.x += (pointer.x - smoothed.x) * 0.05
    smoothed.y += (pointer.y - smoothed.y) * 0.05
    if (group.current) {
      group.current.rotation.y = smoothed.x * strength
      group.current.rotation.x = -smoothed.y * strength * 0.55
      group.current.position.x = smoothed.x * 0.1
      group.current.position.y = smoothed.y * 0.06
    }
  })

  return group
}

export function stackPositions(count: number, spacing: number) {
  const positions: THREE.Vector3[] = []
  const total = (count - 1) * spacing
  for (let i = 0; i < count; i++) {
    positions.push(new THREE.Vector3(0, i * spacing - total / 2, 0))
  }
  return positions
}
