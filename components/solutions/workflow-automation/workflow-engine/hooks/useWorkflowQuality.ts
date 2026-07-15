"use client"

import { useEffect, useMemo, useState } from "react"

export type WorkflowStageKind =
  | "input"
  | "validation"
  | "classification"
  | "decision"
  | "automation"
  | "approval"
  | "execution"
  | "delivery"
  | "completed"

export type WorkflowQuality = {
  isMobile: boolean
  isTablet: boolean
  stageCount: number
  ambientCount: number
  packetCount: number
  spacing: number
  dpr: [number, number]
  enablePost: boolean
  scale: number
}

export const WORKFLOW_STAGES: { id: WorkflowStageKind; label: string }[] = [
  { id: "input", label: "Input" },
  { id: "validation", label: "Validation" },
  { id: "classification", label: "Classification" },
  { id: "decision", label: "AI Decision" },
  { id: "automation", label: "Automation" },
  { id: "approval", label: "Human Approval" },
  { id: "execution", label: "Execution" },
  { id: "delivery", label: "Delivery" },
  { id: "completed", label: "Completed" },
]

export function useWorkflowQuality(): WorkflowQuality {
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
        stageCount: 5,
        ambientCount: 480,
        packetCount: 8,
        spacing: 1.05,
        dpr: [1, 1.25],
        enablePost: false,
        scale: 0.85,
      }
    }
    if (width < 1024) {
      return {
        isMobile: false,
        isTablet: true,
        stageCount: 7,
        ambientCount: 1100,
        packetCount: 14,
        spacing: 1.15,
        dpr: [1, 1.5],
        enablePost: false,
        scale: 0.92,
      }
    }
    return {
      isMobile: false,
      isTablet: false,
      stageCount: 9,
      ambientCount: 2000,
      packetCount: 18,
      spacing: 1.28,
      dpr: [1, 1.75],
      enablePost: true,
      scale: 1,
    }
  }, [width])
}

/** Shared Finova palette for the engine */
export const WF = {
  navy: "#050A1F",
  blue: "#1E40AF",
  electric: "#0EA5E9",
  cyan: "#38BDF8",
  violet: "#8B5CF6",
  magenta: "#D946EF",
  white: "#F8FAFC",
} as const
