/**
 * Layout.tsx — Ubuntu AnalytIQ
 *
 * FONTS: Add to your public/index.html <head>:
 * <link rel="preconnect" href="https://fonts.bunny.net" />
 * <link href="https://fonts.bunny.net/css?family=syne:700,800|dm-sans:400,500" rel="stylesheet" />
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Phone, BookOpen, Play, FolderOpen, ChevronDown, Twitter, Facebook } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import UserMenu from './UserMenu';

interface LayoutProps { children: React.ReactNode; }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAcademyOpen,    setIsAcademyOpen]    = useState(false);
  const [isMobileAcadOpen, setIsMobileAcadOpen] = useState(false);
  const location    = useLocation();
  const { user }    = useAuth();
  const dropRef     = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setIsAcademyOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setIsAcademyOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const academyLinks = [
    { label: 'Courses',  path: '/academy#courses',  icon: BookOpen,   color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   desc: 'Excel, Power BI, AI & Agents' },
    { label: 'Webinars', path: '/academy#webinars', icon: Play,       color: 'text-violet-400', bg: 'bg-violet-500/10', desc: 'Free live & recorded sessions' },
    { label: 'Projects', path: '/academy#projects', icon: FolderOpen, color: 'text-orange-400', bg: 'bg-orange-500/10', desc: 'Hands-on projects per course' },
  ];

  const otherLinks = [
    { label: 'AI Fluency', path: '/assessment' },
    { label: 'Agentic AI', path: '/agentic-ai' },
    { label: 'Blog',       path: '/blog' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileAcadOpen(false);
    window.scrollTo(0, 0);
  };

  const handleAcademyLinkClick = (path: string) => {
    setIsAcademyOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileAcadOpen(false);
    const [pagePath, hash] = path.split('#');
    if (location.pathname === pagePath && hash) {
      setTimeout(() => { document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      setTimeout(() => { document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }); }, 400);
    }
  };

  const isAcademyActive = location.pathname.startsWith('/academy');

  return (
    <div
      className="min-h-screen flex flex-col bg-[#0E0C0B] text-[#F0EDE8]"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >

      {/* ── Navigation ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#0E0C0B]/92 backdrop-blur-md border-b border-white/7">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex-shrink-0">
              <span
                className="text-[16px] font-extrabold text-[#F0EDE8] hover:text-cyan-400 transition-colors"
                style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
              >
                Ubuntu <span className="text-cyan-400">AnalytIQ</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex md:items-center md:gap-1">

              {/* Academy dropdown */}
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setIsAcademyOpen(v => !v)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    isAcademyActive ? 'text-cyan-400' : 'text-[#8A8680] hover:text-[#F0EDE8]'
                  }`}
                >
                  Academy
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAcademyOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAcademyOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#1A1714] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50">
                    <div className="p-2">
                      {academyLinks.map(({ label, path, icon: Icon, color, bg, desc }) => (
                        <Link
                          key={label}
                          to={path.split('#')[0]}
                          onClick={() => handleAcademyLinkClick(path)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${color}`} />
                          </div>
                          <div>
                            <p className={`text-[13px] font-semibold text-[#F0EDE8] group-hover:${color} transition-colors`}>
                              {label}
                            </p>
                            <p className="text-[11px] text-[#5A5652]">{desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-white/7 px-4 py-2.5">
                      <Link
                        to="/academy"
                        onClick={() => { setIsAcademyOpen(false); window.scrollTo(0, 0); }}
                        className="text-[11px] text-[#5A5652] hover:text-cyan-400 transition-colors flex items-center gap-1"
                      >
                        View all Academy →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Other links */}
              {otherLinks.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={handleNavClick}
                  className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    location.pathname === path ? 'text-cyan-400' : 'text-[#8A8680] hover:text-[#F0EDE8]'
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* Auth */}
              <div className="ml-3 flex items-center gap-2">
                {user ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-2 text-[13px] font-medium text-[#8A8680] hover:text-[#F0EDE8] transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/assessment"
                      className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-[#0A0908] transition-all duration-200 text-[13px] font-semibold"
                    >
                      Start Journey
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#8A8680] hover:text-[#F0EDE8] hover:bg-white/5 transition-all"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#141210] border-t border-white/7">
            <div className="px-4 pt-3 pb-4 space-y-1">

              {/* Academy accordion */}
              <div>
                <button
                  onClick={() => setIsMobileAcadOpen(v => !v)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#8A8680] hover:text-[#F0EDE8] hover:bg-white/5 transition-all"
                >
                  <span>Academy</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileAcadOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileAcadOpen && (
                  <div className="ml-3 mt-1 space-y-0.5 border-l border-white/8 pl-3">
                    {academyLinks.map(({ label, path, icon: Icon, color }) => (
                      <Link
                        key={label}
                        to={path.split('#')[0]}
                        onClick={() => handleAcademyLinkClick(path)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-[#5A5652] hover:text-[#F0EDE8] hover:bg-white/5 transition-all"
                      >
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other links */}
              {otherLinks.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={handleNavClick}
                  className="block w-full text-left px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#8A8680] hover:text-[#F0EDE8] hover:bg-white/5 transition-all"
                >
                  {label}
                </Link>
              ))}

              {!user && (
                <div className="pt-3 border-t border-white/7 flex flex-col gap-2 px-1">
                  <Link to="/login" onClick={handleNavClick} className="py-2 text-[13px] font-medium text-[#8A8680] hover:text-[#F0EDE8] px-2">
                    Login
                  </Link>
                  <Link
                    to="/assessment"
                    onClick={handleNavClick}
                    className="py-2.5 px-4 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-center text-[13px] font-semibold"
                  >
                    Start Journey
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* ── Footer ─────────────────────────────────────────────────────────────── */}
      <footer className="bg-[#141210] border-t border-white/7 py-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

            {/* Brand */}
            <div>
              <span
                className="text-[15px] font-extrabold text-[#F0EDE8]"
                style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
              >
                Ubuntu <span className="text-cyan-400">AnalytIQ</span>
              </span>
              <p className="text-[12px] text-[#5A5652] mt-1">Empowering teams with Data &amp; AI fluency.</p>
              <a
                href="tel:+254706719457"
                className="inline-flex items-center gap-1.5 mt-2 text-[12px] text-[#5A5652] hover:text-cyan-400 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                +254 706 719 457
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/106319269"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/4 border border-white/7 flex items-center justify-center text-[#8A8680] hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/4 border border-white/7 flex items-center justify-center text-[#5A5652] opacity-40 cursor-not-allowed"
                aria-label="Twitter — Coming Soon"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/4 border border-white/7 flex items-center justify-center text-[#5A5652] opacity-40 cursor-not-allowed"
                aria-label="Facebook — Coming Soon"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/254706719457"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/4 border border-white/7 flex items-center justify-center text-[#8A8680] hover:text-green-400 hover:border-green-500/30 transition-all"
                aria-label="WhatsApp"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-white/7 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[11px] text-[#5A5652]">&copy; {new Date().getFullYear()} Ubuntu AnalytIQ. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] text-[#5A5652]">
              <Link to="/privacy" className="hover:text-[#8A8680] transition-colors">Privacy Policy</Link>
              <Link to="/terms"   className="hover:text-[#8A8680] transition-colors">Terms of Service</Link>
              <span className="text-[#3A3836]">·</span>
              <span className="flex items-center gap-1.5 text-[#3A3836]">
                Powered by{' '}
                <a href="https://www.glidexoutsourcing.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 group">
                  <img src="/glidex_logo.png" alt="GlideX" width={16} height={16} className="opacity-60 group-hover:opacity-90 transition-opacity" />
                  <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">GlideX™</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
