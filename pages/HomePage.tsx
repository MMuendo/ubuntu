import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, MapPin, Phone, Mail, CheckCircle2, MessageCircle,
  FileSpreadsheet, BarChart3, Brain, Zap, Quote, Database,
  Share2, Cog, Bot, ChevronRight, Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// ─── Tiny utility: animate a number into view ─────────────────────────────────
const useCountUp = (end: number, trigger: boolean, duration = 1600) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf: number;
    let start: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setN(Math.round(p < 1 ? end * (1 - Math.pow(1 - p, 3)) : end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, trigger, duration]);
  return n;
};

const useInView = (threshold = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return { ref, inView: v };
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const COURSES = [
  {
    id: 'excel-workshop', title: 'Data Analytics with Excel', level: 'Foundation',
    description: 'Learn how to structure problems, think analytically, and make better decisions using data',
    price: 12500, duration: '3 months', icon: FileSpreadsheet,
    startDate: '20 June 2025', urgency: 'Enrolling now',
    includes: ['Advanced Excel formulas and logic', 'Power Query and Power Pivot foundations', 'Business problem structuring frameworks', 'Decision-ready Excel models'],
    accent: 'blue',
    cls: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hover: 'hover:border-blue-400/50', glow: 'rgba(59,130,246,0.12)' },
  },
  {
    id: 'powerbi-workshop', title: 'Business Analytics with Power BI', level: 'Core',
    description: 'Turn data into decision-ready dashboards and decision systems leaders trust and actually use.',
    price: 15000, duration: '3 months', icon: BarChart3,
    startDate: '7 April 2025', urgency: 'Starting soon',
    includes: ['Power Query data transformation', 'Star-schema data modelling', 'DAX measures and time intelligence', 'Executive-ready Power BI dashboards'],
    accent: 'purple',
    cls: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', hover: 'hover:border-purple-400/50', glow: 'rgba(168,85,247,0.12)' },
  },
  {
    id: 'ai-mastery', title: 'AI Fluency for Business Leaders', level: 'AI Mastery',
    description: 'Understand how to use AI confidently and responsibly to improve decisions, productivity, and strategy.',
    price: 2500, duration: '1 month', icon: Brain,
    startDate: '4 May 2025', urgency: 'Spots filling',
    includes: ['How modern AI systems think', 'Prompt engineering for real work', 'AI tools and workflows', 'Responsible, career-driven AI usage'],
    accent: 'emerald',
    cls: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', hover: 'hover:border-emerald-400/50', glow: 'rgba(16,185,129,0.12)' },
  },
  {
    id: 'ai-agents-masterclass', title: 'Agentic AI for Business', level: 'Advanced',
    description: 'Design AI systems that support decision-making, execution, and scale across the business.',
    price: 5000, duration: '1 month', icon: Zap,
    startDate: '5 May 2025', urgency: 'New cohort',
    includes: ['AI agent design fundamentals', 'n8n Automation, APIs, and Agentic Workflows', 'Knowledge, memory, and tools', 'Deploying agents across channels'],
    accent: 'orange',
    cls: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', hover: 'hover:border-orange-400/50', glow: 'rgba(249,115,22,0.12)' },
  },
];

