"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, Eye, Database, Lock, Users, UserCheck, ArrowLeft, ChevronRight } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

const personalInfoItems = [
  "Register on our website",
  "Subscribe to our newsletter",
  "Request a demo or consultation",
  "Fill out a contact form",
  "Send us an email",
]

const autoCollected = [
  "IP address",
  "Browser type",
  "Operating system",
  "Access times",
  "Pages visited",
]

const usageItems = [
  "Provide and maintain our services",
  "Improve our website and services",
  "Communicate with you about our services",
  "Send newsletters and marketing communications",
  "Respond to your inquiries and requests",
  "Monitor and analyze usage patterns",
]

const rightsItems = [
  { icon: Eye, title: "Access your personal information" },
  { icon: Database, title: "Correct inaccurate information" },
  { icon: Users, title: "Request deletion of your information" },
  { icon: Lock, title: "Object to processing of your information" },
  { icon: UserCheck, title: "Request data portability" },
]

export default function PrivacyPolicy() {
  return (
    <div className="bg-finova-midnight min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-finova-magenta/10 blur-3xl opacity-25 rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-finova-cyan/10 blur-3xl opacity-25 rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-finova-cyan transition-colors text-sm font-mono tracking-wider uppercase mb-10 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-magenta/30 bg-finova-magenta/10 mb-8 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
              <ShieldCheck className="w-3.5 h-3.5 text-finova-magenta" />
              <span className="text-xs uppercase tracking-widest text-finova-magenta font-mono font-bold">Legal</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">
              <span className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">Privacy</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-finova-magenta via-finova-purple to-finova-cyan">Policy</span>
            </h1>
            <p className="text-white/40 text-sm font-mono tracking-wider">Last updated: May 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-5xl">

          {/* Introduction */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">1. Introduction</h2>
            <p className="text-white/60 leading-relaxed">
              Welcome to Finova Solutions. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </motion.div>

          {/* Information We Collect */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">2. Information We Collect</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-finova-cyan/10 border border-finova-cyan/20 flex items-center justify-center">
                    <Database className="w-4 h-4 text-finova-cyan" />
                  </div>
                  Personal Information
                </h3>
                <p className="text-white/50 text-sm mb-4">We may collect personal information that you voluntarily provide when you:</p>
                <ul className="space-y-2">
                  {personalInfoItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                      <ChevronRight className="w-3.5 h-3.5 text-finova-cyan mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-finova-magenta/10 border border-finova-magenta/20 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-finova-magenta" />
                  </div>
                  Automatically Collected
                </h3>
                <p className="text-white/50 text-sm mb-4">When you visit our website, we automatically collect:</p>
                <ul className="space-y-2">
                  {autoCollected.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                      <ChevronRight className="w-3.5 h-3.5 text-finova-magenta mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* How We Use */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">3. How We Use Your Information</h2>
            <p className="text-white/60 leading-relaxed mb-6">We use the information we collect to:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {usageItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/60 text-sm">
                  <ChevronRight className="w-4 h-4 text-finova-cyan mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data Security */}
          <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">4. Data Security</h2>
            <p className="text-white/60 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </motion.div>

          {/* Third-Party */}
          <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">5. Third-Party Services</h2>
            <p className="text-white/60 leading-relaxed">
              We may use third-party service providers to help us operate our business and the website or administer activities on our behalf. These third parties may have access to your personal information only to perform these tasks on our behalf.
            </p>
          </motion.div>

          {/* Your Rights */}
          <motion.div custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">6. Your Rights</h2>
            <p className="text-white/60 leading-relaxed mb-6">You have the right to:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rightsItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/70 text-sm">
                    <Icon className="w-4 h-4 text-finova-purple shrink-0" />
                    <span>{item.title}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div custom={6} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">7. Contact Us</h2>
            <p className="text-white/60 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:info@finovasolutions.tech" className="text-finova-cyan hover:underline">info@finovasolutions.tech</a>
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  )
}