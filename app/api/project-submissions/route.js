import { NextResponse } from "next/server";

import { getCurrentUser, hasRole } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, message: "Project submissions are not ready yet. Please contact Ubuntu Analytiq support." }, { status: 503 });
  }

  const user = await getCurrentUser();
  if (!user || !hasRole(user, "learner", ["active"])) {
    return NextResponse.json({ ok: false, message: "Log in as a learner before submitting project work." }, { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Submission details could not be read." }, { status: 400 });
  }

  const projectSlug = clean(body.projectSlug || body.project_slug);
  const artifactUrl = clean(body.artifactUrl || body.artifact_url);

  if (!projectSlug || !artifactUrl) {
    return NextResponse.json({ ok: false, message: "Add the project and a link to your submitted artifact." }, { status: 400 });
  }

  try {
    const { rows: projectRows } = await query("select id, title from project_briefs where slug = $1 limit 1", [projectSlug]);
    const project = projectRows[0];
    if (!project) {
      return NextResponse.json({ ok: false, message: "Project brief was not found." }, { status: 404 });
    }

    const { rows } = await query(
      `insert into project_submissions (learner_id, project_id, artifact_url, status, submitted_at)
       values ($1, $2, $3, 'submitted', now())
       on conflict (learner_id, project_id) do update set
         artifact_url = excluded.artifact_url,
         status = 'submitted',
         submitted_at = now()
       returning id, status, submitted_at`,
      [user.id, project.id, artifactUrl]
    );

    return NextResponse.json({ ok: true, submission: rows[0], project: { slug: projectSlug, title: project.title } });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error.message || "Project submission could not be saved." }, { status: 400 });
  }
}
