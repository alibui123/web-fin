"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const partnerships = [
  {
    title: "Cloud Solutions",
    description: "Collaborating with leading cloud providers to deliver scalable solutions.",
    partner: "Microsoft Azure",
  },
  {
    title: "AI Integration",
    description: "Partnering with AI leaders to implement cutting-edge solutions.",
    partner: "Google Cloud",
  },
  {
    title: "Enterprise Solutions",
    description: "Working with enterprise software providers to deliver robust solutions.",
    partner: "Oracle",
  },
]

export default function FeaturedPartnerships() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Partnerships</h2>
          <p className="text-foreground/70">
            Discover how we work with industry leaders to deliver exceptional solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {partnerships.map((partnership, index) => (
            <motion.div
              key={partnership.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-2">{partnership.title}</h3>
                <p className="text-foreground/70 mb-4">{partnership.description}</p>
                <div className="text-sm text-foreground/50">
                  Partner: {partnership.partner}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 