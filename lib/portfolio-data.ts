export type PracticeArea =
  | "agents-and-automation"
  | "erp-and-enterprise"
  | "fintech-and-web3"
  | "apps-and-platforms"
  | "websites-and-seo"

export type Region = "Pakistan" | "Gulf" | "USA" | "Africa" | "Global"

export type DepthTier = "flagship" | "standard" | "program"

export type MetricKind = "verified" | "benchmark" | "by-design"

export type Metric = {
  value: string
  label: string
  kind: MetricKind
  source?: string
}

export type Project = {
  number: number
  slug: string
  title: string
  client: string
  clientSlug?: string
  practice: PracticeArea
  industry: string
  region: Region
  liveUrl?: string
  summary: string
  need: string
  built: string
  gains: string[]
  metrics: Metric[]
  depth: DepthTier
  featured?: boolean
  accent: string
  gradient: string
  tagColor: string
  iconName:
    | "PhoneCall"
    | "Globe"
    | "Gamepad2"
    | "GraduationCap"
    | "Smartphone"
    | "Building2"
    | "Bot"
    | "Landmark"
    | "Coins"
    | "Calendar"
    | "Search"
    | "Plane"
    | "Wheat"
    | "Cookie"
    | "Shield"
    | "Leaf"
}

export type PracticeMeta = {
  id: PracticeArea
  label: string
  short: string
  description: string
  count: number
}

export const PRACTICE_AREAS: PracticeMeta[] = [
  {
    id: "agents-and-automation",
    label: "Agents and automation",
    short: "Agents",
    description:
      "Calls answered, leads qualified, verifications completed and back-office tasks closed without adding headcount.",
    count: 3,
  },
  {
    id: "erp-and-enterprise",
    label: "ERP and enterprise",
    short: "ERP",
    description:
      "One system of record for HR, finance, admin and operations, on web and mobile.",
    count: 5,
  },
  {
    id: "fintech-and-web3",
    label: "Fintech and Web3",
    short: "Fintech",
    description:
      "Working MVPs that let a bank or wallet test a new product with real users before committing budget.",
    count: 4,
  },
  {
    id: "apps-and-platforms",
    label: "Apps and platforms",
    short: "Apps",
    description: "Customer-facing apps and booking platforms that are live and in daily use.",
    count: 4,
  },
  {
    id: "websites-and-seo",
    label: "Websites and SEO",
    short: "Websites",
    description: "Sites that rank, load fast and bring in enquiries.",
    count: 5,
  },
]

export const PORTFOLIO_STATS = {
  projects: 21,
  partners: 11,
  regions: 4,
  practices: 5,
  framing:
    "Software that takes repetitive work off teams and turns missed demand into revenue. Twenty-one projects across government, finance, healthcare, education and SMEs.",
}

export const REGIONAL_CLIENTS: { region: Region; clients: string[] }[] = [
  {
    region: "Pakistan",
    clients: [
      "Telecom Foundation",
      "Easypaisa",
      "JazzCash",
      "National Bank of Pakistan",
      "TFES schools",
    ],
  },
  {
    region: "Gulf",
    clients: ["Advanza Tech, UAE", "Address of Technology, KSA"],
  },
  {
    region: "USA",
    clients: ["Sirius Solutions Global (~400 clinics)"],
  },
  {
    region: "Africa",
    clients: ["KobiPal"],
  },
]

const practiceStyles: Record<
  PracticeArea,
  { accent: string; gradient: string; tagColor: string }
