/** Visual palette: monochrome + restrained electric blue */
export const TE = {
  white: "#FFFFFF",
  glow: "#F4F6F9",
  graphite: "#23282F",
  graphiteMid: "#333942",
  titanium: "#404752",
  aluminum: "#A8B1BC",
  aluminumBright: "#D0D6DE",
  blue: "#5EA8FF",
  smoked: "#6B7280",
} as const

/**
 * Five implementation stages — chamber labels for editing only.
 * Visual order: left (intake) → right (autonomous output).
 */
export const TRANSFORM_STAGES = [
  "Map",
  "Design and build",
  "Train and test",
  "Go live",
  "Run and improve",
] as const

/**
 * Four guiding principles — outer stabilizing rings.
 */
export const PRINCIPLE_RINGS = [
  "Map the work",
  "Build in your stack",
  "Point at a number",
  "Run after launch",
] as const
