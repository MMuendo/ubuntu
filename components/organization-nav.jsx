import Link from "next/link";

export function OrganizationNav({ current = "overview" }) {
  const items = [
    ["overview", "Overview", "/for-organizations"],
    ["advisory", "Advisory", "/for-organizations/advisory"],
    ["engineering", "Engineering", "/for-organizations/engineering"],
    ["patterns", "Solutions", "/for-organizations/solution-patterns"]
  ];
  return <div className="border-b border-[#00b4d8]/20 bg-[#fbfaf7]">
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <nav aria-label="Organization breadcrumb" className="mb-3 text-xs text-slate-600"><Link href="/for-organizations" className="font-semibold text-[#007c97] underline">For organizations</Link>{current !== "overview" && <span> / {items.find(item => item[0] === current)?.[1]}</span>}</nav>
      <nav aria-label="Organization sections" className="flex flex-wrap gap-2">{items.map(([id, label, href]) => <Link key={id} href={href} aria-current={current === id ? (id === "engineering" ? "location" : "page") : undefined} className={`rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-[#007c97] ${current === id ? "bg-[#141014] text-white" : "text-slate-700 hover:bg-[#e8f8fb]"}`}>{label}</Link>)}</nav>
    </div>
  </div>;
}
