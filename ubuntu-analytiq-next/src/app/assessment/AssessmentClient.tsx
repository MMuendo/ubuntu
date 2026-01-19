"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Brain, Sparkles, Zap, CheckCircle, Lock, ArrowRight, ArrowLeft, Target, Trophy, TrendingUp } from "lucide-react";

// Assessment questions (simplified for SSG)
const ASSESSMENT_QUESTIONS = [
    {
        id: 1,
        text: "You are a Kenyan SME owner wanting to draft a localized marketing email for a Nairobi audience. Which prompting technique would yield the most culturally relevant result?",
        options: [
            "Act as a Kenyan digital marketer. Write an email for [Product] using local slang (Sheng) and professional English, targeting youth in Kilimani.",
            "Write a marketing email for [Product].",
            "Summarize this product description into an email.",
            "Write a sales pitch in the style of Shakespeare.",
        ],
        correctIndex: 0,
        category: "Intermediate",
    },
    {
        id: 2,
        text: "Which AI tool is best suited for 'Real-Time' market research (e.g., finding current maize prices in Nakuru or competitor pricing)?",
        options: [
            "Perplexity AI / Google Gemini (Tools with Web Search)",
            "ChatGPT (Free Version 3.5)",
            "Midjourney",
            "Jasper AI",
        ],
        correctIndex: 0,
        category: "Intermediate",
    },
    {
        id: 3,
        text: "Under Kenya's Data Protection Act (2019), what is a major risk when pasting customer phone numbers and credit limits into a public LLM like ChatGPT?",
        options: [
            "Data Leakage & Violation of Privacy (The model might train on this confidential data).",
            "The model will refuse to process numbers.",
            "It costs too much money.",
            "The internet connection will fail.",
        ],
        correctIndex: 0,
        category: "Intermediate",
    },
    // Add more questions as needed - keeping 3 for demo
];

