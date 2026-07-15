"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { MissionVisionCards } from "./ui-effects/mission-vision-cards"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="relative font-sans text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12" ref={ref}>
        {/* Intro Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Column - Image Bento */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1 will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Ambient Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-finova-cyan to-finova-magenta opacity-15 blur-2xl rounded-full" style={{ transform: 'translateZ(0)' }} />
            
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {/* Glassmorphic overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-finova-cyan/10 to-transparent z-10" />
              
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/about.jpg"
                  alt="About FinovaSolutions - Team collaboration"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>

              {/* Stats overlay card */}
              <div className="absolute bottom-6 left-6 z-20 p-4 rounded-2xl bg-[#080e24]/90 border border-white/10 shadow-xl">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-blue">50+</div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-white/50 mt-1">Enterprise<br/>Clients</div>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10" />
                  <div>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-finova-magenta to-finova-purple">200%</div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-white/50 mt-1">Growth<br/>Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 will-change-transform"
            >
              <div className="font-mono text-xs md:text-sm mb-6 text-finova-cyan tracking-[0.2em] uppercase border border-finova-cyan/30 bg-finova-cyan/10 inline-block px-6 py-2 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                Our Genesis
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6">
                Redefining Technology
              </h2>
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-finova-cyan to-finova-magenta" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 text-lg text-white/60 leading-relaxed font-light will-change-transform"
            >
              <p>
                Finova Solutions is a cutting-edge technology collective at the forefront of digital innovation. We specialize in architecting AI-powered ecosystems, high-performance full-stack platforms, and enterprise-grade infrastructure.
              </p>
              <p>
                Founded by a cadre of tech visionaries, our mandate is simple: accelerate the future. We transcend traditional software development by delivering transformative digital experiences that establish new industry paradigms and drive exponential growth.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4">
              Core Principles
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-finova-cyan to-finova-magenta mx-auto" />
          </div>
          <MissionVisionCards />
        </motion.div>
      </div>
    </section>
  )
}
