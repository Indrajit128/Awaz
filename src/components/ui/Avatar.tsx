import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  avatarColor: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  online?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

const SIZE_MAP = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
  xl: "w-16 h-16 text-xl",
};

export function Avatar({
  initials,
  avatarColor,
  size = "md",
  online,
  isSpeaking,
  className,
}: AvatarProps) {
  return (
    <div className={cn("relative flex-shrink-0", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white transition-all duration-300",
          SIZE_MAP[size],
          isSpeaking && "ring-2 ring-accent shadow-accent-sm animate-speaking"
        )}
        style={{ background: avatarColor }}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-bg",
            online ? "bg-brand-green" : "bg-text-3",
            size === "xs" || size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5"
          )}
        />
      )}
    </div>
  );
}
