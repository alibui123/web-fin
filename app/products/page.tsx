import ProductsIntro from "@/components/products-intro"
import ProductsList from "../../components/products-list"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const aiCapabilities = [
  {
    title: "Predictive analytics",
    description: "Forecast demand, staffing, and outcomes with real-time signal modeling.",
  },
  {
    title: "Automation",
    description: "Trigger workflows, approvals, and follow-ups without manual bottlenecks.",
  },
  {
    title: "Smart recommendations",
    description: "Surface next best actions for agents, managers, and operators.",
  },
  {
    title: "AI assistants",
    description: "Support teams with summaries, insights, and instant guidance.",
  },
  {
    title: "Workflow intelligence",
    description: "Track performance, risks, and outcomes across every stage.",
  },
  {
    title: "Reporting",
    description: "Generate explainable reports that connect activity to results.",
  },
]

const industries = [
  "Contact centers and BPOs",
  "Hospitality and travel",
  "Financial services",
  "Healthcare and clinics",
  "Retail and ecommerce",
  "Enterprise operations",
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-finova-midnight relative overflow-hidden">
      {/* Neon glowing aura behind content globally for the page */}
      <div className="fixed top-[20%] left-[-10%] w-[500px] h-[500px] bg-finova-cyan/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-finova-magenta/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" />
      
      <div className="relative z-10">
        <ProductsIntro />
        <ProductsList />

        {/* Shared AI Capabilities */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Shared AI Capabilities</h2>
              <p className="text-white/60 text-lg">
                Every product is powered by the same intelligence layer that connects data, decisions, and automation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {aiCapabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{capability.title}</h3>
                  <p className="text-white/60 leading-relaxed">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="py-20 md:py-28 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Industries Served</h2>
              <p className="text-white/60 text-lg">
                We focus on industries where AI can drive measurable operational impact.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm uppercase tracking-widest text-white/70"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-r from-finova-cyan/10 via-finova-blue/10 to-finova-magenta/10 p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Find the right product for your team</h2>
              <p className="text-white/60 text-lg mb-8">
                Book a consultation or request a demo to match the best product to your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-white text-black hover:bg-finova-cyan hover:text-white">
                  <Link href="/consultation">Schedule Consultation</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link href="/contact">Request Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 