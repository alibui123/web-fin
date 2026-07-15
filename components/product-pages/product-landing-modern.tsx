"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, Mic, Globe2, Zap, LayoutDashboard, 
  Activity, Users, Settings, Database
} from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Awaaz3DElement = dynamic(
  () => import("@/components/awaaz-3d-element").then((mod) => mod.Awaaz3DElement),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const Erp3DElement = dynamic(
  () => import("@/components/erp-3d-element"),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);
import SmoothScroll from "@/components/smooth-scroll";
import type { Product } from "@/components/product-pages/product-data";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const THEME_MAP: Record<string, {
  text: string;
  gradient: string;
  border: string;
  hoverBorder: string;
  bgLight: string;
  shadow: string;
  shadowStrong: string;
  blob1: string;
  blob2: string;
}> = {
  "awaaz": {
    text: "text-finova-cyan",
    gradient: "from-finova-cyan to-finova-blue",
    border: "border-finova-cyan/30",
    hoverBorder: "hover:border-finova-cyan/30",
    bgLight: "bg-finova-cyan/10",
    shadow: "shadow-[0_0_10px_rgba(14,165,233,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(14,165,233,0.4)]",
    blob1: "bg-finova-blue/10",
    blob2: "bg-finova-cyan/10"
  },
  "qualicall": {
    text: "text-finova-magenta",
    gradient: "from-finova-magenta to-finova-purple",
    border: "border-finova-magenta/30",
    hoverBorder: "hover:border-finova-magenta/30",
    bgLight: "bg-finova-magenta/10",
    shadow: "shadow-[0_0_10px_rgba(217,70,239,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(217,70,239,0.4)]",
    blob1: "bg-finova-purple/10",
    blob2: "bg-finova-magenta/10"
  },
  "ai-powered-erp": {
    text: "text-finova-purple",
    gradient: "from-finova-purple to-finova-magenta",
    border: "border-finova-purple/30",
    hoverBorder: "hover:border-finova-purple/30",
    bgLight: "bg-finova-purple/10",
    shadow: "shadow-[0_0_10px_rgba(147,51,234,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(147,51,234,0.4)]",
    blob1: "bg-finova-magenta/10",
    blob2: "bg-finova-purple/10"
  },
  "mehman-nawaz": {
    text: "text-finova-lightBlue",
    gradient: "from-finova-lightBlue to-finova-cyan",
    border: "border-finova-lightBlue/30",
    hoverBorder: "hover:border-finova-lightBlue/30",
    bgLight: "bg-finova-lightBlue/10",
    shadow: "shadow-[0_0_10px_rgba(43,142,190,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(43,142,190,0.4)]",
    blob1: "bg-finova-cyan/10",
    blob2: "bg-finova-lightBlue/10"
  }
};

export default function ProductLandingModern({ product }: { product: Product }) {
  const theme = THEME_MAP[product.id] || THEME_MAP["awaaz"]; // Fallback to awaaz theme
  
  let VisualElement;
  if (product.id === "awaaz") {
    VisualElement = <Awaaz3DElement />;
  } else {
    VisualElement = (
      <div className={cn("relative w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_25px_currentColor]", theme.text)}>
        <Image
          src={product.illustration}
          alt={product.title}
          fill
          className="object-contain brightness-0 invert opacity-90"
        />
      </div>
    );
  }

  return (
    <main className={cn("min-h-screen bg-finova-midnight text-white overflow-hidden selection:text-white", `selection:${theme.bgLight}`)}>
      <SmoothScroll />
      
      {/* Abstract Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }}>
        <div className={cn("absolute top-0 left-0 w-full h-[500px] rounded-full blur-3xl opacity-30", theme.blob1)} style={{ transform: 'translateZ(0)' }} />
        <div className={cn("absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-30", theme.blob2)} style={{ transform: 'translateZ(0)' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-20" style={{ transform: 'translateZ(0)' }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 md:px-12 lg:px-16 container mx-auto">
        <Link
          href="/products"
          className={cn("inline-flex items-center text-sm font-mono text-white/50 transition-colors mb-12 group", `hover:${theme.text}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className={cn("inline-block px-4 py-1.5 rounded-full border bg-[#080e24]/80", theme.border)}>
              <span className={cn("font-mono text-xs uppercase tracking-widest font-bold", theme.text)}>
                {product.hero.eyebrow}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {product.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light text-white/70 max-w-xl leading-relaxed">
              {product.hero.subheadline}
            </motion.p>
            
            <motion.p variants={fadeUp} className={cn("text-lg text-white/50 max-w-xl leading-relaxed border-l-2 pl-4", theme.border)}>
              {product.hero.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={product.hero.primaryCta.href} className="group relative">
                <div className={cn("absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500", theme.bgLight)} />
                <div className={cn("relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r text-white font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 active:scale-95", theme.gradient, theme.shadowStrong)}>
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
            viewport={{ once: false, margin: "-50px" }}
            className="relative aspect-square max-w-[500px] mx-auto lg:ml-auto w-full"
          >
            {/* Holographic Container for 3D Visual */}
            <div className={cn("absolute inset-0 rounded-full border border-white/10 bg-[#080e24]/60 shadow-[0_0_80px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden", theme.shadow)}>
              <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent opacity-30", theme.gradient)} />
              
              {VisualElement}

              {/* Inner glowing rings */}
              <div className={cn("absolute inset-4 rounded-full border border-dashed animate-[spin_30s_linear_infinite]", theme.border)} />
              <div className={cn("absolute inset-8 rounded-full border animate-[spin_20s_linear_infinite_reverse]", theme.border)} style={{ opacity: 0.5 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Bento Box */}
      <section className="relative z-10 py-20 border-y border-white/10 bg-[#050a1f]/80">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {product.hero.highlights.map((highlight, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden group"
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500", theme.gradient)} />
                <p className={cn("font-mono text-xs uppercase tracking-widest mb-4", theme.text)}>{highlight.label}</p>
                <p className="text-xl font-light leading-relaxed">{highlight.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Features & AI */}
      <section className="relative z-10 py-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-50px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Intelligent Core</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">{product.overview}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.coreFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: false, margin: "-50px" }}
              className={cn("p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent group transition-all duration-300", theme.hoverBorder)}
            >
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", theme.bgLight, theme.shadow)}>
                {i === 0 && <Globe2 className={cn("w-6 h-6", theme.text)} />}
                {i === 1 && <Settings className={cn("w-6 h-6", theme.text)} />}
                {i === 2 && <Zap className={cn("w-6 h-6", theme.text)} />}
                {i === 3 && <Activity className={cn("w-6 h-6", theme.text)} />}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{feature.title}</h3>
              <ul className="space-y-4">
                {feature.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/60 font-light text-sm">
                    <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5", theme.bgLight, theme.shadow)} style={{ backgroundColor: 'currentColor' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Capabilities — Redesigned */}
      <section className="relative z-10 pt-20 pb-24 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32 overflow-hidden">
        {/* Subtle section bg */}
        <div className={cn("absolute inset-0 opacity-[0.03] bg-gradient-to-b from-transparent via-current to-transparent", theme.text)} />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-14 lg:mb-16"
          >
            <div className={cn("font-mono text-xs md:text-sm mb-6 tracking-[0.2em] uppercase border inline-block px-6 py-2 rounded-full", theme.text, theme.border, theme.bgLight)}>
              Neural Engine
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4">
              AI Capabilities
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
              {product.aiOverview}
            </p>
          </motion.div>

          {/* Two-column layout: Features list + Visualizer */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
            {/* Left: Feature cards (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              {product.aiFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="group relative flex items-start gap-5 p-6 rounded-2xl border border-white/10 bg-[#080e24]/70 overflow-hidden transition-all duration-500 hover:border-white/20"
                  style={{ transform: 'translateZ(0)' }}
                >
                  {/* Hover gradient */}
                  <div className={cn("absolute inset-0 bg-gradient-to-r to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700", theme.gradient)} />
                  {/* Top accent */}
                  <div className={cn("absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", theme.gradient)} />

                  {/* Number badge */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.15, type: 'spring', stiffness: 250 }}
                    viewport={{ once: true }}
                    className={cn("flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center relative z-10", theme.border, theme.bgLight)}
                  >
                    <Zap className={cn("w-5 h-5", theme.text)} />
                  </motion.div>

                  {/* Text */}
                  <div className="relative z-10 flex-1 min-w-0">
                    <span className={cn("font-mono text-[10px] tracking-[0.3em] uppercase block mb-1 opacity-60", theme.text)}>
                      Feature {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-white/80 text-base font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                      {feature}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Visualizer Panel (2 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 lg:sticky lg:top-24"
            >
              <div className="relative aspect-square rounded-3xl border border-white/10 bg-[#080e24]/80 overflow-hidden">
                {/* Ambient corner glow */}
                <div
                  className={cn("absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none", theme.bgLight)}
                  style={{ transform: 'translateZ(0)' }}
                />
                <div
                  className={cn("absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none", theme.bgLight)}
                  style={{ transform: 'translateZ(0)' }}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

                {/* Central brain-like visualizer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 gap-6">
                  {/* Top label */}
                  <div className={cn("font-mono text-[10px] tracking-[0.3em] uppercase opacity-50", theme.text)}>
                    Neural Processing
                  </div>

                  {/* Animated bars */}
                  <div className="w-full max-w-[85%] space-y-3">
                    {[85, 92, 67, 78, 95, 60].map((width, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="font-mono text-[9px] text-white/30 w-6 text-right">{width}%</span>
                        <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className={cn("h-full rounded-full bg-gradient-to-r", theme.gradient)}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${width}%` }}
                            transition={{ duration: 1.2, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom metrics */}
                  <div className="flex items-center gap-6 mt-4">
                    <div className="text-center">
                      <div className={cn("text-2xl font-black font-mono", theme.text)}>99.7%</div>
                      <div className="text-[9px] font-mono tracking-widest uppercase text-white/30 mt-1">Accuracy</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                      <div className={cn("text-2xl font-black font-mono", theme.text)}>&lt;50ms</div>
                      <div className="text-[9px] font-mono tracking-widest uppercase text-white/30 mt-1">Latency</div>
                    </div>
                  </div>
                </div>

                {/* Border accent */}
                <div className={cn("absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r", theme.gradient)} style={{ opacity: 0.5 }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Operational Flow — Redesigned */}
      <section className="relative z-10 py-32 overflow-hidden">
        {/* Section background accent */}
        <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-b from-transparent via-current to-transparent", theme.text)} />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className={cn("font-mono text-xs md:text-sm mb-6 tracking-[0.2em] uppercase border inline-block px-6 py-2 rounded-full", theme.text, theme.border, theme.bgLight)}>
              Intelligence Pipeline
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4">
              Operational Flow
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
              From first contact to resolution — every step is orchestrated by AI.
            </p>
          </motion.div>

          {/* Flow Grid */}
          <div className="max-w-6xl mx-auto relative">
            {/* Central animated timeline line (desktop only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <motion.div
                className={cn("w-full h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-30", theme.text)}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'top', transform: 'translateZ(0)' }}
              />
            </div>

            {product.workflow.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className={`relative flex items-stretch mb-8 md:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row group`}
                  style={{ transform: 'translateZ(0)' }}
                >
                  {/* Card */}
                  <div className={cn(
                    `w-full md:w-[calc(50%-2rem)] p-8 rounded-3xl border bg-[#080e24]/70 transition-all duration-500 relative overflow-hidden`,
                    `border-white/10 group-hover:border-white/20`,
                    isLeft ? 'md:mr-auto' : 'md:ml-auto'
                  )}>
                    {/* Hover glow */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700", theme.gradient)} />
                    {/* Top accent line */}
                    <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", theme.gradient)} />

                    <div className="relative z-10 flex items-start gap-6">
                      {/* Big step number */}
                      <div className="flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: i * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                          viewport={{ once: true }}
                          className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center border",
                            theme.border, theme.bgLight
                          )}
                        >
                          <span className={cn("text-2xl font-black font-mono", theme.text)}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <span className={cn("font-mono text-[10px] tracking-[0.3em] uppercase mb-2 block", theme.text)}>
                          Phase {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-lg text-white/80 font-light leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Node (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.15 + 0.3, type: 'spring', stiffness: 300 }}
                      viewport={{ once: true }}
                      className={cn(
                        "w-10 h-10 rounded-xl bg-finova-midnight border-2 flex items-center justify-center",
                        theme.border, theme.shadow
                      )}
                    >
                      <div className={cn("w-2.5 h-2.5 rounded-full animate-pulse bg-gradient-to-r", theme.gradient)} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboards & Business Impact - Bento Grid */}
      <section className="relative z-10 py-20 bg-black/30 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 flex items-center gap-3">
                <LayoutDashboard className={theme.text} /> Interface Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.dashboards.map((dashboard, i) => (
                  <div key={i} className="p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                    <p className="text-white/80 font-light">{dashboard}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 flex items-center gap-3">
                <Activity className={theme.text} /> Business Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.businessImpact.map((impact, i) => (
                  <div key={i} className={cn("p-6 rounded-xl border transition-colors shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]", theme.border, theme.bgLight)}>
                    <p className="text-white font-light text-sm">{impact}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-50px" }}
          className="max-w-5xl mx-auto rounded-3xl border border-white/20 bg-gradient-to-b from-white/5 to-[#080e24]/90 p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className={cn("absolute inset-0 blur-3xl pointer-events-none opacity-30", theme.bgLight)} style={{ transform: 'translateZ(0)' }} />
          
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 drop-shadow-lg">
            Deploy <span className={theme.text}>{product.title}</span> Today
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light mb-10">
            Book a demo or schedule a consultation to explore pricing, rollout options, and infrastructure integration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={product.hero.primaryCta.href} className="group relative inline-block">
              <div className={cn("absolute inset-0 rounded-full blur-md opacity-100 group-hover:opacity-80 transition-opacity duration-500 animate-pulse", theme.bgLight)} />
              <div className="relative flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-finova-midnight font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                {product.hero.primaryCta.label}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
