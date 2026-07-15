import React from "react"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Headset,
  Layers,
  Lock,
  Mic,
  Phone,
  ShieldCheck,
  UserRoundCheck,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const awaazCapabilities = [
  {
    icon: <Phone className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Inbound & Outbound Voice Automation",
    description:
      "Handle support, lead qualification, reminders, collections, and follow-ups through AI-led conversations that sound natural and context-aware.",
  },
  {
    icon: <UserRoundCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Identity & Context Verification",
    description:
      "Perform policy-based caller verification and fetch account details from CRM or backend systems before proceeding with sensitive actions.",
  },
  {
    icon: <Globe2 className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Multilingual Conversation Engine",
    description:
      "Support regional and global audiences with natural language understanding, language switching, and localized response tone.",
  },
  {
    icon: <Workflow className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Actionable Call Workflows",
    description:
      "Trigger ticket creation, status updates, payment links, scheduling, and escalation paths directly from ongoing call flows.",
  },
  {
    icon: <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Conversation Intelligence",
    description:
      "Track intent, sentiment, drop-off points, and conversion metrics to continuously optimize scripts and outcomes.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Governance & Compliance Controls",
    description:
      "Apply consent handling, secure transcripts, role-based access, and audit logging to meet business and regulatory needs.",
  },
]

const awaazFlow = [
  {
    step: "Step 01",
    title: "Call Intake & Intent Detection",
    detail:
      "Awaaz receives the call, identifies language preferences, and classifies intent in the first few exchanges for faster routing.",
  },
  {
    step: "Step 02",
    title: "Context Retrieval & Personalization",
    detail:
      "It pulls account history, interaction notes, and policy rules to produce responses that are precise and customer-specific.",
  },
  {
    step: "Step 03",
    title: "Resolution or Guided Action",
    detail:
      "Awaaz resolves common requests autonomously or completes defined backend actions such as ticketing, payment nudges, and scheduling.",
  },
  {
    step: "Step 04",
    title: "Escalation with Full Context",
    detail:
      "Complex scenarios are escalated to human teams with concise call summaries, intent tags, and recommended next steps.",
  },
]

const awaazUseCases = [
  "Customer support and status updates",
  "Lead qualification and appointment booking",
  "Payment reminders and collection nudges",
  "Renewal, onboarding, and retention calls",
  "Service dispatch and field confirmation",
  "Feedback capture and post-call surveys",
]

const awaazMetrics = [
  { value: "60%+", label: "Automated call resolution", note: "For repetitive and policy-bound interactions" },
  { value: "40%", label: "Lower support load", note: "By offloading high-volume call categories" },
  { value: "24/7", label: "Always-on availability", note: "Consistent response quality across time zones" },
  { value: "<2 sec", label: "Response latency", note: "Rapid conversational turn-taking at scale" },
]

export default function VoiceAIPage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative pt-12 pb-16 sm:pt-20 md:pt-32 sm:pb-24 md:pb-36">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/10" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs sm:text-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                <span>Awaaz | AI Voice Agent Platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Awaaz powers every customer conversation with intelligence and control
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl">
                Awaaz is Finova’s enterprise-grade voice AI platform for customer support, lead operations, reminders, and collections.
                It delivers natural multilingual interactions, executes backend actions, and escalates with full context when human intervention is needed.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm text-foreground/75 max-w-xl">
                {[
                  "Human-like call conversations",
                  "Multilingual, context-aware responses",
                  "Workflow-integrated call actions",
                  "Compliance-first conversation logs",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center justify-center">
                    Book Awaaz Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-emerald-500/20 hover:bg-emerald-500/5 w-full sm:w-auto">
                  <Link href="#awaaz-capabilities" className="flex items-center justify-center">
                    Explore Platform
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/20">
                <Image
                  src="/illustrations/voice-ai.svg"
                  alt="Awaaz AI Voice Platform"
                  fill
                  className="object-contain p-8"
                />
                <div className="absolute inset-0 bg-gradient-radial from-emerald-400/30 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/80 rounded-full"
                      style={{
                        height: `${5 + Math.sin(i * 0.7) * 10}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-lg opacity-70" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 blur-xl opacity-40" />
            </div>
          </div>
        </div>
      </section>

      <section id="awaaz-capabilities" className="py-12 sm:py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Detailed Awaaz capabilities</h2>
            <p className="text-sm sm:text-lg text-foreground/70 max-w-3xl mx-auto">
              Awaaz is built for real business voice operations — combining natural conversations, secure integrations, and measurable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {awaazCapabilities.map((feature) => (
              <div
                key={feature.title}
                className="bg-background/80 border border-emerald-500/10 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">How Awaaz operates from greeting to resolution</h2>
              <p className="text-base sm:text-lg text-foreground/70 mb-6">
                Every call follows a structured intelligence pipeline designed to maximize resolution quality and minimize operator intervention.
              </p>
              <div className="space-y-4">
                {awaazFlow.map((item) => (
                  <div key={item.step} className="rounded-lg border border-emerald-500/10 bg-background/70 p-4">
                    <div className="text-xs uppercase tracking-wider text-emerald-400 mb-1">{item.step}</div>
                    <div className="font-semibold mb-1">{item.title}</div>
                    <p className="text-sm text-foreground/70">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/10 bg-background/70 p-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">High-impact Awaaz use cases</h3>
              <div className="space-y-3">
                {awaazUseCases.map((useCase) => (
                  <div key={useCase} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full p-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                      <Mic className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-foreground/80">{useCase}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-emerald-500/10 bg-background/60 p-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Headset className="h-4 w-4 text-emerald-400" />
                  Human + AI operating model
                </div>
                <p className="text-sm text-foreground/70">
                  Awaaz handles repetitive and structured calls at scale while your teams focus on nuanced, high-value conversations and relationship management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Awaaz performance metrics</h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto">
              Track voice automation impact with operational KPIs tied to response quality, coverage, and business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {awaazMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-emerald-500/10 bg-background/70 p-5">
                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                  {metric.value}
                </div>
                <div className="font-medium mt-1">{metric.label}</div>
                <p className="text-sm text-foreground/65 mt-2">{metric.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-emerald-500/10 bg-background/70 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Security, integration, and governance by design</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-lg border border-emerald-500/10 bg-background/60 p-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Layers className="h-4 w-4 text-emerald-400" />
                  Connected Workflows
                </div>
                <p className="text-sm text-foreground/70">
                  Integrate with CRM, ticketing, payment gateways, and internal APIs so every call can trigger the right business action instantly.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/10 bg-background/60 p-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  Data Protection
                </div>
                <p className="text-sm text-foreground/70">
                  Secure recording and transcript access with policy controls, retention settings, and permission boundaries across roles.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/10 bg-background/60 p-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Compliance Readiness
                </div>
                <p className="text-sm text-foreground/70">
                  Maintain auditable interaction logs, escalation histories, and configurable guardrails for regulated customer operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 md:p-12 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">
                Deploy Awaaz for scalable voice-led growth
              </h2>
              <p className="text-sm sm:text-lg text-foreground/70 mb-6 sm:mb-8">
                Launch Awaaz with Finova’s implementation team to design call journeys, connect systems, and optimize performance from week one.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center justify-center">
                    Talk to Awaaz Expert
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-emerald-500/20 hover:bg-emerald-500/5 w-full sm:w-auto">
                  <Link href="/consultation" className="flex items-center justify-center">
                    Start Free Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
