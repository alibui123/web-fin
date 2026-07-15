"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Awaaz3DElement = dynamic(
  () => import("./awaaz-3d-element").then((mod) => mod.Awaaz3DElement),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);



interface Product {
  id: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
  aiHighlight: string;
  illustration: string;
  color: string;
  glow: string;
}

const products: Product[] = [
  {
    id: "awaaz",
    title: "Awaaz",
    badge: "AI Voice Agent Platform",
    description: "Awaaz is an AI voice agent that speaks like a real person, handling inbound and outbound calls in regional languages and American English accents.",
    features: [
      "Human-like conversations with regional language fluency",
      "24/7 call coverage with unlimited concurrency",
      "Inbound support, outbound sales, and scheduling",
      "Seamless handoff to human agents when needed",
      "Deploy on your dialer or Finova infrastructure"
    ],
    aiHighlight: "AI adapts to caller language, intent, and sentiment in real time.",
    illustration: "/illustrations/voice-ai.svg",
    color: "from-finova-cyan to-finova-blue",
    glow: "rgba(14,165,233,0.5)"
  },
  {
    id: "qualicall",
    title: "Qualicall",
    badge: "AI Quality Assurance",
    description: "Qualicall listens to every call and scores script adherence, tone, sentiment, and outcomes with explainable evidence.",
    features: [
      "100% call coverage with objective QA scoring",
      "Agent coaching insights and performance trends",
      "Role-based dashboards for QA and leadership",
      "Compliance-ready audit trails and citations"
    ],
    aiHighlight: "AI scores every call with explainable evidence tied to timestamps.",
    illustration: "/illustrations/qualicall.svg",
    color: "from-finova-purple to-finova-magenta",
    glow: "rgba(147,51,234,0.5)"
  },
  {
    id: "ai-powered-erp",
    title: "AI-Powered ERP",
    badge: "Intelligent Operations Platform",
    description: "Centralize operations, automate workflows, and deliver real-time visibility with AI-powered dashboards and controls.",
    features: [
      "Employee activity monitoring and RBAC",
      "Task, project, and submission tracking",
      "Smart calendar with meeting invites",
      "AI reports and workload balancing"
    ],
    aiHighlight: "AI prioritizes tasks, predicts risk, and generates reports automatically.",
    illustration: "/illustrations/ai-erp.svg",
    color: "from-finova-magenta to-finova-purple",
    glow: "rgba(217,70,239,0.5)"
  },
  {
    id: "mehman-nawaz",
    title: "Mehman Nawaz",
    badge: "Hospitality AI Suite",
    description: "An AI-powered hospitality management suite for hotels, resorts, and guest houses with personalized guest experiences.",
    features: [
      "AI room recommendations and loyalty tiers",
      "Centralized booking and revenue control",
      "Staff management with role-based access",
      "Dynamic pricing and occupancy forecasting"
    ],
    aiHighlight: "AI drives dynamic pricing, guest personalization, and occupancy forecasting.",
    illustration: "/illustrations/mehman-nawaz.svg",
    color: "from-finova-lightBlue to-finova-cyan",
    glow: "rgba(43,142,190,0.5)"
  }
];

export default function ProductsList() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative w-full py-20 md:py-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 md:gap-32">
        {products.map((product, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={product.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative w-full group will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Replaced expensive backdrop-blur-xl with a simple solid fallback to avoid scroll compositor thrashing */}
              <div className="relative rounded-[2rem] border border-white/[0.08] bg-white/[0.03] shadow-2xl transition-colors duration-500 hover:border-white/[0.15]">
                
                {/* Subtle top edge highlight */}
                <div 
                  className="absolute top-0 left-0 w-full h-[1px] opacity-30"
                  style={{ background: `linear-gradient(90deg, transparent, ${product.glow}, transparent)` }}
                />

                <div className={`relative p-8 sm:p-10 md:p-16 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                  
                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <motion.div variants={childVariants} className="inline-block mb-4">
                      <div className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase border border-white/10 bg-white/[0.03] px-4 py-1.5 rounded-full text-white/70 flex items-center gap-3 w-fit">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${product.color}`} />
                        {product.badge}
                      </div>
                    </motion.div>
                    
                    <motion.h2 
                      variants={childVariants}
                      className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-5 leading-[1.1]"
                    >
                      {product.title}
                    </motion.h2>
                    
                    <motion.div variants={childVariants} className={`h-[2px] w-16 bg-gradient-to-r ${product.color} mb-6`} />
                    
                    <motion.p variants={childVariants} className="text-lg text-white/60 font-light leading-relaxed mb-8 max-w-xl">
                      {product.description}
                    </motion.p>

                    <motion.ul variants={childVariants} className="space-y-3 mb-10">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 mt-1`}>
                            <CheckCircle2 className={`w-4 h-4`} style={{ color: product.glow.replace('0.5', '1') }} />
                          </div>
                          <span className="text-base text-white/70 font-light">{feature}</span>
                        </li>
                      ))}
                    </motion.ul>

                    <motion.div
                      variants={childVariants}
                      className="mb-10 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-mono mb-2">AI Highlight</p>
                      <p className="text-white/70 font-light">{product.aiHighlight}</p>
                    </motion.div>

                    <motion.div variants={childVariants}>
                      <Link href={`/products/${product.id}`} className="inline-flex group/btn relative">
                        <div className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.02]">
                          <span className="font-mono text-xs tracking-[0.1em] uppercase text-white font-medium relative z-10">
                            Explore Platform
                          </span>
                          <ArrowRight className="w-4 h-4 text-white relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Visual / Illustration Side */}
                  <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <motion.div variants={imageVariants} className="relative w-full aspect-square max-w-[400px]">
                      
                      {/* Simplified Rings to save GPU layout thrashing */}
                      <div className={`absolute inset-0 rounded-full border-[0.5px] border-white/10 bg-transparent animate-[spin_40s_linear_infinite]`} style={{ borderTopColor: 'rgba(255,255,255,0.3)', borderRightColor: 'rgba(255,255,255,0.05)' }} />
                      <div className={`absolute inset-8 rounded-full border-2 border-dashed border-white/5 opacity-30 animate-[spin_30s_linear_infinite_reverse]`} />
                      
                      {/* Core Solid Element - Removed expensive backdrop-blur-md */}
                      <div className="absolute inset-16 rounded-[2rem] bg-[#0A0A0A] border border-white/[0.1] shadow-xl flex items-center justify-center overflow-hidden transform-gpu group-hover:scale-105 transition-transform duration-700">
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-[0.15]`} />
                        
                        {/* High-tech grid overlay - Removed expensive mask-image radial-gradient */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
                        
                        {/* Awaaz 3D Element or Original SVG */}
                        <div className="relative z-10 flex items-center justify-center w-full h-full">
                          {product.id === "awaaz" ? (
                            <Awaaz3DElement />
                          ) : (
                            <div className="relative w-32 h-32 md:w-48 md:h-48 hover:scale-110 transition-transform duration-500">
                              <Image
                                src={product.illustration}
                                alt={product.title}
                                fill
                                className="object-contain brightness-0 invert opacity-90"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                    </motion.div>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}