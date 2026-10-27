import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Database,
  GraduationCap,
  Layers3,
  MessageCircle,
  Presentation,
  MoveRight,
  Workflow
} from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { getAcademyPrograms, getMentorProfiles } from "@/lib/db/loaders";
import { contactChannels, testimonials, trustedOrganizations } from "@/lib/academy/site-content";
import { mentorshipTiers, mentorshipTools, mentorshipTopics } from "@/lib/mentorship/catalog";
import { engineeringServices } from "@/lib/engineering-services";
import { DecisionLabBridge } from "@/components/decision-lab";
import { TestimonialsMarquee } from "@/components/testimonials-marquee";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/", "Data & AI Engineering and Mentorship in Kenya", "Ubuntu Analytiq connects Data & AI mentorship with engineering consultancy in Nairobi, Kenya. Practical projects and systems built around African businesses.");

const services = [
  {
    number: "01",
    title: "Data migration",
    icon: Database,
    problem: "Move data without losing what matters.",
    detail: "Plan the move, map sources to the new system, reconcile records, and prepare a clear handover."
  },
  {
    number: "02",
    title: "Data engineering",
    icon: Workflow,
    problem: "Make information flow reliably.",
    detail: "Connect files, APIs, and databases with quality checks, monitoring, and someone accountable for upkeep."
  },
  {
    number: "03",
    title: "Analytics engineering",
    icon: Layers3,
    problem: "Give teams numbers they can trust.",
    detail: "Define business metrics, build tested data models, and support reporting that answers real questions."
  },
  {
    number: "04",
    title: "AI engineering",
    icon: Bot,
    problem: "Put AI to work with control.",
    detail: "Scope useful workflows, connect approved data and tools, test outputs, and keep people in the loop."
  }
];

function Eyebrow({ children, light = false }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-[#72e6ff]" : "text-[#007c97]"}`}>{children}</p>;
}

function SectionHead({ eyebrow, title, copy, light = false }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem] ${light ? "text-white" : "text-[#141014]"}`}>{title}</h2>
      {copy ? <p className={`mt-4 text-base leading-7 ${light ? "text-slate-300" : "text-slate-600"}`}>{copy}</p> : null}
    </div>
  );
}

function ActionLink({ href, children, light = false }) {
  return (
    <Link href={href} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00b4d8] ${light ? "bg-white text-[#141014] hover:bg-[#dff8fc]" : "bg-[#141014] text-white hover:bg-[#007c97]"}`}>
      {children}<ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}

