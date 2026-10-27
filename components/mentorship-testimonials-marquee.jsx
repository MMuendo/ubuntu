"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

function TestimonialCard({ name, quote }) {
  return (
    <blockquote className="flex h-[450px] w-[min(82vw,360px)] shrink-0 snap-start flex-col rounded-2xl border border-[#72e6ff]/25 bg-[#fbfaf7] p-6 text-[#141014] shadow-[0_18px_42px_rgba(0,0,0,0.16)] sm:h-[375px] sm:p-7">
      <span aria-hidden="true" className="text-5xl leading-none text-[#007c97]">“</span>
      <p className="mt-3 flex-1 overflow-y-auto text-[15px] leading-7 sm:text-base">{quote}”</p>
      <footer className="mt-5 border-t border-[#007c97]/20 pt-4 text-sm font-semibold text-[#007c97]">{name}</footer>
    </blockquote>
  );
}

export function MentorshipTestimonialsMarquee({ testimonials }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative z-10 mt-7">
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="mentorship-voices-motion-control inline-flex min-h-11 items-center gap-2 rounded-md border border-[#72e6ff]/50 bg-[#141014] px-4 text-sm font-semibold text-white hover:bg-[#23404a]"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          {paused ? "Resume stories" : "Pause stories"}
        </button>
      </div>
      <div className="mentorship-voices-window overflow-hidden py-2" data-paused={paused} aria-label="Mentorship testimonials">
        <div className="mentorship-voices-track flex w-max" data-paused={paused}>
          {[false, true].map((duplicate) => (
            <div key={duplicate ? "copy" : "original"} aria-hidden={duplicate ? "true" : undefined} className="flex shrink-0 items-stretch gap-5 pr-5">
              {testimonials.map((item) => <TestimonialCard key={item.name} {...item} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
