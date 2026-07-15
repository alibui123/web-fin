"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverGlowEffectProps {
  children: React.ReactNode
  className?: string
  glowClassName?: string
}

export function HoverGlowEffect({ children, className, glowClassName }: HoverGlowEffectProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const element = containerRef.current
    if (element) {
      element.addEventListener("mouseleave", handleMouseLeave)
      return () => {
        element.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      className={cn("relative", className)}
    >
      {isHovered && (
        <motion.div
          className={cn(
            "absolute inset-0 -z-10 opacity-80 blur-xl transition-opacity",
            glowClassName || "bg-cyan-400/30 dark:bg-cyan-600/30",
          )}
          animate={{
            x: mousePosition.x - 100,
            y: mousePosition.y - 100,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
          }}
        />
      )}
      {children}
    </div>
  )
}

