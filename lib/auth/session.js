import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";

export const authCookieName = "ua_session";
const sessionDays = 7;

const dashboardPath = {
  learner: "/learners",
  mentor: "/mentors",
  admin: "/admin",
  employer: "/employers"
};

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function shouldUseSecureCookies() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (siteUrl) {
    try {
      const { hostname, protocol } = new URL(siteUrl);
      const localHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);
      if (localHosts.has(hostname)) return false;
      return protocol === "https:";
    } catch {
      // Fall back to the environment check below.
    }
  }

  return process.env.NODE_ENV === "production";
}

function cookieOptions(expires) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookies(),
    path: "/",
    maxAge: sessionDays * 24 * 60 * 60,
    priority: "high",
    expires
  };
}

export function normalizeRole(value, fallback = "learner") {
  const role = String(value || fallback).trim().toLowerCase();
  if (role === "student") return "learner";
  if (["learner", "mentor", "admin", "employer"].includes(role)) return role;
  return fallback;
}

export function loginPathForRole(role, message = "session-required", next = "") {
  if (role === "admin") {
    const path = `/admin/login?message=${message}`;
    return next ? `${path}&next=${encodeURIComponent(next)}` : path;
  }

  const pageRole = role === "mentor" ? "mentor" : "student";
  const path = `/login?role=${pageRole}&message=${message}`;
  return next ? `${path}&next=${encodeURIComponent(next)}` : path;
}

export function dashboardForRole(role) {
  return dashboardPath[normalizeRole(role)] || dashboardPath.learner;
}

export async function createSession(userId) {
  const sessionCookie = await createSessionCookie(userId);
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.options);

  return sessionCookie.value;
}

export async function createSessionCookie(userId) {
  const token = crypto.randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + sessionDays * 24 * 60 * 60 * 1000);

  await query("delete from auth_sessions where user_id = $1", [userId]).catch(() => null);

  await query(
    `insert into auth_sessions (user_id, token_hash, expires_at)
     values ($1, $2, $3)`,
    [userId, hashToken(token), expires.toISOString()]
  );

  return {
    name: authCookieName,
    value: token,
    options: cookieOptions(expires)
  };
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(authCookieName)?.value;

  if (token && hasDatabaseEnv()) {
    await query("delete from auth_sessions where token_hash = $1", [hashToken(token)]).catch(() => null);
  }

  cookieStore.set(authCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookies(),
    path: "/",
    maxAge: 0,
    expires: new Date(0)
  });
}

export async function getCurrentUser() {
  if (!hasDatabaseEnv()) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(authCookieName)?.value;
  if (!token) return null;

  const { rows } = await query(
    `select
       p.id,
       p.full_name,
       p.email,
       p.default_role,
       p.avatar_url,
       lp.onboarding_complete as learner_onboarding_complete,
       mp.verification_status as mentor_verification_status,
       coalesce(
         json_agg(
           json_build_object('role', rm.role, 'status', rm.status)
         ) filter (where rm.id is not null),
         '[]'::json
       ) as memberships
     from auth_sessions s
     join profiles p on p.id = s.user_id
     left join role_memberships rm on rm.user_id = p.id
     left join learner_profiles lp on lp.id = p.id
     left join mentor_profiles mp on mp.id = p.id
     where s.token_hash = $1
     and s.expires_at > now()
     group by p.id, lp.onboarding_complete, mp.verification_status
     limit 1`,
    [hashToken(token)]
  );

  const user = rows[0];
  if (!user) {
    cookieStore.set(authCookieName, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: shouldUseSecureCookies(),
      path: "/",
      maxAge: 0,
      expires: new Date(0)
    });
    return null;
  }

  await query("update auth_sessions set last_seen_at = now() where token_hash = $1", [hashToken(token)]).catch(() => null);
  return user;
}

export function hasRole(user, role, statuses = ["active"]) {
  const normalizedRole = normalizeRole(role);
  if (!user) return false;
  if (normalizeRole(user.default_role) === normalizedRole && normalizedRole === "learner") return true;

  return (user.memberships || []).some((membership) => {
    return normalizeRole(membership.role) === normalizedRole && statuses.includes(membership.status);
  });
}

export async function requireUser({ role = "learner", redirectTo = "/", statuses = ["active"], requireMembership = true } = {}) {
  const user = await getCurrentUser();
  const normalizedRole = normalizeRole(role);

  if (!user) {
    redirect(loginPathForRole(normalizedRole, "session-required", redirectTo));
  }

  if (requireMembership && !hasRole(user, normalizedRole, statuses)) {
    redirect(loginPathForRole(normalizedRole, "role-required"));
  }

  return user;
}
