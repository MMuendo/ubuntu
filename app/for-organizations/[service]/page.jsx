import { notFound, permanentRedirect } from "next/navigation";
import { engineeringServices } from "@/lib/engineering-services";

export function generateStaticParams() {
  return engineeringServices.map(item => ({ service: item.slug }));
}

export default async function ServiceRedirect({ params }) {
  const { service } = await params;
  if (!engineeringServices.some(item => item.slug === service)) notFound();
  permanentRedirect(`/for-organizations/engineering#${service}`);
}
