import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, FileSpreadsheet, BarChart3, Brain, Zap,
  Calendar, Clock, Users, Play, Download, Lock, FolderOpen, Star,
  BookOpen, Upload, CheckCircle, Eye, Award, TrendingUp, Shield,
  Globe2, ChevronRight, Sparkles, X,
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { webinars } from '../services/webinarsData';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { initializePaystack, generateReference, toSmallestUnit, detectCurrency } from '../lib/paystack';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string; title: string; company: string; companyTag: string;
  description: string; level: string; estimatedTime: string;
  skills: string[]; learningOutcome: string; dataSource: string;
  datasetFile: string | null; taskFile: string | null; lessonsCovered: string;
}
interface Track {
  id: string; title: string; icon: React.ElementType;
  accentColor: string; borderColor: string; bgColor: string; hoverBorder: string;
  projects: Project[];
}

// ─── Custom Hooks ─────────────────────────────────────────────────────────────
const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = 0;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const prog = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setCount(Math.floor(ease * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

// ─── Static Data ──────────────────────────────────────────────────────────────
const LIVE_ACTIVITY = [
  { initials: 'AW', name: 'Amina W.',     color: 'bg-cyan-500',   action: 'submitted',   item: 'EX-03 KCB Loan Analyser',       time: '2m ago' },
  { initials: 'KM', name: 'Kevin M.',     color: 'bg-purple-500', action: 'enrolled in', item: 'Agentic AI for Business',        time: '5m ago' },
  { initials: 'CO', name: 'Christine O.', color: 'bg-emerald-500',action: 'completed',   item: 'Power BI P&L Dashboard',        time: '11m ago' },
  { initials: 'BK', name: 'Brian K.',     color: 'bg-orange-500', action: 'downloaded',  item: 'Kenya Airways Dataset',          time: '18m ago' },
  { initials: 'FA', name: 'Fatuma A.',    color: 'bg-blue-500',   action: 'submitted',   item: 'AG-01 Lead Qualification Agent', time: '25m ago' },
  { initials: 'JO', name: 'James O.',     color: 'bg-rose-500',   action: 'enrolled in', item: 'AI Fluency for Business',        time: '31m ago' },
];

const TESTIMONIALS = [
  { name: 'Christine Mutua', role: 'Data Analyst · Equity Bank Kenya', initials: 'CM', color: 'bg-cyan-500',
    quote: "The Excel track completely changed how I present data to leadership. Within 2 months I was building pivot dashboards my manager used in board meetings. Best career investment I've ever made.",
    course: 'Data Analytics with Excel', result: '+40% salary in 6 months' },
  { name: 'Kevin Omondi', role: 'Operations Lead · Safaricom M-Pesa', initials: 'KO', color: 'bg-purple-500',
    quote: "The Power BI course gave me tools I use every single day. I automated a report that used to take 3 hours manually. My team now has real-time dashboards they can actually trust.",
    course: 'Business Analytics with Power BI', result: 'Saved 12 hrs/week on reporting' },
  { name: 'Fatuma Abdi', role: 'BI Engineer · KCB Group', initials: 'FA', color: 'bg-orange-500',
    quote: "The Agentic AI course is genuinely advanced. I built a lead qualification agent for our SME team in 3 weeks. It handles 200+ leads a day. This is the future of banking operations in Africa.",
    course: 'Agentic AI for Business', result: 'Agent processes 200+ leads/day' },
];

const COMPANY_LOGOS = ['Safaricom', 'Equity Bank', 'KCB Group', 'Kenya Airways', 'Absa Kenya', 'NCBA Bank', 'KPMG', 'PwC Kenya'];
const CERT_COURSES  = ['Data Analytics with Excel', 'Business Analytics with Power BI', 'AI Fluency for Business Leaders', 'Agentic AI for Business'];

const projectTracks: Track[] = [
  {
    id: 'excel', title: 'Data Analytics with Excel', icon: FileSpreadsheet,
    accentColor: 'text-blue-400', borderColor: 'border-blue-500/30', bgColor: 'bg-blue-500/10', hoverBorder: 'hover:border-blue-500/60',
    projects: [
      { id: 'ex-01', title: 'Ubuntu AnalytIQ: Safaricom Subscriber Tracker', company: 'Safaricom PLC', companyTag: 'NSE: SCOM', lessonsCovered: 'Lessons 1–8', level: 'Beginner', estimatedTime: '3–4 hrs',
        description: "Using Safaricom's publicly reported subscriber data (2020–2024), build a clean, well-formatted workbook tracking mobile subscribers, M-Pesa users, home fibre, and revenue per user across five financial years.",
        skills: ['Excel Interface & Navigation','Data Entry & Cell Formatting','SUM, AVERAGE, COUNT','Absolute vs Relative References','Bar & Line Charts','Print Area & Page Layout'],
        learningOutcome: 'Confidently navigate Excel, structure real business data, write your first formulas, and produce a chart-ready subscriber report.',
        dataSource: 'Safaricom Annual Report FY2024 (safaricom.co.ke)',
        datasetFile: 'Ubuntu%20Analytiq%20-%20Safaricom%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Safaricom%20task.pdf' },
      { id: 'ex-02', title: 'Ubuntu AnalytIQ: M-Pesa Revenue Analyser', company: 'M-Pesa / Safaricom', companyTag: 'M-Pesa Africa', lessonsCovered: 'Lessons 9–12', level: 'Intermediate', estimatedTime: '4–5 hrs',
        description: 'M-Pesa processed over KES 36 trillion in FY2023. Apply conditional formatting, logical functions, and lookup formulas to identify top revenue categories and flag underperforming agent tiers.',
        skills: ['Conditional Formatting','IF, AND, OR Logic','VLOOKUP & XLOOKUP','LEFT, RIGHT, CONCATENATE','Combo Charts','Sparklines'],
        learningOutcome: 'Move beyond basic Excel — writing logic-driven formulas, building lookup models, and producing a multi-series chart dashboard.',
        dataSource: 'Safaricom Annual Report FY2024 — M-Pesa segment disclosures',
        datasetFile: 'Ubuntu%20Analytiq%20-%20M-pesa%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20M-pesa%20task.pdf' },
      { id: 'ex-03', title: 'Ubuntu AnalytIQ: KCB Loan Portfolio Analyser', company: 'KCB Group PLC', companyTag: 'NSE: KCB', lessonsCovered: 'Lessons 13–16', level: 'Intermediate', estimatedTime: '5–6 hrs',
        description: "KCB Group holds one of East Africa's largest loan books at over KES 900 billion. Build a pivot-table model with calculated fields, NPL ratios, and a protected executive summary sheet.",
        skills: ['Pivot Tables','Calculated Fields & Items','Data Grouping','Advanced Data Validation','Sheet & Workbook Protection','Recording a Basic Macro'],
        learningOutcome: 'Master pivot tables — the single most powerful Excel skill for analysts — and learn to lock down your work for professional delivery.',
        dataSource: 'KCB Group Annual Report & Financial Statements 2023 (kcbgroup.com)',
        datasetFile: 'Ubuntu%20Analytiq%20-%20KCB%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20KCB%20task.pdf' },
      { id: 'ex-04', title: 'Ubuntu AnalytIQ: Equity Bank Branch Performance Model', company: 'Equity Group Holdings', companyTag: 'NSE: EQTY', lessonsCovered: 'Lessons 17–19', level: 'Advanced', estimatedTime: '6–7 hrs',
        description: 'Equity Bank operates 350+ branches across 6 countries. Build a dynamic performance ranking model with INDEX/MATCH, FILTER arrays, and a pivot chart with slicers for country-level drill-down.',
        skills: ['INDEX & MATCH','Dynamic Arrays (FILTER, SORT)','Nested IF & IFS','Power Query Basics','Advanced Pivot Charts','Slicers & Timelines'],
        learningOutcome: 'Write formulas analysts use daily, build self-updating models with dynamic arrays, and create an interactive pivot dashboard executives can slice by country.',
        dataSource: 'Equity Group Holdings Annual Report 2023 (equitygroupholdings.com)',
        datasetFile: 'Ubuntu%20Analytiq%20-%20Equity%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Equity%20task.pdf' },
      { id: 'ex-05', title: 'Ubuntu AnalytIQ: Kenya Airways Route Profitability Dashboard', company: 'Kenya Airways PLC', companyTag: 'NSE: KQ', lessonsCovered: 'Lessons 20–24', level: 'Advanced', estimatedTime: '7–9 hrs',
        description: "Build a fully dynamic dashboard using Scenario Manager to model fuel-cost shocks, Goal Seek to find break-even load factors, and a VBA button that refreshes and formats the report in one click.",
        skills: ['Scenario Manager & What-If Analysis','Goal Seek & Solver','Dynamic Charts with Named Ranges','Form Controls & Slicers','VBA Macro Automation','Dashboard Design Principles'],
        learningOutcome: 'Your capstone project: a board-ready dashboard that auto-refreshes, models financial scenarios, and runs VBA scripts — the full advanced Excel toolkit.',
        dataSource: 'Kenya Airways Annual Report & Investor Presentation 2023 (kenya-airways.com)',
        datasetFile: 'Ubuntu%20Analytiq%20-%20Kenya%20Airways%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Kenya%20Airways%20task.pdf' },
    ],
  },
  {
    id: 'powerbi', title: 'Business Analytics with Power BI', icon: BarChart3,
    accentColor: 'text-purple-400', borderColor: 'border-purple-500/30', bgColor: 'bg-purple-500/10', hoverBorder: 'hover:border-purple-500/60',
    projects: [
      { id: 'pbi-01', title: 'Ubuntu AnalytIQ: Retail Sales Performance Report', company: 'Retail Dataset', companyTag: 'Kenyan Market', lessonsCovered: 'Lessons 1–4', level: 'Beginner', estimatedTime: '4–5 hrs', description: 'Connect to a retail dataset, build a star schema, and create an executive dashboard with MTD, QTD, and YTD comparisons.', skills: ['Power Query','Star Schema','Basic DAX','Date Tables','Bar Charts'], learningOutcome: 'Load and shape data in Power Query, build your first star schema, and produce a clean executive report.', dataSource: 'Synthetic Kenyan retail dataset', datasetFile: 'Ubuntu%20Analytiq%20-%20Duka%20Fresh%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Duka%20Fresh%20Task.pdf' },
      { id: 'pbi-02', title: 'Ubuntu AnalytIQ: Financial P&L Dashboard', company: 'Finance Dataset', companyTag: 'Kenyan Market', lessonsCovered: 'Lessons 5–8', level: 'Intermediate', estimatedTime: '5–7 hrs', description: 'Model a Profit & Loss statement in Power BI with drill-through pages, dynamic titles, and time intelligence DAX measures.', skills: ['DAX Time Intelligence','Drill-Through','Bookmarks','Dynamic Titles'], learningOutcome: 'Write time intelligence DAX, build drill-through navigation, and deliver a finance-grade P&L report.', dataSource: 'Synthetic P&L dataset', datasetFile: 'Ubuntu%20Analytiq%20-%20Jua%20Kali%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Jua%20Kali%20Task.pdf' },
      { id: 'pbi-03', title: 'Ubuntu AnalytIQ: Logistics KPI Tracker', company: 'Logistics Dataset', companyTag: 'Kenyan Market', lessonsCovered: 'Lessons 9–12', level: 'Intermediate', estimatedTime: '5–6 hrs', description: 'Track on-time delivery rates, route efficiency, and driver performance across regions.', skills: ['Calculated Columns','Row-Level Security','Maps','KPI Visuals'], learningOutcome: 'Build a map-enabled operations dashboard with RLS and KPI card visuals.', dataSource: 'Synthetic logistics dataset', datasetFile: 'Ubuntu%20Analytiq%20-%20Swift%20Delivery%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Swift%20Delivery%20Task.pdf' },
      { id: 'pbi-04', title: 'Ubuntu AnalytIQ: Customer Segmentation Report', company: 'CRM Dataset', companyTag: 'Kenyan Market', lessonsCovered: 'Lessons 13–16', level: 'Advanced', estimatedTime: '7–9 hrs', description: 'Use RFM analysis to segment customers and build a churn risk dashboard with cohort analysis.', skills: ['Complex DAX','RFM Modeling','Cohort Analysis','What-If Parameters'], learningOutcome: 'Master complex DAX, build RFM segmentation logic, and deliver a churn-risk dashboard executives trust.', dataSource: 'Synthetic CRM dataset', datasetFile: 'Ubuntu%20Analytiq%20-%20Duka%20Smart%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Duka%20Smart%20Task.pdf' },
    ],
  },
  {
    id: 'ai-mastery', title: 'AI Fluency for Business', icon: Brain,
    accentColor: 'text-emerald-400', borderColor: 'border-emerald-500/30', bgColor: 'bg-emerald-500/10', hoverBorder: 'hover:border-emerald-500/60',
    projects: [
      { id: 'ai-01', title: 'Ubuntu AnalytIQ: AI Tools Audit for Your Role', company: 'Your Organisation', companyTag: 'Any Industry', lessonsCovered: 'Module 1–2', level: 'Beginner', estimatedTime: '2–3 hrs', description: 'Map 10 AI tools relevant to your job function, evaluate their capabilities, risks, and ROI.', skills: ['AI Tool Evaluation','Business Framing','ROI Analysis','Risk Assessment'], learningOutcome: 'A clear map of AI tools for your role and a framework for evaluating any new tool.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-01-tools-audit-task.pdf' },
      { id: 'ai-02', title: 'Ubuntu AnalytIQ: Prompt Engineering Workbook', company: 'Cross-Industry', companyTag: 'Any Role', lessonsCovered: 'Module 3–4', level: 'Beginner', estimatedTime: '3–4 hrs', description: 'Complete 15 structured prompting challenges across marketing, finance, HR, and operations.', skills: ['Prompt Engineering','Chain-of-Thought','Role Prompting','Output Structuring'], learningOutcome: 'Write prompts that get consistent, professional-grade AI outputs for real business tasks.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-02-prompt-workbook-task.pdf' },
      { id: 'ai-03', title: 'Ubuntu AnalytIQ: AI Strategy Memo', company: 'Fictional EA Company', companyTag: 'East Africa', lessonsCovered: 'Module 5–6', level: 'Intermediate', estimatedTime: '4–5 hrs', description: 'Write a 2-page AI adoption strategy memo for a fictional East African company, identifying 3 high-impact use cases.', skills: ['Strategic Thinking','AI Ethics','Business Writing','Use Case Design'], learningOutcome: 'Confidently advise leadership on AI adoption — the skill that separates AI-fluent professionals from the rest.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-03-strategy-memo-task.pdf' },
    ],
  },
  {
    id: 'ai-agents', title: 'Agentic AI for Business', icon: Zap,
    accentColor: 'text-orange-400', borderColor: 'border-orange-500/30', bgColor: 'bg-orange-500/10', hoverBorder: 'hover:border-orange-500/60',
    projects: [
      { id: 'ag-01', title: 'Ubuntu AnalytIQ: Lead Qualification Agent', company: 'n8n + OpenAI', companyTag: 'Automation', lessonsCovered: 'Module 1–2', level: 'Intermediate', estimatedTime: '4–6 hrs', description: 'Build an n8n workflow that captures leads, scores them using AI, and routes qualified leads to a CRM via webhook.', skills: ['n8n Workflows','Webhooks','OpenAI API','CRM Integration'], learningOutcome: 'Ship a working AI agent that automates a real sales process end-to-end.', dataSource: 'No dataset required', datasetFile: 'AG-01%20Lead%20Qualification%20Agent.json', taskFile: 'Ubuntu%20Analytiq%20AG-01-task.pdf' },
      { id: 'ag-02', title: 'Ubuntu AnalytIQ: Document Summarisation Pipeline', company: 'LangChain + Email', companyTag: 'Automation', lessonsCovered: 'Module 3–4', level: 'Intermediate', estimatedTime: '5–7 hrs', description: 'Create an agent that reads uploaded PDFs, extracts key insights, and sends a structured summary report via email.', skills: ['LangChain','PDF Parsing','Email Automation','Prompt Chaining'], learningOutcome: 'Build a document intelligence pipeline that saves hours of manual reading every week.', dataSource: 'Sample PDF documents provided', datasetFile: 'AG-02%20Document%20Summarisation%20Pipeline.json', taskFile: 'Ubuntu%20Analytiq%20AG-02-task.pdf' },
      { id: 'ag-03', title: 'Ubuntu AnalytIQ: Multi-Agent Research Assistant', company: 'CrewAI', companyTag: 'Agentic Systems', lessonsCovered: 'Module 5–6', level: 'Advanced', estimatedTime: '7–9 hrs', description: 'Design a CrewAI system with a researcher, analyst, and writer agent that produces business reports autonomously.', skills: ['CrewAI','Agent Roles & Tools','Task Chaining','Output Formatting'], learningOutcome: 'Orchestrate multiple AI agents working together — one of the most in-demand skills in enterprise AI.', dataSource: 'No dataset required', datasetFile: 'AG-03%20Multi-Agent%20Research%20Assistant.json', taskFile: 'Ubuntu%20Analytiq%20AG-03-task.pdf' },
      { id: 'ag-04', title: 'Ubuntu AnalytIQ: Customer Support Bot', company: 'OpenAI Assistants', companyTag: 'Deployment', lessonsCovered: 'Module 7–8', level: 'Advanced', estimatedTime: '8–10 hrs', description: 'Build and deploy a knowledge-based customer support chatbot using OpenAI Assistants API with memory and handoff logic.', skills: ['OpenAI Assistants API','RAG','Memory & Context','Bot Deployment'], learningOutcome: 'A fully deployed, production-ready AI support agent with retrieval-augmented generation.', dataSource: 'Sample knowledge base provided', datasetFile: 'AG-04%20Customer%20Support%20Bot%20(Duka%20Smart).json', taskFile: 'Ubuntu%20Analytiq%20AG-04-task.pdf' },
    ],
  },
];

const enhancedCourses = [
  { id: 'excel-workshop',        title: 'Data Analytics with Excel',        level: 'Foundation',  startDate: '20 June 2025',  rating: 4.9, reviewCount: 60, studentsEnrolled: 15, tag: 'Most Popular',  tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',    description: "Master the world's most-used business tool. Structure problems, build models, and present data that decisions are made on.",    price: 12500, duration: '3 months', Icon: FileSpreadsheet, includes: ['Advanced formulas & logic','Power Query foundations','Pivot table mastery','Board-ready dashboards'],      gradient: 'from-blue-500/8 to-cyan-500/8',    accent: 'text-blue-400',    accentBg: 'bg-blue-500/10',    accentBorder: 'border-blue-500/20',    hoverBorder: 'hover:border-blue-400/50',   hoverGlow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.06)]',   dotColor: 'bg-blue-400'    },
  { id: 'powerbi-workshop',      title: 'Business Analytics with Power BI', level: 'Core',        startDate: '7 April 2025',  rating: 4.8, reviewCount: 30, studentsEnrolled: 10, tag: 'Starting Soon', tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30', description: 'Turn raw data into decision-ready dashboards and reporting systems that leadership actually trusts and uses.',                   price: 15000, duration: '3 months', Icon: BarChart3,      includes: ['Power Query transformation','Star-schema modelling','DAX time intelligence','Executive Power BI reports'],    gradient: 'from-purple-500/8 to-pink-500/8',  accent: 'text-purple-400',  accentBg: 'bg-purple-500/10',  accentBorder: 'border-purple-500/20',  hoverBorder: 'hover:border-purple-400/50', hoverGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.06)]',   dotColor: 'bg-purple-400'  },
  { id: 'ai-mastery',            title: 'AI Fluency for Business Leaders',  level: 'AI Mastery',  startDate: '4 May 2025',    rating: 4.9, reviewCount: 15, studentsEnrolled: 12, tag: 'New Cohort',     tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', description: 'Use AI confidently and responsibly to improve decisions, automate repetitive work, and stay ahead of your industry.',          price: 2500,  duration: '1 month',  Icon: Brain,         includes: ['How modern AI thinks','Prompt engineering mastery','AI tools & workflows','Responsible AI in Africa'],          gradient: 'from-emerald-500/8 to-teal-500/8', accent: 'text-emerald-400', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-400/50',hoverGlow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.06)]',   dotColor: 'bg-emerald-400'  },
  { id: 'ai-agents-masterclass', title: 'Agentic AI for Business',          level: 'Advanced',    startDate: '5 May 2025',    rating: 4.7, reviewCount: 80, studentsEnrolled: 25, tag: 'Top Rated',    tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',  description: 'Design AI systems that execute tasks, orchestrate multi-step workflows, and scale operations without constant human oversight.',  price: 5000, duration: '1 month',  Icon: Zap,           includes: ['AI agent design fundamentals','n8n, APIs & agentic workflows','Knowledge, memory & tools','Deploy agents across channels'],  gradient: 'from-orange-500/8 to-red-500/8',   accent: 'text-orange-400',  accentBg: 'bg-orange-500/10',  accentBorder: 'border-orange-500/20',  hoverBorder: 'hover:border-orange-400/50', hoverGlow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.06)]',   dotColor: 'bg-orange-400'   },
];

const levelColors: Record<string, string> = {
  Beginner:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-yellow-400  bg-yellow-500/10  border-yellow-500/20',
  Advanced:     'text-red-400     bg-red-500/10     border-red-500/20',
};
const statusConfig: Record<string, { label: string; color: string; Icon: React.ElementType }> = {
  not_started:  { label: 'Not Started',  color: 'text-gray-400    bg-gray-500/10    border-gray-500/20',    Icon: Clock        },
  submitted:    { label: 'Submitted',    color: 'text-blue-400    bg-blue-500/10    border-blue-500/20',    Icon: CheckCircle  },
  under_review: { label: 'Under Review', color: 'text-yellow-400  bg-yellow-500/10  border-yellow-500/20',  Icon: Eye          },
  reviewed:     { label: 'Reviewed',     color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', Icon: CheckCircle2 },
};
const sectionNav = [
  { id: 'courses',  label: 'Learning Pathways', Icon: BookOpen,
    active: 'bg-brand-cyan/10 border-brand-cyan/40 text-brand-cyan',       hover: 'hover:bg-brand-cyan/10 hover:border-brand-cyan/30 hover:text-brand-cyan' },
  { id: 'webinars', label: 'Webinars',           Icon: Play,
    active: 'bg-purple-500/10 border-purple-500/40 text-purple-400',       hover: 'hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400' },
  { id: 'projects', label: 'Projects',           Icon: FolderOpen,
    active: 'bg-orange-500/10 border-orange-500/40 text-orange-400',       hover: 'hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-400' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const StarRating: React.FC<{ rating: number; count: number }> = ({ rating, count }) => (
  <div className="flex items-center gap-1.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
    ))}
    <span className="text-yellow-400 text-xs font-bold ml-0.5">{rating}</span>
    <span className="text-gray-600 text-xs">({count})</span>
  </div>
);

const ActivityFeed: React.FC = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-5 w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-500 font-bold tracking-wider uppercase">Live Activity</span>
      </div>
      <div className="space-y-2">
        {LIVE_ACTIVITY.slice(0, 5).map((a, i) => {
          const isActive = i === tick % 5;
          return (
            <div key={i}
              className={`flex items-center gap-3 py-2 px-3 rounded-xl transition-all duration-500 ${isActive ? 'bg-white/5 border border-white/8' : 'opacity-40'}`}>
              <div className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-[10px] font-bold">{a.initials}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-white truncate">
                  <span className="text-gray-400">{a.name}</span> {a.action}
                </p>
                <p className="text-[10px] text-gray-600 truncate">{a.item}</p>
              </div>
              <span className="text-[10px] text-gray-700 flex-shrink-0">{a.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CertificatePreview: React.FC<{ courseName: string }> = ({ courseName }) => (
  <div className="relative w-full max-w-lg mx-auto">
    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/15 to-purple-500/15 blur-3xl rounded-3xl pointer-events-none" />
    <div className="relative bg-gradient-to-br from-[#0a1628] to-[#0d1f1a] border border-brand-cyan/25 rounded-2xl overflow-hidden shadow-2xl">
      <div className="h-1 bg-gradient-to-r from-brand-cyan via-blue-400 to-purple-500" />
      {/* Corner accents */}
      {[['top-5 left-5 border-t-2 border-l-2 rounded-tl-lg'],['top-5 right-5 border-t-2 border-r-2 rounded-tr-lg'],['bottom-5 left-5 border-b-2 border-l-2 rounded-bl-lg'],['bottom-5 right-5 border-b-2 border-r-2 rounded-br-lg']].map((cls, i) => (
        <div key={i} className={`absolute w-7 h-7 border-brand-cyan/30 ${cls[0]}`} />
      ))}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.8) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <div className="relative z-10 px-8 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center">
            <Brain className="w-4 h-4 text-brand-cyan" />
          </div>
          <span className="text-brand-cyan font-bold text-sm tracking-wider">Ubuntu AnalytIQ</span>
        </div>
        <p className="text-gray-600 text-[10px] tracking-widest uppercase mb-0.5">Certificate of Completion</p>
        <div className="w-14 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent mx-auto mb-4" />
        <p className="text-gray-500 text-xs mb-2">This certifies that</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-wide"
          style={{ textShadow: '0 0 30px rgba(34,211,238,0.25)' }}>
          Greatness
        </h2>
        <p className="text-gray-500 text-xs mb-3">has successfully completed</p>
        <div className="inline-block px-5 py-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl mb-4">
          <p className="text-brand-cyan font-semibold text-sm">{courseName}</p>
        </div>
        <div className="flex justify-center gap-1 mb-6">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/6">
          <div className="text-left">
            <p className="text-gray-700 text-[9px] uppercase tracking-wider">Issued By</p>
            <p className="text-gray-300 text-xs font-semibold">Ubuntu AnalytIQ</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-cyan/15 border border-brand-cyan/25 flex items-center justify-center">
            <Award className="w-5 h-5 text-brand-cyan" />
          </div>
          <div className="text-right">
            <p className="text-gray-700 text-[9px] uppercase tracking-wider">Credential ID</p>
            <p className="text-gray-300 text-xs font-mono">UA-2025-0042</p>
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-brand-cyan/15 to-transparent" />
    </div>
  </div>
);

interface WebinarCardProps { webinar: (typeof webinars)[number]; }
const WebinarCard: React.FC<WebinarCardProps> = ({ webinar }) => (
  <div className="flex-shrink-0 w-72 bg-gradient-to-br from-gray-900/60 to-black/40 border border-purple-500/20 rounded-2xl p-6 flex flex-col hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] transition-all duration-300 group relative overflow-hidden snap-start">
    <div className="absolute -left-10 -top-10 w-36 h-36 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border text-gray-500 bg-white/4 border-white/8 flex items-center gap-1.5">
        <Play className="w-2.5 h-2.5" /> Replay
      </span>
      <span className="text-xs text-gray-600">{webinar.duration}</span>
    </div>
    <h3 className="text-sm font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-snug line-clamp-2">{webinar.title}</h3>
    <p className="text-xs text-gray-500 mb-4 leading-relaxed flex-1 line-clamp-3">{webinar.shortDescription}</p>
    <div className="space-y-1.5 mb-4">
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Calendar className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" /><span>{webinar.date}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Users className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span>Host: <span className="text-gray-400">{webinar.host}</span></span>
      </div>
    </div>
    <Link to={`/webinar/${webinar.id}`}
      className="w-full bg-purple-500/8 hover:bg-purple-500 text-purple-400 hover:text-white border border-purple-500/25 hover:border-purple-500 rounded-xl px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 group/btn">
      Watch Recording <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const AcademyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [activeTrack,   setActiveTrack]   = useState('excel');
  const [showLogin,     setShowLogin]     = useState(false);
  const [submissions,   setSubmissions]   = useState<Record<string, any>>({});
  const [uploading,     setUploading]     = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('courses');
  const [activeCertIdx, setActiveCertIdx] = useState(0);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedProjectForUpload, setSelectedProjectForUpload] = useState<{ projectId: string, projectTitle: string, trackId: string, file: File } | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { ref: statsRef, inView: statsVisible } = useInView(0.3);
  const s1 = useCountUp(150, 2000, statsVisible);
  const s2 = useCountUp(16,  1500, statsVisible);
  const s3 = useCountUp(94,  2200, statsVisible);
  const s4 = useCountUp(49,  1800, statsVisible); // display as 4.9

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
    window.open(`https://lfqzzbfcgkdfmytrvtwa.supabase.co/storage/v1/object/public/Excel%20Files/${fileName}`, '_blank');
  };

  const processUpload = async (projectId: string, projectTitle: string, track: string, file: File) => {
    if (!user) return;
    setUploading(projectId);
    try {
      const filePath = `submissions/${user.id}/${projectId}/${file.name}`;
      const { error: uploadError } = await supabase.storage.from('project-submissions').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('project-submissions').getPublicUrl(filePath);
      const payload = {
        user_id: user.id, project_id: projectId, project_title: projectTitle,
        track, file_url: urlData.publicUrl, file_name: file.name,
        status: 'submitted', submitted_at: new Date().toISOString(),
      };
      const { data, error } = await supabase.from('project_submissions')
        .upsert(payload, { onConflict: 'user_id,project_id' }).select().single();
      if (error) throw error;
      setSubmissions((prev) => ({ ...prev, [projectId]: data }));
      setUploadSuccess(projectId);
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err) { console.error('Upload error:', err); }
    finally { setUploading(null); }
  };

  const initiateProjectPayment = (amount: number) => {
      if (!selectedProjectForUpload || !user?.email) return;
      setIsProcessingPayment(true);
      const currency = detectCurrency(amount);
      const ref = generateReference();
      initializePaystack({
          key: '', // automatically falls back to config in implementation
          email: user.email,
          amount: toSmallestUnit(amount),
          currency,
          ref,
          metadata: {
              custom_fields: [
                  { display_name: "Project", variable_name: "project_title", value: selectedProjectForUpload.projectTitle },
                  { display_name: "Project ID", variable_name: "project_id", value: selectedProjectForUpload.projectId }
              ]
          },
          onSuccess: async (response) => {
              setIsProcessingPayment(false);
              setPaymentModalOpen(false);
              await processUpload(selectedProjectForUpload.projectId, selectedProjectForUpload.projectTitle, selectedProjectForUpload.trackId, selectedProjectForUpload.file);
              setSelectedProjectForUpload(null);
          },
          onCancel: () => {
              setIsProcessingPayment(false);
          }
      });
  };

  const currentTrack = projectTracks.find((t) => t.id === activeTrack)!;
  const TrackIcon = currentTrack.icon;

  return (
    <div className="bg-[#18100F] min-h-screen">

      {/* ── PROJECT PAYMENT MODAL ──────────────────────────────────────────── */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
          <div className="bg-[#1a1210] border border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
            <button onClick={() => { setPaymentModalOpen(false); setSelectedProjectForUpload(null); setIsProcessingPayment(false); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 bg-brand-cyan/10 border border-brand-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-6 h-6 text-brand-cyan" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Instructor Review Selection</h3>
            <p className="text-sm text-gray-400 text-center mb-6">Choose how you want your project reviewed by our industry instructors.</p>
            
            <div className="space-y-3">
              {[
                  { name: 'Basic',   price: 100,  desc: 'Score + Brief Comments', color: 'text-gray-300' },
                  { name: 'Standard', price: 500,  desc: 'Detailed Feedback and Code/Model Review', color: 'text-brand-cyan' },
                  { name: 'Premium',  price: 1000, desc: '1-Hour Private Video Walkthrough', color: 'text-purple-400' }
              ].map(tier => (
                  <button key={tier.name} onClick={() => initiateProjectPayment(tier.price)} disabled={isProcessingPayment}
                    className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-cyan/50 transition-all flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed">
                      <div>
                          <p className={`font-bold text-base ${tier.color} mb-1`}>{tier.name}</p>
                          <p className="text-xs text-gray-400">{tier.desc}</p>
                      </div>
                      <div className="text-right">
                          <p className="font-bold text-white text-lg">KES {tier.price}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 group-hover:text-brand-cyan">Select →</p>
                      </div>
                  </button>
              ))}
            </div>
            {isProcessingPayment && <p className="text-center text-sm text-brand-cyan mt-4 animate-pulse">Initializing Secure Payment...</p>}
          </div>
        </div>
      )}

      {/* ── LOGIN MODAL ──────────────────────────────────────────── */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
          <div className="bg-[#1a1210] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center relative shadow-2xl">
            <button onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 bg-brand-cyan/10 border border-brand-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-brand-cyan" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sign In to Download</h3>
            <p className="text-sm text-gray-400 mb-6">Project files are available to enrolled students. Sign in to access your downloads.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setShowLogin(false); navigate('/login'); }}
                className="w-full py-3 bg-brand-cyan text-brand-dark rounded-xl font-bold hover:bg-cyan-300 transition-all">Sign In</button>
              <button onClick={() => { setShowLogin(false); navigate('/signup'); }}
                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">Create Free Account</button>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-10">
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.04) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#18100F]/40 to-[#18100F] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-cyan/5 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/4 blur-[100px] rounded-full pointer-events-none" />

        {/* Floating badges */}
        <div className="absolute top-28 left-6 hidden xl:flex items-center gap-2 bg-[#18100F]/90 border border-white/8 rounded-xl px-3 py-2 backdrop-blur-sm z-10">
          <Globe2 className="w-4 h-4 text-brand-cyan" />
          <span className="text-xs text-gray-400">Africa-first curriculum</span>
        </div>
        <div className="absolute top-44 right-8 hidden xl:flex items-center gap-2 bg-[#18100F]/90 border border-white/8 rounded-xl px-3 py-2 backdrop-blur-sm z-10">
          <Shield className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-gray-400">Job-ready skills</span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Headline + stats */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="text-brand-cyan text-xs font-bold tracking-wider uppercase">Ubuntu Academy</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-5 leading-[1.05]">
                Master Data &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-purple-400">
                  AI for Africa
                </span>
              </h1>

              <p className="text-lg text-gray-400 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
                World-class training in Data Analytics, AI Fluency, and Agentic Systems —
                built on real Kenyan companies, real datasets, real outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <a href="#courses"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-cyan text-brand-dark rounded-full font-bold text-base hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </a>
                <button onClick={() => navigate('/assessment')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/12 text-white rounded-full font-bold text-base hover:bg-white/10 transition-all">
                  <Brain className="w-4 h-4" /> Skills Assessment
                </button>
              </div>

              {/* Counting stats */}
              <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0">
                {[
                  { val: `${s1}+`, label: 'Students',       color: 'text-brand-cyan'  },
                  { val: s2,       label: 'Real Projects',   color: 'text-purple-400'  },
                  { val: `${s3}%`, label: 'Completion Rate', color: 'text-emerald-400' },
                  { val: `${Math.floor(s4/10)}.${s4%10}★`, label: 'Avg. Rating', color: 'text-yellow-400' },
                ].map(({ val, label, color }) => (
                  <div key={label} className="bg-white/3 border border-white/6 rounded-xl p-4 text-center">
                    <div className={`text-2xl font-bold ${color} mb-0.5`}>{val}</div>
                    <div className="text-gray-600 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div className="flex-shrink-0 w-full max-w-sm mx-auto lg:mx-0">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY STRIP ────────────────────────────────────────── */}
      <div className="border-y border-white/5 py-5 bg-white/1">
        <p className="text-center text-gray-700 text-[10px] font-bold tracking-widest uppercase mb-4">Our students work at</p>
        <div className="flex gap-6 sm:gap-10 items-center justify-center flex-wrap px-4">
          {COMPANY_LOGOS.map((name) => (
            <span key={name} className="text-gray-600 text-sm font-semibold hover:text-gray-400 transition-colors">{name}</span>
          ))}
        </div>
      </div>

      {/* ── STICKY NAV ───────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-[#18100F]/96 backdrop-blur-md border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          {sectionNav.map(({ id, label, Icon: NavIcon, active, hover }) => (
            <a key={id} href={`#${id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
                activeSection === id ? active : `bg-white/4 border-white/8 text-gray-500 ${hover}`
              }`}>
              <NavIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── COURSES ──────────────────────────────────────────────── */}
      <section id="courses" className="py-20 bg-[#18100F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-brand-cyan text-xs font-bold tracking-wider uppercase bg-brand-cyan/10 px-4 py-2 rounded-full border border-brand-cyan/20">Learning Pathways</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
            From Tools to Thinking
          </h2>
          <p className="text-center text-gray-400 max-w-xl mx-auto mb-10">
            Four pathways for professionals ready to lead with data and AI — not just talk about it.
          </p>

          {/* Path connector — desktop only */}
          <div className="hidden md:flex items-center justify-center gap-0 mb-10 max-w-3xl mx-auto">
            {enhancedCourses.map((c, i) => (
              <React.Fragment key={c.id}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${c.dotColor} shadow-lg`} />
                  <span className="text-[10px] text-gray-600 font-semibold whitespace-nowrap">{c.level}</span>
                </div>
                {i < enhancedCourses.length - 1 && (
                  <div className="flex-1 flex items-center mx-2 relative -top-2.5">
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-white/5" />
                    <ChevronRight className="w-3 h-3 text-gray-700 -ml-1" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {enhancedCourses.map((c) => (
              <div key={c.id}
                className={`bg-gradient-to-br ${c.gradient} bg-[#1a1210] border border-white/8 ${c.hoverBorder} ${c.hoverGlow} rounded-2xl p-5 flex flex-col transition-all duration-300 group relative overflow-hidden`}>
                <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${c.dotColor.replace('bg-','').replace('-400','')}, transparent)` }} />

                {/* Tag + icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold border px-2.5 py-1 rounded-lg ${c.tagColor}`}>{c.tag}</span>
                  <c.Icon className={`w-5 h-5 ${c.accent} opacity-50`} />
                </div>

                <StarRating rating={c.rating} count={c.reviewCount} />

                <h3 className={`text-sm font-bold text-white mt-3 mb-2 group-hover:${c.accent} transition-colors leading-snug`}>
                  {c.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{c.description}</p>

                {/* Start date */}
                <div className={`flex items-center justify-between mb-4 px-3 py-2.5 rounded-xl ${c.accentBg} border ${c.accentBorder}`}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className={`w-3.5 h-3.5 ${c.accent}`} />
                    <span className={`text-xs font-bold ${c.accent}`}>Starts {c.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-3 h-3" />
                    <span className="text-[10px]">{c.studentsEnrolled}</span>
                  </div>
                </div>

                {/* Includes */}
                <div className="mb-4 space-y-2">
                  {c.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${c.accent} mt-0.5 flex-shrink-0`} />
                      <span className="text-xs text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 mb-4">
                  <span className="text-xl font-bold text-white">KES {c.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-600 ml-1">/ {c.duration}</span>
                </div>

                <Link to={`/course/${c.id}`}
                  className={`w-full ${c.accentBg} ${c.accent} border ${c.accentBorder} hover:opacity-70 rounded-xl px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all group/btn`}>
                  View Details <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#18100F]">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/15 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">Real Results</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">What Our Students Say</h2>
            <p className="text-gray-400 max-w-lg mx-auto">Professionals across East Africa who levelled up with Ubuntu Academy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name}
                className="bg-white/3 border border-white/8 rounded-2xl p-6 flex flex-col hover:border-white/14 transition-all duration-300 group">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <blockquote className="text-gray-300 text-sm leading-relaxed mb-5 flex-1">"{t.quote}"</blockquote>
                <div className="inline-flex items-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-lg px-3 py-2 mb-5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-bold">{t.result}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATE ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-cyan/3 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            <div className="flex-1 w-full">
              <CertificatePreview courseName={CERT_COURSES[activeCertIdx]} />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <span className="text-brand-cyan text-xs font-bold tracking-wider uppercase bg-brand-cyan/10 px-4 py-2 rounded-full border border-brand-cyan/20">
                Verifiable Credentials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-5 mb-4">
                Earn a Certificate<br />You Can Be Proud Of
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
                Every completed track earns you a verifiable digital certificate. Share it on LinkedIn,
                add it to your CV, and prove your skills with real project evidence — not just a quiz score.
              </p>

              <div className="flex flex-col gap-2 mb-8">
                <p className="text-[10px] text-gray-700 font-bold tracking-widest uppercase mb-1">Preview certificate for:</p>
                {CERT_COURSES.map((name, i) => (
                  <button key={name} onClick={() => setActiveCertIdx(i)}
                    className={`text-left text-sm px-4 py-3 rounded-xl border transition-all ${
                      activeCertIdx === i
                        ? 'bg-brand-cyan/10 border-brand-cyan/35 text-brand-cyan font-semibold'
                        : 'bg-white/3 border-white/6 text-gray-400 hover:border-white/12 hover:text-gray-300'
                    }`}>
                    {name}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { icon: <Shield className="w-4 h-4 text-brand-cyan" />,  text: 'Unique credential ID — verifiable by employers' },
                  { icon: <Globe2 className="w-4 h-4 text-purple-400" />, text: 'Shareable on LinkedIn, email, and portfolio sites' },
                  { icon: <Award className="w-4 h-4 text-yellow-400" />,  text: 'Backed by real project submissions, not just tests' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center flex-shrink-0">{icon}</div>
                    <span className="text-sm text-gray-400">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WEBINARS ─────────────────────────────────────────────── */}
      <section id="webinars" className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-purple-400 text-xs font-bold tracking-wider uppercase bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">Free Webinars</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400">Learn Before You Commit</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Expert-led sessions to explore data analytics and AI — completely free.</p>
          </div>
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {webinars.map((w) => <WebinarCard key={w.id} webinar={w} />)}
            </div>
            <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#18100F] to-transparent pointer-events-none" />
          </div>
          <div className="mt-8 max-w-xl mx-auto p-4 bg-purple-500/8 border border-purple-500/18 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <p className="text-sm text-gray-300">
              <span className="font-bold text-purple-400">Webinar bonus:</span> Attend any live session to unlock a{' '}
              <span className="text-white font-bold">10% discount</span> on enrollment.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/4 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-400 text-xs font-bold tracking-wider uppercase bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">Hands-On Projects</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-400">Build With Real Data</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real-world projects using actual data from Safaricom, KCB, Equity Bank, and Kenya Airways.
              Each project is standalone — start anywhere.
            </p>
          </div>

          {!isLoggedIn && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-brand-cyan/5 border border-brand-cyan/14 rounded-2xl flex items-center gap-4">
              <Lock className="w-5 h-5 text-brand-cyan flex-shrink-0" />
              <p className="text-sm text-gray-400">
                <button onClick={() => navigate('/login')} className="text-brand-cyan font-semibold hover:underline">Sign in</button>
                {' '}to download datasets and submit your work.{' '}
                <button onClick={() => navigate('/signup')} className="text-brand-cyan font-semibold hover:underline">Create a free account →</button>
              </p>
            </div>
          )}

          {/* Track tabs */}
          <div className="relative mb-8">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {projectTracks.map((track) => {
                const TabIcon = track.icon;
                const isActive = activeTrack === track.id;
                return (
                  <button key={track.id} onClick={() => setActiveTrack(track.id)}
                    className={`flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3.5 rounded-2xl border transition-all duration-200 min-w-[92px] ${
                      isActive
                        ? `${track.bgColor} ${track.accentColor} ${track.borderColor}`
                        : 'bg-white/3 text-gray-600 border-white/6 hover:bg-white/6 hover:text-gray-400'
                    }`}>
                    <TabIcon className={`w-5 h-5 ${isActive ? track.accentColor : 'text-gray-600'}`} />
                    <span className="text-[10px] font-bold text-center leading-tight max-w-[80px]">{track.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-[#18100F] to-transparent pointer-events-none" />
          </div>

          {/* Project track instruction */}
          <div className="max-w-2xl mx-auto mb-6 flex items-start gap-3 px-4 py-3.5 bg-orange-500/6 border border-orange-500/15 rounded-2xl">
            <span className="text-orange-400 text-lg flex-shrink-0">💡</span>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-bold text-orange-400">Switch between tracks anytime.</span>{' '}
              The tabs above let you explore projects from all four learning pathways — Excel, Power BI, AI Fluency, and Agentic AI.
              Each project is standalone — start with any one that matches your level.
            </p>
          </div>

          {/* Track header */}
          <div className={`mb-8 p-5 rounded-2xl border ${currentTrack.borderColor} ${currentTrack.bgColor} flex items-center gap-4`}>
            <div className={`w-11 h-11 rounded-xl ${currentTrack.bgColor} border ${currentTrack.borderColor} flex items-center justify-center flex-shrink-0`}>
              <TrackIcon className={`w-6 h-6 ${currentTrack.accentColor}`} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{currentTrack.title}</h3>
              <p className="text-xs text-gray-500">{currentTrack.projects.length} standalone projects · submit for instructor review · earn your certificate</p>
            </div>
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentTrack.projects.map((project, idx) => {
              const submission  = submissions[project.id];
              const status      = submission?.status || 'not_started';
              const statusInfo  = statusConfig[status];
              const StatusIcon  = statusInfo.Icon;
              const isUploading = uploading === project.id;
              const didUpload   = uploadSuccess === project.id;
              const diffMap: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
              const diff = diffMap[project.level] || 1;

              return (
                <div key={project.id}
                  className={`group bg-[#1a1210]/80 border border-white/8 ${currentTrack.hoverBorder} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)]`}>
                  <div className={`absolute -right-14 -top-14 w-44 h-44 ${currentTrack.bgColor} rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Header */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs text-gray-700 font-mono font-bold">#{String(idx + 1).padStart(2, '0')}</span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${levelColors[project.level]}`}>{project.level}</span>
                        <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg border ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />{statusInfo.label}
                        </span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-gray-600 flex-shrink-0">
                          <Clock className="w-3 h-3" />{project.estimatedTime}
                        </span>
                      </div>

                      {/* Difficulty dots */}
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3].map(i => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= diff ? currentTrack.borderColor.replace('border-','bg-').replace('/30','') : 'bg-white/8'}`} />
                        ))}
                        <span className="text-gray-700 text-[10px] ml-1">{project.level}</span>
                      </div>

                      <p className="text-[10px] text-gray-600 mb-2">
                        {project.company} · <span className="text-gray-700">{project.companyTag}</span>
                        {' · '}<span className={currentTrack.accentColor}>{project.lessonsCovered}</span>
                      </p>
                      <h4 className="text-sm font-bold text-white leading-snug mb-2">{project.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{project.description}</p>
                    </div>

                    {/* Learning outcome */}
                    <div className={`p-4 rounded-xl ${currentTrack.bgColor} border ${currentTrack.borderColor}`}>
                      <p className={`text-[10px] font-bold ${currentTrack.accentColor} uppercase tracking-wider mb-1.5`}>What you will learn</p>
                      <p className="text-xs text-gray-300 leading-relaxed">{project.learningOutcome}</p>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mb-2">Skills Practiced</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.skills.map((skill) => (
                          <span key={skill} className="text-[10px] text-gray-400 bg-white/4 border border-white/8 px-2.5 py-1 rounded-lg">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-700"><span className="text-gray-600">Data:</span> {project.dataSource}</p>

                    {submission?.admin_comments && (
                      <div className="p-4 bg-emerald-500/8 border border-emerald-500/18 rounded-xl">
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Instructor Feedback</p>
                        <p className="text-xs text-gray-300 leading-relaxed">{submission.admin_comments}</p>
                      </div>
                    )}

                    {/* Actions */}
                    {isLoggedIn ? (
                      <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                        <div className="flex gap-2">
                          {project.datasetFile && (
                            <button onClick={() => handleDownload(project.datasetFile)}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${currentTrack.bgColor} ${currentTrack.accentColor} ${currentTrack.borderColor} hover:opacity-70`}>
                              <Download className="w-3.5 h-3.5" />Dataset
                            </button>
                          )}
                          <button onClick={() => handleDownload(project.taskFile)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${currentTrack.bgColor} ${currentTrack.accentColor} ${currentTrack.borderColor} hover:opacity-70`}>
                            <Download className="w-3.5 h-3.5" />Project Task
                          </button>
                        </div>
                        <label className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                          didUpload    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : isUploading ? 'bg-white/3 text-gray-600 border-white/6 cursor-wait'
                          : 'bg-white/4 text-white border-white/12 hover:bg-white/8 hover:border-white/20'
                        }`}>
                          <input type="file" className="hidden" accept=".doc,.docx,.pdf,.xlsx" disabled={isUploading}
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setSelectedProjectForUpload({ projectId: project.id, projectTitle: project.title, trackId: currentTrack.id, file: f }); setPaymentModalOpen(true); } }} />
                          {didUpload    ? <><CheckCircle className="w-3.5 h-3.5" />Submitted!</>
                          : isUploading ? <><div className="w-3.5 h-3.5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />Uploading...</>
                          : <><Upload className="w-3.5 h-3.5" />{submission ? 'Re-submit Work' : 'Submit Your Work'}</>}
                        </label>
                      </div>
                    ) : (
                      <button onClick={() => setShowLogin(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border bg-white/3 text-gray-500 border-white/6 hover:bg-white/6 hover:text-gray-300 transition-all">
                        <Lock className="w-3.5 h-3.5" />Sign In to Access Project
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 max-w-xl mx-auto p-4 bg-orange-500/8 border border-orange-500/18 rounded-2xl flex items-center gap-3">
            <Award className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <p className="text-sm text-gray-300">
              <span className="font-bold text-orange-400">Build your portfolio:</span>{' '}
              Start anywhere. Submit for instructor review to earn your track certificate.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-brand-cyan/18 bg-gradient-to-br from-brand-cyan/7 via-transparent to-purple-500/7 p-8 md:p-14 text-center">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-cyan/6 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.025) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Career?</h3>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
                Join 500+ professionals across East Africa already building the skills the next decade demands.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#courses"
                  className="px-8 py-4 bg-brand-cyan text-brand-dark rounded-full font-bold text-base hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(34,211,238,0.2)] w-full sm:w-auto">
                  Browse Courses
                </a>
                <button onClick={() => navigate('/assessment')}
                  className="px-8 py-4 bg-white/5 border border-white/12 text-white rounded-full font-bold text-base hover:bg-white/10 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4" /> Take Skills Assessment
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
