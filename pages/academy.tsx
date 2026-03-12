import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, FileSpreadsheet, BarChart3, Brain, Zap,
  Calendar, Clock, Users, Play, Download, Lock, FolderOpen, Star,
  BookOpen, Upload, CheckCircle, AlertCircle, Eye,
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { webinars, Webinar } from '../services/webinarsData';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

// ─── Project data ─────────────────────────────────────────────────────────────
const projectTracks = [
  {
    id: 'excel',
    title: 'Data Analytics with Excel',
    icon: FileSpreadsheet,
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    glowColor: 'hover:shadow-blue-500/10',
    projects: [
      {
        id: 'ex-01', title: 'Kenyan Market Sales Dashboard',
        description: 'Build a dynamic sales dashboard for a Nairobi-based FMCG distributor using pivot tables, slicers, and conditional formatting.',
        level: 'Beginner', skills: ['Pivot Tables', 'Conditional Formatting', 'Charts'], estimatedTime: '3–4 hrs',
        datasetFile: 'excel-project-01-dataset.xlsx', taskFile: 'excel-project-01-task.pdf',
      },
      {
        id: 'ex-02', title: 'HR Workforce Analytics Model',
        description: 'Analyse employee turnover, salary bands, and department costs using XLOOKUP and structured Excel tables.',
        level: 'Intermediate', skills: ['XLOOKUP', 'Data Validation', 'Named Ranges'], estimatedTime: '4–5 hrs',
        datasetFile: 'excel-project-02-dataset.xlsx', taskFile: 'excel-project-02-task.pdf',
      },
      {
        id: 'ex-03', title: 'Budget vs Actuals Tracker',
        description: 'Create a monthly budget tracker with variance analysis and automated traffic-light indicators.',
        level: 'Intermediate', skills: ['IF/IFS Logic', 'Sparklines', 'Power Query Basics'], estimatedTime: '5–6 hrs',
        datasetFile: 'excel-project-03-dataset.xlsx', taskFile: 'excel-project-03-task.pdf',
      },
      {
        id: 'ex-04', title: 'Demand Forecasting Model',
        description: 'Build a 6-month demand forecast using moving averages, trend functions, and scenario analysis.',
        level: 'Advanced', skills: ['FORECAST.ETS', 'Scenario Manager', 'Array Formulas'], estimatedTime: '6–8 hrs',
        datasetFile: 'excel-project-04-dataset.xlsx', taskFile: 'excel-project-04-task.pdf',
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
    projects: [
      {
        id: 'pbi-01', title: 'Retail Sales Performance Report',
        description: 'Connect to a retail dataset, build a star schema, and create an executive dashboard with MTD, QTD, YTD.',
        level: 'Beginner', skills: ['Power Query', 'Star Schema', 'Basic DAX'], estimatedTime: '4–5 hrs',
        datasetFile: 'powerbi-project-01-dataset.xlsx', taskFile: 'powerbi-project-01-task.pdf',
      },
      {
        id: 'pbi-02', title: 'Financial P&L Dashboard',
        description: 'Model a Profit & Loss statement with drill-through pages and time intelligence DAX measures.',
        level: 'Intermediate', skills: ['DAX Time Intelligence', 'Drill-Through', 'Bookmarks'], estimatedTime: '5–7 hrs',
        datasetFile: 'powerbi-project-02-dataset.xlsx', taskFile: 'powerbi-project-02-task.pdf',
      },
      {
        id: 'pbi-03', title: 'Logistics & Delivery KPI Tracker',
        description: 'Track on-time delivery rates, route efficiency, and driver performance across regions.',
        level: 'Intermediate', skills: ['Calculated Columns', 'Row-Level Security', 'Maps'], estimatedTime: '5–6 hrs',
        datasetFile: 'powerbi-project-03-dataset.xlsx', taskFile: 'powerbi-project-03-task.pdf',
      },
      {
        id: 'pbi-04', title: 'Customer Segmentation & Churn Report',
        description: 'Use RFM analysis to segment customers and build a churn risk dashboard with cohort analysis.',
        level: 'Advanced', skills: ['Complex DAX', 'RFM Modeling', 'Cohort Analysis'], estimatedTime: '7–9 hrs',
        datasetFile: 'powerbi-project-04-dataset.xlsx', taskFile: 'powerbi-project-04-task.pdf',
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
    projects: [
      {
        id: 'ai-01', title: 'AI Tools Audit for Your Role',
        description: 'Map 10 AI tools relevant to your job function, evaluate their capabilities, risks, and ROI.',
        level: 'Beginner', skills: ['AI Tool Evaluation', 'Business Framing', 'Presentation'], estimatedTime: '2–3 hrs',
        datasetFile: null, taskFile: 'ai-mastery-project-01-task.pdf',
      },
      {
        id: 'ai-02', title: 'Prompt Engineering Workbook',
        description: 'Complete 15 structured prompting challenges across marketing, finance, HR, and operations.',
        level: 'Beginner', skills: ['Prompt Engineering', 'Chain-of-Thought', 'Role Prompting'], estimatedTime: '3–4 hrs',
        datasetFile: null, taskFile: 'ai-mastery-project-02-task.pdf',
      },
      {
        id: 'ai-03', title: 'AI Strategy Memo',
        description: 'Write a 2-page AI adoption strategy memo for a fictional East African company.',
        level: 'Intermediate', skills: ['Strategic Thinking', 'AI Ethics', 'Business Writing'], estimatedTime: '4–5 hrs',
        datasetFile: null, taskFile: 'ai-mastery-project-03-task.pdf',
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
    projects: [
      {
        id: 'ag-01', title: 'Lead Qualification Agent with n8n',
        description: 'Build an n8n workflow that captures leads, scores them using AI, and routes qualified leads to a CRM.',
        level: 'Intermediate', skills: ['n8n Workflows', 'Webhooks', 'OpenAI API'], estimatedTime: '4–6 hrs',
        datasetFile: null, taskFile: 'agents-project-01-task.pdf',
      },
      {
        id: 'ag-02', title: 'Document Summarisation Pipeline',
        description: 'Create an agent that reads uploaded PDFs, extracts key insights, and sends a structured summary.',
        level: 'Intermediate', skills: ['LangChain', 'PDF Parsing', 'Email Automation'], estimatedTime: '5–7 hrs',
        datasetFile: null, taskFile: 'agents-project-02-task.pdf',
      },
      {
        id: 'ag-03', title: 'Multi-Agent Research Assistant',
        description: 'Design a CrewAI multi-agent system with researcher, analyst, and writer agents.',
        level: 'Advanced', skills: ['CrewAI', 'Agent Roles', 'Tool Use'], estimatedTime: '7–9 hrs',
        datasetFile: null, taskFile: 'agents-project-03-task.pdf',
      },
      {
        id: 'ag-04', title: 'Customer Support Bot Deployment',
        description: 'Build and deploy a knowledge-based support chatbot using OpenAI Assistants API.',
        level: 'Advanced', skills: ['OpenAI Assistants', 'RAG', 'Deployment'], estimatedTime: '8–10 hrs',
        datasetFile: null, taskFile: 'agents-project-04-task.pdf',
      },
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Advanced: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  not_started:   { label: 'Not Started',   color: 'text-gray-400 bg-gray-500/10 border-gray-500/20',    icon: Clock },
  submitted:     { label: 'Submitted',     color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',    icon: CheckCircle },
  under_review:  { label: 'Under Review',  color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', icon: Eye },
  reviewed:      { label: 'Reviewed ✓',   color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
};

// ─── Component ────────────────────────────────────────────────────────────────
const AcademyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [loading] = React.useState(false);
  const [activeTrack, setActiveTrack] = React.useState('excel');
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);
  const [submissions, setSubmissions] = React.useState<Record<string, any>>({});
  const [uploading, setUploading] = React.useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = React.useState<string | null>(null);

  // Fetch existing submissions for this user
  React.useEffect(() => {
    if (!user) return;
    supabase
      .from('project_submissions')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, any> = {};
          data.forEach((s) => { map[s.project_id] = s; });
          setSubmissions(map);
        }
      });
  }, [user]);

  const handleDownload = (fileName: string | null) => {
    if (!fileName) return;
    if (!isLoggedIn) { setShowLoginPrompt(true); return; }
    // TODO: replace with real Supabase Storage URL
    const url = `https://your-supabase-url.supabase.co/storage/v1/object/public/projects/${fileName}`;
    window.open(url, '_blank');
  };

  const handleUpload = async (projectId: string, projectTitle: string, track: string, file: File) => {
    if (!user) return;
    setUploading(projectId);
    try {
      const filePath = `submissions/${user.id}/${projectId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('project-submissions')
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('project-submissions')
        .getPublicUrl(filePath);

      const submission = {
        user_id: user.id,
        project_id: projectId,
        project_title: projectTitle,
        track,
        file_url: urlData.publicUrl,
        file_name: file.name,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('project_submissions')
        .upsert(submission, { onConflict: 'user_id,project_id' })
        .select()
        .single();

      if (error) throw error;
      setSubmissions((prev) => ({ ...prev, [projectId]: data }));
      setUploadSuccess(projectId);
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(null);
    }
  };

  const enhancedCourses = [
    { id: 'excel-workshop', title: 'Data Analytics with Excel', level: 'Foundation', description: 'Learn how to structure problems, think analytically, and make better decisions using data', price: 20000, duration: '3 months', icon: FileSpreadsheet, includes: ['Advanced Excel formulas and logic', 'Power Query and Power Pivot foundations', 'Business problem structuring frameworks', 'Decision-ready Excel models'], gradient: 'from-blue-500/10 to-cyan-500/10', accentColor: 'text-blue-400' },
    { id: 'powerbi-workshop', title: 'Decision Systems with Power BI', level: 'Core', description: 'Turn data into decision-ready dashboards and decision systems leaders trust and actually use.', price: 25000, duration: '3 months', icon: BarChart3, includes: ['Power Query data transformation', 'Star-schema data modelling', 'DAX measures and time intelligence', 'Executive-ready Power BI dashboards'], gradient: 'from-purple-500/10 to-pink-500/10', accentColor: 'text-purple-400' },
    { id: 'ai-mastery', title: 'AI Fluency for Business Leaders', level: 'AI Mastery', description: 'Understand how to use AI confidently and responsibly to improve decisions, productivity, and strategy.', price: 7500, duration: '1 month', icon: Brain, includes: ['How modern AI systems think', 'Prompt engineering for real work', 'AI tools and workflows', 'Responsible, career-driven AI usage'], gradient: 'from-emerald-500/10 to-teal-500/10', accentColor: 'text-emerald-400' },
    { id: 'ai-agents-masterclass', title: 'Agentic Systems for Decision Automation', level: 'Advanced', description: 'Design AI systems that support decision-making, execution, and scale across the business.', price: 12500, duration: '1 month', icon: Zap, includes: ['AI agent design fundamentals', 'n8n Automation, APIs, and Agentic Workflows', 'Knowledge, memory, and tools', 'Deploying agents across channels'], gradient: 'from-orange-500/10 to-red-500/10', accentColor: 'text-orange-400' },
  ];

  // ─── Webinar Card ─────────────────────────────────────────────────────────
  const WebinarCard = ({ webinar }: { webinar: Webinar }) => (
    <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/60 to-black/40 border border-purple-500/20 rounded-2xl p-6 flex flex-col hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute -left-12 -top-12 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />
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
      <p className="text-sm text-gray-400 mb-5 leading-relaxed flex-1">{webinar.shortDescription}</p>
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
          <span>Host: <span className="text-gray-300">{webinar.host}</span></span>
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

  const currentTrack = projectTracks.find((t) => t.id === activeTrack)!;

  return (
    <div className="bg-[#18100F] min-h-screen">

      {/* ── LOGIN PROMPT MODAL ── */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#1a1210] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center relative">
            <button onClick={() => setShowLoginPrompt(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-lg">✕</button>
            <div className="w-14 h-14 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-brand-cyan" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sign In to Download</h3>
            <p className="text-sm text-gray-400 mb-6">Project files are available to enrolled students. Please sign in to access your downloads.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setShowLoginPrompt(false); navigate('/login'); }} className="w-full py-3 bg-brand-cyan text-brand-dark rounded-lg font-bold hover:bg-cyan-300 transition-all">Sign In</button>
              <button onClick={() => { setShowLoginPrompt(false); navigate('/signup'); }} className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition-all">Create Account</button>
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Transform your career with world-class training in Data Analytics, AI, and Agentic Systems.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
            <a href="#courses" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-brand-cyan/10 border border-white/10 hover:border-brand-cyan/40 text-gray-300 hover:text-brand-cyan rounded-full text-sm font-semibold transition-all duration-200">
              <BookOpen className="w-4 h-4" />Learning Pathways
            </a>
            <a href="#webinars" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/40 text-gray-300 hover:text-purple-400 rounded-full text-sm font-semibold transition-all duration-200">
              <Play className="w-4 h-4" />Webinars
            </a>
            <a href="#projects" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-orange-500/10 border border-white/10 hover:border-orange-500/40 text-gray-300 hover:text-orange-400 rounded-full text-sm font-semibold transition-all duration-200">
              <FolderOpen className="w-4 h-4" />Projects
            </a>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="courses" className="py-20 bg-[#18100F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-brand-cyan text-xs md:text-sm font-semibold tracking-wider uppercase bg-brand-cyan/10 px-4 py-2 rounded-full border border-brand-cyan/20">Learning Pathways</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent px-4">From Tools to Thinking</h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">Pathways for professionals ready to influence decisions, not just learn skills.</p>
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {enhancedCourses.map((course) => {
                const IconComponent = course.icon;
                return (
                  <div key={course.id} className={`bg-gradient-to-br ${course.gradient} backdrop-blur-sm bg-gray-900/40 border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col hover:border-brand-cyan/50 hover:shadow-lg hover:shadow-brand-cyan/10 transition-all duration-300 group relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="mb-4 flex items-center justify-between">
                        <span className={`text-xs font-bold ${course.accentColor} uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10`}>{course.level}</span>
                        <div className="flex items-center gap-2"><IconComponent className={`w-5 h-5 ${course.accentColor}`} /><span className="text-xs text-gray-500 font-medium">{course.duration}</span></div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">{course.title}</h3>
                      <p className="text-sm text-gray-400 mb-6 leading-relaxed">{course.description}</p>
                      <div className="mb-6 space-y-2.5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What is Included</p>
                        {course.includes.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 ${course.accentColor} mt-0.5 flex-shrink-0`} />
                            <span className="text-xs text-gray-400 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mb-4 pt-4 border-t border-white/5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">KES {course.price.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">/ {course.duration}</span>
                        </div>
                      </div>
                      <Link to={`/course/${course.id}`} className="w-full bg-gradient-to-r from-brand-cyan/10 to-brand-cyan/5 hover:from-brand-cyan hover:to-brand-cyan/80 text-brand-cyan hover:text-black border border-brand-cyan/30 hover:border-brand-cyan rounded-lg px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn">
                        More Details<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent px-4">Learn Before You Commit</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto px-4">Join our free webinars to explore data analytics and AI before enrolling.</p>
          </div>

          {/* ── Horizontal scroll on desktop, stacked on mobile ── */}
          <div className="hidden md:flex flex-row-reverse gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[...webinars].reverse().map((w) => (
              <WebinarCard key={w.id} webinar={{ ...w, status: 'completed' }} />
            ))}
          </div>
          <div className="md:hidden flex flex-col gap-6">
            {webinars.map((w) => (
              <WebinarCard key={w.id} webinar={{ ...w, status: 'completed' }} />
            ))}
          </div>

          <div className="mt-10 max-w-2xl mx-auto p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 animate-pulse flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-purple-400">Pro tip:</span> Attend any live webinar to unlock an exclusive <span className="text-white font-semibold">10% discount</span> on any course enrollment!
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent px-4">Practice What You Learn</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto px-4">Real-world projects for every course. Download, complete, and submit for instructor review.</p>
          </div>

          {/* Guest nudge */}
          {!isLoggedIn && (
            <div className="max-w-2xl mx-auto mb-10 p-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl flex items-center gap-4">
              <Lock className="w-5 h-5 text-brand-cyan flex-shrink-0" />
              <p className="text-sm text-gray-300 flex-1">
                <button onClick={() => navigate('/login')} className="text-brand-cyan font-semibold underline underline-offset-2">Sign in</button> to download project files.{' '}
                <button onClick={() => navigate('/signup')} className="text-brand-cyan underline underline-offset-2 font-semibold">Create a free account</button>
              </p>
            </div>
          )}

          {/* Track tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {projectTracks.map((track) => {
              const Icon = track.icon;
              const isActive = activeTrack === track.id;
              return (
                <button key={track.id} onClick={() => setActiveTrack(track.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${isActive ? `${track.bgColor} ${track.accentColor} ${track.borderColor}` : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}`}>
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
              <p className="text-sm text-gray-400">{currentTrack.projects.length} projects available — beginner to advanced</p>
            </div>
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentTrack.projects.map((project, idx) => {
              const submission = submissions[project.id];
              const status = submission?.status || 'not_started';
              const statusInfo = statusConfig[status];
              const StatusIcon = statusInfo.icon;
              const isUploading = uploading === project.id;
              const didUpload = uploadSuccess === project.id;

              return (
                <div key={project.id} className="group bg-gray-900/40 border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute -right-10 -top-10 w-32 h-32 ${currentTrack.bgColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                  <div className="relative z-10">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 font-mono">#{String(idx + 1).padStart(2, '0')}</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${levelColors[project.level]}`}>{project.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Submission status */}
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />{statusInfo.label}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" />{project.estimatedTime}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 leading-snug">{project.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.skills.map((skill) => (
                        <span key={skill} className="text-xs text-gray-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">{skill}</span>
                      ))}
                    </div>

                    {/* Admin feedback */}
                    {submission?.admin_comments && (
                      <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <p className="text-xs font-semibold text-emerald-400 mb-1">Instructor Feedback</p>
                        <p className="text-sm text-gray-300">{submission.admin_comments}</p>
                      </div>
                    )}

                    {/* Action buttons */}
                    {isLoggedIn ? (
                      <div className="flex flex-col gap-2">
                        {/* Download row */}
                        <div className="flex gap-2">
                          {project.datasetFile && (
                            <button onClick={() => handleDownload(project.datasetFile)}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${currentTrack.bgColor} ${currentTrack.accentColor} ${currentTrack.borderColor} hover:opacity-80`}>
                              <Download className="w-3.5 h-3.5" />Dataset
                            </button>
                          )}
                          <button onClick={() => handleDownload(project.taskFile)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${currentTrack.bgColor} ${currentTrack.accentColor} ${currentTrack.borderColor} hover:opacity-80`}>
                            <Download className="w-3.5 h-3.5" />Project Task
                          </button>
                        </div>

                        {/* Upload row */}
                        <label className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                          didUpload
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : isUploading
                            ? 'bg-white/5 text-gray-500 border-white/10 cursor-wait'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}>
                          <input type="file" className="hidden" accept=".doc,.docx,.pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUpload(project.id, project.title, currentTrack.id, file);
                            }}
                            disabled={isUploading}
                          />
                          {didUpload ? (
                            <><CheckCircle className="w-3.5 h-3.5" />Submitted!</>
                          ) : isUploading ? (
                            <><div className="w-3.5 h-3.5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />Uploading...</>
                          ) : (
                            <><Upload className="w-3.5 h-3.5" />{submission ? 'Re-submit Work' : 'Submit Your Work'}</>
                          )}
                        </label>
                      </div>
                    ) : (
                      <button onClick={() => setShowLoginPrompt(true)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border bg-white/5 text-gray-500 border-white/10 hover:bg-white/8 hover:text-gray-300 cursor-pointer transition-all">
                        <Lock className="w-4 h-4" />Sign In to Access
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
                <span className="font-semibold text-orange-400">Build your portfolio:</span> Submit projects for instructor review to earn a certificate of completion.
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
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join hundreds of professionals who have already started their journey with Ubuntu Academy.</p>
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
