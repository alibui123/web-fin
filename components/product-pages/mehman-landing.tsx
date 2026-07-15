"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, ArrowRight, Zap, Globe2, Star, Heart,
  CheckCircle2, Activity, Sparkles, LayoutDashboard, Users, Settings
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

export default function MehmanLanding({ product }: { product: Product }) {
  return (
    <main className="min-h-screen bg-finova-midnight text-white overflow-hidden selection:bg-finova-cyan/30 selection:text-white">
      <SmoothScroll />

      {/* Background — warm cyan/teal tones */}
      <div className="fixed inset-0 z-0 pointer-events-none will-change-transform" style={{ transform: "translateZ(0)" }}>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-finova-cyan/10 blur-3xl rounded-full opacity-40" style={{ transform: "translateZ(0)" }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-finova-blue/10 blur-3xl rounded-full opacity-30" style={{ transform: "translateZ(0)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:36px_36px] opacity-15 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" style={{ transform: "translateZ(0)" }} />
      </div>

      {/* ───── Hero Section ───── */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <Link href="/products" className="inline-flex items-center text-sm font-mono text-white/50 hover:text-finova-cyan transition-colors mb-12 group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full border border-finova-cyan/30 bg-[#080e24]/80">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-finova-cyan">
                {product.hero.eyebrow}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {product.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light text-white/70 max-w-xl leading-relaxed">
              {product.hero.subheadline}
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-xl leading-relaxed border-l-2 border-finova-cyan/30 pl-4">
              {product.hero.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={product.hero.primaryCta.href} className="group relative">
                <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-finova-cyan/10" />
                <div className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-finova-cyan to-finova-blue text-white font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-transform hover:scale-105 active:scale-95">
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
            <div className="absolute inset-0 rounded-full border border-white/10 bg-[#080e24]/60 shadow-[0_0_10px_rgba(14,165,233,0.5)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-finova-cyan to-transparent opacity-30" />
              
              <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_25px_currentColor] text-finova-cyan">
                <Image
                  src={product.illustration}
                  alt={product.title}
                  fill
                  className="object-contain brightness-0 invert opacity-90"
                />
              </div>

              {/* Inner glowing rings */}
              <div className="absolute inset-4 rounded-full border border-dashed border-finova-cyan/30 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-finova-cyan/30 animate-[spin_20s_linear_infinite_reverse]" style={{ opacity: 0.5 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── Highlights — Portrait Keycards ───── */}
      <section className="relative z-10 py-24 bg-[#050a1f] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-finova-midnight to-[#050a1f]" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-10 justify-center">
            {product.hero.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex-1 min-h-[300px] rounded-[2rem] p-8 md:p-12 border border-white/10 bg-gradient-to-b from-[#080e24] to-[#0a122e] hover:border-finova-cyan/30 transition-all duration-500 group flex flex-col justify-center items-center text-center relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-cyan/10 via-transparent to-transparent pointer-events-none" />
                <h3 className="font-mono text-sm md:text-base uppercase tracking-widest text-finova-cyan mb-6 relative z-10 font-semibold">{h.label}</h3>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 relative z-10 max-w-sm">{h.value}</p>
                
                {/* Decorative Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-finova-cyan to-transparent group-hover:w-1/2 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Core Features — Premium Hospitality Cards ───── */}
      <section className="relative z-10 py-32 bg-finova-midnight">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="text-center mb-20 md:mb-24 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">
              Guest <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-blue">Experience</span> Engine
            </h2>
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">{product.overview}</p>
          </div>

          <div className="space-y-12">
            {product.coreFeatures.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#050a1f] to-[#080e24] hover:border-finova-cyan/30 transition-all duration-500 group p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 lg:gap-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-finova-cyan/5 blur-[100px] group-hover:bg-finova-cyan/10 transition-colors duration-700 pointer-events-none" />
                
                {/* Number Overlay */}
                <div className="absolute -bottom-10 -right-10 text-[150px] font-black text-white/[0.02] pointer-events-none group-hover:text-finova-cyan/[0.03] transition-colors duration-700">
                  0{i+1}
                </div>

                {/* Left: Heading in Card */}
                <div className="w-full md:w-5/12 relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-finova-cyan/10 text-finova-cyan font-mono mb-8 border border-finova-cyan/20 group-hover:scale-110 transition-transform duration-500">
                    0{i+1}
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-white leading-tight">
                    {feature.title}
                  </h3>
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-7/12 relative z-10">
                  <ul className="space-y-6">
                    {feature.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-5 group/item">
                        <div className="w-10 h-10 rounded-full bg-[#0a122e] border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover/item:border-finova-cyan/30 group-hover/item:bg-finova-cyan/10 transition-all">
                          <CheckCircle2 className="w-5 h-5 text-finova-cyan opacity-80 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-lg md:text-xl text-white/80 font-light leading-relaxed group-hover/item:text-white transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── AI Capabilities ───── */}
      <section className="relative z-10 py-32 overflow-hidden bg-[#050a1f] border-t border-white/5">
        {/* Luxury Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-cyan/10 via-transparent to-transparent opacity-50" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
          <div className="text-center mb-20 md:mb-24 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">
              Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-blue">Hospitality</span>
            </h2>
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {product.aiOverview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {product.aiFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-10 md:p-14 rounded-3xl border border-white/10 bg-[#080e24]/60 backdrop-blur-xl hover:bg-[#0a122e]/90 transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-finova-cyan/10 blur-[60px] group-hover:bg-finova-cyan/20 transition-colors duration-700 pointer-events-none" />
                
                <div className="mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0a122e] to-[#050a1f] border border-finova-cyan/30 flex items-center justify-center text-finova-cyan shadow-[0_0_15px_rgba(14,165,233,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all duration-500">
                  <Sparkles className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed group-hover:text-white transition-colors relative z-10">
                  {feature}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Guest Journey — The Concierge Path ───── */}
      <section className="relative z-10 py-32 bg-finova-midnight overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
          <div className="text-center mb-20 md:mb-24 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">
              Guest <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-blue">Journey</span>
            </h2>
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Seamless end-to-end automation from booking to checkout.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-6">
              {product.workflow.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#050a1f]/80 to-[#080e24]/80 backdrop-blur-md hover:border-finova-cyan/40 hover:from-finova-cyan/10 hover:to-[#080e24]/80 transition-all duration-500 overflow-hidden shadow-2xl"
                >
                  {/* Neon Edge Highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-finova-cyan to-finova-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Huge Number */}
                  <div className="w-full md:w-32 flex-shrink-0 flex items-center justify-center md:justify-start md:pl-6">
                    <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 group-hover:from-finova-cyan group-hover:to-finova-blue transition-colors duration-500">
                      0{i+1}
                    </span>
                  </div>
                  
                  {/* Step Description */}
                  <div className="flex-1 text-center md:text-left z-10">
                    <p className="text-2xl md:text-3xl font-light text-white/80 group-hover:text-white transition-colors">
                      {step}
                    </p>
                  </div>
                  
                  {/* Chevron indicator */}
                  <div className="hidden md:flex w-16 h-16 rounded-full border border-white/5 items-center justify-center bg-[#0a122e] group-hover:border-finova-cyan/30 group-hover:bg-finova-cyan/10 transition-all duration-500 z-10">
                    <ArrowRight className="w-6 h-6 text-white/30 group-hover:text-finova-cyan group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Business Impact ───── */}
      <section className="relative z-10 py-32 bg-[#050a1f] border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="text-center mb-20 md:mb-24 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">
              Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-blue">Impact</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-8">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-finova-cyan fill-finova-cyan drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]" />)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {product.businessImpact.map((impact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-10 rounded-[2rem] border border-white/10 bg-[#080e24]/80 backdrop-blur-md hover:bg-[#0a122e] hover:border-finova-cyan/40 transition-all duration-500 overflow-hidden text-center shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center min-h-[250px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-finova-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Activity className="w-10 h-10 text-finova-cyan mb-6 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-xl text-white/90 font-light leading-relaxed relative z-10">{impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Interface Modules — Data Core Layout ───── */}
      <section className="relative z-10 py-32 bg-finova-midnight border-t border-white/5 overflow-hidden">
        {/* Abstract background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 text-center relative z-10">
          <div className="text-center mb-20 md:mb-24 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">
              Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-blue">Dashboards</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
            {product.dashboards.map((d, i) => {
              const isLarge = i === 0 || i === 3;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative flex flex-col justify-between p-8 md:p-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#080e24]/90 to-[#050a1f]/90 backdrop-blur-md hover:border-finova-cyan/50 hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] transition-all duration-500 overflow-hidden min-h-[300px] ${isLarge ? 'md:col-span-7' : 'md:col-span-5'}`}
                >
                  {/* Subtle hover gradient sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-finova-cyan/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-[#0a122e] border border-white/5 flex items-center justify-center group-hover:bg-finova-cyan/10 transition-colors duration-500 shadow-inner">
                      <LayoutDashboard className="w-6 h-6 text-finova-cyan/50 group-hover:text-finova-cyan transition-colors" />
                    </div>
                    <span className="font-mono text-5xl font-black text-white/[0.03] group-hover:text-finova-cyan/[0.05] transition-colors duration-500">
                      0{i+1}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl md:text-3xl font-light text-white/80 group-hover:text-white transition-colors text-left relative z-10 ${isLarge ? 'max-w-md' : ''}`}>
                    {d}
                  </h3>
                  
                  {/* Glowing edge indicator */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-finova-cyan group-hover:w-full transition-all duration-700 ease-out" />
                </motion.div>
              );
            })}
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
          className="max-w-4xl mx-auto rounded-[3rem] border border-finova-cyan/20 bg-gradient-to-t from-finova-cyan/10 to-[#080e24]/90 p-12 md:p-24 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-finova-cyan/5 blur-3xl pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Elevate Your <span className="text-finova-cyan">Hospitality</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light mb-10">
            Book a demo or schedule a consultation to explore pricing and rollout options for {product.title}.
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
