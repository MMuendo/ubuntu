import { NextResponse } from "next/server";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";

const clean = (value, limit = 1000) => String(value || "").trim().slice(0, limit);

export async function POST(request) {
  if (!hasDatabaseEnv()) return NextResponse.json({ ok: false, message: "Group requests need the database to be connected." }, { status: 503 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, message: "Request could not be read." }, { status: 400 }); }
  const fullName = clean(body.fullName, 150);
  const email = clean(body.email, 254).toLowerCase();
  const organization = clean(body.organization, 200);
  const groupSize = Number(body.groupSize);
  const focus = clean(body.focus, 200);
  const goals = clean(body.goals);
  if (!fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !Number.isInteger(groupSize) || groupSize < 2 || groupSize > 10000 || !focus || !goals) {
    return NextResponse.json({ ok: false, message: "Add your name, email, group size, focus, and goals." }, { status: 400 });
  }
  try {
    const { rows } = await query(
      `insert into mentorship_group_requests (full_name, email, organization, group_size, focus, goals)
       values ($1, $2, $3, $4, $5, $6) returning id`,
      [fullName, email, organization, groupSize, focus, goals]
    );
    return NextResponse.json({ ok: true, id: rows[0].id }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: "Request could not be saved. Please try again." }, { status: 500 });
  }
}
