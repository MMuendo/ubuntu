import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  DatabaseZap,
  FolderKanban,
  GraduationCap,
  Handshake,
  Images,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Workflow,
  UsersRound
} from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CourseBadgeRow, QuickStat, SectionTitle } from "@/components/site-kit";
import { DataAIConsultations } from "@/components/lead-capture-modal";
import { checkoutHref } from "@/lib/academy/checkout-links";
import { getAcademyPrograms, getMentorProfiles, getProjectBriefs } from "@/lib/db/loaders";
import { contactChannels, mentorshipCohort, testimonials, trustedOrganizations, ubuntuFocusAreas } from "@/lib/academy/site-content";
import { strategicPillars } from "@/lib/academy/strategy-content";

export const metadata = {
  title: "African AI Advisory, AI Solutions, and Data & AI Training",
  description:
    "Ubuntu Analytiq helps African organizations adopt AI responsibly, build agentic AI solutions, automate reporting, and train teams in Excel, Power BI, Data Analytics, and AI.",
  keywords: [
    "AI advisory Africa",
    "AI advisory Kenya",
    "AI solutions Kenya",
    "agentic AI automation",
    "Data and AI training",
    "Power BI training Kenya",
    "Excel training Kenya",
    "AI agents masterclass",
    "responsible AI adoption"
  ]
};

