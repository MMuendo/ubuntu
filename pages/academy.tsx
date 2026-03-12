import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  BarChart3,
  Brain,
  Zap,
  Calendar,
  Clock,
  Users,
  Play,
  Download,
  Lock,
  FolderOpen,
  ChevronRight,
  Star,
  BookOpen,
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { webinars, Webinar } from '../services/webinarsData';

// ─── Icon map ─────────────────────────────────────────────────────────────────
const courseIconMap: Record<string, React.ElementType> = {
  FileSpreadsheet,
  BarChart3,
  Brain,
  Zap,
};

// ─── Project data ─────────────────────────────────────────────────────────────
const projectTracks = [
  {
    id: 'excel',
    title: 'Data Thinking with Excel',
    icon: FileSpreadsheet,
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    glowColor: 'hover:shadow-blue-500/10',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    projects: [
      {
        id: 'ex-01',
        title: 'Kenyan Market Sales Dashboard',
        description: 'Build a dynamic sales dashboard for a Nairobi-based FMCG distributor using pivot tables, slicers, and conditional formatting.',
        level: 'Beginner',
        skills: ['Pivot Tables', 'Conditional Formatting', 'Charts'],
        estimatedTime: '3–4 hrs',
        file: 'excel-project-01-kenyan-sales-dashboard.xlsx',
      },
      {
        id: 'ex-02',
        title: 'HR Workforce Analytics Model',
        description: 'Analyse employee turnover, salary bands, and department costs using VLOOKUP, XLOOKUP, and structured Excel tables.',
        level: 'Intermediate',
        skills: ['XLOOKUP', 'Data Validation', 'Named Ranges'],
        estimatedTime: '4–5 hrs',
        file: 'excel-project-02-hr-workforce-analytics.xlsx',
      },
      {
        id: 'ex-03',
        title: 'Budget vs Actuals Tracker',
        description: 'Create a monthly budget tracker with variance analysis, automated traffic-light indicators, and an executive summary tab.',
        level: 'Intermediate',
        skills: ['IF/IFS Logic', 'Sparklines', 'Power Query Basics'],
        estimatedTime: '5–6 hrs',
        file: 'excel-project-03-budget-vs-actuals.xlsx',
      },
      {
        id: 'ex-04',
        title: 'Demand Forecasting Model',
        description: 'Build a 6-month demand forecast using moving averages, trend functions, and scenario analysis for a retail SKU.',
        level: 'Advanced',
        skills: ['FORECAST.ETS', 'Scenario Manager', 'Array Formulas'],
        estimatedTime: '6–8 hrs',
        file: 'excel-project-04-demand-forecasting.xlsx',
      },
    ],
  },
  {
    id: 'powerbi',
    title: 'Decision Systems with Power BI',
    icon: BarChart3,
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
    glowColor: 'hover:shadow-purple-500/10',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    projects: [
      {
        id: 'pbi-01',
        title: 'Retail Sales Performance Report',
        description: 'Connect to a retail dataset, build a star schema, and create an executive dashboard with MTD, QTD, and YTD comparisons.',
        level: 'Beginner',
        skills: ['Power Query', 'Star Schema', 'Basic DAX'],
        estimatedTime: '4–5 hrs',
        file: 'powerbi-project-01-retail-sales.pbix',
      },
      {
        id: 'pbi-02',
        title: 'Financial P&L Dashboard',
        description: 'Model a Profit & Loss statement in Power BI with drill-through pages, dynamic titles, and time intelligence DAX measures.',
        level: 'Intermediate',
        skills: ['DAX Time Intelligence', 'Drill-Through', 'Bookmarks'],
        estimatedTime: '5–7 hrs',
        file: 'powerbi-project-02-financial-pnl.pbix',
      },
      {
        id: 'pbi-03',
        title: 'Logistics & Delivery KPI Tracker',
        description: 'Track on-time delivery rates, route efficiency, and driver performance across regions for a logistics company.',
        level: 'Intermediate',
        skills: ['Calculated Columns', 'Row-Level Security', 'Maps'],
        estimatedTime: '5–6 hrs',
        file: 'powerbi-project-03-logistics-kpi.pbix',
      },
      {
        id: 'pbi-04',
        title: 'Customer Segmentation & Churn Report',
        description: 'Use RFM analysis to segment customers and build a churn risk dashboard with cohort analysis and trend indicators.',
        level: 'Advanced',
        skills: ['Complex DAX', 'RFM Modeling', 'Cohort Analysis'],
        estimatedTime: '7–9 hrs',
        file: 'powerbi-project-04-customer-segmentation.pbix',
      },
    ],
  },
  {
    id: 'ai-mastery',
    title: 'AI Fluency for Business Leaders',
    icon: Brain,
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    glowColor: 'hover:shadow-emerald-500/10',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    projects: [
      {
        id: 'ai-01',
        title: 'AI Tools Audit for Your Role',
        description: 'Map 10 AI tools relevant to your job function, evaluate their capabilities, risks, and ROI, and present your findings.',
        level: 'Beginner',
        skills: ['AI Tool Evaluation', 'Business Framing', 'Presentation'],
        estimatedTime: '2–3 hrs',
        file: 'ai-mastery-project-01-tools-audit.pdf',
      },
      {
        id: 'ai-02',
        title: 'Prompt Engineering Workbook',
        description: 'Complete 15 structured prompting challenges across marketing, finance, HR, and operations use cases using ChatGPT or Claude.',
        level: 'Beginner',
        skills: ['Prompt Engineering', 'Chain-of-Thought', 'Role Prompting'],
        estimatedTime: '3–4 hrs',
        file: 'ai-mastery-project-02-prompt-workbook.pdf',
      },
      {
        id: 'ai-03',
        title: 'AI Strategy Memo',
        description: 'Write a 2-page AI adoption strategy memo for a fictional East African company, identifying 3 high-impact AI use cases.',
        level: 'Intermediate',
        skills: ['Strategic Thinking', 'AI Ethics', 'Business Writing'],
        estimatedTime: '4–5 hrs',
        file: 'ai-mastery-project-03-strategy-memo.pdf',
      },
    ],
  },
  {
    id: 'ai-agents',
    title: 'Agentic Systems for Decision Automation',
    icon: Zap,
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
    glowColor: 'hover:shadow-orange-500/10',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    projects: [
      {
        id: 'ag-01',
        title: 'Lead Qualification Agent with n8n',
        description: 'Build an n8n workflow that captures leads from a form, scores them using AI, and routes qualified leads to a CRM via webhook.',
        level: 'Intermediate',
        skills: ['n8n Workflows', 'Webhooks', 'OpenAI API'],
        estimatedTime: '4–6 hrs',
        file: 'agents-project-01-lead-qualification.pdf',
      },
      {
        id: 'ag-02',
        title: 'Document Summarisation Pipeline',
        description: 'Create an agent that reads uploaded PDFs, extracts key insights, and sends a structured summary report via email.',
        level: 'Intermediate',
        skills: ['LangChain', 'PDF Parsing', 'Email Automation'],
        estimatedTime: '5–7 hrs',
        file: 'agents-project-02-doc-summarisation.pdf',
      },
      {
        id: 'ag-03',
        title: 'Multi-Agent Research Assistant',
        description: 'Design a CrewAI multi-agent system with a researcher agent, analyst agent, and writer agent that produces business reports.',
        level: 'Advanced',
        skills: ['CrewAI', 'Agent Roles', 'Tool Use'],
        estimatedTime: '7–9 hrs',
        file: 'agents-project-03-multi-agent-research.pdf',
      },
      {
        id: 'ag-04',
        title: 'Customer Support Bot Deployment',
        description: 'Build and deploy a knowledge-based customer support chatbot using OpenAI Assistants API, with memory and handoff logic.',
        level: 'Advanced',
        skills: ['OpenAI Assistants', 'RAG', 'Deployment'],
        estimatedTime: '8–10 hrs',
        file: 'agents-project-04-support-bot.pdf',
      },
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Advanced: 'text-red-400 bg-red-500/10 border-red-500/20',
};

// ─── Component ────────────────────────────────────────────────────────────────
const AcademyPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [activeTrack, setActiveTrack] = React.useState('excel');
  const [isLoggedIn] = React.useState(false); // replace with real auth state
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

  // ─── Courses ──────────────────────────────────────────────────────────────
  const enhancedCourses = [
    {
      id: 'excel-workshop',
      title: 'Data Thinking with Excel',
      level: 'Foundation',
      description:
        'Learn how to structure problems, think analytically, and make better decisions using data',
      price: 20000,
      duration: '3 months',
      tags: ['Data Analysis', 'Productivity', '3 Months'],
      icon: FileSpreadsheet,
      includes: [
        'Advanced Excel formulas and logic',
        'Power Query and Power Pivot foundations',
        'Business problem structuring frameworks',
        'Decision-ready Excel models',
      ],
      gradient: 'from-blue-500/10 to-cyan-500/10',
      accentColor: 'text-blue-400',
    },
    {
      id: 'powerbi-workshop',
      title: 'Decision Systems with Power BI',
      level: 'Core',
      description:
        'Turn data into decision-ready dashboards and decision systems leaders trust and actually use.',
      price: 25000,
      duration: '3 months',
      tags: ['BI', 'Visualization', '3 Months'],
      icon: BarChart3,
      includes: [
        'Power Query data transformation',
        'Star-schema data modelling',
        'DAX measures and time intelligence',
        'Executive-ready Power BI dashboards',
      ],
      gradient: 'from-purple-500/10 to-pink-500/10',
      accentColor: 'text-purple-400',
    },
    {
      id: 'ai-mastery',
      title: 'AI Fluency for Business Leaders',
      level: 'AI Mastery',
      description:
        'Understand how to use AI confidently and responsibly to improve decisions, productivity, and strategy.',
      price: 7500,
      duration: '1 month',
      tags: ['AI Fluency', 'Prompting', '1 Month'],
      icon: Brain,
      includes: [
        'How modern AI systems think',
        'Prompt engineering for real work',
        'AI tools and workflows',
        'Responsible, career-driven AI usage',
      ],
      gradient: 'from-emerald-500/10 to-teal-500/10',
      accentColor: 'text-emerald-400',
    },
    {
      id: 'ai-agents-masterclass',
      title: 'Agentic Systems for Decision Automation',
      level: 'Advanced',
      description:
        'Design AI systems that support decision-making, execution, and scale across the business.',
      price: 12500,
      duration: '1 month',
      tags: ['Agentic AI', 'Automation', '1 Month'],
      icon: Zap,
      includes: [
        'AI agent design fundamentals',
        'n8n Automation, APIs, and Agentic Workflows',
        'Knowledge, memory, and tools',
        'Deploying agents across channels',
      ],
      gradient: 'from-orange-500/10 to-red-500/10',
      accentColor: 'text-orange-400',
    },
  ];

  // ─── Handle download ──────────────────────────────────────────────────────
  const handleDownload = (fileName: string) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    // TODO: wire up real download URL
    console.log(`Downloading: ${fileName}`);
  };

  // ─── Webinar Card ─────────────────────────────────────────────────────────
  const WebinarCard = ({ webinar }: { webinar: Webinar }) => {
    const isCompleted = webinar.status === 'completed';

    return (
      <div className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-purple-500/20 rounded-2xl p-6 flex flex-col hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border text-gray-400 bg-white/5 border-white/10">
            Completed
          </span>
          <div className="flex items-center gap-1.5">
            <Play className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-500 font-medium">{webinar.duration}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-snug">
          {webinar.title}
        </h3>
        <p className="text-sm text-gray-400 mb-5 leading-relaxed flex-1">
          {webinar.shortDescription}
        </p>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span>{webinar.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>{webinar.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Users className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              Host: <span className="text-gray-300">{webinar.host}</span>
            </span>
          </div>
        </div>

        <Link
          to={`/webinar/${webinar.id}`}
          className="w-full bg-gradient-to-r from-purple-500/10 to-purple-500/5 hover:from-purple-500 hover:to-purple-600 text-purple-400 hover:text-white border border-purple-500/30 hover:border-purple-500 rounded-lg px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn"
        >
          Watch Recording
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  };

  const currentTrack = projectTracks.find((t) => t.id === activeTrack)!;

  return (
    <div className="bg-[#18100F] min-h-screen">

      {/* ── LOGIN PROMPT MODAL ──────────────────────────────────────────────── */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#1a1210] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center relative">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>
            <div className="w-14 h-14 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-brand-cyan" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sign In to Download</h3>
            <p className="text-sm text-gray-400 mb-6">
              Project files are available to enrolled students. Please sign in to access your downloads.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowLoginPrompt(false); navigate('/login'); }}
                className="w-full py-3 bg-brand-cyan text-brand-dark rounded-lg font-bold hover:bg-cyan-300 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => { setShowLoginPrompt(false); navigate('/register'); }}
                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-cyan/10" />
        </div>

        <div className="absolute top-20 left-10 bg-brand-dark/80 backdrop-blur-md rounded-lg p-4 border border-white/10 animate-float z-10 hidden md:block">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-brand-cyan" />
            <span className="text-xs text-gray-400">AI-Powered Learning</span>
          </div>
        </div>

        <div
          className="absolute bottom-32 right-10 bg-brand-dark/80 backdrop-blur-md rounded-lg p-4 border border-white/10 animate-float z-10 hidden md:block"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-purple" />
            <span className="text-xs text-gray-400">500+ Students</span>
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
              Ubuntu Academy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Transform your career with world-class training in Data Analytics, AI, and Agentic
            Systems. From Excel fundamentals to advanced AI automation—build skills that matter.
          </p>

          {/* ── Section Nav Pills ── */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
            <a
              href="#courses"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-brand-cyan/10 border border-white/10 hover:border-brand-cyan/40 text-gray-300 hover:text-brand-cyan rounded-full text-sm font-semibold transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              Learning Pathways
            </a>
            <a
              href="#webinars"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/40 text-gray-300 hover:text-purple-400 rounded-full text-sm font-semibold transition-all duration-200"
            >
              <Play className="w-4 h-4" />
              Webinars
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-orange-500/10 border border-white/10 hover:border-orange-500/40 text-gray-300 hover:text-orange-400 rounded-full text-sm font-semibold transition-all duration-200"
            >
              <FolderOpen className="w-4 h-4" />
              Projects
            </a>
          </div>
        </div>
      </section>

      {/* ── COURSES ──────────────────────────────────────────────────────────── */}
      <section id="courses" className="py-20 bg-[#18100F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-brand-cyan text-xs md:text-sm font-semibold tracking-wider uppercase bg-brand-cyan/10 px-4 py-2 rounded-full border border-brand-cyan/20">
                Learning Pathways
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent px-4">
              From Tools to Thinking
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Pathways for professionals ready to influence decisions, not just learn skills.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {enhancedCourses.map((course) => {
                const IconComponent = course.icon;
                return (
                  <div
                    key={course.id}
                    className={`bg-gradient-to-br ${course.gradient} backdrop-blur-sm bg-gray-900/40 border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col hover:border-brand-cyan/50 hover:shadow-lg hover:shadow-brand-cyan/10 transition-all duration-300 group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 via-brand-cyan/0 to-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="mb-4 flex items-center justify-between">
                        <span className={`text-xs font-bold ${course.accentColor} uppercase tracking-wider bg-white/5 px-2 md:px-3 py-1.5 rounded-lg border border-white/10`}>
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${course.accentColor}`} />
                          <span className="text-xs text-gray-500 font-medium">{course.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 mb-6 leading-relaxed">
                        {course.description}
                      </p>
                      <div className="mb-6 space-y-2 md:space-y-2.5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          What is Included
                        </p>
                        {course.includes.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 md:w-4 md:h-4 ${course.accentColor} mt-0.5 flex-shrink-0`} />
                            <span className="text-xs text-gray-400 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mb-4 pt-4 border-t border-white/5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">
                            KES {course.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">/ {course.duration}</span>
                        </div>
                      </div>
                      <Link
                        to={`/course/${course.id}`}
                        className="w-full bg-gradient-to-r from-brand-cyan/10 to-brand-cyan/5 hover:from-brand-cyan hover:to-brand-cyan/80 text-brand-cyan hover:text-black border border-brand-cyan/30 hover:border-brand-cyan rounded-lg px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn"
                      >
                        More Details
                        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── WEBINARS ─────────────────────────────────────────────────────────── */}
      <section id="webinars" className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-purple-400 text-xs md:text-sm font-semibold tracking-wider uppercase bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                Free Webinars
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent px-4">
              Learn Before You Commit
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Join our free webinars to explore data analytics and AI. Get a taste of what we teach
              before enrolling.
            </p>
          </div>

          {/* All webinars shown as completed */}
          {webinars.some((w) => w.status === 'completed') && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6 text-center">
                Past Webinars
              </p>
              <div
                className={`grid gap-6 ${
                  webinars.filter((w) => w.status === 'completed').length === 1
                    ? 'max-w-md mx-auto'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {webinars.map((w) => (
                  <WebinarCard key={w.id} webinar={{ ...w, status: 'completed' }} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 max-w-2xl mx-auto p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 animate-pulse flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-purple-400">Pro tip:</span> Attend any live
                webinar to unlock an exclusive{' '}
                <span className="text-white font-semibold">10% discount</span> on any course enrollment!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-orange-400 text-xs md:text-sm font-semibold tracking-wider uppercase bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                Hands-On Projects
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent px-4">
              Practice What You Learn
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Real-world projects for every course. Download, complete, and submit to build a portfolio that proves your skills.
            </p>
          </div>

          {/* Login nudge for guests */}
          {!isLoggedIn && (
            <div className="max-w-2xl mx-auto mb-10 p-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl flex items-center gap-4">
              <Lock className="w-5 h-5 text-brand-cyan flex-shrink-0" />
              <p className="text-sm text-gray-300 flex-1">
                <span className="text-brand-cyan font-semibold">Sign in</span> to download project files. New here?{' '}
                <button onClick={() => navigate('/register')} className="text-brand-cyan underline underline-offset-2 font-semibold">
                  Create a free account
                </button>
              </p>
            </div>
          )}

          {/* Track tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {projectTracks.map((track) => {
              const Icon = track.icon;
              const isActive = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                    isActive
                      ? `${track.bgColor} ${track.accentColor} ${track.borderColor}`
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? track.accentColor : ''}`} />
                  <span className="hidden sm:inline">{track.title}</span>
                  <span className="sm:hidden">{track.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Track header */}
          <div className={`mb-8 p-5 rounded-2xl border ${currentTrack.borderColor} ${currentTrack.bgColor} flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${currentTrack.bgColor} border ${currentTrack.borderColor} flex items-center justify-center flex-shrink-0`}>
              <currentTrack.icon className={`w-6 h-6 ${currentTrack.accentColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400">{currentTrack.projects.length} projects available — from beginner to advanced</p>
            </div>
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentTrack.projects.map((project, idx) => (
              <div
                key={project.id}
                className={`group bg-gray-900/40 border border-white/8 hover:${currentTrack.borderColor} rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg ${currentTrack.glowColor} transition-all duration-300 relative overflow-hidden`}
              >
                {/* subtle glow */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 ${currentTrack.bgColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 font-mono">#{String(idx + 1).padStart(2, '0')}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${levelColors[project.level]}`}>
                        {project.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {project.estimatedTime}
                    </div>
                  </div>

                  {/* Title & description */}
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-white transition-colors leading-snug">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.skills.map((skill) => (
                      <span key={skill} className="text-xs text-gray-500 bg-white/5 border border-white/8 px-2.5 py-1 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Download button */}
                  <button
                    onClick={() => handleDownload(project.file)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                      isLoggedIn
                        ? `${currentTrack.bgColor} ${currentTrack.accentColor} ${currentTrack.borderColor} hover:opacity-80`
                        : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/8 hover:text-gray-300 cursor-pointer'
                    }`}
                  >
                    {isLoggedIn ? (
                      <>
                        <Download className="w-4 h-4" />
                        Download Project
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Sign In to Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-10 max-w-2xl mx-auto p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <Star className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-orange-400">Build your portfolio:</span> Complete projects and submit them for instructor review to earn a certificate of completion for each course track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Career?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join hundreds of professionals who have already started their journey in data and AI
                with Ubuntu Academy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#courses"
                  className="px-8 py-4 bg-brand-cyan text-brand-dark rounded-full font-bold text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                >
                  Browse Courses
                </a>
                <button
                  onClick={() => navigate('/assessment')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Take Skills Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademyPage;
