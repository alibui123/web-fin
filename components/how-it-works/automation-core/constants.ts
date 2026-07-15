/** Automation Core palette — monochrome enterprise + restrained blue */
export const AC = {
  white: "#FFFFFF",
  glow: "#F2F4F7",
  graphite: "#1C2128",
  graphiteMid: "#2A3038",
  aluminum: "#9AA3AE",
  aluminumBright: "#C8D0D8",
  blue: "#5B9FE8",
  smoked: "#5C6570",
} as const

export type Capability = {
  id: string
  label: string
  ring: number
  angle: number
  glyph: "agent" | "flow" | "task" | "decide" | "book" | "plug" | "api" | "pipe"
}

/**
 * Four clean orbital rings — even spacing, gentle shared tilt, opposing spin.
 */
export const ORBITS = [
  { radius: 1.9, speed: 0.06, dir: 1, tilt: 0.22, particles: 24 },
  { radius: 2.7, speed: 0.045, dir: -1, tilt: 0.22, particles: 28 },
  { radius: 3.5, speed: 0.035, dir: 1, tilt: 0.22, particles: 32 },
  { radius: 4.3, speed: 0.028, dir: -1, tilt: 0.22, particles: 36 },
] as const

/** Eight capabilities — two evenly spaced nodes per ring */
export const CAPABILITIES: Capability[] = [
  { id: "ai-agents", label: "AI Agents", ring: 0, angle: 0, glyph: "agent" },
  { id: "workflow", label: "Workflow Engine", ring: 0, angle: Math.PI, glyph: "flow" },
  { id: "orchestrator", label: "Task Orchestrator", ring: 1, angle: Math.PI / 2, glyph: "task" },
  { id: "decision", label: "Decision Engine", ring: 1, angle: Math.PI / 2 + Math.PI, glyph: "decide" },
  { id: "knowledge", label: "Knowledge Base", ring: 2, angle: Math.PI / 4, glyph: "book" },
  { id: "integrations", label: "Integrations", ring: 2, angle: Math.PI / 4 + Math.PI, glyph: "plug" },
  { id: "api", label: "API Gateway", ring: 3, angle: (3 * Math.PI) / 4, glyph: "api" },
  { id: "pipeline", label: "Data Pipeline", ring: 3, angle: (3 * Math.PI) / 4 + Math.PI, glyph: "pipe" },
]
