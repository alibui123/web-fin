"use client"

import { useEffect, useMemo, useState } from "react"

export type AcQuality = {
  isMobile: boolean
  particleMultiplier: number
  showLabels: boolean
  pulseCount: number
  dpr: [number, number]
  scale: number
}

export function useAcQuality(): AcQuality {
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
        particleMultiplier: 0.35,
        showLabels: false,
        pulseCount: 2,
        dpr: [1, 1.25] as [number, number],
        scale: 0.58,
      }
    }
    if (width < 1024) {
      return {
        isMobile: false,
        particleMultiplier: 0.5,
        showLabels: true,
        pulseCount: 2,
        dpr: [1, 1.5] as [number, number],
        scale: 0.72,
      }
    }
    return {
      isMobile: false,
      particleMultiplier: 0.65,
      showLabels: true,
      pulseCount: 3,
      dpr: [1, 1.6] as [number, number],
      scale: 0.85,
    }
  }, [width])
}
