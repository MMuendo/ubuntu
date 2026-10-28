"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

function OrganizationCard({ organization, decorative = false }) {
  return (
    <li className="flex h-32 w-48 shrink-0 snap-start flex-col items-center justify-center rounded-xl border border-[#007c97]/15 bg-white px-4 py-4 text-center shadow-[0_10px_26px_rgba(30,22,22,0.06)]">
      <span className={`flex h-16 w-full items-center justify-center rounded-md p-2 ${organization.dark ? "bg-[#063b74]" : ""}`}>
        <img
          src={organization.logo}
          alt={decorative ? "" : `${organization.name} logo`}
          width="180"
          height="64"
          loading="lazy"
          className="max-h-14 max-w-full object-contain"
        />
      </span>
      <span className="mt-2 text-xs font-semibold leading-5 text-[#1e1616]">{organization.name}</span>
    </li>
  );
}

export function MenteeOrganizationsMarquee({ organizations }) {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const windowRef = useRef(null);

  useEffect(() => {
    if (!windowRef.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(windowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-7">
      <div className="mx-auto mb-3 flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="mentee-organizations-motion-control inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border border-[#007c97]/30 bg-white px-4 text-sm font-semibold text-[#1e1616] hover:bg-[#e8f8fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007c97]"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          {paused ? "Resume logos" : "Pause logos"}
        </button>
      </div>
      <div ref={windowRef} className="mentee-organizations-window overflow-hidden py-3" aria-label="Organizations our mentees work in" data-paused={paused}>
        <div className="mentee-organizations-track flex w-max" data-paused={paused} data-in-view={inView} style={{ "--mentee-logo-duration": `${organizations.length * 4.5}s` }}>
          {[false, true].map((duplicate) => (
            <ul key={duplicate ? "copy" : "original"} aria-hidden={duplicate ? "true" : undefined} className="flex shrink-0 gap-4 pr-4">
              {organizations.map((organization) => <OrganizationCard key={organization.name} organization={organization} decorative={duplicate} />)}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
