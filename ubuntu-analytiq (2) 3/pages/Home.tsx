import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES, COURSES } from '../constants';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleEnroll = (courseId: string, price: number, title: string) => {
    navigate('/checkout', { state: { courseId, price, title } });
  };

  // Mock data for sparkline
  const chartData = [
    { value: 10 }, { value: 15 }, { value: 13 }, { value: 25 }, { value: 30 }, { value: 28 }, { value: 45 }
  ];

  return (
    <div className="min-h-screen bg-brand-darker">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Unlock Your Potential With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary animate-pulse-slow">
              AI & Data Fluency
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            We provide mentorship, training, and consultancy designed to turn raw data into actionable insights. 
            Equip your team with the strategies needed to optimize operations and unlock tangible business value.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/assessment')}
              className="bg-brand-primary hover:bg-brand-accent text-brand-darker font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105"
            >
              Start Your Journey
            </button>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="border border-gray-600 hover:border-brand-primary text-gray-300 hover:text-white font-semibold py-3 px-8 rounded-full transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-brand-primary/50 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-brand-darker rounded-lg flex items-center justify-center mb-6 text-brand-primary border border-brand-primary/20">
                  {service.icon === 'chart' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  )}
                  {service.icon === 'brain' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>
                  )}
                  {service.icon === 'bot' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-brand-darker">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Expert-Led Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((course) => (
              <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col">
                <div className="h-40 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{course.description}</p>
                  <div className="mt-auto">
                    <div className="text-brand-primary font-bold mb-4">KES {course.price.toLocaleString()}</div>
                    <button 
                      onClick={() => handleEnroll(course.id, course.price, course.title)}
                      className="w-full bg-brand-secondary hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach (Animated) */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-16">Our Technical Approach</h2>
          <div className="grid md:grid-cols-3 gap-12">
            
            {/* 1. Data Storytelling (Simple Flow Animation) */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center">
              <div className="h-40 w-full flex items-center justify-center relative mb-4">
                {/* Simulated Data Flow Nodes */}
                <div className="flex space-x-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-500 flex items-center justify-center">1</div>
                  <div className="h-1 w-12 bg-gray-700 overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full w-4 bg-brand-primary animate-[slide_1s_infinite]"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-secondary/20 border border-brand-secondary flex items-center justify-center text-brand-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </svg>
                  </div>
                  <div className="h-1 w-12 bg-gray-700 overflow-hidden relative">
                     <div className="absolute top-0 left-0 h-full w-4 bg-brand-primary animate-[slide_1s_infinite_0.5s]"></div>
                  </div>
                   <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                {/* CSS for custom slide animation needed in head or style tag, mocking here */}
                <style>{`
                  @keyframes slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                  }
                `}</style>
              </div>
              <h3 className="text-xl font-bold text-white">Data Storytelling</h3>
              <p className="text-gray-400 text-sm mt-2">Visualizing complex data flows into clear insights.</p>
            </div>

            {/* 2. Knowledge Sharing (Chart) */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center">
              <div className="h-40 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                    <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} animationDuration={2000} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <h3 className="text-xl font-bold text-white">Knowledge Sharing</h3>
              <p className="text-gray-400 text-sm mt-2">Measurable growth and skill acquisition.</p>
            </div>

            {/* 3. Automations (Spinning/Working Gear) */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center">
              <div className="h-40 w-full flex items-center justify-center mb-4 relative">
                <svg className="w-16 h-16 text-brand-primary animate-[spin_4s_linear_infinite]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-white bg-black px-1">AI</div>
              </div>
              <h3 className="text-xl font-bold text-white">Automations</h3>
              <p className="text-gray-400 text-sm mt-2">Efficient, self-driving workflows.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-brand-darker">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>contact@ubuntu-analytiq.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;