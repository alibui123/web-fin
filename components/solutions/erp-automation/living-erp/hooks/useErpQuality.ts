"use client"

import { useEffect, useMemo, useState } from "react"

export type ErpDomain =
  | "finance"
  | "inventory"
  | "crm"
  | "hr"
  | "procurement"
  | "manufacturing"
  | "reporting"
  | "operations"

export type ErpQuality = {
  isMobile: boolean
  isTablet: boolean
  moduleCount: number
  ambientCount: number
  packetCount: number
  spacing: number
  dpr: [number, number]
  enableSoftFx: boolean
  scale: number
}

export const ERP_DOMAINS: { id: ErpDomain; label: string }[] = [
  { id: "finance", label: "Finance" },
  { id: "inventory", label: "Inventory" },
  { id: "crm", label: "CRM" },
  { id: "hr", label: "Human Resources" },
  { id: "procurement", label: "Procurement" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "reporting", label: "Reporting" },
  { id: "operations", label: "Operations" },
]

export const ERP = {
  navy: "#050A1F",
  electric: "#0EA5E9",
  cyan: "#38BDF8",
  purple: "#9333EA",
  violet: "#8B5CF6",
  magenta: "#D946EF",
  white: "#F8FAFC",
} as const

export function useErpQuality(): ErpQuality {
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
        moduleCount: 4,
        ambientCount: 1000,
        packetCount: 14,
        spacing: 0.72,
        dpr: [1, 1.25],
        enableSoftFx: false,
        scale: 0.82,
      }
    }
    if (width < 1024) {
      return {
        isMobile: false,
        isTablet: true,
        moduleCount: 6,
        ambientCount: 1600,
        packetCount: 20,
        spacing: 0.78,
        dpr: [1, 1.5],
        enableSoftFx: true,
        scale: 0.9,
      }
    }
    return {
      isMobile: false,
      isTablet: false,
      moduleCount: 8,
      ambientCount: 2500,
      packetCount: 28,
      spacing: 0.86,
      dpr: [1, 1.75],
      enableSoftFx: true,
      scale: 1,
    }
  }, [width])
}
