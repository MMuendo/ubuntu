"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BadgeCheck, ClipboardCheck, KeyRound, LockKeyhole, ShieldCheck, UserRoundCheck, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const roles = [
  {
    id: "student",
    authRole: "learner",
    title: "Learner",
    icon: UserRoundCheck,
    loginCopy: "Open your pathway, mentor notes, datasets, project work, and learner workspace.",
    signupCopy: "Sign up, tell us what you want to learn, and match with a mentor."
  },
  {
    id: "mentor",
    authRole: "mentor",
    title: "Mentor",
    icon: UsersRound,
    loginCopy: "Review learners, manage sessions, and submit project ideas for approval.",
    signupCopy: "Sign up, share your background, and start reviewing learner work."
  }
];

function selectedRoleFor(id) {
  return roles.find((role) => role.id === id) || roles[0];
}

function rolePath(role, page, next = "") {
  const params = new URLSearchParams({ role: role.id });
  if (next) params.set("next", next);
  return `/${page}?${params.toString()}`;
}

function safeNextForRole(next, authRole) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "";
  if (authRole === "learner" && next.startsWith("/onboarding/learner")) return next;
  if (authRole === "learner" && next.startsWith("/learners")) return next;
  if (authRole === "learner" && next.startsWith("/checkout")) return next;
  if (authRole === "learner" && next.startsWith("/projects")) return next;
  if (authRole === "learner" && next.startsWith("/pathways")) return next;
  if (authRole === "learner" && next.startsWith("/academy")) return next;
  if (authRole === "learner" && next.startsWith("/datasets")) return next;
  if (authRole === "learner" && next.startsWith("/synthetic-data")) return next;
  if (authRole === "mentor" && next.startsWith("/onboarding/mentor")) return next;
  if (authRole === "mentor" && next.startsWith("/mentors")) return next;
  return "";
}

