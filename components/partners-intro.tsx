"use client"

import { motion } from "framer-motion"

export default function PartnersIntro() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-finova-teal to-finova-blue">
            Our Partners
          </h1>
          <p className="text-lg text-foreground/70">
            We collaborate with industry leaders to deliver exceptional solutions and drive innovation.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 