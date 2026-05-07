import { redirect } from "next/navigation";

import { LoginClient } from "@/app/auth/auth-client";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { dashboardForRole, getCurrentUser } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";

const messages = {
  "email-required": "We need your email to get started.",
  "login-required": "Email and password, please.",
  "login-error": "Email or password didn't work. Try again.",
  "session-required": "You need to log in to see this.",
  "role-required": "You're signed in but need the learner role for this workspace.",
  "email-exists": "You already have an account with that email. Log in instead, or sign up with a different email.",
  "signed-out": "You're logged out. See you soon.",
  "db-env": "We're getting things ready. Try again in a minute."
};

const successMessages = new Set(["signed-out"]);

function safeSignedInNext(value, role) {
  const next = String(value || "").trim();
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "";
  const normalizedRole = role === "student" ? "learner" : String(role || "learner").toLowerCase();
  if (
    normalizedRole === "learner" &&
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
  if (normalizedRole === "mentor" && (next.startsWith("/onboarding/mentor") || next.startsWith("/mentors"))) return next;
  return "";
}

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params?.next === "string" ? params.next : "";
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect(safeSignedInNext(next, currentUser.default_role) || dashboardForRole(currentUser.default_role));
  }

  const message = messages[params?.message];
  const authReady = hasDatabaseEnv();

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge tone="teal">Sign in</Badge>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight text-neutral-950 md:text-6xl">
              Log in to your workspace.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Learners and mentors use one simple login. Admins use a separate protected entry point for platform operations.
            </p>
          </div>

          <LoginClient
            initialRole={params?.role}
            initialMessage={message}
            initialTone={successMessages.has(params?.message) ? "success" : ""}
            next={next}
            authReady={authReady}
          />
        </div>
      </section>
    </SiteShell>
  );
}
