"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  Code, Server, Bot, Cpu,
  Building2, Zap, ChevronDown
} from "lucide-react"
import Link from "next/link"
import { serviceGroups, getSubservicesByParent } from "@/lib/services-data"

const serviceIcons: Record<string, any> = {
  "full-stack-development": Code,
  "ai-ml-engineering": Bot,
  "blockchain-development": Server,
  "iot-embedded-systems": Cpu,
  "enterprise-it-solutions": Building2,
  "digital-transformation": Zap,
};

const services = serviceGroups.map(group => ({
  ...group,
  icon: serviceIcons[group.id] || Zap,
  shadow: group.glow,
  subServices: getSubservicesByParent(group.id)
}))

function ServiceCard({ service, index }: { service: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full group will-change-transform"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-finova-cyan/20 to-finova-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10" />
      
      <div className="relative h-full w-full bg-white/[0.03] border border-white/10 group-hover:border-white/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] rounded-3xl p-8 sm:p-10 flex flex-col overflow-hidden transition-all duration-500">
        
        <div className="absolute inset-0 bg-gradient-to-br from-finova-cyan/5 to-finova-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white mb-8 self-start transition-all duration-300 group-hover:scale-105 group-hover:border-finova-cyan/30 group-hover:bg-finova-cyan/10">
            {service.icon && <service.icon className="h-10 w-10 text-white/60 group-hover:text-finova-cyan transition-colors" />}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-finova-cyan group-hover:to-finova-magenta transition-all duration-300">{service.title}</h3>
          <p className="text-white/60 mb-8 leading-relaxed flex-grow group-hover:text-white/80 transition-colors">{service.description}</p>

          <div className="mt-auto pt-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 outline-none w-fit group/btn"
            >
              <span className="bg-white/5 group-hover/btn:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-colors">
                {isOpen ? "Hide Details" : "View Details"}
              </span>
              <div className="p-2 rounded-lg bg-white/5 group-hover/btn:bg-white/10 border border-white/10 transition-colors">
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-finova-cyan' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-4">
                    {service.subServices.map((sub: any, i: number) => (
                      <motion.li 
                        key={sub.slug} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link href={`/services/${service.id}/${sub.slug}`} className="flex flex-col gap-1 group/item outline-none">
                          <div className="flex items-center gap-3 text-white/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover/item:bg-white transition-colors" />
                            <span className="text-sm font-medium tracking-wide group-hover/item:text-white transition-colors">
                              {sub.title}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 ml-[18px] group-hover/item:text-white/70 transition-colors">
                            {sub.description}
                          </p>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesModern() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="services" className="py-14 md:py-20 relative bg-finova-midnight overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="font-mono text-sm mb-4 text-finova-magenta tracking-widest uppercase border border-finova-magenta/30 bg-finova-magenta/10 inline-block px-4 py-1 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.2)]">
            Technical Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Our Services
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}