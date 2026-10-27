import Link from "next/link";
import { ArrowDown, ArrowRight, Database, Workflow, Layers3, Bot, CheckCircle2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { OrganizationNav } from "@/components/organization-nav";
import { EngineeringDemo } from "@/components/engineering-demo";
import { LeadCaptureButton } from "@/components/lead-capture-modal";
import { engineeringServices } from "@/lib/engineering-services";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

const icons = [Database, Workflow, Layers3, Bot];

export const metadata = pageMetadata("/for-organizations/engineering", "Data & AI Engineering Services in Kenya", "Data migration, data engineering, analytics engineering and AI engineering for African organizations. Explore practical skills, service architecture, deliverables and sample workflows.");

export default function EngineeringPage() {
  return (
    <SiteShell>
      <StructuredData data={engineeringServices.map((item) => serviceSchema({ name: item.title, description: item.detail, path: `/for-organizations/engineering#${item.slug}` }))} />
      <OrganizationNav current="engineering" />
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-[#00b4d8]/20 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#72e6ff]">Engineering · From source to decision</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Data & AI engineering for the decisions your team needs to make.</h1>
          <p className="mt-5 text-sm font-semibold text-[#72e6ff]">Based in Nairobi, Kenya. Built around African business contexts.</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Move data safely. Connect daily operations. Agree the numbers. Put AI to work with human oversight. Explore each part below, including the architecture, outputs, and a small working example.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5"><LeadCaptureButton label="Discuss your engineering project" title="What system does your team need?" defaultType="Data engineering" /><a href="#data-migration" className="inline-flex items-center gap-2 text-sm font-semibold text-[#72e6ff]">Explore the engineering <ArrowDown size={17} aria-hidden="true" /></a></div>
        </div>
      </section>

      <nav id="engineering-overview" aria-label="Engineering on this page" className="sticky top-16 z-30 overflow-x-auto border-b border-[#007c97]/20 bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex w-max min-w-full max-w-7xl gap-2 px-4 py-3 sm:px-6 lg:px-8">
          {engineeringServices.map((item, index) => <a key={item.slug} href={`#${item.slug}`} className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-[#141014] hover:bg-[#e8f8fb] focus-visible:outline-[#007c97]"><span className="mr-2 text-xs text-[#007c97]">0{index + 1}</span>{item.title}</a>)}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {engineeringServices.map((item, serviceIndex) => {
          const Icon = icons[serviceIndex];
          return (
            <section key={item.slug} id={item.slug} className={`scroll-mt-32 border-b border-[#007c97]/25 py-14 sm:py-20 ${serviceIndex % 2 ? "bg-[#f7fbfb]" : "bg-white"}`}>
              <div className="grid gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
                <div>
                  <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#007c97]"><Icon size={23} aria-hidden="true" />0{serviceIndex + 1} / Engineering service</p>
                  <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#141014] sm:text-4xl">{item.title}</h2>
                  <p className="mt-5 text-xl font-medium leading-8 text-[#141014]">{item.problem}</p>
                  <p className="mt-4 leading-7 text-slate-600">{item.detail}</p>
                </div>
                <div className="border-l-4 border-[#007c97] pl-5 sm:pl-7">
                  <h3 className="text-lg font-semibold text-[#141014]">In an African business context</h3>
                  <p className="mt-4 text-base leading-8 text-slate-700">{item.example}</p>
                  <p className="mt-3 text-xs leading-6 text-slate-600">Illustrative scenario. Your design depends on your tools, budget, connectivity, people, and operating requirements.</p>
                </div>
              </div>

              <div className="mt-12 grid gap-8 border-t border-[#007c97]/20 px-5 pt-10 sm:px-8 lg:grid-cols-2 lg:gap-14">
                <div>
                  <h3 className="text-lg font-semibold text-[#141014]">What we hand over</h3>
                  <ul className="mt-5 space-y-3">{item.deliverables.map(output => <li key={output} className="flex gap-3 text-sm leading-6 text-slate-700"><CheckCircle2 size={18} aria-hidden="true" className="mt-1 shrink-0 text-[#007c97]" />{output}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#141014]">From source to outcome</h3>
                  <ol aria-label={`${item.title} stages`} className="mt-5 space-y-3">{item.stages.map((stage, index) => <li key={stage} className="flex items-center gap-3 text-sm leading-6 text-[#141014]"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e8f8fb] text-xs font-bold text-[#007c97]">{index + 1}</span>{stage}{index < item.stages.length - 1 ? <ArrowRight size={15} aria-hidden="true" className="ml-auto shrink-0 text-[#007c97]" /> : null}</li>)}</ol>
                  <p className="mt-5 text-sm leading-7 text-slate-600"><strong>Controls and ownership: </strong>{item.checks}</p>
                </div>
              </div>

              <div className="mt-12 border-t border-[#007c97]/20 px-5 pt-10 sm:px-8">
                <h3 className="text-lg font-semibold text-[#141014]">Skills & technologies</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">Common technologies for this work. We confirm the right stack and delivery scope with you during discovery.</p>
                <ul aria-label={`${item.title} technologies`} className="mt-4 flex flex-wrap gap-2">{item.technologies.map(tool => <li key={tool} className="border-b-2 border-[#007c97]/40 px-1 py-2 text-sm font-semibold text-[#007c97]">{tool}</li>)}</ul>
                <dl className="mt-7 grid gap-5 sm:grid-cols-2">{item.skills.map(skill => <div key={skill.name}><dt className="text-sm font-semibold text-[#141014]">{skill.name}</dt><dd className="mt-2 text-sm leading-6 text-slate-600">{skill.use}</dd></div>)}</dl>
              </div>

              <div id={`${item.slug}-demo`} className="mx-5 mt-12 scroll-mt-32 border-t-4 border-[#007c97] bg-[#e8f8fb] p-5 sm:mx-8 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#007c97]">Interactive example · sample data only</p>
                <h3 className="mt-3 text-2xl font-semibold text-[#141014]">{item.demoTitle}</h3>
                <p className="mb-5 mt-3 text-sm leading-7 text-slate-600">{item.demoCopy}</p>
                <EngineeringDemo service={item.slug} />
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 px-5 sm:px-8"><LeadCaptureButton label={`Discuss ${item.title}`} title={`Discuss ${item.title}`} defaultType={item.title} /><a href="#engineering-overview" className="text-sm font-semibold text-[#007c97] underline">Back to overview ↑</a></div>
            </section>
          );
        })}
      </div>
      <section className="ubuntu-heritage-bg border-t border-[#00b4d8]/20 py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-semibold text-[#141014]">One decision is enough to start.</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">We agree scope, success checks, responsibilities, and handover before work begins. A Decision Lab pilot can turn one focused organization problem into a tested workflow with a named owner and a measured result.</p><div className="mt-6 flex flex-wrap gap-6"><Link href="/for-organizations#decision-lab" className="font-semibold text-[#007c97] underline">Explore Decision Lab</Link><Link href="/for-organizations/advisory" className="font-semibold text-[#007c97] underline">Get help planning</Link><Link href="/for-organizations/solution-patterns" className="font-semibold text-[#007c97] underline">See solutions in context</Link></div></div></section>
    </SiteShell>
  );
}
