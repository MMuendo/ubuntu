export const ubuntuCourses = [
  {
    slug: "excel-workshop",
    title: "Data Thinking with Excel",
    category: "Data",
    courseType: "workshop",
    level: "Foundation",
    duration: "3 months",
    priceKes: 12500,
    startDate: "2026-06-20",
    displayOrder: 10,
    instructor: "Ezra Muinde",
    instructorTitle: "Senior Data Scientist and AI Engineer",
    summary:
      "Structure business problems, model decisions, and communicate insight with Excel before moving into BI or AI.",
    modules: ["Excel foundations and workbook structure", "Formulas, functions, and lookup logic", "Tables, validation, and protected workflows", "Pivot tables, charts, and dashboard storytelling", "Power Query, what-if analysis, automation, and capstone delivery"],
    outcomes: ["Navigate Excel workbooks with confidence", "Clean and structure messy business data", "Build formulas that support repeatable analysis", "Use lookup, logic, and text functions to answer business questions", "Create tables, validation rules, and protected sheets", "Summarize data with pivot tables and pivot charts", "Build dashboards that communicate trends and trade-offs", "Use Power Query and what-if tools to prepare decision-ready models"],
    tools: ["Excel", "Power Query", "PivotTables", "Power Pivot", "Solver", "Charts"],
    projects: ["Sales Performance and Forecasting Dashboard", "Pivot Table Performance Report", "What-if Scenario Model", "Power Query Cleaning Workflow", "Executive Excel Dashboard"],
    roles: ["Operations analyst", "Finance assistant", "Business analyst", "Reporting analyst", "Sales operations officer"],
    demand: ["SMEs", "Banking", "Telecom", "Retail", "Finance", "Operations"]
  },
  {
    slug: "powerbi-workshop",
    title: "Business Analytics with Power BI",
    category: "BI",
    courseType: "workshop",
    level: "Core",
    duration: "3 months",
    priceKes: 15000,
    startDate: "2026-05-04",
    displayOrder: 20,
    instructor: "Jacktone Etemesi",
    instructorTitle: "Senior Data Scientist",
    summary:
      "Turn raw data into decision-ready dashboards, DAX measures, and reporting systems leaders can actually use.",
    oldPriceKes: 20000,
    modules: ["Business and data fundamentals for BI", "Excel-to-BI preparation and analytical thinking", "SQL and data extraction foundations", "Power Query, data models, DAX, and dashboards", "Executive reporting, storytelling, refresh, and capstone delivery"],
    outcomes: ["Translate business objectives into measurable KPIs", "Prepare clean data for dashboarding and reporting", "Understand structured data, source systems, and reporting tables", "Shape and transform data with Power Query", "Build reliable Power BI data models", "Write DAX measures for business questions", "Design executive dashboards leaders can scan quickly", "Communicate insights through reporting narratives and drill-down analysis"],
    tools: ["Power BI", "Power Query", "DAX", "Excel", "SQL", "Data models"],
    projects: ["Retail Sales Performance Report", "Financial P&L Dashboard", "Logistics KPI Tracker", "Executive KPI Dashboard", "Ad-hoc Drill-down Analysis Report"],
    roles: ["BI analyst", "Business Intelligence Analyst", "Reporting analyst", "Operations analyst", "Data analyst", "AI Agents Developer", "Agentic AI Ethicist"],
    demand: ["Finance", "Logistics", "Retail", "Operations", "Executive reporting", "Business performance teams"]
  },
  {
    slug: "ai-mastery",
    title: "AI Fluency for Business Leaders & Analysts",
    category: "AI",
    courseType: "mastery",
    level: "AI Mastery",
    duration: "1 month",
    priceKes: 2500,
    startDate: "2026-05-04",
    displayOrder: 30,
    instructor: "Ezra Muinde",
    instructorTitle: "Senior Data Scientist and AI Engineer",
    summary:
      "Understand where AI fits, where it fails, and how to use it safely in analysis, leadership, and day-to-day work.",
    modules: ["What AI is and how modern AI systems think", "Prompt engineering and clear instruction design", "AI tools and the 2026 technology stack", "Deploying AI inside real human-to-AI workflows", "Ethics, safety, data protection, and AI-powered career growth"],
    outcomes: ["Explain what AI can and cannot do in business", "Compare ChatGPT, Claude, Gemini, and other AI assistants", "Write prompts that produce useful, reviewable outputs", "Choose the right AI tool for a real workplace task", "Use AI to draft, analyze, summarize, and structure work", "Design human > AI > human review workflows", "Protect sensitive data and avoid unsafe AI use", "Use AI to improve career positioning and daily productivity"],
    tools: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Notion AI", "Spreadsheets"],
    projects: ["AI Tools Audit", "Prompt Engineering Workbook", "AI Strategy Memo", "Human-AI Workflow Map", "Career Operating System with AI"],
    roles: ["Manager", "Analyst", "Founder", "Team lead", "Operations lead", "Program manager"],
    demand: ["SMEs", "NGOs", "Analytics teams", "Operations", "Leadership", "Customer support"]
  },
  {
    slug: "ai-agents-masterclass",
    title: "Agentic AI MasterClass",
    category: "AI",
    courseType: "masterclass",
    level: "Advanced",
    duration: "5 weeks",
    priceKes: 5000,
    oldPriceKes: 7500,
    startDate: "2026-08-04",
    schedule: "Every Tuesday and Thursday evening from 7:00-8:30 PM across 10 sessions.",
    displayOrder: 40,
    instructor: "Ezra Muinde",
    instructorTitle: "Senior Data Scientist and AI Engineer",
    summary:
      "Design AI agents that support analysis, monitoring, routing, and decision execution in real business environments.",
    modules: ["What an AI agent is and how agentic systems work", "Meeting your workbench: n8n crash course", "Giving your AI hands with tools, APIs, and webhooks", "Knowledge, RAG, personality, memory, and context", "Mobile agents, web integration, customer service desks, and safety"],
    journeySchedule: [
      {
        theme: "Week 1: Foundations",
        sessions: [
          {
            week: "1",
            lesson: "1",
            date: "Tue, 4 Aug",
            time: "7:00-8:30 PM",
            title: "Understand the AI Agent Landscape",
            description: "Chatbots are reactive, automations are rule-based, and agents are autonomous. Know when to use each."
          },
          {
            week: "1",
            lesson: "2",
            date: "Thu, 6 Aug",
            time: "7:00-8:30 PM",
            title: "Design Agent Workflows Before Building",
            description: "Map behavior, decision trees, and handoffs. Sketch on paper before coding."
          }
        ]
      },
      {
        theme: "Week 2: Building",
        sessions: [
          {
            week: "2",
            lesson: "3",
            date: "Tue, 11 Aug",
            time: "7:00-8:30 PM",
            title: "Build Your First n8n Workflow",
            description: "Connect prompts to real actions and orchestrate Claude or other AI models."
          },
          {
            week: "2",
            lesson: "4",
            date: "Thu, 13 Aug",
            time: "7:00-8:30 PM",
            title: "Give Agents Tools Through APIs",
            description: "Connect to external systems via REST, webhooks, and function calling. Let agents actually do things."
          }
        ]
      },
      {
        theme: "Week 3: Intelligence",
        sessions: [
          {
            week: "3",
            lesson: "5",
            date: "Tue, 18 Aug",
            time: "7:00-8:30 PM",
            title: "Ground Responses with RAG",
            description: "Build retrieval-augmented generation, use vector databases, prevent hallucinations, and cite sources."
          },
          {
            week: "3",
            lesson: "6",
            date: "Thu, 20 Aug",
            time: "7:00-8:30 PM",
            title: "Add Personality, Memory & Context",
            description: "Give agents consistent tone, remember conversations, and maintain context without losing control."
          }
        ]
      },
      {
        theme: "Week 4: Tools & Safety",
        sessions: [
          {
            week: "4",
            lesson: "7",
            date: "Tue, 25 Aug",
            time: "7:00-8:30 PM",
            title: "Exposure to Agentic AI Tools",
            description: "Explore Claude's agentic capabilities, CrewAI for multi-agent systems, and other tools. Know what each platform does best."
          },
          {
            week: "4",
            lesson: "8",
            date: "Thu, 27 Aug",
            time: "7:00-8:30 PM",
            title: "Implement Safety & Human Review",
            description: "Add guardrails, human-in-the-loop workflows, and transparent limits so agent systems stay controlled."
          }
        ]
      },
      {
        theme: "Week 5: Integration & Scale",
        sessions: [
          {
            week: "5",
            lesson: "9",
            date: "Tue, 1 Sep",
            time: "7:00-8:30 PM",
            title: "Build a Complete Agent System",
            description: "Integrate workflow design, APIs, knowledge bases, safety checks, and agentic tools. Deploy and solve a real problem."
          },
          {
            week: "5",
            lesson: "10",
            date: "Thu, 3 Sep",
            time: "7:00-8:30 PM",
            title: "Scale & Sustain Your Agent Practice",
            description: "Operate in production, monitor performance, iterate based on feedback, and plan for continuous improvement."
          }
        ]
      }
    ],
    outcomes: ["Explain the difference between chatbots, automations, and AI agents", "Design useful agent workflows before touching tools", "Build n8n workflows that connect prompts to real actions", "Give agents tools through APIs, webhooks, and structured outputs", "Use knowledge bases and RAG to ground responses", "Add personality, memory, and context without losing control", "Expose agents through mobile and web channels", "Apply safety checks, human review, and honest limitations"],
    tools: ["n8n", "OpenAI", "Webhooks", "APIs", "RAG", "JSON"],
    projects: ["Lead Qualification Agent", "Document Summarisation Pipeline", "Multi-Agent Research Assistant", "Customer Service Desk Agent", "Mobile Workflow Assistant"],
    roles: ["AI builder", "Automation analyst", "Data product builder", "AI Agents Developer", "Agentic AI Ethicist"],
    demand: ["Sales ops", "Customer support", "Finance", "Research", "Operations", "Internal tools"]
  },
  {
    slug: "python-for-analytics",
    title: "Python for Data Analytics",
    category: "Data",
    courseType: "course",
    level: "Intermediate",
    duration: "6 weeks",
    priceKes: 10000,
    startDate: null,
    displayOrder: 50,
    instructor: "Jacktone Etemesi",
    instructorTitle: "Senior Data Scientist",
    summary: "Use Python to clean data, answer business questions, and produce project-ready analysis.",
    modules: ["Python foundations for analysts", "Data cleaning with Pandas", "Exploratory analysis and summaries", "Visualization and storytelling", "Reusable analysis workflows and recommendations"],
    outcomes: ["Read and write CSV and spreadsheet data", "Clean missing, duplicate, and inconsistent records", "Use Pandas to filter, group, join, and reshape data", "Create charts that explain business movement", "Summarize analysis in notebooks and reports", "Build repeatable workflows instead of one-off fixes", "Turn analysis into recommendations", "Prepare a portfolio-ready Python analytics project"],
    tools: ["Python", "Pandas", "Jupyter", "Matplotlib", "CSV", "Excel"],
    projects: ["Product growth funnel", "SME cashflow analysis", "Customer cohort summary", "Sales performance notebook", "Operations variance report"],
    roles: ["Data analyst", "Operations analyst", "BI analyst", "Reporting analyst"],
    demand: ["Retail", "Finance", "SaaS", "Operations", "Startups"]
  },
  {
    slug: "sql-for-analysts",
    title: "SQL for Analysts",
    category: "Data",
    courseType: "course",
    level: "Beginner",
    duration: "4 weeks",
    priceKes: 3500,
    startDate: null,
    displayOrder: 60,
    instructor: "Jacktone Etemesi",
    instructorTitle: "Senior Data Scientist",
    summary: "Query real business data, join tables, and prepare datasets for dashboards and reports.",
    modules: ["SQL foundations and query structure", "Filtering, sorting, and business logic", "Joins and relational thinking", "Aggregations, windows, and reporting tables", "Query QA, performance basics, and dashboard-ready datasets"],
    outcomes: ["Write clear SELECT queries", "Filter business records with confidence", "Join tables without duplicating or losing rows", "Use aggregations to calculate KPIs", "Build reporting tables for dashboards", "Debug common SQL mistakes", "Document query assumptions and definitions", "Prepare SQL outputs for analysts and managers"],
    tools: ["SQL", "PostgreSQL", "Database clients", "CSV", "Reporting tables"],
    projects: ["Customer support quality", "Nairobi FMCG sales recovery", "Sales KPI reporting table", "Customer retention query pack", "Operations exception report"],
    roles: ["Data analyst", "Reporting analyst", "BI analyst", "Operations analyst"],
    demand: ["Telecom", "Payments", "Logistics", "Retail", "Customer support"]
  },
  {
    slug: "data-fluency-for-operators-and-managers",
    title: "Working with Data for Professionals Who Are Not Technical Analysts",
    category: "Business",
    courseType: "course",
    level: "Beginner",
    duration: "3 weeks",
    priceKes: 10000,
    oldPriceKes: 12500,
    startDate: "2026-07-06",
    schedule: "Classes start 6th July.",
    displayOrder: 70,
    instructor: "Ezra Muinde",
    instructorTitle: "Senior Data Scientist and AI Engineer",
    summary:
      "Read reports, ask better data questions, use AI safely, and turn everyday workplace data into decisions without becoming technical.",
    modules: ["Business questions", "Metric definitions", "Dashboard reading", "Data quality traps", "AI-assisted summaries"],
    journeySchedule: [
      {
        theme: "Week 1: Reading Data Critically",
        sessions: [
          {
            week: "1",
            lesson: "1",
            date: "Mon, 6 Jul",
            time: "7:00-8:30 PM",
            title: "Read Reports Confidently",
            description: "Understand what numbers mean, what changed, what needs attention, and what should not be trusted blindly."
          },
          {
            week: "1",
            lesson: "2",
            date: "Wed, 8 Jul",
            time: "7:00-8:30 PM",
            title: "Spot Data Traps in Reports",
            description: "Visual tricks, cherry-picked periods, misleading charts, and selective reporting."
          },
          {
            week: "1",
            lesson: "3",
            date: "Thu, 9 Jul",
            time: "7:00-8:30 PM",
            title: "Ask Better Business Questions",
            description: "Move beyond \"send the report\" to structured inquiry: what changed, why, who is affected, and what is the decision?"
          }
        ]
      },
      {
        theme: "Week 2: Reading Dashboards, Metrics, & Prompt Engineering",
        sessions: [
          {
            week: "2",
            lesson: "4",
            date: "Mon, 13 Jul",
            time: "7:00-8:30 PM",
            title: "Read Dashboards Without Fear",
            description: "Leading vs. lagging indicators, what deserves attention, red herrings, and when to trust the trend."
          },
          {
            week: "2",
            lesson: "5",
            date: "Wed, 15 Jul",
            time: "7:00-8:30 PM",
            title: "Understand KPI Definitions",
            description: "Why teams report different numbers for the same metric, how to define metrics so everyone aligns, and which definition matters for your decision."
          },
          {
            week: "2",
            lesson: "6",
            date: "Thu, 16 Jul",
            time: "7:00-8:30 PM",
            title: "Master Prompt Engineering for Data",
            description: "Structure prompts that get real answers, not hallucinations. Use AI to summarize, challenge, explain, and avoid blind copying."
          }
        ]
      },
      {
        theme: "Week 3: Data Quality & Storytelling",
        sessions: [
          {
            week: "3",
            lesson: "7",
            date: "Mon, 20 Jul",
            time: "7:00-8:30 PM",
            title: "Read Metric Arguments Clearly",
            description: "Why metrics get calculated five different ways, how to define without fighting, and what is measured vs. what matters."
          },
          {
            week: "3",
            lesson: "8",
            date: "Wed, 22 Jul",
            time: "7:00-8:30 PM",
            title: "Recognize Data Quality Disasters",
            description: "Spot duplicates, missing values, wrong definitions, stale data, and errors before they damage decisions."
          },
          {
            week: "3",
            lesson: "9",
            date: "Thu, 23 Jul",
            time: "7:00-8:30 PM",
            title: "Turn Data into Clear Decisions",
            description: "Structure the story, communicate in language leaders can act on, and move from reporting to recommending."
          }
        ]
      },
      {
        theme: "Week 4: Application & Sustainability",
        sessions: [
          {
            week: "4",
            lesson: "10",
            date: "Mon, 27 Jul",
            time: "7:00-8:30 PM",
            title: "Build Business Cases from Data",
            description: "Frame evidence so choice is clear, answer \"what if we do nothing?\", and connect data to financial outcomes."
          },
          {
            week: "4",
            lesson: "11",
            date: "Wed, 29 Jul",
            time: "7:00-8:30 PM",
            title: "Lead Teams with Data",
            description: "Use metrics to align, not divide. Ask instead of tell, and know when data matters and when judgment takes over."
          },
          {
            week: "4",
            lesson: "12",
            date: "Thu, 30 Jul",
            time: "7:00-8:30 PM",
            title: "Apply AI + Prompts to Real Problems",
            description: "Take a messy business question, use AI prompting to analyze data, challenge outputs, build recommendations, and present."
          }
        ]
      }
    ],
    outcomes: ["Read reports with confidence: learn what to trust, what to question, and how to spot misleading data.", "Ask sharper questions: stop accepting summaries at face value and structure inquiry so you get the data you actually need.", "Turn data and AI outputs into decisions: transform numbers into business cases and persuade others to act on them.", "Build skills across Excel, dashboards, and AI assistants by understanding the thinking behind each tool.", "Define metrics so teams stop arguing about different versions of the same number.", "Recognize data quality issues before they damage a decision.", "Use AI to summarize, challenge, and explain data without outsourcing judgment.", "Communicate insights in language leaders and operators can act on."],
    tools: ["Excel", "Dashboards", "AI assistants", "Reports", "Scorecards"],
    projects: ["Project 1: The Audit - Spot 5 quality issues in a broken dashboard and propose fixes.", "Project 2: The Scenario Model - Build a 3-scenario Excel model and brief leadership on trade-offs.", "Project 3: The AI Extraction - Use AI to extract patterns from unstructured data, then validate and frame the limitations.", "Project 4: The Business Case - Gather data, structure an argument, and persuade stakeholders to act.", "Project 5: The Diagnosis - Decompose a metric drop, identify root causes, and recommend next steps."],
    roles: ["Operations manager", "Sales lead", "Finance assistant", "Program officer", "Any Leadership Role", "Business Intelligence Analyst"],
    demand: ["SMEs", "NGOs", "Operations", "Customer support", "Leadership", "Business teams"]
  }
];

