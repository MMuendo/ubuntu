import Link from "next/link";
import { ArrowRight, Bot, FileText, MessagesSquare, Workflow } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CourseBadgeRow, SectionTitle } from "@/components/site-kit";
import { LeadCaptureButton } from "@/components/lead-capture-modal";
import { solutionOffers } from "@/lib/academy/strategy-content";
import { OrganizationNav } from "@/components/organization-nav";
import { pageMetadata } from "@/lib/seo";

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
  ...pageMetadata("/for-organizations/solution-patterns", "Data & AI Solutions for African Organizations", "Explore reporting automation, knowledge assistants, agentic AI and customer workflows. Practical solution patterns from Ubuntu Analytiq in Nairobi, Kenya."),
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
      <OrganizationNav current="patterns" />
      <section className="ubuntu-solid-bg kenya-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">Solutions · For organizations</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              See how the services work together.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Reporting automation, knowledge assistants, and customer workflows combine data engineering, analytics, and AI around a specific problem. These patterns are starting points for discovery, adapted to your systems, people, and controls.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LeadCaptureButton label="Ask on WhatsApp" title="Discuss an Engineering Solution" defaultType="AI & Intelligent Automation" />
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/for-organizations/engineering">Explore Engineering</Link>
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

      <section className="border-b border-[#00b4d8]/15 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="From source to outcome" title="The parts need to work together." copy="A useful AI workflow depends on accessible data, reliable movement, shared definitions, and a clear point where a person can review an action." />
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["01", "Sources", "Files, systems, APIs, permissions, and data quality."],
              ["02", "Pipelines", "Movement, transformation, refresh, monitoring, and recovery."],
              ["03", "Metrics", "Agreed definitions and reporting that people can check."],
              ["04", "AI workflows", "Tools, evaluation cases, logs, human review, and escalation."]
            ].map(([number, title, detail]) => <div key={title} className="rounded-xl border border-[#00b4d8]/20 bg-[#fbfaf7] p-5"><p className="text-xs font-bold tracking-[0.16em] text-[#007c97]">{number}</p><h2 className="mt-4 text-lg font-semibold text-[#141014]">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p></div>)}
          </div>
          <p className="mt-5 text-sm text-slate-600">The exact architecture and controls depend on the systems, access, and success measure agreed in discovery.</p>
        </div>
      </section>

      <section className="ubuntu-heritage-bg africa-watermark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Patterns to explore"
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
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Button asChild variant="accent" size="lg">
              <Link href="/academy">Open Academy</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/for-organizations">For organizations</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
