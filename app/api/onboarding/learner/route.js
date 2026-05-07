import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";
import { transaction } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

function cleanList(value) {
  return Array.isArray(value) ? value.map(clean).filter(Boolean) : [];
}

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, success: false, message: "We're setting things up. Come back in a few minutes." }, { status: 503 });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, success: false, message: "You need to log in to see this." }, { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, success: false, message: "Something went wrong saving your profile. Check your internet and try again." }, { status: 400 });
  }

  const phone = clean(body.phone);
  const country = clean(body.country);
  const timeZone = clean(body.time_zone);
  const learningGoal = clean(body.learning_goal);

  if (!phone || !country || !timeZone || !learningGoal) {
    return NextResponse.json(
      { ok: false, success: false, message: "We need your contact info, location, and what you want to learn. No gaps, please." },
      { status: 400 }
    );
  }

  try {
    await transaction(async (client) => {
      await client.query(
        `insert into role_memberships (user_id, role, status)
         values ($1, 'learner', 'active')
         on conflict (user_id, role) where organization_id is null
         do update set status = 'active'`,
        [user.id]
      );

      await client.query(
        `insert into learner_profiles (
           id, phone, country, time_zone, institution, interests, learning_goal, availability,
           age_bracket, guardian_contact, onboarding_complete, updated_at
         )
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true, now())
         on conflict (id) do update set
           phone = excluded.phone,
           country = excluded.country,
           time_zone = excluded.time_zone,
           institution = excluded.institution,
           interests = excluded.interests,
           learning_goal = excluded.learning_goal,
           availability = excluded.availability,
           age_bracket = excluded.age_bracket,
           guardian_contact = excluded.guardian_contact,
           onboarding_complete = true,
           updated_at = now()`,
        [
          user.id,
          phone,
          country,
          timeZone,
          clean(body.institution),
          cleanList(body.interests),
          learningGoal,
          cleanList(body.availability),
          clean(body.age_bracket),
          clean(body.guardian_contact)
        ]
      );
    });
  } catch (error) {
    if (error?.code === "42P01") {
      return NextResponse.json(
        { ok: false, success: false, message: "We're setting things up. Come back in a few minutes." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: false, success: false, message: error?.message || "We couldn't save your profile. Try again or reach out to us." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, success: true });
}
