"use client";

import { Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context";
import { ROOMS } from "@/lib/data";

export function HeroBanner() {
  const { joinRoom, openCreateModal } = useApp();

  return (
    <div className="relative bg-gradient-to-br from-[#1a103a] via-[#1a1228] to-[#0f1a1a] border border-border-2 rounded-xl p-7 overflow-hidden">
      {/* Glow blob */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-glow border border-accent/30 rounded-full text-xs font-semibold text-accent mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse2" />
        1,284 people active now
      </div>

      <h1 className="font-display font-extrabold text-2xl leading-tight tracking-tight mb-2">
        Connect through
        <br />
        the power of voice
      </h1>
      <p className="text-sm text-text-2 leading-relaxed max-w-md mb-5">
        Join live audio rooms, chat privately, and discover genuine connections — one conversation at a time.
      </p>

      <div className="flex gap-2.5">
        <Button variant="primary" onClick={() => joinRoom(ROOMS[0])}>
          Join a Room
        </Button>
        <Button variant="ghost" onClick={openCreateModal}>
          <Users size={15} />
          Create Room
        </Button>
      </div>
    </div>
  );
}
