"use client"

import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import BlobBackground from "@/components/blob-background"

export default function DigitalTransformationPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <BlobBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col max-w-5xl mx-auto">
            <Link 
              href="/services" 
              className="flex items-center text-sm text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all services
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                  Digital Transformation
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Digital Transformation
                  <span className="block text-emerald-500">for Modern Businesses</span>
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl">
                Transform your business operations with our comprehensive digital solutions. We help you navigate the digital landscape and implement cutting-edge technologies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10"
              >
                <h2 className="text-2xl font-bold mb-4">About Digital Transformation</h2>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Our digital transformation services help businesses modernize their operations, improve efficiency, and stay competitive in the digital age. We provide end-to-end solutions that drive growth and innovation.
                </p>
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              </motion.div>
              
              {/* Features Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10"
              >
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-4">
                  {[
                    "Cloud Migration and Optimization",
                    "Digital Process Automation",
                    "Data Analytics and Business Intelligence",
                    "Customer Experience Enhancement"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 rounded-full p-1 bg-emerald-500/10 text-emerald-500">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Benefits Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10"
              >
                <h3 className="text-xl font-bold mb-4">Business Benefits</h3>
                <ul className="space-y-4">
                  {[
                    "Increased operational efficiency",
                    "Enhanced customer engagement",
                    "Improved decision-making",
                    "Reduced operational costs",
                    "Future-proof business model"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 rounded-full p-1 bg-emerald-500/10 text-emerald-500">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-2xl p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
              >
                <h3 className="text-xl font-bold mb-4">Ready to transform your business?</h3>
                <p className="text-foreground/70 mb-6">
                  Let's discuss how our digital transformation solutions can help your organization thrive in the digital age.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transition-all duration-300 w-full hover:opacity-90"
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    Contact us for a consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Next Service Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Explore our services</h2>
              <p className="text-foreground/70">
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