import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from '../constants';
import { Lock, Sparkles, Brain, Zap, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

// ── Types & static data ────────────────────────────────────────────
interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
}

const PLANS: Record<'starter' | 'advanced', Plan> = {
    starter: {
        id: 'ai-mastery',
        name: 'AI Fluency for Business Leaders',
        description: 'Master AI tools, prompting, and business automation. Perfect for professionals building their AI literacy from the ground up.',
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

const getPlan = (score: number): Plan =>
    score >= SCORE_THRESHOLD ? PLANS.advanced : PLANS.starter;

const getScoreLabel = (score: number): string =>
    score >= SCORE_THRESHOLD ? 'AI Agent Builder' : 'AI Fluency Learner';

const getScoreColor = (score: number): string => {
    if (score >= 80) return 'from-green-400 to-cyan-400';
    if (score >= 60) return 'from-cyan-400 to-blue-400';
    if (score >= 40) return 'from-blue-400 to-purple-400';
    return 'from-purple-400 to-pink-400';
};

// ── Component ──────────────────────────────────────────────────────
const AssessmentPage: React.FC = () => {
    const navigate = useNavigate();

    const [started, setStarted] = useState(false);
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recommendation, setRecommendation] = useState<Plan | null>(null);

    const handleAnswer = (idx: number) => {
        if (selected !== null) return; // prevent double-tap
        setSelected(idx);

        setTimeout(() => {
            const newAnswers = [...answers, idx];
            setAnswers(newAnswers);
            setSelected(null);

            if (qIndex < ASSESSMENT_QUESTIONS.length - 1) {
                setQIndex(qIndex + 1);
            } else {
                let correct = 0;
                newAnswers.forEach((ans, i) => {
                    if (ans === ASSESSMENT_QUESTIONS[i].correctIndex) correct++;
                });
                const finalScore = Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100);
                setScore(finalScore);
                setRecommendation(getPlan(finalScore));
                setShowEmailGate(true);
            }
        }, 350);
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');

        if (!email || !email.includes('@') || !email.includes('.')) {
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
            // Non-blocking
        }

        setIsSubmitting(false);
        setShowEmailGate(false);
        setShowResult(true);
    };

    const progress = (qIndex / ASSESSMENT_QUESTIONS.length) * 100;

    // ── Landing ────────────────────────────────────────────────────
    if (!started) {
        return (
            <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
                {/* Ambient blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/3 rounded-full blur-3xl" />
                </div>

                {/* Floating dots */}
                <div className="absolute top-32 left-16 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                <div className="absolute top-48 right-24 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.7s' }} />
                <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1.4s' }} />

                <div className="max-w-4xl w-full relative z-10">
                    {/* Icon + heading */}
                    <div className="text-center mb-14">
                        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30" />
                            <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" />
                            <Brain className="w-11 h-11 text-cyan-400 relative z-10" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                            Discover Your Perfect <br className="hidden md:block" />
                            Path in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                                AI Fluency
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Whether you're just starting out or ready to build autonomous agents —
                            let's find the right roadmap for you.
                        </p>
                    </div>

                    {/* Feature cards */}
                    <div className="bg-gradient-to-br from-white/4 to-transparent border border-white/8 rounded-3xl p-8 md:p-10 mb-10 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-white mb-8 text-center">What You'll Discover</h2>
                        <div className="space-y-6 max-w-2xl mx-auto">
                            {[
                                {
                                    icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
                                    bg: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20',
                                    title: 'Personalised Roadmap',
                                    desc: 'Get a course recommendation tailored exactly to your current skill level and learning goals.',
                                },
                                {
                                    icon: <Zap className="w-6 h-6 text-purple-400" />,
                                    bg: 'from-purple-500/10 to-purple-500/5 border-purple-500/20',
                                    title: 'Real-World Scenarios',
                                    desc: 'From automating M-Pesa reconciliation to qualifying leads — we cover Kenyan business realities.',
                                },
                                {
                                    icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
                                    bg: 'from-blue-500/10 to-blue-500/5 border-blue-500/20',
                                    title: 'Compliance & Ethics',
                                    desc: 'Understand Kenya\'s ODPC Data Protection Act and responsible AI deployment in African contexts.',
                                },
                            ].map(({ icon, bg, title, desc }) => (
                                <div key={title} className="flex gap-5 items-start group">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${bg} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        {icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <button
                            onClick={() => setStarted(true)}
                            className="group inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-base rounded-full hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] transition-all duration-300"
                        >
                            Start My Assessment
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-gray-600 text-xs mt-5 flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                            {ASSESSMENT_QUESTIONS.length} questions · about 5 minutes
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ── Result ─────────────────────────────────────────────────────
    if (showResult) {
        const colorClass = getScoreColor(score);
        return (
            <div className="min-h-screen pt-10 pb-20 px-4 flex items-center justify-center bg-[#18100F] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="max-w-3xl w-full relative z-10">
                    <div className="bg-gradient-to-br from-white/4 to-transparent border border-white/8 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">

                        {/* Score ring */}
                        <div className="mb-10">
                            <div className="relative inline-flex items-center justify-center w-36 h-36 mb-5">
                                <div className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br ${colorClass} opacity-20`} />
                                <div className={`absolute inset-0 rounded-full border-4 border-cyan-400/40 animate-ping`} />
                                <div className="w-full h-full rounded-full border-4 border-cyan-400 bg-gradient-to-br from-cyan-500/15 to-purple-500/15 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                                    <span className="text-4xl font-bold text-white">{score}%</span>
                                </div>
                            </div>
                            <h2 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colorClass} mb-2`}>
                                {getScoreLabel(score)}
                            </h2>
                            <p className="text-gray-500">Your personalised roadmap is ready.</p>
                        </div>

                        {/* Recommendation */}
                        {recommendation && (
                            <div className="bg-gradient-to-br from-cyan-500/8 to-purple-500/8 rounded-2xl p-8 border border-cyan-500/20 mb-4">
                                <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3">Recommended Course</p>
                                <h3 className="text-2xl font-bold text-white mb-3">{recommendation.name}</h3>
                                <p className="text-gray-400 leading-relaxed mb-6 max-w-lg mx-auto">
                                    {recommendation.description}
                                </p>
                                <p className="text-4xl font-bold text-white mb-8">
                                    KES {recommendation.price.toLocaleString()}
                                </p>

                                {/* Blurred content + unlock CTA */}
                                <div className="relative rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-black/65 backdrop-blur-md flex items-center justify-center z-10">
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
                                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] transition-all"
                                        >
                                            <Lock className="w-5 h-5" />
                                            Unlock My Personalised Plan
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    <div className="p-6 border border-white/8 rounded-xl space-y-3 opacity-20">
                                        <div className="h-5 bg-gray-600 rounded w-3/4 mx-auto" />
                                        <div className="h-5 bg-gray-600 rounded w-1/2 mx-auto" />
                                        <div className="h-5 bg-gray-600 rounded w-full" />
                                        <div className="h-5 bg-gray-600 rounded w-5/6 mx-auto" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ── Questions ──────────────────────────────────────────────────
    const q = ASSESSMENT_QUESTIONS[qIndex];

    return (
        <div className="min-h-screen pt-10 px-4 pb-20 flex flex-col items-center justify-center bg-[#18100F] relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/4 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/4 rounded-full blur-3xl" />
            </div>

            {/* Email gate */}
            {showEmailGate && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0D0D0D] border border-cyan-500/40 rounded-3xl p-8 sm:p-10 max-w-sm w-full relative overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.12)]">
                        <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mb-6">
                                <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Almost there...</h3>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                Enter your email to reveal your Fluency Score and personalised course recommendation.
                            </p>

                            <form onSubmit={handleEmailSubmit}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                                    placeholder="name@example.com"
                                    disabled={isSubmitting}
                                    className={`w-full bg-white/5 border ${emailError ? 'border-red-500/60' : 'border-white/12'} rounded-xl p-4 text-white text-sm placeholder:text-gray-700 focus:border-cyan-400 focus:outline-none transition-colors mb-1`}
                                />
                                {emailError && (
                                    <p className="text-red-400 text-xs mb-3">{emailError}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                    ) : (
                                        <>Reveal My Score <ArrowRight className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-2xl w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        AI Fluency Assessment
                    </h1>
                </div>

                {/* Progress + meta */}
                <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        Question {qIndex + 1} of {ASSESSMENT_QUESTIONS.length}
                    </span>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-cyan-400/80 font-medium">
                        {q.category}
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Question card */}
                <div className="bg-gradient-to-br from-white/4 to-transparent border border-white/8 rounded-3xl p-7 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        {/* Question number badge */}
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 text-xs font-bold mb-5">
                            {qIndex + 1}
                        </div>

                        <h2 className="text-lg md:text-xl font-medium text-white mb-7 leading-relaxed">
                            {q.text}
                        </h2>

                        <div className="space-y-3">
                            {q.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={selected !== null}
                                    className={`group w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 relative overflow-hidden ${
                                        selected === idx
                                            ? 'border-cyan-400/70 bg-cyan-500/15 text-white scale-[0.99]'
                                            : 'border-white/8 bg-white/4 text-gray-300 hover:border-cyan-400/40 hover:bg-white/8 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className={`flex-shrink-0 w-6 h-6 rounded-md border text-xs flex items-center justify-center font-bold transition-colors ${
                                            selected === idx
                                                ? 'border-cyan-400 bg-cyan-500/30 text-cyan-400'
                                                : 'border-white/15 text-gray-600 group-hover:border-cyan-400/40 group-hover:text-cyan-400/70'
                                        }`}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="leading-relaxed pt-0.5">{opt}</span>
                                    </div>
                                    {selected !== idx && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/3 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer hint */}
                <p className="text-center text-gray-700 text-xs mt-5">
                    Select an answer to continue · No time limit
                </p>
            </div>
        </div>
    );
};

export default AssessmentPage;
