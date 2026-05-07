import { clearSession } from "@/lib/auth/session";

import { json } from "../_utils";

export async function POST() {
  await clearSession();
  return json({ ok: true, destination: "/login?message=signed-out" });
}
