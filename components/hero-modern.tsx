"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { SparklesCore } from "./ui-effects/sparkles"
import { TypewriterEffect } from "./ui-effects/typewriter-effect"
import { ArrowRight } from "lucide-react"

export default function HeroModern() {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Update the words array to use Finova brand colors
  const words = [
    {
      text: "Innovate.",
      className: "text-finova-darkBlue dark:text-finova-lightBlue",
    },
    {
      text: "Transform.",
      className: "text-finova-blue dark:text-finova-teal",
    },
    {
      text: "Accelerate.",
      className: "text-finova-lightBlue dark:text-finova-blue",
    },
  ]

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Update SparklesCore to use Finova brand color */}
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={70}
              className="w-full h-full"
              particleColor="#2B8EBE" // Finova light blue
            />
          </motion.div>

          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-24 w-24 md:h-32 md:w-32"
            >
              <Image src="/images/icon.png" alt="Finova Icon" fill className="object-contain" />
            </motion.div>
          </div>

          <div className="text-center mb-8">
            <TypewriterEffect words={words} className="text-4xl md:text-5xl lg:text-6xl font-bold" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[600px] text-center mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Empowering Digital Innovation
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Transforming ideas into powerful digital solutions.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="#contact">
              <Button
                size="lg"
                className="text-lg px-8 finova-gradient hover:opacity-90 text-white border-0 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-finova-blue to-finova-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-finova-teal text-finova-teal hover:bg-finova-teal/10 backdrop-blur-sm"
              onClick={() => {
                const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                if (chatButton) chatButton.click();
              }}
            >
              Talk to Awaaz
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <div className="w-8 h-12 rounded-full border-2 border-finova-teal/50 flex justify-center">
              <motion.div
                className="w-1 h-3 bg-finova-teal rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

