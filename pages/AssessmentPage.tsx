import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from '../constants';
import { usePlans, Plan } from '../hooks/usePlans';
import { Lock, Sparkles, Brain, Zap, CheckCircle } from 'lucide-react';
import { validateEmail } from '../utils/validation';
import LoadingSpinner from '../components/LoadingSpinner';
import { createLead } from '../lib/supabase';

const AssessmentPage: React.FC = () => {
    const navigate = useNavigate();
    const { plans, getRecommendation, loading: plansLoading } = usePlans();
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
            // Calculate Score
            let correctCount = 0;
            newAnswers.forEach((ans, idx) => {
                if (ans === ASSESSMENT_QUESTIONS[idx].correctIndex) correctCount++;
            });
            const finalPercentage = Math.round((correctCount / ASSESSMENT_QUESTIONS.length) * 100);
            setScore(finalPercentage);
            // Get recommendation from dynamic plans
            const rec = getRecommendation(finalPercentage);
            setRecommendation(rec);
            setShowEmailGate(true);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');

        const validation = validateEmail(email);
        if (!validation.valid) {
            setEmailError(validation.error || 'Invalid email');
            return;
        }

        setIsSubmitting(true);

        // Save lead to Supabase
        try {
            await createLead({
                email,
                source: 'assessment',
                assessment_score: score,
                assessment_answers: answers,
                recommended_plan: recommendation?.name || 'Unknown',
            });
            console.log('Lead saved to database');
        } catch (error) {
            console.error('Failed to save lead:', error);
            // Continue anyway - don't block the user experience
        }

        setIsSubmitting(false);
        setShowEmailGate(false);
        setShowResult(true);
    };

    // Dynamic score title based on threshold
    const threshold = plans.advanced?.threshold_score || 70;
    const scoreTitle = score >= threshold ? "AI Agent Builder" : "AI Fluency Learner";

    // Landing Section (before assessment starts)
    if (!started) {
        return (
            <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center bg-brand-dark">
                <div className="max-w-3xl w-full">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 mb-6">
                            <Brain className="w-10 h-10 text-brand-cyan" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Discover Your Perfect Path in <br />
                            <span className="text-brand-cyan">AI Fluency</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                            Whether you&apos;re just starting or ready to build agents, let&apos;s find the right roadmap for you.
                        </p>
                    </div>

                    <div className="bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-10 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6">What You'll Discover</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-brand-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Personalized Roadmap</h3>
                                    <p className="text-gray-400">Get recommendations tailored to your current skill level and goals.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-brand-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Real-World Scenarios</h3>
                                    <p className="text-gray-400">From drafting emails in Kilimani to automating payments with M-Pesa, we cover practical African use cases.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-brand-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Compliance & Ethics</h3>
                                    <p className="text-gray-400">Learn about Data Protection laws (ODPC) and responsible AI use in the African context.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setStarted(true)}
                            className="px-10 py-4 bg-brand-cyan text-brand-dark font-bold text-lg rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        >
                            Start My Assessment
                        </button>
                        <p className="text-gray-500 text-sm mt-4">Takes about 5-7 minutes • 20 questions</p>
                    </div>
                </div>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center bg-brand-dark">
                <div className="max-w-3xl w-full">
                    <div className="bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Score Display */}
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-brand-cyan text-4xl font-bold text-white mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                {score}%
                            </div>
                            <h2 className="text-2xl text-brand-cyan font-bold">{scoreTitle}</h2>
                            <p className="text-gray-400 mt-2">Your personalized roadmap is ready.</p>
                        </div>

                        {/* Recommendation */}
                        {recommendation ? (
                            <div className="bg-white/5 rounded-2xl p-8 border border-brand-cyan/30 mb-8">
                                <h3 className="text-xl text-white font-bold mb-2">Recommended: {recommendation.name}</h3>
                                <p className="text-gray-300 mb-6">{recommendation.description}</p>
                                <div className="text-3xl font-bold text-white mb-6">KES {recommendation.price.toLocaleString()}</div>

                                <div className="relative">
                                    {/* Blurred Plan Mockup */}
                                    <div className="absolute inset-0 bg-brand-surface/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                                        <button
                                            onClick={() => {
                                                // Navigate to checkout with plan details
                                                const params = new URLSearchParams({
                                                    courseId: recommendation.id,
                                                    courseName: recommendation.name,
                                                    coursePrice: recommendation.price.toString(),
                                                    courseDescription: recommendation.description,
                                                });
                                                navigate(`/checkout?${params.toString()}`);
                                            }}
                                            className="px-6 py-3 bg-brand-cyan text-brand-dark font-bold rounded-full hover:bg-cyan-300 transition-colors shadow-lg flex items-center gap-2"
                                        >
                                            <Lock className="w-4 h-4" /> Unlock My Personalized Plan
                                        </button>
                                    </div>
                                    <div className="space-y-3 opacity-30 p-4 border border-white/10 rounded-xl">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                                        <div className="h-4 bg-gray-600 rounded w-full"></div>
                                        <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white/5 rounded-2xl p-8 border border-brand-cyan/30 mb-8">
                                <LoadingSpinner size="lg" />
                                <p className="text-gray-400 mt-4">Loading recommendation...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center bg-brand-dark">
            {showEmailGate && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-brand-surface border border-brand-cyan/50 rounded-2xl p-6 sm:p-8 max-w-md w-full">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Almost there...</h3>
                        <p className="text-sm sm:text-base text-gray-400 mb-6">Generating your personalized roadmap... Enter your email to reveal your Fluency Score.</p>
                        <form onSubmit={handleEmailSubmit}>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('');
                                    }}
                                    placeholder="name@example.com"
                                    className={`w-full bg-brand-dark border ${emailError ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 text-white focus:border-brand-cyan focus:outline-none transition-colors`}
                                    disabled={isSubmitting}
                                />
                                {emailError && (
                                    <p className="text-red-400 text-sm mt-2">{emailError}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 bg-brand-cyan text-brand-dark font-bold rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoadingSpinner size="sm" color="gray" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    'Reveal My Score'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-2xl w-full">
                {/* Updated heading */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Become Fluent in AI</h1>
                </div>

                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-400 text-sm">
                    <span>Question {qIndex + 1} of {ASSESSMENT_QUESTIONS.length}</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full">{ASSESSMENT_QUESTIONS[qIndex].category}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full mb-6 sm:mb-8">
                    <div
                        className="h-full bg-brand-cyan rounded-full transition-all duration-500"
                        style={{ width: `${((qIndex) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                    ></div>
                </div>

                <div className="bg-brand-surface border border-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                    <h2 className="text-xl sm:text-2xl font-medium text-white mb-6 sm:mb-8 leading-relaxed">
                        {ASSESSMENT_QUESTIONS[qIndex].text}
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                        {ASSESSMENT_QUESTIONS[qIndex].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className="w-full text-left p-3 sm:p-4 rounded-xl border border-white/10 text-sm sm:text-base text-gray-300 hover:bg-brand-cyan/10 hover:border-brand-cyan hover:text-white transition-all duration-200 min-h-[44px] touch-manipulation"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentPage;
