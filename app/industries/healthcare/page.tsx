import { Metadata } from "next"
import Link from "next/link"
import {
  HeartPulse,
  PhoneIncoming,
  ClipboardList,
  BellRing,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { CALENDLY_URL } from "@/lib/site"

// NOTE: rough placeholder page for the Healthcare industry (clinics, med-spa, dental).
// On-site copy rule followed: no em dashes, no colons or semicolons.
export const metadata: Metadata = {
  title: "AI Agents for Healthcare Clinics, Built and Run for You | Finova",
  description:
    "Finova builds and runs voice AI agents for clinics, med-spa, aesthetics, and dental. Front desk, intake, reminders, and reactivation in the patient's language.",
  alternates: { canonical: "/industries/healthcare" },
}

const jobs = [
  {
    icon: PhoneIncoming,
    title: "Front desk",
    body: "Every call answered and every patient booked, day and night, in their language.",
  },
  {
    icon: ClipboardList,
    title: "Intake",
    body: "New patients are qualified and their details captured straight into your system.",
  },
  {
    icon: BellRing,
    title: "Reminders",
    body: "Appointment reminders go out on their own, so fewer chairs sit empty.",
  },
  {
    icon: RefreshCw,
    title: "Reactivation",
    body: "Lapsed patients are followed up and brought back without your team lifting a finger.",
  },
]

export default function HealthcarePage() {
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
        <section className="max-w-4xl mx-auto text-center pt-8 pb-20">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm mb-8 text-finova-cyan tracking-[0.2em] uppercase border border-finova-cyan/30 bg-finova-cyan/10 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)] hover:border-finova-cyan/50 transition-colors"
          >
            <HeartPulse className="w-4 h-4" />
            Industries
          </Link>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[1.05] mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            AI agents for clinics,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-finova-cyan via-finova-lightBlue to-finova-purple">
              built and run for you
            </span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Finova builds and runs voice agents for clinics, med-spa, aesthetics, and dental.
            Front desk, intake, reminders, and reactivation in the patient&apos;s language, and
            clinical questions go to your team.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:bg-finova-cyan hover:text-white"
            >
              Book a call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/products/awaaz"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] text-white font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 hover:border-finova-cyan/50 hover:bg-finova-cyan/10"
            >
              Hear a live agent
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* What we run for clinics */}
        <section className="max-w-6xl mx-auto py-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-14">
            What we run for your clinic
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:border-white/20"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 transition-transform duration-300 group-hover:scale-105">
                  <job.icon className="w-7 h-7 text-white/70 group-hover:text-finova-cyan transition-colors" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3">{job.title}</h3>
                <p className="text-white/60 text-base font-light leading-relaxed">{job.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accountability strip */}
        <section className="max-w-5xl mx-auto py-12">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="inline-flex items-center justify-center w-16 h-16 shrink-0 rounded-2xl bg-finova-magenta/10 border border-finova-magenta/20 text-finova-magenta shadow-[0_0_20px_rgba(217,70,239,0.15)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
                Every interaction scored, every change signed off
              </h2>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                Every agent is governed by QualiCall, our quality engine. It scores every
                conversation, a person approves the calls where judgment belongs, and clinical
                questions always go to your team.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/solutions/ai-quality-assurance"
              className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
            >
              QualiCall
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/trust"
              className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
            >
              Trust and security
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto text-center py-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Tell us the work you want off your plate
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
            Book a call and we will map where your clinic is losing time, no pitch.
          </p>
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
