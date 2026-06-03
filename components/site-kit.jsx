import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, PlayCircle, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PageHero({ eyebrow, title, copy, supportingCopy = "", primaryAction, secondaryAction, stats = [], variant = "default", mobileCompact = false }) {
  const sectionClass = variant === "heritage" ? "ubuntu-heritage-bg kenya-watermark border-b border-neutral-200" : "surface-grid africa-watermark border-b border-neutral-200";

  return (
    <section className={sectionClass}>
      <div className={`mx-auto grid max-w-7xl px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 ${
        mobileCompact ? "gap-6 py-10 lg:gap-10 lg:py-18" : "gap-10 py-14 lg:py-18"
      }`}>
        <div className="flex flex-col justify-center">
          {eyebrow ? (
            <Badge tone="teal" className="w-fit">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className={`${eyebrow ? "mt-6" : "mt-0"} text-balance font-semibold leading-[1.05] tracking-tight text-neutral-950 ${
            mobileCompact ? "text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          }`}>
            {title}
          </h1>
          <p className={`mt-5 max-w-2xl text-neutral-600 ${mobileCompact ? "text-base leading-7 sm:text-lg sm:leading-8" : "text-lg leading-8"}`}>{copy}</p>
          {supportingCopy ? (
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#007c97] sm:text-base">
              {supportingCopy}
            </p>
          ) : null}
          <div className={`${mobileCompact ? "mt-6" : "mt-8"} flex flex-col gap-3 sm:flex-row`}>
            {primaryAction}
            {secondaryAction}
          </div>
          {stats.length > 0 ? (
            <div className={`${mobileCompact ? "mt-6 gap-2 sm:gap-3" : "mt-8 gap-3"} grid grid-cols-2 sm:grid-cols-4`}>
              {stats.map((stat) => (
                <MetricTile key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
              ))}
            </div>
          ) : null}
        </div>

        <div className={`${mobileCompact ? "hidden md:block" : ""} rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-[#f1f5f9] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Our context</p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-950">Local problems</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Datasets, projects, and examples stay close to the markets learners know.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Need, not hype</p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-950">Build what helps</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Tools are taught through decisions, systems, and practical output.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#1e1616] p-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">Today</p>
                <p className="mt-1 text-lg font-semibold">Mentor review queue</p>
              </div>
              <Badge tone="default" className="border-white/10 bg-white/10 text-white">
                12 pending
              </Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-neutral-400">Submissions</p>
                <p className="mt-1 text-xl font-semibold">28</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-neutral-400">Healthy</p>
                <p className="mt-1 text-xl font-semibold">21</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-neutral-400">At risk</p>
                <p className="mt-1 text-xl font-semibold">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, copy, align = "left", tone = "light" }) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cyan">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-semibold tracking-tight md:text-4xl ${dark ? "text-white" : "text-neutral-950"}`}>{title}</h2>
      <p className={`mt-3 text-base leading-7 ${dark ? "text-slate-300" : "text-neutral-600"}`}>{copy}</p>
    </div>
  );
}

export function MetricTile({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
      <span className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
        {Icon ? <Icon size={17} /> : null}
      </span>
      <div>
        <p className="text-lg font-semibold leading-none text-neutral-950">{value}</p>
        <p className="mt-1 text-xs text-neutral-500">{label}</p>
      </div>
    </div>
  );
}

export function MarqueeStrip({ items, reverse = false }) {
  const trackItems = [...items, ...items];

  return (
    <div className="marquee overflow-hidden">
      <div className={`marquee-track flex w-max items-center gap-3 ${reverse ? "reverse" : ""}`}>
        {trackItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex h-10 items-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Avatar({ src, name }) {
  return (
    <img
      alt={name}
      src={src}
      className="size-14 rounded-2xl object-cover ring-1 ring-neutral-200"
      loading="lazy"
    />
  );
}

export function ProgramCard({ program }) {
  return (
    <Card className="group h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
      <Link href={`/pathways/${program.slug}`} className="flex h-full flex-col">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <Badge tone="teal">{program.category}</Badge>
            <Badge tone="default">{program.level}</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar src={program.mentor.avatar} name={program.mentor.name} />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Mentor-led</p>
                <h3 className="mt-1 text-lg font-semibold text-neutral-950">{program.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {program.mentor.name} · {program.mentor.title}
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-neutral-600">{program.summary}</p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col">
          <p className="text-sm font-semibold text-neutral-950">{program.mentor.bio}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {program.modules.slice(0, 3).map((module) => (
              <span key={module} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                {module}
              </span>
            ))}
          </div>

          <div className="mt-5 grid gap-2 text-sm text-neutral-600">
            {program.outcomes.slice(0, 2).map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={15} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
            <div>
              <p className="text-lg font-semibold text-neutral-950">KES {program.priceKes.toLocaleString()}</p>
              <p className="text-xs text-neutral-500">{program.duration}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-neutral-900">
              <PlayCircle size={16} />
              View details
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export function ProjectBriefCard({ project, signedIn = false }) {
  const hasDataset = Boolean(project.datasetHref);
  const hasTask = Boolean(project.taskHref || project.walkthroughHref);
  const initials = String(project.companyTag || project.company || project.title)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  const trackTone = {
    excel: "from-emerald-700 to-lime-800",
    powerbi: "from-amber-600 to-yellow-800",
    "ai-mastery": "from-cyan-700 to-sky-900",
    "ai-agents": "from-violet-700 to-slate-950",
    "practice-labs": "from-[#1e1616] to-cyan-900"
  }[project.track || "practice-labs"] || "from-[#1e1616] to-cyan-900";

  return (
    <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
      <CardHeader className="space-y-2 p-3">
        <div className="flex items-start gap-3">
          <div className={`relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${trackTone} text-xs font-bold text-white shadow-sm`}>
            <span className="absolute inset-0 opacity-25 african-weave" />
            <span className="relative">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge tone="red">{project.companyTag || project.company}</Badge>
              <Badge tone="default">{project.level || "Project brief"}</Badge>
            </div>
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              <Sparkles size={13} />
              {project.company}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-neutral-950">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-600">{project.summary}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-3">
        <div className="grid gap-1.5 text-sm text-neutral-700">
          {project.deliverables.slice(0, 2).map((item) => (
            <div key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={15} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {project.skills?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
                {skill}
              </span>
            ))}
          </div>
        ) : null}

        <div className="rounded-lg bg-neutral-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Scoring</p>
          <div className="mt-2 grid gap-1.5">
            {project.scoreBands.slice(0, 2).map((band) => (
              <div key={band} className="text-sm text-neutral-600">
                {band}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {signedIn && hasDataset ? (
            <Button asChild variant="accent" size="sm" className="w-full sm:w-auto">
              <Link href={project.datasetHref}>
                <Download size={14} />
                Dataset
              </Link>
            </Button>
          ) : (
            <Button asChild variant="accent" size="sm" className="w-full sm:w-auto">
              <Link href={signedIn ? `/projects/${project.slug}` : `/login?role=student&next=${encodeURIComponent(`/projects/${project.slug}`)}`}>
                {hasDataset ? "Log in for files" : "Open brief"}
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link href={signedIn && hasTask ? project.taskHref || project.walkthroughHref : `/projects/${project.slug}`}>
              {hasTask && signedIn ? "Task guide" : "View details"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ShowcaseCard({ item }) {
  return (
    <Card className="group h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">{item.pathway}</p>
            <h3 className="mt-1 text-lg font-semibold text-neutral-950">{item.title}</h3>
          </div>
          <Badge tone={item.score >= 92 ? "green" : item.score >= 88 ? "teal" : "amber"}>{item.score}%</Badge>
        </div>
        <p className="text-sm leading-6 text-neutral-600">{item.summary}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#1e1616] text-sm font-semibold text-white">
            {item.learner
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
          <div>
            <p className="text-sm font-semibold text-neutral-950">{item.learner}</p>
            <p className="text-xs text-neutral-500">{item.dataset}</p>
          </div>
        </div>

        <div className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600">
          <p className="font-medium text-neutral-950">Impact</p>
          <p className="mt-2 leading-6">{item.impact}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">{item.featuredQuote}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tools.map((tool) => (
            <span key={tool} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
              {tool}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function MentorCard({ mentor }) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar src={mentor.avatar} name={mentor.name} />
          <div className="min-w-0">
            <p className="text-lg font-semibold text-neutral-950">{mentor.name}</p>
            <p className="text-sm text-neutral-600">{mentor.title}</p>
            <p className="text-xs text-neutral-500">
              {mentor.company} · {mentor.location}
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-neutral-600">{mentor.bio}</p>

        <div className="flex flex-wrap gap-2">
          {mentor.specialties.map((specialty) => (
            <span key={specialty} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
              {specialty}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProgressPanel({ label, value }) {
  return (
    <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-neutral-700">{label}</span>
        <span className="text-neutral-500">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}

export function QuickStat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-2xl font-semibold text-neutral-950">{value}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">{label}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
          <Icon size={18} />
        </span>
      </div>
    </div>
  );
}

export function DetailList({ items }) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2 text-sm text-neutral-700">
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={15} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function CourseBadgeRow({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          {item}
        </span>
      ))}
    </div>
  );
}

export function DetailCTA({ href, label }) {
  return (
    <Button asChild variant="accent">
      <Link href={href}>
        {label}
        <ArrowRight size={16} />
      </Link>
    </Button>
  );
}
