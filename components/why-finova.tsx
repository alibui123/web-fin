"use client"

import { motion } from "framer-motion"
import { ArrowRight, Hexagon } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    title: "Expert Team",
    subtitle: "Industry Excellence",
    description: "Our team consists of elite engineers with years of experience in delivering cutting-edge enterprise solutions.",
    color: "from-finova-cyan to-finova-blue",
    glow: "rgba(14,165,233,0.5)"
  },
  {
    title: "Innovation First",
    subtitle: "Future-Ready",
    description: "We continuously innovate and implement the latest AI and Cloud technologies to keep you ahead of the competition.",
    color: "from-finova-magenta to-finova-purple",
    glow: "rgba(217,70,239,0.5)"
  },
  {
    title: "Enterprise Security",
    subtitle: "Data Protection",
    description: "Your data security is our priority, with military-grade protection, blockchain auth, and strict compliance measures.",
    color: "from-finova-teal to-finova-lightBlue",
    glow: "rgba(54,183,215,0.5)"
  },
  {
    title: "24/7 Support",
    subtitle: "Always Available",
    description: "Round-the-clock dedicated support team and AI agents ensuring your systems run smoothly at all times.",
    color: "from-finova-blue to-finova-purple",
    glow: "rgba(59,130,246,0.5)"
  },
]

export default function WhyFinova() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-24"
        >
          <div className="font-mono text-xs tracking-[0.3em] uppercase border border-white/10 bg-white/[0.03] px-6 py-2 rounded-full text-white/70 shadow-[0_0_15px_rgba(255,255,255,0.05)] inline-block mb-6">
            The Finova Advantage
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg sm:text-xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto">
            We combine unparalleled technical expertise with relentless innovation to deliver solutions that redefine what's possible for your enterprise.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={benefit.title} variants={itemVariants} className="h-full">
              <div className="relative p-8 h-full rounded-[2rem] border border-white/[0.08] bg-white/[0.03] group hover:border-white/[0.2] transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] will-change-transform">
                
                {/* Neon Hover Background Glow */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} 
                />

                <div className="relative z-10 flex-grow space-y-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} border border-white/20 flex items-center justify-center shadow-[0_0_15px_${benefit.glow}]`}>
                     <Hexagon className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-2 block">
                      {benefit.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{benefit.title}</h3>
                  </div>
                  
                  <div className="relative pl-4 border-l border-white/10 group-hover:border-white/30 transition-colors">
                    <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-white/5 group-hover:border-white/10">
                  <Link href="/consultation" className="inline-flex items-center gap-2 group/link">
                    <span className="font-mono text-xs tracking-widest uppercase text-white/70 group-hover/link:text-white transition-colors">
                      Learn More
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/70 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-20"
        >
          <Link href="/consultation" className="inline-block group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-finova-cyan to-finova-magenta rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/20 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-white/40 hover:scale-105">
              <span className="font-mono text-sm tracking-[0.2em] uppercase text-white font-bold relative z-10">
                Schedule a Consultation
              </span>
              <ArrowRight className="w-5 h-5 text-white relative z-10 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  )
} 