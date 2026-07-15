import { type JSX } from "react"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Icon } from "@/components/ui/icon"
import * as React from 'react'
import { 
  EnterpriseITIcon, 
  AIMLIcon, 
  IoTIcon, 
  BlockchainIcon, 
  WebAppIcon 
} from "@/components/icons"
import StaticBlobBackground from "@/components/static-blob-background"
import { Metadata } from "next"

interface TechStack {
  name: string
  icon: string
}

interface CaseStudyMetric {
  label: string
  value: string
}

interface CaseStudy {
  title: string
  description: string
  metrics: CaseStudyMetric[]
}

interface Testimonial {
  quote: string
  author: string
  position: string
  company: string
}

interface ProcessStep {
  title: string
  description: string
  icon: "search" | "map" | "code" | "rocket"
}

interface Service {
  id: string
  title: string
  description: string
  longDescription: string
  features: string[]
  benefits: string[]
  techStack: TechStack[]
  caseStudies: CaseStudy[]
  testimonials: Testimonial[]
  processSteps: ProcessStep[]
  icon: (className?: string) => JSX.Element
}

const defaultTechStack = [
  { name: "React", icon: "react.svg" },
  { name: "Node.js", icon: "nodejs.svg" },
  { name: "Python", icon: "python.svg" },
  { name: "AWS", icon: "aws.svg" },
  { name: "Docker", icon: "docker.svg" }
]

const defaultCaseStudy = {
  title: "Global E-commerce Platform Transformation",
  description: "Helped a leading retailer modernize their e-commerce platform, resulting in 40% faster page loads and 25% increase in conversions.",
  metrics: [
    { label: "Performance Improvement", value: "40%" },
    { label: "Conversion Rate Increase", value: "25%" },
    { label: "Development Time Saved", value: "30%" }
  ]
}

const defaultTestimonial = {
  quote: "Finova Solutions transformed our legacy systems into a modern, scalable platform that has dramatically improved our operational efficiency.",
  author: "John Smith",
  position: "CTO",
  company: "Global Retail Corp"
}

const defaultProcessSteps = [
  {
    title: "Discovery & Analysis",
    description: "We thoroughly analyze your current systems and business requirements",
    icon: "search" as const
  },
  {
    title: "Strategy & Planning",
    description: "Develop a comprehensive roadmap for implementation",
    icon: "map" as const
  },
  {
    title: "Development & Testing",
    description: "Agile development with continuous testing and feedback",
    icon: "code" as const
  },
  {
    title: "Deployment & Support",
    description: "Smooth deployment and ongoing maintenance",
    icon: "rocket" as const
  }
]

