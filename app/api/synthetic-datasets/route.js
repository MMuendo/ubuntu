import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query } from "@/lib/db/client";

function sampleValue(column, index, industry) {
  const name = String(column || "").toLowerCase();
  const cities = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Kampala", "Dar es Salaam", "Kigali"];
  const statuses = ["Active", "Pending", "Resolved", "At risk"];
  const channels = ["Branch", "Mobile", "Agent", "Online", "WhatsApp"];

  if (name.includes("date")) return `2026-05-${String((index % 28) + 1).padStart(2, "0")}`;
  if (name.includes("id")) return `${String(industry).slice(0, 3).toUpperCase()}-${String(1000 + index)}`;
  if (name.includes("revenue") || name.includes("amount") || name.includes("sales")) return 2500 + index * 430;
  if (name.includes("cost")) return 900 + index * 160;
  if (name.includes("quantity") || name.includes("count") || name.includes("units")) return (index % 9) + 1;
  if (name.includes("risk")) return ["Low", "Medium", "High"][index % 3];
  if (name.includes("status")) return statuses[index % statuses.length];
  if (name.includes("channel")) return channels[index % channels.length];
  if (name.includes("industry")) return industry;
  if (name.includes("city") || name.includes("location") || name.includes("county")) return cities[index % cities.length];
  if (name.includes("customer")) return `Customer ${index + 1}`;
  if (name.includes("product") || name.includes("sku")) return `SKU-${String(200 + index)}`;
  return `${String(column).replace(/\s+/g, "_")}_${index + 1}`;
}

function buildRows(columns, rowCount, industry) {
  return Array.from({ length: Math.min(rowCount, 100) }, (_, index) =>
    Object.fromEntries(columns.map((column) => [column, sampleValue(column, index, industry)]))
  );
}

export async function POST(request) {
  const body = await request.json();
  const columns = Array.isArray(body.columns) ? body.columns : [];
  const rowCount = Number(body.rowCount || 0);
  const creditCost = Number(body.creditCost || body.tokenCost || 0);
  const industry = String(body.industry || "General");
  const rowsPreview = buildRows(columns, rowCount || 1, industry);

  if (!columns.length || rowCount < 1) {
    return NextResponse.json({ ok: false, message: "Add at least one column and one row." }, { status: 400 });
  }

  if (!hasDatabaseEnv()) {
    return NextResponse.json({
      ok: true,
      saved: false,
      message: "Generated dataset preview. Sign in later to save generated jobs.",
      rows: rowsPreview
    });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({
      ok: true,
      saved: false,
      message: "Generated dataset preview. Sign in to save generated jobs.",
      rows: rowsPreview
    });
  }

  const { rows } = await query(
    `insert into synthetic_dataset_jobs (user_id, industry, purpose, columns, row_count, token_cost, status)
     values ($1, $2, $3, $4::jsonb, $5, $6, 'queued')
     returning id, status`,
    [user.id, industry, String(body.purpose || ""), JSON.stringify(columns), rowCount, creditCost]
  );

  await query(
    `insert into ai_usage_events (user_id, feature, tokens_used, metadata)
     values ($1, 'synthetic_dataset', $2, $3::jsonb)`,
    [
      user.id,
      creditCost,
      JSON.stringify({
        industry,
        row_count: rowCount,
        credit_cost: creditCost
      })
    ]
  );

  return NextResponse.json({ ok: true, saved: true, job: rows[0], rows: rowsPreview });
}
