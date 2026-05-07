import Link from "next/link";
import { BadgeCheck, FileBadge2, ShieldCheck, Sparkles } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { academyLiveActivity, featuredLearner } from "@/src/data";
import { CourseBadgeRow, DetailList, PageHero, ProgressPanel, SectionTitle } from "@/components/site-kit";

export default function ProofPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Proof"
        title="Learner evidence in one place"
        copy="Credentials, project artifacts, and employer-readable signals stay visible instead of being hidden in separate screens."
        primaryAction={
          <Link href="/projects/showcase">
            <Badge tone="teal">Verified</Badge>
          </Link>
        }
        secondaryAction={
          <Link href="/projects">
            <Badge tone="default">Employer-ready</Badge>
          </Link>
        }
        stats={[
          { icon: BadgeCheck, label: "credentials", value: featuredLearner.credentials.length },
          { icon: Sparkles, label: "projects", value: featuredLearner.projects.length },
          { icon: ShieldCheck, label: "matches", value: featuredLearner.employerMatches },
          { icon: FileBadge2, label: "mentor", value: featuredLearner.mentor.split(" ")[0] }
        ]}
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Card>
            <CardHeader className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Featured learner</p>
              <h2 className="text-2xl font-semibold text-neutral-950">{featuredLearner.name}</h2>
              <p className="text-sm text-neutral-600">
                {featuredLearner.role} · {featuredLearner.location}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-neutral-600">{featuredLearner.summary}</p>
              <CourseBadgeRow items={featuredLearner.credentials} />
              <div className="grid gap-3 md:grid-cols-2">
                <ProgressPanel label="Excel" value={featuredLearner.skills.excel} />
                <ProgressPanel label="SQL" value={featuredLearner.skills.sql} />
                <ProgressPanel label="Power BI" value={featuredLearner.skills.powerbi} />
                <ProgressPanel label="Storytelling" value={featuredLearner.skills.storytelling} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">What employers see</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailList items={featuredLearner.strengths} />
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-sm font-semibold text-neutral-950">Risks to coach</p>
                <div className="mt-3 grid gap-2">
                  {featuredLearner.risks.map((item) => (
                    <div key={item} className="text-sm text-neutral-600">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Project trail"
            title="Proof keeps growing"
            copy="Recent activity and completed work stay easy to scan, which helps hiring managers and mentors move quickly."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredLearner.projects.map((project) => (
              <Card key={project.title}>
                <CardContent className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold text-neutral-950">{project.title}</h3>
                  <p className="text-sm leading-6 text-neutral-600">{project.summary}</p>
                  <Badge tone="default">{project.signal}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {academyLiveActivity.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-neutral-950">{item.learner}</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    {item.action} {item.item}
                  </p>
                  <p className="mt-2 text-xs text-neutral-500">{item.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
