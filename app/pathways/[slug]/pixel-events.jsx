"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const aiAgentsPixelParams = {
  content_name: "AI Agents MasterClass"
};

function trackPixelEvent(eventName, params) {
  if (typeof window === "undefined" || !window.fbq) return false;
  window.fbq("track", eventName, params);
  return true;
}

export function AiAgentsViewContentEvent({ enabled }) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!enabled || trackedRef.current) return undefined;

    function trackViewContent() {
      if (trackedRef.current) return true;
      const tracked = trackPixelEvent("ViewContent", aiAgentsPixelParams);
      if (tracked) trackedRef.current = true;
      return tracked;
    }

    if (trackViewContent()) return undefined;

    let attempts = 0;
    const retry = window.setInterval(() => {
      attempts += 1;
      if (trackViewContent() || attempts >= 20) {
        window.clearInterval(retry);
      }
    }, 500);

    return () => window.clearInterval(retry);
  }, [enabled]);

  return null;
}

export function AiAgentsTrackedLink({
  children,
  className,
  enabled,
  eventName,
  eventParams = {},
  href,
  rel,
  target
}) {
  const params = {
    ...aiAgentsPixelParams,
    ...eventParams
  };

  function handleClick() {
    if (!enabled) return;
    trackPixelEvent(eventName, params);
  }

  const external = typeof href === "string" && /^https?:\/\//.test(href);

  if (external) {
    return (
      <a href={href} className={className} onClick={handleClick} rel={rel} target={target}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick} rel={rel} target={target}>
      {children}
    </Link>
  );
}
