import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, Headphones, UsersRound } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/site-kit";
import { LeadCaptureButton } from "@/components/lead-capture-modal";
import { organizationPaths } from "@/lib/academy/strategy-content";

const icons = [Building2, UsersRound, Headphones, GraduationCap];

const integratedModel = [
  {
    title: "Audit",
    detail: "Map where AI can help, where data is exposed, and which workflows are ready."
  },
  {
    title: "Roadmap",
    detail: "Prioritize use cases, owners, risk controls, and the first practical adoption sprint."
  },
  {
    title: "Build",
    detail: "Turn selected workflows into reporting automation, agents, or decision-support systems."
  },
  {
    title: "Train",
    detail: "Equip managers, analysts, and operators to use, review, and improve the system."
  },
  {
    title: "Measure",
    detail: "Track adoption, time saved, error reduction, customer experience, and decision quality."
  }
];

export const metadata = {
  title: "AI Advisory, Automation, and Data & AI Training for Organizations",
  description:
    "AI advisory, automation, reporting systems, and Data & AI team training for African organizations adopting AI responsibly.",
  keywords: [
    "AI for organizations",
    "AI advisory for companies",
    "Data and AI team training",
    "business intelligence consulting Kenya",
    "AI automation for business",
    "responsible AI adoption"
  ]
};

export default function ForOrganizationsPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">For Organizations</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Train teams, automate workflows, and adopt AI with control.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Ubuntu connects advisory, solution building, and Academy training so organizations can move from AI interest to useful systems and practical team capability.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LeadCaptureButton label="Book organization consult" title="Book an Organization Consultation" defaultType="AI & Data Capability Enablement" />
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/academy">Explore team training</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Integrated model</p>
            <div className="mt-5 grid gap-3">
              {integratedModel.map((item) => (
                <div key={item.title} className="rounded-lg bg-white/10 p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg kenya-watermark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Organization paths"
            title="Start where the pressure is already visible."
            copy="Executives, operations teams, customer teams, and learning teams can begin from their most urgent pressure point and still move through one connected adoption path."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {organizationPaths.map((path, index) => {
              const Icon = icons[index] || Building2;
              return (
                <Card key={path.title} className="ubuntu-intel-card">
                  <CardContent className="p-5">
                    <Icon size={22} className="text-[#00b4d8]" />
                    <h2 className="mt-4 text-xl font-semibold text-[#1e1616]">{path.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{path.need}</p>
                    <div className="mt-4 rounded-lg bg-[#f1f5f9] p-4 text-sm font-semibold leading-6 text-slate-700">
                      {path.path}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ubuntu-dark-panel py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">What stays connected</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Advisory, solutions, and Academy reinforce each other.</h2>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/8 p-5">
            <div className="grid gap-2">
              {[
                "Advisory identifies the right workflows and risks.",
                "Solutions build the automation and AI systems.",
                "Academy trains the team to use, review, and improve them.",
                "Projects and proof show whether capability is actually growing."
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-200">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[#00b4d8]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent">
                <Link href="/advisory">Open advisory</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/solutions">
                  Open solutions
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
