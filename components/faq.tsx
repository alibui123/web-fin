"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { homepageFaqs } from "@/lib/homepage-faq";

const faqColors = [
  "from-finova-cyan to-finova-blue",
  "from-finova-magenta to-finova-purple",
  "from-finova-lightBlue to-finova-cyan",
  "from-finova-purple to-finova-magenta",
  "from-finova-cyan to-finova-lightBlue",
];

const faqs = homepageFaqs.map((faq, i) => ({
  ...faq,
  color: faqColors[i % faqColors.length],
}));

function FAQItem({
  faq,
  index,
  isActive,
  onClick,
  isInView
}: {
  faq: typeof faqs[0],
  index: number,
  isActive: boolean,
  onClick: () => void,
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer mb-4"
      onClick={onClick}
    >
      {/* Active glow */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="activeFaqGlow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-finova-cyan to-finova-magenta blur-xl z-0`}
          />
        )}
      </AnimatePresence>

      {/* Hover glow (inactive) */}
      {!isActive && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-finova-cyan to-finova-magenta opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500 z-0" />
      )}

      <div
        className={`relative border rounded-2xl overflow-hidden transition-colors duration-500 z-10 ${isActive ? 'bg-white/[0.05] border-finova-cyan/30 shadow-[0_0_30px_rgba(14,165,233,0.15)]' : 'bg-white/[0.03] border-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]'}`}
      >
        <div className="p-6 md:p-8 flex justify-between items-center z-10 relative">
          <div className="flex items-center gap-6">
            <span className={`font-mono text-sm md:text-base tracking-widest ${isActive ? 'text-finova-cyan drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]' : 'text-white/30 group-hover:text-white/50'} transition-all duration-300 font-bold`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={`text-lg md:text-xl font-bold tracking-tight ${isActive ? 'text-white' : 'text-white/80'} transition-colors`}>
              {faq.question}
            </h3>
          </div>

          <motion.div
            animate={{ rotate: isActive ? 135 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex shrink-0 items-center justify-center w-10 h-10 rounded-full border ${isActive ? 'border-finova-cyan/50 bg-finova-cyan/10' : 'border-white/10 group-hover:border-white/30'} transition-colors ml-4`}
          >
            <Plus className={`w-5 h-5 ${isActive ? 'text-finova-cyan' : 'text-white/50 group-hover:text-white'} transition-colors`} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 pt-0 text-white/60 font-light leading-relaxed text-base md:text-lg max-w-3xl ml-14">
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent mb-6" />
                {faq.question === "What does it cost?" ? (
                  <>
                    <Link
                      href="/pricing"
                      className="text-finova-cyan hover:text-finova-lightBlue underline-offset-4 hover:underline transition-colors font-medium"
                    >
                      Pricing
                    </Link>
                    {faq.answer.slice("Pricing".length)}
                  </>
                ) : faq.question === "What happens to our data?" ? (
                  <>
                    {faq.answer.slice(0, faq.answer.indexOf("trust page"))}
                    <Link
                      href="/trust"
                      className="text-finova-cyan hover:text-finova-lightBlue underline-offset-4 hover:underline transition-colors font-medium"
                    >
                      trust page
                    </Link>
                    {faq.answer.slice(
                      faq.answer.indexOf("trust page") + "trust page".length,
                    )}
                  </>
                ) : (
                  faq.answer
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top highlight border */}
        <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-finova-cyan to-finova-magenta opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'}`} />
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 relative bg-finova-midnight overflow-hidden">
      {/* Dynamic Background Orbs - optimized */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-finova-purple/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-finova-cyan/10 blur-3xl opacity-30 rounded-full pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

      {/* Cyber Grid Base - optimized: removed mask-image */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-finova-cyan/30 bg-finova-cyan/10 mb-8 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <span className="text-xs uppercase tracking-widest text-finova-cyan font-mono font-bold">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
            Questions operators ask before they book
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
            Straight answers on deliverables, ownership, data, timeline, and cost.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto flex flex-col">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isActive={activeIndex === index}
              onClick={() => toggleFAQ(index)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
