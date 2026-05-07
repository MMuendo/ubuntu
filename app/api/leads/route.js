import { NextResponse } from "next/server";

import { upsertLead } from "@/lib/academy/commerce";
import { hasDatabaseEnv } from "@/lib/db/config";
import { transaction } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, message: "Lead capture is not ready yet. Please contact Ubuntu Analytiq support." }, { status: 503 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Lead details could not be read." }, { status: 400 });
  }

  const email = clean(body.email).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const lead = await transaction((client) =>
      upsertLead(client, {
        email,
        fullName: clean(body.fullName || body.full_name),
        source: clean(body.source) || "site",
        selectedProduct: clean(body.selectedProduct || body.selected_product),
        metadata: body.metadata && typeof body.metadata === "object" ? body.metadata : {}
      })
    );

    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error.message || "Lead could not be saved." }, { status: 400 });
  }
}
