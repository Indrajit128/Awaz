"use client";

import { useState } from "react";
import { HeroBanner } from "@/components/rooms/HeroBanner";
import { RoomCard } from "@/components/rooms/RoomCard";
import { ROOMS, ROOM_CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? ROOMS
      : ROOMS.filter((r) => r.category === activeCategory);

  return (
    <div className="p-6 space-y-7 pb-32">
      <HeroBanner />

      {/* Room grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">🔥 Live Rooms</h2>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            {ROOM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3.5 py-1 rounded-full text-xs font-semibold border transition-all",
                  activeCategory === cat
                    ? "border-accent text-accent bg-accent-glow"
                    : "border-border text-text-2 bg-card hover:border-border-2 hover:text-text"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {filtered.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-2">
            <p className="text-3xl mb-3">🎙️</p>
            <p className="font-medium">No rooms in this category yet.</p>
            <p className="text-sm">Be the first to create one!</p>
          </div>
        )}
      </section>
    </div>
  );
}

