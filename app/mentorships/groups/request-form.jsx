"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const field = "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-[#00b4d8] focus:outline-none";

export function GroupRequestForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setMessage("");
    const values = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/mentorship/groups", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const payload = await response.json().catch(() => ({}));
      setMessage(response.ok ? "Request received. We will review your group's needs." : payload.message || "Request could not be sent.");
      if (response.ok) form.reset();
    } catch { setMessage("Connection failed. Please try again."); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="mt-8 grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Your name<input required name="fullName" maxLength={150} className={field} /></label><label className="text-sm font-semibold">Email<input required type="email" name="email" maxLength={254} className={field} /></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Organization <span className="font-normal text-slate-500">(optional)</span><input name="organization" maxLength={200} className={field} /></label><label className="text-sm font-semibold">Group size<input required type="number" name="groupSize" min="2" max="10000" className={field} /></label></div>
    <label className="text-sm font-semibold">Focus<input required name="focus" maxLength={200} className={field} placeholder="For example: Power BI reporting for our finance team" /></label>
    <label className="text-sm font-semibold">What should the group be able to do?<textarea required name="goals" rows={4} maxLength={1000} className={field} /></label>
    {message && <p role="status" className="rounded-md bg-[#e8f8fb] p-3 text-sm">{message}</p>}
    <Button type="submit" variant="accent" disabled={busy}>{busy ? "Sending…" : "Send group request"}</Button>
  </form>;
}
