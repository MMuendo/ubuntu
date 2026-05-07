"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProjectSubmissionForm({ projectSlug }) {
  const [artifactUrl, setArtifactUrl] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    setStatus("");

    if (!artifactUrl.trim()) {
      setStatus("error");
      setMessage("Add a link to your workbook, dashboard, document, or repository.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/project-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectSlug, artifactUrl })
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.message || "Submission could not be saved.");
      } else {
        setStatus("success");
        setMessage("Submission saved. A mentor can now review it.");
        setArtifactUrl("");
      }
    } catch {
      setStatus("error");
      setMessage("Submission could not be saved.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="artifact-url" className="text-sm font-semibold text-[#1e1616]">
          Artifact link
        </label>
        <input
          id="artifact-url"
          type="url"
          value={artifactUrl}
          onChange={(event) => setArtifactUrl(event.target.value)}
          placeholder="https://..."
          className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#00b4d8]"
          disabled={submitting}
        />
        <p className="mt-2 text-xs text-slate-500">Use a shareable Google Drive, OneDrive, GitHub, Tableau, Power BI, or document link.</p>
      </div>
      {message ? (
        <p className={`rounded-md p-3 text-sm font-medium ${status === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {message}
        </p>
      ) : null}
      <Button type="submit" variant="accent" disabled={submitting}>
        {submitting ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
        Submit for review
      </Button>
    </form>
  );
}
