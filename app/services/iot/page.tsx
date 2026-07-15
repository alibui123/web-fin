import { ArrowLeft, ArrowRight, Wifi, Cpu, Database, Settings, Zap, Cloud, Box, BarChart, Activity, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import StaticBlobBackground from "@/components/static-blob-background"
import { IoTIcon } from "@/components/icons"
import { Metadata } from "next"

const features = [
  {
    icon: <Wifi className="h-6 w-6" />,
    title: "IoT Architecture",
    description: "End-to-end IoT solution architecture",
    gradient: "from-red-500 to-amber-500"
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Device Management",
    description: "Embedded systems and firmware",
    gradient: "from-amber-500 to-red-500"
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Data Processing",
    description: "Big data storage and real-time analytics",
    gradient: "from-red-500 to-amber-500"
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Cloud Integration",
    description: "Seamless cloud connectivity for IoT devices",
    gradient: "from-amber-500 to-red-500"
  }
]

export const metadata: Metadata = {
  title: "IoT Solutions | Finova Solutions",
  description: "Transforming ideas into connected realities. We develop cutting-edge IoT solutions for the modern world."
}

export default function IoTPage() {
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
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                  Connected Devices
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-amber-500 to-red-500">Connect Everything</span>
                  <span className="block mt-2">Internet of Things</span>
                </h1>
                <div className="h-1 w-32 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-red-500" />
              </div>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed">
                Transform ideas into connected realities. We develop cutting-edge IoT solutions for the modern world.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-red-500 via-amber-500 to-red-500 text-white shadow-lg transition-all duration-300 hover:opacity-90"
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    Start Your IoT Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-red-500/20 hover:bg-red-500/5"
                >
                  <Link href="#features" className="flex items-center justify-center">
                    Explore Solutions
                    <Box className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12 relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-amber-500/5 to-red-500/5 blur-xl" />
              <div className="relative rounded-2xl border border-red-500/10 overflow-hidden flex items-center justify-center bg-foreground/5">
                <div className="p-4 sm:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[400px]">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 text-red-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-amber-500/10 to-red-500/10 rounded-full" />
                    <IoTIcon className="w-full h-full p-6 sm:p-8" />
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
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-amber-500 to-red-500">
                  Smart IoT Solutions
                </span>
              </h2>
              <p className="text-sm sm:text-base text-foreground/60 mt-2">
                From device to dashboard, we handle your entire IoT ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="relative group rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-amber-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] border border-red-500/10 group-hover:border-red-500/20 transition-all duration-500">
                    <div className={`mb-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2 sm:p-2.5 text-white shadow-lg transform transition-transform duration-300 group-hover:rotate-12`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Details Section */}
      <section className="py-20 bg-gradient-to-b from-red-500/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">
                      IoT Expertise
                    </span>
                  </h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Our IoT team specializes in developing connected solutions for businesses across industries. We have experience in industrial IoT, consumer IoT, and smart infrastructure, delivering end-to-end solutions from hardware integration to cloud analytics. Our IoT platforms are designed for security, scalability and real-time data processing.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Our Approach</h3>
                  <ul className="space-y-3">
                    {[
                      {
                        text: "End-to-end IoT development from concept to deployment",
                        icon: <Settings className="h-4 w-4" />
                      },
                      {
                        text: "Custom firmware and embedded systems development",
                        icon: <Cpu className="h-4 w-4" />
                      },
                      {
                        text: "Edge computing solutions for real-time processing",
                        icon: <Zap className="h-4 w-4" />
                      },
                      {
                        text: "Secure cloud connectivity and data management",
                        icon: <Cloud className="h-4 w-4" />
                      }
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start space-x-3 group"
                      >
                        <div className="flex-shrink-0 rounded-full p-1.5 bg-gradient-to-r from-red-500 to-amber-500 text-white mt-0.5 transform transition-transform duration-300 group-hover:scale-110">
                          {feature.icon}
                        </div>
                        <span className="text-foreground/80 group-hover:text-red-500 transition-colors">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Industry Applications</h3>
                  <ul className="space-y-3">
                    {[
                      {
                        text: "Smart Manufacturing and Industrial Automation",
                        icon: <Settings className="h-4 w-4" />
                      },
                      {
                        text: "Healthcare IoT and Patient Monitoring",
                        icon: <Activity className="h-4 w-4" />
                      },
                      {
                        text: "Smart Cities and Infrastructure",
                        icon: <BarChart className="h-4 w-4" />
                      },
                      {
                        text: "Home Automation and Consumer IoT",
                        icon: <Zap className="h-4 w-4" />
                      },
                      {
                        text: "Secure IoT Networks with Advanced Authentication",
                        icon: <Lock className="h-4 w-4" />
                      }
                    ].map((industry, i) => (
                      <li
                        key={i}
                        className="flex items-start space-x-3 group"
                      >
                        <div className="flex-shrink-0 rounded-full p-1.5 bg-gradient-to-r from-amber-500 to-red-500 text-white mt-0.5 transform transition-transform duration-300 group-hover:scale-110">
                          {industry.icon}
                        </div>
                        <span className="text-foreground/80 group-hover:text-amber-500 transition-colors">{industry.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative group rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-amber-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative p-8 border border-red-500/10 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] group-hover:border-red-500/20 transition-all duration-500">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-red-500 transition-colors">Ready to connect everything?</h3>
                    <p className="text-foreground/70 mb-6">
                      Get in touch with our IoT specialists to discuss your connected device needs.
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-red-500 via-amber-500 to-red-500 text-white shadow-lg transition-all duration-300 w-full hover:opacity-90 hover:scale-105"
                    >
                      <Link href="/contact" className="flex items-center justify-center group">
                        Start your IoT project
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
              className="mt-6 md:mt-0 border-red-500/20 hover:bg-red-500/5 transition-all duration-300"
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