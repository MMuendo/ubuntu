import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import { resolveCheckoutProduct, upsertLead } from "@/lib/academy/commerce";
import { generatePaymentReference, initializePaystackTransaction } from "@/lib/paystack";
import { hasDatabaseEnv } from "@/lib/db/config";
import { query, transaction } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4173").replace(/\/$/, "");
}

export async function POST(request) {
  if (!hasDatabaseEnv()) {
    return NextResponse.json({ ok: false, message: "Checkout is not ready yet. Please contact Ubuntu Analytiq support." }, { status: 503 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Checkout details could not be read." }, { status: 400 });
  }

  const email = clean(body.email).toLowerCase();
  const fullName = clean(body.fullName || body.full_name);
  const productType = body.productType === "plan" ? "plan" : "course";
  const productSlug = clean(body.productSlug || body.courseId || body.planId);
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ ok: false, message: "Sign in before paying." }, { status: 401 });
  }

  const payerEmail = clean(user.email).toLowerCase() || email;
  const payerName = clean(user.full_name) || fullName;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail)) {
    return NextResponse.json({ ok: false, message: "We need a real email address." }, { status: 400 });
  }

  const reference = generatePaymentReference("UA");

  let pending;
  try {
    pending = await transaction(async (client) => {
      const product = await resolveCheckoutProduct(client, { productType, productSlug });
      const lead = await upsertLead(client, {
        email: payerEmail,
        fullName: payerName,
        source: "checkout",
        selectedProduct: product.productSlug,
        metadata: { product_type: product.productType, product_name: product.productName }
      });

      const { rows } = await client.query(
        `insert into purchases (
           lead_id,
           user_id,
           course_id,
           plan_id,
           product_type,
           product_slug,
           product_name,
           amount_kes,
           currency,
           payment_status,
           reference,
           metadata
         )
         values ($1, $2, $3, $4, $5, $6, $7, $8, 'KES', 'pending', $9, $10::jsonb)
         returning id, reference`,
        [
          lead.id,
          user?.id || null,
          product.courseId,
          product.planId,
          product.productType,
          product.productSlug,
          product.productName,
          product.amountKes,
          reference,
          JSON.stringify({ source: "checkout", email: payerEmail, user_id: user.id })
        ]
      );

      return { purchase: rows[0], product, lead };
    });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error.message || "Checkout could not start." }, { status: error.status || 400 });
  }

  try {
    const paystack = await initializePaystackTransaction({
      email: payerEmail,
      amountKes: pending.product.amountKes,
      reference,
      callbackUrl: `${siteUrl()}/success?reference=${encodeURIComponent(reference)}`,
      metadata: {
        purchase_id: pending.purchase.id,
        lead_id: pending.lead.id,
        user_id: user.id,
        product_type: pending.product.productType,
        product_slug: pending.product.productSlug,
        product_name: pending.product.productName
      }
    });

    await query(
      `update purchases
       set paystack_access_code = $2,
           paystack_authorization_url = $3,
           updated_at = now()
       where reference = $1`,
      [reference, paystack.access_code || null, paystack.authorization_url || null]
    );

    return NextResponse.json({
      ok: true,
      reference,
      accessCode: paystack.access_code,
      authorizationUrl: paystack.authorization_url,
      product: pending.product
    });
  } catch (error) {
    await query(
      `update purchases
       set payment_status = 'failed',
           metadata = metadata || $2::jsonb,
           updated_at = now()
       where reference = $1`,
      [reference, JSON.stringify({ initialize_error: error.message || "Payment initialization failed." })]
    ).catch(() => null);

    const status = error.code === "PAYSTACK_ENV" ? 503 : 502;
    return NextResponse.json({ ok: false, message: error.message || "We couldn't start the payment. Refresh and try again." }, { status });
  }
}
