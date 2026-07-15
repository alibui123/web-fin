import { ArrowLeft, ArrowRight, Brain, Zap, ChartBar, Users, Bot, Sparkles, Network, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import StaticBlobBackground from "@/components/static-blob-background"
import { AIMLIcon } from "@/components/icons"
import Image from "next/image"
import { Metadata } from "next"

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Custom AI Models",
    description: "Tailored artificial intelligence solutions designed specifically for your business needs"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Intelligent Automation",
    description: "Streamline operations with AI-powered process automation and optimization"
  },
  {
    icon: <ChartBar className="w-6 h-6" />,
    title: "Predictive Analytics",
    description: "Make data-driven decisions with advanced forecasting and insights"
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Deep Learning",
    description: "Leverage neural networks for complex pattern recognition and analysis"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "NLP Solutions",
    description: "Natural language processing for enhanced customer interactions"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure AI",
    description: "Enterprise-grade security for your AI implementations"
  }
]

const techStack = [
  { name: "TensorFlow", icon: "/images/tech/tensorflow.svg" },
  { name: "PyTorch", icon: "/images/tech/pytorch.svg" },
  { name: "Python", icon: "/images/tech/python.svg" },
  { name: "Scikit-learn", icon: "/images/tech/scikit-learn.svg" },
  { name: "CUDA", icon: "/images/tech/cuda.svg" },
  { name: "OpenAI", icon: "/images/tech/openai.svg" },
  { name: "Kubernetes", icon: "/images/tech/kubernetes.svg" },
  { name: "MLflow", icon: "/images/tech/mlflow.svg" }
]

const stats = [
  { value: "85%", label: "Cost Reduction" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "60%", label: "Faster Processing" },
  { value: "24/7", label: "AI Operations" }
]

export const metadata: Metadata = {
  title: "AI & Machine Learning Solutions | Finova Solutions",
  description: "Transform your business with cutting-edge AI solutions. Harness the power of machine learning with our expert team."
}

export default function AIMLPage() {
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
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500">
                  AI & Machine Learning
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Intelligent Solutions for the Digital Age
                </h1>
                <div className="h-1 w-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              </div>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed">
                Transform your business with cutting-edge AI solutions. Harness the power of machine learning.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-300 hover:opacity-90"
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    Start Your AI Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-purple-500/20 hover:bg-purple-500/5"
                >
                  <Link href="#case-studies" className="flex items-center justify-center">
                    View Success Stories
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12 relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent blur-xl" />
              <div className="relative rounded-2xl border border-purple-500/10 overflow-hidden flex items-center justify-center bg-foreground/5">
                <div className="p-4 sm:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[400px]">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 text-purple-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-full" />
                    <AIMLIcon className="w-full h-full p-6 sm:p-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-purple-500/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Comprehensive AI Solutions
              </h2>
              <p className="text-sm sm:text-base text-foreground/60 mt-2">
                Unlock the full potential of artificial intelligence for your business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent rounded-2xl transition-opacity opacity-0 group-hover:opacity-100" />
                  <div className="relative p-4 sm:p-6 border border-purple-500/10 rounded-2xl hover:border-purple-500/20 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-foreground/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-purple-500/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Cutting-edge Technology Stack
              </h2>
              <p className="text-sm sm:text-base text-foreground/60 mt-2">
                We use the latest and most powerful AI technologies
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="group"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-foreground/5 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-purple-500/10 transition-colors">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-foreground/80 group-hover:text-purple-500 transition-colors">
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Success Stories
              </h2>
              <p className="text-sm sm:text-base text-foreground/60 mt-2">
                Real results from our AI implementations
              </p>
            </div>

            <div className="space-y-4 sm:space-y-8">
              {[
                {
                  title: "AI-Powered Customer Service Revolution",
                  company: "Global Tech Solutions",
                  description: "Implemented an intelligent customer service automation system that handles inquiries 24/7 with unprecedented accuracy.",
                  metrics: [
                    { label: "Response Time", value: "-80%" },
                    { label: "Customer Satisfaction", value: "95%" },
                    { label: "Cost Reduction", value: "60%" }
                  ]
                },
                {
                  title: "Predictive Maintenance Transformation",
                  company: "Industrial Systems Corp",
                  description: "Developed an AI-powered predictive maintenance system that significantly reduced equipment downtime.",
                  metrics: [
                    { label: "Downtime Reduction", value: "75%" },
                    { label: "Cost Savings", value: "45%" },
                    { label: "Efficiency Increase", value: "50%" }
                  ]
                }
              ].map((study, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-4 sm:p-8 border border-purple-500/10 rounded-2xl">
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm text-purple-500 font-medium mb-2">
                          {study.company}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{study.title}</h3>
                        <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">
                          {study.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full md:w-auto">
                        {study.metrics.map((metric, i) => (
                          <div key={i} className="text-center p-2 sm:p-4 bg-foreground/5 rounded-lg">
                            <div className="text-lg sm:text-2xl font-bold text-purple-500">
                              {metric.value}
                            </div>
                            <div className="text-[10px] sm:text-xs text-foreground/60 mt-1">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-purple-500/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent" />
              <div className="relative p-6 sm:p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
                    <p className="text-sm sm:text-base text-foreground/70 mb-6">
                      Let's discuss how our AI solutions can drive innovation and growth for your organization.
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-300 hover:opacity-90 w-full sm:w-auto"
                    >
                      <Link href="/contact" className="flex items-center justify-center">
                        Schedule a Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative hidden md:block">
                    <div className="w-48 h-48 text-purple-500 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent rounded-full" />
                      <AIMLIcon className="w-full h-full p-8" />
                    </div>
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
              <h2 className="text-2xl font-bold mb-2">Explore More Services</h2>
              <p className="text-foreground/70">
                Discover our comprehensive range of technology solutions
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-6 md:mt-0 border-purple-500/20 hover:bg-purple-500/5 transition-all duration-300"
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