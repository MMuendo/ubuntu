import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSessionCookie } from "@/lib/auth/session";
import { query, transaction } from "@/lib/db/client";
import { NextResponse } from "next/server";

import { clean, ensureAuthAccountState, ensureAuthAccountStateInTransaction, getDbOrResponse, getPostAuthRedirect, getRole, json, safeNextForRole } from "../_utils";

async function readBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    return { body, formPost: false };
  }

  const formData = await request.formData();
  return {
    formPost: true,
    body: {
      role: formData.get("role"),
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
      next: formData.get("next")
    }
  };
}

function signupRedirect(role, message, next = "") {
  const pageRole = role === "mentor" ? "mentor" : "student";
  const url = new URL("/signup", "http://localhost");
  url.searchParams.set("role", pageRole);
  url.searchParams.set("message", message);
  if (next) url.searchParams.set("next", next);
  return `${url.pathname}${url.search}`;
}

function loginRedirect(role, message, next = "") {
  const pageRole = role === "mentor" ? "mentor" : "student";
  const url = new URL("/login", "http://localhost");
  url.searchParams.set("role", pageRole);
  url.searchParams.set("message", message);
  if (next) url.searchParams.set("next", next);
  return `${url.pathname}${url.search}`;
}

function formRedirect(request, destination, sessionCookie = null) {
  const forwardedProto = request.headers.get("x-forwarded-proto") || "http";
  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:4173";
  const origin = `${forwardedProto}://${forwardedHost}`;
  const response = NextResponse.redirect(new URL(destination, origin), { status: 303 });
  if (sessionCookie) {
    response.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.options);
  }
  return response;
}

function jsonWithSession(data, sessionCookie) {
  const response = json(data);
  response.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.options);
  return response;
}

export async function POST(request) {
  let body = {};
  let formPost = false;
  try {
    const parsed = await readBody(request);
    body = parsed.body;
    formPost = parsed.formPost;
  } catch {
    if (formPost) return formRedirect(request, "/signup?role=student&message=signup-error");
    return json({ ok: false, message: "Signup details could not be read." }, 400);
  }

  const role = getRole(body.role);
  const fullName = clean(body.full_name);
  const email = clean(body.email).toLowerCase();
  const password = String(body.password || "");
  const confirmPassword = String(body.confirm_password || "");
  const next = safeNextForRole(body.next, role);

  if (!["learner", "mentor"].includes(role)) {
    if (formPost) return formRedirect(request, signupRedirect(role, "role-required", next));
    return json({ ok: false, message: "Choose learner or mentor to continue." }, 400);
  }

  if (!fullName || !email || !password) {
    if (formPost) return formRedirect(request, signupRedirect(role, "signup-required", next));
    return json({ ok: false, message: "Add your name, email, and password to continue." }, 400);
  }

  if (password.length < 8) {
    if (formPost) return formRedirect(request, signupRedirect(role, "password-short", next));
    return json({ ok: false, message: "Use at least 8 characters for the password." }, 400);
  }

  if (password !== confirmPassword) {
    if (formPost) return formRedirect(request, signupRedirect(role, "password-mismatch", next));
    return json({ ok: false, message: "The two passwords do not match." }, 400);
  }

  const { response } = getDbOrResponse();
  if (response) {
    if (formPost) return formRedirect(request, signupRedirect(role, "db-env", next));
    return response;
  }

  const passwordHash = await hashPassword(password);

  try {
    const user = await transaction(async (client) => {
      const { rows } = await client.query(
        `insert into profiles (full_name, email, password_hash, default_role)
         values ($1, $2, $3, $4)
         returning id, default_role`,
        [fullName, email, passwordHash, role]
      );

      const createdUser = rows[0];
      await ensureAuthAccountStateInTransaction(client, createdUser.id, role);
      return createdUser;
    });

    const sessionCookie = await createSessionCookie(user.id);
    const destination = next || (await getPostAuthRedirect(user.id, role));
    if (formPost) return formRedirect(request, destination, sessionCookie);
    return jsonWithSession({ ok: true, destination, message: "Account created. You are now signed in." }, sessionCookie);
  } catch (error) {
    if (error?.code === "23505") {
      const { rows } = await query("select id, password_hash from profiles where lower(email) = lower($1) limit 1", [email]);
      const existingUser = rows[0];
      const passwordOk = existingUser ? await verifyPassword(password, existingUser.password_hash) : false;

      if (existingUser && passwordOk) {
        await ensureAuthAccountState(existingUser.id, role);
        const sessionCookie = await createSessionCookie(existingUser.id);
        const destination = next || (await getPostAuthRedirect(existingUser.id, role));
        if (formPost) return formRedirect(request, destination, sessionCookie);
        return jsonWithSession({ ok: true, destination, message: "Account found. You are now signed in." }, sessionCookie);
      }

      if (formPost) return formRedirect(request, loginRedirect(role, "email-exists", next));
      return json({ ok: false, message: "An account with this email already exists. Log in instead." }, 409);
    }

    if (formPost) return formRedirect(request, signupRedirect(role, "signup-error", next));
    return json({ ok: false, message: error?.message || "Account creation did not work." }, 400);
  }
}
