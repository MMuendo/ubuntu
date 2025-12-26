import React from 'react';
import EmailAutomationDemo from '../components/EmailAutomationDemo';
import { Calendar, CheckCircle, Terminal, BrainCircuit } from 'lucide-react';

const AgenticPage: React.FC = () => (
    <div className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold tracking-widest uppercase mb-6">
                    Enterprise Solutions
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Automate Your Workforce with <br />
                    <span className="text-brand-blue">Intelligent AI Agents</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                    From Data to Autonomous Action. We build proactive, task-oriented agents that execute workflows, from HR onboarding to complex data processing.
                </p>
                <button
                    onClick={() => window.open('https://calendly.com', '_blank')}
                    className="px-8 py-4 bg-white text-brand-dark rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 mx-auto"
                >
                    <Calendar className="w-5 h-5" /> Book a Strategy Consultation
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                <div className="bg-gradient-to-br from-brand-surface to-brand-dark p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <Terminal className="w-10 h-10 text-brand-blue" />
                        <h3 className="text-2xl font-bold text-white">Not Just Chatbots</h3>
                    </div>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                            <span>Capable of executing multi-step complex logic.</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                            <span>Integration with internal APIs and databases.</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                            <span>Autonomous decision making within guardrails.</span>
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-brand-blue/20 blur-3xl rounded-full"></div>
                    <BrainCircuit className="w-full h-64 text-white relative z-10" />
                </div>
            </div>

            {/* Email Automation Demo Section */}
            <div className="mt-20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">See It In Action</h2>
                    <p className="text-gray-400 mt-2">Watch a live simulation of our email automation agent processing requests.</p>
                </div>
                <EmailAutomationDemo />
            </div>
        </div>
    </div>
);

export default AgenticPage;