export const projectTracks = [
  {
    id: "excel",
    title: "Data Analytics with Excel",
    summary: "Spreadsheet projects using familiar East African business contexts.",
    accent: "#2563eb",
    projects: [
      {
        sourceProjectId: "ex-01",
        slug: "safaricom-subscriber-tracker",
        title: "Safaricom Subscriber Tracker",
        company: "Safaricom PLC",
        companyTag: "NSE: SCOM",
        level: "Beginner",
        estimatedTime: "3-4 hrs",
        lessonsCovered: "Lessons 1-8",
        summary:
          "Build a clean workbook tracking mobile subscribers, M-Pesa users, home fibre, and revenue per user across five financial years.",
        skills: ["Excel navigation", "SUM and AVERAGE", "Cell formatting", "Bar and line charts"],
        learningOutcome: "Structure real business data and produce a chart-ready subscriber report.",
        dataSource: "Safaricom annual reports",
        deliverables: ["Formatted workbook", "Subscriber trend chart", "One-page insight summary"],
        rubric: ["Data structure", "Formula accuracy", "Chart clarity", "Business interpretation"]
      },
      {
        sourceProjectId: "ex-02",
        slug: "mpesa-revenue-analyser",
        title: "M-Pesa Revenue Analyser",
        company: "M-Pesa / Safaricom",
        companyTag: "M-Pesa Africa",
        level: "Intermediate",
        estimatedTime: "4-5 hrs",
        lessonsCovered: "Lessons 9-12",
        summary:
          "Use logic, lookups, conditional formatting, and charts to identify top revenue categories and weaker agent tiers.",
        skills: ["IF logic", "XLOOKUP", "Conditional formatting", "Combo charts"],
        learningOutcome: "Build a logic-driven Excel model that explains revenue movement.",
        dataSource: "M-Pesa segment disclosures",
        deliverables: ["Revenue model", "Flagged agent tiers", "Dashboard summary"],
        rubric: ["Lookup accuracy", "Risk flags", "Chart quality", "Recommendation quality"]
      },
      {
        sourceProjectId: "ex-03",
        slug: "kcb-loan-portfolio-analyser",
        title: "KCB Loan Portfolio Analyser",
        company: "KCB Group PLC",
        companyTag: "NSE: KCB",
        level: "Intermediate",
        estimatedTime: "5-6 hrs",
        lessonsCovered: "Lessons 13-16",
        summary:
          "Build a pivot-table model with calculated fields, NPL ratios, and a protected executive summary sheet.",
        skills: ["Pivot tables", "Calculated fields", "Data validation", "Workbook protection"],
        learningOutcome: "Use pivot tables to summarize a loan book and highlight portfolio risk.",
        dataSource: "KCB annual reports",
        deliverables: ["Pivot model", "NPL summary", "Executive sheet"],
        rubric: ["Pivot design", "Ratio accuracy", "Risk interpretation", "Professional formatting"]
      },
      {
        sourceProjectId: "ex-04",
        slug: "equity-bank-branch-performance-model",
        title: "Equity Bank Branch Performance Model",
        company: "Equity Group Holdings",
        companyTag: "NSE: EQTY",
        level: "Advanced",
        estimatedTime: "6-7 hrs",
        lessonsCovered: "Lessons 17-19",
        summary:
          "Create a branch ranking model with dynamic arrays, lookup logic, and country-level slicers.",
        skills: ["INDEX/MATCH", "Dynamic arrays", "Power Query", "Slicers"],
        learningOutcome: "Build an interactive branch performance report for managers.",
        dataSource: "Equity Group reports",
        deliverables: ["Branch ranking model", "Country slicers", "Management notes"],
        rubric: ["Model logic", "Interactivity", "Data cleaning", "Decision usefulness"]
      },
      {
        sourceProjectId: "ex-05",
        slug: "kenya-airways-route-profitability-dashboard",
        title: "Kenya Airways Route Profitability Dashboard",
        company: "Kenya Airways PLC",
        companyTag: "NSE: KQ",
        level: "Advanced",
        estimatedTime: "7-9 hrs",
        lessonsCovered: "Lessons 20-24",
        summary:
          "Model fuel-cost scenarios, break-even load factors, and a dynamic route profitability dashboard.",
        skills: ["Scenario Manager", "Goal Seek", "Named ranges", "Dashboard design"],
        learningOutcome: "Create a board-ready workbook for scenario planning.",
        dataSource: "Kenya Airways investor materials",
        deliverables: ["Scenario model", "Route dashboard", "Break-even memo"],
        rubric: ["Scenario logic", "Dashboard usability", "Financial reasoning", "Narrative clarity"]
      }
    ]
  },
  {
    id: "powerbi",
    title: "Business Analytics with Power BI",
    summary: "BI projects that turn operational data into management reports.",
    accent: "#7c3aed",
    projects: [
      {
        sourceProjectId: "pbi-01",
        slug: "retail-sales-performance-report",
        title: "Retail Sales Performance Report",
        company: "Duka Fresh",
        companyTag: "Kenyan Market",
        level: "Beginner",
        estimatedTime: "4-5 hrs",
        lessonsCovered: "Lessons 1-4",
        summary: "Connect retail data, build a star schema, and create an executive report with MTD, QTD, and YTD comparisons.",
        skills: ["Power Query", "Star schema", "Basic DAX", "Date tables"],
        learningOutcome: "Build a clean executive report from retail transactions.",
        dataSource: "Synthetic Kenyan retail dataset",
        deliverables: ["Data model", "Sales dashboard", "Executive summary"],
        rubric: ["Model structure", "DAX accuracy", "Visual clarity", "Executive usefulness"]
      },
      {
        sourceProjectId: "pbi-02",
        slug: "financial-pl-dashboard",
        title: "Financial P&L Dashboard",
        company: "Jua Kali Finance",
        companyTag: "Kenyan Market",
        level: "Intermediate",
        estimatedTime: "5-7 hrs",
        lessonsCovered: "Lessons 5-8",
        summary: "Model a profit and loss report with drill-through pages, dynamic titles, and time intelligence measures.",
        skills: ["DAX time intelligence", "Drill-through", "Bookmarks", "Dynamic titles"],
        learningOutcome: "Deliver a finance-grade P&L report in Power BI.",
        dataSource: "Synthetic P&L dataset",
        deliverables: ["P&L report", "Drill-through page", "Variance commentary"],
        rubric: ["DAX quality", "Navigation", "Finance logic", "Commentary"]
      },
      {
        sourceProjectId: "pbi-03",
        slug: "logistics-kpi-tracker",
        title: "Logistics KPI Tracker",
        company: "Swift Delivery",
        companyTag: "Kenyan Market",
        level: "Intermediate",
        estimatedTime: "5-6 hrs",
        lessonsCovered: "Lessons 9-12",
        summary: "Track on-time delivery rates, route efficiency, and driver performance across regions.",
        skills: ["Calculated columns", "RLS", "Maps", "KPI visuals"],
        learningOutcome: "Build an operations dashboard with location and performance signals.",
        dataSource: "Synthetic logistics dataset",
        deliverables: ["KPI dashboard", "Region map", "Driver performance notes"],
        rubric: ["KPI definitions", "Map clarity", "RLS setup", "Operational action"]
      },
      {
        sourceProjectId: "pbi-04",
        slug: "customer-segmentation-report",
        title: "Customer Segmentation Report",
        company: "Duka Smart",
        companyTag: "Kenyan Market",
        level: "Advanced",
        estimatedTime: "7-9 hrs",
        lessonsCovered: "Lessons 13-16",
        summary: "Use RFM analysis to segment customers and build a churn-risk dashboard with cohort analysis.",
        skills: ["Complex DAX", "RFM modelling", "Cohort analysis", "What-if parameters"],
        learningOutcome: "Build segmentation logic that supports targeted retention decisions.",
        dataSource: "Synthetic CRM dataset",
        deliverables: ["RFM model", "Churn dashboard", "Retention action list"],
        rubric: ["Segmentation logic", "DAX depth", "Cohort clarity", "Actionability"]
      }
    ]
  },
  {
    id: "ai-mastery",
    title: "AI Fluency for Business",
    summary: "Projects for people who need practical AI judgment, not hype.",
    accent: "#059669",
    projects: [
      {
        sourceProjectId: "ai-01",
        slug: "ai-tools-audit-for-your-role",
        title: "AI Tools Audit for Your Role",
        company: "Your Organisation",
        companyTag: "Any Industry",
        level: "Beginner",
        estimatedTime: "2-3 hrs",
        lessonsCovered: "Modules 1-2",
        summary: "Map 10 AI tools relevant to a real job function, then evaluate capability, risk, and ROI.",
        skills: ["AI tool evaluation", "Business framing", "ROI analysis", "Risk assessment"],
        learningOutcome: "Build a clear tool evaluation framework for any role.",
        dataSource: "No dataset required",
        deliverables: ["Tool map", "Risk notes", "ROI recommendation"],
        rubric: ["Tool fit", "Risk thinking", "Business clarity", "Recommendation strength"]
      },
      {
        sourceProjectId: "ai-02",
        slug: "prompt-engineering-workbook",
        title: "Prompt Engineering Workbook",
        company: "Cross-Industry",
        companyTag: "Any Role",
        level: "Beginner",
        estimatedTime: "3-4 hrs",
        lessonsCovered: "Modules 3-4",
        summary: "Complete structured prompting challenges across marketing, finance, HR, and operations.",
        skills: ["Prompt engineering", "Role prompting", "Output structuring", "Evaluation"],
        learningOutcome: "Write prompts that produce consistent professional outputs.",
        dataSource: "No dataset required",
        deliverables: ["Prompt workbook", "Before/after outputs", "Evaluation notes"],
        rubric: ["Prompt clarity", "Output quality", "Iteration", "Usefulness"]
      },
      {
        sourceProjectId: "ai-03",
        slug: "ai-strategy-memo",
        title: "AI Strategy Memo",
        company: "Fictional East African Company",
        companyTag: "East Africa",
        level: "Intermediate",
        estimatedTime: "4-5 hrs",
        lessonsCovered: "Modules 5-6",
        summary: "Write a concise AI adoption memo identifying high-impact use cases, risks, and rollout guardrails.",
        skills: ["Strategic thinking", "AI ethics", "Business writing", "Use-case design"],
        learningOutcome: "Advise leaders on AI adoption without overselling or exposing sensitive data.",
        dataSource: "No dataset required",
        deliverables: ["Strategy memo", "Risk register", "Use-case shortlist"],
        rubric: ["Strategic clarity", "Risk control", "Feasibility", "Writing quality"]
      }
    ]
  },
  {
    id: "ai-agents",
    title: "Agentic AI for Business",
    summary: "Automation projects for builders moving from prompts into systems.",
    accent: "#ea580c",
    projects: [
      {
        sourceProjectId: "ag-01",
        slug: "lead-qualification-agent",
        title: "Lead Qualification Agent",
        company: "n8n + OpenAI",
        companyTag: "Automation",
        level: "Intermediate",
        estimatedTime: "4-6 hrs",
        lessonsCovered: "Modules 1-2",
        summary: "Build a workflow that captures leads, scores them with AI, and routes qualified leads to a CRM.",
        skills: ["n8n workflows", "Webhooks", "OpenAI API", "CRM routing"],
        learningOutcome: "Ship a working AI agent that automates a sales process.",
        dataSource: "Workflow brief",
        deliverables: ["Workflow map", "Scoring prompt", "Handoff notes"],
        rubric: ["Workflow logic", "Scoring quality", "Guardrails", "Business fit"]
      },
      {
        sourceProjectId: "ag-02",
        slug: "document-summarisation-pipeline",
        title: "Document Summarisation Pipeline",
        company: "LangChain + Email",
        companyTag: "Automation",
        level: "Intermediate",
        estimatedTime: "5-7 hrs",
        lessonsCovered: "Modules 3-4",
        summary: "Create a pipeline that reads uploaded documents, extracts key insights, and sends a structured summary.",
        skills: ["PDF parsing", "Prompt chaining", "Email automation", "Quality checks"],
        learningOutcome: "Build a document intelligence flow that saves manual reading time.",
        dataSource: "Sample PDF documents",
        deliverables: ["Pipeline design", "Summary output", "Error handling notes"],
        rubric: ["Extraction quality", "Summary clarity", "Automation flow", "Reliability"]
      },
      {
        sourceProjectId: "ag-03",
        slug: "multi-agent-research-assistant",
        title: "Multi-Agent Research Assistant",
        company: "CrewAI",
        companyTag: "Agentic Systems",
        level: "Advanced",
        estimatedTime: "7-9 hrs",
        lessonsCovered: "Modules 5-6",
        summary: "Design a researcher, analyst, and writer agent system that produces business reports with review checkpoints.",
        skills: ["Agent roles", "Task chaining", "Tool use", "Output formatting"],
        learningOutcome: "Orchestrate multiple AI agents into one business research workflow.",
        dataSource: "No dataset required",
        deliverables: ["Agent map", "Workflow run", "Report sample"],
        rubric: ["Agent boundaries", "Task sequence", "Output quality", "Human review"]
      },
      {
        sourceProjectId: "ag-04",
        slug: "customer-support-bot",
        title: "Customer Support Bot",
        company: "OpenAI Assistants",
        companyTag: "Deployment",
        level: "Advanced",
        estimatedTime: "8-10 hrs",
        lessonsCovered: "Modules 7-8",
        summary: "Build a knowledge-based support bot with retrieval, memory, and handoff logic.",
        skills: ["RAG", "Memory", "Support workflows", "Deployment"],
        learningOutcome: "Design a production-aware AI support assistant with safe handoff.",
        dataSource: "Sample knowledge base",
        deliverables: ["Bot design", "Test transcript", "Handoff policy"],
        rubric: ["Retrieval quality", "Conversation safety", "Handoff clarity", "Deployment readiness"]
      }
    ]
  }
];

