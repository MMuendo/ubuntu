import { json } from "../_utils";

export async function POST() {
  return json(
    {
      ok: false,
      message: "Email-link login has been removed. Ubuntu Academy now uses email and password login."
    },
    410
  );
}
