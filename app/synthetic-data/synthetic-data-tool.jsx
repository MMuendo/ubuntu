"use client";

import { useMemo, useState } from "react";
import { CreditCard, FileDown, LockKeyhole, Sparkles, Wand2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { syntheticExamples } from "@/src/data";
import { datasetIndustries } from "@/lib/academy/site-content";

function parseColumns(value) {
  return value
    .split(",")
    .map((column) => column.trim())
    .filter(Boolean);
}

function sampleValue(column, index, industry) {
  const name = column.toLowerCase();

  if (name.includes("date")) return `2026-05-${String((index % 28) + 1).padStart(2, "0")}`;
  if (name.includes("id")) return `${industry.slice(0, 3).toUpperCase()}-${String(1000 + index)}`;
  if (name.includes("revenue") || name.includes("amount") || name.includes("balance")) return String(2500 + index * 430);
  if (name.includes("quantity") || name.includes("rows") || name.includes("count")) return String((index % 9) + 1);
  if (name.includes("risk")) return ["Low", "Medium", "High"][index % 3];
  if (name.includes("status")) return ["Active", "Pending", "Closed"][index % 3];
  if (name.includes("industry")) return industry;
  if (name.includes("city") || name.includes("location")) return ["Nairobi", "Mombasa", "Kisumu", "Kampala"][index % 4];
  return `${column.replace(/\s+/g, "_")}_${index + 1}`;
}

function buildRows(columns, rowCount, industry) {
  return Array.from({ length: Math.min(rowCount, 8) }, (_, index) =>
    Object.fromEntries(columns.map((column) => [column, sampleValue(column, index, industry)]))
  );
}

function rowsToCsv(columns, rows) {
  const escape = (value) => `"${String(value).replaceAll('"', '""')}"`;
  return [columns.map(escape).join(","), ...rows.map((row) => columns.map((column) => escape(row[column])).join(","))].join("\n");
}

export function SyntheticDataTool() {
  const [industry, setIndustry] = useState("Retail");
  const [purpose, setPurpose] = useState("Practice sales analysis and dashboard building");
  const [columnsValue, setColumnsValue] = useState("branch, sku, category, quantity, revenue, sale_date, risk_band");
  const [rowCount, setRowCount] = useState(1000);
  const [subject, setSubject] = useState("SQL joins and business reporting");
  const [level, setLevel] = useState("beginner");
  const [datasetName, setDatasetName] = useState("Uploaded dataset");
  const [generated, setGenerated] = useState(false);
  const [walkthrough, setWalkthrough] = useState(false);
  const [jobMessage, setJobMessage] = useState("");
  const [walkthroughMessage, setWalkthroughMessage] = useState("");
  const [credits, setCredits] = useState(1000);
  const [lastCost, setLastCost] = useState(0);
  const [serverRows, setServerRows] = useState([]);

  const columns = useMemo(() => parseColumns(columnsValue), [columnsValue]);
  const localRows = useMemo(() => buildRows(columns, Number(rowCount) || 1, industry), [columns, rowCount, industry]);
  const previewRows = serverRows.length ? serverRows : localRows;
  const creditCost = Math.min(1000, Math.max(25, Math.ceil((Number(rowCount) || 1) / 100) + columns.length * 5));
  const creditsExhausted = credits <= 0;
  const canGenerate = credits >= creditCost && columns.length > 0;

  async function generateDataset() {
    window.alert("Coming Soon");
    setJobMessage("Coming Soon");
  }

  function downloadCsv() {
    window.alert("Coming Soon");
    setJobMessage("Coming Soon");
  }

  function generateWalkthrough() {
    window.alert("Coming Soon");
    setWalkthroughMessage("Coming Soon");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
      <Card className="dataset-tool-card">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-neutral-950">Synthetic dataset</h2>
            <Badge tone="teal">AI powered</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-neutral-950">Industry</label>
              <select
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-400 focus:bg-white"
              >
                {datasetIndustries.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-950">Rows</label>
              <input
                type="number"
                min="10"
                max="250000"
                value={rowCount}
                onChange={(event) => setRowCount(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-400 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-neutral-950">Dataset purpose</label>
            <input
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-neutral-950">Columns</label>
            <textarea
              value={columnsValue}
              onChange={(event) => setColumnsValue(event.target.value)}
              rows={3}
              className="mt-2 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm outline-none focus:border-neutral-400 focus:bg-white"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {syntheticExamples.map(([exampleIndustry, exampleColumns]) => (
              <button
                key={exampleIndustry}
                type="button"
                onClick={() => {
                  setIndustry(exampleIndustry);
                  setColumnsValue(exampleColumns);
                }}
                className="rounded-lg border border-[#00b4d8]/20 bg-white/90 p-3 text-left text-sm shadow-sm transition hover:border-[#00b4d8]/45 hover:bg-white"
              >
                <span className="font-semibold text-neutral-950">{exampleIndustry}</span>
                <span className="mt-1 block text-xs leading-5 text-neutral-500">{exampleColumns}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="accent" onClick={generateDataset}>
              <Wand2 size={16} />
              {creditsExhausted ? "Add credits" : "Generate dataset"}
            </Button>
            <Button type="button" variant="outline" onClick={downloadCsv}>
              <FileDown size={16} />
              Download CSV
            </Button>
          </div>
          {jobMessage ? <p className="text-sm text-neutral-600">{jobMessage}</p> : null}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="dataset-side-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-neutral-950">Credits</h2>
              <CreditCard size={18} className="text-neutral-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-[#00b4d8]/15 bg-[#e8f8fb] p-3">
                <p className="text-lg font-semibold text-neutral-950">{credits.toLocaleString()}</p>
                <p className="text-xs text-neutral-500">remaining</p>
              </div>
              <div className="rounded-lg border border-[#00b4d8]/15 bg-[#e8f8fb] p-3">
                <p className="text-lg font-semibold text-neutral-950">{creditCost.toLocaleString()}</p>
                <p className="text-xs text-neutral-500">this job</p>
              </div>
              <div className="rounded-lg border border-[#00b4d8]/15 bg-[#e8f8fb] p-3">
                <p className="text-lg font-semibold text-neutral-950">{lastCost.toLocaleString()}</p>
                <p className="text-xs text-neutral-500">last use</p>
              </div>
            </div>
            <div className={`rounded-lg border p-4 text-sm leading-6 ${canGenerate ? "border-neutral-200 text-neutral-600" : "border-red-200 bg-red-50 text-red-700"}`}>
              {canGenerate ? (
                <span>
                  You have enough credits for this dataset. Credits decrease after each successful generation, similar to a free AI usage allowance.
                </span>
              ) : (
                <span className="inline-flex items-start gap-2">
                  <LockKeyhole className="mt-0.5 shrink-0" size={16} />
                  Free credits are exhausted or this request is too large. Add credits under billing before generating more datasets.
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="dataset-side-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-neutral-950">Preview</h2>
              <Badge tone={generated ? "green" : "default"}>{generated ? "Generated" : "Ready"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-neutral-100 text-xs uppercase tracking-[0.12em] text-neutral-500">
                <tr>
                  {columns.map((column) => (
                    <th key={column} className="px-4 py-3 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.slice(0, 5).map((row, index) => (
                  <tr key={index} className="border-b border-neutral-100 last:border-0">
                    {columns.map((column) => (
                      <td key={column} className="px-4 py-3 text-neutral-700">
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="dataset-side-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-neutral-950">Dataset walkthrough</h2>
              <Sparkles size={18} className="text-neutral-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-neutral-950">Dataset</label>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(event) => setDatasetName(event.target.files?.[0]?.name || "Uploaded dataset")}
                  className="mt-2 block w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-950">Level</label>
                <select
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-400 focus:bg-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-950">Subject</label>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-400 focus:bg-white"
              />
            </div>
            <Button type="button" variant="outline" onClick={generateWalkthrough}>
              <Sparkles size={16} />
              Generate walkthrough
            </Button>
            {walkthroughMessage ? <p className="text-sm text-neutral-600">{walkthroughMessage}</p> : null}
            {walkthrough ? (
              <div className="rounded-lg bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">
                <p className="font-semibold text-neutral-950">{datasetName}</p>
                <p className="mt-2">
                  Generated {level} walkthrough for {subject}: inspect columns, clean missing values, answer three business questions,
                  build a summary table, and write a final recommendation.
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
