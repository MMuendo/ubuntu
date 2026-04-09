import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3,
  Clock,
  Calendar,
  Users,
  Database,
  Zap,
  Eye,
  Share2,
  Play,
  TrendingUp
} from 'lucide-react';

const PowerBICoursePage: React.FC = () => {
  const navigate = useNavigate();

  const courseModules = [
    {
      title: 'The Power BI Ecosystem',
      icon: BarChart3,
      description: 'Understand the Power BI landscape and where each component fits in your analytics workflow',
      topics: [
        'Power BI Desktop, Service, and Mobile',
        'Understanding data flow from source to report',
        'Workspace architecture and collaboration',
        'Licensing models and when to use each',
        'Integration with Microsoft ecosystem'
      ]
    },
    {
      title: 'Connecting to Data',
      icon: Database,
      description: 'Master the art of connecting Power BI to any data source imaginable',
      topics: [
        'Connecting to Excel, CSV, and databases',
        'Web data and API connections',
        'SharePoint and cloud data sources',
        'Direct Query vs Import mode',
        'Managing data source credentials'
      ]
    },
    {
      title: 'Advanced Data Shaping (ETL)',
      icon: Zap,
      description: 'Transform messy data into analysis-ready datasets using Power Query',
      topics: [
        'Power Query Editor deep dive',
        'Data cleaning and transformation techniques',
        'Merging and appending queries',
        'Creating custom columns with M language',
        'Building reusable transformation patterns',
        'Query folding and performance optimization'
      ]
    },
    {
      title: 'The Data Model – Relationships',
      icon: Share2,
      description: 'Design robust data models that make analysis intuitive and powerful',
      topics: [
        'Star schema design principles',
        'Creating and managing relationships',
        'Cardinality and cross-filter direction',
        'Active vs inactive relationships',
        'Role-playing dimensions',
        'Data model optimization best practices'
      ]
    },
    {
      title: 'DAX (Data Analysis Expressions)',
      icon: TrendingUp,
      description: 'Write powerful calculations that bring your data to life',
      topics: [
        'DAX fundamentals: Calculated Columns vs Measures',
        'Essential DAX functions: SUM, CALCULATE, FILTER',
        'Time intelligence functions',
        'Context: Row context vs Filter context',
        'Advanced DAX patterns (YTD, YoY, Rankings)',
        'Optimizing DAX for performance'
      ]
    },
    {
      title: 'Visualization & AI',
      icon: Eye,
      description: 'Create compelling visualizations that tell stories and reveal insights',
      topics: [
        'Choosing the right visual for your data',
        'Custom visuals from AppSource',
        'Interactive features: Slicers, Drill-through, Bookmarks',
        'AI visuals: Key Influencers, Decomposition Tree',
        'Q&A natural language queries',
        'Accessibility and design best practices'
      ]
    },
    {
      title: 'Professional Publishing & Storytelling',
      icon: Share2,
      description: 'Share insights effectively and build reports that drive action',
      topics: [
        'Publishing to Power BI Service',
        'Creating and managing workspaces',
        'Row-level security (RLS)',
        'Building data-driven narratives',
        'Mobile report optimization',
        'Scheduled refresh and gateway configuration',
        'Sharing and collaboration strategies'
      ]
    }
  ];

  const handleEnroll = () => {
    navigate('/enroll?courseId=powerbi-workshop&courseName=Decision%20Systems%20with%20Power%20BI&coursePrice=15000');
  };

  return (
    <div className="bg-[#18100F] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-brand-dark to-brand-dark" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgwem0xMDAgMTAwaDEwMHYxMDBIMTAwek0wIDEwMGgxMDB2MTAwSDB6IiBmaWxsPSIjRkZGIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20" />
        </div>

        {/* Floating icons */}
        <div className="absolute top-32 left-10 bg-purple-500/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 animate-float z-10 hidden lg:block">
          <BarChart3 className="w-8 h-8 text-purple-400" />
        </div>

        <div className="absolute bottom-40 right-20 bg-pink-500/10 backdrop-blur-md rounded-xl p-4 border border-pink-500/20 animate-float z-10 hidden lg:block" style={{ animationDelay: '0.5s' }}>
          <TrendingUp className="w-8 h-8 text-pink-400" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20">
              Core Course
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            Decision Systems with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Power BI
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Turn data into decision-ready dashboards and decision systems leaders trust and actually use. 
            Build insights that drive action.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">3 Months</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-pink-400" />
              <span className="text-white font-semibold">Live Sessions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">Real Projects</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleEnroll}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
            >
              Apply to Join - KES 25,000
            </button>
            <button
              onClick={() => navigate('/academy')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </section>

      {/* VIDEO/IMAGE SECTION */}
      <section className="py-12 bg-[#18100F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold">Course Preview Video</p>
                <p className="text-gray-400 text-sm">See Power BI transform data into decisions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE OUTLINE */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Course Outline
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              7 comprehensive modules covering the entire Power BI ecosystem from data to insights
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {courseModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 lg:w-1/3">
                      <div className="p-4 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full inline-block mb-3">
                          Module {index + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <div className="lg:w-2/3 space-y-2.5">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-start gap-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL ACHIEVE */}
      <section className="py-20 bg-gradient-to-b from-purple-900/10 to-[#18100F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll Achieve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Build Enterprise Dashboards</h3>
              <p className="text-gray-400">
                Create professional, interactive dashboards that executives trust for critical decisions
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Master DAX</h3>
              <p className="text-gray-400">
                Write powerful calculations and time intelligence measures that unlock deep insights
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Design Data Models</h3>
              <p className="text-gray-400">
                Build optimized star schema models that make complex analysis simple and fast
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Tell Data Stories</h3>
              <p className="text-gray-400">
                Transform raw data into compelling narratives that drive action and change
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-purple-500/10 border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Master Power BI?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join data professionals building decision systems that leaders trust and use every day.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleEnroll}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                >
                  Apply Now - KES 25,000
                  <ArrowRight className="inline-block w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={() => navigate('/academy')}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                >
                  View All Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PowerBICoursePage;
