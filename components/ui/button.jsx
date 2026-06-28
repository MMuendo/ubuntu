import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4d8] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#141014] text-white ring-1 ring-[#00b4d8]/18 hover:bg-[#241919] hover:ring-[#00b4d8]/35",
        accent: "bg-[linear-gradient(135deg,#00b4d8,#72e6ff)] text-[#141014] ring-1 ring-[#00b4d8]/35 hover:shadow-[0_10px_24px_rgba(0,180,216,0.22)]",
        outline: "border border-[#00b4d8]/22 bg-white/82 text-[#141014] backdrop-blur hover:border-[#00b4d8]/55 hover:bg-[#e8f8fb]",
        ghost: "text-neutral-700 hover:bg-white/70 hover:text-neutral-950 hover:ring-1 hover:ring-[#00b4d8]/16"
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-5 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
