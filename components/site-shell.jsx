"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CookieConsent } from "@/components/cookie-consent";
import { OrganizationMenu } from "@/components/organization-menu";

const navLinks = [
  { label: "Mentorship", href: "/mentorships" },
  { label: "For organizations", href: "/for-organizations" },
  { label: "Academy", href: "/academy" },
  { label: "Blogs", href: "/blogs" }
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
    <div className="ubuntu-ambient-shell min-h-screen text-neutral-950">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-[#141014]">Skip to main content</a>
      <div className="sticky top-0 z-50">
        <header className="border-b border-[#00b4d8]/18 bg-[#fbfaf7]/88 shadow-[0_10px_30px_rgba(20,16,20,0.05)] backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-md bg-[#1e1616] text-sm font-semibold text-white">
                UA
              </span>
              <span className="text-sm font-semibold tracking-tight">Ubuntu Analytiq</span>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
              {navLinks.map((link) => link.href === "/for-organizations" ? <OrganizationMenu key={link.href} /> : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(pathname, link.href)
                      ? "bg-[#141014] text-white shadow-sm ring-1 ring-[#00b4d8]/30"
                      : "text-neutral-600 hover:bg-white/85 hover:text-neutral-950 hover:ring-1 hover:ring-[#00b4d8]/16"
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
                    <Link href="/for-organizations#contact">
                      Talk to us
                      <ArrowRight size={15} />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          {mobileMenuOpen ? (
            <div id="mobile-navigation" className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-[#00b4d8]/16 bg-[#fbfaf7]/92 backdrop-blur-xl md:hidden">
              <div className="ml-auto grid w-[60vw] min-w-[204px] max-w-[250px] gap-2 bg-transparent p-3">
                {navLinks.map((link) => link.href === "/for-organizations" ? <OrganizationMenu key={link.href} mobile /> : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                      isActive(pathname, link.href)
                        ? "border border-[#00b4d8]/35 bg-[#141014] text-white"
                        : "border border-transparent text-slate-700 hover:border-[#00b4d8]/20 hover:bg-white/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Button asChild size="sm" variant="outline" className="h-10 w-full">
                      <Link href={workspace}>Workspace</Link>
                    </Button>
                    <Button type="button" size="sm" variant="accent" className="h-10 w-full" onClick={handleLogout}>
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild size="sm" variant="outline" className="h-10 w-full">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild size="sm" variant="accent" className="h-10 w-full">
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </header>
      </div>

      <main id="main-content" tabIndex={-1}>{children}</main>

      <footer className="border-t border-[#00b4d8]/16 bg-[#fbfaf7]/94">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold text-neutral-950">Ubuntu Analytiq</p>
            <p className="mt-1 text-sm text-neutral-500">Our markets. Our context. Our opportunities.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="https://www.facebook.com/profile.php?id=61590134952098" className="inline-flex h-6 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-700 transition hover:border-[#00b4d8] hover:text-neutral-950" target="_blank" rel="noreferrer">
              <ExternalLink size={13} className="mr-1" />
              Facebook
            </Link>
            <Link href="https://www.instagram.com/ubuntuanalytiq/" className="inline-flex h-6 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-700 transition hover:border-[#00b4d8] hover:text-neutral-950" target="_blank" rel="noreferrer">
              <ExternalLink size={13} className="mr-1" />
              Instagram
            </Link>
            <Link href="/mentorships" className="inline-flex h-6 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-700 hover:border-[#00b4d8]">Mentorship</Link>
            <Link href="/for-organizations" className="inline-flex h-6 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-700 hover:border-[#00b4d8]">For organizations</Link>
            <Link href="/academy" className="inline-flex h-6 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-700 hover:border-[#00b4d8]">Academy</Link>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
