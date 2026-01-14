"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Brain, Sparkles, Zap, CheckCircle, Lock } from "lucide-react";

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
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

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
            const finalPercentage = Math.round(
                (correctCount / ASSESSMENT_QUESTIONS.length) * 100
            );
            setScore(finalPercentage);
            setShowResult(true);
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
            <div className="pt-20 pb-12 px-4 flex items-center justify-center">
                <div className="max-w-3xl w-full">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--brand-cyan)]/10 border border-[var(--brand-cyan)]/30 mb-6">
                            <Brain className="w-10 h-10 text-[var(--brand-cyan)]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Discover Your Perfect Path in <br />
                            <span className="text-[var(--brand-cyan)]">AI Fluency</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                            Whether you&apos;re just starting or ready to build agents,
                            let&apos;s find the right roadmap for you.
                        </p>
                    </div>

                    <div className="bg-[var(--brand-surface)] border border-white/10 rounded-3xl p-8 md:p-10 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            What You&apos;ll Discover
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--brand-cyan)]/10 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-[var(--brand-cyan)]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Personalized Roadmap
                                    </h3>
                                    <p className="text-gray-400">
                                        Get recommendations tailored to your current skill level and
                                        goals.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--brand-cyan)]/10 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-[var(--brand-cyan)]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Real-World Scenarios
                                    </h3>
                                    <p className="text-gray-400">
                                        From drafting emails in Kilimani to automating payments with
                                        M-Pesa, we cover practical African use cases.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--brand-cyan)]/10 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-[var(--brand-cyan)]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Compliance & Ethics
                                    </h3>
                                    <p className="text-gray-400">
                                        Learn about Data Protection laws (ODPC) and responsible AI
                                        use in the African context.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setStarted(true)}
                            className="px-10 py-4 bg-[var(--brand-cyan)] text-[var(--brand-dark)] font-bold text-lg rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        >
                            Start My Assessment
                        </button>
                        <p className="text-gray-500 text-sm mt-4">
                            Takes about 5-7 minutes • 20 questions
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Result Section
    if (showResult) {
        return (
            <div className="pt-20 pb-12 px-4 flex items-center justify-center">
                <div className="max-w-3xl w-full">
                    <div className="bg-[var(--brand-surface)] border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Score Display */}
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-[var(--brand-cyan)] text-4xl font-bold text-white mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                {score}%
                            </div>
                            <h2 className="text-2xl text-[var(--brand-cyan)] font-bold">
                                {scoreTitle}
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Your personalized roadmap is ready.
                            </p>
                        </div>

                        {/* Recommendation */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-[var(--brand-cyan)]/30 mb-8">
                            <h3 className="text-xl text-white font-bold mb-2">
                                Recommended: {recommendedCourse}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {score >= 70
                                    ? "Learn to design and deploy autonomous AI agents for business automation."
                                    : "Master AI fundamentals, prompting techniques, and ethics for modern business."}
                            </p>
                            <div className="text-3xl font-bold text-white mb-6">
                                KES {recommendedPrice.toLocaleString()}
                            </div>

                            <Link
                                href={`/courses/${score >= 70 ? "ai-agents-masterclass" : "ai-mastery"}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-cyan)] text-[var(--brand-dark)] font-bold rounded-full hover:bg-cyan-300 transition-colors shadow-lg"
                            >
                                <Lock className="w-4 h-4" /> Unlock My Personalized Plan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Question Section
    return (
        <div className="pt-20 px-4 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full">
                {/* Updated heading */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        Become Fluent in AI
                    </h1>
                </div>

                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-400 text-sm">
                    <span>
                        Question {qIndex + 1} of {ASSESSMENT_QUESTIONS.length}
                    </span>
                    <span className="bg-white/10 px-3 py-1 rounded-full">
                        {ASSESSMENT_QUESTIONS[qIndex].category}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full mb-6 sm:mb-8">
                    <div
                        className="h-full bg-[var(--brand-cyan)] rounded-full transition-all duration-500"
                        style={{
                            width: `${(qIndex / ASSESSMENT_QUESTIONS.length) * 100}%`,
                        }}
                    ></div>
                </div>

                <div className="bg-[var(--brand-surface)] border border-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                    <h2 className="text-xl sm:text-2xl font-medium text-white mb-6 sm:mb-8 leading-relaxed">
                        {ASSESSMENT_QUESTIONS[qIndex].text}
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                        {ASSESSMENT_QUESTIONS[qIndex].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className="w-full text-left p-3 sm:p-4 rounded-xl border border-white/10 text-sm sm:text-base text-gray-300 hover:bg-[var(--brand-cyan)]/10 hover:border-[var(--brand-cyan)] hover:text-white transition-all duration-200 min-h-[44px]"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
