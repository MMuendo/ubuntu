"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { mentorshipFormats, mentorshipTiers, mentorshipTools, mentorshipTopics, matchingProjects } from "@/lib/mentorship/catalog";

const field = "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#1e1616] focus:border-[#00b4d8] focus:outline-none";
const label = "block text-sm font-semibold text-[#1e1616]";

export function ApplicationForm({ projects, initialTier, initialProject }) {
  const [tool, setTool] = useState("");
  const [topic, setTopic] = useState("");
  const [tier, setTier] = useState(mentorshipTiers.some((item) => item.id === initialTier) ? initialTier : "guided");
  const [format, setFormat] = useState("project");
  const [projectSlug, setProjectSlug] = useState(projects.some((project) => project.slug === initialProject) ? initialProject : "");
  const [skillLevel, setSkillLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [availability, setAvailability] = useState("");
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const relevantProjects = useMemo(() => matchingProjects(projects, tool, topic), [projects, tool, topic]);

  async function loadApplications() {
    const response = await fetch("/api/mentorship/applications");
    const payload = await response.json().catch(() => ({}));
    if (response.ok) setApplications(payload.applications || []);
  }
  useEffect(() => { loadApplications().catch(() => null); }, []);
  useEffect(() => {
    if (projectSlug && !relevantProjects.some((project) => project.slug === projectSlug)) setProjectSlug("");
  }, [relevantProjects, projectSlug]);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/mentorship/applications", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, topic, tier, format, projectSlug, skillLevel, goal, availability })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) { setMessage(payload.message || "Application could not be sent."); return; }
      setMessage("Application received. You can track the decision below.");
      await loadApplications();
    } catch { setMessage("Connection failed. Please try again."); }
    finally { setBusy(false); }
  }

  return <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
    <form onSubmit={submit} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>Tool <span className="font-normal text-slate-500">(optional)</span><select className={field} value={tool} onChange={(event) => setTool(event.target.value)}><option value="">Choose a tool</option>{mentorshipTools.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className={label}>Topic <span className="font-normal text-slate-500">(optional)</span><select className={field} value={topic} onChange={(event) => setTopic(event.target.value)}><option value="">Choose a topic</option>{mentorshipTopics.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p className="-mt-3 text-xs text-slate-500">Choose at least one. Both choices can guide your project match.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>Support level<select className={field} value={tier} onChange={(event) => setTier(event.target.value)}>{mentorshipTiers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label className={label}>Format<select className={field} value={format} onChange={(event) => setFormat(event.target.value)}>{mentorshipFormats.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      </div>
      <label className={label}>Project to start with <span className="font-normal text-slate-500">(optional)</span><select className={field} value={projectSlug} onChange={(event) => setProjectSlug(event.target.value)}><option value="">Help me choose</option>{relevantProjects.map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}</select></label>
      {tool || topic ? <p className="-mt-3 text-xs text-slate-500">{relevantProjects.length ? `${relevantProjects.length} related project briefs found.` : "No current brief matches exactly. You can still apply and we will suggest one."}</p> : null}
      {(tool || topic) && relevantProjects.length > 0 ? <div className="grid gap-3 sm:grid-cols-2">{relevantProjects.slice(0, 6).map((project) => <button type="button" key={project.slug} onClick={() => setProjectSlug(project.slug)} className={`rounded-lg border p-4 text-left transition ${projectSlug === project.slug ? "border-[#00b4d8] bg-[#e8f8fb]" : "border-slate-200 bg-slate-50 hover:border-[#00b4d8]/50"}`}><span className="text-xs font-semibold uppercase text-[#007c97]">{project.track}</span><strong className="mt-1 block text-sm">{project.title}</strong><span className="mt-2 line-clamp-2 block text-xs leading-5 text-slate-600">{project.summary}</span></button>)}</div> : null}
      <label className={label}>Your current level<select required className={field} value={skillLevel} onChange={(event) => setSkillLevel(event.target.value)}><option value="">Choose your level</option><option>Beginner</option><option>Some experience</option><option>Working professional</option></select></label>
      <label className={label}>What do you want to build or improve?<textarea required rows={4} maxLength={1200} className={field} value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="For example: build a sales dashboard I can explain in an interview." /></label>
      <label className={label}>When can you attend sessions?<textarea required rows={2} maxLength={500} className={field} value={availability} onChange={(event) => setAvailability(event.target.value)} placeholder="For example: weekday evenings, East Africa Time." /></label>
      {message && <p role="status" className="rounded-md bg-[#e8f8fb] p-3 text-sm text-[#1e1616]">{message}</p>}
      <Button type="submit" variant="accent" disabled={busy || applications.some((item) => item.status === "pending")}>{busy ? "Sending…" : "Submit application"}</Button>
    </form>
    <aside className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-[#f8fbfd] p-5"><h2 className="font-semibold">Your applications</h2>{applications.length ? applications.map((item) => <div key={item.id} className="mt-4 border-t border-slate-200 pt-4 text-sm"><p className="font-semibold capitalize">{item.tier} · {item.status}</p><p className="mt-1 text-slate-600">{[item.tool, item.topic].filter(Boolean).join(" · ")}</p>{item.review_notes && <p className="mt-2 text-slate-600">{item.review_notes}</p>}{item.status === "approved" && item.offer_plan_id && item.approved_price_kes ? <Link className="mt-3 inline-block font-semibold text-[#007c97] underline" href={`/checkout?productType=plan&planId=mentorship-${item.id}&productName=Mentorship&amountKes=${item.approved_price_kes}`}>Pay KES {Number(item.approved_price_kes).toLocaleString()}</Link> : null}{item.status === "approved" && !item.offer_plan_id ? <p className="mt-2 text-slate-600">Approved. We will confirm scope and price before payment opens.</p> : null}{item.status === "paid" ? <Link className="mt-3 inline-block font-semibold text-[#007c97] underline" href="/mentorships/workspace">Open your mentorship work</Link> : null}</div>) : <p className="mt-2 text-sm text-slate-600">No applications yet.</p>}</div>
      <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600"><h2 className="font-semibold text-[#1e1616]">What happens next?</h2><p className="mt-2">We review your goal, project fit, and mentor capacity. If approved, we confirm the session count and price before you pay.</p></div>
    </aside>
  </div>;
}