export const practiceLabProjects = [
  {
    sourceProjectId: "lab-01",
    slug: "nairobi-fmcg-sales-recovery",
    title: "Nairobi FMCG Sales Recovery",
    company: "RetailCo",
    companyTag: "Practice Lab",
    level: "Intermediate",
    estimatedTime: "3-5 hrs",
    lessonsCovered: "Practice",
    summary: "Find the territories and product groups pulling sales down, then recommend a recovery plan.",
    skills: ["Trend analysis", "Commercial reasoning", "Recommendation writing"],
    learningOutcome: "Turn a sales dataset into a recovery recommendation.",
    dataSource: "Synthetic FMCG dataset",
    datasetHref: "/downloads/datasets/nairobi-fmcg-sales-recovery.csv",
    walkthroughHref: "/downloads/walkthroughs/nairobi-fmcg-sales-recovery.md",
    deliverables: ["Cleaned dataset", "Trend analysis", "Recovery recommendation"],
    rubric: ["Accuracy", "Decision quality", "Clarity", "Business usefulness"]
  },
  {
    sourceProjectId: "lab-02",
    slug: "sme-cashflow-collections",
    title: "SME Cashflow and Collections",
    company: "FinanceCo",
    companyTag: "Practice Lab",
    level: "Intermediate",
    estimatedTime: "3-5 hrs",
    lessonsCovered: "Practice",
    summary: "Prioritize overdue accounts and build a collections plan that protects cashflow.",
    skills: ["Segmentation", "Financial reasoning", "Prioritization"],
    learningOutcome: "Explain which customers to call first and why.",
    dataSource: "Synthetic receivables dataset",
    datasetHref: "/downloads/datasets/sme-cashflow-collections.csv",
    walkthroughHref: "/downloads/walkthroughs/sme-cashflow-collections.md",
    deliverables: ["Aging summary", "Risk segmentation", "Collections action list"],
    rubric: ["Segmentation", "Financial reasoning", "Prioritization", "Communication"]
  },
  {
    sourceProjectId: "lab-03",
    slug: "customer-support-quality",
    title: "Customer Support Quality",
    company: "SupportCo",
    companyTag: "Practice Lab",
    level: "Beginner",
    estimatedTime: "2-4 hrs",
    lessonsCovered: "Practice",
    summary: "Analyze support tickets, quality scores, and response patterns to improve service.",
    skills: ["Data cleaning", "Pattern finding", "Operations recommendations"],
    learningOutcome: "Connect quality metrics to team coaching actions.",
    dataSource: "Synthetic support dataset",
    datasetHref: "/downloads/datasets/customer-support-quality.csv",
    walkthroughHref: "/downloads/walkthroughs/customer-support-quality.md",
    deliverables: ["Quality dashboard", "Root cause analysis", "Team coaching plan"],
    rubric: ["Data cleaning", "Pattern finding", "Recommendation quality", "Presentation"]
  },
  {
    sourceProjectId: "lab-04",
    slug: "product-growth-funnel",
    title: "Product Growth Funnel",
    company: "Analytics Co",
    companyTag: "Practice Lab",
    level: "Intermediate",
    estimatedTime: "3-5 hrs",
    lessonsCovered: "Practice",
    summary: "Measure conversion across signup, activation, trial, and paid customer steps.",
    skills: ["Funnels", "Metric definitions", "Experiment thinking"],
    learningOutcome: "Tie funnel drop-off to one practical growth move.",
    dataSource: "Synthetic product dataset",
    datasetHref: "/downloads/datasets/product-growth-funnel.csv",
    walkthroughHref: "/downloads/walkthroughs/product-growth-funnel.md",
    deliverables: ["Funnel table", "Drop-off analysis", "Growth experiment proposal"],
    rubric: ["Metric accuracy", "Experiment thinking", "Narrative", "Next-step clarity"]
  }
];

