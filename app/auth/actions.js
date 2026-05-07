"use server";

import { redirect } from "next/navigation";

import { verifyPassword } from "@/lib/auth/password";
import { clearSession, createSession, loginPathForRole, normalizeRole } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

function safeNext(value) {
  const next = clean(value);
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "";
  return next;
}

export async function signInWithPassword(formData) {
  const role = normalizeRole(formData.get("role"));
  const email = clean(formData.get("email")).toLowerCase();
  const password = String(formData.get("password") || "");
  const next = safeNext(formData.get("next"));

  if (!hasDatabaseEnv()) {
    redirect(loginPathForRole(role, "db-env"));
  }

  if (!email || !password) {
    redirect(loginPathForRole(role, "login-required"));
  }

  const { rows } = await query("select id, password_hash from profiles where lower(email) = lower($1) limit 1", [email]);
  const user = rows[0];
  const passwordOk = user ? await verifyPassword(password, user.password_hash) : false;

  if (!user || !passwordOk) {
    redirect(loginPathForRole(role, "login-error"));
  }

  if (role === "admin") {
    const membership = await query(
      `select id from role_memberships
       where user_id = $1 and role = 'admin' and status = 'active'
       limit 1`,
      [user.id]
    );

    if (!membership.rows[0]) {
      redirect(loginPathForRole(role, "role-required"));
    }
  }

  await createSession(user.id);
  redirect(next || (role === "admin" ? "/admin" : role === "mentor" ? "/mentors" : "/learners"));
}

export async function signOut() {
  await clearSession();
  redirect("/login?message=signed-out");
}
