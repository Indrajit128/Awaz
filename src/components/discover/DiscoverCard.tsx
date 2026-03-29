"use client";

import { useState } from "react";
import { UserPlus, Check, Phone } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useApp } from "@/lib/context";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

export function DiscoverCard({ user }: { user: User }) {
  const [added, setAdded] = useState(false);
  const { startCall, showToast } = useApp();

  const handleAdd = () => {
    setAdded((prev) => {
      if (!prev) showToast(`Friend request sent to ${user.name} ❤️`);
      return !prev;
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center transition-all hover:border-border-2 hover:bg-card-2">
      <Avatar
        initials={user.initials}
        avatarColor={user.avatarColor}
        size="lg"
        online={user.online}
        className="mx-auto mb-2.5"
      />
      <p className="text-[13px] font-semibold mb-0.5">{user.name}</p>
      <p className="text-[11px] text-text-2 mb-3">{user.tagline}</p>

      <div className="flex gap-1.5">
        <button
          onClick={handleAdd}
          className={cn(
            "flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[12px] font-semibold border transition-all",
            added
              ? "border-brand-green text-brand-green bg-brand-green/10"
              : "border-accent text-accent hover:bg-accent-glow"
          )}
        >
          {added ? <Check size={12} /> : <UserPlus size={12} />}
          {added ? "Added" : "Add"}
        </button>
        <button
          onClick={() =>
            startCall({
              id: user.id,
              name: user.name,
              initials: user.initials,
              avatarColor: user.avatarColor,
              isIncoming: false,
            })
          }
          className="flex items-center justify-center p-1.5 rounded-xl border border-border text-text-2 hover:border-border-2 hover:text-text transition-all"
        >
          <Phone size={13} />
        </button>
      </div>
    </div>
  );
}
