import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  FileSpreadsheet,
  BarChart3,
  Brain,
  Zap,
  Bot,
  Quote
} from 'lucide-react';

// SAFE IMPORTS
import Approach from '../components/Approach';

const HomePage: React.FC = () => {
  // 🚫 REMOVED useNavigate (router crash)
  // 🚫 REMOVED useCourses (hook crash)

  const enhancedCourses = [
    {
      id: 'excel-workshop',
      title: 'Data Thinking with Excel',
      description:
        'Learn how to structure problems, think analytically, and make better decisions using data',
      price: 20000,
      icon: FileSpreadsheet,
      includes: [
        'Advanced Excel formulas and logic',
        'Power Query foundations',
        'Decision-ready Excel models'
      ]
    },
    {
      id: 'powerbi-workshop',
      title: 'Decision Systems with Power BI',
      description:
        'Turn data into dashboards leaders trust.',
      price: 25000,
      icon: BarChart3,
      includes: [
        'Data modelling',
        'DAX fundamentals',
        'Executive dashboards'
      ]
    },
    {
      id: 'ai-mastery',
      title: 'AI Fluency for Business Leaders',
      description:
        'Use AI confidently and responsibly.',
      price: 7500,
      icon: Brain,
      includes: [
        'How AI thinks',
        'Prompting',
        'AI workflows'
      ]
    },
    {
      id: 'ai-agents',
      title: 'Agentic Systems for Automation',
      description:
        'Design AI systems that scale execution.',
      price: 12500,
      icon: Zap,
      includes: [
        'Agent design',
        'Memory & tools',
        'Deployment'
      ]
    }
  ];

  const services = [
    {
      id: 'analytics',
      title: 'Business Analytics',
      description:
        'Analytics consulting and capability building.',
      icon: BarChart3
    },
    {
      id: 'ai',
      title: 'AI & Data Fluency',
      description:
        'Practical AI training for teams.',
      icon: Brain
    },
    {
      id: 'agents',
      title: 'Agentic Workflows',
      description:
        'AI agents for operations and support.',
      icon: Bot
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Head of Analytics',
      content:
        'Ubuntu transformed how our team thinks about data.'
    },
    {
      name: 'James Omondi',
      role: 'CEO',
      content:
        'We now lead AI conversations confidently.'
    },
    {
      name: 'Maria Santos',
      role: 'Operations Director',
      content:
        'Agentic workflows saved hundreds of hours.'
    }
  ];

  return (
    <div className="bg-[#18100F] text-white">
      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Unlock Your Potential With <br />
            <span className="text-[#00B5F1]">AI & Data Fluency</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We build intelligence, enable people, and automate insight.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
        <p className="max-w-3xl mx-auto text-gray-300">
          Ubuntu is a data and AI capability partner helping teams think better
          and decide faster.
        </p>
      </section>

      {/* OUR SERVICES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="border border-white/10 rounded-2xl p-8">
                <Icon className="w-8 h-8 text-[#00B5F1] mb-4" />
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400">{s.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* APPROACH (SAFE RENDER) */}
      <section className="py-20">
        {Approach ? <Approach /> : null}
      </section>

      {/* COURSES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6">
          {enhancedCourses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="border border-white/10 rounded-2xl p-6"
              >
                <Icon className="w-6 h-6 text-[#00B5F1] mb-4" />
                <h3 className="font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {course.description}
                </p>
                <div className="space-y-2">
                  {course.includes.map((item, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#00B5F1]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-white/10 p-6 rounded-2xl">
              <Quote className="w-6 h-6 text-[#00B5F1] mb-4" />
              <p className="text-gray-300 mb-4">{t.content}</p>
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
        <div className="flex justify-center gap-12 text-gray-300">
          <Phone />
          <Mail />
          <MapPin />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
