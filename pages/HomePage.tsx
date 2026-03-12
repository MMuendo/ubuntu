import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  MessageCircle, 
  FileSpreadsheet, 
  BarChart3, 
  Brain, 
  Zap,
  Quote,
  Database,
  Share2,
  Cog,
  Bot
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { loading: coursesLoading } = useCourses();

  // Enhanced courses data
  const enhancedCourses = [
    {
      id: 'excel-workshop',
      title: 'Data Thinking with Excel',
      level: 'Foundation',
      description: 'Learn how to structure problems, think analytically, and make better decisions using data',
      price: 20000,
      duration: '3 months',
      tags: ['Data Analysis', 'Productivity', '3 Months'],
      icon: FileSpreadsheet,
      includes: [
        'Advanced Excel formulas and logic',
        'Power Query and Power Pivot foundations',
        'Business problem structuring frameworks',
        'Decision-ready Excel models'
      ],
      gradient: 'from-blue-500/10 to-cyan-500/10',
      accentColor: 'text-blue-400'
    },
    {
      id: 'powerbi-workshop',
      title: 'Decision Systems with Power BI',
      level: 'Core',
      description: 'Turn data into decision-ready dashboards and decision systems leaders trust and actually use.',
      price: 25000,
      duration: '3 months',
      tags: ['BI', 'Visualization', '3 Months'],
      icon: BarChart3,
      includes: [
        'Power Query data transformation',
        'Star-schema data modelling',
        'DAX measures and time intelligence',
        'Executive-ready Power BI dashboards'
      ],
      gradient: 'from-purple-500/10 to-pink-500/10',
      accentColor: 'text-purple-400'
    },
    {
      id: 'ai-mastery',
      title: 'AI Fluency for Business Leaders',
      level: 'AI Mastery',
      description: 'Understand how to use AI confidently and responsibly to improve decisions, productivity, and strategy.',
      price: 7500,
      duration: '1 month',
      tags: ['AI Fluency', 'Prompting', '1 Month'],
      icon: Brain,
      includes: [
        'How modern AI systems think',
        'Prompt engineering for real work',
        'AI tools and workflows',
        'Responsible, career-driven AI usage'
      ],
      gradient: 'from-emerald-500/10 to-teal-500/10',
      accentColor: 'text-emerald-400'
    },
    {
      id: 'ai-agents-masterclass',
      title: 'Agentic Systems for Decision Automation',
      level: 'Advanced',
      description: 'Design AI systems that support decision-making, execution, and scale across the business.',
      price: 12500,
      duration: '1 month',
      tags: ['Agentic AI', 'Automation', '1 Month'],
      icon: Zap,
      includes: [
        'AI agent design fundamentals',
        'n8n Automation, APIs, and Agentic Workflows',
        'Knowledge, memory, and tools',
        'Deploying agents across channels'
      ],
      gradient: 'from-orange-500/10 to-red-500/10',
      accentColor: 'text-orange-400'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Eric Onchonga',
      role: 'CEO, Irri-hub',
      content: 'Delivered a insightful Power BI dashboard integrated with Zoho Books and Zoho CRM APIs, providing real-time financial and customer visibility for our agricultural operations.',
      avatar: 'SM',
      rating: 5
    },
    {
      name: 'Duncan Mutulu',
      role: 'Director, World Vision',
      content: 'Built my supply chain inventory dashboard and trained me on Power BI Desktop and Service, enabling independent report development and management.',
      avatar: 'DM',
      rating: 5
    },
    {
      name: 'Monicah Gitagia',
      role: 'Student, Microsoft Excel',
      content: 'Ezra is a firm and fun tutor who provided one-on-one Excel coaching, significantly improving my confidence, efficiency, and accuracy in daily data analysis.',
      avatar: 'MG',
      rating: 5
    }
  ];

  const handleEnroll = (course: { id: string; title: string; price: number; description: string }) => {
    navigate(`/enroll?courseId=${course.id}&courseName=${encodeURIComponent(course.title)}&coursePrice=${course.price}&courseDescription=${encodeURIComponent(course.description)}`);
  };

  const handleChatbot = () => {
    console.log('Opening Ubuntu Academy chatbot...');
  };

  return (
    <div className="bg-[#18100F]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-cyan/10"></div>
        </div>

        {/* Floating metric cards */}
        <div className="absolute top-20 left-4 md:left-20 bg-brand-dark/80 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/10 animate-float z-10 hidden sm:block">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Revenue Growth</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mt-1">+47.5%</div>
        </div>

        <div className="absolute bottom-32 right-4 md:right-20 bg-brand-dark/80 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/10 animate-float z-10 hidden sm:block" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Data Accuracy</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mt-1">99.2%</div>
        </div>

        <div className="absolute top-1/3 right-4 md:right-32 bg-brand-dark/80 backdrop-blur-md rounded-lg p-3 md:p-4 border border-brand-blue/30 animate-float z-10 hidden md:block" style={{ animationDelay: '1s' }}>
          <div className="text-xs text-brand-blue mb-1">AI Insights</div>
          <div className="text-sm text-white">Actionable</div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            Unlock Your Potential With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
              AI & Data Fluency
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            We build intelligence, enable people, and automate insight using Agentic AI, analytics consulting, and capability enablement to turn data into action. 
            Through mentorship and courses in Analytics, AI, and Agentic AI Mastery, we develop Data & AI fluency and automate decision workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/assessment')}
              className="px-8 py-4 bg-brand-cyan text-brand-dark rounded-full font-bold text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              Start Your Journey
            </button>
            <a
              href="https://www.linkedin.com/company/106319269"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE (ABOUT UBUNTU) */}
      <section className="py-20 md:py-32 bg-[#18100F] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-xs md:text-sm font-semibold tracking-wider uppercase bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                About Ubuntu Analytiq
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              Building Intelligence,<br />Enabling People
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We transform professionals into decision-makers who lead with data, think with AI, and automate with purpose.
              We blend analytics consulting, capability development, and intelligent automation to build self-sufficient, AI-fluent teams.
            </p>
          </div>

          {/* Who We Are Story */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Who We Are</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed text-base md:text-lg max-w-4xl mx-auto">
                  <p>
                    Ubuntu Academy was born from a simple truth: <span className="text-cyan-400 font-semibold">the future belongs to those who can think with data and act with AI.</span>
                  </p>
                  <p>
                    We saw too many organizations drowning in tools but starving for insight. Too many professionals learning 
                    skills but not building systems. Too many dashboards that looked impressive but answered no real questions.
                  </p>
                  <p>
                    So we built something different. A practice that blends <span className="text-cyan-400 font-semibold">analytics consulting, 
                    capability development, and intelligent automation</span>—designed not to create dependency, but to build 
                    self-sufficient, AI-fluent organizations.
                  </p>
                  <p className="text-white font-medium pt-4 border-t border-white/10">
                    From Excel to Agentic AI, we meet you where you are and take you where you need to be.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-400">
              Build capability, unlock insight, automate outcomes.
            </p>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Business Analytics */}
            <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-white/5 rounded-2xl p-8 hover:border-cyan-400/30 transition-all group relative overflow-hidden">
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative pattern */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block group-hover:bg-cyan-400/10 transition-colors">
                  <BarChart3 className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Business Analytics & Data Science</h3>
                <p className="text-gray-400">
                  Turn raw data into confident decisions. We transform messy data into clear insights through analysis, modeling (including machine learning), dashboards, storytelling, research, and actionable recommendations for growth, efficiency, and profitability.
                </p>
              </div>
            </div>

            {/* Service 2: Training */}
            <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-white/5 rounded-2xl p-8 hover:border-purple-400/30 transition-all group relative overflow-hidden">
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative pattern */}
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block group-hover:bg-purple-400/10 transition-colors">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Workshops, Training & Mentorship</h3>
                <p className="text-gray-400">
                  Build analytics and AI skills that deliver results. We offer hands-on training and mentorship for individuals and teams in Business Analytics (Excel & Power BI), Data Science, AI & Agentic AI, and analytics leadership.
                </p>
              </div>
            </div>

            {/* Service 3: AI Solutions */}
            <div className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-white/5 rounded-2xl p-8 hover:border-blue-400/30 transition-all group relative overflow-hidden">
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative pattern */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block group-hover:bg-blue-400/10 transition-colors">
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI & Agentic AI Solutions</h3>
                <p className="text-gray-400">
                  AI that works for Africa, not just in theory. We build real AI systems and workflows for African SMEs, including agentic AI automation, AI-powered workflows, employee AI mastery training, and productivity systems tailored to Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPROACH */}
      <section className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Approach</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Blending technical rigor with strategic foresight to deliver measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Decision-Driven Analytics */}
            <div className="bg-gradient-to-br from-gray-900/40 to-black/20 border border-white/5 rounded-2xl p-6 relative group overflow-hidden hover:border-brand-cyan/30 transition-all duration-300">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl group-hover:bg-brand-cyan/20 transition-all"></div>
              <div className="h-40 flex items-center justify-center mb-6 relative">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-2 border-brand-cyan/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-2 border-2 border-brand-purple/30 rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="text-brand-cyan w-10 h-10 animate-pulse" />
                  </div>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-brand-cyan rounded-full animate-bounce"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Decision-Driven Analytics</h3>
              <p className="text-sm text-gray-400">Transforming complex data into business narratives that drive confident decisions.</p>
            </div>

            {/* Card 2: Skills & Capability Development */}
            <div className="bg-gradient-to-br from-gray-900/40 to-black/20 border border-white/5 rounded-2xl p-6 relative group overflow-hidden hover:border-brand-purple/30 transition-all duration-300">
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl group-hover:bg-brand-purple/20 transition-all"></div>
              <div className="h-40 flex items-center justify-center mb-6">
                <div className="relative">
                  <Share2 className="w-20 h-20 text-brand-purple/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-brand-purple rounded-full shadow-[0_0_15px_#8B5CF6] animate-pulse"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                Skills & Capability Development
              </h3>
              <p className="text-sm text-gray-400">Empowering teams through mentorship and practical learning to build sustainable, self-sufficient capability.</p>
            </div>

            {/* Card 3: Intelligent Analytics Automation */}
            <div className="bg-gradient-to-br from-gray-900/40 to-black/20 border border-white/5 rounded-2xl p-6 relative group overflow-hidden hover:border-brand-blue/30 transition-all duration-300">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-all"></div>
              <div className="h-40 flex items-center justify-center mb-6">
                <div className="relative">
                  <Cog className="w-20 h-20 text-brand-blue/20 animate-[spin_8s_linear_infinite]" />
                  <Cog className="absolute -top-4 -right-4 w-12 h-12 text-brand-cyan/20 animate-[spin_5s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_15px_#3B82F6] animate-pulse"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Intelligent Analytics Automation</h3>
              <p className="text-sm text-gray-400">Automating analytics workflows, from pipelines and reporting to AI-driven decision agents.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 6. CALL TO ACTION (CHATBOT) */}
      <section className="py-20 bg-[#18100F] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Have Questions?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Chat with our Ubuntu AI Academy Assistant for instant answers about courses, pricing, and enrollment.
              </p>
              <button 
                onClick={handleChatbot}
                className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-brand-cyan/20 to-brand-cyan/10 hover:from-brand-cyan hover:to-brand-cyan/90 text-brand-cyan hover:text-black border-2 border-brand-cyan/40 hover:border-brand-cyan px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 group shadow-lg shadow-brand-cyan/20 hover:shadow-brand-cyan/40"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                <span>Chat with Ubuntu AI Academy Assistant</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-20 bg-[#18100F] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real results from professionals who transformed with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/60 to-gray-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-cyan-400/20" />
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>

                <div className="flex gap-1 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONTACT */}
      <section className="py-20 bg-[#18100F]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-brand-cyan/10 rounded-full flex items-center justify-center mb-4 text-brand-cyan">
                  <Phone className="w-6 h-6" />
                </div>
                <a href="tel:+254706719457" className="text-white font-medium hover:text-brand-cyan transition-colors text-sm">+254706719457</a>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://wa.me/254706719457"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400 hover:bg-green-500/20 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a href="https://wa.me/254706719457" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-green-400 transition-colors text-sm">WhatsApp</a>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="mailto:ezra@ubuntuanalytiq.com"
                  className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a href="mailto:ezra@ubuntuanalytiq.com" className="text-white font-medium hover:text-red-400 transition-colors text-sm">Email Us</a>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://maps.google.com/?q=Nairobi,Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-brand-cyan/10 rounded-full flex items-center justify-center mb-4 text-brand-cyan hover:bg-brand-cyan/20 transition-colors"
                >
                  <MapPin className="w-6 h-6" />
                </a>
                <a href="https://maps.google.com/?q=Nairobi,Kenya" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-brand-cyan transition-colors text-sm">Nairobi, Kenya</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
