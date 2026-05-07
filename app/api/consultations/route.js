import { NextResponse } from "next/server";

import { upsertLead } from "@/lib/academy/commerce";
import { hasDatabaseEnv } from "@/lib/db/config";
import { transaction } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, message: "Consultation requests are not ready yet. Please contact Ubuntu Analytiq support." }, { status: 503 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Consultation details could not be read." }, { status: 400 });
  }

  const email = clean(body.email).toLowerCase();
  const fullName = clean(body.fullName || body.full_name || body.name);
  if (!fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Add a name and valid email address." }, { status: 400 });
  }

  try {
    const consultation = await transaction(async (client) => {
      await upsertLead(client, {
        email,
        fullName,
        source: "consultation",
        selectedProduct: clean(body.courseSlug || body.course_slug),
        metadata: { phone: clean(body.phone) }
      });

      const { rows } = await client.query(
        `insert into consultations (
           email,
           full_name,
           phone,
           course_slug,
           course_name,
           consultation_type,
           preferred_date,
           preferred_time,
           time_zone,
           notes,
           metadata
         )
         values ($1, $2, $3, nullif($4, ''), $5, $6, $7, $8, $9, $10, $11::jsonb)
         returning id, status, created_at`,
        [
          email,
          fullName,
          clean(body.phone),
          clean(body.courseSlug || body.course_slug),
          clean(body.courseName || body.course_name),
          clean(body.consultationType || body.consultation_type) || "course_specific",
          clean(body.preferredDate || body.preferred_date) || null,
          clean(body.preferredTime || body.preferred_time),
          clean(body.timeZone || body.time_zone) || "Africa/Nairobi",
          clean(body.notes),
          JSON.stringify(body.metadata && typeof body.metadata === "object" ? body.metadata : {})
        ]
      );

      return rows[0];
    });

    return NextResponse.json({ ok: true, consultation });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error.message || "Consultation could not be saved." }, { status: 400 });
  }
}
