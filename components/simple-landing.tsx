import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { CALENDLY_URL } from "@/lib/site"

// Reusable rough page scaffold for Phase-2 routes (solutions, industries, how-it-works,
// pricing). On-site copy rule: no em dashes, no colons or semicolons.

export interface SimpleFeature {
  icon: LucideIcon
  title: string
  body: string
  href?: string
}

export interface SimpleSection {
  heading: string
  items: SimpleFeature[]
}

export interface SimpleCta {
  label: string
  href: string
  external?: boolean
}

export interface SimpleLandingProps {
  eyebrow: string
  eyebrowIcon: LucideIcon
  title: React.ReactNode
  subtitle: string
  primaryCta?: SimpleCta
  secondaryCta?: SimpleCta
  sections: SimpleSection[]
  accountability?: { heading: string; body: string; cta?: SimpleCta }
  finalHeading: string
  finalSub: string
}

function CtaButton({ cta, filled }: { cta: SimpleCta; filled?: boolean }) {
  const className = filled
    ? "group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:bg-finova-cyan hover:text-white"
    : "group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] text-white font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10"

  const inner = (
    <>
      {cta.label}
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </>
  )

  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={cta.href} className={className}>
      {inner}
    </Link>
  )
}

function FeatureCard({ item }: { item: SimpleFeature }) {
  const content = (
    <div className="relative z-10 flex flex-col h-full">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 self-start transition-transform duration-300 group-hover:scale-105">
        <item.icon className="w-7 h-7 text-white/70 group-hover:text-finova-cyan transition-colors" />
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-3 text-white">{item.title}</h3>
      <p className="text-white/60 text-base font-light leading-relaxed flex-grow">{item.body}</p>
      {item.href && (
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
          Learn more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      )}
    </div>
  )

  const cardClass =
    "group relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 h-full overflow-hidden transition-all duration-500 hover:border-white/20"

  if (item.href) {
    return (
      <Link href={item.href} className={cardClass}>
        {content}
      </Link>
    )
  }
  return <div className={cardClass}>{content}</div>
}

export default function SimpleLanding({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  sections,
  accountability,
  finalHeading,
  finalSub,
}: SimpleLandingProps) {
  return (
    <main className="min-h-screen bg-finova-midnight text-white pt-24 pb-20 overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ transform: "translateZ(0)" }}>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-finova-cyan/15 blur-3xl rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-finova-magenta/15 blur-3xl rounded-full opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center pt-8 pb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs md:text-sm mb-8 text-finova-cyan tracking-[0.2em] uppercase border border-finova-cyan/30 bg-finova-cyan/10 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <EyebrowIcon className="w-4 h-4" />
            {eyebrow}
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[1.05] mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {title}
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCta && <CtaButton cta={primaryCta} filled />}
              {secondaryCta && <CtaButton cta={secondaryCta} />}
            </div>
          )}
        </section>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.heading} className="max-w-6xl mx-auto py-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14">
              {section.heading}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.items.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* Accountability strip */}
        {accountability && (
          <section className="max-w-5xl mx-auto py-12">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="inline-flex items-center justify-center w-16 h-16 shrink-0 rounded-2xl bg-finova-magenta/10 border border-finova-magenta/20 text-finova-magenta shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
                  {accountability.heading}
                </h2>
                <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                  {accountability.body}
                </p>
              </div>
              {accountability.cta && (
                <Link
                  href={accountability.cta.href}
                  className="group inline-flex items-center gap-2 shrink-0 text-xs font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  {accountability.cta.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto text-center py-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            {finalHeading}
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed mb-10">{finalSub}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:bg-finova-cyan hover:text-white"
          >
            Book a call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>
      </div>
    </main>
  )
}
