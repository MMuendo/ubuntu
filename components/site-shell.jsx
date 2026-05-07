"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarCheck, DatabaseZap, LayoutDashboard, LogIn, LogOut, Megaphone, Menu, ShieldCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CookieConsent } from "@/components/cookie-consent";
import { salesBanner } from "@/lib/academy/site-content";

const navLinks = [
  { label: "Academy", href: "/academy" },
  { label: "Mentorship", href: "/mentorships" },
  { label: "Projects", href: "/projects" },
  { label: "Datasets", href: "/datasets" },
  { label: "Blogs", href: "/blogs" },
  { label: "Assessment", href: "/assessment" }
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function workspaceHref(role) {
  if (role === "mentor") return "/mentors";
  if (role === "admin") return "/admin";
  if (role === "employer") return "/employers";
  return "/learners";
}

export function SiteShell({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const workspace = useMemo(() => workspaceHref(user?.role), [user?.role]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      const response = await fetch("/api/auth/session", { credentials: "same-origin" }).catch(() => null);
      const result = response ? await response.json().catch(() => null) : null;

      if (!active) return;
      setUser(response?.ok && result?.user ? result.user : null);
      setSessionChecked(true);
    }

    loadSession();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin"
    }).catch(() => null);
    const result = response ? await response.json().catch(() => null) : null;

    setUser(null);
    window.location.assign(result?.destination || "/login?message=signed-out");
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-neutral-950">
      <div className="sticky top-0 z-50">
        <div className="sales-banner border-b border-[#00b4d8]/35 bg-[#1e1616] text-white shadow-[0_10px_32px_rgba(0,0,0,0.22)]">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-3 py-2 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex w-full min-w-0 items-center gap-2 lg:w-auto">
              <span className="sales-banner-icon flex size-7 shrink-0 items-center justify-center rounded-full bg-[#00b4d8] text-[#1e1616] shadow-[0_0_24px_rgba(0,180,216,0.55)]">
                <Megaphone size={15} />
              </span>
              <span className="min-w-0 flex-1 truncate text-xs font-semibold sm:hidden">Working with Data...</span>
              <span className="hidden min-w-0 flex-1 truncate font-semibold sm:inline lg:flex-none">{salesBanner.title}</span>
              <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-200 sm:text-xs">
                Was KES 12,500
              </span>
            </div>
            <div className="flex w-full min-w-0 items-center gap-2 lg:w-auto lg:justify-end">
              <span className="shrink-0 rounded-full bg-[#00b4d8] px-2.5 py-1 text-[11px] font-bold text-[#1e1616] shadow-[0_0_22px_rgba(0,180,216,0.45)] sm:text-xs">
                Now {salesBanner.price}
              </span>
              <Link href={salesBanner.href} className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 truncate rounded-full border border-[#00b4d8]/35 bg-[#00b4d8]/10 px-2.5 py-1 text-[11px] font-semibold text-[#72e6ff] transition hover:border-[#00b4d8] hover:bg-[#00b4d8] hover:text-[#1e1616] sm:w-fit sm:flex-none sm:px-3 sm:text-sm">
                <span className="truncate">{salesBanner.classStart}</span>
                <span className="hidden text-current opacity-55 min-[380px]:inline">/</span>
                <span className="shrink-0">{salesBanner.slots}</span>
                <ArrowRight size={14} className="shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        <header className="border-b border-slate-200 bg-[#f1f5f9]/92 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-md bg-[#1e1616] text-sm font-semibold text-white">
                UA
              </span>
              <span className="text-sm font-semibold tracking-tight">Ubuntu Analytiq</span>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(pathname, link.href)
                      ? "bg-white text-neutral-950 shadow-sm ring-1 ring-neutral-200"
                      : "text-neutral-600 hover:bg-white hover:text-neutral-950"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="ml-auto inline-flex size-10 items-center justify-center rounded-md border border-slate-200 bg-white text-[#1e1616] shadow-sm transition hover:border-[#00b4d8] md:hidden"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="hidden items-center gap-2 md:flex">
              {!sessionChecked ? null : user ? (
                <>
                  <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
                    <Link href={workspace}>
                      <LayoutDashboard size={15} />
                      Workspace
                    </Link>
                  </Button>
                  <Button type="button" size="sm" variant="accent" onClick={handleLogout}>
                    <LogOut size={15} />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
                    <Link href="/login">
                      <LogIn size={15} />
                      Log in
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="accent">
                    <Link href="/signup">
                      Sign up
                      <ArrowRight size={15} />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          {mobileMenuOpen ? (
            <div id="mobile-navigation" className="border-t border-slate-200 bg-white px-4 py-4 shadow-sm md:hidden">
              <nav className="ml-auto grid w-[78%] gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-3 text-sm font-semibold transition ${
                      isActive(pathname, link.href)
                        ? "border border-[#00b4d8]/35 bg-[#e8f8fb] text-[#1e1616]"
                        : "border border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="ml-auto mt-4 grid w-[78%] gap-2">
                {user ? (
                  <>
                    <Button asChild size="sm" variant="outline">
                      <Link href={workspace}>Workspace</Link>
                    </Button>
                    <Button type="button" size="sm" variant="accent" onClick={handleLogout}>
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild size="sm" variant="outline">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild size="sm" variant="accent">
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </header>
      </div>

      <main>{children}</main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold text-neutral-950">Ubuntu Analytiq</p>
            <p className="mt-1 text-sm text-neutral-500">African data and AI learning, mentorship, projects, datasets, consulting, and proof.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex h-6 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-700">
              <ShieldCheck size={13} className="mr-1" />
              Mentor first
            </span>
            <span className="inline-flex h-6 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-700">
              <CalendarCheck size={13} className="mr-1" />
              Project proof
            </span>
            <span className="inline-flex h-6 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-700">
              <DatabaseZap size={13} className="mr-1" />
              AI datasets
            </span>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
