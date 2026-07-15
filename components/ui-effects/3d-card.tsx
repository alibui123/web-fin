"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { createContext, useState, useContext, useRef } from "react"

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined)

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const { left, top, width, height } = container.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const centerX = width / 2
    const centerY = height / 2
    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("py-20 flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseLeave={() => {
            setIsMouseEntered(false)
            handleMouseLeave()
          }}
          onMouseMove={handleMouseMove}
          className={cn("relative flex items-center justify-center", className)}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("h-96 w-80 [transform-style:preserve-3d]", className)}>{children}</div>
}

export const CardItem = ({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}: {
  children: React.ReactNode
  className?: string
  translateX?: number
  translateY?: number
  translateZ?: number
  rotateX?: number
  rotateY?: number
  rotateZ?: number
}) => {
  const context = useContext(MouseEnterContext)
  const [isMouseEntered] = context || [false]

  const transform = isMouseEntered
    ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"

  return (
    <div
      className={cn("absolute inset-0 [transform-style:preserve-3d]", className)}
      style={{
        transform,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </div>
  )
}

