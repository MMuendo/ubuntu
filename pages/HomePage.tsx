/**
 * HomePage.tsx — Ubuntu AnalytIQ
 *
 * FONTS: Add to your public/index.html <head> before using this file:
 * <link rel="preconnect" href="https://fonts.bunny.net" />
 * <link href="https://fonts.bunny.net/css?family=syne:700,800|dm-sans:400,500|dm-mono:400" rel="stylesheet" />
 *
 * Alternatively, add to your global CSS:
 * @import url('https://fonts.bunny.net/css?family=syne:700,800|dm-sans:400,500|dm-mono:400');
 *
 * Then extend your tailwind.config.js:
 * fontFamily: { syne: ['Syne', 'sans-serif'], dm: ['DM Sans', 'sans-serif'], mono: ['DM Mono', 'monospace'] }
 */

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, MapPin, Phone, Mail, CheckCircle2, MessageCircle,
  FileSpreadsheet, BarChart3, Brain, Zap, Database,
  Share2, Cog, Bot, ChevronRight, Sparkles, TrendingUp,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Course {
  id: string; title: string; level: string; description: string;
  price: number; duration: string; icon: React.ElementType;
  startDate: string; urgency: string; includes: string[];
  accent: { text: string; bg: string; border: string; dot: string; topBar: string };
}

// ─── Counting animation ────────────────────────────────────────────────────────
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

// ─── Static data ───────────────────────────────────────────────────────────────
const LIVE_ACTIVITY = [
  { initials: 'AW', name: 'Amina W.',     color: 'bg-cyan-600',    action: 'submitted',   item: 'EX-03 KCB Loan Analyser',       time: '2m ago' },
  { initials: 'KM', name: 'Kevin M.',     color: 'bg-violet-600',  action: 'enrolled in', item: 'Agentic AI for Business',        time: '5m ago' },
  { initials: 'CO', name: 'Christine O.', color: 'bg-emerald-700', action: 'completed',   item: 'Power BI P&L Dashboard',         time: '11m ago' },
  { initials: 'BK', name: 'Brian K.',     color: 'bg-orange-700',  action: 'downloaded',  item: 'Kenya Airways Dataset',          time: '18m ago' },
  { initials: 'FA', name: 'Fatuma A.',    color: 'bg-blue-700',    action: 'submitted',   item: 'AG-01 Lead Qualification Agent', time: '25m ago' },
];

const COURSES: Course[] = [
  {
    id: 'excel-workshop', title: 'Data Analytics with Excel', level: 'Foundation',
    description: 'Structure problems, build models, and present data that decisions are made on.',
    price: 12500, duration: '3 months', icon: FileSpreadsheet,
    startDate: '20 June 2025', urgency: 'Enrolling now',
    includes: ['Advanced formulas, logic & Power Query', 'Pivot table mastery & board-ready dashboards'],
    accent: {
      text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20',
      dot: 'bg-blue-400', topBar: 'from-blue-500 to-cyan-400',
    },
  },
  {
    id: 'powerbi-workshop', title: 'Business Analytics with Power BI', level: 'Core',
    description: 'Turn data into decision-ready dashboards and reporting systems leaders actually trust.',
    price: 15000, duration: '3 months', icon: BarChart3,
    startDate: '7 April 2025', urgency: 'Starting soon',
    includes: ['DAX time intelligence & star-schema modelling', 'Executive-ready Power BI reports'],
    accent: {
      text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20',
      dot: 'bg-violet-400', topBar: 'from-violet-500 to-pink-500',
    },
  },
  {
    id: 'ai-mastery', title: 'AI Fluency for Business Leaders', level: 'AI Mastery',
    description: 'Use AI confidently and responsibly to improve decisions, productivity, and strategy.',
    price: 2500, duration: '1 month', icon: Brain,
    startDate: '4 May 2025', urgency: 'New cohort',
    includes: ['Prompt engineering & AI tools for real work', 'Responsible AI in Africa context'],
    accent: {
      text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',
      dot: 'bg-emerald-400', topBar: 'from-emerald-500 to-teal-400',
    },
  },
  {
    id: 'ai-agents-masterclass', title: 'Agentic AI for Business', level: 'Advanced',
    description: 'Design AI systems that execute tasks, orchestrate workflows, and scale operations without constant oversight.',
    price: 5000, duration: '1 month', icon: Zap,
    startDate: '5 May 2025', urgency: 'Top rated',
    includes: ['n8n, APIs & agentic workflow automation', 'Deploy agents across channels'],
    accent: {
      text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20',
      dot: 'bg-orange-400', topBar: 'from-orange-500 to-amber-400',
    },
  },
];

