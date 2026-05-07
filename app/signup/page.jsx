import { redirect } from "next/navigation";

import { SignupClient } from "@/app/auth/auth-client";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { dashboardForRole, getCurrentUser } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";

const messages = {
  "password-mismatch": "The two passwords do not match.",
  "password-short": "Use at least 8 characters for the password.",
  "role-required": "Choose learner or mentor to continue.",
  "signup-error": "Account creation did not work. Try a different email or password.",
  "signup-required": "Add your name, email, and password to continue.",
  "db-env": "Account creation is not ready yet. Please contact Ubuntu Analytiq support."
};

const successMessages = new Set([]);

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

export default async function SignupPage({ searchParams }) {
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
            <Badge tone="green">Sign up</Badge>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight text-neutral-950 md:text-6xl">
              Start simple, finish your profile after.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Learners only need the basics to get started. Mentors can join quickly, then complete an approval profile before credits or project proposals go live.
            </p>
          </div>

          <SignupClient
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
