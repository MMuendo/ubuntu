import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileDown, MessageSquareText, NotebookPen, Upload } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { projectShowcase } from "@/src/data";
import { ubuntuProjects } from "@/lib/academy/catalog";
import { CourseBadgeRow, DetailCTA, DetailList, PageHero, SectionTitle } from "@/components/site-kit";
import { getProjectBriefs } from "@/lib/db/loaders";
import { getCurrentUser, hasRole } from "@/lib/auth/session";

import { ProjectSubmissionForm } from "./project-submission-form";

export function generateStaticParams() {
  return ubuntuProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const [projects, user] = await Promise.all([getProjectBriefs(), getCurrentUser()]);
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const related = projectShowcase.slice(0, 3);
  const signedInLearner = hasRole(user, "learner", ["active"]);
  const hasDataset = Boolean(project.datasetHref);
  const hasTask = Boolean(project.taskHref || project.walkthroughHref);

  return (
    <SiteShell>
      <PageHero
        eyebrow={project.track || "Project brief"}
        title={project.title}
        copy={project.summary}
        primaryAction={
          signedInLearner && hasDataset ? (
            <Button asChild variant="accent">
              <Link href={project.datasetHref}>
                <FileDown size={16} />
                Download dataset
              </Link>
            </Button>
          ) : (
            <Button asChild variant="accent">
              <Link href={signedInLearner ? "#submit" : `/login?role=student&next=${encodeURIComponent(`/projects/${project.slug}`)}`}>
                {signedInLearner ? "Submit work" : "Log in for access"}
              </Link>
            </Button>
          )
        }
        secondaryAction={
          <Button asChild variant="outline">
            <Link href={signedInLearner && hasTask ? project.taskHref || project.walkthroughHref : "/projects"}>
              {signedInLearner && hasTask ? "Open task guide" : "Back to projects"}
            </Link>
          </Button>
        }
        stats={[
          { icon: Upload, label: "deliverables", value: project.deliverables.length },
          { icon: NotebookPen, label: "rubric areas", value: project.rubric.length },
          { icon: MessageSquareText, label: "level", value: project.level },
          { icon: ArrowRight, label: "time", value: project.estimatedTime || "Flexible" }
        ]}
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <Badge tone="red">{project.company}</Badge>
                <Badge tone="default">{project.companyTag || "Submission ready"}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.learningOutcome ? (
                <div className="rounded-xl bg-[#f1f5f9] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">What you learn</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{project.learningOutcome}</p>
                </div>
              ) : null}
              <p className="text-sm font-semibold text-neutral-950">Deliverables</p>
              <CourseBadgeRow items={project.deliverables} />
              <p className="text-sm font-semibold text-neutral-950">Scoring rubric</p>
              <CourseBadgeRow items={project.rubric} />
              {project.skills?.length ? (
                <>
                  <p className="text-sm font-semibold text-neutral-950">Skills practiced</p>
                  <CourseBadgeRow items={project.skills} />
                </>
              ) : null}
              <p className="text-sm leading-6 text-neutral-600">{project.feedback}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-neutral-950">How submissions are judged</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailList
                items={[
                  project.dataSource ? `Data source: ${project.dataSource}` : "Use the project brief and any supplied datasets.",
                  "Accuracy of the analysis and any calculations.",
                  "Whether the recommendation is specific and useful.",
                  "How clearly the learner explains the decision.",
                  "Whether the output feels ready for a hiring manager."
                ]}
              />
              <div className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600">
                <p className="font-semibold text-neutral-950">Score bands</p>
                <div className="mt-3 grid gap-2">
                  {project.scoreBands.map((band) => (
                    <div key={band}>{band}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="submit" className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Submit</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1e1616]">Send your work for review.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Submit a shareable artifact link so a mentor can review your workbook, dashboard, notebook, or written recommendation.
            </p>
          </div>
          <Card>
            <CardContent className="p-5">
              {signedInLearner ? (
                <ProjectSubmissionForm projectSlug={project.slug} />
              ) : (
                <div className="space-y-4">
                  <p className="text-sm leading-6 text-slate-600">Log in as a learner to submit work for this project.</p>
                  <Button asChild variant="accent">
                    <Link href={`/login?role=student&next=${encodeURIComponent(`/projects/${project.slug}`)}`}>Log in to submit</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Related proof"
            title="Strong submissions surface here"
            copy="These cards show what the finished work should feel like once the project has been scored."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Card key={item.id}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-neutral-950">{item.title}</p>
                      <p className="text-xs text-neutral-500">{item.learner}</p>
                    </div>
                    <Badge tone={item.score >= 92 ? "green" : item.score >= 88 ? "teal" : "amber"}>{item.score}%</Badge>
                  </div>
                  <p className="text-sm leading-6 text-neutral-600">{item.summary}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/projects/showcase">See showcase</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <DetailCTA href="/projects/showcase" label="Open showcase" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

