"use server";

import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth/session";
import { query } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

function csv(value) {
  return clean(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function submitMentorProjectProposal(formData) {
  const user = await requireUser({
    role: "mentor",
    redirectTo: "/projects/propose",
    statuses: ["active", "pending"]
  });

  const mentor = await query("select id, verification_status from mentor_profiles where id = $1 limit 1", [user.id]);
  if (!mentor.rows[0]) {
    redirect("/onboarding/mentor");
  }

  const title = clean(formData.get("title"));
  const problemStatement = clean(formData.get("problem_statement"));
  const difficulty = clean(formData.get("difficulty"));
  const finalDeliverable = clean(formData.get("final_deliverable"));
  const creditValueRequested = Number(clean(formData.get("credit_value_requested")) || 0);

  if (!title || !problemStatement || !difficulty || !finalDeliverable) {
    redirect("/projects/propose?message=required");
  }

  try {
    await query(
      `insert into mentor_project_proposals (
         mentor_id, title, problem_statement, skills, difficulty, estimated_duration,
         prerequisites, tools, final_deliverable, rubric, mentor_notes,
         credit_value_requested, status
       )
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'submitted')`,
      [
        user.id,
        title,
        problemStatement,
        csv(formData.get("skills")),
        difficulty,
        clean(formData.get("estimated_duration")),
        clean(formData.get("prerequisites")),
        csv(formData.get("tools")),
        finalDeliverable,
        clean(formData.get("rubric")),
        clean(formData.get("mentor_notes")),
        Math.max(0, creditValueRequested)
      ]
    );
  } catch {
    redirect("/projects/propose?message=save-error");
  }

  redirect("/projects/propose?message=submitted");
}
