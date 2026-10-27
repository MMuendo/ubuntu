import { NextResponse } from "next/server";
import { getCurrentUser, hasRole } from "@/lib/auth/session";
import { transaction } from "@/lib/db/client";
import { getProjectBriefs } from "@/lib/db/loaders";

const clean = (value, limit = 500) => String(value || "").trim().slice(0, limit);

export async function POST(request) {
  const admin = await getCurrentUser();
  if (!admin || !hasRole(admin, "admin")) return NextResponse.json({ ok: false, message: "Admin access required." }, { status: 403 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, message: "Review details could not be read." }, { status: 400 }); }
  const id = clean(body.id, 50);
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false, message: "Choose a valid request." }, { status: 400 });

  if (body.kind === "group") {
    if (!["contacted", "closed"].includes(body.status)) return NextResponse.json({ ok: false, message: "Choose a valid status." }, { status: 400 });
    const { rows } = await transaction((client) => client.query("update mentorship_group_requests set status = $2 where id = $1 returning id", [id, body.status]));
    return rows[0] ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, message: "Group request not found." }, { status: 404 });
  }

  const decision = clean(body.decision, 20);
  if (!["approve", "decline"].includes(decision)) return NextResponse.json({ ok: false, message: "Choose approve or decline." }, { status: 400 });
  const notes = clean(body.notes, 1000);
  const projectSlug = clean(body.projectSlug, 120);
  const price = body.priceKes === "" || body.priceKes == null ? null : Number(body.priceKes);
  const sessions = body.sessionCount === "" || body.sessionCount == null ? null : Number(body.sessionCount);
  if (decision === "approve" && ((price === null) !== (sessions === null) ||
      (price !== null && (!Number.isInteger(price) || price < 1 || price > 1000000)) ||
      (sessions !== null && (!Number.isInteger(sessions) || sessions < 1 || sessions > 100)))) {
    return NextResponse.json({ ok: false, message: "Enter a valid price and session count together, or leave both open." }, { status: 400 });
  }
  if (decision === "approve" && price !== null && !projectSlug) {
    return NextResponse.json({ ok: false, message: "Choose a starting project before opening payment." }, { status: 400 });
  }
  if (decision === "approve" && projectSlug && !(await getProjectBriefs()).some((project) => project.slug === projectSlug)) {
    return NextResponse.json({ ok: false, message: "Choose a project from the library." }, { status: 400 });
  }

  try {
    const result = await transaction(async (client) => {
      const { rows } = await client.query("select * from mentorship_applications where id = $1 for update", [id]);
      const application = rows[0];
      if (!application) return "missing";
      if (application.status === "paid") return "paid";
      let planId = application.offer_plan_id;
      if (decision === "approve" && price !== null) {
        const planCode = `mentorship-${id}`;
        const planName = `Mentorship: ${application.tier} · ${[application.tool, application.topic].filter(Boolean).join(" / ")}`;
        const { rows: plans } = await client.query(
          `insert into plans (code, role, name, price_kes, interval, paystack_plan_code, features, is_active)
           values ($1, 'learner', $2, $3, 'one-time', $4, $5::jsonb, true)
           on conflict (code) do update set name = excluded.name, price_kes = excluded.price_kes,
             features = excluded.features, is_active = true
           returning id`,
          [planCode, planName, price, `UA_MENTORSHIP_${id.replaceAll("-", "").toUpperCase()}`, JSON.stringify([`${sessions} sessions`, application.tier, application.format])]
        );
        planId = plans[0].id;
      }
      if (decision === "approve" && price === null && planId) {
        await client.query("update plans set is_active = false where id = $1", [planId]);
        planId = null;
      }
      if (decision === "decline" && planId) {
        await client.query("update plans set is_active = false where id = $1", [planId]);
        planId = null;
      }
      await client.query(
        `update mentorship_applications set status = $2, review_notes = $3,
         approved_price_kes = $4, approved_session_count = $5, offer_plan_id = $6,
         reviewed_by = $7, project_slug = $8, reviewed_at = now(), updated_at = now() where id = $1`,
        [id, decision === "approve" ? "approved" : "declined", notes || null, decision === "approve" ? price : null, decision === "approve" ? sessions : null, planId, admin.id, decision === "approve" ? projectSlug || null : application.project_slug]
      );
      return "updated";
    });
    if (result === "missing") return NextResponse.json({ ok: false, message: "Application not found." }, { status: 404 });
    if (result === "paid") return NextResponse.json({ ok: false, message: "A paid application cannot be changed here." }, { status: 409 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Review could not be saved." }, { status: 500 });
  }
}
