"use client"

import * as React from "react"

/**
 * Dark-only theme context.
 * Avoids next-themes' injected <script>, which React 19 / Next 16
 * warn about when rendered from a client component.
 */
type ThemeContextValue = {
  theme: string
  setTheme: (theme: string) => void
  themes: string[]
  forcedTheme: string
  resolvedTheme: string
  systemTheme: "dark" | "light" | undefined
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  themes: ["dark"],
  forcedTheme: "dark",
  resolvedTheme: "dark",
  systemTheme: undefined,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme: "dark",
      setTheme: () => {},
      themes: ["dark"],
      forcedTheme: "dark",
      resolvedTheme: "dark",
      systemTheme: undefined,
    }),
    [],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  return React.useContext(ThemeContext)
}
