"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { MovingBorder } from "./ui-effects/moving-border"

const projects = [
  {
    title: "AI-Powered Analytics Platform",
    description:
      "A comprehensive analytics solution with machine learning capabilities for real-time business insights and predictive modeling.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["AI/ML", "React", "Python", "TensorFlow", "AWS"],
  },
  {
    title: "Blockchain Supply Chain System",
    description:
      "End-to-end supply chain management platform using blockchain technology for transparent and secure tracking.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Blockchain", "Ethereum", "Node.js", "React", "Solidity"],
  },
  {
    title: "Intelligent Healthcare Platform",
    description:
      "AI-driven healthcare management system with patient data analysis, medical imaging processing, and predictive diagnostics.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Healthcare AI", "Python", "React", "TensorFlow", "AWS"],
  },
  {
    title: "Edge Computing IoT Solution",
    description:
      "Distributed IoT platform leveraging edge computing for real-time data processing and analytics in industrial environments.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["IoT", "Edge Computing", "Rust", "MQTT", "Kubernetes"],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Our Projects
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Explore our innovative solutions that push the boundaries of what's possible with technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MovingBorder duration={3000} className="rounded-xl overflow-hidden h-full">
                <div className="overflow-hidden h-full border border-primary/10 rounded-xl bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 mix-blend-overlay z-10" />
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                      {project.title}
                    </h3>
                    <p className="text-foreground/80 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-cyan-500 text-cyan-500 hover:bg-cyan-950/10"
                    >
                      View Project <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </MovingBorder>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

