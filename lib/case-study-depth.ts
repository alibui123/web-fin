export type CaseStudyDepth = {
  overview: string
  pullQuote: string
  stageKind?: "site" | "product"
  audiencesLabel?: string
  audiencesLead?: string
  audiences: { label: string; detail: string }[]
  surfacesLabel?: string
  surfacesLead?: string
  surfaces: { title: string; detail: string }[]
  approachLead?: string
  approach: { title: string; detail: string }[]
  closing: string
}

/**
 * Extended narrative for every portfolio case study.
 * Facts stay aligned with the published Portfolio PDF; prose expands the same scope.
 */
export const CASE_STUDY_DEPTH: Record<string, CaseStudyDepth> = {
  "telecom-foundation-corporate-website": {
    overview:
      "Telecom Foundation needed a public presence that matched the weight of a government organisation: clear enough for a citizen on a phone, formal enough for a ministry desk, and structured enough that tenders and notices are not buried in attachments.",
    pullQuote:
      "One authoritative source for public information — built phone-first, where most visitors already are.",
    stageKind: "site",
    audiencesLabel: "Who the site has to serve",
    audiencesLead:
      "Three audiences, one public face. The architecture had to hold all three without feeling like three different websites.",
    audiences: [
      {
        label: "Citizens",
        detail:
          "Find the Foundation’s mandate, services and contact routes without guessing which office to call.",
      },
      {
        label: "Partners",
        detail:
          "See leadership, programmes and how to engage without chasing outdated PDFs or dead links.",
      },
      {
        label: "Ministries",
        detail:
          "A trusted public face that holds up when someone checks what the Foundation actually does.",
      },
    ],
    surfacesLabel: "Five surfaces, one site",
    surfacesLead:
      "The build covered the Foundation's mandate, services, leadership, tenders and contact routes — each as a first-class public surface.",
    surfaces: [
      {
        title: "Mandate",
        detail:
          "Who the Foundation is, what it is charged with, and how that reads in plain language — not a wall of statutory text.",
      },
      {
        title: "Services",
        detail:
          "The work the public and partners care about, grouped so a visitor can land on the right path in a few taps.",
      },
      {
        title: "Leadership",
        detail:
          "People and roles presented as part of the organisation’s authority, not a disconnected photo gallery.",
      },
      {
        title: "Tenders & notices",
        detail:
          "Procurement and public notices in one findable place, so opportunity does not depend on who forwarded the email.",
      },
      {
        title: "Contact routes",
        detail:
          "Clear paths to the right team — for a citizen, a partner or an official — without a generic inbox dead-end.",
      },
    ],
    approachLead:
      "Four moves from public journeys to a site that holds up on a phone and at a ministry desk.",
    approach: [
      {
        title: "Map the public journeys",
        detail:
          "We started from who arrives and why: information, trust, tenders, contact — then shaped the information architecture around those routes.",
      },
      {
        title: "Design phone-first",
        detail:
          "With most web traffic on mobile, every primary path had to work on a small screen before we dressed the desktop view.",
      },
      {
        title: "Publish as a system",
        detail:
          "Tenders, leadership and services were treated as living surfaces, not one-off pages that go stale the week after launch.",
      },
      {
        title: "Ship for speed",
        detail:
          "A government site that loads slowly on a mobile connection fails the people it is meant to serve. Sub-three-second load was a design constraint, not a nice-to-have.",
      },
    ],
    closing:
      "The result is a single, authoritative corporate site: mandate, services, leadership, tenders and contact — readable on a phone, credible at a ministry desk, and easy enough that public information does not scatter across inboxes again.",
  },

  "telecom-foundation-social-welfare-website": {
    overview:
      "The Foundation’s welfare work — including its school network — needed a dedicated public home. Donors and beneficiaries could not be asked to dig through a corporate site to find programmes that change lives.",
    pullQuote:
      "Sixteen schools, one public home for the welfare programme — open to donors and beneficiaries around the clock.",
    stageKind: "site",
    audiencesLabel: "Who this home is for",
    audiencesLead:
      "Donors, beneficiaries and the school community needed different doors into the same welfare story.",
    audiences: [
      {
        label: "Donors",
        detail: "See programmes clearly and understand how support reaches the network.",
      },
      {
        label: "Beneficiaries",
        detail: "Find the right programme without calling around offices and schools.",
      },
      {
        label: "School network",
        detail: "Present sixteen schools as one coherent TFES story, not sixteen disconnected pages.",
      },
    ],
    surfacesLabel: "What the welfare site holds",
    surfaces: [
      {
        title: "Programmes",
        detail: "Welfare work presented so a visitor can recognise the right programme quickly.",
      },
      {
        title: "School network",
        detail: "Sixteen schools nationwide, readable as one system rather than a list of addresses.",
      },
      {
        title: "Ways to support",
        detail: "Clear paths for donors and partners who want to engage, not a buried contact form.",
      },
      {
        title: "Always-on information",
        detail: "Programme detail stays open when the office phone is not — by design, around the clock.",
      },
    ],
    approachLead: "Separate the welfare story from corporate messaging, then make it findable.",
    approach: [
      {
        title: "Give welfare its own home",
        detail:
          "A dedicated site, not a submenu — so donors and beneficiaries land in the right world immediately.",
      },
      {
        title: "Tell one school-network story",
        detail:
          "Sixteen schools become one narrative: shared purpose, clear geography, easy next steps.",
      },
      {
        title: "Make support obvious",
        detail:
          "Engagement paths sit at the surface. Visibility for programmes is useless if the path to help is hidden.",
      },
      {
        title: "Keep it open",
        detail:
          "Programme information stays available 24/7 so the site works as a public resource, not an office hours brochure.",
      },
    ],
    closing:
      "Welfare programmes become visible to donors, beneficiaries find the right door online, and the school network finally reads as one story.",
  },

  "telecom-foundation-odoo-mobile": {
    overview:
      "Staff and managers are spread across offices and schools. The Foundation’s Odoo ERP only helped if people could clear requests and approvals from a phone — not only from a desk.",
    pullQuote:
      "Requests and approvals move without waiting for a desk — one set of records, whether entered on web or phone.",
    stageKind: "product",
    audiencesLabel: "Who carries the phone",
    audiences: [
      {
        label: "Employees",
        detail: "Submit day-to-day requests from wherever the work actually happens.",
      },
      {
        label: "Approvers",
        detail: "Clear queues between meetings and site visits, without opening a laptop first.",
      },
      {
        label: "Operations",
        detail: "One system of record stays true whether the entry came from web or mobile.",
      },
    ],
    surfacesLabel: "What sits behind the app",
    surfacesLead: "Around 600 employees across offices and schools, with eighteen ERP modules behind the mobile experience.",
    surfaces: [
      {
        title: "Mobile workflows",
        detail: "The requests and approvals people actually do every day, shaped for a phone screen.",
      },
      {
        title: "Approver queues",
        detail: "Managers see what is waiting and act without reconstructing context from email.",
      },
      {
        title: "Shared records",
        detail: "Web and phone write to the same Odoo record — no shadow spreadsheets.",
      },
      {
        title: "Eighteen modules",
        detail: "The app sits on the Foundation’s full ERP footprint, not a slimmed-down side system.",
      },
    ],
    approachLead: "Put the existing ERP in people’s pockets without fracturing the system of record.",
    approach: [
      {
        title: "Start from real journeys",
        detail: "Leave, purchase, expense and similar flows — what staff already try to finish away from a desk.",
      },
      {
        title: "Design for interrupted use",
        detail: "Approvals happen between meetings. The UI had to be scannable in seconds, not a desktop port.",
      },
      {
        title: "Keep one record",
        detail: "Mobile is a client of Odoo, not a second database. Integrity beats convenience features.",
      },
      {
        title: "Roll out where people are",
        detail: "Offices and schools, ~600 employees — the app only works if it works on the networks they have.",
      },
    ],
    closing:
      "Requests and approvals move without waiting for a desk, managers clear queues from anywhere, and the Foundation keeps one set of records whether work started on web or phone.",
  },

  "telecom-foundation-odoo-agents": {
    overview:
      "HR, finance, the executive office, admin and operations were drowning in repetitive manual work. The Foundation needed agents inside an eighteen-module Odoo ERP — and inbound customer service answered in Urdu.",
    pullQuote:
      "Five agents across five departments. Most routine operations run without manual handling — with a person still in control.",
    stageKind: "product",
    audiencesLabel: "Departments that needed relief",
    audiences: [
      {
        label: "HR, finance & admin",
        detail: "High-volume task assignment and routine entries that used to sit with seniors.",
      },
      {
        label: "Executive & operations",
        detail: "Honest, real-time insight into performance without chasing status by hand.",
      },
      {
        label: "Customers",
        detail: "Inbound service answered in Urdu, without adding headcount to the phones.",
      },
    ],
    surfacesLabel: "What the deployment carries",
    surfaces: [
      {
        title: "Eighteen Odoo modules",
        detail: "One system of record for the departments the agents support.",
      },
      {
        title: "Five agents",
        detail: "Repetitive tasks carried inside HR, finance, executive, admin and operations.",
      },
      {
        title: "Multilingual service layer",
        detail: "The same deployment answers inbound customer service in Urdu.",
      },
      {
        title: "Human control",
        detail: "Agents take the tedious work off seniors; managers keep oversight of what matters.",
      },
    ],
    approachLead: "Automate the repetitive path first; leave judgment with people.",
    approach: [
      {
        title: "Map the manual load",
        detail: "Where volume lived — and which steps never needed a senior’s full attention.",
      },
      {
        title: "Anchor agents in Odoo",
        detail: "Agents act inside the ERP so records stay authoritative, not in a parallel tool.",
      },
      {
        title: "Add the service layer",
        detail: "Inbound Urdu support on the same deployment, so customers are answered without a separate stack.",
      },
      {
        title: "Keep a person in control",
        detail: "Insight and exceptions stay visible to managers — automation without a black box.",
      },
    ],
    closing:
      "Most routine operations run without manual handling, staff time moves from data entry to decisions, and customers are answered in Urdu without adding headcount.",
  },

  "tfes-learning-management-system": {
    overview:
      "The Foundation’s school network taught and assessed on paper and scattered tools. There was no shared view of lessons, homework or results across sixteen schools.",
    pullQuote:
      "One platform for lessons, assignments and results — teachers, students and leadership on the same plan nationwide.",
    stageKind: "product",
    audiencesLabel: "Who the LMS has to hold",
    audiences: [
      {
        label: "Teachers",
        detail: "Set and mark work in one place instead of juggling paper and side tools.",
      },
      {
        label: "Students",
        detail: "Follow the same lesson plan as peers across the network.",
      },
      {
        label: "Leadership",
        detail: "See results across all schools, not one spreadsheet at a time.",
      },
    ],
    surfacesLabel: "What the platform unifies",
    surfaces: [
      { title: "Lessons", detail: "Shared plans so the network teaches as one system." },
      { title: "Assignments", detail: "Work set and collected without the paper chase." },
      { title: "Assessments", detail: "Tests and marking that feed a common record." },
      { title: "Results", detail: "Visibility for schools and leadership in one place." },
    ],
    approachLead: "Replace scattered tools with one rhythm the whole network can follow.",
    approach: [
      {
        title: "Audit the scatter",
        detail: "Paper, local tools, inconsistent views of homework and results — mapped before anything was built.",
      },
      {
        title: "Design for sixteen schools",
        detail: "The LMS had to work as one platform for the whole TFES network, not a pilot classroom.",
      },
      {
        title: "Put teachers at the centre",
        detail: "If setting and marking work is clumsy, the platform fails on day one.",
      },
      {
        title: "Give leadership a network view",
        detail: "Results across schools, not a parade of isolated reports.",
      },
    ],
    closing:
      "Teachers set and mark work in one place, students follow the same plan nationwide, and leadership finally sees results across all sixteen schools together.",
  },

  "tfes-personalised-learning-games": {
    overview:
      "Children in the same classroom learn at very different speeds. One worksheet cannot fit them all — so TFES needed practice that adapts to how each learner is actually doing.",
    pullQuote:
      "Each child practises at the right level, not the class average — difficulty that adapts through play.",
    stageKind: "product",
    audiencesLabel: "Who personalisation serves",
    audiences: [
      {
        label: "Learners",
        detail: "Practice at the right level, with games they choose to come back to.",
      },
      {
        label: "Teachers",
        detail: "Spot struggling learners early through play data, not only end-of-term tests.",
      },
      {
        label: "Schools",
        detail: "Personalised practice that fits the same sixteen-school network as the LMS.",
      },
    ],
    surfacesLabel: "What the games do",
    surfaces: [
      {
        title: "Adaptive difficulty",
        detail: "Content and challenge adjust to how that learner is performing.",
      },
      {
        title: "Three paths",
        detail: "Different learners, different routes — not one average worksheet for the room.",
      },
      {
        title: "Early signals",
        detail: "Struggle shows up in play, while there is still time to help.",
      },
      {
        title: "Network scale",
        detail: "Built for the TFES schools, not a one-off classroom experiment.",
      },
    ],
    approachLead: "Ground personalisation in how children actually practise — then scale it.",
    approach: [
      {
        title: "Respect different speeds",
        detail: "The design started from Bloom’s case for one-to-one tutoring: level matters more than lockstep.",
      },
      {
        title: "Make practice desirable",
        detail: "Games children return to beat drills they avoid — engagement is part of the pedagogy.",
      },
      {
        title: "Feed insight back",
        detail: "Play generates the early signal teachers need without another paper test.",
      },
      {
        title: "Align to the network",
        detail: "Same sixteen schools as the LMS — personalisation sits inside the wider TFES stack.",
      },
    ],
    closing:
      "Each child practises at the right level, struggling learners are spotted early through play, and practice becomes something children choose to continue.",
  },

  "sirius-revenue-cycle-management": {
    overview:
      "Sirius Solutions Global bills for around 400 US clinics. Every delayed or denied claim is money clients wait longer to collect — so the pipeline from eligibility to payment had to be one system, not a handoff chain.",
    pullQuote:
      "One pipeline, every claim accounted for — from first check to final payment.",
    stageKind: "product",
    audiencesLabel: "Who feels a stalled claim",
    audiences: [
      {
        label: "Billing teams",
        detail: "Fewer claims stalling between eligibility, coding, submit and follow-up.",
      },
      {
        label: "Clinic clients",
        detail: "Faster collection when denials surface early enough to fix.",
      },
      {
        label: "Managers",
        detail: "The whole pipeline visible at a glance — not status buried in inboxes.",
      },
    ],
    surfacesLabel: "The claim pipeline",
    surfacesLead: "Eligibility → coding → submit → follow-up → paid — one continuous path.",
    surfaces: [
      { title: "Eligibility", detail: "Coverage checked before work piles into avoidable denials." },
      { title: "Coding & submit", detail: "Claims move forward without disappearing between teams." },
      { title: "Follow-up", detail: "Denials and delays surface while they can still be fixed." },
      { title: "Pipeline view", detail: "Managers see ~400 clinics’ revenue cycle as one operation." },
    ],
    approachLead: "Treat revenue cycle as one product, not five disconnected tools.",
    approach: [
      {
        title: "Follow the claim",
        detail: "Every stall between steps was mapped before the pipeline UI was designed.",
      },
      {
        title: "Make denials early news",
        detail: "Late discovery is expensive. The system surfaces issues while remediation is still possible.",
      },
      {
        title: "Aim at best-practice targets",
        detail: "Clean claim rate and days in AR framed against HFMA/MGMA benchmarks — not vanity dashboards.",
      },
      {
        title: "Scale to clinic volume",
        detail: "Built for Sirius’s footprint across hundreds of US clinics, not a pilot desk.",
      },
    ],
    closing:
      "Fewer claims stall between steps, denials surface early, and managers see the whole pipeline — for a client serving around 400 US clinics.",
  },

  "sirius-insurance-verification-agent": {
    overview:
      "Verifying a patient’s insurance means a long phone call to the payer, repeated dozens of times a day by skilled billing staff. Sirius needed those hours back — with results written straight into the EHR.",
    pullQuote:
      "From 20 verifications a day by hand to 50 with the agent — and 100% of results written back to the EHR.",
    stageKind: "product",
    audiencesLabel: "Who the agent frees",
    audiences: [
      {
        label: "Billing staff",
        detail: "Hours returned every day that used to disappear into hold queues.",
      },
      {
        label: "Clinics",
        detail: "Verifications finished before the patient visit, not after.",
      },
      {
        label: "Compliance & ops",
        detail: "Every call leaves a clean, searchable record in the EHR.",
      },
    ],
    surfacesLabel: "What the agent does",
    surfaces: [
      {
        title: "Voice calls to payers",
        detail: "Works through insurer phone systems the way a human caller would.",
      },
      {
        title: "Coverage confirmation",
        detail: "Confirms what the visit needs to know before the patient arrives.",
      },
      {
        title: "EHR write-back",
        detail: "Results land in the record automatically — no retyping.",
      },
      {
        title: "Higher throughput",
        detail: "2.5× a human caller’s pace on the measured Sirius deployment.",
      },
    ],
    approachLead: "Take the hold queue off skilled staff without losing the audit trail.",
    approach: [
      {
        title: "Instrument the human path",
        detail: "Understand payer IVRs and the exact data that must return to the EHR.",
      },
      {
        title: "Build the voice agent",
        detail: "AwaazLabs runs verification end to end — calls, confirms, writes back.",
      },
      {
        title: "Measure real throughput",
        detail: "50 verifications a day versus 20 by hand; about eight hours returned to one staff member daily.",
      },
      {
        title: "Keep records clean",
        detail: "Searchable outcomes beat sticky notes and half-finished call logs.",
      },
    ],
    closing:
      "Billing staff get hours back, verifications finish before the visit, and every call leaves a clean record — measured in production at Sirius.",
  },

  "advanza-inbound-lead-qualification": {
    overview:
      "Every inbound enquiry had to be answered and qualified fast, so AdvanzaTech’s sales time went only to real opportunities — at 3 pm and at 3 am.",
    pullQuote:
      "No enquiry waits for a callback. Sales speaks only to qualified prospects — same speed around the clock.",
    stageKind: "product",
    audiencesLabel: "Who the agent sits between",
    audiences: [
      {
        label: "Inbound leads",
        detail: "Answered immediately with the qualifying questions that matter.",
      },
      {
        label: "Sales team",
        detail: "Only speak to prospects that cleared the bar — not every tyre-kicker.",
      },
      {
        label: "Leadership",
        detail: "Response speed that does not depend on who is at the desk.",
      },
    ],
    surfacesLabel: "The qualification path",
    surfaces: [
      { title: "Answer", detail: "Every inbound enquiry picked up without waiting for a callback." },
      { title: "Qualify", detail: "The questions sales would ask — asked consistently by the agent." },
      { title: "Route", detail: "Qualified prospects handed to the team with context intact." },
      {
        title: "Always on",
        detail: "Same response discipline overnight as in business hours.",
      },
    ],
    approachLead: "Speed to first answer is the product — then qualification earns the meeting.",
    approach: [
      {
        title: "Define the qualify bar",
        detail: "What makes a real AdvanzaTech opportunity — encoded as the agent’s script.",
      },
      {
        title: "Own the first response",
        detail:
          "Industry evidence favours answering within minutes; the agent removes the callback gap.",
      },
      {
        title: "Hand off cleanly",
        detail: "Sales gets routed, qualified prospects — not a dump of raw enquiries.",
      },
      {
        title: "Prove with meetings",
        detail: "Outbound work for AdvanzaTech booked 70 meetings in month two — measured in production.",
      },
    ],
    closing:
      "No enquiry waits, sales only speaks to qualified prospects, and response speed holds whether it is afternoon or overnight.",
  },

  "amro-aviation-mro-erp": {
    overview:
      "Aviation maintenance, repair and overhaul runs on traceability. Every order must be findable years later — and off-the-shelf ERPs fit neither AMRO’s workflow nor the sensitivity of more than a terabyte of order data.",
    pullQuote:
      "Any order and its full history stays findable for years — one system of record behind controlled access.",
    stageKind: "product",
    audiencesLabel: "Who depends on the record",
    audiences: [
      {
        label: "MRO operations",
        detail: "Software that fits how maintenance work actually moves — not a generic manufacturing template.",
      },
      {
        label: "Compliance & audit",
        detail: "Order history that remains findable years later under controlled access.",
      },
      {
        label: "Leadership",
        detail: "One system instead of scattered files and legacy tools.",
      },
    ],
    surfacesLabel: "What the custom ERP holds",
    surfaces: [
      {
        title: "Order traceability",
        detail: "Full history kept findable for the long horizon aviation requires.",
      },
      {
        title: "Secured database",
        detail: "More than 1 TB of sensitive order data set up and protected.",
      },
      {
        title: "Role-based access",
        detail: "Sensitive records sit behind controlled access, not open shares.",
      },
      {
        title: "MRO-fit workflows",
        detail: "Built around AMRO’s operations — the software yields to the work.",
      },
    ],
    approachLead: "Custom where package software cannot carry aviation-grade traceability.",
    approach: [
      {
        title: "Respect the domain",
        detail: "MRO workflows and data sensitivity were constraints, not afterthoughts.",
      },
      {
        title: "Design for years-later retrieval",
        detail: "Findability over time mattered as much as day-one data entry.",
      },
      {
        title: "Secure the store",
        detail: "1 TB+ order data with role-based access from the start.",
      },
      {
        title: "Replace the scatter",
        detail: "One system of record instead of files and legacy tools that cannot audit cleanly.",
      },
    ],
    closing:
      "Any order stays findable for years, sensitive records sit behind controlled access, and the software fits the MRO workflow — not the other way round.",
  },

  "al-shukr-dairy-farm-erp": {
    overview:
      "A dairy farm has many moving parts: herd, milk yield, feed, sales and staff. Al Shukr Dairy needed them in one system built around how a farm actually runs — with automation for routine entries.",
    pullQuote:
      "One view of the whole farm, from herd to sales — problems flagged early, not found at month end.",
    stageKind: "product",
    audiencesLabel: "Who runs the farm day to day",
    audiences: [
      {
        label: "Owner",
        detail: "24/7 visibility on site or away — the farm’s state without waiting for a report.",
      },
      {
        label: "Farm staff",
        detail: "Less time on paperwork, more time with the animals.",
      },
      {
        label: "Operations",
        detail: "Herd, yield, feed, sales and staff in one system of record.",
      },
    ],
    surfacesLabel: "The farm in one ERP",
    surfaces: [
      { title: "Herd", detail: "Animals and status as living operational data." },
      { title: "Milk yield", detail: "Production visible as it happens, not only at closing." },
      { title: "Feed & staff", detail: "Inputs and people tied to how the farm actually runs." },
      { title: "Sales", detail: "Commercial activity in the same record as production." },
    ],
    approachLead: "Build around farm reality first — then automate the routine.",
    approach: [
      {
        title: "Model the farm",
        detail: "Herd, yield, feed, sales, staff — one coherent object model, not five apps.",
      },
      {
        title: "Automate routine entries",
        detail: "Agents and rules handle the repetitive; people handle what needs judgment.",
      },
      {
        title: "Flag early",
        detail: "Exceptions surface before month-end surprises.",
      },
      {
        title: "Stay available",
        detail: "Owner visibility designed for on-site and remote use around the clock.",
      },
    ],
    closing:
      "One view of the whole farm, less paperwork, and problems flagged early — a system of record built for how a dairy actually operates.",
  },

  "crumble-cookiejar-erp": {
    overview:
      "Crumble needed day-to-day operations in one system without building a back office to run it. CookieJar is a bespoke ERP MVP with autonomous agents that carry routine tasks and hand exceptions to a person.",
    pullQuote:
      "Agents do the routine work. People handle the exceptions — an MVP that proves the model before the full build.",
    stageKind: "product",
    audiencesLabel: "Who CookieJar is for",
    audiences: [
      {
        label: "Operators",
        detail: "Routine tasks move without someone chasing every status update.",
      },
      {
        label: "Owners",
        detail: "An MVP that proves the model before committing to a full rollout.",
      },
      {
        label: "The team",
        detail: "Time spent on exceptions and decisions — not data entry.",
      },
    ],
    surfacesLabel: "How the MVP works",
    surfaces: [
      { title: "Bespoke ERP", detail: "Operations shaped around Crumble’s real day-to-day, not a generic retail pack." },
      { title: "Autonomous agents", detail: "Routine operational tasks carried without constant supervision." },
      { title: "Exception handoff", detail: "People step in when judgment is required." },
      { title: "MVP path", detail: "Test before the full build — risk contained by design." },
    ],
    approachLead: "Prove autonomous operations on a thin MVP, then expand.",
    approach: [
      {
        title: "Scope the MVP",
        detail: "Enough of the operation to prove the model — not a multi-year ERP theatre.",
      },
      {
        title: "Let agents take the routine",
        detail: "Task in → agent acts → recorded — with exceptions routed to humans.",
      },
      {
        title: "Keep people on judgment",
        detail: "Automation where McKinsey-scale opportunity exists; humans where stakes rise.",
      },
      {
        title: "Learn before scale",
        detail: "CookieJar exists to de-risk the full build with evidence.",
      },
    ],
    closing:
      "Routine operations run without chasing, the team handles exceptions instead of data entry, and the MVP proves the model before full rollout.",
  },

  "easypaisa-hyperpersonalised-testing": {
    overview:
      "Easypaisa wanted to test personalised offers and experiences on controlled user groups before rolling them out to its full base — evidence over opinion.",
    pullQuote:
      "Same offer, two groups, one clear winner — before launch spend.",
    stageKind: "product",
    audiencesLabel: "Who the MVP informs",
    audiences: [
      {
        label: "Product",
        detail: "See which personalised experiences actually move users versus a control.",
      },
      {
        label: "Leadership",
        detail: "Rollout decisions backed by measured response, not slides.",
      },
      {
        label: "Customers in test",
        detail: "Tailored experiences in defined segments — risk kept inside controlled groups.",
      },
    ],
    surfacesLabel: "What the testing app does",
    surfaces: [
      {
        title: "Segmented experiences",
        detail: "Defined user groups receive tailored offers and flows.",
      },
      {
        title: "Control comparison",
        detail: "Each group’s response measured against a control.",
      },
      {
        title: "Evidence pack",
        detail: "Product and leadership get results they can act on.",
      },
      {
        title: "Contained risk",
        detail: "Prove lifts before full-base spend — aligned with personalisation benchmarks.",
      },
    ],
    approachLead: "Treat personalisation as an experiment system, not a one-shot campaign.",
    approach: [
      {
        title: "Define segments and control",
        detail: "Clear groups so results mean something when the test ends.",
      },
      {
        title: "Serve tailored experiences",
        detail: "The MVP app delivers the variants under test — not mockups.",
      },
      {
        title: "Measure response",
        detail: "Compare personalised cohorts to control before rollout.",
      },
      {
        title: "Inform the spend",
        detail: "Only scale what the evidence supports.",
      },
    ],
    closing:
      "Easypaisa can prove which offers work before rollout spend, keep risk inside controlled groups, and give leadership evidence instead of opinion.",
  },

  "jazzcash-asset-tokenization": {
    overview:
      "JazzCash wanted to explore letting customers hold fractions of real-world assets through their wallet — with issuance, ownership and transfer working end to end before heavy investment.",
    pullQuote:
      "One real asset. Many small shares — each with a recorded owner. Three flows working: issue, own, transfer.",
    stageKind: "product",
    audiencesLabel: "Who the MVP has to convince",
    audiences: [
      {
        label: "Compliance & leadership",
        detail: "A working model to interrogate before any wallet-scale commitment.",
      },
      {
        label: "Product",
        detail: "Fractional ownership tested as real flows, not a deck.",
      },
      {
        label: "Future customers",
        detail: "The path they would use — issue, own, transfer — proven in the MVP.",
      },
    ],
    surfacesLabel: "What the tokenization MVP covers",
    surfaces: [
      { title: "Issuance", detail: "Assets represented as digital tokens with a clear create path." },
      { title: "Ownership records", detail: "Who holds which fraction — recorded, not implied." },
      { title: "Transfer flows", detail: "Movement of ownership working end to end." },
      { title: "Wallet-scale thinking", detail: "Designed to be discussed at JazzCash product and risk tables." },
    ],
    approachLead: "De-risk a category bet with a working three-flow MVP.",
    approach: [
      {
        title: "Frame the asset",
        detail: "What can be fractionalised and what must remain true about ownership.",
      },
      {
        title: "Build issue → own → transfer",
        detail: "Three flows complete enough to put in front of compliance and leadership.",
      },
      {
        title: "Keep the ledger honest",
        detail: "Recorded owners for every small share — no informal side books.",
      },
      {
        title: "Stop before overbuild",
        detail: "MVP scope ends where evidence is enough to decide the next investment.",
      },
    ],
    closing:
      "JazzCash gets a working model for fractional ownership, three flows proven end to end, and a product decision de-risked before heavy investment.",
  },

  "nbp-web3-multi-factor-authentication": {
    overview:
      "National Bank of Pakistan wanted stronger customer authentication than passwords and one-time codes alone — with a Web3 credential as an additional login factor, tested before bank-wide rollout.",
    pullQuote:
      "Password + device + wallet key. A stolen password alone no longer opens the account.",
    stageKind: "product",
    audiencesLabel: "Who stronger MFA protects",
    audiences: [
      {
        label: "Customers",
        detail: "Accounts that do not open on a stolen password alone.",
      },
      {
        label: "Security teams",
        detail: "A factor harder to phish or intercept than SMS codes alone.",
      },
      {
        label: "Product",
        detail: "An MVP path to stronger security before a bank-wide programme.",
      },
    ],
    surfacesLabel: "The authentication factors",
    surfaces: [
      { title: "Something you know", detail: "Password — still present, no longer sufficient alone." },
      { title: "Something you have", detail: "Device as a second factor in the login path." },
      { title: "Something only you hold", detail: "Wallet key as the Web3 credential factor." },
      { title: "MVP for the bank", detail: "Tested build for NBP security and product teams." },
    ],
    approachLead: "Add a Web3 factor without pretending passwords disappear overnight.",
    approach: [
      {
        title: "Layer, don’t replace",
        detail: "MFA that strengthens the existing mental model — know / have / hold.",
      },
      {
        title: "Raise the phishing bar",
        detail: "Design against interception patterns SMS OTPs are known for.",
      },
      {
        title: "Prove with an MVP",
        detail: "Security and product can evaluate a working path before bank-wide rollout.",
      },
      {
        title: "Stay aligned to evidence",
        detail: "Framed against industry MFA effectiveness — not novelty for its own sake.",
      },
    ],
    closing:
      "A stolen password alone no longer opens an account, phishing gets harder than SMS codes, and NBP has a tested route to stronger security before bank-wide rollout.",
  },

  "carbonblock-trading-platform": {
    overview:
      "Carbon credits are only worth what buyers can verify. Credits had to be tracked from issuance to retirement with no double counting — on a tamper-evident ledger.",
    pullQuote:
      "One credit, one history. Issued once, owned once, retired once — double counting ruled out by the ledger itself.",
    stageKind: "product",
    audiencesLabel: "Who needs the trail",
    audiences: [
      {
        label: "Buyers",
        detail: "Check what they pay for — traceable history on every credit.",
      },
      {
        label: "Auditors",
        detail: "Verify issuance through retirement without trusting a private spreadsheet.",
      },
      {
        label: "Market operators",
        detail: "Trade on a ledger that makes double counting structurally hard.",
      },
    ],
    surfacesLabel: "Credit lifecycle on-chain",
    surfacesLead: "Issue → track → trade → retire — one credit, one history.",
    surfaces: [
      { title: "Issue", detail: "Each credit created once with a clear identity." },
      { title: "Track", detail: "Ownership and state visible across its life." },
      { title: "Trade", detail: "Transfer on a tamper-evident Web3 ledger." },
      { title: "Retire", detail: "Final retirement that closes the history — 1:1 by design." },
    ],
    approachLead: "Make integrity a property of the ledger, not a policy PDF.",
    approach: [
      {
        title: "Define the lifecycle",
        detail: "Issuance to retirement with no ambiguous middle states.",
      },
      {
        title: "Record on Web3",
        detail: "Tamper-evident history buyers and auditors can actually check.",
      },
      {
        title: "Forbid double counting",
        detail: "Structural 1:1 — issued once, owned once, retired once.",
      },
      {
        title: "Serve the market",
        detail: "Trading sits on the same trail as verification — not a side system.",
      },
    ],
    closing:
      "Every credit carries a traceable history, buyers and auditors can check what they pay for, and double counting is ruled out by the ledger itself.",
  },

  "kobipal-social-forum": {
    overview:
      "KobiPal needed a community forum for people in parts of Africa where connectivity is weak and heavy apps do not load — live on the App Store and Google Play from one Flutter codebase.",
    pullQuote:
      "Built light so it stays quick where the network is not — one codebase, two stores.",
    stageKind: "product",
    audiencesLabel: "Who the forum has to reach",
    audiences: [
      {
        label: "Members",
        detail: "Keep reading and posting where heavier apps stall on weak networks.",
      },
      {
        label: "Community ops",
        detail: "One release path to both stores — App Store and Google Play.",
      },
      {
        label: "Product",
        detail: "Speed and small data use as core features, not polish.",
      },
    ],
    surfacesLabel: "What “built light” means",
    surfaces: [
      {
        title: "Flutter app",
        detail: "One codebase shipping to both major mobile stores.",
      },
      {
        title: "Weak-network tuning",
        detail: "Fast enough and light enough that members stay when the signal does not.",
      },
      {
        title: "Social forum",
        detail: "Reading and posting as the core loop — not a heavy media suite.",
      },
      {
        title: "Store presence",
        detail: "Live where members already install apps.",
      },
    ],
    approachLead: "Design for the worst network you intend to serve — then ship everywhere.",
    approach: [
      {
        title: "Constraint first",
        detail: "Weak connectivity set the performance budget before features did.",
      },
      {
        title: "One codebase",
        detail: "Flutter so each release ships once to both stores.",
      },
      {
        title: "Protect the loop",
        detail: "Reading and posting stay responsive; everything else earns its bytes.",
      },
      {
        title: "Ship where users are",
        detail: "App Store and Google Play — distribution as part of the product.",
      },
    ],
    closing:
      "Members keep participating where heavier apps fail, one Flutter codebase serves both stores, and the product stays light enough to keep users a slow app would lose.",
  },

  "kobipal-landing-page": {
    overview:
      "Before the app reached the stores, KobiPal needed one page that explains the community and turns visitors into sign-ups — tuned to load fast on the same weak networks the app serves.",
    pullQuote:
      "One message. One action. Built for the top quarter of landing-page conversion — not the median.",
    stageKind: "site",
    audiencesLabel: "Who the page must convert",
    audiences: [
      {
        label: "Prospective members",
        detail: "Understand the community and sign up without friction.",
      },
      {
        label: "Brand",
        detail: "A public home ahead of app-store presence.",
      },
      {
        label: "Weak-network visitors",
        detail: "A page that still loads where connections are poor.",
      },
    ],
    surfacesLabel: "What the landing page is",
    surfaces: [
      {
        title: "Single message",
        detail: "The community explained without competing stories.",
      },
      {
        title: "Single action",
        detail: "A clear path from visit to sign-up.",
      },
      {
        title: "Fast on weak networks",
        detail: "Performance tuned for the same audience as the app.",
      },
      {
        title: "Brand home",
        detail: "kobipal.com as the front door before and beside the stores.",
      },
    ],
    approachLead: "Conversion design under a weak-network budget.",
    approach: [
      {
        title: "One job",
        detail: "Explain and convert — nothing that dilutes the path to sign-up.",
      },
      {
        title: "Design for speed",
        detail: "Same constraint as the app: slow pages lose the audience.",
      },
      {
        title: "Aim above the median",
        detail: "Benchmarked against Unbounce conversion quartiles — target the top quarter.",
      },
      {
        title: "Bridge to the product",
        detail: "The page earns its keep until — and after — the stores go live.",
      },
    ],
    closing:
      "A single clear path from visit to sign-up, a home for the brand ahead of launch, and a page that loads quickly for the same audience the app serves.",
  },

  "sports-ground-booking-system": {
    overview:
      "Ground owners took bookings by phone and message. That meant double bookings, empty slots and no trustworthy record of revenue — so availability and reservation had to move online.",
    pullQuote:
      "Live availability, confirmed slots lock instantly — zero double bookings by design.",
    stageKind: "product",
    audiencesLabel: "Who the calendar serves",
    audiences: [
      {
        label: "Players",
        detail: "See live availability and reserve a slot without calling around.",
      },
      {
        label: "Ground owners",
        detail: "Manage every ground from one calendar — takings by day and by ground.",
      },
      {
        label: "Operations",
        detail: "No disputed slots; confirmed bookings lock instantly.",
      },
    ],
    surfacesLabel: "What the booking system does",
    surfaces: [
      {
        title: "Live availability",
        detail: "Players see what is open — across the week and day parts.",
      },
      {
        title: "Instant lock",
        detail: "A confirmed slot cannot be double-booked.",
      },
      {
        title: "Owner calendar",
        detail: "Every ground managed from one place.",
      },
      {
        title: "Revenue record",
        detail: "Takings visible by day and by ground — not reconstructed from chats.",
      },
    ],
    approachLead: "Replace the phone book with a calendar that cannot lie.",
    approach: [
      {
        title: "End the double book",
        detail: "Instant lock on confirm — the core product promise.",
      },
      {
        title: "Show live availability",
        detail: "Players self-serve; empty slots fill without outbound calls.",
      },
      {
        title: "One owner view",
        detail: "Multiple grounds, one calendar, clear takings.",
      },
      {
        title: "Stay open",
        detail: "24/7 booking when the office phone is not.",
      },
    ],
    closing:
      "Empty slots fill without phone calls, double bookings stop, and owners see takings by day and by ground — with booking open around the clock.",
  },

  "seo-websites-for-smes": {
    overview:
      "Small businesses with no search presence were invisible to customers already looking for their service. They needed fast sites structured around the terms those customers actually search for.",
    pullQuote:
      "Show up when a local customer searches — traffic that does not stop when the ad budget does.",
    stageKind: "site",
    audiencesLabel: "Who these sites have to win",
    audiences: [
      {
        label: "Local customers",
        detail: "Find the business when they search — not only when an ad appears.",
      },
      {
        label: "SME owners",
        detail: "Calls and enquiries from organic visits, not just paid clicks.",
      },
      {
        label: "Operators",
        detail: "Sites fast enough that search traffic converts instead of bouncing.",
      },
    ],
    surfacesLabel: "What each SME site carries",
    surfaces: [
      {
        title: "Search structure",
        detail: "Built around the terms that business’s customers actually use.",
      },
      {
        title: "Speed",
        detail: "Fast enough to keep the visit after the click.",
      },
      {
        title: "Enquiry paths",
        detail: "Visits turn into calls and messages — not dead-end brochure pages.",
      },
      {
        title: "Durable traffic",
        detail: "Organic presence that outlasts any single campaign budget.",
      },
    ],
    approachLead: "SEO as architecture — not a plugin bolted on after launch.",
    approach: [
      {
        title: "Find the real queries",
        detail: "Structure pages around what local customers type — not internal jargon.",
      },
      {
        title: "Build fast",
        detail: "Performance is part of ranking and conversion.",
      },
      {
        title: "Aim at the top results",
        detail: "Framed against click-share evidence for positions one through three.",
      },
      {
        title: "Connect to enquiry",
        detail: "Search traffic only pays when the site makes contact easy.",
      },
    ],
    closing:
      "The business shows up when a local customer searches, visits turn into enquiries, and traffic keeps arriving when the ad budget pauses.",
  },

  "address-of-technology-website-seo": {
    overview:
      "Address of Technology, Finova’s in-Kingdom channel partner in Jeddah, needed a site that presents its services to Saudi buyers and gets found in search — with SEO built in from the first page.",
    pullQuote:
      "A credible storefront for the Saudi market — search beyond referrals alone, content ready to grow.",
    stageKind: "site",
    audiencesLabel: "Who the Jeddah site must reach",
    audiences: [
      {
        label: "Saudi buyers",
        detail: "Understand services through a credible local storefront.",
      },
      {
        label: "The partner",
        detail: "A base to grow content on — not a static brochure.",
      },
      {
        label: "Search visitors",
        detail: "Find Address of Technology beyond word-of-mouth referrals.",
      },
    ],
    surfacesLabel: "What we shipped",
    surfaces: [
      {
        title: "Company website",
        detail: "Services presented for the Saudi market context.",
      },
      {
        title: "On-page SEO",
        detail: "Built in from the first page — not bolted on later.",
      },
      {
        title: "Growth base",
        detail: "Structure the partner can extend with new content.",
      },
      {
        title: "In-Kingdom presence",
        detail: "KSA channel partner, based in Jeddah — verified on this deployment.",
      },
    ],
    approachLead: "Local credibility and organic discovery in one build.",
    approach: [
      {
        title: "Write for Saudi buyers",
        detail: "Messaging and structure that fit how buyers evaluate a technology partner.",
      },
      {
        title: "SEO from page one",
        detail: "On-page foundations present at launch — BrightEdge-era organic share in mind.",
      },
      {
        title: "Leave room to grow",
        detail: "A content base the partner can expand without rebuilding.",
      },
      {
        title: "Support the channel",
        detail: "The site serves the in-Kingdom partnership, not a generic global template.",
      },
    ],
    closing:
      "A credible Saudi storefront, search that brings buyers beyond referrals, and a site Address of Technology can grow content on — as Finova’s Jeddah channel partner.",
  },
}

export function getCaseStudyDepth(slug: string): CaseStudyDepth | null {
  return CASE_STUDY_DEPTH[slug] ?? null
}
