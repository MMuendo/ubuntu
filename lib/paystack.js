import crypto from "node:crypto";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

export function generatePaymentReference(prefix = "UA") {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

export function amountToSubunit(amountKes) {
  return Math.round(Number(amountKes || 0) * 100);
}

function getSecretKey() {
  return process.env.PAYSTACK_SECRET_KEY || "";
}

function getWebhookSecret() {
  return process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY || "";
}

function paystackHeaders() {
  const secretKey = getSecretKey();
  if (!secretKey) {
    const error = new Error("PAYSTACK_SECRET_KEY is not configured.");
    error.code = "PAYSTACK_ENV";
    throw error;
  }

  return {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json"
  };
}

export async function initializePaystackTransaction({ email, amountKes, reference, callbackUrl, metadata = {} }) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: paystackHeaders(),
    body: JSON.stringify({
      email,
      amount: amountToSubunit(amountKes),
      currency: "KES",
      reference,
      callback_url: callbackUrl,
      metadata
    })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.status) {
    const error = new Error(payload.message || "Payment transaction initialization failed.");
    error.code = "PAYSTACK_INITIALIZE";
    error.payload = payload;
    throw error;
  }

  return payload.data;
}

export async function verifyPaystackTransaction(reference) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: "GET",
    headers: paystackHeaders()
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.status) {
    const error = new Error(payload.message || "Payment transaction verification failed.");
    error.code = "PAYSTACK_VERIFY";
    error.payload = payload;
    throw error;
  }

  return payload.data;
}

export function verifyPaystackWebhookSignature(rawBody, signature) {
  const secret = getWebhookSecret();
  if (!secret) {
    const error = new Error("PAYSTACK_WEBHOOK_SECRET is not configured.");
    error.code = "PAYSTACK_WEBHOOK_ENV";
    throw error;
  }

  const digest = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  const received = Buffer.from(String(signature || ""));
  const expected = Buffer.from(digest);
  if (received.length !== expected.length) return false;
  return crypto.timingSafeEqual(expected, received);
}
