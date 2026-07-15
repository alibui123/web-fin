"use client";

import { motion } from "framer-motion";

export default function TrustedBy() {
  const logos = [
    { src: "/logos/clients/Sirius-Solutions.png", alt: "Sirius Solutions" },
    { src: "/logos/clients/telecom-foundation-logo-png_seeklogo-544379.png", alt: "Telecom Foundation" },
    { src: "/logos/clients/NIC-LOGO-removebg-preview.png", alt: "NIC" },
    { src: "/logos/clients/Ministry of IT-LOGO.png", alt: "Ministry of IT" },
    { src: "/logos/clients/Easypaisa-logo.png", alt: "Easypaisa" },
    { src: "/logos/clients/JazzCash_logo_(2025).png", alt: "JazzCash" },
    { src: "/logos/clients/ROOTS-WHITE-LOGO-01.png", alt: "Roots" },
    { src: "/logos/clients/advanza-logo.png", alt: "Advanza" },
    { src: "/logos/clients/Kobi-pal.png", alt: "Kobi Pal" },
    { src: "/logos/clients/Pakistan-sweethome.png", alt: "Pakistan Sweet Home" },
    { src: "/logos/clients/Crumble.png", alt: "Crumble" },
  ];

  const logosGroup = (
    <div className="flex items-center flex-shrink-0 min-w-max gap-16 md:gap-24 lg:gap-32 px-8 md:px-12 lg:px-16">
      {logos.map((logo) => (
        <div key={logo.alt} className="group relative cursor-pointer transition-all duration-300 hover:scale-105 flex-shrink-0">
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className="h-16 sm:h-20 md:h-24 w-auto max-w-[220px] object-contain opacity-85 brightness-0 invert transition-all duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"
          />
          <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-finova-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 bg-finova-midnight overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-finova-cyan/10 blur-3xl opacity-30 pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

      <div className="container mx-auto px-4 sm:px-6 mb-12 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/[0.03]"
          >
            <p className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-[0.2em]">
              Our Clients & Partners
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full flex overflow-hidden relative z-10 py-12"
      >
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-finova-midnight to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-finova-midnight to-transparent z-10 pointer-events-none"></div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 120, repeat: Infinity }}
          className="flex w-max"
          style={{ willChange: 'transform' }}
        >
          {logosGroup}
          {logosGroup}
          {logosGroup}
          {logosGroup}
        </motion.div>
      </motion.div>
    </section>
  );
}
