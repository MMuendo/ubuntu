import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, MapPin, Phone, Mail, CheckCircle2, MessageCircle,
  FileSpreadsheet, BarChart3, Brain, Zap, Quote, Database, Share2, Cog, Bot,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const enhancedCourses = [
    {
      id: 'excel-workshop', title: 'Data Analytics with Excel', level: 'Foundation',
      description: 'Learn how to structure problems, think analytically, and make better decisions using data',
      price: 20000, duration: '3 months', icon: FileSpreadsheet,
      includes: ['Advanced Excel formulas and logic','Power Query and Power Pivot foundations','Business problem structuring frameworks','Decision-ready Excel models'],
      gradient: 'from-blue-500/8 to-cyan-500/8', accentColor: 'text-blue-400',
      accentBg: 'bg-blue-500/10', accentBorder: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-500/50', glowColor: 'rgba(59,130,246,0.12)',
    },
    {
      id: 'powerbi-workshop', title: 'Business Analytics with Power BI', level: 'Core',
      description: 'Turn data into decision-ready dashboards and decision systems leaders trust and actually use.',
      price: 25000, duration: '3 months', icon: BarChart3,
      includes: ['Power Query data transformation','Star-schema data modelling','DAX measures and time intelligence','Executive-ready Power BI dashboards'],
      gradient: 'from-purple-500/8 to-pink-500/8', accentColor: 'text-purple-400',
      accentBg: 'bg-purple-500/10', accentBorder: 'border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/50', glowColor: 'rgba(168,85,247,0.12)',
    },
    {
      id: 'ai-mastery', title: 'AI Fluency for Business Leaders', level: 'AI Mastery',
      description: 'Understand how to use AI confidently and responsibly to improve decisions, productivity, and strategy.',
      price: 7500, duration: '1 month', icon: Brain,
      includes: ['How modern AI systems think','Prompt engineering for real work','AI tools and workflows','Responsible, career-driven AI usage'],
      gradient: 'from-emerald-500/8 to-teal-500/8', accentColor: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-500/50', glowColor: 'rgba(16,185,129,0.12)',
    },
    {
      id: 'ai-agents-masterclass', title: 'Agentic AI for Business', level: 'Advanced',
      description: 'Design AI systems that support decision-making, execution, and scale across the business.',
      price: 12500, duration: '1 month', icon: Zap,
      includes: ['AI agent design fundamentals','n8n Automation, APIs, and Agentic Workflows','Knowledge, memory, and tools','Deploying agents across channels'],
      gradient: 'from-orange-500/8 to-red-500/8', accentColor: 'text-orange-400',
      accentBg: 'bg-orange-500/10', accentBorder: 'border-orange-500/20',
      hoverBorder: 'hover:border-orange-500/50', glowColor: 'rgba(249,115,22,0.12)',
    },
  ];

  const testimonials = [
    { name: 'Eric Onchonga', role: 'CEO, Irri-hub', avatar: 'EO', color: 'bg-cyan-500', rating: 5,
      content: 'Delivered an insightful Power BI dashboard integrated with Zoho Books and Zoho CRM APIs, providing real-time financial and customer visibility for our agricultural operations.' },
    { name: 'Duncan Mutulu', role: 'Director, World Vision', avatar: 'DM', color: 'bg-purple-500', rating: 5,
      content: 'Built my supply chain inventory dashboard and trained me on Power BI Desktop and Service, enabling independent report development and management.' },
    { name: 'Monicah Gitagia', role: 'Student, Microsoft Excel', avatar: 'MG', color: 'bg-emerald-500', rating: 5,
      content: 'Ezra is a firm and fun tutor who provided one-on-one Excel coaching, significantly improving my confidence, efficiency, and accuracy in daily data analysis.' },
  ];

  const handleEnroll = (course: { id: string; title: string; price: number; description: string }) => {
    navigate(`/enroll?courseId=${course.id}&courseName=${encodeURIComponent(course.title)}&coursePrice=${course.price}&courseDescription=${encodeURIComponent(course.description)}`);
  };

  return (
    <div className="bg-[#18100F]">

      {/* ── 1. HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-cyan/10" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.032]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.9) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />
          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-cyan/5 blur-[150px] rounded-full pointer-events-none" />
        </div>

        {/* Floating stat badges */}
        <div className="absolute top-24 left-5 md:left-20 bg-[#0D0D0D]/92 backdrop-blur-md rounded-2xl px-4 py-3.5 border border-white/10 animate-float z-10 hidden sm:block shadow-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">Revenue Growth</span>
          </div>
          <div className="text-2xl font-bold text-white">+47.5%</div>
        </div>

        <div className="absolute bottom-32 right-5 md:right-20 bg-[#0D0D0D]/92 backdrop-blur-md rounded-2xl px-4 py-3.5 border border-white/10 animate-float z-10 hidden sm:block shadow-2xl" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
            <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">Data Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-white">99.2%</div>
        </div>

        <div className="absolute top-1/3 right-5 md:right-32 bg-[#0D0D0D]/92 backdrop-blur-md rounded-2xl px-4 py-3.5 border border-brand-blue/25 animate-float z-10 hidden md:block shadow-2xl" style={{ animationDelay: '1.3s' }}>
          <div className="text-[10px] text-brand-blue font-bold tracking-wider uppercase mb-1">AI Insights</div>
          <div className="text-base font-bold text-white">Actionable</div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Ubuntu Analytiq</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.05]">
            Unlock Your Potential With{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-blue">
              AI & Data Fluency
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            We build intelligence, enable people, and automate insight using Agentic AI, analytics consulting,
            and capability enablement to turn data into action.
            Through mentorship and courses in Analytics, AI, and Agentic AI Mastery, we develop Data &amp; AI fluency
            and automate decision workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/assessment')}
              className="group px-8 py-4 bg-brand-cyan text-brand-dark rounded-full font-bold text-base hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.55)] inline-flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="https://www.linkedin.com/company/106319269" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-white/6 backdrop-blur-sm border border-white/12 text-white rounded-full font-bold text-base hover:bg-white/12 hover:border-white/25 transition-all">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. WHO WE ARE ── */}
      <section className="py-24 md:py-32 bg-[#18100F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold tracking-wider uppercase bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
              About Ubuntu Analytiq
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mt-5 mb-5 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
              Building Intelligence,<br />Enabling People
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We transform professionals into decision-makers who lead with data, think with AI, and automate with purpose.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/3 border border-white/8 rounded-3xl p-8 md:p-12 overflow-hidden">
              {/* Corner accents */}
              {[['top-5 left-5 border-t-2 border-l-2 rounded-tl-lg'],['top-5 right-5 border-t-2 border-r-2 rounded-tr-lg'],['bottom-5 left-5 border-b-2 border-l-2 rounded-bl-lg'],['bottom-5 right-5 border-b-2 border-r-2 rounded-br-lg']].map((cls, i) => (
                <div key={i} className={`absolute w-7 h-7 border-brand-cyan/20 ${cls[0]}`} />
              ))}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-7">Who We Are</h3>
                <div className="space-y-5 text-gray-300 leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
                  <p>Ubuntu Academy was born from a simple truth:{' '}
                    <span className="text-brand-cyan font-semibold">the future belongs to those who can think with data and act with AI.</span>
                  </p>
                  <p>We saw too many organizations drowning in tools but starving for insight. Too many professionals learning skills but not building systems. Too many dashboards that looked impressive but answered no real questions.</p>
                  <p>So we built something different. A practice that blends{' '}
                    <span className="text-brand-cyan font-semibold">analytics consulting, capability development, and intelligent automation</span>
                    {' '}— designed not to create dependency, but to build self-sufficient, AI-fluent organizations.
                  </p>
                  <p className="text-white font-semibold pt-5 border-t border-white/8">
                    From Excel to Agentic AI, we meet you where you are and take you where you need to be.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES ── */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Services</h2>
            <p className="text-gray-400">Build capability, unlock insight, automate outcomes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { Icon: BarChart3, iconCls: 'text-cyan-400', iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20', border: 'hover:border-cyan-400/30', glow: 'bg-cyan-500/6', glowPos: '-right-10 -top-10', title: 'Business Analytics & Data Science', body: 'Turn raw data into confident decisions. We transform messy data into clear insights through analysis, modeling, dashboards, storytelling, research, and actionable recommendations for growth, efficiency, and profitability.' },
              { Icon: Brain,    iconCls: 'text-purple-400', iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20', border: 'hover:border-purple-400/30', glow: 'bg-purple-500/6', glowPos: '-left-10 -bottom-10', title: 'Workshops, Training & Mentorship', body: 'Build analytics and AI skills that deliver results. We offer hands-on training and mentorship for individuals and teams in Business Analytics, Data Science, AI & Agentic AI, and analytics leadership.' },
              { Icon: Bot,      iconCls: 'text-blue-400',   iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',   border: 'hover:border-blue-400/30',   glow: 'bg-blue-500/6',   glowPos: '-right-10 -bottom-10', title: 'AI & Agentic AI Solutions', body: 'AI that works for Africa, not just in theory. We build real AI systems and workflows for African SMEs, including agentic AI automation, AI-powered workflows, and productivity systems tailored to Africa.' },
            ].map(({ Icon, iconCls, iconBg, border, glow, glowPos, title, body }) => (
              <div key={title}
                className={`group relative bg-white/2 border border-white/8 ${border} rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1`}>
                <div className={`absolute ${glowPos} w-40 h-40 ${glow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="relative z-10">
                  <div className={`mb-6 p-3.5 ${iconBg} rounded-xl inline-flex transition-colors`}>
                    <Icon className={`w-7 h-7 ${iconCls}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. APPROACH ── */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Approach</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Blending technical rigor with strategic foresight to deliver measurable impact.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="group bg-white/2 border border-white/8 hover:border-brand-cyan/30 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-cyan/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="h-36 flex items-center justify-center mb-6 relative">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-2 border-brand-cyan/20 rounded-full animate-[spin_12s_linear_infinite]" />
                  <div className="absolute inset-2 border-2 border-purple-500/15 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="text-brand-cyan w-10 h-10 animate-pulse" />
                  </div>
                  <div className="absolute -top-1 left-1/2 w-2 h-2 bg-brand-cyan rounded-full animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Decision-Driven Analytics</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Transforming complex data into business narratives that drive confident decisions.</p>
            </div>

            <div className="group bg-white/2 border border-white/8 hover:border-purple-400/30 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="h-36 flex items-center justify-center mb-6">
                <div className="relative">
                  <Share2 className="w-20 h-20 text-purple-500/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 bg-purple-400 rounded-full shadow-[0_0_16px_rgba(168,85,247,0.8)] animate-pulse" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Skills & Capability Development</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Empowering teams through mentorship and practical learning to build sustainable, self-sufficient capability.</p>
            </div>

            <div className="group bg-white/2 border border-white/8 hover:border-brand-blue/30 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-blue/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="h-36 flex items-center justify-center mb-6">
                <div className="relative">
                  <Cog className="w-20 h-20 text-brand-blue/18 animate-[spin_10s_linear_infinite]" />
                  <Cog className="absolute -top-4 -right-4 w-12 h-12 text-brand-cyan/18 animate-[spin_6s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 bg-brand-blue rounded-full shadow-[0_0_16px_rgba(59,130,246,0.8)] animate-pulse" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Intelligent Analytics Automation</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Automating analytics workflows, from pipelines and reporting to AI-driven decision agents.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. COURSES PREVIEW ── */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-cyan/3 blur-[150px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="text-brand-cyan text-xs font-bold tracking-wider uppercase bg-brand-cyan/10 px-4 py-2 rounded-full border border-brand-cyan/20">Learning Pathways</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-5 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">From Tools to Thinking</h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">Pathways for professionals ready to influence decisions, not just learn skills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {enhancedCourses.map((course) => {
              const CourseIcon = course.icon;
              return (
                <div key={course.id}
                  className={`group relative bg-gradient-to-br ${course.gradient} bg-[#1a1210] border border-white/8 ${course.hoverBorder} rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden`}>
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${course.glowColor}, transparent)` }} />

                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold ${course.accentColor} uppercase tracking-wider ${course.accentBg} border ${course.accentBorder} px-2.5 py-1 rounded-lg`}>
                      {course.level}
                    </span>
                    <div className="flex items-center gap-2">
                      <CourseIcon className={`w-5 h-5 ${course.accentColor} opacity-55`} />
                      <span className="text-xs text-gray-600 font-medium">{course.duration}</span>
                    </div>
                  </div>

                  <h3 className={`text-sm font-bold text-white mb-2 group-hover:${course.accentColor} transition-colors leading-snug`}>{course.title}</h3>
                  <p className="text-xs text-gray-500 mb-5 leading-relaxed flex-1">{course.description}</p>

                  <div className="mb-5 space-y-2">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">What is Included</p>
                    {course.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${course.accentColor} mt-0.5 flex-shrink-0`} />
                        <span className="text-xs text-gray-400 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/5 mb-4">
                    <span className="text-xl font-bold text-white">KES {course.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-600 ml-1.5">/ {course.duration}</span>
                  </div>

                  <button onClick={() => handleEnroll(course)}
                    className={`group/btn w-full ${course.accentBg} ${course.accentColor} border ${course.accentBorder} hover:opacity-70 rounded-xl px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all`}>
                    Enroll Now <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => navigate('/academy')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all">
              View Full Academy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. CTA / CHATBOT ── */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-brand-cyan/18 bg-gradient-to-br from-brand-cyan/8 via-transparent to-purple-500/8 p-8 md:p-14 text-center">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-cyan/7 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/7 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.025) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Have Questions?</h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
                Chat with our Ubuntu AI Academy Assistant for instant answers about courses, pricing, and enrollment.
              </p>
              <button onClick={() => console.log('Opening chatbot...')}
                className="group inline-flex items-center gap-3 bg-brand-cyan/10 hover:bg-brand-cyan text-brand-cyan hover:text-brand-dark border-2 border-brand-cyan/25 hover:border-brand-cyan px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.08)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Chat with Ubuntu AI Academy Assistant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ── */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">What Our Clients Say</h3>
            <p className="text-gray-400 max-w-xl mx-auto">Real results from professionals who transformed with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i}
                className="group relative bg-white/3 border border-white/8 rounded-2xl p-7 flex flex-col hover:border-white/14 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-brand-cyan/3 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="mb-5">
                  <Quote className="w-9 h-9 text-brand-cyan/15" />
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">{t.content}</p>

                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-5 border-t border-white/6">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CONTACT ── */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white/3 border border-white/8 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <h2 className="text-3xl font-bold text-white mb-10 relative z-10">Get in Touch</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {/* Phone */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-14 h-14 bg-brand-cyan/8 border border-brand-cyan/15 rounded-2xl flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan/18 group-hover:border-brand-cyan/30 transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <a href="tel:+254706719457" className="text-white text-sm font-medium hover:text-brand-cyan transition-colors">+254706719457</a>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center gap-3 group">
                <a href="https://wa.me/254706719457" target="_blank" rel="noopener noreferrer"
                  className="w-14 h-14 bg-green-500/8 border border-green-500/15 rounded-2xl flex items-center justify-center text-green-400 group-hover:bg-green-500/18 group-hover:border-green-500/30 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a href="https://wa.me/254706719457" target="_blank" rel="noopener noreferrer"
                  className="text-white text-sm font-medium hover:text-green-400 transition-colors">WhatsApp</a>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center gap-3 group">
                <a href="mailto:ezra@ubuntuanalytiq.com"
                  className="w-14 h-14 bg-red-500/8 border border-red-500/15 rounded-2xl flex items-center justify-center text-red-400 group-hover:bg-red-500/18 group-hover:border-red-500/30 transition-all">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="mailto:ezra@ubuntuanalytiq.com" className="text-white text-sm font-medium hover:text-red-400 transition-colors">Email Us</a>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center gap-3 group">
                <a href="https://maps.google.com/?q=Nairobi,Kenya" target="_blank" rel="noopener noreferrer"
                  className="w-14 h-14 bg-brand-cyan/8 border border-brand-cyan/15 rounded-2xl flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan/18 group-hover:border-brand-cyan/30 transition-all">
                  <MapPin className="w-6 h-6" />
                </a>
                <a href="https://maps.google.com/?q=Nairobi,Kenya" target="_blank" rel="noopener noreferrer"
                  className="text-white text-sm font-medium hover:text-brand-cyan transition-colors">Nairobi, Kenya</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
