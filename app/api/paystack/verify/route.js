import { NextResponse } from "next/server";

import { reconcileVerifiedPayment } from "@/lib/academy/commerce";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { hasDatabaseEnv } from "@/lib/db/config";
import { transaction } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, message: "Payment verification is not ready yet. Please contact Ubuntu Analytiq support." }, { status: 503 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Verification details could not be read." }, { status: 400 });
  }

  const reference = clean(body.reference);
  if (!reference) {
    return NextResponse.json({ ok: false, message: "Payment reference is required." }, { status: 400 });
  }

  try {
    const paystackData = await verifyPaystackTransaction(reference);
    const result = await transaction((client) =>
      reconcileVerifiedPayment(client, { reference, paystackData, eventName: "charge.verify" })
    );

    return NextResponse.json({
      ok: result.completed,
      completed: result.completed,
      message: result.completed ? "Payment verified." : "Payment could not be verified.",
      amountMatches: result.amountMatches,
      currencyMatches: result.currencyMatches,
      purchase: {
        reference: result.purchase.reference,
        status: result.purchase.payment_status,
        productName: result.purchase.product_name,
        amountKes: result.purchase.amount_kes
      }
    });
  } catch (error) {
    const status = error.code === "PAYSTACK_ENV" ? 503 : error.status || 502;
    return NextResponse.json({ ok: false, message: error.message || "Payment verification failed." }, { status });
  }
}
