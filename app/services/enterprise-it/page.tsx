import { ArrowLeft, ArrowRight, Server, Globe, Cpu, Code, Database, Cloud, Layers, Settings, Zap, Shield, Users, ChartBar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import StaticBlobBackground from "@/components/static-blob-background"
import { EnterpriseITIcon } from "@/components/icons"
import { Metadata } from "next"

const features = [
  {
    icon: <Server className="h-6 w-6" />,
    title: "Enterprise Infrastructure",
    description: "Robust and scalable infrastructure solutions",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Cloud Solutions",
    description: "Secure and flexible cloud deployments",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Custom Development",
    description: "Tailored software solutions for your needs",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Data Management",
    description: "Efficient data storage and processing",
    gradient: "from-cyan-500 to-blue-500"
  }
]

export const metadata: Metadata = {
  title: "Enterprise IT Solutions | Finova Solutions",
  description: "Transform your business with our enterprise IT solutions. We craft cutting-edge software that sets you apart."
}

export default function EnterpriseITPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <StaticBlobBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col max-w-5xl mx-auto">
            <Link 
              href="/services" 
              className="group flex items-center text-sm text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to all services
            </Link>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                  Enterprise Solutions
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500">Transform Your Business</span>
                  <span className="block mt-2">with Enterprise IT</span>
                </h1>
                <div className="h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
              </div>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed">
                Transform your ideas into powerful, scalable solutions. We craft cutting-edge software that sets you apart.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white shadow-lg transition-all duration-300 hover:opacity-90"
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    Start Your Digital Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-500/20 hover:bg-blue-500/5"
                >
                  <Link href="#features" className="flex items-center justify-center">
                    Explore Features
                    <Layers className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12 relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 blur-xl" />
              <div className="relative rounded-2xl border border-blue-500/10 overflow-hidden flex items-center justify-center bg-foreground/5">
                <div className="p-4 sm:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[400px]">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 text-blue-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-full" />
                    <EnterpriseITIcon className="w-full h-full p-6 sm:p-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500">
                  Comprehensive Solutions
                </span>
              </h2>
              <p className="text-sm sm:text-base text-foreground/60 mt-2">
                Cutting-edge enterprise technology solutions for modern businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="relative group rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] border border-blue-500/10 group-hover:border-blue-500/20 transition-all duration-500">
                    <div className={`mb-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2 sm:p-2.5 text-white shadow-lg transform transition-transform duration-300 group-hover:rotate-12`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Details Section */}
      <section className="py-20 bg-gradient-to-b from-blue-500/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                      About Enterprise IT Solutions
                    </span>
                  </h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Our Enterprise IT solutions are designed to help businesses of all sizes transform their operations through cutting-edge technology. We specialize in creating scalable, secure, and efficient systems that drive business growth and innovation. Our team of experts works closely with you to understand your unique needs and deliver solutions that exceed expectations.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {[
                      {
                        text: "Progressive Web Applications (PWA) with modern tech stack",
                        icon: <Globe className="h-4 w-4" />
                      },
                      {
                        text: "Cross-platform Mobile Apps for iOS and Android",
                        icon: <Cpu className="h-4 w-4" />
                      },
                      {
                        text: "Enterprise-grade Solutions with scalable architecture",
                        icon: <Server className="h-4 w-4" />
                      },
                      {
                        text: "Microservices Architecture for flexible deployment",
                        icon: <Settings className="h-4 w-4" />
                      }
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start space-x-3 group"
                      >
                        <div className="flex-shrink-0 rounded-full p-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white mt-0.5 transform transition-transform duration-300 group-hover:scale-110">
                          {feature.icon}
                        </div>
                        <span className="text-foreground/80 group-hover:text-blue-500 transition-colors">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Business Benefits</h3>
                  <ul className="space-y-3">
                    {[
                      {
                        text: "Improved operational efficiency and productivity",
                        icon: <Zap className="h-4 w-4" />
                      },
                      {
                        text: "Enhanced customer experience and engagement",
                        icon: <Users className="h-4 w-4" />
                      },
                      {
                        text: "Reduced development and maintenance costs",
                        icon: <ChartBar className="h-4 w-4" />
                      },
                      {
                        text: "Future-proof technology infrastructure",
                        icon: <Cloud className="h-4 w-4" />
                      },
                      {
                        text: "Seamless integration with existing systems",
                        icon: <Shield className="h-4 w-4" />
                      }
                    ].map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start space-x-3 group"
                      >
                        <div className="flex-shrink-0 rounded-full p-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white mt-0.5 transform transition-transform duration-300 group-hover:scale-110">
                          {benefit.icon}
                        </div>
                        <span className="text-foreground/80 group-hover:text-cyan-500 transition-colors">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative group rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative p-8 border border-blue-500/10 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] group-hover:border-blue-500/20 transition-all duration-500">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-blue-500 transition-colors">Ready to transform your business?</h3>
                    <p className="text-foreground/70 mb-6">
                      Get in touch with our team to discuss how Enterprise IT solutions can benefit your organization.
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white shadow-lg transition-all duration-300 w-full hover:opacity-90 hover:scale-105"
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
          </div>
        </div>
      </section>
      
      {/* Next Service Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Explore our services</h2>
              <p className="text-foreground/70">
                Discover how our comprehensive service offerings can help your business grow
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-6 md:mt-0 border-blue-500/20 hover:bg-blue-500/5 transition-all duration-300"
            >
              <Link href="/services" className="flex items-center group">
                View all services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 