const TESTIMONIALS = [
  { name: 'Eric Onchonga',   role: 'CEO, Irri-hub',              avatar: 'EO', color: 'bg-cyan-500',   rating: 5, content: 'Delivered an insightful Power BI dashboard integrated with Zoho Books and Zoho CRM APIs, providing real-time financial and customer visibility for our agricultural operations.' },
  { name: 'Duncan Mutulu',   role: 'Director, World Vision',     avatar: 'DM', color: 'bg-purple-500', rating: 5, content: 'Built my supply chain inventory dashboard and trained me on Power BI Desktop and Service, enabling independent report development and management.' },
  { name: 'Monicah Gitagia', role: 'Student, Microsoft Excel',   avatar: 'MG', color: 'bg-emerald-500',rating: 5, content: 'Ezra is a firm and fun tutor who provided one-on-one Excel coaching, significantly improving my confidence, efficiency, and accuracy in daily data analysis.' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { ref: statRef, inView: statVisible } = useInView(0.3);
  const c1 = useCountUp(150, statVisible);
  const c2 = useCountUp(16,  statVisible, 1400);
  const c3 = useCountUp(94,  statVisible, 1800);

  const handleEnroll = (course: { id: string; title: string; price: number; description: string }) =>
    navigate(`/enroll?courseId=${course.id}&courseName=${encodeURIComponent(course.title)}&coursePrice=${course.price}&courseDescription=${encodeURIComponent(course.description)}`);

  return (
    <div className="bg-[#18100F] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          1. HERO  — value proposition in under 4 seconds
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-24">

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.028]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.9) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-brand-cyan/6 blur-[160px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-blue-500/4 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-500/4 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#18100F]" />
        </div>

        {/* Floating stat badges — anchored to layout, not overlapping text */}
        <div className="absolute top-28 left-5 lg:left-16 z-10 hidden md:block animate-float">
          <div className="bg-[#0C0A09]/95 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/8 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">Revenue Growth</span>
            </div>
            <p className="text-xl font-bold text-white">+47.5%</p>
          </div>
        </div>

        <div className="absolute bottom-36 right-5 lg:right-16 z-10 hidden md:block animate-float" style={{ animationDelay: '0.8s' }}>
          <div className="bg-[#0C0A09]/95 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/8 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" />
              <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">Data Accuracy</span>
            </div>
            <p className="text-xl font-bold text-white">99.2%</p>
          </div>
        </div>

        <div className="absolute top-1/3 right-5 lg:right-24 z-10 hidden lg:block animate-float" style={{ animationDelay: '1.4s' }}>
          <div className="bg-[#0C0A09]/95 backdrop-blur-xl rounded-2xl px-4 py-3 border border-brand-blue/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <p className="text-[9px] text-brand-blue font-bold tracking-widest uppercase mb-1">AI Insights</p>
            <p className="text-sm font-bold text-white">Actionable</p>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

          {/* Category pill */}
          <div className="inline-flex items-center gap-2 bg-brand-cyan/8 border border-brand-cyan/20 rounded-full px-5 py-2 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="text-brand-cyan text-xs font-bold tracking-widest uppercase">
              Data &amp; AI Career Platform · East Africa
            </span>
          </div>

          {/* Headline — outcome first */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-white tracking-tight leading-[1.04] mb-6">
            Unlock Your Potential With
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-blue">
              AI &amp; Data Fluency
            </span>
          </h1>

          {/* Sub — condensed, scannable */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-[1.7] mb-12">
            We build intelligence, enable people, and automate insight using Agentic AI, analytics consulting,
            and capability enablement to turn data into action.
            Through mentorship and courses in Analytics, AI, and Agentic AI Mastery, we develop Data &amp; AI fluency
            and automate decision workflows.
          </p>

          {/* CTA block — one primary, one quiet secondary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {/* PRIMARY — dominant weight */}
            <button
              onClick={() => navigate('/assessment')}
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-brand-cyan text-brand-dark rounded-full font-bold text-lg hover:bg-cyan-300 transition-all shadow-[0_0_40px_rgba(34,211,238,0.35)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] hover:scale-[1.02] active:scale-100"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* SECONDARY — visually quiet */}
            <a
              href="https://www.linkedin.com/company/106319269"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-gray-400 font-semibold text-base hover:text-white transition-colors"
            >
              Learn More <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Proof strip — numbers animate in */}
          <div ref={statRef} className="grid grid-cols-3 divide-x divide-white/6 max-w-sm mx-auto">
            {[
              { val: `${c1}+`, label: 'Students trained' },
              { val: `${c2}`,  label: 'Live projects'    },
              { val: `${c3}%`, label: 'Completion rate'  },
            ].map(({ val, label }) => (
              <div key={label} className="px-6 text-center">
                <p className="text-2xl font-bold text-white">{val}</p>
                <p className="text-[11px] text-gray-600 mt-0.5 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. WHO WE ARE  — transformation narrative
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-brand-cyan text-[11px] font-bold tracking-[0.18em] uppercase bg-brand-cyan/8 border border-brand-cyan/18 px-4 py-2 rounded-full mb-5">
              About Ubuntu Analytiq
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-brand-cyan leading-tight">
              Building Intelligence,<br />Enabling People
            </h2>
            <p className="text-gray-400 mt-5 text-lg leading-relaxed max-w-2xl mx-auto">
              We transform professionals into decision-makers who lead with data, think with AI, and automate with purpose.
            </p>
          </div>

          {/* Card — framed with corner accents for premium feel */}
          <div className="relative max-w-4xl mx-auto bg-white/2 border border-white/8 rounded-3xl p-10 md:p-14 overflow-hidden">
            {/* L-accents */}
            <span className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-brand-cyan/20 rounded-tl-xl pointer-events-none" />
            <span className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-brand-cyan/20 rounded-tr-xl pointer-events-none" />
            <span className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-brand-cyan/20 rounded-bl-xl pointer-events-none" />
            <span className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-brand-cyan/20 rounded-br-xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/3 via-transparent to-purple-500/3 pointer-events-none" />

            <div className="relative z-10 text-center space-y-6 text-gray-300 text-lg md:text-xl leading-[1.75] max-w-3xl mx-auto">
              <p>
                Ubuntu Academy was born from a simple truth:{' '}
                <span className="text-brand-cyan font-semibold">
                  the future belongs to those who can think with data and act with AI.
                </span>
              </p>
              <p>
                We saw too many organizations drowning in tools but starving for insight. Too many professionals learning skills
                but not building systems. Too many dashboards that looked impressive but answered no real questions.
              </p>
              <p>
                So we built something different. A practice that blends{' '}
                <span className="text-brand-cyan font-semibold">
                  analytics consulting, capability development, and intelligent automation
                </span>
                {' '}— designed not to create dependency, but to build self-sufficient, AI-fluent organizations.
              </p>
              <p className="text-white font-semibold text-base pt-6 border-t border-white/8">
                From Excel to Agentic AI, we meet you where you are and take you where you need to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SERVICES  — three cards, generous spacing
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/18 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Services</h2>
            <p className="text-gray-400 text-lg">Build capability, unlock insight, automate outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: BarChart3, iconCls: 'text-brand-cyan', iconBg: 'bg-brand-cyan/8 border-brand-cyan/15', hoverBg: 'group-hover:bg-brand-cyan/15',
                hoverBorder: 'hover:border-brand-cyan/30', shadow: 'hover:shadow-[0_0_50px_rgba(34,211,238,0.05)]',
                title: 'Business Analytics & Data Science',
                body: 'Turn raw data into confident decisions. We transform messy data into clear insights through analysis, modeling, dashboards, storytelling, research, and actionable recommendations for growth, efficiency, and profitability.',
              },
              {
                Icon: Brain, iconCls: 'text-purple-400', iconBg: 'bg-purple-500/8 border-purple-500/15', hoverBg: 'group-hover:bg-purple-500/15',
                hoverBorder: 'hover:border-purple-400/30', shadow: 'hover:shadow-[0_0_50px_rgba(168,85,247,0.05)]',
                title: 'Workshops, Training & Mentorship',
                body: 'Build analytics and AI skills that deliver results. We offer hands-on training and mentorship for individuals and teams in Business Analytics, Data Science, AI & Agentic AI, and analytics leadership.',
              },
              {
                Icon: Bot, iconCls: 'text-blue-400', iconBg: 'bg-blue-500/8 border-blue-500/15', hoverBg: 'group-hover:bg-blue-500/15',
                hoverBorder: 'hover:border-blue-400/30', shadow: 'hover:shadow-[0_0_50px_rgba(59,130,246,0.05)]',
                title: 'AI & Agentic AI Solutions',
                body: 'AI that works for Africa, not just in theory. We build real AI systems and workflows for African SMEs, including agentic AI automation, AI-powered workflows, and productivity systems tailored to Africa.',
              },
            ].map(({ Icon, iconCls, iconBg, hoverBg, hoverBorder, shadow, title, body }) => (
              <div key={title}
                className={`group relative bg-white/2 border border-white/7 ${hoverBorder} ${shadow} rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/2 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className={`mb-6 w-14 h-14 rounded-xl ${iconBg} ${hoverBg} border transition-colors flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${iconCls}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4 leading-snug">{title}</h3>
                  <p className="text-gray-400 text-sm leading-[1.75]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. APPROACH  — animated icons, clean cards
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/18 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Approach</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Blending technical rigor with strategic foresight to deliver measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="group bg-white/2 border border-white/7 hover:border-brand-cyan/28 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-cyan/6 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="h-32 flex items-center justify-center mb-8">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border border-brand-cyan/20 rounded-full animate-[spin_12s_linear_infinite]" />
                  <div className="absolute inset-2 border border-purple-500/14 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="w-9 h-9 text-brand-cyan" />
                  </div>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-3">Decision-Driven Analytics</h3>
              <p className="text-sm text-gray-400 leading-[1.7]">
                Transforming complex data into business narratives that drive confident decisions.
              </p>
            </div>

            <div className="group bg-white/2 border border-white/7 hover:border-purple-400/28 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/6 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="h-32 flex items-center justify-center mb-8">
                <div className="relative">
                  <Share2 className="w-20 h-20 text-purple-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_16px_rgba(168,85,247,0.8)] animate-pulse" />
                  </div>
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-3">Skills & Capability Development</h3>
              <p className="text-sm text-gray-400 leading-[1.7]">
                Empowering teams through mentorship and practical learning to build sustainable, self-sufficient capability.
              </p>
            </div>

            <div className="group bg-white/2 border border-white/7 hover:border-brand-blue/28 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
              <div className="absolute right-0 bottom-0 w-40 h-40 bg-brand-blue/6 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="h-32 flex items-center justify-center mb-8">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <Cog className="absolute w-20 h-20 text-brand-blue/16 animate-[spin_10s_linear_infinite]" />
                  <Cog className="absolute -top-3 -right-3 w-11 h-11 text-brand-cyan/16 animate-[spin_6s_linear_infinite_reverse]" />
                  <div className="w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_16px_rgba(59,130,246,0.8)] animate-pulse" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-3">Intelligent Analytics Automation</h3>
              <p className="text-sm text-gray-400 leading-[1.7]">
                Automating analytics workflows, from pipelines and reporting to AI-driven decision agents.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. COURSES  — urgency + start dates foregrounded
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/18 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-brand-cyan/3 blur-[160px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-4">
            <span className="inline-block text-brand-cyan text-[11px] font-bold tracking-[0.18em] uppercase bg-brand-cyan/8 border border-brand-cyan/18 px-4 py-2 rounded-full mb-5">
              Learning Pathways
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
            From Tools to Thinking
          </h2>
          <p className="text-center text-gray-400 text-lg max-w-xl mx-auto mb-14">
            Pathways for professionals ready to influence decisions, not just learn skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {COURSES.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.id}
                  className={`group relative bg-[#1a1210] border border-white/8 ${c.cls.hover} rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)] overflow-hidden`}>

                  {/* Hover glow */}
                  <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${c.cls.glow}, transparent)` }} />

                  {/* Urgency badge + icon row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${c.cls.text} ${c.cls.bg} border ${c.cls.border} px-2.5 py-1.5 rounded-lg`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {c.urgency}
                    </span>
                    <Icon className={`w-5 h-5 ${c.cls.text} opacity-50`} />
                  </div>

                  {/* Level pill */}
                  <span className={`self-start text-[9px] font-bold ${c.cls.text} uppercase tracking-[0.14em] mb-3 opacity-70`}>
                    {c.level}
                  </span>

                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{c.title}</h3>
                  <p className="text-xs text-gray-500 mb-5 leading-[1.7] flex-1">{c.description}</p>

                  {/* Start date — visually prominent */}
                  <div className={`flex items-center gap-2 ${c.cls.bg} border ${c.cls.border} rounded-xl px-3 py-2.5 mb-5`}>
                    <div className={`w-2 h-2 rounded-full ${c.cls.text.replace('text-','bg-')}`} />
                    <div>
                      <p className={`text-[10px] font-bold ${c.cls.text} uppercase tracking-wider`}>Starts</p>
                      <p className="text-white text-xs font-bold">{c.startDate}</p>
                    </div>
                    <span className="ml-auto text-[10px] text-gray-500">{c.duration}</span>
                  </div>

                  {/* Includes list */}
                  <div className="mb-5 space-y-2">
                    {c.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${c.cls.text} mt-0.5 flex-shrink-0`} />
                        <span className="text-xs text-gray-400 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-3 border-t border-white/5 mb-4">
                    <span className="text-xl font-bold text-white">KES {c.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-600 ml-1.5">/ {c.duration}</span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleEnroll(c)}
                    className={`group/btn w-full ${c.cls.bg} ${c.cls.text} border ${c.cls.border} hover:opacity-70 rounded-xl px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all`}>
                    Enroll Now
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => navigate('/academy')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/4 border border-white/10 text-gray-300 rounded-full font-semibold text-sm hover:bg-white/8 hover:border-white/18 hover:text-white transition-all">
              View Full Academy
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. CTA / CHATBOT  — single strong action
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/18 to-transparent" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-brand-cyan/15 bg-gradient-to-br from-brand-cyan/7 via-transparent to-purple-500/7 px-8 md:px-16 py-16 text-center">
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 border-brand-cyan/20 rounded-tl-3xl" />
            <span className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 border-brand-cyan/20 rounded-br-3xl" />
            {/* Blobs */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-brand-cyan/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />
            {/* Dot overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-50"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Have Questions?</h3>
              <p className="text-gray-400 text-base leading-[1.7] mb-10 max-w-md mx-auto">
                Chat with our Ubuntu AI Academy Assistant for instant answers about courses, pricing, and enrollment.
              </p>

              {/* Single primary action */}
              <button
                onClick={() => console.log('Opening chatbot...')}
                className="group inline-flex items-center gap-3 bg-brand-cyan/10 hover:bg-brand-cyan text-brand-cyan hover:text-brand-dark border border-brand-cyan/25 hover:border-brand-cyan px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.1)] hover:shadow-[0_0_50px_rgba(34,211,238,0.45)]">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Chat with Ubuntu AI Academy Assistant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. TESTIMONIALS  — elevated, human, grounded
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/18 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">What Our Clients Say</h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Real results from professionals who transformed with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}
                className="group relative bg-white/2 border border-white/7 hover:border-white/14 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-brand-cyan/4 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Star row */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-300 text-base leading-[1.75] mb-6 flex-1">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-3 pt-5 border-t border-white/6">
                  <div className={`w-11 h-11 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. CONTACT  — structured footer-style contact block
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/18 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white/2 border border-white/8 rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.045) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 relative z-10">Get in Touch</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {/* Phone */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-14 h-14 bg-brand-cyan/8 border border-brand-cyan/15 rounded-2xl flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan/16 group-hover:scale-110 transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <a href="tel:+254706719457" className="text-gray-300 text-sm font-medium hover:text-brand-cyan transition-colors">+254706719457</a>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center gap-3 group">
                <a href="https://wa.me/254706719457" target="_blank" rel="noopener noreferrer"
                  className="w-14 h-14 bg-green-500/8 border border-green-500/15 rounded-2xl flex items-center justify-center text-green-400 group-hover:bg-green-500/16 group-hover:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a href="https://wa.me/254706719457" target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 text-sm font-medium hover:text-green-400 transition-colors">WhatsApp</a>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center gap-3 group">
                <a href="mailto:ezra@ubuntuanalytiq.com"
                  className="w-14 h-14 bg-red-500/8 border border-red-500/15 rounded-2xl flex items-center justify-center text-red-400 group-hover:bg-red-500/16 group-hover:scale-110 transition-all">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="mailto:ezra@ubuntuanalytiq.com"
                  className="text-gray-300 text-sm font-medium hover:text-red-400 transition-colors">Email Us</a>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center gap-3 group">
                <a href="https://maps.google.com/?q=Nairobi,Kenya" target="_blank" rel="noopener noreferrer"
                  className="w-14 h-14 bg-brand-cyan/8 border border-brand-cyan/15 rounded-2xl flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan/16 group-hover:scale-110 transition-all">
                  <MapPin className="w-6 h-6" />
                </a>
                <a href="https://maps.google.com/?q=Nairobi,Kenya" target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 text-sm font-medium hover:text-brand-cyan transition-colors">Nairobi, Kenya</a>
              </div>
            </div>

            {/* Footer line */}
            <div className="mt-12 pt-8 border-t border-white/6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-gray-600 text-xs">
                © 2025 Ubuntu AnalytIQ · Building East Africa's Data & AI workforce.
              </p>
              <div className="flex items-center gap-4 text-gray-600 text-xs">
                <a href="https://www.linkedin.com/company/106319269" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">LinkedIn</a>
                <span>·</span>
                <a href="mailto:ezra@ubuntuanalytiq.com" className="hover:text-gray-400 transition-colors">Contact</a>
                <span>·</span>
                <a href="/academy" className="hover:text-gray-400 transition-colors">Academy</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
