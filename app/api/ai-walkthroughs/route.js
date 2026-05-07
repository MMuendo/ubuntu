import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query, transaction } from "@/lib/db/client";

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, message: "AI walkthroughs are not ready yet." }, { status: 503 });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, message: "Sign in to save walkthroughs." }, { status: 401 });
  }

  const body = await request.json();
  const datasetName = String(body.datasetName || "Uploaded dataset");
  const columnNames = Array.isArray(body.columnNames) ? body.columnNames : [];
  const tokenCost = Number(body.tokenCost || 1200);

  const walkthrough = await transaction(async (client) => {
    const dataset = await client.query(
      `insert into uploaded_datasets (user_id, name, storage_path, column_names)
       values ($1, $2, $3, $4)
       returning id`,
      [user.id, datasetName, `pending/${user.id}/${datasetName}`, columnNames]
    );

    const job = await client.query(
      `insert into ai_walkthroughs (user_id, dataset_id, subject, level, status, token_cost)
       values ($1, $2, $3, $4, 'queued', $5)
       returning id, status`,
      [user.id, dataset.rows[0].id, String(body.subject || "Data analysis"), String(body.level || "beginner"), tokenCost]
    );

    return job.rows[0];
  });

  await query(
    `insert into ai_usage_events (user_id, feature, tokens_used, metadata)
     values ($1, 'ai_walkthrough', $2, $3)`,
    [
      user.id,
      tokenCost,
      {
        dataset_name: datasetName,
        subject: body.subject,
        level: body.level
      }
    ]
  );

  return NextResponse.json({ ok: true, walkthrough });
}