export function LoginClient({ initialRole = "student", initialMessage = "", initialTone = "", next = "", authReady = false }) {
  const isCheckoutEnrollment = next.startsWith("/checkout");
  const selectedRole = isCheckoutEnrollment ? roles[0] : selectedRoleFor(initialRole);
  const [status, setStatus] = useState(initialMessage);
  const [tone, setTone] = useState(initialTone || (initialMessage ? "error" : ""));
  const [submitting, setSubmitting] = useState(false);
  const safeNext = useMemo(() => safeNextForRole(next, selectedRole.authRole), [next, selectedRole.authRole]);
  const hasError = tone === "error" && Boolean(status);
  const loginErrorId = "login-form-error";

  function clearStatus() {
    if (!status) return;
    setStatus("");
    setTone("");
  }

  async function handleLogin(event) {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    setSubmitting(true);
    setStatus("Signing you in...");
    setTone("success");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: formData.get("role"),
          email: formData.get("email"),
          password: formData.get("password"),
          next: formData.get("next")
        })
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        setStatus(payload.message || "Email or password didn't work. Try again.");
        setTone("error");
        setSubmitting(false);
        return;
      }

      window.location.assign(payload.destination || "/learners");
    } catch {
      setStatus("Login could not reach the server. Try again.");
      setTone("error");
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-neutral-950">{isCheckoutEnrollment ? "Course enrollment login" : `${selectedRole.title} login`}</h2>
          <Badge tone={authReady ? "green" : "amber"}>{authReady ? "Ready" : "Setup required"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {isCheckoutEnrollment ? null : <RolePicker page="login" selectedRole={selectedRole} next={safeNext} />}

        <form action="/api/auth/login" method="post" onSubmit={handleLogin} onInput={clearStatus} className="space-y-4">
          <input type="hidden" name="role" value={selectedRole.authRole} />
          <input type="hidden" name="next" value={safeNext} />
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-neutral-950">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-invalid={hasError}
              aria-describedby={hasError ? loginErrorId : undefined}
              autoComplete="email"
              placeholder="you@example.com"
              className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none transition focus:bg-white ${
                hasError ? "border-red-300 bg-red-50 focus:border-red-500" : "border-neutral-200 bg-neutral-50 focus:border-neutral-400"
              }`}
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
              required
              aria-invalid={hasError}
              aria-describedby={hasError ? loginErrorId : undefined}
              autoComplete="current-password"
              placeholder="Your password"
              className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none transition focus:bg-white ${
                hasError ? "border-red-300 bg-red-50 focus:border-red-500" : "border-neutral-200 bg-neutral-50 focus:border-neutral-400"
              }`}
            />
          </div>
          <StatusMessage id={loginErrorId} tone={tone} message={status} />
          <Button type="submit" variant="accent" className="w-full" disabled={submitting}>
            <LockKeyhole size={16} />
            {submitting ? "Signing in..." : "Log in"}
          </Button>
        </form>

        <div className="rounded-lg bg-neutral-50 p-4">
          <div className="flex items-start gap-3">
            <KeyRound className="mt-0.5 shrink-0 text-neutral-700" size={18} />
            <div>
              <p className="text-sm font-semibold text-neutral-950">{selectedRole.title}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {isCheckoutEnrollment ? "Log in as a learner to continue enrollment and complete payment for this course." : selectedRole.loginCopy}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-600">
          New to Ubuntu Academy?{" "}
          <Link href={safeNext ? `/signup?role=${selectedRole.id}&next=${encodeURIComponent(safeNext)}` : "/signup"} className="font-semibold text-neutral-950 underline underline-offset-4">
            Create an account
          </Link>
        </p>
        <p className="text-center text-sm text-neutral-600">
          Platform team?{" "}
          <Link href="/admin/login" className="inline-flex items-center gap-1 font-semibold text-neutral-950 underline underline-offset-4">
            <ShieldCheck size={14} />
            Admin login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export function SignupClient({ initialRole = "student", initialMessage = "", initialTone = "", next = "", authReady = false }) {
  const isCheckoutEnrollment = next.startsWith("/checkout");
  const selectedRole = isCheckoutEnrollment ? roles[0] : selectedRoleFor(initialRole);
  const safeNext = useMemo(() => safeNextForRole(next, selectedRole.authRole), [next, selectedRole.authRole]);
  const [status, setStatus] = useState(initialMessage);
  const [tone, setTone] = useState(initialTone || (initialMessage ? "error" : ""));
  const hasError = tone === "error" && Boolean(status);
  const signupErrorId = "signup-form-error";

  function clearStatus() {
    if (!status) return;
    setStatus("");
    setTone("");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-neutral-950">{isCheckoutEnrollment ? "Create learner account" : `${selectedRole.title} sign up`}</h2>
          <Badge tone={authReady ? "green" : "amber"}>{authReady ? "Ready" : "Setup required"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {isCheckoutEnrollment ? null : <RolePicker page="signup" selectedRole={selectedRole} next={safeNext} />}

        <form action="/api/auth/signup" method="post" onInput={clearStatus} className="space-y-4">
          <input type="hidden" name="role" value={selectedRole.authRole} />
          <input type="hidden" name="next" value={safeNext} />
          <div>
            <label htmlFor="full_name" className="text-sm font-semibold text-neutral-950">
              Full name
            </label>
            <input
              id="full_name"
              name="full_name"
              required
              aria-invalid={hasError}
              aria-describedby={hasError ? signupErrorId : undefined}
              autoComplete="name"
              placeholder="Your name"
              className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none transition focus:bg-white ${
                hasError ? "border-red-300 bg-red-50 focus:border-red-500" : "border-neutral-200 bg-neutral-50 focus:border-neutral-400"
              }`}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-neutral-950">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-invalid={hasError}
              aria-describedby={hasError ? signupErrorId : undefined}
              autoComplete="email"
              placeholder="you@example.com"
              className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none transition focus:bg-white ${
                hasError ? "border-red-300 bg-red-50 focus:border-red-500" : "border-neutral-200 bg-neutral-50 focus:border-neutral-400"
              }`}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-neutral-950">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                aria-invalid={hasError}
                aria-describedby={hasError ? signupErrorId : undefined}
                autoComplete="new-password"
                placeholder="8+ characters"
                className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none transition focus:bg-white ${
                  hasError ? "border-red-300 bg-red-50 focus:border-red-500" : "border-neutral-200 bg-neutral-50 focus:border-neutral-400"
                }`}
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="text-sm font-semibold text-neutral-950">
                Confirm password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                minLength={8}
                aria-invalid={hasError}
                aria-describedby={hasError ? signupErrorId : undefined}
                autoComplete="new-password"
                placeholder="Repeat password"
                className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none transition focus:bg-white ${
                  hasError ? "border-red-300 bg-red-50 focus:border-red-500" : "border-neutral-200 bg-neutral-50 focus:border-neutral-400"
                }`}
              />
            </div>
          </div>
          <StatusMessage id={signupErrorId} tone={tone} message={status} />
          <Button type="submit" variant="accent" className="w-full">
            <BadgeCheck size={16} />
            {isCheckoutEnrollment ? "Create learner account" : `Create ${selectedRole.title.toLowerCase()} account`}
          </Button>
        </form>

        <div className="rounded-lg bg-neutral-50 p-4">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-0.5 shrink-0 text-neutral-700" size={18} />
            <div>
              <p className="text-sm font-semibold text-neutral-950">{isCheckoutEnrollment ? "Next step: payment" : "Next profile step"}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {isCheckoutEnrollment ? "After signup, you will return to checkout with this course already selected." : selectedRole.signupCopy}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link href={safeNext ? `/login?role=${selectedRole.id}&next=${encodeURIComponent(safeNext)}` : "/login"} className="font-semibold text-neutral-950 underline underline-offset-4">
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

function RolePicker({ page, selectedRole, next = "" }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {roles.map((role) => {
        const Icon = role.icon;
        const active = selectedRole.id === role.id;

        return (
          <Link
            key={role.id}
            href={rolePath(role, page, next)}
            className={`rounded-lg border p-4 transition ${
              active ? "border-[#1e1616] bg-[#1e1616] text-white" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <Icon size={18} />
            <p className="mt-3 text-sm font-semibold">{role.title}</p>
          </Link>
        );
      })}
    </div>
  );
}

function StatusMessage({ id, tone, message }) {
  if (!message) return null;

  return (
    <div
      id={id}
      role="status"
      className={`rounded-md border p-3 text-sm font-semibold ${
        tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {message}
    </div>
  );
}
