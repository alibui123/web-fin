import { PhoneCall, Globe, Gamepad2, GraduationCap, Smartphone } from "lucide-react"
import React from "react"

export interface Project {
  slug: string
  title: string
  client: string
  duration: string
  description: string
  challenge: string
  solution: string
  results: string[]
  category: string
  gradient: string
  tagColor: string
  accent: string
  stack: string[]
  impact: string
  role: string
  iconName: "PhoneCall" | "Globe" | "Gamepad2" | "GraduationCap" | "Smartphone"
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "sirius-solutions-awaaz",
    title: "Sirius Solutions Awaaz",
    client: "Sirius Solutions",
    duration: "6 Months",
    description:
      "Deployed 'Awaaz', our Conversational Voice AI, for Sirius Solutions to automate complex verification calls. The system handles pipeline and process automation for medical billing operations serving US hospitals, drastically reducing human error and compliance risks.",
    challenge:
      "High volume of manual verification calls leading to human error, compliance risks, and slow processing times in US healthcare billing.",
    solution:
      "Integrated 'Awaaz' directly into the billing pipeline. The AI agent conducts natural conversations, verifies patient data, and automatically updates the CRM without human intervention.",
    results: [
      "Automated 80%+ of verification calls",
      "Eliminated human error in data entry",
      "Ensured 100% HIPAA compliance",
      "Enabled 24/7 processing capabilities",
    ],
    category: "Voice AI",
    gradient: "from-finova-cyan via-finova-blue to-finova-purple",
    tagColor: "bg-finova-cyan/15 text-finova-cyan border-finova-cyan/30",
    accent: "#0ea5e9",
    stack: ["Voice AI", "Telephony", "NLP", "US Healthcare Data", "Analytics"],
    impact: "Automated 80%+ of verification calls; 24/7 availability",
    role: "Full AI Integration & Workflow Automation",
    iconName: "PhoneCall",
    featured: true,
  },
  {
    slug: "awaaz-in-plumbing",
    title: "Awaaz in Plumbing",
    client: "Regional Plumbing Services",
    duration: "3 Months",
    description:
      "Implemented an end-to-end Voice AI agent for a regional plumbing and home services business. The agent handles inbound customer calls, intelligently schedules appointments based on location, and automatically dispatches available technicians in real-time.",
    challenge:
      "Missed inbound customer calls during peak hours and inefficient manual dispatching of technicians leading to lost revenue and customer dissatisfaction.",
    solution:
      "Implemented an end-to-end Voice AI agent that handles inbound calls 24/7, intelligently schedules appointments based on location, and automatically dispatches available technicians in real-time.",
    results: [
      "Eliminated missed calls completely",
      "30% increase in booked jobs",
      "Optimized technician routing",
      "Reduced administrative overhead by 40%",
    ],
    category: "Voice AI",
    gradient: "from-finova-magenta via-finova-purple to-finova-blue",
    tagColor: "bg-finova-magenta/15 text-finova-magenta border-finova-magenta/30",
    accent: "#d946ef",
    stack: ["Conversational AI", "CRM Integration", "Scheduling Matrix", "Cloud"],
    impact: "Eliminated missed calls; 30% increase in booked jobs",
    role: "AI Agent Development & CRM Integration",
    iconName: "PhoneCall",
  },
  {
    slug: "telecom-websites",
    title: "Telecom Websites",
    client: "Major Telecom Provider",
    duration: "8 Months",
    description:
      "Engineered high-performance, secure digital platforms and corporate websites for major telecommunications clients. Focused on extreme reliability, fast loading speeds for millions of users, and integrated customer portals.",
    challenge:
      "Legacy corporate websites were suffering from slow load times, poor user experience, and inability to handle traffic spikes during major campaigns.",
    solution:
      "Engineered high-performance, secure digital platforms using modern tech stacks (Next.js) with edge caching and high-availability cloud infrastructure.",
    results: [
      "Sub-second page load times globally",
      "Successfully handled 10M+ monthly hits",
      "99.99% uptime during peak traffic",
      "Improved SEO and user retention",
    ],
    category: "Telecommunications",
    gradient: "from-finova-lightBlue via-finova-cyan to-blue-500",
    tagColor: "bg-finova-lightBlue/15 text-finova-lightBlue border-finova-lightBlue/30",
    accent: "#38bdf8",
    stack: ["Next.js", "React", "PostgreSQL", "High-Availability Cloud"],
    impact: "Sub-second page loads; successfully handled 10M+ monthly hits",
    role: "Full Stack Architecture & Deployment",
    iconName: "Globe",
  },
  {
    slug: "telecom-ai-personalized-games",
    title: "Telecom AI Personalized Games",
    client: "Telecom Foundation",
    duration: "12 Months",
    description:
      "Developed an AI-driven educational gaming ecosystem for the Telecom Foundation. The platform uses adaptive machine learning to provide personalized learning paths, process automation, and real-time student performance scoring.",
    challenge:
      "Low student engagement and a one-size-fits-all approach to education was hindering learning outcomes across different demographics.",
    solution:
      "Developed an AI-driven educational gaming ecosystem that uses adaptive machine learning to provide personalized learning paths and real-time performance scoring.",
    results: [
      "Significantly improved student engagement",
      "Personalized learning paths for 50,000+ students",
      "Real-time analytics for educators",
      "Increased course completion rates by 45%",
    ],
    category: "Telecommunications",
    gradient: "from-finova-purple via-fuchsia-500 to-finova-magenta",
    tagColor: "bg-finova-purple/15 text-finova-purple border-finova-purple/30",
    accent: "#a855f7",
    stack: ["Adaptive ML", "Game Engine", "Analytics Dashboard", "Python"],
    impact: "Significantly improved student engagement and retention metrics",
    role: "AI Model Design & Game Logic Development",
    iconName: "Gamepad2",
  },
  {
    slug: "tf-lms-platform",
    title: "TF LMS Platform",
    client: "Telecom Foundation",
    duration: "10 Months",
    description:
      "Built a comprehensive, scalable Learning Management System for the Telecom Foundation. This unified platform modernizes operations, centralizes educational content delivery, and provides detailed analytics for administrators.",
    challenge:
      "Fragmented educational content delivery and lack of centralized tracking for student progress across multiple geographical regions.",
    solution:
      "Built a comprehensive, scalable Learning Management System that modernizes operations, centralizes content delivery, and provides detailed analytics.",
    results: [
      "Centralized learning for thousands of concurrent users",
      "Streamlined administrative workflows",
      "Robust video streaming capabilities",
      "Scalable AWS infrastructure deployed",
    ],
    category: "EdTech",
    gradient: "from-emerald-500 via-teal-500 to-finova-cyan",
    tagColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    accent: "#10b981",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Video Streaming", "AWS"],
    impact: "Centralized learning for thousands of concurrent users",
    role: "Enterprise Software Engineering & Cloud Infrastructure",
    iconName: "GraduationCap",
  },
  {
    slug: "kp-app",
    title: "Kp App",
    client: "KP Initiative",
    duration: "5 Months",
    description:
      "A high-performance mobile application designed for regional optimization and civic engagement. Engineered with cross-platform frameworks to ensure a seamless, native-like experience on both iOS and Android devices.",
    challenge:
      "Lack of a unified mobile platform for regional optimization and civic engagement, leading to disconnected community services.",
    solution:
      "Engineered a high-performance cross-platform mobile application to ensure a seamless, native-like experience on both iOS and Android devices.",
    results: [
      "Rapid user adoption across the targeted demographic",
      "Seamless cross-platform performance",
      "Real-time geolocation services integrated",
      "High user satisfaction ratings",
    ],
    category: "Mobile & Web",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    tagColor: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    accent: "#f97316",
    stack: ["Flutter / React Native", "Firebase", "Geolocation", "REST APIs"],
    impact: "Rapid user adoption across the targeted regional demographic",
    role: "Mobile App Development & API Architecture",
    iconName: "Smartphone",
  },
  {
    slug: "kp-landing-page",
    title: "Kp Landing Page",
    client: "KP Initiative",
    duration: "1 Month",
    description:
      "Designed and deployed a highly optimized, high-converting web presence supporting the KP initiative. The landing page leverages modern neo-glassmorphism aesthetics, fast global edge caching, and SEO best practices.",
    challenge:
      "Needed a highly optimized, high-converting web presence to support the KP initiative launch and drive app downloads.",
    solution:
      "Designed and deployed a modern neo-glassmorphism landing page leveraging fast global edge caching and SEO best practices.",
    results: [
      "Perfect 100 Lighthouse performance scores",
      "High conversion rates for app downloads",
      "Top search engine rankings",
      "Immersive, high-end user experience",
    ],
    category: "Mobile & Web",
    gradient: "from-blue-600 via-indigo-500 to-finova-purple",
    tagColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    accent: "#3b82f6",
    stack: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
    impact: "High conversion rates with perfect Lighthouse performance scores",
    role: "Frontend Design & Web Optimization",
    iconName: "Globe",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
