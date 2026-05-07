import { NextResponse } from "next/server";

import { getCurrentUser, loginPathForRole, normalizeRole } from "@/lib/auth/session";
import { getSiteUrl } from "@/lib/db/config";

const roleRoutes = {
  learner: "/learners",
  mentor: "/mentors",
  admin: "/admin",
  employer: "/employers"
};

async function postAuthPath(user, fallbackRole) {
  const role = normalizeRole(user?.default_role || fallbackRole);

  if (role === "mentor") {
    const { rows } = await query("select verification_status from mentor_profiles where id = $1 limit 1", [user.id]);
    if (!rows[0]) return "/onboarding/mentor";
    if (!["verified", "approved"].includes(rows[0].verification_status)) return "/mentors?message=mentor-pending";
    return "/mentors";
  }

  if (role === "learner") return "/learners";

  return roleRoutes[role] || "/learners";
}

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const redirectOrigin = getSiteUrl() || requestUrl.origin;

  const host = request.headers.get("host") || "";
  if (requestUrl.hostname === "0.0.0.0" && host.startsWith("0.0.0.0")) {
    requestUrl.hostname = "localhost";
    return NextResponse.redirect(requestUrl);
  }

  const role = normalizeRole(requestUrl.searchParams.get("role"));
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.redirect(new URL(loginPathForRole(role), redirectOrigin));
  }

  return NextResponse.redirect(new URL(await postAuthPath(user, role), redirectOrigin));
}
