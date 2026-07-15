"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  containerClassName?: string
  borderClassName?: string
  as?: any
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [borderRadius, setBorderRadius] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        const x = Math.random() * width
        const y = Math.random() * height
        setPosition({ x, y })
        setBorderRadius(Math.random() * 40 + 10)
      }
    }, duration)

    return () => clearInterval(interval)
  }, [duration])

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <Component
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <motion.div
        className={cn(
          "absolute inset-0 z-0 opacity-[0.4] bg-gradient-to-r from-cyan-400 to-purple-600",
          borderClassName,
        )}
        animate={{
          x: position.x,
          y: position.y,
          borderRadius: `${borderRadius}%`,
          opacity: opacity,
        }}
        transition={{
          duration: duration / 1000,
          ease: "linear",
        }}
        style={{
          width: 150,
          height: 150,
          filter: "blur(40px)",
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </Component>
  )
}

