import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Video,
  Calendar,
  Clock,
  Users,
  ExternalLink,
  Sparkles,
  Target,
  Lightbulb,
  MessageCircle,
  Play
} from 'lucide-react';

const WebinarDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const upcomingWebinar = {
    title: 'Agentic AI in 2026: How to Scale It for Africa',
    description: `Join fellow humans (yes, even the ones obsessed with spreadsheets) to explore how Agentic AI will shape Africa's future - and maybe finally automate that task you've been secretly dreading. Bring curiosity, imagination, and a hint of mischief!`,
    longDescription: `This isn't your typical webinar. We're ditching the corporate jargon and diving into a playful, practical exploration of how Agentic AI is transforming work across Africa. Whether you're a business leader, developer, or just AI-curious, you'll leave with actionable insights and maybe a few laughs along the way.`,
    date: 'February 12, 2026',
    time: '7:00 PM EAT',
    duration: '90 minutes',
    spots: 'Limited seats — reserve your spot now!',
    host: 'Ezra Muinde',
    hostTitle: 'Founder, Ubuntu Analytiq',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSer5DSzBxdi_kSF-WaVyEBtOPxMZN_3bXZS5TBK1Rv9NjWsxg/viewform'
};

  const agenda = [
    {
      time: '7:00 PM',
      title: 'Opening: The State of Agentic AI',
      description: `Where we are, where we're going, and why Africa is uniquely positioned to lead`
    },
    {
      time: '7:15 PM',
      title: 'Live Demo: Real Agents in Action',
      description: 'Watch autonomous AI agents solve real business problems in real-time'
    },
    {
      time: '7:35 PM',
      title: 'Building Your First Agent',
      description: 'Step-by-step walkthrough of creating a simple but powerful AI agent'
    },
    {
      time: '8:00 PM',
      title: 'African Context: Opportunities & Challenges',
      description: `How to deploy AI agents given Africa's unique tech landscape`
    },
    {
      time: '8:20 PM',
      title: 'Live Q&A + Fun Reflection',
      description: `Your questions answered + share one task you'd love to automate`
    }
  ];

  const topics = [
    {
      icon: Sparkles,
      title: 'Agentic AI Fundamentals',
      description: 'What makes an AI "agentic" and why it matters for your business'
    },
    {
      icon: Target,
      title: 'Real-World Use Cases',
      description: 'Customer service, data analysis, workflow automation, and more'
    },
    {
      icon: Lightbulb,
      title: 'Building vs Buying',
      description: 'When to build custom agents vs using existing solutions'
    },
    {
      icon: MessageCircle,
      title: 'Interactive Discussion',
      description: 'Bring your questions, challenges, and ideas to the conversation'
    }
  ];

  const benefits = [
    'Understand the Agentic AI landscape in 2026',
    'See live demos of working AI agents',
    `Learn what's possible with your current resources`,
    'Get your specific questions answered',
    'Network with fellow AI enthusiasts',
    'Receive exclusive 10% discount code for any course',
    'Access to webinar recording and resources'
  ];

  return (
    <div className="bg-[#18100F] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-brand-dark to-brand-dark"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMikiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-40"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-32 left-10 bg-purple-500/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 animate-float z-10 hidden lg:block">
          <Video className="w-8 h-8 text-purple-400" />
        </div>

        <div className="absolute bottom-40 right-20 bg-cyan-500/10 backdrop-blur-md rounded-xl p-4 border border-cyan-500/20 animate-float z-10 hidden lg:block" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20 flex items-center gap-2 mx-auto w-fit">
              <Video className="w-4 h-4" />
              Free Live Webinar
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            Agentic AI in 2026: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              How to Scale It for Africa
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            {upcomingWebinar.description}
          </p>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto mb-8">
            {upcomingWebinar.longDescription}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">{upcomingWebinar.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">{upcomingWebinar.time}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-semibold">Free Entry</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={upcomingWebinar.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] inline-flex items-center gap-2"
            >
              Register Now - It's Free
              <ExternalLink className="w-5 h-5" />
            </a>
            <button
              onClick={() => navigate('/academy')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Back to Academy
            </button>
          </div>
        </div>
      </section>

      {/* VIDEO/IMAGE SECTION */}
      <section className="py-12 bg-[#18100F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-cyan-900/30 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold">Webinar Preview</p>
                <p className="text-gray-400 text-sm">See what you'll learn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll Discover
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              90 minutes packed with insights, demos, and practical knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {topics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-gray-400">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT HOST */}
      <section className="py-20 bg-gradient-to-b from-purple-900/10 to-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Your Host
              </h2>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-500/10 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-purple-400 border-2 border-purple-500/20">
                EK
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{upcomingWebinar.host}</h3>
              <p className="text-purple-400 mb-4">{upcomingWebinar.hostTitle}</p>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Ezra is passionate about making AI and data analytics accessible to African businesses. 
                With years of experience in AI systems and business analytics, he brings a practical, 
                results-focused approach to AI education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-purple-500/10 border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Reserve Your Spot Now
              </h3>
              <p className="text-gray-400 mb-2 max-w-2xl mx-auto">
                {upcomingWebinar.spots}
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Link will be sent via email after registration
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={upcomingWebinar.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full font-bold text-lg transition-all shadow-lg inline-flex items-center gap-2"
                >
                  Register Now - It's Free
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button
                  onClick={() => navigate('/academy')}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                >
                  View Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebinarDetailsPage;
