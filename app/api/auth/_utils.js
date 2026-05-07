import { NextResponse } from "next/server";

import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";
import { dashboardForRole, normalizeRole } from "@/lib/auth/session";

export function clean(value) {
  return String(value || "").trim();
}

export function getRole(value, fallback = "learner") {
  return normalizeRole(value, fallback);
}

export function json(data, status = 200) {
  const body = { ...data };
  if ("ok" in body && !("success" in body)) {
    body.success = Boolean(body.ok);
  }

  return NextResponse.json(body, { status });
}

export function getDbOrResponse() {
  if (!hasDatabaseEnv()) {
    return {
      response: json(
        { ok: false, message: "Accounts are not ready yet. Please contact Ubuntu Analytiq support." },
        503
      )
    };
  }

  return { response: null };
}

export function safeNextForRole(value, role) {
  const next = clean(value);
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "";
  if (
    role === "learner" &&
    (
      next.startsWith("/onboarding/learner") ||
      next.startsWith("/learners") ||
      next.startsWith("/checkout") ||
      next.startsWith("/projects") ||
      next.startsWith("/pathways") ||
      next.startsWith("/academy") ||
      next.startsWith("/datasets") ||
      next.startsWith("/synthetic-data")
    )
  ) {
    return next;
  }
  if (role === "mentor" && (next.startsWith("/onboarding/mentor") || next.startsWith("/mentors"))) return next;
  if (role === "admin" && next.startsWith("/admin")) return next;
  return "";
}

export async function getPostAuthRedirect(userId, fallbackRole) {
  const role = normalizeRole(fallbackRole);

  if (role === "admin") {
    const { rows } = await query(
      `select id from role_memberships
       where user_id = $1 and role = 'admin' and status = 'active'
       limit 1`,
      [userId]
    );
    return rows[0] ? "/admin" : "/admin/login?message=role-required";
  }

  if (role === "mentor") {
    const { rows } = await query("select verification_status from mentor_profiles where id = $1 limit 1", [userId]);
    if (!rows[0]) return "/onboarding/mentor";
    if (!["verified", "approved"].includes(rows[0].verification_status)) return "/mentors?message=mentor-pending";
    return "/mentors";
  }

  return dashboardForRole(role);
}

async function ensureAuthAccountStateWithClient(client, userId, role) {
  const normalizedRole = normalizeRole(role);

  if (["learner", "mentor"].includes(normalizedRole)) {
    await client.query(
      `insert into role_memberships (user_id, role, status)
       values ($1, $2, $3)
       on conflict (user_id, role) where organization_id is null
       do update set status = case
         when role_memberships.status in ('active', 'verified', 'approved') then role_memberships.status
         else excluded.status
       end`,
      [userId, normalizedRole, normalizedRole === "mentor" ? "pending" : "active"]
    );
  }

  if (normalizedRole === "learner") {
    await client.query(
      `insert into learner_profiles (id, phone, country, time_zone, learning_goal, onboarding_complete)
       values ($1, '', '', 'Africa/Nairobi', '', false)
       on conflict (id) do nothing`,
      [userId]
    );
  }

  if (normalizedRole === "mentor") {
    await client.query(
      `insert into mentor_profiles (id, title)
       values ($1, 'Mentor')
       on conflict (id) do nothing`,
      [userId]
    );
  }

  await client.query("insert into ai_token_wallets (user_id) values ($1) on conflict (user_id) do nothing", [userId]);
}

export async function ensureAuthAccountState(userId, role) {
  return ensureAuthAccountStateWithClient({ query }, userId, role);
}

export async function ensureAuthAccountStateInTransaction(client, userId, role) {
  return ensureAuthAccountStateWithClient(client, userId, role);
}
