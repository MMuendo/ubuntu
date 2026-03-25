import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from '../constants';
import { Lock, Sparkles, Brain, Zap, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

// ── Types ──────────────────────────────────────────────────────────
interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
}

// ── Static plan fallbacks (used if no DB plans available) ──────────
const STATIC_PLANS: Record<string, Plan> = {
    starter: {
        id: 'ai-mastery',
        name: 'AI Fluency for Business Leaders',
        description: 'Master AI tools, prompting, and business automation. Perfect for professionals building AI literacy from the ground up.',
        price: 12500,
    },
    advanced: {
        id: 'ai-agents-masterclass',
        name: 'Agentic AI for Business',
        description: 'Build real AI agents using n8n, OpenAI, and automation platforms. Hands-on projects with real Kenyan business datasets.',
        price: 24500,
    },
};

const SCORE_THRESHOLD = 70;

const getRecommendation = (score: number): Plan => {
    return score >= SCORE_THRESHOLD ? STATIC_PLANS.advanced : STATIC_PLANS.starter;
};

// ── Score label ────────────────────────────────────────────────────
const getScoreLabel = (score: number) =>
    score >= SCORE_THRESHOLD ? 'AI Agent Builder' : 'AI Fluency Learner';

// ── Component ──────────────────────────────────────────────────────
const AssessmentPage: React.FC = () => {
    const navigate = useNavigate();

    const [started, setStarted] = useState(false);
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recommendation, setRecommendation] = useState<Plan | null>(null);

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);

        if (qIndex < ASSESSMENT_QUESTIONS.length - 1) {
            setQIndex(qIndex + 1);
        } else {
            let correct = 0;
            newAnswers.forEach((ans, idx) => {
                if (ans === ASSESSMENT_QUESTIONS[idx].correctIndex) correct++;
            });
            const finalScore = Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100);
            setScore(finalScore);
            setRecommendation(getRecommendation(finalScore));
            setShowEmailGate(true);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');

        if (!email || !email.includes('@')) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            await supabase.from('leads').insert([{
                email,
                source: 'assessment',
                metadata: {
                    assessment_score: score,
                    assessment_answers: answers,
                    recommended_plan: recommendation?.name ?? 'Unknown',
                },
            }]);
        } catch (err) {
            console.error('Lead save failed:', err);
            // Non-blocking — continue to result regardless
        }

        setIsSubmitting(false);
        setShowEmailGate(false);
        setShowResult(true);
    };

    // ── Landing ────────────────────────────────────────────────────
    if (!started) {
        return (
            <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="max-w-4xl w-full relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-8 relative">
                            <Brain className="w-12 h-12 text-cyan-400" />
                            <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Discover Your Perfect Path in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                                AI Fluency
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Whether you're just starting or ready to build agents, let's find the right roadmap for you.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/60 to-black/40 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 backdrop-blur-sm">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">What You'll Discover</h2>
                        <div className="space-y-8 max-w-3xl mx-auto">
                            {[
                                { icon: <Sparkles className="w-8 h-8 text-cyan-400" />, color: 'cyan', title: 'Personalised Roadmap', desc: 'Get recommendations tailored to your current skill level and goals.' },
                                { icon: <Zap className="w-8 h-8 text-purple-400" />, color: 'purple', title: 'Real-World Scenarios', desc: 'From drafting emails in Kilimani to automating payments with M-Pesa — practical African use cases.' },
                                { icon: <CheckCircle className="w-8 h-8 text-blue-400" />, color: 'blue', title: 'Compliance & Ethics', desc: 'Learn about Data Protection laws (ODPC) and responsible AI use in the African context.' },
                            ].map(({ icon, color, title, desc }) => (
                                <div key={title} className="flex gap-6 items-start group">
                                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-${color}-500/10 to-${color}-500/5 border border-${color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        {icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setStarted(true)}
                            className="group px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-full hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all duration-300 inline-flex items-center gap-3"
                        >
                            <span>Start My Assessment</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-gray-500 text-sm mt-6">Takes about 5–7 minutes · {ASSESSMENT_QUESTIONS.length} questions</p>
                    </div>
                </div>
            </div>
        );
    }

    // ── Result ─────────────────────────────────────────────────────
    if (showResult) {
        return (
            <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="max-w-4xl w-full relative z-10">
                    <div className="bg-gradient-to-br from-gray-900/80 to-black/60 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            {/* Score ring */}
                            <div className="mb-10">
                                <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-4 border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-5xl font-bold text-white mb-6 shadow-[0_0_40px_rgba(34,211,238,0.3)] relative">
                                    <span>{score}%</span>
                                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-ping" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                                    {getScoreLabel(score)}
                                </h2>
                                <p className="text-gray-400 text-lg">Your personalised roadmap is ready.</p>
                            </div>

                            {/* Recommendation card */}
                            {recommendation && (
                                <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/30 mb-6 backdrop-blur-sm">
                                    <h3 className="text-2xl md:text-3xl text-white font-bold mb-3">
                                        Recommended: {recommendation.name}
                                    </h3>
                                    <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                                        {recommendation.description}
                                    </p>
                                    <div className="text-4xl font-bold text-white mb-8">
                                        KES {recommendation.price.toLocaleString()}
                                    </div>

                                    {/* Blurred content + CTA */}
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-10 rounded-xl">
                                            <button
                                                onClick={() => {
                                                    const params = new URLSearchParams({
                                                        courseId: recommendation.id,
                                                        courseName: recommendation.name,
                                                        coursePrice: recommendation.price.toString(),
                                                        courseDescription: recommendation.description,
                                                    });
                                                    navigate(`/checkout?${params.toString()}`);
                                                }}
                                                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all shadow-lg flex items-center gap-3"
                                            >
                                                <Lock className="w-5 h-5" />
                                                <span>Unlock My Personalised Plan</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                        <div className="space-y-4 opacity-20 p-6 border border-white/10 rounded-xl">
                                            <div className="h-6 bg-gray-600 rounded w-3/4 mx-auto" />
                                            <div className="h-6 bg-gray-600 rounded w-1/2 mx-auto" />
                                            <div className="h-6 bg-gray-600 rounded w-full" />
                                            <div className="h-6 bg-gray-600 rounded w-5/6 mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── Questions ──────────────────────────────────────────────────
    return (
        <div className="min-h-screen pt-10 px-4 flex flex-col items-center justify-center bg-[#18100F] relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Email gate modal */}
            {showEmailGate && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-gradient-to-br from-gray-900/90 to-black/80 border border-cyan-500/50 rounded-3xl p-6 sm:p-10 max-w-md w-full relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-6">
                                <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Almost there...</h3>
                            <p className="text-gray-400 mb-8">
                                Enter your email to reveal your Fluency Score and personalised roadmap.
                            </p>
                            <form onSubmit={handleEmailSubmit}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                                    placeholder="name@example.com"
                                    disabled={isSubmitting}
                                    className={`w-full bg-black/50 border ${emailError ? 'border-red-500' : 'border-white/20'} rounded-xl p-4 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none transition-colors mb-2`}
                                />
                                {emailError && <p className="text-red-400 text-sm mb-4">{emailError}</p>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /><span>Processing...</span></>
                                    ) : (
                                        <><span>Reveal My Score</span><ArrowRight className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-3xl w-full relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        Become Fluent in AI
                    </h1>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-gray-400 text-sm">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                        Question {qIndex + 1} of {ASSESSMENT_QUESTIONS.length}
                    </span>
                    <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 px-4 py-2 rounded-full text-cyan-400 font-medium">
                        {ASSESSMENT_QUESTIONS[qIndex].category}
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-white/5 rounded-full mb-10 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        style={{ width: `${(qIndex / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                    />
                </div>

                <div className="bg-gradient-to-br from-gray-900/80 to-black/60 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-xl md:text-2xl font-medium text-white mb-8 leading-relaxed">
                            {ASSESSMENT_QUESTIONS[qIndex].text}
                        </h2>
                        <div className="space-y-4">
                            {ASSESSMENT_QUESTIONS[qIndex].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className="group w-full text-left p-5 rounded-xl border border-white/10 bg-white/5 text-base text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 hover:border-cyan-400/50 hover:text-white transition-all duration-300 min-h-[60px] relative overflow-hidden"
                                >
                                    <span className="relative z-10">{opt}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentPage;
