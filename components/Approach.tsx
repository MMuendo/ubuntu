import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Database, Share2, Cog } from 'lucide-react';

const sparkData = [
  { val: 10 }, { val: 25 }, { val: 20 }, { val: 40 }, { val: 35 }, { val: 55 }, { val: 50 }, { val: 80 }
];

const Approach: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Approach</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Blending technical rigor with strategic foresight to deliver measurable impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Data Storytelling */}
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative group overflow-hidden hover:border-brand-cyan/30 transition-all duration-300">
             <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl group-hover:bg-brand-cyan/20 transition-all"></div>
             <div className="h-40 flex items-center justify-center mb-6 relative">
                 <div className="relative w-24 h-24">
                     <div className="absolute inset-0 border-2 border-brand-cyan/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                     <div className="absolute inset-2 border-2 border-brand-purple/30 rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Database className="text-brand-cyan w-10 h-10 animate-pulse" />
                     </div>
                     {/* Flow particles */}
                     <div className="absolute top-0 left-1/2 w-2 h-2 bg-brand-cyan rounded-full animate-bounce"></div>
                 </div>
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Decision-Driven Analytics</h3>
             <p className="text-sm text-gray-400">Transforming complex data into business narratives that drive confident decisions.</p>
          </div>

          {/* Card 2: Knowledge Sharing (Sparkline) */}
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative group overflow-hidden hover:border-brand-purple/30 transition-all duration-300">
             <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl group-hover:bg-brand-purple/20 transition-all"></div>
             <div className="h-40 mb-6 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparkData}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Line 
                            type="monotone" 
                            dataKey="val" 
                            stroke="#8B5CF6" 
                            strokeWidth={3} 
                            dot={{ fill: '#8B5CF6', r: 4 }} 
                            activeDot={{ r: 6 }} 
                            animationDuration={2000}
                        />
                    </LineChart>
                </ResponsiveContainer>
             </div>
             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                 Skills & Capability Development <Share2 className="w-4 h-4 text-brand-purple" />
             </h3>
             <p className="text-sm text-gray-400">Empowering teams through structured mentorship and practical learning, enabling sustainable capability growth and long-term self-sufficiency.</p>
          </div>

          {/* Card 3: Automations */}
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative group overflow-hidden hover:border-brand-blue/30 transition-all duration-300">
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
             <p className="text-sm text-gray-400">Designing intelligent automation across analytics workflows — from data pipelines and reporting to AI-driven agents that optimize decisions and operations.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Approach;
