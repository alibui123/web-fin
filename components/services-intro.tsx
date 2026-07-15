"use client"

import { motion } from "framer-motion"
import { SparklesCore } from "./ui-effects/sparkles"

export default function ServicesIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesservices"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#d946ef" // finova-magenta
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex justify-center items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center w-full max-w-5xl"
          >
            <motion.div variants={itemVariants} className="mb-8 flex justify-center">
              <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase border border-finova-magenta/30 bg-finova-magenta/10 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.3)] text-finova-magenta">
                Enterprise Capabilities
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-[5.5rem] font-black uppercase tracking-tighter mb-8 leading-[1.1]"
            >
              <span className="block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">ENGINEERING</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-finova-purple via-finova-magenta to-finova-cyan drop-shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                THE FUTURE
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto font-light"
            >
              Comprehensive enterprise solutions designed to transform your operations,
              enhance efficiency, and drive sustainable growth through cutting-edge technology.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap gap-4 text-sm font-mono tracking-widest text-white/80 justify-center uppercase"
            >
              {[
                "Digital Transformation",
                "Enterprise Solutions",
                "Cloud Services",
                "AI Integration",
                "Consulting"
              ].map((tag) => (
                <div
                  key={tag}
                  className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-finova-magenta/50 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                >
                  {tag}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 