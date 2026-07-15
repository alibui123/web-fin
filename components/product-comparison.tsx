"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const useCases = [
  {
    title: "Enterprise Solutions",
    description: "Comprehensive AI solutions for large-scale business operations.",
    products: ["Agentic AI", "Voice AI", "Quality Assurance AI"],
  },
  {
    title: "Security & Authentication",
    description: "Robust security solutions for modern applications.",
    products: ["AuthApp", "Quality Assurance AI"],
  },
  {
    title: "Customer Service",
    description: "Enhanced customer interactions through AI-powered solutions.",
    products: ["Voice AI", "Agentic AI"],
  },
]

export default function ProductComparison() {
  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Use Cases</h2>
          <p className="text-foreground/70">
            Discover how our products work together to solve complex business challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-foreground/70 mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium">Products Used:</h4>
                  <ul className="list-disc list-inside text-foreground/70">
                    {useCase.products.map((product) => (
                      <li key={product}>{product}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 