import Link from "next/link";
import { BarChart3, FileDown, MessageSquareText, NotebookPen, Sparkles, Upload } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { reviewQueue } from "@/src/data";
import { DetailList, PageHero, ProjectBriefCard, QuickStat, SectionTitle } from "@/components/site-kit";
import { getProjectBriefs } from "@/lib/db/loaders";
import { getCurrentUser } from "@/lib/auth/session";

const trackLabels = {
  excel: "Excel",
  powerbi: "Power BI",
  "ai-mastery": "AI Fluency",
  "ai-agents": "Agentic AI",
  "practice-labs": "Practice Labs"
};

function groupByTrack(projects) {
  return projects.reduce((groups, project) => {
    const track = project.track || "practice-labs";
    groups[track] = groups[track] || [];
    groups[track].push(project);
    return groups;
  }, {});
}

export default async function ProjectsPage() {
  const [projectBriefs, user] = await Promise.all([getProjectBriefs(), getCurrentUser()]);
  const signedIn = Boolean(user);
  const groupedProjects = groupByTrack(projectBriefs);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Project workspace"
        title="Download, build, submit, score"
        copy="Projects use familiar markets, practical datasets, clear rubrics, and feedback hiring managers can read."
        variant="heritage"
        primaryAction={
          <Button asChild variant="accent">
            <Link href="/projects/showcase">Open showcase</Link>
          </Button>
        }
        secondaryAction={
          <Button asChild variant="outline">
            <Link href="/pathways">Open pathways</Link>
          </Button>
        }
        stats={[
          { icon: Upload, label: "briefs", value: projectBriefs.length },
          { icon: FileDown, label: "tracks", value: Object.keys(groupedProjects).length },
          { icon: MessageSquareText, label: "feedback", value: "Live" },
          { icon: Sparkles, label: "scored", value: reviewQueue.length }
        ]}
      />

      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-slate-200 bg-[#f1f5f9] shadow-sm">
            <img
              src="/images/ubuntu-project-workspace.png"
              alt="Ubuntu Academy project workspace with dashboards, briefs, and mentor feedback"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1616]/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-[#1e1616]/88 p-4 text-white backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#00b4d8]">Project proof</p>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-100">
                Local briefs, datasets, rubrics, and mentor notes make each project easier to inspect and trust.
              </p>
            </div>
          </div>

          <Card className="border-slate-200">
            <CardContent className="grid h-full content-center gap-4 p-5">
              <span className="flex size-11 items-center justify-center rounded-md bg-[#1e1616] text-[#00b4d8]">
                <BarChart3 size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">Project workbench</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1e1616]">Briefs, datasets, rubrics, and mentor review in one flow.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Learners move from a real business prompt into an artifact scored on accuracy, decision quality, and communication.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Briefs"
            title="Project briefs grouped by track"
            copy="Excel, Power BI, AI Fluency, Agentic AI, and Practice Labs now share one submission and review model."
          />

          <div className="mt-10 grid gap-6">
            {Object.entries(groupedProjects).map(([track, projects]) => (
              <div key={track}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">{trackLabels[track] || track}</p>
                    <h3 className="mt-1 text-xl font-semibold text-[#1e1616]">{projects.length} briefs</h3>
                  </div>
                  {!signedIn ? (
                    <Button asChild variant="outline" size="sm">
                      <Link href="/login?role=student">Log in for files</Link>
                    </Button>
                  ) : null}
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {projects.map((project) => (
                    <ProjectBriefCard key={project.slug} project={project} signedIn={signedIn} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Card>
            <CardContent className="space-y-5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Submission flow</p>
              <h2 className="text-2xl font-semibold text-neutral-950">Users submit work, mentors score it, hiring managers read the output.</h2>
              <DetailList
                items={[
                  "Download a dataset and walkthrough from the brief.",
                  "Complete the notebook, workbook, or dashboard.",
                  "Submit the file set for rubric scoring and feedback."
                ]}
              />
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-sm font-semibold text-neutral-950">What gets scored</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Accuracy, decision quality, clarity, and whether the final answer looks like work a manager can trust.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardContent className="space-y-4 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Recent scoring</p>
                {reviewQueue.slice(0, 3).map((review) => (
                  <div key={review.id} className="rounded-xl border border-slate-200 bg-[#f1f5f9] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-neutral-950">{review.learner}</p>
                        <p className="text-xs text-neutral-500">{review.project}</p>
                      </div>
                      <span className="text-lg font-semibold text-neutral-950">{review.score}%</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{review.issue}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <QuickStat icon={NotebookPen} label="rubric" value="4 parts" />
              <QuickStat icon={MessageSquareText} label="feedback style" value="Actionable" />
              <QuickStat icon={Sparkles} label="manager signal" value="Visible" />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

