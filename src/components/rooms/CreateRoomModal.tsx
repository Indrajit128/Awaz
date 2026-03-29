"use client";

import { useState } from "react";
import { Globe, Lock } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context";
import { ROOMS, CURRENT_USER } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CreateRoomModal() {
  const { showCreateModal, closeCreateModal, joinRoom, showToast } = useApp();
  const [name, setName] = useState("");
  const [type, setType] = useState<"public" | "private">("public");

  const handleCreate = () => {
    const roomName = name.trim() || "My New Room";
    const newRoom = {
      id: `new-${Date.now()}`,
      name: roomName,
      description: "A brand new room",
      speakersCount: 1,
      listenersCount: 0,
      badge: "new" as const,
      color: "purple" as const,
      category: "Talk",
      speakers: [
        {
          id: "me",
          initials: CURRENT_USER.initials,
          name: CURRENT_USER.name,
          avatarColor: CURRENT_USER.avatarColor,
          isSpeaking: false,
          isHost: true,
          isMuted: false,
        },
      ],
    };
    closeCreateModal();
    setName("");
    joinRoom(newRoom);
    showToast(`Room "${roomName}" created! 🎙️`);
  };

  return (
    <Modal open={showCreateModal} onClose={closeCreateModal} className="w-80">
      <h2 className="font-display font-extrabold text-lg mb-5">
        Create a Room
      </h2>

      {/* Name input */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-text-2 mb-2 block">
          Room Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Late Night Vibes"
          className="w-full bg-bg-3 border border-border-2 rounded-xl px-4 py-2.5 text-sm text-text outline-none focus:border-accent transition-colors placeholder:text-text-3"
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          autoFocus
        />
      </div>

      {/* Room type */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-text-2 mb-2 block">
          Room Type
        </label>
        <div className="flex gap-2">
          {(["public", "private"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold border transition-all",
                type === t
                  ? "border-accent text-accent bg-accent-glow"
                  : "border-border text-text-2 bg-card hover:border-border-2 hover:text-text"
              )}
            >
              {t === "public" ? <Globe size={14} /> : <Lock size={14} />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2.5">
        <Button
          variant="ghost"
          className="flex-1"
          onClick={closeCreateModal}
        >
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" onClick={handleCreate}>
          Create
        </Button>
      </div>
    </Modal>
  );
}
