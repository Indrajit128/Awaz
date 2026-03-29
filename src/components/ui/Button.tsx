import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "success" | "icon";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "ghost", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer font-sans",
          // Sizes
          size === "sm" && "px-3.5 py-1.5 text-[13px]",
          size === "md" && "px-5 py-2.5 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          // Variants
          variant === "primary" &&
            "bg-accent-2 text-white shadow-accent hover:bg-violet-700 active:scale-95 hover:-translate-y-px",
          variant === "ghost" &&
            "bg-bg-3 text-text border border-border-2 hover:bg-card-2 active:scale-95",
          variant === "danger" &&
            "bg-red-500/10 text-brand-red border border-brand-red/30 hover:bg-red-500/20 active:scale-95",
          variant === "success" &&
            "bg-green-500/10 text-brand-green border border-brand-green/30 hover:bg-green-500/20 active:scale-95",
          variant === "icon" &&
            "bg-bg-3 border border-border-2 text-text rounded-full hover:bg-card-2 hover:border-accent active:scale-95",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