export const ubuntuProjects = [
  ...projectTracks.flatMap((track) =>
    track.projects.map((project, index) => ({
      ...project,
      track: track.id,
      trackTitle: track.title,
      displayOrder: index + 1,
      scoreBands: ["90-100: portfolio-ready", "75-89: strong with revisions", "60-74: needs coaching"],
      feedback: "Mentors review the submission for technical accuracy, business reasoning, and manager-ready communication."
    }))
  ),
  ...practiceLabProjects.map((project, index) => ({
    ...project,
    track: "practice-labs",
    trackTitle: "Practice Labs",
    displayOrder: index + 1,
    scoreBands: ["90-100: manager-ready", "75-89: strong with revisions", "60-74: needs coaching"],
    feedback: "Mentors check whether the final recommendation is specific enough for a manager to act on."
  }))
];

export const aiAssessmentQuestions = [
  {
    id: 1,
    text: "You are a Kenyan SME owner wanting to draft a localized marketing email for a Nairobi audience. Which prompting technique would yield the most culturally relevant result?",
    options: [
      "Act as a Kenyan digital marketer. Write an email for [Product] using local slang and professional English, targeting youth in Kilimani.",
      "Write a marketing email for [Product].",
      "Summarize this product description into an email.",
      "Write a sales pitch in the style of Shakespeare."
    ],
    correctIndex: 0,
    category: "Intermediate"
  },
  {
    id: 2,
    text: "Which AI tool is best suited for real-time market research, such as current maize prices in Nakuru or competitor pricing?",
    options: ["Midjourney", "ChatGPT without browsing", "A web-enabled research assistant", "A local spreadsheet only"],
    correctIndex: 2,
    category: "Intermediate"
  },
  {
    id: 3,
    text: "Under Kenya's Data Protection Act, what is a major risk when pasting customer phone numbers into a public AI tool?",
    options: ["The model refuses numbers", "Data leakage and privacy violation", "It costs too much", "The internet fails"],
    correctIndex: 1,
    category: "Intermediate"
  },
  {
    id: 4,
    text: "You want to automate customer support on a platform many African customers use daily. Which integration is most valuable?",
    options: ["Email only", "Slack bot", "Discord server", "WhatsApp Business API plus AI chatbot"],
    correctIndex: 3,
    category: "Intermediate"
  },
  {
    id: 5,
    text: "What is chain-of-thought style prompting trying to improve?",
    options: ["Long prompts with no punctuation", "Website linking", "Step-by-step reasoning", "Translation only"],
    correctIndex: 2,
    category: "Intermediate"
  },
  {
    id: 6,
    text: "Your AI invents a false fact about a Kenyan historical figure. What is this called?",
    options: ["Hallucination", "Temperature spiking", "Overfitting", "RAG"],
    correctIndex: 0,
    category: "Intermediate"
  },
  {
    id: 7,
    text: "Which of these is a generative AI task?",
    options: ["Storing files", "Sorting a sheet", "Summing a column", "Creating a logo or blog post from a prompt"],
    correctIndex: 3,
    category: "Intermediate"
  },
  {
    id: 8,
    text: "Why does context window matter when analyzing a long report?",
    options: ["It controls internet speed", "It limits how much text the AI can consider at once", "It changes theme color", "It is the monthly price"],
    correctIndex: 1,
    category: "Intermediate"
  },
  {
    id: 9,
    text: "Which tool category is specifically built for generating high-quality images from text?",
    options: ["Automation tools", "General chat only", "Code completion", "Image generation models"],
    correctIndex: 3,
    category: "Intermediate"
  },
  {
    id: 10,
    text: "What is the strongest way to protect a writing role in the age of AI?",
    options: ["Become an AI editor who adds strategy and context", "Refuse AI tools", "Type faster", "Use a typewriter"],
    correctIndex: 0,
    category: "Intermediate"
  },
  {
    id: 11,
    text: "What is the main difference between workflow automation and a true AI agent?",
    options: ["Automation follows fixed steps; an agent can reason about tools", "Automation is always cheaper", "Agents only work on phones", "Automation requires code"],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 12,
    text: "You are building an agent to process payments. Which tool would trigger an M-Pesa transaction?",
    options: ["A website link", "A Daraja API function call", "A text file", "A screenshot"],
    correctIndex: 1,
    category: "Advanced"
  },
  {
    id: 13,
    text: "In n8n, what does a webhook allow you to do?",
    options: ["Encrypt passwords", "Receive real-time data to trigger a workflow", "Design a landing page", "Format a spreadsheet"],
    correctIndex: 1,
    category: "Advanced"
  },
  {
    id: 14,
    text: "What does RAG allow an AI assistant to do for a law firm?",
    options: ["Search private legal documents before answering", "Generate random laws", "Only search foreign laws", "Approve legal action automatically"],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 15,
    text: "Why is an infinite loop risky in an AI support agent?",
    options: ["It can keep calling tools and burning API credits", "It becomes sentient", "It gives free products", "It improves internet speed"],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 16,
    text: "What is the role of a router in a multi-agent system?",
    options: ["Traffic controller between tasks or agents", "Wi-Fi setup", "Translation only", "Image generation"],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 17,
    text: "Which format is commonly used to pass structured data between an AI agent and an API?",
    options: ["JPEG", "PDF", "Word document", "JSON"],
    correctIndex: 3,
    category: "Advanced"
  },
  {
    id: 18,
    text: "Why is human-in-the-loop important for high-stakes tasks like loan approvals?",
    options: ["To prevent biased or costly errors", "Because AI cannot do math", "To slow everything down", "To keep the AI company"],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 19,
    text: "In an agent framework, what does memory usually provide?",
    options: ["Previous message or task context", "Laptop storage", "Training data from one year", "Processor speed"],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 20,
    text: "A ReAct agent follows which cycle?",
    options: ["Random, action, output", "Read, react, repeat", "Reason, act, observe", "Request, API, JSON"],
    correctIndex: 2,
    category: "Advanced"
  }
];

