"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

const cards = [
  {
    eyebrow: "Workflow and ERP, automated",
    display: "9",
    context: "modules live across Odoo ERP",
    chip: "Live in production",
    accent: false,
    entity: "Telecom Foundation",
    sector: "Ministry of IT and Telecom subsidiary",
    story:
      "Public institutions do not hand over their core systems on faith, they test and scrutinize and hold vendors to a standard most private buyers never apply. We automated nine modules across their Odoo ERP, HR, task assignment, KPI and performance tracking, and accounts, turning administration that used to be done by hand into agents that run the back office on their own, always with a person in control.",
    quote:
      "Finova reshaped how our teams use Odoo every day. Their agents took the most tedious parts of task assignment off our seniors and gave managers honest, real-time insight into performance, always with a person in control.",
    quoteBy: "Atifa Ehsan, EVP of HR and Admin, Telecom Foundation",
    microStat: null as string | null,
  },
  {
    eyebrow: "Verification workflow, with writeback",
    display: "~50",
    context: "verifications a day, off staff phones",
    chip: "Measured in production",
    accent: false,
    entity: "Sirius Solutions Global",
    sector: "US healthcare medical billing",
    story:
      "Confirming a patient's coverage meant staff sitting through insurance hold queues by hand, all day. Our agent now makes those calls at roughly fifty verifications a day, confirms the coverage, and writes the structured result straight back into their system. The call is only the trigger. The writeback into the record is the work.",
    quote:
      "AwaazLabs runs our insurance verification end to end. It freed our team from the repetitive calls to focus on the work that matters.",
    quoteBy: "Taimoor Malik, Sirius Solutions, United States",
    microStat: null as string | null,
  },
  {
    eyebrow: "Revenue pipeline, created",
    display: "70",
    context: "qualified meetings booked in month two",
    chip: "Measured in production",
    accent: true,
    entity: "Advanzatech",
    sector: "MENA cybersecurity distributor",
    story:
      "In its second month live, our outbound agent booked seventy qualified meetings for their sales team, qualifying leads, handling objections, and booking straight into the calendar with full context waiting for the closer. Every one of those meetings is pipeline the team did not have to source by hand.",
    quote:
      "Finova's voice agents now drive our outreach and a large share of our manual operations, and we have won back hours we used to lose to repetitive work.",
    quoteBy: "Hashir Farhan, Advanzatech",
    microStat: "2 min 40 sec average call · sub-1s latency",
  },
]

export default function ProofExhibit() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section
      id="proof"
      className="py-16 md:py-24 relative bg-finova-midnight overflow-hidden border-y border-white/5"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-40 bg-finova-cyan/10 blur-3xl opacity-30 pointer-events-none will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-14 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5">
            Proof, live in production
          </h2>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            We do not lead with a demo. We lead with clients you can name and numbers we can stand
            behind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-7 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <motion.article
              key={card.entity}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col rounded-3xl border p-7 md:p-8 overflow-hidden transition-all duration-500 ${
                card.accent
                  ? "border-finova-cyan/40 bg-finova-cyan/[0.04] shadow-[0_0_40px_rgba(14,165,233,0.12)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {card.accent && (
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-finova-cyan/10 blur-3xl rounded-full pointer-events-none" />
              )}
              <div className="relative z-10 flex flex-col h-full">
                <span
                  className={`text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5 ${
                    card.accent ? "text-finova-cyan" : "text-white/50"
                  }`}
                >
                  {card.eyebrow}
                </span>

                <div className="mb-5">
                  <span className="block text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
                    {card.display}
                  </span>
                  <span className="block mt-2 text-sm text-white/55 font-light">{card.context}</span>
                </div>

                <span className="inline-flex self-start mb-5 text-[10px] font-mono font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-white/10 text-white/50">
                  {card.chip}
                </span>

                <div className="mb-4">
                  <Link
                    href="/customers"
                    className="text-white font-bold hover:text-finova-cyan transition-colors"
                  >
                    {card.entity}
                  </Link>
                  <p className="text-xs text-white/40 mt-1">{card.sector}</p>
                </div>

                <p className="text-white/60 text-sm font-light leading-relaxed mb-6 flex-grow">
                  {card.story}
                </p>

                <blockquote className="border-l-2 border-finova-cyan/40 pl-4 mb-4">
                  <p className="text-white/80 text-sm italic leading-relaxed mb-2">
                    &ldquo;{card.quote}&rdquo;
                  </p>
                  <cite className="text-xs text-white/45 not-italic">— {card.quoteBy}</cite>
                </blockquote>

                {card.microStat && (
                  <p className="text-[11px] font-mono tracking-wide text-finova-cyan/80 mt-auto">
                    {card.microStat}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto mt-12 md:mt-14 text-center"
        >
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-6">
            One agentic core is behind all three, running workflows, conversations, and quality
            assurance in five languages, Khaleeji and Levantine Arabic, English, Hindi, and Urdu.
            Finova is incubated at the National Incubation Center, Cohort 5, is a prequalified vendor
            with JazzCash and Easypaisa, and is a member of the Chamber of Commerce. Production status
            as of July 2026.
          </p>
          <Link
            href="/customers"
            className="group inline-flex items-center gap-2 text-sm font-bold tracking-[0.12em] uppercase text-finova-cyan hover:text-white transition-colors"
          >
            See customer stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
