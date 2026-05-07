import { getCurrentUser } from "@/lib/auth/session";

import { json } from "../_utils";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return json({ ok: false, message: "No active session." }, 401);
  }

  return json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.default_role
    }
  });
}
