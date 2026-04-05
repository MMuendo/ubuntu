import React, { useState, useEffect } from 'react';
import {
    Calendar, CheckCircle, Terminal, BrainCircuit, Zap, X,
    Phone, ArrowRight, Mail, Database, GitBranch, ShieldCheck, TrendingUp,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// ── Live Demo (replaces EmailAutomationDemo) ───────────────────────
const DEMO_STEPS = [
    { icon: Mail,         label: 'Email Received',            detail: '"Invoice #4421 from Safaricom" landed in inbox' },
    { icon: BrainCircuit, label: 'Agent Reads & Classifies',  detail: 'Detected: Invoice · Vendor: Safaricom · Amount: KES 84,000' },
    { icon: Database,     label: 'Cross-checks ERP',          detail: 'PO-2024-081 found · Budget: IT Infra · Status: Approved' },
    { icon: GitBranch,    label: 'Routes for Approval',       detail: 'CFO approval required for amounts > KES 50,000' },
    { icon: ShieldCheck,  label: 'Payment Triggered',         detail: 'M-Pesa B2B initiated · Reference: TX-99214 · Done ✓' },
];

const LiveDemo: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (activeStep >= DEMO_STEPS.length) return;
        const t = setTimeout(() => setActiveStep(s => s + 1), 1800);
        return () => clearTimeout(t);
    }, [activeStep]);

    return (
        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent pointer-events-none" />

            {/* Terminal chrome */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-gray-600 text-xs font-mono">ubuntu_agent · invoice_workflow.n8n</span>
                {activeStep >= DEMO_STEPS.length && (
                    <button
                        onClick={() => setActiveStep(0)}
                        className="ml-auto text-brand-blue text-xs font-mono hover:text-white transition-colors"
                    >
                        ↺ replay
                    </button>
                )}
            </div>

            <div className="space-y-3 relative z-10">
                {DEMO_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    const visible = idx < activeStep;
                    const current = idx === activeStep - 1;
                    return (
                        <div
                            key={idx}
                            className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-500 ${
                                visible
                                    ? current
                                        ? 'border-brand-blue/60 bg-brand-blue/8 shadow-[0_0_20px_rgba(59,130,246,0.06)]'
                                        : 'border-white/5 bg-white/2 opacity-65'
                                    : 'border-white/5 opacity-20'
                            }`}
                        >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                visible ? 'bg-brand-blue/20 text-brand-blue' : 'bg-white/5 text-gray-700'
                            }`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className={`text-sm font-semibold ${visible ? 'text-white' : 'text-gray-600'}`}>
                                        {step.label}
                                    </span>
                                    {visible && !current && <span className="text-green-400 text-xs">✓</span>}
                                    {current && (
                                        <span className="flex items-center gap-1 text-brand-blue text-xs">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                                            processing
                                        </span>
                                    )}
                                </div>
                                <p className={`text-xs font-mono truncate ${visible ? 'text-gray-500' : 'text-gray-700'}`}>
                                    {visible ? `> ${step.detail}` : '> ...'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {activeStep >= DEMO_STEPS.length && (
                <div className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-green-500/8 border border-green-500/25">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                        <p className="text-green-400 text-sm font-semibold">Complete in 4.2 seconds</p>
                        <p className="text-gray-500 text-xs">Invoice processed · CFO notified · Payment queued · Zero human touches</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// ── Static data ────────────────────────────────────────────────────
const STATS = [
    { value: '94%',  label: 'Tasks Automated'       },
    { value: '< 5s', label: 'Avg. Response Time'    },
    { value: '24/7', label: 'Uptime Guarantee'       },
    { value: '0',    label: 'Human Touches Needed'   },
];

const USE_CASES = [
    { icon: Mail,         tag: 'Finance',    title: 'Invoice Processing',     desc: 'Reads supplier emails, validates against ERP, routes for approval, triggers M-Pesa B2B — end to end.' },
    { icon: BrainCircuit, tag: 'Sales',      title: 'Lead Qualification',     desc: 'Scores inbound leads via BANT framework, drafts personalised follow-ups, logs to CRM automatically.' },
    { icon: ShieldCheck,  tag: 'Support',    title: 'Support Triage',         desc: 'Classifies tickets, resolves Tier-1 queries instantly, escalates complex issues with full context.' },
    { icon: TrendingUp,   tag: 'Operations', title: 'Report Automation',      desc: 'Pulls data from multiple sources, generates a formatted brief, delivers to Slack or email every morning.' },
];

// ── Component ──────────────────────────────────────────────────────
const AgenticPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState<'input' | 'processing' | 'calling' | 'completed'>('input');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', useCase: '' });
    const [analysisLog, setAnalysisLog] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const startConsultation = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');
        setAnalysisLog([
            '> Initializing secure handshake...',
            '> Encrypting payload...',
            '> Uploading use case to analysis core...',
        ]);

        try {
            await new Promise(r => setTimeout(r, 1400));
            setAnalysisLog(prev => [
                ...prev,
                `> Entity identified: ${formData.company}`,
                '> Estimating workflow complexity...',
            ]);

            const lines = [
                `Challenge mapped: ${formData.useCase.slice(0, 55)}...`,
                'Agent architecture: Task-Orchestration + Memory Layer',
                'Estimated automation coverage: 74–88% of workflow',
                'Projected time saved: 14–20 hrs/week',
                'Integration touchpoints: CRM, Email, Database, API',
                'Confidence score: 91% — High feasibility ✓',
            ];

            for (const line of lines) {
                await new Promise(r => setTimeout(r, 680));
                setAnalysisLog(prev => [...prev, `> ${line}`]);
            }

            // Save lead — non-blocking
            supabase.from('leads').insert([{
                email: formData.email,
                source: 'agentic_page',
                metadata: {
                    name: formData.name,
                    phone: formData.phone,
                    company: formData.company,
                    use_case: formData.useCase,
                },
            }]).then(({ error }) => { if (error) console.error('Lead save:', error); });

            await new Promise(r => setTimeout(r, 900));
            setStep('calling');
            setTimeout(() => setStep('completed'), 4000);

        } catch (err) {
            console.error(err);
            setAnalysisLog(prev => [...prev, '> Neural link error. Routing to manual fallback.']);
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
        <div className="pt-20 pb-32 bg-[#18100F]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Hero ──────────────────────────────────────── */}
                <div className="text-center mb-16 relative">
                    <div className="absolute inset-0 -z-10 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-blue/8 blur-[120px] rounded-full" />
                    </div>

                    <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-brand-blue/15 text-brand-blue text-xs font-bold tracking-widest uppercase mb-6 border border-brand-blue/20">
                        <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                        B2B Enterprise Solutions
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        From Data to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-cyan-400">
                            Autonomous Action
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        We architect proactive, task-oriented AI agents that connect to your systems and
                        execute real business workflows — not just chatbots.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group px-8 py-4 bg-brand-blue text-white rounded-full font-bold text-base hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] flex items-center gap-2 justify-center"
                        >
                            <Zap className="w-5 h-5" />
                            Deploy AI Consultant
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => window.open('https://calendly.com', '_blank')}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-base hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 justify-center"
                        >
                            <Calendar className="w-5 h-5" />
                            Book a Strategy Call
                        </button>
                    </div>
                    <p className="text-gray-600 text-xs mt-5 uppercase tracking-widest">
                        ⚡ Warning: High Efficiency Gains Detected
                    </p>
                </div>

                {/* ── Stats Bar ─────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                    {STATS.map(({ value, label }) => (
                        <div key={label} className="bg-brand-surface border border-white/8 rounded-2xl p-5 text-center group hover:border-brand-blue/30 transition-colors">
                            <div className="text-3xl font-bold text-brand-blue mb-1 group-hover:scale-105 transition-transform">
                                {value}
                            </div>
                            <div className="text-gray-500 text-sm">{label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Why Agentic AI ────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-4">Why Agentic AI?</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Traditional automation breaks when conditions change. Agents reason, adapt, and
                                recover — handling the full complexity of real business workflows.
                            </p>
                        </div>

                        {[
                            {
                                Icon: Terminal,
                                title: 'Beyond Chatbots',
                                body: "Our agents don't just respond — they use tools. They connect to your APIs, databases, and CRMs to perform real actions: processing invoices, onboarding employees, qualifying leads.",
                            },
                            {
                                Icon: BrainCircuit,
                                title: '24/7 Autonomous Ops',
                                body: 'Reduce operational overhead by 60–80%. Agents handle Tier-1 tasks around the clock while your human team focuses on strategy and exceptions.',
                            },
                        ].map(({ Icon, title, body }) => (
                            <div key={title} className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-xl bg-brand-surface group-hover:bg-brand-blue/20 transition-colors flex items-center justify-center flex-shrink-0 text-brand-blue border border-white/8 group-hover:border-brand-blue/50">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Workflow Visualization */}
                    <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-blue/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-3">
                            <div className="bg-brand-dark p-4 rounded-xl border border-white/8 flex justify-between items-center">
                                <span className="text-gray-300 font-mono text-sm">Input: "Refund order #KE-4421"</span>
                                <span className="text-green-400 text-xs animate-pulse">Received</span>
                            </div>
                            <div className="flex justify-center">
                                <div className="h-5 w-px bg-white/10" />
                            </div>
                            <div className="bg-brand-dark p-4 rounded-xl border border-brand-blue/50 shadow-[0_0_20px_rgba(59,130,246,0.08)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" />
                                    <span className="text-brand-blue font-bold text-xs tracking-wide">AI AGENT · REASONING</span>
                                </div>
                                <p className="text-gray-400 text-xs font-mono">{`> Fetching order from Supabase...`}</p>
                                <p className="text-gray-400 text-xs font-mono">{`> Eligibility check: PASS (< 7 days)`}</p>
                                <p className="text-gray-400 text-xs font-mono">{`> Initiating Stripe refund API...`}</p>
                            </div>
                            <div className="flex justify-center">
                                <div className="h-5 w-px bg-white/10" />
                            </div>
                            <div className="bg-brand-dark p-4 rounded-xl border border-white/8 flex justify-between items-center">
                                <span className="text-gray-300 font-mono text-sm">Action: KES 3,200 refund processed</span>
                                <span className="text-brand-blue text-xs font-medium">✓ Done</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Use Cases ─────────────────────────────────── */}
                <div className="mb-28">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Real Use Cases</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            What our agents are executing right now for Kenyan and East African businesses.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {USE_CASES.map(({ icon: Icon, tag, title, desc }) => (
                            <div key={title} className="bg-brand-surface border border-white/8 rounded-2xl p-6 hover:border-brand-blue/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all duration-300 group">
                                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-5 group-hover:bg-brand-blue/20 transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold text-brand-blue/60 tracking-widest uppercase mb-3 block">{tag}</span>
                                <h3 className="text-base font-bold text-white mb-3">{title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── See It In Action ──────────────────────────── */}
                <div className="mb-24">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-white mb-4">See It In Action</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Live simulation of our invoice processing agent —
                            from raw email to confirmed payment in under 5 seconds.
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <LiveDemo />
                    </div>
                </div>

                {/* ── Agentic Projects Built ────────────────────────── */}
                <div className="mb-28 mt-24">
                    <div className="text-center mb-12">
                        <span className="text-brand-blue text-xs font-bold tracking-wider uppercase bg-brand-blue/10 px-4 py-2 rounded-full border border-brand-blue/20">Portfolio</span>
                        <h2 className="text-4xl font-bold text-white mt-4 mb-4">Agentic Projects Built</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            A showcase of intelligent agents we've architected for active businesses and educational platforms.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: 'Ubuntu Widget',
                                desc: 'An intelligent platform widget built purely from scratch using Python. Demonstrates full-stack AI logic with a bespoke neural architecture for seamless interaction.',
                                link: '#',
                                tag: 'Python & AI'
                            },
                            {
                                title: 'Craft Catalyst Eligibility Widget',
                                desc: 'An AI agent integrated via n8n that instantly analyzes student credentials to determine their eligibility for studying in Malaysia.',
                                link: 'https://crafted.thecraftcatalyst.com',
                                tag: 'n8n Workflow'
                            },
                            {
                                title: 'Zoho CRM Agent (Agriculture)',
                                desc: 'A deeply integrated agentic workflow in Zoho CRM using n8n, designed specifically for an agricultural company to automate lead tracking and operations.',
                                link: null,
                                tag: 'Zoho CRM & n8n'
                            },
                            {
                                title: 'Property Management Agent',
                                desc: 'A specialized AI agent that orchestrates property management workflows—automating inquiries, maintenance requests, and contract renewals.',
                                link: null,
                                tag: 'PropTech AI'
                            }
                        ].map((project, idx) => (
                            <div key={idx} className="bg-brand-surface border border-white/8 rounded-2xl p-7 hover:border-brand-blue/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all duration-300 group flex flex-col">
                                <span className="text-[10px] font-bold text-brand-blue/60 tracking-widest uppercase mb-3 block">{project.tag}</span>
                                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{project.desc}</p>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm hover:underline mt-auto">
                                        View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CTA Banner ────────────────────────────────── */}
                <div className="relative rounded-3xl overflow-hidden border border-brand-blue/25 bg-gradient-to-br from-brand-blue/10 via-transparent to-cyan-500/5 p-10 md:p-14 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to automate your operations?
                        </h2>
                        <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                            Talk to our AI in the next 30 seconds. It analyses your workflow
                            and generates a strategy brief while you wait.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group inline-flex items-center gap-3 px-10 py-4 bg-brand-blue text-white rounded-full font-bold text-base hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(59,130,246,0.35)]"
                        >
                            <Zap className="w-5 h-5" />
                            Deploy AI Consultant
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

            </div>

            {/* ── Consultation Modal ─────────────────────────────── */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0D0D0D] border border-brand-blue/40 w-full max-w-lg rounded-2xl shadow-[0_0_60px_rgba(59,130,246,0.2)] overflow-hidden flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/2">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-brand-blue rounded-full animate-pulse" />
                                <span className="text-brand-blue font-mono text-xs font-bold tracking-[0.15em]">
                                    AGENT_UPLINK · v3.1
                                </span>
                            </div>
                            <button
                                onClick={resetModal}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/8 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 flex-1">

                            {step === 'input' && (
                                <form onSubmit={startConsultation} className="space-y-4">
                                    <div className="mb-2">
                                        <p className="text-white text-sm font-semibold mb-1">Mission Parameters</p>
                                        <p className="text-gray-600 text-xs leading-relaxed">
                                            Our AI analyses your workflow in real time and generates a strategy brief before connecting you with a consultant.
                                        </p>
                                    </div>

                                    {[
                                        { name: 'name',    label: 'FULL NAME', type: 'text',  placeholder: 'John Kariuki'         },
                                        { name: 'email',   label: 'EMAIL',     type: 'email', placeholder: 'john@company.co.ke'   },
                                        { name: 'phone',   label: 'PHONE',     type: 'tel',   placeholder: '+254 7...'            },
                                        { name: 'company', label: 'COMPANY',   type: 'text',  placeholder: 'Acme Corp Ltd'        },
                                    ].map(({ name, label, type, placeholder }) => (
                                        <div key={name}>
                                            <label className="block text-brand-blue/70 text-[10px] font-mono font-bold tracking-widest mb-1.5">
                                                {label}
                                            </label>
                                            <input
                                                required
                                                name={name}
                                                type={type}
                                                value={(formData as any)[name]}
                                                onChange={handleInputChange}
                                                placeholder={placeholder}
                                                className="w-full bg-white/5 border border-white/10 text-white text-sm p-3 rounded-xl focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue/40 placeholder:text-gray-700 transition-colors"
                                            />
                                        </div>
                                    ))}

                                    <div>
                                        <label className="block text-brand-blue/70 text-[10px] font-mono font-bold tracking-widest mb-1.5">
                                            WORKFLOW / USE CASE
                                        </label>
                                        <textarea
                                            required
                                            name="useCase"
                                            value={formData.useCase}
                                            onChange={handleInputChange}
                                            placeholder="e.g., We receive 200+ supplier invoices by email monthly and process them manually in QuickBooks..."
                                            className="w-full bg-white/5 border border-white/10 text-white text-sm p-3 rounded-xl focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue/40 placeholder:text-gray-700 transition-colors h-24 resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="group w-full bg-brand-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Zap className="w-4 h-4" />
                                        Initialize Agent
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </form>
                            )}

                            {step === 'processing' && (
                                <div>
                                    <p className="text-brand-blue text-[10px] font-mono font-bold tracking-widest mb-4">
                                        ANALYSING WORKFLOW...
                                    </p>
                                    <div className="bg-black rounded-xl p-4 h-64 overflow-y-auto space-y-1.5 font-mono text-xs">
                                        {analysisLog.map((log, i) => (
                                            <div key={i} className="text-green-400 leading-relaxed">{log}</div>
                                        ))}
                                        <span className="inline-block w-2 h-3.5 bg-green-400 animate-pulse ml-0.5 align-middle" />
                                    </div>
                                </div>
                            )}

                            {step === 'calling' && (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 rounded-full border-2 border-brand-blue flex items-center justify-center bg-brand-blue/10 relative z-10">
                                            <Phone className="w-9 h-9 text-brand-blue animate-pulse" />
                                        </div>
                                        <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-brand-blue/50 animate-ping" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">Initiating Voice Link</h3>
                                    <p className="text-brand-blue font-mono text-sm">{formData.phone}</p>
                                    <p className="text-gray-600 text-xs mt-4">Connecting to Neural Voice Gateway...</p>
                                </div>
                            )}

                            {step === 'completed' && (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="w-16 h-16 bg-green-500/12 rounded-full flex items-center justify-center mb-5 ring-1 ring-green-500/25">
                                        <CheckCircle className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Brief Compiled</h3>
                                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-8">
                                        Your AI strategy brief is ready. A senior consultant will reach you at{' '}
                                        <span className="text-white font-medium">{formData.phone}</span> within 2 hours.
                                    </p>
                                    <button
                                        onClick={resetModal}
                                        className="text-sm text-gray-600 hover:text-white font-mono transition-colors"
                                    >
                                        close console ×
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-30" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgenticPage;
