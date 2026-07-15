"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, MonitorSmartphone, BrainCircuit, Blocks, Cpu, Building2, Workflow, Target, Zap, CheckCircle2, Box
} from "lucide-react";
import type { Subservice, ServiceGroup } from "@/lib/services-data";
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
  icon: any;
}> = {
  "full-stack-development": {
    text: "text-finova-cyan",
    gradient: "from-finova-cyan to-finova-blue",
    border: "border-finova-cyan/30",
    hoverBorder: "hover:border-finova-cyan/30",
    bgLight: "bg-finova-cyan/10",
    shadow: "shadow-[0_0_10px_rgba(14,165,233,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(14,165,233,0.4)]",
    blob1: "bg-finova-blue/10",
    blob2: "bg-finova-cyan/10",
    icon: MonitorSmartphone
  },
  "ai-ml-engineering": {
    text: "text-finova-magenta",
    gradient: "from-finova-magenta to-finova-purple",
    border: "border-finova-magenta/30",
    hoverBorder: "hover:border-finova-magenta/30",
    bgLight: "bg-finova-magenta/10",
    shadow: "shadow-[0_0_10px_rgba(217,70,239,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(217,70,239,0.4)]",
    blob1: "bg-finova-purple/10",
    blob2: "bg-finova-magenta/10",
    icon: BrainCircuit
  },
  "blockchain-development": {
    text: "text-finova-purple",
    gradient: "from-finova-purple to-finova-cyan",
    border: "border-finova-purple/30",
    hoverBorder: "hover:border-finova-purple/30",
    bgLight: "bg-finova-purple/10",
    shadow: "shadow-[0_0_10px_rgba(147,51,234,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(147,51,234,0.4)]",
    blob1: "bg-finova-cyan/10",
    blob2: "bg-finova-purple/10",
    icon: Blocks
  },
  "iot-embedded-systems": {
    text: "text-finova-teal",
    gradient: "from-finova-teal to-finova-lightBlue",
    border: "border-finova-teal/30",
    hoverBorder: "hover:border-finova-teal/30",
    bgLight: "bg-finova-teal/10",
    shadow: "shadow-[0_0_10px_rgba(54,183,215,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(54,183,215,0.4)]",
    blob1: "bg-finova-lightBlue/10",
    blob2: "bg-finova-teal/10",
    icon: Cpu
  },
  "enterprise-it-solutions": {
    text: "text-finova-blue",
    gradient: "from-finova-blue to-finova-purple",
    border: "border-finova-blue/30",
    hoverBorder: "hover:border-finova-blue/30",
    bgLight: "bg-finova-blue/10",
    shadow: "shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    blob1: "bg-finova-purple/10",
    blob2: "bg-finova-blue/10",
    icon: Building2
  },
  "digital-transformation": {
    text: "text-finova-magenta",
    gradient: "from-finova-magenta to-finova-cyan",
    border: "border-finova-magenta/30",
    hoverBorder: "hover:border-finova-magenta/30",
    bgLight: "bg-finova-magenta/10",
    shadow: "shadow-[0_0_10px_rgba(217,70,239,0.5)]",
    shadowStrong: "shadow-[0_0_20px_rgba(217,70,239,0.4)]",
    blob1: "bg-finova-cyan/10",
    blob2: "bg-finova-magenta/10",
    icon: Workflow
  }
};

