import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, FileSpreadsheet, BarChart3, Brain, Zap,
  Calendar, Clock, Users, Play, Download, Lock, FolderOpen, Star,
  BookOpen, Upload, CheckCircle, Eye,
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { webinars } from '../services/webinarsData';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  title: string;
  company: string;
  companyTag: string;
  description: string;
  level: string;
  estimatedTime: string;
  skills: string[];
  learningOutcome: string;
  dataSource: string;
  datasetFile: string | null;
  taskFile: string | null;
}

interface Track {
  id: string;
  title: string;
  icon: React.ElementType;
  accentColor: string;
  borderColor: string;
  bgColor: string;
  hoverBorder: string;
  projects: Project[];
}

// ─── Static data (outside component — never recreated) ────────────────────────
const projectTracks: Track[] = [
  {
    id: 'excel',
    title: 'Data Analytics with Excel',
    icon: FileSpreadsheet,
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    hoverBorder: 'hover:border-blue-500/60',
    projects: [
      {
        id: 'ex-01',
        title: 'Ubuntu AnalytIQ: Safaricom Subscriber Tracker',
        company: 'Safaricom PLC',
        companyTag: 'NSE: SCOM',
        description:
          "Using Safaricom's publicly reported subscriber data (2020–2024), build a clean, well-formatted workbook tracking mobile subscribers, M-Pesa users, home fibre, and revenue per user across five financial years.",
        lessonsCovered: 'Lessons 1–8',
        level: 'Beginner',
        estimatedTime: '3–4 hrs',
        skills: ['Excel Interface & Navigation', 'Data Entry & Cell Formatting', 'SUM, AVERAGE, COUNT', 'Absolute vs Relative References', 'Bar & Line Charts', 'Print Area & Page Layout'],
        learningOutcome: 'You will confidently navigate Excel, structure real business data, write your first formulas, and produce a chart-ready subscriber report.',
        dataSource: 'Safaricom Annual Report FY2024 (safaricom.co.ke)',
        datasetFile: 'Ubuntu%20Analytiq%20-%20Safaricom%20Dataset.xlsx',
        taskFile: 'Ubuntu%20Analytiq%20-%20Safaricom%20task.docx',
      },
      {
        id: 'ex-02',
        title: 'Ubuntu AnalytIQ: M-Pesa Revenue Analyser',
        company: 'M-Pesa / Safaricom',
        companyTag: 'M-Pesa Africa',
        description:
          'M-Pesa processed over KES 36 trillion in transactions in FY2023. Using published revenue and transaction-volume figures, apply conditional formatting, logical functions, and lookup formulas to identify top revenue categories and flag underperforming agent tiers.',
        lessonsCovered: 'Lessons 9–12',
        level: 'Intermediate',
        estimatedTime: '4–5 hrs',
        skills: ['Conditional Formatting', 'IF, AND, OR Logic', 'VLOOKUP & XLOOKUP', 'LEFT, RIGHT, CONCATENATE', 'Combo Charts', 'Sparklines'],
        learningOutcome: 'You will move beyond basic Excel — writing logic-driven formulas, building lookup models, and producing a multi-series chart dashboard from real fintech data.',
        dataSource: 'Safaricom Annual Report FY2024 — M-Pesa segment disclosures',
        datasetFile: 'Ubuntu%20Analytiq%20-%20M-pesa%20Dataset.xlsx',
        taskFile: 'Ubuntu%20Analytiq%20-%20M-pesa%20task.docx',
      },
      {
        id: 'ex-03',
        title: 'Ubuntu AnalytIQ: KCB Loan Portfolio Analyser',
        company: 'KCB Group PLC',
        companyTag: 'NSE: KCB',
        description:
          "KCB Group holds one of East Africa's largest loan books at over KES 900 billion. Using published loan portfolio data segmented by retail, SME, corporate, and regional subsidiaries, build a pivot-table model with calculated fields, NPL ratios, and a protected executive summary sheet.",
        lessonsCovered: 'Lessons 13–16',
        level: 'Intermediate',
        estimatedTime: '5–6 hrs',
        skills: ['Pivot Tables', 'Calculated Fields & Items', 'Data Grouping', 'Advanced Data Validation', 'Sheet & Workbook Protection', 'Recording a Basic Macro'],
        learningOutcome: 'You will master pivot tables — the single most powerful Excel skill for analysts — and learn to lock down your work for professional delivery.',
        dataSource: 'KCB Group Annual Report & Financial Statements 2023 (kcbgroup.com)',
        datasetFile: 'ex-03-kcb-dataset.xlsx',
        taskFile: 'ex-03-kcb-task.pdf',
      },
      {
        id: 'ex-04',
        title: 'Ubuntu AnalytIQ: Equity Bank Branch Performance Model',
        company: 'Equity Group Holdings',
        companyTag: 'NSE: EQTY',
        description:
          'Equity Bank operates 350+ branches across Kenya, Uganda, Tanzania, Rwanda, DRC, and South Sudan. Using published country-level revenue, loan, and customer count data, build a dynamic performance ranking model with INDEX/MATCH, FILTER arrays, and a pivot chart with slicers for country-level drill-down.',
        lessonsCovered: 'Lessons 17–19',
        level: 'Advanced',
        estimatedTime: '6–7 hrs',
        skills: ['INDEX & MATCH', 'Dynamic Arrays (FILTER, SORT)', 'Nested IF & IFS', 'Power Query Basics', 'Advanced Pivot Charts', 'Slicers & Timelines'],
        learningOutcome: 'You will write formulas that analysts use daily, build self-updating models with dynamic arrays, and create an interactive pivot dashboard executives can slice by country.',
        dataSource: 'Equity Group Holdings Annual Report 2023 (equitygroupholdings.com)',
        datasetFile: 'ex-04-equity-dataset.xlsx',
        taskFile: 'ex-04-equity-task.pdf',
      },
      {
        id: 'ex-05',
        title: 'Ubuntu AnalytIQ: Kenya Airways Route Profitability Dashboard',
        company: 'Kenya Airways PLC',
        companyTag: 'NSE: KQ',
        description:
          "Kenya Airways publishes route-level passenger revenue and load factor data. Build a fully dynamic dashboard using Scenario Manager to model fuel-cost shocks, Goal Seek to find break-even load factors, and a VBA button that refreshes and formats the report in one click.",
        lessonsCovered: 'Lessons 20–24',
        level: 'Advanced',
        estimatedTime: '7–9 hrs',
        skills: ['Scenario Manager & What-If Analysis', 'Goal Seek & Solver', 'Dynamic Charts with Named Ranges', 'Form Controls & Slicers', 'VBA Macro Automation', 'Dashboard Design Principles'],
        learningOutcome: 'Your capstone project. You will build a board-ready dashboard that auto-refreshes, models financial scenarios, and runs VBA scripts — the full advanced Excel toolkit.',
        dataSource: 'Kenya Airways Annual Report & Investor Presentation 2023 (kenya-airways.com)',
        datasetFile: 'ex-05-kenya-airways-dataset.xlsx',
        taskFile: 'ex-05-kenya-airways-task.pdf',
      },
    ],
  },
  {
    id: 'powerbi',
    title: 'Business Analytics with Power BI',
    icon: BarChart3,
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
    hoverBorder: 'hover:border-purple-500/60',
    projects: [
      { id: 'pbi-01', title: 'Ubuntu AnalytIQ: Retail Sales Performance Report', company: 'Retail Dataset', companyTag: 'Kenyan Market', description: 'Connect to a retail dataset, build a star schema, and create an executive dashboard with MTD, QTD, and YTD comparisons.', lessonsCovered: 'Lessons 1–4', level: 'Beginner', estimatedTime: '4–5 hrs', skills: ['Power Query', 'Star Schema', 'Basic DAX', 'Date Tables', 'Bar Charts'], learningOutcome: 'Load and shape data in Power Query, build your first star schema, and produce a clean executive report.', dataSource: 'Fictional Kenyan retail dataset', datasetFile: 'pbi-01-retail-dataset.xlsx', taskFile: 'pbi-01-retail-task.pdf' },
      { id: 'pbi-02', title: 'Ubuntu AnalytIQ: Financial P&L Dashboard', company: 'Finance Dataset', companyTag: 'Kenyan Market', description: 'Model a Profit & Loss statement in Power BI with drill-through pages, dynamic titles, and time intelligence DAX measures.', lessonsCovered: 'Lessons 5–8', level: 'Intermediate', estimatedTime: '5–7 hrs', skills: ['DAX Time Intelligence', 'Drill-Through', 'Bookmarks', 'Dynamic Titles'], learningOutcome: 'Write time intelligence DAX, build drill-through navigation, and deliver a finance-grade P&L report.', dataSource: 'Fictional P&L dataset', datasetFile: 'pbi-02-finance-dataset.xlsx', taskFile: 'pbi-02-finance-task.pdf' },
      { id: 'pbi-03', title: 'Ubuntu AnalytIQ: Logistics KPI Tracker', company: 'Logistics Dataset', companyTag: 'Kenyan Market', description: 'Track on-time delivery rates, route efficiency, and driver performance across regions.', lessonsCovered: 'Lessons 9–12', level: 'Intermediate', estimatedTime: '5–6 hrs', skills: ['Calculated Columns', 'Row-Level Security', 'Maps', 'KPI Visuals'], learningOutcome: 'Build a map-enabled operations dashboard with RLS and KPI card visuals.', dataSource: 'Fictional logistics dataset', datasetFile: 'pbi-03-logistics-dataset.xlsx', taskFile: 'pbi-03-logistics-task.pdf' },
      { id: 'pbi-04', title: 'Ubuntu AnalytIQ: Customer Segmentation Report', company: 'CRM Dataset', companyTag: 'Kenyan Market', description: 'Use RFM analysis to segment customers and build a churn risk dashboard with cohort analysis.', lessonsCovered: 'Lessons 13–16', level: 'Advanced', estimatedTime: '7–9 hrs', skills: ['Complex DAX', 'RFM Modeling', 'Cohort Analysis', 'What-If Parameters'], learningOutcome: 'Master complex DAX, build RFM segmentation logic, and deliver a churn-risk dashboard executives trust.', dataSource: 'Fictional CRM dataset', datasetFile: 'pbi-04-crm-dataset.xlsx', taskFile: 'pbi-04-crm-task.pdf' },
    ],
  },
  {
    id: 'ai-mastery',
    title: 'AI Fluency for Business',
    icon: Brain,
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    hoverBorder: 'hover:border-emerald-500/60',
    projects: [
      { id: 'ai-01', title: 'Ubuntu AnalytIQ: AI Tools Audit for Your Role', company: 'Your Organisation', companyTag: 'Any Industry', description: 'Map 10 AI tools relevant to your job function, evaluate their capabilities, risks, and ROI.', lessonsCovered: 'Module 1–2', level: 'Beginner', estimatedTime: '2–3 hrs', skills: ['AI Tool Evaluation', 'Business Framing', 'ROI Analysis', 'Risk Assessment'], learningOutcome: 'You will have a clear map of AI tools for your role and a framework for evaluating any new tool.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-01-tools-audit-task.pdf' },
      { id: 'ai-02', title: 'Ubuntu AnalytIQ: Prompt Engineering Workbook', company: 'Cross-Industry', companyTag: 'Any Role', description: 'Complete 15 structured prompting challenges across marketing, finance, HR, and operations.', lessonsCovered: 'Module 3–4', level: 'Beginner', estimatedTime: '3–4 hrs', skills: ['Prompt Engineering', 'Chain-of-Thought', 'Role Prompting', 'Output Structuring'], learningOutcome: 'You will write prompts that get consistent, professional-grade AI outputs for real business tasks.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-02-prompt-workbook-task.pdf' },
      { id: 'ai-03', title: 'Ubuntu AnalytIQ: AI Strategy Memo', company: 'Fictional EA Company', companyTag: 'East Africa', description: 'Write a 2-page AI adoption strategy memo for a fictional East African company, identifying 3 high-impact use cases.', lessonsCovered: 'Module 5–6', level: 'Intermediate', estimatedTime: '4–5 hrs', skills: ['Strategic Thinking', 'AI Ethics', 'Business Writing', 'Use Case Design'], learningOutcome: 'You will confidently advise leadership on AI adoption — the skill that separates AI-fluent professionals from the rest.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-03-strategy-memo-task.pdf' },
    ],
  },
  {
    id: 'ai-agents',
    title: 'Agentic AI for Business',
    icon: Zap,
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
    hoverBorder: 'hover:border-orange-500/60',
    projects: [
      { id: 'ag-01', title: 'Ubuntu AnalytIQ: Lead Qualification Agent', company: 'n8n + OpenAI', companyTag: 'Automation', description: 'Build an n8n workflow that captures leads, scores them using AI, and routes qualified leads to a CRM via webhook.', lessonsCovered: 'Module 1–2', level: 'Intermediate', estimatedTime: '4–6 hrs', skills: ['n8n Workflows', 'Webhooks', 'OpenAI API', 'CRM Integration'], learningOutcome: 'You will ship a working AI agent that automates a real sales process end-to-end.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ag-01-lead-agent-task.pdf' },
      { id: 'ag-02', title: 'Ubuntu AnalytIQ: Document Summarisation Pipeline', company: 'LangChain + Email', companyTag: 'Automation', description: 'Create an agent that reads uploaded PDFs, extracts key insights, and sends a structured summary report via email.', lessonsCovered: 'Module 3–4', level: 'Intermediate', estimatedTime: '5–7 hrs', skills: ['LangChain', 'PDF Parsing', 'Email Automation', 'Prompt Chaining'], learningOutcome: 'Build a document intelligence pipeline that saves hours of manual reading every week.', dataSource: 'Sample PDF documents provided', datasetFile: 'ag-02-sample-docs.zip', taskFile: 'ag-02-doc-pipeline-task.pdf' },
      { id: 'ag-03', title: 'Ubuntu AnalytIQ: Multi-Agent Research Assistant', company: 'CrewAI', companyTag: 'Agentic Systems', description: 'Design a CrewAI system with a researcher, analyst, and writer agent that produces business reports autonomously.', lessonsCovered: 'Module 5–6', level: 'Advanced', estimatedTime: '7–9 hrs', skills: ['CrewAI', 'Agent Roles & Tools', 'Task Chaining', 'Output Formatting'], learningOutcome: 'Orchestrate multiple AI agents working together — one of the most in-demand skills in enterprise AI.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ag-03-multiagent-task.pdf' },
      { id: 'ag-04', title: 'Ubuntu AnalytIQ: Customer Support Bot', company: 'OpenAI Assistants', companyTag: 'Deployment', description: 'Build and deploy a knowledge-based customer support chatbot using OpenAI Assistants API with memory and handoff logic.', lessonsCovered: 'Module 7–8', level: 'Advanced', estimatedTime: '8–10 hrs', skills: ['OpenAI Assistants API', 'RAG', 'Memory & Context', 'Bot Deployment'], learningOutcome: 'A fully deployed, production-ready AI support agent with retrieval-augmented generation.', dataSource: 'Sample knowledge base provided', datasetFile: 'ag-04-knowledge-base.zip', taskFile: 'ag-04-support-bot-task.pdf' },
    ],
  },
];

