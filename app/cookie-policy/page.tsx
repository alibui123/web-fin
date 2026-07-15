"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Cookie, Shield, BarChart3, Settings, Ban, Mail, ArrowLeft, ChevronRight } from "lucide-react"

const cookieTypes = [
  {
    icon: Shield,
    title: "Essential Cookies",
    color: "finova-cyan",
    description:
      "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.",
  },
  {
    icon: BarChart3,
    title: "Performance Cookies",
    color: "finova-magenta",
    description:
      "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.",
  },
  {
    icon: Settings,
    title: "Functional Cookies",
    color: "finova-purple",
    description:
      "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
  },
  {
    icon: Cookie,
    title: "Targeting Cookies",
    color: "finova-lightBlue",
    description:
      "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
  },
]

const browserLinks = [
  { name: "Google Chrome", href: "https://support.google.com/chrome/answer/95647" },
  { name: "Firefox", href: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" },
  { name: "Microsoft Edge", href: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
  { name: "Safari", href: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" },
]

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function CookiePolicy() {
  return (
    <div className="bg-finova-midnight min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-finova-cyan/10 blur-3xl opacity-25 rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-finova-purple/10 blur-3xl opacity-25 rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-finova-cyan transition-colors text-sm font-mono tracking-wider uppercase mb-10 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 mb-8 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
              <Cookie className="w-3.5 h-3.5 text-finova-cyan" />
              <span className="text-xs uppercase tracking-widest text-finova-cyan font-mono font-bold">Legal</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">
              <span className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">Cookie</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple">Policy</span>
            </h1>
            <p className="text-white/40 text-sm font-mono tracking-wider">Last updated: May 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-5xl">

          {/* What Are Cookies */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">1. What Are Cookies</h2>
            <p className="text-white/60 leading-relaxed">
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the site or a third-party to recognize you and make your next visit easier and more useful to you.
            </p>
          </motion.div>

          {/* How We Use Cookies */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">2. How We Use Cookies</h2>
            <p className="text-white/60 leading-relaxed mb-6">We use cookies for the following purposes:</p>
            <ul className="space-y-3">
              {["To enable certain functions of the website", "To provide analytics", "To store your preferences", "To enable advertisement delivery, including behavioral advertising"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60">
                  <ChevronRight className="w-4 h-4 text-finova-cyan mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Types of Cookies - Bento Grid */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="mb-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6 px-2">3. Types of Cookies We Use</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {cookieTypes.map((type, i) => {
                const Icon = type.icon
                const colorMap: Record<string, string> = {
                  "finova-cyan": "text-finova-cyan border-finova-cyan/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]",
                  "finova-magenta": "text-finova-magenta border-finova-magenta/20 shadow-[0_0_15px_rgba(217,70,239,0.1)]",
                  "finova-purple": "text-finova-purple border-finova-purple/20 shadow-[0_0_15px_rgba(147,51,234,0.1)]",
                  "finova-lightBlue": "text-finova-lightBlue border-finova-lightBlue/20 shadow-[0_0_15px_rgba(43,142,190,0.1)]",
                }
                return (
                  <motion.div key={type.title} custom={i + 3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                    className="group rounded-3xl bg-white/[0.03] border border-white/10 p-8 overflow-hidden hover:border-white/20 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 ${colorMap[type.color]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{type.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{type.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Managing Cookies */}
          <motion.div custom={7} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">4. Managing Cookies</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Most browsers allow you to refuse to accept cookies and to delete cookies. You can obtain up-to-date information about blocking and deleting cookies via these links:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {browserLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-white/70 hover:text-finova-cyan hover:border-finova-cyan/30 transition-all duration-300 text-sm font-semibold group/link">
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover/link:text-finova-cyan group-hover/link:translate-x-1 transition-all" />
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Impact + Contact */}
          <motion.div custom={8} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">5. Impact of Disabling Cookies</h2>
            <p className="text-white/60 leading-relaxed">
              Blocking all cookies will have a negative impact upon the usability of many websites. If you block cookies, you will not be able to use all the features on our website.
            </p>
          </motion.div>

          <motion.div custom={9} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">6. Additional Information</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              For more information about how we use cookies, please contact us at:{" "}
              <a href="mailto:info@finovasolutions.tech" className="text-finova-cyan hover:underline">info@finovasolutions.tech</a>
            </p>
            <p className="text-white/60 leading-relaxed">
              You can also learn more about cookies at:{" "}
              <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-finova-cyan hover:underline">www.allaboutcookies.org</a>
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  )
}