"use client"

import { cn } from "@/lib/utils"

interface RotatingBorderProps {
  children: React.ReactNode
  duration?: number
  className?: string
  containerClassName?: string
  gradient?: string
}

export const RotatingBorder = ({
  children,
  duration = 8,
  className,
  containerClassName,
  gradient = "from-cyan-500 via-purple-500 to-cyan-500"
}: RotatingBorderProps) => {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl group", containerClassName)}>
      {/* First rotating border - larger rectangle */}
      <div
        className={cn(
          "absolute w-[150%] h-[150%] -top-[25%] -left-[25%] animate-[spin_var(--duration)_linear_infinite]"
        )}
        style={{ 
          "--duration": `${duration}s`,
          background: "#309FC4",
          opacity: "1"
        } as React.CSSProperties}
      />
      {/* Second rotating border - opposite direction */}
      <div
        className={cn(
          "absolute w-[140%] h-[140%] -top-[20%] -left-[20%] animate-[spin_var(--duration)_linear_infinite_reverse]"
        )}
        style={{ 
          "--duration": `${duration * 1.5}s`,
          background: "#309FC4",
          opacity: "0.9"
        } as React.CSSProperties}
      />
      {/* Content container */}
      <div className={cn(
        "relative bg-background/90 backdrop-blur-sm rounded-2xl",
        "group-hover:bg-background/85 transition-colors duration-500",
        className
      )}>
        {children}
      </div>
    </div>
  )
} 