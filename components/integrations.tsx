"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const techStack = [
  {
    category: "Frontend",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Python", "Java", "Go"],
  },
  {
    category: "AI/ML",
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face"],
  },
  {
    category: "Cloud",
    technologies: ["AWS", "Azure", "Google Cloud", "Docker"],
  },
]

export default function Integrations() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Tech Stack</h2>
          <p className="text-foreground/70">
            Built with cutting-edge technologies to deliver exceptional performance and reliability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((stack, index) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-4">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.technologies.map((tech) => (
                    <li key={tech} className="text-foreground/70">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 