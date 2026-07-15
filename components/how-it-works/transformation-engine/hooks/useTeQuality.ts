"use client"

import { useEffect, useMemo, useState } from "react"

// Re-exports so HMR/stale bundles importing palette from this file still resolve
export { TE, TRANSFORM_STAGES, PRINCIPLE_RINGS } from "../constants"

export type TeQuality = {
  isMobile: boolean
  particleCount: number
  taskCount: number
  streamCount: number
  dpr: [number, number]
  scale: number
}

export function useTeQuality(): TeQuality {
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
        particleCount: 700,
        taskCount: 16,
        streamCount: 10,
        dpr: [1, 1.25] as [number, number],
        scale: 0.72,
      }
    }
    if (width < 1024) {
      return {
        isMobile: false,
        particleCount: 1400,
        taskCount: 24,
        streamCount: 14,
        dpr: [1, 1.5] as [number, number],
        scale: 0.86,
      }
    }
    return {
      isMobile: false,
      particleCount: 2400,
      taskCount: 36,
      streamCount: 18,
      dpr: [1, 1.75] as [number, number],
      scale: 1,
    }
  }, [width])
}
