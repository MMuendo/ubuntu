import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
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

import Approach from '../components/Approach';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCourses } from '../hooks/useCourses';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { loading: coursesLoading } = useCourses();

  const enhancedCourses = [
    {
      id: 'excel-workshop',
      title: 'Data Thinking with Excel',
      level: 'Foundation',
      description:
        'Learn how to structure problems, think analytically, and make better decisions using data',
      price: 20000,
      icon: FileSpreadsheet,
      includes: [
        'Advanced Excel formulas and logic',
        'Power Query and Power Pivot foundations',
        'Business problem structuring frameworks',
        'Decision-ready Excel models'
      ]
    },
    {
      id: 'powerbi-workshop',
      title: 'Decision Systems with Power BI',
      level: 'Core',
      description:
        'Turn data into decision-ready dashboards and decision systems leaders trust.',
      price: 25000,
      icon: BarChart3,
      includes: [
        'Power Query data transformation',
        'Star-schema data modelling',
        'DAX measures and time intelligence',
        'Executive-ready dashboards'
      ]
    },
    {
      id: 'ai-mastery',
      title: 'AI Fluency for Business Leaders',
      level: 'AI Mastery',
      description:
        'Understand how to use AI confidently and responsibly for real work.',
      price: 7500,
      icon: Brain,
      includes: [
        'How modern AI systems think',
        'Prompt engineering',
        'AI tools and workflows',
        'Responsible AI usage'
      ]
    },
    {
      id: 'ai-agents',
      title: 'Agentic Systems for Automation',
      level: 'Advanced',
      description:
        'Design AI systems that support decisions, execution, and scale.',
      price: 12500,
      icon: Zap,
      includes: [
        'Agent design fundamentals',
        'Memory, tools, and orchestration',
        'Deploying agents in business'
      ]
    }
  ];

  const services = [
    {
      id: 'analytics',
      title: 'Business Analytics',
      description:
        'Analytics consulting and capability building to turn data into decisions.',
      icon: BarChart3
    },
    {
      id: 'ai-fluency',
      title: 'AI & Data Fluency',
      description:
        'Practical AI training for leaders, teams, and organisations.',
      icon: Brain
    },
    {
      id: 'agentic',
      title: 'Agentic Workflows',
      description:
        'Design and deployment of AI agents for operations, HR, and support.',
      icon: Bot
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Head of Analytics',
      content:
        'Ubuntu transformed our team from Excel users to decision thinkers.',
    },
    {
      name: 'James Omondi',
      role: 'CEO',
      content:
        'The AI fluency program helped us lead AI conversations confidently.',
    },
    {
      name: 'Maria Santos',
      role: 'Operations Director',
      content:
        'Agentic workflows saved us hundreds of hours every month.',
    }
  ];

  const handleEnroll = (course: any) => {
    navigate(
      `/enroll?courseId=${course.id}&courseName=${encodeURIComponent(
        course.title
      )}&coursePrice=${course.price}`
    );
  };

  return (
    <div className="bg-[#18100F] text-white">
      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Unlock Your Potential With <br />
            <span className="text-[#00B5F1]">AI & Data Fluency</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            We build intelligence, enable people, and automate insight using data and AI.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/assessment')}
              className="px-8 py-4 bg-[#00B5F1] text-black rounded-full font-bold"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <p className="text-gray-300 text-lg">
            Ubuntu is a data and AI capability partner helping professionals and
            organisations think better, decide faster, and execute smarter.
          </p>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="border border-white/10 rounded-2xl p-8"
              >
                <Icon className="w-8 h-8 text-[#00B5F1] mb-4" />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* APPROACH */}
      <Approach />

      {/* COURSES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {coursesLoading ? (
            <LoadingSpinner size="lg" />
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
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

                    <div className="space-y-2 mb-6">
                      {course.includes.map((item: string, i: number) => (
                        <div key={i} className="flex gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#00B5F1]" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleEnroll(course)}
                      className="w-full border border-[#00B5F1] py-2 rounded-lg"
                    >
                      Apply to Join
                    </button>
                  </div>
                );
              })}
            </div>
          )}
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
