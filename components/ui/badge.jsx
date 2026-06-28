import { cn } from "@/lib/utils";

const tones = {
  default: "border-[#141014]/10 bg-white/82 text-neutral-700 shadow-sm",
  red: "border-red-200 bg-red-50 text-red-700",
  teal: "border-[#00b4d8]/24 bg-[#e8f8fb] text-[#007c97] shadow-sm",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-800"
};

export function Badge({ className, tone = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
