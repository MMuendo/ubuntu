import { json } from "../_utils";

export async function POST() {
  return json(
    {
      ok: false,
      message: "Confirmation emails have been removed. Accounts are active immediately after signup."
    },
    410
  );
}