export const dataAssessmentQuestions = [
  {
    id: 1,
    category: "excel",
    topic: "SUMIF",
    text: "Amina tracks weekly M-Pesa agent commissions. Which formula totals commissions only above KES 5,000?",
    options: ['=SUMIF(B2:B51,">5000")', '=SUM(B2:B51>5000)', '=COUNTIF(B2:B51,">5000")', '=SUMIFS(B2:B51,"KES",5000)'],
    correctIndex: 0
  },
  {
    id: 2,
    category: "excel",
    topic: "Pivot Tables",
    text: "A manager wants monthly transaction totals by region from a flat table. What is the fastest Excel approach?",
    options: ["Manual SUMIF for every region", "Insert a PivotTable", "Use VLOOKUP only", "Copy each region into a separate sheet"],
    correctIndex: 1
  },
  {
    id: 3,
    category: "excel",
    topic: "Logical Functions",
    text: "Flag accounts where NPL ratio exceeds 15% and loan balance is above KES 500,000. Which function should combine both tests?",
    options: ["OR", "AND", "SWITCH only", "IFERROR only"],
    correctIndex: 1
  },
  {
    id: 4,
    category: "excel",
    topic: "Lookups",
    text: "Given product code in F2, which formula pulls a price from A:C where A has codes and C has prices?",
    options: ["=VLOOKUP(F2,A:B,2,FALSE)", "=HLOOKUP(F2,A:C,3,FALSE)", "=VLOOKUP(F2,A:C,3,FALSE)", "=INDEX(A:A,MATCH(F2,C:C,0))"],
    correctIndex: 2
  },
  {
    id: 5,
    category: "excel",
    topic: "Charts",
    text: "Which chart best shows revenue bars and contribution percentage trend together?",
    options: ["Two separate bar charts", "100% stacked bars", "Combo chart with a secondary-axis line", "Scatter plot only"],
    correctIndex: 2
  },
  {
    id: 6,
    category: "excel",
    topic: "Text Functions",
    text: "A staff name is 'KARIUKI, JAMES MWANGI'. Which approach extracts the given names after the comma and formats them?",
    options: ["LEFT before comma", "PROPER plus MID after comma", "LOWER only", "COUNTIF"],
    correctIndex: 1
  },
  {
    id: 7,
    category: "excel",
    topic: "Scenario Analysis",
    text: "Which Excel tool compares Base, High, and Stress fuel-cost scenarios without building separate models?",
    options: ["Data Validation", "Conditional Formatting", "Scenario Manager", "Freeze Panes"],
    correctIndex: 2
  },
  {
    id: 8,
    category: "powerbi",
    topic: "DAX",
    text: "Which DAX family helps compare this month with the same month last year?",
    options: ["Time intelligence functions", "RELATED only", "FORMAT only", "Sort by column"],
    correctIndex: 0
  },
  {
    id: 9,
    category: "powerbi",
    topic: "Modelling",
    text: "A transactions fact table joined to branch and product dimensions is what structure?",
    options: ["Flat table", "Star schema", "Random schema", "One-way export"],
    correctIndex: 1
  },
  {
    id: 10,
    category: "powerbi",
    topic: "Power Query",
    text: "How do you combine 12 same-structure store workbooks automatically?",
    options: ["Paste manually", "Get Data from Folder and combine files", "Use a slicer", "Use a text box"],
    correctIndex: 1
  },
  {
    id: 11,
    category: "powerbi",
    topic: "Maps",
    text: "Which visual shows delivery performance by county with color intensity?",
    options: ["Bar chart only", "Filled map", "Text box", "Card visual"],
    correctIndex: 1
  },
  {
    id: 12,
    category: "powerbi",
    topic: "RLS",
    text: "How do regional managers see only their own region without building separate reports?",
    options: ["Page filters only", "User-controlled slicers", "Row-Level Security", "Duplicate every report"],
    correctIndex: 2
  },
  {
    id: 13,
    category: "powerbi",
    topic: "Measures",
    text: "Why should Profit Margin % usually be a measure?",
    options: ["It recalculates by filter context", "It cannot be formatted", "Columns are always better", "It exports faster"],
    correctIndex: 0
  },
  {
    id: 14,
    category: "powerbi",
    topic: "Refresh",
    text: "What enables scheduled refresh from an on-premises SQL Server?",
    options: ["Manual export", "On-premises Data Gateway", "Screenshot", "Bookmarks"],
    correctIndex: 1
  },
  {
    id: 15,
    category: "sql",
    topic: "Aggregation",
    text: "Which SQL pattern returns total transaction amount per agent?",
    options: ["GROUP BY agent_id with SUM(amount)", "SELECT * only", "ORDER BY only", "DELETE duplicates"],
    correctIndex: 0
  },
  {
    id: 16,
    category: "sql",
    topic: "Joins",
    text: "You want all customers whether or not they have a loan. Which join starts from customers?",
    options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "Self JOIN"],
    correctIndex: 1
  },
  {
    id: 17,
    category: "sql",
    topic: "Pandas",
    text: "For monthly average stock prices, how might you handle a moderate number of missing close prices?",
    options: ["Drop the whole column", "Fill with zero blindly", "Impute with a sensible statistic after checking", "Ignore all missingness"],
    correctIndex: 2
  },
  {
    id: 18,
    category: "sql",
    topic: "Visualization",
    text: "Which Python charting approach suits publication-quality multi-line time series?",
    options: ["NumPy only", "Matplotlib or Seaborn line plot", "Plain print statements", "JSON only"],
    correctIndex: 1
  },
  {
    id: 19,
    category: "sql",
    topic: "Sorting",
    text: "Which SQL clause limits sorted results to the top five rows?",
    options: ["WHERE <= 5", "GROUP BY only", "ORDER BY total DESC LIMIT 5", "SELECT TOP with no order"],
    correctIndex: 2
  },
  {
    id: 20,
    category: "sql",
    topic: "Automation",
    text: "Which Python stack can pull data, calculate KPIs, email a report, and run every morning?",
    options: ["SQLAlchemy, Pandas, email library, scheduler", "A static screenshot", "Manual copy-paste", "Only PowerPoint"],
    correctIndex: 0
  }
];

