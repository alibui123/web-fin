"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BecomePartner() {
  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Join our network of partners and unlock new opportunities for growth and innovation.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="finova-gradient hover:opacity-90 text-white border-0"
              asChild
            >
              <Link href="/contact">
                Contact Us to Partner
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 