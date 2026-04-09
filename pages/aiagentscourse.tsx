import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  Clock,
  Calendar,
  Users,
  Bot,
  Wrench,
  Database,
  MessageCircle,
  Globe,
  Shield,
  Play,
  Smartphone
} from 'lucide-react';

const AIAgentsCoursePage: React.FC = () => {
  const navigate = useNavigate();

  const courseModules = [
    {
      title: 'What is an AI Agent',
      icon: Bot,
      description: 'Understand AI agents and how they differ from traditional AI assistants',
      topics: [
        'From chatbots to autonomous agents',
        'The anatomy of an AI agent (perception, reasoning, action)',
        'Agent vs Assistant vs Automation',
        'Real-world agent use cases',
        'The agent execution loop',
        'When to use agents vs traditional automation'
      ]
    },
    {
      title: 'Meeting Your Workbench – n8n Crash Course',
      icon: Wrench,
      description: 'Master n8n, your platform for building and deploying AI agents',
      topics: [
        'Introduction to n8n and workflow automation',
        'Nodes, connections, and execution flow',
        'Triggers: webhooks, schedules, and events',
        'Data transformation and manipulation',
        'Error handling and debugging',
        'Building your first automated workflow',
        'Self-hosting vs cloud deployment'
      ]
    },
    {
      title: 'Giving Your AI "Hands" (Tools)',
      icon: Zap,
      description: 'Connect your AI agent to APIs and external services to take action',
      topics: [
        'Understanding tool/function calling',
        'Building custom tools for your agent',
        'API integration fundamentals',
        'Common tools: web search, email, calendar, databases',
        'Authentication and API keys',
        'Tool selection and chaining',
        'Best practices for reliable tool execution'
      ]
    },
    {
      title: 'Training and Using Your Library with AI (Knowledge/RAG)',
      icon: Database,
      description: 'Give your agent access to your company\'s knowledge and documents',
      topics: [
        'Retrieval Augmented Generation (RAG) explained',
        'Building a knowledge base',
        'Vector databases and embeddings',
        'Chunking strategies for documents',
        'Semantic search vs keyword search',
        'Integrating knowledge into agent workflows',
        'Keeping knowledge up-to-date'
      ]
    },
    {
      title: 'Making AI Feel Human and Context-Aware (Personality & Memory)',
      icon: MessageCircle,
      description: 'Design agents with personality and contextual awareness',
      topics: [
        'Crafting agent personality through system prompts',
        'Conversation memory and context management',
        'Short-term vs long-term memory',
        'User profiling and personalization',
        'Maintaining context across sessions',
        'Emotional intelligence in AI responses',
        'Brand voice consistency'
      ]
    },
    {
      title: 'Going Mobile (Messaging Apps) – The Agent in Your Pocket',
      icon: Smartphone,
      description: 'Deploy your agent to WhatsApp, Telegram, and Slack',
      topics: [
        'WhatsApp Business API integration',
        'Building Telegram bots',
        'Slack bot development',
        'Multi-platform deployment strategy',
        'Managing conversations at scale',
        'Push notifications and proactive messaging',
        'Mobile UX best practices for agents'
      ]
    },
    {
      title: 'The Customer Service Desk (Web Integration)',
      icon: Globe,
      description: 'Embed your agent on websites for customer support',
      topics: [
        'Web chat widget integration',
        'Handling customer inquiries 24/7',
        'Escalation to human support',
        'Multi-language support',
        'Analytics and conversation tracking',
        'GDPR and privacy compliance',
        'Building knowledge bases from support tickets'
      ]
    },
    {
      title: 'Keeping Your AI Honest – Safety First',
      icon: Shield,
      description: 'Build responsible, secure, and trustworthy AI agents',
      topics: [
        'Prompt injection and jailbreak prevention',
        'Rate limiting and abuse prevention',
        'Data privacy and encryption',
        'Monitoring and logging agent behavior',
        'Testing agent reliability',
        'Fallback strategies when agents fail',
        'Ethical considerations in agent design',
        'Compliance and regulatory requirements'
      ]
    }
  ];

  const handleEnroll = () => {
    navigate('/enroll?courseId=ai-agents-masterclass&courseName=Agentic%20Systems%20for%20Decision%20Automation&coursePrice=5000');
  };

  return (
    <div className="bg-[#18100F] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-brand-dark to-brand-dark"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Imhlb' +
              'HgiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBvbHlnb24gcG9pbnRzPSIzMCwwIDYwLDE1IDYwLDQ1IDMwLDYwIDAsMzUgMCwxNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI0OSwgMTE1LCAyMiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2hleCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>

        {/* Floating icons */}
        <div className="absolute top-32 left-10 bg-orange-500/10 backdrop-blur-md rounded-xl p-4 border border-orange-500/20 animate-float z-10 hidden lg:block">
          <Bot className="w-8 h-8 text-orange-400" />
        </div>

        <div className="absolute bottom-40 right-20 bg-red-500/10 backdrop-blur-md rounded-xl p-4 border border-red-500/20 animate-float z-10 hidden lg:block" style={{ animationDelay: '0.5s' }}>
          <Zap className="w-8 h-8 text-red-400" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="text-orange-400 text-sm font-semibold tracking-wider uppercase bg-orange-500/10 px-6 py-2 rounded-full border border-orange-500/20">
              Advanced Course
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            Agentic Systems for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Decision Automation
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Design AI systems that support decision-making, execution, and scale across the business. 
            Build autonomous agents that work 24/7.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-white font-semibold">1 Month</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-red-400" />
              <span className="text-white font-semibold">Live Sessions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Users className="w-5 h-5 text-orange-400" />
              <span className="text-white font-semibold">Build Real Agents</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleEnroll}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]"
            >
              Apply to Join - KES 12,500
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

      {/* VIDEO SECTION */}
      <section className="py-12 bg-[#18100F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-orange-500/20 shadow-2xl shadow-orange-500/10">
            <div className="aspect-video bg-black">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src="https://www.youtube.com/embed/I_7eKYxAxbE?si=e3vRbkbNBxt7X29D"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
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
              8 comprehensive modules covering everything from agent fundamentals to production deployment
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {courseModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-500/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 lg:w-1/3">
                      <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors flex-shrink-0">
                        <IconComponent className="w-7 h-7 text-orange-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full inline-block mb-3">
                          Module {index + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <div className="lg:w-2/3 space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-start gap-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
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

      {/* WHAT YOU'LL BUILD */}
      <section className="py-20 bg-gradient-to-b from-orange-900/10 to-[#18100F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll Build
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Graduate with production-ready AI agents deployed across multiple channels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Customer Support Agent</h3>
              <p className="text-gray-400">
                24/7 intelligent support bot that handles inquiries, escalates when needed, and learns from interactions
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp Business Agent</h3>
              <p className="text-gray-400">
                Mobile-first agent that converses naturally and takes actions via messaging apps
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Knowledge-Powered Agent</h3>
              <p className="text-gray-400">
                RAG-enabled agent that answers questions from your company's documents and data
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Workflow Automation Agent</h3>
              <p className="text-gray-400">
                Intelligent automation that makes decisions, triggers actions, and orchestrates complex workflows
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO SHOULD TAKE THIS */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Who Should Take This Course?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Developers building AI-powered applications</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Product managers designing intelligent systems</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Business leaders automating operations</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Completed the AI Mastery course</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500/10 via-red-500/5 to-orange-500/10 border border-orange-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Build AI Agents?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join the elite group of professionals building autonomous AI systems that scale.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleEnroll}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
                >
                  Apply Now - KES 12,500
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

export default AIAgentsCoursePage;
