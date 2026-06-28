import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, DatabaseZap, FileBadge2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/site-kit";
import { academyEvents, blogPosts } from "@/lib/academy/site-content";
import { resourceGroups } from "@/lib/academy/strategy-content";

const resourceIcons = {
  Events: CalendarDays,
  Blogs: BookOpenText,
  Projects: FileBadge2,
  Assessment: DatabaseZap
};

export const metadata = {
  title: "Resources and Community",
  description:
    "Ubuntu Analytiq events, blogs, projects, assessments, and community resources for Data and AI learning, AI advisory, AI solutions, and automation.",
  keywords: [
    "Data and AI events",
    "AI advisory resources",
    "AI automation resources",
    "data analytics projects",
    "AI learning community Kenya"
  ]
};

export default function ResourcesPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">Resources</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Events, ideas, and proof for African Data & AI work.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Learn through live sessions, practical writing, market-facing projects, and assessments that help people and organizations choose the right next step.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/academy#events">
                  View events
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/blogs">Read blogs</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {resourceGroups.map((group) => {
              const Icon = resourceIcons[group.title] || BookOpenText;
              return (
                <Link key={group.title} href={group.href} className="rounded-lg border border-white/10 bg-white/8 p-4 transition hover:border-[#00b4d8] hover:bg-white/12">
                  <Icon size={20} className="text-[#00b4d8]" />
                  <h2 className="mt-3 font-semibold text-white">{group.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{group.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg kenya-watermark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Events"
            title="Live learning and advisory sessions."
            copy="Join practical sessions where learners, builders, and organizations test ideas before turning them into capability."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {academyEvents.filter((event) => event.href).slice(-3).map((event) => (
              <Card key={event.id} className="ubuntu-intel-card">
                <CardContent className="flex h-full flex-col p-5">
                  <Badge tone={event.status === "Coming Soon" ? "teal" : "default"} className="w-fit">{event.status}</Badge>
                  <h2 className="mt-4 text-lg font-semibold text-[#1e1616]">{event.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{event.summary}</p>
                  <Button asChild variant="outline" className="mt-auto">
                    <Link href={event.href}>View event</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="ubuntu-dark-panel py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Writing"
            title="Thought leadership without losing the ground."
            copy="Read practical thinking on tools, systems, strategy, work, and African market context."
            tone="dark"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/blogs/${post.id}`} className="rounded-lg border border-white/10 bg-white/8 p-5 transition hover:border-[#00b4d8] hover:bg-white/12">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#00b4d8]">{post.date}</p>
                <h2 className="mt-3 text-lg font-semibold text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