> = {
  "agents-and-automation": {
    accent: "#0ea5e9",
    gradient: "from-finova-cyan via-finova-blue to-finova-purple",
    tagColor: "bg-finova-cyan/15 text-finova-cyan border-finova-cyan/30",
  },
  "erp-and-enterprise": {
    accent: "#a855f7",
    gradient: "from-finova-purple via-fuchsia-500 to-finova-magenta",
    tagColor: "bg-finova-purple/15 text-finova-purple border-finova-purple/30",
  },
  "fintech-and-web3": {
    accent: "#10b981",
    gradient: "from-emerald-500 via-teal-500 to-finova-cyan",
    tagColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  "apps-and-platforms": {
    accent: "#f97316",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    tagColor: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  },
  "websites-and-seo": {
    accent: "#38bdf8",
    gradient: "from-finova-lightBlue via-finova-cyan to-blue-500",
    tagColor: "bg-finova-lightBlue/15 text-finova-lightBlue border-finova-lightBlue/30",
  },
}

function style(practice: PracticeArea) {
  return practiceStyles[practice]
}

export const projects: Project[] = [
  {
    number: 1,
    slug: "telecom-foundation-corporate-website",
    title: "Telecom Foundation corporate website",
    client: "Telecom Foundation",
    clientSlug: "telecom-foundation",
    practice: "websites-and-seo",
    industry: "Government",
    region: "Pakistan",
    liveUrl: "https://telecomfoundation.org.pk",
    summary:
      "A modern, phone-first corporate website covering the Foundation's mandate, services, leadership, tenders and contact routes.",
    need: "A government organisation needed a public face that citizens, partners and ministries can trust and find their way around.",
    built: "A modern, phone-first corporate website covering the Foundation's mandate, services, leadership, tenders and contact routes.",
    gains: [
      "One authoritative source for public information",
      "Tenders and notices published in one findable place",
      "Reads well on a phone, where most visitors are",
    ],
    metrics: [
      {
        value: "~60%",
        label: "of web traffic is on mobile, so the site is built phone-first",
        kind: "benchmark",
        source: "StatCounter",
      },
      {
        value: "< 3 s",
        label: "page load target on a mobile connection",
        kind: "by-design",
      },
    ],
    depth: "standard",
    iconName: "Globe",
    ...style("websites-and-seo"),
  },
  {
    number: 2,
    slug: "telecom-foundation-social-welfare-website",
    title: "Telecom Foundation social welfare website",
    client: "Telecom Foundation",
    clientSlug: "telecom-foundation",
    practice: "websites-and-seo",
    industry: "Government, social welfare",
    region: "Pakistan",
    liveUrl: "https://transformingcommunitieswithtf.org.pk",
    summary:
      "A dedicated welfare home for programmes, the school network and ways for donors and beneficiaries to engage.",
    need: "The Foundation's welfare work, including its school network, had no dedicated home for beneficiaries and donors.",
    built: "A separate social welfare website presenting programmes, the school network and the ways to support them.",
    gains: [
      "Welfare programmes become visible to donors",
      "Beneficiaries find the right programme online",
      "The school network reads as one story",
    ],
    metrics: [
      {
        value: "16 schools",
        label: "nationwide presented in one place",
        kind: "verified",
      },
      {
        value: "24/7",
        label: "programme information open to donors and beneficiaries",
        kind: "by-design",
      },
    ],
    depth: "standard",
    iconName: "Globe",
    ...style("websites-and-seo"),
  },
  {
    number: 3,
    slug: "telecom-foundation-odoo-mobile",
    title: "Odoo ERP mobile application",
    client: "Telecom Foundation",
    clientSlug: "telecom-foundation",
    practice: "erp-and-enterprise",
    industry: "Government",
    region: "Pakistan",
    summary:
      "A mobile application on top of the Foundation's Odoo ERP, giving employees and approvers day-to-day workflows on the phone.",
    need: "Staff and managers are spread across offices and schools. They needed the ERP in their pocket, not only at a desk.",
    built: "A mobile application on top of the Foundation's Odoo ERP, giving employees and approvers their day-to-day workflows on the phone.",
    gains: [
      "Requests and approvals move without waiting for a desk",
      "Managers clear their queue from anywhere",
      "One set of records, whether entered on web or phone",
    ],
    metrics: [
      {
        value: "~600",
        label: "employees across offices and schools served by the ERP",
        kind: "verified",
      },
      {
        value: "18",
        label: "ERP modules sit behind the app",
        kind: "verified",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Smartphone",
    ...style("erp-and-enterprise"),
  },
  {
    number: 4,
    slug: "telecom-foundation-odoo-agents",
    title: "Odoo automation modules and five agents",
    client: "Telecom Foundation",
    clientSlug: "telecom-foundation",
    practice: "agents-and-automation",
    industry: "Government",
    region: "Pakistan",
    summary:
      "An 18-module Odoo ERP with a multilingual service layer, plus five agents that carry out repetitive tasks across HR, finance, executive, admin and operations.",
    need: "HR, finance, the executive office, admin and operations were carrying heavy volumes of repetitive manual work.",
    built: "An 18-module Odoo ERP with a multilingual service layer, plus five agents that carry out repetitive tasks inside those departments. The same deployment answers inbound customer service in Urdu.",
    gains: [
      "Most routine operations run without manual handling",
      "Staff time moves from data entry to decisions",
      "Customers are answered in Urdu without adding headcount",
    ],
    metrics: [
      {
        value: "5 agents",
        label: "at work across five departments",
        kind: "verified",
      },
      {
        value: "18 modules",
        label: "in one system of record",
        kind: "verified",
      },
      {
        value: "< 12 mo",
        label: "typical payback on process automation",
        kind: "benchmark",
        source: "Deloitte Global RPA Survey",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Bot",
    ...style("agents-and-automation"),
  },
  {
    number: 5,
    slug: "tfes-learning-management-system",
    title: "TFES learning management system",
    client: "Telecom Foundation Education System",
    clientSlug: "telecom-foundation",
    practice: "apps-and-platforms",
    industry: "Education",
    region: "Pakistan",
    summary:
      "A learning management system for TFES schools, bringing lessons, assignments, assessments and results into one platform.",
    need: "The Foundation's school network taught and assessed on paper and scattered tools, with no shared view of lessons, homework or results.",
    built: "A learning management system for the TFES schools, bringing lessons, assignments, assessments and results into one platform.",
    gains: [
      "Teachers set and mark work in one place",
      "Students and schools follow the same lesson plan nationwide",
      "Leadership sees results across all schools, not one at a time",
    ],
    metrics: [
      {
        value: "16 schools",
        label: "in the network the LMS is built for",
        kind: "verified",
      },
      {
        value: "1 platform",
        label: "for lessons, assignments and results",
        kind: "by-design",
      },
    ],
    depth: "standard",
    iconName: "GraduationCap",
    ...style("apps-and-platforms"),
  },
  {
    number: 6,
    slug: "tfes-personalised-learning-games",
    title: "TFES personalised learning games",
    client: "Telecom Foundation Education System",
    clientSlug: "telecom-foundation",
    practice: "apps-and-platforms",
    industry: "Education",
    region: "Pakistan",
    summary:
      "Learning games that adapt to each child, adjusting difficulty and content to how that learner is actually doing.",
    need: "Children in the same classroom learn at very different speeds, and one worksheet cannot fit them all.",
    built: "Learning games that adapt to each child, adjusting difficulty and content to how that learner is actually doing.",
    gains: [
      "Each child practises at the right level, not the class average",
      "Struggling learners are spotted early through play",
      "Practice that children choose to come back to",
    ],
    metrics: [
      {
        value: "2 sigma",
        label: "gain for one-to-one tutored students over a standard class — the case for personalised learning",
        kind: "benchmark",
        source: "Bloom, 1984",
      },
      {
        value: "16 schools",
        label: "in the network the games are built for",
        kind: "verified",
      },
    ],
    depth: "standard",
    iconName: "Gamepad2",
    ...style("apps-and-platforms"),
  },
  {
    number: 7,
    slug: "sirius-revenue-cycle-management",
    title: "Sirius Solutions: revenue cycle management",
    client: "Sirius Solutions Global",
    clientSlug: "sirius-solutions",
    practice: "erp-and-enterprise",
    industry: "Healthcare billing",
    region: "USA",
    summary:
      "A revenue cycle management system that carries each claim from eligibility check to payment follow-up in one pipeline for ~400 US clinics.",
    need: "Sirius Solutions Global bills for around 400 US clinics. Every delayed or denied claim is money its clients wait longer to collect.",
    built: "A revenue cycle management system that carries each claim from eligibility check to payment follow-up in one pipeline.",
    gains: [
      "Fewer claims stall between steps",
      "Denials surface early, while they can still be fixed",
      "Managers see the whole pipeline at a glance",
    ],
    metrics: [
      {
        value: "~400",
        label: "US clinics served by the client",
        kind: "verified",
      },
      {
        value: "95%+",
        label: "clean claim rate, the best-practice target",
        kind: "benchmark",
        source: "HFMA and MGMA",
      },
      {
        value: "< 40 days",
        label: "in accounts receivable, the best-practice target",
        kind: "benchmark",
        source: "MGMA",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Building2",
    ...style("erp-and-enterprise"),
  },
  {
    number: 8,
    slug: "sirius-insurance-verification-agent",
    title: "Sirius Solutions: insurance verification agent",
    client: "Sirius Solutions Global",
    clientSlug: "sirius-solutions",
    practice: "agents-and-automation",
    industry: "Healthcare billing",
    region: "USA",
    summary:
      "A voice agent that calls insurers, works through their phone systems, confirms coverage and writes the result straight back into the EHR.",
    need: "Verifying a patient's insurance means a long phone call to the payer, repeated dozens of times a day by skilled billing staff.",
    built: "A voice agent that calls insurers, works through their phone systems, confirms the coverage and writes the result straight back into the EHR.",
    gains: [
      "Billing staff get hours back every day",
      "Verifications finish before the patient visit, not after",
      "Every call leaves a clean, searchable record",
    ],
    metrics: [
      {
        value: "50 / day",
        label: "verifications, up from 20 by hand",
        kind: "verified",
      },
      {
        value: "2.5x",
        label: "the throughput of a human caller",
        kind: "verified",
      },
      {
        value: "8 hrs",
        label: "given back to one staff member, every day",
        kind: "verified",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "PhoneCall",
    ...style("agents-and-automation"),
  },
  {
    number: 9,
    slug: "advanza-inbound-lead-qualification",
    title: "Advanza Tech: inbound lead qualification agent",
    client: "Advanza Tech",
    clientSlug: "advanzatech",
    practice: "agents-and-automation",
    industry: "B2B technology",
    region: "Gulf",
    liveUrl: "https://advanzatech.com",
    summary:
      "A voice agent that answers inbound leads, asks the qualifying questions and routes qualified prospects to the sales team.",
    need: "Every inbound enquiry had to be answered and qualified fast, so sales time went only to real opportunities.",
    built: "A voice agent that answers inbound leads, asks the qualifying questions and routes qualified prospects to the sales team.",
    gains: [
      "No enquiry waits for a callback",
      "Sales speaks only to qualified prospects",
      "Same response speed at 3 pm and 3 am",
    ],
    metrics: [
      {
        value: "70",
        label: "meetings booked in month two by our outbound agent for Advanza Tech",
        kind: "verified",
      },
      {
        value: "21x",
        label: "more likely to qualify a lead answered within 5 minutes, not 30",
        kind: "benchmark",
        source: "Lead Response Management Study",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "PhoneCall",
    ...style("agents-and-automation"),
  },
  {
    number: 10,
    slug: "amro-aviation-mro-erp",
    title: "AMRO: custom ERP for aviation MRO",
    client: "AMRO",
    practice: "erp-and-enterprise",
    industry: "Aviation MRO",
    region: "Global",
    summary:
      "A custom ERP designed around AMRO's operations, including a secured database holding more than 1 TB of order data.",
    need: "Aviation maintenance, repair and overhaul runs on traceability. Every order must be findable years later, and off-the-shelf ERPs fit neither the workflow nor the sensitivity of the data.",
    built: "A custom ERP designed around AMRO's operations, including the setup of a secured database holding more than 1 TB of order data.",
    gains: [
      "Any order and its full history stays findable for years",
      "Sensitive records sit behind controlled access",
      "The software fits the MRO workflow, not the other way round",
    ],
    metrics: [
      {
        value: "1 TB+",
        label: "of sensitive order data set up and secured",
        kind: "verified",
      },
      {
        value: "1 system",
        label: "of record in place of scattered files and legacy tools",
        kind: "by-design",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Plane",
    ...style("erp-and-enterprise"),
  },
  {
    number: 11,
    slug: "al-shukr-dairy-farm-erp",
    title: "Al Shukr Dairy: farm ERP",
    client: "Al Shukr Dairy",
    practice: "erp-and-enterprise",
    industry: "Agriculture, dairy",
    region: "Pakistan",
    summary:
      "A custom ERP for the farm covering herd, milk yield, feed, sales and staff, with automation that flags what needs attention.",
    need: "A dairy farm has many moving parts: herd, milk yield, feed, sales and staff. Al Shukr Dairy needed them in one system built around how a farm actually runs.",
    built: "A custom ERP for the farm covering day-to-day operations, with automation that handles routine entries and flags what needs attention.",
    gains: [
      "One view of the whole farm, from herd to sales",
      "Less time on paperwork, more on the animals",
      "Problems flagged early, not found at month end",
    ],
    metrics: [
      {
        value: "1 system",
        label: "of record for the whole farm",
        kind: "by-design",
      },
      {
        value: "24/7",
        label: "visibility for the owner, on site or away",
        kind: "by-design",
      },
    ],
    depth: "standard",
    iconName: "Wheat",
    ...style("erp-and-enterprise"),
  },
  {
    number: 12,
    slug: "crumble-cookiejar-erp",
    title: "Crumble: CookieJar, a bespoke ERP with autonomous agents",
    client: "Crumble",
    practice: "erp-and-enterprise",
    industry: "Food and retail",
    region: "Pakistan",
    summary:
      "CookieJar, a bespoke ERP delivered as an MVP, with autonomous agents that carry out routine operational tasks and hand exceptions to a person.",
    need: "Crumble needed its day-to-day operations in one system, without building a back office to run it.",
    built: "CookieJar, a bespoke ERP delivered as an MVP, with autonomous agents that carry out routine operational tasks on their own and hand exceptions to a person.",
    gains: [
      "Routine operations run without someone chasing them",
      "The team handles exceptions, not data entry",
      "An MVP proves the model before the full build",
    ],
    metrics: [
      {
        value: "MVP",
        label: "bespoke ERP, built to test before the full rollout",
        kind: "by-design",
      },
      {
        value: "30%+",
        label: "of activities in 6 of 10 occupations can be automated",
        kind: "benchmark",
        source: "McKinsey Global Institute",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Cookie",
    ...style("erp-and-enterprise"),
  },
  {
    number: 13,
    slug: "easypaisa-hyperpersonalised-testing",
    title: "Easypaisa: hyperpersonalised controlled testing app",
    client: "Easypaisa",
    practice: "fintech-and-web3",
    industry: "Fintech",
    region: "Pakistan",
    summary:
      "An MVP app that serves tailored experiences to defined user segments and measures each group's response against a control.",
    need: "Easypaisa wanted to test personalised offers and experiences on controlled user groups before rolling them out to its full base.",
    built: "An MVP app that serves tailored experiences to defined user segments and measures each group's response against a control.",
    gains: [
      "Proves which offers work before rollout spend",
      "Controlled groups keep the risk small",
      "Gives product and leadership evidence, not opinion",
    ],
    metrics: [
      {
        value: "10–15%",
        label: "typical revenue lift from personalisation",
        kind: "benchmark",
        source: "McKinsey",
      },
      {
        value: "71%",
        label: "of consumers expect personalised interactions",
        kind: "benchmark",
        source: "McKinsey",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Smartphone",
    ...style("fintech-and-web3"),
  },
  {
    number: 14,
    slug: "jazzcash-asset-tokenization",
    title: "JazzCash: asset tokenization",
    client: "JazzCash",
    practice: "fintech-and-web3",
    industry: "Fintech",
    region: "Pakistan",
    summary:
      "An MVP that represents assets as digital tokens, with issuance, ownership records and transfer flows.",
    need: "JazzCash wanted to explore letting customers hold fractions of real-world assets through their wallet.",
    built: "An MVP that represents assets as digital tokens, with issuance, ownership records and transfer flows.",
    gains: [
      "A working model to put in front of compliance and leadership",
      "Fractional ownership tested at wallet scale",
      "The product decision is de-risked before heavy investment",
    ],
    metrics: [
      {
        value: "$16T",
        label: "in tokenized assets forecast by 2030",
        kind: "benchmark",
        source: "BCG and ADDX",
      },
      {
        value: "3 flows",
        label: "working end to end: issue, own, transfer",
        kind: "by-design",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Coins",
    ...style("fintech-and-web3"),
  },
  {
    number: 15,
    slug: "nbp-web3-multi-factor-authentication",
    title: "National Bank of Pakistan: Web3 multi-factor authentication",
    client: "National Bank of Pakistan",
    practice: "fintech-and-web3",
    industry: "Banking",
    region: "Pakistan",
    summary:
      "An MVP of a multi-factor authentication product that adds a Web3 credential as a login factor.",
    need: "NBP wanted stronger customer authentication than passwords and one-time codes alone.",
    built: "An MVP of a multi-factor authentication product that adds a Web3 credential as a login factor.",
    gains: [
      "A stolen password alone no longer opens an account",
      "Harder to phish or intercept than SMS codes",
      "A tested route to stronger security before bank-wide rollout",
    ],
    metrics: [
      {
        value: "99.9%",
        label: "of automated account attacks are blocked by multi-factor authentication",
        kind: "benchmark",
        source: "Microsoft",
      },
      {
        value: "MVP",
        label: "tested build for the bank's security and product teams",
        kind: "by-design",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Shield",
    ...style("fintech-and-web3"),
  },
  {
    number: 16,
    slug: "carbonblock-trading-platform",
    title: "CarbonBlock: carbon trading and tracking platform",
    client: "CarbonBlock",
    practice: "fintech-and-web3",
    industry: "Climate, Web3",
    region: "Global",
    summary:
      "A Web3 platform where carbon credits are recorded, tracked and traded on a tamper-evident ledger.",
    need: "Carbon credits are only worth what buyers can verify. Credits had to be tracked from issuance to retirement with no double counting.",
    built: "A Web3 platform where carbon credits are recorded, tracked and traded on a tamper-evident ledger.",
    gains: [
      "Every credit carries a traceable history",
      "Buyers and auditors can check what they pay for",
      "Double counting is ruled out by the ledger itself",
    ],
    metrics: [
      {
        value: "1:1",
        label: "each credit is issued once, owned once and retired once",
        kind: "by-design",
      },
      {
        value: "~$2B",
        label: "voluntary carbon market value in 2021",
        kind: "benchmark",
        source: "Ecosystem Marketplace",
      },
    ],
    depth: "standard",
    iconName: "Leaf",
    ...style("fintech-and-web3"),
  },
  {
    number: 17,
    slug: "kobipal-social-forum",
    title: "KobiPal: social forum built for weak networks",
    client: "KobiPal",
    clientSlug: "kobipal",
    practice: "apps-and-platforms",
    industry: "Consumer, community",
    region: "Africa",
    liveUrl: "https://kobipal.com",
    summary:
      "A social forum built in Flutter and tuned for speed and small data use, live on the App Store and Google Play.",
    need: "A community forum for people in parts of Africa where connectivity is weak and heavy apps do not load.",
    built: "A social forum built in Flutter and tuned hard for speed and small data use, live on the App Store and Google Play.",
    gains: [
      "Members keep reading and posting where heavier apps stall",
      "One codebase serves both stores, so each release ships once",
      "Light enough to keep users a slow app would lose",
    ],
    metrics: [
      {
        value: "53%",
        label: "of mobile users leave a page that takes over 3 seconds",
        kind: "benchmark",
        source: "Google",
      },
      {
        value: "2 stores",
        label: "App Store and Google Play from one Flutter codebase",
        kind: "verified",
      },
    ],
    depth: "flagship",
    featured: true,
    iconName: "Smartphone",
    ...style("apps-and-platforms"),
  },
  {
    number: 18,
    slug: "kobipal-landing-page",
    title: "KobiPal: landing page",
    client: "KobiPal",
    clientSlug: "kobipal",
    practice: "websites-and-seo",
    industry: "Consumer, community",
    region: "Africa",
    liveUrl: "https://kobipal.com",
    summary:
      "A designed and built landing page with one message and one action, tuned to load fast on weak networks.",
    need: "Before the app reached the stores, KobiPal needed one page that explains the community and turns visitors into sign-ups.",
    built: "A designed and built landing page at kobipal.com, with one message and one action, tuned to load fast on weak networks.",
    gains: [
      "A single clear path from visit to sign-up",
      "A home for the brand ahead of the app launch",
      "Loads quickly for the same audience the app serves",
    ],
    metrics: [
      {
        value: "6.6%",
        label: "median landing page conversion rate across industries",
        kind: "benchmark",
        source: "Unbounce",
      },
      {
        value: "11.4%+",
        label: "conversion rate of the top quarter of landing pages",
        kind: "benchmark",
        source: "Unbounce",
      },
    ],
    depth: "standard",
    iconName: "Globe",
    ...style("websites-and-seo"),
  },
  {
    number: 19,
    slug: "sports-ground-booking-system",
    title: "Sports ground booking system",
    client: "Multiple SME ground operators",
    practice: "apps-and-platforms",
    industry: "Sports and leisure",
    region: "Pakistan",
    summary:
      "An online booking system where players see live availability and reserve a slot, and owners manage every ground from one calendar.",
    need: "Ground owners took bookings by phone and message. That meant double bookings, empty slots and no record of revenue.",
    built: "An online booking system where players see live availability and reserve a slot, and owners manage every ground from one calendar.",
    gains: [
      "Empty slots fill without phone calls",
      "No double bookings or disputed slots",
      "Owners see takings by day and by ground",
    ],
    metrics: [
      {
        value: "24/7",
        label: "booking stays open when the office phone is not",
        kind: "by-design",
      },
      {
        value: "0",
        label: "double bookings: a confirmed slot locks instantly",
        kind: "by-design",
      },
    ],
    depth: "standard",
    iconName: "Calendar",
    ...style("apps-and-platforms"),
  },
  {
    number: 20,
    slug: "seo-websites-for-smes",
    title: "SEO websites for SMEs",
    client: "Multiple SMEs",
    practice: "websites-and-seo",
    industry: "Various",
    region: "Pakistan",
    summary:
      "A program of fast, search-optimised websites, each structured around the terms that business's customers actually search for.",
    need: "Small businesses with no search presence were invisible to customers already looking for their service.",
    built: "Fast, search-optimised websites, each structured around the terms that business's customers actually search for.",
    gains: [
      "The business shows up when a local customer searches",
      "Visits turn into calls and enquiries",
      "Traffic that does not stop when the ad budget does",
    ],
    metrics: [
      {
        value: "27.6%",
        label: "of clicks go to the first organic result",
        kind: "benchmark",
        source: "Backlinko",
      },
      {
        value: "54%",
        label: "of clicks go to the top three results",
        kind: "benchmark",
        source: "Backlinko",
      },
    ],
    depth: "program",
    iconName: "Search",
    ...style("websites-and-seo"),
  },
  {
    number: 21,
    slug: "address-of-technology-website-seo",
    title: "Address of Technology: website and SEO",
    client: "Address of Technology",
    practice: "websites-and-seo",
    industry: "Technology",
    region: "Gulf",
    summary:
      "A company website with on-page SEO built in from the first page, for Finova's KSA channel partner in Jeddah.",
    need: "Our channel partner in Jeddah needed a site that presents its services to Saudi buyers and gets found in search.",
    built: "A company website with on-page SEO built in from the first page, not bolted on later.",
    gains: [
      "A credible storefront for the Saudi market",
      "Search brings buyers in, beyond referrals alone",
      "A base the partner can grow content on",
    ],
    metrics: [
      {
        value: "53%",
        label: "of trackable website traffic comes from organic search",
        kind: "benchmark",
        source: "BrightEdge",
      },
      {
        value: "KSA",
        label: "in-Kingdom channel partner, based in Jeddah",
        kind: "verified",
      },
    ],
    depth: "standard",
    iconName: "Landmark",
    ...style("websites-and-seo"),
  },
]

export const METRIC_LEGEND = [
  {
    kind: "verified" as const,
    label: "Verified",
    description: "Measured on the named deployment.",
  },
  {
    kind: "benchmark" as const,
    label: "Industry benchmark",
    description: "Published third-party reference; our delivery tracked in line with them.",
  },
  {
    kind: "by-design" as const,
    label: "By design",
    description: "A property built into the product.",
  },
]

export function getPracticeLabel(id: PracticeArea): string {
  return PRACTICE_AREAS.find((p) => p.id === id)?.label ?? id
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectsByClientSlug(clientSlug: string): Project[] {
  return projects.filter((p) => p.clientSlug === clientSlug)
}

export function getProjectsByPractice(practice: PracticeArea): Project[] {
  return projects.filter((p) => p.practice === practice)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const sameClient = projects.filter(
    (p) => p.slug !== project.slug && p.clientSlug && p.clientSlug === project.clientSlug,
  )
  const samePractice = projects.filter(
    (p) =>
      p.slug !== project.slug &&
      p.practice === project.practice &&
      !sameClient.some((c) => c.slug === p.slug),
  )
  return [...sameClient, ...samePractice].slice(0, limit)
}
