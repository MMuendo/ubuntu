"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Brain, CheckCircle2, Database, FileSpreadsheet, Loader2, RefreshCw, Sparkles, Zap } from "lucide-react";

import { aiAssessmentQuestions, dataAssessmentQuestions, recommendationForAssessment } from "@/lib/academy/catalog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const pathOptions = [
  {
    id: "ai",
    title: "AI Fluency",
    icon: Brain,
    copy: "Test practical AI, prompting, automation, and agent readiness.",
    stats: "20 questions"
  },
  {
    id: "data",
    title: "Data Fluency",
    icon: BarChart3,
    copy: "Test Excel, Power BI, SQL, Python, and business analytics judgment.",
    stats: "20 questions"
  }
];

function courseHref(course) {
  return `/pathways/${course.slug}`;
}

export function AssessmentClient() {
  const [path, setPath] = useState("");
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const questions = path === "data" ? dataAssessmentQuestions : aiAssessmentQuestions;
  const currentQuestion = questions[questionIndex];
  const recommendation = useMemo(() => {
    if (!path || answers.length !== questions.length) return null;
    return recommendationForAssessment(path, answers);
  }, [answers, path, questions.length]);

  function reset() {
    setPath("");
    setStarted(false);
    setQuestionIndex(0);
    setAnswers([]);
    setSelected(null);
    setEmail("");
    setEmailError("");
    setSaving(false);
    setSaveMessage("");
    setShowResult(false);
  }

  function chooseAnswer(index) {
    if (selected !== null) return;
    setSelected(index);
    const nextAnswers = [...answers, index];
    window.setTimeout(() => {
      setAnswers(nextAnswers);
      setSelected(null);
      if (questionIndex + 1 >= questions.length) {
        setStarted(false);
      } else {
        setQuestionIndex((current) => current + 1);
      }
    }, 220);
  }

  async function revealResult(event) {
    event.preventDefault();
    setEmailError("");
    setSaveMessage("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("That doesn't look like a real email. Try again.");
      return;
    }

    setSaving(true);
    const localRecommendation = recommendationForAssessment(path, answers);

    try {
      const response = await fetch("/api/assessment/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, path, answers })
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        setSaveMessage(payload.message || "Your result is shown below, but it was not saved.");
      }
    } catch {
      setSaveMessage("Your result is shown below, but it was not saved.");
    } finally {
      setSaving(false);
      setShowResult(true);
    }

    return localRecommendation;
  }

  if (!path) {
    return (
      <section className="surface-grid border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge tone="teal">Skills assessment</Badge>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-[#1e1616] md:text-6xl">
              Start with the right path.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Choose AI or Data Fluency, answer practical business questions, then get a course recommendation before billing is handled later.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {pathOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPath(option.id)}
                  className="rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#00b4d8]"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-[#1e1616] text-[#00b4d8]">
                    <Icon size={22} />
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold text-[#1e1616]">{option.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{option.copy}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#007c97]">
                    {option.stats}
                    <ArrowRight size={15} />
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (!started && answers.length === 0) {
    const isAi = path === "ai";
    return (
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <button type="button" onClick={reset} className="mb-6 text-sm font-semibold text-slate-500 hover:text-[#1e1616]">
            Back to assessment choices
          </button>
          <div className="rounded-lg border border-slate-200 bg-[#f1f5f9] p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge tone="teal">{isAi ? "AI Fluency" : "Data Fluency"}</Badge>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#1e1616]">
                  {isAi ? "Measure your AI readiness." : "Measure your data confidence."}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  {isAi
                    ? "You will answer practical questions on prompting, AI risk, automation, agents, and tool selection."
                    : "You will answer practical questions across Excel, Power BI, SQL, Python, and operational analytics."}
                </p>
              </div>
              <Button type="button" variant="accent" size="lg" onClick={() => setStarted(true)}>
                Begin
                <ArrowRight size={18} />
              </Button>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {(isAi
                ? [
                    { icon: Brain, label: "AI concepts" },
                    { icon: Zap, label: "Agents and tools" },
                    { icon: Sparkles, label: "Business fit" }
                  ]
                : [
                    { icon: FileSpreadsheet, label: "Excel" },
                    { icon: BarChart3, label: "Power BI" },
                    { icon: Database, label: "SQL and Python" }
                  ]
              ).map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-lg bg-white p-4 text-sm font-semibold text-[#1e1616] shadow-sm">
                    <Icon className="mb-3 text-[#00b4d8]" size={20} />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!started && answers.length === questions.length && !showResult) {
    return (
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-[#f1f5f9] p-6 shadow-sm">
            <Badge tone="teal">Result ready</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-[#1e1616]">Your recommendation is ready.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Share your email and we'll save your score, send you the course fit, and keep you posted.
            </p>
            <form onSubmit={revealResult} className="mt-6 space-y-4">
              <div>
                <label htmlFor="assessment-email" className="text-sm font-semibold text-[#1e1616]">Email address</label>
                <input
                  id="assessment-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#00b4d8]"
                  placeholder="you@example.com"
                />
                {emailError ? <p className="mt-2 text-sm font-medium text-red-600">{emailError}</p> : null}
              </div>
              <Button type="submit" variant="accent" className="w-full" disabled={saving}>
                {saving ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                Reveal my score
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  if (showResult && recommendation) {
    const course = recommendation.course;
    return (
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-lg bg-[#1e1616] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Your score</p>
              <p className="mt-5 text-6xl font-semibold">{recommendation.score}%</p>
              <p className="mt-3 text-lg font-semibold">{recommendation.label}</p>
              {saveMessage ? <p className="mt-4 rounded-md bg-white/10 p-3 text-sm text-slate-200">{saveMessage}</p> : null}
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#f1f5f9] p-6">
              <Badge tone="teal">Recommended course</Badge>
              <h1 className="mt-4 text-3xl font-semibold text-[#1e1616]">{course.title}</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600">{course.summary}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-md bg-white p-3">
                  <p className="text-xs text-slate-500">Price</p>
                  <p className="font-semibold text-[#1e1616]">KES {course.priceKes.toLocaleString()}</p>
                </div>
                <div className="rounded-md bg-white p-3">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="font-semibold text-[#1e1616]">{course.duration}</p>
                </div>
                <div className="rounded-md bg-white p-3">
                  <p className="text-xs text-slate-500">Instructor</p>
                  <p className="font-semibold text-[#1e1616]">{course.instructor}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="accent">
                  <Link href={courseHref(course)}>
                    Open pathway
                    <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/academy#projects">Take a project</Link>
                </Button>
                <Button type="button" variant="ghost" onClick={reset}>
                  <RefreshCw size={16} />
                  Start over
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const progress = Math.round(((questionIndex + 1) / questions.length) * 100);

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button type="button" onClick={reset} className="text-sm font-semibold text-slate-500 hover:text-[#1e1616]">Reset</button>
          <p className="rounded-md border border-[#00b4d8]/35 bg-[#e8f8fb] px-3 py-1 text-sm font-semibold text-[#1e1616]">
            Question {questionIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-100" aria-label={`Assessment progress: ${progress}%`}>
          <div className="h-full rounded-full bg-[#00b4d8]" style={{ width: `${progress}%` }} />
        </div>
        <div className="rounded-lg border border-slate-200 bg-[#f1f5f9] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">
            {path === "ai" ? currentQuestion.category : currentQuestion.topic}
          </p>
          <h1 className="mt-4 text-2xl font-semibold leading-snug text-[#1e1616]">{currentQuestion.text}</h1>
          <div className="mt-6 grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => chooseAnswer(index)}
                className={`rounded-lg border p-4 text-left text-sm font-medium transition ${
                  selected === index
                    ? "border-[#00b4d8] bg-[#00b4d8]/15 text-[#1e1616]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-[#00b4d8]"
                }`}
              >
                <span className="mr-3 inline-flex size-6 items-center justify-center rounded-md bg-[#1e1616] text-xs font-semibold text-white">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
