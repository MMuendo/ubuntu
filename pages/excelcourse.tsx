import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileSpreadsheet,
  Clock,
  Calendar,
  Users,
  BarChart3,
  Database,
  Filter,
  Table,
  Zap,
  Play
} from 'lucide-react';

const ExcelCoursePage: React.FC = () => {
  const navigate = useNavigate();

  const courseModules = [
    {
      title: 'Data Entry and Formatting',
      icon: FileSpreadsheet,
      description: 'Master the foundation of Excel with professional data entry techniques and formatting',
      topics: [
        'Professional data entry best practices',
        'Cell formatting and styles',
        'Conditional formatting',
        'Custom number formats',
        'Data validation rules'
      ]
    },
    {
      title: 'Formulas and Functions',
      icon: Zap,
      description: 'Build powerful calculations and automate decision-making with Excel formulas',
      topics: [
        'Essential functions: SUM, AVERAGE, COUNT',
        'Logical functions: IF, AND, OR, IFS',
        'Lookup functions: VLOOKUP, XLOOKUP, INDEX-MATCH',
        'Text functions and date calculations',
        'Advanced nested formulas'
      ]
    },
    {
      title: 'Sorting and Filtering',
      icon: Filter,
      description: 'Extract insights from your data with advanced sorting and filtering techniques',
      topics: [
        'Custom sorting by multiple columns',
        'Advanced filtering techniques',
        'Using filter functions',
        'Removing duplicates',
        'Working with data ranges'
      ]
    },
    {
      title: 'Charts and Visualizations',
      icon: BarChart3,
      description: 'Transform numbers into compelling visual stories that drive decisions',
      topics: [
        'Choosing the right chart type',
        'Creating professional charts',
        'Chart formatting and customization',
        'Combo charts and sparklines',
        'Dynamic charts with formulas'
      ]
    },
    {
      title: 'Tables and Pivot Tables',
      icon: Table,
      description: 'Unlock the power of structured data analysis with Excel Tables and PivotTables',
      topics: [
        'Converting ranges to Tables',
        'Table formulas and structured references',
        'Creating and customizing PivotTables',
        'Calculated fields in PivotTables',
        'PivotCharts for dynamic reporting'
      ]
    },
    {
      title: 'Using Templates and Macros',
      icon: Play,
      description: 'Automate repetitive tasks and build reusable Excel solutions',
      topics: [
        'Creating and using templates',
        'Recording macros',
        'Basic macro editing',
        'Assigning macros to buttons',
        'Macro security best practices'
      ]
    },
    {
      title: 'Power Query',
      icon: Database,
      description: 'Master data transformation and automation with Power Query',
      topics: [
        'Importing data from multiple sources',
        'Cleaning and transforming data',
        'Merging and appending queries',
        'Creating custom columns',
        'Refreshable data workflows'
      ]
    },
    {
      title: 'Data Analysis Tools',
      icon: BarChart3,
      description: 'Leverage Excel\'s built-in analysis tools for deeper insights',
      topics: [
        'What-If Analysis (Goal Seek, Scenarios)',
        'Data Tables for sensitivity analysis',
        'Solver for optimization',
        'Descriptive statistics',
        'Forecasting and trend analysis'
      ]
    },
    {
      title: 'Power Pivot',
      icon: Database,
      description: 'Build sophisticated data models for advanced analytics',
      topics: [
        'Introduction to Power Pivot',
        'Creating relationships between tables',
        'DAX basics for calculations',
        'Measures vs Calculated Columns',
        'Building data models'
      ]
    },
    {
      title: 'Excel Dashboard',
      icon: BarChart3,
      description: 'Design executive-ready dashboards that communicate insights instantly',
      topics: [
        'Dashboard design principles',
        'Interactive elements (Slicers, Timelines)',
        'KPI visualizations',
        'Dynamic dashboard layouts',
        'Professional presentation techniques'
      ]
    }
  ];

  const handleEnroll = () => {
    navigate('/enroll?courseId=excel-workshop&courseName=Data%20Thinking%20with%20Excel&coursePrice=20000');
  };

  return (
    <div className="bg-[#18100F] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-brand-dark to-brand-dark"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        {/* Floating Excel icons */}
        <div className="absolute top-32 left-10 bg-blue-500/10 backdrop-blur-md rounded-xl p-4 border border-blue-500/20 animate-float z-10 hidden lg:block">
          <FileSpreadsheet className="w-8 h-8 text-blue-400" />
        </div>

        <div className="absolute bottom-40 right-20 bg-cyan-500/10 backdrop-blur-md rounded-xl p-4 border border-cyan-500/20 animate-float z-10 hidden lg:block" style={{ animationDelay: '0.5s' }}>
          <BarChart3 className="w-8 h-8 text-cyan-400" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20">
              Foundation Course
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            Data Thinking with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Microsoft Excel
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Learn how to structure problems, think analytically, and make better decisions using data. 
            Transform from Excel user to data strategist.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">3 Months</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">Live Sessions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-semibold">Hands-on Projects</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleEnroll}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
            >
              Apply to Join - KES 20,000
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
          <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/10">
            {/* Placeholder for video/image */}
            <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-cyan-900/30 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold">Course Preview Video</p>
                <p className="text-gray-400 text-sm">Watch how Excel transforms your data workflow</p>
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
              10 comprehensive modules taking you from Excel basics to building professional dashboards
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courseModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                          Module {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pl-16">
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL ACHIEVE */}
      <section className="py-20 bg-gradient-to-b from-blue-900/10 to-[#18100F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll Achieve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Master Data Analysis</h3>
              <p className="text-gray-400">
                Build complex models that answer real business questions and drive confident decisions
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Automate Workflows</h3>
              <p className="text-gray-400">
                Use Power Query and macros to eliminate repetitive tasks and save hours weekly
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Create Dashboards</h3>
              <p className="text-gray-400">
                Design executive-ready dashboards that communicate insights at a glance
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Think Strategically</h3>
              <p className="text-gray-400">
                Transform from tool user to strategic thinker who structures problems with data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-500/10 border border-blue-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Master Excel?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join professionals who are transforming their careers with data skills that matter.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleEnroll}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                >
                  Apply Now - KES 20,000
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

export default ExcelCoursePage;