export default function AssessmentClient() {
    const [started, setStarted] = useState(false);
    const [qIndex, setQIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleSelectAnswer = (optionIndex: number) => {
        setSelectedAnswer(optionIndex);
    };

    const handleNext = () => {
        if (selectedAnswer === null) return;

        const newAnswers = [...answers];
        newAnswers[qIndex] = selectedAnswer;
        setAnswers(newAnswers);

        if (qIndex < ASSESSMENT_QUESTIONS.length - 1) {
            setQIndex(qIndex + 1);
            setSelectedAnswer(newAnswers[qIndex + 1] ?? null);
        } else {
            // Calculate Score
            let correctCount = 0;
            newAnswers.forEach((ans, idx) => {
                if (ans === ASSESSMENT_QUESTIONS[idx].correctIndex) correctCount++;
            });
            const finalPercentage = Math.round(
                (correctCount / ASSESSMENT_QUESTIONS.length) * 100
            );
            setScore(finalPercentage);
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (qIndex > 0) {
            setQIndex(qIndex - 1);
            setSelectedAnswer(answers[qIndex - 1] ?? null);
        }
    };

    // Score title based on performance
    const scoreTitle =
        score >= 70 ? "AI Agent Builder" : "AI Fluency Learner";
    const recommendedCourse =
        score >= 70 ? "AI Agents Masterclass" : "AI Mastery";
    const recommendedPrice = score >= 70 ? 12500 : 7500;

    // Landing Section (before assessment starts)
    if (!started) {
        return (
            <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center bg-[var(--brand-dark)]">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[var(--brand-cyan)]/20 to-[var(--brand-purple)]/20 border-2 border-[var(--brand-cyan)]/40 mb-6 animate-pulse">
                            <Brain className="w-12 h-12 text-[var(--brand-cyan)]" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Discover Your Perfect Path in <br />
                            <span className="bg-gradient-to-r from-[var(--brand-cyan)] to-blue-400 bg-clip-text text-transparent">
                                AI Fluency
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
                            Whether you&apos;re just starting or ready to build agents,
                            let&apos;s find the right roadmap for you.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-[var(--brand-cyan)] text-sm">
                            <Target className="w-4 h-4" />
                            <span>Personalized • Practical • African Context</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-[var(--brand-surface)] border border-[var(--brand-cyan)]/20 rounded-2xl p-6 hover:border-[var(--brand-cyan)]/40 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-[var(--brand-cyan)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--brand-cyan)]/20 transition-colors">
                                <Sparkles className="w-6 h-6 text-[var(--brand-cyan)]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                Personalized Roadmap
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Get recommendations tailored to your current skill level and goals.
                            </p>
                        </div>

                        <div className="bg-[var(--brand-surface)] border border-[var(--brand-cyan)]/20 rounded-2xl p-6 hover:border-[var(--brand-cyan)]/40 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-[var(--brand-cyan)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--brand-cyan)]/20 transition-colors">
                                <Zap className="w-6 h-6 text-[var(--brand-cyan)]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                Real-World Scenarios
                            </h3>
                            <p className="text-gray-400 text-sm">
                                From Kilimani marketing to M-Pesa automation - practical African use cases.
                            </p>
                        </div>

                        <div className="bg-[var(--brand-surface)] border border-[var(--brand-cyan)]/20 rounded-2xl p-6 hover:border-[var(--brand-cyan)]/40 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-[var(--brand-cyan)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--brand-cyan)]/20 transition-colors">
                                <CheckCircle className="w-6 h-6 text-[var(--brand-cyan)]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                Compliance & Ethics
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Learn about Data Protection laws (ODPC) and responsible AI use.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[var(--brand-surface)] to-[var(--brand-cyan)]/5 border border-[var(--brand-cyan)]/30 rounded-3xl p-8 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Ready to Begin?</h3>
                                <p className="text-gray-400">Discover which course matches your skill level</p>
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-[var(--brand-cyan)]">5-7</div>
                                    <div className="text-sm text-gray-400">minutes</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-cyan)]/10 rounded-full text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-[var(--brand-cyan)]" />
                                20 Questions
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-cyan)]/10 rounded-full text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-[var(--brand-cyan)]" />
                                Multiple Choice
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-cyan)]/10 rounded-full text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-[var(--brand-cyan)]" />
                                Instant Results
                            </div>
                        </div>

                        <button
                            onClick={() => setStarted(true)}
                            className="w-full px-10 py-5 bg-[var(--brand-cyan)] text-[var(--brand-dark)] font-bold text-lg rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(0,180,216,0.4)] hover:shadow-[0_0_40px_rgba(0,180,216,0.6)] flex items-center justify-center gap-3 group"
                        >
                            Start My Assessment
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        <p>No signup required • Your data stays private</p>
                    </div>
                </div>
            </div>
        );
    }

    // Result Section
    if (showResult) {
        return (
            <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center bg-[var(--brand-dark)]">
                <div className="max-w-4xl w-full">
                    <div className="bg-gradient-to-br from-[var(--brand-surface)] to-[var(--brand-cyan)]/5 border border-[var(--brand-cyan)]/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-cyan)]/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand-purple)]/10 rounded-full blur-3xl -z-10"></div>

                        {/* Trophy Icon */}
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--brand-cyan)]/10 mb-6 animate-bounce">
                            <Trophy className="w-10 h-10 text-[var(--brand-cyan)]" />
                        </div>

                        {/* Score Display */}
                        <div className="mb-8">
                            <h2 className="text-3xl text-white font-bold mb-4">
                                🎉 Assessment Complete!
                            </h2>
                            <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-4 border-[var(--brand-cyan)] text-5xl font-bold text-white mb-6 shadow-[0_0_40px_rgba(0,180,216,0.4)] bg-[var(--brand-surface)]">
                                {score}%
                            </div>
                            <div className="inline-block px-6 py-2 bg-[var(--brand-cyan)]/20 border border-[var(--brand-cyan)]/40 rounded-full mb-2">
                                <h3 className="text-xl text-[var(--brand-cyan)] font-bold">
                                    {scoreTitle}
                                </h3>
                            </div>
                            <p className="text-gray-400 mt-2">
                                Your personalized learning path is ready
                            </p>
                        </div>

                        {/* Performance Insight */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8 max-w-2xl mx-auto">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <TrendingUp className="w-5 h-5 text-[var(--brand-cyan)]" />
                                <h3 className="text-lg font-semibold text-white">Your AI Fluency Level</h3>
                            </div>
                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                                <div 
                                    className="h-full bg-gradient-to-r from-[var(--brand-cyan)] to-blue-400 rounded-full transition-all duration-1000"
                                    style={{ width: `${score}%` }}
                                ></div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                {score >= 70 
                                    ? "You're ready for advanced AI implementation and automation!" 
                                    : "You have a solid foundation. Let's build your AI mastery!"}
                            </p>
                        </div>

                        {/* Recommendation */}
                        <div className="bg-gradient-to-br from-[var(--brand-cyan)]/10 to-transparent rounded-2xl p-8 border-2 border-[var(--brand-cyan)]/40 mb-8 relative overflow-hidden">
                            <div className="absolute top-4 right-4">
                                <div className="px-3 py-1 bg-[var(--brand-cyan)] text-[var(--brand-dark)] text-xs font-bold rounded-full">
                                    RECOMMENDED
                                </div>
                            </div>
                            
                            <div className="text-left mb-6">
                                <h3 className="text-2xl text-white font-bold mb-3">
                                    {recommendedCourse}
                                </h3>
                                <p className="text-gray-300 mb-4 text-base leading-relaxed">
                                    {score >= 70
                                        ? "You're ready to design and deploy autonomous AI agents for business automation. Learn advanced techniques, API integrations, and real-world implementation."
                                        : "Master AI fundamentals, advanced prompting techniques, ethical considerations, and practical applications for modern business in the African context."}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan)] text-sm rounded-full">
                                        {score >= 70 ? "Advanced" : "Intermediate"}
                                    </span>
                                    <span className="px-3 py-1 bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan)] text-sm rounded-full">
                                        Practical Projects
                                    </span>
                                    <span className="px-3 py-1 bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan)] text-sm rounded-full">
                                        Certificate Included
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-2 mb-6">
                                    <div className="text-4xl font-bold text-white">
                                        KES {recommendedPrice.toLocaleString()}
                                    </div>
                                    <div className="text-gray-400 text-sm">one-time payment</div>
                                </div>
                            </div>

                            <Link
                                href={`/courses/${score >= 70 ? "ai-agents-masterclass" : "ai-mastery"}`}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--brand-cyan)] text-[var(--brand-dark)] font-bold text-lg rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(0,180,216,0.4)] hover:shadow-[0_0_40px_rgba(0,180,216,0.6)] group"
                            >
                                <Lock className="w-5 h-5" /> 
                                View My Personalized Plan
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Alternative Options */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-4">
                                Want to explore other options first?
                            </p>
                            <Link 
                                href="/courses"
                                className="text-[var(--brand-cyan)] hover:text-cyan-400 text-sm font-medium transition-colors"
                            >
                                View All Courses →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Question Section
    return (
        <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center bg-[var(--brand-dark)]">
            <div className="max-w-3xl w-full">
                {/* Header with Progress */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Become Fluent in AI
                    </h1>
                    <p className="text-gray-400">Answer honestly for the best recommendations</p>
                </div>

                {/* Enhanced Progress Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-400">
                            Question {qIndex + 1} of {ASSESSMENT_QUESTIONS.length}
                        </span>
                        <span className="bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan)] px-3 py-1 rounded-full text-xs font-semibold border border-[var(--brand-cyan)]/30">
                            {ASSESSMENT_QUESTIONS[qIndex].category}
                        </span>
                    </div>
                    
                    {/* Progress Bar with Animation */}
                    <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--brand-cyan)] to-blue-400 rounded-full transition-all duration-500 ease-out"
                            style={{
                                width: `${((qIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100}%`,
                            }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">Start</span>
                        <span className="text-xs text-[var(--brand-cyan)] font-medium">
                            {Math.round(((qIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100)}% Complete
                        </span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-gradient-to-br from-[var(--brand-surface)] to-[var(--brand-surface)]/80 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-8 leading-relaxed">
                        {ASSESSMENT_QUESTIONS[qIndex].text}
                    </h2>
                    
                    <div className="space-y-3 sm:space-y-4">
                        {ASSESSMENT_QUESTIONS[qIndex].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelectAnswer(idx)}
                                className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 text-sm sm:text-base transition-all duration-300 min-h-[60px] flex items-center gap-4 group ${
                                    selectedAnswer === idx
                                        ? "border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 text-white shadow-[0_0_20px_rgba(0,180,216,0.3)]"
                                        : "border-white/10 text-gray-300 hover:bg-white/5 hover:border-[var(--brand-cyan)]/50"
                                }`}
                            >
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                    selectedAnswer === idx
                                        ? "border-[var(--brand-cyan)] bg-[var(--brand-cyan)]"
                                        : "border-white/30 group-hover:border-[var(--brand-cyan)]/50"
                                }`}>
                                    {selectedAnswer === idx && (
                                        <CheckCircle className="w-4 h-4 text-[var(--brand-dark)]" />
                                    )}
                                </div>
                                <span className="flex-1">{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center gap-4">
                    <button
                        onClick={handleBack}
                        disabled={qIndex === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                            qIndex === 0
                                ? "opacity-40 cursor-not-allowed text-gray-500"
                                : "text-white border-2 border-white/20 hover:border-[var(--brand-cyan)] hover:text-[var(--brand-cyan)]"
                        }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={selectedAnswer === null}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                            selectedAnswer === null
                                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                                : "bg-[var(--brand-cyan)] text-[var(--brand-dark)] hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,180,216,0.4)] hover:shadow-[0_0_30px_rgba(0,180,216,0.6)]"
                        } group`}
                    >
                        {qIndex === ASSESSMENT_QUESTIONS.length - 1 ? "See Results" : "Next"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Helper Text */}
                {selectedAnswer === null && (
                    <p className="text-center text-gray-500 text-sm mt-4 animate-pulse">
                        Select an answer to continue
                    </p>
                )}
            </div>
        </div>
    );
}
