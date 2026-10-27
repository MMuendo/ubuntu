"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

function Quote({ item }) {
  const learner = item.role.startsWith("Student");
  return (
    <blockquote className="testimonial-quote flex h-full w-[min(82vw,380px)] shrink-0 snap-start flex-col rounded-2xl border border-[#007c97]/15 bg-white p-6 shadow-[0_14px_40px_rgba(30,22,22,0.06)] sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#007c97]">{learner ? "Learner" : "Organization"}</p>
      <p className="mt-5 flex-1 text-base leading-8 text-[#141014]">“{item.content}”</p>
      <footer className="mt-6 border-t border-[#007c97]/15 pt-4">
        <span className="block font-semibold text-[#141014]">{item.name}</span>
        <span className="text-sm text-slate-600">{item.role}</span>
      </footer>
    </blockquote>
  );
}

export function TestimonialsMarquee({ testimonials }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="mt-9">
      <div className="flex justify-end">
        <button type="button" className="testimonial-motion-control mb-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-[#007c97]/30 bg-white px-4 text-sm font-semibold text-[#141014] hover:bg-[#e8f8fb]" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          {paused ? "Play stories" : "Pause stories"}
        </button>
      </div>
      <p className="mb-3 text-sm text-slate-600 sm:hidden">Swipe to read every story.</p>
      <div className="testimonial-window overflow-hidden py-2" aria-label="Testimonials from learners and organizations">
        <div className="testimonial-track flex w-max" data-paused={paused}>
          {[false, true].map((duplicate) => (
            <div key={duplicate ? "copy" : "original"} aria-hidden={duplicate ? "true" : undefined} className="flex shrink-0 items-stretch gap-5 pr-5">
              {testimonials.map((item) => <Quote key={item.name} item={item} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
