"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Facebook, Linkedin, Instagram, ArrowRight, Mail } from "lucide-react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })

  // Container Parallax
  const containerY = useTransform(scrollYProgress, [0, 1], ["15%", "0%"])
  const containerScale = useTransform(scrollYProgress, [0, 1], [0.98, 1])

  // Marquee Parallax
  const marqueeY = useTransform(scrollYProgress, [0.6, 1], [50, 0])
  const marqueeOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1])

  const bentoVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }

  return (
    <footer ref={footerRef} className="relative w-full bg-finova-midnight overflow-hidden">

      {/* Optimized Neon Backgrounds - Removed mix-blend and massive blurs */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-finova-cyan/20 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-finova-magenta/20 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

      <motion.div
        style={{ y: containerY, scale: containerScale, transformOrigin: "top center", willChange: "transform" }}
        className="w-full min-h-[800px] flex flex-col justify-between pt-24 pb-8 relative border-t border-white/10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col h-full justify-between flex-grow">

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 max-w-7xl mx-auto w-full">

            {/* CTA Box (Spans 2x2) */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={bentoVariants}
              className="md:col-span-2 md:row-span-2 group relative p-10 rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden flex flex-col justify-between h-full min-h-[300px] hover:border-finova-cyan/30 transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-finova-cyan/5 to-finova-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 text-finova-cyan text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                    Connect
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-white mb-6 uppercase">
                    Let's Build <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan to-finova-lightBlue">Something Great.</span>
                  </h2>
                </div>
                <Link href="/contact" className="self-start inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold font-mono text-sm tracking-widest uppercase rounded-full hover:bg-finova-cyan hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] group/btn overflow-hidden relative">
                  <span className="relative z-10">Contact Us</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Link Columns */}
            {[
              {
                title: 'Company',
                links: [
                  { name: 'About', href: '/about' },
                  { name: 'How it works', href: '/how-it-works' },
                  { name: 'Trust and security', href: '/trust' },
                  { name: 'Pricing', href: '/pricing' },
                  { name: 'Contact', href: '/contact' },
                ],
              },
              {
                title: 'Solutions',
                links: [
                  { name: 'AI agent development', href: '/solutions' },
                  { name: 'Workflow automation', href: '/solutions/workflow-automation' },
                  { name: 'Custom AI development', href: '/solutions/custom-ai-development' },
                  { name: 'AI receptionist', href: '/solutions/ai-receptionist' },
                  { name: 'QA', href: '/solutions/ai-quality-assurance' },
                ],
              },
              {
                title: 'Industries',
                links: [
                  { name: 'Healthcare', href: '/industries/healthcare' },
                  { name: 'Financial services', href: '/industries/financial-services' },
                  { name: 'Government', href: '/industries/government' },
                  { name: 'Home services', href: '/industries/home-services' },
                ],
              },
              {
                title: 'Resources',
                links: [
                  { name: 'Blog', href: '/blog' },
                  { name: 'Case studies', href: '/portfolio' },
                  { name: 'Live demo', href: '/#demo' },
                  { name: 'Free audit', href: '/tools/ai-readiness-assessment' },
                  { name: 'AI consulting', href: '/solutions/ai-consulting' },
                ],
              },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={bentoVariants}
                className="md:col-span-1 md:row-span-1 p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500 relative group overflow-hidden will-change-transform"
                style={{ transform: 'translateZ(0)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase mb-6 group-hover:text-white/60 transition-colors">{col.title}</h3>
                  <ul className="space-y-4">
                    {col.links.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-white/80 font-bold hover:text-finova-cyan transition-colors flex items-center gap-2 group/link">
                          <span className="w-0 h-[2px] bg-finova-cyan group-hover/link:w-3 transition-all duration-300 ease-out" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

          </div>

          {/* Socials & Contact strip */}
          <motion.div
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={bentoVariants}
            className="mb-16 max-w-7xl mx-auto w-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-finova-magenta/30 transition-colors duration-500 relative group overflow-hidden will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-finova-magenta/5 to-finova-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
              <div>
                <h3 className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase mb-6 group-hover:text-white/60 transition-colors">Networks</h3>
                <ul className="flex gap-4">
                  {[
                    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/finovasolutions/' },
                    { name: 'Facebook', icon: Facebook, href: '#' },
                    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/finovasolutions.tech/?hl=en' }
                  ].map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center hover:border-finova-magenta hover:bg-finova-magenta/10 hover:text-finova-magenta transition-all duration-300 group/icon">
                        <item.icon className="w-5 h-5 group-hover/icon:scale-110 transition-transform" />
                        <span className="sr-only">{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full md:w-auto h-[1px] md:h-16 md:w-[1px] bg-white/10" />

              <div className="flex-1 w-full">
                <h3 className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase mb-6 group-hover:text-white/60 transition-colors">Direct Comm</h3>
                <a href="mailto:info@finovasolutions.tech" className="flex items-center gap-3 text-white/80 hover:text-finova-magenta transition-colors group/mail w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:border-finova-magenta/30">
                  <Mail className="w-5 h-5" />
                  <span className="font-mono text-sm tracking-widest truncate">info@finovasolutions.tech</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Massive Typography Bottom */}
          <motion.div
            style={{ y: marqueeY, opacity: marqueeOpacity, willChange: "transform, opacity" }}
            className="mt-auto flex flex-col relative w-full overflow-hidden"
          >
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes marquee-lr {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
              .animate-marquee-lr {
                animation: marquee-lr 40s linear infinite;
                display: flex;
                width: max-content;
              }
            `}} />
            <div className="w-full overflow-hidden flex whitespace-nowrap py-4 mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)">
              <div className="animate-marquee-lr">
                {[...Array(4)].map((_, i) => (
                  <div key={i} aria-hidden="true" className="text-[12vw] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/0 uppercase select-none pointer-events-none pr-12 drop-shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                    FINOVA SOLUTIONS <span className="text-white/5 mx-4 font-sans">•</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GEO definitional line + tagline (v5 §16) */}
            <div className="w-full text-center px-4 mb-8 pt-8 border-t border-white/10">
              <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed max-w-3xl mx-auto mb-4">
                Finova Solutions is a managed agentic AI company that builds, runs, and quality-checks AI agents inside the tools businesses already use, automating workflows and ERP, conversations, and custom AI, live in production across US healthcare operations, government, and MENA enterprise operations.
              </p>
              <p className="text-white/70 font-bold tracking-tight text-sm md:text-base">
                Finova Solutions. Agentic AI, built and run for you.
              </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-between items-center text-white/40 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase mt-4 border-t border-white/10 pt-8 pb-4">
              <p>&copy; {new Date().getFullYear()} FINOVA SOLUTIONS. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-8 mt-4 sm:mt-0">
                <Link href="/privacy-policy" className="hover:text-finova-cyan transition-colors">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-finova-cyan transition-colors">Terms of Service</Link>
                <Link href="/cookie-policy" className="hover:text-finova-cyan transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </footer>
  )
}
