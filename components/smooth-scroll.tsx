"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.4,                         // duration-based instead of raw lerp — gives a consistent, natural deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out: fast start, silky tail — matches Cohere's feel
      wheelMultiplier: 0.8,                  // slightly subdued so fast flicks don't overshoot
      smoothWheel: true,
      touchMultiplier: 1.2,
      syncTouch: false,                      // off — prevents iOS <16 jitter; native touch is smoother
    })

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update)

    // Use gsap.ticker (not raw rAF) so lagSmoothing works correctly
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000) // gsap time is in seconds, Lenis expects ms
    })

    // CRITICAL: disables GSAP's built-in lag compensation which adds
    // artificial delay and makes scroll feel "drunk" on slow frames
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
    }
  }, [])

  return null
}