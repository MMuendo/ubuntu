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
  Video,
  ExternalLink
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const AcademyPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

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

  // Upcoming webinar data
  const upcomingWebinar = {
    title: 'Introduction to Data Analytics & AI',
    description: 'Join us for an interactive session exploring how data analytics and AI can transform your career and business. Perfect for beginners and professionals looking to understand the landscape.',
    date: 'February 15, 2026',
    time: '3:00 PM EAT',
    duration: '90 minutes',
    spots: 'Limited to 50 participants',
    topics: [
      'Understanding the data analytics landscape',
      'AI fundamentals for business professionals',
      'Career opportunities in data & AI',
      'Live Q&A with industry experts'
    ],
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSer5DSzBxdi_kSF-WaVyEBtOPxMZN_3bXZS5TBK1Rv9NjWsxg/viewform'
  };

  const handleEnroll = (course: { id: string; title: string; price: number; description: string }) => {
    navigate(`/enroll?courseId=${course.id}&courseName=${encodeURIComponent(course.title)}&coursePrice=${course.price}&courseDescription=${encodeURIComponent(course.description)}`);
  };

  return (
    <div className="bg-[#18100F] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-cyan/10"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 bg-brand-dark/80 backdrop-blur-md rounded-lg p-4 border border-white/10 animate-float z-10 hidden md:block">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-brand-cyan" />
            <span className="text-xs text-gray-400">AI-Powered Learning</span>
          </div>
        </div>

        <div className="absolute bottom-32 right-10 bg-brand-dark/80 backdrop-blur-md rounded-lg p-4 border border-white/10 animate-float z-10 hidden md:block" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-purple" />
            <span className="text-xs text-gray-400">500+ Students</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
              Ubuntu Academy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Transform your career with world-class training in Data Analytics, AI, and Agentic Systems.
            From Excel fundamentals to advanced AI automation—build skills that matter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#courses"
              className="px-8 py-4 bg-brand-cyan text-brand-dark rounded-full font-bold text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              Explore Courses
            </a>
            <a
              href="#webinars"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Join Free Webinar
            </a>
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" className="py-20 bg-[#18100F]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

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

      {/* WEBINARS SECTION */}
      <section id="webinars" className="py-20 bg-[#18100F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
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
              Join our free webinars to explore data analytics and AI. Get a taste of what we teach before enrolling.
            </p>
          </div>

          {/* Webinar Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-purple-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-all"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/15 transition-all"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Video className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-400 font-semibold uppercase tracking-wide">Upcoming Webinar</div>
                    <div className="text-xs text-gray-500">Free • Live Interactive Session</div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {upcomingWebinar.title}
                </h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {upcomingWebinar.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-500 uppercase font-semibold">Date</span>
                    </div>
                    <div className="text-white font-semibold">{upcomingWebinar.date}</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-gray-500 uppercase font-semibold">Time</span>
                    </div>
                    <div className="text-white font-semibold">{upcomingWebinar.time}</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-gray-500 uppercase font-semibold">Availability</span>
                    </div>
                    <div className="text-white font-semibold">{upcomingWebinar.spots}</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    What You'll Learn
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {upcomingWebinar.topics.map((topic, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                      to="/webinar"
                      className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl px-8 py-4 font-bold text-center transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center gap-2 group/btn"
                    >
                      More Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button
                    onClick={() => navigate('/')}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-xl px-8 py-4 font-semibold transition-all duration-300"
                  >
                    Back to Home
                  </button>
                </div>

                <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
                    <div>
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold text-purple-400">Pro tip:</span> Attend the webinar to get an exclusive 
                        <span className="text-white font-semibold"> 10% discount code</span> for any course enrollment!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Past Webinars Archive (Optional) */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              Missed our previous webinars? <a href="#" className="text-purple-400 hover:text-purple-300 underline transition-colors">Watch recordings</a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#18100F]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Career?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join hundreds of professionals who have already started their journey in data and AI with Ubuntu Academy.
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
