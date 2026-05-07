const makeAvatar = (initials, color = "#111111") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="${color}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="700" fill="#ffffff">${initials}</text></svg>`
  )}`;

export const mentorProfiles = [
  {
    id: "m1",
    name: "Jacktone Etemesi",
    avatar: makeAvatar("JE", "#111111"),
    title: "Senior Data Scientist",
    company: "Ubuntu Analytiq",
    location: "Nairobi",
    bio: "Guides learners through Python analytics, SQL, business questions, and portfolio-ready project reviews.",
    specialties: ["SQL", "Power BI", "Python", "Business cases"],
    expertise: ["Python", "SQL", "Power BI"],
    experience: "8 years",
    currentRole: "Senior Data Scientist",
    availability: "Weekday evenings and Saturday reviews",
    mentorshipDuration: "6 months",
    rating: 4.9,
    sessionsThisWeek: 18,
    priceKes: 12500
  },
  {
    id: "m2",
    name: "Ezra Muinde",
    avatar: makeAvatar("EM", "#0e7490"),
    title: "Senior Data Scientist and AI Engineer",
    company: "Ubuntu Analytiq",
    location: "Remote",
    bio: "Helps learners turn everyday data into decisions, dashboards, AI-assisted workflows, and practical portfolio projects.",
    specialties: ["AI workflows", "Python", "Data storytelling", "Business analytics"],
    expertise: ["AI", "Python", "Data products"],
    experience: "6 years",
    currentRole: "Senior Data Scientist and AI Engineer",
    availability: "Evening cohorts and executive clinic slots",
    mentorshipDuration: "6 months",
    rating: 4.8,
    sessionsThisWeek: 14,
    priceKes: 12500
  },
  {
    id: "m4",
    name: "Amina Wanjiku",
    avatar: makeAvatar("AW", "#14532d"),
    title: "Business Intelligence Lead",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Nairobi",
    bio: "Supports analysts moving from spreadsheet reporting into executive-ready Power BI dashboards and KPI systems.",
    specialties: ["Power BI", "DAX", "KPI design", "Retail analytics"],
    expertise: ["Power BI", "DAX", "Dashboard design"],
    experience: "9 years",
    currentRole: "BI Lead",
    availability: "Tuesday and Thursday evenings",
    mentorshipDuration: "6 months",
    rating: 4.8,
    sessionsThisWeek: 9,
    priceKes: 12500
  },
  {
    id: "m5",
    name: "Brian Otieno",
    avatar: makeAvatar("BO", "#7c2d12"),
    title: "Data Engineer",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Kisumu",
    bio: "Guides learners on SQL, clean data models, analytics tables, and the handoff between databases and BI tools.",
    specialties: ["SQL", "Data modeling", "ETL", "Reporting systems"],
    expertise: ["SQL", "Data engineering", "Analytics workflows"],
    experience: "7 years",
    currentRole: "Analytics Data Engineer",
    availability: "Monday evenings and Saturday labs",
    mentorshipDuration: "6 months",
    rating: 4.7,
    sessionsThisWeek: 8,
    priceKes: 12500
  },
  {
    id: "m6",
    name: "Njeri Kamau",
    avatar: makeAvatar("NK", "#854d0e"),
    title: "Finance Analytics Specialist",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Nairobi",
    bio: "Helps finance teams turn cashflow, budget, and P&L questions into reliable models and clear recommendations.",
    specialties: ["Excel", "Finance analytics", "Power Query", "P&L"],
    expertise: ["Excel", "Finance", "Power BI"],
    experience: "10 years",
    currentRole: "Finance Analytics Specialist",
    availability: "Wednesday evenings and month-end clinics",
    mentorshipDuration: "6 months",
    rating: 4.9,
    sessionsThisWeek: 7,
    priceKes: 12500
  },
  {
    id: "m7",
    name: "Samuel Kiptoo",
    avatar: makeAvatar("SK", "#155e75"),
    title: "Machine Learning Engineer",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Eldoret",
    bio: "Coaches Python learners through modelling basics, evaluation, feature thinking, and portfolio-ready notebooks.",
    specialties: ["Python", "Machine learning", "Model evaluation", "Notebooks"],
    expertise: ["Python", "ML", "Statistics"],
    experience: "8 years",
    currentRole: "Machine Learning Engineer",
    availability: "Saturday mornings and async notebook reviews",
    mentorshipDuration: "6 months",
    rating: 4.8,
    sessionsThisWeek: 10,
    priceKes: 12500
  },
  {
    id: "m8",
    name: "Fatuma Ali",
    avatar: makeAvatar("FA", "#991b1b"),
    title: "Operations Analytics Manager",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Mombasa",
    bio: "Mentors operations teams on inventory, logistics, service quality, and practical analytics for daily decision-making.",
    specialties: ["Operations analytics", "Inventory", "Logistics", "Data fluency"],
    expertise: ["Operations", "Excel", "Dashboards"],
    experience: "11 years",
    currentRole: "Operations Analytics Manager",
    availability: "Friday afternoons and Sunday planning sessions",
    mentorshipDuration: "6 months",
    rating: 4.7,
    sessionsThisWeek: 6,
    priceKes: 12500
  },
  {
    id: "m9",
    name: "Kevin Mwangi",
    avatar: makeAvatar("KM", "#1e3a8a"),
    title: "AI Automation Consultant",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Remote",
    bio: "Helps professionals design safe AI workflows, automate repetitive analysis, and document guardrails before deployment.",
    specialties: ["AI workflows", "n8n", "Automation", "Prompt systems"],
    expertise: ["AI", "Automation", "n8n"],
    experience: "6 years",
    currentRole: "AI Automation Consultant",
    availability: "Evening automation clinics",
    mentorshipDuration: "6 months",
    rating: 4.8,
    sessionsThisWeek: 12,
    priceKes: 12500
  },
  {
    id: "m10",
    name: "Grace Achieng",
    avatar: makeAvatar("GA", "#166534"),
    title: "Monitoring and Evaluation Analyst",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Kisumu",
    bio: "Supports NGOs and program teams with indicators, data quality checks, reporting templates, and insight writing.",
    specialties: ["M&E", "Data quality", "Dashboards", "Impact reports"],
    expertise: ["M&E", "Excel", "Reporting"],
    experience: "9 years",
    currentRole: "M&E Analyst",
    availability: "Tuesday mornings and Thursday evenings",
    mentorshipDuration: "6 months",
    rating: 4.7,
    sessionsThisWeek: 5,
    priceKes: 12500
  },
  {
    id: "m11",
    name: "Daniel Muriithi",
    avatar: makeAvatar("DM", "#713f12"),
    title: "Marketing Analytics Strategist",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Nairobi",
    bio: "Coaches teams on campaign metrics, funnel analysis, attribution basics, customer segments, and executive storytelling.",
    specialties: ["Marketing analytics", "Funnels", "Segmentation", "Storytelling"],
    expertise: ["Marketing", "Analytics", "Power BI"],
    experience: "8 years",
    currentRole: "Marketing Analytics Strategist",
    availability: "Monday and Wednesday evenings",
    mentorshipDuration: "6 months",
    rating: 4.6,
    sessionsThisWeek: 8,
    priceKes: 12500
  },
  {
    id: "m12",
    name: "Lilian Chebet",
    avatar: makeAvatar("LC", "#0f766e"),
    title: "Healthcare Data Analyst",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Nakuru",
    bio: "Guides learners through patient-flow, service quality, public health, and operations dashboards with care and clarity.",
    specialties: ["Healthcare analytics", "Power BI", "Excel", "Data ethics"],
    expertise: ["Healthcare", "BI", "Ethics"],
    experience: "7 years",
    currentRole: "Healthcare Data Analyst",
    availability: "Saturday afternoons",
    mentorshipDuration: "6 months",
    rating: 4.8,
    sessionsThisWeek: 6,
    priceKes: 12500
  },
  {
    id: "m13",
    name: "Peter Njoroge",
    avatar: makeAvatar("PN", "#312e81"),
    title: "Product Analytics Lead",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Remote",
    bio: "Mentors learners on activation, retention, cohorts, experiments, and how to write product decisions with evidence.",
    specialties: ["Product analytics", "Cohorts", "Experimentation", "SQL"],
    expertise: ["Product", "SQL", "Experimentation"],
    experience: "9 years",
    currentRole: "Product Analytics Lead",
    availability: "Tuesday evenings and async SQL reviews",
    mentorshipDuration: "6 months",
    rating: 4.8,
    sessionsThisWeek: 7,
    priceKes: 12500
  },
  {
    id: "m14",
    name: "Mercy Wairimu",
    avatar: makeAvatar("MW", "#be123c"),
    title: "People Analytics Consultant",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Nairobi",
    bio: "Helps HR and leadership teams use data for hiring, retention, performance, and workforce planning decisions.",
    specialties: ["People analytics", "HR dashboards", "Excel", "Insight writing"],
    expertise: ["HR", "Excel", "Dashboards"],
    experience: "8 years",
    currentRole: "People Analytics Consultant",
    availability: "Wednesday lunch-hour clinics",
    mentorshipDuration: "6 months",
    rating: 4.7,
    sessionsThisWeek: 5,
    priceKes: 12500
  },
  {
    id: "m15",
    name: "Hassan Abdi",
    avatar: makeAvatar("HA", "#92400e"),
    title: "Supply Chain BI Specialist",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Garissa",
    bio: "Coaches procurement, inventory, supplier, and distribution analysis using Excel, SQL, and Power BI.",
    specialties: ["Supply chain", "Inventory analytics", "SQL", "Power BI"],
    expertise: ["Supply Chain", "SQL", "BI"],
    experience: "10 years",
    currentRole: "Supply Chain BI Specialist",
    availability: "Friday evenings",
    mentorshipDuration: "6 months",
    rating: 4.7,
    sessionsThisWeek: 6,
    priceKes: 12500
  },
  {
    id: "m16",
    name: "Stella Atieno",
    avatar: makeAvatar("SA", "#0f172a"),
    title: "Customer Experience Analyst",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Kisumu",
    bio: "Mentors learners on support quality, sentiment signals, service dashboards, and customer experience improvement loops.",
    specialties: ["Customer support", "CX analytics", "Sentiment", "Dashboards"],
    expertise: ["CX", "Power BI", "Data storytelling"],
    experience: "7 years",
    currentRole: "Customer Experience Analyst",
    availability: "Monday afternoons and Saturday office hours",
    mentorshipDuration: "6 months",
    rating: 4.6,
    sessionsThisWeek: 5,
    priceKes: 12500
  },
  {
    id: "m17",
    name: "Victor Karanja",
    avatar: makeAvatar("VK", "#164e63"),
    title: "Data Product Manager",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Nairobi",
    bio: "Helps advanced learners shape dashboards, agents, and analytics tools into products that teams can adopt.",
    specialties: ["Data products", "Analytics strategy", "AI adoption", "Stakeholder alignment"],
    expertise: ["Strategy", "AI", "Data products"],
    experience: "12 years",
    currentRole: "Data Product Manager",
    availability: "Executive clinics and Friday reviews",
    mentorshipDuration: "6 months",
    rating: 4.9,
    sessionsThisWeek: 9,
    priceKes: 12500
  },
  {
    id: "m18",
    name: "Ruth Moraa",
    avatar: makeAvatar("RM", "#365314"),
    title: "Agritech Data Analyst",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Kisii",
    bio: "Works with learners on agribusiness, farmer operations, yield reporting, and practical field-data dashboards.",
    specialties: ["Agritech", "Field data", "Excel", "Power BI"],
    expertise: ["Agriculture", "Excel", "BI"],
    experience: "6 years",
    currentRole: "Agritech Data Analyst",
    availability: "Sunday afternoons",
    mentorshipDuration: "6 months",
    rating: 4.6,
    sessionsThisWeek: 4,
    priceKes: 12500
  },
  {
    id: "m19",
    name: "Paul Ochieng",
    avatar: makeAvatar("PO", "#1d4ed8"),
    title: "Risk Analytics Specialist",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Nairobi",
    bio: "Guides analysts through credit risk, fraud signals, controls, and explainable reporting for regulated teams.",
    specialties: ["Risk analytics", "Credit", "Fraud signals", "SQL"],
    expertise: ["Risk", "SQL", "Banking"],
    experience: "11 years",
    currentRole: "Risk Analytics Specialist",
    availability: "Thursday evenings and monthly risk clinics",
    mentorshipDuration: "6 months",
    rating: 4.8,
    sessionsThisWeek: 6,
    priceKes: 12500
  },
  {
    id: "m20",
    name: "Winnie Nyambura",
    avatar: makeAvatar("WN", "#6d28d9"),
    title: "AI Fluency Coach",
    company: "Ubuntu Analytiq Mentor Network",
    location: "Remote",
    bio: "Helps non-technical professionals use AI safely for research, summaries, analysis, and better everyday decisions.",
    specialties: ["AI fluency", "Prompting", "Data literacy", "Executive communication"],
    expertise: ["AI", "Data fluency", "Communication"],
    experience: "6 years",
    currentRole: "AI Fluency Coach",
    availability: "Evening and weekend cohort support",
    mentorshipDuration: "6 months",
    rating: 4.7,
    sessionsThisWeek: 8,
    priceKes: 12500
  }
];

export const adminWorkspace = {
  metrics: [
    ["Students", 1240],
    ["Mentors", 42],
    ["Projects", 38],
    ["Active plans", 312]
  ],
  roleCounts: [
    ["Students", 1240],
    ["Mentors", 42],
    ["Admins", 6],
    ["Employers", 18]
  ],
  queues: [
    ["Mentor applications", "7 waiting", "High"],
    ["Project reviews", "28 pending", "Medium"],
    ["Paystack reconciliation", "3 checks", "Medium"],
    ["AI usage review", "11 accounts", "Low"]
  ]
};

export const paystackEvents = [
  {
    id: "evt_1",
    customer: "Jane Doe",
    plan: "Student Core",
    reference: "UA-PSK-001",
    amountKes: 2500,
    status: "Successful",
    role: "learner"
  },
  {
    id: "evt_2",
    customer: "Amina Njeri",
    plan: "Mentor Pro",
    reference: "UA-PSK-002",
    amountKes: 2500,
    status: "Successful",
    role: "mentor"
  },
  {
    id: "evt_3",
    customer: "ACME Ltd",
    plan: "Employer Scout",
    reference: "UA-PSK-003",
    amountKes: 50000,
    status: "Pending",
    role: "employer"
  },
  {
    id: "evt_4",
    customer: "Kevin M.",
    plan: "AI Data Builder",
    reference: "UA-PSK-004",
    amountKes: 1800,
    status: "Successful",
    role: "learner"
  }
];

export const roleWorkspaces = [
  {
    role: "Student",
    href: "/learners",
    status: "Active",
    plan: "Student Core",
    summary: "Mentorship, pathways, projects, submissions, and progress.",
    primaryMetric: 72,
    metricLabel: "progress",
    nextAction: "Book a mentor session",
    revenue: "KES 2,500",
    seats: "1"
  },
  {
    role: "Mentor",
    href: "/mentors",
    status: "Verified",
    plan: "Mentor Pro",
    summary: "Learner roster, review queue, reputation, and payouts.",
    primaryMetric: 12,
    metricLabel: "reviews",
    nextAction: "Review submissions",
    revenue: "KES 25,000",
    seats: "1"
  },
  {
    role: "Admin",
    href: "/admin",
    status: "Internal",
    plan: "Back office",
    summary: "Role access, billing events, content, and trust queues.",
    primaryMetric: 8,
    metricLabel: "queues",
    nextAction: "Approve mentor applications",
    revenue: "Internal",
    seats: "6"
  }
];

export const academyPrograms = [
  {
    id: "p1",
    slug: "python-for-analytics",
    title: "Python for Data Analytics",
    category: "Data",
    level: "Intermediate",
    summary: "Use Python to clean data, answer business questions, and produce project-ready analysis.",
    priceKes: 10000,
    duration: "6 weeks",
    startDate: "2026-07-06",
    schedule: "Classes start 6th July.",
    mentor: mentorProfiles[0],
    modules: ["Python foundations", "Pandas workflows", "Charts and summaries", "Business recommendations"],
    outcomes: ["Clean messy datasets", "Build reproducible analysis", "Present decisions with evidence"],
    tools: ["Python", "Pandas", "Jupyter", "CSV"],
    projects: ["Product growth funnel", "SME cashflow analysis"],
    roles: ["Data analyst", "Operations analyst", "BI analyst"],
    demand: ["Retail", "Finance", "SaaS"]
  },
  {
    id: "p2",
    slug: "sql-for-analysts",
    title: "SQL for Analysts",
    category: "Data",
    level: "Beginner",
    summary: "Query real business data, join tables, and prepare datasets for dashboards and reports.",
    priceKes: 3500,
    duration: "4 weeks",
    mentor: mentorProfiles[0],
    modules: ["Selects and filters", "Joins", "Aggregations", "Business reporting"],
    outcomes: ["Write clean SQL queries", "Debug joins", "Create analysis tables"],
    tools: ["SQL", "Database queries", "Reporting tables"],
    projects: ["Customer support quality", "Nairobi FMCG sales recovery"],
    roles: ["Data analyst", "Reporting analyst"],
    demand: ["Telecom", "Payments", "Logistics"]
  },
  {
    id: "p3",
    slug: "ai-data-workflows",
    title: "AI Data Workflows",
    category: "AI",
    level: "Intermediate",
    summary: "Generate datasets, create analysis walkthroughs, and use AI safely in practical data work.",
    priceKes: 6500,
    duration: "5 weeks",
    mentor: mentorProfiles[1],
    modules: ["Prompted data generation", "Dataset QA", "AI walkthroughs", "Evaluation checklists"],
    outcomes: ["Generate useful practice data", "Review AI output quality", "Create guided data projects"],
    tools: ["AI assistants", "CSV", "Python", "Database queries"],
    projects: ["Synthetic retail dataset", "AI-guided SQL walkthrough"],
    roles: ["AI data analyst", "Data product builder"],
    demand: ["Education", "Fintech", "SaaS"]
  },
  {
    id: "p4",
    slug: "power-bi-business-intelligence",
    title: "Power BI Business Intelligence",
    category: "BI",
    level: "Beginner",
    summary: "Turn raw data into dashboards that answer manager-level questions.",
    priceKes: 4500,
    duration: "5 weeks",
    mentor: mentorProfiles[0],
    modules: ["Data model", "Measures", "Dashboard layout", "Executive summaries"],
    outcomes: ["Build clean dashboards", "Design useful KPIs", "Explain trends clearly"],
    tools: ["Power BI", "Excel", "CSV"],
    projects: ["Sales recovery dashboard", "Customer quality scorecard"],
    roles: ["BI analyst", "Reporting analyst"],
    demand: ["Retail", "Operations", "Finance"]
  },
  {
    id: "p5",
    slug: "excel-for-decision-making",
    title: "Excel for Decision Making",
    category: "Business",
    level: "Beginner",
    summary: "Use spreadsheets to clean data, model decisions, and communicate tradeoffs.",
    priceKes: 3000,
    duration: "3 weeks",
    mentor: mentorProfiles[1],
    modules: ["Cleaning", "Lookups", "Pivot tables", "Scenario analysis"],
    outcomes: ["Prepare reliable workbooks", "Create decision models", "Summarize findings"],
    tools: ["Excel", "CSV"],
    projects: ["Collections prioritization", "Inventory movement analysis"],
    roles: ["Business analyst", "Finance assistant"],
    demand: ["SMEs", "Finance", "Retail"]
  },
  {
    id: "p6",
    slug: "product-analytics",
    title: "Product Analytics",
    category: "Product",
    level: "Intermediate",
    summary: "Measure activation, retention, funnels, and experiments for digital products.",
    priceKes: 6000,
    duration: "6 weeks",
    mentor: mentorProfiles[1],
    modules: ["Funnels", "Cohorts", "Retention", "Experiment readouts"],
    outcomes: ["Read product behavior", "Prioritize growth opportunities", "Write decision memos"],
    tools: ["SQL", "Python", "Sheets"],
    projects: ["Product growth funnel", "Trial conversion readout"],
    roles: ["Product analyst", "Growth analyst"],
    demand: ["SaaS", "Fintech", "Marketplaces"]
  },
  {
    id: "p7",
    slug: "data-fluency-for-operators-and-managers",
    title: "Working with Data for Professionals Who Are Not Technical Analysts",
    category: "Business",
    level: "Beginner",
    summary: "Read reports, ask better data questions, use AI safely, and turn everyday workplace data into decisions without becoming technical.",
    priceKes: 10000,
    duration: "3 weeks",
    startDate: "2026-07-06",
    schedule: "Classes start 6th July.",
    mentor: mentorProfiles[1],
    modules: ["Business questions", "Metric definitions", "Dashboard reading", "Data quality traps", "AI-assisted summaries", "Decision communication"],
    outcomes: ["Read dashboards with confidence", "Spot weak metrics and data quality issues", "Turn reports into practical next steps"],
    tools: ["Excel", "Dashboards", "AI assistants", "Reports"],
    projects: ["Weekly business scorecard", "Manager-ready insight memo"],
    roles: ["Operations manager", "Sales lead", "Finance assistant", "Program officer"],
    demand: ["SMEs", "NGOs", "Operations", "Customer support"]
  }
];

export const learningTracks = [
  {
    title: "Work better with data",
    audience: "Operators, managers, founders, and business teams",
    summary: "Build data confidence without needing SQL, Python, or dashboard engineering.",
    href: "/pathways/data-fluency-for-operators-and-managers"
  },
  {
    title: "Become an analyst",
    audience: "Learners targeting analyst and BI roles",
    summary: "Move from spreadsheets and SQL into portfolio-ready analysis projects.",
    href: "/pathways"
  },
  {
    title: "Build AI data workflows",
    audience: "Learners using AI to generate, inspect, and explain datasets",
    summary: "Practice with synthetic datasets, walkthroughs, and clear evaluation habits.",
    href: "/datasets"
  },
  {
    title: "Upskill a team",
    audience: "Employers and internal training leads",
    summary: "Use pathways, mentor reviews, and proof to grow practical team capability.",
    href: "/mentorships"
  }
];

export const projectBriefs = [
  {
    slug: "nairobi-fmcg-sales-recovery",
    title: "Nairobi FMCG Sales Recovery",
    company: "RetailCo",
    summary: "Find the territories and product groups pulling sales down, then recommend a recovery plan.",
    datasetHref: "/downloads/datasets/nairobi-fmcg-sales-recovery.csv",
    walkthroughHref: "/downloads/walkthroughs/nairobi-fmcg-sales-recovery.md",
    deliverables: ["Cleaned dataset", "Trend analysis", "Recovery recommendation"],
    rubric: ["Accuracy", "Decision quality", "Clarity", "Business usefulness"],
    scoreBands: ["90-100: manager-ready", "75-89: strong with revisions", "60-74: needs coaching"],
    feedback: "Mentors check whether the final recommendation is specific enough for a sales manager to act on."
  },
  {
    slug: "sme-cashflow-collections",
    title: "SME Cashflow and Collections",
    company: "FinanceCo",
    summary: "Prioritize overdue accounts and build a collections plan that protects cashflow.",
    datasetHref: "/downloads/datasets/sme-cashflow-collections.csv",
    walkthroughHref: "/downloads/walkthroughs/sme-cashflow-collections.md",
    deliverables: ["Aging summary", "Risk segmentation", "Collections action list"],
    rubric: ["Segmentation", "Financial reasoning", "Prioritization", "Communication"],
    scoreBands: ["90-100: finance-ready", "75-89: good analysis", "60-74: needs tighter logic"],
    feedback: "The strongest submissions explain which customers to call first and why."
  },
  {
    slug: "customer-support-quality",
    title: "Customer Support Quality",
    company: "SupportCo",
    summary: "Analyze support tickets, quality scores, and response patterns to improve service.",
    datasetHref: "/downloads/datasets/customer-support-quality.csv",
    walkthroughHref: "/downloads/walkthroughs/customer-support-quality.md",
    deliverables: ["Quality dashboard", "Root cause analysis", "Team coaching plan"],
    rubric: ["Data cleaning", "Pattern finding", "Recommendation quality", "Presentation"],
    scoreBands: ["90-100: operations-ready", "75-89: strong signal", "60-74: needs refinement"],
    feedback: "Mentors look for clear coaching actions, not just ticket counts."
  },
  {
    slug: "product-growth-funnel",
    title: "Product Growth Funnel",
    company: "Analytics Co",
    summary: "Measure conversion across signup, activation, trial, and paid customer steps.",
    datasetHref: "/downloads/datasets/product-growth-funnel.csv",
    walkthroughHref: "/downloads/walkthroughs/product-growth-funnel.md",
    deliverables: ["Funnel table", "Drop-off analysis", "Growth experiment proposal"],
    rubric: ["Metric accuracy", "Experiment thinking", "Narrative", "Next-step clarity"],
    scoreBands: ["90-100: product-ready", "75-89: strong readout", "60-74: needs coaching"],
    feedback: "Good submissions connect the funnel numbers to one clear growth move."
  }
];

export const projectShowcase = [
  {
    id: "ps1",
    title: "Product Growth Funnel Analysis",
    learner: "Alice Mwangi",
    pathway: "Product Analytics",
    company: "Analytics Co",
    summary: "A funnel readout with cohort breakdowns and a practical activation experiment.",
    dataset: "product-growth-funnel.csv",
    impact: "Identified a 12 percent activation gap after onboarding.",
    featuredQuote: "Clear product thinking and practical next steps.",
    tools: ["SQL", "Python", "Sheets"],
    score: 93
  },
  {
    id: "ps2",
    title: "SME Collections Priority Model",
    learner: "Kevin M.",
    pathway: "Python for Data Analytics",
    company: "FinanceCo",
    summary: "A prioritized collections list with risk bands and expected cash recovery.",
    dataset: "sme-cashflow-collections.csv",
    impact: "Separated urgent accounts from low-risk followups.",
    featuredQuote: "Good finance logic and concise communication.",
    tools: ["Excel", "Python"],
    score: 90
  },
  {
    id: "ps3",
    title: "Customer Support Quality Scorecard",
    learner: "Naomi A.",
    pathway: "Power BI Business Intelligence",
    company: "SupportCo",
    summary: "A support dashboard that connects response time, quality, and coaching actions.",
    dataset: "customer-support-quality.csv",
    impact: "Highlighted two teams needing targeted coaching.",
    featuredQuote: "Strong operational signal for managers.",
    tools: ["Power BI", "Excel"],
    score: 88
  }
];

export const reviewQueue = [
  {
    id: "r1",
    title: "Funnel readout",
    learner: "Alice Mwangi",
    project: "Product Growth Funnel",
    score: 93,
    issue: "Ready for showcase after one note on experiment sizing."
  },
  {
    id: "r2",
    title: "Collections plan",
    learner: "Kevin M.",
    project: "SME Cashflow and Collections",
    score: 86,
    issue: "Add clearer ranking logic for top overdue accounts."
  },
  {
    id: "r3",
    title: "Support scorecard",
    learner: "Naomi A.",
    project: "Customer Support Quality",
    score: 78,
    issue: "Recommendation needs a tighter manager summary."
  }
];

export const learnerRoster = [
  {
    id: "l1",
    name: "Jane Doe",
    pathway: "Python for Data Analytics",
    stage: "Mentor matched",
    nextAction: "Submit project",
    risk: "Healthy"
  },
  {
    id: "l2",
    name: "Ali Hassan",
    pathway: "SQL for Analysts",
    stage: "First session booked",
    nextAction: "Attend session",
    risk: "Watch"
  },
  {
    id: "l3",
    name: "Naomi A.",
    pathway: "Power BI Business Intelligence",
    stage: "Project review",
    nextAction: "Revise dashboard",
    risk: "Healthy"
  }
];

export const mentorWorkspace = {
  mentor: mentorProfiles[0],
  subscription: {
    name: "Mentor Pro",
    priceKes: 2500,
    interval: "month",
    features: ["Review queue", "Learner roster", "Payout tracking", "Reputation profile"]
  },
  learners: learnerRoster,
  queue: reviewQueue,
  payout: { paidKes: 12000, expectedKes: 25000, nextPayout: "2026-05-15" },
  reputation: { rating: 4.8, reviews: 124, repeatLearners: 32 }
};

export const learnerWorkspace = {
  subscription: {
    name: "Student Core",
    paystackPlanCode: "UA_STUDENT_CORE",
    priceKes: 2500,
    features: ["Mentor matching", "Project briefs", "Submission reviews", "AI data starter credits"]
  },
  person: { name: "Jane Doe", role: "Student", location: "Nairobi" },
  activeCourse: { title: "Python for Data Analytics", duration: "6 weeks" },
  progress: 72,
  submissions: [
    { title: "Product Growth Funnel", due: "2026-05-01", status: "In progress", score: 0 },
    { title: "SME Cashflow and Collections", due: "2026-05-08", status: "Reviewed", score: 86 }
  ],
  upcoming: ["Book this week's mentor session", "Finish project narrative", "Generate a dataset walkthrough"],
  nextSession: "Thu"
};

export const employerWorkspace = {
  company: "ACME Ltd",
  subscription: {
    name: "Employer Scout",
    priceKes: 50000,
    interval: "month",
    features: ["Verified project search", "Shortlists", "Intro requests"]
  },
  seatsUsed: 2,
  seatsTotal: 5,
  searchesThisMonth: 12,
  introRequests: 3,
  shortlist: [
    {
      name: "Alice Mwangi",
      avatar: makeAvatar("AM", "#111111"),
      role: "Data Analyst",
      location: "Nairobi",
      proof: "Product Growth Funnel analysis",
      signals: ["Python", "SQL", "Product analytics"],
      match: 92
    },
    {
      name: "John Otieno",
      avatar: makeAvatar("JO", "#0e7490"),
      role: "Data Engineer",
      location: "Nairobi",
      proof: "SME Cashflow analysis",
      signals: ["SQL", "ETL", "Dashboards"],
      match: 88
    }
  ]
};

export const mentorDashboardMetrics = {
  activeLearners: learnerRoster.length,
  queueCount: reviewQueue.length,
  completionRate: 72,
  sessionsThisWeek: 18
};

export const mentorDailyPlan = [
  { title: "09:00", note: "Review Alice's funnel project and approve showcase copy." },
  { title: "12:00", note: "Hold onboarding session for two SQL students." },
  { title: "16:00", note: "Send revision notes for collections project submissions." }
];

export const mentorApplicants = [
  {
    id: "a1",
    name: "Brian Wekesa",
    avatar: makeAvatar("BW", "#00b4d8"),
    title: "Analytics Lead",
    location: "Nairobi",
    status: "In review",
    teachingSignal: "Submitted two project walkthrough samples with clear scoring rubrics.",
    nextStep: "Review sample feedback before approval."
  },
  {
    id: "a2",
    name: "Mary Atieno",
    avatar: makeAvatar("MA", "#0e7490"),
    title: "BI Consultant",
    location: "Mombasa",
    status: "Approved",
    teachingSignal: "Strong Power BI portfolio and learner coaching references.",
    nextStep: "Invite to mentor onboarding."
  }
];

export const academyCompanies = [
  "Safaricom",
  "M-KOPA",
  "Twiga",
  "Flutterwave",
  "Kopo Kopo",
  "Wasoko",
  "Cellulant",
  "Sendy",
  "Apollo Agriculture",
  "MarketForce"
];

export const subscriptionPlans = [
  {
    id: "student-core",
    role: "learner",
    status: "Live",
    name: "Student Core",
    priceKes: 2500,
    interval: "monthly",
    paystackPlanCode: "UA_STUDENT_CORE",
    features: ["Mentor matching", "Project briefs", "Review submissions", "Starter AI credits"]
  },
  {
    id: "data-ai-mentorship-cohort-2",
    role: "learner",
    status: "Live",
    name: "Data & AI Mentorship Cohort 2",
    priceKes: 999,
    interval: "one-time",
    paystackPlanCode: "UA_DATA_AI_MENTORSHIP_COHORT_2",
    features: ["12-week mentorship", "Starts 3rd August 2026", "10 slots only", "Project review"]
  },
  {
    id: "mentor-booking",
    role: "learner",
    status: "Live",
    name: "Mentor Booking",
    priceKes: 12500,
    interval: "one-time",
    paystackPlanCode: "UA_MENTOR_BOOKING",
    features: ["Mentor matching", "Project access", "Review rhythm", "Guided growth plan"]
  },
  {
    id: "student-plus",
    role: "learner",
    status: "Live",
    name: "Student Plus",
    priceKes: 5500,
    interval: "monthly",
    paystackPlanCode: "UA_STUDENT_PLUS",
    features: ["Weekly mentor sessions", "Priority reviews", "More AI data credits", "Proof profile"]
  },
  {
    id: "mentor-pro",
    role: "mentor",
    status: "Live",
    name: "Mentor Pro",
    priceKes: 2500,
    interval: "monthly",
    paystackPlanCode: "UA_MENTOR_PRO",
    features: ["Review queue", "Learner management", "Payout tracking", "Reputation profile"]
  },
  {
    id: "ai-data-builder",
    role: "learner",
    status: "Live",
    name: "AI Data Builder",
    priceKes: 1800,
    interval: "monthly",
    paystackPlanCode: "UA_AI_DATA_BUILDER",
    features: ["Synthetic data generation", "Dataset walkthroughs", "CSV export", "Usage recommendations"]
  },
  {
    id: "course-pass",
    role: "course",
    status: "Live",
    name: "Course Pass",
    priceKes: 5000,
    interval: "one-time",
    paystackPlanCode: "UA_COURSE_PASS",
    features: ["One pathway", "Project files", "Mentor intro", "Certificate review"]
  },
  {
    id: "employer-scout",
    role: "employer",
    status: "Beta",
    name: "Employer Scout",
    priceKes: 50000,
    interval: "monthly",
    paystackPlanCode: "UA_EMPLOYER_SCOUT",
    features: ["Verified learner search", "Shortlists", "Intro requests", "Proof review"]
  }
];

export const syntheticDataPlans = [
  { name: "Starter", rows: "2,000 rows", tokens: "50k tokens", priceKes: 0 },
  { name: "Builder", rows: "50,000 rows", tokens: "750k tokens", priceKes: 1800 },
  { name: "Studio", rows: "250,000 rows", tokens: "3m tokens", priceKes: 6500 }
];

export const aiUsage = {
  tokenLimit: 50000,
  tokensUsed: 41800,
  rowsGenerated: 12400,
  recommendation: "Builder"
};

export const syntheticExamples = [
  ["Retail", "branch, sku, category, quantity, revenue, sale_date"],
  ["Healthcare", "clinic, patient_age, visit_type, diagnosis_group, claim_amount"],
  ["Finance", "customer_id, invoice_date, due_date, paid_date, balance, risk_band"]
];

export const academyLiveActivity = [
  { id: "act1", learner: "Alice Mwangi", action: "published", item: "Product Growth Funnel", time: "2h ago" },
  { id: "act2", learner: "Kevin M.", action: "submitted", item: "SME Cashflow and Collections", time: "5h ago" },
  { id: "act3", learner: "Naomi A.", action: "revised", item: "Customer Support Scorecard", time: "Yesterday" }
];

export const featuredLearner = {
  name: "Alice Mwangi",
  role: "Data Analyst",
  location: "Nairobi",
  mentor: "Ezra Muinde",
  employerMatches: 7,
  summary: "A project-first learner with strong SQL, Python, and product analysis evidence.",
  credentials: ["Python for Data Analytics", "SQL for Analysts", "Product Analytics"],
  skills: { excel: 82, sql: 91, powerbi: 76, storytelling: 88 },
  strengths: ["Clear business recommendations", "Clean analysis structure", "Strong project writeups"],
  risks: ["Needs more Power BI polish", "Should show more experiment sizing"],
  projects: [
    {
      title: "Product Growth Funnel",
      summary: "Mapped user drop-off from signup to paid conversion.",
      signal: "Product analytics"
    },
    {
      title: "SME Collections",
      summary: "Prioritized overdue accounts for finance teams.",
      signal: "Finance analytics"
    }
  ]
};

export default {};
