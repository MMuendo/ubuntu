"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";

const consentKey = "ubuntu-academy-cookie-consent";

function readConsent() {
  try {
    return window.localStorage.getItem(consentKey);
  } catch {
    return "unavailable";
  }
}

function writeConsent() {
  try {
    window.localStorage.setItem(consentKey, "accepted");
  } catch {
    // Some embedded/file contexts block localStorage. The banner should never crash auth.
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    setVisible(consent !== "accepted" && consent !== "unavailable");
  }, []);

  function acceptCookies() {
    writeConsent();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/10 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-[#f1f5f9] text-[#1e1616]">
            <Cookie size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#1e1616]">Cookies and local preferences</p>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              Ubuntu Analytiq uses essential cookies for sign-in sessions and local storage for small preferences like this notice.
            </p>
          </div>
        </div>
        <Button type="button" variant="accent" className="w-full md:w-auto" onClick={acceptCookies}>
          Accept cookies
        </Button>
      </div>
    </div>
  );
}
