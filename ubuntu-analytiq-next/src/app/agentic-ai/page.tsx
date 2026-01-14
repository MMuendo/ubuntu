import { Metadata } from "next";
import Link from "next/link";
import Header, { Footer } from "@/components/Header";
import { Calendar, Terminal, BrainCircuit, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Agentic AI Consulting Kenya | Enterprise AI Agents",
    description:
        "Deploy autonomous AI agents for your business. Ubuntu AnalytIQ builds intelligent agents that automate workflows, integrate with M-Pesa, CRMs & more. Nairobi-based.",
    alternates: {
        canonical: "https://ubuntuanalytiq.com/agentic-ai",
    },
    openGraph: {
        title: "Agentic AI Consulting Kenya | Enterprise AI Agents",
        description:
            "Deploy autonomous AI agents for your business. Integrate with M-Pesa, CRMs & more.",
        url: "https://ubuntuanalytiq.com/agentic-ai",
    },
};

// BreadcrumbList Schema
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ubuntuanalytiq.com",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Agentic AI Consulting",
            item: "https://ubuntuanalytiq.com/agentic-ai",
        },
    ],
};

export default function AgenticAIPage() {
    return (
        <>
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <main className="pt-20 pb-32">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="max-w-7xl mx-auto px-4 pb-4 text-sm text-gray-400"
                >
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="hover:text-[var(--brand-cyan)]">
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-[var(--brand-cyan)]">Agentic AI</li>
                    </ol>
                </nav>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <span className="inline-block py-1 px-3 rounded-full bg-[var(--brand-blue)]/20 text-[var(--brand-blue)] text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
                            B2B Enterprise Solutions
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            From Data to <br />
                            <span className="text-[var(--brand-blue)]">Autonomous Action</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                            Automate your workforce with Intelligent AI Agents. We don&apos;t
                            just build chatbots; we architect proactive, task-oriented agents
                            that execute complex workflows.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/consultation"
                                className="px-8 py-4 bg-[var(--brand-blue)] text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2 justify-center"
                            >
                                <Zap className="w-5 h-5" /> Deploy AI Consultant
                            </Link>
                            <a
                                href="https://calendly.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
                            >
                                <Calendar className="w-5 h-5" /> Book a Call
                            </a>
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
                                <div className="w-12 h-12 rounded-lg bg-[var(--brand-surface)] group-hover:bg-[var(--brand-blue)]/20 transition-colors flex items-center justify-center flex-shrink-0 text-[var(--brand-blue)] border border-white/10 group-hover:border-[var(--brand-blue)]">
                                    <Terminal className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        Beyond Chatbots
                                    </h3>
                                    <p className="text-gray-400">
                                        Our agents don&apos;t just talk; they use tools. They connect
                                        to your API, database, and CRM to perform actions like
                                        onboarding employees or processing invoices.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-lg bg-[var(--brand-surface)] group-hover:bg-[var(--brand-blue)]/20 transition-colors flex items-center justify-center flex-shrink-0 text-[var(--brand-blue)] border border-white/10 group-hover:border-[var(--brand-blue)]">
                                    <BrainCircuit className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        24/7 Autonomous Ops
                                    </h3>
                                    <p className="text-gray-400">
                                        Reduce operational overhead. Let agents handle Tier-1
                                        support triage and data entry while your human team focuses
                                        on strategy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Workflow Visualization */}
                        <div className="bg-[var(--brand-surface)] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-[var(--brand-blue)]/50 transition-colors">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--brand-blue)]/5 blur-3xl rounded-full group-hover:bg-[var(--brand-blue)]/10 transition-all duration-500"></div>
                            <div className="relative z-10 space-y-4">
                                <div className="bg-[var(--brand-dark)] p-4 rounded-lg border border-white/10 flex justify-between items-center">
                                    <span className="text-gray-300 font-mono text-sm">
                                        Input: &quot;Refund order #123&quot;
                                    </span>
                                    <span className="text-green-500 text-xs animate-pulse">
                                        Received
                                    </span>
                                </div>
                                <div className="flex justify-center">
                                    <div className="h-6 w-0.5 bg-white/10"></div>
                                </div>
                                <div className="bg-[var(--brand-dark)] p-4 rounded-lg border border-[var(--brand-blue)]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className="w-2 h-2 bg-[var(--brand-blue)] rounded-full animate-bounce"></div>
                                        <span className="text-[var(--brand-blue)] font-bold text-sm">
                                            AI Agent Logic
                                        </span>
                                    </div>
                                    <div className="text-gray-400 text-xs font-mono">
                                        {`> Checking CRM for Order #123`}
                                        <br />
                                        {`> Verifying eligibility... OK`}
                                        <br />
                                        {`> Triggering Stripe API Refund`}
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="h-6 w-0.5 bg-white/10"></div>
                                </div>
                                <div className="bg-[var(--brand-dark)] p-4 rounded-lg border border-white/10 flex justify-between items-center">
                                    <span className="text-gray-300 font-mono text-sm">
                                        Action: Refund Processed
                                    </span>
                                    <span className="text-[var(--brand-blue)] text-xs">Done</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Automate?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Let&apos;s discuss how AI agents can transform your operations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/consultation"
                                className="px-8 py-4 bg-[var(--brand-cyan)] text-[var(--brand-dark)] rounded-full font-bold hover:bg-cyan-300 transition-all"
                            >
                                Book a Consultation
                            </Link>
                            <Link
                                href="/courses/ai-agents-masterclass"
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all"
                            >
                                Learn to Build Agents
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
