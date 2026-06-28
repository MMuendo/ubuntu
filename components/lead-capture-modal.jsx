"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Mail, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { consultationGroups } from "@/lib/academy/site-content";

function initialForm(defaultType) {
  return {
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    consultationType: defaultType || "AI & Intelligent Automation",
    notes: ""
  };
}

export function LeadCaptureButton({
  label = "Book Consultation",
  title = "Share your details",
  defaultType = "AI & Intelligent Automation",
  source = "consultation",
  variant = "accent",
  size = "default",
  className = ""
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => initialForm(defaultType));
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const consultationOptions = useMemo(() => {
    const options = consultationGroups.flatMap((group) => group.options);
    return options.includes(defaultType) ? options : [defaultType, ...options];
  }, [defaultType]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          consultationType: form.consultationType || defaultType,
          courseName: defaultType,
          metadata: { source, organization: form.organization }
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        setStatus(payload.message || "We could not save this yet. Please try again.");
        return;
      }

      setStatus("Thank you. Ubuntu Analytiq will follow up with you.");
      setForm(initialForm(defaultType));
    } catch {
      setStatus("We could not reach the form service. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button type="button" variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        {label}
        <ArrowRight size={16} />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1e1616]/70 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-lg border border-white/10 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Follow-up request</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1e1616]">{title}</h2>
              </div>
              <button
                type="button"
                aria-label="Close form"
                onClick={() => setOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-[#00b4d8] hover:text-[#1e1616]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitForm} className="grid gap-4 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-[#1e1616]">
                  Full name
                  <input
                    required
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    className="h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#1e1616]">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-[#1e1616]">
                  Phone
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#1e1616]">
                  Organization
                  <input
                    value={form.organization}
                    onChange={(event) => updateField("organization", event.target.value)}
                    className="h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-[#1e1616]">
                Interest
                <select
                  value={form.consultationType}
                  onChange={(event) => updateField("consultationType", event.target.value)}
                  className="h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                >
                  {consultationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-[#1e1616]">
                Notes
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                />
              </label>

              {status ? <p className="rounded-md bg-[#e8f8fb] p-3 text-sm text-[#1e1616]">{status}</p> : null}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button type="submit" variant="accent" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit details"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function DataAIConsultations() {
  return (
    <section className="ubuntu-heritage-bg kenya-watermark py-16" id="consultations">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <div className="max-w-2xl lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Data & AI Consultations</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#1e1616] md:text-4xl">
              Build systems, train teams, improve decisions, and automate operations.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Practical advisory for teams building dashboards, automation, data strategy, migration support, analytics, and AI capability for their market.
            </p>
            <LeadCaptureButton
              label="Book Consultation"
              title="Book a Data & AI Consultation"
              defaultType="AI & Intelligent Automation"
              className="mt-7 w-full sm:w-auto"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {consultationGroups.map((group) => (
              <Card key={group.title} className="ubuntu-intel-card h-full shadow-sm">
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#1e1616] text-[#00b4d8]">
                      {group.title === "Train Teams" ? <Mail size={18} /> : group.title === "Build Systems" ? <Building2 size={18} /> : <CheckCircle2 size={18} />}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#1e1616]">{group.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{group.summary}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {group.options.map((option) => (
                      <p key={option} className="rounded-md bg-[#f1f5f9] p-2.5 text-sm text-slate-700">{option}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