export function recommendationForAssessment(path, answers) {
  const questions = path === "ai" ? aiAssessmentQuestions : dataAssessmentQuestions;
  const correct = answers.reduce((count, answer, index) => {
    return count + (answer === questions[index]?.correctIndex ? 1 : 0);
  }, 0);
  const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;

  if (path === "ai") {
    const courseSlug = score >= 70 ? "ai-agents-masterclass" : "ai-mastery";
    return {
      score,
      label: score >= 70 ? "AI Agent Builder" : "AI Fluency Learner",
      course: ubuntuCourses.find((course) => course.slug === courseSlug)
    };
  }

  const categoryScore = { excel: { correct: 0, total: 0 }, powerbi: { correct: 0, total: 0 }, sql: { correct: 0, total: 0 } };
  dataAssessmentQuestions.forEach((question, index) => {
    categoryScore[question.category].total += 1;
    if (answers[index] === question.correctIndex) {
      categoryScore[question.category].correct += 1;
    }
  });

  const ratio = (category) => categoryScore[category].correct / Math.max(categoryScore[category].total, 1);
  const excel = ratio("excel");
  const powerbi = ratio("powerbi");
  const sql = ratio("sql");

  if (sql > excel && sql > powerbi) {
    return {
      score,
      label: "SQL and Python Track",
      course: ubuntuCourses.find((course) => course.slug === "sql-for-analysts"),
      comingSoon: false
    };
  }

  const courseSlug = powerbi >= excel ? "powerbi-workshop" : "excel-workshop";
  return {
    score,
    label: powerbi >= excel ? "Power BI Builder" : "Excel Decision Builder",
    course: ubuntuCourses.find((course) => course.slug === courseSlug)
  };
}

export function courseBySlug(slug) {
  return ubuntuCourses.find((course) => course.slug === slug);
}
