"use client"

import { useEffect, useMemo, useState } from "react"

export const C = {
  white: "#FFFFFF",
  graphite: "#24282F",
  graphiteMid: "#343A44",
  titanium: "#3F4652",
  aluminum: "#A7B0BB",
  aluminumBright: "#D2D8E0",
  blue: "#5EA8FF",
  glow: "#F5F7FA",
} as const

/** @deprecated use C — kept so stale imports don't crash mid-HMR */
export const ENGINE = C

export type EngineQuality = {
  isMobile: boolean
  isTablet: boolean
  particleCount: number
  taskCount: number
  streamCount: number
  agentCount: number
  nodeCount: number
  ringCount: number
  dpr: [number, number]
  scale: number
}

export function useEngineQuality(): EngineQuality {
  const [width, setWidth] = useState(1280)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener("resize", update, { passive: true })
    return () => window.removeEventListener("resize", update)
  }, [])

  return useMemo(() => {
    if (width < 768) {
      return {
        isMobile: true,
        isTablet: false,
        particleCount: 900,
        taskCount: 14,
        streamCount: 4,
        agentCount: 3,
        nodeCount: 4,
        ringCount: 5,
        dpr: [1, 1.25] as [number, number],
        scale: 0.76,
      }
    }
    if (width < 1024) {
      return {
        isMobile: false,
        isTablet: true,
        particleCount: 1800,
        taskCount: 22,
        streamCount: 6,
        agentCount: 4,
        nodeCount: 5,
        ringCount: 6,
        dpr: [1, 1.5] as [number, number],
        scale: 0.88,
      }
    }
    return {
      isMobile: false,
      isTablet: false,
      particleCount: 3200,
      taskCount: 32,
      streamCount: 8,
      agentCount: 6,
      nodeCount: 6,
      ringCount: 7,
      dpr: [1, 1.75] as [number, number],
      scale: 1,
    }
  }, [width])
}
