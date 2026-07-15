"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Awaaz3DElement = dynamic(
  () => import("./awaaz-3d-element").then((mod) => mod.Awaaz3DElement),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const products = [
  {
    id: "awaaz",
    title: "AWAAZ",
    subtitle: "Conversational Voice AI Agent",
    description: "Human-like voice automation for inbound support, outbound sales, and scheduling with regional language fluency.",
    illustration: "/illustrations/voice-ai.svg",
    color: "from-finova-cyan to-finova-blue",
    glowColor: "rgba(14,165,233,0.5)",
  },
  {
    id: "qualicall",
    title: "Qualicall",
    subtitle: "AI Quality Assurance",
    description: "AI QA that listens to every call, scores adherence, and delivers explainable coaching insights.",
    illustration: "/illustrations/qualicall.svg",
    color: "from-finova-magenta to-finova-purple",
    glowColor: "rgba(217,70,239,0.5)",
  },
  {
    id: "ai-powered-erp",
    title: "AI-Powered ERP",
    subtitle: "Intelligent Operations Platform",
    description: "Unify tasks, approvals, and analytics with AI-assisted workflows and role-based dashboards.",
    illustration: "/illustrations/ai-erp.svg",
    color: "from-finova-purple to-finova-magenta",
    glowColor: "rgba(147,51,234,0.5)",
  },
  {
    id: "mehman-nawaz",
    title: "Mehman Nawaz",
    subtitle: "Hospitality AI Suite",
    description: "Personalized guest experiences with AI-driven pricing, loyalty, and operational management.",
    illustration: "/illustrations/mehman-nawaz.svg",
    color: "from-finova-lightBlue to-finova-cyan",
    glowColor: "rgba(43,142,190,0.5)",
  }
];

export default function FlagshipProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !containerRef.current) return;

    // Create the master timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=250%", // Reduced from 400vh to minimize layout recalculation thrashing
        pin: containerRef.current,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
      }
    });

    // Initialize states
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      } else {
        gsap.set(el, { opacity: 0, y: 100, scale: 0.95 });
      }
    });

    visualRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        gsap.set(el, { opacity: 1, scale: 1, zIndex: 10 + i });
      } else {
        gsap.set(el, { opacity: 0, scale: 0.8, zIndex: 10 + i });
      }
    });

    // We have 4 products, meaning 3 transitions.
    // Each transition takes a portion of the timeline.
    const totalTransitions = products.length - 1;

    for (let i = 0; i < totalTransitions; i++) {
      const currentText = textRefs.current[i];
      const nextText = textRefs.current[i + 1];
      const currentVisual = visualRefs.current[i];
      const nextVisual = visualRefs.current[i + 1];

      // Fade out current
      tl.to(currentText, {
        opacity: 0,
        y: -100,
        scale: 0.95,
        duration: 1,
        ease: "power2.inOut"
      }, i * 2);

      tl.to(currentVisual, {
        opacity: 0,
        scale: 1.2,
        duration: 1,
        ease: "power2.inOut"
      }, i * 2);

      // Bring in next
      tl.to(nextText, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, (i * 2) + 0.5); // Slight overlap

      tl.to(nextVisual, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, (i * 2) + 0.5);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-finova-midnight">
      {/* Global Heading - Now outside the scrollable area */}
      <div className="w-full flex flex-col items-center z-20 px-4 text-center pt-16 pb-8">
        <div className="font-mono text-xs md:text-sm mb-4 text-finova-cyan tracking-widest uppercase border border-finova-cyan/30 bg-finova-cyan/10 inline-block px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.2)]">
          Central Infrastructure
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Our Flagship Products
        </h2>
      </div>

      {/* The spacer section that creates the scrollable height - matched to GSAP end: +=250% */}
      <section ref={sectionRef} className="relative h-[350vh]">

        {/* The GSAP Pinned Container */}
        <div
          ref={containerRef}
          className="relative w-full h-screen overflow-hidden flex flex-col justify-center"
        >
          {/* Optimized Ambient Backgrounds without mix-blend or massive blurs */}
          <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none z-0 will-change-transform" style={{ transform: 'translateZ(0)' }} />
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-finova-cyan/20 rounded-full blur-3xl opacity-50 pointer-events-none z-0 will-change-transform" style={{ transform: 'translateZ(0)' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-finova-magenta/20 rounded-full blur-3xl opacity-50 pointer-events-none z-0 will-change-transform" style={{ transform: 'translateZ(0)' }} />

          <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full flex-grow flex flex-col md:flex-row items-center justify-center">

            {/* Left Side: Text Details */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-[60vh] relative flex items-center">
              {products.map((product, index) => (
                <div
                  key={`text-${product.id}`}
                  ref={el => { textRefs.current[index] = el }}
                  className="absolute inset-x-0 w-full md:pr-16 flex flex-col justify-center will-change-transform"
                  style={{ transform: 'translateZ(0)' }}
                >

                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 uppercase tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    {product.title}
                  </h2>

                  <h3 className={`text-xl md:text-2xl font-mono tracking-widest uppercase mb-8 text-transparent bg-clip-text bg-gradient-to-r ${product.color}`}>
                    {product.subtitle}
                  </h3>

                  <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
                    {product.description}
                  </p>

                  <Link href={`/products/${product.id}`} className="group relative w-fit">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center justify-center gap-4 px-8 py-4 rounded-full border border-white/20 bg-black/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/40">
                      <div className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      <span className="font-mono text-sm tracking-[0.2em] uppercase text-white font-bold relative z-10">
                        Explore Platform
                      </span>
                      <ArrowRight className="w-4 h-4 text-white relative z-10 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Side: 3D Visual Representations */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-[80vh] relative perspective-[1000px] mt-10 md:mt-0 flex items-center justify-center">
              {products.map((product, index) => {
                return (
                  <div
                    key={`visual-${product.id}`}
                    ref={el => { visualRefs.current[index] = el }}
                    className="absolute inset-0 flex items-center justify-center will-change-transform"
                    style={{ transform: 'translateZ(0)' }}
                  >
                    {/* Abstract 3D Glass Composition representing the product */}
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                      {/* Outer Glowing Ring - Removed backdrop-blur-3xl and heavy box-shadow for performance */}
                      <div className={`absolute inset-0 rounded-full border border-white/20 bg-gradient-to-br from-white/5 to-transparent animate-[spin_20s_linear_infinite]`} style={{ borderTopColor: 'rgba(255,255,255,0.5)', borderRightColor: 'rgba(255,255,255,0.2)' }} />

                      {/* Counter-rotating Inner Ring */}
                      <div className={`absolute inset-8 rounded-full border-2 border-dashed border-white/30 bg-gradient-to-br ${product.color} opacity-20 animate-[spin_15s_linear_infinite_reverse]`} />

                      {/* Core Solid Box - Replaced glass filters with solid optimized colors */}
                      <div className="absolute inset-16 rounded-3xl bg-[#0F172A] border border-white/20 flex items-center justify-center overflow-hidden transform-gpu hover:scale-105 transition-transform duration-700 shadow-xl">
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-30`} />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                        {product.id === "awaaz" ? (
                          <Awaaz3DElement />
                        ) : (
                          <div className="relative w-20 h-20 md:w-32 md:h-32 hover:scale-110 transition-transform duration-500 z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            <Image
                              src={product.illustration}
                              alt={product.title}
                              fill
                              className="object-contain brightness-0 invert opacity-90"
                            />
                          </div>
                        )}
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 animate-bounce delay-75" />
                      <div className="absolute -bottom-8 left-8 w-8 h-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 animate-bounce delay-150" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