const enhancedCourses = [
  { id: 'excel-workshop',        title: 'Data Analytics with Excel',          level: 'Foundation', description: 'Learn how to structure problems, think analytically, and make better decisions using data.', price: 20000, duration: '3 months', Icon: FileSpreadsheet, includes: ['Advanced Excel formulas and logic', 'Power Query and Power Pivot foundations', 'Business problem structuring frameworks', 'Decision-ready Excel models'],        gradient: 'from-blue-500/10 to-cyan-500/10',    accent: 'text-blue-400',    hoverBorder: 'hover:border-blue-400/60',    hoverShadow: 'hover:shadow-blue-500/10' },
  { id: 'powerbi-workshop',      title: 'Business Analytics with Power BI',   level: 'Core',       description: 'Turn data into decision-ready dashboards and decision systems leaders trust and actually use.',        price: 25000, duration: '3 months', Icon: BarChart3,      includes: ['Power Query data transformation', 'Star-schema data modelling', 'DAX measures and time intelligence', 'Executive-ready Power BI dashboards'],    gradient: 'from-purple-500/10 to-pink-500/10',  accent: 'text-purple-400',  hoverBorder: 'hover:border-purple-400/60',  hoverShadow: 'hover:shadow-purple-500/10' },
  { id: 'ai-mastery',            title: 'AI Fluency for Business Leaders',    level: 'AI Mastery', description: 'Understand how to use AI confidently and responsibly to improve decisions, productivity, and strategy.',   price: 7500,  duration: '1 month',  Icon: Brain,         includes: ['How modern AI systems think', 'Prompt engineering for real work', 'AI tools and workflows', 'Responsible, career-driven AI usage'],              gradient: 'from-emerald-500/10 to-teal-500/10', accent: 'text-emerald-400', hoverBorder: 'hover:border-emerald-400/60', hoverShadow: 'hover:shadow-emerald-500/10' },
  { id: 'ai-agents-masterclass', title: 'Agentic AI for Business',            level: 'Advanced',   description: 'Design AI systems that support decision-making, execution, and scale across the business.',              price: 12500, duration: '1 month',  Icon: Zap,           includes: ['AI agent design fundamentals', 'n8n Automation, APIs, and Agentic Workflows', 'Knowledge, memory, and tools', 'Deploying agents across channels'], gradient: 'from-orange-500/10 to-red-500/10',   accent: 'text-orange-400',  hoverBorder: 'hover:border-orange-400/60',  hoverShadow: 'hover:shadow-orange-500/10' },
];