export default function ServiceLandingModern({ 
  subservice, 
  parent, 
  related 
}: { 
  subservice: Subservice; 
  parent: ServiceGroup | undefined; 
  related: Subservice[]; 
}) {
  const theme = THEME_MAP[subservice.parentId] || THEME_MAP["full-stack-development"];
  const ParentIcon = theme.icon;

  return (
    <main className={cn("min-h-screen bg-finova-midnight text-white overflow-x-hidden selection:text-white", `selection:${theme.bgLight}`)}>
      
      {/* Abstract Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={cn("absolute top-0 left-0 w-full h-[500px] rounded-full blur-[150px] mix-blend-screen opacity-40", theme.blob1)} />
        <div className={cn("absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] mix-blend-screen opacity-40", theme.blob2)} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-20" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 md:px-12 lg:px-16 container mx-auto">
        <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-white/50 mb-12">
          <Link href="/services" className={cn("flex items-center transition-colors group", `hover:${theme.text}`)}>
            <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            All Services
          </Link>
          {parent && (
            <Link href={parent.href} className={cn("flex items-center transition-colors", `hover:${theme.text}`)}>
              <span className="mx-2 text-white/20">/</span>
              {parent.title}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className={cn("inline-block px-4 py-1.5 rounded-full border backdrop-blur-md", theme.border)}>
              <span className={cn("font-mono text-xs uppercase tracking-widest font-bold", theme.text)}>
                {subservice.parentTitle}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {subservice.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light text-white/70 max-w-xl leading-relaxed">
              {subservice.description}
            </motion.p>
            
            <motion.p variants={fadeUp} className={cn("text-lg text-white/50 max-w-xl leading-relaxed border-l-2 pl-4", theme.border)}>
              {subservice.overview}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact" className="group relative">
                <div className={cn("absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500", theme.bgLight)} />
                <div className={cn("relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r text-white font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 active:scale-95", theme.gradient, theme.shadowStrong)}>
                  Request a consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            {/* Holographic Container for Icon */}
            <div className={cn("absolute inset-0 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[0_0_80px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden", theme.shadow)}>
              <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent opacity-50", theme.gradient)} style={{ mixBlendMode: 'screen' }} />
              
              <ParentIcon className={cn("w-32 h-32 md:w-48 md:h-48 relative z-10 drop-shadow-[0_0_25px_currentColor]", theme.text)} />

              {/* Inner glowing rings */}
              <div className={cn("absolute inset-4 rounded-full border border-dashed animate-[spin_30s_linear_infinite]", theme.border)} />
              <div className={cn("absolute inset-8 rounded-full border animate-[spin_20s_linear_infinite_reverse]", theme.border)} style={{ opacity: 0.5 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Audience & Use Cases - Bento Grid */}
      <section className="relative z-10 py-20 border-y border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 flex items-center gap-3">
                <Target className={theme.text} /> Who This Is For
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {subservice.whoItsFor.map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors flex items-center gap-4">
                    <CheckCircle2 className={cn("w-5 h-5 shrink-0", theme.text)} />
                    <p className="text-white/80 font-light">{item}</p>
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
                <Box className={theme.text} /> Common Use Cases
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subservice.useCases.map((item, i) => (
                  <div key={i} className={cn("p-6 rounded-xl border transition-colors shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]", theme.border, theme.bgLight)}>
                    <p className="text-white font-light text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="relative z-10 py-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-50px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Core Capabilities</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subservice.capabilities.map((capability, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: false, margin: "-50px" }}
              className={cn("p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent group transition-all duration-300", theme.hoverBorder)}
            >
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", theme.bgLight, theme.shadow)}>
                <Zap className={cn("w-6 h-6", theme.text)} />
              </div>
              <p className="text-lg font-light text-white/90">{capability}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="relative z-10 py-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">The Process</h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className={cn("absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent to-transparent transform md:-translate-x-1/2", theme.bgLight)} />
          
          {subservice.process.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
            >
              <div className={cn(`ml-20 md:ml-0 w-full md:w-1/2 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-colors ${i % 2 === 0 ? 'md:pr-12 md:mr-12 md:text-right' : 'md:pl-12 md:ml-12 md:text-left'}`, theme.hoverBorder)}>
                <span className={cn("font-mono text-sm mb-2 block", theme.text)}>Phase {i + 1}</span>
                <p className="text-lg font-light">{step}</p>
              </div>
              
              {/* Center Node */}
              <div className={cn("absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-finova-midnight border-2 z-10 flex items-center justify-center", theme.border, theme.shadow)}>
                 <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deliverables & Outcomes Highlight */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className={cn("absolute inset-0 skew-y-3 transform origin-top-left", theme.bgLight)} style={{ opacity: 0.3 }} />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: "-50px" }}
            className={cn("max-w-6xl mx-auto p-1px rounded-3xl bg-gradient-to-br to-transparent", theme.gradient)}
          >
            <div className="bg-finova-midnight rounded-3xl p-10 md:p-16 relative overflow-hidden">
              <div className={cn("absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none opacity-50", theme.blob1)} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 flex items-center gap-4">
                    <Blocks className={cn("w-10 h-10", theme.text)} />
                    Deliverables
                  </h2>
                  <ul className="space-y-4">
                    {subservice.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", theme.bgLight)}>
                          <Blocks className={cn("w-4 h-4", theme.text)} />
                        </div>
                        <span className="text-sm md:text-base font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 flex items-center gap-4">
                    <Target className={cn("w-10 h-10", theme.text)} />
                    Outcomes
                  </h2>
                  <ul className="space-y-4">
                    {subservice.outcomes.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", theme.bgLight)}>
                          <Target className={cn("w-4 h-4", theme.text)} />
                        </div>
                        <span className="text-sm md:text-base font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {related && related.length > 0 && (
        <section className="relative z-10 py-32 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Related Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.slice(0, 3).map((item) => (
              <Link key={item.slug} href={`/services/${subservice.parentId}/${item.slug}`}>
                <div className={cn("p-8 rounded-2xl border border-white/10 bg-black/40 hover:bg-white/[0.05] transition-all duration-300 h-full flex flex-col group", theme.hoverBorder)}>
                  <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                    {item.title}
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative z-10 pb-32 pt-16 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-50px" }}
          className="max-w-5xl mx-auto rounded-3xl border border-white/20 bg-gradient-to-b from-white/5 to-black/50 backdrop-blur-2xl p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className={cn("absolute inset-0 blur-[100px] pointer-events-none mix-blend-screen opacity-50", theme.bgLight)} />
          
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 drop-shadow-lg">
            Ready to build with <span className={theme.text}>Finova?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light mb-10">
            Tell us about your goals and we will map the right service path for your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative inline-block">
              <div className={cn("absolute inset-0 rounded-full blur-md opacity-100 group-hover:opacity-80 transition-opacity duration-500 animate-pulse", theme.bgLight)} />
              <div className="relative flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-finova-midnight font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                Talk to our team
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
