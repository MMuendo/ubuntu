"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Linkedin, Phone } from "lucide-react";

const navLinks = [
    { label: "Academy", path: "/academy" },
    { label: "AI Fluency", path: "/assessment" },
    { label: "Agentic AI", path: "/agentic-ai" },
    { label: "Blog", path: "/blog" },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-[var(--brand-dark)]/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex-shrink-0 group flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-[var(--brand-cyan)] transition-colors">
                            Ubuntu <span className="text-[var(--brand-cyan)]">AnalytIQ</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.path
                                            ? "text-[var(--brand-cyan)]"
                                            : "hover:text-[var(--brand-cyan)]"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/assessment"
                                className="px-4 py-2 rounded-full bg-[var(--brand-cyan)]/10 border border-[var(--brand-cyan)] text-[var(--brand-cyan)] hover:bg-[var(--brand-cyan)] hover:text-[var(--brand-dark)] transition-all duration-300 text-sm font-semibold"
                            >
                                Start Journey
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[var(--brand-surface)] border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="bg-[var(--brand-surface)] border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-lg font-bold text-white">
                            Ubuntu <span className="text-[var(--brand-cyan)]">AnalytIQ</span>
                        </span>
                        <p className="text-sm text-gray-400 mt-1">
                            Empowering teams with Data & AI fluency.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <a
                                href="tel:+254706719457"
                                className="text-sm text-gray-400 hover:text-[var(--brand-cyan)] transition-colors"
                            >
                                +254 706 719 457
                            </a>
                        </div>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://www.linkedin.com/company/106319269"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[var(--brand-cyan)] transition-colors"
                            aria-label="Visit Ubuntu AnalytIQ on LinkedIn"
                        >
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a
                            href="https://wa.me/254706719457"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-green-400 transition-colors"
                            aria-label="Chat on WhatsApp"
                        >
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Ubuntu AnalytIQ. All rights reserved.</p>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