const services: Service[] = [
  {
    id: "enterprise-it",
    title: "Enterprise IT",
    description: "Transform your ideas into powerful, scalable solutions. We craft cutting-edge software that sets you apart from the competition.",
    longDescription: "Our Enterprise IT solutions are designed to help businesses of all sizes transform their operations through cutting-edge technology. We specialize in creating scalable, secure, and efficient systems that drive business growth and innovation. Our team of experts works closely with you to understand your unique needs and deliver solutions that exceed expectations.",
    features: [
      "Progressive Web Applications (PWA) with modern tech stack",
      "Cross-platform Mobile Apps for iOS and Android",
      "Enterprise-grade Solutions with scalable architecture",
      "Microservices Architecture for flexible deployment"
    ],
    benefits: [
      "Improved operational efficiency and productivity",
      "Enhanced customer experience and engagement",
      "Reduced development and maintenance costs",
      "Future-proof technology infrastructure",
      "Seamless integration with existing systems"
    ],
    techStack: defaultTechStack,
    caseStudies: [defaultCaseStudy],
    testimonials: [defaultTestimonial],
    processSteps: defaultProcessSteps,
    icon: (className?: string) => <EnterpriseITIcon className={className} />
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Harness the power of artificial intelligence to transform your business. Our cutting-edge AI solutions drive innovation and deliver measurable results.",
    longDescription: "Our AI and ML solutions empower businesses to unlock new opportunities and gain competitive advantages. From predictive analytics to natural language processing, we develop custom AI solutions that automate processes, provide actionable insights, and enhance decision-making capabilities. Our expert team combines deep learning, computer vision, and advanced analytics to create intelligent systems that evolve with your business.",
    features: [
      "Custom AI Model Development & Training",
      "Natural Language Processing Solutions",
      "Computer Vision & Image Recognition",
      "Predictive Analytics & Forecasting",
      "Machine Learning Pipeline Automation",
      "AI-Powered Process Optimization"
    ],
    benefits: [
      "Up to 80% reduction in manual processes",
      "Real-time insights for faster decisions",
      "Enhanced customer experience through personalization",
      "Improved accuracy and efficiency",
      "Scalable and future-proof solutions",
      "Competitive advantage through AI adoption"
    ],
    techStack: [
      { name: "TensorFlow", icon: "tensorflow.svg" },
      { name: "PyTorch", icon: "pytorch.svg" },
      { name: "Python", icon: "python.svg" },
      { name: "Scikit-learn", icon: "scikit.svg" },
      { name: "CUDA", icon: "cuda.svg" },
      { name: "OpenAI", icon: "openai.svg" },
      { name: "Kubernetes", icon: "kubernetes.svg" },
      { name: "MLflow", icon: "mlflow.svg" }
    ],
    caseStudies: [
      {
        title: "AI-Powered Customer Service Revolution",
        description: "Implemented an intelligent customer service automation system for a Fortune 500 company, combining natural language processing and machine learning to handle customer inquiries 24/7.",
        metrics: [
          { label: "Response Time Reduction", value: "80%" },
          { label: "Customer Satisfaction", value: "95%" },
          { label: "Cost Savings", value: "60%" }
        ]
      },
      {
        title: "Predictive Maintenance System",
        description: "Developed an AI-powered predictive maintenance system for a manufacturing plant, reducing equipment downtime and maintenance costs significantly.",
        metrics: [
          { label: "Downtime Reduction", value: "75%" },
          { label: "Cost Savings", value: "45%" },
          { label: "Efficiency Increase", value: "50%" }
        ]
      }
    ],
    testimonials: [
      {
        quote: "The AI solution developed by Finova has transformed our customer service operations. We're now able to handle inquiries 24/7 with unprecedented accuracy and efficiency.",
        author: "Sarah Chen",
        position: "Director of Innovation",
        company: "Global Tech Solutions"
      },
      {
        quote: "Their machine learning expertise helped us implement predictive analytics that have dramatically improved our decision-making process.",
        author: "Michael Rodriguez",
        position: "Head of Data Science",
        company: "Enterprise Analytics Corp"
      }
    ],
    processSteps: [
      {
        title: "AI Assessment",
        description: "Analyze your business needs and identify AI opportunities",
        icon: "search" as const
      },
      {
        title: "Solution Design",
        description: "Design custom AI models and implementation strategy",
        icon: "map" as const
      },
      {
        title: "Development",
        description: "Build and train AI models with your data",
        icon: "code" as const
      },
      {
        title: "Deployment",
        description: "Deploy, monitor, and optimize AI solutions",
        icon: "rocket" as const
      }
    ],
    icon: (className?: string) => <AIMLIcon className={className} />
  },
  {
    id: "iot",
    title: "IoT & Embedded Systems",
    description: "Connect, monitor, and optimize your physical assets with our advanced IoT solutions. Transform data into actionable insights in real-time.",
    longDescription: "Our IoT solutions bridge the physical and digital worlds, enabling smart, connected environments that drive efficiency and innovation. We specialize in developing end-to-end IoT systems that collect, analyze, and act on data in real-time. From industrial automation to smart cities, our solutions help you harness the power of connected devices to transform your operations.",
    features: [
      "Custom IoT Hardware Development",
      "Real-time Monitoring Systems",
      "Edge Computing Solutions",
      "Industrial Automation",
      "Smart Device Integration",
      "Secure IoT Networks"
    ],
    benefits: [
      "Real-time visibility and control",
      "Predictive maintenance capabilities",
      "Enhanced operational efficiency",
      "Reduced downtime and costs",
      "Improved safety and compliance",
      "Data-driven decision making"
    ],
    techStack: [
      { name: "Arduino", icon: "arduino.svg" },
      { name: "Raspberry Pi", icon: "raspberry-pi.svg" },
      { name: "AWS IoT", icon: "aws-iot.svg" },
      { name: "Azure IoT", icon: "azure-iot.svg" },
      { name: "MQTT", icon: "mqtt.svg" },
      { name: "Node-RED", icon: "node-red.svg" },
      { name: "TinyML", icon: "tinyml.svg" },
      { name: "Zigbee", icon: "zigbee.svg" }
    ],
    caseStudies: [
      {
        title: "Smart Manufacturing Transformation",
        description: "Implemented an IoT-based smart manufacturing system for a leading automotive parts manufacturer, enabling real-time monitoring and predictive maintenance.",
        metrics: [
          { label: "Efficiency Gain", value: "65%" },
          { label: "Downtime Reduction", value: "80%" },
          { label: "Cost Savings", value: "45%" }
        ]
      },
      {
        title: "Smart Building Management",
        description: "Developed a comprehensive IoT solution for a commercial real estate company, optimizing energy usage and improving tenant comfort.",
        metrics: [
          { label: "Energy Savings", value: "40%" },
          { label: "Maintenance Cost Reduction", value: "55%" },
          { label: "Tenant Satisfaction", value: "90%" }
        ]
      }
    ],
    testimonials: [
      {
        quote: "Finova's IoT solution has revolutionized our manufacturing process. The real-time insights and predictive maintenance capabilities have significantly improved our operational efficiency.",
        author: "David Park",
        position: "Operations Director",
        company: "Advanced Manufacturing Inc"
      },
      {
        quote: "Their expertise in IoT and embedded systems helped us create a smart building solution that has exceeded our expectations in terms of energy savings and tenant satisfaction.",
        author: "Lisa Thompson",
        position: "Facility Manager",
        company: "Smart Properties Ltd"
      }
    ],
    processSteps: [
      {
        title: "IoT Planning",
        description: "Assess requirements and design IoT architecture",
        icon: "search" as const
      },
      {
        title: "Prototyping",
        description: "Build and test IoT device prototypes",
        icon: "map" as const
      },
      {
        title: "Integration",
        description: "Develop software and connect systems",
        icon: "code" as const
      },
      {
        title: "Deployment",
        description: "Roll out and monitor IoT network",
        icon: "rocket" as const
      }
    ],
    icon: (className?: string) => <IoTIcon className={className} />
  },
  {
    id: "blockchain",
    title: "Blockchain Development",
    description: "Focus on your core business while we handle your IT infrastructure. 24/7 support and monitoring for peace of mind.",
    longDescription: "Our blockchain solutions help businesses leverage distributed ledger technology for enhanced security, transparency, and efficiency. From smart contracts to decentralized applications, we build robust blockchain solutions that transform business processes.",
    features: [
      "Smart Contract Development",
      "DApp Development",
      "Private Blockchain Networks",
      "Tokenization Solutions"
    ],
    benefits: [
      "Enhanced Security",
      "Improved Transparency",
      "Reduced Operational Costs",
      "Automated Compliance",
      "Immutable Record Keeping"
    ],
    techStack: [
      { name: "Ethereum", icon: "ethereum.svg" },
      { name: "Solidity", icon: "solidity.svg" },
      { name: "Web3.js", icon: "web3.svg" },
      { name: "Hyperledger", icon: "hyperledger.svg" },
      { name: "Truffle", icon: "truffle.svg" }
    ],
    caseStudies: [
      {
        title: "Supply Chain Traceability Platform",
        description: "Implemented a blockchain-based supply chain solution that increased transparency by 100% and reduced fraud by 90%.",
        metrics: [
          { label: "Transparency Increase", value: "100%" },
          { label: "Fraud Reduction", value: "90%" },
          { label: "Process Automation", value: "70%" }
        ]
      }
    ],
    testimonials: [defaultTestimonial],
    processSteps: defaultProcessSteps,
    icon: (className?: string) => <BlockchainIcon className={className} />
  },
  {
    id: "web-app",
    title: "Web and App Rework",
    description: "Focus on your core business while we handle your IT infrastructure. 24/7 support and monitoring for peace of mind.",
    longDescription: "Our web and app rework services help you modernize and optimize your digital presence. We analyze your existing applications, identify areas for improvement, and implement solutions that enhance performance, security, and user experience.",
    features: [
      "UI/UX Modernization",
      "Performance Optimization",
      "Security Enhancement",
      "Code Refactoring"
    ],
    benefits: [
      "Improved User Experience",
      "Better Performance",
      "Enhanced Security",
      "Lower Maintenance Costs",
      "Modern Technology Stack"
    ],
    techStack: defaultTechStack,
    caseStudies: [
      {
        title: "Legacy Application Modernization",
        description: "Modernized a legacy web application, resulting in 70% faster load times and 45% increase in user engagement.",
        metrics: [
          { label: "Load Time Improvement", value: "70%" },
          { label: "User Engagement Increase", value: "45%" },
          { label: "Maintenance Cost Reduction", value: "50%" }
        ]
      }
    ],
    testimonials: [defaultTestimonial],
    processSteps: defaultProcessSteps,
    icon: (className?: string) => <WebAppIcon className={className} />
  }
]

