"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const control = "mt-2 block w-full rounded-md border border-slate-300 bg-white p-3 text-[#141014] focus-visible:outline-2 focus-visible:outline-[#007c97]";
const panel = "rounded-lg border border-[#00b4d8]/25 bg-[#e8f8fb] p-5 text-sm leading-7 text-[#141014]";

function MigrationDemo() {
  const [field, setField] = useState("name");
  const [checked, setChecked] = useState(false);
  return <div className="grid gap-6 md:grid-cols-2">
    <div><p className="font-semibold">Sample source records</p><ul className="mt-3 space-y-2 text-sm"><li>MB-001 · Amina · KES 4,000</li><li>MB-002 · Kamau · KES 6,000</li><li>Missing ID · Njeri · KES 3,000</li></ul><label className="mt-5 block text-sm font-semibold">Map the new member_id field to<select className={control} value={field} onChange={e => { setField(e.target.value); setChecked(false); }}><option value="name">Member name</option><option value="id">Member ID</option></select></label><Button className="mt-4" onClick={() => setChecked(true)}>Validate mapping</Button></div>
    <div role="status" className={panel}>{!checked ? "Run validation to see which records can move." : field === "id" ? <><strong>2 ready · 1 held for review</strong><p>The record without an ID stays in the exception report.</p><p>Source: KES 13,000 = ready: KES 10,000 + held: KES 3,000.</p><p>Cutover stays blocked until the missing ID is resolved.</p></> : <><strong>Mapping needs correction.</strong><p>Names are not stable member IDs. Select Member ID, then validate again. No records have moved.</p></>}</div>
  </div>;
}

function PipelineDemo() {
  const [duplicate, setDuplicate] = useState(true);
  const [missing, setMissing] = useState(true);
  const [result, setResult] = useState(null);
  const reset = (setter, value) => { setter(value); setResult(null); };
  return <div className="grid gap-6 md:grid-cols-2"><div><p className="text-sm leading-7">Start with 3 valid sample payments totalling KES 9,000.</p><label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" checked={duplicate} onChange={e => reset(setDuplicate, e.target.checked)} />Include a duplicate payment</label><label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" checked={missing} onChange={e => reset(setMissing, e.target.checked)} />Include a payment without a reference</label><Button className="mt-6" onClick={() => setResult({ received: 3 + Number(duplicate) + Number(missing), held: Number(duplicate) + Number(missing) })}>Run quality checks</Button></div><div role="status" className={panel}>{result ? <><strong>{result.received} received → 3 accepted → {result.held} held</strong><p>Reporting total: KES 9,000.</p><p>{result.held ? "Exceptions stay outside reporting until an owner resolves them." : "All received records passed the sample checks."}</p><p>Checks: unique transaction reference and required reference present.</p></> : "Run the pipeline to see what reaches the reporting layer."}</div></div>;
}

function AnalyticsDemo() {
  const [definition, setDefinition] = useState("collected");
  const [applied, setApplied] = useState(false);
  const total = definition === "collected" ? "90,000" : "120,000";
  return <div className="grid gap-6 md:grid-cols-2"><div><p className="text-sm leading-7">Sample orders: KES 120,000. Collected: KES 90,000. Unpaid: KES 30,000.</p><label className="mt-4 block text-sm font-semibold">Shared report definition<select className={control} value={definition} onChange={e => { setDefinition(e.target.value); setApplied(false); }}><option value="collected">Collected revenue — paid orders only</option><option value="orders">Order value — paid and unpaid orders</option></select></label><Button className="mt-4" onClick={() => setApplied(true)}>Apply to both reports</Button></div><div role="status" className={panel}><p>Sales report: <strong>KES {applied ? total : "120,000"}</strong></p><p>Finance report: <strong>KES {applied ? total : "90,000"}</strong></p><p>{applied ? `Both now use ${definition === "collected" ? "collected revenue" : "order value"}. The records have not changed; the definition is explicit.` : "Different definitions produce different numbers. Agree the question before comparing the reports."}</p></div></div>;
}

function AiDemo() {
  const [question, setQuestion] = useState("returns");
  const [answered, setAnswered] = useState(false);
  const [approved, setApproved] = useState(false);
  return <div className="grid gap-6 md:grid-cols-2"><div><p className="rounded-lg bg-slate-100 p-4 text-sm leading-7"><strong>Sample policy · section 2</strong><br />Unopened items may be returned within 7 days with a receipt. Delivery times are confirmed when an order is accepted.</p><label className="mt-4 block text-sm font-semibold">Staff question<select className={control} value={question} onChange={e => { setQuestion(e.target.value); setAnswered(false); setApproved(false); }}><option value="returns">Can a customer return an unopened item?</option><option value="delivery">Is next-day delivery guaranteed?</option><option value="credit">What is this customer's credit limit?</option></select></label><Button className="mt-4" onClick={() => setAnswered(true)}>Show sample answer</Button></div><div role="status" className={panel}>{!answered ? "Choose a question to see how the workflow handles evidence." : question === "credit" ? <><strong>Escalate to a person.</strong><p>The approved source does not contain customer credit limits. No answer or action is authorised.</p></> : <><strong>{approved ? "Approved in this demo" : "Draft — awaiting human review"}</strong><p>{question === "returns" ? "Yes, within 7 days, with a receipt, if the item is unopened." : "The policy does not guarantee next-day delivery. Confirm the timing for this order."}</p><p className="font-semibold">Source: sample policy, section 2 above.</p>{!approved && <Button className="mt-3" onClick={() => setApproved(true)}>Approve sample response</Button>}<p className="mt-3 text-xs">Nothing is sent to a customer.</p></>}</div></div>;
}

export function EngineeringDemo({ service }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-8">{service === "data-migration" ? <MigrationDemo /> : service === "data-engineering" ? <PipelineDemo /> : service === "analytics-engineering" ? <AnalyticsDemo /> : <AiDemo />}</div>;
}
