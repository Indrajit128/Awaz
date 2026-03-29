"use client";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/context";

export function Toast() {
  const { toastMessage } = useApp();

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-[300]",
        "bg-card-2 border border-border-2 rounded-xl px-5 py-3",
        "text-sm text-text font-medium whitespace-nowrap",
        "transition-all duration-300 pointer-events-none",
        toastMessage
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      )}
    >
      {toastMessage}
    </div>
  );
}
