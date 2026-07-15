"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Briefcase,
  Gamepad2,
  PhoneCall,
  GraduationCap,
  Smartphone,
} from "lucide-react"
import { projects as sharedProjects } from "@/lib/portfolio-data"
import type { Project as SharedProject } from "@/lib/portfolio-data"
import React from "react"

// Icon lookup
const iconComponents: Record<string, React.ReactNode> = {
  PhoneCall: <PhoneCall className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
  Gamepad2: <Gamepad2 className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  Smartphone: <Smartphone className="h-5 w-5" />,
}

// ─────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────

function ProjectCard({ project, index }: { project: SharedProject; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const isEven = index % 2 === 0
  const icon = iconComponents[project.iconName]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      <Link href={`/portfolio/${project.slug}`}>
        <div
          className={`relative w-full min-h-[70vh] md:min-h-[80vh] rounded-[2rem] border border-white/[0.06] overflow-hidden flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } transition-all duration-700 hover:border-white/[0.15] shadow-[0_20px_60px_rgba(0,0,0,0.4)] cursor-pointer`}
        >
          {/* Visual Area */}
          <div className="relative w-full md:w-[60%] min-h-[40vh] md:min-h-full overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-700`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-32 h-32 md:w-48 md:h-48 rounded-3xl flex items-center justify-center border border-white/10 bg-white/[0.03] group-hover:scale-110 transition-transform duration-700"
                style={{ color: project.accent }}
              >
                <div className="scale-[2.5] md:scale-[3.5] opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                  {icon}
                </div>
              </div>
            </div>
            {project.featured && (
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold bg-finova-cyan/10 text-finova-cyan border border-finova-cyan/30 uppercase tracking-widest">
                Featured
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="relative w-full md:w-[40%] p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/[0.02]">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at 50% 50%, ${project.accent}08, transparent 70%)`,
              }}
            />

            <div className="relative z-10 flex flex-col gap-6">
              <span
                className={`self-start px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-widest ${project.tagColor}`}
              >
                {project.category}
              </span>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
                {project.title}
              </h3>

              <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-white/40"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-4 text-white/60 group-hover:text-white transition-colors duration-500">
                <span className="font-mono text-sm tracking-widest uppercase font-bold">
                  View Case Study
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function PortfolioShowcase() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="relative overflow-hidden bg-finova-midnight min-h-screen">
      {/* Background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-finova-cyan/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-finova-magenta/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none z-0" />

      {/* HERO */}
      <section ref={heroRef} className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 mb-8 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
            >
              <span className="text-xs uppercase tracking-widest text-finova-cyan font-mono font-bold">
                Selected Work
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Our Portfolio
            </h1>

            <p className="text-xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto">
              Intelligent experiences, engineered with precision. AI-driven architectures and
              full-stack solutions that solve real business challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col gap-12 md:gap-16 max-w-[1400px] mx-auto">
            {sharedProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 relative border-t border-white/5 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-finova-cyan/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden bg-[#0a0a0f]/95 border border-white/10 p-10 md:p-20 text-center max-w-5xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-finova-cyan/5 via-transparent to-finova-magenta/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-finova-cyan/10 border border-finova-cyan/30 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                <Briefcase className="w-8 h-8 text-finova-cyan" />
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter text-white">
                Ready to build something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-lightBlue">
                  Extraordinary?
                </span>
              </h2>

              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                Whether you need a custom AI solution, an enterprise platform, or a modern digital
                presence — we&apos;re ready to engineer your vision into reality.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full relative px-8 py-6 bg-white/[0.03] border border-white/10 rounded-xl text-white overflow-hidden group/btn transition-all duration-300 hover:border-finova-cyan shadow-[0_0_0_rgba(14,165,233,0)] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:bg-transparent">
                    <div className="absolute inset-0 bg-gradient-to-r from-finova-cyan/20 to-finova-magenta/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 font-bold tracking-widest uppercase flex items-center justify-center gap-3 text-white/90 group-hover/btn:text-white transition-colors">
                      Start a Project <ArrowRight className="w-4 h-4 text-finova-cyan group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full relative px-8 py-6 bg-transparent border border-white/10 rounded-xl text-white overflow-hidden hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <span className="font-bold tracking-widest uppercase flex items-center justify-center gap-3 text-white/70 hover:text-white transition-colors">
                      View Services <ChevronRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
