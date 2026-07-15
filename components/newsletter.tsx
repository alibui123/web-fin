"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SparklesCore } from "./ui-effects/sparkles"

export default function Newsletter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      // In a real app, you would send this to your API
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="newsletterSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#2B8EBE" // Finova light blue
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-background/50 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 finova-text-gradient">Stay Updated with Tech Trends</h2>

            <p className="text-xl text-foreground/80 mb-8">
              Subscribe to our newsletter for the latest insights on AI, full-stack development, and digital innovation.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 text-green-500 p-4 rounded-lg mb-6"
              >
                Thank you for subscribing! We'll be in touch soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow border-primary/20 focus:border-finova-lightBlue bg-background/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="finova-gradient hover:opacity-90 text-white border-0">
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-sm text-foreground/60 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

