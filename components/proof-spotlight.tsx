"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Radio } from "lucide-react";
import { CALENDLY_URL } from "@/lib/site";

// Verbatim from the published Company Profile, which serves as the permission record (v5 §13).
// Spelling "AwaazLabs" kept verbatim as published, even though elsewhere it is "Awaaz Labs".
const voices = [
  {
    quote:
      "Finova reshaped how our teams use Odoo every day. Their agents took the most tedious parts of task assignment off our seniors and gave managers honest, real-time insight into performance, always with a person in control. What stood out was their technical depth, and how plainly they explained it.",
    by: "Atifa Ehsan",
    role: "EVP, HR and Admin, Telecom Foundation, Ministry of IT",
  },
  {
    quote:
      "AwaazLabs runs our insurance verification end to end. It freed our team from the repetitive calls to focus on the work that matters. The quality and the experience have been excellent.",
    by: "Taimoor Malik",
    role: "Sirius Solutions, United States",
  },
  {
    quote:
      "Finova's voice agents now drive our outreach and a large share of our manual operations. The quality has been first class, and we have won back hours we used to lose to repetitive work.",
    by: "Hashir Farhan",
    role: "AdvanzaTech, MENA",
  },
];

export default function ProofSpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden border-y border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-finova-cyan/5 via-finova-midnight to-finova-midnight pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs md:text-sm mb-8 text-finova-cyan tracking-[0.2em] uppercase border border-finova-cyan/30 bg-finova-cyan/10 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <Radio className="w-4 h-4" />
            Live deployment
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-8">
            Insurance verification, now run by an agent
          </h2>

          <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-6">
            Sirius Solutions Global runs medical-billing operations for US providers.
            Confirming a patient&apos;s coverage meant staff sitting through hold queues by
            hand, all day. Our voice agent now makes those calls, confirms the coverage, and
            writes the result straight back into the record. The team spends its time on the
            cases that need a person.
          </p>

          <p className="text-white/40 text-sm font-light leading-relaxed italic mb-10">
            Representative outcomes available on request. They vary by volume and payer mix.
          </p>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] text-white font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10"
          >
            Book a call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Client voices, verbatim from the published Company Profile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto mt-16"
        >
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/40 mb-8 text-center">
            Client voices
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {voices.map((v) => (
              <blockquote key={v.by} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 flex flex-col">
                <p className="text-white/70 text-sm font-light italic leading-relaxed flex-grow mb-6">
                  "{v.quote}"
                </p>
                <footer className="not-italic">
                  <div className="text-white font-bold text-sm">{v.by}</div>
                  <div className="text-white/40 font-mono text-xs mt-1">{v.role}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
