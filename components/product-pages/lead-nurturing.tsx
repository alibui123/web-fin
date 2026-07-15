import React from "react"
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  CircuitBoard,
  Database,
  FileCheck,
  Handshake,
  Layers,
  ShieldCheck,
  Timer,
  Truck,
  Users,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const capabilities = [
  {
    icon: <Wallet className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "AI Finance Copilot",
    description:
      "Automate reconciliations, cash-flow projections, payables workflows, and anomaly detection with explainable AI decisions.",
  },
  {
    icon: <Truck className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Smart Inventory & Supply",
    description:
      "Predict stock requirements, reduce dead inventory, and optimize procurement using demand signals, seasonality, and lead times.",
  },
  {
    icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Unified Customer Operations",
    description:
      "Connect CRM, support, sales, and billing to maintain a single account timeline from quote to renewal.",
  },
  {
    icon: <FileCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Workflow Automation Engine",
    description:
      "Define no-code approval chains and policy rules for purchase orders, expenses, onboarding, and compliance checkpoints.",
  },
  {
    icon: <ChartNoAxesCombined className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Real-time Executive Visibility",
    description:
      "Role-based dashboards for leadership, department heads, and operators with live KPIs and drill-down reporting.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Enterprise Security & Audit",
    description:
      "Granular access control, action logging, data lineage, and audit-ready exports for regulated and growth-stage teams.",
  },
]

const deploymentPhases = [
  {
    phase: "Phase 1",
    title: "Discovery & Process Mapping",
    detail:
      "Map existing finance, operations, and customer workflows. Identify bottlenecks, duplicate tools, and data quality gaps.",
  },
  {
    phase: "Phase 2",
    title: "Integration & Data Foundation",
    detail:
      "Connect ERP to CRM, accounting, payroll, banking, inventory, and support systems while normalizing historical records.",
  },
  {
    phase: "Phase 3",
    title: "Automation & AI Activation",
    detail:
      "Enable workflow bots, forecasting, anomaly alerts, and department-specific copilots with role-based permissions.",
  },
  {
    phase: "Phase 4",
    title: "Scale, Governance & Optimization",
    detail:
      "Track adoption, improve model accuracy, tune workflows, and establish governance for long-term operational excellence.",
  },
]

const kpiCards = [
  { value: "35–55%", label: "Faster cycle times", note: "Across approvals and back-office workflows" },
  { value: "20–30%", label: "Lower operating cost", note: "From automation and reduced manual overhead" },
  { value: "99.9%", label: "Data availability", note: "With resilient architecture and monitoring" },
  { value: "360°", label: "Business visibility", note: "Unified metrics across every core function" },
]

