import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { hasDatabaseEnv } from "@/lib/db/config";
import { signInWithPassword } from "@/app/auth/actions";

const messages = {
  "login-required": "Enter your admin email and password.",
  "login-error": "Those admin login details did not work.",
  "role-required": "That account does not have active admin access.",
  "session-required": "Log in as an admin before continuing.",
  "db-env": "Admin login is not ready yet. Check the account configuration."
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const message = messages[params?.message];
  const next = typeof params?.next === "string" ? params.next : "";
  const authReady = hasDatabaseEnv();

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge tone="red">Admin access</Badge>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight text-neutral-950 md:text-6xl">
              Platform team login.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Admin accounts use a separate pipeline so learner and mentor onboarding stay clean.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/login">Learner or mentor login</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-neutral-950">Admin login</h2>
                <Badge tone={authReady ? "green" : "amber"}>{authReady ? "Ready" : "Setup required"}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <form action={signInWithPassword} className="space-y-4">
                <input type="hidden" name="role" value="admin" />
                <input type="hidden" name="next" value={next} />
                <div className="rounded-lg bg-neutral-50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 shrink-0 text-neutral-700" size={18} />
                    <p className="text-sm leading-6 text-neutral-600">
                      Only accounts with an active admin role membership can continue to the admin workspace.
                    </p>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-neutral-950">
                    Admin email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-semibold text-neutral-950">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>
                {message ? (
                  <div role="status" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                    {message}
                  </div>
                ) : null}
                <Button type="submit" variant="accent" className="w-full">
                  <LockKeyhole size={16} />
                  Log in as admin
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}
