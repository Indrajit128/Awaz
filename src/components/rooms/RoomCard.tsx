"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";
import { cn } from "@/lib/utils";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

const COLOR_ACCENT: Record<string, string> = {
  purple: "before:from-accent before:to-brand-pink",
  teal: "before:from-brand-teal before:to-cyan-400",
  amber: "before:from-brand-amber before:to-orange-400",
};

export function RoomCard({ room }: RoomCardProps) {
  const { joinRoom } = useApp();

  return (
    <div
      onClick={() => joinRoom(room)}
      className={cn(
        "group relative bg-card border border-border rounded-xl p-5 cursor-pointer",
        "transition-all duration-200 hover:border-border-2 hover:-translate-y-0.5 hover:bg-card-2 overflow-hidden",
        // top colour bar via ::before — we replicate with a real div
      )}
    >
      {/* Top accent bar */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl",
          room.color === "purple" && "bg-gradient-to-r from-accent to-brand-pink",
          room.color === "teal" && "bg-gradient-to-r from-brand-teal to-cyan-400",
          room.color === "amber" && "bg-gradient-to-r from-brand-amber to-orange-400"
        )}
      />

      <Badge variant={room.badge} className="mb-3" />

      <h3 className="font-display font-bold text-[15px] mb-1.5 text-text">
        {room.name}
      </h3>
      <p className="text-[12px] text-text-2 leading-relaxed mb-4">
        {room.description}
      </p>

      <div className="flex items-center justify-between">
        {/* Speaker avatars */}
        <div className="flex">
          {room.speakers.slice(0, 4).map((speaker, i) => (
            <div key={speaker.id} className={cn(i > 0 && "-ml-2")}>
              <Avatar
                initials={speaker.initials}
                avatarColor={speaker.avatarColor}
                size="xs"
                className="ring-2 ring-card"
              />
            </div>
          ))}
        </div>

        <span className="text-[12px] text-text-2 flex items-center gap-1">
          🎙 {room.speakersCount} &nbsp;•&nbsp; 👂 {room.listenersCount}
        </span>
      </div>
    </div>
  );
}