export default function LeadNurturingPage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative pt-12 pb-16 sm:pt-20 md:pt-32 sm:pb-24 md:pb-36">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-cyan-500/10" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs sm:text-sm">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
                <span>AI Powered ERP</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                One intelligent operating system for your entire business
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl">
                Finova AI Powered ERP connects finance, inventory, operations, and customer workflows into a single AI-native platform.
                Replace disconnected tools with one system that automates work, improves decisions, and scales with your growth.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm text-foreground/75 max-w-xl">
                {[
                  "Finance & accounting automation",
                  "Demand-aware inventory planning",
                  "Cross-team workflow orchestration",
                  "Real-time decision dashboards",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-orange-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-600 text-white w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center justify-center">
                    Book ERP Strategy Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-orange-500/20 hover:bg-orange-500/5 w-full sm:w-auto">
                  <Link href="#capabilities" className="flex items-center justify-center">
                    Explore Capabilities
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 shadow-xl shadow-orange-500/20">
                <Image
                  src="/illustrations/lead-nurturing.svg"
                  alt="AI Powered ERP Visualization"
                  fill
                  className="object-contain p-8"
                />
                <div className="absolute inset-0 bg-gradient-radial from-orange-400/20 via-transparent to-transparent opacity-70" />
              </div>
              <div className="absolute -top-6 -right-6 w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 blur-lg opacity-70" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-cyan-500 blur-2xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-12 sm:py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Detailed Platform Capabilities</h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto">
              Built for real operations, not demos — AI Powered ERP is designed to reduce friction between teams and turn operational data into execution speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {capabilities.map((feature) => (
              <div
                key={feature.title}
                className="bg-background/80 border border-orange-500/10 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-3 sm:mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-gradient-to-b from-background/40 to-background/80 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">How AI Powered ERP transforms execution</h2>
              <div className="h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-600" />
              <p className="text-lg text-foreground/70 leading-relaxed">
                Instead of forcing teams to chase spreadsheets, switch tools, and manually reconcile decisions, the platform orchestrates work end-to-end with AI recommendations and policy-based automation.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <BrainCircuit className="h-4 w-4" />,
                    text: "Decision intelligence layer prioritizes actions by business impact, urgency, and risk.",
                  },
                  {
                    icon: <CircuitBoard className="h-4 w-4" />,
                    text: "Cross-function workflows connect accounting, procurement, inventory, logistics, and customer teams.",
                  },
                  {
                    icon: <Database className="h-4 w-4" />,
                    text: "Single source of truth with synchronized operational and financial records.",
                  },
                  {
                    icon: <Building2 className="h-4 w-4" />,
                    text: "Role-aware dashboards provide leadership and teams with exact context for faster execution.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full p-1.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                      {item.icon}
                    </div>
                    <p className="text-foreground/80">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-orange-500/10 bg-background/60 backdrop-blur-sm p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Implementation Roadmap</h3>
              <div className="space-y-4">
                {deploymentPhases.map((item) => (
                  <div key={item.phase} className="rounded-lg border border-orange-500/10 bg-background/70 p-4">
                    <div className="text-xs uppercase tracking-wider text-orange-400 mb-1">{item.phase}</div>
                    <div className="font-semibold mb-1">{item.title}</div>
                    <p className="text-sm text-foreground/70">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Operational outcomes you can track</h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto">
              Measure ERP performance in execution terms: speed, quality, visibility, and financial control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {kpiCards.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-orange-500/10 bg-background/70 p-5">
                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400">
                  {kpi.value}
                </div>
                <div className="font-medium mt-1">{kpi.label}</div>
                <p className="text-sm text-foreground/65 mt-2">{kpi.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-orange-500/10 bg-background/70 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Built for integration, governance, and scale</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-lg border border-orange-500/10 bg-background/60 p-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Layers className="h-4 w-4 text-orange-400" />
                  Integration Layer
                </div>
                <p className="text-sm text-foreground/70">
                  Connect with CRM, accounting, payroll, procurement, ticketing, and data warehouse systems via APIs and secure connectors.
                </p>
              </div>
              <div className="rounded-lg border border-orange-500/10 bg-background/60 p-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <ShieldCheck className="h-4 w-4 text-orange-400" />
                  Governance Controls
                </div>
                <p className="text-sm text-foreground/70">
                  Fine-grained role permissions, audit logs, policy enforcement, and approval trails for compliance-heavy workflows.
                </p>
              </div>
              <div className="rounded-lg border border-orange-500/10 bg-background/60 p-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Timer className="h-4 w-4 text-orange-400" />
                  Continuous Optimization
                </div>
                <p className="text-sm text-foreground/70">
                  Monitor model quality, workflow performance, and user adoption to continuously improve decisions and operational throughput.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-cyan-500/10" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="bg-gradient-to-br from-orange-500/20 to-amber-600/20 border border-orange-500/20 rounded-2xl p-6 sm:p-8 md:p-16 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">
                Plan your AI ERP transformation with Finova
              </h2>
              <p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8">
                We help you define architecture, migration, and rollout strategy with measurable business outcomes from day one.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-600 text-white w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center justify-center">
                    Speak with ERP Specialist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-orange-500/20 hover:bg-orange-500/5 w-full sm:w-auto">
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
