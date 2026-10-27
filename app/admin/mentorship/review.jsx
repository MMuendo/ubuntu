"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const field = "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm";

export function MentorshipReview({ applications, groups, projects }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");

  async function send(body) {
    setBusyId(body.id);
    setMessage("");
    try {
      const response = await fetch("/api/admin/mentorship", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) { setMessage(payload.message || "Could not save review."); return; }
      router.refresh();
      setMessage("Review saved.");
    } catch { setMessage("Connection failed. Please try again."); }
    finally { setBusyId(""); }
  }

  return <div className="mt-8 space-y-10">
    {message && <p role="status" className="rounded-md bg-[#e8f8fb] p-3 text-sm">{message}</p>}
    <section><h2 className="text-2xl font-semibold">Individual applications ({applications.length})</h2>
      <div className="mt-4 grid gap-4">{applications.length ? applications.map((item) => <ApplicationCard key={item.id} item={item} projects={projects} busy={busyId === item.id} send={send} />) : <p className="text-sm text-slate-600">No applications yet.</p>}</div>
    </section>
    <section><h2 className="text-2xl font-semibold">Group requests ({groups.length})</h2>
      <div className="mt-4 grid gap-4">{groups.length ? groups.map((item) => <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap justify-between gap-2"><h3 className="font-semibold">{item.full_name} · {item.organization || "Group"}</h3><span className="text-sm capitalize text-slate-600">{item.status}</span></div>
        <p className="mt-1 text-sm text-slate-600">{item.email} · {item.group_size} people · {item.focus}</p>
        <p className="mt-3 whitespace-pre-wrap text-sm">{item.goals}</p>
        <div className="mt-4 flex gap-2"><Button size="sm" variant="accent" disabled={busyId === item.id} onClick={() => send({ kind: "group", id: item.id, status: "contacted" })}>Mark contacted</Button><Button size="sm" variant="outline" disabled={busyId === item.id} onClick={() => send({ kind: "group", id: item.id, status: "closed" })}>Close</Button></div>
      </div>) : <p className="text-sm text-slate-600">No group requests yet.</p>}</div>
    </section>
  </div>;
}

function ApplicationCard({ item, projects, busy, send }) {
  const [notes, setNotes] = useState(item.review_notes || "");
  const [priceKes, setPriceKes] = useState(item.approved_price_kes || "");
  const [sessionCount, setSessionCount] = useState(item.approved_session_count || "");
  const [projectSlug, setProjectSlug] = useState(item.project_slug || "");
  return <div className="rounded-lg border border-slate-200 bg-white p-5">
    <div className="flex flex-wrap justify-between gap-2"><h3 className="font-semibold">{item.full_name} · {item.email}</h3><span className="text-sm font-semibold capitalize text-[#007c97]">{item.status}</span></div>
    <p className="mt-2 text-sm text-slate-600">{[item.tool, item.topic].filter(Boolean).join(" · ")} · {item.tier} · {item.format === "full_mentor" ? "Full mentor" : "Project"}</p>
    <p className="mt-1 text-sm text-slate-600">Level: {item.skill_level} · Project: {item.project_slug || "Help choose"}</p>
    <p className="mt-3 whitespace-pre-wrap text-sm"><strong>Goal:</strong> {item.goal}</p>
    <p className="mt-2 whitespace-pre-wrap text-sm"><strong>Availability:</strong> {item.availability}</p>
    {item.status !== "paid" && <div className="mt-5 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
      <label className="text-sm font-semibold">Price in KES <span className="font-normal text-slate-500">(leave open if undecided)</span><input className={field} type="number" min="1" max="1000000" value={priceKes} onChange={(event) => setPriceKes(event.target.value)} /></label>
      <label className="text-sm font-semibold">Session count<input className={field} type="number" min="1" max="100" value={sessionCount} onChange={(event) => setSessionCount(event.target.value)} /></label>
      <label className="text-sm font-semibold sm:col-span-2">Starting project<select className={field} value={projectSlug} onChange={(event) => setProjectSlug(event.target.value)}><option value="">Choose after review</option>{projects.map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}</select></label>
      <label className="text-sm font-semibold sm:col-span-2">Notes for applicant<textarea rows={2} maxLength={1000} className={field} value={notes} onChange={(event) => setNotes(event.target.value)} /></label>
      <div className="flex gap-2 sm:col-span-2"><Button size="sm" variant="accent" disabled={busy} onClick={() => send({ id: item.id, decision: "approve", notes, priceKes, sessionCount, projectSlug })}>Approve / update offer</Button><Button size="sm" variant="outline" disabled={busy} onClick={() => send({ id: item.id, decision: "decline", notes })}>Decline</Button></div>
    </div>}
  </div>;
}
