import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Calendar, CheckCircle2, ClipboardList, Clock, FileSpreadsheet, FolderKanban, Sparkles, Video, Zap } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CourseBadgeRow, QuickStat, SectionTitle } from "@/components/site-kit";
import { getAcademyPrograms, getProjectBriefs } from "@/lib/db/loaders";
import { checkoutHref } from "@/lib/academy/checkout-links";
import { academyEvents } from "@/lib/academy/site-content";
import { AIPromptLab } from "@/components/ai-prompt-lab";

export const metadata = {
  title: "Data & AI Training in Excel, Power BI, AI Agents, SQL, and Python",
  description:
    "Practical Data & AI training for African learners and teams: Excel, Power BI, AI Fluency, Agentic AI, SQL, Python, projects, mentorship, and assessment.",
  keywords: [
    "Data and AI training",
    "Excel training Kenya",
    "Power BI training Kenya",
    "AI agents training",
    "Agentic AI MasterClass",
    "SQL for analysts",
    "Python for data analytics",
    "data analytics mentorship"
  ]
};

const trackIcons = {
  excel: FileSpreadsheet,
  powerbi: BarChart3,
  "ai-mastery": Brain,
  "ai-agents": Zap,
  "practice-labs": FolderKanban
};

const trackNames = {
  excel: "Excel",
  powerbi: "Power BI",
  "ai-mastery": "AI Fluency",
  "ai-agents": "Agentic AI",
  "practice-labs": "Practice Labs"
};

const academyFlow = [
  { label: "Assess", detail: "Find the right starting point" },
  { label: "Learn", detail: "Excel, BI, AI, SQL, Python" },
  { label: "Build", detail: "Local projects and workflows" },
  { label: "Prove", detail: "Mentor review and portfolio proof" }
];

