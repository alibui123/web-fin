"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Code, Globe, BarChart, Database, Server, Shield, Bot, Cpu } from "lucide-react"
import Link from "next/link"
import { RotatingBorder } from "./ui-effects/rotating-border"

const services = [
  {
    icon: <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />,
    title: "AI Solutions",
    description:
      "Custom AI models, machine learning pipelines, and intelligent automation to transform your business processes.",
    path: "/services/ai-solutions",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Code className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />,
    title: "Full-Stack Development",
    description: "End-to-end web and mobile application development with cutting-edge technologies and frameworks.",
    path: "/services/full-stack-development",
    gradient: "from-cyan-500 to-purple-500"
  },
  {
    icon: <Server className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />,
    title: "DevOps Excellence",
    description: "Streamlined CI/CD pipelines, infrastructure as code, and cloud-native deployment strategies.",
    path: "/services/devops-excellence",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />,
    title: "Enterprise IT",
    description: "Bespoke software solutions tailored to your specific business needs and challenges.",
    path: "/services/custom-software",
    gradient: "from-pink-500 to-blue-500"
  }
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <section id="services" className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 bg-[#00101F] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-col items-start">
              <p className="text-cyan-400 uppercase font-medium tracking-wide text-sm sm:text-base mb-1 sm:mb-2">OUR CAPABILITIES</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-300 mb-4 sm:mb-6">Our Services</h2>
              <p className="text-gray-300 max-w-3xl text-base sm:text-lg">
                We deliver cutting-edge technology solutions to help your business thrive in the digital age.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <RotatingBorder 
                  duration={15}
                  gradient={service.gradient}
                  containerClassName="h-full"
                >
                  <div className="pl-3 sm:pl-4 md:pl-5 border-l-2 border-cyan-400 h-full py-3 sm:py-4 pr-3 sm:pr-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                      {service.icon}
                      <span>{service.title}</span>
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">
                      {service.description}
                    </p>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors text-xs sm:text-sm whitespace-nowrap group"
                    >
                      Learn more
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </RotatingBorder>
              </div>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-10 pl-3 sm:pl-5">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 border border-cyan-400 text-cyan-400 rounded-md hover:bg-cyan-400/10 transition-colors group text-xs sm:text-sm"
            >
              <span>View all Services</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 bg-[#00101F] text-white">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-col items-start">
            <p className="text-cyan-400 uppercase font-medium tracking-wide text-sm sm:text-base mb-1 sm:mb-2">OUR CAPABILITIES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-300 mb-4 sm:mb-6">Our Services</h2>
            <p className="text-gray-300 max-w-3xl text-base sm:text-lg">
              We deliver cutting-edge technology solutions to help your business thrive in the digital age.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <RotatingBorder 
                duration={15}
                gradient={service.gradient}
                containerClassName="h-full"
              >
                <div className="pl-3 sm:pl-4 md:pl-5 border-l-2 border-cyan-400 h-full py-3 sm:py-4 pr-3 sm:pr-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                    {service.icon}
                    <span>{service.title}</span>
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">
                    {service.description}
                  </p>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors text-xs sm:text-sm whitespace-nowrap group"
                  >
                    Learn more
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </RotatingBorder>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 sm:mt-10 pl-3 sm:pl-5">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 border border-cyan-400 text-cyan-400 rounded-md hover:bg-cyan-400/10 transition-colors group text-xs sm:text-sm"
          >
            <span>View all Services</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

