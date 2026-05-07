import { cn } from "@/lib/utils";

export function Progress({ value = 0, className }) {
  const width = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-neutral-100", className)}>
      <div className="h-full rounded-full bg-[#00b4d8]" style={{ width: `${width}%` }} />
    </div>
  );
}
