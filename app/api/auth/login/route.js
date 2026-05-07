import { verifyPassword } from "@/lib/auth/password";
import { createSessionCookie } from "@/lib/auth/session";
import { query } from "@/lib/db/client";

import { clean, ensureAuthAccountState, getDbOrResponse, getPostAuthRedirect, getRole, json, safeNextForRole } from "../_utils";
import { NextResponse } from "next/server";

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
      email: formData.get("email"),
      password: formData.get("password"),
      next: formData.get("next")
    }
  };
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
    if (formPost) return formRedirect(request, "/login?role=student&message=login-error");
    return json({ ok: false, message: "Login details could not be read." }, 400);
  }

  const role = getRole(body.role);
  const email = clean(body.email).toLowerCase();
  const password = String(body.password || "");
  const next = safeNextForRole(body.next, role);

  if (!email || !password) {
    if (formPost) return formRedirect(request, loginRedirect(role, "login-required", next));
    return json({ ok: false, message: "Enter your email and password to continue." }, 400);
  }

  const { response } = getDbOrResponse();
  if (response) {
    if (formPost) return formRedirect(request, loginRedirect(role, "db-env", next));
    return response;
  }

  try {
    const { rows } = await query("select id, password_hash from profiles where lower(email) = lower($1) limit 1", [email]);
    const user = rows[0];
    const passwordOk = user ? await verifyPassword(password, user.password_hash) : false;

    if (!user || !passwordOk) {
      if (formPost) return formRedirect(request, loginRedirect(role, "login-error", next));
      return json({ ok: false, message: "Invalid login credentials" }, 401);
    }

    await ensureAuthAccountState(user.id, role);
    const sessionCookie = await createSessionCookie(user.id);
    const destination = next || (await getPostAuthRedirect(user.id, role));
    if (formPost) return formRedirect(request, destination, sessionCookie);
    return jsonWithSession({ ok: true, destination }, sessionCookie);
  } catch (error) {
    if (error?.code === "42P01") {
      if (formPost) return formRedirect(request, loginRedirect(role, "db-env", next));
      return json({ ok: false, message: "Account login is not ready yet. Please contact Ubuntu Analytiq support." }, 503);
    }

    if (formPost) return formRedirect(request, loginRedirect(role, "login-error", next));
    return json({ ok: false, message: error?.message || "Login did not complete." }, 400);
  }
}
