import { ArrowLeft, ArrowRight, ChevronRight, Shield, Lock, Key, Network, Database, Code2, Blocks, Hexagon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import StaticBlobBackground from "@/components/static-blob-background"
import { Metadata } from "next"

const BlockchainIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const metadata: Metadata = {
  title: "Blockchain Development | Finova Solutions",
  description: "Our blockchain solutions provide secure, transparent, and efficient ways to manage transactions and data."
}

export default function BlockchainPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <StaticBlobBackground />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col max-w-5xl mx-auto">
            <Link 
              href="/services" 
              className="group flex items-center text-sm text-foreground/60 hover:text-foreground mb-6 sm:mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to all services
            </Link>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-500">
                  Blockchain Development
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500">Secure & Transparent</span>
                  <span className="block mt-2">Blockchain Solutions</span>
                </h1>
                <div className="h-1 w-32 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500" />
              </div>
              
              <p className="text-base sm:text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl">
                Our blockchain solutions provide secure, transparent, and efficient ways to manage transactions and data.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500 text-white shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-105"
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    Start Your Blockchain Journey
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-indigo-500/20 hover:bg-indigo-500/5 transition-all duration-300"
                >
                  <Link href="#use-cases" className="flex items-center justify-center">
                    Explore Use Cases
                    <Blocks className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-violet-500/5 blur-xl" />
              <div className="relative rounded-2xl border border-indigo-500/10 overflow-hidden flex items-center justify-center bg-foreground/5">
                <div className="p-4 sm:p-8 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 text-indigo-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-violet-500/10 rounded-full" />
                    <BlockchainIcon className="w-full h-full p-6 sm:p-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Enhanced Security",
                  description: "Immutable ledger technology for secure transactions",
                  gradient: "from-indigo-500 to-blue-500"
                },
                {
                  icon: <Lock className="h-8 w-8" />,
                  title: "Data Integrity",
                  description: "Tamper-proof records and transparent operations",
                  gradient: "from-blue-500 to-violet-500"
                },
                {
                  icon: <Network className="h-8 w-8" />,
                  title: "Smart Contracts",
                  description: "Automated, self-executing agreements",
                  gradient: "from-violet-500 to-indigo-500"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="relative group rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-violet-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] border border-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                    <div className={`mb-4 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 text-white shadow-lg transform transition-transform duration-300 group-hover:rotate-12`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section id="use-cases" className="py-12 sm:py-20 bg-gradient-to-b from-indigo-500/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500">
                  Blockchain Use Cases
                </span>
              </h2>
              <p className="text-sm sm:text-base text-foreground/60 mt-2">
                Transforming industries with blockchain technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="space-y-6">
                <div className="relative group rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative rounded-2xl p-6 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] border border-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                    <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 p-2.5 text-white shadow-lg transform transition-transform duration-300 group-hover:rotate-12">
                      <Network className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-indigo-500 transition-colors">Supply Chain Management</h3>
                    <ul className="space-y-3">
                      {[
                        "Track and verify product origins",
                        "Ensure authenticity of goods",
                        "Streamline logistics operations",
                        "Reduce fraud and counterfeiting"
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-3 group/item"
                        >
                          <div className="flex-shrink-0 rounded-full p-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white mt-1 transform transition-transform duration-300 group-hover/item:scale-110">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <span className="text-foreground/80 group-hover/item:text-indigo-500 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="relative group rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative rounded-2xl p-6 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] border border-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                    <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 p-2.5 text-white shadow-lg transform transition-transform duration-300 group-hover:rotate-12">
                      <Database className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-blue-500 transition-colors">Financial Services</h3>
                    <ul className="space-y-3">
                      {[
                        "Secure cross-border payments",
                        "Automated compliance checks",
                        "Real-time settlement",
                        "Reduced transaction costs"
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-3 group/item"
                        >
                          <div className="flex-shrink-0 rounded-full p-1 bg-gradient-to-r from-blue-500 to-violet-500 text-white mt-1 transform transition-transform duration-300 group-hover/item:scale-110">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <span className="text-foreground/80 group-hover/item:text-blue-500 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="relative group rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative rounded-2xl p-6 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] border border-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                    <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 p-2.5 text-white shadow-lg transform transition-transform duration-300 group-hover:rotate-12">
                      <Shield className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-violet-500 transition-colors">Digital Identity</h3>
                    <ul className="space-y-3">
                      {[
                        "Self-sovereign identity management",
                        "Secure authentication",
                        "Privacy-preserving verification",
                        "Cross-platform compatibility"
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-3 group/item"
                        >
                          <div className="flex-shrink-0 rounded-full p-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white mt-1 transform transition-transform duration-300 group-hover/item:scale-110">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <span className="text-foreground/80 group-hover/item:text-violet-500 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="relative group rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative rounded-2xl p-6 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] border border-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                    <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 p-2.5 text-white shadow-lg transform transition-transform duration-300 group-hover:rotate-12">
                      <Lock className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-indigo-500 transition-colors">Healthcare</h3>
                    <ul className="space-y-3">
                      {[
                        "Secure medical records",
                        "Drug supply chain tracking",
                        "Clinical trial management",
                        "Patient data privacy"
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-3 group/item"
                        >
                          <div className="flex-shrink-0 rounded-full p-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white mt-1 transform transition-transform duration-300 group-hover/item:scale-110">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <span className="text-foreground/80 group-hover/item:text-indigo-500 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Stack */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500">
                  Our Technology Stack
                </span>
              </h2>
              <p className="text-sm sm:text-base text-foreground/60 mt-2">
                Industry-leading blockchain platforms and tools
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: <Database className="h-8 w-8" />,
                  title: "Hyperledger",
                  description: "Enterprise-grade blockchain",
                  gradient: "from-indigo-500 to-blue-500"
                },
                {
                  icon: <Code2 className="h-8 w-8" />,
                  title: "Ethereum",
                  description: "Smart contract platform",
                  gradient: "from-blue-500 to-violet-500"
                },
                {
                  icon: <Key className="h-8 w-8" />,
                  title: "Corda",
                  description: "Financial services focused",
                  gradient: "from-violet-500 to-indigo-500"
                },
                {
                  icon: <Hexagon className="h-8 w-8" />,
                  title: "Custom Solutions",
                  description: "Tailored to your needs",
                  gradient: "from-indigo-500 to-violet-500"
                }
              ].map((tech, i) => (
                <div
                  key={i}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-violet-500/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative rounded-xl p-6 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] border border-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                    <div className={`mb-4 w-12 h-12 rounded-lg bg-gradient-to-br ${tech.gradient} p-2.5 text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                      {tech.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold mb-1 group-hover:text-indigo-500 transition-colors">{tech.title}</h3>
                    <p className="text-xs sm:text-sm text-foreground/70">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl p-6 sm:p-8 md:p-12 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-violet-500/10 border border-indigo-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-violet-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to secure your transactions?</h3>
                <p className="text-sm sm:text-base text-foreground/70 mb-6 sm:mb-8 max-w-2xl">
                  Let's discuss how blockchain solutions can enhance security and transparency in your business processes.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500 text-white shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-105"
                >
                  <Link href="/contact" className="flex items-center justify-center group">
                    Contact us for a consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Next Service Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Explore our services</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                Discover how our comprehensive service offerings can help your business grow
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-6 md:mt-0"
            >
              <Link href="/services" className="flex items-center">
                View all services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 