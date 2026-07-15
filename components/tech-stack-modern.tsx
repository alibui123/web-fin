"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Server, Cloud, Cpu, Lock, Braces, Bot } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const techStacks = [
  {
    title: "Artificial Intelligence",
    icon: <Bot className="h-10 w-10" />,
    description: "Cutting-edge AI models and machine learning solutions",
    items: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "Computer Vision", "NLP"],
    color: "from-finova-darkBlue to-finova-lightBlue",
  },
  {
    title: "Frontend Development",
    icon: <Braces className="h-10 w-10" />,
    description: "Modern, responsive user interfaces with the latest frameworks",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    color: "from-finova-blue to-finova-teal",
  },
  {
    title: "Backend Development",
    icon: <Code className="h-10 w-10" />,
    description: "Scalable, high-performance server-side solutions",
    items: ["Node.js", "Python", "Go", "GraphQL", "REST APIs", "Microservices"],
    color: "from-finova-darkBlue to-finova-lightBlue",
  },
  {
    title: "Database Solutions",
    icon: <Database className="h-10 w-10" />,
    description: "Optimized data storage and management systems",
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Supabase", "Firebase"],
    color: "from-finova-blue to-finova-teal",
  },
  {
    title: "DevOps & Infrastructure",
    icon: <Server className="h-10 w-10" />,
    description: "Automated deployment and infrastructure management",
    items: ["Docker", "Kubernetes", "CI/CD", "Terraform", "GitHub Actions", "AWS/Azure/GCP"],
    color: "from-finova-darkBlue to-finova-lightBlue",
  },
  {
    title: "Cloud Services",
    icon: <Cloud className="h-10 w-10" />,
    description: "Leveraging cloud platforms for scalable solutions",
    items: ["AWS", "Google Cloud", "Azure", "Vercel", "Netlify", "Cloudflare"],
    color: "from-finova-blue to-finova-teal",
  },
  {
    title: "Edge Computing",
    icon: <Cpu className="h-10 w-10" />,
    description: "Distributed computing at the network edge",
    items: ["IoT", "Edge Functions", "CDN", "WebAssembly", "Serverless", "5G Integration"],
    color: "from-finova-darkBlue to-finova-lightBlue",
  },
  {
    title: "Security",
    icon: <Lock className="h-10 w-10" />,
    description: "Comprehensive security solutions for digital assets",
    items: ["OAuth", "JWT", "Encryption", "Penetration Testing", "Compliance", "Audit Trails"],
    color: "from-finova-blue to-finova-teal",
  },
]

export default function TechStackModern() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)
  const { theme } = useTheme()

  return (
    <section id="tech-stack" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 finova-text-gradient">Our Tech Stack</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build innovative solutions that drive business transformation.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Tech categories */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-2">
              {techStacks.map((stack, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 backdrop-blur-sm
                    ${
                      activeIndex === index
                        ? `bg-gradient-to-r ${stack.color} bg-opacity-20 shadow-lg`
                        : "hover:bg-background/50"
                    }`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${activeIndex === index ? "text-white" : "text-primary"}`}>{stack.icon}</div>
                    <h3 className={`font-medium ${activeIndex === index ? "text-white" : ""}`}>{stack.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Active tech details */}
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-8 rounded-2xl bg-gradient-to-br ${techStacks[activeIndex].color} relative overflow-hidden`}
              style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              {/* Background blobs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-white/5 to-white/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-white/5 to-white/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-xl bg-white/10 backdrop-blur-md text-white`}>
                    {techStacks[activeIndex].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{techStacks[activeIndex].title}</h3>
                </div>

                <p className="text-lg mb-8 text-white/90">{techStacks[activeIndex].description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {techStacks[activeIndex].items.map((item, i) => (
                    <div key={i} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-center">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