export default async function Home() {
  const [mentors, programs] = await Promise.all([getMentorProfiles(), getAcademyPrograms()]);
  const featuredMentors = mentors.slice(0, 2);
  const featuredPrograms = programs.slice(0, 4);

  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark relative overflow-hidden text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <Eyebrow light>Data & AI engineering · Mentorship · Nairobi, Kenya</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-[2.7rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.6rem]">
              Build your skills.<br /><span className="text-[#72e6ff]">Build better systems.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
              Learn with African business problems. Build for the realities of your organization. Work with a mentor on a Data & AI project, or with our team to move, connect, analyse, and use your data.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink href="/mentorships" light>Explore Mentorship</ActionLink>
              <Link href="/for-organizations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#72e6ff] hover:bg-white/10">For organizations <ArrowUpRight size={17} /></Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-10 -top-10 size-52 rounded-full bg-[#00b4d8]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-[#72e6ff]/30 bg-[#141014]/70 p-2 shadow-[0_32px_80px_rgba(0,0,0,0.24)]">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#72e6ff]">Two ways to work with us</p>
                <Link href="/mentorships" className="group mt-6 block rounded-xl border border-[#72e6ff] bg-[#72e6ff]/10 p-6 transition hover:bg-[#72e6ff]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#72e6ff]">
                  <GraduationCap className="mx-auto text-[#72e6ff]" size={30} aria-hidden="true" />
                  <h2 className="mt-4 text-3xl font-semibold">For individuals</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-200">Build practical skills with a mentor. Choose a tool or topic and work through a project.</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#72e6ff]">Explore Mentorship <ArrowRight size={17} aria-hidden="true" /></span>
                </Link>
                <Link href="/for-organizations" className="group mt-4 block rounded-xl border border-white/30 bg-white/5 p-6 transition hover:border-[#72e6ff] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#72e6ff]">
                  <Braces className="mx-auto text-[#72e6ff]" size={30} aria-hidden="true" />
                  <h2 className="mt-4 text-3xl font-semibold">For organizations</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-200">Solve a data or AI challenge with our team. Build around your systems, people, and decisions.</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#72e6ff]">Explore services <ArrowRight size={17} aria-hidden="true" /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="ubuntu-heritage-bg py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Work and collaborations" title="People and organizations behind the work." copy="A look at the work and training relationships already part of Ubuntu’s story. Each engagement has its own context." />
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <article className="border-l-4 border-[#007c97] bg-white p-6 sm:p-8">
              <img src={trustedOrganizations[0].logo} alt={trustedOrganizations[0].alt} width="160" height="64" className="h-16 w-40 object-contain object-left" />
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.12em] text-[#007c97]">{trustedOrganizations[0].focus}</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#141014]">{trustedOrganizations[0].name}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">{trustedOrganizations[0].proof}</p>
              <ol aria-label="Irri-hub data pipeline" className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#007c97]/15 pt-5 text-xs font-semibold text-[#141014]">
                {trustedOrganizations[0].pipeline.map((step, index) => <li key={step} className="flex items-center gap-2"><span className="rounded-md bg-[#e8f8fb] px-3 py-2">{step}</span>{index < trustedOrganizations[0].pipeline.length - 1 ? <ArrowRight size={15} className="text-[#007c97]" aria-hidden="true" /> : null}</li>)}
              </ol>
            </article>
            <div className="divide-y divide-[#007c97]/20 border-y border-[#007c97]/20">
              {trustedOrganizations.slice(1).map((organization) => (
                <article key={organization.name} className="flex items-start gap-4 py-5">
                  <img src={organization.logo} alt={organization.alt} width="64" height="64" loading="lazy" className="size-16 shrink-0 rounded-md bg-white p-2 object-contain" />
                  <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#007c97]">{organization.focus}</p><h3 className="mt-1 text-lg font-semibold text-[#141014]">{organization.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{organization.proof}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mentorship" className="bg-[#fbfaf7] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <SectionHead eyebrow="Mentorship · for individuals" title="A project to build. A person to learn with." copy="Pick the tool or topic you care about. We review your goal, agree a project and support level, then confirm the sessions and price before payment." />
              <div className="mt-7"><ActionLink href="/mentorships">See how Mentorship works</ActionLink></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#00b4d8]/20 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#007c97]">Choose a tool</p><p className="mt-3 text-lg font-semibold leading-8 text-[#141014]">{mentorshipTools.join(" · ")}</p></div>
              <div className="rounded-xl border border-[#00b4d8]/20 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#007c97]">Or choose a topic</p><p className="mt-3 text-base font-semibold leading-8 text-[#141014]">{mentorshipTopics.join(" · ")}</p></div>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-600">Practice with familiar business situations: reconcile M-Pesa and bank payments, explore SACCO reporting, or analyse retail stock and agricultural supply chains. Each brief uses sample or approved data.</p>
          <h3 className="mt-10 text-xl font-semibold text-[#141014]">Choose your mentorship experience</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {mentorshipTiers.map((tier, index) => (
              <article key={tier.id} className={`rounded-xl border p-6 ${index === 2 ? "border-[#00b4d8] bg-[#e8f8fb]" : "border-slate-200 bg-white"}`}>
                <span className="inline-flex size-12 items-center justify-center rounded-lg bg-[#e8f8fb] text-[#007c97]">{index === 0 ? <Braces size={25} aria-hidden="true" /> : index === 1 ? <MessageCircle size={25} aria-hidden="true" /> : <Presentation size={25} aria-hidden="true" />}</span>
                <h3 className="mt-4 text-2xl font-semibold text-[#141014]">{tier.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{tier.summary}</p>
                <p className="mt-5 border-t border-slate-200 pt-4 text-xs font-medium text-slate-500">Scope, sessions, and price confirmed after review.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="consultancy" className="ubuntu-dark-panel py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow="Engineering consultancy · for organizations" title="What is holding your team back?" copy="Disconnected systems. Repeated manual work. Numbers that do not agree. Start with the problem your team recognises; we shape the engineering around your tools, budget, connectivity, and people." light />
            <Link href="/for-organizations" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#72e6ff] hover:text-white">Explore organization services <ArrowRight size={17} /></Link>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {engineeringServices.map((service, index) => {
              const Icon = services[index].icon;
              return (
                <Link key={service.title} href={`/for-organizations/engineering#${service.slug}`} className="group rounded-xl border border-white/15 bg-white/5 p-6 transition hover:border-[#72e6ff]/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#72e6ff]">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.12em] text-[#72e6ff]">{service.title}</span><Icon size={22} className="text-[#72e6ff]" /></div>
                  <h3 className="mt-7 text-2xl font-semibold">{service.problem}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{service.detail}</p>
                  <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#72e6ff]">Explore the service & demo <MoveRight className="transition group-hover:translate-x-1" size={23} /></span>
                </Link>
              );
            })}
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-300">Not sure where to start? <Link href="/for-organizations/advisory" className="font-semibold text-[#72e6ff] underline">Plan with Advisory</Link>. Want to see how the services combine? <Link href="/for-organizations/solution-patterns" className="font-semibold text-[#72e6ff] underline">Explore Solution Patterns</Link>. For team learning, visit <Link href="/academy" className="font-semibold text-[#72e6ff] underline">Academy</Link>.</p>
        </div>
      </section>

      <DecisionLabBridge />

      <section id="academy" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHead eyebrow="Academy · supporting learning" title="Learn the foundations. Put them to work." copy="Courses help you build skills in Excel, Power BI, AI, SQL, and Python. Mentorship is a separate route when you want a project and human feedback." />
            <Link href="/academy" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#007c97] hover:text-[#141014]">Explore all courses <ArrowRight size={17} /></Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredPrograms.map((program) => (
              <Link key={program.slug} href={`/pathways/${program.slug}`} className="group flex h-full flex-col rounded-xl border border-slate-200 bg-[#fbfaf7] p-5 transition hover:border-[#00b4d8] hover:shadow-md">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#007c97]">{program.category || "Course"}</span>
                <h3 className="mt-5 text-xl font-semibold text-[#141014]">{program.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{program.summary}</p>
                <p className="mt-6 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-500">Start date: To be confirmed</p>
                <ArrowUpRight className="mt-4 text-[#007c97] transition group-hover:translate-x-1" size={19} />
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">Unsure where to start? <Link href="/assessment" className="font-semibold text-[#007c97] underline">Take the Academy assessment</Link>.</p>
        </div>
      </section>

      <section className="ubuntu-solid-bg kenya-watermark watermark-dark py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <SectionHead eyebrow="The people" title="Human guidance, visible in the work." copy="Mentors help learners reason through a problem, build an answer, and explain the decisions behind it." light />
            <Link href="/mentorships" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#72e6ff]">How Mentorship works <ArrowRight size={17} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredMentors.map((mentor) => (
              <article key={mentor.id} className="rounded-xl border border-white/15 bg-white/8 p-5">
                <div className="flex items-center gap-4"><img src={mentor.avatar} alt="" className="size-14 rounded-lg bg-white/10 object-cover" /><div><h3 className="font-semibold">{mentor.name}</h3><p className="text-sm text-slate-300">{mentor.currentRole || mentor.title}</p></div></div>
                <p className="mt-5 text-sm leading-7 text-slate-300">{mentor.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="The people behind the feedback" title="In their own words." copy="From learning a new skill to putting it to work. Hear from learners and the people we have worked with." />
          <TestimonialsMarquee testimonials={testimonials} />
        </div>
      </section>

      <section className="ubuntu-heritage-bg border-t border-[#00b4d8]/15 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:px-8">
          <div><SectionHead eyebrow="Keep exploring" title="Useful writing, events, and practice." copy="Read the people behind the work, find a current community session, or explore tools for practice." /></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[["Articles", "/blogs"], ["Events", "/academy#events"], ["Datasets preview", "/datasets"]].map(([label, href]) => <Link key={href} href={href} className="flex min-h-24 items-end justify-between rounded-xl border border-[#00b4d8]/20 bg-white p-4 text-sm font-semibold text-[#141014] transition hover:border-[#00b4d8]">{label}<ArrowUpRight size={18} className="text-[#007c97]" /></Link>)}
          </div>
        </div>
      </section>

      <section className="ubuntu-dark-panel py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end"><SectionHead eyebrow="Talk to a person" title="Tell us what you want to build." copy="Whether you need a mentor or want to discuss an organization system, start with the work in front of you." light /><div className="flex flex-wrap gap-3 lg:justify-end"><ActionLink href="/mentorships" light>Explore Mentorship</ActionLink><Link href="/for-organizations#contact" className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/35 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Discuss a project <ArrowRight size={17} /></Link></div></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {contactChannels.map((channel) => <a key={channel.label} href={channel.href} className="rounded-xl border border-white/15 bg-white/5 p-5 transition hover:border-[#72e6ff]"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#72e6ff]">{channel.label}</p><p className="mt-3 break-words text-sm text-white">{channel.value}</p></a>)}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