const TESTIMONIALS = [
  {
    name: 'Christine Mutua', role: 'Data Analyst · Equity Bank Kenya', initials: 'CM', color: 'bg-cyan-700',
    result: '+40% salary in 6 months',
    content: 'The Excel track completely changed how I present data to leadership. Within 2 months I was building pivot dashboards my manager used in board meetings. Best career investment I\'ve ever made.',
  },
  {
    name: 'Kevin Omondi', role: 'Operations Lead · Safaricom M-Pesa', initials: 'KO', color: 'bg-violet-700',
    result: 'Saved 12 hrs/week on reporting',
    content: 'The Power BI course gave me tools I use every single day. I automated a report that used to take 3 hours manually. My team now has real-time dashboards they can actually trust.',
  },
  {
    name: 'Fatuma Abdi', role: 'BI Engineer · KCB Group', initials: 'FA', color: 'bg-orange-700',
    result: 'Agent processes 200+ leads/day',
    content: 'The Agentic AI course is genuinely advanced. I built a lead qualification agent for our SME team in 3 weeks. It handles 200+ leads a day. This is the future of banking operations in Africa.',
  },
];

const COMPANY_LOGOS = ['Safaricom', 'Equity Bank', 'KCB Group', 'Kenya Airways', 'Absa Kenya', 'NCBA Bank', 'KPMG', 'PwC Kenya'];

const SERVICES = [
  {
    icon: BarChart3, iconColor: 'text-cyan-400', iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/30',
    title: 'Business Analytics & Data Science',
    body: 'Turn raw data into confident decisions through analysis, modeling, dashboards, and actionable recommendations for growth, efficiency, and profitability.',
  },
  {
    icon: Brain, iconColor: 'text-violet-400', iconBg: 'bg-violet-500/10 border-violet-500/20',
    hoverBorder: 'hover:border-violet-500/30',
    title: 'Workshops, Training & Mentorship',
    body: 'Hands-on training and mentorship for individuals and teams in Business Analytics, Data Science, AI & Agentic AI, and analytics leadership.',
  },
  {
    icon: Bot, iconColor: 'text-orange-400', iconBg: 'bg-orange-500/10 border-orange-500/20',
    hoverBorder: 'hover:border-orange-500/30',
    title: 'AI & Agentic AI Solutions',
    body: 'Real AI systems and workflows for African SMEs — agentic automation, AI-powered workflows, and productivity systems tailored to Africa.',
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
}) => (
  <span className={`inline-block text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border mb-3 ${color}`}>
    {children}
  </span>
);

