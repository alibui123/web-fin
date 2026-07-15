"use client"

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react"
import gsap from "gsap"

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
    core: 0,
    rings: Array.from({ length: ringCount }, () => 0),
    nodes: 0,
    particles: 0,
    pulses: 0,
    ready: false,
  }).current

  const started = useRef(false)

  const api = useMemo<EntranceApi>(
    () => ({
      state,
      start: () => {
        if (started.current) return
        started.current = true
        const s = state
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        const coreProxy = { v: 0 }
        tl.to(
          coreProxy,
          {
            v: 1,
            duration: 0.55,
            onUpdate: () => {
              s.core = coreProxy.v
            },
          },
          0.05,
        )

        s.rings.forEach((_, i) => {
          const proxy = { v: 0 }
          tl.to(
            proxy,
            {
              v: 1,
              duration: 0.35,
              onUpdate: () => {
                s.rings[i] = proxy.v
              },
            },
            0.25 + i * 0.12,
          )
        })

        const nodesProxy = { v: 0 }
        tl.to(
          nodesProxy,
          {
            v: 1,
            duration: 0.55,
            onUpdate: () => {
              s.nodes = nodesProxy.v
            },
          },
          0.55,
        )

        const particlesProxy = { v: 0 }
        tl.to(
          particlesProxy,
          {
            v: 1,
            duration: 0.5,
            onUpdate: () => {
              s.particles = particlesProxy.v
            },
          },
          0.75,
        )

        const pulsesProxy = { v: 0 }
        tl.to(
          pulsesProxy,
          {
            v: 1,
            duration: 0.4,
            onUpdate: () => {
              s.pulses = pulsesProxy.v
            },
          },
          1.1,
        )

        tl.call(() => {
          s.ready = true
        })
      },
    }),
    [state],
  )

  return (
    <EntranceContext.Provider value={api}>{children}</EntranceContext.Provider>
  )
}
