import Link from "next/link";
import { BadgeCheck, ClipboardList, Coins, FileText, Gauge, Hammer, Sparkles } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { submitMentorProjectProposal } from "@/app/projects/actions";

export const dynamic = "force-dynamic";

const messages = {
  required: "Add the required project details to submit.",
  "save-error": "Project proposal could not be saved. Please try again or contact support.",
  "setup-required": "Mentor proposal submissions are not ready yet.",
  submitted: "Project proposal submitted for admin review.",
  "db-env": "Project proposals are not ready yet. Please contact Ubuntu Analytiq support."
};

export default async function ProposeProjectPage({ searchParams }) {
  const params = await searchParams;
  const message = messages[params?.message];

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <Badge tone="teal">Mentor projects</Badge>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight text-neutral-950 md:text-6xl">
              Propose a project brief.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Mentor-created projects enter an admin approval queue. Credits are awarded only after the brief is approved.
            </p>
            {message ? (
              <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                {message}
              </div>
            ) : null}
            <Button asChild variant="outline" className="mt-6">
              <Link href="/mentors">Back to mentor workspace</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Project details</h2>
            </CardHeader>
            <CardContent>
              <form action={submitMentorProjectProposal} className="space-y-5">
                <Field icon={ClipboardList} label="Project title" name="title" placeholder="Customer churn analysis for a subscription business" />

                <div>
                  <label htmlFor="problem_statement" className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    <FileText size={16} />
                    Problem statement
                  </label>
                  <textarea
                    id="problem_statement"
                    name="problem_statement"
                    rows={4}
                    placeholder="Describe the business problem learners will solve."
                    className="mt-2 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="difficulty" className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                      <Gauge size={16} />
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
                    >
                      <option value="">Select difficulty</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <Field icon={Sparkles} label="Estimated duration" name="estimated_duration" placeholder="2 weeks" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field icon={Hammer} label="Skills" name="skills" placeholder="SQL, Excel, dashboards" />
                  <Field icon={Hammer} label="Tools" name="tools" placeholder="SQL, Power BI, Python" />
                </div>

                <Field label="Prerequisites" name="prerequisites" placeholder="Basic spreadsheet formulas, joins, charts" />
                <Field icon={BadgeCheck} label="Final deliverable" name="final_deliverable" placeholder="Dashboard plus a written recommendation memo" />

                <div>
                  <label htmlFor="rubric" className="text-sm font-semibold text-neutral-950">
                    Evaluation rubric
                  </label>
                  <textarea
                    id="rubric"
                    name="rubric"
                    rows={4}
                    placeholder="List the scoring criteria learners should be judged on."
                    className="mt-2 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_0.55fr]">
                  <Field label="Mentor notes" name="mentor_notes" placeholder="Dataset idea, review notes, or context for admins" />
                  <Field icon={Coins} label="Credits requested" name="credit_value_requested" type="number" placeholder="10" />
                </div>

                <Button type="submit" variant="accent" className="w-full">
                  <BadgeCheck size={16} />
                  Submit for approval
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ icon: Icon, label, name, placeholder, type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
        {Icon ? <Icon size={16} /> : null}
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
      />
    </div>
  );
}
