import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Brain,
  Clock,
  Calendar,
  Users,
  Zap,
  Shield,
  MessageSquare,
  Lightbulb,
  Play,
  TrendingUp,
  Target
} from 'lucide-react';

const AIMasteryCoursePage: React.FC = () => {
  const navigate = useNavigate();

  const courseModules = [
    {
      title: 'What is AI',
      icon: Brain,
      description: 'Demystify AI and understand what it really is (and isn\'t)',
      topics: [
        'The AI revolution: From sci-fi to reality',
        'Machine Learning vs AI vs Deep Learning',
        'Large Language Models explained simply',
        'What AI can (and cannot) do for you',
        'Real-world AI applications in business'
      ]
    },
    {
      title: 'How AI Thinks – Core Concepts',
      icon: Lightbulb,
      description: 'Understand how ChatGPT, Claude, and Gemini actually process information',
      topics: [
        'How AI "understands" language (tokens and embeddings)',
        'Why AI sometimes gets things wrong (hallucinations)',
        'Context windows and memory limitations',
        'Temperature and creativity settings',
        'The training data that shapes AI behavior'
      ]
    },
    {
      title: 'How to Talk to AI – Prompt Engineering',
      icon: MessageSquare,
      description: 'Master the art of communicating with AI to get exactly what you need',
      topics: [
        'The anatomy of a perfect prompt',
        'Zero-shot vs few-shot prompting',
        'Chain-of-thought reasoning',
        'Role prompting and persona assignment',
        'Advanced techniques: Tree-of-thought, ReAct',
        'Debugging bad outputs and iteration strategies'
      ]
    },
    {
      title: 'The Tool Bag – AI Tools (2026 Tech Stack)',
      icon: Zap,
      description: 'Navigate the AI tool landscape and build your personal tech stack',
      topics: [
        'ChatGPT, Claude, Gemini: When to use which',
        'AI writing assistants (Jasper, Copy.ai)',
        'AI for research and knowledge (Perplexity, Consensus)',
        'AI coding assistants (GitHub Copilot, Cursor)',
        'AI for productivity (Notion AI, Otter.ai)',
        'Image and video AI tools',
        'Building your custom AI toolkit'
      ]
    },
    {
      title: 'The Real Work – Deploying AI to Do the Work',
      icon: Target,
      description: 'Move from experimenting to actually using AI for real business outcomes',
      topics: [
        'Identifying high-value AI use cases',
        'Building AI-powered workflows',
        'Document analysis and summarization',
        'Content creation at scale',
        'Data analysis and insights generation',
        'Customer communication automation',
        'Measuring AI ROI in your work'
      ]
    },
    {
      title: 'Ethics, Safety & Data Protection',
      icon: Shield,
      description: 'Use AI responsibly and protect your organization',
      topics: [
        'Data privacy and confidentiality',
        'Bias in AI and how to spot it',
        'AI ethics frameworks',
        'Fact-checking and verification',
        'Copyright and intellectual property',
        'Building trust with AI-assisted work'
      ]
    },
    {
      title: 'The Workflow – Human > AI > Human',
      icon: TrendingUp,
      description: 'Design workflows where humans and AI amplify each other',
      topics: [
        'The AI collaboration framework',
        'What humans do best vs what AI does best',
        'Review and refinement loops',
        'Building AI-augmented teams',
        'Change management for AI adoption',
        'Scaling AI across your organization'
      ]
    },
    {
      title: 'Mastering Your Career Using AI (The Donkey Way)',
      icon: Brain,
      description: 'Learn to ride the AI donkey to career success—let it carry the heavy load',
      topics: [
        'The Donkey Philosophy: AI as your tireless assistant',
        'Offloading repetitive work to AI',
        'Using AI to upskill faster',
        'AI for career advancement and visibility',
        'Building your personal AI advantage',
        'Future-proofing your career with AI fluency',
        'From AI user to AI leader'
      ]
    }
  ];

  const handleEnroll = () => {
    navigate('/enroll?courseId=ai-mastery&courseName=AI%20Fluency%20for%20Business%20Leaders&coursePrice=2500');
  };

  return (
    <div className="bg-[#18100F] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-brand-dark to-brand-dark"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMSIgZmlsbD0icmdiYSgxNiwgMTg1LCAxMjksIDAuMikiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        </div>

        {/* Floating icons */}
        <div className="absolute top-32 left-10 bg-emerald-500/10 backdrop-blur-md rounded-xl p-4 border border-emerald-500/20 animate-float z-10 hidden lg:block">
          <Brain className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="absolute bottom-40 right-20 bg-teal-500/10 backdrop-blur-md rounded-xl p-4 border border-teal-500/20 animate-float z-10 hidden lg:block" style={{ animationDelay: '0.5s' }}>
          <Zap className="w-8 h-8 text-teal-400" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20">
              AI Mastery
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            AI Fluency for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Business Leaders
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            Understand how to use AI confidently and responsibly to improve decisions, productivity, and strategy.
          </p>
          <p className="text-lg text-emerald-400 max-w-2xl mx-auto mb-8 font-medium italic">
            Learn to ride the AI donkey—let it carry the heavy load while you focus on what matters.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-semibold">1 Month</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Calendar className="w-5 h-5 text-teal-400" />
              <span className="text-white font-semibold">Live Sessions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">Practical Projects</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleEnroll}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
            >
              Apply to Join - KES 2,500
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
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
            <div className="aspect-video bg-gradient-to-br from-emerald-900/30 to-teal-900/30 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold">Course Preview Video</p>
                <p className="text-gray-400 text-sm">Discover how AI transforms your work</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE DONKEY PHILOSOPHY */}
      <section className="py-16 bg-gradient-to-b from-emerald-900/10 to-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-emerald-500/10 rounded-full mb-4">
                <span className="text-4xl">🫏</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">The Donkey Philosophy</h2>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
              <p className="text-lg leading-relaxed">
                A donkey is strong, tireless, and reliable. It carries heavy loads so you don't have to. 
                But you still need to know how to ride it, where to guide it, and when to trust it.
              </p>
              <p className="text-lg leading-relaxed">
                <span className="text-emerald-400 font-semibold">AI is your donkey.</span> This course teaches 
                you how to harness its power, point it in the right direction, and let it do the heavy lifting 
                while you focus on strategy, creativity, and the human touch that AI can never replace.
              </p>
              <p className="text-lg leading-relaxed text-emerald-300 font-medium">
                Learn to ride the donkey. Master your career with AI.
              </p>
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
              8 comprehensive modules taking you from AI novice to confident AI practitioner
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {courseModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 lg:w-1/3">
                      <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                        <IconComponent className="w-7 h-7 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full inline-block mb-3">
                          Module {index + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
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
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-b from-emerald-900/10 to-[#18100F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll Achieve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Master AI Tools</h3>
              <p className="text-gray-400">
                Confidently use ChatGPT, Claude, and the entire AI ecosystem for real business value
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-teal-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">10x Your Productivity</h3>
              <p className="text-gray-400">
                Automate repetitive tasks and focus your energy on high-value strategic work
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Lead with AI</h3>
              <p className="text-gray-400">
                Position yourself as an AI-fluent leader who drives innovation in your organization
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Future-Proof Your Career</h3>
              <p className="text-gray-400">
                Build AI fluency that makes you indispensable in the age of intelligent automation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#18100F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Master AI?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join forward-thinking professionals learning to harness AI for career acceleration.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleEnroll}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
                >
                  Apply Now - KES 2,500
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

export default AIMasteryCoursePage;
