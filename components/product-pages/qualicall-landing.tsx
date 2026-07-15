"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, ArrowRight, Zap, BarChart3, Shield, Eye,
  CheckCircle2, Activity, Globe2, Settings
} from "lucide-react";
import SmoothScroll from "@/components/smooth-scroll";
import type { Product } from "@/components/product-pages/product-data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const ACCENT = {
  text: "text-finova-magenta",
  gradient: "from-finova-magenta to-finova-purple",
  border: "border-finova-magenta/30",
  bgLight: "bg-finova-magenta/10",
  shadow: "shadow-[0_0_10px_rgba(217,70,239,0.4)]",
  hex: "217,70,239",
};

export default function QualicallLanding({ product }: { product: Product }) {
  const coreFeatureIcons = [BarChart3, Shield, Settings, Activity];

  return (
    <main className="min-h-screen bg-finova-midnight text-white overflow-hidden selection:bg-finova-magenta/30 selection:text-white">
      <SmoothScroll />

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none will-change-transform" style={{ transform: "translateZ(0)" }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-finova-purple/10 blur-3xl rounded-full opacity-40" style={{ transform: "translateZ(0)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-finova-magenta/10 blur-3xl rounded-full opacity-40" style={{ transform: "translateZ(0)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-15 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" style={{ transform: "translateZ(0)" }} />
      </div>

      {/* ───── Hero Section ───── */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <Link href="/products" className="inline-flex items-center text-sm font-mono text-white/50 hover:text-finova-magenta transition-colors mb-12 group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full border border-finova-magenta/30 bg-[#080e24]/80">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-finova-magenta">
                {product.hero.eyebrow}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {product.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light text-white/70 max-w-xl leading-relaxed">
              {product.hero.subheadline}
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-xl leading-relaxed border-l-2 border-finova-magenta/30 pl-4">
              {product.hero.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={product.hero.primaryCta.href} className="group relative">
                <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-finova-magenta/10" />
                <div className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-finova-magenta to-finova-purple text-white font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-transform hover:scale-105 active:scale-95">
                  {product.hero.primaryCta.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link href={product.hero.secondaryCta.href} className="group relative">
                <div className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-[#080e24]/80 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors">
                  {product.hero.secondaryCta.label}
                </div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-[500px] mx-auto lg:ml-auto w-full"
          >
            {/* Holographic Container for Visual */}
            <div className="absolute inset-0 rounded-full border border-white/10 bg-[#080e24]/60 shadow-[0_0_10px_rgba(217,70,239,0.5)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-finova-magenta to-transparent opacity-30" />
              
              <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_25px_currentColor] text-finova-magenta">
                <Image
                  src={product.illustration}
                  alt={product.title}
                  fill
                  className="object-contain brightness-0 invert opacity-90"
                />
              </div>

              {/* Inner glowing rings */}
              <div className="absolute inset-4 rounded-full border border-dashed border-finova-magenta/30 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-finova-magenta/30 animate-[spin_20s_linear_infinite_reverse]" style={{ opacity: 0.5 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── Highlights — Sticky Reveal ───── */}
      <section className="relative z-10 py-32 bg-[#050a1f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            {/* Vertical Title (Desktop) / Normal Title (Mobile) */}
            <div className="lg:sticky lg:top-40 flex-shrink-0 w-16 lg:w-48 flex justify-center items-center">
              <h2 
                className="hidden lg:block text-6xl xl:text-[7rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-finova-magenta/40 to-finova-purple/10"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                WHY QUALICALL?
              </h2>
              
              <div className="lg:hidden mb-8">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Why Qualicall?</h2>
                <p className="text-white/50 text-lg font-light leading-relaxed">
                  Transform your QA process from a randomized sample to complete, explainable coverage across every interaction.
                </p>
              </div>
            </div>

            {/* Cards Column */}
            <div className="flex-1 w-full space-y-8 lg:pl-20">
              <p className="hidden lg:block text-white/60 text-2xl font-light leading-relaxed max-w-3xl mb-16 mt-4">
                Transform your QA process from a randomized sample to complete, explainable coverage across every interaction.
              </p>

              {product.hero.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative p-8 md:p-12 rounded-[2rem] border border-white/5 bg-[#080e24]/80 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-finova-magenta/0 to-finova-purple/0 group-hover:from-finova-magenta/10 group-hover:to-finova-purple/10 transition-colors duration-700" />
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-finova-magenta to-finova-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="font-mono text-sm md:text-base uppercase tracking-[0.2em] mb-4 text-finova-magenta">{h.label}</h3>
                  <p className="text-2xl md:text-4xl font-light leading-tight text-white/90 relative z-10">{h.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Core Features — Platform Modules ───── */}
      <section className="relative z-10 py-32 bg-[#020510] border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-finova-magenta via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            {/* Vertical Title */}
            <div className="lg:sticky lg:top-40 flex-shrink-0 w-16 lg:w-48 flex justify-center items-center">
              <h2 
                className="hidden lg:block text-6xl xl:text-[7rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-finova-purple/40 to-finova-magenta/10"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                PLATFORM MODULES
              </h2>
              
              <div className="lg:hidden mb-12">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Platform Modules</h2>
                <p className="text-white/50 text-lg font-light leading-relaxed max-w-lg">
                  {product.overview}
                </p>
              </div>
            </div>

            {/* Content Cards */}
            <div className="flex-1 w-full space-y-12 lg:pl-20">
              <p className="hidden lg:block text-white/50 text-2xl font-light leading-relaxed max-w-3xl mt-4 mb-16">
                {product.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.coreFeatures.map((feature, i) => {
                  const Icon = coreFeatureIcons[i] || Zap;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative p-8 md:p-10 rounded-[2rem] border border-white/5 bg-[#080e24]/60 hover:bg-[#0a122e]/80 transition-all duration-500 overflow-hidden"
                    >
                      {/* Neon Top Border */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-finova-magenta to-finova-purple opacity-30 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Glowing Orb Background */}
                      <div className="absolute -right-20 -top-20 w-48 h-48 bg-finova-magenta/10 rounded-full blur-3xl group-hover:bg-finova-magenta/20 transition-colors" />

                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-[#050a1f] border border-white/10 flex items-center justify-center text-finova-magenta mb-8 shadow-[0_0_15px_rgba(217,70,239,0.1)] group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <h3 className="text-2xl font-bold uppercase tracking-wider mb-6 text-white">{feature.title}</h3>
                        
                        <ul className="space-y-4">
                          {feature.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-4 text-white/70 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-finova-purple mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:bg-finova-magenta transition-colors" />
                              <span className="text-base leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── AI Capabilities — Holographic Data Stream ───── */}
      <section className="relative z-10 py-32 overflow-hidden bg-[#050a1f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            {/* Vertical Title */}
            <div className="lg:sticky lg:top-40 flex-shrink-0 w-16 lg:w-48 flex justify-center items-center">
              <h2 
                className="hidden lg:block text-6xl xl:text-[7rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-finova-magenta/40 to-finova-purple/10"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                INTELLIGENCE
              </h2>
              
              <div className="lg:hidden mb-12">
                <div className="font-mono text-xs mb-4 text-finova-magenta tracking-[0.2em] uppercase">Intelligence Layer</div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">AI Capabilities</h2>
                <p className="text-white/50 text-lg font-light leading-relaxed max-w-sm">
                  {product.aiOverview}
                </p>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 w-full space-y-6 lg:pl-20">
              <p className="hidden lg:block text-white/50 text-2xl font-light leading-relaxed max-w-3xl mb-16 mt-4">
                {product.aiOverview}
              </p>

              <div className="space-y-6">
                {product.aiFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative p-8 md:p-10 rounded-[2rem] border border-white/5 bg-[#080e24]/40 hover:bg-[#080e24]/90 transition-all duration-500 overflow-hidden flex items-center gap-8"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-finova-magenta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Scanner Line */}
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-finova-magenta shadow-[0_0_20px_rgba(217,70,239,1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/0 group-hover:from-finova-magenta/50 group-hover:to-finova-purple/10 transition-colors duration-500 flex-shrink-0">
                      0{i+1}
                    </div>

                    <div className="relative z-10 flex-1">
                      <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed group-hover:text-white transition-colors">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Operational Flow — Cascading Steps ───── */}
      <section className="relative z-10 pt-24 pb-28 md:pt-28 md:pb-32 bg-[#020510] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
            
            {/* Vertical Title */}
            <div className="lg:sticky lg:top-32 flex-shrink-0 w-full lg:w-48 flex justify-center items-center">
              <h2 
                className="hidden lg:block text-6xl xl:text-[7rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-finova-purple/40 to-finova-magenta/10"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                PIPELINE
              </h2>
              
              <div className="lg:hidden mb-10 text-center w-full">
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Operational Flow</h2>
              </div>
            </div>

            {/* Content Cascading Sequence */}
            <div className="flex-1 w-full space-y-0 pl-0 md:pl-12 lg:pl-20 mt-8 lg:mt-0">
              {product.workflow.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative"
                >
                  {/* Connecting Line between steps */}
                  {i !== product.workflow.length - 1 && (
                    <div className="absolute left-[39px] md:left-[47px] top-24 bottom-[-40px] w-0.5 bg-gradient-to-b from-finova-magenta/30 to-finova-purple/10" />
                  )}

                  <div className="flex items-start gap-6 md:gap-10 p-8 md:p-12 rounded-[2rem] border border-white/5 bg-[#050a1f]/90 backdrop-blur-md hover:border-finova-magenta/30 transition-all duration-500 relative z-10 mb-[-24px] shadow-2xl group overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-finova-magenta/5 to-finova-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Animated Pulse Ring */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-full border border-finova-magenta/50 animate-ping opacity-20" />
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#080e24] to-[#0a122e] border border-finova-magenta/40 flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.2)] group-hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] transition-shadow">
                        <span className="text-xl md:text-2xl font-black font-mono text-finova-magenta">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-finova-purple/80 block mb-3">
                        Phase {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-3xl font-light text-white/90 leading-relaxed group-hover:text-white transition-colors">
                        {step}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Business Impact & Interface Modules ───── */}
      <section className="relative z-10 py-32 bg-[#050a1f] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            {/* Vertical Title */}
            <div className="lg:sticky lg:top-40 flex-shrink-0 w-16 lg:w-48 flex justify-center items-center">
              <h2 
                className="hidden lg:block text-6xl xl:text-[7rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-finova-magenta/40 to-finova-purple/10"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                VALUE
              </h2>
              
              <div className="lg:hidden mb-12">
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Business Value</h2>
              </div>
            </div>

            {/* Split Grid Content */}
            <div className="flex-1 w-full flex flex-col md:flex-row gap-12 lg:gap-12 xl:gap-20 lg:pl-20">
              
              {/* Interface Modules */}
              <div className="flex-1 space-y-8">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-finova-magenta flex items-center gap-4">
                  <Settings className="w-6 h-6" /> Interface Modules
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.dashboards.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl bg-[#080e24]/60 border border-finova-magenta/20 hover:border-finova-magenta/50 hover:bg-[#0a122e] transition-colors flex items-center justify-center text-center min-h-[140px] shadow-[0_0_15px_rgba(217,70,239,0.05)]"
                    >
                      <p className="text-white/90 font-light text-sm md:text-base leading-relaxed">{d}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Business Impact */}
              <div className="flex-1 space-y-8">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-finova-purple flex items-center gap-4">
                  <Activity className="w-6 h-6" /> Business Impact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.businessImpact.map((impact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl bg-[#080e24]/60 border border-finova-purple/20 hover:border-finova-purple/50 hover:bg-[#0a122e] transition-colors flex items-center justify-center text-center min-h-[140px] shadow-[0_0_15px_rgba(168,85,247,0.05)]"
                    >
                      <p className="text-white/90 font-light text-sm md:text-base leading-relaxed">{impact}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative z-10 py-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-3xl border border-finova-magenta/20 bg-gradient-to-br from-finova-magenta/10 to-[#080e24]/90 p-12 md:p-20 text-center relative overflow-hidden"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Deploy <span className="text-finova-magenta">{product.title}</span> Today
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light mb-10">
            Book a demo or schedule a consultation to explore pricing and rollout options.
          </p>
          <Link href={product.hero.primaryCta.href} className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-finova-midnight font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {product.hero.primaryCta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