const levelColors: Record<string, string> = {
  Beginner:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-yellow-400  bg-yellow-500/10  border-yellow-500/20',
  Advanced:     'text-red-400     bg-red-500/10     border-red-500/20',
};

const statusConfig: Record<string, { label: string; color: string; Icon: React.ElementType }> = {
  not_started:  { label: 'Not Started',  color: 'text-gray-400    bg-gray-500/10    border-gray-500/20',   Icon: Clock        },
  submitted:    { label: 'Submitted',    color: 'text-blue-400    bg-blue-500/10    border-blue-500/20',   Icon: CheckCircle  },
  under_review: { label: 'Under Review', color: 'text-yellow-400  bg-yellow-500/10  border-yellow-500/20', Icon: Eye          },
  reviewed:     { label: 'Reviewed',     color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', Icon: CheckCircle2 },
};

const sectionNav = [
  { id: 'courses',  label: 'Learning Pathways', Icon: BookOpen,
    active: 'bg-brand-cyan/10 border-brand-cyan/40 text-brand-cyan',
    hover:  'hover:bg-brand-cyan/10 hover:border-brand-cyan/30 hover:text-brand-cyan' },
  { id: 'webinars', label: 'Webinars', Icon: Play,
    active: 'bg-purple-500/10 border-purple-500/40 text-purple-400',
    hover:  'hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400' },
  { id: 'projects', label: 'Projects', Icon: FolderOpen,
    active: 'bg-orange-500/10 border-orange-500/40 text-orange-400',
    hover:  'hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-400' },
];

// ─── Webinar card (outside component so it's never recreated) ─────────────────
interface WebinarCardProps {
  webinar: (typeof webinars)[number];
}
const WebinarCard: React.FC<WebinarCardProps> = ({ webinar }) => (
  <div className="flex-shrink-0 w-72 bg-gradient-to-br from-gray-900/60 to-black/40 border border-purple-500/20 rounded-2xl p-6 flex flex-col hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden">
    <div className="absolute -left-12 -top-12 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border text-gray-400 bg-white/5 border-white/10">Completed</span>
      <div className="flex items-center gap-1.5">
        <Play className="w-4 h-4 text-purple-400" />
        <span className="text-xs text-gray-500 font-medium">{webinar.duration}</span>
      </div>
    </div>
    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-snug">{webinar.title}</h3>
    <p className="text-sm text-gray-400 mb-5 leading-relaxed flex-1">{webinar.shortDescription}</p>
    <div className="space-y-2 mb-5">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Calendar className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" /><span>{webinar.date}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Clock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" /><span>{webinar.time}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Users className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span>Host: <span className="text-gray-300">{webinar.host}</span></span>
      </div>
    </div>
    <Link to={`/webinar/${webinar.id}`}
      className="w-full bg-gradient-to-r from-purple-500/10 to-purple-500/5 hover:from-purple-500 hover:to-purple-600 text-purple-400 hover:text-white border border-purple-500/30 hover:border-purple-500 rounded-lg px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn">
      Watch Recording <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
    </Link>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const AcademyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [loading]        = useState(false);
  const [activeTrack,    setActiveTrack]    = useState('excel');
  const [showLogin,      setShowLogin]      = useState(false);
  const [submissions,    setSubmissions]    = useState<Record<string, any>>({});
  const [uploading,      setUploading]      = useState<string | null>(null);
  const [uploadSuccess,  setUploadSuccess]  = useState<string | null>(null);
  const [activeSection,  setActiveSection]  = useState('courses');

  // Fetch submissions
  useEffect(() => {
    if (!user) return;
    supabase.from('project_submissions').select('*').eq('user_id', user.id)
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, any> = {};
        data.forEach((s) => { map[s.project_id] = s; });
        setSubmissions(map);
      });
  }, [user]);

  // Sticky section tracker via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ['courses', 'webinars', 'projects'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleDownload = (fileName: string | null) => {
    if (!fileName) return;
    if (!isLoggedIn) { setShowLogin(true); return; }
    window.open(
      `https://lfqzzbfcgkdfmytrvtwa.supabase.co/storage/v1/object/public/Excel%20Files/${fileName}`,
      '_blank',
    );
  };

  const handleUpload = async (projectId: string, projectTitle: string, track: string, file: File) => {
    if (!user) return;
    setUploading(projectId);
    try {
      const filePath = `submissions/${user.id}/${projectId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('project-submissions').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('project-submissions').getPublicUrl(filePath);
      const payload = {
        user_id: user.id, project_id: projectId, project_title: projectTitle,
        track, file_url: urlData.publicUrl, file_name: file.name,
        status: 'submitted', submitted_at: new Date().toISOString(),
      };
      const { data, error } = await supabase
        .from('project_submissions')
        .upsert(payload, { onConflict: 'user_id,project_id' })
        .select().single();
      if (error) throw error;
      setSubmissions((prev) => ({ ...prev, [projectId]: data }));
      setUploadSuccess(projectId);
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err) { console.error('Upload error:', err); }
    finally { setUploading(null); }
  };

  const currentTrack = projectTracks.find((t) => t.id === activeTrack)!;
  // Safe icon reference — must be a capitalized const for JSX
  const TrackIcon = currentTrack.icon;

  return (
    <div className="bg-[#18100F] min-h-screen">

      {/* ── LOGIN MODAL ── */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#1a1210] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-lg">✕</button>
            <div className="w-14 h-14 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-brand-cyan" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sign In to Download</h3>
            <p className="text-sm text-gray-400 mb-6">Project files are available to enrolled students. Sign in to access your downloads.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setShowLogin(false); navigate('/login'); }}
                className="w-full py-3 bg-brand-cyan text-brand-dark rounded-lg font-bold hover:bg-cyan-300 transition-all">
                Sign In
              </button>
              <button onClick={() => { setShowLogin(false); navigate('/signup'); }}
                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition-all">
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-cyan/10" />
        </div>
        <div className="absolute top-20 left-10 bg-brand-dark/80 backdrop-blur-md rounded-lg p-4 border border-white/10 animate-float z-10 hidden md:block">
          <div className="flex items-center gap-2"><Brain className="w-5 h-5 text-brand-cyan" /><span className="text-xs text-gray-400">AI-Powered Learning</span></div>
        </div>
        <div className="absolute bottom-32 right-10 bg-brand-dark/80 backdrop-blur-md rounded-lg p-4 border border-white/10 animate-float z-10 hidden md:block" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2"><Users className="w-5 h-5 text-brand-purple" /><span className="text-xs text-gray-400">500+ Students</span></div>
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Ubuntu Academy</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed drop-shadow-md">
            Transform your career with world-class training in Data Analytics, AI, and Agentic Systems.
          </p>
        </div>
      </section>

      {/* ── STICKY SECTION NAV ── */}
      <div className="sticky top-16 z-40 bg-[#18100F]/95 backdrop-blur-md border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2">
          {sectionNav.map(({ id, label, Icon: NavIcon, active, hover }) => (
            <a key={id} href={`#${id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
                activeSection === id ? active : `bg-white/5 border-white/10 text-gray-400 ${hover}`
              }`}>
              <NavIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── COURSES ── */}
      <section id="courses" className="py-20 bg-[#18100F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-brand-cyan text-sm font-semibold tracking-wider uppercase bg-brand-cyan/10 px-4 py-2 rounded-full border border-brand-cyan/20">Learning Pathways</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">From Tools to Thinking</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Pathways for professionals ready to influence decisions, not just learn skills.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {enhancedCourses.map(({ id, title, level, description, price, duration, Icon: CourseIcon, includes, gradient, accent, hoverBorder, hoverShadow }) => (
                <div key={id}
                  className={`bg-gradient-to-br ${gradient} bg-gray-900/40 border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col ${hoverBorder} hover:shadow-lg ${hoverShadow} transition-all duration-300 group`}>
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`text-xs font-bold ${accent} uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10`}>{level}</span>
                    <div className="flex items-center gap-2">
                      <CourseIcon className={`w-5 h-5 ${accent}`} />
                      <span className="text-xs text-gray-500 font-medium">{duration}</span>
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold text-white mb-3 group-hover:${accent} transition-colors`}>{title}</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-1">{description}</p>
                  <div className="mb-6 space-y-2.5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What is Included</p>
                    {includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${accent} mt-0.5 flex-shrink-0`} />
                        <span className="text-xs text-gray-400 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4 pt-4 border-t border-white/5">
                    <span className="text-2xl font-bold text-white">KES {price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 ml-2">/ {duration}</span>
                  </div>
                  <Link to={`/course/${id}`}
                    className={`w-full bg-white/5 ${accent} border border-white/10 ${hoverBorder} hover:bg-white/10 rounded-lg px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn`}>
                    More Details <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── WEBINARS ── */}
      <section id="webinars" className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">Free Webinars</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">Learn Before You Commit</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Join our free webinars to explore data analytics and AI before enrolling.</p>
          </div>

          {/* Left-to-right scroll with right-edge fade */}
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {webinars.map((w) => (
                <div key={w.id} className="snap-start">
                  <WebinarCard webinar={w} />
                </div>
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#18100F] to-transparent pointer-events-none" />
          </div>

          <div className="mt-10 max-w-2xl mx-auto p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 animate-pulse flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-purple-400">Pro tip:</span> Attend any live webinar to unlock an exclusive{' '}
                <span className="text-white font-semibold">10% discount</span> on any course enrollment!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-orange-400 text-sm font-semibold tracking-wider uppercase bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">Hands-On Projects</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent">Practice What You Learn</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Real-world projects using data from Kenyan companies. Each project is standalone — start anywhere.</p>
          </div>

          {/* Guest nudge */}
          {!isLoggedIn && (
            <div className="max-w-2xl mx-auto mb-10 p-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl flex items-center gap-4">
              <Lock className="w-5 h-5 text-brand-cyan flex-shrink-0" />
              <p className="text-sm text-gray-300 flex-1">
                <button onClick={() => navigate('/login')} className="text-brand-cyan font-semibold underline underline-offset-2">Sign in</button>
                {' '}to download project files.{' '}
                <button onClick={() => navigate('/signup')} className="text-brand-cyan font-semibold underline underline-offset-2">Create a free account</button>
              </p>
            </div>
          )}

          {/* Airbnb-style horizontal scroll track tabs */}
          <div className="relative mb-10">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {projectTracks.map((track) => {
                const TabIcon = track.icon;
                const isActive = activeTrack === track.id;
                return (
                  <button key={track.id} onClick={() => setActiveTrack(track.id)}
                    className={`flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3.5 rounded-2xl border transition-all duration-200 min-w-[90px] ${
                      isActive
                        ? `${track.bgColor} ${track.accentColor} ${track.borderColor}`
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}>
                    <TabIcon className={`w-5 h-5 ${isActive ? track.accentColor : 'text-gray-400'}`} />
                    <span className="text-xs font-semibold text-center leading-tight max-w-[80px]">{track.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-[#18100F] to-transparent pointer-events-none" />
          </div>

          {/* Track header — uses TrackIcon declared before return */}
          <div className={`mb-8 p-5 rounded-2xl border ${currentTrack.borderColor} ${currentTrack.bgColor} flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${currentTrack.bgColor} border ${currentTrack.borderColor} flex items-center justify-center flex-shrink-0`}>
              <TrackIcon className={`w-6 h-6 ${currentTrack.accentColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400">{currentTrack.projects.length} standalone projects — start with any level</p>
            </div>
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {currentTrack.projects.map((project, idx) => {
              const submission  = submissions[project.id];
              const status      = submission?.status || 'not_started';
              const statusInfo  = statusConfig[status];
              const StatusIcon  = statusInfo.Icon;
              const isUploading = uploading === project.id;
              const didUpload   = uploadSuccess === project.id;

              return (
                <div key={project.id}
                  className={`group bg-gray-900/50 border border-white/10 ${currentTrack.hoverBorder} rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 relative overflow-hidden`}>
                  <div className={`absolute -right-12 -top-12 w-48 h-48 ${currentTrack.bgColor} rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col gap-5">
                    {/* Header */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs text-gray-600 font-mono font-bold">#{String(idx + 1).padStart(2, '0')}</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${levelColors[project.level]}`}>{project.level}</span>
                        <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />{statusInfo.label}
                        </span>
                        <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
                          <Clock className="w-3.5 h-3.5" />{project.estimatedTime}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2.5">
                        {project.company} · <span className="text-gray-600">{project.companyTag}</span>
                        {' · '}<span className={currentTrack.accentColor}>{project.lessonsCovered}</span>
                      </p>
                      <h4 className="text-base font-bold text-white leading-snug mb-2.5">{project.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
                    </div>

                    {/* Learning outcome */}
                    <div className={`p-4 rounded-xl ${currentTrack.bgColor} border ${currentTrack.borderColor}`}>
                      <p className={`text-xs font-bold ${currentTrack.accentColor} mb-1.5`}>What you will learn</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{project.learningOutcome}</p>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2.5">Skills Practiced</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span key={skill} className="text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">{skill}</span>
                        ))}
                      </div>
                    </div>

                    {/* Data source */}
                    <p className="text-xs text-gray-600">
                      <span className="text-gray-500 font-medium">Data source:</span> {project.dataSource}
                    </p>

                    {/* Instructor feedback */}
                    {submission?.admin_comments && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <p className="text-xs font-bold text-emerald-400 mb-1.5">Instructor Feedback</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{submission.admin_comments}</p>
                      </div>
                    )}

                    {/* Actions */}
                    {isLoggedIn ? (
                      <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                        {/* Download buttons — accent tinted */}
                        <div className="flex gap-3">
                          {project.datasetFile && (
                            <button onClick={() => handleDownload(project.datasetFile)}
                              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${currentTrack.bgColor} ${currentTrack.accentColor} ${currentTrack.borderColor} hover:opacity-80`}>
                              <Download className="w-4 h-4" />Dataset
                            </button>
                          )}
                          <button onClick={() => handleDownload(project.taskFile)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${currentTrack.bgColor} ${currentTrack.accentColor} ${currentTrack.borderColor} hover:opacity-80`}>
                            <Download className="w-4 h-4" />Project Task
                          </button>
                        </div>
                        {/* Submit button — white/ghost, visually separate */}
                        <label className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold border cursor-pointer transition-all ${
                          didUpload   ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : isUploading ? 'bg-white/5 text-gray-500 border-white/10 cursor-wait'
                          : 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30'
                        }`}>
                          <input type="file" className="hidden" accept=".doc,.docx,.pdf,.xlsx"
                            disabled={isUploading}
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleUpload(project.id, project.title, currentTrack.id, f);
                            }} />
                          {didUpload    ? <><CheckCircle className="w-4 h-4" />Submitted!</>
                          : isUploading ? <><div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />Uploading...</>
                          : <><Upload className="w-4 h-4" />{submission ? 'Re-submit Work' : 'Submit Your Work'}</>}
                        </label>
                      </div>
                    ) : (
                      <button onClick={() => setShowLogin(true)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold border bg-white/5 text-gray-500 border-white/10 hover:bg-white/10 hover:text-gray-300 transition-all">
                        <Lock className="w-4 h-4" />Sign In to Access Project
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 max-w-2xl mx-auto p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <Star className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-orange-400">Build your portfolio:</span>{' '}
                Each project is standalone — start anywhere. Submit for instructor review to earn a certificate per track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join hundreds of professionals already on their journey with Ubuntu Academy.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#courses" className="px-8 py-4 bg-brand-cyan text-brand-dark rounded-full font-bold text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">Browse Courses</a>
                <button onClick={() => navigate('/assessment')} className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all">Take Skills Assessment</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AcademyPage;
