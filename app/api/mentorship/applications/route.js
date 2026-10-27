import { NextResponse } from "next/server";
import { getCurrentUser, hasRole } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";
import { getProjectBriefs } from "@/lib/db/loaders";
import { mentorshipFormats, mentorshipTiers, mentorshipTools, mentorshipTopics } from "@/lib/mentorship/catalog";

const clean = (value, limit = 500) => String(value || "").trim().slice(0, limit);

export async function GET() {
  if (!hasDatabaseEnv()) return NextResponse.json({ ok: false, message: "Applications need the database to be connected." }, { status: 503 });
  const user = await getCurrentUser();
  if (!user || !hasRole(user, "learner")) return NextResponse.json({ ok: false, message: "Sign in as a mentee." }, { status: 401 });
  const { rows } = await query(
    `select id, tool, topic, project_slug, tier, format, status, review_notes,
            approved_price_kes, approved_session_count, offer_plan_id, created_at
     from mentorship_applications where user_id = $1 order by created_at desc limit 10`,
    [user.id]
  );
  return NextResponse.json({ ok: true, applications: rows });
}

export async function POST(request) {
  if (!hasDatabaseEnv()) return NextResponse.json({ ok: false, message: "Applications need the database to be connected." }, { status: 503 });
  const user = await getCurrentUser();
  if (!user || !hasRole(user, "learner")) return NextResponse.json({ ok: false, message: "Sign in as a mentee before applying." }, { status: 401 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, message: "Application could not be read." }, { status: 400 }); }

  const tool = clean(body.tool, 60);
  const topic = clean(body.topic, 80);
  const tier = clean(body.tier, 20);
  const format = clean(body.format, 20);
  const projectSlug = clean(body.projectSlug, 120);
  const skillLevel = clean(body.skillLevel, 50);
  const goal = clean(body.goal, 1200);
  const availability = clean(body.availability, 500);
  if ((!tool && !topic) || (tool && !mentorshipTools.includes(tool)) || (topic && !mentorshipTopics.includes(topic))) {
    return NextResponse.json({ ok: false, message: "Choose a listed tool, topic, or both." }, { status: 400 });
  }
  if (!mentorshipTiers.some((item) => item.id === tier) || !mentorshipFormats.some((item) => item.id === format)) {
    return NextResponse.json({ ok: false, message: "Choose a mentorship format and support level." }, { status: 400 });
  }
  if (!skillLevel || !goal || !availability) {
    return NextResponse.json({ ok: false, message: "Add your level, goal, and availability." }, { status: 400 });
  }
  if (projectSlug && !(await getProjectBriefs()).some((project) => project.slug === projectSlug)) {
    return NextResponse.json({ ok: false, message: "Choose a project from the list." }, { status: 400 });
  }

  try {
    const { rows } = await query(
      `insert into mentorship_applications
       (user_id, tool, topic, project_slug, tier, format, skill_level, goal, availability)
       values ($1, $2, $3, nullif($4, ''), $5, $6, $7, $8, $9)
       returning id, status, created_at`,
      [user.id, tool, topic, projectSlug, tier, format, skillLevel, goal, availability]
    );
    return NextResponse.json({ ok: true, application: rows[0] }, { status: 201 });
  } catch (error) {
    if (error.code === "23505") return NextResponse.json({ ok: false, message: "You already have an application under review." }, { status: 409 });
    return NextResponse.json({ ok: false, message: "Application could not be saved. Please try again." }, { status: 500 });
  }
}
