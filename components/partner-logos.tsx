"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const logos = [
  { src: "/partners/logo1.png", alt: "Partner 1" },
  { src: "/partners/logo2.png", alt: "Partner 2" },
  { src: "/partners/logo3.png", alt: "Partner 3" },
  { src: "/partners/logo4.png", alt: "Partner 4" },
]

export default function PartnerLogos() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.alt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={50}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 