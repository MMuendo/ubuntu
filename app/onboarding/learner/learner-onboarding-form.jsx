"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpenCheck, CalendarClock, CheckCircle2, Goal, MapPin, Phone, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const interests = ["Data analysis", "AI", "Agentic AI", "Python", "Excel", "Power BI", "Business", "Design", "Career prep"];
const availabilityOptions = ["Weekday mornings", "Weekday evenings", "Weekends", "Flexible"];

const steps = [
  {
    title: "Where you are",
    copy: "Start with contact and location so mentors can plan realistic sessions.",
    eyebrow: "Step 1"
  },
  {
    title: "What pulls you in",
    copy: "Choose the subjects that should shape your first pathway and project.",
    eyebrow: "Step 2"
  },
  {
    title: "How you will move",
    copy: "Set availability and goals so the next recommendation is practical.",
    eyebrow: "Step 3"
  }
];

const initialValues = {
  phone: "",
  country: "",
  time_zone: "Africa/Nairobi",
  institution: "",
  interests: [],
  age_bracket: "",
  availability: [],
  learning_goal: "",
  guardian_contact: ""
};

export function LearnerOnboardingForm({ message, messageKey }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const current = steps[step];
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function updateField(name, value) {
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  }

  function toggleList(name, value) {
    setValues((currentValues) => {
      const existing = currentValues[name];
      const next = existing.includes(value) ? existing.filter((item) => item !== value) : [...existing, value];
      return { ...currentValues, [name]: next };
    });
  }

  function goBack(event) {
    event.preventDefault();
    setStep((value) => Math.max(value - 1, 0));
  }

  function goNext(event) {
    event.preventDefault();
    setSubmitError("");
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    const phone = values.phone.trim();
    const country = values.country.trim();
    const timeZone = values.time_zone.trim();
    const learningGoal = values.learning_goal.trim();

    if (!phone || !country || !timeZone || !learningGoal) {
      setSubmitError("We need your contact info, location, and what you want to learn. No gaps, please.");
      setFieldErrors({
        phone: phone ? "" : "Add your phone or WhatsApp number.",
        country: country ? "" : "Add your country or city.",
        time_zone: timeZone ? "" : "Add your time zone.",
        learning_goal: learningGoal ? "" : "Tell us what you want to learn."
      });
      setStep(!phone || !country || !timeZone ? 0 : 2);
      return;
    }

    setSaving(true);

    const response = await fetch("/api/onboarding/learner", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone,
        country,
        time_zone: timeZone,
        institution: values.institution.trim(),
        interests: values.interests,
        learning_goal: learningGoal,
        availability: values.availability,
        age_bracket: values.age_bracket,
        guardian_contact: values.guardian_contact.trim(),
        onboarding_complete: true,
        updated_at: new Date().toISOString()
      })
    });

    const result = await response.json().catch(() => ({
      ok: false,
      message: "Something went wrong saving your profile. Check your internet and try again."
    }));

    if (response.status === 401) {
      router.push("/login?role=student&message=session-required&next=%2Fonboarding%2Flearner");
      return;
    }

    if (!response.ok || !result.ok) {
      setSubmitError(result.message || "We couldn't save your profile. Try again or reach out to us.");
      setSaving(false);
      return;
    }

    router.push("/learners?message=learner-ready");
    router.refresh();
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-cyan">{current.eyebrow}</p>
            <h2 className="mt-1 font-semibold text-neutral-950">{current.title}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
            <span>{progress}%</span>
            <span className="h-3 w-full min-w-32 overflow-hidden rounded-full bg-neutral-100 sm:w-48">
              <span className="block h-full rounded-full bg-[#00b4d8] transition-all" style={{ width: `${progress}%` }} />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 0 ? (
            <section className="space-y-5">
              <StepIntro icon={MapPin} title={current.title} copy={current.copy} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field name="phone" icon={Phone} label="Phone or WhatsApp" value={values.phone} error={fieldErrors.phone} onChange={(value) => updateField("phone", value)} placeholder="+254..." />
                <Field name="country" icon={MapPin} label="Country or city" value={values.country} error={fieldErrors.country} onChange={(value) => updateField("country", value)} placeholder="Nairobi, Kenya" />
                <Field name="time_zone" icon={CalendarClock} label="Time zone" value={values.time_zone} error={fieldErrors.time_zone} onChange={(value) => updateField("time_zone", value)} placeholder="Africa/Nairobi" />
                <Field icon={BookOpenCheck} label="School or organization" value={values.institution} onChange={(value) => updateField("institution", value)} placeholder="Optional" />
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="space-y-5">
              <StepIntro icon={Sparkles} title={current.title} copy={current.copy} />
              <fieldset>
                <legend className="text-sm font-semibold text-neutral-950">Interests</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {interests.map((item) => (
                    <CheckOption
                      key={item}
                      checked={values.interests.includes(item)}
                      label={item}
                      onChange={() => toggleList("interests", item)}
                    />
                  ))}
                </div>
              </fieldset>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="space-y-5">
              <StepIntro icon={Goal} title={current.title} copy={current.copy} />
              <div>
                <label htmlFor="age_bracket_visible" className="text-sm font-semibold text-neutral-950">
                  Age bracket
                </label>
                <select
                  id="age_bracket_visible"
                  value={values.age_bracket}
                  onChange={(event) => updateField("age_bracket", event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-neutral-400 focus:bg-white"
                >
                  <option value="">Prefer not to say</option>
                  <option value="under-18">Under 18</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-plus">35+</option>
                </select>
              </div>

              <fieldset>
                <legend className="text-sm font-semibold text-neutral-950">Availability</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {availabilityOptions.map((item) => (
                    <CheckOption
                      key={item}
                      checked={values.availability.includes(item)}
                      label={item}
                      onChange={() => toggleList("availability", item)}
                    />
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="learning_goal_visible" className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                  <Goal size={16} />
                  Learning goal
                </label>
                <textarea
                  id="learning_goal_visible"
                  value={values.learning_goal}
                  onChange={(event) => updateField("learning_goal", event.target.value)}
                  aria-invalid={Boolean(fieldErrors.learning_goal)}
                  aria-describedby={fieldErrors.learning_goal ? "learning_goal_error" : undefined}
                  rows={4}
                  placeholder="Example: I want to learn data analysis and build a portfolio project for internships."
                  className={`mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:bg-white ${
                    fieldErrors.learning_goal ? "border-red-300 bg-red-50 focus:border-red-500" : "border-neutral-200 bg-neutral-50 focus:border-neutral-400"
                  }`}
                />
                {fieldErrors.learning_goal ? <p id="learning_goal_error" className="mt-2 text-sm font-medium text-red-700">{fieldErrors.learning_goal}</p> : null}
              </div>

              <Field label="Guardian contact" value={values.guardian_contact} onChange={(value) => updateField("guardian_contact", value)} placeholder="Required only for younger learners" />
            </section>
          ) : null}

          {message || submitError ? (
            <div
              role="status"
              className={`rounded-md border p-3 text-sm font-semibold ${
                messageKey === "learner-ready" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {submitError || message}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="outline" disabled={step === 0} onClick={goBack}>
              <ArrowLeft size={16} />
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" variant="accent" onClick={goNext}>
                Continue
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button type="submit" variant="accent" disabled={saving}>
                <Sparkles size={16} />
                {saving ? "Saving..." : "Save learner profile"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function StepIntro({ icon: Icon, title, copy }) {
  return (
    <div className="rounded-lg bg-neutral-50 p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1e1616] text-white">
          <Icon size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold text-neutral-950">{title}</p>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{copy}</p>
        </div>
      </div>
    </div>
  );
}

function Field({ name, icon: Icon, label, value, onChange, placeholder, error = "" }) {
  const inputId = name ? `${name}_visible` : undefined;
  const errorId = name ? `${name}_error` : undefined;

  return (
    <div>
      <label htmlFor={inputId} className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
        {Icon ? <Icon size={16} /> : null}
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        placeholder={placeholder}
        className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none transition focus:bg-white ${
          error ? "border-red-300 bg-red-50 focus:border-red-500" : "border-neutral-200 bg-neutral-50 focus:border-neutral-400"
        }`}
      />
      {error ? <p id={errorId} className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
    </div>
  );
}

function CheckOption({ checked, label, onChange }) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-white">
      <input checked={checked} onChange={onChange} type="checkbox" className="size-4 accent-neutral-950" />
      <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
        {label}
        <CheckCircle2 size={15} className={checked ? "text-emerald-600" : "text-neutral-300"} />
      </span>
    </label>
  );
}
