"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";

const consentKey = "ubuntu-analytiq-cookie-consent";
const legacyKey = "ubuntu-academy-cookie-consent";

function readConsent() {
  try {
    // The old notice covered essential storage only. It cannot grant tracking consent.
    return window.localStorage.getItem(consentKey) ||
      (window.localStorage.getItem(legacyKey) === "accepted" ? "essential" : "");
  } catch {
    return "essential";
  }
}

export function CookieConsent() {
  const [choice, setChoice] = useState(null);

  useEffect(() => setChoice(readConsent()), []);

  function choose(value) {
    try {
      window.localStorage.setItem(consentKey, value);
    } catch {
      // The choice still applies for this page when storage is unavailable.
    }
    setChoice(value);
  }

  return (
    <>
      {choice === "analytics" ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2033770513874581');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
      {choice === "" ? (
        <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/10 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-[#f1f5f9] text-[#1e1616]">
                <Cookie size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1e1616]">Cookies and local preferences</p>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                  Essential cookies support sign-in. If you allow analytics, Meta Pixel records page visits. Your choice is stored on this device.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="button" variant="outline" onClick={() => choose("essential")}>Use essential only</Button>
              <Button type="button" variant="accent" onClick={() => choose("analytics")}>Allow analytics</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
