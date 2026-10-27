"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const pages = [
  { label: "Advisory", detail: "Choose the right problem and plan.", href: "/for-organizations/advisory" },
  { label: "Engineering", detail: "Explore the services, architecture, and demos.", href: "/for-organizations/engineering" },
  { label: "Solutions", detail: "See how the services work together.", href: "/for-organizations/solution-patterns" }
];

export function OrganizationMenu({ mobile = false }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const container = useRef(null);
  const toggle = useRef(null);
  const active = pathname.startsWith("/for-organizations");

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    function closeOutside(event) {
      if (!container.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return <div ref={container} className="relative"
    onPointerEnter={event => { if (!mobile && event.pointerType === "mouse") setOpen(true); }}
    onPointerLeave={event => { if (!mobile && event.pointerType === "mouse" && !container.current?.contains(document.activeElement)) setOpen(false); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => { if (event.key === "Escape" && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); toggle.current?.focus(); } }}>
    <div className={`flex items-center rounded-md ${active ? "bg-[#141014] text-white" : "text-neutral-700 hover:bg-white/85"}`}>
      <Link href="/for-organizations" onClick={() => setOpen(false)} className="flex-1 rounded-md py-2 pl-3 pr-1 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[#007c97]">Organizations</Link>
      <button ref={toggle} type="button" aria-label="Organization pages" aria-controls={menuId} aria-expanded={open} onClick={() => setOpen(value => !value)} className="flex min-h-10 min-w-10 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-[#007c97]"><ChevronDown size={16} aria-hidden="true" className={`transition ${open ? "rotate-180" : ""}`} /></button>
    </div>
    {open && <div id={menuId} className={mobile ? "mt-2" : "absolute left-0 top-full z-50 w-80 pt-2"}>
      <nav aria-label="Organization pages" className="rounded-xl border border-[#00b4d8]/25 bg-[#fbfaf7] p-2 shadow-xl">
        {pages.map(page => <Link key={page.href} href={page.href} aria-current={pathname === page.href ? "page" : undefined} onClick={() => setOpen(false)} className="block rounded-lg p-3 text-[#141014] transition hover:bg-[#e8f8fb] focus-visible:outline-2 focus-visible:outline-[#007c97]"><span className="flex items-center justify-between gap-3 text-sm font-semibold">{page.label}<ArrowUpRight size={16} aria-hidden="true" className="text-[#007c97]" /></span><span className="mt-1 block text-xs leading-5 text-slate-600">{page.detail}</span></Link>)}
      </nav>
    </div>}
  </div>;
}
