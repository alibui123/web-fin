"use client"

import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"

export default function SocialLinks() {
  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-foreground/70 mb-8">
            Follow us on social media to stay updated with our latest news and updates.
          </p>
          <motion.a
            href="https://www.linkedin.com/company/finovasolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-finova-teal transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="h-6 w-6" />
            <span>LinkedIn</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
} 