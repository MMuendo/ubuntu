import Link from "next/link";
import { ArrowRight, Building2, ClipboardCheck, ShieldCheck, Sparkles } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DetailList, QuickStat, SectionTitle } from "@/components/site-kit";
import { LeadCaptureButton } from "@/components/lead-capture-modal";
import { advisoryOffers, responsibleAiPrinciples } from "@/lib/academy/strategy-content";

export const metadata = {
  title: "AI Advisory for African Organizations",
  description:
    "AI advisory for African organizations: readiness audits, responsible AI governance, data strategy, use-case prioritization, and practical team capability.",
  keywords: [
    "AI advisory Africa",
    "AI advisory Kenya",
    "responsible AI advisory",
    "AI readiness audit",
    "AI governance",
    "data strategy consulting",
    "AI adoption roadmap"
  ]
};

export default function AdvisoryPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">AI Advisory</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Adopt AI responsibly, from your own context.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              We help leaders move from AI curiosity to a practical adoption roadmap: useful use cases, clear risk controls, stronger data foundations, and team capability that fits African markets.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LeadCaptureButton label="Book AI readiness audit" title="Book an AI Readiness Audit" defaultType="AI & Intelligent Automation" />
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/responsible-ai">Responsible AI framework</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <QuickStat icon={ShieldCheck} label="governance" value="Practical" />
            <QuickStat icon={ClipboardCheck} label="roadmap" value="30 days" />
            <QuickStat icon={Building2} label="teams" value="Aligned" />
            <QuickStat icon={Sparkles} label="AI use cases" value="Prioritized" />
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg kenya-watermark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Advisory offers"
            title="A practical path from ambition to adoption."
            copy="Move from isolated AI trials to a governed adoption plan with clear use cases, data boundaries, owners, and measurable value."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {advisoryOffers.map((offer) => (
              <Card key={offer.title} className="ubuntu-intel-card">
                <CardContent className="p-5">
                  <h2 className="text-xl font-semibold text-[#1e1616]">{offer.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{offer.summary}</p>
                  <div className="mt-5">
                    <DetailList items={offer.outcomes} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="ubuntu-dark-panel africa-watermark watermark-dark py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Responsible adoption</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Governance that teams can actually use.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Responsible AI becomes useful when it shapes prompts, workflows, approvals, training, and measurement in the work teams already do.
            </p>
            <Button asChild variant="accent" className="mt-6">
              <Link href="/for-organizations">
                See organization paths
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {responsibleAiPrinciples.slice(0, 4).map((principle) => (
              <div key={principle.title} className="rounded-lg border border-white/10 bg-white/8 p-4">
                <h3 className="font-semibold text-white">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{principle.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
