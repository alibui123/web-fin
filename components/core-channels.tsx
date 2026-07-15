"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Phone,
  MessageCircle,
  Globe,
  Mail,
  FileText,
  Brain,
  Database,
  Building2,
  ArrowRight,
} from "lucide-react"
const inbound = [
  { icon: Phone, label: "Voice" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Globe, label: "Web chat" },
  { icon: Mail, label: "Email" },
  { icon: FileText, label: "Documents" },
]

const coreSteps = [
  { label: "Understand" },
  { label: "Decide and act" },
  { label: "Score and improve" },
]

const systems = [
  { icon: Building2, label: "ERP and Odoo" },
  { icon: Database, label: "CRM" },
  { icon: Database, label: "Databases" },
  { icon: Brain, label: "Internal tools" },
]

export default function CoreChannels() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden border-b border-white/5">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-finova-cyan/10 blur-3xl opacity-40 pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            One core, every channel, inside your systems
          </h2>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            There is no rip and replace here, and no new platform for your team to learn. Our agent
            core sits between your customers and the software you already run.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center text-white/70 text-base md:text-lg font-light leading-relaxed mb-14"
        >
          Requests reach your business in every form, a phone call, a WhatsApp message, a web chat,
          an email, a document. The core reads the request, decides the next step, and carries it out
          where your data actually lives, inside your ERP, your CRM, your records, then checks its
          own work on the way out. One core, many channels, the job finished end to end. That is the
          whole difference between software that tells your team what to do and an agent that does it
          for them.
        </motion.p>

        {/* Three-column flow */}
        <div className="grid lg:grid-cols-[1fr_auto_1.2fr_auto_1fr] gap-4 lg:gap-2 items-stretch max-w-6xl mx-auto">
          {/* In */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-finova-cyan mb-6">
              In
            </p>
            <ul className="space-y-3">
              {inbound.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <item.icon className="w-4 h-4 text-finova-cyan shrink-0" />
                  <span className="text-sm text-white/80">{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center px-1">
            <motion.div
              animate={isInView ? { opacity: [0.3, 1, 0.3], x: [0, 4, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-5 h-5 text-finova-cyan/60" />
            </motion.div>
          </div>

          {/* Core */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl border border-finova-cyan/40 bg-finova-cyan/[0.06] p-6 md:p-8 shadow-[0_0_50px_rgba(14,165,233,0.12)] overflow-hidden"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-finova-cyan/20 blur-3xl rounded-full pointer-events-none" />
            <p className="relative text-xs font-mono font-bold tracking-[0.2em] uppercase text-finova-cyan mb-2">
              The Finova core
            </p>
            <p className="relative text-white/50 text-sm font-light mb-8">
              Understand, decide and act, score and improve
            </p>
            <div className="relative space-y-4">
              {coreSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                  className="relative flex items-center gap-4 rounded-2xl border border-finova-cyan/20 bg-finova-midnight/60 px-5 py-4"
                >
                  <span className="font-mono text-finova-cyan/40 text-sm font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white font-medium">{step.label}</span>
                  {i < coreSteps.length - 1 && (
                    <motion.span
                      className="absolute left-7 -bottom-4 w-px h-4 bg-gradient-to-b from-finova-cyan/50 to-transparent"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center px-1">
            <motion.div
              animate={isInView ? { opacity: [0.3, 1, 0.3], x: [0, 4, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <ArrowRight className="w-5 h-5 text-finova-cyan/60" />
            </motion.div>
          </div>

          {/* Systems */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-finova-cyan mb-6">
              Your systems
            </p>
            <ul className="space-y-3">
              {systems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <item.icon className="w-4 h-4 text-finova-purple shrink-0" />
                  <span className="text-sm text-white/80">{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
