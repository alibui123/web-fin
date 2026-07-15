"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const products = [
  {
    title: "Voice AI",
    description: "Natural language processing and voice recognition technology for seamless interactions.",
    icon: "🗣️",
  },
  {
    title: "Quality Assurance AI",
    description: "Automated testing and quality assurance powered by artificial intelligence.",
    icon: "✅",
  },
  {
    title: "AuthApp",
    description: "Secure authentication and authorization solutions for modern applications.",
    icon: "🔐",
  },
]

export default function ProductSections() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-foreground/70">{product.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 