"use client";

import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ShareLinkButton({ url }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" variant="outline" className="w-full bg-white sm:w-auto" onClick={copyLink}>
      {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
      {copied ? "Link copied" : "Copy event link"}
    </Button>
  );
}
