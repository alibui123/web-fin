"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Zap,
  TrendingUp,
  Building,
  Clock,
  Briefcase,
  PhoneCall,
  Globe,
  Gamepad2,
  GraduationCap,
  Smartphone,
} from "lucide-react"
import type { Project } from "@/lib/portfolio-data"
import { projects } from "@/lib/portfolio-data"

const iconMap = {
  PhoneCall: PhoneCall,
  Globe: Globe,
  Gamepad2: Gamepad2,
  GraduationCap: GraduationCap,
  Smartphone: Smartphone,
}

export default function CaseStudyPage({ project }: { project: Project }) {
  const Icon = iconMap[project.iconName]
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden selection:bg-white/20">
      {/* Immersive Ambient Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-20 mix-blend-screen pointer-events-none" style={{ background: `radial-gradient(circle, ${project.accent}, transparent)` }} />
      <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-10 mix-blend-screen pointer-events-none" style={{ background: `radial-gradient(circle, ${project.accent}, transparent)` }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20 pointer-events-none" />

      {/* Top gradient accent bar */}
      <div className={`fixed top-0 left-0 w-full h-1.5 bg-gradient-to-r ${project.gradient} z-50 shadow-[0_0_20px_rgba(255,255,255,0.5)]`} />

      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-32 relative z-10 max-w-6xl">

        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 group text-sm font-bold tracking-widest uppercase"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero Section - Split Layout */}
        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full"
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className={`px-5 py-2 rounded-full text-xs font-black border uppercase tracking-widest shadow-lg ${project.tagColor} backdrop-blur-md`}>
                {project.category}
              </span>
              {project.featured && (
                <span className="px-5 py-2 rounded-full text-xs font-black bg-white text-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Featured Case Study
                </span>
              )}
            </div>

            <h1 className={`text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.95] mb-8 text-transparent bg-clip-text bg-gradient-to-br ${project.gradient} drop-shadow-2xl`}>
              {project.title}
            </h1>

            <p className="text-xl md:text-3xl text-white/80 leading-relaxed font-light max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          {/* Large Abstract Icon Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:flex w-[400px] h-[400px] shrink-0 items-center justify-center relative"
          >
            <div className="absolute inset-0 rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]" />
            <div className="absolute inset-10 rounded-full border border-white/10 bg-white/[0.02] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-tr ${project.gradient}`} />
              <Icon className="w-32 h-32 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
            </div>
            
            {/* Orbiting element */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="w-4 h-4 rounded-full bg-white absolute top-[-2px] left-1/2 -translate-x-1/2 shadow-[0_0_20px_rgba(255,255,255,0.8)]" style={{ backgroundColor: project.accent }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Project Meta Info - Floating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full bg-[#0a0f1d]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 mb-32 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col md:flex-row justify-between gap-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
          
          <div className="flex-1">
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2"><Building className="w-4 h-4" /> Client</p>
            <p className="text-2xl font-black text-white">{project.client}</p>
          </div>
          <div className="hidden md:block w-px bg-white/10" />
          <div className="flex-1">
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Timeline</p>
            <p className="text-2xl font-black text-white">{project.duration}</p>
          </div>
          <div className="hidden md:block w-px bg-white/10" />
          <div className="flex-1">
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Role</p>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">{project.role}</p>
          </div>
        </motion.div>

        {/* Challenge & Solution - Staggered Layout */}
        <div className="relative mb-32 md:mb-40">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-finova-magenta/50 via-finova-cyan/50 to-transparent -translate-x-1/2" />
          
          <div className="flex flex-col gap-16 md:gap-32">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[calc(50%-3rem)] mr-auto relative"
            >
              <div className="hidden md:flex absolute top-12 -right-[3rem] translate-x-1/2 w-8 h-8 rounded-full bg-[#030712] border-2 items-center justify-center z-10" style={{ borderColor: project.accent }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accent }} />
              </div>

              <div className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-[2.5rem] p-10 md:p-14 hover:border-white/20 transition-colors shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-finova-magenta/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-finova-magenta/20 transition-colors duration-700" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    <Target className="w-6 h-6 text-finova-magenta" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">The Challenge</h2>
                </div>
                <p className="text-white/60 leading-relaxed text-lg md:text-xl font-light">
                  {project.challenge}
                </p>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[calc(50%-3rem)] ml-auto relative"
            >
              <div className="hidden md:flex absolute top-12 -left-[3rem] -translate-x-1/2 w-8 h-8 rounded-full bg-[#030712] border-2 items-center justify-center z-10" style={{ borderColor: project.accent }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accent }} />
              </div>

              <div className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-[2.5rem] p-10 md:p-14 hover:border-white/20 transition-colors shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-finova-cyan/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-finova-cyan/20 transition-colors duration-700" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    <Zap className="w-6 h-6 text-finova-cyan" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">The Solution</h2>
                </div>
                <p className="text-white/60 leading-relaxed text-lg md:text-xl font-light">
                  {project.solution}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Project Impact Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 relative"
        >
          <div className="absolute inset-0 rounded-[3rem] blur-xl opacity-20 pointer-events-none" style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }} />
          <div className="bg-[#050a15] border border-white/10 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
             <p className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">Bottom Line Impact</p>
             <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter" style={{ textShadow: `0 0 40px ${project.accent}80` }}>
               "{project.impact}"
             </h3>
          </div>
        </motion.div>

        {/* Results & Tech Grid */}
        <div className="grid lg:grid-cols-12 gap-12 mb-32">
          {/* Results List */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-widest">Key Results</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {project.results.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-lg text-white/80 font-medium leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#050a15] border border-white/10 rounded-[2.5rem] p-10 h-full">
              <h2 className="text-xl font-black text-white uppercase tracking-widest mb-10 pb-6 border-b border-white/10">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.stack.map((s) => (
                  <span 
                    key={s} 
                    className="px-6 py-4 rounded-2xl text-sm font-bold border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-default shadow-sm hover:shadow-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Next / Prev Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/10 pt-16 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="text-sm font-bold tracking-widest uppercase text-white/40 text-center mb-12">Continue Exploring</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Link href={`/portfolio/${prevProject.slug}`} className="group block">
              <div className="flex flex-col gap-4 p-10 rounded-[2.5rem] border border-white/5 bg-[#030712] hover:bg-white/[0.02] hover:border-white/20 transition-all duration-500 h-full relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `linear-gradient(to right, ${prevProject.accent}, transparent)` }} />
                <div className="flex items-center gap-3 text-white/40 group-hover:text-white transition-colors text-xs font-bold tracking-widest uppercase relative z-10">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:-translate-x-2 transition-transform">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  Previous Project
                </div>
                <p className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight relative z-10">
                  {prevProject.title}
                </p>
              </div>
            </Link>
            
            <Link href={`/portfolio/${nextProject.slug}`} className="group block">
              <div className="flex flex-col gap-4 p-10 rounded-[2.5rem] border border-white/5 bg-[#030712] hover:bg-white/[0.02] hover:border-white/20 transition-all duration-500 h-full relative overflow-hidden text-right md:items-end">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `linear-gradient(to left, ${nextProject.accent}, transparent)` }} />
                <div className="flex items-center justify-end gap-3 text-white/40 group-hover:text-white transition-colors text-xs font-bold tracking-widest uppercase relative z-10">
                  Next Project
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight relative z-10">
                  {nextProject.title}
                </p>
              </div>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
