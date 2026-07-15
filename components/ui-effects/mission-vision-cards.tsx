"use client"

import { motion } from "framer-motion"
import { ArrowRight, Target, Eye } from "lucide-react"
import Link from "next/link"

interface CardProps {
  title: string
  content: string
  icon: "mission" | "vision"
  gradient: string
}

const Card = ({ title, content, icon, gradient }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative p-8 rounded-3xl bg-[#080e24]/80 border border-white/10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-0`} />
      
      {/* Top Border Highlight */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${gradient} opacity-50`} />

      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex flex-row items-center gap-4 mb-6">
          {/* SVG Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-500`}
          >
            {icon === "mission" ? (
              <Target className="w-7 h-7 text-finova-cyan group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <Eye className="w-7 h-7 text-finova-magenta group-hover:scale-110 transition-transform duration-500" />
            )}
          </motion.div>

          {/* Title Section */}
          <div className="flex-1">
            <div className="mb-1">
              <span className={`text-xs font-mono font-bold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {icon === "mission" ? "Our Purpose" : "Our Aspiration"}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="relative pl-4 border-l-2 border-white/10 group-hover:border-white/30 transition-colors duration-500">
          <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 group-hover:text-white/80 transition-colors duration-500">
            {content}
          </p>
        </div>

        <div className="flex items-center text-white/40 group-hover:text-white transition-colors duration-300">
          <Link href="/contact" className="flex items-center text-sm font-bold tracking-widest uppercase gap-2 group/link">
            Learn more
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export const MissionVisionCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-12 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card
          title="Our Mission"
          content="To empower businesses through intelligent automation and powerful software solutions. We combine AI with custom engineering to streamline operations, improve efficiency, and unlock lasting business value."
          icon="mission"
          gradient="from-finova-cyan to-finova-blue"
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card
          title="Our Vision"
          content="To lead the future of business automation, where every team has the tools to run faster, more efficiently, and more meaningfully."
          icon="vision"
          gradient="from-finova-magenta to-finova-purple"
        />
      </motion.div>
    </div>
  )
}