const ActivityFeed: React.FC = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => (v + 1) % LIVE_ACTIVITY.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#141210] border border-white/8 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#5A5652]">Live Activity</span>
      </div>
      <div className="space-y-1">
        {LIVE_ACTIVITY.map((a, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-500 ${
              i === tick ? 'bg-white/4 border border-white/7' : 'opacity-30'
            }`}
          >
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

// ─── Main component ────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { ref: statRef, inView: statVisible } = useInView(0.3);
  const c1 = useCountUp(150, statVisible);
  const c2 = useCountUp(16,  statVisible, 1400);
  const c3 = useCountUp(94,  statVisible, 1800);

  const handleEnroll = (course: Course) =>
    navigate(
      `/enroll?courseId=${course.id}&courseName=${encodeURIComponent(course.title)}&coursePrice=${course.price}&courseDescription=${encodeURIComponent(course.description)}`
    );

  return (
    <div className="bg-[#0E0C0B] overflow-x-hidden text-[#F0EDE8]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/7 px-6 pt-20 pb-16 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12 items-start">

            {/* Left: headline + CTAs + stats */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400 text-[11px] font-semibold tracking-[0.14em] uppercase">
                  Data &amp; AI Career Platform · East Africa
                </span>
              </div>

              {/* H1 — dominant, nothing competes */}
              <h1
                className="text-5xl sm:text-6xl font-extrabold leading-[1.07] tracking-tight mb-5"
                style={{ fontFamily: "'Syne', 'DM Sans', system-ui, sans-serif", letterSpacing: '-0.02em' }}
              >
                Unlock Your<br />
                Potential With<br />
                <span className="text-cyan-400">AI &amp; Data Fluency</span>
              </h1>

              <p className="text-[15px] text-[#8A8680] leading-[1.75] max-w-[440px] mb-8">
                We build intelligence, enable people, and automate insight — through analytics consulting,
                capability enablement, and Agentic AI. From Excel to autonomous AI systems.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
                <button
                  onClick={() => navigate('/assessment')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-[#0A0908] rounded-full font-semibold text-[14px] hover:bg-cyan-300 transition-all"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://www.linkedin.com/company/106319269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#8A8680] hover:text-[#F0EDE8] transition-colors px-2"
                >
                  Learn More <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Stats — anchored below CTAs, not competing with headline */}
              <div
                ref={statRef}
                className="grid grid-cols-3 divide-x divide-white/7 bg-[#141210] border border-white/7 rounded-2xl overflow-hidden max-w-sm"
              >
                {[
                  { val: `${c1}+`, label: 'Students trained' },
                  { val: `${c2}`,  label: 'Live projects' },
                  { val: `${c3}%`, label: 'Completion rate' },
                ].map(({ val, label }) => (
                  <div key={label} className="px-4 py-4 text-center">
                    <p
                      className="text-[22px] font-extrabold text-[#F0EDE8] leading-none mb-1"
                      style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
                    >
                      {val}
                    </p>
                    <p className="text-[10px] text-[#5A5652] tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: live activity */}
            <div className="w-full">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. TRUST BAR ═════════════════════════════════════════════════════════ */}
      <div className="border-b border-white/7 px-6 py-4 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-4 overflow-hidden">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#5A5652] flex-shrink-0">
            Our students work at
          </span>
          <div className="w-px h-4 bg-white/10 flex-shrink-0" />
          <div className="flex gap-5 items-center overflow-hidden flex-wrap">
            {COMPANY_LOGOS.map(name => (
              <span key={name} className="text-[12px] text-[#5A5652] font-medium hover:text-[#8A8680] transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 3. ABOUT ═════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>About Ubuntu AnalytIQ</SectionLabel>
          <h2
            className="text-3xl md:text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#F0EDE8] mb-3"
            style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
          >
            Building Intelligence,{' '}
            <span className="text-cyan-400">Enabling People</span>
          </h2>
          <p className="text-[14px] text-[#8A8680] leading-[1.75] max-w-[500px] mb-8">
            We transform professionals into decision-makers who lead with data, think with AI, and automate with purpose.
          </p>

          <div className="relative bg-[#141210] border border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            <div className="space-y-4 text-[14px] text-[#8A8680] leading-[1.8] max-w-3xl">
              <p>
                Ubuntu Academy was born from a simple truth:{' '}
                <strong className="text-[#F0EDE8] font-medium">
                  the future belongs to those who can think with data and act with AI.
                </strong>
              </p>
              <p>
                We saw too many organizations drowning in tools but starving for insight. Too many professionals
                learning skills but not building systems. Too many dashboards that looked impressive but answered
                no real questions.
              </p>
              <p>
                So we built something different — a practice that blends{' '}
                <strong className="text-[#F0EDE8] font-medium">
                  analytics consulting, capability development, and intelligent automation
                </strong>{' '}
                — designed not to create dependency, but to build self-sufficient, AI-fluent organizations.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/7">
              <p
                className="text-[14px] font-bold text-[#F0EDE8]"
                style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
              >
                From Excel to Agentic AI, we meet you where you are and take you where you need to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. SERVICES ══════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Our Services</SectionLabel>
          <h2
            className="text-3xl md:text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#F0EDE8] mb-3"
            style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
          >
            Build Capability,{' '}
            <span className="text-cyan-400">Unlock Insight</span>
          </h2>
          <p className="text-[14px] text-[#8A8680] leading-[1.75] mb-10">Automate outcomes.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SERVICES.map(({ icon: Icon, iconColor, iconBg, hoverBorder, title, body }) => (
              <div
                key={title}
                className={`group bg-[#141210] border border-white/7 ${hoverBorder} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 ${iconBg} transition-colors`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3
                  className="text-[14px] font-bold text-[#F0EDE8] mb-3 leading-snug"
                  style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8680] leading-[1.75]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. APPROACH ══════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Our Approach</SectionLabel>
          <h2
            className="text-3xl md:text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#F0EDE8] mb-3"
            style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
          >
            Technical Rigor,{' '}
            <span className="text-cyan-400">Strategic Impact</span>
          </h2>
          <p className="text-[14px] text-[#8A8680] max-w-xl mb-10 leading-[1.75]">
            Blending technical rigor with strategic foresight to deliver measurable impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                icon: (
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_12s_linear_infinite]" />
                    <div className="absolute inset-2 border border-violet-500/15 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                    <Database className="w-6 h-6 text-cyan-400 relative z-10" />
                  </div>
                ),
                title: 'Decision-Driven Analytics',
                body: 'Transforming complex data into business narratives that drive confident decisions.',
                hoverBorder: 'hover:border-cyan-500/25',
              },
              {
                icon: (
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <Share2 className="w-14 h-14 text-violet-500/20 absolute" />
                    <div className="w-3 h-3 bg-violet-400 rounded-full shadow-[0_0_12px_rgba(167,139,250,0.6)] animate-pulse" />
                  </div>
                ),
                title: 'Skills & Capability Development',
                body: 'Empowering teams through mentorship and practical learning to build sustainable, self-sufficient capability.',
                hoverBorder: 'hover:border-violet-500/25',
              },
              {
                icon: (
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <Cog className="absolute w-14 h-14 text-blue-400/20 animate-[spin_10s_linear_infinite]" />
                    <Cog className="absolute -top-2 -right-2 w-8 h-8 text-cyan-400/20 animate-[spin_6s_linear_infinite_reverse]" />
                    <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.6)] animate-pulse relative z-10" />
                  </div>
                ),
                title: 'Intelligent Analytics Automation',
                body: 'Automating analytics workflows — from data pipelines and reporting to AI-driven decision agents.',
                hoverBorder: 'hover:border-blue-500/25',
              },
            ].map(({ icon, title, body, hoverBorder }) => (
              <div key={title} className={`group bg-[#141210] border border-white/7 ${hoverBorder} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1`}>
                <div className="h-16 flex items-center mb-5">{icon}</div>
                <h3 className="text-[14px] font-bold text-[#F0EDE8] mb-2 leading-snug" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8680] leading-[1.75]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. COURSES ═══════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <SectionLabel>Learning Pathways</SectionLabel>
              <h2
                className="text-3xl md:text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#F0EDE8]"
                style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
              >
                From Tools{' '}
                <span className="text-cyan-400">to Thinking</span>
              </h2>
            </div>
            <p className="text-[13px] text-[#8A8680] leading-[1.7] max-w-[260px] sm:text-right">
              Pathways for professionals ready to influence decisions, not just learn skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COURSES.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.id}
                  className="group relative bg-[#141210] border border-white/8 hover:border-white/14 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-default"
                >
                  {/* Top colour bar — only visible on hover */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.accent.topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Header: tags + price */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] font-medium text-[#5A5652] bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                        {c.level}
                      </span>
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1 ${c.accent.bg} ${c.accent.text} ${c.accent.border}`}>
                        <span className={`w-1 h-1 rounded-full ${c.accent.dot} animate-pulse`} />
                        {c.urgency}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[18px] font-extrabold text-[#F0EDE8] leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                        KES {c.price.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#5A5652] mt-0.5">/ {c.duration}</p>
                    </div>
                  </div>

                  {/* Title + desc */}
                  <div>
                    <h3 className="text-[15px] font-bold text-[#F0EDE8] mb-1.5 leading-snug" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                      {c.title}
                    </h3>
                    <p className="text-[12.5px] text-[#8A8680] leading-[1.7]">{c.description}</p>
                  </div>

                  {/* Start date */}
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.accent.dot}`} />
                    <span className="text-[12px] text-[#5A5652]">Starts</span>
                    <span className="text-[12px] font-medium text-[#F0EDE8]">{c.startDate}</span>
                    <span className="ml-auto text-[11px] text-[#5A5652]">{c.duration}</span>
                  </div>

                  {/* Includes — 2 items max, no clutter */}
                  <div className="space-y-2">
                    {c.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${c.accent.text}`} />
                        <span className="text-[12px] text-[#8A8680] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleEnroll(c)}
                    className="mt-auto w-full py-2.5 px-4 rounded-xl border border-white/10 bg-white/3 text-[#F0EDE8] text-[13px] font-medium hover:bg-white/7 hover:border-white/18 transition-all flex items-center justify-center gap-2"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  >
                    Enrol Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/academy')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/4 border border-white/10 text-[#8A8680] rounded-full text-[13px] font-medium hover:bg-white/7 hover:text-[#F0EDE8] transition-all"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              View Full Academy
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ 7. TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <SectionLabel color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20">Real Results</SectionLabel>
          <h2
            className="text-3xl md:text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#F0EDE8] mb-3"
            style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
          >
            What Our{' '}
            <span className="text-emerald-400">Students Say</span>
          </h2>
          <p className="text-[14px] text-[#8A8680] mb-10 max-w-lg leading-[1.75]">
            Professionals across East Africa who levelled up with Ubuntu Academy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#141210] border border-white/7 hover:border-white/12 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-[13px]">★</span>
                  ))}
                </div>
                <blockquote className="text-[13px] text-[#8A8680] leading-[1.75] flex-1 italic">
                  "{t.content}"
                </blockquote>
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

      {/* ══ 8. CHATBOT CTA ═══════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-8 border-b border-white/7">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-[#141210] border border-white/10 rounded-2xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="relative z-10">
              <h3
                className="text-2xl md:text-3xl font-extrabold text-[#F0EDE8] mb-3"
                style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
              >
                Have Questions?
              </h3>
              <p className="text-[14px] text-[#8A8680] leading-[1.75] mb-8 max-w-sm mx-auto">
                Chat with our Ubuntu AI Academy Assistant for instant answers about courses, pricing, and enrolment.
              </p>
              <button
                onClick={() => console.log('Opening chatbot…')}
                className="group inline-flex items-center gap-3 bg-cyan-500/10 hover:bg-cyan-400 text-cyan-400 hover:text-[#0A0908] border border-cyan-500/25 hover:border-cyan-400 px-6 py-3 rounded-xl text-[14px] font-semibold transition-all duration-300"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                <MessageCircle className="w-4 h-4" />
                Chat with Ubuntu AI Academy Assistant
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. CONTACT ═══════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-[#141210] border border-white/8 rounded-2xl p-10 md:p-14 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <h2
              className="text-2xl font-extrabold text-[#F0EDE8] mb-10 text-center"
              style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
            >
              Get in Touch
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {[
                { icon: Phone, label: '+254706719457', href: 'tel:+254706719457', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
                { icon: null, label: 'WhatsApp', href: 'https://wa.me/254706719457', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', isWa: true },
                { icon: Mail, label: 'Email Us', href: 'mailto:ezra@ubuntuanalytiq.com', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
                { icon: MapPin, label: 'Nairobi, Kenya', href: 'https://maps.google.com/?q=Nairobi,Kenya', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
              ].map(({ icon: Icon, label, href, color, bg, isWa }) => (
                <div key={label} className="flex flex-col items-center gap-3 group">
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${color} ${bg} group-hover:scale-110 transition-all`}
                  >
                    {isWa ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    ) : Icon ? <Icon className="w-5 h-5" /> : null}
                  </a>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`text-[12px] font-medium text-[#8A8680] hover:${color} transition-colors text-center`}
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-7 border-t border-white/7 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              <p className="text-[11px] text-[#5A5652]">© 2025 Ubuntu AnalytIQ · Building East Africa's Data &amp; AI workforce.</p>
              <div className="flex items-center gap-4 text-[11px] text-[#5A5652]">
                <a href="https://www.linkedin.com/company/106319269" target="_blank" rel="noopener noreferrer" className="hover:text-[#8A8680] transition-colors">LinkedIn</a>
                <span>·</span>
                <a href="mailto:ezra@ubuntuanalytiq.com" className="hover:text-[#8A8680] transition-colors">Contact</a>
                <span>·</span>
                <a href="/academy" className="hover:text-[#8A8680] transition-colors">Academy</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
