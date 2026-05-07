import { NextResponse } from "next/server";

import { authCookieName } from "./lib/auth/session";

const protectedRoutes = [
  { prefix: "/admin", role: "admin", loginPath: "/admin/login" },
  { prefix: "/onboarding/learner", role: "learner", loginPath: "/login" },
  { prefix: "/onboarding/mentor", role: "mentor", loginPath: "/login" },
  { prefix: "/mentors", role: "mentor", loginPath: "/login" },
  { prefix: "/learners", role: "learner", loginPath: "/login" },
  { prefix: "/employers", role: "employer", loginPath: "/login" }
];

function matchedRoute(pathname) {
  if (pathname === "/admin/login") return null;
  return protectedRoutes.find((route) => pathname === route.prefix || pathname.startsWith(`${route.prefix}/`));
}

function requestOrigin(request) {
  const proto = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(":", "") || "http";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host;
  return `${proto}://${host}`;
}

export function proxy(request) {
  const match = matchedRoute(request.nextUrl.pathname);

  if (!match || request.method === "POST") {
    return NextResponse.next();
  }

  const token = request.cookies.get(authCookieName)?.value;
  if (token) {
    return NextResponse.next();
  }

  const loginUrl = new URL(match.loginPath, requestOrigin(request));
  if (match.role !== "admin") {
    loginUrl.searchParams.set("role", match.role === "learner" ? "student" : match.role);
  }
  loginUrl.searchParams.set("message", "session-required");
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/onboarding/learner/:path*", "/onboarding/mentor/:path*", "/learners/:path*", "/mentors/:path*", "/employers/:path*"]
};
