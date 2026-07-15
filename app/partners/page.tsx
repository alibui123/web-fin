"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Handshake,
  Lightbulb,
  Globe,
  Headphones,
  Code2,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Shield,
  Cpu,
} from "lucide-react"

/* ───────── Partner Data ───────── */
const partners = [
  {
    name: "Ministry of IT",
    logo: "/logos/clients/Ministry of IT-LOGO.png",
    needsWhiteBg: true,
    description:
      "Empowering national technology frameworks with scalable, AI-driven solutions and advanced digital infrastructure.",
    category: "Government Partner",
    accent: "finova-blue",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "bg-finova-blue/10 border-finova-blue/20 text-finova-blue",
    icon: BookOpen,
  },
  {
    name: "Kobipal",
    logo: "/logos/clients/Kobi-pal.png",
    needsWhiteBg: true,
    description:
      "Collaborating to deliver next-generation AI, intelligent automation, and fintech services to modern enterprises.",
    category: "Strategic Partner",
    accent: "finova-cyan",
    glowColor: "rgba(14,165,233,0.15)",
    iconBg: "bg-finova-cyan/10 border-finova-cyan/20 text-finova-cyan",
    icon: Handshake,
  },
  {
    name: "Sirius Solutions",
    logo: "/logos/clients/Sirius-Solutions.png",
    description:
      "Partnering to deploy robust telecom infrastructure, customer support operations, and advanced voice AI platforms at scale.",
    category: "Telecom & Operations Partner",
    accent: "finova-magenta",
    glowColor: "rgba(217,70,239,0.15)",
    iconBg: "bg-finova-magenta/10 border-finova-magenta/20 text-finova-magenta",
    icon: Globe,
  },
  {
    name: "Telecom Foundation",
    logo: "/images/partners/telecom.jpg",
    description:
      "A leading organization dedicated to transforming communities through innovative telecommunications solutions and digital infrastructure.",
    category: "Technology Partner",
    accent: "finova-cyan",
    glowColor: "rgba(14,165,233,0.15)",
    iconBg: "bg-finova-cyan/10 border-finova-cyan/20 text-finova-cyan",
    icon: Globe,
  },
  {
    name: "Address of Technology EST.",
    logo: "/images/partners/address.webp",
    description:
      "Specializing in security technology solutions, surveillance systems, and enterprise digital transformation services across the MENA region.",
    category: "Security Partner",
    accent: "finova-magenta",
    glowColor: "rgba(217,70,239,0.15)",
    iconBg: "bg-finova-magenta/10 border-finova-magenta/20 text-finova-magenta",
    icon: Shield,
  },
  {
    name: "Advanza Tech",
    logo: "/images/partners/advanza.jpg",
    description:
      "An innovative technology company focused on advancing digital solutions, enterprise software, and AI-driven automation platforms.",
    category: "Technology Partner",
    accent: "finova-purple",
    glowColor: "rgba(147,51,234,0.15)",
    iconBg: "bg-finova-purple/10 border-finova-purple/20 text-finova-purple",
    icon: Cpu,
  },
]

const benefits = [
  {
    icon: Lightbulb,
    title: "Innovation Leadership",
    description:
      "Access to cutting-edge AI and technology solutions that keep you ahead of the competition.",
    color: "text-finova-cyan",
    borderColor: "border-finova-cyan/20",
    shadowColor: "shadow-[0_0_15px_rgba(14,165,233,0.1)]",
  },
  {
    icon: Globe,
    title: "Market Expansion",
    description:
      "Tap into new markets and customer segments through our established network and reputation.",
    color: "text-finova-magenta",
    borderColor: "border-finova-magenta/20",
    shadowColor: "shadow-[0_0_15px_rgba(217,70,239,0.1)]",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description:
      "Comprehensive technical support and resources to ensure successful implementation.",
    color: "text-finova-purple",
    borderColor: "border-finova-purple/20",
    shadowColor: "shadow-[0_0_15px_rgba(147,51,234,0.1)]",
  },
  {
    icon: Code2,
    title: "Joint Development",
    description:
      "Collaborate on new solutions and features that address evolving market needs.",
    color: "text-finova-lightBlue",
    borderColor: "border-finova-lightBlue/20",
    shadowColor: "shadow-[0_0_15px_rgba(43,142,190,0.1)]",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description:
      "Access to new revenue streams and business opportunities through partnership programs.",
    color: "text-finova-cyan",
    borderColor: "border-finova-cyan/20",
    shadowColor: "shadow-[0_0_15px_rgba(14,165,233,0.1)]",
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description:
      "Regular knowledge transfer sessions and access to our expertise in AI and technology.",
    color: "text-finova-magenta",
    borderColor: "border-finova-magenta/20",
    shadowColor: "shadow-[0_0_15px_rgba(217,70,239,0.1)]",
  },
]

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

