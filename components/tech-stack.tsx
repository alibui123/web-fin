"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  SiPython, SiTensorflow, SiPytorch, SiOpencv, SiHuggingface, 
  SiDocker, SiKubernetes, SiFlask, SiNodedotjs, SiMongodb, 
  SiNextdotjs, SiReact, SiTypescript, SiJavascript,
  SiPostgresql, SiRedis, SiGooglecloud, SiFigma,
  SiTailwindcss, SiGraphql, SiFirebase, SiVercel, SiNvidia
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const techRow1 = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
  { name: "HuggingFace", icon: SiHuggingface, color: "#FFD21E" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "NVIDIA", icon: SiNvidia, color: "#76B900" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
];

const techRow2 = [
  { name: "Flask", icon: SiFlask, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

// Double the arrays to create seamless loops using percentage translation
const loop1 = [...techRow1, ...techRow1];
const loop2 = [...techRow2, ...techRow2];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="tech-stack"
      className="py-14 relative bg-finova-midnight overflow-hidden"
    >
      {/* Background glowing orbs - optimized */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-finova-cyan/10 rounded-full blur-3xl opacity-30 pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-finova-purple/10 rounded-full blur-3xl opacity-30 pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="font-mono text-sm mb-4 text-finova-cyan tracking-widest uppercase border border-finova-cyan/30 bg-finova-cyan/10 inline-block px-4 py-1 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.2)]">
            Core Architecture
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Technical Foundation
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-8 py-10">
        
        {/* Row 1 - Left to Right */}
        <div className="relative w-full flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
            className="flex gap-6 whitespace-nowrap px-3 w-max"
            style={{ willChange: 'transform' }}
          >
            {loop1.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center justify-center w-36 h-36 shrink-0 rounded-2xl bg-white/[0.03] border border-white/10 group hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center transition-all duration-300 text-white/40 group-hover:text-[color:var(--hover-color)] group-hover:drop-shadow-[0_0_10px_var(--hover-color)] mb-3"
                    style={{ "--hover-color": tech.color } as React.CSSProperties}
                  >
                    <IconComponent className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-xs font-mono font-medium text-white/50 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="relative w-full flex">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
            className="flex gap-6 whitespace-nowrap px-3 w-max"
            style={{ willChange: 'transform' }}
          >
            {loop2.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center justify-center w-36 h-36 shrink-0 rounded-2xl bg-white/[0.03] border border-white/10 group hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center transition-all duration-300 text-white/40 group-hover:text-[color:var(--hover-color)] group-hover:drop-shadow-[0_0_10px_var(--hover-color)] mb-3"
                    style={{ "--hover-color": tech.color } as React.CSSProperties}
                  >
                    <IconComponent className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-xs font-mono font-medium text-white/50 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Side Gradients for fading out edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-finova-midnight to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-finova-midnight to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