function formatStartDate(value) {
  if (!value) return "To be announced";
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

function hasDiscount(program) {
  return Number(program.oldPriceKes || 0) > Number(program.priceKes || 0);
}

function groupByTrack(projects) {
  return projects.reduce((groups, project) => {
    const key = project.track || "practice-labs";
    groups[key] = groups[key] || [];
    groups[key].push(project);
    return groups;
  }, {});
}

export default async function AcademyPage() {
  const [programs, projects] = await Promise.all([getAcademyPrograms(), getProjectBriefs()]);
  const groupedProjects = groupByTrack(projects);
  const featuredPrograms = programs.slice(0, 4);

  return (
    <SiteShell>
      <section className="ubuntu-solid-bg kenya-watermark watermark-dark overflow-hidden border-b border-[#00b4d8]/20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-[#00b4d8]/35 bg-[#00b4d8]/10 text-[#72e6ff]">Academy</Badge>
            <h1 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Learn by building proof.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Practical courses, local projects, and guided learning built around need, not hype.
            </p>
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {academyFlow.map((step, index) => (
                <div key={step.label} className="ubuntu-node rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#00b4d8] text-xs font-black text-[#141014]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{step.label}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/assessment">
                  Take assessment
                  <Brain size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/8 text-white hover:bg-white/14">
                <Link href="#projects">Browse projects</Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <QuickStat icon={ClipboardList} label="courses" value={programs.length} />
              <QuickStat icon={FolderKanban} label="projects" value={projects.length} />
              <QuickStat icon={Sparkles} label="assessment" value="Live" />
              <QuickStat icon={CheckCircle2} label="proof" value="Built" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/8 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:min-h-[420px]">
            <img
              src="/images/ubuntu-data-workshop.png"
              alt="Ubuntu Academy data workshop"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1616]/80 via-[#1e1616]/10 to-transparent" />
            <div className="relative p-5 md:absolute md:bottom-0 md:left-0 md:right-0">
              <div className="grid gap-3 md:grid-cols-2">
                {featuredPrograms.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/pathways/${program.slug}`}
                    className="ubuntu-glass-card rounded-lg p-4 text-white transition hover:border-[#00b4d8]/60 hover:bg-white/12"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#72e6ff]">{program.category}</p>
                    <h2 className="mt-2 text-sm font-semibold text-white">{program.title}</h2>
                    {hasDiscount(program) ? (
                      <p className="mt-2 text-xs text-slate-300">
                        <span className="font-semibold text-red-600 line-through decoration-red-600 decoration-2">KES {program.oldPriceKes.toLocaleString()}</span>{" "}
                        <span className="font-bold text-[#72e6ff]">Offer KES {program.priceKes.toLocaleString()}</span> - {program.duration}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-slate-300">KES {program.priceKes.toLocaleString()} - {program.duration}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="ubuntu-dark-panel africa-watermark watermark-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Courses"
            title="Choose a course that matches your work."
            copy="Courses are built around practical business needs, local context, and guided execution."
            tone="dark"
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {["Business", "Excel", "Power BI", "AI Fluency", "Agentic AI", "SQL", "Python"].map((track) => (
              <span key={track} className="rounded-md border border-[#00b4d8]/35 bg-white/10 px-3 py-2 text-xs font-semibold text-white shadow-sm">
                {track}
              </span>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => (
              <Card key={program.slug} className="ubuntu-course-card flex h-full flex-col transition duration-200">
                <CardHeader className="space-y-2 p-4 pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone="teal">{program.category}</Badge>
                    <Badge tone="default">{program.level}</Badge>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#1e1616]">{program.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{program.summary}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3 p-4 pt-2">
                  <div className="ubuntu-card-field rounded-lg p-2.5 text-xs leading-5 text-slate-700">
                    {program.instructor} - {program.instructorTitle}
                  </div>
                  <div className="ubuntu-card-field rounded-lg p-2.5 text-xs leading-5 text-slate-700">
                    <span className="font-semibold text-[#1e1616]">Start date:</span> {formatStartDate(program.startDate)}
                  </div>
                  <CourseBadgeRow items={program.tools.slice(0, 3)} />
                  <div className="mt-auto space-y-3 border-t border-slate-100 pt-3">
                    <div>
                      {hasDiscount(program) ? (
                        <div className="ubuntu-offer-strip flex flex-wrap items-center gap-2 rounded-lg p-2.5">
                          <span className="rounded-md bg-white/75 px-2 py-1 text-xs font-bold text-red-600 line-through decoration-red-600 decoration-2">KES {program.oldPriceKes.toLocaleString()}</span>
                          <span className="rounded-md bg-[#141014] px-2.5 py-1 text-sm font-bold text-[#72e6ff] shadow-sm">Offer KES {program.priceKes.toLocaleString()}</span>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold text-[#1e1616]">KES {program.priceKes.toLocaleString()}</p>
                      )}
                      <p className="text-xs text-slate-500">{program.duration}</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button asChild variant="accent" size="sm" className="h-12 flex-1 text-sm sm:h-8 sm:text-xs">
                        <Link href={checkoutHref({
                          productType: "course",
                          productSlug: program.slug,
                          productName: program.title,
                          amountKes: program.priceKes,
                          description: program.summary
                        })}>
                          Enroll
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="h-12 flex-1 text-sm sm:h-8 sm:text-xs">
                        <Link href={`/pathways/${program.slug}`}>Curriculum</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="ubuntu-heritage-bg py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Events"
            title="Webinars and live reality checks."
            copy="Use events to sample the thinking before you enroll: practical webinars, honest career conversations, and community sessions for people learning Data and AI."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {academyEvents.map((event) => (
              <Card key={event.id} className="ubuntu-intel-card flex h-full flex-col transition duration-200">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone={event.status === "Coming Soon" ? "teal" : "default"}>{event.status}</Badge>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <Video size={14} />
                      {event.type}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#1e1616]">{event.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{event.summary}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <div className="ubuntu-card-field grid gap-2 rounded-lg p-3 text-sm text-slate-600">
                    <p className="inline-flex items-center gap-2"><Calendar size={15} className="text-[#00b4d8]" />{event.date}</p>
                    <p className="inline-flex items-center gap-2"><Clock size={15} className="text-[#00b4d8]" />{event.time} - {event.duration}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Host: {event.host}</p>
                  </div>
                  <CourseBadgeRow items={event.topics.slice(0, 4)} />
                  <div className="mt-auto">
                    {event.status === "Coming Soon" ? (
                      <Button asChild variant="accent" className="w-full">
                        <Link href={event.href}>{event.cta}</Link>
                      </Button>
                    ) : (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/academy#events`}>{event.cta}</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="ubuntu-heritage-bg py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Projects"
            title="Tracked projects from Excel to agents."
            copy="Briefs use familiar markets, useful datasets, clear deliverables, and mentor review."
          />
          <div className="mt-10 grid gap-5">
            {Object.entries(groupedProjects).map(([track, trackProjects]) => {
              const Icon = trackIcons[track] || FolderKanban;
              return (
                <div key={track} className="ubuntu-light-panel rounded-xl p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-md bg-[#1e1616] text-[#00b4d8]">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h2 className="text-xl font-semibold text-[#1e1616]">{trackNames[track] || track}</h2>
                        <p className="text-sm text-slate-500">{trackProjects.length} project briefs</p>
                      </div>
                    </div>
                    <Button asChild variant="accent" size="sm">
                      <Link href="/projects">Open all projects</Link>
                    </Button>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {trackProjects.slice(0, 4).map((project) => (
                      <Link key={project.slug} href={`/projects/${project.slug}`} className="ubuntu-route-card rounded-lg p-4 transition duration-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">{project.level}</p>
                        <h3 className="mt-2 text-sm font-semibold text-[#1e1616]">{project.title}</h3>
                        <p className="mt-2 text-xs leading-5 text-slate-600">{project.company} - {project.estimatedTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ubuntu-solid-bg border-t border-[#00b4d8]/20 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">Assessment to enrollment</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Let the learner test first, then recommend the right path.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Answer a few practical questions and get a recommended starting point across AI Fluency, Agentic AI, Excel, Power BI, SQL, or Python.
            </p>
          </div>
          <div className="flex items-center gap-3 lg:justify-end">
            <Button asChild variant="accent" size="lg">
              <Link href="/assessment">Start assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">Browse projects</Link>
            </Button>
          </div>
        </div>
      </section>
      <AIPromptLab />
    </SiteShell>
  );
}
