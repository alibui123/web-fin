"use client"

import { motion } from "framer-motion"
import { SparklesCore } from "./ui-effects/sparkles"
import { CheckCircle2 } from "lucide-react"

import { ConsultationTeamPreview } from "./consultation-team-preview"

export default function ConsultationIntro() {
  const benefits = [
    "Strategic roadmap tailored to your business goals",
    "Technology stack recommendations and justification",
    "ROI projections and cost-benefit analysis",
    "Implementation timeline and milestones",
    "No commitments — just honest expertise"
  ]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-finova-teal/10 via-transparent to-transparent" />
        <SparklesCore
          id="tsparticlesconsultation"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#2B8EBE"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-block">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-finova-teal/20 to-finova-blue/20 blur-xl" />
                <span className="relative bg-background/50 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-full border border-finova-teal/20">
                  Free Strategy Session
                </span>
              </div>
            </div>
          </motion.div>
  <ConsultationTeamPreview />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-finova-teal via-finova-blue to-finova-lightBlue"
          >
            Your Path to Digital Excellence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl text-foreground/70 leading-relaxed mb-8"
          >
            Schedule a complimentary 60-minute strategy consultation with our expert team. We'll analyze your challenges, 
            explore tailored solutions, and create a clear roadmap for your digital transformation. No sales pitch, no obligations—just strategic insights.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto"
        >
          {/* What's Included */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-finova-teal"
            >
              What's Included
            </motion.h2>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <CheckCircle2 className="h-6 w-6 text-finova-teal flex-shrink-0 mt-1" />
                  <p className="text-foreground/80 text-lg">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-finova-blue"
            >
              Why Finova Solutions
            </motion.h2>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="p-4 rounded-lg border border-finova-teal/20 bg-finova-teal/5"
              >
                <h3 className="font-semibold text-finova-teal mb-2">Industry Expertise</h3>
                <p className="text-foreground/70">
                  Deep experience across AI, blockchain, full-stack development, and enterprise transformations
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="p-4 rounded-lg border border-finova-blue/20 bg-finova-blue/5"
              >
                <h3 className="font-semibold text-finova-blue mb-2">Proven Track Record</h3>
                <p className="text-foreground/70">
                  Delivered transformative solutions to enterprises and startups across multiple industries
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="p-4 rounded-lg border border-finova-lightBlue/20 bg-finova-lightBlue/5"
              >
                <h3 className="font-semibold text-finova-lightBlue mb-2">Transparency First</h3>
                <p className="text-foreground/70">
                  Clear communication, realistic timelines, and no hidden costs or obligations
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="p-4 rounded-lg border border-finova-teal/20 bg-finova-teal/5"
              >
                <h3 className="font-semibold text-finova-teal mb-2">Dedicated Support</h3>
                <p className="text-foreground/70">
                  Direct access to our core team throughout your consultation and beyond
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
