import Link from "next/link";
import { ArrowRight, Eye, FileCheck2, LockKeyhole, Scale } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/site-kit";
import { LeadCaptureButton } from "@/components/lead-capture-modal";
import { responsibleAiPrinciples } from "@/lib/academy/strategy-content";

export const metadata = {
  title: "Responsible AI Framework",
  description:
    "A practical responsible AI framework for African organizations adopting AI with privacy, governance, human review, and measurable value.",
  keywords: [
    "responsible AI framework",
    "responsible AI Kenya",
    "AI governance Africa",
    "human in the loop AI",
    "AI policy for organizations",
    "data protection AI"
  ]
};

export default function ResponsibleAiPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-[#00b4d8]/20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">Responsible AI</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Guardrails for AI that touches real work.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Responsible AI is not a blocker. It is how organizations protect trust while using AI to move faster, reduce repetitive work, and improve decisions.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LeadCaptureButton label="Build our AI policy" title="Build a Responsible AI Policy" defaultType="AI & Data Capability Enablement" />
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/advisory">Back to advisory</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              { icon: LockKeyhole, title: "Protect data", text: "Know what AI can touch and what stays private." },
              { icon: Eye, title: "Review decisions", text: "Keep people in the loop where impact is high." },
              { icon: Scale, title: "Control risk", text: "Document assumptions, limits, and escalation paths." },
              { icon: FileCheck2, title: "Measure value", text: "Track outcomes instead of AI activity." }
            ].map((item) => (
              <Card key={item.title} className="ubuntu-intel-card">
                <CardContent className="p-5">
                  <item.icon size={22} className="text-[#00b4d8]" />
                  <h2 className="mt-4 font-semibold text-[#1e1616]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg kenya-watermark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Framework"
            title="Six principles for African AI adoption."
            copy="These principles turn responsible AI into operating habits: what gets built, who reviews it, and how value is measured."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {responsibleAiPrinciples.map((principle) => (
              <Card key={principle.title} className="ubuntu-intel-card">
                <CardContent className="p-5">
                  <h2 className="text-lg font-semibold text-[#1e1616]">{principle.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{principle.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="ubuntu-solid-bg py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Policy into practice</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">What a responsible rollout includes.</h2>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/8 p-5">
            <div className="grid gap-2">
              {[
                "AI use-case register with impact and risk levels.",
                "Approved tools, data handling rules, and privacy guidance.",
                "Human review rules for sensitive decisions.",
                "Prompt and workflow templates teams can reuse.",
                "Training clinics so adoption becomes behavior, not announcement.",
                "Measurement rhythm for time saved, errors reduced, and decisions improved."
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-200">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[#00b4d8]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="accent" className="mt-6">
              <Link href="/for-organizations">
                See organization paths
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