/* ───────── Component ───────── */
export default function PartnersPage() {
  const heroRef = useRef(null)
  const partnersRef = useRef(null)
  const benefitsRef = useRef(null)
  const ctaRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const partnersInView = useInView(partnersRef, { once: true, amount: 0.1 })
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.1 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 })

  return (
    <div className="bg-finova-midnight min-h-screen">

      {/* ════════════ HERO ════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden" ref={heroRef}>
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-finova-cyan/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: "translateZ(0)" }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-finova-magenta/10 blur-3xl opacity-25 rounded-full pointer-events-none will-change-transform" style={{ transform: "translateZ(0)" }} />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto flex flex-col items-center"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 mb-8 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
              <Handshake className="w-3.5 h-3.5 text-finova-cyan" />
              <span className="text-xs uppercase tracking-widest text-finova-cyan font-mono font-bold">
                Our Partners
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 uppercase tracking-tighter text-white">
              <span className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                Trusted
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                Partners
              </span>
            </h1>

            <p className="text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              We collaborate with industry leaders to deliver cutting-edge
              solutions and drive innovation in AI and technology services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════ PARTNER CARDS ════════════ */}
      <section className="relative pb-24 overflow-hidden" ref={partnersRef}>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partners.map((partner, index) => {
              const Icon = partner.icon
              return (
                <motion.div
                  key={partner.name}
                  custom={index}
                  initial="hidden"
                  animate={partnersInView ? "visible" : "hidden"}
                  variants={itemVariants}
                  className="group relative rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
                  style={{
                    ["--hover-shadow" as string]: `0 0 30px ${partner.glowColor}`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${partner.glowColor}, transparent 70%)`,
                    }}
                  />
                  {/* Corner glow */}
                  <div
                    className="absolute -right-10 -top-10 w-32 h-32 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundColor:
                        partner.accent === "finova-cyan"
                          ? "#0EA5E9"
                          : partner.accent === "finova-magenta"
                            ? "#D946EF"
                            : "#9333EA",
                    }}
                  />

                  {/* Logo Area */}
                  <div className="relative z-10 p-8 pb-0">
                    <div className="h-[180px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center p-6 overflow-hidden group-hover:border-white/10 group-hover:bg-white/[0.04] transition-colors duration-500 shadow-inner">
                      <div className={`relative w-full h-full flex items-center justify-center rounded-xl transition-colors duration-500 ${(partner as any).needsWhiteBg ? 'bg-white/95 p-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''}`}>
                        {partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className={`object-contain transition-all duration-500 drop-shadow-lg ${(partner as any).needsWhiteBg ? '' : 'brightness-90 group-hover:brightness-110'}`}
                            unoptimized
                          />
                        ) : (
                          <span
                            className={`text-2xl sm:text-3xl font-black uppercase tracking-widest text-center leading-tight ${
                              partner.accent === "finova-cyan"
                                ? "text-finova-cyan drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                                : partner.accent === "finova-magenta"
                                  ? "text-finova-magenta drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]"
                                  : partner.accent === "finova-blue"
                                    ? "text-finova-blue drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    : "text-finova-purple drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                            }`}
                          >
                            {partner.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 pt-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-9 h-9 rounded-xl bg-white/[0.03] border flex items-center justify-center ${partner.iconBg} group-hover:scale-110 transition-transform duration-500`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span
                        className={`text-xs font-bold tracking-widest uppercase font-mono ${
                          partner.accent === "finova-cyan"
                            ? "text-finova-cyan"
                            : partner.accent === "finova-magenta"
                              ? "text-finova-magenta"
                              : "text-finova-purple"
                        }`}
                      >
                        {partner.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">
                      {partner.name}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed flex-1">
                      {partner.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════ WHY PARTNER ════════════ */}
      <section
        className="relative py-24 overflow-hidden border-t border-white/5"
        ref={benefitsRef}
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-finova-purple/10 blur-3xl opacity-25 rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }} />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-finova-cyan/10 blur-3xl opacity-20 rounded-full pointer-events-none" style={{ transform: "translateZ(0)" }} />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 max-w-4xl mx-auto flex flex-col items-center"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-magenta/30 bg-finova-magenta/10 mb-8 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
              <TrendingUp className="w-3.5 h-3.5 text-finova-magenta" />
              <span className="text-xs uppercase tracking-widest text-finova-magenta font-mono font-bold">
                Benefits
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">
              <span className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                Why Partner
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-finova-magenta via-finova-purple to-finova-cyan">
                With Us?
              </span>
            </h2>
            <p className="text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              Join our ecosystem of innovation and growth. Unlock new
              capabilities and market opportunities.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  custom={index}
                  initial="hidden"
                  animate={benefitsInView ? "visible" : "hidden"}
                  variants={itemVariants}
                  className="group relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 overflow-hidden hover:border-white/20 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-white/[0.03] border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 ${benefit.color} ${benefit.borderColor} ${benefit.shadowColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════ BECOME A PARTNER CTA ════════════ */}
      <section
        className="relative py-24 overflow-hidden border-t border-white/5"
        ref={ctaRef}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-finova-cyan/5 via-transparent to-finova-magenta/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-finova-cyan mb-8 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
              <Handshake className="h-9 w-9" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-white">
              Become a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-magenta">
                Partner
              </span>
            </h2>

            <p className="text-white/60 text-lg font-light leading-relaxed max-w-xl mb-10">
              Join our network of partners and unlock new opportunities for
              growth and innovation. Let&apos;s build the future together.
            </p>

            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white overflow-hidden group transition-all duration-300 hover:border-finova-cyan shadow-[0_0_0_rgba(14,165,233,0)] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-finova-cyan/20 to-finova-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 font-bold tracking-widest text-sm uppercase flex items-center gap-3 text-white/90 group-hover:text-white transition-colors">
                Contact Us to Partner
                <ArrowRight className="w-4 h-4 text-finova-cyan group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}