function DataWordmark() {
  const operatingFlow = [
    { label: "Context scan", detail: "Market, workflow, data, risk" },
    { label: "Responsible roadmap", detail: "Use cases, controls, team adoption" },
    { label: "Agentic build", detail: "Automation, RAG, WhatsApp, reporting" },
    { label: "Capability loop", detail: "Academy, projects, proof, review" }
  ];

  return (
    <div className="data-wordmark relative overflow-hidden rounded-lg border border-white/10 p-5 text-white shadow-[0_24px_70px_rgba(30,22,22,0.28)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00b4d8] via-white/55 to-[#00b4d8]" />
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_20%_20%,rgba(0,180,216,0.22),transparent_28%),radial-gradient(circle_at_88%_62%,rgba(255,255,255,0.14),transparent_30%)]" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#00b4d8]">
            Ubuntu operating model
          </span>
        </div>

        <div className="pt-7">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">African AI adoption</p>
          <h2 className="mt-3 max-w-md text-4xl font-black leading-[0.98] tracking-tight md:text-5xl">
            Scan. Build. Train. Prove.
          </h2>
          <div className="mt-7 grid gap-3">
            {operatingFlow.map((item, index) => (
              <div key={item.label} className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/8 p-3 backdrop-blur transition hover:border-[#00b4d8]/70 hover:bg-white/12">
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#00b4d8]" style={{ opacity: 0.35 + index * 0.14 }} />
                <div className="flex items-start gap-3 pl-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#00b4d8] text-xs font-black text-[#1e1616]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactIcon({ label }) {
  if (label === "Phone") return <Phone size={20} />;
  if (label === "WhatsApp") return <MessageCircle size={20} />;
  if (label === "Email") return <Mail size={20} />;
  return <MapPin size={20} />;
}

function FocusIcon({ title }) {
  if (title === "Mentorship") return <Handshake size={18} />;
  if (title === "Training") return <GraduationCap size={18} />;
  if (title === "Projects") return <FolderKanban size={18} />;
  return <DatabaseZap size={18} />;
}

function PillarIcon({ title }) {
  if (title === "AI Advisory") return <ShieldCheck size={20} />;
  if (title === "AI Solutions") return <Bot size={20} />;
  return <GraduationCap size={20} />;
}

const pathRoutes = [
  {
    title: "For organizations",
    href: "/for-organizations",
    label: "Adopt AI with control",
    detail: "Readiness, governance, automation, and team training."
  },
  {
    title: "For learners",
    href: "/academy",
    label: "Learn Data & AI",
    detail: "Excel, Power BI, AI Fluency, Agentic AI, SQL, Python."
  },
  {
    title: "For builders",
    href: "/solutions",
    label: "Build AI workflows",
    detail: "Agents, reporting automation, RAG, WhatsApp workflows."
  }
];

function StrategicPillars() {
  return (
    <section className="ubuntu-heritage-bg py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">The Ubuntu model</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1e1616] md:text-4xl">
              One operating system, three doors.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Choose the entry point that matches the work in front of you: adopt AI responsibly, build practical systems, or grow Data & AI capability through the Academy.
            </p>
            <div className="mt-6 grid gap-3">
              {pathRoutes.map((route) => (
                <Link key={route.title} href={route.href} className="ubuntu-route-card group rounded-lg p-4 transition duration-200">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">{route.title}</p>
                      <h3 className="mt-1 font-semibold text-[#1e1616]">{route.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{route.detail}</p>
                    </div>
                    <ArrowRight size={17} className="mt-1 shrink-0 text-[#00b4d8] transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-[#1e1616]/10 bg-[#1e1616] p-4 text-white shadow-[0_22px_60px_rgba(30,22,22,0.2)]">
            <div className="absolute inset-0 opacity-20 african-weave" />
            <div className="relative">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Ubuntu Intelligence System</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">From adoption question to market proof.</h3>
                </div>
                <span className="w-fit rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-3 py-1 text-xs font-semibold text-[#72e6ff]">Context-led</span>
              </div>
              <div className="mt-5 grid gap-3">
                {strategicPillars.map((pillar, index) => (
                  <Link key={pillar.title} href={pillar.href} className="ubuntu-node group relative grid gap-4 rounded-lg p-4 transition hover:border-[#00b4d8]/70 hover:bg-white/12 md:grid-cols-[auto_1fr_auto] md:items-center">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-md bg-[#00b4d8] text-[#1e1616]">
                        <PillarIcon title={pillar.title} />
                      </span>
                      <span className="hidden h-px w-10 bg-gradient-to-r from-[#00b4d8] to-transparent md:block" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-white/10 px-2 py-1 text-xs font-bold text-[#72e6ff]">0{index + 1}</span>
                        <h4 className="font-semibold text-white">{pillar.title}</h4>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{pillar.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:max-w-[190px] md:justify-end">
                      {pillar.proof.slice(0, 2).map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UbuntuFocusSlider() {
  const focusSlides = [...ubuntuFocusAreas, ubuntuFocusAreas[0]];

  return (
    <section className="ubuntu-solid-bg overflow-hidden border-b border-slate-200 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Ubuntu work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Mentor, train, build, and generate proof.</h2>
          </div>
          <Button asChild variant="outline" className="w-fit border-white/15 bg-white/5 text-white hover:bg-white/10">
            <Link href="/academy">
              Open Academy
              <Images size={16} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-sm">
            <div className="ubuntu-slider-track flex">
              {focusSlides.map((item, index) => (
                <Link
                  key={`${item.title}-${index}`}
                  href={item.title === "AI Datasets" ? "/datasets" : item.title === "Projects" ? "/projects" : item.title === "Mentorship" ? "/mentorships" : "/academy"}
                  className="group relative h-[420px] w-full shrink-0 overflow-hidden"
                >
                  <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1e1616] via-[#1e1616]/70 to-[#1e1616]/15" />
                  <div className="absolute inset-y-0 left-0 flex max-w-2xl flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <span className="inline-flex size-10 items-center justify-center rounded-md bg-[#00b4d8] text-[#1e1616]">
                      <FocusIcon title={item.title} />
                    </span>
                    <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{item.title}</h3>
                    <p className="mt-4 text-base leading-7 text-slate-200 md:text-lg md:leading-8">{item.copy}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedOrganizations() {
  return (
    <section className="ubuntu-heritage-bg border-y border-[#00b4d8]/16 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Proof across markets</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1e1616] md:text-4xl">
              Companies and communities we have worked with.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Ubuntu sits where advisory, solutions, and training meet: helping teams improve reporting, build AI capability, and turn context into usable systems.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {trustedOrganizations.map((organization) => (
              <div key={organization.name} className="ubuntu-intel-card rounded-xl p-4">
                <div className="flex min-h-24 items-center justify-center rounded-lg border border-[#00b4d8]/12 bg-white/82 p-4">
                  <img
                    src={organization.logo}
                    alt={organization.alt}
                    className="max-h-16 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[#1e1616]">{organization.name}</h3>
                    <span className="ubuntu-chip rounded-full px-2.5 py-1 text-xs font-semibold">{organization.focus}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{organization.proof}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [mentorProfiles, academyPrograms, projectBriefs] = await Promise.all([
    getMentorProfiles(),
    getAcademyPrograms(),
    getProjectBriefs()
  ]);

  const featuredMentors = mentorProfiles.slice(0, 6);
  const featuredPathways = academyPrograms.slice(0, 4);
  const featuredProjects = projectBriefs.slice(0, 4);

  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark overflow-hidden border-b border-[#00b4d8]/20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center lg:pt-2">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
              Context-led AI for African markets
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              African AI adoption, built from context.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              We help organizations adopt AI responsibly, build practical agentic systems, and develop Data & AI talent for the markets we actually serve.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/for-organizations">
                  For organizations
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/8 text-white hover:bg-white/14">
                <Link href="/academy">Explore Academy</Link>
              </Button>
            </div>
          </div>

          <DataWordmark />
        </div>
      </section>

      <section className="ubuntu-heritage-bg py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          <QuickStat icon={UsersRound} label="mentors" value={mentorProfiles.length} />
          <QuickStat icon={BookOpenCheck} label="courses" value={academyPrograms.length} />
          <QuickStat icon={FolderKanban} label="projects" value={projectBriefs.length} />
          <QuickStat icon={Workflow} label="advisory paths" value="4" />
        </div>
      </section>

      <StrategicPillars />

      <section className="ubuntu-heritage-bg border-y border-[#00b4d8]/16 py-12" id="working-with-data">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Card className="ubuntu-intel-card">
            <CardContent className="p-6">
              <Badge tone="teal">Limited offer</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1e1616]">Data & AI Fluency for Business Leaders</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                A practical course for professionals who handle reports, spreadsheets, dashboards, and AI-generated answers but are not trying to become technical analysts.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-600 line-through">KES 12,500</span>
                <span className="rounded-md bg-[#1e1616] px-3 py-2 text-sm font-semibold text-white">KES 10,000</span>
                <span className="rounded-md bg-[#00b4d8] px-3 py-2 text-sm font-semibold text-[#1e1616]">Classes start 6th July</span>
                <span className="rounded-md border border-[#1e1616]/10 bg-white px-3 py-2 text-sm font-semibold text-[#1e1616]">10 slots only</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild variant="accent" className="w-fit">
                  <Link href={checkoutHref({
                    productType: "course",
                    productSlug: "data-fluency-for-operators-and-managers",
                    productName: "Data & AI Fluency for Business Leaders",
                    amountKes: 10000,
                    description: "Practical data confidence for professionals who work with reports, dashboards, spreadsheets, and AI outputs."
                  })}>
                    Enroll
                    <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-fit bg-white">
                  <Link href="/pathways/data-fluency-for-operators-and-managers">
                    View course
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Link id="cohort-2" href={mentorshipCohort.href} className="block">
            <Card className="ubuntu-solid-bg h-full border-[#00b4d8]/18 text-white transition hover:-translate-y-0.5 hover:border-[#00b4d8]">
              <CardContent className="p-6">
                <Badge tone="teal" className="border-white/10 bg-white/10 text-[#00b4d8]">Cohort 2</Badge>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight">{mentorshipCohort.title}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <p className="rounded-md bg-white/8 p-3 text-sm"><span className="font-semibold text-[#00b4d8]">{mentorshipCohort.price}</span><br />Intro Price</p>
                  <p className="rounded-md bg-white/8 p-3 text-sm"><span className="font-semibold text-[#00b4d8]">{mentorshipCohort.duration}</span><br />Mentorship</p>
                  <p className="rounded-md bg-white/8 p-3 text-sm"><span className="font-semibold text-[#00b4d8]">{mentorshipCohort.startDate}</span><br />Start Date</p>
                  <p className="rounded-md bg-white/8 p-3 text-sm"><span className="font-semibold text-[#00b4d8]">{mentorshipCohort.seats}</span><br />Cohort Size</p>
                </div>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#00b4d8]">
                  More details
                  <ArrowRight size={15} />
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <UbuntuFocusSlider />

      <DataAIConsultations />

      <section className="ubuntu-heritage-bg py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Academy"
            title="Learn for the work around us."
            copy="Choose a practical path, build with familiar business problems, and turn learning into proof."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {["1. Take assessment", "2. Enroll in a course", "3. Build a project", "4. Submit for review"].map((step) => (
              <span key={step} className="rounded-md border border-[#00b4d8]/25 bg-white/85 px-3 py-2 text-xs font-semibold text-[#1e1616] shadow-sm">
                {step}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="ubuntu-light-panel">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold text-[#1e1616]">Pathways</h2>
                  <Button asChild size="sm" variant="outline"><Link href="/academy#courses">View courses</Link></Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {featuredPathways.map((program) => (
                  <Link key={program.slug} href={`/pathways/${program.slug}`} className="ubuntu-route-card block rounded-lg p-4 transition duration-200">
                    <p className="text-sm font-semibold text-[#1e1616]">{program.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{program.summary}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="ubuntu-light-panel">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold text-[#1e1616]">Projects</h2>
                  <Button asChild size="sm" variant="outline"><Link href="/projects">Open projects</Link></Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {featuredProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="ubuntu-route-card rounded-lg p-4 transition duration-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">{project.track}</p>
                    <p className="mt-2 text-sm font-semibold text-[#1e1616]">{project.title}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{project.company} - {project.estimatedTime}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="ubuntu-dark-panel border-y border-slate-200 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Mentorship"
            title="Guided by industry experts."
            copy="Mentorship is practical, project-led, and grounded in the work learners are actually trying to do."
            tone="dark"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredMentors.map((mentor) => (
              <Card key={mentor.id} className="ubuntu-intel-card border-white/10">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start gap-4">
                    <img src={mentor.avatar} alt={mentor.name} className="size-14 rounded-lg object-cover ring-1 ring-slate-200" />
                    <div>
                      <h3 className="font-semibold text-[#1e1616]">{mentor.name}</h3>
                      <p className="text-sm text-slate-600">{mentor.currentRole || mentor.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{mentor.experience} - {mentor.location}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">{mentor.bio}</p>
                  <CourseBadgeRow items={mentor.specialties.slice(0, 4)} />
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <span className="ubuntu-card-field rounded-md p-2">{mentor.availability}</span>
                    <span className="ubuntu-card-field rounded-md p-2">To Be Discussed - {mentor.mentorshipDuration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="accent" size="lg">
              <Link href="/mentorships">
                View all mentors
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge tone="teal">Datasets</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1e1616] md:text-4xl">
              Generate practice data for our markets.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Build datasets for local scenarios, business questions, and real practice.
            </p>
            <Button asChild variant="accent" className="mt-6">
              <Link href="/datasets">
                Open Datasets
                <DatabaseZap size={16} />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {["Retail", "Supply Chain", "Marketing", "Banking", "Healthcare", "Agriculture"].map((item) => (
              <div key={item} className="ubuntu-intel-card rounded-lg p-4 transition duration-200">
                <DatabaseZap size={18} className="text-[#00b4d8]" />
                <p className="mt-3 text-sm font-semibold text-[#1e1616]">{item}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">Synthetic rows, clean columns, CSV output.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustedOrganizations />

      <section className="ubuntu-dark-panel py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What Our Clients Say</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-400">
              Real results from professionals and teams who transformed with Ubuntu Analytiq.
            </p>
          </div>
          <div className="marquee mt-10 overflow-hidden">
            <div className="testimonial-track flex w-max gap-4">
              {[...testimonials, ...testimonials].map((item, index) => (
                <div key={`${item.name}-${index}`} className="w-[320px] shrink-0 rounded-lg border border-white/10 bg-white/5 p-6 md:w-[380px]">
                  <div className="flex gap-1 text-yellow-400">
                    {Array.from({ length: item.rating }).map((_, starIndex) => <Star key={starIndex} size={16} fill="currentColor" />)}
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-300">"{item.content}"</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#00b4d8] text-xs font-bold text-[#1e1616]">{item.avatar}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ubuntu-dark-panel pb-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Get in Touch</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-[1fr_1fr_1.55fr_1fr]">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="group min-w-0 rounded-lg border border-white/10 bg-white/5 p-4 transition hover:border-[#00b4d8] hover:bg-[#00b4d8]/10"
                >
                  <span className="mx-auto flex size-12 items-center justify-center rounded-md bg-[#00b4d8]/10 text-[#00b4d8] group-hover:bg-[#00b4d8] group-hover:text-[#1e1616]">
                    <ContactIcon label={channel.label} />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{channel.label}</p>
                  <p className="mt-1 break-words text-sm font-medium text-slate-300">{channel.value}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
