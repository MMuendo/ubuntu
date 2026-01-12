import React, { useState } from 'react';
import EmailAutomationDemo from '../components/EmailAutomationDemo';
import { analyzeBusinessCase } from '../services/aiService';
import { Calendar, CheckCircle, Terminal, BrainCircuit, Zap, X, Phone, Loader2 } from 'lucide-react';
import { createLead } from '../services/adminService';

const AgenticPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState<'input' | 'processing' | 'calling' | 'completed'>('input');

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        useCase: ''
    });

    // Analysis Log State
    const [analysisLog, setAnalysisLog] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const startConsultation = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');
        setAnalysisLog(['> Initializing secure handshake...', '> Encrypting payload...', '> Uploading use case to Core...']);

        try {
            // Simulate initial delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            setAnalysisLog(prev => [...prev, `> Analyzing entity: ${formData.company}`, '> Estimating token complexity...']);

            // Call Gemini
            const result = await analyzeBusinessCase(formData.company, formData.useCase);

            // Save Lead to Supabase
            await createLead({
                email: formData.email,
                source: 'chat', // Using 'chat' as it maps best to agent interaction
                metadata: {
                    name: formData.name,
                    phone: formData.phone,
                    company: formData.company,
                    use_case: formData.useCase,
                    gemini_analysis: result
                }
            });

            // Simulate typing effect for the result lines
            const lines = result.split('\n').filter(line => line.trim() !== '');
            for (let i = 0; i < lines.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 600));
                setAnalysisLog(prev => [...prev, `> ${lines[i]}`]);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            setStep('calling');

            // Simulate call connection
            setTimeout(() => {
                setStep('completed');
            }, 4000);

        } catch (error) {
            console.error(error);
            setAnalysisLog(prev => [...prev, '> Error in neural link. Fallback to manual.']);
            setStep('completed');
        }
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setStep('input');
        setAnalysisLog([]);
        setFormData({ name: '', email: '', phone: '', company: '', useCase: '' });
    };

    return (
        <div className="pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
                        B2B Enterprise Solutions
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        From Data to <br />
                        <span className="text-brand-blue">Autonomous Action</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        Automate your workforce with Intelligent AI Agents. We don't just build chatbots;
                        we architect proactive, task-oriented agents that execute complex workflows.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2 justify-center"
                        >
                            <Zap className="w-5 h-5" /> Deploy AI Consultant
                        </button>
                        <button
                            onClick={() => window.open('https://calendly.com', '_blank')}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
                        >
                            <Calendar className="w-5 h-5" /> Book a Call
                        </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-4 uppercase tracking-widest">
                        Warning: High Efficiency Gains Detected
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white">Why Agentic AI?</h2>
                        <div className="flex gap-4 group">
                            <div className="w-12 h-12 rounded-lg bg-brand-surface group-hover:bg-brand-blue/20 transition-colors flex items-center justify-center flex-shrink-0 text-brand-blue border border-white/10 group-hover:border-brand-blue">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Beyond Chatbots</h3>
                                <p className="text-gray-400">Our agents don't just talk; they use tools. They connect to your API, database, and CRM to perform actions like onboarding employees or processing invoices.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 group">
                            <div className="w-12 h-12 rounded-lg bg-brand-surface group-hover:bg-brand-blue/20 transition-colors flex items-center justify-center flex-shrink-0 text-brand-blue border border-white/10 group-hover:border-brand-blue">
                                <BrainCircuit className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">24/7 Autonomous Ops</h3>
                                <p className="text-gray-400">Reduce operational overhead. Let agents handle Tier-1 support triage and data entry while your human team focuses on strategy.</p>
                            </div>
                        </div>
                    </div>

                    {/* Workflow Visualization */}
                    <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-blue/50 transition-colors">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-blue/5 blur-3xl rounded-full group-hover:bg-brand-blue/10 transition-all duration-500"></div>
                        <div className="relative z-10 space-y-4">
                            <div className="bg-brand-dark p-4 rounded-lg border border-white/10 flex justify-between items-center">
                                <span className="text-gray-300 font-mono text-sm">Input: "Refund order #123"</span>
                                <span className="text-green-500 text-xs animate-pulse">Received</span>
                            </div>
                            <div className="flex justify-center"><div className="h-6 w-0.5 bg-white/10"></div></div>
                            <div className="bg-brand-dark p-4 rounded-lg border border-brand-blue/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce"></div>
                                    <span className="text-brand-blue font-bold text-sm">AI Agent Logic</span>
                                </div>
                                <div className="text-gray-400 text-xs font-mono">
                                    {`> Checking CRM for Order #123`}<br />
                                    {`> Verifying eligibility... OK`}<br />
                                    {`> Triggering Stripe API Refund`}
                                </div>
                            </div>
                            <div className="flex justify-center"><div className="h-6 w-0.5 bg-white/10"></div></div>
                            <div className="bg-brand-dark p-4 rounded-lg border border-white/10 flex justify-between items-center">
                                <span className="text-gray-300 font-mono text-sm">Action: Refund Processed</span>
                                <span className="text-brand-blue text-xs">Done</span>
                            </div>
                        </div>
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

            {/* AI CONSULTATION MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="bg-brand-dark border border-brand-blue w-full max-w-lg rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col relative animate-fade-in">

                        {/* Header */}
                        <div className="bg-brand-surface p-4 border-b border-brand-blue/30 flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-brand-blue rounded-full animate-pulse"></div>
                                <span className="text-brand-blue font-mono text-sm font-bold tracking-widest">AGENT_UPLINK_V3.1</span>
                            </div>
                            <button onClick={resetModal} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">

                            {step === 'input' && (
                                <form onSubmit={startConsultation} className="space-y-4">
                                    <p className="text-gray-400 text-sm mb-4">
                                        Enter your mission parameters. Our AI will analyze your workflow and initiate a secure voice link immediately.
                                    </p>
                                    <div>
                                        <label className="block text-brand-blue text-xs font-mono mb-1">IDENTIFIER (NAME)</label>
                                        <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-brand-surface border border-white/10 text-white p-2 rounded focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-brand-blue text-xs font-mono mb-1">CONTACT_EMAIL</label>
                                        <input required name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full bg-brand-surface border border-white/10 text-white p-2 rounded focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-brand-blue text-xs font-mono mb-1">COMMS_LINK (PHONE)</label>
                                        <input required name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full bg-brand-surface border border-white/10 text-white p-2 rounded focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue" placeholder="+254 7..." />
                                    </div>
                                    <div>
                                        <label className="block text-brand-blue text-xs font-mono mb-1">ENTITY (COMPANY)</label>
                                        <input required name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-brand-surface border border-white/10 text-white p-2 rounded focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue" placeholder="Acme Corp" />
                                    </div>
                                    <div>
                                        <label className="block text-brand-blue text-xs font-mono mb-1">OBJECTIVE (USE CASE)</label>
                                        <textarea required name="useCase" value={formData.useCase} onChange={handleInputChange} className="w-full bg-brand-surface border border-white/10 text-white p-2 rounded focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue h-24" placeholder="e.g., Automate invoice processing from email to Quickbooks..." />
                                    </div>
                                    <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                                        <Zap className="w-5 h-5" />
                                        <span>INITIALIZE AGENT</span>
                                    </button>
                                </form>
                            )}

                            {step === 'processing' && (
                                <div className="font-mono text-sm space-y-2 h-64 overflow-y-auto">
                                    {analysisLog.map((log, i) => (
                                        <div key={i} className="text-green-500">{log}</div>
                                    ))}
                                    <div className="w-2 h-4 bg-green-500 animate-pulse inline-block ml-1"></div>
                                </div>
                            )}

                            {step === 'calling' && (
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 rounded-full border-2 border-brand-blue flex items-center justify-center relative z-10 bg-brand-surface">
                                            <Phone className="w-10 h-10 text-brand-blue animate-pulse" />
                                        </div>
                                        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-2 border-brand-blue animate-ping opacity-75"></div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">INITIATING VOICE LINK</h3>
                                    <p className="text-brand-blue font-mono">{formData.phone}</p>
                                    <p className="text-gray-500 text-xs mt-4">Connecting to Neural Voice Gateway...</p>
                                </div>
                            )}

                            {step === 'completed' && (
                                <div className="text-center h-64 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Request Queued</h3>
                                    <p className="text-gray-400 text-sm mb-6">
                                        Our AI Agents are currently handling high traffic. Your strategy brief has been compiled and a senior consultant will contact you shortly at <span className="text-white">{formData.phone}</span>.
                                    </p>
                                    <button onClick={resetModal} className="text-brand-blue hover:text-white text-sm font-bold transition-colors">
                                        CLOSE CONSOLE
                                    </button>
                                </div>
                            )}

                        </div>

                        {/* Footer decoration */}
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgenticPage;
