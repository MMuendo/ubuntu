/**
 * academy.tsx — Ubuntu AnalytIQ
 *
 * FONTS: Add to public/index.html <head>:
 * <link rel="preconnect" href="https://fonts.bunny.net" />
 * <link href="https://fonts.bunny.net/css?family=syne:700,800|dm-sans:400,500" rel="stylesheet" />
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, FileSpreadsheet, BarChart3, Brain, Zap,
  Calendar, Clock, Users, Play, Download, Lock, FolderOpen, Star,
  BookOpen, Upload, CheckCircle, Eye, Award, TrendingUp, Shield,
  Globe2, Sparkles, X,
} from 'lucide-react';
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
  accent: { text: string; bg: string; border: string; dot: string; topBar: string };
  projects: Project[];
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = 0;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const prog = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - prog, 3)) * target));
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

// ─── Static data ──────────────────────────────────────────────────────────────
const LIVE_ACTIVITY = [
  { initials: 'AW', name: 'Amina W.',     color: 'bg-cyan-700',    action: 'submitted',   item: 'EX-03 KCB Loan Analyser',       time: '2m ago' },
  { initials: 'KM', name: 'Kevin M.',     color: 'bg-violet-700',  action: 'enrolled in', item: 'Agentic AI for Business',        time: '5m ago' },
  { initials: 'CO', name: 'Christine O.', color: 'bg-emerald-700', action: 'completed',   item: 'Power BI P&L Dashboard',        time: '11m ago' },
  { initials: 'BK', name: 'Brian K.',     color: 'bg-orange-700',  action: 'downloaded',  item: 'Kenya Airways Dataset',          time: '18m ago' },
  { initials: 'FA', name: 'Fatuma A.',    color: 'bg-blue-700',    action: 'submitted',   item: 'AG-01 Lead Qualification Agent', time: '25m ago' },
  { initials: 'JO', name: 'James O.',     color: 'bg-rose-700',    action: 'enrolled in', item: 'AI Fluency for Business',        time: '31m ago' },
];

const TESTIMONIALS = [
  { name: 'Christine Mutua', role: 'Data Analyst · Equity Bank Kenya', initials: 'CM', color: 'bg-cyan-700',
    quote: "The Excel track completely changed how I present data to leadership. Within 2 months I was building pivot dashboards my manager used in board meetings. Best career investment I've ever made.",
    course: 'Data Analytics with Excel', result: '+40% salary in 6 months' },
  { name: 'Kevin Omondi', role: 'Operations Lead · Safaricom M-Pesa', initials: 'KO', color: 'bg-violet-700',
    quote: "The Power BI course gave me tools I use every single day. I automated a report that used to take 3 hours manually. My team now has real-time dashboards they can actually trust.",
    course: 'Business Analytics with Power BI', result: 'Saved 12 hrs/week on reporting' },
  { name: 'Fatuma Abdi', role: 'BI Engineer · KCB Group', initials: 'FA', color: 'bg-orange-700',
    quote: "The Agentic AI course is genuinely advanced. I built a lead qualification agent for our SME team in 3 weeks. It handles 200+ leads a day. This is the future of banking operations in Africa.",
    course: 'Agentic AI for Business', result: 'Agent processes 200+ leads/day' },
];

const COMPANY_LOGOS = ['Safaricom', 'Equity Bank', 'KCB Group', 'Kenya Airways', 'Absa Kenya', 'NCBA Bank', 'KPMG', 'PwC Kenya'];
const CERT_COURSES  = ['Data Analytics with Excel', 'Business Analytics with Power BI', 'AI Fluency for Business Leaders', 'Agentic AI for Business'];

const projectTracks: Track[] = [
  {
    id: 'excel', title: 'Data Analytics with Excel', icon: FileSpreadsheet,
    accent: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-400', topBar: 'from-blue-500 to-cyan-400' },
    projects: [
      { id: 'ex-01', title: 'Ubuntu AnalytIQ: Safaricom Subscriber Tracker', company: 'Safaricom PLC', companyTag: 'NSE: SCOM', lessonsCovered: 'Lessons 1–8', level: 'Beginner', estimatedTime: '3–4 hrs',
        description: "Build a clean workbook tracking Safaricom's mobile subscribers, M-Pesa users, home fibre, and revenue per user across five financial years.",
        skills: ['Excel Interface & Navigation','Data Entry & Formatting','SUM, AVERAGE, COUNT','Absolute vs Relative References','Bar & Line Charts','Print Area & Page Layout'],
        learningOutcome: 'Confidently navigate Excel, structure real business data, write your first formulas, and produce a chart-ready subscriber report.',
        dataSource: 'Safaricom Annual Report FY2024 (safaricom.co.ke)',
        datasetFile: 'Ubuntu%20Analytiq%20-%20Safaricom%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Safaricom%20task.pdf' },
      { id: 'ex-02', title: 'Ubuntu AnalytIQ: M-Pesa Revenue Analyser', company: 'M-Pesa / Safaricom', companyTag: 'M-Pesa Africa', lessonsCovered: 'Lessons 9–12', level: 'Intermediate', estimatedTime: '4–5 hrs',
        description: 'M-Pesa processed over KES 36 trillion in FY2023. Apply conditional formatting, logical functions, and lookup formulas to identify top revenue categories.',
        skills: ['Conditional Formatting','IF, AND, OR Logic','VLOOKUP & XLOOKUP','LEFT, RIGHT, CONCATENATE','Combo Charts','Sparklines'],
        learningOutcome: 'Move beyond basic Excel — writing logic-driven formulas, building lookup models, and producing a multi-series chart dashboard.',
        dataSource: 'Safaricom Annual Report FY2024 — M-Pesa segment disclosures',
        datasetFile: 'Ubuntu%20Analytiq%20-%20M-pesa%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20M-pesa%20task.pdf' },
      { id: 'ex-03', title: 'Ubuntu AnalytIQ: KCB Loan Portfolio Analyser', company: 'KCB Group PLC', companyTag: 'NSE: KCB', lessonsCovered: 'Lessons 13–16', level: 'Intermediate', estimatedTime: '5–6 hrs',
        description: "KCB Group holds one of East Africa's largest loan books at over KES 900 billion. Build a pivot-table model with calculated fields and NPL ratios.",
        skills: ['Pivot Tables','Calculated Fields & Items','Data Grouping','Advanced Data Validation','Sheet & Workbook Protection','Recording a Basic Macro'],
        learningOutcome: 'Master pivot tables — the single most powerful Excel skill for analysts — and learn to lock down your work for professional delivery.',
        dataSource: 'KCB Group Annual Report & Financial Statements 2023',
        datasetFile: 'Ubuntu%20Analytiq%20-%20KCB%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20KCB%20task.pdf' },
      { id: 'ex-04', title: 'Ubuntu AnalytIQ: Equity Bank Branch Performance Model', company: 'Equity Group Holdings', companyTag: 'NSE: EQTY', lessonsCovered: 'Lessons 17–19', level: 'Advanced', estimatedTime: '6–7 hrs',
        description: 'Build a dynamic branch ranking model with INDEX/MATCH, FILTER arrays, and a pivot chart with slicers for country-level drill-down.',
        skills: ['INDEX & MATCH','Dynamic Arrays (FILTER, SORT)','Nested IF & IFS','Power Query Basics','Advanced Pivot Charts','Slicers & Timelines'],
        learningOutcome: 'Write formulas analysts use daily, build self-updating models with dynamic arrays, and create an interactive pivot dashboard.',
        dataSource: 'Equity Group Holdings Annual Report 2023',
        datasetFile: 'Ubuntu%20Analytiq%20-%20Equity%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Equity%20task.pdf' },
      { id: 'ex-05', title: 'Ubuntu AnalytIQ: Kenya Airways Route Profitability Dashboard', company: 'Kenya Airways PLC', companyTag: 'NSE: KQ', lessonsCovered: 'Lessons 20–24', level: 'Advanced', estimatedTime: '7–9 hrs',
        description: 'Build a fully dynamic dashboard using Scenario Manager for fuel-cost shocks, Goal Seek for break-even load factors, and a VBA refresh button.',
        skills: ['Scenario Manager & What-If Analysis','Goal Seek & Solver','Dynamic Charts','Form Controls & Slicers','VBA Macro Automation','Dashboard Design'],
        learningOutcome: 'A board-ready dashboard that auto-refreshes, models financial scenarios, and runs VBA scripts — the full advanced Excel toolkit.',
        dataSource: 'Kenya Airways Annual Report & Investor Presentation 2023',
        datasetFile: 'Ubuntu%20Analytiq%20-%20Kenya%20Airways%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Kenya%20Airways%20task.pdf' },
    ],
  },
  {
    id: 'powerbi', title: 'Business Analytics with Power BI', icon: BarChart3,
    accent: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', dot: 'bg-violet-400', topBar: 'from-violet-500 to-pink-500' },
    projects: [
      { id: 'pbi-01', title: 'Ubuntu AnalytIQ: Retail Sales Performance Report', company: 'Retail Dataset', companyTag: 'Kenyan Market', lessonsCovered: 'Lessons 1–4', level: 'Beginner', estimatedTime: '4–5 hrs', description: 'Connect to a retail dataset, build a star schema, and create an executive dashboard with MTD, QTD, and YTD comparisons.', skills: ['Power Query','Star Schema','Basic DAX','Date Tables','Bar Charts'], learningOutcome: 'Load and shape data in Power Query, build your first star schema, and produce a clean executive report.', dataSource: 'Synthetic Kenyan retail dataset', datasetFile: 'Ubuntu%20Analytiq%20-%20Duka%20Fresh%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Duka%20Fresh%20Task.pdf' },
      { id: 'pbi-02', title: 'Ubuntu AnalytIQ: Financial P&L Dashboard', company: 'Finance Dataset', companyTag: 'Kenyan Market', lessonsCovered: 'Lessons 5–8', level: 'Intermediate', estimatedTime: '5–7 hrs', description: 'Model a Profit & Loss statement with drill-through pages, dynamic titles, and time intelligence DAX measures.', skills: ['DAX Time Intelligence','Drill-Through','Bookmarks','Dynamic Titles'], learningOutcome: 'Write time intelligence DAX, build drill-through navigation, and deliver a finance-grade P&L report.', dataSource: 'Synthetic P&L dataset', datasetFile: 'Ubuntu%20Analytiq%20-%20Jua%20Kali%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Jua%20Kali%20Task.pdf' },
      { id: 'pbi-03', title: 'Ubuntu AnalytIQ: Logistics KPI Tracker', company: 'Logistics Dataset', companyTag: 'Kenyan Market', lessonsCovered: 'Lessons 9–12', level: 'Intermediate', estimatedTime: '5–6 hrs', description: 'Track on-time delivery rates, route efficiency, and driver performance across regions.', skills: ['Calculated Columns','Row-Level Security','Maps','KPI Visuals'], learningOutcome: 'Build a map-enabled operations dashboard with RLS and KPI card visuals.', dataSource: 'Synthetic logistics dataset', datasetFile: 'Ubuntu%20Analytiq%20-%20Swift%20Delivery%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Swift%20Delivery%20Task.pdf' },
      { id: 'pbi-04', title: 'Ubuntu AnalytIQ: Customer Segmentation Report', company: 'CRM Dataset', companyTag: 'Kenyan Market', lessonsCovered: 'Lessons 13–16', level: 'Advanced', estimatedTime: '7–9 hrs', description: 'Use RFM analysis to segment customers and build a churn risk dashboard with cohort analysis.', skills: ['Complex DAX','RFM Modeling','Cohort Analysis','What-If Parameters'], learningOutcome: 'Master complex DAX, build RFM segmentation logic, and deliver a churn-risk dashboard executives trust.', dataSource: 'Synthetic CRM dataset', datasetFile: 'Ubuntu%20Analytiq%20-%20Duka%20Smart%20Dataset.xlsx', taskFile: 'Ubuntu%20Analytiq%20-%20Duka%20Smart%20Task.pdf' },
    ],
  },
  {
    id: 'ai-mastery', title: 'AI Fluency for Business', icon: Brain,
    accent: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400', topBar: 'from-emerald-500 to-teal-400' },
    projects: [
      { id: 'ai-01', title: 'Ubuntu AnalytIQ: AI Tools Audit for Your Role', company: 'Your Organisation', companyTag: 'Any Industry', lessonsCovered: 'Module 1–2', level: 'Beginner', estimatedTime: '2–3 hrs', description: 'Map 10 AI tools relevant to your job function, evaluate their capabilities, risks, and ROI.', skills: ['AI Tool Evaluation','Business Framing','ROI Analysis','Risk Assessment'], learningOutcome: 'A clear map of AI tools for your role and a framework for evaluating any new tool.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-01-tools-audit-task.pdf' },
      { id: 'ai-02', title: 'Ubuntu AnalytIQ: Prompt Engineering Workbook', company: 'Cross-Industry', companyTag: 'Any Role', lessonsCovered: 'Module 3–4', level: 'Beginner', estimatedTime: '3–4 hrs', description: 'Complete 15 structured prompting challenges across marketing, finance, HR, and operations.', skills: ['Prompt Engineering','Chain-of-Thought','Role Prompting','Output Structuring'], learningOutcome: 'Write prompts that get consistent, professional-grade AI outputs for real business tasks.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-02-prompt-workbook-task.pdf' },
      { id: 'ai-03', title: 'Ubuntu AnalytIQ: AI Strategy Memo', company: 'Fictional EA Company', companyTag: 'East Africa', lessonsCovered: 'Module 5–6', level: 'Intermediate', estimatedTime: '4–5 hrs', description: 'Write a 2-page AI adoption strategy memo identifying 3 high-impact use cases.', skills: ['Strategic Thinking','AI Ethics','Business Writing','Use Case Design'], learningOutcome: 'Confidently advise leadership on AI adoption — the skill that separates AI-fluent professionals from the rest.', dataSource: 'No dataset required', datasetFile: null, taskFile: 'ai-03-strategy-memo-task.pdf' },
    ],
  },
  {
    id: 'ai-agents', title: 'Agentic AI for Business', icon: Zap,
    accent: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', dot: 'bg-orange-400', topBar: 'from-orange-500 to-amber-400' },
    projects: [
      { id: 'ag-01', title: 'Ubuntu AnalytIQ: Lead Qualification Agent', company: 'n8n + OpenAI', companyTag: 'Automation', lessonsCovered: 'Module 1–2', level: 'Intermediate', estimatedTime: '4–6 hrs', description: 'Build an n8n workflow that captures leads, scores them using AI, and routes qualified leads to a CRM via webhook.', skills: ['n8n Workflows','Webhooks','OpenAI API','CRM Integration'], learningOutcome: 'Ship a working AI agent that automates a real sales process end-to-end.', dataSource: 'No dataset required', datasetFile: 'AG-01%20Lead%20Qualification%20Agent.json', taskFile: 'Ubuntu%20Analytiq%20AG-01-task.pdf' },
      { id: 'ag-02', title: 'Ubuntu AnalytIQ: Document Summarisation Pipeline', company: 'LangChain + Email', companyTag: 'Automation', lessonsCovered: 'Module 3–4', level: 'Intermediate', estimatedTime: '5–7 hrs', description: 'Create an agent that reads uploaded PDFs, extracts key insights, and sends a structured summary report via email.', skills: ['LangChain','PDF Parsing','Email Automation','Prompt Chaining'], learningOutcome: 'Build a document intelligence pipeline that saves hours of manual reading every week.', dataSource: 'Sample PDF documents provided', datasetFile: 'AG-02%20Document%20Summarisation%20Pipeline.json', taskFile: 'Ubuntu%20Analytiq%20AG-02-task.pdf' },
      { id: 'ag-03', title: 'Ubuntu AnalytIQ: Multi-Agent Research Assistant', company: 'CrewAI', companyTag: 'Agentic Systems', lessonsCovered: 'Module 5–6', level: 'Advanced', estimatedTime: '7–9 hrs', description: 'Design a CrewAI system with a researcher, analyst, and writer agent that produces business reports autonomously.', skills: ['CrewAI','Agent Roles & Tools','Task Chaining','Output Formatting'], learningOutcome: 'Orchestrate multiple AI agents working together — one of the most in-demand skills in enterprise AI.', dataSource: 'No dataset required', datasetFile: 'AG-03%20Multi-Agent%20Research%20Assistant.json', taskFile: 'Ubuntu%20Analytiq%20AG-03-task.pdf' },
      { id: 'ag-04', title: 'Ubuntu AnalytIQ: Customer Support Bot', company: 'OpenAI Assistants', companyTag: 'Deployment', lessonsCovered: 'Module 7–8', level: 'Advanced', estimatedTime: '8–10 hrs', description: 'Build and deploy a knowledge-based customer support chatbot with memory and handoff logic.', skills: ['OpenAI Assistants API','RAG','Memory & Context','Bot Deployment'], learningOutcome: 'A fully deployed, production-ready AI support agent with retrieval-augmented generation.', dataSource: 'Sample knowledge base provided', datasetFile: 'AG-04%20Customer%20Support%20Bot%20(Duka%20Smart).json', taskFile: 'Ubuntu%20Analytiq%20AG-04-task.pdf' },
    ],
  },
];

const enhancedCourses = [
  { id: 'excel-workshop',        title: 'Data Analytics with Excel',        level: 'Foundation',  startDate: '20 June 2025',  rating: 4.9, reviewCount: 60, studentsEnrolled: 15, tag: 'Most Popular',  price: 12500, duration: '3 months', Icon: FileSpreadsheet, includes: ['Advanced formulas & logic','Power Query foundations','Pivot table mastery','Board-ready dashboards'], accent: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', topBar: 'from-blue-500 to-cyan-400', dot: 'bg-blue-400', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20' } },
  { id: 'powerbi-workshop',      title: 'Business Analytics with Power BI', level: 'Core',        startDate: '7 April 2025',  rating: 4.8, reviewCount: 30, studentsEnrolled: 10, tag: 'Starting Soon', price: 15000, duration: '3 months', Icon: BarChart3,      includes: ['Power Query transformation','Star-schema modelling','DAX time intelligence','Executive Power BI reports'], accent: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', topBar: 'from-violet-500 to-pink-500', dot: 'bg-violet-400', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20' } },
  { id: 'ai-mastery',            title: 'AI Fluency for Business Leaders',  level: 'AI Mastery',  startDate: '4 May 2025',    rating: 4.9, reviewCount: 15, studentsEnrolled: 12, tag: 'New Cohort',    price: 2500,  duration: '1 month',  Icon: Brain,         includes: ['How modern AI thinks','Prompt engineering mastery','AI tools & workflows','Responsible AI in Africa'], accent: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', topBar: 'from-emerald-500 to-teal-400', dot: 'bg-emerald-400', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' } },
  { id: 'ai-agents-masterclass', title: 'Agentic AI for Business',          level: 'Advanced',    startDate: '5 May 2025',    rating: 4.7, reviewCount: 80, studentsEnrolled: 25, tag: 'Top Rated',    price: 5000,  duration: '1 month',  Icon: Zap,           includes: ['AI agent design fundamentals','n8n, APIs & agentic workflows','Knowledge, memory & tools','Deploy agents across channels'], accent: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', topBar: 'from-orange-500 to-amber-400', dot: 'bg-orange-400', tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20' } },
];

const levelColors: Record<string, string> = {
  Beginner:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Advanced:     'text-red-400 bg-red-500/10 border-red-500/20',
};
const statusConfig: Record<string, { label: string; color: string; Icon: React.ElementType }> = {
  not_started:  { label: 'Not Started',  color: 'text-[#5A5652] bg-white/4 border-white/8',         Icon: Clock },
  submitted:    { label: 'Submitted',    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',   Icon: CheckCircle },
  under_review: { label: 'Under Review', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', Icon: Eye },
  reviewed:     { label: 'Reviewed',     color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', Icon: CheckCircle2 },
};
const sectionNav = [
  { id: 'courses',  label: 'Learning Pathways', Icon: BookOpen },
  { id: 'webinars', label: 'Webinars',           Icon: Play },
  { id: 'projects', label: 'Projects',           Icon: FolderOpen },
];
const sectionNavColors: Record<string, { active: string; hover: string }> = {
  courses:  { active: 'bg-cyan-500/10 border-cyan-500/35 text-cyan-400',    hover: 'hover:bg-cyan-500/6 hover:text-cyan-400' },
  webinars: { active: 'bg-violet-500/10 border-violet-500/35 text-violet-400', hover: 'hover:bg-violet-500/6 hover:text-violet-400' },
  projects: { active: 'bg-orange-500/10 border-orange-500/35 text-orange-400', hover: 'hover:bg-orange-500/6 hover:text-orange-400' },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children, color = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
}) => (
  <span className={`inline-block text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border mb-3 ${color}`}>
    {children}
  </span>
);

const StarRating: React.FC<{ rating: number; count: number }> = ({ rating, count }) => (
  <div className="flex items-center gap-1.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} className={`w-3 h-3 ${i <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-white/10'}`} />
    ))}
    <span className="text-amber-400 text-[11px] font-semibold ml-0.5">{rating}</span>
    <span className="text-[#5A5652] text-[11px]">({count})</span>
  </div>
);

const ActivityFeed: React.FC = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => (v + 1) % 5), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-[#141210] border border-white/8 rounded-2xl p-5 w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#5A5652]">Live Activity</span>
      </div>
      <div className="space-y-1">
        {LIVE_ACTIVITY.slice(0, 5).map((a, i) => (
          <div key={i} className={`flex items-center gap-3 py-2 px-3 rounded-xl transition-all duration-500 ${i === tick ? 'bg-white/4 border border-white/7' : 'opacity-30'}`}>
            <div className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center flex-shrink-0`}>
              <span className="text-white text-[10px] font-bold">{a.initials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-[#8A8680] truncate">
                <span className="text-[#F0EDE8] font-medium">{a.name}</span> {a.action}
              </p>
              <p className="text-[10px] text-[#5A5652] truncate">{a.item}</p>
            </div>
            <span className="text-[10px] text-[#5A5652] flex-shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificatePreview: React.FC<{ courseName: string }> = ({ courseName }) => (
  <div className="relative w-full max-w-lg mx-auto">
    <div className="bg-[#0F1C14] border border-cyan-500/20 rounded-2xl overflow-hidden">
      <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400" />
      {[['top-4 left-4 border-t border-l rounded-tl-lg'], ['top-4 right-4 border-t border-r rounded-tr-lg'], ['bottom-4 left-4 border-b border-l rounded-bl-lg'], ['bottom-4 right-4 border-b border-r rounded-br-lg']].map((cls, i) => (
        <div key={i} className={`absolute w-6 h-6 border-cyan-400/20 ${cls[0]}`} />
      ))}
      <div className="px-8 py-8 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
            <Brain className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-cyan-400 font-bold text-[12px] tracking-wider" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
            Ubuntu AnalytIQ
          </span>
        </div>
        <p className="text-[#5A5652] text-[10px] tracking-widest uppercase mb-3">Certificate of Completion</p>
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mx-auto mb-4" />
        <p className="text-[#8A8680] text-[11px] mb-1.5">This certifies that</p>
        <h2 className="text-4xl font-extrabold text-[#F0EDE8] mb-1 tracking-wide" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
          Greatness
        </h2>
        <p className="text-[#8A8680] text-[11px] mb-3">has successfully completed</p>
        <div className="inline-block px-4 py-2 bg-cyan-500/8 border border-cyan-500/18 rounded-xl mb-4">
          <p className="text-cyan-400 font-semibold text-[13px]">{courseName}</p>
        </div>
        <div className="flex justify-center gap-0.5 mb-5">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/6">
          <div className="text-left">
            <p className="text-[#5A5652] text-[9px] uppercase tracking-wider">Issued By</p>
            <p className="text-[#F0EDE8] text-[12px] font-semibold">Ubuntu AnalytIQ</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-right">
            <p className="text-[#5A5652] text-[9px] uppercase tracking-wider">Credential ID</p>
            <p className="text-[#F0EDE8] text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>UA-2025-0042</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface WebinarCardProps { webinar: (typeof webinars)[number]; }
const WebinarCard: React.FC<WebinarCardProps> = ({ webinar }) => (
  <div className="flex-shrink-0 w-68 bg-[#141210] border border-white/7 rounded-2xl p-5 flex flex-col hover:border-violet-500/30 transition-all duration-300 group snap-start overflow-hidden relative">
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border text-[#5A5652] bg-white/3 border-white/8 flex items-center gap-1.5">
        <Play className="w-2.5 h-2.5" /> Replay
      </span>
      <span className="text-[11px] text-[#5A5652]">{webinar.duration}</span>
    </div>
    <h3 className="text-[13px] font-bold text-[#F0EDE8] mb-2 group-hover:text-violet-400 transition-colors leading-snug line-clamp-2" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
      {webinar.title}
    </h3>
    <p className="text-[12px] text-[#8A8680] mb-4 leading-relaxed flex-1 line-clamp-3">{webinar.shortDescription}</p>
    <div className="space-y-1.5 mb-4">
      <div className="flex items-center gap-2 text-[11px] text-[#5A5652]">
        <Calendar className="w-3 h-3 text-violet-400 flex-shrink-0" /><span>{webinar.date}</span>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-[#5A5652]">
        <Users className="w-3 h-3 text-emerald-400 flex-shrink-0" />
        <span>Host: <span className="text-[#8A8680]">{webinar.host}</span></span>
      </div>
    </div>
    <Link
      to={`/webinar/${webinar.id}`}
      className="w-full bg-violet-500/8 hover:bg-violet-500 text-violet-400 hover:text-white border border-violet-500/20 hover:border-violet-500 rounded-xl px-4 py-2.5 text-[12px] font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn"
    >
      Watch Recording <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
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
  const [selectedProjectForUpload, setSelectedProjectForUpload] = useState<{ projectId: string; projectTitle: string; trackId: string; file: File } | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { ref: statsRef, inView: statsVisible } = useInView(0.3);
  const s1 = useCountUp(150, 2000, statsVisible);
  const s2 = useCountUp(16,  1500, statsVisible);
  const s3 = useCountUp(94,  2200, statsVisible);
  const s4 = useCountUp(49,  1800, statsVisible);

  useEffect(() => {
    if (!user) return;
    supabase.from('project_submissions').select('*').eq('user_id', user.id).then(({ data }) => {
      if (!data) return;
      const map: Record<string, any> = {};
      data.forEach(s => { map[s.project_id] = s; });
      setSubmissions(map);
    });
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ['courses', 'webinars', 'projects'].forEach(id => {
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
      setSubmissions(prev => ({ ...prev, [projectId]: data }));
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
      key: '',
      email: user.email,
      amount: toSmallestUnit(amount),
      currency,
      ref,
      metadata: {
        custom_fields: [
          { display_name: 'Project', variable_name: 'project_title', value: selectedProjectForUpload.projectTitle },
          { display_name: 'Project ID', variable_name: 'project_id', value: selectedProjectForUpload.projectId },
        ],
      },
      onSuccess: async () => {
        setIsProcessingPayment(false);
        setPaymentModalOpen(false);
        await processUpload(selectedProjectForUpload.projectId, selectedProjectForUpload.projectTitle, selectedProjectForUpload.trackId, selectedProjectForUpload.file);
        setSelectedProjectForUpload(null);
      },
      onCancel: () => { setIsProcessingPayment(false); },
    });
  };

  const currentTrack = projectTracks.find(t => t.id === activeTrack)!;
  const TrackIcon = currentTrack.icon;

  return (
    <div className="bg-[#0E0C0B] min-h-screen text-[#F0EDE8]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── PAYMENT MODAL ─────────────────────────────────────────────────── */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#1A1714] border border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => { setPaymentModalOpen(false); setSelectedProjectForUpload(null); setIsProcessingPayment(false); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[#5A5652] hover:text-[#F0EDE8] hover:bg-white/8 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-[18px] font-bold text-[#F0EDE8] text-center mb-1" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
              Instructor Review
            </h3>
            <p className="text-[13px] text-[#8A8680] text-center mb-6">Choose how you want your project reviewed by our industry instructors.</p>
            <div className="space-y-3">
              {[
                { name: 'Basic',    price: 100,  desc: 'Score + Brief Comments',                color: 'text-[#F0EDE8]' },
                { name: 'Standard', price: 500,  desc: 'Detailed Feedback and Code/Model Review', color: 'text-cyan-400' },
                { name: 'Premium',  price: 1000, desc: '1-Hour Private Video Walkthrough',        color: 'text-violet-400' },
              ].map(tier => (
                <button
                  key={tier.name}
                  onClick={() => initiateProjectPayment(tier.price)}
                  disabled={isProcessingPayment}
                  className="w-full text-left p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/7 hover:border-cyan-500/30 transition-all flex items-center justify-between group disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <div>
                    <p className={`font-bold text-[14px] ${tier.color} mb-0.5`}>{tier.name}</p>
                    <p className="text-[12px] text-[#8A8680]">{tier.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#F0EDE8] text-[16px]">KES {tier.price}</p>
                    <p className="text-[10px] text-[#5A5652] group-hover:text-cyan-400 transition-colors">Select →</p>
                  </div>
                </button>
              ))}
            </div>
            {isProcessingPayment && (
              <p className="text-center text-[13px] text-cyan-400 mt-4 animate-pulse">Initializing Secure Payment…</p>
            )}
          </div>
        </div>
      )}

      {/* ── LOGIN MODAL ───────────────────────────────────────────────────── */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#1A1714] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[#5A5652] hover:text-[#F0EDE8] hover:bg-white/8 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-[18px] font-bold text-[#F0EDE8] mb-1" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
              Sign In to Download
            </h3>
            <p className="text-[13px] text-[#8A8680] mb-6 leading-[1.7]">
              Project files are available to enrolled students. Sign in to access your downloads.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setShowLogin(false); navigate('/login'); }}
                className="w-full py-3 bg-cyan-400 text-[#0A0908] rounded-xl font-semibold text-[14px] hover:bg-cyan-300 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => { setShowLogin(false); navigate('/signup'); }}
                className="w-full py-3 bg-white/4 border border-white/10 text-[#F0EDE8] rounded-xl font-medium text-[13px] hover:bg-white/8 transition-all"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-white/7 px-6 pt-20 pb-16 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.025) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/4 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-400 text-[11px] font-semibold tracking-[0.14em] uppercase">Ubuntu Academy</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.07] tracking-tight mb-5" style={{ fontFamily: "'Syne', system-ui, sans-serif", letterSpacing: '-0.02em' }}>
                Master Data &amp;<br />
                <span className="text-cyan-400">AI for Africa</span>
              </h1>

              <p className="text-[15px] text-[#8A8680] max-w-xl mb-8 leading-[1.75]">
                World-class training in Data Analytics, AI Fluency, and Agentic Systems —
                built on real Kenyan companies, real datasets, real outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href="#courses"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-400 text-[#0A0908] rounded-full font-semibold text-[14px] hover:bg-cyan-300 transition-all"
                >
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => navigate('/assessment')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/4 border border-white/10 text-[#F0EDE8] rounded-full font-medium text-[14px] hover:bg-white/8 transition-all"
                >
                  <Brain className="w-4 h-4" /> Skills Assessment
                </button>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg">
                {[
                  { val: `${s1}+`, label: 'Students',       color: 'text-cyan-400' },
                  { val: s2,       label: 'Real Projects',   color: 'text-violet-400' },
                  { val: `${s3}%`, label: 'Completion Rate', color: 'text-emerald-400' },
                  { val: `${Math.floor(s4 / 10)}.${s4 % 10}★`, label: 'Avg. Rating', color: 'text-amber-400' },
                ].map(({ val, label, color }) => (
                  <div key={label} className="bg-[#141210] border border-white/7 rounded-xl p-3.5 text-center">
                    <div className={`text-[20px] font-extrabold ${color} mb-0.5 leading-none`} style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>{val}</div>
                    <div className="text-[#5A5652] text-[10px]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-b border-white/7 px-6 py-4 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-4 overflow-hidden flex-wrap">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#5A5652] flex-shrink-0">Our students work at</span>
          <div className="w-px h-4 bg-white/10 flex-shrink-0" />
          <div className="flex gap-5 items-center flex-wrap">
            {COMPANY_LOGOS.map(name => (
              <span key={name} className="text-[12px] text-[#5A5652] font-medium">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ───────────────────────────────────────────────────── */}
      <div className="sticky top-14 z-40 bg-[#0E0C0B]/95 backdrop-blur-md border-b border-white/7 py-2.5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex items-center justify-center gap-2">
          {sectionNav.map(({ id, label, Icon: NavIcon }) => {
            const colors = sectionNavColors[id];
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium transition-all duration-200 ${
                  activeSection === id ? colors.active : `bg-white/3 border-white/7 text-[#5A5652] ${colors.hover}`
                }`}
              >
                <NavIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ── COURSES ──────────────────────────────────────────────────────── */}
      <section id="courses" className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <SectionLabel>Learning Pathways</SectionLabel>
          </div>
          <h2 className="text-3xl md:text-[42px] font-extrabold text-center mb-3 tracking-tight text-[#F0EDE8]" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
            From Tools to <span className="text-cyan-400">Thinking</span>
          </h2>
          <p className="text-center text-[14px] text-[#8A8680] max-w-xl mx-auto mb-12 leading-[1.75]">
            Four pathways for professionals ready to lead with data and AI — not just talk about it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {enhancedCourses.map(c => (
              <div
                key={c.id}
                className="group relative bg-[#141210] border border-white/8 hover:border-white/14 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.accent.topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-semibold border px-2.5 py-1 rounded-full ${c.accent.tagColor}`}>{c.tag}</span>
                  <c.Icon className={`w-4 h-4 ${c.accent.text} opacity-40`} />
                </div>

                <StarRating rating={c.rating} count={c.reviewCount} />

                <div>
                  <h3 className="text-[13px] font-bold text-[#F0EDE8] mb-1.5 leading-snug" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                    {c.title}
                  </h3>
                </div>

                <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${c.accent.bg} border ${c.accent.border}`}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className={`w-3 h-3 ${c.accent.text}`} />
                    <span className={`text-[11px] font-semibold ${c.accent.text}`}>Starts {c.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#5A5652]">
                    <Users className="w-3 h-3" />
                    <span className="text-[10px]">{c.studentsEnrolled}</span>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1">
                  {c.includes.map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3 h-3 ${c.accent.text} mt-0.5 flex-shrink-0`} />
                      <span className="text-[11px] text-[#8A8680] leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6">
                  <span className="text-[18px] font-extrabold text-[#F0EDE8]" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                    KES {c.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#5A5652] ml-1">/ {c.duration}</span>
                </div>

                <Link
                  to={`/course/${c.id}`}
                  className={`w-full ${c.accent.bg} ${c.accent.text} border ${c.accent.border} hover:opacity-70 rounded-xl px-4 py-2.5 text-[12px] font-semibold flex items-center justify-center gap-2 transition-all`}
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20">Real Results</SectionLabel>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-[#F0EDE8] mt-2 mb-3 tracking-tight" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
              What Our Students Say
            </h2>
            <p className="text-[14px] text-[#8A8680] max-w-lg mx-auto leading-[1.75]">
              Professionals across East Africa who levelled up with Ubuntu Academy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-[#141210] border border-white/7 hover:border-white/12 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <blockquote className="text-[13px] text-[#8A8680] leading-[1.75] flex-1 italic">"{t.quote}"</blockquote>
                <div className="inline-flex items-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-full px-3 py-1.5 w-fit">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-[11px] font-medium text-emerald-400">{t.result}</span>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/7">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-[11px] font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#F0EDE8]">{t.name}</p>
                    <p className="text-[11px] text-[#5A5652]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATE ──────────────────────────────────────────────────── */}
      <section className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="w-full">
              <CertificatePreview courseName={CERT_COURSES[activeCertIdx]} />
            </div>
            <div className="text-center lg:text-left">
              <SectionLabel>Verifiable Credentials</SectionLabel>
              <h2 className="text-3xl md:text-[36px] font-extrabold text-[#F0EDE8] mt-3 mb-4 tracking-tight leading-[1.1]" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                Earn a Certificate<br />
                <span className="text-cyan-400">You Can Be Proud Of</span>
              </h2>
              <p className="text-[14px] text-[#8A8680] leading-[1.75] mb-6 max-w-md mx-auto lg:mx-0">
                Every completed track earns you a verifiable digital certificate. Share it on LinkedIn,
                add it to your CV, and prove your skills with real project evidence — not just a quiz score.
              </p>

              <div className="flex flex-col gap-2 mb-8">
                <p className="text-[10px] text-[#5A5652] font-semibold tracking-widest uppercase mb-1">Preview certificate for:</p>
                {CERT_COURSES.map((name, i) => (
                  <button
                    key={name}
                    onClick={() => setActiveCertIdx(i)}
                    className={`text-left text-[13px] px-4 py-2.5 rounded-xl border transition-all ${
                      activeCertIdx === i
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-semibold'
                        : 'bg-white/3 border-white/7 text-[#8A8680] hover:border-white/12 hover:text-[#F0EDE8]'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { icon: <Shield className="w-4 h-4 text-cyan-400" />,  text: 'Unique credential ID — verifiable by employers' },
                  { icon: <Globe2 className="w-4 h-4 text-violet-400" />, text: 'Shareable on LinkedIn, email, and portfolio sites' },
                  { icon: <Award className="w-4 h-4 text-amber-400" />,  text: 'Backed by real project submissions, not just tests' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center flex-shrink-0">{icon}</div>
                    <span className="text-[13px] text-[#8A8680]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WEBINARS ─────────────────────────────────────────────────────── */}
      <section id="webinars" className="px-6 py-20 lg:px-8 border-b border-white/7 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel color="text-violet-400 bg-violet-500/10 border-violet-500/20">Free Webinars</SectionLabel>
            <h2 className="text-3xl md:text-[42px] font-extrabold mt-2 mb-3 tracking-tight text-[#F0EDE8]" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
              Learn Before <span className="text-violet-400">You Commit</span>
            </h2>
            <p className="text-[14px] text-[#8A8680] max-w-xl mx-auto leading-[1.75]">
              Expert-led sessions to explore data analytics and AI — completely free.
            </p>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {webinars.map(w => <WebinarCard key={w.id} webinar={w} />)}
            </div>
            <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-[#0E0C0B] to-transparent pointer-events-none" />
          </div>
          <div className="mt-8 max-w-xl mx-auto p-4 bg-violet-500/6 border border-violet-500/15 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0" />
            <p className="text-[13px] text-[#8A8680]">
              <span className="font-semibold text-violet-400">Webinar bonus:</span>{' '}
              Attend any live session to unlock a{' '}
              <span className="text-[#F0EDE8] font-semibold">10% discount</span> on enrolment.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="px-6 py-20 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel color="text-orange-400 bg-orange-500/10 border-orange-500/20">Hands-On Projects</SectionLabel>
            <h2 className="text-3xl md:text-[42px] font-extrabold mt-2 mb-3 tracking-tight text-[#F0EDE8]" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
              Build With <span className="text-orange-400">Real Data</span>
            </h2>
            <p className="text-[14px] text-[#8A8680] max-w-2xl mx-auto leading-[1.75]">
              Real-world projects using actual data from Safaricom, KCB, Equity Bank, and Kenya Airways.
              Each project is standalone — start anywhere.
            </p>
          </div>

          {!isLoggedIn && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-cyan-500/5 border border-cyan-500/14 rounded-2xl flex items-center gap-3">
              <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <p className="text-[13px] text-[#8A8680]">
                <button onClick={() => navigate('/login')} className="text-cyan-400 font-semibold hover:underline">Sign in</button>
                {' '}to download datasets and submit your work.{' '}
                <button onClick={() => navigate('/signup')} className="text-cyan-400 font-semibold hover:underline">Create a free account →</button>
              </p>
            </div>
          )}

          {/* Track tabs */}
          <div className="relative mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {projectTracks.map(track => {
                const TabIcon = track.icon;
                const isActive = activeTrack === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => setActiveTrack(track.id)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border transition-all duration-200 min-w-[84px] ${
                      isActive
                        ? `${track.accent.bg} ${track.accent.text} ${track.accent.border}`
                        : 'bg-white/3 text-[#5A5652] border-white/7 hover:bg-white/5 hover:text-[#8A8680]'
                    }`}
                  >
                    <TabIcon className={`w-4 h-4 ${isActive ? track.accent.text : 'text-[#5A5652]'}`} />
                    <span className="text-[10px] font-semibold text-center leading-tight max-w-[76px]">{track.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#0E0C0B] to-transparent pointer-events-none" />
          </div>

          {/* Tip */}
          <div className="max-w-2xl mx-auto mb-6 flex items-start gap-3 px-4 py-3.5 bg-orange-500/5 border border-orange-500/14 rounded-2xl">
            <span className="text-orange-400 text-base flex-shrink-0">💡</span>
            <p className="text-[13px] text-[#8A8680] leading-relaxed">
              <span className="font-semibold text-orange-400">Switch between tracks anytime.</span>{' '}
              Each project is standalone — start with any one that matches your level.
            </p>
          </div>

          {/* Track header */}
          <div className={`mb-6 p-4 rounded-2xl border ${currentTrack.accent.border} ${currentTrack.accent.bg} flex items-center gap-3`}>
            <div className={`w-10 h-10 rounded-xl ${currentTrack.accent.bg} border ${currentTrack.accent.border} flex items-center justify-center flex-shrink-0`}>
              <TrackIcon className={`w-5 h-5 ${currentTrack.accent.text}`} />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#F0EDE8]" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                {currentTrack.title}
              </h3>
              <p className="text-[11px] text-[#5A5652]">
                {currentTrack.projects.length} standalone projects · submit for instructor review · earn your certificate
              </p>
            </div>
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div
                  key={project.id}
                  className={`group relative bg-[#141210] border border-white/8 hover:border-white/14 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${currentTrack.accent.topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div>
                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] text-[#5A5652] font-mono font-semibold">#{String(idx + 1).padStart(2, '0')}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${levelColors[project.level]}`}>{project.level}</span>
                      <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusInfo.color}`}>
                        <StatusIcon className="w-2.5 h-2.5" />{statusInfo.label}
                      </span>
                      <span className="ml-auto flex items-center gap-1 text-[11px] text-[#5A5652] flex-shrink-0">
                        <Clock className="w-3 h-3" />{project.estimatedTime}
                      </span>
                    </div>

                    {/* Difficulty dots */}
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3].map(i => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= diff ? currentTrack.accent.dot : 'bg-white/10'}`} />
                      ))}
                    </div>

                    <p className="text-[10px] text-[#5A5652] mb-1.5">
                      {project.company} · <span className="text-[#3A3836]">{project.companyTag}</span>
                      {' · '}<span className={currentTrack.accent.text}>{project.lessonsCovered}</span>
                    </p>
                    <h4 className="text-[14px] font-bold text-[#F0EDE8] mb-2 leading-snug" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                      {project.title}
                    </h4>
                    <p className="text-[12px] text-[#8A8680] leading-[1.7]">{project.description}</p>
                  </div>

                  {/* Learning outcome */}
                  <div className={`p-4 rounded-xl ${currentTrack.accent.bg} border ${currentTrack.accent.border}`}>
                    <p className={`text-[10px] font-bold ${currentTrack.accent.text} uppercase tracking-wider mb-1.5`}>What you will learn</p>
                    <p className="text-[12px] text-[#8A8680] leading-[1.7]">{project.learningOutcome}</p>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-[10px] text-[#5A5652] font-semibold uppercase tracking-wider mb-2">Skills Practiced</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.map(skill => (
                        <span key={skill} className="text-[10px] text-[#8A8680] bg-white/4 border border-white/7 px-2 py-0.5 rounded-lg">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[10px] text-[#5A5652]"><span className="text-[#3A3836]">Data:</span> {project.dataSource}</p>

                  {submission?.admin_comments && (
                    <div className="p-3.5 bg-emerald-500/6 border border-emerald-500/15 rounded-xl">
                      <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Instructor Feedback</p>
                      <p className="text-[12px] text-[#8A8680] leading-[1.7]">{submission.admin_comments}</p>
                    </div>
                  )}

                  {/* Actions */}
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-2 pt-3 border-t border-white/7">
                      <div className="flex gap-2">
                        {project.datasetFile && (
                          <button
                            onClick={() => handleDownload(project.datasetFile)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[11px] font-semibold border transition-all ${currentTrack.accent.bg} ${currentTrack.accent.text} ${currentTrack.accent.border} hover:opacity-70`}
                          >
                            <Download className="w-3 h-3" />Dataset
                          </button>
                        )}
                        <button
                          onClick={() => handleDownload(project.taskFile)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[11px] font-semibold border transition-all ${currentTrack.accent.bg} ${currentTrack.accent.text} ${currentTrack.accent.border} hover:opacity-70`}
                        >
                          <Download className="w-3 h-3" />Project Task
                        </button>
                      </div>
                      <label
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[12px] font-semibold border cursor-pointer transition-all ${
                          didUpload
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : isUploading
                            ? 'bg-white/3 text-[#5A5652] border-white/7 cursor-wait'
                            : 'bg-white/4 text-[#F0EDE8] border-white/10 hover:bg-white/8 hover:border-white/18'
                        }`}
                      >
                        <input
                          type="file"
                          className="hidden"
                          accept=".doc,.docx,.pdf,.xlsx"
                          disabled={isUploading}
                          onChange={e => {
                            const f = e.target.files?.[0];
                            if (f) {
                              setSelectedProjectForUpload({ projectId: project.id, projectTitle: project.title, trackId: currentTrack.id, file: f });
                              setPaymentModalOpen(true);
                            }
                          }}
                        />
                        {didUpload ? (
                          <><CheckCircle className="w-3.5 h-3.5" />Submitted!</>
                        ) : isUploading ? (
                          <><div className="w-3 h-3 border-2 border-[#5A5652] border-t-transparent rounded-full animate-spin" />Uploading…</>
                        ) : (
                          <><Upload className="w-3.5 h-3.5" />{submission ? 'Re-submit Work' : 'Submit Your Work'}</>
                        )}
                      </label>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowLogin(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[12px] font-medium border bg-white/3 text-[#5A5652] border-white/7 hover:bg-white/6 hover:text-[#8A8680] transition-all"
                    >
                      <Lock className="w-3 h-3" />Sign In to Access Project
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 max-w-xl mx-auto p-4 bg-orange-500/6 border border-orange-500/15 rounded-2xl flex items-center gap-3">
            <Award className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <p className="text-[13px] text-[#8A8680]">
              <span className="font-semibold text-orange-400">Build your portfolio:</span>{' '}
              Start anywhere. Submit for instructor review to earn your track certificate.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 lg:px-8 border-t border-white/7">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#141210] border border-white/10 rounded-2xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-[32px] font-extrabold text-[#F0EDE8] mb-3 tracking-tight" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                Ready to Transform Your Career?
              </h3>
              <p className="text-[14px] text-[#8A8680] mb-8 max-w-md mx-auto leading-[1.75]">
                Join 500+ professionals across East Africa already building the skills the next decade demands.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#courses"
                  className="px-6 py-3 bg-cyan-400 text-[#0A0908] rounded-full font-semibold text-[14px] hover:bg-cyan-300 transition-all w-full sm:w-auto text-center"
                >
                  Browse Courses
                </a>
                <button
                  onClick={() => navigate('/assessment')}
                  className="px-6 py-3 bg-white/4 border border-white/10 text-[#F0EDE8] rounded-full font-medium text-[14px] hover:bg-white/8 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
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
