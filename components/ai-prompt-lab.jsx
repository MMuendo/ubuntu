"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Clipboard, Shuffle, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const promptLibrary = [
  {
    category: "Excel",
    title: "Formula architect",
    prompt:
      "Act as a senior financial analyst. I have a sales dataset with columns: Region, Product, Month, Units Sold, Unit Price, Cost per Unit. Write me the top 5 Excel formulas I should have - including a GP% formula, a YTD total, and a rank by region. Explain each in plain language before giving the syntax.",
    why: "Role + real column names + layered ask. Forces specific, usable output."
  },
  {
    category: "Excel",
    title: "Data quality audit",
    prompt:
      "I'm going to paste a table of sales figures. Your job: identify the 3 most likely data quality problems - blanks, duplicates, formatting errors, outliers. Then give me the exact Excel steps to fix each one. No VBA - only built-in functions and Power Query.",
    why: "Scopes the AI as auditor, not builder, and prevents vague suggestions."
  },
  {
    category: "Excel",
    title: "Scenario model builder",
    prompt:
      "Build me a scenario model in Excel. Inputs: revenue growth (conservative 5%, base 12%, aggressive 20%), cost as % of revenue (70%), fixed costs (500,000 KES). Output: gross profit, net profit, margin % per scenario. Give me the cell layout row by row and the exact formulas. Structure it so only input cells change - all outputs recalculate automatically.",
    why: "Real numbers, real context, and a structural constraint produce a usable layout."
  },
  {
    category: "Power BI",
    title: "Dashboard narrator",
    prompt:
      "I have a Power BI dashboard showing: total revenue KES 48M, revenue by region (bar), month-on-month trend (line), top 10 products by sales. I'm presenting to the CFO. Write a 5-sentence narrative that reads this dashboard as a story - what's working, what's declining, and one question this data can't answer.",
    why: "Teaches people to extract insight, not just stare at charts."
  },
  {
    category: "Power BI",
    title: "Misleading dashboard detector",
    prompt:
      "I'm a non-technical manager reviewing a Power BI report. Teach me 5 visual tricks that make data look better than it is - truncated Y-axes, cherry-picked dates, missing benchmarks, wrong chart types, selective filters. For each one, tell me the exact question I should ask the analyst.",
    why: "Builds critical thinking and data confidence."
  },
  {
    category: "PowerPoint",
    title: "Executive slide rewriter",
    prompt:
      "Rewrite these bullet points as a single punchy insight headline for a PowerPoint slide. Audience: executive team, 10 seconds to read. After the headline, write a 2-sentence supporting statement. Here are my bullets: [paste here]. Rule: the headline must lead with the so-what, not the what.",
    why: "The 10-second constraint and so-what rule produce decision-ready slides."
  },
  {
    category: "PowerPoint",
    title: "Deck story architect",
    prompt:
      "Build me a 6-slide business review deck structure. Story: sales grew 8% but profit dropped 3% due to logistics cost overrun. Give me slide-by-slide: headline, one chart per slide, and the question each slide answers in the audience's mind. Format as a table: Slide | Headline | Chart | Question it answers.",
    why: "Forces narrative logic before design."
  },
  {
    category: "AI fluency",
    title: "Analyst brief",
    prompt:
      "You are my junior analyst. I'll give you a business report. Do these in order and label each: Step 1: Summarize the 3 most important findings in plain language. Step 2: Identify 2 data claims I should verify before acting - and why. Step 3: Recommend one decision I can make today, and one to wait on. Here is the report: [paste report]",
    why: "Numbered steps make outputs easy to scan and act on."
  },
  {
    category: "AI fluency",
    title: "AI output stress-tester",
    prompt:
      "Stress-test this AI-generated answer like a skeptical CFO: (1) What unstated assumptions is it relying on? (2) What data would change the conclusion? (3) Is there a simpler explanation it missed? (4) Rate your own confidence: low / medium / high - and explain why. Here is the answer: [paste answer]",
    why: "Teaches professionals to interrogate AI outputs, not accept them."
  },
  {
    category: "AI fluency",
    title: "Root cause reasoning chain",
    prompt:
      "Help me reason through why customer retention dropped from 78% to 71% in Q3. Three possible causes: (1) price increase in August, (2) delayed deliveries, (3) competitor product launch. Using only logic - no invented data - build a 3-step argument: most likely cause, what I'd need to confirm it, and how I'd communicate it to the CEO in 2 sentences.",
    why: "Keeps the AI honest by forbidding invented data."
  },
  {
    category: "Image gen",
    title: "The impossible cultural collision",
    prompt:
      "A Maasai warrior standing on a neon-lit Tokyo street at 3am, wearing full traditional beadwork and holding a glowing spear, cherry blossoms falling, rain-soaked reflections on the pavement, cinematic wide shot, dramatic lighting, hyper-realistic, 8K.",
    why: "Two worlds that should never meet, but do."
  },
  {
    category: "Image gen",
    title: "Yesterday meets 2150",
    prompt:
      "An old Kenyan grandmother sitting in a traditional mud-walled kitchen drinking chai - but through the window behind her is a futuristic city on Mars with a red sky and domed buildings. Inside is warm and familiar. The contrast is surreal but peaceful. Photorealistic.",
    why: "Warm familiarity against an alien future creates emotional tension."
  },
  {
    category: "Image gen",
    title: "Visualize an emotion",
    prompt:
      "What if emotions were visible? Render 'loneliness' as a physical landscape - a vast salt flat at golden hour, a single chair at center, long shadow stretching to the horizon, one faint set of footprints leading to the chair but not away from it.",
    why: "Swap the emotion and every output becomes a different visual experiment."
  },
  {
    category: "Philosophy",
    title: "One idea to save civilization",
    prompt:
      "If you could insert one single idea into every human mind simultaneously - chosen so precisely it would improve civilization the most - what would it be and why? One shot. What's the idea?",
    why: "Different AI tools answer differently, which reveals how they reason about values."
  },
  {
    category: "Mind-bending",
    title: "A letter from 2150",
    prompt:
      "Write a letter from 2150 to someone living in 2025, looking back at this exact moment in history. They know what happened next - which tech vanished, which fears turned out to be nothing, which things we laughed off became the most important in the world. Make it feel real. Make it sting a little.",
    why: "It reframes the present from the future."
  },
  {
    category: "Share this",
    title: "Two versions of you at 60",
    prompt:
      "Write a conversation between the version of me who took the safe path in life and the version who took the risky one. They meet at age 60 over a drink. Neither is fully happy. Neither is fully right. Both have something the other desperately wants. Don't resolve it. Just let them talk.",
    why: "A strong social prompt because it produces reflection, not just output."
  }
];

