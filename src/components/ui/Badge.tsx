import { cn } from "@/lib/utils";
import type { RoomBadge } from "@/types";

interface BadgeProps {
  variant: RoomBadge | "tag" | "active-tag";
  children?: React.ReactNode;
  className?: string;
}

const BADGE_STYLES: Record<string, string> = {
  live: "bg-brand-red/10 text-brand-red",
  hot: "bg-brand-amber/10 text-brand-amber",
  new: "bg-brand-teal/10 text-brand-teal",
  tag: "bg-card border border-border text-text-2 hover:border-border-2 hover:text-text cursor-pointer",
  "active-tag": "bg-accent-glow border border-accent text-accent cursor-pointer",
};

const BADGE_LABELS: Record<string, string> = {
  live: "🔴 LIVE",
  hot: "🔥 HOT",
  new: "✨ NEW",
};

export function Badge({ variant, children, className }: BadgeProps) {
  const isRoomBadge = ["live", "hot", "new"].includes(variant);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide",
        BADGE_STYLES[variant],
        className
      )}
    >
      {isRoomBadge && <PulseDot color={variant} />}
      {isRoomBadge ? BADGE_LABELS[variant] : children}
    </span>
  );
}

function PulseDot({ color }: { color: string }) {
  return (
    <span
      className={cn(
        "w-1.5 h-1.5 rounded-full animate-pulse2",
        color === "live" && "bg-brand-red",
        color === "hot" && "bg-brand-amber",
        color === "new" && "bg-brand-teal"
      )}
    />
  );
}