export function generateMetadata({ params }: { params: { group: string } }): Metadata {
  const service = services.find(s => s.id === params.group)
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }
  
  return {
    title: `${service.title} | Finova Solutions`,
    description: service.description,
  }
}

export function generateStaticParams() {
  // Exclude all services that have their own custom page implementations
  const customServicePages = ["web-app", "blockchain", "iot", "digital-transformation", "ai-ml", "enterprise-it"];
  
  const filteredServices = services
    .filter(service => !customServicePages.includes(service.id))
    .map(service => ({
      group: service.id,
    }));
  
  // If all services have custom pages, return at least one dummy ID to satisfy the static export
  // This page won't actually be accessible since the [group] route is only for fallback
  if (filteredServices.length === 0) {
    return [{ group: "placeholder-service" }];
  }
  
  return filteredServices;
}

export default function ServicePage({ params }: { params: { group: string } }) {
  const service = services.find(s => s.id === params.group)
  
  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <StaticBlobBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col max-w-5xl mx-auto">
            <Link 
              href="/services" 
              className="flex items-center text-sm text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all services
            </Link>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Our Service
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {service.title}
                </h1>
                <div className="h-1 w-32 rounded-full bg-primary/20" />
              </div>
              
              <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </div>
            
            <div className="mt-12">
              <div className="relative aspect-video rounded-2xl border overflow-hidden flex items-center justify-center bg-foreground/5">
                <div className="w-64 h-64 text-primary relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full" />
                  {service.icon("w-full h-full p-8")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Details Section */}
      <section className="py-20 bg-foreground/[0.02]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About {service.title}</h2>
                <p className="text-foreground/70 leading-relaxed">
                  {service.longDescription}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 rounded-full p-1 bg-primary/10 text-primary mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div>
                <h3 className="text-xl font-bold mb-4">Business Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 rounded-full p-1 bg-primary/10 text-primary mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      </div>
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-12">
                <div className="rounded-xl p-6 border border-primary/10 bg-primary/5">
                  <h3 className="text-xl font-bold mb-4">Ready to transform your business?</h3>
                  <p className="text-foreground/70 mb-6">
                    Get in touch with our team to discuss how {service.title} can benefit your organization.
                  </p>
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground shadow-lg transition-all duration-300 w-full hover:opacity-90"
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      Contact us for a consultation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Technology Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {service.techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-lg bg-foreground/5 flex items-center justify-center mb-3">
                    <Image
                      src="/images/tech/placeholder.svg"
                      alt={tech.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-foreground/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Success Stories</h2>
            {service.caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 border border-foreground/10"
              >
                <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
                <p className="text-foreground/70 mb-8">{study.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                      <div className="text-sm text-foreground/60">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {service.processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name={step.icon} className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </div>
                  {index < service.processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-foreground/[0.02]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
            <div className="grid gap-8">
              {service.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-background rounded-2xl p-8 border border-foreground/10"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-4xl text-primary mb-6">"</div>
                    <p className="text-lg mb-6 text-foreground/80 italic">{testimonial.quote}</p>
                    <div className="space-y-1">
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-sm text-foreground/60">{testimonial.position}</div>
                      <div className="text-sm text-foreground/60">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
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