export function AIPromptLab() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const activePrompt = promptLibrary[index];

  const countLabel = useMemo(() => `${index + 1}/${promptLibrary.length}`, [index]);

  function nextPrompt() {
    setCopied(false);
    setIndex((current) => (current + 1) % promptLibrary.length);
  }

  async function copyPrompt() {
    setCopied(false);
    try {
      await navigator.clipboard.writeText(activePrompt.prompt);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-[380px] sm:bottom-6 sm:right-6">
      {open ? (
        <div className="overflow-hidden rounded-lg border border-[#00b4d8]/30 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.24)]">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-[#f8fdff] p-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#007c97]">AI Prompt Lab</p>
              <h2 className="mt-1 text-lg font-semibold text-[#1e1616]">Free prompt to try today</h2>
            </div>
            <button
              type="button"
              aria-label="Close AI Prompt Lab"
              onClick={() => setOpen(false)}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-[#00b4d8] hover:text-[#1e1616]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-md bg-[#e8f8fb] px-2.5 py-1 text-xs font-bold text-[#007c97]">{activePrompt.category}</span>
              <span className="text-xs font-semibold text-slate-400">{countLabel}</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1e1616]">{activePrompt.title}</h3>
              <div className="mt-3 max-h-52 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                {activePrompt.prompt}
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                <span className="font-semibold text-slate-700">Why it works:</span> {activePrompt.why}
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="button" variant="accent" onClick={copyPrompt} className="h-11">
                {copied ? <Check size={16} /> : <Clipboard size={16} />}
                {copied ? "Copied" : "Copy prompt"}
              </Button>
              <Button type="button" variant="outline" onClick={nextPrompt} className="h-11">
                <Shuffle size={16} />
                Another prompt
              </Button>
            </div>
            <Button asChild variant="default" className="h-11 w-full">
              <Link href="/assessment">
                Find your best course
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ml-auto flex items-center gap-3 rounded-full border border-[#00b4d8]/40 bg-[#1e1616] px-4 py-3 text-left text-white shadow-[0_18px_44px_rgba(15,23,42,0.28)] transition hover:-translate-y-0.5 hover:border-[#00b4d8]"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#00b4d8] text-[#1e1616]">
            <Sparkles size={18} />
          </span>
          <span className="grid">
            <span className="text-sm font-bold">AI Prompt Lab</span>
            <span className="text-xs text-slate-300">Free prompt to copy</span>
          </span>
        </button>
      )}
    </div>
  );
}
