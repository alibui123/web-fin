"use client"

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react"

export type EntranceState = {
  core: number
  rings: number[]
  nodes: number
  particles: number
  pulses: number
  ready: boolean
}

type EntranceApi = {
  state: EntranceState
  start: () => void
}

const EntranceContext = createContext<EntranceApi | null>(null)

export function useEntrance() {
  const ctx = useContext(EntranceContext)
  if (!ctx) throw new Error("useEntrance requires EntranceProvider")
  return ctx
}

export function EntranceProvider({
  children,
  ringCount,
}: {
  children: ReactNode
  ringCount: number
}) {
  const state = useRef<EntranceState>({
    core: 1,
    rings: Array.from({ length: ringCount }, () => 1),
    nodes: 1,
    particles: 1,
    pulses: 1,
    ready: true,
  }).current

  const started = useRef(false)

  const api = useMemo<EntranceApi>(
    () => ({
      state,
      start: () => {
        if (started.current) return
        started.current = true
        // Already fully revealed so the hero appears with page content.
        state.core = 1
        state.rings = state.rings.map(() => 1)
        state.nodes = 1
        state.particles = 1
        state.pulses = 1
        state.ready = true
      },
    }),
    [state],
  )

  return (
    <EntranceContext.Provider value={api}>{children}</EntranceContext.Provider>
  )
}
