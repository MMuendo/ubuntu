import Link from "next/link";
import { ArrowRight, ClipboardList, ShieldCheck, Wrench, FlaskConical, Rocket } from "lucide-react";
import { LeadCaptureButton } from "@/components/lead-capture-modal";

const steps = [
  { name: "Map", icon: ClipboardList, detail: "Name the decision, its owner, and what a better result looks like." },
  { name: "Create safe brief", icon: ShieldCheck, detail: "Turn the problem into an approved brief with safe or synthetic data." },
  { name: "Build", icon: Wrench, detail: "Selected learners build with mentor guidance and review." },
  { name: "Test", icon: FlaskConical, detail: "Check the workflow against the agreed decision and success measure." },
  { name: "Deploy", icon: Rocket, detail: "With organization approval, hand over to a named owner and measure the result." }
];

export function DecisionLabSteps() {
  return <ol aria-label="Decision Lab process" className="grid gap-3 md:grid-cols-5">{steps.map((step, index) => {
    const Icon = step.icon;
    return <li key={step.name} className="rounded-xl border border-[#007c97]/20 bg-white p-5"><div className="flex items-center justify-between text-[#007c97]"><Icon size={23} aria-hidden="true" /><span className="text-xs font-bold">0{index + 1}</span></div><h3 className="mt-5 text-lg font-semibold text-[#141014]">{step.name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{step.detail}</p></li>;
  })}</ol>;
}

export function DecisionLabBridge() {
  return <section id="decision-lab" className="ubuntu-heritage-bg scroll-mt-24 border-y border-[#00b4d8]/20 py-20 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#007c97]">Decision Lab · where our two offers meet</p>
    <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[#141014] sm:text-4xl">Real organization problems. Mentored builds. Working solutions.</h2>
    <p className="mt-5 max-w-3xl leading-8 text-slate-600">Organizations bring a decision they struggle to make. We turn selected problems into safe project briefs for mentored builds, then test the work with the team who will use it.</p>
    <div className="mt-10"><DecisionLabSteps /></div>
    <div className="mt-8 flex flex-wrap gap-4"><Link href="/for-organizations#decision-lab" className="inline-flex min-h-12 items-center gap-3 rounded-md bg-[#141014] px-5 py-3 text-sm font-semibold text-white hover:bg-[#007c97]">Bring an organization problem <ArrowRight size={17} /></Link><Link href="/mentorships#decision-lab" className="inline-flex min-h-12 items-center gap-3 rounded-md border border-[#007c97]/30 bg-white px-5 py-3 text-sm font-semibold text-[#141014] hover:bg-[#e8f8fb]">Explore the project track <ArrowRight size={17} /></Link></div>
  </div></section>;
}

export function DecisionLabPilot() {
  return <section id="decision-lab" className="ubuntu-heritage-bg scroll-mt-24 border-y border-[#00b4d8]/20 py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#007c97]">Decision Lab pilot</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#141014] sm:text-4xl">Bring one decision your team struggles to make.</h2><p className="mt-5 leading-8 text-slate-600">Which stock should we reorder? Which payment exceptions need attention? Tell us what is difficult today. We will review whether a focused pilot can help, then agree the brief, scope, price, and success measure.</p><div className="mt-7"><LeadCaptureButton label="Share one decision on WhatsApp" title="What decision does your team struggle to make?" defaultType="Decision Lab pilot" notesLabel="The decision your team struggles to make" notesPlaceholder="Describe the decision, how you make it today, who owns it, and what a better result would look like. Please leave out confidential records." notesRequired /></div><p className="mt-4 text-sm leading-6 text-slate-500">Start with a plain-language description. We agree data access and permissions before preparing a learner brief.</p></div>
    <div className="rounded-2xl border border-[#00b4d8]/25 bg-white p-6 sm:p-8"><h3 className="text-xl font-semibold text-[#141014]">What your pilot delivers</h3><ul className="mt-6 space-y-6">{[
      ["A tested workflow", "A working approach checked against agreed cases, with findings and limits documented."],
      ["A named owner", "An agreed person in your team, with handover notes and a clear review process."],
      ["A measured result", "A baseline and a pilot result against the agreed measure, such as time to decide or exceptions resolved."]
    ].map(([title, detail]) => <li key={title}><h4 className="font-semibold text-[#007c97]">{title}</h4><p className="mt-2 text-sm leading-7 text-slate-600">{detail}</p></li>)}</ul></div></div>
    <div className="mt-10"><DecisionLabSteps /></div><p className="mt-6 max-w-4xl text-sm leading-7 text-slate-600">Learner work uses approved or synthetic data and receives mentor review. Production deployment happens only after testing and your approval. <Link href="/mentorships#decision-lab" className="font-semibold text-[#007c97] underline">See the mentorship project track</Link>.</p>
  </div></section>;
}
