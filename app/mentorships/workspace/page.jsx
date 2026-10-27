import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";
import { getProjectBriefs } from "@/lib/db/loaders";
import { ProjectSubmissionForm } from "@/app/projects/[slug]/project-submission-form";

export const dynamic = "force-dynamic";

export default async function MentorshipWorkspacePage() {
  if (!hasDatabaseEnv()) return <SiteShell><section className="mx-auto max-w-5xl px-4 py-16"><h1 className="text-3xl font-semibold">Mentorship workspace</h1><p className="mt-3 text-slate-600">Connect PostgreSQL to use accounts, payments, and project submissions.</p></section></SiteShell>;
  const user = await requireUser({ role: "learner", redirectTo: "/mentorships/workspace" });
  const [applications, submissions, projects] = await Promise.all([
    query("select id, tool, topic, tier, format, project_slug, approved_session_count from mentorship_applications where user_id = $1 and status = 'paid' order by created_at desc", [user.id]),
    query(`select pb.slug, ps.status, ps.submitted_at from project_submissions ps
           join project_briefs pb on pb.id = ps.project_id where ps.learner_id = $1`, [user.id]),
    getProjectBriefs()
  ]);
  const projectBySlug = new Map(projects.map((project) => [project.slug, project]));
  const submissionBySlug = new Map(submissions.rows.map((submission) => [submission.slug, submission]));
  return <SiteShell><section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
    <Link href="/mentorships" className="text-sm font-semibold text-[#007c97]">← Mentorship</Link>
    <h1 className="mt-5 text-4xl font-semibold text-[#1e1616]">Your mentorship work</h1>
    <p className="mt-3 text-slate-600">Build your assigned project, submit a shareable link, and keep your proof in one place.</p>
    {applications.rows.length ? <div className="mt-8 grid gap-6">{applications.rows.map((application) => {
      const project = projectBySlug.get(application.project_slug);
      const submission = submissionBySlug.get(application.project_slug);
      return <Card key={application.id}><CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-3"><Badge tone="teal">{application.tier}</Badge><span className="text-sm text-slate-600">{[application.tool, application.topic].filter(Boolean).join(" · ")}</span></div>
        <h2 className="mt-4 text-2xl font-semibold">{project?.title || "Project assignment pending"}</h2>
        {project ? <>
          <p className="mt-2 text-sm leading-6 text-slate-600">{project.summary}</p>
          <p className="mt-4 text-sm"><strong>Deliverables:</strong> {project.deliverables.join(" · ")}</p>
          <div className="mt-5 flex flex-wrap gap-3">{project.datasetHref && <Button asChild variant="outline" size="sm"><Link href={project.datasetHref}>Download dataset</Link></Button>}{submission && (project.walkthroughHref || project.taskHref) && <Button asChild variant="outline" size="sm"><Link href={project.walkthroughHref || project.taskHref}>Open worked walkthrough</Link></Button>}</div>
          <div className="mt-6 border-t border-slate-200 pt-5"><h3 className="font-semibold">Submit your solution</h3><p className="mt-1 text-sm text-slate-600">Share a link to your workbook, dashboard, notebook, or write-up. The worked walkthrough appears after submission.</p><div className="mt-4"><ProjectSubmissionForm projectSlug={project.slug} /></div>{submission && <p className="mt-3 text-sm text-[#007c97]">Last submitted: {new Date(submission.submitted_at).toLocaleDateString("en-KE")}</p>}</div>
        </> : <p className="mt-2 text-sm text-slate-600">Your mentor will confirm the first brief before you start.</p>}
      </CardContent></Card>;
    })}</div> : <Card className="mt-8"><CardContent className="p-6"><p className="font-semibold">No paid mentorship yet.</p><p className="mt-2 text-sm text-slate-600">Apply, wait for review, then pay for the confirmed offer to open your project work.</p><Button asChild variant="accent" className="mt-4"><Link href="/mentorships/apply">View applications</Link></Button></CardContent></Card>}
  </section></SiteShell>;
}
