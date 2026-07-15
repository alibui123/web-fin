"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

// Define Particle class outside the component
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string

  constructor(canvasWidth: number, canvasHeight: number, isDark: boolean) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.size = Math.random() * 3 + 1
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5

    // Color based on theme - updated to match Finova colors
    const opacity = Math.random() * 0.5 + 0.1
    this.color = isDark
      ? `rgba(43, 142, 190, ${opacity})` // Finova light blue for dark theme
      : `rgba(30, 91, 141, ${opacity})` // Finova blue for light theme
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > canvasWidth) this.x = 0
    else if (this.x < 0) this.x = canvasWidth

    if (this.y > canvasHeight) this.y = 0
    else if (this.y < 0) this.y = canvasHeight
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number

    const isDark = theme === "dark"

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Initialize particles
    function initParticles() {
      particles = []
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 150)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height, isDark))
      }
    }

    // Update connectParticles function to match Finova colors
    function connectParticles() {
      if (!ctx) return

      const maxDistance = 150

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = isDark
              ? `rgba(43, 142, 190, ${opacity * 0.2})` // Finova light blue for dark theme
              : `rgba(30, 91, 141, ${opacity * 0.1})` // Finova blue for light theme
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height)
        particles[i].draw(ctx)
      }

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-70" />
}

