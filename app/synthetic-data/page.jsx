import { redirect } from "next/navigation";

export default function SyntheticDataRedirectPage() {
  redirect("/datasets");
}
