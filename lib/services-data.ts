export type ServiceGroup = {
  id: string
  title: string
  badge: string
  description: string
  href: string
  color: string
  glow: string
}

export type Subservice = {
  slug: string
  title: string
  description: string
  overview: string
  parentId: string
  parentTitle: string
  whoItsFor: string[]
  useCases: string[]
  capabilities: string[]
  deliverables: string[]
  process: string[]
  outcomes: string[]
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: "full-stack-development",
    title: "Full Stack Development",
    badge: "Web & Mobile Engineering",
    description:
      "End-to-end development solutions covering both frontend and backend, delivering scalable and robust applications tailored to your business needs.",
    href: "/services/web-app",
    color: "from-finova-cyan to-finova-blue",
    glow: "rgba(14,165,233,0.5)",
  },
  {
    id: "ai-ml-engineering",
    title: "AI & ML Engineering",
    badge: "Intelligent Automation",
    description:
      "Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and drive innovation in your business.",
    href: "/services/ai-ml",
    color: "from-finova-magenta to-finova-purple",
    glow: "rgba(217,70,239,0.5)",
  },
  {
    id: "blockchain-development",
    title: "Blockchain Development",
    badge: "Web3 Infrastructure",
    description:
      "Build secure, decentralized applications and smart contracts on leading blockchain platforms for transparency and trust.",
    href: "/services/blockchain",
    color: "from-finova-purple to-finova-cyan",
    glow: "rgba(147,51,234,0.5)",
  },
  {
    id: "iot-embedded-systems",
    title: "IoT & Embedded Systems",
    badge: "Connected Ecosystems",
    description:
      "Connect devices and systems to create intelligent ecosystems that collect data, automate processes, and enhance operational efficiency.",
    href: "/services/iot",
    color: "from-finova-teal to-finova-lightBlue",
    glow: "rgba(54,183,215,0.5)",
  },
  {
    id: "enterprise-it-solutions",
    title: "Enterprise IT Solutions",
    badge: "Corporate Infrastructure",
    description:
      "Comprehensive IT solutions designed for large-scale enterprises, ensuring reliability, security, and scalability.",
    href: "/services/enterprise-it",
    color: "from-finova-blue to-finova-purple",
    glow: "rgba(59,130,246,0.5)",
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    badge: "Business Evolution",
    description:
      "Modernize your business processes and embrace digital technologies to stay competitive in the evolving marketplace.",
    href: "/services/digital-transformation",
    color: "from-finova-magenta to-finova-cyan",
    glow: "rgba(217,70,239,0.5)",
  },
]

