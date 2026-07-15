export type Product = {
  id: string
  title: string
  seoDescription: string
  hero: {
    eyebrow: string
    subheadline: string
    description: string
    highlights: Array<{ label: string; value: string }>
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  problemStatements: string[]
  overview: string
  coreFeatures: Array<{ title: string; items: string[] }>
  aiOverview: string
  aiFeatures: string[]
  workflow: string[]
  dashboards: string[]
  businessImpact: string[]
  industries: string[]
  integrations: string[]
  illustration: string
  gradient: string
  iconGradient: string
  bgAccent: string
  borderAccent: string
  hoverAccent: string
}

export const products: Product[] = [
  {
    id: "awaaz",
    title: "Awaaz",
    seoDescription: "Conversational AI voice agent with regional language fluency, 24/7 availability, and dialer-ready deployment.",
    hero: {
      eyebrow: "Conversational AI Voice Agent",
      subheadline: "Human-like voice automation for sales, support, and scheduling.",
      description: "Awaaz sounds like a real person, speaks regional Pakistani languages and American English accents, and scales to unlimited concurrent calls.",
      highlights: [
        {
          label: "What it is",
          value: "An AI voice agent that handles inbound and outbound calls with natural, fluent conversations."
        },
        {
          label: "Built for",
          value: "Contact centers, sales teams, and operations leaders handling high call volume."
        },
        {
          label: "Biggest value",
          value: "Always-on voice coverage without headcount limits or ramp-up time."
        }
      ],
      primaryCta: { label: "Book a demo", href: "/contact" },
      secondaryCta: { label: "Schedule consultation", href: "/consultation" }
    },
    problemStatements: [
      "Human agents cannot cover 24/7 demand and peak call surges.",
      "Multilingual support is costly and inconsistent across regions.",
      "Manual call handling slows sales and appointment workflows.",
      "Scaling call operations requires hiring, training, and supervision."
    ],
    overview: "Awaaz delivers natural voice conversations that integrate with your existing dialers or deploy on Finova infrastructure, enabling unlimited concurrent calls with consistent quality.",
    coreFeatures: [
      {
        title: "Customer facing features",
        items: [
          "Human-like tone with accent and language adaptation",
          "Natural conversational flows for inbound and outbound calls",
          "Seamless handoff to live agents when needed",
          "Consistent voice quality across every interaction"
        ]
      },
      {
        title: "Management features",
        items: [
          "Role-specific scripts and fine tuning",
          "Policy controls for verification and disclosures",
          "Supervisor review tools and call summaries",
          "Centralized configuration for call campaigns"
        ]
      },
      {
        title: "Automation features",
        items: [
          "Outbound sales and lead qualification",
          "Inbound support and appointment scheduling",
          "Reminder and follow-up orchestration",
          "CRM updates and disposition tagging"
        ]
      },
      {
        title: "Analytics features",
        items: [
          "Call outcome and conversion tracking",
          "Sentiment and intent reporting",
          "Agent handoff reasons and volume analytics",
          "Performance comparison across campaigns"
        ]
      }
    ],
    aiOverview: "AI powers speech recognition, intent understanding, and response generation across every call.",
    aiFeatures: [
      "Accent and language detection with fast switching",
      "Intent and sentiment recognition in real time",
      "Dynamic response generation based on context",
      "Learning from call outcomes to refine scripts"
    ],
    workflow: [
      "Call intake",
      "Language and intent detection",
      "Scripted action or qualification",
      "Live escalation when required",
      "CRM update and analytics"
    ],
    dashboards: [
      "Supervisor console",
      "Conversation design studio",
      "Campaign analytics dashboard",
      "Compliance and audit logs"
    ],
    businessImpact: [
      "Scale to unlimited concurrent calls",
      "Deliver 24/7 voice coverage without downtime",
      "Reduce cost per call while improving consistency",
      "Accelerate sales and support response times"
    ],
    industries: [
      "Contact centers and BPOs",
      "Telecom",
      "Banking and fintech",
      "Healthcare",
      "Ecommerce"
    ],
    integrations: [
      "Dialer and SIP integrations",
      "CRM and ticketing platforms",
      "Webhook and REST API",
      "Cloud or on-prem deployment",
      "Multi-region routing"
    ],
    illustration: "/illustrations/voice-ai.svg",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    iconGradient: "from-emerald-400 to-teal-500",
    bgAccent: "bg-emerald-500/5 dark:bg-emerald-400/5",
    borderAccent: "border-emerald-500/10 dark:border-emerald-400/10",
    hoverAccent: "group-hover:border-emerald-500/30 dark:group-hover:border-emerald-400/30"
  },
  {
    id: "qualicall",
    title: "Qualicall",
    seoDescription: "AI quality assurance that scores every call, explains decisions, and delivers coaching insights at scale.",
    hero: {
      eyebrow: "AI Quality Assurance",
      subheadline: "Every call reviewed with explainable QA.",
      description: "Qualicall listens to every call, scores script adherence, tone, and outcomes, and surfaces coaching insights for agents and managers.",
      highlights: [
        {
          label: "What it is",
          value: "An AI QA agent that evaluates 100% of call recordings and transcripts."
        },
        {
          label: "Built for",
          value: "Contact centers, sales floors, and regulated customer operations."
        },
        {
          label: "Biggest value",
          value: "Complete QA coverage with explainable, trusted scoring."
        }
      ],
      primaryCta: { label: "Book a demo", href: "/contact" },
      secondaryCta: { label: "Request pricing", href: "/contact" }
    },
    problemStatements: [
      "Only a small fraction of calls get reviewed manually.",
      "QA scoring is inconsistent across reviewers and teams.",
      "Managers lack fast, actionable coaching insights.",
      "Compliance audits require a complete, traceable record."
    ],
    overview: "Qualicall applies AI to every call recording to evaluate adherence, sentiment, rebuttal handling, and outcomes, then delivers role-specific dashboards with explainable evidence.",
    coreFeatures: [
      {
        title: "Customer facing features",
        items: [
          "Agent scorecards with coaching suggestions",
          "Script adherence feedback and rebuttal tips",
          "Performance insights per agent and team",
          "Personalized improvement recommendations"
        ]
      },
      {
        title: "Management features",
        items: [
          "Role-based dashboards for QA and leadership",
          "Calibration views for consistent scoring",
          "Audit trails with call-level evidence",
          "Workforce planning insights"
        ]
      },
      {
        title: "Automation features",
        items: [
          "Automatic call ingestion and scoring",
          "Issue tagging and coaching tasks",
          "Compliance escalation workflows",
          "Scheduled reports and alerts"
        ]
      },
      {
        title: "Analytics features",
        items: [
          "Sentiment and tone trend tracking",
          "Script adherence and rebuttal analysis",
          "Outcome and resolution correlation",
          "Training impact measurement"
        ]
      }
    ],
    aiOverview: "AI evaluates every call with transparent, explainable scoring and citations.",
    aiFeatures: [
      "Script adherence detection with call timestamps",
      "Tone and sentiment scoring per interaction",
      "Rebuttal handling classification",
      "Explainable highlights tied to recordings"
    ],
    workflow: [
      "Call ingestion",
      "Transcription and QA scoring",
      "Issue tagging and insights",
      "Dashboard delivery",
      "Coaching and compliance actions"
    ],
    dashboards: [
      "Agent performance dashboard",
      "QA supervisor console",
      "Compliance and audit center",
      "Training and coaching planner"
    ],
    businessImpact: [
      "Evaluate 100% of calls with consistent QA",
      "Improve coaching effectiveness and speed",
      "Reduce compliance risk with full audit trails",
      "Raise customer experience standards"
    ],
    industries: [
      "Contact centers and BPOs",
      "Telecom and utilities",
      "Banking and insurance",
      "Healthcare",
      "Retail and ecommerce"
    ],
    integrations: [
      "Call recording platforms",
      "Dialer and telephony systems",
      "CRM and ticketing tools",
      "Secure storage and exports",
      "API and webhooks"
    ],
    illustration: "/illustrations/qualicall.svg",
    gradient: "from-indigo-500 via-violet-600 to-purple-700",
    iconGradient: "from-indigo-400 to-violet-500",
    bgAccent: "bg-indigo-500/5 dark:bg-indigo-400/5",
    borderAccent: "border-indigo-500/10 dark:border-indigo-400/10",
    hoverAccent: "group-hover:border-indigo-500/30 dark:group-hover:border-indigo-400/30"
  },
  {
    id: "ai-powered-erp",
    title: "AI-Powered ERP",
    seoDescription: "AI-powered ERP that centralizes operations, automates workflows, and delivers real-time insights across teams.",
    hero: {
      eyebrow: "AI-Powered ERP",
      subheadline: "One intelligent ecosystem for people, projects, and operations.",
      description: "Streamline business operations with unified task management, RBAC, smart calendars, and AI-driven analytics.",
      highlights: [
        {
          label: "What it is",
          value: "A modern ERP platform that centralizes tasks, projects, and operational control."
        },
        {
          label: "Built for",
          value: "Growing organizations that need visibility and automation across teams."
        },
        {
          label: "Biggest value",
          value: "Unified operations with AI-assisted decision making."
        }
      ],
      primaryCta: { label: "Book a demo", href: "/contact" },
      secondaryCta: { label: "Schedule consultation", href: "/consultation" }
    },
    problemStatements: [
      "Operations data is scattered across disconnected tools.",
      "Manual task tracking leads to missed deadlines.",
      "Leadership lacks real-time visibility into execution.",
      "Teams struggle with inconsistent processes and approvals."
    ],
    overview: "AI-Powered ERP unifies employee activity monitoring, task tracking, submissions, announcements, and RBAC inside one intelligent platform with role-based dashboards.",
    coreFeatures: [
      {
        title: "Customer facing features",
        items: [
          "Task and project tracking with clear ownership",
          "Submission management and approvals",
          "Company-wide announcements and updates",
          "Smart calendar for internal and external meetings"
        ]
      },
      {
        title: "Management features",
        items: [
          "Executive, manager, and employee dashboards",
          "Role-based access control and secure data",
          "Employee activity and productivity insights",
          "Centralized operational governance"
        ]
      },
      {
        title: "Automation features",
        items: [
          "Real-time notifications for task changes",
          "Automated reminders and deadline alerts",
          "Integrated meeting scheduling and invites",
          "Policy-driven workflow approvals"
        ]
      },
      {
        title: "Analytics features",
        items: [
          "Operational performance analytics",
          "Project progress and workload reporting",
          "Productivity and utilization insights",
          "Team-level KPI dashboards"
        ]
      }
    ],
    aiOverview: "AI augments every workflow with prioritization, forecasting, and intelligent reporting.",
    aiFeatures: [
      "Smart task prioritization",
      "Predictive deadline risk detection",
      "Automated report generation",
      "AI meeting summaries and workload balancing"
    ],
    workflow: [
      "Task and project intake",
      "AI prioritization and alerts",
      "Execution tracking",
      "Manager review and approvals",
      "Performance reporting"
    ],
    dashboards: [
      "Executive command center",
      "Manager operations dashboard",
      "Employee workspace",
      "Project and task analytics"
    ],
    businessImpact: [
      "Improve productivity with centralized workflows",
      "Reduce missed deadlines through predictive alerts",
      "Increase visibility across departments",
      "Enable faster, data-driven decisions"
    ],
    industries: [
      "Professional services",
      "Manufacturing",
      "Logistics",
      "Healthcare",
      "Technology"
    ],
    integrations: [
      "Email and calendar providers",
      "SSO and identity providers",
      "HR and payroll systems",
      "Accounting and finance tools",
      "API and webhooks"
    ],
    illustration: "/illustrations/ai-erp.svg",
    gradient: "from-orange-500 via-amber-600 to-yellow-700",
    iconGradient: "from-orange-400 to-amber-500",
    bgAccent: "bg-orange-500/5 dark:bg-orange-400/5",
    borderAccent: "border-orange-500/10 dark:border-orange-400/10",
    hoverAccent: "group-hover:border-orange-500/30 dark:group-hover:border-orange-400/30"
  },
  {
    id: "mehman-nawaz",
    title: "Mehman Nawaz",
    seoDescription: "AI-powered hospitality management suite for hotels, resorts, and guest houses with personalized guest experiences.",
    hero: {
      eyebrow: "Hospitality AI Suite",
      subheadline: "Intelligent hospitality management for modern accommodations.",
      description: "Unify bookings, loyalty, staff operations, and AI-driven guest experiences in one hospitality ecosystem.",
      highlights: [
        {
          label: "What it is",
          value: "A complete hospitality management suite for hotels, resorts, and guest houses."
        },
        {
          label: "Built for",
          value: "Hospitality teams focused on efficiency, personalization, and revenue growth."
        },
        {
          label: "Biggest value",
          value: "AI-driven guest experiences with operational control at scale."
        }
      ],
      primaryCta: { label: "Book a demo", href: "/contact" },
      secondaryCta: { label: "Schedule consultation", href: "/consultation" }
    },
    problemStatements: [
      "Fragmented booking and guest management tools create delays.",
      "Manual pricing and staffing decisions leave revenue on the table.",
      "Guest experience lacks personalization across channels.",
      "Operational reporting is slow and inconsistent."
    ],
    overview: "Mehman Nawaz combines AI-powered guest experiences with operational management, loyalty, staff workflows, and real-time analytics for hospitality leaders.",
    coreFeatures: [
      {
        title: "Customer facing features",
        items: [
          "AI-powered room recommendations",
          "Smart loyalty program with tiered rewards",
          "Personalized guest upsell experiences",
          "Streamlined booking and check-in flows"
        ]
      },
      {
        title: "Management features",
        items: [
          "Centralized booking and revenue management",
          "Employee and staff management tools",
          "Role-based access control",
          "Administrator and manager dashboards"
        ]
      },
      {
        title: "Automation features",
        items: [
          "Automated check-in and check-out assistance",
          "Guest notifications and service requests",
          "Smart occupancy and staffing alerts",
          "Predictive maintenance workflows"
        ]
      },
      {
        title: "Analytics features",
        items: [
          "Occupancy and revenue trend analysis",
          "Guest sentiment and review insights",
          "Staff utilization dashboards",
          "AI-generated operational reports"
        ]
      }
    ],
    aiOverview: "AI is foundational to guest personalization, pricing, and predictive hospitality operations.",
    aiFeatures: [
      "Dynamic pricing recommendations",
      "Guest sentiment analysis and review insights",
      "Personalized upsell and loyalty offers",
      "Occupancy forecasting and staff allocation"
    ],
    workflow: [
      "Guest booking",
      "AI recommendations and loyalty capture",
      "Check-in and service delivery",
      "Operations and staff coordination",
      "Analytics and optimization"
    ],
    dashboards: [
      "Admin dashboard",
      "Manager operations view",
      "Staff task workspace",
      "Guest experience portal"
    ],
    businessImpact: [
      "Increase occupancy and revenue per guest",
      "Reduce operational costs through automation",
      "Improve guest retention with personalization",
      "Optimize staffing and maintenance planning"
    ],
    industries: [
      "Hotels and resorts",
      "Guest houses",
      "Serviced apartments",
      "Hospitality groups",
      "Travel operators"
    ],
    integrations: [
      "Channel managers and booking engines",
      "Payment gateways",
      "POS and revenue systems",
      "Email and SMS providers",
      "Cloud deployment"
    ],
    illustration: "/illustrations/mehman-nawaz.svg",
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    iconGradient: "from-green-400 to-emerald-500",
    bgAccent: "bg-green-500/5 dark:bg-green-400/5",
    borderAccent: "border-green-500/10 dark:border-green-400/10",
    hoverAccent: "group-hover:border-green-500/30 dark:group-hover:border-green-400/30"
  }
]

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}
