import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/auth/session";
import { LearnerOnboardingForm } from "./learner-onboarding-form";

export const dynamic = "force-dynamic";

const messages = {
  required: "We need a few details to get you set up. Tell us where you are, what interests you, and your learning goal.",
  "save-error": "We couldn't save your profile. Check your connection and try again.",
  "db-env": "We're setting things up. Come back in a few minutes."
};

export default async function LearnerOnboardingPage({ searchParams }) {
  await requireUser({ role: "learner", redirectTo: "/onboarding/learner" });
  const params = await searchParams;
  const message = messages[params?.message];

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <Badge tone="green">Learner profile</Badge>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight text-neutral-950 md:text-6xl">
              Set your learning compass.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              A few focused steps help mentors understand your context, interests, and schedule before recommending a pathway.
            </p>
          </div>

          <LearnerOnboardingForm message={message} messageKey={params?.message} />
        </div>
      </section>
    </SiteShell>
  );
}