export const subservices: Subservice[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "Custom web applications using modern frameworks like React, Next.js, and Vue.js.",
    overview:
      "We design and build production web applications that perform at scale. From modern UI to backend integrations, we focus on speed, security, and a clean developer experience.",
    parentId: "full-stack-development",
    parentTitle: "Full Stack Development",
    whoItsFor: [
      "Product teams launching new platforms",
      "Enterprises modernizing customer portals",
      "Marketing teams needing conversion-focused sites",
      "Operations teams building internal tools",
    ],
    useCases: [
      "Customer self-service portals",
      "Analytics dashboards and reporting",
      "B2B and B2C ecommerce",
      "Internal admin and workflow tools",
    ],
    capabilities: [
      "Modern web apps with React, Next.js, and Vue.js",
      "Responsive layouts with accessibility standards",
      "Performance optimization and SEO readiness",
      "API and third-party integrations",
    ],
    deliverables: [
      "Frontend app and component library",
      "Backend services or API layer",
      "Deployment pipeline and hosting setup",
      "Performance and analytics instrumentation",
    ],
    process: [
      "Discovery and requirements mapping",
      "Architecture and UX planning",
      "Iterative development sprints",
      "QA, launch, and optimization",
    ],
    outcomes: [
      "Faster page loads and stronger conversions",
      "Scalable architecture for growth",
      "Consistent experiences across devices",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android using React Native.",
    overview:
      "We build mobile applications that feel native, load fast, and keep users engaged. Our focus is on stable performance, offline resilience, and strong analytics.",
    parentId: "full-stack-development",
    parentTitle: "Full Stack Development",
    whoItsFor: [
      "Consumer brands launching mobile-first experiences",
      "Field teams needing real-time mobile tools",
      "Startups building cross-platform MVPs",
      "Enterprises standardizing mobile workflows",
    ],
    useCases: [
      "Booking and scheduling apps",
      "Sales enablement tools",
      "Loyalty and rewards programs",
      "Service dispatch and logistics",
    ],
    capabilities: [
      "iOS and Android builds with React Native",
      "Offline-first flows and push notifications",
      "Native performance tuning and analytics",
      "App store release management",
    ],
    deliverables: [
      "Cross-platform mobile app",
      "CI/CD and release pipelines",
      "Analytics and crash monitoring",
      "Store-ready assets and submission",
    ],
    process: [
      "Product discovery and UX definition",
      "Prototype and architecture validation",
      "Build, test, and iterate",
      "Release, monitor, and improve",
    ],
    outcomes: [
      "Faster time to market",
      "Consistent cross-platform experience",
      "Higher mobile engagement",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-centered design with intuitive interfaces and seamless user experiences.",
    overview:
      "We turn complex workflows into intuitive experiences through research, prototyping, and clear design systems. The focus is usability, conversion, and brand consistency.",
    parentId: "full-stack-development",
    parentTitle: "Full Stack Development",
    whoItsFor: [
      "Product teams refining customer journeys",
      "Enterprises redesigning legacy tools",
      "Startups defining product-market fit",
      "Marketing teams improving conversion",
    ],
    useCases: [
      "Design system creation",
      "Onboarding and activation flows",
      "Dashboard and reporting UX",
      "Product redesigns",
    ],
    capabilities: [
      "User research and journey mapping",
      "Wireframes and interactive prototypes",
      "Design systems and component libraries",
      "Usability testing and iteration",
    ],
    deliverables: [
      "Research insights and personas",
      "Interactive prototypes",
      "Design system and UI kit",
      "Developer handoff specs",
    ],
    process: [
      "Discovery and user interviews",
      "Information architecture",
      "Design iterations and testing",
      "Handoff and design QA",
    ],
    outcomes: [
      "Higher user satisfaction",
      "Reduced friction in key flows",
      "Brand-consistent interfaces",
    ],
  },
  {
    slug: "api-development",
    title: "API Development",
    description: "RESTful and GraphQL APIs for seamless integration and data exchange.",
    overview:
      "We build secure, reliable APIs that connect products, partners, and internal systems. The goal is predictable performance, clear documentation, and long-term maintainability.",
    parentId: "full-stack-development",
    parentTitle: "Full Stack Development",
    whoItsFor: [
      "Platform teams exposing partner APIs",
      "SaaS companies scaling integrations",
      "Mobile teams needing stable backends",
      "Operations teams automating data flows",
    ],
    useCases: [
      "Partner integrations and marketplaces",
      "Mobile and web backends",
      "Data sync across tools",
      "Automation triggers and webhooks",
    ],
    capabilities: [
      "REST and GraphQL API architecture",
      "Authentication, rate limiting, and security",
      "Clear documentation and developer tooling",
      "Performance monitoring and scaling",
    ],
    deliverables: [
      "API specification and schemas",
      "Authentication and access controls",
      "Developer portal and documentation",
      "Monitoring and observability setup",
    ],
    process: [
      "Requirements and domain modeling",
      "Schema and contract design",
      "Implementation and testing",
      "Launch and monitoring",
    ],
    outcomes: [
      "Faster integrations",
      "Reliable data exchange",
      "Secure access control",
    ],
  },
  {
    slug: "custom-ai-models",
    title: "Custom AI Models",
    description: "Tailored machine learning models for specific business challenges.",
    overview:
      "We build custom AI models that solve domain-specific problems with measurable impact. From data strategy to deployment, we ensure models are reliable and production-ready.",
    parentId: "ai-ml-engineering",
    parentTitle: "AI & ML Engineering",
    whoItsFor: [
      "Data teams building domain-specific models",
      "Operations leaders automating decisions",
      "Product teams adding AI capabilities",
      "Enterprises seeking competitive advantage",
    ],
    useCases: [
      "Demand forecasting and planning",
      "Risk and fraud detection",
      "Personalization and recommendations",
      "Process automation and scoring",
    ],
    capabilities: [
      "Problem framing and data strategy",
      "Model training and evaluation",
      "Deployment and MLOps pipelines",
      "Continuous monitoring and retraining",
    ],
    deliverables: [
      "Training pipeline and feature store",
      "Model artifacts and evaluation reports",
      "Deployment endpoints and monitoring",
      "Playbooks for retraining",
    ],
    process: [
      "Data audit and feasibility",
      "Model design and experimentation",
      "Production deployment",
      "Iteration and optimization",
    ],
    outcomes: [
      "Automation of complex decisions",
      "Higher accuracy on domain data",
      "Measurable ROI from AI",
    ],
  },
  {
    slug: "natural-language-processing",
    title: "Natural Language Processing",
    description: "Text analysis, sentiment analysis, and chatbot development.",
    overview:
      "We build NLP systems that understand, classify, and generate language with high accuracy. This includes chatbots, summarization, and sentiment analysis pipelines.",
    parentId: "ai-ml-engineering",
    parentTitle: "AI & ML Engineering",
    whoItsFor: [
      "Customer support teams",
      "Marketing and insights teams",
      "Compliance and QA groups",
      "Knowledge management owners",
    ],
    useCases: [
      "Sentiment analysis and feedback mining",
      "Chatbots and virtual assistants",
      "Document classification",
      "Summarization and knowledge extraction",
    ],
    capabilities: [
      "Text classification and sentiment analysis",
      "Chatbot and assistant development",
      "Entity extraction and summarization",
      "Multilingual NLP support",
    ],
    deliverables: [
      "NLP models and evaluation metrics",
      "Chatbot conversation flows",
      "API endpoints and integrations",
      "Insights dashboards",
    ],
    process: [
      "Data collection and labeling",
      "Model training and tuning",
      "Quality evaluation",
      "Deployment and iteration",
    ],
    outcomes: [
      "Faster response times",
      "Deeper customer insights",
      "Automated content workflows",
    ],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    description: "Image recognition, object detection, and video analytics.",
    overview:
      "We deploy computer vision systems that interpret images and video in real time. This helps automate inspections, safety, and monitoring workflows.",
    parentId: "ai-ml-engineering",
    parentTitle: "AI & ML Engineering",
    whoItsFor: [
      "Manufacturing and quality teams",
      "Security and surveillance operators",
      "Retail and warehouse managers",
      "Healthcare imaging teams",
    ],
    useCases: [
      "Defect detection and quality control",
      "Safety monitoring and compliance",
      "Shelf and inventory analytics",
      "OCR and document scanning",
    ],
    capabilities: [
      "Image classification and object detection",
      "Video analytics and tracking",
      "Quality inspection and compliance",
      "Edge deployment support",
    ],
    deliverables: [
      "Model training and validation",
      "Labeling guidelines and pipelines",
      "Edge or cloud deployment",
      "Monitoring and alerting",
    ],
    process: [
      "Data collection and labeling",
      "Model training and evaluation",
      "Pilot deployment",
      "Scale and optimization",
    ],
    outcomes: [
      "Reduced manual review",
      "Real-time visual monitoring",
      "Improved accuracy",
    ],
  },
  {
    slug: "predictive-analytics",
    title: "Predictive Analytics",
    description: "Forecast trends and behaviors using historical data.",
    overview:
      "We build forecasting models that predict demand, risk, and performance trends. The focus is on actionable insights that drive planning and resource allocation.",
    parentId: "ai-ml-engineering",
    parentTitle: "AI & ML Engineering",
    whoItsFor: [
      "Operations and supply chain teams",
      "Finance and planning leaders",
      "Sales and revenue teams",
      "Risk and compliance teams",
    ],
    useCases: [
      "Demand and capacity forecasting",
      "Churn and retention modeling",
      "Revenue forecasting",
      "Anomaly and risk detection",
    ],
    capabilities: [
      "Forecasting and demand planning",
      "Churn and risk modeling",
      "Anomaly detection",
      "Scenario modeling",
    ],
    deliverables: [
      "Forecast models and dashboards",
      "Automated alerting",
      "Scenario playbooks",
      "Integration into planning tools",
    ],
    process: [
      "Data assessment and modeling",
      "Feature engineering",
      "Model evaluation and validation",
      "Production rollout",
    ],
    outcomes: [
      "Proactive decisions",
      "Lower operational risk",
      "Optimized resource allocation",
    ],
  },
  {
    slug: "smart-contract-development",
    title: "Smart Contract Development",
    description: "Solidity-based smart contracts for Ethereum and EVM-compatible chains.",
    overview:
      "We design, build, and audit-ready smart contracts that power secure on-chain transactions and automation. Security and transparency are built in from day one.",
    parentId: "blockchain-development",
    parentTitle: "Blockchain Development",
    whoItsFor: [
      "Web3 product teams",
      "Fintech and payment platforms",
      "DAOs and governance groups",
      "Tokenized asset platforms",
    ],
    useCases: [
      "On-chain escrow and settlement",
      "Governance and voting",
      "Asset tokenization",
      "Compliance-ready smart workflows",
    ],
    capabilities: [
      "Solidity smart contract engineering",
      "Security audits and automated testing",
      "Gas optimization and upgrades",
      "Mainnet and testnet deployments",
    ],
    deliverables: [
      "Smart contract codebase",
      "Automated test suite",
      "Audit documentation",
      "Deployment scripts",
    ],
    process: [
      "Requirements and threat modeling",
      "Contract design and implementation",
      "Security testing and review",
      "Deployment and monitoring",
    ],
    outcomes: [
      "Trusted automation",
      "Reduced transaction risk",
      "Faster settlement",
    ],
  },
  {
    slug: "dapp-development",
    title: "DApp Development",
    description: "Decentralized applications with Web3 integration.",
    overview:
      "We build production-grade dApps with wallet onboarding, smart contract integration, and seamless user experiences. Focused on performance, security, and adoption.",
    parentId: "blockchain-development",
    parentTitle: "Blockchain Development",
    whoItsFor: [
      "Protocol teams launching dApps",
      "Marketplaces and NFT platforms",
      "DAOs and community apps",
      "Fintech and DeFi startups",
    ],
    useCases: [
      "Wallet-based authentication",
      "On-chain marketplaces",
      "Staking and rewards portals",
      "Decentralized identity apps",
    ],
    capabilities: [
      "Web3 frontends and wallet flows",
      "On-chain and off-chain data sync",
      "User onboarding and security",
      "Protocol analytics and monitoring",
    ],
    deliverables: [
      "DApp frontend",
      "Smart contract integration",
      "Indexing and data layer",
      "Monitoring and analytics",
    ],
    process: [
      "UX and onboarding design",
      "Integration architecture",
      "Development and testing",
      "Launch and scaling",
    ],
    outcomes: [
      "Seamless decentralized UX",
      "Higher protocol adoption",
      "Secure user access",
    ],
  },
  {
    slug: "defi-solutions",
    title: "DeFi Solutions",
    description: "Decentralized finance protocols and platforms.",
    overview:
      "We design and build DeFi products that prioritize risk controls, transparency, and user trust. Ideal for protocols launching lending, staking, or liquidity products.",
    parentId: "blockchain-development",
    parentTitle: "Blockchain Development",
    whoItsFor: [
      "DeFi protocol teams",
      "Treasury and liquidity managers",
      "Fintech innovators",
      "Web3 investment groups",
    ],
    useCases: [
      "Lending and borrowing platforms",
      "Staking and yield products",
      "Treasury management tools",
      "On-chain liquidity programs",
    ],
    capabilities: [
      "Liquidity and staking systems",
      "Yield and reward mechanics",
      "Risk and compliance controls",
      "Protocol analytics",
    ],
    deliverables: [
      "Protocol smart contracts",
      "Risk management configuration",
      "Governance tooling",
      "Analytics dashboards",
    ],
    process: [
      "Tokenomics and risk design",
      "Smart contract development",
      "Security review and audits",
      "Go-live support",
    ],
    outcomes: [
      "New revenue channels",
      "Transparent financial operations",
      "Community growth",
    ],
  },
  {
    slug: "token-development",
    title: "Token Development",
    description: "ERC-20, ERC-721, and custom token creation.",
    overview:
      "We create reliable token contracts and distribution tooling for utility tokens, NFTs, and governance assets. Focused on security, compliance, and long-term management.",
    parentId: "blockchain-development",
    parentTitle: "Blockchain Development",
    whoItsFor: [
      "Product teams launching tokenized assets",
      "Loyalty and rewards programs",
      "NFT creators and marketplaces",
      "Governance and DAO initiatives",
    ],
    useCases: [
      "Utility and access tokens",
      "NFT collections and drops",
      "Loyalty and rewards programs",
      "Governance and voting tokens",
    ],
    capabilities: [
      "ERC-20 and ERC-721 token contracts",
      "Tokenomics design support",
      "Minting and distribution tooling",
      "Governance integration",
    ],
    deliverables: [
      "Token contract suite",
      "Minting and admin tools",
      "Distribution plan support",
      "Audit-ready documentation",
    ],
    process: [
      "Token strategy and requirements",
      "Contract development",
      "Testing and security checks",
      "Launch and monitoring",
    ],
    outcomes: [
      "Reliable asset issuance",
      "Clear compliance posture",
      "Scalable token management",
    ],
  },
  {
    slug: "iot-device-integration",
    title: "IoT Device Integration",
    description: "Connect and manage IoT devices across platforms.",
    overview:
      "We connect sensors, gateways, and edge devices into a single management layer. The focus is secure connectivity, reliable telemetry, and centralized visibility.",
    parentId: "iot-embedded-systems",
    parentTitle: "IoT & Embedded Systems",
    whoItsFor: [
      "Manufacturing and plant operators",
      "Utilities and energy providers",
      "Logistics and fleet teams",
      "Smart building managers",
    ],
    useCases: [
      "Fleet tracking and telemetry",
      "Asset monitoring and alerts",
      "Predictive maintenance signals",
      "Remote device control",
    ],
    capabilities: [
      "Device onboarding and fleet management",
      "MQTT and protocol support",
      "Secure device communication",
      "Remote monitoring and control",
    ],
    deliverables: [
      "Device management layer",
      "Data ingestion pipeline",
      "Monitoring dashboards",
      "Alerting and automation",
    ],
    process: [
      "Device audit and connectivity plan",
      "Integration and provisioning",
      "Telemetry validation",
      "Rollout and scaling",
    ],
    outcomes: [
      "Connected device visibility",
      "Reduced maintenance overhead",
      "Real-time device control",
    ],
  },
  {
    slug: "embedded-software-development",
    title: "Embedded Software Development",
    description: "Firmware and software for embedded systems.",
    overview:
      "We develop reliable firmware and embedded software for sensors, gateways, and devices. The goal is stable performance, power efficiency, and long-term maintainability.",
    parentId: "iot-embedded-systems",
    parentTitle: "IoT & Embedded Systems",
    whoItsFor: [
      "Hardware startups",
      "OEM manufacturers",
      "Industrial automation teams",
      "Medical device innovators",
    ],
    useCases: [
      "Sensor firmware development",
      "Gateway and controller software",
      "Industrial device automation",
      "Low-power embedded systems",
    ],
    capabilities: [
      "Firmware development and RTOS",
      "Hardware integration and drivers",
      "Power and performance optimization",
      "Testing and validation",
    ],
    deliverables: [
      "Firmware source code",
      "Hardware driver stack",
      "OTA update pipeline",
      "Validation and test suites",
    ],
    process: [
      "Requirements and hardware review",
      "Prototyping and integration",
      "Testing and validation",
      "Production readiness",
    ],
    outcomes: [
      "Reliable device performance",
      "Longer battery life",
      "Faster hardware iteration",
    ],
  },
  {
    slug: "edge-computing",
    title: "Edge Computing",
    description: "Process data at the edge for faster response times.",
    overview:
      "We deploy low-latency computing at the edge so critical decisions happen close to the device. Ideal for real-time operations and remote environments.",
    parentId: "iot-embedded-systems",
    parentTitle: "IoT & Embedded Systems",
    whoItsFor: [
      "Operations teams needing low latency",
      "Remote or offline environments",
      "Smart factory deployments",
      "Vision-based monitoring",
    ],
    useCases: [
      "Real-time anomaly detection",
      "On-device inference",
      "Offline-first processing",
      "Local data filtering",
    ],
    capabilities: [
      "Low-latency processing",
      "Local data filtering and caching",
      "Model deployment at the edge",
      "Resilient offline operations",
    ],
    deliverables: [
      "Edge runtime setup",
      "Optimized model deployment",
      "Local data storage",
      "Monitoring and health checks",
    ],
    process: [
      "Architecture and device selection",
      "Model optimization",
      "Edge deployment",
      "Maintenance and updates",
    ],
    outcomes: [
      "Faster decisions",
      "Lower cloud costs",
      "Improved uptime",
    ],
  },
  {
    slug: "real-time-analytics",
    title: "Real-time Analytics",
    description: "Monitor and analyze IoT data in real-time.",
    overview:
      "We build streaming analytics pipelines that turn device data into live dashboards and alerts. The focus is visibility, speed, and operational action.",
    parentId: "iot-embedded-systems",
    parentTitle: "IoT & Embedded Systems",
    whoItsFor: [
      "Operations and monitoring teams",
      "Logistics and fleet managers",
      "Manufacturing supervisors",
      "Energy and utilities teams",
    ],
    useCases: [
      "Live operations dashboards",
      "SLA and uptime monitoring",
      "Event-driven alerting",
      "Performance and utilization tracking",
    ],
    capabilities: [
      "Streaming data pipelines",
      "Live dashboards and alerts",
      "Event processing and triggers",
      "Operational KPI tracking",
    ],
    deliverables: [
      "Streaming ingestion pipeline",
      "Visualization dashboards",
      "Alerting and incident rules",
      "Retention and governance setup",
    ],
    process: [
      "Data ingestion planning",
      "Stream processing build",
      "Dashboard design",
      "Tuning and optimization",
    ],
    outcomes: [
      "Instant visibility",
      "Faster incident response",
      "Continuous optimization",
    ],
  },
  {
    slug: "erp-crm",
    title: "ERP & CRM",
    description: "Integrated business management and customer relationship software.",
    overview:
      "We design ERP and CRM systems that unify sales, operations, and finance. The focus is clean workflows, role-based access, and reliable reporting.",
    parentId: "enterprise-it-solutions",
    parentTitle: "Enterprise IT Solutions",
    whoItsFor: [
      "Enterprise operations leaders",
      "Sales and revenue teams",
      "Finance and procurement",
      "Customer support organizations",
    ],
    useCases: [
      "Order-to-cash workflows",
      "Inventory and procurement",
      "Customer lifecycle management",
      "Executive reporting",
    ],
    capabilities: [
      "Custom modules and workflows",
      "Data migration and integration",
      "Role-based access control",
      "Reporting and dashboards",
    ],
    deliverables: [
      "ERP or CRM configuration",
      "Migration plan and execution",
      "Integration with core systems",
      "Training and documentation",
    ],
    process: [
      "Discovery and process mapping",
      "Configuration and customization",
      "Integration and testing",
      "Go-live and enablement",
    ],
    outcomes: [
      "Unified operations",
      "Improved team productivity",
      "Better customer visibility",
    ],
  },
  {
    slug: "cloud-migration",
    title: "Cloud Migration",
    description: "Seamless transition to cloud infrastructure (AWS, Azure, GCP).",
    overview:
      "We migrate legacy systems to the cloud with minimal disruption. The focus is security, reliability, and cost optimization across AWS, Azure, or GCP.",
    parentId: "enterprise-it-solutions",
    parentTitle: "Enterprise IT Solutions",
    whoItsFor: [
      "IT leaders planning data center exits",
      "Enterprises modernizing infrastructure",
      "DevOps and platform teams",
      "Security and compliance owners",
    ],
    useCases: [
      "Lift-and-shift migrations",
      "Re-platforming and modernization",
      "Disaster recovery setups",
      "Hybrid cloud strategies",
    ],
    capabilities: [
      "Cloud readiness assessment",
      "AWS, Azure, and GCP migrations",
      "Modernization and re-architecture",
      "Security and cost optimization",
    ],
    deliverables: [
      "Migration plan and runbooks",
      "Infrastructure as code",
      "Security hardening and policies",
      "Cost and performance reports",
    ],
    process: [
      "Assessment and planning",
      "Pilot migration",
      "Migration waves",
      "Optimization and governance",
    ],
    outcomes: [
      "Scalable infrastructure",
      "Lower maintenance cost",
      "Improved reliability",
    ],
  },
  {
    slug: "system-integration",
    title: "System Integration",
    description: "Connect disparate systems for unified operations.",
    overview:
      "We integrate platforms and data sources so teams can work from a single system of record. The focus is reliable data flows and automation.",
    parentId: "enterprise-it-solutions",
    parentTitle: "Enterprise IT Solutions",
    whoItsFor: [
      "Operations teams struggling with siloed tools",
      "IT teams managing multiple systems",
      "Sales and finance alignment",
      "Customer support workflows",
    ],
    useCases: [
      "CRM to ERP data sync",
      "Automation between SaaS tools",
      "Single customer view",
      "Workflow orchestration",
    ],
    capabilities: [
      "API orchestration and middleware",
      "Legacy system connectivity",
      "Data synchronization",
      "Automation between tools",
    ],
    deliverables: [
      "Integration architecture",
      "Connectors and middleware",
      "Monitoring and alerting",
      "Documentation and support",
    ],
    process: [
      "System mapping",
      "Connector development",
      "Testing and validation",
      "Rollout and monitoring",
    ],
    outcomes: [
      "Reduced manual handoffs",
      "Single source of truth",
      "Faster cross-team execution",
    ],
  },
  {
    slug: "cybersecurity-solutions",
    title: "Cybersecurity Solutions",
    description: "Advanced threat protection and compliance management.",
    overview:
      "We design security programs that reduce risk, improve compliance, and protect critical data. Focused on visibility, response, and governance.",
    parentId: "enterprise-it-solutions",
    parentTitle: "Enterprise IT Solutions",
    whoItsFor: [
      "Regulated industries",
      "Security and compliance leaders",
      "IT risk management teams",
      "Enterprises with sensitive data",
    ],
    useCases: [
      "Threat detection and response",
      "Identity and access management",
      "Compliance audits",
      "Security posture assessments",
    ],
    capabilities: [
      "Threat detection and monitoring",
      "Identity and access management",
      "Compliance and audit readiness",
      "Incident response planning",
    ],
    deliverables: [
      "Security assessment report",
      "Policy and controls updates",
      "Monitoring dashboards",
      "Incident response plan",
    ],
    process: [
      "Risk assessment",
      "Remediation and hardening",
      "Monitoring rollout",
      "Training and governance",
    ],
    outcomes: [
      "Reduced security risk",
      "Regulatory compliance",
      "Stronger data protection",
    ],
  },
  {
    slug: "process-automation",
    title: "Process Automation",
    description: "Automate repetitive tasks and optimize workflows.",
    overview:
      "We automate manual workflows so teams move faster with fewer errors. The focus is measurable efficiency and predictable operations.",
    parentId: "digital-transformation",
    parentTitle: "Digital Transformation",
    whoItsFor: [
      "Operations leaders",
      "Finance and procurement teams",
      "Customer support teams",
      "HR and onboarding teams",
    ],
    useCases: [
      "Approval routing",
      "Invoice processing",
      "Customer onboarding",
      "Data entry automation",
    ],
    capabilities: [
      "Workflow automation and RPA",
      "Approval routing",
      "Integration with core systems",
      "Operational KPI tracking",
    ],
    deliverables: [
      "Automation workflows",
      "Integration connectors",
      "Monitoring and reporting",
      "Governance rules",
    ],
    process: [
      "Process mapping",
      "Automation design",
      "Deployment and testing",
      "Continuous improvement",
    ],
    outcomes: [
      "Faster execution",
      "Lower error rates",
      "Higher throughput",
    ],
  },
  {
    slug: "legacy-modernization",
    title: "Legacy Modernization",
    description: "Upgrade outdated systems with modern technologies.",
    overview:
      "We modernize legacy applications without disrupting the business. The focus is improved performance, reliability, and developer velocity.",
    parentId: "digital-transformation",
    parentTitle: "Digital Transformation",
    whoItsFor: [
      "Enterprises with legacy platforms",
      "IT teams managing technical debt",
      "Product teams planning re-platforms",
      "Compliance-driven organizations",
    ],
    useCases: [
      "Monolith to microservices",
      "UI and UX refresh",
      "Database upgrades",
      "Performance optimization",
    ],
    capabilities: [
      "Application assessment",
      "Re-platforming and refactoring",
      "UX modernization",
      "Performance improvements",
    ],
    deliverables: [
      "Modernization roadmap",
      "Refactored codebase",
      "Migration and testing plans",
      "Performance benchmarks",
    ],
    process: [
      "System audit",
      "Roadmap and prioritization",
      "Phased delivery",
      "Optimization and monitoring",
    ],
    outcomes: [
      "Lower technical debt",
      "Improved user experience",
      "Future-ready systems",
    ],
  },
  {
    slug: "data-analytics-bi",
    title: "Data Analytics & BI",
    description: "Transform data into actionable business insights.",
    overview:
      "We build analytics stacks that unify data and deliver decision-ready dashboards. The focus is trusted metrics, self-serve insights, and governance.",
    parentId: "digital-transformation",
    parentTitle: "Digital Transformation",
    whoItsFor: [
      "Executive leadership teams",
      "Finance and planning groups",
      "Operations managers",
      "Analytics teams",
    ],
    useCases: [
      "Executive KPI dashboards",
      "Revenue and pipeline reporting",
      "Supply chain insights",
      "Customer behavior analytics",
    ],
    capabilities: [
      "Data modeling and warehousing",
      "BI dashboards",
      "ETL pipelines",
      "Self-serve reporting",
    ],
    deliverables: [
      "Data warehouse or lakehouse",
      "ETL and transformation pipelines",
      "Dashboards and reporting",
      "Data governance framework",
    ],
    process: [
      "Data strategy and audit",
      "Pipeline development",
      "Dashboard design",
      "Adoption and training",
    ],
    outcomes: [
      "Decision-ready insights",
      "Faster reporting cycles",
      "Better data governance",
    ],
  },
  {
    slug: "digital-strategy-consulting",
    title: "Digital Strategy Consulting",
    description: "Roadmap planning for digital initiatives.",
    overview:
      "We help leadership teams define digital roadmaps, prioritize investments, and align teams around measurable outcomes. The focus is clarity, alignment, and speed.",
    parentId: "digital-transformation",
    parentTitle: "Digital Transformation",
    whoItsFor: [
      "Executive leadership",
      "Transformation offices",
      "IT strategy teams",
      "Product and innovation teams",
    ],
    useCases: [
      "Digital roadmap planning",
      "Capability assessments",
      "Platform selection",
      "Operating model redesign",
    ],
    capabilities: [
      "Digital roadmap planning",
      "Change management support",
      "Platform selection",
      "KPI definition",
    ],
    deliverables: [
      "Strategy and roadmap",
      "Initiative prioritization",
      "KPI framework",
      "Change management plan",
    ],
    process: [
      "Stakeholder interviews",
      "Current state assessment",
      "Roadmap and business case",
      "Enablement and governance",
    ],
    outcomes: [
      "Clear transformation plan",
      "Aligned stakeholders",
      "Faster time to value",
    ],
  },
]

export const getSubserviceBySlug = (slug: string) =>
  subservices.find((subservice) => subservice.slug === slug)

export const getSubservicesByParent = (parentId: string) =>
  subservices.filter((subservice) => subservice.parentId === parentId)
