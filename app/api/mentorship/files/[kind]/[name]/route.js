import path from "node:path";
import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { getCurrentUser, hasRole } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";

export async function GET(_request, { params }) {
  if (!hasDatabaseEnv()) return NextResponse.json({ ok: false, message: "Mentorship files need the database to be connected." }, { status: 503 });
  const user = await getCurrentUser();
  if (!user || !hasRole(user, "learner")) return NextResponse.json({ ok: false, message: "Sign in as a mentee." }, { status: 401 });

  const { kind, name } = await params;
  if (!["datasets", "walkthroughs"].includes(kind) || !/^[a-z0-9-]+\.(csv|md)$/.test(name) ||
      (kind === "datasets" && !name.endsWith(".csv")) || (kind === "walkthroughs" && !name.endsWith(".md"))) {
    return NextResponse.json({ ok: false, message: "File not found." }, { status: 404 });
  }
  const slug = name.replace(/\.(csv|md)$/, "");
  const { rows: access } = await query(
    `select a.id from mentorship_applications a
     where a.user_id = $1 and a.project_slug = $2 and a.status = 'paid'
       and ($3 = 'datasets' or exists (
         select 1 from project_submissions ps join project_briefs pb on pb.id = ps.project_id
         where ps.learner_id = a.user_id and pb.slug = a.project_slug
       )) limit 1`,
    [user.id, slug, kind]
  );
  if (!access[0]) return NextResponse.json({ ok: false, message: "This file is not available for your mentorship yet." }, { status: 403 });

  try {
    const bytes = await readFile(path.join(process.cwd(), "private", "downloads", kind, name));
    return new Response(bytes, {
      headers: {
        "Content-Type": kind === "datasets" ? "text/csv; charset=utf-8" : "text/markdown; charset=utf-8",
        "Content-Disposition": `attachment; filename="${name}"`,
        "Cache-Control": "private, no-store"
      }
    });
  } catch {
    return NextResponse.json({ ok: false, message: "File not found." }, { status: 404 });
  }
}
