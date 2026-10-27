import Link from "next/link";
import { ArrowRight, Bot, Building2, Database, GraduationCap, Headphones, Layers3, UsersRound, Workflow } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/site-kit";
import { LeadCaptureButton } from "@/components/lead-capture-modal";
import { organizationPaths } from "@/lib/academy/strategy-content";
import { contactChannels, trustedOrganizations } from "@/lib/academy/site-content";
import { engineeringServices as serviceDetails } from "@/lib/engineering-services";
import { OrganizationNav } from "@/components/organization-nav";
import { DecisionLabPilot } from "@/components/decision-lab";
import { pageMetadata } from "@/lib/seo";

const engineeringServices = [
  { title: "Data migration", icon: Database, question: "Where does the data live now, and where must it go?", output: "Source-to-target map, migration plan, validation checks, and handover." },
  { title: "Data engineering", icon: Workflow, question: "Which systems need to connect, and how often must data refresh?", output: "Ingestion and transformation flows, quality checks, monitoring, and runbook." },
  { title: "Analytics engineering", icon: Layers3, question: "Which business numbers need one trusted definition?", output: "Documented data models, metric definitions, tests, and reporting layer." },
  { title: "AI engineering", icon: Bot, question: "Which workflow can AI improve safely and measurably?", output: "Scoped integration, evaluation cases, review points, and operating instructions." }
];

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
  ...pageMetadata("/for-organizations", "Data & AI Consultancy in Kenya", "Data and AI consultancy from Nairobi, Kenya: advisory, data migration, engineering, analytics and AI workflows shaped around African organization needs."),
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
      <OrganizationNav />
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">For Organizations</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">Data & AI systems built around the work your team needs to do.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Plan the right investment, build reliable data and AI systems, and see how the pieces work together. Advisory, engineering, and solution patterns sit within one organization offering, shaped around your people and operating context.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LeadCaptureButton label="Ask on WhatsApp" title="Request an Organization Consultation" defaultType="Data Strategy & Decision Intelligence" />
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="#start">Find your starting point</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">How an engagement moves</p>
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

      <section id="start" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="For your organization" title="Plan it. Build it. See it in practice." copy="Start with the question you have today. These paths connect; you do not need to buy all three to begin." />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              { title: "Advisory", label: "Plan it", question: "Where should we start?", copy: "Assess readiness, prioritise problems, define governance, and agree a practical roadmap.", href: "/for-organizations/advisory", cta: "Explore Advisory" },
              { title: "Engineering", label: "Build it", question: "We know the problem. Who can build it?", copy: "Move data, connect systems, create trusted metrics, and deliver tested AI workflows.", href: "/for-organizations/engineering", cta: "Explore Engineering" },
              { title: "Solutions", label: "See it in practice", question: "What could this look like in our team?", copy: "Explore reporting automation, knowledge assistants, and other ways the services work together.", href: "/for-organizations/solution-patterns", cta: "Explore Solutions" }
            ].map(path => <Link key={path.title} href={path.href} className="group rounded-xl border border-[#00b4d8]/25 bg-[#fbfaf7] p-6 transition hover:border-[#007c97] focus-visible:outline-2 focus-visible:outline-[#007c97]"><p className="text-xs font-bold uppercase tracking-widest text-[#007c97]">{path.label}</p><h2 className="mt-4 text-2xl font-semibold text-[#141014]">{path.title}</h2><p className="mt-4 font-semibold text-[#141014]">{path.question}</p><p className="mt-3 text-sm leading-7 text-slate-600">{path.copy}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#007c97]">{path.cta}<ArrowRight size={17} /></span></Link>)}
          </div>
        </div>
      </section>

      <section id="services" className="ubuntu-heritage-bg scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Engineering consultancy" title="What is holding your team back?" copy="Start with the problem your team knows. We shape the work around your existing tools, budget, connectivity, and operating context, then agree the deliverables and ownership." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {engineeringServices.map((service, index) => {
              const Icon = service.icon;
              return <article key={service.title} className="rounded-xl border border-[#00b4d8]/20 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#007c97]">0{index + 1} / Service</span><Icon size={24} className="text-[#007c97]" /></div>
                <h2 className="mt-6 text-2xl font-semibold text-[#141014]">{service.title}</h2>
                <p className="mt-3 text-lg font-medium text-[#141014]">{serviceDetails[index].problem}</p>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#141014]">{service.question}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600"><span className="font-semibold">Typical output:</span> {service.output}</p>
                <Link href={`/for-organizations/engineering#${serviceDetails[index].slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#007c97] underline">Explore the service & demo <ArrowRight size={17} /></Link>
              </article>;
            })}
          </div>
        </div>
      </section>

      <DecisionLabPilot />

      <section id="work" className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Work and collaborations" title="Context matters. So does the work already done." copy="These relationships span engineering, business intelligence, and training. Each should be understood in its own context." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustedOrganizations.map((organization) => <article key={organization.name} className="rounded-xl border border-slate-200 p-5"><div className="flex h-20 items-center justify-center"><img src={organization.logo} alt={organization.alt} className="max-h-16 max-w-full object-contain" loading="lazy" /></div><h3 className="mt-4 font-semibold text-[#141014]">{organization.name}</h3><p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#007c97]">{organization.focus}</p><p className="mt-3 text-sm leading-6 text-slate-600">{organization.proof}</p></article>)}
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg kenya-watermark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Supporting paths"
            title="Start where the pressure is already visible."
            copy="Engineering can be supported by advisory and training. Begin from the need your team can already name."
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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Engineering, advisory, and training reinforce each other.</h2>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/8 p-5">
            <div className="grid gap-2">
              {[
                "Advisory identifies the right workflows and risks.",
                "Engineering services build the data, automation, and AI systems.",
                "Solution patterns show how those services combine around a business problem.",
                "Academy trains the team to use, review, and improve them.",
                "Handover and measured outcomes show whether the system is useful."
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-200">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[#00b4d8]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent">
                <Link href="/for-organizations/advisory">Open advisory</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/for-organizations/solution-patterns">
                  Explore solution patterns
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="ubuntu-heritage-bg scroll-mt-24 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-end lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#007c97]">Start a conversation</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#141014] md:text-4xl">Tell us about the system you need.</h2><p className="mt-4 text-base leading-7 text-slate-600">Share the problem, current systems, desired result, and who will use it. We can then agree the right discovery step.</p></div>
          <div className="rounded-xl border border-[#00b4d8]/25 bg-white p-6"><LeadCaptureButton label="Ask on WhatsApp" title="Request an Organization Consultation" defaultType="Data Strategy & Decision Intelligence" /><p className="mt-4 text-sm text-slate-600">You can also <a className="font-semibold text-[#007c97] underline" href={contactChannels.find((channel) => channel.label === "Email")?.href}>email Ubuntu Analytiq</a>.</p></div>
        </div>
      </section>
    </SiteShell>
  );
}
