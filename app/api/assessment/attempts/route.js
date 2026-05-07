import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import { recommendationForAssessment } from "@/lib/academy/catalog";
import { upsertLead } from "@/lib/academy/commerce";
import { hasDatabaseEnv } from "@/lib/db/config";
import { transaction } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, message: "Assessment saving is not ready yet. Please contact Ubuntu Analytiq support." }, { status: 503 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Assessment details could not be read." }, { status: 400 });
  }

  const email = clean(body.email).toLowerCase();
  const path = body.path === "data" ? "data" : "ai";
  const answers = Array.isArray(body.answers) ? body.answers.map((answer) => Number(answer)) : [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "That doesn't look like a real email. Try again." }, { status: 400 });
  }

  const recommendation = recommendationForAssessment(path, answers);
  const user = await getCurrentUser();

  try {
    const attempt = await transaction(async (client) => {
      const lead = await upsertLead(client, {
        email,
        source: "assessment",
        selectedProduct: recommendation.course?.slug || "",
        metadata: {
          path,
          score: recommendation.score,
          recommendation_label: recommendation.label
        }
      });

      await client.query(
        `update leads set
           assessment_score = $2,
           assessment_answers = $3::jsonb,
           recommended_course_slug = $4,
           tags = array(select distinct unnest(tags || $5::text[])),
           updated_at = now()
         where id = $1`,
        [
          lead.id,
          recommendation.score,
          JSON.stringify(answers),
          recommendation.course?.slug || null,
          [path === "ai" ? "ai-assessment" : "data-assessment", recommendation.label]
        ]
      );

      const { rows } = await client.query(
        `insert into assessment_attempts (
           lead_id,
           user_id,
           email,
           path,
           score,
           answers,
           recommendation,
           recommended_course_slug
         )
         values ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8)
         returning id, score, recommended_course_slug, created_at`,
        [
          lead.id,
          user?.id || null,
          email,
          path,
          recommendation.score,
          JSON.stringify(answers),
          JSON.stringify({
            label: recommendation.label,
            course: recommendation.course || null
          }),
          recommendation.course?.slug || null
        ]
      );

      return rows[0];
    });

    return NextResponse.json({
      ok: true,
      attempt,
      recommendation: {
        score: recommendation.score,
        label: recommendation.label,
        course: recommendation.course
      }
    });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error.message || "Assessment could not be saved." }, { status: 400 });
  }
}
