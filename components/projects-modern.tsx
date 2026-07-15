"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

// Update project colors to match Finova brand
const projects = [
  {
    title: "AI-Powered Analytics Platform",
    description:
      "A comprehensive analytics solution with machine learning capabilities for real-time business insights and predictive modeling.",
    image: "/images/projects/ai-analytics.jpg",
    tags: ["AI/ML", "React", "Python", "TensorFlow", "AWS"],
    color: "from-finova-darkBlue to-finova-lightBlue",
  },
  {
    title: "Blockchain Supply Chain System",
    description:
      "End-to-end supply chain management platform using blockchain technology for transparent and secure tracking.",
    image: "/images/projects/blockchain.jpg",
    tags: ["Blockchain", "Ethereum", "Node.js", "React", "Solidity"],
    color: "from-finova-blue to-finova-teal",
  },
  {
    title: "Intelligent Healthcare Platform",
    description:
      "AI-driven healthcare management system with patient data analysis, medical imaging processing, and predictive diagnostics.",
    image: "/images/projects/healthcare.jpg",
    tags: ["Healthcare AI", "Python", "React", "TensorFlow", "AWS"],
    color: "from-finova-darkBlue to-finova-lightBlue",
  },
  {
    title: "Edge Computing IoT Solution",
    description:
      "Distributed IoT platform leveraging edge computing for real-time data processing and analytics in industrial environments.",
    image: "/images/projects/iot.jpg",
    tags: ["IoT", "Edge Computing", "Rust", "MQTT", "Kubernetes"],
    color: "from-finova-blue to-finova-teal",
  },
]

export default function ProjectsModern() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 finova-text-gradient">Our Projects</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Explore our innovative solutions that push the boundaries of what's possible with technology.
          </p>
        </motion.div>

        <div className="relative">
          {/* Project showcase */}
          <div className="relative h-[600px] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${projects[activeIndex].color}`}
                  style={{ opacity: 0.2 }}
                ></div>

                <div className="relative h-full flex flex-col md:flex-row">
                  {/* Image side */}
                  <div className="md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent to-background/90 md:bg-gradient-to-r md:from-transparent md:to-background"></div>
                    <Image
                      src={projects[activeIndex].image || "/placeholder.svg"}
                      alt={projects[activeIndex].title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content side */}
                  <div className="md:w-1/2 h-1/2 md:h-full p-8 flex flex-col justify-center relative z-20">
                    <div
                      className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${projects[activeIndex].color} text-white text-sm font-medium mb-4`}
                    >
                      Project {activeIndex + 1}/{projects.length}
                    </div>

                    <h3 className="text-3xl font-bold mb-4">{projects[activeIndex].title}</h3>
                    <p className="text-lg mb-6 text-foreground/80">{projects[activeIndex].description}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {projects[activeIndex].tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${projects[activeIndex].color} bg-opacity-10 backdrop-blur-sm`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      className={`bg-gradient-to-r ${projects[activeIndex].color} hover:opacity-90 text-white w-fit`}
                    >
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-30">
              <Button
                variant="outline"
                size="icon"
                onClick={prevProject}
                className="rounded-full backdrop-blur-md bg-background/30 border-primary/20 hover:bg-background/50 z-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextProject}
                className="rounded-full backdrop-blur-md bg-background/30 border-primary/20 hover:bg-background/50 z-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Project indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  activeIndex === index ? `bg-gradient-to-r ${projects[index].color}` : "bg-primary/20"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

