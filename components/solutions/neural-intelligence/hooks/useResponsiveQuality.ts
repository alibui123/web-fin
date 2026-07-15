"use client"

import { useEffect, useMemo, useState } from "react"

export type NeuralQuality = {
  isMobile: boolean
  isTablet: boolean
  nodeCount: number
  satelliteCount: number
  packetCount: number
  ambientCount: number
  dpr: [number, number]
  bloomIntensity: number
  scale: number
}

/**
 * Responsive quality tiers so desktop stays dense while mobile stays ~60fps.
 */
export function useResponsiveQuality(): NeuralQuality {
  const [width, setWidth] = useState(1280)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener("resize", update, { passive: true })
    return () => window.removeEventListener("resize", update)
  }, [])

  return useMemo(() => {
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024

    if (isMobile) {
      return {
        isMobile: true,
        isTablet: false,
        nodeCount: 28,
        satelliteCount: 3,
        packetCount: 12,
        ambientCount: 280,
        dpr: [1, 1.25],
        bloomIntensity: 0.55,
        scale: 0.78,
      }
    }

    if (isTablet) {
      return {
        isMobile: false,
        isTablet: true,
        nodeCount: 48,
        satelliteCount: 4,
        packetCount: 24,
        ambientCount: 900,
        dpr: [1, 1.5],
        bloomIntensity: 0.7,
        scale: 0.9,
      }
    }

    return {
      isMobile: false,
      isTablet: false,
      nodeCount: 64,
      satelliteCount: 5,
      packetCount: 36,
      ambientCount: 2200,
      dpr: [1, 1.75],
      bloomIntensity: 0.85,
      scale: 1,
    }
  }, [width])
}
