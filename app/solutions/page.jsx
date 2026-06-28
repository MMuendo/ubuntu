import Link from "next/link";
import { ArrowRight, Bot, FileText, MessagesSquare, Workflow } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CourseBadgeRow, SectionTitle } from "@/components/site-kit";
import { LeadCaptureButton } from "@/components/lead-capture-modal";
import { solutionOffers } from "@/lib/academy/strategy-content";

const icons = {
  "Reporting Automation": FileText,
  "Agentic AI Workflows": Workflow,
  "Knowledge Assistants": Bot,
  "Customer & WhatsApp Agents": MessagesSquare
};

const solutionPattern = [
  {
    title: "Observe",
    detail: "Connect the workflow, data source, channel, and trigger so the system sees the right signal."
  },
  {
    title: "Reason",
    detail: "Apply business rules, context, and model instructions before any action is taken."
  },
  {
    title: "Act",
    detail: "Call the right tool, update the right system, or prepare the next message with traceable output."
  },
  {
    title: "Review",
    detail: "Escalate sensitive, costly, or uncertain work to a person before it reaches the customer or ledger."
  },
  {
    title: "Improve",
    detail: "Use logs, feedback, and adoption data to tighten the workflow after launch."
  }
];

export const metadata = {
  title: "AI Solutions, Agentic Automation, and Reporting Systems",
  description:
    "AI solutions for African teams: agentic AI workflows, reporting automation, RAG knowledge assistants, WhatsApp agents, and customer-facing AI systems.",
  keywords: [
    "AI solutions Kenya",
    "agentic AI automation",
    "reporting automation",
    "AI workflow automation",
    "RAG assistants",
    "WhatsApp AI agents",
    "Power BI automation"
  ]
};

export default function SolutionsPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg kenya-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">AI Solutions</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Build AI systems that do useful work.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              We design and build agentic workflows, reporting automation, knowledge assistants, and customer-facing AI systems with human review, context, and adoption built in.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LeadCaptureButton label="Discuss a solution" title="Discuss an AI Solution" defaultType="AI & Intelligent Automation" />
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/pathways/ai-agents-masterclass">Train your builders</Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 p-5 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Solution pattern</p>
            <div className="mt-5 grid gap-3">
              {solutionPattern.map((step, index) => (
                <div key={step.title} className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#00b4d8] text-sm font-bold text-[#1e1616]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="text-sm leading-6 text-slate-300">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg africa-watermark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="What we build"
            title="Automation that fits the work."
            copy="Each solution starts with the workflow, data, channel, risk, and adoption pattern before tools are selected."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {solutionOffers.map((offer) => {
              const Icon = icons[offer.title] || Workflow;
              return (
                <Card key={offer.title} className="ubuntu-intel-card">
                  <CardContent className="p-5">
                    <span className="flex size-11 items-center justify-center rounded-md bg-[#1e1616] text-[#00b4d8]">
                      <Icon size={20} />
                    </span>
                    <h2 className="mt-4 text-xl font-semibold text-[#1e1616]">{offer.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{offer.summary}</p>
                    <div className="mt-5">
                      <CourseBadgeRow items={offer.examples} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ubuntu-dark-panel py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Build + train</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Every system leaves capability behind.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Ubuntu does not just install workflows. We train the people who will own, review, improve, and explain them.
            </p>
          </div>
          <div className="flex items-center gap-3 lg:justify-end">
            <Button asChild variant="accent" size="lg">
              <Link href="/academy">Open Academy</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View project proof</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
