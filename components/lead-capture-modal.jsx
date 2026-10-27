"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Building2, CheckCircle2, Mail, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { consultationGroups } from "@/lib/academy/site-content";
import { whatsappHref } from "@/lib/whatsapp";

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
  label = "Request a consultation",
  title = "Share your details",
  defaultType = "AI & Intelligent Automation",
  notesLabel = "Notes",
  notesPlaceholder = "",
  notesRequired = false,
  variant = "accent",
  size = "default",
  className = ""
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => initialForm(defaultType));
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("input")?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open]);

  const consultationOptions = useMemo(() => {
    const options = consultationGroups.flatMap((group) => group.options);
    return options.includes(defaultType) ? options : [defaultType, ...options];
  }, [defaultType]);

  const message = [
    `Hello Ubuntu Analytiq, I would like to ask about ${form.consultationType}.`,
    form.fullName.trim() && `Name: ${form.fullName.trim()}`,
    form.email.trim() && `Email: ${form.email.trim()}`,
    form.phone.trim() && `Phone: ${form.phone.trim()}`,
    form.organization.trim() && `Organization: ${form.organization.trim()}`,
    form.notes.trim() && `${notesLabel}: ${form.notes.trim()}`
  ].filter(Boolean).join("\n");
  const chatHref = whatsappHref(message);
  const canContinue = !notesRequired || Boolean(form.notes.trim());

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <>
      <Button type="button" variant={variant} size={size} className={className} onClick={(event) => { returnFocusRef.current = event.currentTarget; setOpen(true); }}>
        {label}
        <ArrowRight size={16} />
      </Button>

      {open ? createPortal(
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1e1616]/70 px-4 py-4 backdrop-blur-sm sm:py-6">
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-lg border border-white/10 bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Follow-up request</p>
                <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight text-[#1e1616]">{title}</h2>
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

            <div className="grid w-full min-w-0 grid-cols-1 gap-4 p-5">
              <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#1e1616]">
                  Full name (optional)
                  <input
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    className="h-11 min-w-0 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                  />
                </label>
                <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#1e1616]">
                  Email (optional)
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="h-11 min-w-0 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#1e1616]">
                  Phone (optional)
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="h-11 min-w-0 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                  />
                </label>
                <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#1e1616]">
                  Organization (optional)
                  <input
                    autoComplete="organization"
                    value={form.organization}
                    onChange={(event) => updateField("organization", event.target.value)}
                    className="h-11 min-w-0 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                  />
                </label>
              </div>

              <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#1e1616]">
                Interest
                <select
                  value={form.consultationType}
                  onChange={(event) => updateField("consultationType", event.target.value)}
                  className="h-11 min-w-0 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                >
                  {consultationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#1e1616]">
                {notesLabel}{notesRequired ? "" : " (optional)"}
                <textarea
                  placeholder={notesPlaceholder}
                  rows={4}
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  className="min-w-0 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm font-normal outline-none focus:border-[#00b4d8] focus:bg-white"
                />
              </label>

              <p className="text-sm text-slate-600">WhatsApp opens with your message ready. Review it and tap Send there.</p>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
                {canContinue ? <Button asChild variant="accent"><a href={chatHref} target="_blank" rel="noopener noreferrer">Continue in WhatsApp</a></Button> : <Button type="button" variant="accent" disabled>Describe the decision first</Button>}
              </div>
            </div>
          </div>
        </div>,
        document.body
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
              label="Ask on WhatsApp"
              title="Request a Data & AI Consultation"
              defaultType="AI & Intelligent Automation"
              className="mt-7 w-full sm:w-auto"
            />
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
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
