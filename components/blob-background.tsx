"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

export default function BlobBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Create a blob shape
    const drawBlob = (x: number, y: number, radius: number, color: string) => {
      ctx.save()

      // Create a radial gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `${color}80`) // Semi-transparent at center
      gradient.addColorStop(1, `${color}00`) // Fully transparent at edges

      ctx.fillStyle = gradient

      // Draw a blob using bezier curves
      ctx.beginPath()

      const points = 8
      const angleStep = (Math.PI * 2) / points
      const blobFactor = 0.3 // How "blobby" the shape is

      for (let i = 0; i <= points; i++) {
        const angle = i * angleStep + time

        // Add some variation to the radius to create a blob effect
        const radiusVariation = radius * (1 + blobFactor * Math.sin(angle * 3 + time))

        const x1 = x + Math.cos(angle) * radiusVariation
        const y1 = y + Math.sin(angle) * radiusVariation

        if (i === 0) {
          ctx.moveTo(x1, y1)
        } else {
          const prevAngle = (i - 1) * angleStep + time
          const prevRadiusVariation = radius * (1 + blobFactor * Math.sin(prevAngle * 3 + time))

          const x0 = x + Math.cos(prevAngle) * prevRadiusVariation
          const y0 = y + Math.sin(prevAngle) * prevRadiusVariation

          // Control points for the bezier curve
          const cp1x = x0 + Math.cos(prevAngle + Math.PI / 4) * radiusVariation * 0.5
          const cp1y = y0 + Math.sin(prevAngle + Math.PI / 4) * radiusVariation * 0.5
          const cp2x = x1 + Math.cos(angle - Math.PI / 4) * radiusVariation * 0.5
          const cp2y = y1 + Math.sin(angle - Math.PI / 4) * radiusVariation * 0.5

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x1, y1)
        }
      }

      ctx.fill()
      ctx.restore()
    }

    // Update blob colors to match Finova brand exactly
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw multiple blobs with different colors and positions
      const isDark = theme === "dark"

      // Blob 1 - Top left
      drawBlob(
        canvas.width * 0.2 + Math.sin(time * 0.5) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.3) * 50,
        300,
        isDark ? "#2B8EBE" : "#1E5B8D", // Finova light blue / blue
      )

      // Blob 2 - Bottom right
      drawBlob(
        canvas.width * 0.8 + Math.sin(time * 0.4) * 80,
        canvas.height * 0.7 + Math.cos(time * 0.4) * 60,
        350,
        isDark ? "#36B7D7" : "#1A3A5F", // Finova teal / dark blue
      )

      // Blob 3 - Center
      drawBlob(
        canvas.width * 0.5 + Math.sin(time * 0.3) * 120,
        canvas.height * 0.5 + Math.cos(time * 0.5) * 70,
        250,
        isDark ? "#1E5B8D" : "#36B7D7", // Finova blue / teal
      )

      // Use a smaller time increment for smoother animation
      time += 0.003
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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-50" />
}

