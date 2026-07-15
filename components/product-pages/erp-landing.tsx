"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, ArrowRight, Zap, LayoutDashboard, Users, Settings,
  Activity, Database, CheckCircle2, Layers, BarChart3
} from "lucide-react";
import SmoothScroll from "@/components/smooth-scroll";
import type { Product } from "@/components/product-pages/product-data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ErpLanding({ product }: { product: Product }) {
  return (
    <main className="min-h-screen bg-finova-midnight text-white overflow-hidden selection:bg-finova-purple/30 selection:text-white">
      <SmoothScroll />

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none will-change-transform" style={{ transform: "translateZ(0)" }}>
        <div className="absolute top-[-5%] left-[20%] w-[500px] h-[500px] bg-finova-purple/10 blur-3xl rounded-full opacity-40" style={{ transform: "translateZ(0)" }} />
        <div className="absolute bottom-[-5%] right-[10%] w-[600px] h-[600px] bg-finova-magenta/8 blur-3xl rounded-full opacity-30" style={{ transform: "translateZ(0)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" style={{ transform: "translateZ(0)" }} />
      </div>

      {/* ───── Hero Section ───── */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <Link href="/products" className="inline-flex items-center text-sm font-mono text-white/50 hover:text-finova-purple transition-colors mb-12 group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full border border-finova-purple/30 bg-[#080e24]/80">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-finova-purple">
                {product.hero.eyebrow}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {product.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light text-white/70 max-w-xl leading-relaxed">
              {product.hero.subheadline}
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-xl leading-relaxed border-l-2 border-finova-purple/30 pl-4">
              {product.hero.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={product.hero.primaryCta.href} className="group relative">
                <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-finova-purple/10" />
                <div className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-finova-purple to-finova-magenta text-white font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-transform hover:scale-105 active:scale-95">
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
            <div className="absolute inset-0 rounded-full border border-white/10 bg-[#080e24]/60 shadow-[0_0_10px_rgba(147,51,234,0.5)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-finova-purple to-transparent opacity-30" />
              
              <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_25px_currentColor] text-finova-purple">
                <Image
                  src={product.illustration}
                  alt={product.title}
                  fill
                  className="object-contain brightness-0 invert opacity-90"
                />
              </div>

              {/* Inner glowing rings */}
              <div className="absolute inset-4 rounded-full border border-dashed border-finova-purple/30 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-finova-purple/30 animate-[spin_20s_linear_infinite_reverse]" style={{ opacity: 0.5 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── Highlights — Oversized Typography Grid ───── */}
      <section className="relative z-10 py-24 bg-[#050a1f] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {product.hero.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-4 top-0 w-1 h-12 bg-finova-purple" />
                <h3 className="font-mono text-sm uppercase tracking-widest text-finova-purple mb-6">{h.label}</h3>
                <p className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-white/90">
                  {h.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Core Features — Massive Grid Panel ───── */}
      <section className="relative z-10 py-32 bg-finova-midnight">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="text-center mb-20 md:mb-24 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">
              ERP <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-purple to-finova-magenta">Modules</span>
            </h2>
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {product.overview}
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-finova-purple/20 bg-[#080e24] overflow-hidden p-1 relative"
          >
            {/* Glowing background behind grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-purple/10 to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
              {product.coreFeatures.map((feature, i) => (
                <div key={i} className="bg-[#050a1f]/90 p-8 flex flex-col relative z-10 group hover:bg-finova-purple/5 transition-colors">
                  <div className="text-finova-purple mb-6 flex-shrink-0">
                    <LayoutDashboard className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-6">{feature.title}</h3>
                  <ul className="space-y-4 flex-1">
                    {feature.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/60 text-sm font-light">
                        <span className="font-mono text-finova-purple mt-0.5 opacity-50">{`>`}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── AI Capabilities — Cybernetic Datacard Array ───── */}
      <section className="relative z-10 py-32 bg-[#050a1f] overflow-hidden border-y border-white/5">
        {/* HUD Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-finova-purple/40 via-transparent to-transparent" />
          <svg className="absolute inset-0 w-full h-full text-finova-purple/20" xmlns="http://www.w3.org/2000/svg">
            <pattern id="techGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#techGrid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
          
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-finova-purple/30 bg-[#080e24]/80 backdrop-blur-md mb-8"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-finova-purple animate-ping absolute" />
                <div className="w-2 h-2 rounded-full bg-finova-purple" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-finova-purple ml-1">Intelligence Engine Active</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-8 leading-tight">
              ERP <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-purple to-finova-magenta">Capabilities</span>
            </h2>
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {product.aiOverview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {product.aiFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-10 md:p-14 rounded-3xl border border-white/5 bg-[#080e24]/60 backdrop-blur-xl hover:bg-[#0a122e]/90 transition-all duration-500 overflow-hidden"
              >
                {/* Technical Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-finova-purple/0 group-hover:border-finova-purple/50 rounded-tl-3xl transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-finova-magenta/0 group-hover:border-finova-magenta/50 rounded-br-3xl transition-colors duration-500" />
                
                {/* Scanner line animation */}
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out" />
                
                {/* Massive Index Number */}
                <div className="absolute -right-4 -bottom-8 text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-transparent group-hover:from-finova-purple/20 transition-all duration-700 select-none">
                  0{i+1}
                </div>

                <div className="relative z-10">
                  <div className="mb-8 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-finova-purple/20 to-transparent border border-finova-purple/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_15px_rgba(147,51,234,0.1)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]">
                    <Database className="w-6 h-6 text-finova-purple" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-light text-white/90 leading-tight group-hover:text-white transition-colors duration-300">
                    {feature}
                  </h3>
                  
                  {/* Tech meter bar */}
                  <div className="mt-10 flex gap-2">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div key={bar} className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-finova-purple to-finova-magenta w-0 group-hover:w-full transition-all duration-500 ease-out" 
                          style={{ transitionDelay: `${bar * 100}ms` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ───── Operational Flow — Neural Processing Pipeline ───── */}
      <section className="relative z-10 py-32 bg-finova-midnight overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-finova-purple/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-finova-magenta/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="text-center mb-24 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">
              Execution <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-purple to-finova-magenta">Sequence</span>
            </h2>
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              A precise, automated rollout protocol ensuring zero downtime and immediate ROI.
            </p>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Massive Center Spine */}
            <div className="absolute left-[39px] md:left-0 md:right-0 top-0 bottom-0 md:flex md:justify-center pointer-events-none -translate-x-1/2 md:translate-x-0">
              <div className="w-1.5 h-full bg-[#0a122e] rounded-full overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)] relative">
                {/* Flowing Data Packet */}
                <motion.div 
                  className="absolute left-0 right-0 h-[30%] bg-gradient-to-b from-transparent via-finova-purple to-finova-magenta"
                  animate={{ top: ['-30%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            <div className="space-y-16 md:space-y-24">
              {product.workflow.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative w-full flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Spine Node & Ring Wrapper */}
                    <div className="absolute left-[39px] md:left-0 md:right-0 top-10 md:top-1/2 md:flex md:justify-center -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-20 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-[#050a1f] border-4 border-finova-purple shadow-[0_0_20px_rgba(147,51,234,0.8)] group-hover:scale-125 transition-transform duration-500 relative flex items-center justify-center">
                        <div className="absolute w-12 h-12 rounded-full bg-finova-purple/20 animate-ping -z-10" />
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}`}>
                      <div className={`relative p-8 md:p-12 rounded-[2rem] border border-white/5 bg-[#080e24]/80 backdrop-blur-xl group hover:border-finova-purple/40 hover:bg-[#0a122e] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden
                        ${isEven ? 'md:rounded-tr-none' : 'md:rounded-tl-none'}
                      `}>
                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${isEven ? 'from-finova-purple/5 to-transparent' : 'from-transparent to-finova-purple/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                        {/* Top Accent Line */}
                        <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1/3 h-1 bg-gradient-to-r from-finova-purple to-finova-magenta opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                        {/* Step Identifier */}
                        <div className={`flex items-center gap-4 mb-6 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          <span className="font-mono text-sm tracking-[0.3em] uppercase text-finova-purple">Phase</span>
                          <span className="font-mono text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                            0{i+1}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-light text-white/90 leading-tight group-hover:text-white transition-colors relative z-10">
                          {step}
                        </h3>
                        
                        {/* Abstract Tech Graphic */}
                        <div className={`mt-8 flex gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          <div className="h-1.5 w-8 bg-finova-purple/30 rounded-full" />
                          <div className="h-1.5 w-4 bg-finova-magenta/30 rounded-full" />
                          <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Empty Space for the other side */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Business Impact — Scrolling Ticker ───── */}
      <section className="relative z-10 py-16 bg-finova-purple text-finova-midnight overflow-hidden">
        <div className="flex whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          {[...product.businessImpact, ...product.businessImpact, ...product.businessImpact].map((impact, i) => (
            <div key={i} className="flex items-center gap-8 px-8 shrink-0">
              <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{impact}</span>
              <Activity className="w-8 h-8 opacity-50" />
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
        `}} />
      </section>

      {/* ───── Interface Modules ───── */}
      <section className="relative z-10 py-32 bg-[#050a1f] border-t border-white/5 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-finova-magenta/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-[#080e24]/80 backdrop-blur-md mb-8">
            <LayoutDashboard className="w-4 h-4 text-finova-magenta" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-finova-magenta">Interface Modules</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-16">
            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-magenta to-finova-purple">Dashboards</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.dashboards.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl border border-white/5 bg-[#050a1f]/80 backdrop-blur-md hover:bg-[#0a122e] hover:border-finova-magenta/30 transition-all duration-500 overflow-hidden text-left shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-finova-magenta/10 blur-[40px] group-hover:bg-finova-magenta/30 transition-colors duration-500" />
                
                <div className="mb-6 w-12 h-12 rounded-2xl bg-[#080e24] border border-white/10 flex items-center justify-center text-finova-magenta group-hover:scale-110 group-hover:-rotate-6 shadow-[0_0_10px_rgba(217,70,239,0.1)] transition-transform">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                
                <h3 className="text-lg md:text-xl font-light text-white/90 leading-relaxed group-hover:text-white transition-colors">
                  {d}
                </h3>
              </motion.div>
            ))}
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
          className="max-w-5xl mx-auto rounded-3xl border border-finova-purple/30 bg-gradient-to-br from-[#080e24] to-finova-purple/20 p-12 md:p-24 text-center relative overflow-hidden"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Deploy <span className="text-finova-purple">{product.title}</span> Today
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light mb-10">
            Book a demo or schedule a consultation to explore pricing and rollout options.
          </p>
          <Link href={product.hero.primaryCta.href} className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-finova-midnight font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {product.hero.primaryCta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
