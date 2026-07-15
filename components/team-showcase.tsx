"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const teamImages = [
  "/team/astafaali.jfif",
  "/team/umarsaleem.jfif",
  "/team/muhammadmehlab.jfif",
  "/team/muhammadehsan.png",
  "/team/aliabbasi.jpeg",
  "/team/moizislam.jfif",
  "/team/habibaimran.jpeg",
  "/team/zaryabahmad.png",
]

// Duplicate images to create a seamless marquee effect
const slidingImages = [...teamImages, ...teamImages, ...teamImages]

export default function TeamShowcase() {
  return (
    <section className="relative py-24 lg:py-32 bg-finova-midnight overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-finova-cyan/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left: Horizontal Sliding Photo Grid */}
          <div className="w-full lg:w-[55%] relative h-[600px] sm:h-[700px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080e24]/40 backdrop-blur-sm">
            {/* Fade overlays for smooth entry/exit */}
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#080e24] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#080e24] to-transparent z-10 pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#080e24] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#080e24] to-transparent z-10 pointer-events-none" />

            <div className="absolute inset-0 flex flex-col justify-center gap-6 py-6">
              {/* Row 1: moving left */}
              <motion.div 
                className="flex gap-6 min-w-max"
                animate={{ x: [0, -1500] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              >
                {slidingImages.map((img, i) => (
                  <div key={`r1-${i}`} className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-[2rem] overflow-hidden shrink-0 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <Image src={img} alt="Team Member" fill className="object-cover object-center" />
                  </div>
                ))}
              </motion.div>
              
              {/* Row 2: moving right */}
              <motion.div 
                className="flex gap-6 min-w-max"
                animate={{ x: [-1500, 0] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
              >
                {[...slidingImages].reverse().map((img, i) => (
                  <div key={`r2-${i}`} className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-[2rem] overflow-hidden shrink-0 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <Image src={img} alt="Team Member" fill className="object-cover object-center" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right: Text and CTA */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[1.05] mb-8"
            >
              Collaborate with our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-blue">amazing team</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white/70 text-xl md:text-2xl font-light mb-12 max-w-md leading-relaxed"
            >
              Take a look at our team – the ones who dare to dream.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/team" prefetch={true}>
                <button className="group relative px-8 py-4 bg-gradient-to-r from-finova-cyan to-finova-blue rounded-full text-white font-bold tracking-widest uppercase overflow-hidden shadow-[0_10px_30px_rgba(14,165,233,0.3)] hover:shadow-[0_15px_40px_rgba(14,165,233,0.5)] transition-all duration-500 hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-3">
                    Meet the Team
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </button>
              </Link>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
