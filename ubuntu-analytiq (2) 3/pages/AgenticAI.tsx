import React, { useState, useEffect } from 'react';
import { analyzeBusinessCase } from '../services/geminiService';

const AgenticAI: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<'input' | 'processing' | 'calling' | 'completed'>('input');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    useCase: ''
  });

  // Analysis Log State
  const [analysisLog, setAnalysisLog] = useState<string[]>([]);
  const [fullAnalysis, setFullAnalysis] = useState('');

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
      
      setAnalysisLog(prev => [...prev, `> Analying entity: ${formData.company}`, '> Estimating token complexity...']);
      
      // Call Gemini
      const result = await analyzeBusinessCase(formData.company, formData.useCase);
      setFullAnalysis(result);
      
      // Simulate typing effect for the result lines
      const lines = result.split('\n').filter(line => line.trim() !== '');
      for (let i = 0; i < lines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnalysisLog(prev => [...prev, `> ${lines[i]}`]);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('calling');
      
      // Simulate call duration or connection
      setTimeout(() => {
        setStep('completed');
      }, 5000);

    } catch (error) {
      console.error(error);
      setAnalysisLog(prev => [...prev, '> Error in neural link. Fallback to manual.']);
      setStep('completed'); // Fail gracefully to completion screen
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setStep('input');
    setAnalysisLog([]);
    setFormData({ name: '', phone: '', company: '', useCase: '' });
  };

  return (
    <div className="min-h-screen bg-brand-darker">
      <div className="container mx-auto px-4 pt-20 pb-16">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block border border-brand-primary/30 rounded-full px-4 py-1 text-brand-primary text-sm font-semibold mb-6 animate-pulse">
            B2B Enterprise Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            From Data to <span className="text-brand-primary">Autonomous Action</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Automate your workforce with Intelligent AI Agents. We don't just build chatbots; we architect proactive, task-oriented agents that execute complex workflows.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-secondary hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105"
          >
            Deploy AI Consultant
          </button>
          <p className="text-gray-500 text-xs mt-4 uppercase tracking-widest">
            Warning: High Efficiency Gains Detected
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Why Agentic AI?</h2>
            <div className="flex gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-gray-800 group-hover:bg-brand-primary/20 transition-colors flex items-center justify-center flex-shrink-0 text-brand-primary border border-gray-700 group-hover:border-brand-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Beyond Chatbots</h3>
                <p className="text-gray-400">Our agents don't just talk; they use tools. They connect to your API, database, and CRM to perform actions like onboarding employees or processing invoices.</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-gray-800 group-hover:bg-brand-primary/20 transition-colors flex items-center justify-center flex-shrink-0 text-brand-primary border border-gray-700 group-hover:border-brand-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">24/7 Autonomous Ops</h3>
                <p className="text-gray-400">Reduce operational overhead. Let agents handle Tier-1 support triage and data entry while your human team focuses on strategy.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
            {/* Visual representation of a workflow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/5 blur-3xl rounded-full group-hover:bg-brand-primary/10 transition-all duration-500"></div>
            <div className="relative z-10 space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Input: "Refund order #123"</span>
                    <span className="text-green-500 text-xs animate-pulse">Received</span>
                </div>
                <div className="flex justify-center"><div className="h-6 w-0.5 bg-gray-700"></div></div>
                <div className="bg-gray-800 p-4 rounded-lg border border-brand-primary/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce"></div>
                        <span className="text-brand-primary font-bold text-sm">AI Agent Logic</span>
                    </div>
                    <div className="text-gray-400 text-xs font-mono">
                        {`> Checking CRM for Order #123`} <br/>
                        {`> Verifying eligibility... OK`} <br/>
                        {`> Triggering Stripe API Refund`}
                    </div>
                </div>
                <div className="flex justify-center"><div className="h-6 w-0.5 bg-gray-700"></div></div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Action: Refund Processed</span>
                    <span className="text-brand-secondary text-xs">Done</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* AGENTIC INTERACTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-gray-950 border border-brand-primary w-full max-w-lg rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col relative animate-float-in">
            
            {/* Header */}
            <div className="bg-gray-900 p-4 border-b border-brand-primary/30 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-brand-primary rounded-full animate-pulse"></div>
                <span className="text-brand-primary font-mono text-sm font-bold tracking-widest">AGENT_UPLINK_V3.1</span>
              </div>
              <button onClick={resetModal} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6">
              
              {step === 'input' && (
                <form onSubmit={startConsultation} className="space-y-4 animate-fade-in">
                  <p className="text-gray-400 text-sm mb-4">
                    Enter your mission parameters. Our AI will analyze your workflow and initiate a secure voice link immediately.
                  </p>
                  <div>
                    <label className="block text-brand-primary text-xs font-mono mb-1">IDENTIFIER (NAME)</label>
                    <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-brand-primary text-xs font-mono mb-1">COMMS_LINK (PHONE)</label>
                    <input required name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary" placeholder="+254 7..." />
                  </div>
                  <div>
                    <label className="block text-brand-primary text-xs font-mono mb-1">ENTITY (COMPANY)</label>
                    <input required name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary" placeholder="Acme Corp" />
                  </div>
                  <div>
                    <label className="block text-brand-primary text-xs font-mono mb-1">OBJECTIVE (USE CASE)</label>
                    <textarea required name="useCase" value={formData.useCase} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary h-24" placeholder="e.g., Automate invoice processing from email to Quickbooks..." />
                  </div>
                  <button type="submit" className="w-full bg-brand-primary text-black font-bold py-3 rounded hover:bg-brand-accent transition-colors flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>INITIALIZE AGENT</span>
                  </button>
                </form>
              )}

              {step === 'processing' && (
                <div className="font-mono text-sm space-y-2 h-64 overflow-y-auto custom-scrollbar">
                  {analysisLog.map((log, i) => (
                    <div key={i} className="text-green-500">{log}</div>
                  ))}
                  <div className="w-2 h-4 bg-green-500 animate-pulse inline-block ml-1"></div>
                </div>
              )}

              {step === 'calling' && (
                <div className="flex flex-col items-center justify-center h-64 animate-fade-in text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full border-2 border-brand-primary flex items-center justify-center relative z-10 bg-gray-900">
                      <svg className="w-10 h-10 text-brand-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-2 border-brand-primary animate-ping opacity-75"></div>
                    <div className="absolute top-0 left-0 w-24 h-24 rounded-full border border-brand-secondary animate-ping delay-150 opacity-50"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">INITIATING VOICE LINK</h3>
                  <p className="text-brand-primary font-mono">{formData.phone}</p>
                  <p className="text-gray-500 text-xs mt-4">Connecting to Neural Voice Gateway...</p>
                </div>
              )}

              {step === 'completed' && (
                <div className="text-center h-64 flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Request Queued</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Our AI Agents are currently handling high traffic. Your strategy brief has been compiled and a senior consultant (Human or AI) will contact you shortly at <span className="text-white">{formData.phone}</span>.
                  </p>
                  <button onClick={resetModal} className="text-brand-primary hover:text-white text-sm font-bold">
                    CLOSE CONSOLE
                  </button>
                </div>
              )}

            </div>
            
            {/* Footer decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50"></div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AgenticAI;
