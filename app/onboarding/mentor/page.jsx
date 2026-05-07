import { BadgeCheck, BriefcaseBusiness, CalendarClock, FileText, Link as LinkIcon, MapPin, Sparkles } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { saveMentorOnboarding } from "@/app/onboarding/actions";

export const dynamic = "force-dynamic";

const messages = {
  required: "Add the required mentor details and accept the code of conduct.",
  "save-error": "Mentor profile could not be saved. Please try again or contact support.",
  "db-env": "Mentor onboarding is not ready yet. Please contact Ubuntu Analytiq support."
};

const specialties = ["Data analysis", "AI", "Python", "Excel", "Power BI", "Product", "Career coaching", "Research"];
const availability = ["Weekday mornings", "Weekday evenings", "Weekends", "Flexible"];

export default async function MentorOnboardingPage({ searchParams }) {
  const params = await searchParams;
  const message = messages[params?.message];
  const saveAction = saveMentorOnboarding.bind(null, "");

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <Badge tone="teal">Mentor review</Badge>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight text-neutral-950 md:text-6xl">
              Build your mentor profile.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Mentor accounts are reviewed before they can be publicly listed, receive assignments, or earn credits for approved project briefs.
            </p>
            {message ? (
              <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                {message}
              </div>
            ) : null}
          </div>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Application details</h2>
            </CardHeader>
            <CardContent>
              <form action={saveAction} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field icon={BriefcaseBusiness} label="Professional title" name="title" placeholder="Data Analyst Mentor" />
                  <Field icon={BriefcaseBusiness} label="Company" name="company" placeholder="Company or Independent" />
                  <Field icon={MapPin} label="Location and time zone" name="location" placeholder="Nairobi, Africa/Nairobi" />
                  <Field icon={CalendarClock} label="Years of experience" name="years_experience" type="number" placeholder="3" />
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-neutral-950">Mentoring specialties</legend>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {specialties.map((item) => (
                      <CheckOption key={item} name="specialties" value={item} label={item} />
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-semibold text-neutral-950">Availability</legend>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {availability.map((item) => (
                      <CheckOption key={item} name="availability" value={item} label={item} />
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="bio" className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    <FileText size={16} />
                    Short bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Share the work you do and the learners you are best placed to support."
                    className="mt-2 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="motivation" className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    <Sparkles size={16} />
                    Why mentor with Ubuntu Academy?
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    rows={3}
                    placeholder="A short note for the review team."
                    className="mt-2 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Field icon={LinkIcon} label="LinkedIn" name="linkedin_url" placeholder="https://..." type="url" />
                  <Field icon={LinkIcon} label="GitHub" name="github_url" placeholder="https://..." type="url" />
                  <Field icon={LinkIcon} label="Portfolio" name="portfolio_url" placeholder="https://..." type="url" />
                </div>

                <label className="flex items-start gap-3 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm font-medium text-neutral-700">
                  <input name="code_of_conduct" value="yes" type="checkbox" className="mt-0.5 size-4 accent-neutral-950" />
                  I agree to the mentor code of conduct and understand that project credits require admin approval.
                </label>

                <Button type="submit" variant="accent" className="w-full">
                  <BadgeCheck size={16} />
                  Submit mentor profile
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

function CheckOption({ name, value, label }) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-700">
      <input name={name} value={value} type="checkbox" className="size-4 accent-neutral-950" />
      {label}
    </label>
  );
}
