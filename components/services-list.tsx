"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { serviceGroups, getSubservicesByParent } from "@/lib/services-data"

const NeuralNetwork3D = dynamic(() => import("./ui-effects/neural-network-3d"), { ssr: false })
const IoTGlobe3D = dynamic(() => import("./ui-effects/iot-globe-3d"), { ssr: false })
const FullStack3D = dynamic(() => import("./ui-effects/full-stack-3d"), { ssr: false })
const Blockchain3D = dynamic(() => import("./ui-effects/blockchain-3d"), { ssr: false })
const EnterpriseIT3D = dynamic(() => import("./ui-effects/enterprise-it-3d"), { ssr: false })
const DigitalTransformation3D = dynamic(() => import("./ui-effects/digital-transformation-3d"), { ssr: false })

const services = serviceGroups.map((service) => ({
  ...service,
  subServices: getSubservicesByParent(service.id).map((subservice) => ({
    slug: subservice.slug,
    name: subservice.title,
    description: subservice.description,
  })),
}))

function ServiceCard({
  service,
  index,
  activeSubservice,
  onSelectSubservice,
}: {
  service: typeof services[0]
  index: number
  activeSubservice: string | null
  onSelectSubservice: (slug: string) => void
}) {
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative w-full group will-change-transform"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-finova-cyan to-finova-magenta opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-[2rem] -z-10" />
      <div className="relative rounded-[2rem] border border-white/[0.08] bg-white/[0.03] overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/[0.2] hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
        
        {/* Top Edge Highlight */}
        <div 
          className="absolute top-0 left-0 w-full h-[1px] opacity-30 bg-gradient-to-r from-finova-cyan to-finova-magenta"
        />

        <div className={`relative p-8 sm:p-10 md:p-16 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-stretch`}>
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div variants={childVariants} className="inline-block mb-4">
              <div className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase border border-white/10 bg-white/[0.03] px-4 py-1.5 rounded-full text-white/70 flex items-center gap-3 w-fit">
                <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${service.color} animate-pulse`} />
                {service.badge}
              </div>
            </motion.div>
            
            <motion.h2 
              variants={childVariants}
              className="text-4xl sm:text-5xl md:text-5xl xl:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-5 leading-[1.1]"
            >
              {service.title}
            </motion.h2>
            
            <motion.div variants={childVariants} className={`h-[2px] w-16 bg-gradient-to-r ${service.color} mb-6`} />
            
            <motion.p variants={childVariants} className="text-base sm:text-lg text-white/60 font-light leading-relaxed mb-8 max-w-xl">
              {service.description}
            </motion.p>

            {/* Sub Services Grid */}
            <motion.div variants={childVariants} className="grid sm:grid-cols-2 gap-3 mb-10">
              {service.subServices.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/services/${service.id}/${sub.slug}`}
                  onMouseDown={() => onSelectSubservice(sub.slug)}
                  onClick={() => onSelectSubservice(sub.slug)}
                  aria-current={activeSubservice === sub.slug ? "page" : undefined}
                  className={cn(
                    "p-4 rounded-xl border transition-colors",
                    activeSubservice === sub.slug
                      ? "border-white/30 bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                      : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1]"
                  )}
                >
                  <h4 className="text-sm font-semibold text-white/90 mb-1">{sub.name}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">{sub.description}</p>
                </Link>
              ))}
            </motion.div>

            <motion.div variants={childVariants}>
              <Link href={service.href} className="inline-flex group/btn relative">
                <div className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.02]">
                  <span className="font-mono text-xs tracking-[0.1em] uppercase text-white font-medium relative z-10">
                    Explore Solutions
                  </span>
                  <ArrowRight className="w-4 h-4 text-white relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Visual / Illustration Side */}
          <div className="w-full lg:w-1/2 flex justify-center items-center h-[300px] sm:h-[400px] lg:h-auto min-h-[300px]">
            <div className="relative w-full h-full min-h-[300px] rounded-[2rem] border border-white/[0.1] bg-[#050505] shadow-xl flex items-center justify-center overflow-hidden transform-gpu group-hover:border-white/[0.2] transition-colors duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-[0.05]`} />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30 pointer-events-none" />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                
                {service.id === "full-stack-development" && <FullStack3D />}
                
                {service.id === "ai-ml-engineering" && <NeuralNetwork3D />}
                
                {service.id === "blockchain-development" && <Blockchain3D />}
                
                {service.id === "iot-embedded-systems" && <IoTGlobe3D />}
                
                {service.id === "enterprise-it-solutions" && <EnterpriseIT3D />}
                
                {service.id === "digital-transformation" && <DigitalTransformation3D />}
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesList() {
  const [activeSubservice, setActiveSubservice] = useState<string | null>(null)
  return (
    <section className="relative w-full py-20 md:py-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 md:gap-32">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            activeSubservice={activeSubservice}
            onSelectSubservice={setActiveSubservice}
          />
        ))}
      </div>
    </section>
  )
}