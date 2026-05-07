import { NextResponse } from "next/server";

import { reconcileVerifiedPayment, recordPaystackEvent } from "@/lib/academy/commerce";
import { verifyPaystackWebhookSignature } from "@/lib/paystack";
import { hasDatabaseEnv } from "@/lib/db/config";
import { transaction } from "@/lib/db/client";

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, message: "Payment updates are not ready yet." }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature") || "";

  try {
    if (!verifyPaystackWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ ok: false, message: "Invalid Paystack signature." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ ok: false, message: error.message || "Webhook verification failed." }, { status: 503 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, message: "Webhook payload was not valid JSON." }, { status: 400 });
  }

  const reference = payload?.data?.reference;
  if (!reference) {
    return NextResponse.json({ ok: false, message: "Webhook payload did not include a payment reference." }, { status: 400 });
  }

  try {
    const result = await transaction(async (client) => {
      if (payload.event === "charge.success") {
        return reconcileVerifiedPayment(client, {
          reference,
          paystackData: payload.data,
          eventName: payload.event
        });
      }

      await recordPaystackEvent(client, {
        reference,
        event: payload.event || "paystack.webhook",
        amountKes: Math.round(Number(payload?.data?.amount || 0) / 100),
        customerCode: payload?.data?.customer?.customer_code || null,
        subscriptionCode: payload?.data?.subscription?.subscription_code || null,
        payload
      });

      return { completed: false };
    });

    return NextResponse.json({ ok: true, completed: result.completed });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error.message || "Webhook could not be processed." }, { status: error.status || 400 });
  }
}
