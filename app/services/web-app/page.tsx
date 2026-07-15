"use client"

import { ArrowLeft, ArrowRight, ChevronRight, Code, Smartphone, Monitor, Zap, Shield, Users, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import BlobBackground from "@/components/blob-background"

export default function WebAppPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <BlobBackground />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col max-w-5xl mx-auto">
            <Link 
              href="/services" 
              className="flex items-center text-sm text-foreground/60 hover:text-foreground mb-6 sm:mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all services
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500">
                  Web & App Rework
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Modernize Your
                  <span className="block text-rose-500">Digital Presence</span>
                </h1>
              </div>
              
              <p className="text-base sm:text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl">
                Transform your existing web and mobile applications with our comprehensive rework services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-8"
              >
                <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-rose-500/5 to-pink-500/5 border border-rose-500/10">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Our Approach</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      {
                        icon: <Code className="h-6 w-6 text-rose-500" />,
                        title: "Code Modernization",
                        description: "Update legacy code to modern standards"
                      },
                      {
                        icon: <Smartphone className="h-6 w-6 text-rose-500" />,
                        title: "Responsive Design",
                        description: "Ensure optimal experience across devices"
                      },
                      {
                        icon: <Monitor className="h-6 w-6 text-rose-500" />,
                        title: "UI/UX Enhancement",
                        description: "Improve user interface and experience"
                      }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0 rounded-lg p-2 bg-rose-500/10">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold mb-1">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-foreground/70">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-8"
              >
                <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-rose-500/5 to-pink-500/5 border border-rose-500/10">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Key Benefits</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      {
                        icon: <Zap className="h-6 w-6 text-rose-500" />,
                        title: "Performance Boost",
                        description: "Faster loading times and better efficiency"
                      },
                      {
                        icon: <Shield className="h-6 w-6 text-rose-500" />,
                        title: "Enhanced Security",
                        description: "Latest security measures and protocols"
                      },
                      {
                        icon: <Users className="h-6 w-6 text-rose-500" />,
                        title: "User Satisfaction",
                        description: "Improved engagement and retention"
                      }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0 rounded-lg p-2 bg-rose-500/10">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold mb-1">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-foreground/70">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-rose-500/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Our Rework Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                {
                  number: "01",
                  title: "Analysis",
                  description: "Evaluate current system and identify areas for improvement"
                },
                {
                  number: "02",
                  title: "Planning",
                  description: "Develop comprehensive modernization strategy"
                },
                {
                  number: "03",
                  title: "Implementation",
                  description: "Execute planned improvements and updates"
                },
                {
                  number: "04",
                  title: "Testing",
                  description: "Ensure quality and performance standards"
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-rose-500/5 to-pink-500/5 border border-rose-500/10"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-rose-500 mb-3 sm:mb-4">{step.number}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/70">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Stack */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Modern Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Frontend",
                  items: ["React", "Next.js", "Vue.js", "Angular"]
                },
                {
                  title: "Backend",
                  items: ["Node.js", "Python", "Java", "Go"]
                },
                {
                  title: "Mobile",
                  items: ["React Native", "Flutter", "Swift", "Kotlin"]
                },
                {
                  title: "Cloud",
                  items: ["AWS", "Azure", "Google Cloud", "Docker"]
                }
              ].map((stack, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl p-6 sm:p-8 bg-gradient-to-br from-rose-500/5 to-pink-500/5 border border-rose-500/10"
                >
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{stack.title}</h3>
                  <ul className="space-y-2">
                    {stack.items.map((item, j) => (
                      <motion.li
                        key={j}
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="flex-shrink-0 rounded-full p-1 bg-rose-500/10 text-rose-500">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                        <span className="text-xs sm:text-sm text-foreground/80">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-6 sm:p-8 md:p-12 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 blur-xl" />
              <div className="relative">
                <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                  <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-rose-500" />
                  <h3 className="text-xl sm:text-2xl font-bold">Ready to modernize your applications?</h3>
                </div>
                <p className="text-sm sm:text-base text-foreground/70 mb-6 sm:mb-8 max-w-2xl">
                  Let's discuss how we can help you transform your digital presence and enhance your user experience.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transition-all duration-300 hover:opacity-90"
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    Contact us for a consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Next Service Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Explore our services</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                Discover how our comprehensive service offerings can help your business grow
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-6 md:mt-0"
            >
              <Link href="/services" className="flex items-center">
                View all services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 