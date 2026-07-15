"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

interface SparklesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  particleOpacity?: number
  speed?: number
}

// Define Particle class outside the component
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string

  constructor(
    width: number,
    height: number,
    minSize: number,
    maxSize: number,
    speed: number,
    particleColor: string,
    particleOpacity: number,
    theme: string | undefined,
  ) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.size = Math.random() * (maxSize - minSize) + minSize
    this.speedX = (Math.random() - 0.5) * speed
    this.speedY = (Math.random() - 0.5) * speed

    // Adjust color based on theme - updated to match Finova colors
    const isDark = theme === "dark"
    const opacity = Math.random() * particleOpacity + 0.1

    if (particleColor === "#FFF") {
      this.color = isDark
        ? `rgba(43, 142, 190, ${opacity})` // Finova light blue for dark theme
        : `rgba(30, 91, 141, ${opacity})` // Finova blue for light theme
    } else {
      this.color = `${particleColor.split(")")[0]}, ${opacity})`
    }
  }

  update(width: number, height: number, mouseX: number, mouseY: number) {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > width) this.x = 0
    else if (this.x < 0) this.x = width

    if (this.y > height) this.y = 0
    else if (this.y < 0) this.y = height

    // Attract to mouse
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 100) {
      this.x += dx * 0.01
      this.y += dy * 0.01
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleColor = "#FFF",
  particleDensity = 80,
  particleOpacity = 0.5,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const dprRef = useRef(1)
  const { theme } = useTheme()

  const handleResize = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        setContext(ctx)
        const realWidth = window.innerWidth
        const realHeight = window.innerHeight
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        dprRef.current = dpr
        setWidth(realWidth)
        setHeight(realHeight)
        canvas.width = Math.floor(realWidth * dpr)
        canvas.height = Math.floor(realHeight * dpr)
        canvas.style.width = `${realWidth}px`
        canvas.style.height = `${realHeight}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (context && width > 0 && height > 0) {
      initParticles()
    }
  }, [context, width, height, particleDensity, theme])

  const initParticles = () => {
    const particleCount = Math.min(Math.floor((width * height) / 14000) * (particleDensity / 100), 420)
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push(new Particle(width, height, minSize, maxSize, speed, particleColor, particleOpacity, theme))
    }

    particlesRef.current = newParticles
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  useEffect(() => {
    if (!context) return

    let animationFrameId: number
    let isRunning = true

    const render = () => {
      if (!isRunning) return

      const particles = particlesRef.current
      const mouse = mouseRef.current

      context.clearRect(0, 0, width, height)
      context.fillStyle = background
      context.fillRect(0, 0, width, height)

      particles.forEach((particle) => {
        particle.update(width, height, mouse.x, mouse.y)
        particle.draw(context)
      })

      // Connect particles with lines
      connectParticles()

      animationFrameId = requestAnimationFrame(render)
    }

    const connectParticles = () => {
      const particles = particlesRef.current
      const maxDistance = 100
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j += 2) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            context.strokeStyle =
              theme === "dark"
                ? `rgba(43, 142, 190, ${opacity * 0.25})` // Finova light blue for dark theme
                : `rgba(30, 91, 141, ${opacity * 0.15})` // Finova blue for light theme
            context.lineWidth = 0.5
            context.beginPath()
            context.moveTo(particles[i].x, particles[i].y)
            context.lineTo(particles[j].x, particles[j].y)
            context.stroke()
          }
        }
      }
    }

    const onVisibility = () => {
      if (document.hidden) {
        isRunning = false
        cancelAnimationFrame(animationFrameId)
      } else {
        isRunning = true
        animationFrameId = requestAnimationFrame(render)
      }
    }

    document.addEventListener("visibilitychange", onVisibility)

    render()

    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [context, width, height, background, theme])

  return <canvas id={id} ref={canvasRef} onMouseMove={handleMouseMove} className={cn("h-full w-full", className)} />
}

