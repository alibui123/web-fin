"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Scale, Briefcase, UserCheck, Copyright, AlertTriangle, Gavel, Globe, ArrowLeft, ChevronRight } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

const licenseItems = [
  "Modify or copy the materials",
  "Use the materials for any commercial purpose",
  "Attempt to decompile or reverse engineer any software",
  "Remove any copyright or proprietary notations",
  "Transfer the materials to another person",
]

const obligationItems = [
  { icon: UserCheck, text: "Provide accurate and complete information" },
  { icon: Scale, text: "Maintain the security of your account" },
  { icon: AlertTriangle, text: "Not use the services for any illegal purposes" },
  { icon: Gavel, text: "Comply with all applicable laws and regulations" },
  { icon: Globe, text: "Not interfere with the proper working of the services" },
]

export default function TermsOfService() {
  return (
    <div className="bg-finova-midnight min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-finova-purple/10 blur-3xl opacity-25 rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-finova-magenta/10 blur-3xl opacity-25 rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-finova-cyan transition-colors text-sm font-mono tracking-wider uppercase mb-10 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-purple/30 bg-finova-purple/10 mb-8 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
              <FileText className="w-3.5 h-3.5 text-finova-purple" />
              <span className="text-xs uppercase tracking-widest text-finova-purple font-mono font-bold">Legal</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">
              <span className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">Terms of</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-finova-purple via-finova-magenta to-finova-cyan">Service</span>
            </h1>
            <p className="text-white/40 text-sm font-mono tracking-wider">Last updated: May 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-5xl">

          {/* Agreement */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">1. Agreement to Terms</h2>
            <p className="text-white/60 leading-relaxed">
              By accessing or using Finova Solutions&apos; website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>
          </motion.div>

          {/* Use License */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">2. Use License</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only. Under this license you may not:
            </p>
            <ul className="space-y-3">
              {licenseItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60">
                  <div className="w-5 h-5 mt-0.5 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <span className="text-red-400 text-xs font-bold">✕</span>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Description */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">3. Service Description</h2>
            <p className="text-white/60 leading-relaxed">
              Finova Solutions provides various technology services, including but not limited to AI solutions, software development, and consulting services. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
            </p>
          </motion.div>

          {/* User Obligations */}
          <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">4. User Obligations</h2>
            <p className="text-white/60 leading-relaxed mb-6">As a user of our services, you agree to:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {obligationItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/70 text-sm group hover:border-white/10 transition-colors">
                    <Icon className="w-4 h-4 text-finova-purple shrink-0" />
                    <span>{item.text}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">5. Intellectual Property</h2>
            <p className="text-white/60 leading-relaxed">
              The content, features, and functionality of our services are owned by Finova Solutions and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">6. Limitation of Liability</h2>
            <p className="text-white/60 leading-relaxed">
              In no event shall Finova Solutions be liable for any damages arising out of the use or inability to use our services. This includes but is not limited to damages for loss of profits, data, or other intangible losses.
            </p>
          </motion.div>

          {/* Termination */}
          <motion.div custom={6} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">7. Termination</h2>
            <p className="text-white/60 leading-relaxed">
              We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </motion.div>

          {/* Governing Law */}
          <motion.div custom={7} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">8. Governing Law</h2>
            <p className="text-white/60 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, without regard to its conflict of law provisions.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div custom={8} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">9. Contact Information</h2>
            <p className="text-white/60 leading-relaxed">
              For any questions about these Terms, please contact us at:{" "}
              <a href="mailto:info@finovasolutions.tech" className="text-finova-cyan hover:underline">info@finovasolutions.tech</a>
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  )
}