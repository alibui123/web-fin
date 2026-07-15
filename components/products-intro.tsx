"use client"

import { motion } from "framer-motion"
import { SparklesCore } from "./ui-effects/sparkles"

export default function ProductsIntro() {
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
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#0ea5e9" // finova-cyan
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
              <div className="font-mono text-xs md:text-sm tracking-widest uppercase border border-finova-cyan/30 bg-finova-cyan/10 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] text-finova-cyan">
                Finova Flagship Products
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-[5.5rem] font-black uppercase tracking-tighter mb-8 leading-[1.1]"
            >
              <span className="block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">EXPLORE THE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-blue to-finova-magenta drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                PRODUCT SUITE
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto font-light"
            >
                We build AI-first platforms that unify operations, customer experience, and industry workflows. From voice automation to hospitality intelligence, our products serve teams that need speed, scale, and measurable outcomes.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap gap-4 text-sm font-mono tracking-widest text-white/80 justify-center uppercase"
            >
                {["Awaaz", "Qualicall", "AI-Powered ERP", "Mehman Nawaz", "AI First"].map((tag) => (
                <div
                  key={tag}
                  className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.05)]"
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