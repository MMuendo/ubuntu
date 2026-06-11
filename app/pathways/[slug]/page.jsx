import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, BriefcaseBusiness, Clock3, ExternalLink, MessageCircle, Sparkles, Users2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ubuntuCourses } from "@/lib/academy/catalog";
import { CourseBadgeRow, DetailCTA, DetailList, PageHero, SectionTitle } from "@/components/site-kit";
import { getAcademyPrograms } from "@/lib/db/loaders";
import { checkoutHref } from "@/lib/academy/checkout-links";
import { contactChannels } from "@/lib/academy/site-content";

export function generateStaticParams() {
  return ubuntuCourses.map((program) => ({ slug: program.slug }));
}

function formatStartDate(value) {
  if (!value) return "To be announced";
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });
}

function hasDiscount(program) {
  return Number(program.oldPriceKes || 0) > Number(program.priceKes || 0);
}

const coachProfile = {
  name: "Ezra Muinde",
  title: "Data Scientist At Naivas",
  company: "Founder of Ubuntu Analytiq",
  location: "Nairobi, Kenya",
  avatar: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#0e7490"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#ffffff">EM</text></svg>'
  )}`,
  bio:
    "Ezra coaches learners using practical data, analytics, and AI systems experience from retail, training, founder work, and live community programs.",
  linkedin: "https://www.linkedin.com/in/ezra-muinde-ba8a5263/",
  proof: [
    "Data Scientist at Naivas",
    "Founder of Ubuntu Analytiq",
    "Masterminded Phoenix Analytics AI Agents Summit 2025",
    "Hosted over 6 webinars on Agentic AI",
    "Panelist at over 7 events"
  ],
  stats: [
    { label: "Mentees", value: "13", detail: "currently mentoring on Data & AI" },
    { label: "Agentic AI", value: "80+", detail: "students trained" },
    { label: "Excel & Power BI", value: "150+", detail: "students trained" }
  ]
};

function LearningJourneyTable({ schedule }) {
  return (
    <div className="space-y-5">
      {schedule.map((week) => (
        <div key={week.theme} className="overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-[#1e1616] px-4 py-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#72e6ff]">{week.theme}</h3>
          </div>
          <div className="grid gap-3 bg-slate-50 p-3 md:hidden">
            {week.sessions.map((session) => (
              <article key={`${week.theme}-${session.lesson}`} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  <span className="rounded-md bg-[#e8f8fb] px-2 py-1 text-[#007c97]">Lesson {session.lesson}</span>
                  <span>{session.date}</span>
                  <span>{session.time}</span>
                </div>
                <h4 className="mt-3 text-base font-semibold text-neutral-950">{session.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{session.description}</p>
              </article>
            ))}
          </div>
          <div className="hidden md:block">
            <table className="w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                <tr>
                  <th scope="col" className="w-20 px-4 py-3">Lesson</th>
                  <th scope="col" className="w-28 px-4 py-3">Date</th>
                  <th scope="col" className="w-32 px-4 py-3">Time</th>
                  <th scope="col" className="px-4 py-3">What You Will Learn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {week.sessions.map((session) => (
                  <tr key={`${week.theme}-${session.lesson}`} className="align-top">
                    <td className="px-4 py-4 font-semibold text-slate-700">{session.lesson}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600">{session.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600">{session.time}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-neutral-950">{session.title}</p>
                      <p className="mt-1 leading-6 text-slate-600">{session.description}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function PathwayDetailPage({ params }) {
  const { slug } = await params;
  const programs = await getAcademyPrograms();
  const program = programs.find((item) => item.slug === slug);

  if (!program) {
    notFound();
  }

  const enrollHref = checkoutHref({
    productType: "course",
    productSlug: program.slug,
    productName: program.title,
    amountKes: program.priceKes,
    description: program.summary
  });
  const hasJourneySchedule = Array.isArray(program.journeySchedule) && program.journeySchedule.length > 0;
  const isAgenticMasterclass = program.slug === "ai-agents-masterclass";
  const chatHref = contactChannels.find((channel) => channel.label === "WhatsApp")?.href || "/mentorships";
  const heroStats = [
    { icon: Clock3, label: "duration", value: program.duration },
    isAgenticMasterclass ? null : { icon: Award, label: "level", value: program.level },
    { icon: Users2, label: "coach", value: coachProfile.name.split(" ")[0] },
    { icon: Sparkles, label: "price", value: `KES ${program.priceKes.toLocaleString()}` }
  ].filter(Boolean);

  return (
    <SiteShell>
      <PageHero
        eyebrow={isAgenticMasterclass ? "" : program.category}
        title={program.title}
        copy={program.summary}
        supportingCopy={isAgenticMasterclass ? program.heroSubtitle : ""}
        primaryAction={
          <Button asChild variant="accent" className="w-full sm:w-auto">
            <Link href={enrollHref}>Enroll</Link>
          </Button>
        }
        secondaryAction={
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a href={chatHref}>
              Chat with Ezra
              <MessageCircle size={16} />
            </a>
          </Button>
        }
        stats={heroStats}
        mobileCompact
      />

      <section className="kenya-watermark py-10 sm:py-16">
        <div className={`mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:px-8 ${hasJourneySchedule ? "" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
          <Card className="border-[#00b4d8]/20 shadow-sm">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Badge tone="teal">Coach Profile</Badge>
                <Badge tone="default">Data & AI</Badge>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                  src={coachProfile.avatar}
                  alt={coachProfile.name}
                  className="size-14 rounded-2xl object-cover ring-1 ring-neutral-200 sm:size-16"
                />
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-neutral-950">{coachProfile.name}</h2>
                  <p className="text-sm text-neutral-600">
                    {coachProfile.title} · {coachProfile.company} · {coachProfile.location}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{coachProfile.bio}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {coachProfile.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-3">
                    <p className="text-2xl font-semibold leading-none text-neutral-950">{stat.value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-cyan-800">{stat.label}</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-600">{stat.detail}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-950">
                  <BriefcaseBusiness size={16} />
                  What Ezra has done
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {coachProfile.proof.map((item) => (
                    <div key={item} className="rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
                      {item}
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <a href={coachProfile.linkedin} target="_blank" rel="noreferrer">
                    View LinkedIn Profile
                    <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-950">
                {hasJourneySchedule ? "YOUR LEARNING JOURNEY- Session Schedule" : "What This Pathway Covers"}
              </p>
              {hasJourneySchedule ? <LearningJourneyTable schedule={program.journeySchedule} /> : <DetailList items={program.outcomes} />}
              <CourseBadgeRow items={program.tools} />
            </CardContent>
          </Card>

          <div className={`grid gap-4 ${hasJourneySchedule ? "lg:grid-cols-3" : ""}`}>
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-neutral-950">Modules</h3>
              </CardHeader>
              <CardContent>
                <DetailList items={program.modules} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-neutral-950">Start Date</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl bg-[#e8f8fb] p-4">
                  <p className="text-lg font-semibold text-neutral-950">{formatStartDate(program.startDate)}</p>
                  <p className="mt-1 text-sm text-neutral-600">{program.schedule || "Schedule will be confirmed before enrollment."}</p>
                </div>
                {hasDiscount(program) ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Priority offer</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-white px-2.5 py-1 text-sm font-bold text-red-600 line-through decoration-red-600 decoration-2">Was KES {program.oldPriceKes.toLocaleString()}</span>
                      <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-sm font-bold text-white shadow-sm">Now KES {program.priceKes.toLocaleString()}</span>
                    </div>
                  </div>
                ) : null}
                <Button asChild variant="accent" className="w-full">
                  <Link href={enrollHref}>
                    Enroll in this course
                    <Sparkles size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-neutral-950">Projects</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {program.projects.map((project) => (
                  <div key={project} className="rounded-xl bg-neutral-50 p-3 text-sm text-neutral-700">
                    {project}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Market fit"
            title="Demand and roles"
            copy="See where this pathway fits in local teams, markets, and practical work."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-3 p-5">
                <p className="text-sm font-semibold text-neutral-950">Roles</p>
                <CourseBadgeRow items={program.roles} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3 p-5">
                <p className="text-sm font-semibold text-neutral-950">Demand areas</p>
                <CourseBadgeRow items={program.demand} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3 p-5">
                <p className="text-sm font-semibold text-neutral-950">Next move</p>
                <p className="text-sm leading-6 text-neutral-600">
                  Enroll when the pathway matches the work, decisions, or systems you want to build.
                </p>
                <DetailCTA href={enrollHref} label="Enroll" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

